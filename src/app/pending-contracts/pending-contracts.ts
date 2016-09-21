import {Component,NgZone, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {SharedService} from "../providers/shared.service";
import {InProgressPage} from "../in-progress/in-progress";
declare var jQuery,require: any;

@Component({
  selector: '[attachements]',
  template: require('./pending-contracts.html'),
  directives: [ROUTER_DIRECTIVES,InProgressPage],
  providers: [],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./pending-contracts.scss')]
})
export class PendingContracts {

  constructor(
      private sharedService:SharedService,
      private router: Router
    ){

  }
}
