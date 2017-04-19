import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {MissionService} from "../../providers/mission-service";
import {AuthenticationService} from "../../providers/authentication.service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";
import {ProfileService} from "../../providers/profile.service";
import {CampaignService} from "../../providers/campaign-service";

declare let jQuery: any;
declare let Messenger: any;
declare let md5: any;

@Component({
  selector: '[settings]',
  template: require('./settings.html'),
  directives: [ROUTER_DIRECTIVES],
  providers: [Utils, MissionService, AuthenticationService, ProfileService, CampaignService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./settings.scss')]
})
export class Settings {

  password1: string;
  password2: string;
  oldPassword: string;
  missionOption: string;

  isValidPassword1: boolean = false;
  isValidPassword2: boolean = false;
  isValidOldPassword: boolean = false;

  password1Hint: string = "";
  password2Hint: string = "";
  oldPasswordHint: string = "";

  showHidePasswdIcon: string;
  showHidePasswd1Icon: string;
  showHidePasswdConfirmIcon: string;

  //currentUser params
  projectTarget:string;
  currentUser: any;
  currentUserFullname: string;
  phoneNumber: string;
  email: string;
  isNewUser: boolean;
  isEmployer: boolean;
  isRecruiter: boolean;
  accountId: string;
  userRoleId: string;

  //styles && vars
  showForm: boolean = false;
  phase: string;
  phaseTitle: string = "";
  validation: boolean = false;

  spontaneousContact: any;

  //code privilege
  codePromo: string;

  constructor(private missionService: MissionService,
              private profileService: ProfileService,
              private authService: AuthenticationService,
              private campaignService: CampaignService,
              private sharedService: SharedService,
              private router: Router) {


    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
      return;
    } else {
      this.getUserInfos();
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
      if (this.isEmployer) {
        this.missionService.getOptionMission(this.currentUser.id).then((opt: any) => {
          this.missionOption = opt.data[0].option_mission;
        });
      }

      // Check if user accepts spontaneous contact
      this.profileService.getIsSpontaneousContact(this.currentUser.id).then((data: any) => {
        this.spontaneousContact = (data.accepte_candidatures && data.accepte_candidatures.toUpperCase()) == 'OUI'
          ? 'OUI'
          : 'NON'
        ;
        jQuery('.spont-recrut').prop('checked', this.spontaneousContact.toUpperCase() == 'OUI');
      });
    }
  }

  formHasChanges(){
    if(this.showForm){
      return true;
    }
    return false;
  }

  getUserFullname() {
    this.currentUserFullname = (this.currentUser.prenom + " " + this.currentUser.nom).trim();
  }

  getUserInfos() {
    this.getUserFullname();
    this.phoneNumber = this.currentUser.tel;
    this.email = this.currentUser.email;
    this.isNewUser = this.currentUser.newAccount;
    this.showForm = false;
    this.isEmployer = this.currentUser.estEmployeur;
    this.isRecruiter = this.currentUser.estRecruteur;
    this.accountId = this.currentUser.id;
    this.userRoleId = this.currentUser.estEmployeur ? this.currentUser.employer.id : this.currentUser.jobyer.id;
  }

  initValidation() {
    this.isValidPassword1 = false;
    this.isValidPassword2 = false;

    // $('.setting-form').
    var offset = jQuery("#setting-form").offset().top;
    var point = offset + window.innerHeight - 50;
    window.setTimeout(function() {
      window.scrollTo(0,point);
    }, 1000);

  }

  ngOnInit(): void {
    this.showHidePasswdIcon = "fa fa-eye";
    this.showHidePasswd1Icon = "fa fa-eye";
    this.showHidePasswdConfirmIcon = "fa fa-eye";
  }

  showHideOldPasswd() {
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

  showHidePasswd1() {
    let divHide = document.getElementById('hidePasswd1');
    let divShow = document.getElementById('showPasswd1');

    if (divHide.style.display == 'none') {
      divHide.style.display = 'flex';
      divShow.style.display = 'none';
      this.showHidePasswd1Icon = "fa fa-eye";
    }
    else {
      divHide.style.display = 'none';
      divShow.style.display = 'flex';
      this.showHidePasswd1Icon = "fa fa-eye-slash";
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

  initPasswordPhaseForm() {
    this.password1 ="";
    this.password2 ="";
    this.oldPassword = "";
    this.phaseTitle = "Modification du mot de passe"
    this.showForm = true;
    this.phase = "CHANGE_PASSWORD";
    this.initValidation();
  }

  initMissionPhaseForm() {
    this.phaseTitle = "Modification de l'option suivi de mission"
    this.showForm = true;
    this.phase = "CHANGE_MISSION";
    this.initValidation();
  }

  initCodePromoForm(){
    this.phaseTitle = "Enregistrement d'un code privilège";
    this.showForm = true;
    this.phase = "CODE_PROMO";
    this.codePromo = "";
    this.initValidation();
  }

  isSpontaneousContact() {
    if (this.currentUser.estEmployeur) {
      return (this.spontaneousContact && this.spontaneousContact.toUpperCase() == 'OUI');
    }
    return false;
  }

  activateSpontaneousContact() {
    if (this.currentUser.estEmployeur) {
      if (this.spontaneousContact.toUpperCase() == 'OUI') {
        this.profileService.updateSpontaneousContact('NON', this.currentUser.id);
        this.spontaneousContact = 'NON';
        jQuery('.spont-recrut').prop('checked', false);
      } else {
        this.profileService.updateSpontaneousContact('OUI', this.currentUser.id);
        this.spontaneousContact = 'OUI';
        jQuery('.spont-recrut').prop('checked', true);
      }
    }
  }

  watchPassword1(e) {
    let _name = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (_name.length < 6) {
      _hint = "Taille minimale: 6 caractères";
      _isValid = false;
    }else if (this.password2 && _name !== this.password2) {
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

    if (!this.password1 || _name !== this.password1) {
      _hint = "Les deux mots de passe doivent être identiques!";
      _isValid = false;
    } else {
      _hint = "";
    }

    if(_isValid && this.password1.length >= 6){
      this.isValidPassword1 = true;
    }

    this.isValidPassword2 = _isValid;
    this.password2Hint = _hint;
    console.log();
    this.isValidForm();
  }

  watchOldPassword(e) {
    let _name = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (!_name) {
      _hint = "Ce champ est obligatoire!";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidOldPassword = _isValid;
    this.oldPasswordHint = _hint;
    console.log();
    this.isValidForm();
  }

  isValidForm() {
    var _isFormValid = false;
    if (this.phase === "CHANGE_PASSWORD") {
      if (this.isValidOldPassword && this.isValidPassword1 && this.isValidPassword2) {
        _isFormValid = true;
      } else {
        _isFormValid = false;
      }
    } else if (this.phase === "CHANGE_MISSION") {
      _isFormValid = true;
    }else if (this.phase === "CODE_PROMO") {
     if(!Utils.isEmpty(this.codePromo)){
       _isFormValid = true;
     }else{
       _isFormValid = false;
     }
    }

    return _isFormValid;
  }

  /*
   ** Execute Selected Phase
   */
  executePhase() {
    if (this.phase === "CHANGE_PASSWORD") {
      this.modifyPassword()
    } else if (this.phase === "CHANGE_MISSION") {
      this.changeMissionOption()
    } else if (this.phase === "CODE_PROMO") {
      this.saveCodePromo();
    }
  }

  logOut() {
    this.sharedService.setCurrentUser(null);
    this.router.navigate(['/login']);
  }


  closeForm() {
    this.phase = "";
    this.phaseTitle = "";
    this.showForm = false;
  }

  watchOption(e) {
    this.missionOption = e.target.value;
  }

  changeMissionOption() {
    this.validation = true;
    this.missionService.updateDefaultOptionMission(this.missionOption, this.currentUser.id, this.currentUser.employer.entreprises[0].id).then((data: any) => {
      if (!data || data.status == 'failure') {
        Messenger().post({
          message: 'Serveur non disponible ou problème de connexion',
          type: 'error',
          showCloseButton: true
        });
        this.validation = false;
      } else {
        Messenger().post({
          message: "l'Option suivi de mission a été enregistrée avec succès",
          type: 'success',
          showCloseButton: true
        });
        this.sharedService.setOptionMission(this.missionOption);
        this.validation = false;
        this.closeForm();
      }
    });
  }

  modifyPassword() {
    if (this.isValidForm()) {
      this.validation = true;
      let password1 = this.password1;
      let password2 = this.password2;
      let password = md5(this.password1);
      let oldPassword = md5(this.oldPassword);

      this.authService.authenticate(this.currentUser.email, this.currentUser.tel, oldPassword, this.projectTarget, this.isRecruiter).then((data: any) => {
        //case of authentication failure : server unavailable or connection probleme
        if (!data || data.length == 0 || (data.id == 0 && data.status == "failure")) {
          Messenger().post({
            message: 'Serveur non disponible ou problème de connexion',
            type: 'error',
            showCloseButton: true
          });
          this.validation = false;
          return;
        }
        //case of authentication failure : incorrect password
        if (data.id == 0 && data.status == "passwordError") {
          this.oldPasswordHint = "Votre mot de passe est incorrect.";
          this.validation = false;
          return;
        }

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
            this.currentUser.mot_de_passe_reinitialise="Non";
            this.sharedService.setCurrentUser(this.currentUser);
            this.validation = false;
            this.closeForm()
          })
          .catch((error: any) => {
            this.validation = false;
          });
        });
    }
  }

  saveCodePromo(){
    this.validation = true;
    this.campaignService.subscribeToCampaign(this.codePromo, this.currentUser.id).then((data: any) => {
      if (!data || data.status != 200) {
        Messenger().post({
          message: 'Serveur non disponible ou problème de connexion',
          type: 'error',
          showCloseButton: true
        });
        this.validation = false;
        //dans le cas nominal, data._body contiendra l'id de l'inscription à la campagne, en cas d'erreur data._body contientra le msg d'erreur, d'ou l'appel de parseInt (pour distinguer l'id du texte de l'erreur)
      } else if (Utils.isEmpty(data._body) || data._body == "[]" || isNaN(parseInt(data._body))) {
        Messenger().post({
          message: "Il n'existe pas de campagne avec le code privilège renseigné.",
          type: 'error',
          showCloseButton: true
        });
        this.validation = false;
      } else {
        Messenger().post({
          message: "Vous vous êtes inscris à la campagne avec succès.",
          type: 'success',
          showCloseButton: true
        });
        this.validation = false;
        this.closeForm();
      }
    });
  }

}
