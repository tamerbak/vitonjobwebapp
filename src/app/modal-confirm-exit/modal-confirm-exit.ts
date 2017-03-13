import {Component, NgZone} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {ProfileService} from "../../providers/profile.service";
import {Observable} from 'rxjs/Observable';
import {RouteObservable} from '../../providers/observables.service'


declare let jQuery: any;
declare let Messenger: any;

@Component({
  selector: '[modal-confirm-exit]',
  directives: [ROUTER_DIRECTIVES],
  providers: [ProfileService],
  template: require('./modal-confirm-exit.html'),
  styles: [require('./modal-confirm-exit.scss')]
})
export class ModalConfirmExit {

  destinationRoute: string = null;
  currentUser: any;



  constructor(private sharedService: SharedService,
              private routeObs:RouteObservable,
              private profileService: ProfileService,
              private zone: NgZone,
              private router: Router) {
  }

  goToSelectedPage(){
    jQuery("#modal-confirm-exit").modal('hide');
    this.routeObs.setTrueAndComplete()
  }

  close(){
    jQuery("#modal-confirm-exit").modal('hide');
    this.routeObs.setFalseAndComplete()
  }

}
