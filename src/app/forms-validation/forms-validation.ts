import {Component, ViewEncapsulation} from '@angular/core';
import {Widget} from '../core/widget/widget';
declare var jQuery: any;

@Component({
  selector: '[forms-validation]',
  template: require('./forms-validation.html'),
  directives: [Widget],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./forms-validation.scss')]
})
export class FormsValidation {
  ngOnInit(): void {
    jQuery('.parsleyjs').parsley();
  }
}
