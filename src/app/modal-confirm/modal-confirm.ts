import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

declare let jQuery: any;
declare let Messenger: any;

/**
 * Simple modal requesting confirmation
 */
@Component({
  selector: '[modal-confirm]',
  directives: [ROUTER_DIRECTIVES],
  providers: [],
  template: require('./modal-confirm.html'),
  styles: [require('./modal-confirm.scss')]
})
export class ModalConfirm {

  @Input()
  message: string = "";

  @Input()
  messageCantConfirm: string = "";

  @Input()
  canConfirm: boolean = true;

  @Output()
  confirmed = new EventEmitter<any>();

  @Output()
  aborted = new EventEmitter<any>();

  constructor() {
  }

  confirm(){
    jQuery("#modal-confirm").modal('hide');
    this.confirmed.emit([]);
  }

  close(){
    jQuery("#modal-confirm").modal('hide');
    this.aborted.emit([]);
  }

}
