import {Component, ViewEncapsulation} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ProfileService} from "../../providers/profile.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {AdvertService} from '../../providers/advert.service';
import {Utils} from "../utils/utils";
import {RedirectionArgs} from "../../dto/redirectionArgs";
import {REDIRECT_FROM_JOBYER_PROFIL, REDIRECT_TO_JOBYER_PROFIL} from "../../configurations/appConstants";


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

    let currentOffer = this.sharedService.getCurrentOffer();
    let currentAdvert = this.sharedService.getCurrentAdv();
    let offerArg;
    let advertArg;
    let redirectedArgs = this.sharedService.getRedirectionArgs();
    if(redirectedArgs && redirectedArgs.obj == REDIRECT_FROM_JOBYER_PROFIL && redirectedArgs.args){
      offerArg = redirectedArgs.args.offer;
      advertArg = redirectedArgs.args.advert;
    }
    this.offer = (currentOffer ? currentOffer : offerArg);
    this.advert = (currentAdvert ? currentAdvert : advertArg);

    if(!this.offer && !this.advert){
      this.router.navigate(['home']);
      return;
    }
  }

  ngOnInit() {
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
        let redirectionArgs = new RedirectionArgs();
        redirectionArgs.obj = REDIRECT_TO_JOBYER_PROFIL;
        redirectionArgs.args = {offer: this.offer, advert: this.advert};
        this.sharedService.setRedirectionArgs(redirectionArgs);
        this.router.navigate(['profile/jobyer']);
      }
    });
  }

  goBack(){
    this.router.navigate(['advert/list']);
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }

  preventNull(str) {
    return Utils.preventNull(str);
  }

  ngOnDestroy(): void {
    this.sharedService.setCurrentAdv(null);
    //il faut nettoyer redirectionArgs si on n'est pas redirigé vers la page profile du jobyer, sinon on risque d'acceder ultérieurement à la liste des jobyers qui contient des données non intègre
    let redirectedArgs = this.sharedService.getRedirectionArgs();
    if(redirectedArgs && redirectedArgs.obj != REDIRECT_TO_JOBYER_PROFIL){
      this.sharedService.setRedirectionArgs(null);
    }
  }
}
