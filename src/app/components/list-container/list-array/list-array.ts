import {Component, Input, Output, EventEmitter, ElementRef} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ListElement} from "../../../../dto/component/list-element";
import {Element} from "./element/element";
import {ListActionBar} from "./list-action-bar/list-action-bar";

declare let jQuery: any;
declare let Messenger: any;

/**
 * Simple modal requesting confirmation
 */
@Component({
  selector: '[list-array]',
  directives: [ROUTER_DIRECTIVES, Element, ListActionBar],
  providers: [],
  template: require('./list-array.html'),
  styles: [require('./list-array.scss')]
})
export class ListArray {

  @Input()
  listElements: ListElement[] = [];

  @Input()
  canBeSelected: boolean = false;

  isActionBarOpen: boolean = false;

  selectedElements: ListElement[] = [];

  // @Input()
  // messageCantConfirm: string = "";
  //
  // @Input()
  // canConfirm: boolean = true;
  //
  // @Output()
  // confirmed = new EventEmitter<any>();
  //
  // @Output()
  // aborted = new EventEmitter<any>();

  myCurrentContent: string = "";
  is: any[] = [];


  constructor(el: ElementRef) {
    // this.myCurrentContent = el.nativeElement.innerHTML;
    // el.nativeElement.innerHTML = 'hello';
    // el.nativeElement.style.backgroundColor = 'green';
    //
    // for (let i = 0; i < 500; ++i) {
    //   this.is.push(i);
    // }
  }

  ngOnInit() {
    console.log(this.listElements);
  }
  //
  // confirm(){
  //   jQuery("#list").modal('hide');
  //   this.confirmed.emit([]);
  // }
  //
  // close(){
  //   jQuery("#list").modal('hide');
  //   this.aborted.emit([]);
  // }

  openActionbar() {
    this.isActionBarOpen = true;
  }

  closeActionbar() {
    this.isActionBarOpen = false;
  }

  elementSelected(element: ListElement) {
    let idx = this.selectedElements.indexOf(element);
    if (idx > -1) {
      this.selectedElements.slice(idx, 1);
    } else {
      this.selectedElements.push(element);
    }

    // if (this.selectedElements.length > 0) {
    //   this.openActionbar();
    // } else {
    //   this.closeActionbar ();
    // }
  }
}
