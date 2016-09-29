import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Core} from './app/core/core';
import {ErrorPage} from './app/error/error';
import {LoginPage} from './app/login/login';
import {routes} from './app.routes';

declare var jQuery,Messenger: any;
declare var require;

@Component({
  selector: 'body',
  directives: [ROUTER_DIRECTIVES],
  template: require('./app.html'),
  styles: [require('./scss/application.scss')],
  encapsulation: ViewEncapsulation.None
})
export class App {
  redirectTo : string;
  constructor(){
    this.redirectTo = "/login";
    Messenger.options = {
      theme: 'air',
      extraClasses: 'messenger-fixed messenger-on-top'
    }
  }
}
