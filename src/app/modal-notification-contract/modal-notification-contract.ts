import {Component, Input, SimpleChanges} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {ModalOffers} from "../modal-offers/modal-offers";
import {Utils} from "../utils/utils";
import {ProfileService} from "../../providers/profile.service";

declare let jQuery: any;

@Component({
  selector: '[modal-notification-contract]',
  template: require('./modal-notification-contract.html'),
  directives: [ROUTER_DIRECTIVES,ModalOffers],
  providers: [ProfileService]
})
export class ModalNotificationContract{
  @Input()
  jobyer: any;
  @Input()
  offer: any;
  @Input()
  subject: string;

  currentUser: any;
  projectTarget: string;

  showContractNotif = false;
  showOfferNotif = false;
  showAuthNotif = false;
  initByModalOffers = false;
  hasOffers: boolean;

  constructor(private sharedService: SharedService,
              private profileService: ProfileService,
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
    if (this.currentUser.estEmployeur) {
      this.profileService.hasOffers(this.currentUser.employer.entreprises[0].id).then((hasOffers: boolean) => {
        this.hasOffers = hasOffers;
      });
    } else {
      this.hasOffers = false;
    }
    this.initState({});
  }

  initState(params){
    this.initByModalOffers = params.init;
    if(!this.currentUser){
      this.showOfferNotif = false;
      this.showContractNotif = false;
      this.showAuthNotif = true;
      return;
    }
    let o = this.sharedService.getCurrentOffer();
    if (o != null || !Utils.isEmpty(this.offer)) {
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
    if (Utils.isEmpty(o)) {
      this.sharedService.setCurrentOffer(this.offer);
    }
    this.sharedService.setCurrentJobyer(this.jobyer);
    this.router.navigate(['contract/recruitment-form']);
  }

  gotoModalOffers() {
    jQuery('#modal-notification-contract').modal('hide');
    jQuery('#modal-notification-contract').on('hidden.bs.modal', function () {
      jQuery('#modal-offers').modal({
        keyboard: false,
        backdrop: 'static'
      });
      jQuery('#modal-offers').modal('show');
      jQuery('#modal-notification-contract').unbind('hidden');
    })
  }

  gotoNewOffer() {
    jQuery('#modal-notification-contract').modal('hide');
    //this.sharedService.setCurrentJobyer(this.jobyer);
    this.router.navigate(['offer/edit', {obj:this.subject}]);
  }

  gotoLogin(){
    jQuery('#modal-notification-contract').modal('hide');
    this.router.navigate(['login', {obj:'recruit'}]);
  }

  gotoSignUp() {
    jQuery('#modal-notification-contract').modal('hide');
    this.router.navigate(['signup', {
      obj: 'recruit'
    }]);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initState({});
  }

  close(): void {
     jQuery('#modal-notification-contract').modal('hide');
     if(this.initByModalOffers == true){
       this.sharedService.setCurrentOffer(null);
       this.initState({init:true});
     }
  }
}
