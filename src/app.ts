import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, NavigationEnd} from '@angular/router';
import {Core} from './app/core/core';
import {ErrorPage} from './app/error/error';
import {LoginPage} from './app/login/login';
import {routes} from './app.routes';

declare let jQuery: any;
declare let Messenger: any;
declare let ga: Function;

@Component({
  selector: 'body',
  directives: [ROUTER_DIRECTIVES],
  template: require('./app.html'),
  styles: [require('./scss/application.scss')],
  encapsulation: ViewEncapsulation.None
})
export class App {
  redirectTo : string;
  constructor(public router: Router){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
    this.redirectTo = "/login";
    Messenger.options = {
      theme: 'air',
      extraClasses: 'messenger-fixed messenger-on-top'
    }
  }
}
