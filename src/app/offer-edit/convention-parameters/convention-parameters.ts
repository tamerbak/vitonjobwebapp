/**
 * Created by kelvin on 29/12/2016.
 */
import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ConventionFilter} from "./convention-filter/convention-filter";
import {OffersService} from "../../../providers/offer.service";
import {SharedService} from "../../../providers/shared.service";
import {ConventionService} from "../../../providers/convention.service";
import {Utils} from "../../utils/utils";
// import {OffersService} from "../../providers/offer.service";
// import {SharedService} from "../../providers/shared.service";

declare var jQuery, Messenger,md5: any;

class Filter {
  name: string;
  label: string;
  list: any[];
  disableList: any[];
  value: string;
}

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
  onValidParametrage = new EventEmitter<any>();

  @Output()
  onPartialParametrage = new EventEmitter<any>();

  // The parameters are group of filter associated to a rate
  parameters: any = [];
  // A filter is a position, echelon, etc.
  filters: Filter[] = [];
  filtersList: {name: string, label: string}[];

  selectedFilters: any = {
    niv: null,
    coe: null,
    ech: null,
    cat: null,
    zon: null,
    ind: null,
    cla: null,
    sta: null,
    pos: null,
    anc: null,
  };

  constructor(private offersService: OffersService,
              private sharedService: SharedService,
              private conventionService: ConventionService) {
  }

  ngOnInit() {
    this.filtersList = [
      {name: 'niv', label: 'Niveau'},
      {name: 'coe', label: 'Coefficient'},
      {name: 'ech', label: 'Echelon'},
      {name: 'cat', label: 'Catégorie'},
      {name: 'zon', label: 'Zones Géo'},
      {name: 'ind', label: 'Indice'},
      {name: 'cla', label: 'Classe'},
      {name: 'sta', label: 'Statut'},
      {name: 'pos', label: 'Position'},
      {name: 'anc', label: 'Ancienneté'}
    ];
    this.offersService.getConventionFilters(this.convention.id).then((data: any[]) => {
      console.log(data);
      this.sharedService.setConventionFilters(data);
      for (let i = 0; i < this.filtersList.length; ++i) {
        this.addFilter(data, this.filtersList[i].name, this.filtersList[i].label);
      }
    });
    this.conventionService.getParametragesByConvetion(this.convention.id).then((data: any) => {
      console.log(data);
      this.parameters = data;
    });
  }

  addFilter(data, name, label) {
    this.filters.push({
      name: name,
      label: label,
      list: data.filter((elem: any) => {
        return elem.type == name
      }),
      disableList: [],
      value: '',
    });
  }

  /**
   * Filter event handler when a filter is selected
   * @param data
   */
  filterChanged(data: any) {
    if (Utils.isEmpty(data) == true) {
      console.warn("Empty convention filter event");
      return;
    }
    this.selectedFilters[data.name] = data.value;
    this.checkCombinaison();
  }

  /**
   * Check if select filters build a complete parametrage set or not.
   * Complete means that selected filters match with on parametrage
   */
  checkCombinaison() {
    let result = {
      filters : this.selectedFilters,
    };

    console.log('Tous les paramètrages');
    console.log(this.parameters);
    // debugger;
    let filterdParamers = this.parameters.filter((param) => {
      return (
        (Utils.isEmpty(this.selectedFilters.niv) == true || param['niv'] == this.selectedFilters.niv) &&
        (Utils.isEmpty(this.selectedFilters.coe) == true || param['coe'] == this.selectedFilters.coe) &&
        (Utils.isEmpty(this.selectedFilters.ech) == true || param['ech'] == this.selectedFilters.ech) &&
        (Utils.isEmpty(this.selectedFilters.cat) == true || param['cat'] == this.selectedFilters.cat) &&
        (Utils.isEmpty(this.selectedFilters.zon) == true || param['zon'] == this.selectedFilters.zon) &&
        (Utils.isEmpty(this.selectedFilters.ind) == true || param['ind'] == this.selectedFilters.ind) &&
        (Utils.isEmpty(this.selectedFilters.cla) == true || param['cla'] == this.selectedFilters.cla) &&
        (Utils.isEmpty(this.selectedFilters.sta) == true || param['sta'] == this.selectedFilters.sta) &&
        (Utils.isEmpty(this.selectedFilters.pos) == true || param['pos'] == this.selectedFilters.pos) &&
        (Utils.isEmpty(this.selectedFilters.anc) == true || param['anc'] == this.selectedFilters.anc)
      );
    });
    console.log('Paramètrages filtrés');
    console.log(filterdParamers);
    debugger;

    if (Utils.isEmpty(filterdParamers) == true) {
      console.error('convention : empty result, invalid params');
    } else if (filterdParamers.length == 1) {
      console.log('convention : param found');

      // Complete all the select
      for (let i = 0; i < this.filters.length; ++i) {
        this.filters[i].value = filterdParamers[0][this.filters[i].name];
      }

      this.onValidParametrage.emit({
        filters: this.selectedFilters,
        msg: "La combinaison est complète",
        parametrageId: filterdParamers[0].id
      });
    } else {
      console.log('convention : multiple param found');
      this.epureParametrageListe(filterdParamers);
      this.onPartialParametrage.emit({
        filters: this.selectedFilters,
        msg: "La combinaison n'est pas compplète, taux par défaut appliqué",
        parametrageId: null
      });
    }
  }

  /**
   * Update toHide filter do allow only possible value in UI
   */
  epureParametrageListe(filterdParamers) {
    // For each filter (position, echelon, etc)
    for (let i = 0; i < this.filters.length; ++i) {
      // let filter = this.filters[i];
      let disableList = [];
      if (Utils.isEmpty(this.filters[i].list) == false) {
        // Check for each possible value
        for (let j = 0; j < this.filters[i].list.length; ++j) {
          // The list of parametrage using it
          let using = filterdParamers.filter((elem) => {
            return elem[this.filters[i].name] == this.filters[i].list[j].id;
          });
          // If the list empty, that means this filter cannot be used
          if (Utils.isEmpty(using) == true) {
            // So we add the filter to the disabled list
            disableList.push(this.filters[i].list[j]);
            this.filters[i].list[j].disabled = 'true';
          } else {
            this.filters[i].list[j].disabled = 'false';
          }
        }
      }
      this.filters[i].disableList = disableList;
    }
  }

  isEmpty(value) {
    return Utils.isEmpty(value);
  }
}
