import {Component, ViewEncapsulation} from "@angular/core";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap";
import {AuthenticationService} from "../../providers/authentication.service";
import {LoadListService} from "../../providers/load-list.service";
import {ValidationDataService} from "../../providers/validation-data.service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";
import {ProfileService} from "../../providers/profile.service";
import {ModalComponent} from "./modal-component/modal-component";
declare function md5(value: string): string;
declare var Messenger;


@Component({
  directives: [AlertComponent, ModalComponent],
  selector: '[signin]',
  template: require('./signin.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./signin.scss')],
  providers: [AuthenticationService, LoadListService, ValidationDataService, ProfileService]
})
export class SigninPage{
  isRedirectedFromHome : boolean;
  alerts: Array<Object>;
  pays : any = [];
  index : any;
  phone : any;
  isIndexValid : boolean;
  isPhoneNumValid : boolean;
  email : string;
  phoneExists : boolean;
  password1 : string;
  showHidePasswdIcon : string;
  hideLoader : boolean;

  role : string;
  obj : any;

  media : string;
  annee : any;

  constructor(private loadListService: LoadListService,
              private authService: AuthenticationService,
              private profileService: ProfileService,
              private validationDataService: ValidationDataService,
              private sharedService: SharedService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.index = 33;
    this.role = "employer";
    this.media = 'phone';
    this.isPhoneNumValid = true;
    this.isIndexValid = true;
    this.hideLoader = true;
    //load countries list
    this.loadListService.loadCountries(this.role).then((data: any) => {
      this.pays = data.data;
    });
    this.showHidePasswdIcon = "fa fa-eye";

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

  signin(){
    if (this.isAuthDisabled()) {
      return;
    }
    this.hideLoader = false;
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
      if (data.id == 0 && data.status == "passwordError") {
        this.addAlert("danger", "Votre mot de passe est incorrect.");
        return;
      }

      this.sharedService.setStorageType("local");
      this.sharedService.setCurrentUser(data);

      this.profileService.loadProfilePicture(data.id).then((pic: any) => {

        if (!Utils.isEmpty(pic.data[0].encode)) {
          this.sharedService.setProfilImageUrl(pic.data[0].encode);
        } else {
          this.sharedService.setProfilImageUrl(null);
        }
        if (!Utils.isEmpty(data.titre)) {
          Messenger().post({
            message: "Bienvenue "+ data.prenom +" vous venez de vous connecter !",
            type: 'success',
            showCloseButton: true
          });
        }

        if (this.obj == "recruit" ) {
          this.router.navigate(['search/results', {obj: 'recruit'}]);
          return;
        }

        if(this.obj != "recruit"){
          this.router.navigate(['home']);
          return;
        }
      });


    });
  }

  watchRole(e){
    this.role = e.target.value;
    if(this.role == 'phone')
      this.email = '';
    else
      this.phone = '';
  }

  watchMedia(e){
    this.media = e.target.value;
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

  isAuthDisabled(){
    return (   !this.index
            || !this.isIndexValid
            || (!this.phone && !this.email)
            || !this.isPhoneNumValid
            || !this.password1
            || this.showPassword1Error()
            || this.showEmailError()
            || !this.role);
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}
