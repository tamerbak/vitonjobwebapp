/**
 * Created by kelvin on 17/01/2017.
 */

import {Component, EventEmitter, Input, Output, SimpleChanges, ChangeDetectorRef} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Utils} from "../../utils/utils";
import {LoadListService} from "../../../providers/load-list.service";
import {Configs} from "../../../configurations/configs";
import {ListElem} from "../../../dto/generic/list-elem";

declare var jQuery, Messenger, md5: any;

@Component({
  selector: '[select-list-capitalyze]',
  template: require('./select-list-capitalyze.html'),
  styles: [require('./select-list-capitalyze.scss')],
  directives: [ROUTER_DIRECTIVES],
  providers: [LoadListService],
})
export class SelectListCapitalyze {
  @Input()
  selectedList: ListElem[] = [];

  @Input()
  list: any[] = [];

  @Input()
  src: string;

  @Input()
  allowNewEntry: boolean;

  @Input()
  canSearch: boolean;

  @Input()
  canEdit: boolean;

  @Input()
  label: string;

  @Input()
  placeholder: string = "";

  @Output()
  onAdd = new EventEmitter<any>();

  @Output()
  onRemove = new EventEmitter<any>();

  selectedElem: string = "0";
  selectedLevel: string = "1";
  randomId: number;
  selectClass: string;
  selectClass2: string;

  dinamycListIsLoading = false;

  constructor(private listService: LoadListService,
              private cdr: ChangeDetectorRef) {

    this.randomId = Math.floor((Math.random() * 1000000) + 1);
    this.selectClass = 'list-select-' + this.randomId;
    this.selectClass2 = 'list-select-test';
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

    if (this.isDynamicList()) {
      this.initializeDynamicSelect();
    }

  }

  addElement() {

    if (this.canEdit == false) {
      return;
    }
    if (Utils.isEmpty(this.selectedElem)) {
      return;
    }

    // Get the list element
    let listTemp = this.list.filter((v)=> {
      return (v.id == this.selectedElem);
    });
    if (this.selectedList.indexOf(listTemp[0]) != -1) {
      return;
    }

    let listElem: ListElem = new ListElem();
    listElem.id = Number(listTemp[0]['id']);

    // Add the new element to the list
    this.selectedList.push(listElem);

    // Emit event to the parent
    this.onAdd.emit(this.selectedElem);

    this.selectedElem = "0";

  }

  removeElement(item) {
    if (this.canEdit == false) {
      return;
    }
    this.selectedList.splice(this.selectedList.indexOf(item), 1);

    this.onRemove.emit(item);
  }

  getLabel(id: string): string {
    if (this.isDynamicList() === true) {
      if (this.dinamycListIsLoading === true && Utils.isEmpty(this.list) == true) {
        return "Chargement...";
      }
    }

    if (this.list && Utils.isEmpty(this.list) === false) {
      let listTemp = this.list.filter((v)=> {
        return (v.id == id);
      });
      if (Utils.isEmpty(listTemp) == true) {
        return "Aucun résultat trouvé";
      }
      return listTemp[0].libelle;
    }

    if (this.isDynamicList() === false) {
      return "Soyez la première personne à proposer une valeur";
    }
  }

  initializeDynamicSelect() {
    this.dinamycListIsLoading = true;

    let self = this;
    let $selectList = jQuery('.' + this.selectClass);

    console.log('initializeDynamicSelect(' + self.src + ')');

    $selectList.select2({
      maximumSelectionLength: 1,
      tokenSeparators: [",", " "],
      createSearchChoice: function (term, data) {
        if (self.list && Utils.isEmpty(self.list) === true) {
          return {
            id: '0', libelle: term
          };
        }
      },
      ajax: {
        url: Configs.sqlURL,
        type: 'POST',
        dataType: 'json',
        quietMillis: 250,
        transport: function (params) {
          params.beforeSend = Configs.getSelect2TextHeaders();
          return jQuery.ajax(params);
        },
        data: function (term, page) {

          let sql = "SELECT " +
            "pk_user_" + self.src +  " as id" +
            ", libelle " +
            "FROM user_" + self.src +  " " +
            "WHERE " +
            "lower_unaccent(libelle) like lower_unaccent('%" + term + "%') " +
            "OR lower_unaccent(libelle) % lower_unaccent('" + term + "')"
          ;
          // TODO Retirer les éléments déjà selectionnés
          console.log('initializeDynamicSelect('+self.src+').data(+term+)');

          return sql;
        },
        results: function (data, page) {
          // self.epiItems = data.data;
          return { results: data.data };
        },
        cache: false,

      },

      formatResult: function (item) {

        if (self.list == null) {
          self.list = [];
        }
        if (item.id != '0') {
          self.list.push(item);
        }

        return item.libelle;
      },
      formatSelection: function (item) {
        self.selectedElem = item.id;
        return item.libelle;
      },
      dropdownCssClass: "bigdrop",
      escapeMarkup: function (markup) {
        return markup;
      },
      minimumInputLength: 1
    });

    $selectList.on('select2-selecting',
      (e) => {
        // self.epi = e.choice.libelle;
      }
    );

  }

  isDynamicList(): boolean {
    return Utils.isEmpty(this.src) === false;
  }

}
