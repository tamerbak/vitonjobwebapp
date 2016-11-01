import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SharedService} from "../../../providers/shared.service";
import {LoadListService} from "../../../providers/load-list.service";
import {Utils} from "../../utils/utils";
import {AccountConstraints} from "../../../validators/account-constraints";
import MaskedInput from "angular2-text-mask";

declare var jQuery: any;

@Component({
  selector: 'civility-employer',
  template: require('./civility-employer.html'),
  directives: [MaskedInput],
  providers: [Utils, LoadListService, AccountConstraints],
})

export class CivilityEmployer{
  @Input()
  companyname: string;

  @Input()
  siret: string;

  @Input()
  ape: string;

  @Input()
  conventionId: number;

  @Output()
  onChange = new EventEmitter<any>();

  companynameHint: string = "";
  siretHint: string  = "";
  apeHint: string  = "";

  isValidCompanyname: boolean = true;
  isValidSiret: boolean = true;
  isValidConventionId: boolean = true;
  isValidApe: boolean = true;

  conventions: any = [];

  currentUser: any;
  projectTarget: string;

  public maskSiret = [/[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  public maskApe = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /^[a-zA-Z]*$/]

  constructor(private sharedService: SharedService,private listService: LoadListService) {
    listService.loadConventions().then((response: any) => {
      this.conventions = response;
    });
  }

  watchCompanyname(e) {
    let companynameChecked = AccountConstraints.checkCompanyName(e);
    this.isValidCompanyname = companynameChecked.isValid;
    this.companynameHint = companynameChecked.hint;
    this.isValidForm();
  }

  watchSiret(e) {
    let siretChecked = AccountConstraints.checkSiret(e);
    this.isValidSiret = siretChecked.isValid;
    this.siretHint = siretChecked.hint;
    this.isValidForm();
  }

  watchApe(e) {
    let apeChecked = AccountConstraints.checkApe(e);
    this.isValidApe = apeChecked.isValid;
    this.apeHint = apeChecked.hint;
    this.isValidForm();
  }

  isValidForm() {
    let isValid = false;
    this.isValidConventionId = Utils.isEmpty(this.conventionId) ? false : true;
    if(this.isValidCompanyname && this.isValidSiret && this.isValidApe && this.isValidConventionId){
      isValid = true;
    }
    this.onChange.emit(isValid);
  }
}
