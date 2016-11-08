import {Component, NgZone, Input} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {OffersService} from "../../providers/offer.service";


declare var jQuery, require, Messenger: any;

@Component({
  selector: 'modal-options',
  directives: [ROUTER_DIRECTIVES],
  providers: [OffersService],
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
              private zone: NgZone,
              private router: Router) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
    } else {
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    }
  }

  launchOperation() {

    if (this.params.type === 'offer.delete') {
      this.deleteOffer()
    } else if (this.params.type === 'offer.copy') {
      this.copyOffer()
    }
  }

  deleteOffer() {
    this.processing = true;
    var offer = this.sharedService.getCurrentOffer();
    if (!offer) {
      this.processing = false;
      jQuery("#modal-options").modal('hide');
      return;
    }
    this.offersService.deleteOffer(offer, this.projectTarget).then((data: any)=> {
      if (this.projectTarget == 'employer') {
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
      this.sharedService.setCurrentUser(this.currentUser);


      Messenger().post({
        message: "l'offre " + "'" + offer.title + "'" + " a été supprimée avec succès",
        type: 'success',
        showCloseButton: true
      });
      this.sharedService.setCurrentOffer(null);
      this.processing = false;
      jQuery("#modal-options").modal('hide')
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

    offer.title = offer.title + " (Copie)";
    offer.idOffer = "";
    this.offersService.setOfferInLocal(offer, this.projectTarget);
    this.offersService.setOfferInRemote(offer, this.projectTarget).then((data: any)=> {
      Messenger().post({
        message: "l'offre " + "'" + offer.title + "'" + " a été copiée avec succès",
        type: 'success',
        showCloseButton: true
      });
      this.processing = false;
      jQuery("#modal-options").modal('hide');
      this.router.navigate(['offer/list']);
    });
  }


}
