import {Component, EventEmitter, Input, Output} from "@angular/core";
import {SharedService} from "../../../providers/shared.service";
import {LoadListService} from "../../../providers/load-list.service";
import {Utils} from "../../utils/utils";
import {AccountConstraints} from "../../../validators/account-constraints";
import MaskedInput from "angular2-text-mask";
import {Configs} from "../../../configurations/configs";
import {CommunesService} from "../../../providers/communes.service";
import {ProfileService} from "../../../providers/profile.service";
import {NKDatetime} from "ng2-datetime/ng2-datetime";

declare var jQuery,moment: any;

@Component({
  selector: 'civility-jobyer',
  template: require('./civility-jobyer.html'),
  directives: [MaskedInput],
  providers: [Utils, LoadListService, AccountConstraints,CommunesService,NKDatetime],
})

export class CivilityJobyer{

  @Input()
  currentUser :any;

  @Input()
  title:string;

  @Output()
  onChange = new EventEmitter<any>();

  @Output()
  onSendData = new EventEmitter<any>();

  @Output()
  onNationalityChange = new EventEmitter<any>();


  birthcp:any;
  birthdep: string;
  birthdepId: string;
  birthplace: string;

  selectedCP: any;
  birthdate: Date;
  birthdateHidden: Date;

  cni: string;
  numSS: string;
  nationalityId: any = "91";
  nationalities = [];

  birthdateHint: string = "";
  cniHint: string = "";
  numSSHint: string = "";
  selectedCommune: any = {id: '0', nom: '', code_insee: ''};
  dataForNationalitySelectReady = false;

  communesData: any = [];
  isFrench: boolean;
  isEuropean: number;
  pays = [];
  index: number;

  numStay:any;
  dateStay:any;
  dateFromStay:any;
  dateToStay:any;
  whoDeliverStay:any;
  regionId:any;
  selectedDep:any;
  isResident: boolean;
  isCIN: boolean;

  isValidBirthdate: boolean =true;
  isValidCni: boolean;
  isValidNumSS: boolean;

  conventions: any = [];

  projectTarget: string;
  scanTitle:string;

  constructor(private sharedService: SharedService,private listService: LoadListService,private communesService:CommunesService,private profileService:ProfileService) {
    listService.loadNationalities().then((response: any) => {
      this.nationalities = response.data;
    });
    this.listService.loadCountries("jobyer").then((data: any) => {
      this.pays = data.data;
    });

  }

  getData(){
    var birthCountryId;
    if (this.index){
      birthCountryId = this.profileService.getCountryByIndex(this.index, this.pays).id;
    }
    var regionId;
    if (!this.regionId) {
      if (this.isEuropean == 1) {
        //etranger
        regionId = 42;
      } else {
        if (this.isFrench) {
          regionId = 40;
        } else {
          regionId = 41;
        }
      }
    } else {
      regionId = this.regionId;
    }

    this.onSendData.emit({numSS:this.numSS,cni:this.cni,nationalityId:this.nationalityId,birthdate:this.birthdate,birthdepId:this.birthdepId,
      numStay:this.numStay,dateStay:this.dateStay,dateFromStay:this.dateFromStay,dateToStay:this.dateToStay,
      prefecture:this.whoDeliverStay,isCIN:this.isCIN,selectedCommune:this.selectedCommune,birthCountryId:birthCountryId,
      regionId:regionId,isResident:this.isResident,isFrench:this.isFrench,isEuropean:this.isEuropean})
    };

    ngOnInit(){
      this.init();
    }

  ngAfterViewInit(): void {

       var self = this;

       jQuery('.dep-select').select2({
         ajax: {
           url: Configs.sqlURL,
           type: 'POST',
           dataType: 'json',
           quietMillis: 250,
           transport: function (params) {
             params.beforeSend = Configs.getSelect2TextHeaders();
             return jQuery.ajax(params);
           },
           data: this.communesService.getDepartmentsByTerm(),
           results: function (data, page) {
             return {results: data.data};
           },
           cache: true
         },

         formatResult: function (item) {
           return item.numero;
         },
         formatSelection: function (item) {
           return item.numero;
         },
         dropdownCssClass: "bigdrop",
         escapeMarkup: function (markup) {
           return markup;
         },
         minimumInputLength: 1,
       });
       jQuery('.dep-select').on('change',
         (e) => {
           self.birthdep = e.added.numero;
           self.birthdepId = e.added.id;
           jQuery('.commune-select').select2("val", "");
         }
       );

       var val = ""
       jQuery('.commune-select').select2({
         maximumSelectionLength: 1,
         tokenSeparators: [",", " "],
         createSearchChoice: function (term, data) {
           if (self.communesData.length == 0) {
             return {
               id: '0', nom: term, code_insee: "0"
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
             //return self.communesService.getCommunesByTerm(term,self.selectedCP);
             return self.communesService.getCommunesByTerm(term, self.birthdep);
           },
           results: function (data, page) {
             self.communesData = data.data;
             return {results: data.data};
           },
           cache: false,

         },

         formatResult: function (item) {
           return item.nom;
         },
         formatSelection: function (item) {
           return item.nom;
         },
         dropdownCssClass: "bigdrop",
         escapeMarkup: function (markup) {
           return markup;
         },
         minimumInputLength: 1,
       });

       jQuery('.commune-select').on('select2-selecting',
         (e) => {
           self.selectedCommune = e.choice;
         }
       )



         jQuery('.whoDeliver-select').select2({

           ajax: {
             url: Configs.sqlURL,
             type: 'POST',
             dataType: 'json',
             quietMillis: 250,
             transport: function (params) {
               params.beforeSend = Configs.getSelect2TextHeaders();
               return jQuery.ajax(params);
             },
             data: this.communesService.getPrefecturesByTerm(),
             results: function (data, page) {
               return {results: data.data};
             },
             cache: true
           },
           formatResult: function (item) {
             return item.nom;
           },
           formatSelection: function (item) {
             return item.nom;
           },
           dropdownCssClass: "bigdrop",
           escapeMarkup: function (markup) {
             return markup;
           },
           minimumInputLength: 3,
         });
         jQuery('.whoDeliver-select').on('change',
           (e) => {
             self.whoDeliverStay = e.added.nom;
           }
         );

   }

   init(){
     if (!this.currentUser.isNewUser)
     this.profileService.loadAdditionalUserInformations(this.currentUser.jobyer.id).then((data: any) => {
       data = data.data[0];
       this.regionId = data.fk_user_identifiants_nationalite;
       this.dateStay = !Utils.isEmpty(data.date_de_delivrance)?moment(data.date_de_delivrance).format("YYYY-MM-DD"):"";
       this.dateFromStay = !Utils.isEmpty(data.debut_validite)?moment(data.debut_validite).format("YYYY-MM-DD"):"";
       this.dateToStay = !Utils.isEmpty(data.fin_validite)?moment(data.fin_validite).format("YYYY-MM-DD"):"";

       if (this.regionId == '40') {
         this.isFrench = true;
         this.birthdepId = data.fk_user_departement;
       } else {
         this.listService.loadCountries("jobyer").then((dataCountry: any) => {
           if(dataCountry && dataCountry.data && dataCountry.data.length>0){
             this.index = dataCountry.data[0].indicatif_telephonique;
           }

         });
         //this.index = this.profileService.getCountryById(data.fk_user_pays, this.pays).indicatif_telephonique;
         if (this.regionId == '42') {
           this.isEuropean = 1;
           this.isFrench = false;
           this.isResident = (data.est_resident == 'Oui' ? true : false);
           this.whoDeliverStay = data.instance_delivrance;
           this.numStay = !Utils.isEmpty(data.numero_titre_sejour) ? data.numero_titre_sejour : "";
           this.nationalityId = data.fk_user_nationalite;
           this.isCIN = false;
         } else {
           this.isEuropean = 0;
           this.isFrench = false;
           this.isCIN = !Utils.isEmpty(data.numero_titre_sejour) ? false : true;
           this.numStay = !Utils.isEmpty(data.numero_titre_sejour) ? data.numero_titre_sejour : "";
         }
       }
       this.onNationalityChange.emit({isFrench:this.isFrench,isEuropean:this.isEuropean});
     });

     if (this.currentUser.jobyer.dateNaissance) {
       var birthDate = moment(new Date(this.currentUser.jobyer.dateNaissance)).format("YYYY-MM-DD");
       this.birthdate = birthDate;
       this.isValidBirthdate = true;
     } else {
       this.birthdate = null;
       this.isValidBirthdate = true;
     }
     var _birthplace = this.currentUser.jobyer.lieuNaissance;
     if (_birthplace !== null) {
       this.communesService.getCommune(_birthplace).then((res: any) => {

         if (res && res.length > 0) {
           this.selectedCommune = res[0];
           jQuery(".commune-select").select2('data', this.selectedCommune);
           if (this.selectedCommune.fk_user_code_postal && this.selectedCommune.fk_user_code_postal != "null") {
             this.selectedCP = parseInt(this.selectedCommune.fk_user_code_postal);
             this.birthcp = this.selectedCommune.code;
             jQuery(".cp-select").select2('data', {id: this.selectedCP, code: this.birthcp});
           } else {
             this.selectedCP = 0;
             this.birthcp = '';
             jQuery(".cp-select").select2('data', {id: this.selectedCP, code: this.birthcp});
           }
         } else {
           this.selectedCommune = {id: '0', nom: _birthplace, code_insee: '0'};
           jQuery(".commune-select").select2('data', this.selectedCommune);
         }
         this.isValidNumSS = true;
       });
     }

     if (!Utils.isEmpty(this.birthdepId)) {
       this.communesService.getDepartmentById(this.birthdepId).then((res: any) => {
         if (res && res.data.length > 0) {
           this.selectedDep = res.data[0];
           jQuery(".dep-select").select2('data', this.selectedDep);
         } else {
           this.selectedDep = {id: '0', nom: "", numero: ""};
           jQuery(".dep-select").select2('data', this.selectedDep);
         }
       });
     }

     this.isValidNumSS = true;
     this.cni = this.currentUser.jobyer.cni;
     this.numSS = this.currentUser.jobyer.numSS;
     this.nationalityId = this.currentUser.jobyer.natId == 0 ? "91" : this.currentUser.jobyer.natId;

     this.isValidCni = true;


     this.profileService.getPrefecture(this.whoDeliverStay).then((data: any) => {
       if (data && data.status == "success" && data.data && data.data.length != 0)
       jQuery(".whoDeliver-select").select2('data', {id: data.data[0].id, nom: this.whoDeliverStay});
     });
     this.isValidForm();
   }

   selectNationality(e) {
     this.profileService.getIdentifiantNationalityByNationality(e.target.value).then((data: any)=> {
       this.isEuropean = data.data[0].pk_user_identifiants_nationalite == "42" ? 1 : 0;
       this.regionId = data.data[0].pk_user_identifiants_nationalite;
       this.onNationalityChange.emit({isFrench:this.isFrench,isEuropean:this.isEuropean});
     })
   }

   watchTypeDocStranger(e) {
     this.isResident = (e.target.value == '0' ? false : true);
   }

   watchTypeDoc(e) {
     this.isCIN = (e.target.value == '0' ? true : false);
   }


   watchIsFrench(e) {
     this.isFrench = e.target.value == "1" ? true : false;
     if (!this.isFrench) {
       this.isEuropean = 0;
       this.regionId = null;
     }
     this.onNationalityChange.emit({isFrench:this.isFrench,isEuropean:this.isEuropean});
   }


   /**
   * Watches National identity card / passport number
   * @param e
   */
   watchOfficialDocument(e) {
     let officialDocChecked = AccountConstraints.checkOfficialDocument(e);
     this.isValidCni = officialDocChecked.isValid;
     this.cniHint = officialDocChecked.hint;
     this.isValidForm();
   }

   watchNumSS(e) {
     let numssChecked = AccountConstraints.checkNumss(e, this.title, this.birthdate, this.selectedCommune);
     this.isValidNumSS = numssChecked.isValid;
     this.numSSHint = numssChecked.hint;
     this.isValidForm();
   }

   watchBirthdate(e) {
     let birthdateChecked = AccountConstraints.checkBirthDate(e.target.value);
     if(birthdateChecked.isValid){
       this.birthdate = e.target.value;
     }

     this.isValidBirthdate = birthdateChecked.isValid;
     this.birthdateHint = birthdateChecked.hint;
     this.isValidForm();
   }

   isValidForm() {
     let isValid = false;
     if(this.isValidBirthdate && this.isValidNumSS){
       if (this.isFrench || this.isEuropean == 0) {
         if (this.isValidCni) {
           isValid = true;
         } else {
           isValid = false;
         }
       }else{
         isValid = true;
       }
     } else {
       isValid = false;
     }
     this.onChange.emit(isValid);
   }
 }
