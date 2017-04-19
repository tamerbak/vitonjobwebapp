import {Component, ViewEncapsulation} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap";
import {AuthenticationService} from "../../providers/authentication.service";
import {LoadListService} from "../../providers/load-list.service";
import {ValidationDataService} from "../../providers/validation-data.service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";
import {CampaignService} from "../../providers/campaign-service";
declare function md5(value: string): string;
declare let Messenger;


@Component({
  directives: [AlertComponent],
  selector: '[signup]',
  template: require('./signup.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./signup.scss')],
  providers: [AuthenticationService, LoadListService, ValidationDataService, CampaignService]
})
export class SignupPage{
  isRedirectedFromHome : boolean;
  alerts: Array<Object>;
  pays : any = [];
  index : any;
  phone : any;
  isIndexValid : boolean;
  isPhoneNumValid : boolean;
  email : string;
  emailExists : boolean;
  phoneExists : boolean;
  password1 : string;
  showHidePasswdIcon : string;
  password2 : string;
  showHidePasswdConfirmIcon : string;
  hideLoader : boolean;

  role : string;
  obj : any;

  annee : any;

  codePromo: string;

  constructor(private loadListService: LoadListService,
              private authService: AuthenticationService,
              private validationDataService: ValidationDataService,
              private sharedService: SharedService,
              private router: Router,
              private route: ActivatedRoute,
              private campaignService: CampaignService) {
  }

  ngOnInit(): void {
    this.index = 33;
    this.role = "employer";
    this.isPhoneNumValid = true;
    this.isIndexValid = true;
    this.hideLoader = true;
    //load countries list
    this.loadListService.loadCountries(this.role).then((data: any) => {
      this.pays = data.data;
    });
    this.showHidePasswdIcon = "fa fa-eye";
    this.showHidePasswdConfirmIcon = "fa fa-eye";

    let fromPage = this.sharedService.getFromPage();
    if (fromPage == "home") {
      this.isRedirectedFromHome = true;
    } else {
      this.isRedirectedFromHome = false;
    }

    //get params
    this.route.params.forEach((params: Params) => {
      this.obj = params['obj'];
    });

    let d = new Date();
    this.annee = d.getFullYear();
  }

  signup(){
    if (this.isAuthDisabled()) {
      return;
    }
    if(!Utils.isEmpty(this.codePromo)) {
      this.hideLoader = false;

      this.campaignService.getCampaignByCode(this.codePromo).then((data: any) => {
        if (!data || Utils.isEmpty(data._body) || data._body == "[]" || data.status != 200) {
          this.addAlert("danger", "Il n'existe pas de campagne avec le code promo renseigné.");
          this.hideLoader = true;
          return;
        }else{
          this.saveAccount();
        }
      });
    }else{
      this.saveAccount();
    }
  }

  saveAccount(){
    let indPhone=this.index+""+this.phone;
    let pwd = md5(this.password1);
    this.authService.authenticate(this.email, indPhone, pwd, this.role, false).then((data:any)=>{
      this.hideLoader = true;
      this.sharedService.setProfilImageUrl(null);
      //case of authentication failure : server unavailable or connection probleme
      if (!data || data.length == 0 || (data.id == 0 && data.status == "failure")) {
        this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
        return;
      }
      this.sharedService.setStorageType("local");
      this.sharedService.setCurrentUser(data);

      //sauvegarder l'inscription de l'utilisateur à la campagne avec le code promo renseigné
      if(!Utils.isEmpty(this.codePromo)){
        this.campaignService.subscribeToCampaign(this.codePromo, data.id);
      }
      if (this.obj == "recruit") {
        this.router.navigate(['home', {obj: 'recruit'}]);
        return;
      } else {
        this.router.navigate(['home']);
        return;
      }
    });
  }

  watchRole(e){
    this.role = e.target.value;
  }

  watchPhone(e){
    this.phoneExists = false;
    if (this.phone) {
      if (!Utils.isNumber(e.target.value)) {
        this.isPhoneNumValid = false;
        return;
      }
      if (e.target.value.substring(0, 1) == '0') {
        e.target.value = e.target.value.substring(1, e.target.value.length);
      }
      if (e.target.value.length > 9) {
        e.target.value = e.target.value.substring(0, 9);
        this.phone = e.target.value;
      }
      if (e.target.value.length == 9) {
        this.isPhoneNumValid = true;
        this.isPhoneExists();
      } else {
        this.isPhoneNumValid = false;
      }
    } else {
      this.isPhoneNumValid = false;
    }
  }

  validatePhone(e){
    if (e.target.value.length == 9) {
      this.isPhoneNumValid = true;
    } else {
      this.isPhoneNumValid = false;
    }
  }

  isEmailExist(e){
    this.authService.getUserByMail(this.email, this.role).then((data:any)=>{
      if(data.data && data.data.length>0)
        this.emailExists = true;
      else
        this.emailExists = false;
    });
  }

  isPhoneExists(){
    let tel = '+'+this.index+this.phone;
    this.authService.getUserByPhone(tel, this.role).then((data:any)=>{
      if(data.data && data.data.length>0)
        this.phoneExists = true;
      else
        this.phoneExists = false;
    });
  }

  showEmailError(){
    if (this.email)
      return !(this.validationDataService.checkEmail(this.email));
    else
      return false;
  }

  showHidePasswd(){
    let divHide = document.getElementById('hidePasswd');
    let divShow = document.getElementById('showPasswd');

    if (divHide.style.display == 'none') {
      divHide.style.display = 'flex';
      divShow.style.display = 'none';
      this.showHidePasswdIcon = "fa fa-eye";
    }
    else {
      divHide.style.display = 'none';
      divShow.style.display = 'flex';
      this.showHidePasswdIcon = "fa fa-eye-slash";
    }
  }

  showPassword1Error(){
    if (this.password1)
      return this.password1.length < 6;
  }

  showHidePasswdConfirm(){
    let divHide = document.getElementById('hidePasswdConfirm');
    let divShow = document.getElementById('showPasswdConfirm');

    if (divHide.style.display == 'none') {
      divHide.style.display = 'flex';
      divShow.style.display = 'none';
      this.showHidePasswdConfirmIcon = "fa fa-eye";
    }
    else {
      divHide.style.display = 'none';
      divShow.style.display = 'flex';
      this.showHidePasswdConfirmIcon = "fa fa-eye-slash";
    }
  }

  showPassword2Error(){
    if (this.password2)
      return this.password2 != this.password1;
  }

  isAuthDisabled(){
    return (!this.index
            || !this.isIndexValid
            || !this.phone
            || !this.isPhoneNumValid
            || !this.password1
            || this.showPassword1Error()
            || !this.password2
            || this.showPassword2Error()
            || !this.email
            || this.showEmailError()
            || this.emailExists
            || this.phoneExists
            || !this.role);
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}
