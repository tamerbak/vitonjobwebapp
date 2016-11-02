import {Component, NgZone, ViewEncapsulation, ViewChild, EventEmitter, Input, Output} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {ProfileService} from "../../providers/profile.service";
import {LoadListService} from "../../providers/load-list.service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";
import {AddressUtils} from "../utils/addressUtils";
import {MapsAPILoader} from "angular2-google-maps/core";
import MaskedInput from "angular2-text-mask";

declare var jQuery, Messenger: any;
declare var google: any;

@Component({
  selector: '[modal-profile]',
  template: require('./modal-profile.html'),
  directives: [ROUTER_DIRECTIVES, AlertComponent, MaskedInput],
  providers: [Utils, ProfileService, LoadListService]
})

export class ModalProfile{
  @ViewChild('myForm') form;

  @Input()
  fromPage: string;
  @Input()
  jobyer: any;
  @Input()
  obj: string;
  @Output()
  onProfileUpdated = new EventEmitter<any>();

  msgWelcome1: string;
  msgWelcome2: string;
  forRecruitment: boolean = false;
  isProfileEmpty: boolean;

  public maskSiret = [/[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  public maskApe = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /^[a-zA-Z]*$/]

  title: string = "M.";
  lastname: string;
  firstname: string;

  companyname: string;
  siret: string;
  ape: string;

  personalAddress: string;
  jobAddress: string;
  isValidPersonalAddress: boolean = true;
  isValidJobAddress: boolean = true;
  isValidLastname: boolean = false;
  isValidFirstname: boolean = false;
  isValidCompanyname: boolean = false;
  isValidSiret: boolean = true;
  isValidApe: boolean = true;
  lastnameHint: string = "";
  firstnameHint: string = "";
  companynameHint: string = "";
  siretHint: string = "";
  apeHint: string = "";

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
  projectTarget: string;
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

  /*
   Conventions collectives
   */
  conventionId: number;
  conventions: any = [];

  //spontaneous contact
  isSpontaneaousContact: boolean = false;

  constructor(private listService: LoadListService,
              private profileService: ProfileService,
              private sharedService: SharedService,
              private zone: NgZone,
              private router: Router,
              private _loader: MapsAPILoader) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      return;
    } else {
      this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
      this.msgWelcome1 = "Bienvenue dans Vit-On-Job";
      this.msgWelcome2 = "Vous êtes tout près de trouver votre " + (this.projectTarget == "jobyer" ? 'emploi.' : 'Jobyer.');

      this.getUserInfos();
      this.initForm();

      if (!this.isRecruiter && !this.isEmployer) {
        this.personalAddressLabel = "Adresse personnelle";
        this.jobAddressLabel = "Adresse de départ au travail";
      } else {
        listService.loadConventions().then((response: any) => {
          this.conventions = response;
        });
      }
    }
  }

  ngOnInit() {
    //to decide which fields should be displayed
    if (this.fromPage == "recruitment") {
      this.isProfileEmpty = false;
      this.forRecruitment = true;
    }
  }

  getUserFullname() {
    this.currentUserFullname = (this.currentUser.prenom + " " + this.currentUser.nom).trim();
  }

  getUserInfos() {
    this.getUserFullname();
    this.phoneNumber = this.currentUser.tel;
    this.email = this.currentUser.email;
    this.isNewUser = this.currentUser.newAccount;
    this.isEmployer = this.currentUser.estEmployeur;
    this.isRecruiter = this.currentUser.estRecruteur;
    this.accountId = this.currentUser.id;
    this.userRoleId = this.currentUser.estEmployeur ? this.currentUser.employer.id : this.currentUser.jobyer.id;
    this.isProfileEmpty = (Utils.isEmpty(this.currentUser.title) ? true : false);
  }

  initValidation() {
    this.isValidLastname = false;
    this.isValidFirstname = false;
    this.isValidCompanyname = false;
    this.isValidSiret = false;
    this.isValidApe = false;
    this.isValidPersonalAddress = false;
    this.isValidJobAddress = false;
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
    this.isValidFormForRecruitment();
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
    this.isValidFormForRecruitment();
  }

  autocompletePersonalAddress() {
    this._loader.load().then(() => {
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
          this.isValidFormForRecruitment();
        });
      });
    });
  }

  autocompleteJobAddress() {
    this._loader.load().then(() => {
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
          this.isValidFormForRecruitment();
        });
      });
    });
  }

  initForm() {
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

        if (this.currentUser.employer.entreprises[0].conventionCollective &&
          this.currentUser.employer.entreprises[0].conventionCollective.id > 0) {
          this.conventionId = this.currentUser.employer.entreprises[0].conventionCollective.id;
        }

        this.isValidSiret = true;
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
      }
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
      _hint = "Saisissez un prénom valide";
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

  isValidForm() {
    var _isFormValid = false;
    if (this.isRecruiter) {
      if (this.isValidFirstname && this.isValidLastname) {
        _isFormValid = true;
      } else {
        _isFormValid = false;
      }
    } else if (this.isEmployer) {
      if (this.isValidFirstname && this.isValidLastname && this.isValidCompanyname && this.isValidSiret && (this.isValidApe && !Utils.isEmpty(this.ape)) && this.isValidPersonalAddress && this.isValidJobAddress && !Utils.isEmpty(this.conventionId)) {
        _isFormValid = true;
      } else {
        _isFormValid = false;
      }
    } else {
      if (this.isValidFirstname && this.isValidLastname) {
        _isFormValid = true;
      } else {
        _isFormValid = false;
      }
    }
    return _isFormValid;
  }

  isValidFormForRecruitment() {
    if (this.isValidSiret && !Utils.isEmpty(this.siret) && this.isValidPersonalAddress && !Utils.isEmpty(this.personalAddress) && this.isValidJobAddress && !Utils.isEmpty(this.jobAddress)) {
      return true;
    } else {
      return false;
    }
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

  updateCivility() {
    let isFormValid = this.isValidForm();
    if (isFormValid) {
      this.validation = true;
      var title = this.title;
      var firstname = this.firstname;
      var lastname = this.lastname;
      var accountId = this.accountId;
      var userRoleId = this.userRoleId;
      var isNewUser = this.isNewUser;

      if (this.isEmployer) {
        if (this.isRecruiter) {
          this.profileService.updateRecruiterCivility(title, lastname, firstname, accountId).then((res: any) => {
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
              //redirecting to offers page if new User
              if (isNewUser) {
                this.router.navigate(['app/offer/list']);
              }
              this.close();
            }
          })
            .catch((error: any) => {
              this.validation = false;
            });
        } else {
          var companyname = (!this.companyname ? this.currentUser.employer.entreprises[0].nom : this.companyname);
          var ape = this.ape ? this.ape.substring(0, 5).toUpperCase() : "";
          var entrepriseId = this.currentUser.employer.entreprises[0].id;

          this.profileService.updateEmployerCivilityFirstTime(title, lastname, firstname, companyname, ape, userRoleId, entrepriseId, this.conventionId).then((res: any) => {
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
              this.currentUser.titre = this.title;
              this.currentUser.nom = this.lastname;
              this.currentUser.prenom = this.firstname;
              this.currentUser.employer.entreprises[0].nom = this.companyname;
              this.currentUser.employer.entreprises[0].naf = ape;
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

              this.validation = false;
              if (this.isPersonalAddressModified()) {
                this.updatePersonalAddress();
              }
              if (this.isJobAddressModified()) {
                this.updateJobAddress();
              }

              let value = this.isSpontaneaousContact ? "Oui" : "Non";
              this.profileService.updateSpontaneousContact(value, accountId);

              Messenger().post({
                message: 'Vos données ont été bien enregistrées',
                type: 'success',
                showCloseButton: true
              });

              //redirecting to offers page if new User
              if (this.isNewUser && this.obj != "recruit") {
                this.router.navigate(['app/offer/list']);
              }
              if (this.obj == "recruit") {
                var self = this;
                jQuery('#modal-profile').on('hidden.bs.modal', function (e) {
                  self.router.navigate(['app/search/results', {obj: "recruit"}]);
                })
              }
              this.close();
            }
          })
            .catch((error: any) => {
              this.validation = false;
            });
        }
      } else {
        this.profileService.updateJobyerCivilityFirstTime(title, lastname, firstname, userRoleId).then((res: any) => {
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
            this.currentUser.titre = this.title;
            this.currentUser.nom = this.lastname;
            this.currentUser.prenom = this.firstname;
            this.currentUser.newAccount = false;
            this.sharedService.setCurrentUser(this.currentUser);
            this.getUserFullname();

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

            //redirecting to offers page if new User
            if (this.isNewUser) {
              this.router.navigate(['app/offer/list']);
            }
            this.close();
          }
        })
          .catch((error: any) => {
            this.validation = false;
          });
      }
    }
  }

  updateCivilityForRecruitment() {
    if (this.isValidFormForRecruitment()) {
      this.validation = true;

      if (this.isEmployer) {
        var siret = this.siret.substring(0, 17);
        var entrepriseId = this.currentUser.employer.entreprises[0].id;

        this.profileService.updateEmployerCivilityForRecruitment(siret, entrepriseId).then((res: any) => {
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
            this.currentUser.employer.entreprises[0].siret = siret;
            this.sharedService.setCurrentUser(this.currentUser);

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
            //notify the parent page to open the contract notification modal
            if (this.fromPage == "recruitment") {
              this.onProfileUpdated.emit({obj: "contract", jobyer: this.jobyer});
            }
            this.close();
          }
        })
          .catch((error: any) => {
            this.validation = false;
          });
      }
    }
  }

  updatePersonalAddress() {
    let isFormValid = (this.forRecruitment ? this.isValidFormForRecruitment() : this.isValidForm())
    if (isFormValid) {
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
    let isFormValid = (this.forRecruitment ? this.isValidFormForRecruitment() : this.isValidForm())
    if (isFormValid) {
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
              // console.log(data.error);

              // console.log("VitOnJob", "Erreur lors de l'enregistrement des données");
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

  ngAfterViewInit(): void {
    this._loader.load().then(() => {
      if(!Utils.isEmpty(document.getElementById("autocompletePersonal")))
        this.autocompletePA = new google.maps.places.Autocomplete(document.getElementById("autocompletePersonal"), this.addressOptions);
      if(!Utils.isEmpty(document.getElementById("autocompleteJob")))
        this.autocompleteJA = new google.maps.places.Autocomplete(document.getElementById("autocompleteJob"), this.addressOptions);
    });
  }

  watchSpontaneousContact(e){
    this.isSpontaneaousContact = e.target.value == "Oui" ? true : false;
  }

  close(): void {
    jQuery('#modal-profile').modal('hide');
  }
}
