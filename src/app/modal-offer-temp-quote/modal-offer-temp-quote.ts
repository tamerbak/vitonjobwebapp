import {Component, NgZone, Input} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {OffersService} from "../../providers/offer.service";
import {FinanceService} from '../../providers/finance.service'
import {DomSanitizationService} from '@angular/platform-browser';

declare var jQuery, require, Messenger: any;

@Component({
  selector: 'modal-offer-temp-quote',
  directives: [ROUTER_DIRECTIVES],
  providers: [OffersService, FinanceService],
  template: require('./modal-offer-temp-quote.html'),
  styles: [require('./modal-offer-temp-quote.scss')]
})
export class ModalOfferTempQuote {

  @Input() params: any;

  currentUser: any = null;
  projectTarget: any;
  processing: boolean = false;
  quote: any;


  constructor(private sharedService: SharedService,
              private offersService: OffersService,
              private financeService: FinanceService,
              private zone: NgZone,
              private sanitizer: DomSanitizationService,
              private router: Router) {
  }

}
