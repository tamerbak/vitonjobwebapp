import {Component,ChangeDetectorRef, ViewEncapsulation} from "@angular/core";
import {ACCORDION_DIRECTIVES, BUTTON_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {OffersService} from "../../providers/offer.service";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {SearchService} from "../../providers/search-service";
import {Utils} from "../utils/utils";
import {NotificationsService} from "../../providers/notifications.service";
import {AdvertService} from "../../providers/advert.service";
import {ButtonNumber} from "../components/button-number/button-number";
import {ModalOptions} from "../modal-options/modal-options";
import { InfiniteScroll } from 'angular2-infinite-scroll';
import {DateUtils} from "../utils/date-utils";

declare let jQuery: any;
declare let Messenger: any;

@Component({
  selector: '[offer-list]',
  template: require('./offer-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./offer-list.scss')],
  directives: [ACCORDION_DIRECTIVES, ROUTER_DIRECTIVES, AlertComponent, BUTTON_DIRECTIVES, ButtonNumber, ModalOptions, InfiniteScroll],
  providers: [OffersService, SearchService,ChangeDetectorRef, AdvertService]
})
export class OfferList {
  globalOfferList = [];
  offerList = [];

  currentUser: any;
  projectTarget: string;
  isEmployer: boolean;

  alerts: Array<Object>;
  typeOfferModel: number = 0;

  modalParams: any = {type: '', message: ''};

  //infinite scroll
  currentTypeList: any = [];
  queryOffset:number = 0;
  queryLimit:number = 5;
  loading:boolean = true;
  userId:any;

  constructor(private sharedService: SharedService,
              public offersService: OffersService,
              private advertService: AdvertService,
              private router: Router,
              private cdr:ChangeDetectorRef,
              private searchService: SearchService,
              private notificationsService:NotificationsService,
              private route: ActivatedRoute) {

    this.currentUser = this.sharedService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['home']);
    }

    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    this.isEmployer = (this.projectTarget == 'employer');

    if (this.isEmployer) {
      this.userId = this.currentUser.employer.entreprises[0].id;
    } else {
      this.userId = this.currentUser.jobyer.id;
    }
  }

  ngOnInit() {
    //get params : obj = "add" od "detail"
    this.route.params.forEach((params: Params) => {
      this.typeOfferModel = params['typeOfferModel'];
    });

    if(Utils.isEmpty(this.typeOfferModel)){
      this.typeOfferModel = 0;
    }

    //load offers
    this.getOffersByType();
  }

  toHourString(time: number) {
    return DateUtils.toHourString(time);
  }

  toDateString(date: number) {
    return DateUtils.toFrenchDateString(date);
  }

  goToDetailOffer(offer) {
    if(this.projectTarget == 'employer'){
      this.offersService.loadOfferPrerequisObligatoires(offer.idOffer).then((data:any)=>{
        offer.jobData.prerequisObligatoires = [];
        if(data && data.length != 0) {
          for(let j = 0 ; j < data.length ; j++)
            offer.jobData.prerequisObligatoires.push(data[j].libelle);
        }
        this.offersService.loadOfferEPI(offer.idOffer,this.projectTarget).then((data:any)=>{
          offer.jobData.epi = [];
          if(data && data.length != 0) {
            for (let j = 0; j < data.length; j++)
              offer.jobData.epi.push(data[j].libelle);
          }
          this.sharedService.setCurrentOffer(offer);
          this.router.navigate(['offer/edit', {obj:'detail'}]);
        });
      });
    }else{
        this.sharedService.setCurrentOffer(offer);
        this.router.navigate(['offer/edit', {obj:'detail'}]);
    }
  }

  autoSearchMode(offer) {
    var mode = offer.rechercheAutomatique ? "Non" : "Oui";
    this.offersService.saveAutoSearchMode(this.projectTarget, offer.idOffer, mode).then((data: any)=> {
      if (data && data.status == "success") {
        offer.rechercheAutomatique = !offer.rechercheAutomatique;
        if(offer.rechercheAutomatique && offer.correspondantsCount > 0){
          this.notificationsService.add(offer);
        }else{
          this.notificationsService.remove(offer);
        }
        //this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, offer, this.projectTarget);
        this.sharedService.setCurrentUser(this.currentUser);
      } else {
        this.addAlert("danger", "Une erreur est survenue lors de l'enregistrement des données.");
      }
    });
  }



  /**
   * @Description : Launch search from current offer-list
   */
  launchSearch(offer) {
    if(this.isEmployer){
      this.sharedService.setCurrentOffer(offer);
      this.router.navigate(['offer/recruit']);
    }else{
      if (!offer)
       return;
     let searchQuery = {
     class: 'com.vitonjob.recherche.model.SearchQuery',
     queryType: 'OFFER',
     idOffer: offer.idOffer,
     resultsType: this.projectTarget=='jobyer'?'employer':'jobyer'
     };
     this.searchService.advancedSearch(searchQuery).then((data:any)=>{
     this.sharedService.setLastResult(data);
     this.sharedService.setCurrentSearch(null);
     this.sharedService.setCurrentSearchCity(null);
     this.sharedService.setCurrentOffer(offer);
     this.router.navigate(['search/results']);
     });
    }
  }

  /**
   * @Description: Navigating to new offer page
   */
  goToNewOffer() {
    /*var isNewUser: boolean = this.isEmpty(this.currentUser.titre);
    if (isNewUser) {
      this.addAlert("warning", "Veuillez remplir les informations de votre profil avant de créer une offre.");
      return;
    } else {
      this.router.navigate(['offer/edit', {obj:'add'}]);
    }*/
    this.sharedService.setCurrentOffer(null);
    this.router.navigate(['offer/edit', {obj:'add'}]);
  }

  changePrivacy(offer) {
    var statut = offer.visible ? 'Non' : 'Oui';
    this.offersService.updateOfferStatut(offer.idOffer, statut, this.projectTarget).then(()=> {
      offer.visible = (statut == 'Non' ? false : true);
      //this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, offer, this.projectTarget);
      this.sharedService.setCurrentUser(this.currentUser);
      if (offer.visible) {
        this.addAlert("info", "Votre offre a bien été déplacée dans «Mes offres en ligne».");
      } else {
        this.addAlert("info", "Votre offre a bien été déplacée dans «Mes offres privées».");
      }
    });
  }

  isOfferObsolete(offer){
    for (let j = 0; j < offer.calendarData.length; j++) {
      var slotDate = offer.calendarData[j].date;
      var startH = this.offersService.convertToFormattedHour(offer.calendarData[j].startHour);
      slotDate = new Date(slotDate).setHours(+(startH.split(':')[0]), +(startH.split(':')[1]));
      var dateNow = new Date().getTime();
      if (slotDate <= dateNow) {
        return true;
      }
    }
    return false;
  }

  loadList(type){
    if(!this.loading) {
      this.currentTypeList = [];
      this.queryOffset = 0;
      this.queryLimit = 5;
      this.typeOfferModel = type;
      this.getOffersByType();
    }
  }

  onScrollDown () {
    if(this.queryOffset > 0) {
      this.getOffersByType();
    }
  }

  getOffersByType() {
    this.loading = true;
    jQuery("#radioButtons").addClass("disable-button");

    let type = (this.typeOfferModel == 0 ? 'public' : (this.typeOfferModel == 1 ? 'private' : 'archived'));

    this.offersService.getOffersByType(type, this.queryOffset,this.queryLimit, this.userId, this.projectTarget).then((data: any) => {
      if (data && data.length != 0) {
        this.offerList = data;
        for (let i = 0; i < this.offerList.length; i++) {
          let item = this.offerList[i];

          //pour empecher l'ajout d'offre deja existante (parfois le infinite scroll re-renvoie la derniere offre)
          let canAdd = true;
          if(this.currentTypeList.length <= this.queryOffset){
            canAdd = true;
          }else{
            if (item.idOffer != this.currentTypeList[this.currentTypeList.length - 1].idOffer) {
              canAdd = true;
            }else{
              canAdd = false;
            }
          }

          //si l'offre n'est pas redondante, l'ajouter dans la liste à afficher
          if (canAdd) {
            this.currentTypeList.push(item);

            //recuperer le nombre de jobyer dispo pour cette offre
            if (!item.obsolete && this.typeOfferModel == 0) {
              let searchQuery = {
                class: 'com.vitonjob.recherche.model.SearchQuery',
                queryType: 'COUNT',
                idOffer: item.idOffer,
                resultsType: this.projectTarget == 'jobyer' ? 'employer' : 'jobyer'
              };
              this.searchService.advancedSearch(searchQuery).then((data: any) => {
                item.correspondantsCount = data.count;
              });

              //recuperer le nombre de jobyer interessé pour chaque offre
              if (this.isEmployer) {
                this.advertService.loadInterestsByOffre(item.idOffer).then((data: any) => {
                  item.interestedCount = data.nbInterest;
                });
              }
            }
          }
        }

        this.queryOffset = this.queryOffset + this.queryLimit;
      }
      this.loading = false;
      $("#radioButtons").removeClass("disable-button");
    });
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }

  goToJobyerInterestList(offer) {
    this.sharedService.setCurrentAdv(null);
    this.sharedService.setCurrentOffer(offer);
    this.router.navigate(['offer/jobyer/list']);
  }

  deleteOffer(offer){
    this.sharedService.setCurrentOffer(offer);
    this.modalParams.type = "offer.delete";
    this.modalParams.message = "Êtes-vous sûr de vouloir supprimer l'offre " + '"' + offer.title + '"' + " ?";
    this.modalParams.btnTitle = "Supprimer l'offre";
    this.modalParams.btnClasses = "btn btn-danger";
    this.modalParams.modalTitle = "Suppression de l'offre";
    jQuery("#modal-options").modal('show');
    let self = this;
    jQuery('#modal-options').on('hidden.bs.modal', function (e) {
      self.loadList(self.typeOfferModel);
    });
  }
}
