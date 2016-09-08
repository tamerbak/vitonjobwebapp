import {Component} from '@angular/core';
import {Widget} from '../core/widget/widget';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: '[ui-buttons]',
  template: require('./ui-buttons.html'),
  directives: [Widget, BUTTON_DIRECTIVES]
})
export class UiButtons {
  checkboxModel: Object = { left: false, middle: true, right: false };
  checkbox2Model: Object = { left: false, middle: false, right: false };
  radioModel: string = 'Middle';
  radio2Model: string = 'Left';
}

