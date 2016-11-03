import {Component, NgZone, ViewEncapsulation, ViewChild} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";

import {AlertComponent} from "ng2-bootstrap/components/alert";
import {ProfileService} from "../../providers/profile.service";
import {CommunesService} from "../../providers/communes.service";
import {LoadListService} from "../../providers/load-list.service";
import {MedecineService} from "../../providers/medecine.service";
import {AttachementsService} from "../../providers/attachements.service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";
import {AddressUtils} from "../utils/addressUtils";
import {Configs} from "../../configurations/configs";
import {MapsAPILoader} from "angular2-google-maps/core";
import {ModalPicture} from "../modal-picture/modal-picture";
import {BankAccount} from "../bank-account/bank-account";
import MaskedInput from "angular2-text-mask";
import {AccountConstraints} from "../../validators/account-constraints";
import {scan} from "rxjs/operator/scan";
import {CivilityNames} from "../components/civility-names/civility-names";
import {CivilityEmployer} from "../components/civility-employer/civility-employer";
import {CivilityJobyer} from "../components/civility-jobyer/civility-jobyer";

declare var jQuery, require, Messenger, moment: any;
declare var google: any;

@Component({
  selector: '[profile]',
  template: require('./profile.html'),
  directives: [ROUTER_DIRECTIVES, AlertComponent, ModalPicture, MaskedInput, BankAccount,CivilityNames,CivilityEmployer,CivilityJobyer],
  providers: [Utils, ProfileService, CommunesService, LoadListService, MedecineService, AttachementsService, AccountConstraints],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')]
})
export class Profile{
  public maskSiret = [/[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  public maskApe = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /^[a-zA-Z]*$/]

  @ViewChild('myForm') form;

  @ViewChild('civNames') civNames:CivilityNames;
  @ViewChild('civEmployer') civEmployer:CivilityEmployer;
  @ViewChild('civJobyer') civJobyer:CivilityJobyer;

  isValidCivilityNames:boolean=false;
  isValidCivilityEmployer:boolean=false;
  isValidCivilityJobyer:boolean=false;

  title: string = "M.";
  lastname: string;
  firstname: string;
  companyname: string;
  medecineId: number;
  siret: string;
  ape: string;
  birthcp: string;
  birthdep: string;
  birthdepId: string;
  birthplace: string;
  birthCountryId: any;

  selectedCP: any;
  birthdate: Date;
  birthdateHidden: Date;
  selectedMedecine: any = {id: 0, libelle: ""};
  cni: string;
  numSS: string;
  nationalityId: any = "91";
  nationalities = [];
  personalAddress: string;
  jobAddress: string;

  isValidPersonalAddress: boolean = true;
  isValidJobAddress: boolean = true;



  selectedCommune: any ;
  dataForNationalitySelectReady = false;
  scanData: string = "";
  //PersonalAddress params
  cityPA: string;
  countryPA: string;
  streetPA: string;
  streetNumberPA: string;
  namePA: string;
  zipCodePA: string;

  //JobAddress params
  cityJA: string;
  countryJA: string;
  streetJA: string;
  streetNumberJA: string;
  nameJA: string;
  zipCodeJA: string;


  //currentUser object
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
  scanTitle: string;
  validation: boolean = false;
  siretAlert: string = "";
  showCurrentSiretBtn: boolean = false;
  companyAlert: string = "";
  showCurrentCompanyBtn: boolean = false;
  personalAddressLabel: string = "Adresse du siège";
  jobAddressLabel: string = "Adresse du lieu du travail";
  autocompletePA: any;
  autocompleteJA: any;
  addressOptions = {
    componentRestrictions: {country: "fr"}
  };
  communesData: any = [];
  isFrench: boolean;
  isEuropean: number;
  pays = [];
  index: number;

  numStay;
  dateStay;
  dateFromStay;
  dateToStay;
  whoDeliverStay;
  regionId;
  selectedDep;
  isResident: boolean = true;
  isCIN: boolean = true;
  prefecture:any;

  /*
   Conventions collectives
   */
  conventionId: number;
  conventions: any = [];

  /*
   * Multiple uploads
   */
  allImages : any[];
  currentImg : any;
  currentHeightIndex : number = 0;
  currentWidth : number = 0;

  offerStats: any = {
    published_offers: '',
  };

  missionStats: any = {
    pending_recruitments: '',
    missions_in_progress: '',
  };

  setImgClasses() {
    return {
      'img-circle': true,//TODO:this.currentUser && this.currentUser.estEmployeur,
    };
  }

  onNamesDataChange(isValid){
    console.log(isValid);
    this.isValidCivilityNames = isValid;
    this.isValidForm();
  }

  onEmployerDataChange(isValid){
    console.log(isValid);
    this.isValidCivilityEmployer = isValid;
    this.isValidForm();
  }

  onJobyerDataChange(isValid){
    this.isValidCivilityJobyer = isValid;
    this.isValidForm();
  }

  onGetDataFromCivilityNames(obj){
    this.title = obj.title;
    this.firstname = obj.firstname;
    this.lastname = obj.lastname;
  }

  onGetDataFromCivilityEmployer(obj){
    this.companyname = obj.companyname;
    this.siret = obj.siret;
    this.ape = obj.ape;
    this.medecineId = obj.selectedMedecine.id === "0" ? 0 : parseInt(obj.selectedMedecine.id);
    this.conventionId = obj.conventionId;
  }

  onGetDataFromCivilityJobyer(obj){
    this.numSS = obj.numSS;
    this.cni = obj.cni;
    this.nationalityId = obj.nationalityId;
    this.birthdate = obj.birthdate;
    this.birthdepId = obj.birthdepId;
    this.selectedCommune = obj.selectedCommune,
    this.birthCountryId = obj.birthCountryId;

    this.numStay = obj.numStay;
    this.dateStay = obj.dateStay;
    this.dateFromStay = obj.dateFromStay;
    this.dateToStay = obj.dateToStay;

    this.prefecture = obj.prefecture;
    this.isCIN = obj.birthdepIdisCIN

    this.regionId = obj.regionId;
    this.isResident = obj.birthdepId;
    this.isFrench = obj.isFrench;
    this.isEuropean = obj.isEuropean;
  }

  onJobyerNationalityChange(obj){
    if (obj.isFrench || obj.isEuropean == 0) {
      this.scanTitle = " de votre CNI ou Passeport";
    }
    if (obj.isEuropean == 1) {
      this.scanTitle = " de votre titre de séjour";
    }
  }



  constructor(private listService: LoadListService,
              private profileService: ProfileService,
              private sharedService: SharedService,
              private medecineService: MedecineService,
              private communesService: CommunesService,
              private attachementsService: AttachementsService,
              private zone: NgZone,
              private router: Router,
              private _loader: MapsAPILoader) {

    this.currentUser = this.sharedService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['app/home']);
    } else {
      this.getUserInfos();
      if (this.isNewUser) {
        this.initForm();
      }
      if (!this.isRecruiter && !this.isEmployer) {
        this.personalAddressLabel = "Adresse personnelle";
        this.jobAddressLabel = "Adresse de départ au travail";

      } else {
        this.scanTitle = " de votre extrait k-bis";
        listService.loadConventions().then((response: any) => {
          this.conventions = response;
        });
      }
    }
    this.allImages = [];
  }


  getUserFullname() {
    this.currentUserFullname = (this.currentUser.prenom + " " + this.currentUser.nom).trim();
  }

  getUserInfos() {
    this.getUserFullname();
    this.phoneNumber = this.currentUser.tel;
    this.email = this.currentUser.email;
    this.isNewUser = this.currentUser.newAccount;
    this.showForm = this.isNewUser ? true : false;
    this.isEmployer = this.currentUser.estEmployeur;
    this.isRecruiter = this.currentUser.estRecruteur;
    this.accountId = this.currentUser.id;
    this.userRoleId = this.currentUser.estEmployeur ? this.currentUser.employer.id : this.currentUser.jobyer.id;

    if (this.currentUser.estEmployeur) {
      let id = this.currentUser.employer.entreprises[0].id;
      this.profileService.getEmployerOfferStats(id).then((data: any) => {
        this.offerStats = data;
      });
      this.profileService.getEmployerMissionStats(id).then((data: any) => {
        this.missionStats = data;
      });
    }
  }


  watchPersonalAddress(e) {
    let _address = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    this.namePA = _address;
    this.streetNumberPA = "";
    this.streetPA = "";
    this.zipCodePA = "";
    this.cityPA = "";
    this.countryPA = "";

    this.personalAddress = _address;
    this.isValidPersonalAddress = _isValid;
    console.log();
    this.isValidForm();
  }

  watchJobAddress(e) {
    let _address = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    this.nameJA = _address;
    this.streetNumberJA = "";
    this.streetJA = "";
    this.zipCodeJA = "";
    this.cityJA = "";
    this.countryJA = "";

    this.jobAddress = _address;
    this.isValidJobAddress = _isValid;
    console.log();
    this.isValidForm();
  }

  autocompletePersonalAddress() {
    this._loader.load().then(() => {
      //let autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocompletePersonal"), {});
      google.maps.event.addListener(this.autocompletePA, 'place_changed', () => {
        let place = this.autocompletePA.getPlace();
        var addressObj = AddressUtils.decorticateGeolocAddress(place);

        this.personalAddress = place['formatted_address'];
        this.zone.run(()=> {
          this.namePA = !addressObj.name ? '' : addressObj.name.replace("&#39;", "'");
          this.streetNumberPA = addressObj.streetNumber.replace("&#39;", "'");
          this.streetPA = addressObj.street.replace("&#39;", "'");
          this.zipCodePA = addressObj.zipCode;
          this.cityPA = addressObj.city.replace("&#39;", "'");
          this.countryPA = (addressObj.country.replace("&#39;", "'") == "" ? 'France' : addressObj.country.replace("&#39;", "'"));

          this.isValidPersonalAddress = true;
          this.isValidForm();
        });
      });
    });
  }

  autocompleteJobAddress() {
    this._loader.load().then(() => {
      //let autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocompleteJob"), {});
      google.maps.event.addListener(this.autocompleteJA, 'place_changed', () => {
        let place = this.autocompleteJA.getPlace();
        var addressObj = AddressUtils.decorticateGeolocAddress(place);

        this.jobAddress = place['formatted_address'];
        this.zone.run(()=> {
          this.nameJA = !addressObj.name ? '' : addressObj.name.replace("&#39;", "'");
          this.streetNumberJA = addressObj.streetNumber.replace("&#39;", "'");
          this.streetJA = addressObj.street.replace("&#39;", "'");
          this.zipCodeJA = addressObj.zipCode;
          this.cityJA = addressObj.city.replace("&#39;", "'");
          this.countryJA = (addressObj.country.replace("&#39;", "'") == "" ? 'France' : addressObj.country.replace("&#39;", "'"));

          this.isValidJobAddress = true;
          this.isValidForm();
        });
      });
    });
  }

  formHasChanges() {
    if (this.showForm) {
      return true;
    }
    return false;
  }

  /**
   * Initialize form with user values
   */
  initForm() {
    this.showForm = true;

    let role = this.isEmployer?'employeur':'jobyer';
    let field = 'scan';
    let userId = this.isEmployer? this.currentUser.employer.id : this.currentUser.jobyer.id;

    this.profileService.getScan(userId, field, role).then((file:string)=>{
      if(file && file.length>0){
        let subfiles = file.split('*');
        this.allImages = [];
        for(let i = 0 ; i < subfiles.length ; i++){
          this.allImages.push({
            data : subfiles[i]
          });
        }
      }

    });


    if (!this.isRecruiter) {
      if (this.isEmployer && this.currentUser.employer.entreprises.length != 0) {

        //get Personal Address
        var entreprise = this.currentUser.employer.entreprises[0];
        this.personalAddress = entreprise.siegeAdress.fullAdress;
        this.namePA = entreprise.siegeAdress.name;
        this.streetNumberPA = entreprise.siegeAdress.streetNumber;
        this.streetPA = entreprise.siegeAdress.street;
        this.zipCodePA = entreprise.siegeAdress.zipCode;
        this.cityPA = entreprise.siegeAdress.city;
        this.countryPA = entreprise.siegeAdress.country;

        if (!this.countryPA && this.personalAddress) {
          this.profileService.getAddressByUser(entreprise.id, 'employer').then((data) => {
            this.namePA = data[0].name;
            this.streetNumberPA = data[0].streetNumber;
            this.streetPA = data[0].street;
            this.zipCodePA = data[0].zipCode;
            this.cityPA = data[0].city;
            this.countryPA = data[0].country;
          });
        }
        this.isValidPersonalAddress = true;

        //get Job Address
        this.jobAddress = entreprise.workAdress.fullAdress;
        this.nameJA = entreprise.workAdress.name;
        this.streetNumberJA = entreprise.workAdress.streetNumber;
        this.streetJA = entreprise.workAdress.street;
        this.zipCodeJA = entreprise.workAdress.zipCode;
        this.cityJA = entreprise.workAdress.city;
        this.countryJA = entreprise.workAdress.country;

        if (!this.countryPA && this.jobAddress) {
          this.profileService.getAddressByUser(entreprise.id, 'employer').then((data) => {
            this.nameJA = data[1].name;
            this.streetNumberJA = data[1].streetNumber;
            this.streetJA = data[1].street;
            this.zipCodeJA = data[1].zipCode;
            this.cityJA = data[1].city;
            this.countryJA = data[1].country;
          });
        }
        this.isValidJobAddress = true;
      } else {
        // get Personal Address
        var jobyer = this.currentUser.jobyer;
        this.personalAddress = jobyer.personnalAdress.fullAdress;
        this.namePA = jobyer.personnalAdress.name;
        this.streetNumberPA = jobyer.personnalAdress.streetNumber;
        this.streetPA = jobyer.personnalAdress.street;
        this.zipCodePA = jobyer.personnalAdress.zipCode;
        this.cityPA = jobyer.personnalAdress.city;
        this.countryPA = jobyer.personnalAdress.country;
        if (!this.countryPA && this.personalAddress) {
          this.profileService.getAddressByUser(jobyer.id, 'jobyer').then((data) => {
            this.namePA = data[0].name;
            this.streetNumberPA = data[0].streetNumber;
            this.streetPA = data[0].street;
            this.zipCodePA = data[0].zipCode;
            this.cityPA = data[0].city;
            this.countryPA = data[0].country;
          });
        }

        this.isValidPersonalAddress = true;
        this.jobAddress = this.currentUser.jobyer.workAdress.fullAdress;
        this.nameJA = this.currentUser.jobyer.workAdress.name;
        this.streetNumberJA = this.currentUser.jobyer.workAdress.streetNumber;
        this.streetJA = this.currentUser.jobyer.workAdress.street;
        this.zipCodeJA = this.currentUser.jobyer.workAdress.zipCode;
        this.cityJA = this.currentUser.jobyer.workAdress.city;
        this.countryJA = this.currentUser.jobyer.workAdress.country;
        if (!this.countryJA && this.jobAddress) {
          this.profileService.getAddressByUser(this.currentUser.jobyer.id, 'jobyer').then((data) => {
            this.nameJA = data[1].name;
            this.streetNumberJA = data[1].streetNumber;
            this.streetJA = data[1].street;
            this.zipCodeJA = data[1].zipCode;
            this.cityJA = data[1].city;
            this.countryJA = data[1].country;
          });
        }
        this.isValidJobAddress = true;
      }

    }
  }

  updateScan(accountId, userId, role) {

    if(this.allImages && this.allImages.length>0){
      let scanData = this.allImages[0].data;
      for(let i = 1 ; i < this.allImages.length ; i++){
        scanData = scanData+'*'+this.allImages[i].data;
      }

      this.profileService.uploadScan(scanData, userId, 'scan', 'upload', role)
        .then((data: any) => {

          if (!data || data.status == "failure") {
            Messenger().post({
              message: 'Serveur non disponible ou problème de connexion',
              type: 'error',
              showCloseButton: true
            });
            this.currentUser.scanUploaded = false;
            this.sharedService.setCurrentUser(this.currentUser);
          }


        });

      if (accountId) {
        for(let i = 0 ; i < this.allImages.length ; i++){
          let index = i+1;
          this.attachementsService.uploadFile(accountId, 'scan ' + this.scanTitle +' ' + index, scanData).then((data :any) => {
          if(data && data.id != 0) {
            this.attachementsService.uploadActualFile(data.id, data.fileName, scanData);
          }
        });
        }

      }

    }

  }

  deleteImage(index){
    this.allImages.splice(index,1);
  }

  appendImg(){
    this.allImages.push({
      data : this.scanData
    });

    this.scanData = '';
    jQuery('.fileinput').fileinput('clear');
  }

  ngAfterViewInit(): void {
    var self = this;
    this._loader.load().then(() => {
      this.autocompletePA = new google.maps.places.Autocomplete(document.getElementById("autocompletePersonal"), this.addressOptions);
      this.autocompleteJA = new google.maps.places.Autocomplete(document.getElementById("autocompleteJob"), this.addressOptions);
    });

    jQuery(document).ready(function () {
      jQuery('.fileinput').on('change.bs.fileinput', function (e, file) {
        if (file === undefined) {
          Messenger().post({
            message: "Le fichier séléctionné n'est pas un fichier Image valide.",
            type: 'error',
            showCloseButton: true
          });
          jQuery('.fileinput').fileinput('clear');
        } else {
          self.scanData = file.result;
        }
      });
    })
  }

  isValidForm() {
    var _isFormValid = false;
    if (this.isRecruiter) {
      if (this.isValidCivilityNames) {
        _isFormValid = true;
      } else {
        _isFormValid = false;
      }
    } else if (this.isEmployer) {
      if (this.isValidCivilityNames && this.isValidCivilityEmployer && this.isValidPersonalAddress && this.isValidJobAddress) {
        _isFormValid = true;
      } else {
        _isFormValid = false;
      }
    } else {
      if (this.isValidCivilityNames && this.isValidCivilityJobyer && this.isValidPersonalAddress && this.isValidJobAddress) {
        _isFormValid = true;
      } else {
        _isFormValid = false;
      }
    }
    return _isFormValid;
  }



  focus(field) {
    if (field == 'companyname') {
      jQuery('#companyname').focus()
    } else if (field == 'siret') {
      jQuery('#siret').focus()
    }
  }

  setDefaultValue(field) {
    if (field == 'companyname') {
      this.companyname = this.currentUser.employer.entreprises[0].nom;
      this.companyAlert = "";
      this.showCurrentCompanyBtn = false;
    } else if (field == 'siret') {
      this.siret = this.currentUser.employer.entreprises[0].siret;
      this.siretAlert = "";
      this.showCurrentSiretBtn = false;
    }
    console.log()
  }

  closeForm() {
    this.showForm = false;
  }


  updateCivility() {
    if (this.isValidForm()) {
      this.validation = true;
      this.civNames.getData();
      var title = this.title;
      var firstname = this.firstname;
      var lastname = this.lastname;
      var accountId = this.accountId;
      var userRoleId = this.userRoleId;
      var isNewUser = this.isNewUser;

      console.log(title,firstname,lastname);

      if (this.isEmployer) {
        if (this.isRecruiter) {
          this.profileService.updateRecruiterCivility(title, lastname, firstname, accountId)
            .then((res: any) => {
              //case of update failure : server unavailable or connection problem
              if (!res || res.status == "failure") {
                Messenger().post({
                  message: 'Serveur non disponible ou problème de connexion',
                  type: 'error',
                  showCloseButton: true
                });
                this.validation = false;
                return;
              } else {
                // console.log("response update civility : " + res.status);
                this.currentUser.titre = this.title;
                this.currentUser.nom = this.lastname;
                this.currentUser.prenom = this.firstname;
                this.currentUser.newAccount = false;
                this.sharedService.setCurrentUser(this.currentUser);
                this.getUserFullname();

                this.validation = false;
                Messenger().post({
                  message: 'Vos données ont été bien enregistrées',
                  type: 'success',
                  showCloseButton: true
                });
                this.showForm = false;
                //redirecting to offers page if new User
                if (isNewUser) {
                  this.router.navigate(['app/offer/list']);
                }

              }

            })
            .catch((error: any) => {
              // console.log(error);
              this.validation = false;
            });

        } else {
            this.civEmployer.getData();
            var companyname = this.companyname;
            var siret = this.siret.substring(0, 17);
            var ape = this.ape.substring(0, 5).toUpperCase();
            var medecineId = this.medecineId;
            var entrepriseId = this.currentUser.employer.entreprises[0].id;
            var conventionId = this.conventionId;
            console.log(companyname,siret,ape,medecineId,entrepriseId,conventionId);

          this.profileService.updateEmployerCivility(title, lastname, firstname, companyname, siret, ape, userRoleId, entrepriseId, medecineId, conventionId, false)
            .then((res: any) => {

              //case of update failure : server unavailable or connection problem
              if (!res || res.status == "failure") {
                Messenger().post({
                  message: 'Serveur non disponible ou problème de connexion',
                  type: 'error',
                  showCloseButton: true
                });
                this.validation = false;
                return;
              } else {
                // data saved
                // console.log("response update civility : " + res.status);
                this.currentUser.titre = this.title;
                this.currentUser.nom = this.lastname;
                this.currentUser.prenom = this.firstname;
                this.currentUser.employer.entreprises[0].nom = this.companyname;
                this.currentUser.employer.entreprises[0].siret = siret;
                this.currentUser.employer.entreprises[0].naf = ape;
                this.currentUser.isNewUser
                this.currentUser.newAccount = false;
                let code = '';
                let libelle = '';
                if (this.conventionId && this.conventionId > 0) {
                  for (let i = 0; i < this.conventions.length; i++)
                    if (this.conventions[i].id == this.conventionId) {
                      code = this.conventions[i].code;
                      libelle = this.conventions[i].libelle;
                      break;
                    }

                }

                this.currentUser.employer.entreprises[0].conventionCollective = {
                  id: this.conventionId,
                  code: code,
                  libelle: libelle
                };
                this.sharedService.setCurrentUser(this.currentUser);
                this.getUserFullname();


                //upload scan
                this.updateScan(accountId, userRoleId, 'employeur');
                this.validation = false;
                if (this.isPersonalAddressModified()) {
                  this.updatePersonalAddress();
                }
                if (this.isJobAddressModified()) {
                  this.updateJobAddress();
                }
                Messenger().post({
                  message: 'Vos données ont été bien enregistrées',
                  type: 'success',
                  showCloseButton: true
                });
                this.showForm = false;
                //redirecting to offers page if new User
                if (this.isNewUser) {
                  this.router.navigate(['app/offer/list']);
                }
              }

            })
            .catch((error: any) => {
              this.validation = false;
              // console.log(error);
            });
        }
      } else {
        console.log("tttt");
        this.civJobyer.getData();
        console.log("tttt2s");
        var numSS = this.numSS;
        var cni = this.cni;
        var birthdate = "";
        // if (!Utils.isEmpty(this.birthdateHidden))
        //   birthdate = moment(this.birthdateHidden).format('MM/DD/YYYY');
        var birthplace = this.selectedCommune.nom;
        var nationalityId = this.nationalityId;
        //var birthcp = this.birthcp;
        var birthdepId = this.birthdepId;
        var numStay = this.numStay;
        var dateStay = (!Utils.isEmpty(this.dateStay) ? moment(this.dateStay).format('YYYY-MM-DD') : null);
        var dateFromStay = (!Utils.isEmpty(this.dateFromStay) ? moment(this.dateFromStay).format('MM/DD/YYYY') : null);
        var dateToStay = (!Utils.isEmpty(this.dateToStay) ? moment(this.dateToStay).format('MM/DD/YYYY') : null);
        var isResident = (this.isResident ? 'Oui' : 'Non');
        var isCIN = this.isCIN
        if (isCIN) {
          numStay = "";
        } else {
          cni = "";
        }
        var birthCountryId = this.birthCountryId;
        var prefecture = this.prefecture;
        var regionId = this.regionId;

        console.log(lastname, firstname, numSS, cni, nationalityId, userRoleId, birthdate, birthdepId, birthplace, birthCountryId, numStay,
          dateStay, dateFromStay, dateToStay, isResident, prefecture, this.isFrench, this.isEuropean, regionId);

        this.profileService.updateJobyerCivility(title, lastname, firstname, numSS, cni, nationalityId, userRoleId, birthdate, birthdepId, birthplace, birthCountryId, numStay,
          dateStay, dateFromStay, dateToStay, isResident, prefecture, this.isFrench, this.isEuropean, regionId)
          .then((res: any) => {

            //case of authentication failure : server unavailable or connection problem
            if (!res || res.status == "failure") {
              Messenger().post({
                message: 'Serveur non disponible ou problème de connexion',
                type: 'error',
                showCloseButton: true
              });
              this.validation = false;
              return;
            } else {
              // data saved
              //console.log("response update civility : " + res.status);
              this.currentUser.titre = this.title;
              this.currentUser.nom = this.lastname;
              this.currentUser.prenom = this.firstname;
              this.currentUser.jobyer.cni = this.cni;
              this.currentUser.jobyer.numSS = this.numSS;
              this.currentUser.jobyer.natId = this.nationalityId;
              this.currentUser.jobyer.dateNaissance = Date.parse(moment(this.birthdateHidden).format('MM/DD/YYYY'));
              this.currentUser.jobyer.lieuNaissance = birthplace;
              this.currentUser.newAccount = false;
              this.sharedService.setCurrentUser(this.currentUser);
              this.getUserFullname();

              //upload scan
              this.updateScan(accountId, userRoleId, "jobyer");
              this.validation = false;
              if (this.isPersonalAddressModified()) {
                this.updatePersonalAddress();
              }
              if (this.isJobAddressModified()) {
                this.updateJobAddress();
              }
              Messenger().post({
                message: 'Vos données ont été bien enregistrées',
                type: 'success',
                showCloseButton: true
              });
              this.showForm = false;

              //redirecting to offers page if new User
              if (this.isNewUser) {
                this.router.navigate(['app/offer/list']);
              }
            }


          })
          .catch((error: any) => {
            //console.log(error);
            this.validation = false;
          });

      }
    }
  }

  updatePersonalAddress() {
    if (this.isValidForm()) {
      this.validation = true;
      var street = this.streetPA;
      var streetNumber = this.streetNumberPA;
      var name = this.namePA;
      var city = this.cityPA;
      var country = this.countryPA;
      var zipCode = this.zipCodePA;
      var accountId = this.accountId;
      var userRoleId = this.userRoleId;

      if (this.isEmployer) {
        var entreprise = this.currentUser.employer.entreprises[0];
        var entrepriseId = "" + entreprise.id + "";
        // update personal address
        this.profileService.updateUserPersonalAddress(entrepriseId, name, streetNumber, street, zipCode, city, country, 'employeur')
          .then((data: any) => {
            if (!data || data.status == "failure") {
              // console.log(data.error);
              // console.log("VitOnJob", "Erreur lors de l'enregistrement des données");
              this.validation = false;
              return;
            } else {
              //id address not send by server
              entreprise.siegeAdress.id = JSON.parse(data._body).id;
              entreprise.siegeAdress.fullAdress = (name ? name + ", " : "") + (streetNumber ? streetNumber + ", " : "") + (street ? street + ", " : "") + (zipCode ? zipCode + ", " : "") + city + ", " + country;
              entreprise.siegeAdress.name = name;
              entreprise.siegeAdress.streetNumber = streetNumber;
              entreprise.siegeAdress.street = street;
              entreprise.siegeAdress.zipCode = zipCode;
              entreprise.siegeAdress.city = city;
              entreprise.siegeAdress.country = country;
              this.currentUser.employer.entreprises[0] = entreprise;
              this.sharedService.setCurrentUser(this.currentUser);

              this.validation = false;

            }
          });
      } else {
        var roleId = "" + this.userRoleId + "";
        // update personal address
        this.profileService.updateUserPersonalAddress(roleId, name, streetNumber, street, zipCode, city, country, 'jobyer')
          .then((data: any) => {
            if (!data || data.status == "failure") {
              // console.log(data.error);

              // console.log("VitOnJob", "Erreur lors de l'enregistrement des données");
              return;
            } else {
              this.validation = false;
              //id address not send by server
              this.currentUser.jobyer.personnalAdress.id = JSON.parse(data._body).id;
              this.currentUser.jobyer.personnalAdress.fullAdress = (name ? name + ", " : "") + (streetNumber ? streetNumber + ", " : "") + (street ? street + ", " : "") + (zipCode ? zipCode + ", " : "") + city + ", " + country;
              this.currentUser.jobyer.personnalAdress.name = name;
              this.currentUser.jobyer.personnalAdress.streetNumber = streetNumber;
              this.currentUser.jobyer.personnalAdress.street = street;
              this.currentUser.jobyer.personnalAdress.zipCode = zipCode;
              this.currentUser.jobyer.personnalAdress.city = city;
              this.currentUser.jobyer.personnalAdress.country = country;
              this.sharedService.setCurrentUser(this.currentUser);

              this.validation = false;

            }
          });
      }
    }
  }

  isPersonalAddressModified() {
    if (this.isEmployer) {
      return (this.personalAddress != this.currentUser.employer.entreprises[0].siegeAdress.fullAdress);
    } else {
      return (this.personalAddress != this.currentUser.jobyer.personnalAdress.fullAdress);
    }
  }

  isJobAddressModified() {
    if (this.isEmployer) {
      return (this.jobAddress != this.currentUser.employer.entreprises[0].workAdress.fullAdress);
    } else {
      return (this.jobAddress != this.currentUser.jobyer.workAdress.fullAdress);
    }
  }

  updateJobAddress() {
    if (this.isValidForm()) {
      this.validation = true;
      var street = this.streetJA;
      var streetNumber = this.streetNumberJA;
      var name = this.nameJA;
      var city = this.cityJA;
      var country = this.countryJA;
      var zipCode = this.zipCodeJA;
      var accountId = this.accountId;
      var userRoleId = this.userRoleId;

      if (this.isEmployer) {
        var entreprise = this.currentUser.employer.entreprises[0];
        var entrepriseId = "" + entreprise.id + "";
        // update personal address
        this.profileService.updateUserJobAddress(entrepriseId, name, streetNumber, street, zipCode, city, country, 'employeur')
          .then((data: any) => {
            if (!data || data.status == "failure") {
              // console.log(data.error);
              // console.log("VitOnJob", "Erreur lors de l'enregistrement des données");
              this.validation = false;
              return;
            } else {
              //id address not send by server
              entreprise.workAdress.id = JSON.parse(data._body).id;
              entreprise.workAdress.fullAdress = (name ? name + ", " : "") + (streetNumber ? streetNumber + ", " : "") + (street ? street + ", " : "") + (zipCode ? zipCode + ", " : "") + city + ", " + country;
              entreprise.workAdress.name = name;
              entreprise.workAdress.streetNumber = streetNumber;
              entreprise.workAdress.street = street;
              entreprise.workAdress.zipCode = zipCode;
              entreprise.workAdress.city = city;
              entreprise.workAdress.country = country;
              this.currentUser.employer.entreprises[0] = entreprise;
              this.sharedService.setCurrentUser(this.currentUser);
              //redirecting to offers page if new User
              this.validation = false;

            }
          });
      } else {
        var roleId = "" + this.userRoleId + "";
        // update personal address
        this.profileService.updateUserJobAddress(roleId, name, streetNumber, street, zipCode, city, country, 'jobyer')
          .then((data: any) => {
            if (!data || data.status == "failure") {
              return;
            } else {
              //id address not send by server
              this.validation = false;
              this.currentUser.jobyer.workAdress.id = JSON.parse(data._body).id;
              this.currentUser.jobyer.workAdress.fullAdress = (name ? name + ", " : "") + (streetNumber ? streetNumber + ", " : "") + (street ? street + ", " : "") + (zipCode ? zipCode + ", " : "") + city + ", " + country;
              this.currentUser.jobyer.workAdress.name = name;
              this.currentUser.jobyer.workAdress.streetNumber = streetNumber;
              this.currentUser.jobyer.workAdress.street = street;
              this.currentUser.jobyer.workAdress.zipCode = zipCode;
              this.currentUser.jobyer.workAdress.city = city;
              this.currentUser.jobyer.workAdress.country = country;
              this.sharedService.setCurrentUser(this.currentUser);

              this.validation = false;
            }
          });
      }
    }
  }
}
