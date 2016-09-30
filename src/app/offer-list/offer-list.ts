import {Component,ChangeDetectorRef, ViewEncapsulation} from "@angular/core";
import {ACCORDION_DIRECTIVES, BUTTON_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {OffersService} from "../../providers/offer.service";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {SearchService} from "../../providers/search-service";
import {ModalDelete} from "../modal-delete-element/modal-delete-element";
declare var jQuery,Messenger:any;

@Component({
  selector: '[offer-list]',
  template: require('./offer-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./offer-list.scss')],
  directives: [ACCORDION_DIRECTIVES, ROUTER_DIRECTIVES, AlertComponent, BUTTON_DIRECTIVES,ModalDelete],
  providers: [OffersService, SearchService,ChangeDetectorRef]
})
export class OfferList {
  globalOfferList = [];
  offerList = [];

  currentUser: any;
  projectTarget: string;

  alerts: Array<Object>;
  typeOfferModel: string = '0';

  deleteParams:{type:string,message:string}={type:'offer',message:'bla'};
  offerToDelete:any = null;
  public initOffers: Function;

  constructor(private sharedService: SharedService,
              public offersService: OffersService,
              private router: Router,
              private cdr:ChangeDetectorRef,
              private searchService: SearchService) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['app/home']);
    }

  }

  ngOnInit() {
    this.currentUser = this.sharedService.getCurrentUser();
    this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
    this.initOffers = this.loadOffers.bind(this);

    this.loadOffers();

  }

  loadOffers(){
    console.log("start")
    this.globalOfferList.length = 0;
    this.globalOfferList.push({header: 'Mes offres en ligne', list: []});
    this.globalOfferList.push({header: 'Mes brouillons', list: []});
    this.offerList = this.projectTarget == 'employer' ? this.sharedService.getCurrentUser().employer.entreprises[0].offers : this.sharedService.getCurrentUser().jobyer.offers;
    for (var i = 0; i < this.offerList.length; i++) {
      let offer = this.offerList[i];
      if (!offer || !offer.jobData) {
        continue;
      }
      if (offer.visible) {
        offer.color = 'black';
        offer.correspondantsCount = -1;

        //verify if offer is obsolete
        for (var j = 0; j < offer.calendarData.length; j++) {
          var slotDate = offer.calendarData[j].date;
          var startH = this.offersService.convertToFormattedHour(offer.calendarData[j].startHour);
          slotDate = new Date(slotDate).setHours(+(startH.split(':')[0]), +(startH.split(':')[1]));
          var dateNow = new Date().getTime();
          if (slotDate <= dateNow) {
            offer.obsolete = true;
            break;
          } else {
            offer.obsolete = false;
          }
        }

        this.globalOfferList[0].list.push(offer);
        this.offersService.getCorrespondingOffers(offer, this.currentUser.role).then((data: any)=> {
          offer.correspondantsCount = data.length;
          // Sort offers corresponding to their search results :
          this.globalOfferList[0].list.sort((a, b) => {
            return b.correspondantsCount - a.correspondantsCount;
          })
        });
      } else {
        offer.color = 'grey';
        offer.correspondantsCount = -1;
        this.globalOfferList[1].list.push(offer);
      }

    }
  }

  goToDetailOffer(offer) {
    this.sharedService.setCurrentOffer(offer);
    this.router.navigate(['app/offer/edit', {obj:'detail'}]);
  }

  autoSearchMode(offer) {
    var mode = offer.rechercheAutomatique ? "Non" : "Oui";
    this.offersService.saveAutoSearchMode(this.projectTarget, offer.idOffer, mode).then((data: any)=> {
      if (data && data.status == "success") {
        offer.rechercheAutomatique = !offer.rechercheAutomatique;
        this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, offer, this.projectTarget);
        this.sharedService.setCurrentUser(this.currentUser);
      } else {
        this.addAlert("danger", "Une erreur est survenue lors de la sauvegarde des données.");
      }
    });
  }

  /**
   * @Description : Launch search from current offer-list
   */
  launchSearch(offer) {
    if (!offer)
      return;
    let searchFields = {
      class: 'com.vitonjob.callouts.recherche.SearchQuery',
      job: offer.jobData.job,
      metier: '',
      lieu: '',
      nom: '',
      entreprise: '',
      date: '',
      table: this.projectTarget == 'jobyer' ? 'user_offre_entreprise' : 'user_offre_jobyer',
      idOffre: '0'
    };
    this.searchService.criteriaSearch(searchFields, this.projectTarget).then((data: any) => {
      this.sharedService.setLastResult(data);
      this.sharedService.setCurrentOffer(offer);
      this.router.navigate(['app/search/results']);
    });
  }

  /**
   * @Description: Navigating to new offer page
   */
  goToNewOffer() {
    var isNewUser: boolean = this.isEmpty(this.currentUser.titre);
    if (isNewUser) {
      this.addAlert("warning", "Veuillez remplir les informations de votre profil avant de créer une offre.");
      return;
    } else {
      this.router.navigate(['app/offer/edit', {obj:'add'}]);
    }
  }

  changePrivacy(offer) {
    var statut = offer.visible ? 'Non' : 'Oui';
    this.offersService.updateOfferStatut(offer.idOffer, statut, this.projectTarget).then(()=> {
      offer.visible = (statut == 'Non' ? false : true);
      this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, offer, this.projectTarget);
      this.sharedService.setCurrentUser(this.currentUser);
      if (offer.visible) {
        this.addAlert("info", "Votre offre a bien été déplacé dans «Mes offres en ligne».");
      } else {
        this.addAlert("info", "Votre offre a bien été déplacé dans «Mes offres en brouillon».");
      }
    });
  }

  watchTypeOfferModel() {
    this.alerts = [];
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

  deleteOffer(offer){
    this.deleteParams.message = "Êtes-vous sûr de vouloir supprimer l'offre "+'"'+ offer.title +'"'+" ?";
    this.sharedService.setCurrentOffer(offer);
    jQuery("#modal-delete").modal('show')
  }


}
