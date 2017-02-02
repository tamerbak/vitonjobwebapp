import { Injectable } from '@angular/core';
import { CanDeactivate,ActivatedRouteSnapshot,RouterStateSnapshot,Router,NavigationStart,NavigationCancel  } from '@angular/router';
import { SharedService } from './shared.service';

import { Profile } from '../app/profile/profile';
import {Observable} from 'rxjs/Observable';
import { EventEmitter} from 'angular2/core';

declare let jQuery:any;

@Injectable()
export class RouteObservable {

  obs: Observable<boolean>;
  dataObserver: any;

  init(){
    this.obs = new Observable<boolean>(observer => {
          this.dataObserver = observer;
        });

      let subscription = this.obs.forEach(v => v);

  }

  setTrueAndComplete(){
    this.dataObserver.next(true);
    this.dataObserver.complete()
  }

  setFalseAndComplete(){
    this.dataObserver.next(false);
    this.dataObserver.complete()
  }

  getObservable(){
    return this.obs;
  }

}
