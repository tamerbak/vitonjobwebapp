import { Injectable } from '@angular/core';
import { CanDeactivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router,NavigationStart,NavigationCancel  } from '@angular/router';
import { SharedService } from './shared.service';
import {RouteObservable} from './observables.service';
import { Profile } from '../app/profile/profile';
import {Observable} from 'rxjs/Observable';
import { EventEmitter} from 'angular2/core';

declare var jQuery:any;

@Injectable()
export class ConfirmExitPage implements CanDeactivate<any> {

  constructor(private routeObs:RouteObservable,private sharedService:SharedService){
  }

  canDeactivate(target: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(this.sharedService.getCurrentUser()){
      if(target.formHasChanges()){
          jQuery("#modal-confirm").modal('show');
          this.routeObs.init();
          return this.routeObs.getObservable();
      }
    }
    return true;
  }
}
