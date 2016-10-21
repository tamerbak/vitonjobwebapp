import {Component, Input} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {ModalOffers} from "../modal-offers/modal-offers";

declare var jQuery: any;

@Component({
  selector: '[modal-notification-contract]',
  template: require('./modal-notification-contract.html'),
  directives: [ROUTER_DIRECTIVES,ModalOffers]
})
export class ModalNotificationContract{
  @Input()
  jobyer: any;

  currentUser: any;
  projectTarget: string;

  showContractNotif = false;
  showOfferNotif = false;
  showAuthNotif = false;

  constructor(private sharedService: SharedService,
              private router: Router) {

  }

  ngOnInit() {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
    }else{
      this.showOfferNotif = false;
      this.showContractNotif = false;
      this.showAuthNotif = true;
      return;
    }

    this.initState()
  }

  initState(){
    let o = this.sharedService.getCurrentOffer();
    if (o != null) {
      this.showOfferNotif = false;
      this.showContractNotif = true;
      this.showAuthNotif = false;
    }else{
      this.showOfferNotif = true;
      this.showContractNotif = false;
      this.showAuthNotif = false;
    }
  }

  gotoContractForm() {
    jQuery('#modal-notification-contract').modal('hide');
    let o = this.sharedService.getCurrentOffer();
    //navigate to contract page
    if (o != null) {
      this.sharedService.setCurrentJobyer(this.jobyer);
      this.router.navigate(['app/contract/recruitment-form']);
    }
  }

  gotoModalOffers() {

    jQuery('#modal-notification-contract').modal('hide');
    jQuery('#modal-notification-contract').on('hidden.bs.modal', function () {
      jQuery('#modal-offers').modal('show');
      jQuery('#modal-notification-contract').unbind('hidden');
    })

  }

  gotoNewOffer() {
    jQuery('#modal-notification-contract').modal('hide');
    //this.sharedService.setCurrentJobyer(this.jobyer);
    this.router.navigate(['app/offer/edit', {obj:'add'}]);
  }

  close(): void {
    jQuery('#modal-notification-contract').modal('hide');
  }
}
