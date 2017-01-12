/**
 * Created by kelvin on 29/12/2016.
 */
import {Component, EventEmitter, Input, Output, SimpleChanges} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ConventionFilter} from "./convention-filter/convention-filter";
import {OffersService} from "../../../providers/offer.service";
import {SharedService} from "../../../providers/shared.service";
import {ConventionService} from "../../../providers/convention.service";
import {Utils} from "../../utils/utils";
import {Offer} from "../../../dto/offer";

declare var jQuery, Messenger, md5: any;

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
})

export class ConventionParameters {
  @Input()
  offer: Offer;

  @Input()
  convention: any;

  @Input()
  toSync: boolean = false;

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
      this.sharedService.setConventionFilters(data);
      for (let i = 0; i < this.filtersList.length; ++i) {
        this.addFilter(data, this.filtersList[i].name, this.filtersList[i].label);
      }
    });
    this.conventionService.getParametragesByConvetion(this.convention.id).then((data: any) => {
      this.parameters = data;
      this.syncData();
    });

  }

  syncData() {

    // If selected parametrage, initialize selects
    if (this.offer.parametrageConvention > 0 && Utils.isEmpty(this.parameters) == false) {
      let selectedFilter = this.parameters.filter((filter)=> {
        return (filter.id == this.offer.parametrageConvention);
      });
      if (selectedFilter.length == 1) {
        for (let i = 0; i < this.filtersList.length; ++i) {
          this.selectedFilters[this.filtersList[i].name] = selectedFilter[0][this.filtersList[i].name];
        }
      }
    }
    this.checkCombinaison(true);
  }

  /**
   * Used to force sync of the selects on offer edit page
   *
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['toSync'] && changes['toSync'].previousValue != changes['toSync'].currentValue) {
      if (this.offer.parametrageConvention > 0) {
        this.syncData();
      }
    }
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
    for (let i = 0; i < this.filters.length; ++i) {
      if (this.filters[i].name == data.name) {
        this.filters[i].value = data.value;
        break;
      }
    }
    this.checkCombinaison(Utils.isEmpty(data.value) == false);
  }

  /**
   * Check if select filters build a complete parametrage set or not.
   * Complete means that selected filters match with on parametrage
   */
  checkCombinaison(addedFilter: boolean) {

    let filteredParamers = this.parameters.filter((param) => {
      let keep = (
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
      return keep;
    });

    if (Utils.isEmpty(filteredParamers) == true) {
      console.error('convention : empty result, invalid params');
    } else if (filteredParamers.length == 1) {

      // Complete all the select value and the return object
      if (addedFilter == true) {
        for (let i = 0; i < this.filters.length; ++i) {
          this.filters[i].value = filteredParamers[0][this.filters[i].name];
          this.selectedFilters[this.filters[i].name] = filteredParamers[0][this.filters[i].name];
        }
      }
      let minRate: number = parseFloat(filteredParamers[0].rate);
      this.epureParametrageListe(filteredParamers);
      this.onValidParametrage.emit({
        filters: filteredParamers[0],
        msg: "Pour cette clasification, le taux horaire minimum est de " + minRate.toFixed(2),
        parametrageId: filteredParamers[0].id
      });
    } else {
      this.epureParametrageListe(filteredParamers);
      this.onPartialParametrage.emit({
        filters: this.selectedFilters,
        msg: "La classification n'est pas compplète",
        parametrageId: null
      });
    }
  }

  /**
   * Update toHide filter do allow only possible value in UI
   */
  epureParametrageListe(filteredParamers) {
    // For each filter (position, echelon, etc)
    for (let i = 0; i < this.filters.length; ++i) {
      // let filter = this.filters[i];
      let disableList = [];
      if (Utils.isEmpty(this.filters[i].list) == false) {
        // Check for each possible value
        for (let j = 0; j < this.filters[i].list.length; ++j) {
          // The list of parametrage using it
          let using = filteredParamers.filter((elem) => {
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
