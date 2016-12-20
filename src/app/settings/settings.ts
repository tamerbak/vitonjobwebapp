import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {MissionService} from "../../providers/mission-service";
import {AuthenticationService} from "../../providers/authentication.service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";
import {ProfileService} from "../../providers/profile.service";
declare var md5, Messenger, jQuery: any;

@Component({
  selector: '[settings]',
  template: require('./settings.html'),
  directives: [ROUTER_DIRECTIVES],
  providers: [Utils, MissionService, AuthenticationService, ProfileService],
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


  constructor(private missionService: MissionService,
              private profileService: ProfileService,
              private authService: AuthenticationService,
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

}
