/**
 * Created by kelvin on 06/03/2017.
 */

import {Component, Input, EventEmitter, Output} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

declare let jQuery: any;
declare let require: any;

@Component({
  selector: '[button-number]',
  template: require('./button-number.html'),
  styles: [require('./button-number.scss')],
  directives: [ROUTER_DIRECTIVES]
})
export class ButtonNumber {

  @Input()
  label: string = "";

  @Input()
  number: number = null;

  @Input()
  tooltip: string = "";

  @Output()
  buttonClick = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  onButtonClick() {
    this.buttonClick.emit([]);
  }
}
