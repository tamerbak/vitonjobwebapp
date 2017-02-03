import {Component, NgZone, ViewEncapsulation, ViewChild, EventEmitter, Input, Output} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {OffersService} from "../../providers/offer.service";
import {SharedService} from "../../providers/shared.service";

declare let jQuery: any;
declare let Messenger: any;
declare let md5: any;

@Component({
  selector: '[modal-offers]',
  template: require('./modal-offers.html'),
  directives: [ROUTER_DIRECTIVES],
  providers: [OffersService],
  styles: [require('./modal-offers.scss')]
})

export class ModalOffers{
  @Input()
  jobyer: any;

  @Output()
  refresh = new EventEmitter<any>();

  offerList = [];
  offerListToShow = [];

  projectTarget:string;
  currentUser: any;
  isEmployer: boolean;
  isRecruiter: boolean;
  accountId: string;
  userRoleId: string;

  //styles && vars
  validation: boolean = false;

  constructor(private sharedService: SharedService,
              private offersService:OffersService,
              private zone: NgZone,
              private router: Router) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      return;
    } else {
      this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
      this.getUserInfos();
    }
  }

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers(){
    this.offerListToShow = [];
    this.offerList = this.projectTarget == 'employer'
      ? this.sharedService.getCurrentUser().employer.entreprises[0].offers
      : this.sharedService.getCurrentUser().jobyer.offers;

    for (let i = 0; i < this.offerList.length; i++) {
      let offer = this.offerList[i];
      if (!offer || !offer.jobData) {
        continue;
      }

        offer.obsolete = false;
        //verify if offer is obsolete
        for (let j = 0; j < offer.calendarData.length; j++) {
          var slotDate = offer.calendarData[j].date;
          var startH = this.offersService.convertToFormattedHour(offer.calendarData[j].startHour);
          slotDate = new Date(slotDate).setHours(+(startH.split(':')[0]), +(startH.split(':')[1]));
          var dateNow = new Date().getTime();
          if (slotDate <= dateNow) {
            offer.obsolete = true;
            break;
          } 
        }
        if(offer.obsolete == false ){
          this.offerListToShow.push(offer);
        }
    }
  }

  recruite(item) {
    this.sharedService.setCurrentOffer(item);
    jQuery('#modal-offers').modal('hide');
    this.refresh.emit({init:true});
    jQuery('#modal-offers').on('hidden.bs.modal', function () {
      jQuery('#modal-notification-contract').modal('show');
      jQuery('#modal-notification-contract').unbind('hidden');
    })

  }

  goToDetailOffer(offer) {
    this.sharedService.setCurrentOffer(offer);
    jQuery('#modal-offers').modal('hide');
    this.router.navigate(['offer/edit', {obj:'edit'}]);
  }

  gotoNewOffer() {
    jQuery('#modal-offers').modal('hide');
    this.router.navigate(['offer/edit', {obj:'recruit'}]);
  }


  getUserInfos() {
    this.isEmployer = this.currentUser.estEmployeur;
    this.isRecruiter = this.currentUser.estRecruteur;
    this.accountId = this.currentUser.id;
    this.userRoleId = this.currentUser.estEmployeur ? this.currentUser.employer.id : this.currentUser.jobyer.id;
  }

  close(): void {
    this.sharedService.setCurrentOffer(null);
    jQuery('#modal-offers').modal('hide');
  }

}
