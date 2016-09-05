import {Component, ViewEncapsulation} from '@angular/core';
import {TAB_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: '[ui-tabs-accordion]',
  template: require('./ui-icons.html'),
  directives: [TAB_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./ui-icons.scss')]
})
export class UiIcons {
}

