/**
 * Created by kelvin on 17/01/2017.
 */

import {Component, EventEmitter, Input, Output, SimpleChanges, ChangeDetectorRef} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Utils} from "../../utils/utils";
import {LoadListService} from "../../../providers/load-list.service";
import {Configs} from "../../../configurations/configs";
import {ListElem} from "../../../dto/generic/list-elem";
import {AlertComponent} from "ng2-bootstrap";

declare let jQuery: any;
declare let Messenger: any;
declare let md5: any;

@Component({
  selector: '[select-list]',
  template: require('./select-list.html'),
  styles: [require('./select-list.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent],
  providers: [LoadListService],
})
export class SelectList {
  @Input()
  selectedList: ListElem[] = [];

  @Input()
  list: any[] = [];

  @Input()
  subList: any[] = [];

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
  onAdd = new EventEmitter<ListElem>();

  @Output()
  onRemove = new EventEmitter<any>();

  selectedElem: string = "0";
  randomId: number;
  selectClass: string;
  selectClass2: string;

  selectedSubElem: string = "0";

  dinamycListIsLoading = false;

  constructor(private listService: LoadListService,
              private cdr: ChangeDetectorRef) {

    this.randomId = Math.floor((Math.random() * 1000000) + 1);
    this.selectClass = 'list-select-' + this.randomId;
    this.selectClass2 = 'list-select-test';
  }

  ngOnInit() {
    if (this.isDynamicList()) {
      this.dinamycListIsLoading = true;
    }
  }

  ngAfterViewInit() {
    if (this.isDynamicList()) {
      this.initializeDynamicSelect();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isDynamicList()
      && changes.hasOwnProperty('selectedList')
      && Utils.isEmpty(changes['selectedList'].currentValue) == false) {
      this.listService.loadList(this.src, changes['selectedList'].currentValue).then((data: any) => {
        this.list = data;
        this.dinamycListIsLoading = false;
      });
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
    let listTemp: ListElem[] = this.list.filter((v)=> {
      return (v.id == this.selectedElem);
    });
    if (listTemp.length <= 0) {
      console.warn('Missing list element');
    }

    let existTemp: ListElem[] = this.selectedList.filter((v)=> {
      return (v.id == listTemp[0].id);
    });
    if (existTemp.length > 0) {
      return;
    }

    let listElem: ListElem = new ListElem();
    listElem.id = Number(listTemp[0]['id']);
    listElem.metadata = JSON.stringify({
      subValue: this.selectedSubElem
    });

    // Add the new element to the list
    this.selectedList.push(listElem);

    // Emit event to the parent
    this.onAdd.emit(listElem);

    this.selectedElem = "0";

    if (this.isDynamicList()) {
      this.initializeDynamicSelect();
    }

  }

  cannotAddElement() {
    let r = !this.selectedElem
      || this.selectedElem == '0'
      || (this.subList.length > 0 && this.selectedSubElem == '0')
      || !this.canEdit
    ;
    return r;
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
      if (this.dinamycListIsLoading === true) {
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

      let label = listTemp[0].libelle;
      // Add asterisk to dirty values
      if (this.isDynamicList() === true && listTemp[0].dirty == 'Y') {
         label += ' *';
      }
      return label;
    }

    if (this.isDynamicList() === false) {
      return "Soyez la première personne à proposer une valeur";
    }
  }

  getSubLabel(metadata) {

    let id = JSON.parse(metadata).subValue;

    if (this.subList && Utils.isEmpty(this.subList) === false) {
      let listTemp = this.subList.filter((v)=> {
        return (v.id == id);
      });
      if (Utils.isEmpty(listTemp) == true) {
        return "Aucun résultat trouvé";
      }

      let label = listTemp[0].label;
      // Add asterisk to dirty values
      if (this.isDynamicList() === true && listTemp[0].dirty == 'Y') {
        label += ' *';
      }
      return label;
    }
    return "Employeur";
  }

  containDeprecatedValue() {
    if (Utils.isEmpty(this.list) === true) {
      return false;
    }
    for (let i = 0; i < this.list.length; ++i) {
      if (this.list[i].dirty && this.list[i].dirty == 'Y') {
        return true;
      }
    }
    return false;
  }

  initializeDynamicSelect() {
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
            "pk_user_" + self.src +  " AS id" +
            ", REGEXP_REPLACE(libelle, E'[\\n\\r]+', ' ', 'g' ) AS libelle " +
            "FROM user_" + self.src +  " " +
            "WHERE " +
            "(lower_unaccent(libelle) like lower_unaccent('%" + term + "%') " +
            "OR lower_unaccent(libelle) % lower_unaccent('" + term + "'))" +
            " AND dirty = 'N' " +
            "LIMIT 10"
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
        self.dinamycListIsLoading = false;
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
