import {Component, ViewEncapsulation} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ProfileService} from "../../providers/profile.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {AdvertService} from '../../providers/advert.service';
import {Utils} from "../utils/utils";

@Component({
  selector: '[advert-jobyer-list]',
  template: require('./advert-jobyer-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./advert-jobyer-list.scss')],
  directives: [ROUTER_DIRECTIVES],
  providers: [AdvertService, ProfileService]
})

export class AdvertJobyerList{
  currentUser: any;
  projectTarget: string;
  jobyerList = [];

  offer: any;
  advert: any;

  constructor(private sharedService: SharedService,
              private router: Router,
              private advertService: AdvertService,
              private profileService: ProfileService) {
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
    this.offer = this.sharedService.getCurrentOffer();
    this.advert = this.sharedService.getCurrentAdv();

    if (this.offer != null) {
      this.advertService.getInterestedJobyersOffer(this.offer.idOffer).then((data: any) => {
        if (data && data.status == "success" && data.data) {
          this.jobyerList = data.data
        }
      })
    } else {
      this.advertService.getInterestedJobyers(this.advert.id).then((data: any) => {
        if (data && data.status == "success" && data.data) {
          this.jobyerList = data.data
        }
      })
    }
  }

  goToJobyerProfile(jobyer) {
    this.profileService.getJobyerInfo(jobyer.jobyerid).then((data: any) => {
      if(data && data._body.length != 0 && data.status == "200"){
        let j = JSON.parse(data._body);
        this.sharedService.setSelectedJobyer(j);
        this.router.navigate(['profile/jobyer']);
      }
    })
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
