import {Component, Input} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {OffersService} from "../../providers/offer.service";
import {MissionService} from "../../providers/mission-service";
import {SmsService} from "../../providers/sms-service";
import {AdvertService} from "../../providers/advert.service";
import {Utils} from "../utils/utils";
import {LOGIN_BEFORE_ADVERT_POSTULAT} from "../../configurations/appConstants";

declare let jQuery: any;
declare let Messenger: any;

@Component({
  selector: 'modal-options',
  directives: [ROUTER_DIRECTIVES],
  providers: [OffersService, AdvertService, SmsService, MissionService],
  template: require('./modal-options.html'),
  styles: [require('./modal-options.scss')]
})

export class ModalOptions{

  @Input() params: any;

  currentUser: any = null;
  projectTarget: any;
  processing: boolean = false;

  constructor(private sharedService: SharedService,
              private offersService: OffersService,
              private advertService: AdvertService,
              private missionService: MissionService,
              private smsService: SmsService,
              private router: Router) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.projectTarget = this.sharedService.getProjectTarget();
    } else {
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    }
  }

  launchOperation() {

    if (this.params.type === 'offer.delete') {
      this.deleteOffer();
    } else if (this.params.type === 'offer.copy') {
      this.copyOffer();
    } else if (this.params.type === 'adv.delete') {
      this.deleteAdvert();
    } else if (this.params.type === 'mission.delete') {
      this.deleteMission();
    } else if (this.params.type === 'offer.annonce') {
      this.goToAdvertEdit();
    }else if (this.params.type === LOGIN_BEFORE_ADVERT_POSTULAT){
      this.goToLoginPage();
    }
  }

  cancelOperation(){
    if (this.params.type === 'offer.annonce') {
      this.router.navigate(['offer/list']);
    }else if(this.params.type === LOGIN_BEFORE_ADVERT_POSTULAT) {
      this.sharedService.setRedirectionArgs(null);
      jQuery("#modal-options").modal('hide');
    }
  }

  deleteOffer() {
    this.processing = true;
    var offer = this.sharedService.getCurrentOffer();
    if (!offer || !this.currentUser) {
      this.processing = false;
      jQuery("#modal-options").modal('hide');
      return;
    }
    this.offersService.deleteOffer(offer, this.projectTarget).then((data: any) => {
      /*if (this.projectTarget == 'employer') {
        let rawData = this.currentUser.employer;
        if (rawData && rawData.entreprises && rawData.entreprises[0].offers) {
          let index = -1;
          for (let i = 0; i < this.currentUser.employer.entreprises[0].offers.length; i++) {
            if (this.currentUser.employer.entreprises[0].offers[i].idOffer == offer.idOffer) {
              index = i;
              break;
            }
          }
          if (index >= 0) {
            this.currentUser.employer.entreprises[0].offers.splice(index, 1);
          }
          this.sharedService.setCurrentUser(this.currentUser);
        }
      } else {
        let rawData = this.currentUser.jobyer;
        if (rawData && rawData.offers) {
          let index = -1;
          for (let i = 0; i < this.currentUser.jobyer.offers.length; i++) {
            if (this.currentUser.jobyer.offers[i].idOffer == offer.idOffer) {
              index = i;
              break;
            }
          }
          if (index >= 0) {
            this.currentUser.jobyer.offers.splice(index, 1);
          }
          this.sharedService.setCurrentUser(this.currentUser);
        }
      }
      this.sharedService.setCurrentUser(this.currentUser);*/


      Messenger().post({
        message: "l'offre " + "'" + offer.title + "'" + " a été supprimée avec succès",
        type: 'success',
        showCloseButton: true
      });
      this.sharedService.setCurrentOffer(null);
      this.processing = false;
      jQuery("#modal-options").modal('hide');
      this.router.navigate(['offer/list']);
    });
  }

  copyOffer() {
    this.processing = true;
    let offer = this.sharedService.getCurrentOffer();
    if (!offer) {
      this.processing = false;
      jQuery("#modal-options").modal('hide');
      return;
    }

    //this.offersService.setOfferInLocal(offer, this.projectTarget);
    this.offersService.copyOffer(offer, this.projectTarget, '').then((data: any) => {
      Messenger().post({
        message: "l'offre " + "'" + offer.title + "'" + " a été copiée avec succès",
        type: 'success',
        showCloseButton: true
      });
      this.processing = false;
      jQuery("#modal-options").modal('hide');
      this.router.navigate(['offer/list', {typeOfferModel: '0'}]);
    });
  }

  deleteAdvert() {
    this.processing = true;
    let advert = this.params.object;
    if (!advert) {
      this.processing = false;
      jQuery("#modal-options").modal('hide');
      return;
    }

    this.advertService.deleteAdvert(advert.id).then((data: any) => {
      if (!data || data.status == "failure") {
        Messenger().post({
          message: "Une erreur est survenue lors de la suppression de l'annonce " + advert.titre,
          type: 'error',
          showCloseButton: true
        });
      }else {
        Messenger().post({
          message: "L'annonce " + "'" + advert.titre + "'" + " a été supprimée avec succès",
          type: 'error',
          showCloseButton: true
        });
      }
      this.processing = false;
      jQuery("#modal-options").modal('hide')
    });
  }

  deleteMission() {
    this.processing = true;
    var mission = this.sharedService.getCurrentMission();
    if (!mission) {
      this.processing = false;
      jQuery("#modal-options").modal('hide');
      return;
    }

    let role = this.projectTarget == 'employer' ? 'employer' : 'jobyer';
    this.missionService.cancelMission(mission.pk_user_contrat, role).then((data: any)=> {
      Messenger().post({
        message: "la mission " + "'" + mission.titre + "'" + " a été annulée avec succès",
        type: 'success',
        showCloseButton: true
      });

      this.missionService.getTelByJobyer(mission.fk_user_jobyer).then((data: any) => {
        let jobyerPhone = data.data[0].telephone;
        this.smsService.sendSms(
          jobyerPhone,
          (role == "employer" ? (
              (mission.signature_jobyer.toUpperCase() == "OUI")
                ? "Bonjour, suite à votre demande, nous vous confirmons l'annulation de la signature du contrat numéro : " + mission.numero
                : "Bonjour, suite à votre demande, nous vous confirmons l'annulation du contrat numéro : " + mission.numero + " en conséquence de l'absence de signature du jobyer"
            ) : (
              (mission.signature_jobyer.toUpperCase() == "OUI")
                ? "Bonjour, suite à la demande du jobyer, nous vous confirmons l'annulation du contrat numéro : " + mission.numero + " en conséquence de l'absence de signature de votre signature"
                : "Bonjour, suite à la demande du jobyer, nous vous confirmons l'annulation de la signature du contrat numéro : " + mission.numero
            )
          ));
      });
      this.missionService.getTelByEmployer(mission.fk_user_entreprise).then((data: any) => {
        let employerPhone = data.data[0].telephone;
        this.smsService.sendSms(
          employerPhone,
          (role == "employer" ? (
              (mission.signature_jobyer.toUpperCase() == "OUI")
                ? "Bonjour, suite à la demande de l'employeur, nous vous confirmons l'annulation de la signature du contrat numéro : " + mission.numero
                : "Bonjour, suite à la demande de l'employeur, nous vous confirmons l'annulation du contrat numéro : " + mission.numero + " en conséquence de l'absence de signature de votre signature"
            ) : (
              (mission.signature_jobyer.toUpperCase() == "OUI")
                ? "Bonjour, suite à votre demande, nous vous confirmons l'annulation du contrat numéro : " + mission.numero + " en conséquence de l'absence de signature de l'employeur"
                : "Bonjour, suite à votre demande, nous vous confirmons l'annulation de la signature du contrat numéro : " + mission.numero
            )
          ));
      });

      this.sharedService.setCurrentMission(null);
      this.processing = false;
      jQuery("#modal-options").modal('hide');
      this.router.navigate(['mission/list',{type:2}]);
    });
  }

  goToAdvertEdit(){
    jQuery("#modal-options").modal('hide');
    let advert = this.params.advert;
    let type;
    if(Utils.isEmpty(advert)){
      type = 'add';
    } else {
      type = "detail";
      this.sharedService.setCurrentAdv(advert);
    }

    let obj = this.params.obj;
    let fromOffer = this.params.fromOffer;
    if(!obj){
      this.router.navigate(['advert/edit', {type: type, fromOffer: fromOffer}]);
    }else{
      this.router.navigate(['advert/edit', {type: type, obj: obj, fromOffer: fromOffer}]);
    }
  }

  goToLoginPage(){
    jQuery("#modal-options").modal('hide');
    this.router.navigate(['login']);
  }
}
