import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: '[extra-invoice]',
  template: require('./extra-invoice.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./extra-invoice.scss')]
})
export class ExtraInvoice {
  print(): void {
    window.print();
  };
}
