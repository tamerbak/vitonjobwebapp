import {Component, ViewEncapsulation} from "@angular/core";
import {AdvertService} from "../../providers/advert.service";
import {SharedService} from "../../providers/shared.service";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap";
import {ModalOptions} from "../modal-options/modal-options";
import { InfiniteScroll } from 'angular2-infinite-scroll';

declare let jQuery: any;
declare let Messenger: any;

@Component({
  selector: '[advert-list]',
  template: require('./advert-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles:[require('./advert-list.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent, ModalOptions, InfiniteScroll],
  providers:[AdvertService]
})
export class AdvertList {
  currentUser : any;
  isEmployer: boolean;
  adverts : any = [];
  modalParams: any = {type: '', message: ''};
  //determine the number of elements that should be skipped by the loading adverts query
  queryOffset: number = 0;
  //determine the number of elemens to be retrieved by the loading adverts query
  queryLimit: number = 7;

  constructor(private advertService : AdvertService,
              private router : Router,
              private sharedService : SharedService){
    this.currentUser = this.sharedService.getCurrentUser();

    if(!this.currentUser){
      this.router.navigate(['home']);
      return;
    }
    this.isEmployer = (this.currentUser.estEmployeur || this.currentUser.estRecruteur);
  }

  ngOnInit(){
    this.adverts = [];
    this.loadAdverts();
  }

  loadAdverts(){
    if (this.isEmployer) {
      let entrepriseId = this.currentUser.employer.entreprises[0].id;
      this.advertService.loadAdvertsByEntreprise(entrepriseId, this.queryOffset, this.queryLimit).then((data: any) => {
        if(data){
          this.adverts = this.adverts.concat(data);
          this.queryOffset = this.queryOffset + this.queryLimit;
        }else{
          Messenger().post({
            message: "Une erreur est survenue lors du chargement des annonces.",
            type: 'error',
            showCloseButton: true
          });
        }
      })
    } else {
      this.advertService.loadAdverts(this.queryOffset, this.queryLimit).then((data: any) => {
        if(data){
          this.adverts = this.adverts.concat(data);
          this.queryOffset = this.queryOffset + this.queryLimit;
        }else{
          Messenger().post({
            message: "Une erreur est survenue lors du chargement des annonces.",
            type: 'error',
            showCloseButton: true
          });
        }
      })
    }
  }

  goToNewAdvert(){
    this.router.navigate(['advert/edit', {type:'add'}]);
  }

  gotoAdvertDetails(adv){
    this.advertService.loadAdvert(adv).then((data: any) => {
      if(data) {
        this.sharedService.setCurrentAdv(data);
        this.router.navigate(['advert/details']);
      }else{
        Messenger().post({
          message: "Une erreur est survenue lors du chargement de l'annonce.",
          type: 'error',
          showCloseButton: true
        });
      }
    })
  }

  gotoEditAdvert(adv){
    this.advertService.loadAdvert(adv).then((data: any) => {
      if(data) {
        this.sharedService.setCurrentAdv(data);
        this.router.navigate(['advert/edit', {type: 'detail'}]);
      }else{
        Messenger().post({
          message: "Une erreur est survenue lors du chargement de l'annonce.",
          type: 'error',
          showCloseButton: true
        });
      }
    })
  }

  deleteAdv(adv){
    this.modalParams.type = "adv.delete";
    this.modalParams.message = "Êtes-vous sûr de vouloir supprimer l'annonce " + '"' + adv.titre + '"' + " ?";
    this.modalParams.btnTitle = "Supprimer l'annonce";
    this.modalParams.btnClasses = "btn btn-danger";
    this.modalParams.modalTitle = "Suppression de l'annonce";
    this.modalParams.object = adv;
    jQuery("#modal-options").modal('show');
    var self = this;
    jQuery('#modal-options').one('hidden.bs.modal', function (e) {
      self.queryOffset = 0;
      self.adverts = [];
      self.loadAdverts();
    });
  }

  goToAdvJobyerInterestList(adv){
    this.sharedService.setCurrentAdv(adv);
    this.sharedService.setCurrentOffer(null);
    this.router.navigate(['advert/jobyer/list']);
  }

  onScrollDown () {
    if(this.queryOffset > 0){
      this.loadAdverts();
    }
  }
}
