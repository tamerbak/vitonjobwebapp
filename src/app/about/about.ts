import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {InProgressPage} from "../in-progress/in-progress";
declare var jQuery, require: any;
@Component({
  selector: '[about]',
  template: require('./about.html'),
  directives: [ROUTER_DIRECTIVES, InProgressPage],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./about.scss')]
})
export class About {
  constructor(private router: Router) {
  }
}
