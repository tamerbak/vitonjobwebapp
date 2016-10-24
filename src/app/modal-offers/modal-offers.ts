import {Component, NgZone, ViewEncapsulation, ViewChild, EventEmitter, Input, Output} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {AuthenticationService} from "../../providers/authentication.service";
import {OffersService} from "../../providers/offer.service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";
import {AddressUtils} from "../utils/addressUtils";
import {MapsAPILoader} from "angular2-google-maps/core";
import MaskedInput from "angular2-text-mask";

declare var jQuery, Messenger,md5: any;

@Component({
  selector: '[modal-offers]',
  template: require('./modal-offers.html'),
  directives: [ROUTER_DIRECTIVES, AlertComponent, MaskedInput],
  providers: [Utils, AuthenticationService,OffersService],
  styles: [require('./modal-offers.scss')]
})

export class ModalOffers{
  @Input()
  jobyer: any;

  @Output()
  refresh = new EventEmitter<any>();

  offerList = [];
  offerListToShow = [];

  msgWelcome1:string;



  projectTarget:string;
  currentUser: any;
  isEmployer: boolean;
  isRecruiter: boolean;
  accountId: string;
  userRoleId: string;

  //styles && vars
  validation: boolean = false;

  constructor(private authService: AuthenticationService,
              private sharedService: SharedService,
              private offersService:OffersService,
              private zone: NgZone,
              private router: Router,
              private _loader: MapsAPILoader) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      return;
    } else {
      this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
      this.msgWelcome1 = "Bienvenue dans Vit-On-Job";

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
      : this.sharedService.getCurrentUser().jobyer.offers
    ;
    //console.log(this.offerList);
    for (let i = 0; i < this.offerList.length; i++) {
      let offer = this.offerList[i];
      if (!offer || !offer.jobData) {
        continue;
      }

        //verify if offer is obsolete
        for (let j = 0; j < offer.calendarData.length; j++) {
          var slotDate = offer.calendarData[j].date;
          var startH = this.offersService.convertToFormattedHour(offer.calendarData[j].startHour);
          slotDate = new Date(slotDate).setHours(+(startH.split(':')[0]), +(startH.split(':')[1]));
          var dateNow = new Date().getTime();
          if (slotDate <= dateNow) {
            offer.obsolete = true;
            break;
          } else {
            offer.obsolete = false;
            this.offerListToShow.push(offer);
          }
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
    this.router.navigate(['app/offer/edit', {obj:'edit'}]);
  }

  gotoNewOffer() {
    jQuery('#modal-offers').modal('hide');
    this.router.navigate(['app/offer/edit', {obj:'add'}]);
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
