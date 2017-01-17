import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {RecruitmentService} from "../../providers/recruitment-service";
import {ProfileService} from "../../providers/profile.service";
import {OffersService} from "../../providers/offer.service";
import {DateUtils} from "../utils/date-utils";
import {Utils} from "../utils/utils";
import {ModalNotificationContract} from "../modal-notification-contract/modal-notification-contract";
declare var jQuery, require: any;

@Component({
  selector: '[pending-contracts]',
  template: require('./pending-contracts.html'),
  directives: [ROUTER_DIRECTIVES, ModalNotificationContract],
  providers: [RecruitmentService, ProfileService, OffersService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pending-contracts.scss')]
})
export class PendingContracts {
  currentUser: any;
  projectTarget: string;
  jobyerList: any[] = [];
  currentJobyer: any;
  currentOffer: any;
  obj: string = "pendingContracts";

  constructor(private sharedService: SharedService,
              private recruitmentService: RecruitmentService,
              private profileService: ProfileService,
              private offerService: OffersService,
              private router: Router) {
    this.currentUser = this.sharedService.getCurrentUser();
    //only employers and recruiters can access to the contract list page
    if (!this.currentUser || (!this.currentUser.estEmployeur && !this.currentUser.estRecruteur)) {
      this.router.navigate(['home']);
      return;
    }
    this.projectTarget = (this.currentUser.estEmployeur || this.currentUser.estRecruteur ? 'employer' : 'jobyer');
    if (this.projectTarget == "jobyer") {
      this.router.navigate(['home']);
    }
    this.sharedService.setCurrentOffer(null);
  }

  ngOnInit() {
    this.recruitmentService.getNonSignedGroupedRecruitments(this.currentUser.id).then((data: any) => {
      if (data && data.status == "success" && data.data) {
        this.jobyerList = data.data
      }
    })
  }

  goToContractForm(item){
    this.sharedService.setCurrentOffer(null);
    if(!Utils.isEmpty(item.offerId)){
      this.currentOffer = this.offerService.getOfferByIdFromLocal(this.currentUser, item.offerId);
    }
    else{
      this.currentOffer = null;
    }
    this.profileService.getJobyerInfo(item.id).then((data: any) => {
      if(data && data._body.length != 0 && data.status == "200"){
        let j = JSON.parse(data._body);
        this.currentJobyer = j;
        this.currentJobyer.rgId = item.rgId;
        this.sharedService.setCurrentJobyer(this.currentJobyer);
        jQuery('#modal-notification-contract').modal({
          keyboard: false,
          backdrop: 'static'
        });
        jQuery('#modal-notification-contract').modal('show');
      }
    })
  }

  toDateString(d){
    return DateUtils.toDateString(d);
  }

  isEmpty(str){
    return Utils.isEmpty(str);
  }

  preventNull(str){
    return Utils.preventNull(str);
  }
}
