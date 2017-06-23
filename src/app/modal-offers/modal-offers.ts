import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {OffersService} from "../../providers/offer.service";
import {SharedService} from "../../providers/shared.service";
import { InfiniteScroll } from 'angular2-infinite-scroll';

declare let jQuery: any;
declare let Messenger: any;
declare let md5: any;

@Component({
  selector: '[modal-offers]',
  template: require('./modal-offers.html'),
  directives: [ROUTER_DIRECTIVES, InfiniteScroll],
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

  //infinit scroll
  queryOffset:number = 0;
  queryLimit:number = 5;
  loading:boolean = true;

  constructor(private sharedService: SharedService,
              private offersService:OffersService,
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

  loadOffers() {
    this.loading = true;
    this.offerListToShow = [];

    let userId = (this.isEmployer ? this.currentUser.employer.entreprises[0].id : this.currentUser.jobyer.id);

    this.offersService.getOffersByType('public', this.queryOffset,this.queryLimit, userId, this.projectTarget).then((data: any) => {
      if (data && data.length != 0) {
        this.offerList = data;
        for (let i = 0; i < this.offerList.length; i++) {
          let item = this.offerList[i];

          if(!item.obsolete) {
            this.offerListToShow.push(item);
          }else{
            continue;
          }
        }

        this.queryOffset = this.queryOffset + this.queryLimit;
      }
      this.loading = false;
    });
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

  onScrollDown () {
    if(this.queryOffset > 0) {
      this.loadOffers();
    }
  }

  close(): void {
    this.sharedService.setCurrentOffer(null);
    jQuery('#modal-offers').modal('hide');
  }

}
