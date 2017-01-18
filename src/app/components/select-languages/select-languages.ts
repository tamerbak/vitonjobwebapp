/**
 * Created by kelvin on 17/01/2017.
 */

import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {SharedService} from "../../../providers/shared.service";
import {Utils} from "../../utils/utils";
import {LoadListService} from "../../../providers/load-list.service";
// import {ConventionFilter} from "./convention-filter/convention-filter";

declare var jQuery, Messenger, md5: any;

class Language {
}

@Component({
  selector: '[select-languages]',
  template: require('./select-languages.html'),
  directives: [ROUTER_DIRECTIVES],
  providers: [LoadListService],
})

export class SelectLanguages {
  @Input()
  selectedList: any = [];

  @Input()
  hasLevel: boolean;

  @Input()
  canEdit: boolean;

  @Input()
  label: string;

  @Output()
  onAdd = new EventEmitter<any>();

  @Output()
  onRemove = new EventEmitter<any>();

  selectedElem: any = "";
  selectedLevel = "1";
  list: any = [];

  constructor(private sharedService: SharedService,
              private listService: LoadListService) {

    //loadLanguages
    this.list = this.sharedService.getLangList();
    if (!this.list || this.list.length == 0) {
      this.listService.loadLanguages().then((data: any) => {
        this.list = data.data;
        this.sharedService.setLangList(this.list);
      })
    }

  }

  ngOnInit() {

  }

  addElement() {
    if (this.canEdit == false) {
      return;
    }
    if (Utils.isEmpty(this.selectedElem)) {
      return;
    }

    // Get the list element
    var languagesTemp = this.list.filter((v)=> {
      return (v.id == this.selectedElem);
    });
    if (this.selectedList.indexOf(languagesTemp[0]) != -1) {
      return;
    }

    if (this.hasLevel == true) {
      languagesTemp[0]['level'] = this.selectedLevel;
    }
    // Add the new element to the list
    this.selectedList.push(languagesTemp[0]);

    // Emit event to the parent
    this.onAdd.emit(this.selectedElem);

    this.selectedElem = "";
  }

  removeElement(item) {
    if (this.canEdit == false) {
      return;
    }
    this.selectedList.splice(this.selectedList.indexOf(item), 1);

    this.onRemove.emit(item);
  }

}
