import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
  directives: [
    ROUTER_DIRECTIVES,
  ],
  selector: '[login]',
  host: {
    class: 'login-page app'
  },
  template: require('./login.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')]
})
export class LoginPage {
}
