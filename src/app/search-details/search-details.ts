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
import {Utils} from "../utils/utils";
import {Offer} from "../../dto/offer";
import {DateUtils} from "../utils/date-utils";


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
  offerComplete: Offer;
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
  jobyerInterestLabel: string = "Cette offre m'intéresse";
  alerts: Array<Object>;
  jobyerInterested: boolean;
  candidatureAllowed: boolean;
  isInterestBtnDisabled: boolean = false;

  videoAvailable: boolean = false;
  youtubeLink: string;
  youtubeLinkSafe: any;
  subject: string = "recruit";
  city:string = "";
  cp:string = "";

  estimatedIncome:number=0;

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
    this.offerComplete = new Offer();

    let offerProjectTarget = (this.projectTarget == 'employer' ? 'jobyer' : 'employer');
    this.offersService.getOfferById(this.result.idOffre, offerProjectTarget, this.offerComplete).then((data: any) => {
      if(this.result.rate && this.result.rate>0)
        this.calculateIncome();
    });
    this.offersService.loadOfferCity(this.offer.idOffer, this.projectTarget).then((data: any) => {
      if(data && data[0]){
        this.city = data[0].nom;
        this.cp = data[0].code;
      }
    });
    if(this.projectTarget == 'jobyer')
      this.candidatureAllowed = (this.result.accepteCandidature || this.result.accepteCandidature == 'true' ? true : false);
    else
      this.candidatureAllowed = true;
  }

  calculateIncome():void{
    let nbMinWork = 0;
    for(let i = 0 ; i < this.offerComplete.calendarData.length ; i++){
      let slot = this.offerComplete.calendarData[i];
      if(Utils.sameDay(slot.date, slot.dateEnd)){
        nbMinWork+=slot.endHour-slot.startHour;
      } else if(slot.endHour<slot.startHour) {
        nbMinWork+= 1440-slot.startHour;
        nbMinWork+= slot.endHour;
      }

    }
    this.estimatedIncome = this.result.rate*nbMinWork/60;
  }

  ngOnInit(): void {
    //get offer title, employer/jobyer name and matching
    this.fullTitle = this.result.titreOffre;
    if (this.projectTarget != "employer")
      this.fullName = this.result.entreprise;
    else
      this.fullName = this.result.titre + ' ' + this.result.nom + ' ' + this.result.prenom;

    this.matching = this.result.matching + "%";

    //load markers
    if ((this.result.latitude !== '0' && this.result.longitude !== '0') &&
      !Utils.isEmpty(this.result.latitude) && !Utils.isEmpty(this.result.longitude)){
      this.lat = +this.result.latitude;
      this.lng = +this.result.longitude;
      this.zoom = 12;
    } else {
      this.lat = 48.856494;
      this.lng = 2.345503;
      this.zoom = 8;
    }



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

    if(this.projectTarget == 'jobyer' && this.currentUser) {
      this.setCandidatureButtonLabel();
    }
  }

  ngAfterViewInit() : void {
    this.offersService.getMetaData(this.result.idOffre, this.projectTarget == 'jobyer' ? 'employer' : 'jobyer').then((data : any) => {
      if (data && data.data.length > 0) {

        // Initialize video container
        let videolink = data.data[0].lien_video;
        if (Utils.isEmpty(videolink)) {
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
    if (!this.currentUser || !this.currentUser.jobyer) {
      return;
    }
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
    this.isInterestBtnDisabled = true;
    if(this.jobyerInterested){
      this.candidatureService.deleteCandidatureOffre(this.result.idOffre, this.currentUser.jobyer.id).then((data: any) => {
        this.isInterestBtnDisabled = false;
        if(!data || data.status != 'success'){
          this.addAlert("danger", "Erreur lors de la sauvegarde des données.");
        }else{
          this.jobyerInterestLabel = "Cette offre m'intéresse";
          this.jobyerInterested = false;
        }
      });
    }else{
      this.candidatureService.setCandidatureOffre(this.result.idOffre, this.currentUser.jobyer.id).then((data: any) => {
        this.isInterestBtnDisabled = false;
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
    return Utils.isEmpty(str);
  }

  /**
   * @Description Converts a timeStamp to date string
   * @param time : a timestamp date
   */
  toHourString(time: number) {
    let minutes = (time % 60) < 10 ? "0" + (time % 60).toString() : (time % 60).toString();
    let hours = Math.trunc(time / 60) < 10 ? "0" + Math.trunc(time / 60).toString() : Math.trunc(time / 60).toString();
    return hours + ":" + minutes;
  }

  /**
   * @Description Converts a timeStamp to date string :
   * @param date : a timestamp date
   */
  toDateString(date: number) {
    var dateOptions = {
      weekday: "long", month: "long", year: "numeric",
      day: "numeric"//, hour: "2-digit", minute: "2-digit"
    };
    return new Date(date).toLocaleDateString('fr-FR', dateOptions);
  }
}
