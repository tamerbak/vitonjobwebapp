import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
declare var jQuery,Messenger: any;

@Component({
  selector: 'body',
  directives: [ROUTER_DIRECTIVES],
  template: require('./app.html'),
  styles: [require('./scss/application.scss')],
  encapsulation: ViewEncapsulation.None
})
export class App {
  constructor(){
    Messenger.options = {
      theme: 'air',
      extraClasses: 'messenger-fixed messenger-on-top'
    }
  }
}
