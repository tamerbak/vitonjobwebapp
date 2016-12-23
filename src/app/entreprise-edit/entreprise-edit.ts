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

declare var jQuery, require, Messenger: any;
@Component({
  selector: '[entreprise-edit]',
  template: require('./entreprise-edit.html'),
  directives: [ROUTER_DIRECTIVES, AlertComponent, MaskedInput, ModalCorporamaSearch],
  styles: [require('./entreprise-edit.scss')],
  providers: [EntrepriseService, ProfileService, SharedService, LoadListService]
})
export class EntrepriseEdit {

  currentUser: any;

  companyname: string;
  siret: string;
  ape: string;

  isValidCompanyname: boolean = false;
  public maskApe = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /^[a-zA-Z]*$/];
  isValidApe: boolean = true;

  companynameHint: string = "";
  apeHint: string = "";

  companyAlert: string = "";
  showCurrentCompanyBtn: boolean = false;

  // Conventions collectives
  conventionId: number;
  conventions: any = [];

  constructor(private listService: LoadListService,
              private entrepriseService: EntrepriseService,
              private sharedService: SharedService,
              private router: Router,
              private profileService: ProfileService) {
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
    });
  }

  companyInfosAlert(field) {
    var message = (field == "siret" ? ("Le SIRET " + this.siret) : ("La raison sociale " + this.companyname)) + " existe déjà. Si vous continuez, ce compte sera bloqué, \n sinon veuillez en saisir " + (field == "siret" ? "un " : "une ") + "autre. \n Voulez vous continuez?";
    return message;
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
    if (this.isValidCompanyname&& (this.isValidApe && !Utils.isEmpty(this.ape)) && !Utils.isEmpty(this.conventionId)) {
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
        this.companyname,
        this.ape,
        this.conventionId
      ).then((result: any) => {
        if(result.status == 'success') {
          Messenger().post({
            message: "Votre demande de création a bien été prise en compte, elle sera effective lors de votre prochaine connexion",
            type: 'info',
            showCloseButton: true
          });
          this.router.navigate(['app/home']);
        }
      });
    }
  }

  openCoporamaModal() {
    jQuery("#modal-corporama-search").modal('show');
  }

  onDismissCorporamaModal(company: any) {
    debugger;
    if (!company) {
      return;
    }

    // Call company name field watcher
    this.companyname = company.name.toUpperCase();
    this.watchCompanyname({target: {value: company.name.toUpperCase()}});

    this.siret = Utils.formatSIREN(company.siren);
    this.ape = company.naf;

    this.IsCompanyExist(this.companyname, 'companyname');
  }
}
