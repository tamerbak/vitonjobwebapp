import {Component, ViewEncapsulation, ViewChild} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {ProfileService} from "../../providers/profile.service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";
import {AddressUtils} from "../utils/addressUtils";
import {Configs} from "../../configurations/configs";
import {Helpers} from "../../providers/helpers.service";
import {DateUtils} from "../utils/date-utils";

@Component({
  selector: '[profile-jobyer]',
  template: require('./profile-jobyer.html'),
  directives: [ROUTER_DIRECTIVES],
  providers: [Utils, ProfileService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile-jobyer.scss')]
})
export class ProfileJobyer{
  currentUser: any;
  jobyer: any;
  isFrench: boolean;
  isEuropean: boolean;
  isCIN: boolean;
  jobs : any = [];

  constructor(private profileService: ProfileService,
              private sharedService: SharedService,
              private router: Router) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
      return;
    }
    this.jobyer = this.sharedService.getSelectedJobyer();
    if (!this.jobyer) {
      this.router.navigate(['home']);
      return;
    }

    //specify if jobyer isFrench or european or a foreigner
    this.isFrench = (this.jobyer.paysIndex == 33 ? true : false);
    this.isEuropean = (this.jobyer.identifiantNationalite == 42 ? false : true);
    this.jobyer.stateLib = (this.isEuropean ? 'EU, EEEE' : 'Autres');
    this.isCIN = this.isFrench || this.isEuropean;

    //load profile picture
    this.jobyer.photo = "../assets/images/avatar.png";
    this.profileService.loadProfilePicture(this.jobyer.accountId).then((data: any) =>{
      if (data && data.data && data.data[0] && !Utils.isEmpty(data.data[0].encode) && data.data[0].encode.startsWith("data:image/")) {
        this.jobyer.photo = data.data[0].encode;
      }else{
        this.jobyer.photo = "../assets/images/avatar.png";
      }
    })
  }

  toDateString(d: number){
    return DateUtils.toDateString(d);
  }

  toHourString(m: number){
    return DateUtils.toHourString(m);
  }

  simpleDateFormat(d:Date){
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = (da < 10 ? '0' : '')+da+'/' + (m < 10 ? '0' : '') + m + "/" +d.getFullYear() ;
    return sd
  }
  simpleHourFormat(h : number){
    let s = '';
    s=s+(h/60).toFixed(0);
    s=s+':';
    s=s+(h%60);
    return s;
  }

  downloadFile(content) {
    var url = "data:application/octet-stream;base64," + content;
    window.open(url);
  }

  initRequirements(){
    this.profileService.loadOffersByJobyerId(this.jobyer.id).then((data: any) => {
      if(data && data.data && data.status == "success") {
        let offers = data.data;
        for (let i = 0; i < offers.length; i++) {
          let jd = offers[i].jobData;
          let found = false;

          for (let j = 0; j < this.jobs.length; j++)
            if (this.jobs[j].id == jd.idJob) {
              found = true;
              break;
            }

          if (found)
            continue;

          this.jobs.push({
            id: jd.idJob,
            libelle: jd.job,
            requirements: []
          });
        }

        for (let i = 0; i < this.jobs.length; i++)
          this.profileService.loadRequirementsByJob(this.jobs[i].id).then((data: any) => {
            this.jobs[i].requirements = data;
          });
      }
    })
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }
}