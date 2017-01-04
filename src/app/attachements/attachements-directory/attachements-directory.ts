import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
// import {AlertComponent} from "ng2-bootstrap/components/alert";

type Folder = {name: string, folders: Folder[], files: any[]};

@Component({
  selector: '[attachements-directory]',
  template: require('./attachements-directory.html'),
  directives: [ROUTER_DIRECTIVES, AttachementsDirectory],
  styles: [require('./attachements-directory.scss')]
})
export class AttachementsDirectory {
  @Input()
  cd: Folder = {name: "Coffre", folders: [], files: []};

  @Output()
  viewFile = new EventEmitter<any>();
  @Output()
  deleteFile = new EventEmitter<any>();

  open: boolean = true;

  constructor() {

  }

  toggleFolder() {
    this.open = !this.open;
  }

  clickViewFile(a) {
    this.viewFile.emit(a)
  }

  clickDeleteFile(a) {
    this.deleteFile.emit(a)
  }

  /**
   * Cascade callbacks
   */

  onViewFile($event) {
    this.viewFile.emit($event)
  }

  onDeleteFile($event) {
    this.deleteFile.emit($event)
  }
}
