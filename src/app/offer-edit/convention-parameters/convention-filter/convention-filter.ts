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
  @Input()
  disableList: any;
  @Input()
  name: any;

  @Output()
  onFilterChange = new EventEmitter<any>();

  @Input()
  selectedElem: any;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Update current select value and throw onFilterChange event
   * @param value
   */
  filterChange(value) {
    this.selectedElem = value;
    this.onFilterChange.emit({
      name: this.name,
      value: this.selectedElem
    });
  }

  /**
   * Utils connection for html file
   * @param value
   * @returns {boolean}
   */
  isEmpty(value) {
    return Utils.isEmpty(value);
  }

}
