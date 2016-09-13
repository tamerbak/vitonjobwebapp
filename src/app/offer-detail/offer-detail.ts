import {Component, ViewEncapsulation} from '@angular/core';
import {OffersService} from "../providers/offer.service";
import {SharedService} from "../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AlertComponent} from 'ng2-bootstrap/components/alert';
import {SearchService} from "../providers/search-service";
import {Widget} from '../core/widget/widget';

@Component({
    selector: '[offer-detail]',
  template: require('./offer-detail.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./offer-detail.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent, Widget],
  providers: [OffersService, SearchService]
})
export class OfferDetail {
    
}