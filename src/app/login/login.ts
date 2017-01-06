import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute, Params} from "@angular/router";
import {LoadListService} from "../../providers/load-list.service";
import {AuthenticationService} from "../../providers/authentication.service";
import {ValidationDataService} from "../../providers/validation-data.service";
import {SharedService} from "../../providers/shared.service";
import {ProfileService} from "../../providers/profile.service";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {ModalComponent} from "./modal-component/modal-component";
import {Utils} from "../utils/utils";
declare function md5(value: string): string;
declare var Messenger;

@Component({
  directives: [ROUTER_DIRECTIVES, AlertComponent, ModalComponent],
  selector: '[login]',
  host: {
    class: 'login-page app'
  },
  template: require('./login.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  providers: [AuthenticationService, LoadListService, ValidationDataService, ProfileService]
})
export class LoginPage{
  index: number;
  phone: number;
  email: string;
  password1: string;
  password2: string;
  role: string;
  pays = [];


  isIndexValid = true;
  isPhoneNumValid = true;
  showEmailField: boolean;
  emailExist = false;
  isRecruteur: boolean = false;
  isNewRecruteur: boolean;


  libelleButton: string;
  showHidePasswdIcon: string;
  showHidePasswdConfirmIcon: string;
  isRemembered: boolean;


  fromPage: string;
  alerts: Array<Object>;
  hideLoader: boolean = true;

  isRoleTelConform = true;
  isRoleEmailConform = true;

  isRedirectedFromHome;
  obj: string;
  oldPhoneValue: number;

  //type conncetion : tel or email
  typeConnection: string;
  isConnByTel: boolean = true;
  isConnByEmail: boolean = false;

  constructor(private loadListService: LoadListService,
              private authService: AuthenticationService,
              private validationDataService: ValidationDataService,
              private sharedService: SharedService,
              private profileService: ProfileService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.index = 33;
    this.libelleButton = "Se connecter";
    this.role = "employer";
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
  }


  authenticate() {
    //in case email was changed just before validate button is clicked
    if (this.isAuthDisabled()) {
      return;
    }
    this.hideLoader = false;
    var indPhone;
    if(this.isRecruteur && this.isConnByEmail){
      indPhone = this.phone;
    }else{
      indPhone = this.index + "" + this.phone;
    }

    //call the service of autentication
    let pwd = md5(this.password1);
    if (this.email == null || this.email == 'null')
      this.email = '';
    this.role = this.role == "jobyer" ? "jobyer" : "employer";
    var reverseRole = this.role == "jobyer" ? "employer" : "jobyer";
    this.authService.getUserByPhoneAndRole("+" + indPhone, reverseRole).then((data0: any) => {
      if (data0 && data0.data.length != 0 && (data0.data[0].mot_de_passe != pwd)) {
        this.addAlert("danger", "Votre mot de passe est incorrect.");
        this.hideLoader = true;
        return;
      }
      this.authService.authenticate(this.email, indPhone, pwd, this.role, this.isRecruteur).then((data: any) => {
        
        this.hideLoader = true;
        //case of authentication failure : server unavailable or connection probleme
        if (!data || data.length == 0 || (data.id == 0 && data.status == "failure")) {
          this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
          return;
        }
        //case of authentication failure : incorrect password
        if (data.id == 0 && data.status == "passwordError") {
          if (!this.showEmailField) {
            this.addAlert("danger", "Votre mot de passe est incorrect.");
          } else {
            this.addAlert("danger", "Cette adresse email a été déjà utilisé. Veuillez en choisir une autre.");
          }
          return;
        }
        //store current user in session
        if (this.isRemembered) {
          this.sharedService.setStorageType("local");
        } else {
          this.sharedService.setStorageType("session");
        }
        //get current user profile picture and password status
        let tel;
        if(this.isRecruteur){
          tel = indPhone;
        }else{
          tel = "+" + indPhone;
        }


        this.authService.getPasswordStatus(tel).then((dataPwd: any) => {
          if(dataPwd && dataPwd.data && dataPwd.data.length > 0) {
            data.mot_de_passe_reinitialise = dataPwd.data[0].mot_de_passe_reinitialise;
          }
          if(Utils.isEmpty(data.titre) && data.estRecruteur ){
            data.changePassword = true;
          }
          this.sharedService.setCurrentUser(data);
          this.profileService.loadProfilePicture(data.id).then((pic: any) => {
            var userImageURL;
            if (!this.isEmpty(pic.data[0].encode)) {
              userImageURL = pic.data[0].encode;
              this.sharedService.setProfilImageUrl(pic.data[0].encode);
            } else {
              this.sharedService.setProfilImageUrl(null);
            }
            if (!this.isEmpty(data.titre)) {
              Messenger().post({
                message: "Bienvenue "+ data.prenom +" vous venez de vous connecter !",
                type: 'success',
                showCloseButton: true
              });
            }
            //if user is connected for the first time, redirect him to the page 'civility', otherwise redirect him to the home page
            var isNewUser = data.newAccount;
            /*if (isNewUser || this.isNewRecruteur) {
             this.router.navigate(['profile']);
             } else {
             if (this.fromPage == "Search") {
             //this.nav.pop();
             } else {
             this.router.navigate(['home']);
             }
             }*/
            if (this.obj == "recruit" && !isNewUser) {
              this.router.navigate(['search/results', {obj: 'recruit'}]);
              return;
            }
            if (this.obj == "recruit" && isNewUser) {
              this.router.navigate(['home', {obj: 'recruit'}]);
              return;
            }
            if(this.obj != "recruit"){
              this.router.navigate(['home']);
              return;
            }
          });
        });
      });
    });
  }

  /**
   * @description validate phone data field and call the function that search for it in the server
   */
  watchPhone(e) {
    if (this.phone) {
      if (!Utils.isNumber(e.target.value)) {
        this.phone = this.oldPhoneValue;
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
        this.isRegistration(this.index, e.target.value);
        this.isPhoneNumValid = true;
      }
    }
    this.oldPhoneValue = this.phone;
  }


  /**
   * @description function called when the phone input is valid to decide if the form is for inscription or authentication
   */
  isRegistration(index, phone) {
    if (this.isPhoneValid(phone)) {
      //On teste si le tél existe dans la base
      var tel = "+" + index + phone;
      let role = this.role == "jobyer" ? "jobyer" : "employer";
      this.authService.getUserByPhone(tel, role).then((data: any) => {
        if (!data || data.status == "failure") {
          this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
          return;
        }
        this.isRoleTelConform = true;
        if ((!data || data.data.length == 0)) {
          this.showEmailField = true;
          this.email = "";
          this.libelleButton = "S'inscrire";
          this.isNewRecruteur = false;
          return;
        }else{
          this.isRecruteur = (data.data[0]["role"] == "recruteur" ? true : false);
        }
        if (!this.isRecruteur || this.role == "jobyer") {
          if ((!data || data.data.length == 0)) {
            this.showEmailField = true;
            this.email = "";
            this.libelleButton = "S'inscrire";
            this.isNewRecruteur = false;
          } else {
            this.email = data.data[0]["email"];
            this.libelleButton = "Se connecter";
            this.showEmailField = false;
            if (data.data[0]["role"] == "recruteur") {
              this.isRoleTelConform = false;
            }
          }
        } else {
          if ((!data || data.data.length == 0)) {
            this.isRoleTelConform = false;
            return;
          }
          if (data.data[0]["role"] == "recruteur") {
            this.email = data.data[0]["email"];
            this.libelleButton = "Se connecter";
            this.showEmailField = false;
            this.isRoleEmailConform = true;
          } else {
            this.isRoleTelConform = false;
            return;
          }
        }
      });
    } else {
      //ça sera toujours une connexion
      this.showEmailField = true;
      this.libelleButton = "S'inscrire";
      this.email = "";
      this.isRecruteur = false;
    }
  }


  /**
   * @description validate the phone format
   */
  isPhoneValid(tel) {
    if (this.phone) {
      var phone_REGEXP = /^0/;
      //check if the phone number start with a zero
      var isMatchRegex = phone_REGEXP.test(tel);
      if (Number(tel.toString().length) == 9 && !isMatchRegex) {
        return true;
      }
      else
        return false;
    } else
      return false;
  }


  validatePhone(e) {
    if (e.target.value.length == 9) {
      this.isPhoneNumValid = true;
    } else {
      this.isPhoneNumValid = false;
    }
  }


  isEmailExist(e) {
    //verify if the email exist in the database
    let role = this.role == "jobyer" ? "jobyer" : "employer";
    this.authService.getUserByMail(this.email, role).then((data: any) => {
      if (!data || data.status == "failure") {
        this.addAlert("danger", "Serveur non disponible ou problème de connexion.");
        return;
      }
      if ((!data || data.data.length == 0)) {
        if(this.isConnByEmail){
          this.isRoleEmailConform = false;
          return;
        }else{
          this.isRoleEmailConform = true;
          this.emailExist = false;
        }
      }else{
        this.isRecruteur = (data.data[0]["role"] == "recruteur" ? true : false);
      }
      if(!this.isRecruteur) {
        if (data && data.data.length != 0) {
          if(this.isConnByEmail){
            this.isRoleEmailConform = false;
          }else{
            this.emailExist = true;
          }
        } else {
          this.emailExist = false;
        }
      }else{
        this.isRoleEmailConform = true;
        if ((!data || data.data.length == 0)) {
          this.isRoleEmailConform = false;
          return;
        }
        if (data.data[0]["role"] == "recruteur") {
          this.phone = data.data[0]["telephone"];
        } else {
          this.isRoleEmailConform = false;
          return;
        }
      }
    });
  }


  /**
   * @description validate the email format
   */
  showEmailError() {
    if (this.email)
      return !(this.validationDataService.checkEmail(this.email));
    else
      return false;
  }


  /**
   * @description show error msg if password is not valid
   */
  showPassword1Error() {
    if (this.password1)
      return this.password1.length < 6;
  }


  /**
   * @description check if the password and its confirmation are the same
   */
  showPassword2Error() {
    if (this.password2)
      return this.password2 != this.password1;
  }


  /**
   * @description function called to decide if the auth/inscr button should be disabled
   */
  isAuthDisabled() {
    if (this.showEmailField == true) {
      //inscription
      return (!this.index || !this.isIndexValid || !this.phone || !this.isPhoneNumValid || !this.password1 || this.showPassword1Error() || !this.password2 || this.showPassword2Error() || !this.email || this.showEmailError() || this.emailExist || !this.role)
    } else {
      //connection
      return (!this.index || !this.isIndexValid || (!this.phone && this.isConnByTel) || !this.isPhoneNumValid || !this.password1 || this.showPassword1Error() || !this.role || !this.isRoleTelConform || !this.isRoleEmailConform)
    }
  }


  watchRole(e) {
    this.role = e.target.value;

    this.phone = null;
    this.email ="";
    this.password1 = "";
    this.password2 = "";
    this.isRoleTelConform = true;
    this.isRoleEmailConform = true;
    this.libelleButton = "Se connecter";
    this.showEmailField = false;
    this.isPhoneNumValid = true;
  }

  watchTypeConnection(e) {
    this.typeConnection = e.target.value;
    if((this.isConnByEmail && this.typeConnection == "email") || (this.isConnByTel && this.typeConnection == "tel")){
      return;
    }
    if (this.typeConnection == "tel") {
      this.isConnByTel = true;
      this.isConnByEmail = false;
    } else {
      this.isConnByTel = false;
      this.isConnByEmail = true;
    }
    this.libelleButton = "Se connecter";
    this.showEmailField = false;
    this.phone = null;
    this.email = "";
    this.password1 = "";
    this.password2 = "";
    this.isRoleTelConform = true;
    this.isRoleEmailConform = true;
    this.isPhoneNumValid = true;
  }


  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }


  showHidePasswd() {
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


  showHidePasswdConfirm() {
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


  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }

  ngOnDestroy(): void {
    this.sharedService.setFromPage(null);
  }
}
