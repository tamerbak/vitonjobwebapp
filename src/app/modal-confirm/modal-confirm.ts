import {Component, NgZone} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {ProfileService} from "../../providers/profile.service";
import {Observable} from 'rxjs/Observable';
import {RouteObservable} from '../../providers/observables.service'


declare var jQuery, require, Messenger: any;

@Component({
  selector: '[modal-confirm]',
  directives: [ROUTER_DIRECTIVES],
  providers: [ProfileService],
  template: require('./modal-confirm.html'),
  styles: [require('./modal-confirm.scss')]
})
export class ModalConfirm {

  destinationRoute: string = null;
  currentUser: any;



  constructor(private sharedService: SharedService,
              private routeObs:RouteObservable,
              private profileService: ProfileService,
              private zone: NgZone,
              private router: Router) {
  }

  goToSelectedPage(){
    jQuery("#modal-confirm").modal('hide');
    this.routeObs.setTrueAndComplete()
  }

  close(){
    jQuery("#modal-confirm").modal('hide');
    this.routeObs.setFalseAndComplete()
  }

}
