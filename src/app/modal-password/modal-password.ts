import {Component, EventEmitter, Output} from "@angular/core";
import {AuthenticationService} from "../../providers/authentication.service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";

declare let md5,require,Messenger,jQuery: any;

@Component({
  selector: '[modal-password]',
  template: require('./modal-password.html'),
  providers: [Utils, AuthenticationService],
  styles: [require('./modal-password.scss')]
})

export class ModalPassword{
  msgWelcome1:string;
  msgWelcome2:string;
  pwd1: string;
  pwd2: string;

  isValidPassword1: boolean = false;
  isValidPassword2: boolean = false;

  showHidePasswdIcon: string;
  showHidePasswdConfirmIcon: string;

  password1Hint: string = "";
  password2Hint: string = "";


  projectTarget:string;
  currentUser: any;
  isEmployer: boolean;
  isRecruiter: boolean;
  accountId: string;
  userRoleId: string;

  //styles && vars
  validation: boolean = false;

  constructor(private authService: AuthenticationService,
              private sharedService: SharedService
            ) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      return;
    } else {
      this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
      this.msgWelcome1 = "Bienvenue dans Vit-On-Job";
      this.msgWelcome2 = "Veuillez saisir un nouveau mot de passe pour votre compte";

      this.getUserInfos();
      this.initValidation();

    }
  }

  ngOnInit(){
    this.showHidePasswdIcon = "fa fa-eye";
    this.showHidePasswdConfirmIcon = "fa fa-eye";
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


  getUserInfos() {
    this.isEmployer = this.currentUser.estEmployeur;
    this.isRecruiter = this.currentUser.estRecruteur;
    this.accountId = this.currentUser.id;
    this.userRoleId = this.currentUser.estEmployeur ? this.currentUser.employer.id : this.currentUser.jobyer.id;
  }
  initForm(){
    this.initValidation();
    this.pwd1 ="";
    this.pwd2 ="";
  }
  initValidation() {
    this.isValidPassword1 = false;
    this.isValidPassword2 = false;
    this.validation = false;
  }

  watchPassword1(e) {
    let _name = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (_name.length < 6) {
      _hint = "Taille minimale: 6 caractères";
      _isValid = false;
    }else if (this.pwd2 && _name !== this.pwd2) {
      this.password2Hint = "Les deux mots de passe doivent être identiques!";
      _isValid = false;
    } else {
      _hint = "";
      this.password2Hint ="";
      this.isValidPassword2 = true;
    }

    this.isValidPassword1 = _isValid;
    this.password1Hint = _hint;
    console.log();
    this.isValidForm();
  }

  watchPassword2(e) {
    let _name = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (!this.pwd1 || _name !== this.pwd1) {
      _hint = "Les deux mots de passe doivent être identiques!";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidPassword2 = _isValid;
    this.password2Hint = _hint;
    console.log();
    this.isValidForm();
  }

  isValidForm() {
    var _isFormValid = false;
    if (this.isValidPassword1 && this.isValidPassword2) {
      _isFormValid = true;
    }
    return _isFormValid;
  }

  updatePassword() {
    if (this.isValidForm()) {
      this.validation = true;
      var password1 = this.pwd1;
      var password2 = this.pwd2;
      var password = md5(this.pwd1);
      this.authService.updatePasswordByPhone(this.currentUser.tel,password,"Non")
        .then((res: any) => {

          //case of modification failure : server unavailable or connection problem
          if (!res || res.length == 0 || res.status == "failure") {
            Messenger().post({
              message: 'Serveur non disponible ou problème de connexion',
              type: 'error',
              showCloseButton: true
            });
            this.validation = false;
            return;
          }
          Messenger().post({
            message: 'Votre mot de passe a été modifié avec succès',
            type: 'success',
            showCloseButton: true
          });
          if(this.currentUser.changePassword){
            this.currentUser.changePassword = false;
          }
          this.validation = false;
          this.currentUser.mot_de_passe_reinitialise ="Non";
          this.sharedService.setCurrentUser(this.currentUser);
          this.closeModal()
        })
        .catch((error: any) => {
          this.validation = false;
        });
    }
  }

  closeModal(): void {
    jQuery('#modal-password').modal('hide');
  }

}