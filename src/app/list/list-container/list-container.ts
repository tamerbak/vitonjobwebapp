import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

declare let jQuery: any;
declare let Messenger: any;

/**
 * Simple modal requesting confirmation
 */
@Component({
  selector: '[list-container]',
  directives: [ROUTER_DIRECTIVES],
  providers: [],
  template: require('./list-container.html'),
  styles: [require('./list-container.scss')]
})
export class ListContainer {

  // @Input()
  // message: string = "";
  //
  // @Input()
  // messageCantConfirm: string = "";
  //
  // @Input()
  // canConfirm: boolean = true;
  //
  // @Output()
  // confirmed = new EventEmitter<any>();
  //
  // @Output()
  // aborted = new EventEmitter<any>();

  constructor() {
  }
  //
  // confirm(){
  //   jQuery("#list").modal('hide');
  //   this.confirmed.emit([]);
  // }
  //
  // close(){
  //   jQuery("#list").modal('hide');
  //   this.aborted.emit([]);
  // }

}
