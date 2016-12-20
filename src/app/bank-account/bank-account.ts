import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {BankService} from "../../providers/bank-service";
import {SharedService} from "../../providers/shared.service";
import {Utils} from "../utils/utils";
declare var md5, Messenger, jQuery, require: any;

@Component({
  selector: '[modal-bank-account]',
  template: require('./bank-account.html'),
  directives: [ROUTER_DIRECTIVES, NKDatetime, AlertComponent],
  providers: [Utils, BankService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./bank-account.scss')]
})
export class BankAccount {

  bank = {
    nom_de_banque : '',
    detenteur_du_compte : '',
    iban : '',
    bic : ''
  };

  isValidBank: boolean = false;
  isValidAccountHolder: boolean = false;
  isValidIban: boolean = false;
  isValidBic: boolean = false;

  bankHint: string = "";
  accountHolderHint: string = "";
  ibanHint: string = "";
  bicHint: string = "";

  voidAccount:boolean;

  //currentUser params
  currentUser: any;
  currentUserFullname: string;
  isNewUser: boolean;
  isEmployer: boolean;
  isRecruiter: boolean;
  accountId: string;
  userRoleId: string;
  projectTarget:string;

  //styles && vars
  showForm: boolean = false;
  validation: boolean = false;


  constructor(private bankService: BankService,
              private sharedService: SharedService,
              private router: Router) {


    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
    } else {
      this.getUserInfos();
      let id = 0;
      let table = '';
      if (!this.currentUser.estEmployeur && !this.currentUser.estRecruteur) {
        id = this.currentUser.jobyer.id;
        table = 'fk_user_jobyer';
        this.projectTarget = "jobyer";
      }else{
        id = this.currentUser.employer.entreprises[0].id;
        table = 'fk_user_entreprise';
        this.projectTarget = "employer";
      }

      this.bankService.loadBankAccount(id, table, this.projectTarget).then((data: any)=> {

          if (data && data.data && data.data.length > 0) {
            let banks = data.data;

            this.bank = banks[banks.length - 1];
            if(Utils.isEmpty(this.bank.bic) &&
              Utils.isEmpty(this.bank.detenteur_du_compte) &&
              Utils.isEmpty(this.bank.iban) &&
              Utils.isEmpty(this.bank.nom_de_banque)){
              this.bank = {
                nom_de_banque : '',
                detenteur_du_compte : '',
                iban : '',
                bic : ''
              };
              this.voidAccount = true;
              return;
            }
            this.voidAccount = false;
            this.isValidBank = true;
            this.isValidAccountHolder = true;
            this.isValidIban = true;
            this.isValidBic = true;
          } else
            this.voidAccount = true;
      });
    }
  }

  getUserInfos() {
    this.isNewUser = this.currentUser.newAccount;
    this.showForm = false;
    this.isEmployer = this.currentUser.estEmployeur;
    this.isRecruiter = this.currentUser.estRecruteur;
    this.accountId = this.currentUser.id;
    this.userRoleId = this.currentUser.estEmployeur ? this.currentUser.employer.id : this.currentUser.jobyer.id;
  }

  initValidation() {
    this.isValidBank = false;
    this.isValidAccountHolder = false;
    this.isValidIban = false;
    this.isValidBic = false;
  }

  watchBank(e) {
    let _name = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (!_name) {
      _hint = "Ce champ est obligtoire";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidBank = _isValid;
    this.bankHint = _hint;
    this.isValidForm();
  }

  getCompany(){
    return this.sharedService.getCurrentUser().employer.entreprises[0].nom.toLowerCase()
  }

  getUserFullName(){
    return this.sharedService.getCurrentUser().nom.toLowerCase()+" "+this.sharedService.getCurrentUser().prenom.toLowerCase();
  }

  getUserReverseFullName(){
    return this.sharedService.getCurrentUser().prenom.toLowerCase()+" "+this.sharedService.getCurrentUser().nom.toLowerCase();
  }

  watchAccountHolder(e) {

    let _name = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (!_name) {
      _hint = "Ce champ est obligtoire";
      _isValid = false;
    } else if ((this.isEmployer || this.isRecruiter) && _name.toLowerCase().trim() !== this.getCompany()){
      _hint = "La raison sociale fournie n'est pas conforme à vos informations de profil";
      _isValid = false;
    } else if ((!this.isEmployer && !this.isRecruiter) && _name.toLowerCase().trim() !== this.getUserFullName() && _name.trim() !== this.getUserReverseFullName() ){
      _hint = "Le nom et prénom fournis ne sont pas identiques à vos informations de profil";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidAccountHolder = _isValid;
    this.accountHolderHint = _hint;
    this.isValidForm();
  }

  watchIban(e) {
    let _iban = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (!_iban) {
      _hint = "Ce champ est obligatoire";
      _isValid = false;
    } else if(!Utils.isValidIBAN(_iban)){
      _hint = "Le format de l'IBAN est incorrect";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidIban = _isValid;
    this.ibanHint = _hint;
    this.isValidForm();
  }

  watchBic(e) {
    let _bic = e.target.value;
    let _isValid: boolean = true;
    let _hint: string = "";

    if (!_bic) {
      _hint = "Ce champ est obligatoire";
      _isValid = false;
    } else if(!Utils.isValidBIC(_bic)){
      _hint = "Le format du BIC est incorrect";
      _isValid = false;
    } else {
      _hint = "";
    }

    this.isValidBic = _isValid;
    this.bicHint = _hint;
    this.isValidForm();
  }



  isValidForm() {
    var _isFormValid = false;
    if (this.isValidBank && this.isValidAccountHolder && this.isValidIban && this.isValidBic) {
      _isFormValid = true;
    } else {
      _isFormValid = false;
    }

    return _isFormValid;
  }

  updateBankData() {
    let id = 0;
    let table = '';
    if(this.projectTarget == 'jobyer'){
        id = this.currentUser.jobyer.id;
        table = 'fk_user_jobyer';
    }else{
        id = this.currentUser.employer.entreprises[0].id;
        table = 'fk_user_entreprise';
    }
    this.saveBankData(id,table);
  }

  saveBankData(id,table) {
    this.validation = true;
    this.bankService.saveBankAccount(id, table, this.voidAccount, this.bank).then((data:any)=>{
      if (!data || data.status == 'failure') {
        Messenger().post({
          message: 'Serveur non disponible ou problème de connexion',
          type: 'error',
          showCloseButton: true
        });
        this.validation = false;
      } else {
        Messenger().post({
          message: "Vos coordonnées bancaires ont été enregistrées avec succès",
          type: 'success',
          showCloseButton: true
        });
        this.validation = false;
        jQuery("#modal-bank-account").modal('hide')
      }
    });
  }
}
