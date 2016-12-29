/**
 * Created by kelvin on 29/12/2016.
 */
import {Component, NgZone, ViewEncapsulation, ViewChild, EventEmitter, Input, Output} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {Utils} from "../../../utils/utils";

declare var jQuery, Messenger,md5: any;

@Component({
  selector: '[convention-filter]',
  template: require('./convention-filter.html'),
  directives: [ROUTER_DIRECTIVES],
  // styles: [require('./convention-filter.scss')]
})

export class ConventionFilter {
  @Input()
  list: any;

  @Output()
  refresh = new EventEmitter<any>();

  selectedElem: any;

  constructor() {
  }

  ngOnInit() {
  }

  isEmpty(value) {
    return Utils.isEmpty(value);
  }
}
