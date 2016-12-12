import {Component, ViewEncapsulation} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {AdvertService} from '../../providers/advert.service';
import {Utils} from "../utils/utils";

@Component({
  selector: '[advert-jobyer-list]',
  template: require('./advert-jobyer-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./advert-jobyer-list.scss')],
  directives: [ROUTER_DIRECTIVES],
  providers: [AdvertService]
})

export class AdvertJobyerList{
  currentUser: any;
  projectTarget: string;
  jobyerList = [];
  advert: any;

  constructor(private sharedService: SharedService,
              private router: Router,
              private advertService: AdvertService) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser || (!this.currentUser.estEmployeur && !this.currentUser.estRecruteur)) {
      this.router.navigate(['home']);
      return;
    }
    this.projectTarget = (this.currentUser.estEmployeur || this.currentUser.estRecruteur ? 'employer' : 'jobyer');
    if (this.projectTarget == "jobyer") {
      this.router.navigate(['home']);
    }
  }

  ngOnInit() {
    this.advert = this.sharedService.getCurrentAdv();
    this.advertService.getInterestedJobyers(this.advert.id).then((data: any) => {
      if (data && data.status == "success" && data.data) {
        this.jobyerList = data.data
      }
    })
  }

  goToJobyerProfile(jobyer) {
    this.sharedService.setSelectedJobyer(jobyer);
    //this.router.navigate(['profile', {obj: 'adv'}]);
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }

  preventNull(str) {
    return Utils.preventNull(str);
  }

  ngOnDestroy(): void {
    this.sharedService.setCurrentAdv(null);
  }
}
