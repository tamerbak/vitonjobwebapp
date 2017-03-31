import {Component, Input, ElementRef} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

declare let jQuery: any;
declare let Messenger: any;

/**
 */
@Component({
  selector: '[list-action-bar]',
  directives: [ROUTER_DIRECTIVES],
  providers: [],
  template: require('./list-action-bar.html'),
  styles: [require('./list-action-bar.scss')]
})
export class ListActionBar {

  @Input()
  listElements: any[] = [];

  buttons: any[] = [];

  constructor() {
    this.buttons.push({
      label: 'Action1'
    });
    this.buttons.push({
      label: 'Action2'
    });
  }

  eventClick(button) {
    console.log(button);
  }
}
