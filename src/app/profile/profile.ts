import {Component, ViewEncapsulation} from '@angular/core';
import {NKDatetime} from 'ng2-datetime/ng2-datetime';
import {ProfileService} from "../../providers/profile-service";
import {CommunesService} from "../../providers/communes-service";
import {LoadListService} from "../../providers/loadList-service";
import {MedecineService} from "../../providers/medecine-service";
import {Utils} from "../../utils/utils";
declare var jQuery,require: any;

@Component({
  selector: '[profile]',
  template: require('./profile.html'),
  directives: [NKDatetime],
  providers: [Utils,ProfileService,CommunesService,LoadListService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')]
})
export class Profile {

  title:string="M.";
  lastname:string;
  firstname:string;
  companyname:string;
  siret:string;
  ape:string;
  birthdate:Date;
  birthplace:string;
  selectedMedecine:any={id:0, libelle:""};
  cni:string;
  numSS:string;
  nationalityId:string="9";
  nationalities=[];
  isValidLastname:boolean = false;
  isValidFirstname:boolean = false;
  isValidCompanyname:boolean = false;
  isValidSiret:boolean = false;
  isValidApe:boolean = false;
  isValidBirthdate:boolean = false;
  isValidCni:boolean = false;
  isValidNumSS:boolean = false;
  lastnameHint: string ="";
  firstnameHint:string="";
  companynameHint:string="";
  siretHint:string="";
  apeHint:string="";
  birthdateHint:string="";
  cniHint:string="";
  numSSHint:string="";
  selectedCommune:any={id:0, nom: '', code_insee: ''}
  dataForNationalitySelectReady =false;
  scanData:string ="";

  //TODO: to change by currentUser object
  isEmployer:boolean = true;
  isRecruiter:boolean = false;
  isNewUser:boolean = true;
  accountId:string = "0";
  userRoleId:string = "0";
  userEntrepriseId:string = "0";
  //styles
  formPosition = this.isNewUser ? 'col-md-offset-3 col-xs-offset-0 col-lg-6 col-xs-12' : 'col-lg-6 col-xs-12';

  constructor(private listService:LoadListService,private profileService:ProfileService){

    if(!this.isRecruiter && !this.isEmployer){
      jQuery('.nationalitySelectPicker').selectpicker();
      listService.loadNationalities().then((response:any) => {
          this.nationalities = response.data;
          this.dataForNationalitySelectReady =true;
      });
    }
  }

  updateScan(userId) {
        if (this.scanData) {
            // this.currentUser.scanUploaded = true;
            // this.storage.set(this.currentUserVar, JSON.stringify(this.currentUser));
            this.profileService.uploadScan(this.scanData, userId, 'scan', 'upload')
                .then((data) => {
                    if (!data || data.status == "failure") {
                        console.log("Scan upload failed !");
                        //this.globalService.showAlertValidation("VitOnJob", "Erreur lors de la sauvegarde du scan");
                        // this.currentUser.scanUploaded = false;
                        // this.storage.set(this.currentUserVar, JSON.stringify(this.currentUser));
                    }
                    else {
                        console.log("Scan uploaded !");
                    }

                });
            // this.storage.get(this.currentUserVar).then(usr => {
            //     if (usr) {
            //         let user = JSON.parse(usr);
            //         this.attachementService.uploadFile(user, 'scan ' + this.scanTitle, this.scanUri);
            //     }
            // });

        }
    }

  ngAfterViewChecked () {
    if(!this.isEmployer){
      if (this.dataForNationalitySelectReady) {
        jQuery('.nationalitySelectPicker').selectpicker('refresh');
      }
    }
  }

  onChangeUpload(e){
    console.log(e)
  }

  ngAfterViewInit(): void {
    jQuery('.titleSelectPicker').selectpicker();

    jQuery(document).ready(function() {

    jQuery('.fileinput').on('change.bs.fileinput', function(e, file){
      this.scanData = file.result;
    })
});
    if(!this.isRecruiter && !this.isEmployer){
      jQuery('.commune-select').select2({
        ajax:
        {
          url: 'http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/sql',
          type: 'POST',
          dataType: 'json',
          quietMillis: 250,
          params: {
            contentType: "text/plain",
          },
          data: function (term, page) {
              return "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) % lower_unaccent('"+term+"') limit 5" // search term

          },
          results: function (data, page) {

              console.log(data)


              return { results: data.data };
          },
          cache: true
        },

        formatResult: function(item) {
          return item.nom;
        },
        formatSelection: function(item) {
          return item.nom;
        },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 3,
      });
      jQuery('.commune-select').on('change',
              (e) =>
              {
                this.selectedCommune = e.added;
              }
            );
    }

    if(!this.isRecruiter && this.isEmployer){
      jQuery('.medecine-select').select2({

        ajax: {
          url: 'http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/sql',
          type: 'POST',
          dataType: 'json',
          quietMillis: 250,
          params: {
            contentType: "text/plain",
          },
          data: function (term, page) {
            return "select pk_user_medecine_de_travail as id, libelle from user_medecine_de_travail where lower_unaccent(libelle) % lower_unaccent('"+term+"') limit 5"; // search term
          },
          results: function (data, page) {
            return { results: data.data };
          },
          cache: true
        },
        formatResult: function(item) {
          return  item.libelle;
        },
        formatSelection: function(item) {
          return item.libelle;
        },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 3,
      });
      jQuery('.medecine-select').on('change',
              (e) =>
              {
                console.log(e);
                this.selectedMedecine = e.added;
              }
            );
    }
  }






  watchLastname(e) {
      let _name = e.target.value;
      let _isValid:boolean = true;
      let _hint:string = "";

      if(!Utils.isValidName(_name) ){
        _hint = "Saisissez un nom valide";
        _isValid = false;
      }else{
        _hint = "";
      }

      this.isValidLastname = _isValid;
      this.lastnameHint = _hint;
      console.log();
      this.isValidForm();
  }

  watchFirstname(e) {
      let _name = e.target.value;
      let _isValid:boolean = true;
      let _hint:string = "";

      if(!Utils.isValidName(_name) ){
        _hint = "Saisissez un nom valide";
        _isValid = false;
      }else{
        _hint = "";
      }

      this.isValidFirstname = _isValid;
      this.firstnameHint = _hint;
      console.log();
      this.isValidForm();
  }

  watchCompanyname(e) {
      let _name = e.target.value;
      let _isValid:boolean = true;
      let _hint:string = "";

      if(!_name ){
        _hint = "Veuillez saisir le nom de votre entreprise";
        _isValid = false;
      }else{
        _hint = "";
      }

      this.isValidCompanyname = _isValid;
      this.companynameHint = _hint;
      console.log();
      this.isValidForm();
  }

  watchSiret(e){
    var _regex = new RegExp('_', 'g')
    var _rawvalue = e.target.value.replace(_regex, '')

    var _value = (_rawvalue === '' ? '' : _rawvalue);
    let _isValid:boolean = true;
    let _hint:string = "";

    if(_value.length != 0 && _value.length != 17  ){
      _hint = "Saisissez les 14 chiffres du SIRET";
      _isValid = false;
    }else{
      _hint = "";
    }
    this.isValidSiret = _isValid;
    this.siretHint = _hint;
    console.log();
    this.isValidForm();
  }

  watchApe(e){
    var _regex = new RegExp('_', 'g')
    var _rawvalue = e.target.value.replace(_regex, '')

    var _value = (_rawvalue === '' ? '' : _rawvalue);
    let _isValid:boolean = true;
    let _hint:string = "";

    if(_value.length != 0 && _value.length != 5  ){
      _hint = "Saisissez les 4 chiffres suivis d'une lettre";
      _isValid = false;
    }else{
      _hint = "";
    }
    this.isValidApe = _isValid;
    this.apeHint = _hint;
    console.log();
    this.isValidForm();
  }

  watchCni(e){
    var _cni = e.target.value;

    let _isValid:boolean = true;
    let _hint:string = "";

    if(_cni.length != 0 && _cni.length != 12  ){
      _hint = "Saisissez les 12 chiffres suivis du CNI";
      _isValid = false;
    }else{
      _hint = "";
    }

    this.isValidCni = _isValid;
    this.cniHint = _hint;
    console.log();
    this.isValidForm();
  }

  watchNumSS(e){
    var _numSS = e.target.value;

    let _isValid:boolean = true;
    let _hint:string = "";

    if(_numSS.length != 0 && _numSS.length != 12  ){
      _hint = "Saisissez les 15 chiffres du n° SS";
      _isValid = false;
    }else if(_numSS.length == 15){

      if(_numSS.length == 15 && !this.checkGender(_numSS,this.title) ){
        _hint = "* Le numéro de sécurité sociale renseigné ne correspond pas aux informations personnelles";
        _isValid = false;
      }
      else if(_numSS.length ==15 && !this.checkBirthYear(_numSS,this.birthdate) ){
        _hint = "* Le numéro de sécurité sociale renseigné ne correspond pas aux informations personnelles";
        _isValid = false;
      }
      else if(_numSS.length ==15 && !this.checkBirthMonth(_numSS,this.birthdate) ){
        _hint = "* Le numéro de sécurité sociale renseigné ne correspond pas aux informations personnelles";
        _isValid = false;
      }
      else if(_numSS.length ==15 && !this.checkINSEE(_numSS,this.selectedCommune) ){
        _hint = "* Le numéro de sécurité sociale renseigné ne correspond pas aux informations personnelles";
        _isValid = false;
      }
      else if(_numSS.length ==15 && !this.checkModKey(_numSS) ){
        _hint = "* Le numéro de sécurité sociale renseigné ne correspond pas aux informations personnelles";
        _isValid = false;
      }else{
          _hint = "";
      }
    }else{
        _hint = "";
    }

    this.isValidNumSS = _isValid;
    this.numSSHint = _hint;
    console.log();
    this.isValidForm();
  }

    checkGender(num:string,title:string) {

        let indicator = num.charAt(0);
        if ((indicator === '1' && title === 'M.') || (indicator === '2' && title !== 'M.')){

          return true;
        }else{

          return false;
        }
    }

    checkBirthYear(num:string,date:any){

        if(date.length == 0){
          return false
        }
        let indicator = num.charAt(1) + num.charAt(2);

        let birthYear = date.format("YYYY")
        birthYear = birthYear.substr(2);

        if (indicator == birthYear)
            return true;
        else
            return false;
    }

    checkBirthMonth(num:string,date:any){

        if(date.length == 0){
          return false
        }
        let indicator = num.charAt(3) + num.charAt(4);

        let birthMonth = date.format("MM")

        if (birthMonth.length == 1)
            birthMonth = "0" + birthMonth;
        if (indicator == birthMonth)
            return true;
        else
            return false;
    }

    checkINSEE(num:string,communeObj:any){

        let indicator = num.substr(5, 5);

        if (communeObj.id != '0') {
            if (indicator != communeObj.code_insee)
                return false;
            else
                return true;
        }

        if (indicator.charAt(0) != '9')
            return false;
        else
            return true;
    }

    checkModKey(num:string){

        try {
            let indicator = num.substr(0, 13);
            let key = num.substr(13);
            let number = parseInt(indicator);
            let nkey = parseInt(key);
            let modulo = number % 97;
            if (nkey == 97 - modulo)
                return true;
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

  watchBirthdate(e){
    var _date = e;
    let _isValid:boolean = true;
    let _hint:string = "";

    var ageDifMs = Date.now() - new Date(_date).getTime();
    var ageDate = new Date(ageDifMs);
    var _diff = Math.abs(ageDate.getUTCFullYear() - 1970);
    if(_diff < 18){
		     _isValid = false;
         _hint = "* Vous devez avoir plus de 18 ans pour pouvoir valider votre profil";
     }else{
         _hint = "";
     }

     this.isValidBirthdate = _isValid;
     this.birthdateHint = _hint;
     console.log();
     this.isValidForm();

  }

  isValidForm(){
    var _isFormValid = false;
    if(this.isRecruiter){
      if (this.isValidFirstname && this.isValidLastname)
      {
        _isFormValid = true;
      }else{
        _isFormValid = false;
      }
    }else if(this.isEmployer){

      if(this.isValidFirstname && this.isValidLastname && this.isValidCompanyname && this.isValidSiret && this.isValidApe)
      {
        _isFormValid = true;
      }else{
        _isFormValid = false;
      }
    }else{

      if(this.isValidFirstname && this.isValidLastname && this.isValidCni && this.isValidNumSS && this.isValidBirthdate){
        _isFormValid = true;
      }else{
        _isFormValid = false;
      }
    }
    return _isFormValid;
  }


  UpdateCivility(){
      if(this.isValidForm()){

        var title = this.title;
        var firstname = this.firstname;
        var lastname = this.lastname;
        var accountId = this.accountId;
        var userRoleId = this.userRoleId;

        if(this.isEmployer){
            if(this.isRecruiter){

              this.profileService.updateRecruiterCivility(title,lastname,firstname,accountId)
                .then((res:any) => {



                  //case of authentication failure : server unavailable or connection problem
      						if (!res || res.status == "failure") {
      							console.log("Serveur non disponible ou problème de connexion.");
                    return;
      						} else {
                    // data saved
                    console.log("response update civility : " + res.status);
                    // TODO: update user object
                  }


                })
                .catch((error:any) => {
                  console.log(error);
                });

            }else{
              var companyname = this.companyname;
              var siret = this.siret;
              var ape = this.ape;
              var medecineId = this.selectedMedecine.id === "0" ? 0: parseInt(this.selectedMedecine.id);
              var entrepriseId = this.userEntrepriseId;

              this.profileService.updateEmployerCivility(title,lastname,firstname,companyname,siret,ape,userRoleId,entrepriseId,medecineId)
                .then((res:any) => {

                  //case of authentication failure : server unavailable or connection problem
      						if (!res || res.status == "failure") {
      							console.log("Serveur non disponible ou problème de connexion.");
                    return;
      						} else {
                    // data saved
                    console.log("response update civility : " + res.status);
                    // TODO: update user object

                  }

                })
                .catch((error:any) => {
                  console.log(error);
                });
            }
        }else{
          var numSS = this.numSS;
          var cni = this.cni;
          var nationality = this.nationalityId;
          var birthdate = this.birthdate;
          var birthplace = this.selectedCommune.nom;
          var nationalityId = this.nationalityId;

          this.profileService.updateJobyerCivility(title,lastname,firstname,numSS,cni,nationalityId,userRoleId,birthdate,birthplace)
            .then((res:any) => {



              //case of authentication failure : server unavailable or connection problem
              if (!res || res.status == "failure") {
                console.log("Serveur non disponible ou problème de connexion.");
                return;
              } else {
                // data saved
                console.log("response update civility : " + res.status);
                //TODO:Update user data


                //done

              }


            })
            .catch((error:any) => {
              console.log(error);
            });

        }
      }
    }



}
