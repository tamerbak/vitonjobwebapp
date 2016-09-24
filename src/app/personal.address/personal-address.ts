import {Component, ViewEncapsulation, NgZone} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {GoogleplaceDirective} from "angular2-google-map-auto-complete/directives/googleplace.directive";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {ProfileService} from "../../providers/profile.service";
import {CommunesService} from "../../providers/communes.service";
import {LoadListService} from "../../providers/load-list.service";
import {MedecineService} from "../../providers/medecine.service";
import {AttachementsService} from "../../providers/attachements.service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";
import {AddressUtils} from "../utils/addressUtils";
declare var jQuery, require: any;

@Component({
  selector: '[personalAddress]',
  template: require('./personal-address.html'),
  directives: [ROUTER_DIRECTIVES, NKDatetime, AlertComponent, GoogleplaceDirective],
  providers: [Utils, ProfileService, CommunesService, LoadListService, MedecineService, AttachementsService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./personal-address.scss')]
})
export class PersonalAddress {
  searchData: string;
  selectedPlace: any = {id: 0, libelle: ""};
  city: string;
  country: string;
  street: string;
  streetNumber: string;
  name: string;
  zipCode: string;
  isValidZipCode: boolean = false;
  isValidCity: boolean = false;
  isValidCountry: boolean = false;
  cityHint: string;
  countryHint: string;
  zipCodeHint: string;
  s

  //TODO: to change by currentUser object
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
  validation: boolean = false;


  constructor(private listService: LoadListService, private profileService: ProfileService, private sharedService: SharedService, private medecineService: MedecineService, private communesService: CommunesService, private attachementsService: AttachementsService, private zone: NgZone, private router: Router) {
    this.currentUser = this.sharedService.getCurrentUser();
    console.log(this.currentUser);
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.getUserInfos();
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
    this.showForm = this.isNewUser ? true : false;
    this.isEmployer = this.currentUser.estEmployeur;
    this.isRecruiter = this.currentUser.estRecruteur;
    this.accountId = this.currentUser.id;
    this.userRoleId = this.currentUser.estEmployeur ? this.currentUser.employer.id : this.currentUser.jobyer.id;
    //console.log()
  }

  initValidation() {
    this.isValidZipCode = false;
    this.isValidCity = false;
    this.isValidCountry = false;
  }

  initForm() {
    this.showForm = true;
    this.initValidation();
    if (this.isEmployer) {
      var entreprise = this.currentUser.employer.entreprises[0];
      this.searchData = entreprise.siegeAdress.fullAdress;
      this.name = entreprise.siegeAdress.name;
      this.streetNumber = entreprise.siegeAdress.streetNumber;
      this.street = entreprise.siegeAdress.street;
      this.zipCode = entreprise.siegeAdress.zipCode;
      this.city = entreprise.siegeAdress.city;
      this.country = entreprise.siegeAdress.country;

      if (!this.country && this.searchData) {
        this.profileService.getAddressByUser(entreprise.id, 'employer').then((data) => {
          this.name = data[0].name;
          this.streetNumber = data[0].streetNumber;
          this.street = data[0].street;
          this.zipCode = data[0].zipCode;
          this.city = data[0].city;
          this.country = data[0].country;
        });
      }

    } else {
      var jobyer = this.currentUser.jobyer;
      this.searchData = jobyer.personnalAdress.fullAdress;
      this.name = jobyer.personnalAdress.name;
      this.streetNumber = jobyer.personnalAdress.streetNumber;
      this.street = jobyer.personnalAdress.street;
      this.zipCode = jobyer.personnalAdress.zipCode;
      this.city = jobyer.personnalAdress.city;
      this.country = jobyer.personnalAdress.country;
      if (!this.country && this.searchData) {
        this.profileService.getAddressByUser(jobyer.id, 'jobyer').then((data) => {
          this.name = data[0].name;
          this.streetNumber = data[0].streetNumber;
          this.street = data[0].street;
          this.zipCode = data[0].zipCode;
          this.city = data[0].city;
          this.country = data[0].country;
        });
      }
    }
    if (this.zipCode) {
      this.isValidZipCode = true;
    } else {
      this.isValidZipCode = false;
    }

    if (this.city) {
      this.isValidCity = true;
    } else {
      this.isValidCity = false;
    }

    if (this.country) {
      this.isValidCountry = true;
    } else {
      this.isValidCountry = false;
    }
  }


  getAddress(place: Object) {
    this.searchData = place['formatted_address'];
    var addressObj = AddressUtils.decorticateGeolocAddress(place);
    this.zone.run(()=> {
      this.name = !addressObj.name ? '' : addressObj.name.replace("&#39;", "'");
      this.streetNumber = addressObj.streetNumber.replace("&#39;", "'");
      this.street = addressObj.street.replace("&#39;", "'");
      this.zipCode = addressObj.zipCode;
      this.city = addressObj.city.replace("&#39;", "'");
      this.country = (addressObj.country.replace("&#39;", "'") == "" ? 'France' : addressObj.country.replace("&#39;", "'"));
      if (this.zipCode) {
        this.isValidZipCode = true;
      } else {
        this.isValidZipCode = false;
      }

      if (this.city) {
        this.isValidCity = true;
      } else {
        this.isValidCity = false;
      }

      if (this.country) {
        this.isValidCountry = true;
      } else {
        this.isValidCountry = false;
      }
      this.isValidForm();
    });

  }


  watchCity(e) {
    let _name = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (!Utils.isValidName(_name)) {
      _hint = "Saisissez un nom valide";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidCity = _isValid;
    this.cityHint = _hint;
    console.log();
    this.isValidForm();
  }

  watchCountry(e) {
    let _name = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (!Utils.isValidName(_name)) {
      _hint = "Saisissez un nom valide";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidCountry = _isValid;
    this.countryHint = _hint;
    console.log();
    this.isValidForm();
  }


  watchZipCode(e) {
    var _regex = new RegExp('_', 'g')
    var _rawvalue = e.target.value.replace(_regex, '')

    var _value = (_rawvalue === '' ? '' : _rawvalue).trim();
    console.log(_value, _value.length)
    let _isValid: boolean = true;
    let _hint: string = "";

    if (_value.length != 5) {
      _hint = "Saisissez les 14 chiffres du SIRET";
      _isValid = false;
    } else {
      _hint = "";
    }
    this.isValidZipCode = _isValid;
    this.zipCodeHint = _hint;
    console.log();
    this.isValidForm();
  }


  isValidForm() {
    var _isFormValid = false;

    if (this.isValidCity && this.isValidCountry && this.isValidZipCode) {
      _isFormValid = true;
    } else {
      _isFormValid = false;
    }

    return _isFormValid;
  }


  closeForm() {
    this.showForm = false;
  }

  updatePersonalAddress() {
    console.log(this.isValidForm())
    if (this.isValidForm()) {
      this.validation = true;
      var street = this.street;
      var streetNumber = this.streetNumber;
      var name = this.name;
      var city = this.city;
      var country = this.country;
      var zipCode = this.zipCode;
      var accountId = this.accountId;
      var userRoleId = this.userRoleId;

      if (this.isEmployer) {
        var entreprise = this.currentUser.employer.entreprises[0];
        var entrepriseId = "" + entreprise.id + "";
        // update personal address
        this.profileService.updateUserPersonalAddress(entrepriseId, name, streetNumber, street, zipCode, city, country, 'employeur')
          .then((data: any) => {
            if (!data || data.status == "failure") {
              console.log(data.error);
              console.log("VitOnJob", "Erreur lors de la sauvegarde des données");
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
              //redirecting to job address tab
              this.validation = false;
              // if(this.fromPage == "profil"){
              // 	this.nav.pop();
              // }else{
              // 	//redirecting to job address tab
              // 	//this.tabs.select(2);
              // 	this.nav.push(JobAddressPage);
              // }
            }
          });
      } else {
        var roleId = this.userRoleId;
        // update personal address
        this.profileService.updateUserPersonalAddress(roleId, name, streetNumber, street, zipCode, city, country, 'jobyer')
          .then((data: any) => {
            if (!data || data.status == "failure") {
              console.log(data.error);

              console.log("VitOnJob", "Erreur lors de la sauvegarde des données");
              return;
            } else {
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
              // if(this.fromPage == "profil"){
              // 	this.nav.pop();
              // }else{
              // 	//redirecting to job address tab
              // 	//this.tabs.select(2);
              // 	this.nav.push(JobAddressPage);
              // }
            }
          });
      }


    }
  }


}
