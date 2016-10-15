import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

declare var jQuery, require, Messenger: any;

@Component({
  selector: 'modal-offer-temp-quote',
  directives: [ROUTER_DIRECTIVES],
  template: require('./modal-offer-temp-quote.html'),
  styles: [require('./modal-offer-temp-quote.scss')]
})
export class ModalOfferTempQuote {

  constructor() {}

}
