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
  title: string;
  lastname: string;
  firstname: string;

  @Input()
  currentUser: any;

  @Output()
  onChange = new EventEmitter<any>();

  @Output()
  onSendData = new EventEmitter<any>();

  @Output()
  onTitleChange = new EventEmitter<any>();

  isValidLastname: boolean;
  isValidFirstname: boolean;

  lastnameHint: string = "";
  firstnameHint: string = "";

  projectTarget: string;

  constructor(private sharedService: SharedService) {

  }

  ngOnInit(){
    var self = this;
    jQuery('.titleSelectPicker').selectpicker();
    jQuery('.titleSelectPicker').on('change', function(){
      var selectedTitle = jQuery(this).find("option:selected").val();
      self.onTitleChange.emit({title:selectedTitle})
    });
    this.init();
  }

  init(){
    this.title = !this.currentUser.titre ? "M." : this.currentUser.titre;
    jQuery('.titleSelectPicker').selectpicker('val', this.title);

    this.lastname = this.currentUser.nom;
    this.firstname = this.currentUser.prenom;

    if(Utils.isEmpty(this.firstname)){
      this.isValidFirstname = false;
    }else{
      this.isValidFirstname = true;
    }

    if(Utils.isEmpty(this.lastname)){
      this.isValidLastname = false;
    }else{
      this.isValidLastname = true;
    }

    this.isValidForm();
  }

  getData(){
      this.onSendData.emit({title:this.title,firstname:this.firstname,lastname:this.lastname})
  };

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
    if(this.title && this.isValidFirstname && this.isValidLastname){
      isValid = true;
    }
    this.onChange.emit(isValid);
  }
}
