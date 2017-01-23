/**
 * Created by kelvin on 17/01/2017.
 */

import {Component, EventEmitter, Input, Output, ChangeDetectorRef} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {SharedService} from "../../../providers/shared.service";
import {Utils} from "../../utils/utils";
import {LoadListService} from "../../../providers/load-list.service";
import {Language} from "../../../dto/language";
// import {ConventionFilter} from "./convention-filter/convention-filter";

declare var jQuery, Messenger, md5: any;

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

  selectedElem: string = "0";
  selectedLevel: string = "1";
  list: any = [];

  constructor(private sharedService: SharedService,
              private listService: LoadListService,
              private cdr: ChangeDetectorRef) {

    //loadLanguages
    this.list = this.sharedService.getLangList();
    if (!this.list || this.list.length == 0) {
      this.listService.loadLanguages().then((data: any) => {
        this.list = data.data;
        this.sharedService.setLangList(this.list);
        this.cdr.detectChanges();
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

    let language: Language = new Language();
    language.id = Number(languagesTemp[0]['id']);

    if (this.hasLevel == true) {
      language.level = Number(this.selectedLevel);
    }

    // Add the new element to the list
    this.selectedList.push(language);

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

  getLabel(id: number): string {

    if (!id) {
      return;
    }

    if (Utils.isEmpty(this.list) == true) {
      return "Chargement...";
    }

    var languagesTemp = this.list.filter((v)=> {
      return (v.id == id);
    });
    return languagesTemp[0].libelle;
  }

}
