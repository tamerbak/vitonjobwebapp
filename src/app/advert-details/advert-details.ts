import {Component} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {LOGIN_BEFORE_ADVERT_POSTULAT} from "../../configurations/appConstants";
import {Router, ROUTER_DIRECTIVES, ActivatedRoute, Params} from "@angular/router";
import {AdvertService} from "../../providers/advert.service";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {Utils} from "../utils/utils";
import {ModalOptions} from "../modal-options/modal-options";
import {RedirectionArgs} from "../../dto/redirectionArgs";
import {Advert} from "../../dto/advert";
declare let jQuery: any;

@Component({
  selector: '[advert-details]',
  template: require('./advert-details.html'),
  styles: [require('./advert-details.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent, ModalOptions],
  providers:[AdvertService]
})

export class AdvertDetails{
  currentUser: any;
  projectTarget: string;
  advert: Advert = new Advert();
  isValidLink:boolean;
  jobyerInterestLabel: string;
  jobyerInterested: boolean;
  alerts: Array<Object>;
  isEmployer: boolean;
  contractForm: any[] = [];

  //for jobyers postulat redirection
  partnerCode: string = "";
  modalParams: any = {type: '', message: ''};

  constructor(private sharedService: SharedService,
              private router: Router,
              private route: ActivatedRoute,
              private advertService : AdvertService) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
      this.isEmployer = (this.currentUser.estEmployeur || this.currentUser.estRecruteur);
    } else {
      this.projectTarget = this.sharedService.getProjectTarget();
      this.isEmployer = (this.projectTarget == 'employer');
    }
    this.loadAdvert().then((data: Advert) => {
      if(!data){
        this.router.navigate(['home']);
        return;
      }else{
        this.advert = data;
        this.isValidLink = !Utils.isEmpty(this.advert.link);
        this.setInterestButtonLabel();
        this.splitContractForm();
      }
    });

    this.partnerCode = this.getPartnerCode();
    if(!Utils.isEmpty(this.partnerCode)) {
      this.forceJobyerRole();
    }
  }

  loadAdvert(){
    return new Promise (resolve => {
      let advert = this.sharedService.getCurrentAdv();
      if(!advert){
        let advertId = 0;
        this.route.params.forEach((params: Params) => {
          advertId = params['id'];
        });
        if(!Utils.isEmpty(advertId) && advertId != 0){
          this.advertService.getAdvertById(advertId).then((data: any) => {
            advert = data;
            resolve(advert);
          });
        }else{
          resolve(null);
        }
      }else{
        resolve(advert);
      }
    });
  }

  splitContractForm(){
    this.contractForm = this.advert.contractForm.split(';');
  }

  setInterestButtonLabel(){
    if(this.currentUser) {
      let currentJobyerId = this.currentUser.jobyer.id;
      this.advertService.getInterestAnnonce(this.advert.id, currentJobyerId).then((data: any) => {
        if (data && data.data && data.data.length == 1) {
          this.jobyerInterested = true;
          this.jobyerInterestLabel = "Cette annonce ne m'intéresse plus";
        } else {
          this.jobyerInterested = false;
          this.jobyerInterestLabel = "Cette annonce m'intéresse";
        }
      });
    }else{
      this.jobyerInterested = false;
      this.jobyerInterestLabel = "Cette annonce m'intéresse";
    }
  }

  switchJobyerInterest(){
    if(this.currentUser) {
      if (this.jobyerInterested) {
        this.advertService.deleteAdvertInterest(this.advert.id, this.currentUser.jobyer.id).then((data: any) => {
          if (!data || data.status != 'success') {
            this.addAlert("danger", "Erreur lors de la sauvegarde des données.");
          } else {
            this.jobyerInterestLabel = "Cette annonce m'intéresse";
            this.jobyerInterested = false;
          }
        });
      } else {
        this.advertService.saveAdvertInterest(this.advert.id, this.currentUser.jobyer.id).then((data: any) => {
          if (!data || data.status != 'success') {
            this.addAlert("danger", "Erreur lors de la sauvegarde des données.");
          } else {
            this.jobyerInterestLabel = "Cette annonce ne m'intéresse plus";
            this.jobyerInterested = true;
          }
        });
      }
    }else{
      let redirectionArgs: RedirectionArgs = {
        obj: LOGIN_BEFORE_ADVERT_POSTULAT,
        args: {
          advertId: this.advert.id,
          partnerCode: this.getPartnerCode()
        }
      };
      this.sharedService.setRedirectionArgs(redirectionArgs);
      this.modalParams.type = LOGIN_BEFORE_ADVERT_POSTULAT;
      this.modalParams.message = "Vous souhaitez postuler à cette offre d'emploi, veuillez compléter votre profil.";
      this.modalParams.btnTitle = "Compléter mon profil";
      this.modalParams.btnClasses = "btn btn-success";
      this.modalParams.modalTitle = "Postuler à l'offre";

      jQuery('#modal-options').modal({
        keyboard: false,
        backdrop: 'static'
      });
      jQuery('#modal-options').modal('show');
    }
  }

  getPartnerCode(){
    let partnerCode = "";
    this.route.params.forEach((params: Params) => {
      partnerCode = params['partnerCode'];
    });

    return Utils.preventNull(partnerCode);
  }

  forceJobyerRole(){
    if(!this.currentUser || !this.isEmployer){
      this.sharedService.setFromPartner(true);
      this.projectTarget = "jobyer";
      this.isEmployer = false;
      this.sharedService.setProjectTarget("jobyer");
    }
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}
