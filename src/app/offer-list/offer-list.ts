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
declare var jQuery,Messenger:any;

@Component({
  selector: '[offer-list]',
  template: require('./offer-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./offer-list.scss')],
  directives: [ACCORDION_DIRECTIVES, ROUTER_DIRECTIVES, AlertComponent, BUTTON_DIRECTIVES],
  providers: [OffersService, SearchService,ChangeDetectorRef, AdvertService]
})
export class OfferList {
  globalOfferList = [];
  offerList = [];

  currentUser: any;
  projectTarget: string;

  alerts: Array<Object>;
  typeOfferModel: string = '0';

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
  }

  ngOnInit() {
    //get params : obj = "add" od "detail"
    this.route.params.forEach((params: Params) => {
      this.typeOfferModel = params['typeOfferModel'];
    });

    if(Utils.isEmpty(this.typeOfferModel)){
      this.typeOfferModel = '0';
    }

    this.currentUser = this.sharedService.getCurrentUser();
    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));

    this.loadOffers();

  }

  convertSlotsForDisplay(s) {
    var slotTemp = {
      date: this.toDateString(s.date),
      startHour: this.toHourString(s.startHour),
      endHour: this.toHourString(s.endHour),
      pause: s.pause
    };
    return slotTemp;
  }

  toHourString(time: number) {
    let minutes = (time % 60) < 10 ? "0" + (time % 60).toString() : (time % 60).toString();
    let hours = Math.trunc(time / 60) < 10 ? "0" + Math.trunc(time / 60).toString() : Math.trunc(time / 60).toString();
    return hours + ":" + minutes;
  }

  toDateString(date: number) {
    var dateOptions = {
      weekday: "long", month: "long", year: "numeric",
      day: "numeric"//, hour: "2-digit", minute: "2-digit"
    };
    return new Date(date).toLocaleDateString('fr-FR', dateOptions);
  }

  loadOffers(){
    this.globalOfferList.length = 0;
    this.globalOfferList.push({header: 'Mes offres en ligne', list: []});
    this.globalOfferList.push({header: 'Mes brouillons', list: []});
    this.globalOfferList.push({header: 'Mes offres en archive', list: []});
    this.offerList = this.projectTarget == 'employer'
      ? this.sharedService.getCurrentUser().employer.entreprises[0].offers
      : this.sharedService.getCurrentUser().jobyer.offers;
    let obsoleteOffers = [];

    for (let i = 0; i < this.offerList.length; i++) {
      let offer = this.offerList[i];

      if (!offer || !offer.jobData || !offer.calendarData ||(offer.calendarData && offer.calendarData.length == 0)) {
        continue;
      }

      //push slots into offer
      offer.slots =[];
      for (let i = 0; i < offer.calendarData.length; i++) {

        let nb_days_diff = offer.calendarData[i].dateEnd - offer.calendarData[i].date;
            nb_days_diff = nb_days_diff / (60 * 60 * 24 * 1000);

        var slotTemp = {
          date: this.toDateString(offer.calendarData[i].date),
          dateEnd: this.toDateString(offer.calendarData[i].dateEnd),
          startHour: this.toHourString(offer.calendarData[i].startHour),
          endHour: this.toHourString(offer.calendarData[i].endHour),
          pause: offer.calendarData[i].pause,
          nbDays: nb_days_diff
        };
        offer.slots.push(slotTemp);
      }

      //archived offers
      if(offer.etat == 'en archive'){
        this.globalOfferList[2].list.push(offer);
        offer.correspondantsCount = -1;
        offer.interestedCount = -1;
        continue;
      }

      //public offers
      if (offer.visible) {
        offer.color = 'black';
        offer.correspondantsCount = -1;
        offer.interestedCount = -1;

        //verify if offer is obsolete
        let isOfferObsolete = this.isOfferObsolete(offer);
        if (isOfferObsolete) {
          offer.obsolete = true;
          obsoleteOffers.push(offer);
        } else {
          offer.obsolete = false;
          this.globalOfferList[0].list.push(offer);

          let searchQuery = {
            class: 'com.vitonjob.recherche.model.SearchQuery',
            queryType: 'COUNT',
            idOffer: offer.idOffer,
            resultsType: this.projectTarget=='jobyer'?'employer':'jobyer'
          };
          this.searchService.advancedSearch(searchQuery).then((data:any)=>{
            offer.correspondantsCount = data.count;
          });
          this.advertService.loadInterestsByOffre(offer.idOffer).then((data:any)=>{
            offer.interestedCount = data.nbInterest;
          });

        }
      } else {
        //private offers
        offer.color = 'grey';
        offer.correspondantsCount = -1;
        offer.interestedCount = -1;
        this.globalOfferList[1].list.push(offer);
      }
    }
    //placing obsolete offers in the botton of the list
    this.globalOfferList[0].list = this.globalOfferList[0].list.concat(obsoleteOffers);
  }

  sortOffers(){
    this.globalOfferList[0].list.sort((a, b) => {
     return b.correspondantsCount - a.correspondantsCount;
     })
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
        this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, offer, this.projectTarget);
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
      this.sharedService.setCurrentOffer(offer);
      this.router.navigate(['search/results']);
    });

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
      this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, offer, this.projectTarget);
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

  watchTypeOfferModel() {
    this.alerts = [];
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }

  goToJobyerInterestList(offer) {
    this.sharedService.setCurrentAdv(null);
    this.sharedService.setCurrentOffer(offer);
    this.router.navigate(['offer/jobyer/list']);
  }
}
