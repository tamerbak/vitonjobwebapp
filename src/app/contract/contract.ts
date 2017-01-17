import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Helpers} from "../../providers/helpers.service";
import {SharedService} from "../../providers/shared.service";
import {ContractService} from "../../providers/contract-service";
import {MedecineService} from "../../providers/medecine.service";
import {ParametersService} from "../../providers/parameters-service";
import {ProfileService} from "../../providers/profile.service";
import {LoadListService} from "../../providers/load-list.service";
import {Utils} from "../utils/utils";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {OffersService} from "../../providers/offer.service";
import {AlertComponent} from "ng2-bootstrap";
import {SmsService} from "../../providers/sms-service";
import {ConventionService} from "../../providers/convention.service";
import {FinanceService} from "../../providers/finance.service";
import {GlobalConfigs} from "../../configurations/globalConfigs";
import {RecruitmentService} from "../../providers/recruitment-service";
declare var Messenger,jQuery,moment: any;

/**
 * @author daoudi amine
 * @description Generate contract informations and call yousign service
 * @module Contract
 */
@Component({
  template: require('./contract.html'),
  styles: [require('./contract.scss')],
  directives: [AlertComponent, NKDatetime],
  providers: [ContractService, MedecineService, ParametersService, Helpers,SmsService, OffersService,ProfileService,LoadListService, ConventionService, FinanceService, GlobalConfigs, RecruitmentService]
})
export class Contract {

  numContrat: string = '';
  projectTarget: string;
  isEmployer: boolean;

  employer: any;
  jobyer: any;
  companyName: string;
  currentUser: any;
  employerFullName: string;
  jobyerFirstName: string;
  jobyerLastName: string;
  contractData: any;
  currentOffer: any;
  workAdress: string;
  jobyerBirthDate: string;
  hqAdress: string;
  rate: number = 0.0;
  recours: any;
  motifsGrouped : any;
  justificatifs: any;
  nationalities: any;

  dataValidation :boolean = false;

  embaucheAutorise : boolean=false;
  rapatriement : boolean=false;
  periodicites : any = [];

  datepickerOpts: any;
  //jobyer Data
  pays:any;
  index:any;
  isFrench:any;
  isEuropean:any;
  regionId:any;
  birthdepId:any;
  isResident:any;
  dateStay:any;
  dateFromStay:any;
  dateToStay:any;
  whoDeliverStay:any;
  numStay:any;
  nationalityId:any;
  isCIN:any;
  cni:any;
  isMissionDateValid: boolean = true;

  //transport
  transportMeans = [];
  natureTitre="";

  //  EPI
  epiList : any =[];
  selectedEPI : string;
  offerEpi : any = [];
  alerts = [];
  inProgress: boolean = false;


  dateFormat(d) {
    if(!d || typeof d === 'undefined')
      return '';
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;
    return sd;
  }

  constructor(private medecineService: MedecineService,
              private service: ParametersService,
              private contractService: ContractService,
              private conventionService: ConventionService,
              private sharedService: SharedService,
              private profileService: ProfileService,
              private listService: LoadListService,
              private offersService : OffersService,
              private smsService: SmsService,
              private router: Router,
              private financeService: FinanceService,
              private recruitmentSrvice: RecruitmentService) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
      return;
    }
    // Get target to determine configs
    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    this.isEmployer = (this.projectTarget == 'employer');

    // Retrieve jobyer

    this.jobyer = this.sharedService.getCurrentJobyer();

    listService.loadNationalities().then((response: any) => {
      this.nationalities = response.data;
    });



    this.jobyerFirstName = this.jobyer.prenom;
    this.jobyerLastName = this.jobyer.nom;
    if(!Utils.isEmpty(this.jobyer.dateNaissance)) {
      let bd = new Date(this.jobyer.dateNaissance);
      this.jobyerBirthDate = this.dateFormat(bd);
    }else{
      this.jobyerBirthDate = '';
    }
    this.jobyer.id = 0;
    this.jobyer.numSS = '';
    this.jobyer.nationaliteLibelle = '';


    this.contractService.getJobyerComplementData(this.jobyer, this.projectTarget).then((data: any)=> {
      if (data && data.length > 0) {
        let datum = data[0];
        this.jobyer.id = datum.id;
        this.jobyer.numSS = (datum.numss == "null") ? '':datum.numss;
        this.jobyer.nationaliteLibelle = Utils.isEmpty(datum.nationalite) ? '' : datum.nationalite;
        this.jobyer.titreTravail = '';
        this.jobyer.debutTitreTravail = '';
        this.jobyer.finTitreTravail = '';

        if(datum.cni && datum.cni.length>0 && datum.cni != "null")
          this.jobyer.titreTravail = datum.cni;
        else if (datum.numero_titre_sejour && datum.numero_titre_sejour.length>0 && datum.numero_titre_sejour != "null")
          this.jobyer.titreTravail = datum.numero_titre_sejour;
        if(datum.debut_validite && datum.debut_validite.length>0 && datum.debut_validite != "null"){
          let d = new Date(datum.debut_validite);
          this.jobyer.debutTitreTravail = d;
          this.contractData.debutTitreTravail = this.simpleDateFormat(this.jobyer.debutTitreTravail);
        }
        if(datum.fin_validite && datum.fin_validite.length>0 && datum.fin_validite != "null"){
          let d = new Date(datum.fin_validite);
          this.jobyer.finTitreTravail = d;
          this.contractData.finTitreTravail = this.simpleDateFormat(this.jobyer.finTitreTravail);
        }

        this.contractData.numeroTitreTravail =this.natureTitre + this.jobyer.titreTravail;
        this.contractService.getJobyerAdress(this.jobyer.id).then((adress : string)=>{
          this.jobyer.address = adress;
        });


        this.profileService.loadAdditionalUserInformations(this.jobyer.id).then((data: any) => {
          if (data && data.data && data.data.length > 0) {
            data = data.data[0];
            //load countries list
            this.listService.loadCountries("jobyer").then((paysRes: any) => {
              this.pays = paysRes.data;
            let birthCountry = this.profileService.getCountryById(data.fk_user_pays, this.pays);
            this.jobyer.nationaliteLibelle = data.nationalite_libelle;
            this.cni = data.cni;
            this.index = birthCountry.indicatif_telephonique;
            this.regionId = data.fk_user_identifiants_nationalite;
            this.dateStay = data.date_de_delivrance;
            this.dateFromStay = data.debut_validite;
            this.dateToStay = data.fin_validite;
            if (this.index == 33) {
              this.isFrench = true;
              this.isCIN = true;
              this.birthdepId = data.fk_user_departement;
              this.jobyer.lieuNaissance = data.lieu_de_naissance;
            } else {
              this.isFrench = false;
              this.jobyer.lieuNaissance = birthCountry.nom;
            }
            if (this.regionId == '42') {
              this.isEuropean = 1;
              this.isResident = (data.est_resident == 'Oui' ? true : false);
              this.whoDeliverStay = data.instance_delivrance;
              this.numStay = !Utils.isEmpty(data.numero_titre_sejour) ? data.numero_titre_sejour : "";
              this.isCIN = false;
            } else {
              this.isEuropean = 0;
              this.isCIN = !Utils.isEmpty(data.numero_titre_sejour) ? false : true;
              this.numStay = !Utils.isEmpty(data.numero_titre_sejour) ? data.numero_titre_sejour : "";
            }

            if(this.isCIN)
              this.natureTitre= "CNI ou Passeport ";

            if(this.isEuropean != 1 && !this.isCIN)
              this.natureTitre= "Carte de ressortissant ";

            if(this.isEuropean == 1 && this.isResident)
              this.natureTitre= "Carte de résident ";

            if(this.isEuropean == 1 && !this.isResident)
              this.natureTitre= "Titre de séjour ";
            this.contractData.numeroTitreTravail =this.natureTitre + this.jobyer.titreTravail;
          });
          }
        });
      }
    });

    //  Load recours list
    this.contractService.loadJustificationsList().then(data=> {
      this.recours = data;
    });

    this.contractService.loadPeriodicites().then(data=>{
      this.periodicites = data;
    });


    // Get the currentEmployer
    this.currentUser = this.sharedService.getCurrentUser();

    if (this.currentUser) {
      this.employer = this.currentUser.employer;
      this.companyName = this.employer.entreprises[0].nom;
      this.hqAdress = this.employer.entreprises[0].siegeAdress.fullAdress;
      let civility = this.currentUser.titre;
      this.employerFullName = civility + " " + this.currentUser.nom + " " + this.currentUser.prenom;
      this.medecineService.getMedecine(this.employer.entreprises[0].id).then((data: any)=> {
        if (data && data != null) {
          //
          this.contractData.centreMedecineEntreprise = data.libelle;
          this.contractData.adresseCentreMedecineEntreprise = data.adresse + ' ' + data.code_postal;
        }

      });
    }

    // Check if there is a current offer
    let trial = 0;
    this.currentOffer = this.sharedService.getCurrentOffer();
    if(this.currentOffer){
      let calendar = this.currentOffer.calendarData;
      let minDay = new Date(calendar[0].date);
      let maxDay = new Date(calendar[0].date);
      //
      for(let i=1 ; i <calendar.length;i++){
        let date = new Date(calendar[i].date);
        if(minDay.getTime()>date.getTime())
          minDay = date;
        if(maxDay.getTime()<date.getTime())
          maxDay = date;
      }


      let timeDiff = Math.abs(maxDay.getTime() - minDay.getTime());
      let contractLength = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if(contractLength <= 1)
        trial = 0;
      else if(contractLength<30)
        trial = 2;
      else if(contractLength <60)
        trial = 3;
      else
        trial = 5;

      this.offersService.loadOfferAdress(this.currentOffer.idOffer, "employeur").then((data:any)=>{
        this.workAdress = data;
      });
    }

    // Initialize contract data
    this.contractData = {
      num: "",
      numero: "",
      centreMedecineEntreprise: "",
      adresseCentreMedecineEntreprise: "",
      centreMedecineETT: "CMIE",
      adresseCentreMedecineETT: "4 rue de La Haye – 95731 ROISSY EN FRANCE",
      contact: this.employerFullName,
      indemniteFinMission: "10.00%",
      indemniteCongesPayes: "10.00%",
      moyenAcces: "",
      numeroTitreTravail: "",
      debutTitreTravail: "",
      finTitreTravail: "",
      periodesNonTravaillees: "",
      debutSouplesse: "",
      finSouplesse: "",
      equipements: "",

      interim: "Groupe 3S",
      missionStartDate: this.getStartDate(),
      missionEndDate: this.getEndDate(),
      trialPeriod: trial,
      termStartDate: this.getXmlEndDate(),
      termEndDate: this.getXmlEndDate(),
      motif: "",
      justification: "",
      qualification: "",
      characteristics: "",
      isScheduleFixed: "true",
      workTimeVariable: 0,
      usualWorkTimeHours: "8H00/17H00 variables",
      workStartHour: null,
      workEndHour: null,
      workHourVariable: "",
      postRisks: "",
      medicalSurv: "",
      epi: false,
      epiProvidedBy:'',
      baseSalary: 0,
      MonthlyAverageDuration: "0",
      salaryNHours: "00,00€ B/H",
      salarySH35: "+00%",
      salarySH43: "+00%",
      restRight: "00%",
      interimAddress: "",
      customer: "",
      primes: 0,
      headOffice: "",
      missionContent: "",
      category: 'Employé',
      sector: "",
      companyName: '',
      titreTransport: 'NON',
      zonesTitre: '',
      risques: '',
      elementsCotisation: 0.0,
      elementsNonCotisation: 1.0,
      titre: '',
      periodicite : '',
      offerContact : '',
      contactPhone : '',
      prerequis : [],
      adresseInterim : ""
    };

    this.offersService.loadEPI().then((data:any)=>{
      this.epiList = data;
    });

    if (this.currentOffer) {
      this.service.getRates().then((data: any) => {
        for (let i = 0; i < data.length; i++) {
          if (this.currentOffer.jobData.remuneration < data[i].taux_horaire) {
            this.rate = parseFloat(data[i].coefficient);
            this.contractData.elementsCotisation = this.rate;
            break;
          }
        }
      });
      this.initContract();
    }

    // Notify the jobyer that a new contract was created
    this.notifyJobyerNewContract();

    //get convention category
    this.getCategory();

    //transportMeans
    this.transportMeans = [
      "Véhicule",
      "Transport en commun Zone 1 à 2",
      "Transport en commun Zone 1 à 3",
      "Transport en commun Zone 1 à 4",
      "Transport en commun Zone 1 à 5",
      "Transport en commun Zone 2 à 3",
      "Transport en commun Zone 3 à 4",
      "Transport en commun Zone 4 à 5",
      "Transport en commun toutes zones"
    ];

  }

  recoursSelected(e) {
    if(e.target.value.indexOf("emploi à caractère saisonnier") != -1){
      this.contractData.indemniteFinMission = "0.00%";
    }else{
      this.contractData.indemniteFinMission = "10.00%";
    }
  }


  watchTransportTitle(e){
    this.contractData.titreTransport = e.target.value;
  }


  formatNumContrat(num) {
    let snum = num + "";
    let zeros = 10 - snum.length;
    if (zeros < 0)
      return snum;

    for (let i = 0; i < zeros; i++)
      snum = "0" + snum;

    return snum;
  }

  getStartDate() {

    let d = new Date();
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = (da < 10 ? '0' : '') + da + "/" + (m < 10 ? '0' : '') + m + "/" + d.getFullYear();

    if (!this.currentOffer) {
      return sd;
    }
    if (!this.currentOffer.calendarData || this.currentOffer.calendarData.length == 0) {
      return sd;
    }

    let minDate = this.currentOffer.calendarData[0].date;
    for (let i = 1; i < this.currentOffer.calendarData.length; i++) {
      if (this.currentOffer.calendarData[i].date < minDate) {
        minDate = this.currentOffer.calendarData[i].date;
      }
    }
    d = new Date(minDate);
    m = d.getMonth() + 1;
    da = d.getDate();
    sd = (da < 10 ? '0' : '') + da + "/" + (m < 10 ? '0' : '') + m + "/" + d.getFullYear();
    return sd;
  }

  getEndDate() {
    let d = new Date();
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = (da < 10 ? '0' : '') + da + "/" + (m < 10 ? '0' : '') + m + "/" + d.getFullYear();

    if (!this.currentOffer) {
      return sd;
    }
    if (!this.currentOffer.calendarData || this.currentOffer.calendarData.length == 0) {
      return sd;
    }

    let maxDate = this.currentOffer.calendarData[0].date;
    for (let i = 1; i < this.currentOffer.calendarData.length; i++) {
      if (this.currentOffer.calendarData[i].date > maxDate) {
        maxDate = this.currentOffer.calendarData[i].date;
      }
    }

    d = new Date(maxDate);
    m = d.getMonth() + 1;
    da = d.getDate();
    sd = (da < 10 ? '0' : '') + da + "/" + (m < 10 ? '0' : '') + m + "/" + d.getFullYear();

    return sd;
  }

  getXmlEndDate() {
    let d = new Date();
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = d.getFullYear()+'-'+ (m < 10 ? '0' : '')+ m +'-'+ (da < 10 ? '0' : '') + da ;

    if (!this.currentOffer) {
      return sd;
    }
    if (!this.currentOffer.calendarData || this.currentOffer.calendarData.length == 0) {
      return sd;
    }

    let maxDate = this.currentOffer.calendarData[0].date;
    for (let i = 1; i < this.currentOffer.calendarData.length; i++) {
      if (this.currentOffer.calendarData[i].date > maxDate) {
        maxDate = this.currentOffer.calendarData[i].date;
      }
    }

    d = new Date(maxDate);
    m = d.getMonth() + 1;
    da = d.getDate();
    sd = d.getFullYear()+'-'+ (m < 10 ? '0' : '') + m + '-'+ (da < 10 ? '0' : '') + da ;

    return sd;
  }


  initContract() {

    let calendar = this.currentOffer.calendarData;
    let minDay = new Date(calendar[0].date);
    let maxDay = new Date(calendar[0].date);
    this.offersService.loadOfferAdress(this.currentOffer.idOffer, "employeur").then((data:any)=>{
      this.workAdress = data;
    });

    //
    //
    for(let i=1 ; i <calendar.length;i++){
      let date = new Date(calendar[i].date);
      if(minDay.getTime()>date.getTime())
        minDay = date;
      if(maxDay.getTime()<date.getTime())
        maxDay = date;
    }

    let trial = 1;
    let timeDiff = Math.abs(maxDay.getTime() - minDay.getTime());
    let contractLength = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if(contractLength <= 1)
      trial = 1;
    else if(contractLength<30)
      trial = 2;
    else if(contractLength <60)
      trial = 3;
    else
      trial = 5;


    let offerContact = '';
    let contactPhone = '';
    if(this.currentOffer.contact)
      offerContact = this.currentOffer.contact;
    if(this.currentOffer.telephone)
      contactPhone = this.currentOffer.telephone;

    this.contractData = {
      num: this.numContrat,
      centreMedecineEntreprise: "",
      adresseCentreMedecineEntreprise: "",
      centreMedecineETT: "CMIE",
      adresseCentreMedecineETT: "4 rue de La Haye – 95731 ROISSY EN FRANCE",

      numero: "",
      contact: this.employerFullName,
      indemniteFinMission: "10.00%",
      indemniteCongesPayes: "10.00%",
      moyenAcces: "",
      numeroTitreTravail: this.natureTitre+this.jobyer.titreTravail,
      debutTitreTravail: this.jobyer.debutTitreTravail ? this.dateFormat(this.jobyer.debutTitreTravail) : "",
      finTitreTravail: this.jobyer.finTitreTravail ? this.dateFormat(this.jobyer.finTitreTravail) : "",
      periodesNonTravaillees: "",
      debutSouplesse: null,
      finSouplesse: null,
      equipements: "",
      interim: "HubJob.fr",
      missionStartDate: this.getStartDate(),
      missionEndDate: this.getEndDate(),
      trialPeriod: trial,
      termStartDate: this.getXmlEndDate(),
      termEndDate: this.getXmlEndDate(),
      motif: "",
      justification: "",
      qualification: this.currentOffer.title,
      characteristics: "",
      //workTimeHours: this.calculateOfferHours(),
      isScheduleFixed: "true",
      workTimeVariable: 0,
      usualWorkTimeHours: "8H00/17H00 variables",
      workStartHour: null,
      workEndHour: null,
      workHourVariable: "",
      postRisks: "",
      medicalSurv: "",
      epi: false,
      epiProvidedBy:'',
      baseSalary: this.parseNumber(this.currentOffer.jobData.remuneration).toFixed(2),
      MonthlyAverageDuration: "0",
      salaryNHours: this.parseNumber(this.currentOffer.jobData.remuneration).toFixed(2) + " € B/H",
      salarySH35: "+00%",
      salarySH43: "+00%",
      restRight: "00%",
      interimAddress: "",
      customer: "",
      primes: 0,
      headOffice: this.hqAdress,
      missionContent: "",
      category: 'Employé',
      sector: this.currentOffer.jobData.sector,
      companyName: this.companyName,
      workAdress: this.workAdress,
      jobyerBirthDate: this.jobyerBirthDate,
      titreTransport: 'NON',
      zonesTitre: '',
      risques: '',
      elementsCotisation: this.rate,
      elementsNonCotisation: 1.0,
      titre: this.currentOffer.title,
      periodicite : '',
      offerContact : offerContact,
      contactPhone : contactPhone,
      prerequis : [],
      adresseInterim : this.workAdress
    };


    this.updateDatePickers();

    this.offersService.loadOfferPrerequisObligatoires(this.currentOffer.idOffer).then((data:any)=>{
      this.currentOffer.jobData.prerequisObligatoires = [];
      for(let j = 0 ; j < data.length ; j++){
        this.currentOffer.jobData.prerequisObligatoires.push(data[j].libelle);
      }

      this.contractData.prerequis = this.currentOffer.jobData.prerequisObligatoires;
    });

    this.offersService.loadOfferEPI(this.currentOffer.idOffer, "employer").then((data: any)=>{
      if(data)
        this.contractData.epiList = data;
      else
        this.contractData.epiList = [];
    });

    this.medecineService.getMedecine(this.employer.entreprises[0].id).then((data: any)=> {
      if (data && data != null) {
        this.contractData.centreMedecineEntreprise = data.libelle;
        this.contractData.adresseCentreMedecineEntreprise = data.adresse + ' ' + data.code_postal;
      }
    });


    this.conventionService.loadConventionData(this.employer.id).then((data: any)=>{
      if (data.length > 0 && data[0].duree_collective_travail_hebdo != 'null') {
        this.contractData.MonthlyAverageDuration = data[0].duree_collective_travail_hebdo;
      } else {
        this.contractData.MonthlyAverageDuration = 35;
      }
    });
  }



  ngAfterViewInit(){
    this.updateDatePickers();
    this.updateTimePickers();
  }

  updateDatePickers(){

    let elements = [];
    jQuery("div[id^='q-datepicker_']").each(function () {
      elements.push(this.id);
    });
    //jQuery('#startmission').datepicker('update', this.contractData.missionStartDate);
    //jQuery('#starttermdate').datepicker('update', this.getEndDate());
    //jQuery('#endtermdate').datepicker('update', this.getEndDate());
    //jQuery('#endmission').datepicker('update', this.contractData.missionEndDate);
    jQuery('#' + elements[4]).datepicker('update', "");
    jQuery('#' + elements[5]).datepicker('update', "");


  }

  updateTimePickers(){
    jQuery("input[id^='q-timepicker_']").each(function () {
      jQuery(this).attr('required', 'true')

      // If you wanna solve the fullwidth problem
      //jQuery(this).parent().css('width', '100%')
  	  //jQuery("datetime .form-inline").removeClass('form-inline')
    });
  }
  initWorkStartHour(){
    let today = new Date();
    today.setHours(8);
    today.setMinutes(0);
    return today;

  }

  initWorkEndHour(){
    let today = new Date();
    today.setHours(17);
    today.setMinutes(0);
    return today;
  }

  parseNumber(str) {
    try {
      return parseFloat(str);
    }
    catch (err) {
      return 0.0;
    }
  }

  // TODO To check return 0 ou '' ou null
  calculateOfferHours(): string {
    if (!this.currentOffer)
      return '0';
    let h = 0;
    for (let i = 0; i < this.currentOffer.calendarData.length; i++) {
      let calendarEntry = this.currentOffer.calendarData[i];
      h = h + Math.abs(calendarEntry.endHour - calendarEntry.startHour) / 60;
    }
    return h.toFixed(0);
  }

  gotoContractListPage(){
    let isValid = !this.missingJobyerData() && this.isMissionDateValid;
    if(!isValid){
      return;
    }
    this.inProgress = true;

    //get next num contract
    this.contractService.getNumContract().then((data: any) => {
      this.dataValidation = true;

      if (data && data.length > 0) {
        this.contractData.numero = this.formatNumContrat(data[0].numct);
        this.contractData.num = this.formatNumContrat(data[0].numct);
      }else{
        this.addAlert("danger", "Une erreur est survenue lors de la sauvegarde des données. Veuillez rééssayer l'opération.");
        this.inProgress = false;
        return;
      }

      this.contractData.adresseInterim= this.workAdress;

      //save contrct data
     this.contractService.saveContract(
        this.contractData,
        this.jobyer.id,
        this.employer.entreprises[0].id,
        this.projectTarget,
        this.currentUser.id,
        this.currentOffer.idOffer).then((data: any) => {
          if (data && data.status == "success" && data.data && data.data.length > 0) {
            //contract data saved
            this.contractData.id = data.data[0].pk_user_contrat;
            //make the offer state to "en contrat"
            this.offersService.updateOfferState(this.currentOffer.idOffer, "en contrat").then((data: any) => {
              if (data && data.status == "success") {
                this.currentOffer.etat = "en contrat";
                this.offersService.spliceOfferInLocal(this.currentUser, this.currentOffer, this.projectTarget);
                this.sharedService.setCurrentUser(this.currentUser);
                //place offer in archive if nb contract of the selected offer is equal to its nb poste
                this.checkOfferState(this.currentOffer);
                //generate hour mission based on the offer slots
                this.contractService.generateMission(this.contractData.id, this.currentOffer);
                //update recrutement groupé state
                this.recruitmentSrvice.updateRecrutementGroupeState(this.currentUser.id, this.currentOffer.idOffer, this.jobyer.id, this.currentOffer.jobData.idJob);
                //generate docusign envelop
                this.saveDocusignInfo();
              }else {
                this.addAlert("danger", "Une erreur est survenue lors de la sauvegarde des données. Veuillez rééssayer l'opération.");
                this.inProgress = false;
                return;
              }
            })
          } else {
            this.addAlert("danger", "Une erreur est survenue lors de la sauvegarde des données. Veuillez rééssayer l'opération.");
            this.inProgress = false;
            return;
          }
        },
        (err) => {
          this.addAlert("danger", "Une erreur est survenue lors de la sauvegarde des données. Veuillez rééssayer l'opération.");
          this.inProgress = false;
          return;
        })
      });
    }

  saveDocusignInfo() {
    this.inProgress = true;

    this.financeService.loadQuote(
      this.currentOffer.idOffer,
      this.contractData.baseSalary
    ).then((data: any) => {
      if(!data || Utils.isEmpty(data.quoteId) || data.quoteId == 0){
        this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
        this.inProgress = false;
        return;
      }

      this.financeService.loadPrevQuote(this.currentOffer.idOffer).then((results : any)=>{
        if(!results || !results.lignes || results.lignes.length == 0){
          this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
          this.inProgress = false;
          return;
        }

        this.contractService.callYousign(
          this.currentUser,
          this.employer,
          this.jobyer,
          this.contractData,
          this.projectTarget,
          this.currentOffer,
          data.quoteId
        ).then((data: any) => {
          if(!data || data == null || Utils.isEmpty(data.Employeur) || Utils.isEmpty(data.Jobyer) || Utils.isEmpty(data.Employeur.idContrat) || Utils.isEmpty(data.Jobyer.idContrat) || !Utils.isValidUrl(data.Employeur.url) || !Utils.isValidUrl(data.Jobyer.url)){
            this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
            this.inProgress = false;
            return;
          }
          this.setDocusignData(data);

          //update contract in Database with docusign data
          this.contractService.updateContract(this.contractData, this.projectTarget).then((data: any) => {
              if (!data || data.status != "success") {
                this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
                this.inProgress = false;
                return;
              }

              //go to contract list page
              this.router.navigate(['contract/list']);
            },
            (err) => {
              this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
              this.inProgress = false;
              return;
            })
        }).catch(function (err) {
          this.addAlert("danger", "Une erreur est survenue lors de la génération du contrat. Veuillez rééssayer l'opération.");
          this.inProgress = false;
          return;
        });
      });
    });
  }

  setDocusignData(data){
    let partner = GlobalConfigs.global['electronic-signature'];

    let dataValue = null;
    let partnerData = null;
    this.contractData.partnerEmployerLink = null;

    if (partner === 'yousign') {
      dataValue = data[0]['value'];
      partnerData = JSON.parse(dataValue);
      //get the link yousign of the contract for the employer
      this.contractData.partnerEmployerLink = partnerData.iFrameURLs[1].iFrameURL;
    } else if (partner === 'docusign') {
      dataValue = data;
      partnerData = dataValue;
      //get the link docusign of the contract for the employer
      this.contractData.partnerEmployerLink = partnerData.Employeur.url;
    }

    // get the partner link of the contract and the phoneNumber of the jobyer
    this.contractData.partnerJobyerLink = null;
    if (partner === 'yousign') {
      this.contractData.partnerJobyerLink = partnerData.iFrameURLs[0].iFrameURL;
      this.contractData.demandeJobyer = partnerData.idDemands[0].idDemand;
      this.contractData.demandeEmployer = partnerData.idDemands[1].idDemand;

    } else if (partner === 'docusign') {
      this.contractData.partnerJobyerLink = partnerData.Jobyer.url;
      this.contractData.demandeJobyer = partnerData.Jobyer.idContrat;
      this.contractData.demandeEmployer = partnerData.Employeur.idContrat;
      this.contractData.enveloppeEmployeur = partnerData.Employeur.folderURL;
      this.contractData.enveloppeJobyer = partnerData.Jobyer.folderURL;
    }
  }

  checkOfferState(offer){
    this.contractService.getContractsByOffer(offer.idOffer).then((data: any) => {
      if(data && data.data && data.data.length != 0 && data.data.length >= offer.nbPoste){
        this.offersService.updateOfferState(offer.idOffer, "en archive");
        offer.etat = "en archive";
        this.offersService.spliceOfferInLocal(this.currentUser, offer, this.projectTarget);
        this.sharedService.setCurrentUser(this.currentUser);
      }
    })
  }

  formHasChanges(){
    if(this.dataValidation){
      return false;
    }
    return true;
  }

  watchMedicalSupervision(e){
    this.contractData.medicalSurv = e.target.value;
  }

  notifyJobyerNewContract() {
    var message = "Une proposition de recrutement vous a été adressée.";
    let jobyer = this.jobyer;
    let contractData = this.contractData;
    let jobyerBirthDate = this.jobyerBirthDate;
    if (
      !jobyer.nom || !jobyer.prenom || !jobyer.numSS || !jobyerBirthDate || !jobyer.lieuNaissance || !jobyer.nationaliteLibelle || !contractData.numeroTitreTravail || !contractData.debutTitreTravail || !contractData.finTitreTravail || !contractData.qualification
    ) {
      message = message + " Certaines informations de votre compte sont manquantes, veuillez les renseigner : -";
      message = message + ((!jobyer.nom)? " Nom -" : "");
      message = message + ((!jobyer.prenom)? " Prénom -" : "");
      message = message + ((!jobyer.prenom)? " Prénom -" : "");
      message = message + ((!jobyer.numSS)? " Numéro SS -" : "");
      message = message + ((!jobyerBirthDate)? " Date de naissance -" : "");
      message = message + ((!jobyer.lieuNaissance)? " Lieu de naissance -" : "");
      message = message + ((!jobyer.nationaliteLibelle)? " Nationalité -" : "");
      message = message + ((!jobyer.numeroTitreTravail)? " CNI ou passeport -" : "");
      message = message + ((!contractData.debutTitreTravail)? " Valable du -" : "");
      message = message + ((!contractData.finTitreTravail)? " Valable au -" : "");
      message = message + ((!contractData.qualification)? " Qualification -" : "");

      message = message.slice(0, -1);
    }
    this.notifyJobyer(message);

  }

  notifyJobyerMissingData() {
    let message = "Rappel :"
        + " Une proposition de recrutement vous a été adressée"
        + " Certaines informations de votre compte sont toujours manquantes, veuillez les renseigner."
      ;
    this.notifyJobyer(message);
  }

  notifyJobyer(message) {
    let currentDate = new Date();
    let delayBetweenNotif = 60; // minutes
    let toSend = true;
    let previousNotif = this.sharedService.getPreviousNotifs();
    if (!previousNotif) {
      previousNotif = [];
    }
    let nextNotifInto;

    // Check the delay between 2 notification
    if (previousNotif && previousNotif.length > 0) {
      for (let i = 0; i < previousNotif.length; i++) {
        if (previousNotif[i].offerId == this.currentOffer.idOffer) {
          let nextNotif = previousNotif[i].lastNotif + (1000 * 60 * delayBetweenNotif);
          let currentTimestamp = currentDate.getTime();
          if (nextNotif > currentTimestamp) {
            toSend = false;
            nextNotifInto = Math.ceil((nextNotif - currentTimestamp) / (1000 * 60));
          }
        }
      }
    }

    if (toSend == true) {
      this.smsService.sendSms(this.jobyer.tel, message);
      Messenger().post({
        message: 'Une notification a été envoyée au jobyer',
        type: 'success',
        showCloseButton: true
      });

      previousNotif.push({
        'offerId': this.currentOffer.idOffer,
        'lastNotif': currentDate.getTime()
      });
      this.sharedService.setPreviousNotifs(previousNotif);
    } else {
      Messenger().post({
        message: 'Une notification a déjà été envoyée au jobyer.'
        + ' Veuillez attendre ' + (nextNotifInto) + ' minutes avant de pouvoir le relancer.',
        type: 'info',
        showCloseButton: true
      });
    }
  }

  simpleDateFormat(d:Date){
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = (da < 10 ? '0' : '')+da+'/' + (m < 10 ? '0' : '') + m + "/" +d.getFullYear() ;
    return sd
  }

  missingJobyerData() {
    return (
      !this.jobyer.nom
      || !this.jobyer.prenom
      || !this.jobyer.numSS
      || !this.jobyerBirthDate
      || !this.jobyer.lieuNaissance
      || !this.jobyer.nationaliteLibelle
      || !this.contractData.numeroTitreTravail
      || !this.contractData.debutTitreTravail
      || !this.contractData.finTitreTravail
      || !this.contractData.qualification
    );
  }

  watchMissionStartDate(e){
    this.contractData.missionStartDate = e.toISOString().split('T')[0];
    this.watchMissionDate();
  }

   watchMissionEndDate(e){
    this.contractData.missionEndDate = e.toISOString().split('T')[0];
    this.watchMissionDate();
  }

  watchMissionDate(){
    let now = new Date().setHours(0, 0, 0, 0);
    let today = new Date(now).toISOString().split('T')[0];
    if(this.contractData.missionStartDate > this.contractData.missionEndDate || this.contractData.missionStartDate < today || this.contractData.missionEndDate < today){
      this.isMissionDateValid = false;
    }else{
      this.isMissionDateValid = true;
    }
  }

  getCategory(){
    let convId = this.currentUser.employer.entreprises[0].conventionCollective.id;
    let offerId = this.currentOffer.idOffer;
    this.offersService.getCategoryByOfferAndConvention(offerId, convId).then((data: any) =>{
      if(data && data.data && data.data.length > 0) {
        let cat = data.data[0];
        if(cat) {
          this.contractData.category = cat.libelle
        }else{
          this.contractData.category = "";
        }
      }
    })
  }

  addEPI(){

    let found = false;

    for(let i = 0 ; i < this.contractData.epiList.length ; i++)
      if(this.contractData.epiList[i].libelle == this.selectedEPI){
        found = true;
        break;
      }

    if(found)
      return;

    this.contractData.epiList.push({libelle : this.selectedEPI});
  }

  removeEPI(e){
    let index = -1;
    for(let i = 0 ; i < this.contractData.epiList.length ; i++)
      if(this.contractData.epiList[i].libelle == e.libelle){
        index = i;
        break;
      }
    if(index>=0){
      this.contractData.epiList.splice(index,1);
    }
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}
