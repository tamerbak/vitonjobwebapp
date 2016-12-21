import {Configs} from "../../configurations/configs";
import {GlobalConfigs} from "../../configurations/globalConfigs";
import {Component, Output, EventEmitter} from "@angular/core";
import {CorporamaService} from "../../providers/corporama-service";
// TODO import {GlobalService} from "../../providers/global.service";
import {Utils} from "../utils/utils";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap";

declare var jQuery, require: any;

@Component({
  // templateUrl: 'build/pages/modal-corporama-search/modal-corporama-search.html',
  // providers: [CorporamaService, SharedService /*, GlobalService*/]
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
  isEmployer: boolean;
  alerts: string [];

  constructor(private sharedService: SharedService,
              private corporamaService: CorporamaService) {
    // Set global configs
    this.projectTarget = this.sharedService.getCurrentUser().estEmployeur; //TODO : gc.getProjectTarget();
    this.isEmployer = (this.projectTarget === 'employer');
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
    /* let loading = Loading.create({
      content: `
			<div>
			<img src='img/loading.gif' />
			</div>
			`,
      spinner: 'hide'
    });
    this.nav.present(loading);*/
    this.corporamaService.searchCompany(this.typeSearch, this.inputSearch).then((data: any) => {
      if (!data || data.status == "failure" || Utils.isEmpty(data._body)) {
        console.log(data);
        // TODO : loading.dismiss();
        // TODO : this.globalService.showAlertValidation("Vit-On-Job", "Service indisponible. Veuillez réessayer ultérieurement.");
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
      // TODO : loading.dismiss();
    });
  }

  takeAction(company) {
    /*let loading = Loading.create({
     content: `
     <div>
     <img src='img/loading.gif' />
     </div>
     `,
     spinner: 'hide',
     });
     this.nav.present(loading);*/
    if (this.typeSearch == "siren" || this.hasToRedirect) {
      //loading.dismiss();
      this.close();

    } else {
      this.corporamaService.searchCompany("siren", company.siren).then((data: any) => {
        if (!data || data.status == "failure" || Utils.isEmpty(data._body)) {
          console.log(data);
          //loading.dismiss();
          // TODO : this.globalService.showAlertValidation("Vit-On-Job", "Service indisponible. Veuillez réessayer ultérieurement.");
          return;
        } else {
          data = JSON.parse(data._body);
          this.companies = this.corporamaService.convertSearchResponse(data);
          this.hasToRedirect = true;
          //loading.dismiss();
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
