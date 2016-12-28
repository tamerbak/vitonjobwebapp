import {Component} from "@angular/core";
import {OffersService} from "../../providers/offer.service";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/core";
import {DomSanitizationService} from '@angular/platform-browser';
import {RecruitButton} from "../components/recruit-button/recruit-button";
import {ModalNotificationContract} from "../modal-notification-contract/modal-notification-contract";
import {ModalProfile} from "../modal-profile/modal-profile";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {CandidatureService} from "../../providers/candidature-service";

declare var jQuery: any;

@Component({
  selector: '[search-details]',
  template: require('./search-details.html'),
  styles: [require('./search-details.scss')],
  directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES, RecruitButton, ModalNotificationContract, ModalProfile, AlertComponent],
  providers: [OffersService, CandidatureService]
})

export class SearchDetails{
  currentUser: any;
  projectTarget: string;
  offer: any;
  result: any;
  fullTitle: string = '';
  fullName: string = '';
  matching: string = '';
  avatar: string;
  lat: number;
  lng: number;
  zoom: number;
  languages: any[];
  qualities: any[];
  isRecruteur: boolean = false;

  fromPage: string = "recruitment";
  jobyerInterestLabel: string;
  alerts: Array<Object>;
  jobyerInterested: boolean;
  candidatureAllowed: boolean;

  videoAvailable: boolean = false;
  youtubeLink: string;
  youtubeLinkSafe: any;

  constructor(private sharedService: SharedService,
              public offersService: OffersService,
              private router: Router,
              private sanitizer: DomSanitizationService,
              private candidatureService: CandidatureService) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.isRecruteur = this.currentUser.estRecruteur;
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    } else {
      this.projectTarget = this.sharedService.getProjectTarget();
      //this.router.navigate(['home']);
    }
    this.result = this.sharedService.getSearchResult();
    this.offer = this.sharedService.getCurrentOffer();
    this.candidatureAllowed = (this.result.accepteCandidature || this.result.accepteCandidature == 'true' ? true : false);
  }

  ngOnInit(): void {
    //get offer title, employer/jobyer name and matching
    if (this.result.titreOffre)
      this.fullTitle = this.result.titreOffre;
    if (this.result.titreoffre)
      this.fullTitle = this.fullTitle + this.result.titreoffre;
    if (this.projectTarget != "employer")
      this.fullName = this.result.entreprise;
    else
      this.fullName = this.result.titre + ' ' + this.result.prenom + ' ' + this.result.nom;

    this.matching = this.result.matching + "%";

    //load markers
    this.lat = +this.result.latitude;
    this.lng = +this.result.longitude;
    this.zoom = 12;

    //get qualities and langs of the selected offer
    let table = this.projectTarget == "employer" ? 'user_offre_jobyer' : 'user_offre_entreprise';
    let idOffers = [];
    idOffers.push(this.result.idOffre);
    this.offersService.getOffersLanguages(idOffers, table).then((data: any) => {
      if (data) {
        this.languages = data;
      }
    });
    this.offersService.getOffersQualities(idOffers, table).then((data: any) => {
      if (data) {
        this.qualities = data;
      }
    });

    if(this.projectTarget == 'jobyer' && this.candidatureAllowed) {
      this.setCandidatureButtonLabel();
    }
  }

  ngAfterViewInit() : void {
    this.offersService.getMetaData(this.result.idOffre, this.projectTarget == 'jobyer' ? 'employer' : 'jobyer').then((data : any) => {
      if (data && data.data.length > 0) {

        // Initialize video container
        let videolink = data.data[0].lien_video;
        if (videolink && videolink.toUpperCase() == 'NULL') {
          this.videoAvailable = false;
        } else {
          this.videoAvailable = true;
          this.youtubeLink = videolink.replace("youtu.be", "www.youtube.com/embed").replace("watch?v=", "embed/");
          this.youtubeLinkSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeLink);
        }

      }
    });

  }

  onRecruite(params) {
    this.sharedService.setCurrentJobyer(params.jobyer);
    if (params.obj == "profile") {
      jQuery('#modal-profile').modal('show');
    }else{
      jQuery('#modal-notification-contract').modal('show');
    }
  }

  onProfileUpdated(params) {
    if (params.obj == "contract") {
      $('#modal-profile').on('hidden.bs.modal', function (e) {
        jQuery('#modal-notification-contract').modal('show');
      })
    }
  }

  setCandidatureButtonLabel(){
    this.candidatureService.getCandidatureOffre(this.result.idOffre, this.currentUser.jobyer.id).then((data: any) => {
      if(data && data.data && data.data.length  == 1){
        this.jobyerInterested = true;
        this.jobyerInterestLabel = "Cette offre ne m'intéresse plus";
      }else{
        this.jobyerInterested = false;
        this.jobyerInterestLabel = "Cette offre m'intéresse";
      }
    });
  }

  switchJobyerInterest(){
    if(this.jobyerInterested){
      this.candidatureService.deleteCandidatureOffre(this.result.idOffre, this.currentUser.jobyer.id).then((data: any) => {
        if(!data || data.status != 'success'){
          this.addAlert("danger", "Erreur lors de la sauvegarde des données.");
        }else{
          this.jobyerInterestLabel = "Cette offre m'intéresse";
          this.jobyerInterested = false;
        }
      });
    }else{
      this.candidatureService.setCandidatureOffre(this.result.idOffre, this.currentUser.jobyer.id).then((data: any) => {
        if(!data || data.status != 'success'){
          this.addAlert("danger", "Erreur lors de la sauvegarde des données.");
        }else{
          this.jobyerInterestLabel = "Cette offre ne m'intéresse plus";
          this.jobyerInterested = true;
        }
      });
    }
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }
}
