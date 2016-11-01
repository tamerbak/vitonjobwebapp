import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SharedService} from "../../../providers/shared.service";
import {Utils} from "../../utils/utils";
import {AccountConstraints} from "../../../validators/account-constraints";

declare var jQuery: any;

@Component({
  selector: 'civility-names',
  template: require('./civility-names.html'),
})

export class CivilityNames{
  @Input()
  title: string;

  @Input()
  lastname: string;

  @Input()
  firstname: string;

  @Output()
  onChange = new EventEmitter<any>();

  isValidLastname: boolean;
  isValidFirstname: boolean;

  lastnameHint: string = "";
  firstnameHint: string = "";

  currentUser: any;
  projectTarget: string;

  constructor(private sharedService: SharedService) {
    console.log(this.lastname);
    this.isValidForm();
  }

  watchLastname(e) {
    let nameChecked = AccountConstraints.checkName(e, "lastname");
    this.isValidLastname = nameChecked.isValid;
    this.lastnameHint = nameChecked.hint;
    this.isValidForm();
  }

  watchFirstname(e) {
    let nameChecked = AccountConstraints.checkName(e, "firstname");
    this.isValidFirstname = nameChecked.isValid;
    this.firstnameHint = nameChecked.hint;
    this.isValidForm();
  }

  isValidForm() {
    let isValid = false;
    if(this.isValidFirstname && this.isValidLastname){
      isValid = true;
    }
    this.onChange.emit(isValid);
  }
}
