import {Component,ChangeDetectorRef, ViewEncapsulation} from "@angular/core";
import {ACCORDION_DIRECTIVES, BUTTON_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {OffersService} from "../../providers/offer.service";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {ButtonNumber} from "../components/button-number/button-number";
import {ModalOptions} from "../modal-options/modal-options";
import { InfiniteScroll } from 'angular2-infinite-scroll';

declare let jQuery: any;
declare let Messenger: any;

@Component({
  selector: '[offer-type-list]',
  template: require('./offer-type-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./offer-type-list.scss')],
  directives: [ACCORDION_DIRECTIVES, ROUTER_DIRECTIVES, AlertComponent, BUTTON_DIRECTIVES, ButtonNumber, ModalOptions, InfiniteScroll],
  providers: [OffersService, ChangeDetectorRef]
})
export class OfferTypeList {
  offerList = [];

  currentUser: any;
  projectTarget: string;
  isEmployer: boolean;

  alerts: Array<Object>;

  modalParams: any = {type: '', message: ''};

  //infinite scroll
  queryOffset:number = 0;
  queryLimit:number = 5;
  loading:boolean = true;

  constructor(private sharedService: SharedService,
              public offersService: OffersService,
              private router: Router) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
      return;
    }

    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    this.isEmployer = (this.projectTarget == 'employer');
    if (!this.isEmployer) {
      this.router.navigate(['home']);
      return;
    }
  }

  ngOnInit() {
    if (this.isEmployer) {
      this.loadOffers();
    }
  }

  onScrollDown () {
    if(this.queryOffset > 0) {
      this.loadOffers();
    }
  }

  loadOffers(){
    this.loading = true;
    let userId = this.currentUser.employer.entreprises[0].id;

    this.offersService.getOffersByType("offer-type", this.queryOffset,this.queryLimit, userId, this.projectTarget).then((data: any) => {
      if (data && data.length != 0) {
        debugger;
        //this.offerList = data;
        for (let i = 0; i < data.length; i++) {
          let item = data[i];

          //pour empecher l'ajout d'offre deja existante (parfois le infinite scroll re-renvoie la derniere offre)
          let canAdd = true;
          for (let j = 0 ; j < this.offerList.length ; j++)
            if(this.offerList[j].idOffer == item.idOffer){
              canAdd = false;
              break;
            }

          //si l'offre n'est pas redondante, l'ajouter dans la liste à afficher
          if (canAdd) {
            this.offerList.push(item);
          }
        }

        this.queryOffset = this.queryOffset + this.queryLimit;
      }
      this.loading = false;
    });
  }

  goToDetailOffer(offer, toPlan?:boolean) {
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
        if (toPlan) {
          this.router.navigate(['offer/edit', {obj:'add', type: 'planif'}]);
        } else {
          this.router.navigate(['offer/edit', {obj:'detail', type: 'template'}]);
        }
      });
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
    this.router.navigate(['offer/edit', {obj:'add', type:'template'}]);
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}
