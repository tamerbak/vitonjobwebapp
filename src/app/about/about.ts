import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {SharedService} from "../../providers/shared.service";

declare var jQuery, require: any;
@Component({
  selector: '[about]',
  template: require('./about.html'),
  directives: [ROUTER_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./about.scss')]
})
export class About {

  currentUser: any;
  projectTarget: string;

  constructor(private sharedService: SharedService) {
    this.currentUser = this.sharedService.getCurrentUser();
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
  }
}
