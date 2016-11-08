import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {AlertComponent} from "ng2-bootstrap";
import {Component} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {Subscription } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {OnInit, OnDestroy} from '@angular/core';
import {PrecontractService} from "../../providers/precontract-service";
import {MedecineService} from "../../providers/medecine.service";
import {OffersService} from "../../providers/offer.service";
import {Utils} from "../utils/utils";
import {ContractService} from "../../providers/contract-service";
import {Observable} from 'rxjs/Rx';
import {Helpers} from "../../providers/helpers.service";
declare var jQuery;

@Component({
  template: require('./contract-form.html'),
  styles: [require('./contract-form.scss')],
  directives: [AlertComponent, NKDatetime],
  providers: [PrecontractService, MedecineService, OffersService, ContractService, Helpers]
})
export class ContractForm{
  currentUser : any;
  urlCode : string;
  projectTarget : string;
  isEmployer : boolean;
  contract : any;
  validationEnabled : boolean = false;
  currentOffer : any;
  jobyer : any;
  employer : any;
  fields : any = [];
  pushTimer : any;
  pullTimer : any;

  //  Agency data
  interimAgencyTitle : string;
  interimMedicalEntity : string;
  interimMedicalEntityAdress : string;

  //  Company Data
  companyName : string;
  workAdress : string;
  companyContact : string;
  companyAccess : string;
  companyMedicalEntity : string;
  companyMedicalEntityAdress : string;

  //  Employee Data
  jobyerLastName : string;
  jobyerFirstName : string;
  numSS : string;
  birthDate : any;
  birthDateComponent : any;
  birthLocaltion : string;
  nationality : string;
  jobyerIdentityLabel : string;
  jobyerIdentityNumber : string;
  jobyerIdentityFrom : any;
  jobyerIdentityTo : any;
  qualification : string;

  //  Mission Data
  missionStart : any;
  missionEnd : any;
  trialPeriod : number;
  nonWorkingPeriod : string;
  termStart : any;
  termEnd : any;
  flexibilityStart : any;
  flexibilityEnd : any;
  recours : any;
  motif : any;
  recoursList : any = [];
  motifsList : any = [];
  recruitementPossible : boolean = false;
  returnToFrance : boolean = false;

  //  Work specification Data
  jobQualification : string;
  jobRisks : string;
  missionCaracteristics : string;
  medicalSupervision : boolean;
  workTime : string;
  protectionEquipments : string;
  protectionEquipementsProvidedByAgency : boolean = false;
  usualStartTime : any;
  usualEndTime : any;

  //  Payment Data
  hourSalary : string;
  collectiveDuration : number;
  paymentCondition : any;
  paymentConditions : any = [];
  endOfMissionBonus : string;
  vacationBonus : string;
  bonus : number;

  //  Complementary Data
  sector : string;
  headQuarterAdress : string;
  missionContent : string;
  officeCategory : any;
  transportTitle : boolean;
  transportZones : any;

  private subscription: Subscription;

  constructor(private sharedService: SharedService,
              private router: Router,
              private pcService : PrecontractService,
              private medecineService : MedecineService,
              private offersService : OffersService,
              private contractService : ContractService,
              private activatedRoute: ActivatedRoute){
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['app/login']);
    }
    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    this.isEmployer = (this.projectTarget == 'employer');

  }

  ngOnInit() {
    debugger;

    if(this.isEmployer){
      this.currentOffer = this.sharedService.getCurrentOffer();
      let urlEmpl = this.generateRandomStr();
      let urljobyer = this.generateRandomStr();
      this.sharedService.setCFormURL(urlEmpl);
      this.jobyer = this.sharedService.getCurrentJobyer();
      this.contractService.getJobyerComplementData(this.jobyer, this.projectTarget).then((data:any)=>{
        debugger;
        this.jobyer.id = data[0].id;
        this.pcService.saveProject(this.currentUser.employer.entreprises[0].id, this.currentOffer.offerId, this.jobyer.id,
          urlEmpl, urljobyer);
        // subscribe to router event
        this.subscription = this.activatedRoute.params.subscribe(
          (param: any) => {
            debugger;
            this.urlCode = param['cid'];
            if(!this.urlCode || this.urlCode.length==0){
              this.urlCode = this.sharedService.getCFormURL();
              if(!this.urlCode || this.urlCode.length==0){
                this.router.navigate(['app/home']);
                return;
              }
            }
            // Let us assess if this web session is legit, we will start by checking if the user is connected
            this.currentUser = this.sharedService.getCurrentUser();
            if (!this.currentUser) {
              //  We need to redirect him to authenication while saving the state for a callback
              this.sharedService.setCFormURL(this.urlCode);
              this.router.navigate(['app/login']);
            }

            //User is authenticated let us seek if the URL corresponds to the current user
            let id = this.isEmployer?
              this.currentUser.employer.entreprises[0].id:
              this.currentUser.jobyer.id;

            this.pcService.getContractProject(id,this.projectTarget,this.urlCode).then((data:any)=>{
              if(data.isValid){
                this.contract = data;
                this.initializeContract();
              } else{
                //  The url and user does not correspond we send the user back to home page
                this.router.navigate(['app/home']);
                return;
              }
            });


          });
      });




    }



  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  initializeContract(){
    // At this stage we know that user is legit as well as the URL. Let us populate our data
    if(this.isEmployer)
      this.initializeEnterpriseData();
    else
      this.initializeJobyerData();
  }

  initializeEnterpriseData(){
    //  Agency data
    this.interimAgencyTitle = 'JOB HUB';
    this.interimMedicalEntity = '181 - CMIE';
    this.interimMedicalEntityAdress = '80 RUE DE CLICHY 75009 PARIS';

    //  Company Data
    this.employer = this.currentUser.employer;
    this.companyName = this.employer.entreprises[0].nom;
    this.headQuarterAdress = this.employer.entreprises[0].siegeAdress.fullAdress;
    let civility = this.currentUser.titre;
    this.companyContact = civility + " " + this.currentUser.nom + " " + this.currentUser.prenom;
    this.companyAccess = '';
    this.medecineService.getMedecine(this.employer.entreprises[0].id).then((data: any)=> {
      if (data && data != null) {
        //
        this.companyMedicalEntity = data.libelle;
        this.companyMedicalEntityAdress = data.adresse + ' ' + data.code_postal;
      }

    });
    this.offersService.loadOfferAdress(this.currentOffer.idOffer,'employer').then((adr:string)=>{
      this.workAdress = adr;
    });

    //  Employee Data
    this.jobyerFirstName = this.jobyer.prenom;
    this.jobyerLastName = this.jobyer.nom;
    if(!Utils.isEmpty(this.jobyer.dateNaissance)) {
      let bd = new Date(this.jobyer.dateNaissance);
      this.birthDate = this.dateFormat(bd);
    }else{
      this.birthDate = '';
    }
    this.contractService.getJobyerComplementData(this.jobyer, this.projectTarget).then((data:any)=>{
      if (data && data.length > 0){
        let datum = data[0];
        this.jobyer.id = datum.id;
        this.numSS = (datum.numss=='null')?'':datum.numss;
        this.birthLocaltion = datum.birthplace;
        this.nationality = datum.nationalite == null?'':datum.nationalite;

        if(datum.cni && datum.cni.length>0 && datum.cni != "null") {
          this.jobyerIdentityLabel = 'CNI ou passeport';
          this.jobyerIdentityNumber = datum.cni;
        }else if (datum.numero_titre_sejour && datum.numero_titre_sejour.length>0 && datum.numero_titre_sejour != "null") {
          this.jobyerIdentityLabel = 'Carte de résident ou titre de travail';
          this.jobyerIdentityNumber = datum.numero_titre_sejour;
        }
        if(datum.debut_validite && datum.debut_validite.length>0 && datum.debut_validite != "null"){
          let d = new Date(datum.debut_validite);
          this.jobyerIdentityFrom = this.simpleDateFormat(d);
        }
        if(datum.fin_validite && datum.fin_validite.length>0 && datum.fin_validite != "null"){
          let d = new Date(datum.fin_validite);
          this.jobyerIdentityTo = this.simpleDateFormat(d);
        }
      }
    });
    this.qualification = this.currentOffer.title;

    //  Mission Data
    let calendar = this.currentOffer.calendarData;
    let minD = calendar[0];
    let maxD = calendar[0];
    let d;
    for(let i=1 ; i <calendar.length ; i++){
      d = calendar[i];
      if(d.date<minD.date){
        minD = d;
      }
      if(d.date>maxD.date){
        maxD = d;
      }
    }
    d = new Date(minD.date);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    this.missionStart = d.getFullYear() + "-" + (month < 10 ? '0' : '') + month + "-" + (day < 10 ? '0' : '') + day;
    d = new Date(maxD.date);
    month = d.getMonth() + 1;
    day = d.getDate();
    this.missionEnd = d.getFullYear() + "-" + (month < 10 ? '0' : '') + month + "-" + (day < 10 ? '0' : '') + day;

    let trial = 2;
    let timeDiff = Math.abs(maxD.date.getTime() - minD.date.getTime());
    let contractLength = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if(contractLength <= 1)
      trial = 0;
    else if(contractLength<30)
      trial = 2;
    else if(contractLength <60)
      trial = 3;
    else
      trial = 5;

    this.trialPeriod = trial;
    this.nonWorkingPeriod = '';
    this.termStart = this.missionStart;
    this.termEnd = this.missionEnd;
    this.flexibilityStart = this.missionStart;
    this.flexibilityEnd = this.missionEnd;
    this.contractService.loadRecoursList().then((data:any)=> {
      this.recoursList = data;
    });


    //  Work specification Data
    this.jobQualification = this.qualification;
    let h = 0;
    for (let i = 0; i < this.currentOffer.calendarData.length; i++) {
      let calendarEntry = this.currentOffer.calendarData[i];
      h = h + Math.abs(calendarEntry.endHour - calendarEntry.startHour);
    }

    this.workTime = ((h/60).toFixed(0)+':'+(h%60))+"";

    //  Payment Data
    this.hourSalary = ""+this.parseNumber(this.currentOffer.jobData.remuneration).toFixed(2);
    this.contractService.loadPeriodicites().then(data=>{
      this.paymentConditions = data;
    });
    this.endOfMissionBonus = '10,00 %';
    this.vacationBonus = '10,00 %';

    //  Complementary Data
    this.sector = this.currentOffer.jobData.sector;

    /*
     *  SAVE FIELDS STATE
     */
    this.fields.push({
      id : 'company_name',
      value : this.companyName
    });
    this.fields.push({
      id : 'work_adress',
      value : this.workAdress
    });
    this.fields.push({
      id : 'company_contact',
      value : this.companyContact
    });
    this.fields.push({
      id : 'company_access',
      value : this.companyAccess
    });
    this.fields.push({
      id : 'company_med',
      value : this.companyMedicalEntity
    });
    this.fields.push({
      id : 'company_med_adr',
      value : this.companyMedicalEntityAdress
    });
    this.fields.push({
      id : 'company_name',
      value : this.companyName
    });
    this.fields.push({
      id : 'mission_start',
      value : this.missionStart
    });
    this.fields.push({
      id : 'mission_end',
      value : this.missionEnd
    });
    this.fields.push({
      id : 'trial_period',
      value : this.trialPeriod
    });
    this.fields.push({
      id : 'non_working_period',
      value : this.nonWorkingPeriod
    });
    this.fields.push({
      id : 'term_start',
      value : this.termStart
    });
    this.fields.push({
      id : 'term_end',
      value : this.termEnd
    });
    this.fields.push({
      id : 'flex_start',
      value : this.flexibilityStart
    });
    this.fields.push({
      id : 'flex_end',
      value : this.flexibilityEnd
    });
    this.fields.push({
      id : 'recours',
      value : this.recours
    });
    this.fields.push({
      id : 'motif',
      value : this.motif
    });
    this.fields.push({
      id : 'recrutement_possible',
      value : this.recruitementPossible
    });
    this.fields.push({
      id : 'return_france',
      value : this.returnToFrance
    });
    this.fields.push({
      id : 'job_qualification',
      value : this.jobQualification
    });
    this.fields.push({
      id : 'job_risks',
      value : this.jobRisks
    });
    this.fields.push({
      id : 'mission_caracteristics',
      value : this.missionCaracteristics
    });
    this.fields.push({
      id : 'med_supervision',
      value : this.medicalSupervision
    });
    this.fields.push({
      id : 'work_time',
      value : this.workTime
    });
    this.fields.push({
      id : 'epi',
      value : this.protectionEquipments
    });
    this.fields.push({
      id : 'epi_by_ia',
      value : this.protectionEquipementsProvidedByAgency
    });
    this.fields.push({
      id : 'usual_start_time',
      value : this.usualStartTime
    });
    this.fields.push({
      id : 'usual_end_time',
      value : this.usualEndTime
    });
    this.fields.push({
      id : 'salary',
      value : this.hourSalary
    });
    this.fields.push({
      id : 'collective_duration',
      value : this.collectiveDuration
    });
    this.fields.push({
      id : 'payment_condition',
      value : this.paymentCondition
    });
    this.fields.push({
      id : 'bonus',
      value : this.bonus
    });
    this.fields.push({
      id : 'sector',
      value : this.sector
    });
    this.fields.push({
      id : 'hq_adress',
      value : this.headQuarterAdress
    });
    this.fields.push({
      id : 'office_cat',
      value : this.officeCategory
    });
    this.fields.push({
      id : 'mission_content',
      value : this.missionContent
    });
    this.fields.push({
      id : 'transport_title',
      value : this.transportTitle
    });
    this.fields.push({
      id : 'transport_zones',
      value : this.transportZones
    });

    this.pcService.insertFields(this.contract,this.fields,this.projectTarget).then(res=>{
      /*
       *  INITIALIZE TIMERS
       */
      this.pushTimer = Observable.timer(1000,3000);
      this.pushTimer.subscribe(this.tpush);
      this.pullTimer = Observable.timer(4000,3000);
      this.pullTimer.subscribe(this.tpull);
    });


  }

  initializeJobyerData(){
    //  Agency data
    this.interimAgencyTitle = 'JOB HUB';
    this.interimMedicalEntity = '181 - CMIE';
    this.interimMedicalEntityAdress = '80 RUE DE CLICHY 75009 PARIS';

    this.jobyer = this.currentUser.jobyer;

    this.jobyerFirstName = this.jobyer.prenom;
    this.jobyerLastName = this.jobyer.nom;
    if(!Utils.isEmpty(this.jobyer.dateNaissance)) {
      let bd = new Date(this.jobyer.dateNaissance);
      this.birthDate = this.dateFormat(bd);
    }else{
      this.birthDate = '';
    }
    this.contractService.getJobyerComplementData(this.jobyer, this.projectTarget).then((data:any)=>{
      if (data && data.length > 0){
        let datum = data[0];
        this.jobyer.id = datum.id;
        this.numSS = (datum.numss=='null')?'':datum.numss;
        this.birthLocaltion = datum.birthplace;
        this.nationality = datum.nationalite == null?'':datum.nationalite;

        if(datum.cni && datum.cni.length>0 && datum.cni != "null") {
          this.jobyerIdentityLabel = 'CNI ou passeport';
          this.jobyerIdentityNumber = datum.cni;
        }else if (datum.numero_titre_sejour && datum.numero_titre_sejour.length>0 && datum.numero_titre_sejour != "null") {
          this.jobyerIdentityLabel = 'Carte de résident ou titre de travail';
          this.jobyerIdentityNumber = datum.numero_titre_sejour;
        }
        if(datum.debut_validite && datum.debut_validite.length>0 && datum.debut_validite != "null"){
          let d = new Date(datum.debut_validite);
          this.jobyerIdentityFrom = this.simpleDateFormat(d);
        }
        if(datum.fin_validite && datum.fin_validite.length>0 && datum.fin_validite != "null"){
          let d = new Date(datum.fin_validite);
          this.jobyerIdentityTo = this.simpleDateFormat(d);
        }
      }
    });
    this.qualification = '';

    this.endOfMissionBonus = '10,00%';
    this.vacationBonus = '10,00%';

    /*
     *  SAVE FIELDS STATE
     */
    this.fields = [];
    this.fields.push({
      id : 'jobyer_first_name',
      value : this.jobyerFirstName
    });
    this.fields.push({
      id : 'jobyer_last_name',
      value : this.jobyerLastName
    });
    this.fields.push({
      id : 'numero_ss',
      value : this.numSS
    });
    this.fields.push({
      id : 'birth_date',
      value : this.birthDate
    });
    this.fields.push({
      id : 'birth_localtion',
      value : this.birthLocaltion
    });
    this.fields.push({
      id : 'jobyer_nationality',
      value : this.nationality
    });
    this.fields.push({
      id : 'jobyer_identity_label',
      value : this.jobyerIdentityLabel
    });
    this.fields.push({
      id : 'jobyer_identity_number',
      value : this.jobyerIdentityNumber
    });
    this.fields.push({
      id : 'jobyer_idnetity_from',
      value : this.jobyerIdentityFrom
    });
    this.fields.push({
      id : 'jobyer_identity_to',
      value : this.jobyerIdentityTo
    });
    this.fields.push({
      id : 'jobyer_qualification',
      value : this.qualification
    });


    this.pcService.insertFields(this.contract,this.fields,this.projectTarget).then(res=>{
      /*
       *  INITIALIZE TIMERS
       */
      this.pushTimer = Observable.timer(1000,3000);
      this.pushTimer.subscribe(this.tpush);
      this.pullTimer = Observable.timer(4000,3000);
      this.pullTimer.subscribe(this.tpull);
    });
  }

  tpush(){
    let modifiedFields = [];
    for(let i = 0 ; i < this.fields.length ; i++){
      let f = this.fields[i];
      let actualValue = jQuery('#'+f.id).val();
      if(f.value == actualValue)
        continue;
      modifiedFields.push(f);
      f.value = actualValue;
    }

    this.pcService.pushFields(this.contract, modifiedFields, this.projectTarget);
  }

  tpull(){
    this.pcService.pullFields(this.contract, this.projectTarget).then((fields:any)=>{
      for(let i = 0 ; i < fields.length ; i++){
        let f = fields[i];
        jQuery('#'+f.id).val(f.value);
      }
    });
  }

  submitContractForm(){

  }

  dateFormat(d) {
    if(!d || typeof d === 'undefined')
      return '';
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;
    return sd;
  }

  simpleDateFormat(d:Date){
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = (da < 10 ? '0' : '')+da+'/' + (m < 10 ? '0' : '') + m + "/" +d.getFullYear() ;
    return sd
  }

  parseNumber(str) {
    try {
      return parseFloat(str);
    }
    catch (err) {
      return 0.0;
    }
  }

  generateRandomStr(){
    let txt = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let len = 12;
    for(let i = 0 ; i < len ; i++)
      txt = txt+possible.charAt(Math.floor(Math.random() * possible.length));
    return txt;
  }
}
