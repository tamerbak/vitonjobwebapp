import {Component} from "@angular/core";
import {OffersService} from "../../providers/offer.service";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/core";
import {RecruitButton} from "../components/recruit-button/recruit-button";
import {ModalNotificationContract} from "../modal-notification-contract/modal-notification-contract";
import {ModalProfile} from "../modal-profile/modal-profile";

declare var jQuery: any;

@Component({
  selector: '[search-details]',
  template: require('./search-details.html'),
  styles: [require('./search-details.scss')],
  directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES, RecruitButton, ModalNotificationContract, ModalProfile],
  providers: [OffersService]
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

  constructor(private sharedService: SharedService,
              public offersService: OffersService,
              private router: Router) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    } else {
      this.projectTarget = this.sharedService.getProjectTarget();
      //this.router.navigate(['app/home']);
    }
    this.result = this.sharedService.getSearchResult();
    this.offer = this.sharedService.getCurrentOffer();
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
      if (data)
        this.languages = data;
    });
    this.offersService.getOffersQualities(idOffers, table).then((data: any)=> {
      if (data)
        this.qualities = data;
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

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }
}
