import {Component, Input, Injector, Output, EventEmitter, ElementRef} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ListElement} from "../../../../../dto/component/list-element";
import {Utils} from "../../../../utils/utils";

declare let jQuery: any;
declare let Messenger: any;

/**
 * Simple modal requesting confirmation
 */
@Component({
  selector: '[element]',
  directives: [ROUTER_DIRECTIVES],
  providers: [],
  template: require('./element.html'),
  styles: [require('./element.scss')]
})
export class Element {

  @Input()
  listElement: ListElement = null;

  @Input()
  canBeSelected: boolean = false;

  @Output()
  elementSelect = new EventEmitter<ListElement>();


  constructor() {
  }

  isEmpty(value) {
    return Utils.isEmpty(value);
  }

  elementSelected() {
    this.elementSelect.emit(this.listElement);
  }
}
