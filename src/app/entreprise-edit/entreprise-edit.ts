import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {EntrepriseService} from "../../providers/entreprise.service";
import {ProfileService} from "../../providers/profile.service";
import {Utils} from "../utils/utils";
import {SharedService} from "../../providers/shared.service";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {LoadListService} from "../../providers/load-list.service";
import MaskedInput from "angular2-text-mask";
import {ModalCorporamaSearch} from "../modal-corporama-search/modal-corporama-search";
import {AddressService} from "../../providers/address.service";
import {Entreprise} from "../../dto/entreprise";

declare let jQuery: any;
declare let Messenger: any;

@Component({
  selector: '[entreprise-edit]',
  template: require('./entreprise-edit.html'),
  directives: [ROUTER_DIRECTIVES, AlertComponent, MaskedInput, ModalCorporamaSearch],
  styles: [require('./entreprise-edit.scss')],
  providers: [EntrepriseService, ProfileService, SharedService, LoadListService, AddressService]
})
export class EntrepriseEdit {

  entreprise: Entreprise;

  currentUser: any;

  // ape: string;

  isValidCompanyname: boolean = false;
  public maskApe = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /^[a-zA-Z]*$/];
  isValidApe: boolean = true;

  companynameHint: string = "";
  apeHint: string = "";

  companyAlert: string = "";
  showCurrentCompanyBtn: boolean = false;

  // Conventions collectives
  // conventionId: number;
  conventions: any = [];

  constructor(private listService: LoadListService,
              private entrepriseService: EntrepriseService,
              private sharedService: SharedService,
              private router: Router,
              private profileService: ProfileService,
              private addressService: AddressService) {
    this.entreprise = new Entreprise();
    this.currentUser = this.sharedService.getCurrentUser();
    listService.loadConventions().then((response: any) => {
      this.conventions = response;
    });
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


  IsCompanyExist(e, field) {
    this.currentUser  =this.sharedService.getCurrentUser();
    //verify if company exists
    this.profileService.countEntreprisesByRaisonSocial(this.entreprise.nom).then((res: any) => {
      if (res.data[0].count != 0 && this.entreprise.nom != this.currentUser.employer.entreprises[0].nom) {
        if (!Utils.isEmpty(this.currentUser.employer.entreprises[0].nom)) {
          this.companyAlert = "L'entreprise " + this.entreprise.nom + " existe déjà. Veuillez saisir une autre raison sociale.";
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
    });
  }

  companyInfosAlert(field) {
    let message = (field == "siret" ? ("Le SIRET " + this.entreprise.siret) : ("La raison sociale " + this.entreprise.nom)) + " existe déjà. Si vous continuez, ce compte sera bloqué, \n sinon veuillez en saisir " + (field == "siret" ? "un " : "une ") + "autre. \n Voulez vous continuez?";
    return message;
  }

  watchApe(e) {
    let _regex = new RegExp('_', 'g')
    let _rawvalue = e.target.value.replace(_regex, '')

    let _value = (_rawvalue === '' ? '' : _rawvalue).trim();
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
    let _isFormValid = false;
    if (this.isValidCompanyname && (this.isValidApe && !Utils.isEmpty(this.entreprise.naf)) && !Utils.isEmpty(this.entreprise.conventionCollective.id)) {
      _isFormValid = true;
    } else {
      _isFormValid = false;
    }
    return _isFormValid;
  }

  updateEntreprise() {
    let isFormValid = this.isValidForm();

    if (isFormValid) {
      this.entrepriseService.createEntreprise(
        this.currentUser.id,
        this.currentUser.employer.id,
        this.entreprise.nom,
        this.entreprise.naf,
        this.entreprise.conventionCollective.id,
        this.entreprise.siret
      ).then((result: any) => {
        if(result.status == 'success') {

          // Get entreprise id
          this.entreprise.id = result.data[0].pk_user_entreprise;

          // Update addresses
          this.updateAddresses();

          this.currentUser = this.sharedService.getCurrentUser();
          if (Utils.isEmpty(this.currentUser.employer.entreprises) == true) {
            this.currentUser.employer.entreprises = [];
          }
          this.currentUser.employer.entreprises.push(this.entreprise);
          this.sharedService.setCurrentUser(this.currentUser);

          // switch to new entreprise
          this.entrepriseService.swapEntreprise(this.currentUser.employer.entreprises.length - 1);

          this.router.navigate(['app/home']);
        }
      });
    }
  }

  /**
   * Save the 3 addresses of the new entreprise
   */
  updateAddresses() {

    this.addressService
      .updateMainAddress(this.entreprise.id, this.entreprise.siegeAdress, 'employeur')
      .then((data: any) => {
        if (!data || data.status == "failure") {
          console.log("VitOnJob", "Erreur lors de l'enregistrement des données");
          return;
        } else {
          console.log("VitOnJob", "Enregistrement des données effectué");
          let result = JSON.parse(data._body);
          this.entreprise.siegeAdress.id = result.id;
        }
      });

    this.addressService
      .updateJobAddress(this.entreprise.id, this.entreprise.workAdress, 'employeur')
      .then((data: any) => {
        if (!data || data.status == "failure") {
          console.log("VitOnJob", "Erreur lors de l'enregistrement des données");
          return;
        } else {
          console.log("VitOnJob", "Enregistrement des données effectué");
          let result = JSON.parse(data._body);
          this.entreprise.workAdress.id = result.id;
        }
      });

    this.addressService
      .updateCorrespondenceAddress(this.entreprise.id, this.entreprise.correspondanceAdress, 'employeur')
      .then((data: any) => {
        if (!data || data.status == "failure") {
          console.log("VitOnJob", "Erreur lors de l'enregistrement des données");
          return;
        } else {
          console.log("VitOnJob", "Enregistrement des données effectué");
          let result = JSON.parse(data._body);
          this.entreprise.correspondanceAdress.id = result.id;
        }
      });
  }

  openCoporamaModal() {
    jQuery("#modal-corporama-search").modal('show');
  }

  onDismissCorporamaModal(company: any) {
    if (!company) {
      return;
    }

    if (Utils.isEmpty(company.street) === false
      && Utils.isEmpty(company.zip) === false
      && Utils.isEmpty(company.city) === false) {
      this.entreprise.siegeAdress.street = company.street;
      this.entreprise.siegeAdress.streetNumber = "";
      this.entreprise.siegeAdress.name = "";
      this.entreprise.siegeAdress.ville = company.city;
      this.entreprise.siegeAdress.pays = "France";
      this.entreprise.siegeAdress.cp = company.zip;

      this.entreprise.siegeAdress.fullAdress = this.addressService.constructAdress(this.entreprise.siegeAdress);

      this.entreprise.correspondanceAdress = this.entreprise.siegeAdress;
      this.entreprise.workAdress = this.entreprise.siegeAdress;
    }

    // Call company name field watcher
    this.entreprise.nom = company.name.toUpperCase();
    this.watchCompanyname({target: {value: company.name.toUpperCase()}});

    this.entreprise.siret = Utils.formatSIREN(company.siren);
    this.entreprise.naf = company.naf;
    this.watchApe({target: {value: company.naf}});

    this.IsCompanyExist(this.entreprise.nom, 'companyname');
  }
}
