import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SharedService} from "../../../providers/shared.service";
import {LoadListService} from "../../../providers/load-list.service";
import {Utils} from "../../utils/utils";
import {AccountConstraints} from "../../../validators/account-constraints";
import MaskedInput from "angular2-text-mask";
import {MedecineService} from "../../../providers/medecine.service";
import {Configs} from "../../../configurations/configs";

declare var jQuery: any;

@Component({
  selector: 'civility-employer',
  template: require('./civility-employer.html'),
  directives: [MaskedInput],
  providers: [Utils, LoadListService, AccountConstraints,MedecineService],
})

export class CivilityEmployer{
  @Input()
  currentUser :any;

  @Output()
  onChange = new EventEmitter<any>();

  @Output()
  onSendData = new EventEmitter<any>();

  companyname: string;
  siret: string;
  ape: string;
  conventionId: number;
  selectedMedecine: any = {id: 0, libelle: ""};


  companynameHint: string = "";
  siretHint: string  = "";
  apeHint: string  = "";

  isValidCompanyname: boolean;
  isValidSiret: boolean;
  isValidConventionId: boolean;
  isValidApe: boolean;

  conventions: any = [];


  projectTarget: string;

  public maskSiret = [/[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, ' ', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
  public maskApe = [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /^[a-zA-Z]*$/]

  constructor(private sharedService: SharedService,private listService: LoadListService,private medecineService:MedecineService) {
    listService.loadConventions().then((response: any) => {
      this.conventions = response;
    });
  }

  ngOnInit(){
    this.init();
  }

  init(){
    if (this.currentUser.employer.entreprises.length != 0) {
      this.companyname = this.currentUser.employer.entreprises[0].nom;
      if(Utils.isEmpty(this.companyname)){
        this.isValidCompanyname = false;
      }else{
        this.isValidCompanyname = true;
      }

      this.siret = this.currentUser.employer.entreprises[0].siret;
      if(Utils.isEmpty(this.siret)){
        this.isValidSiret = false;
      }else{
        this.isValidSiret = true;
      }

      this.ape = this.currentUser.employer.entreprises[0].naf;
      if(Utils.isEmpty(this.ape)){
        this.isValidApe = false;
      }else{
        this.isValidApe = true;
      }

      if (this.currentUser.employer.entreprises[0].conventionCollective &&
        this.currentUser.employer.entreprises[0].conventionCollective.id > 0) {
        this.conventionId = this.currentUser.employer.entreprises[0].conventionCollective.id;
        this.isValidConventionId = true;
      }else{
        this.isValidConventionId = false;
      }

      this.medecineService.getMedecine(this.currentUser.employer.entreprises[0].id).then((res: any)=> {
        if (res && res != null) {
          this.selectedMedecine = {id: res.id, libelle: res.libelle};
          jQuery(".medecine-select").select2('data', this.selectedMedecine);
        }
      });
     }
     this.isValidForm();
  }

  ngAfterViewInit(): void {
      var self = this;

      jQuery('.medecine-select').select2({

        ajax: {
          url: Configs.sqlURL,
          type: 'POST',
          dataType: 'json',
          quietMillis: 250,
          transport: function (params) {
            params.beforeSend = Configs.getSelect2TextHeaders();
            return jQuery.ajax(params);
          },
          data: this.medecineService.getMedecineByTerm(),
          results: function (data, page) {
            return {results: data.data};
          },
          cache: true
        },
        formatResult: function (item) {
          return item.libelle;
        },
        formatSelection: function (item) {
          return item.libelle;
        },
        dropdownCssClass: "bigdrop",
        escapeMarkup: function (markup) {
          return markup;
        },
        minimumInputLength: 3,
      });
      jQuery('.medecine-select').on('change',
        (e) => {
          self.selectedMedecine = e.added;
        }
      );
  }

  getData(){
      this.onSendData.emit({companyname:this.companyname,siret:this.siret,ape:this.ape,conventionId:this.conventionId,selectedMedecine:this.selectedMedecine})
  };

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

  
  companyInfosAlert(field) {
    var message = (field == "siret" ? ("Le SIRET " + this.siret) : ("La raison sociale " + this.companyname)) + " existe déjà. Si vous continuez, ce compte sera bloqué, \n sinon veuillez en saisir " + (field == "siret" ? "un " : "une ") + "autre. \n Voulez vous continuez?";
    return message;
  }
}
