import {Component, ViewEncapsulation} from "@angular/core";
import {AdvertService} from "../../providers/advert.service";
import {SharedService} from "../../providers/shared.service";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {ACCORDION_DIRECTIVES, AlertComponent} from "ng2-bootstrap";
import {ModalOptions} from "../modal-options/modal-options";
declare var Messenger, jQuery: any;

@Component({
  selector: '[advert-list]',
  template: require('./advert-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles:[require('./advert-list.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent, ModalOptions],
  providers:[AdvertService]
})
export class AdvertList {
  currentUser : any;
  adverts : any = [];
  modalParams: any = {type: '', message: ''};

  constructor(private advertService : AdvertService,
              private router : Router,
              private sharedService : SharedService){
    this.currentUser = this.sharedService.getCurrentUser();

    if(!this.currentUser || (!this.currentUser.estEmployeur && !this.currentUser.estRecruteur)){
      this.router.navigate(['home']);
    }
  }

  ngOnInit(){
    this.loadAdverts();
  }

  loadAdverts(){
    this.advertService.loadAdverts(this.currentUser.employer.entreprises[0].id).then((data:any)=>{
      if(data){
        this.adverts = data;
      }else{
        Messenger().post({
          message: "Une erreur est survenue lors du chargement des annonces.",
          type: 'error',
          showCloseButton: true
        });
      }
    });
  }

  goToNewAdvert(){
    this.router.navigate(['advert/edit', {obj:'add'}]);
  }

  updateAdv(adv){
    this.advertService.loadAdvert(adv).then((data: any) => {
      if(data) {
        this.sharedService.setCurrentAdv(data);
        this.router.navigate(['advert/edit', {obj: 'detail'}]);
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
    jQuery('#modal-options').on('hidden.bs.modal', function (e) {
      self.loadAdverts();
    });
  }
}
