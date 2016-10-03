import {Component, NgZone, ViewEncapsulation,ViewChild} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
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
import MaskedInput from "angular2-text-mask";

declare var jQuery, require, Messenger, moment: any;
declare var google: any;

@Component({
  selector: '[profile]',
  template: require('./profile.html'),
  directives: [ROUTER_DIRECTIVES, NKDatetime, AlertComponent, ModalPicture, MaskedInput],
  providers: [Utils, ProfileService, CommunesService, LoadListService, MedecineService, AttachementsService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')]
})
export class Profile {
  public maskSiret = [/[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  public maskApe = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /^[a-zA-Z]*$/]

  @ViewChild('myForm') form;

  title: string = "M.";
  lastname: string;
  firstname: string;
  companyname: string;
  siret: string;
  ape: string;
  birthcp:string;
  birthcpForeigner: string;


  selectedCP:any;
  birthdate: Date;
  birthdateHidden: Date;
  selectedMedecine: any = {id: 0, libelle: ""};
  cni: string;
  numSS: string;
  nationalityId: any = "91";
  nationalities = [];
  personalAddress: string;
  jobAddress: string;
  isValidPersonalAddress: boolean = false;
  isValidJobAddress: boolean = false;
  isValidLastname: boolean = false;
  isValidFirstname: boolean = false;
  isValidCompanyname: boolean = false;
  isValidSiret: boolean = false;
  isValidApe: boolean = false;
  isValidBirthdate: boolean = false;
  isValidCni: boolean = true;
  isValidNumSS: boolean = true;
  lastnameHint: string = "";
  firstnameHint: string = "";
  companynameHint: string = "";
  siretHint: string = "";
  apeHint: string = "";
  birthdateHint: string = "";
  cniHint: string = "";
  numSSHint: string = "";
  selectedCommune: any = {id: '0', nom: '', code_insee: ''}
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
  communesData:any = [];
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

  setImgClasses() {
    return {
      'img-circle': true,//TODO:this.currentUser && this.currentUser.estEmployeur,
    };
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
        listService.loadNationalities().then((response: any) => {
          this.nationalities = response.data;
          this.dataForNationalitySelectReady = true;
          if(this.isFrench || this.isEuropean == 0) {
            this.scanTitle = " de votre CNI ou Passeport";
          }
          if(this.isEuropean == 1){
            this.scanTitle = " de votre titre du séjour";
          }
        });

      } else {
        this.scanTitle = " de votre extrait k-bis";
      }
    }
    this.isFrench = true;

    //load countries list
    this.listService.loadCountries("jobyer").then((data: any) => {
      this.pays = data.data;
    });
    if(!this.isEmployer && !this.isNewUser)
      this.profileService.loadAdditionalUserInformations(this.currentUser.jobyer.id).then((data: any) =>{
        data = data.data[0];
        this.regionId = data.fk_user_identifiants_nationalite;
        if(this.regionId == '40'){
          this.isFrench = true;
        }else{
          this.index = data.fk_user_pays;
          if(this.regionId == '42'){
            this.isEuropean = 1;
            this.isFrench = false;
            this.dateStay = data.date_de_delivrance;
            this.dateFromStay = data.debut_validite;
            this.dateToStay = data.fin_validite;
            this.whoDeliverStay = data.instance_delivrance;
            this.numStay = !this.isEmpty(data.numero_titre_sejour) ? data.numero_titre_sejour : "";
            this.nationalityId = data.numero_titre_sejour;
          }else{
            this.isEuropean = 0;
            this.isFrench = false;
          }
        }
    })
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
  }

  initValidation() {
    this.isValidLastname = false;
    this.isValidFirstname = false;
    this.isValidCompanyname = false;
    this.isValidSiret = false;
    this.isValidApe = false;
    this.isValidBirthdate = false;
    this.isValidCni = false;
    this.isValidNumSS = false;
    this.isValidPersonalAddress = false;
    this.isValidJobAddress = false;
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

  formHasChanges(){
    if(this.showForm){
      return true;
    }
    return false;
  }

  initForm() {
    this.showForm = true;
    this.initValidation();
    this.title = !this.currentUser.titre ? "M." : this.currentUser.titre;
    jQuery('.titleSelectPicker').selectpicker('val', this.title);
    this.lastname = this.currentUser.nom;
    this.firstname = this.currentUser.prenom;

    if (!Utils.isEmpty(this.lastname)) {
      this.isValidFirstname = true;
    }

    if (!Utils.isEmpty(this.lastname)) {
      this.isValidLastname = true;
    }
    if (!this.isRecruiter) {
      if (this.isEmployer && this.currentUser.employer.entreprises.length != 0) {
        this.companyname = this.currentUser.employer.entreprises[0].nom;
        this.siret = this.currentUser.employer.entreprises[0].siret;
        this.ape = this.currentUser.employer.entreprises[0].naf;
        this.medecineService.getMedecine(this.currentUser.employer.entreprises[0].id).then((res: any)=> {
          if (res && res != null) {
            this.selectedMedecine = {id: res.id, libelle: res.libelle};
            jQuery(".medecine-select").select2('data', this.selectedMedecine);
          }
        });
        this.isValidSiret = true;
        this.isValidApe = true;
        if (!Utils.isEmpty(this.companyname)) {
          this.isValidCompanyname = true;
        }
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

        if (!this.personalAddress) {
          this.isValidPersonalAddress = false;
        } else {
          this.isValidPersonalAddress = true;
        }

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

        if (!this.jobAddress) {
          this.isValidJobAddress = false;
        } else {
          this.isValidJobAddress = true;
        }
      } else {
        if (this.currentUser.jobyer.dateNaissance) {
          var birthDate = moment(new Date(this.currentUser.jobyer.dateNaissance)).format('DD/MM/YYYY');
          this.birthdateHidden = new Date(this.currentUser.jobyer.dateNaissance)
          this.isValidBirthdate = true;
          jQuery("#birthdate input").val(birthDate);

        } else {
          this.birthdate = null;
          this.birthdateHidden = null;
          this.isValidBirthdate = false;
        }
        var _birthplace = this.currentUser.jobyer.lieuNaissance;
        if (_birthplace !== null) {
          this.communesService.getCommune(_birthplace).then((res: any) => {

            if (res && res.length > 0) {
              this.selectedCommune = res[0];
              jQuery(".commune-select").select2('data', this.selectedCommune);
              if(this.selectedCommune.fk_user_code_postal && this.selectedCommune.fk_user_code_postal != "null"){
                this.selectedCP = parseInt(this.selectedCommune.fk_user_code_postal);
                this.birthcp = this.selectedCommune.code;
                jQuery(".cp-select").select2('data', {id:this.selectedCP,code:this.birthcp});
              } else {
                this.selectedCP = 0;
                this.birthcp = '';
                jQuery(".cp-select").select2('data', {id:this.selectedCP,code:this.birthcp});
              }
            }else{
              this.selectedCommune = {id: '0', nom: _birthplace, code_insee: '0'};
              jQuery(".commune-select").select2('data', this.selectedCommune);
            }
            this.isValidNumSS = true;
          });
        }
        //this.selectedCommune = {id:0, nom: this.currentUser.jobyer.lieuNaissance, code_insee: ''}
        this.isValidNumSS = true;
        this.cni = this.currentUser.jobyer.cni;
        this.numSS = this.currentUser.jobyer.numSS;
        this.nationalityId = this.currentUser.jobyer.natId == 0 ? "91" : this.currentUser.jobyer.natId;
        jQuery('.nationalitySelectPicker').selectpicker('val', this.nationalityId);

        this.isValidCni = true;

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
        if (!this.personalAddress) {
          this.isValidPersonalAddress = false;
        } else {
          this.isValidPersonalAddress = true;
        }

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

        if (!this.jobAddress) {
          this.isValidJobAddress = false;
        } else {
          this.isValidJobAddress = true;
        }

      }

    }
    if((<HTMLInputElement>document.getElementById("dateStay")) != null)
      (<HTMLInputElement>document.getElementById("dateStay")).value = moment(this.dateStay).format("YYYY-MM-DD");
    if((<HTMLInputElement>document.getElementById("dateFromStay")) != null)
    (<HTMLInputElement>document.getElementById("dateFromStay")).value = moment(this.dateFromStay).format("YYYY-MM-DD");
    if((<HTMLInputElement>document.getElementById("dateToStay")) != null)
    (<HTMLInputElement>document.getElementById("dateToStay")).value = moment(this.dateToStay).format("YYYY-MM-DD");

    this.profileService.getPrefecture(this.whoDeliverStay).then((data: any) => {
      if(data && data.status == "success" && data.data && data.data.length != 0)
      jQuery(".whoDeliver-select").select2('data', {id: data.data[0].id, nom: this.whoDeliverStay});
    })
  }

  updateScan(accountId, userId, role) {
    if (this.scanData) {
      this.currentUser.scanUploaded = true;
      this.sharedService.setCurrentUser(this.currentUser);
      //TODO : test "'"+userId+"'"
      this.profileService.uploadScan(this.scanData, userId, 'scan', 'upload', role)
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
        this.attachementsService.uploadFile(accountId, 'scan ' + this.scanTitle, this.scanData);
      }

    }
  }

  ngAfterViewChecked() {
    if (!this.isEmployer) {
      if (this.dataForNationalitySelectReady) {
        jQuery('.nationalitySelectPicker').selectpicker();
      }
    }


  }

  ngAfterViewInit(): void {
    var self = this;
    this._loader.load().then(() => {
      this.autocompletePA = new google.maps.places.Autocomplete(document.getElementById("autocompletePersonal"), this.addressOptions);
      this.autocompleteJA = new google.maps.places.Autocomplete(document.getElementById("autocompleteJob"), this.addressOptions);
    });
    jQuery('.titleSelectPicker').selectpicker();
    jQuery(document).ready(function () {
      jQuery('.fileinput').on('change.bs.fileinput', function (e, file) {
        self.scanData = file.result;
      })
    });

    if (!this.isRecruiter && !this.isEmployer) {
      var self = this;
      jQuery('.cp-select').select2({
          ajax:
          {
            url: Configs.sqlURL,
            type: 'POST',
            dataType: 'json',
            quietMillis: 250,
            params: {
              contentType: "text/plain",
            },
            data: function (term, page) {
                return "select pk_user_code_postal as id, code from user_code_postal where code like '%"+term+"%'" // search term
            },
            results: function (data, page) {
                return { results: data.data };
            },
            cache: true
          },

          formatResult: function(item) {
            return item.code;
          },
          formatSelection: function(item) {
            return item.code;
          },
          dropdownCssClass: "bigdrop",
          escapeMarkup: function (markup) { return markup; },
          minimumInputLength: 4,
        });
        jQuery('.cp-select').on('change',
                (e) =>
                {
                  self.birthcp = e.added.code;
                  self.selectedCP = e.added.id;
                  self.selectedCommune = null;
                }
              );

              var val = ""
      jQuery('.commune-select').select2({
        maximumSelectionLength: 1,
        tokenSeparators: [",", " "],
        createSearchChoice: function(term, data) {
          if (self.communesData.length == 0) {
            return {
              id: '0', nom: term, code_insee: "0"
            };
          }
        },
        ajax: {
          url: Configs.sqlURL,
          type: 'POST',
          dataType: 'json',
          quietMillis: 250,
          params: {
            contentType: "text/plain",
          },
          data: function (term, page) {
            val  = term;
            if(!self.selectedCP || self.selectedCP == 0){
              return "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('%"+term+"%') UNION select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('"+term+"') limit 5";
            }else{
              //return "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('%"+term+"%') and fk_user_code_postal="+self.selectedCP+" UNION select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('"+term+"') and fk_user_code_postal="+self.selectedCP+" limit 5";
              return "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('%"+term+"%') and fk_user_code_postal="+self.selectedCP+" UNION select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('"+term+"') and fk_user_code_postal="+self.selectedCP+" limit 5";
            }
          },
          results: function (data, page) {
            self.communesData = data.data;
            return {results: data.data};
          },
          cache: false,

        },

        formatResult: function (item) {
          return item.nom;
        },
        formatSelection: function (item) {
          return item.nom;
        },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) {
          return markup;
        },
        minimumInputLength: 3,
      });

      jQuery('.commune-select').on('select2-selecting',
        (e) => {
          self.selectedCommune = e.choice;
        }
      )
    }

    if (!this.isRecruiter && this.isEmployer) {
      jQuery('.medecine-select').select2({

        ajax: {
          url: Configs.sqlURL,
          type: 'POST',
          dataType: 'json',
          quietMillis: 250,
          params: {
            contentType: "text/plain",
          },
          data: function (term, page) {
            return "select pk_user_medecine_de_travail as id, libelle from user_medecine_de_travail where lower_unaccent(libelle) % lower_unaccent('" + term + "') limit 5"; // search term
          },
          results: function (data, page) {
            return {results: data.data};
          },
          cache: true
        },
        formatResult: function (item) {
          return item.libelle;
        },
        formatSelection: function (item) {
          return item.libelle;
        },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) {
          return markup;
        },
        minimumInputLength: 3,
      });
      jQuery('.medecine-select').on('change',
        (e) => {
          this.selectedMedecine = e.added;
        }
      );
    }

    if (!this.isEmployer) {
      jQuery('.whoDeliver-select').select2({

        ajax: {
          url: Configs.sqlURL,
          type: 'POST',
          dataType: 'json',
          quietMillis: 250,
          params: {
            contentType: "text/plain",
          },
          data: function (term, page) {
            return "select pk_user_prefecture as id, nom from user_prefecture where lower_unaccent(nom) like lower_unaccent('%" + term + "%') limit 10"; // search term
          },
          results: function (data, page) {
            return {results: data.data};
          },
          cache: true
        },
        formatResult: function (item) {
          return item.nom;
        },
        formatSelection: function (item) {
          return item.nom;
        },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) {
          return markup;
        },
        minimumInputLength: 3,
      });
      jQuery('.whoDeliver-select').on('change',
        (e) => {
          this.whoDeliverStay = e.added.nom;
        }
      );
    }

  }

  watchLastname(e) {
    let _name = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (!Utils.isValidName(_name)) {
      _hint = "Saisissez un nom valide";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidLastname = _isValid;
    this.lastnameHint = _hint;
    console.log();
    this.isValidForm();
  }

  watchFirstname(e) {
    let _name = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (!Utils.isValidName(_name)) {
      _hint = "Saisissez un nom valide";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidFirstname = _isValid;
    this.firstnameHint = _hint;
    console.log();
    this.isValidForm();
  }

  watchCompanyname(e) {
    let _name = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (!_name) {
      _hint = "Veuillez saisir le nom de votre entreprise";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidCompanyname = _isValid;
    this.companynameHint = _hint;
    console.log();
    this.isValidForm();
  }

  watchSiret(e) {
    var _regex = new RegExp('_', 'g')
    var _rawvalue = e.target.value.replace(_regex, '')
    var _value = (_rawvalue === '' ? '' : _rawvalue).trim();
    let _isValid: boolean = true;
    let _hint: string = "";

    if (_value.length != 0 && _value.length != 17) {
      _hint = "Saisissez les 14 chiffres du SIRET";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidSiret = _isValid;
    this.siretHint = _hint;
    this.isValidForm();
  }

  watchApe(e) {
    var _regex = new RegExp('_', 'g')
    var _rawvalue = e.target.value.replace(_regex, '')

    var _value = (_rawvalue === '' ? '' : _rawvalue).trim();
    let _isValid: boolean = true;
    let _hint: string = "";

    if (_value.length != 0 && _value.length != 5) {
      _hint = "Saisissez les 4 chiffres suivis d'une lettre";
      _isValid = false;
    } else {
      _hint = "";
    }
    this.isValidApe = _isValid;
    this.apeHint = _hint;
    this.isValidForm();
  }

  watchCni(e) {
    var _cni = e.target.value;

    let _isValid: boolean = true;
    let _hint: string = "";

    if (_cni.length != 0 && _cni.length != 12) {
      _hint = "Saisissez les 12 chiffres suivis du CNI";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidCni = _isValid;
    this.cniHint = _hint;
    console.log();
    this.isValidForm();
  }

  watchNumSS(e) {
    var _numSS = e.target.value;

    let _isValid: boolean = true;
    let _hint: string = "";
    if (_numSS.length != 0 && _numSS.length != 15) {
      _hint = "Saisissez les 15 chiffres du n° SS";
      _isValid = false;
    } else if (_numSS.length == 15) {

      if (_numSS.length == 15 && !this.checkGender(_numSS, this.title)) {
        _hint = "* Le numéro de sécurité sociale renseigné ne correspond pas aux informations personnelles";
        _isValid = false;
      }
      else if (_numSS.length == 15 && !this.checkBirthYear(_numSS, this.birthdateHidden)) {
        _hint = "* Le numéro de sécurité sociale renseigné ne correspond pas aux informations personnelles";
        _isValid = false;
      }
      else if (_numSS.length == 15 && !this.checkBirthMonth(_numSS, this.birthdateHidden)) {
        _hint = "* Le numéro de sécurité sociale renseigné ne correspond pas aux informations personnelles";
        _isValid = false;
      }
      else if (_numSS.length == 15 && !this.checkINSEE(_numSS, this.selectedCommune)) {
        _hint = "* Le numéro de sécurité sociale renseigné ne correspond pas aux informations personnelles";
        _isValid = false;
      }
      else if (_numSS.length == 15 && !this.checkModKey(_numSS)) {
        _hint = "* Le numéro de sécurité sociale renseigné ne correspond pas aux informations personnelles";
        _isValid = false;
      } else {
        _hint = "";
      }
    } else {
      _hint = "";
    }

    this.isValidNumSS = _isValid;
    this.numSSHint = _hint;
    console.log();
    this.isValidForm();
  }

  checkGender(num: string, title: string) {

    let indicator = num.charAt(0);
    if ((indicator === '1' && title === 'M.') || (indicator === '2' && title !== 'M.')) {

      return true;
    } else {

      return false;
    }
  }

  checkBirthYear(num: string, date: any) {
    if (date == null) {
      return false
    }
    let indicator = num.charAt(1) + num.charAt(2);

    var birthYear = "" + date.getFullYear()
    birthYear = birthYear.substring(2);

    if (indicator == birthYear)
      return true;
    else
      return false;
  }

  checkBirthMonth(num: string, date: any) {

    if (!date) {
      return false
    }
    let indicator = num.charAt(3) + num.charAt(4);

    let birthMonth = 1 + date.getMonth() + ""

    if (birthMonth.length == 1)
      birthMonth = "0" + birthMonth;

    if (indicator == birthMonth)
      return true;
    else
      return false;
  }

  checkINSEE(num: string, communeObj: any) {

    let indicator = num.substring(5, 10);

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

  checkModKey(num: string) {

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

  watchBirthdate(e) {
    var _date = e;
    let _isValid: boolean = true;
    let _hint: string = "";

    var ageDifMs = Date.now() - new Date(_date).getTime();
    var ageDate = new Date(ageDifMs);
    var _diff = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (_diff < 18) {
      _isValid = false;
      _hint = "* Vous devez avoir plus de 18 ans pour pouvoir valider votre profil";
    } else {
      _hint = "";
    }

    this.birthdateHidden = e;
    this.isValidBirthdate = _isValid;
    this.birthdateHint = _hint;
    console.log();
    this.isValidForm();

  }

  isValidForm() {
    var _isFormValid = false;
    if (this.isRecruiter) {
      if (this.isValidFirstname && this.isValidLastname) {
        _isFormValid = true;
      } else {
        _isFormValid = false;
      }
    } else if (this.isEmployer) {

      if (this.isValidFirstname && this.isValidLastname && this.isValidCompanyname && this.isValidSiret && this.isValidApe && this.isValidPersonalAddress && this.isValidJobAddress) {
        _isFormValid = true;
      } else {
        _isFormValid = false;
      }
    } else {
      if (this.isValidFirstname && this.isValidLastname && this.isValidCni && this.isValidNumSS && this.isValidBirthdate && this.isValidPersonalAddress && this.isValidJobAddress) {
        _isFormValid = true;
      } else {
        _isFormValid = false;
      }
    }
    return _isFormValid;
  }


  IsCompanyExist(e, field) {
    //verify if company exists
    if (field == "companyname") {
      this.profileService.countEntreprisesByRaisonSocial(this.companyname).then((res: any) => {
        if (res.data[0].count != 0 && this.companyname != this.currentUser.employer.entreprises[0].nom) {
          if (!Utils.isEmpty(this.currentUser.employer.entreprises[0].nom)) {
            this.companyAlert = "L'entreprise " + this.companyname + " existe déjà. Veuillez saisir une autre raison sociale.";
            this.showCurrentCompanyBtn = true;
            // this.companyname = this.currentUser.employer.entreprises[0].nom;
          } else {
            this.companyAlert = this.companyInfosAlert('companyname');
            this.showCurrentCompanyBtn = false;
          }
        } else {
          this.companyAlert = "";
          this.showCurrentCompanyBtn = false;
          console.log()
          return;
        }
      })
    } else {
      this.profileService.countEntreprisesBySIRET(this.siret).then((res: any) => {
        if (res.data[0].count != 0 && this.siret != this.currentUser.employer.entreprises[0].siret) {
          if (!Utils.isEmpty(this.currentUser.employer.entreprises[0].nom)) {
            this.siretAlert = "Le SIRET " + this.siret + " existe déjà. Veuillez en saisir un autre.";
            this.showCurrentSiretBtn = true;
            //this.siret = this.currentUser.employer.entreprises[0].siret;
          } else {
            this.siretAlert = this.companyInfosAlert('siret');
            this.showCurrentSiretBtn = false;
          }
        } else {
          this.siretAlert = "";
          this.showCurrentSiretBtn = false;
          console.log()
          return;
        }
      })
    }
  }

  companyInfosAlert(field) {
    var message = (field == "siret" ? ("Le SIRET " + this.siret) : ("La raison sociale " + this.companyname)) + " existe déjà. Si vous continuez, ce compte sera bloqué, \n sinon veuillez en saisir " + (field == "siret" ? "un " : "une ") + "autre. \n Voulez vous continuez?";
    return message;
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

  watchIsFrench(e) {
    this.isFrench = e.target.value == "1" ? true : false;
    if(!this.isFrench)
      this.isEuropean = 0;

    if(this.isFrench) {
      this.scanTitle = " de votre CNI ou Passeport";
    }else{
      this.scanTitle = " de votre titre du séjour";
    }
  }

  updateCivility() {
    if (this.isValidForm()) {
      this.validation = true;
      var title = this.title;
      var firstname = this.firstname;
      var lastname = this.lastname;
      var accountId = this.accountId;
      var userRoleId = this.userRoleId;
      var isNewUser = this.isNewUser;

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
                  message: 'Vos données ont été bien sauvegardées',
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
          var companyname = this.companyname;
          var siret = this.siret.substring(0, 17);
          var ape = this.ape.substring(0, 5).toUpperCase();
          var medecineId = this.selectedMedecine.id === "0" ? 0 : parseInt(this.selectedMedecine.id);
          var entrepriseId = this.currentUser.employer.entreprises[0].id;

          this.profileService.updateEmployerCivility(title, lastname, firstname, companyname, siret, ape, userRoleId, entrepriseId, medecineId)
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
                  message: 'Vos données ont été bien sauvegardées',
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
        var numSS = this.numSS;
        var cni = this.cni;
        var birthdate = moment(this.birthdateHidden).format('MM/DD/YYYY');
        var birthplace = this.selectedCommune.nom;
        var nationalityId = this.nationalityId;
        var birthcp = this.birthcp;
        var numStay = this.numStay;
        var dateStay = moment(this.dateStay).format('MM/DD/YYYY');
        var dateFromStay = moment(this.dateFromStay).format('MM/DD/YYYY');
        var dateToStay = moment(this.dateToStay).format('MM/DD/YYYY');
        var birthCountryId = this.profileService.getCountryByIndex(this.index, this.pays).id;
        var prefecture = this.whoDeliverStay;
        var regionId = this.regionId;

        this.profileService.updateJobyerCivility(title, lastname, firstname, numSS, cni, nationalityId, userRoleId, birthdate, birthplace, birthCountryId, numStay, dateStay, dateFromStay, dateToStay, prefecture, this.isFrench, this.isEuropean, regionId)
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
              this.currentUser.jobyer.dateNaissance = Date.parse(moment(this.birthdateHidden).format('MM/DD/YYYY'))
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
                message: 'Vos données ont été bien sauvegardées',
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
              // console.log("VitOnJob", "Erreur lors de la sauvegarde des données");
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

              // console.log("VitOnJob", "Erreur lors de la sauvegarde des données");
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
              // console.log("VitOnJob", "Erreur lors de la sauvegarde des données");
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
              // console.log(data.error);

              // console.log("VitOnJob", "Erreur lors de la sauvegarde des données");
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
  selectNationality(e){
    this.profileService.getIdentifiantNationalityByNationality(e.target.value).then((data: any)=> {
      this.isEuropean = data.data[0].pk_user_identifiants_nationalite == "42" ? 1 : 0;
      this.regionId = data.data[0].pk_user_identifiants_nationalite;
      if(this.isFrench || this.isEuropean == 0) {
        this.scanTitle = " de votre CNI ou Passeport";
      }
      if(this.isEuropean == 1){
        this.scanTitle = " de votre titre du séjour";
      }
    })
  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }

}
