import {Component, Input} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";

declare var jQuery: any;

@Component({
  selector: '[modal-notification-contract]',
  template: require('./modal-notification-contract.html'),
  directives: [ROUTER_DIRECTIVES]
})
export class ModalNotificationContract{
  @Input()
  jobyer: any;
  //@Input()
  obj: string;

  currentUser: any;
  projectTarget: string;

  showContractNotif = false;
  showOfferNotif = false;

  constructor(private sharedService: SharedService,
              private router: Router) {

  }

  ngOnInit() {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');

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

  close(): void {
    jQuery('#modal-notification-contract').modal('hide');
  }
}