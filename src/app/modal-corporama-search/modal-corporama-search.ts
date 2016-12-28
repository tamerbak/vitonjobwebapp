import {Component, Output, EventEmitter} from "@angular/core";
import {CorporamaService} from "../../providers/corporama-service";
import {Utils} from "../utils/utils";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap";

declare var jQuery, require: any;

@Component({
  selector: '[modal-corporama-search]',
  directives: [ROUTER_DIRECTIVES, AlertComponent],
  providers: [CorporamaService, SharedService],
  template: require('./modal-corporama-search.html'),
  styles: [require('./modal-corporama-search.scss')]
})

export class ModalCorporamaSearch {

  @Output()
  onDismiss = new EventEmitter<any>();

  typeSearch: string = "company";
  inputSearch: string = '';

  companies: any = [];
  hasToRedirect: boolean = false;
  searchPlaceholder: string = "Nom de l'entreprise";
  isSIRENValid: boolean = true;
  noResult: boolean = false;

  projectTarget: string;
  alerts: string [];

  constructor(private corporamaService: CorporamaService) {
  }

  searchBy(by) {
    this.typeSearch = by;

    if (this.typeSearch == "company") {
      this.searchPlaceholder = "Nom de l'entreprise";
    } else if (this.typeSearch == "siren") {
      this.searchPlaceholder = "SIREN";
    }

    this.initForm();
  }

  searchCompany() {
    this.noResult = false;
    if (!this.isInputValid()) {
      return;
    }

    this.hasToRedirect = false;
    this.corporamaService.searchCompany(this.typeSearch, this.inputSearch).then((data: any) => {
      if (!data || data.status == "failure" || Utils.isEmpty(data._body)) {
        console.log(data);
        this.alerts = ["Service indisponible. Veuillez réessayer ultérieurement."];
        this.alerts = ["Service indisponible. Veuillez réessayer ultérieurement."];
        return;
      } else {
        data = JSON.parse(data._body);
        this.companies = this.corporamaService.convertSearchResponse(data);

        //if no result was returned
        if (!this.companies || this.companies.length == 0) {
          this.noResult = true;
          this.alerts = ['Votre recherche n\'a retourné aucun résultat'];
        }
        if (this.companies.length == 1) {
          if (Utils.isEmpty(this.companies[0].name)) {
            this.noResult = true;
          }
        }
      }
    });
  }

  takeAction(company) {

    if (this.typeSearch == "siren" || this.hasToRedirect) {
      this.close();

    } else {
      this.corporamaService.searchCompany("siren", company.siren).then((data: any) => {
        if (!data || data.status == "failure" || Utils.isEmpty(data._body)) {
          console.log(data);
          return;
        } else {
          data = JSON.parse(data._body);
          this.companies = this.corporamaService.convertSearchResponse(data);
          this.hasToRedirect = true;
        }
      })
    }
  }

  isInputValid() {
    if (this.typeSearch == "siren") {
      if (!Utils.isNumber(this.inputSearch) || this.inputSearch.length != 9) {
        this.isSIRENValid = false;
        this.alerts = ['Saisissez les 9 chiffres du SIREN'];
        return false;
      }
    }
    if (this.typeSearch == "company") {
      if (Utils.isEmpty(this.inputSearch)) {
        return false;
      }
    }
    return true;
  }

  initForm() {
    this.inputSearch = "";
    this.companies = [];
    this.hasToRedirect = false;
    this.isSIRENValid = true;
    this.noResult = false;
  }

  close() {
    jQuery("#modal-corporama-search").modal('hide');
    this.onDismiss.emit(Utils.isEmpty(this.companies) === false ? this.companies[0] : null);
  }
}
