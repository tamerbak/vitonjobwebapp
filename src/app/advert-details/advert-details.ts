import {Component} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {AdvertService} from "../../providers/advert.service";
import {AlertComponent} from "ng2-bootstrap/components/alert";

@Component({
  selector: '[advert-details]',
  template: require('./advert-details.html'),
  styles: [require('./advert-details.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent],
  providers:[AdvertService]
})

export class AdvertDetails{
  currentUser: any;
  projectTarget: string;
  advert: any;
  jobyerInterestLabel: string;
  jobyerInterested: boolean;
  alerts: Array<Object>;
  isEmployer: boolean;
  contractForm: any[] = [];

  constructor(private sharedService: SharedService,
              private router: Router,
              private advertService : AdvertService) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    } else {
      this.router.navigate(['home']);
      return;
    }
    this.isEmployer = (this.currentUser.estEmployeur || this.currentUser.estRecruteur);
    this.advert = this.sharedService.getCurrentAdv();
    this.setInterestButtonLabel();
    this.splitContractForm();
  }

  splitContractForm(){
    this.contractForm = this.advert.contractForm.split(';');
  }

  setInterestButtonLabel(){
    let currentJobyerId = this.currentUser.jobyer.id;
    this.advertService.getInterestAnnonce(this.advert.id, currentJobyerId).then((data: any) => {
      if(data && data.data && data.data.length  == 1){
        this.jobyerInterested = true;
        this.jobyerInterestLabel = "Cette annonce ne m'intéresse plus";
      }else{
        this.jobyerInterested = false;
        this.jobyerInterestLabel = "Cette annonce m'intéresse";
      }
    });
  }

  switchJobyerInterest(){
    if(this.jobyerInterested){
      this.advertService.deleteAdvertInterest(this.advert.id, this.currentUser.jobyer.id).then((data: any) => {
        if(!data || data.status != 'success'){
          this.addAlert("danger", "Erreur lors de la sauvegarde des données.");
        }else{
          this.jobyerInterestLabel = "Cette annonce m'intéresse";
          this.jobyerInterested = false;
        }
      });
    }else{
      this.advertService.saveAdvertInterest(this.advert.id, this.currentUser.jobyer.id).then((data: any) => {
        if(!data || data.status != 'success'){
          this.addAlert("danger", "Erreur lors de la sauvegarde des données.");
        }else{
          this.jobyerInterestLabel = "Cette annonce ne m'intéresse plus";
          this.jobyerInterested = true;
        }
      });
    }
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}
