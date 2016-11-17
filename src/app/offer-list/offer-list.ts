import {Component,ChangeDetectorRef, ViewEncapsulation} from "@angular/core";
import {ACCORDION_DIRECTIVES, BUTTON_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {OffersService} from "../../providers/offer.service";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {SearchService} from "../../providers/search-service";
import {Utils} from "../utils/utils";
import {NotificationsService} from "../../providers/notifications.service";
declare var jQuery,Messenger:any;

@Component({
  selector: '[offer-list]',
  template: require('./offer-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./offer-list.scss')],
  directives: [ACCORDION_DIRECTIVES, ROUTER_DIRECTIVES, AlertComponent, BUTTON_DIRECTIVES],
  providers: [OffersService, SearchService,ChangeDetectorRef]
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

  loadOffers(){
    this.globalOfferList.length = 0;
    this.globalOfferList.push({header: 'Mes offres en ligne', list: []});
    this.globalOfferList.push({header: 'Mes brouillons', list: []});
    this.offerList = this.projectTarget == 'employer'
      ? this.sharedService.getCurrentUser().employer.entreprises[0].offers
      : this.sharedService.getCurrentUser().jobyer.offers;
    let obsoleteOffers = [];
    for (let i = 0; i < this.offerList.length; i++) {
      let offer = this.offerList[i];

      //load offer epi
      this.offersService.loadOfferEPI(this.offerList[i].idOffer,this.projectTarget).then((data:any)=>{
        this.offerList[i].jobData.epi = [];
        for(let j = 0 ; j < data.length ; j++)
          this.offerList[i].jobData.epi.push(data[j].libelle);
      });

      if(this.projectTarget == 'employer'){
        this.offersService.loadOfferPrerequisObligatoires(this.offerList[i].idOffer).then((data:any)=>{
          this.offerList[i].jobData.prerequisObligatoires = [];
          for(let j = 0 ; j < data.length ; j++)
            this.offerList[i].jobData.prerequisObligatoires.push(data[j].libelle);
        });

      }else if(this.projectTarget == 'jobyer'){
        this.offersService.loadOfferNecessaryDocuments(this.offerList[i].idOffer).then((data:any)=>{
          this.offerList[i].jobData.prerequisObligatoires = [];
          for(let j = 0 ; j < data.length ; j++)
            this.offerList[i].jobData.prerequisObligatoires.push(data[j].libelle);
        });
      }

      if (!offer || !offer.jobData || !offer.calendarData ||(offer.calendarData && offer.calendarData.length == 0)) {
        continue;
      }

      if (offer.visible) {
        offer.color = 'black';
        offer.correspondantsCount = -1;

        //verify if offer is obsolete
        for (let j = 0; j < offer.calendarData.length; j++) {
          var slotDate = offer.calendarData[j].date;
          var startH = this.offersService.convertToFormattedHour(offer.calendarData[j].startHour);
          slotDate = new Date(slotDate).setHours(+(startH.split(':')[0]), +(startH.split(':')[1]));
          var dateNow = new Date().getTime();
          if (slotDate <= dateNow) {
            offer.obsolete = true;
            obsoleteOffers.push(offer);
            break;
          } else {
            offer.obsolete = false;
            this.globalOfferList[0].list.push(offer);
          }
        }


        /*this.offersService.getCorrespondingOffers(offer, this.projectTarget).then((data: any)=> {
          offer.correspondantsCount = data.length;
          // Sort offers corresponding to their search results :
          this.globalOfferList[0].list.sort((a, b) => {
            return b.correspondantsCount - a.correspondantsCount;
          })
        });*/
        if(!offer.obsolete) {
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
            offer.correspondantsCount = data.length;
          });
        }
      } else {
        offer.color = 'grey';
        offer.correspondantsCount = -1;
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
    this.sharedService.setCurrentOffer(offer);
    this.router.navigate(['offer/edit', {obj:'detail'}]);
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
        this.addAlert("info", "Votre offre a bien été déplacée dans «Mes offres en brouillon».");
      }
    });
  }

  watchTypeOfferModel() {
    this.alerts = [];
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}
