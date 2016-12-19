import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {EntrepriseService} from "../../providers/entreprise.service";

declare var jQuery, require: any;
@Component({
  selector: '[entreprise-edit]',
  template: require('./entreprise-edit.html'),
  directives: [ROUTER_DIRECTIVES],
  styles: [require('./entreprise-edit.scss')],
  providers: [EntrepriseService]
})
export class EntrepriseEdit {

  private user: any;

  constructor(private entrepriseService: EntrepriseService) {
  }

  swapEntreprise(id) {
    this.entrepriseService.swapEntreprise(id);
  }
}
