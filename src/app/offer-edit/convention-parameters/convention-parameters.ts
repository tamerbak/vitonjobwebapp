/**
 * Created by kelvin on 29/12/2016.
 */
import {Component, NgZone, ViewEncapsulation, ViewChild, EventEmitter, Input, Output} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {ConventionFilter} from "./convention-filter/convention-filter";
import {OffersService} from "../../../providers/offer.service";
import {SharedService} from "../../../providers/shared.service";
// import {OffersService} from "../../providers/offer.service";
// import {SharedService} from "../../providers/shared.service";

declare var jQuery, Messenger,md5: any;

@Component({
  selector: '[convention-parameters]',
  template: require('./convention-parameters.html'),
  directives: [ROUTER_DIRECTIVES, ConventionFilter],
  // providers: [OffersService],
  // styles: [require('./convention-parameters.scss')]
})

export class ConventionParameters {
  @Input()
  offer: any;

  @Input()
  convention: any;

  @Output()
  refresh = new EventEmitter<any>();

  // The parameters are group of filter associated to a rate
  parameters: any = [];
  // A filter is a position, echelon, etc.
  filters: any = [];

  constructor(private offersService: OffersService, private sharedService: SharedService) {

  }

  ngOnInit() {
    this.offersService.getConventionFilters(this.convention.id).then((data: any) => {
      console.log(data);
      this.sharedService.setConventionFilters(data);
      this.filters.push({name: 'Niveau', list: data.filter((elem) => { return elem.type == 'niv' })});
      this.filters.push({name: 'Coefficient', list: data.filter((elem) => { return elem.type == 'coe' })});
      this.filters.push({name: 'Echelon', list: data.filter((elem) => { return elem.type == 'ech' })});
      this.filters.push({name: 'Catégorie', list: data.filter((elem) => { return elem.type == 'cat' })});
      this.filters.push({name: 'Zones Géo', list: data.filter((elem) => { return elem.type == 'zon' })});
      this.filters.push({name: 'Indice', list: data.filter((elem) => { return elem.type == 'ind' })});
      this.filters.push({name: 'Classe', list: data.filter((elem) => { return elem.type == 'cla' })});
      this.filters.push({name: 'Statut', list: data.filter((elem) => { return elem.type == 'sta' })});
      this.filters.push({name: 'Position', list: data.filter((elem) => { return elem.type == 'pos' })});
      this.filters.push({name: 'Ancienneté', list: data.filter((elem) => { return elem.type == 'anc' })});
      debugger;
    });
    this.offersService.getOfferConventionParameters(this.offer.idOffer).then((data: any) => {
      console.log(data);
      this.parameters = data;
      debugger;
    });
  }
}
