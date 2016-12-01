import {Component, ViewEncapsulation} from "@angular/core";
import {AdvertService} from "../../providers/advert.service";
import {SharedService} from "../../providers/shared.service";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {ACCORDION_DIRECTIVES, AlertComponent} from "ng2-bootstrap";

@Component({
  selector: '[advert-list]',
  template: require('./advert-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles:[require('./advert-list.scss')],
  directives: [ACCORDION_DIRECTIVES, ROUTER_DIRECTIVES, AlertComponent],
  providers:[AdvertService, SharedService]
})
export class AdvertList {
  currentUser : any;
  adverts : any = [];

  constructor(private advertService : AdvertService,
              private router : Router,
              private sharedService : SharedService){
    this.currentUser = this.sharedService.getCurrentUser();

    if(!this.currentUser || (!this.currentUser.estEmployeur && !this.currentUser.estRecruteur)){
      this.router.navigate(['home']);
    }

  }

  ngOnInit(){
    this.advertService.loadAdverts(this.currentUser.employer.entreprises[0].id).then((data:any)=>{
      this.adverts = data;
    });
  }

  goToNewAdvert(){
    this.router.navigate(['advert/edit', {obj:'add'}]);
  }

  updateAdv(adv){
    this.sharedService.setCurrentAdv(adv);
    this.router.navigate(['advert/edit', {obj:'edit'}]);
  }

  deleteAdv(adv){

  }

  simplifyDate(date : Date){
    return "";
  }
}
