import {Component,NgZone, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {NKDatetime} from 'ng2-datetime/ng2-datetime';
import {AlertComponent} from 'ng2-bootstrap/components/alert';
import {MissionService} from "../../providers/mission-service";
import {AuthenticationService} from "../../providers/authentication.service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";
import {AddressUtils} from "../utils/addressUtils";
import {Configs} from "../configurations/configs";
declare var md5,Messenger,jQuery,require: any;

@Component({
  selector: '[settings]',
  template: require('./settings.html'),
  directives: [ROUTER_DIRECTIVES,NKDatetime,AlertComponent],
  providers: [Utils,MissionService,AuthenticationService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./settings.scss')]
})
export class Settings {

  password1:string;
  password2:string;
  missionOption:string;

  isValidPassword1:boolean = false;
  isValidPassword2:boolean = false;

  password1Hint: string ="";
  password2Hint:string="";

  //currentUser params
  currentUser:any;
  currentUserFullname :string;
  phoneNumber:string;
  email:string;
  isNewUser:boolean;
  isEmployer:boolean;
  isRecruiter:boolean;
  accountId:string;
  userRoleId:string;

  //styles && vars
  showForm:boolean = false;
  phase:string;
  phaseTitle:string ="";
  validation:boolean = false;


  constructor(
      private missionService:MissionService,
      private authService: AuthenticationService,
      private sharedService:SharedService,
      private router: Router
    ){
      Messenger.options = {
        theme: 'air',
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right'
      }

      this.currentUser = this.sharedService.getCurrentUser();
      if(!this.currentUser){
        this.router.navigate(['app/dashboard']);
      }else{
        this.getUserInfos();
        if(this.isEmployer){
          this.missionService.getOptionMission(this.currentUser.id).then((opt:any) => {
            this.missionOption = opt.data[0].option_mission
          });
        }
      }
  }

  getUserFullname(){
    this.currentUserFullname = (this.currentUser.prenom+" "+this.currentUser.nom).trim();
  }

  getUserInfos(){
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

  initValidation(){
    this.isValidPassword1 = false;
    this.isValidPassword2 = false;
  }

  initPasswordPhaseForm(){
    this.phaseTitle = "Modification du mot de passe"
    this.showForm=true;
    this.phase = "CHANGE_PASSWORD";
    this.initValidation();
  }

  initMissionPhaseForm(){
    this.phaseTitle = "Modification de l'option suivi de mission"
    this.showForm=true;
    this.phase = "CHANGE_MISSION";
    this.initValidation();
  }

  watchPassword1(e) {
    let _name = e.target.value;
    let _isValid:boolean = true;
    let _hint:string = "";

    if(_name.length < 6 ){
      _hint = "Taille minimale: 6 caractères";
      _isValid = false;
    }else{
      _hint = "";
    }

    this.isValidPassword1 = _isValid;
    this.password1Hint = _hint;
    console.log();
    this.isValidForm();
  }

  watchPassword2(e) {
    let _name = e.target.value;
    let _isValid:boolean = true;
    let _hint:string = "";

    if(!this.password1 || _name !== this.password1){
      _hint = "Les deux mots de passe doivent être identiques!";
      _isValid = false;
    }else{
      _hint = "";
    }

    this.isValidPassword2 = _isValid;
    this.password2Hint = _hint;
    console.log();
    this.isValidForm();
  }

  isValidForm(){
    var _isFormValid = false;
    if(this.phase === "CHANGE_PASSWORD"){
      if (this.isValidPassword1 && this.isValidPassword2)
      {
        _isFormValid = true;
      }else{
        _isFormValid = false;
      }
    }else if(this.phase ==="CHANGE_MISSION"){
      _isFormValid = true;
    }

    return _isFormValid;
  }

  /*
  ** Execute Selected Phase
  */
  executePhase(){
    if(this.phase === "CHANGE_PASSWORD"){
      this.modifyPassword()
    }else if(this.phase ==="CHANGE_MISSION"){
      this.changeMissionOption()
    }
  }

  lockApp(){

	}

  logOut(){
    this.sharedService.setCurrentUser(null);
    this.router.navigate(['/login']);
	}


  closeForm(){
    this.phase = "";
    this.phaseTitle = "";
    this.showForm = false;
  }

  watchOption(e){
		this.missionOption = e.target.value;
	}

  changeMissionOption(){
    this.validation =true;
    this.missionService.updateDefaultOptionMission(this.missionOption, this.currentUser.id, this.currentUser.employer.entreprises[0].id).then((data:any) => {
      if(!data || data.status == 'failure'){
        Messenger().post({
          message: 'Serveur non disponible ou problème de connexion',
          type: 'error',
          showCloseButton: true
        });
        this.validation = false;
      }else{
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

  modifyPassword(){
    if(this.isValidForm()){
      this.validation = true;
      var password1 = this.password1;
      var password2 = this.password2;
      var password = md5(this.password1);
      this.authService.updatePasswd(password, this.currentUser.id)
      .then((res:any) => {

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
        this.validation = false;
        this.closeForm()
      })
      .catch((error:any) => {
        this.validation = false;
        // console.log(error);
      });
    }
  }

}
