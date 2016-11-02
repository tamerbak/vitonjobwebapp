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
import {isUndefined} from "es7-reflect-metadata/dist/dist/helper/is-undefined";
import {OffersService} from "../../providers/offer.service";
import {AlertComponent} from "ng2-bootstrap";
import {SmsService} from "../../providers/sms-service";

declare var Messenger: any;

/**
 * @author daoudi amine
 * @description Generate contract informations and call yousign service
 * @module Contract
 */
@Component({
  template: require('./contract.html'),
  styles: [require('./contract.scss')],
  directives: [AlertComponent, NKDatetime],
  providers: [ContractService, MedecineService, ParametersService, Helpers,SmsService, OffersService,ProfileService,LoadListService]
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
              private sharedService: SharedService,
              private profileService: ProfileService,
              private listService: LoadListService,
              private offersService : OffersService,
              private smsService: SmsService,
              private router: Router) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['app/home']);
    }
    // Get target to determine configs
    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    this.isEmployer = (this.projectTarget == 'employer');

    // Retrieve jobyer

    this.jobyer = this.sharedService.getCurrentJobyer();

    //load countries list
    this.listService.loadCountries("jobyer").then((data: any) => {
      this.pays = data.data;
    });

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
    this.jobyer.lieuNaissance = '';


    this.contractService.getJobyerComplementData(this.jobyer, this.projectTarget).then((data: any)=> {
      if (data && data.length > 0) {
        let datum = data[0];
        this.jobyer.id = datum.id;
        this.jobyer.numSS = (datum.numss == "null") ? '':datum.numss;
        this.jobyer.nationaliteLibelle = datum.nationalite = "null"? '':datum.nationalite;
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

        this.contractData.numeroTitreTravail = this.jobyer.titreTravail;



        this.profileService.loadAdditionalUserInformations(this.jobyer.id).then((data: any) => {
          data = data.data[0];
          this.regionId = data.fk_user_identifiants_nationalite;
          if (this.regionId == '40') {
            this.isFrench = true;
            this.isEuropean = 1;
            this.birthdepId = data.fk_user_departement;
          } else {
            this.index = this.profileService.getCountryById(data.fk_user_pays, this.pays).indicatif_telephonique;
            this.cni = data.cni;
            if(data.fk_user_nationalite !== "null"){
              listService.loadNationality(data.fk_user_nationalite).then((res: any) => {
                if(res && res.data && res.data.length > 0 ){
                  this.jobyer.nationaliteLibelle = res.data[0].libelle;
                }
              });
            }else{
              this.jobyer.nationaliteLibelle = '';
            }
            if(data.fk_user_pays !== "null"){
              listService.loadCountry(data.fk_user_pays).then((res: any) => {
                if(res && res.data && res.data.length > 0 ){
                  this.jobyer.lieuNaissance = res.data[0].nom;
                }
              });
            }else{
              this.jobyer.lieuNaissance = '';
            }
            if (this.regionId == '42') {
              this.isEuropean = 1;
              this.isFrench = false;
              this.isResident = (data.est_resident == 'Oui' ? true : false);
              this.dateStay = data.date_de_delivrance;
              this.dateFromStay = data.debut_validite;
              this.dateToStay = data.fin_validite;
              this.whoDeliverStay = data.instance_delivrance;
              this.numStay = !Utils.isEmpty(data.numero_titre_sejour) ? data.numero_titre_sejour : "";
              this.isCIN = !Utils.isEmpty(this.cni) ? true : false;
            } else {
              this.isEuropean = 0;
              this.isFrench = false;
              this.isCIN = !Utils.isEmpty(data.numero_titre_sejour) ? false : true;
              this.numStay = !Utils.isEmpty(data.numero_titre_sejour) ? data.numero_titre_sejour : "";
            }
          }
        })

      }
    });



    //  Load recours list
    this.contractService.loadRecoursList().then(data=> {
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
      centreMedecineETT: "181 - CMIE",
      adresseCentreMedecineETT: "80 RUE DE CLICHY 75009 PARIS",
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
      termStartDate: this.getEndDate(),
      termEndDate: this.getEndDate(),
      motif: "",
      justification: "",
      qualification: "",
      characteristics: "",
      workTimeHours: 0,
      workTimeVariable: 0,
      usualWorkTimeHours: "8H00/17H00 variables",
      workStartHour: this.initWorkStartHour(),
      workEndHour: this.initWorkEndHour(),
      workHourVariable: "",
      postRisks: "",
      medicalSurv: "",
      epi: false,
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
      category: "Employé",
      sector: "",
      companyName: '',
      titreTransport: 'NON',
      zonesTitre: '',
      risques: '',
      elementsCotisation: 0.0,
      elementsNonCotisation: 10.0,
      titre: '',
      periodicite : ''
    };
    if (this.currentOffer) {
      this.service.getRates().then((data: any) => {
        for (let i = 0; i < data.length; i++) {
          if (this.currentOffer.jobData.remuneration < data[i].taux_horaire) {
            this.rate = parseFloat(data[i].coefficient) * this.currentOffer.jobData.remuneration;
            this.contractData.elementsCotisation = this.rate;
            break;
          }
        }
      });

      this.initContract();
    }

    // Notify the jobyer that a new contract was created
    this.notifyJobyerNewContract();

  }

  recoursSelected(evt) {
    let selectedRecoursLib = evt.target.value;
    let id = 40;
    for (let i = 0; i < this.recours.length; i++){
      if (this.recours[i].libelle == selectedRecoursLib) {
        id = this.recours[i].id;
        break;
      }
    }

    this.justificatifs = [];
    this.contractService.loadJustificationsList(id).then(data=> {
      this.justificatifs = data;
    });
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
    let sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;

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
    sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;

    return sd;
  }

  getEndDate() {
    let d = new Date();
    let m = d.getMonth() + 1;
    let da = d.getDate();
    let sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;

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
    sd = d.getFullYear() + "-" + (m < 10 ? '0' : '') + m + "-" + (da < 10 ? '0' : '') + da;

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

    let trial = 2;
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


    this.contractData = {
      num: this.numContrat,
      centreMedecineEntreprise: "",
      adresseCentreMedecineEntreprise: "",
      centreMedecineETT: "181 - CMIE",
      adresseCentreMedecineETT: "80 RUE DE CLICHY 75009 PARIS",

      numero: "",
      contact: this.employerFullName,
      indemniteFinMission: "10.00%",
      indemniteCongesPayes: "10.00%",
      moyenAcces: "",
      numeroTitreTravail: this.jobyer.titreTravail,
      debutTitreTravail: this.jobyer.debutTitreTravail ? this.dateFormat(this.jobyer.debutTitreTravail) : "",
      finTitreTravail: this.jobyer.finTitreTravail ? this.dateFormat(this.jobyer.finTitreTravail) : "",
      periodesNonTravaillees: "",
      debutSouplesse: "",
      finSouplesse: "",
      equipements: "",
      interim: "Tempo'AIR",
      missionStartDate: this.getStartDate(),
      missionEndDate: this.getEndDate(),
      trialPeriod: trial,
      termStartDate: this.getEndDate(),
      termEndDate: this.getEndDate(),
      motif: "",
      justification: "",
      qualification: this.currentOffer.title,
      characteristics: "",
      workTimeHours: this.calculateOfferHours(),
      workTimeVariable: 0,
      usualWorkTimeHours: "8H00/17H00 variables",
      workStartHour: this.initWorkStartHour(),
      workEndHour: this.initWorkEndHour(),
      workHourVariable: "",
      postRisks: "",
      medicalSurv: "",
      epi: false,
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
      elementsNonCotisation: 10.0,
      titre: this.currentOffer.title,
      periodicite : ''
    };

    this.medecineService.getMedecine(this.employer.entreprises[0].id).then((data: any)=> {
      //
      if (data && data != null) {
        this.contractData.centreMedecineEntreprise = data.libelle;
        this.contractData.adresseCentreMedecineEntreprise = data.adresse + ' ' + data.code_postal;
      }

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

  goToYousignPage() {

    this.contractService.getNumContract().then((data: any) => {
      this.dataValidation = true;

      if (data && data.length > 0) {
        this.numContrat = this.formatNumContrat(data[0].numct);
        this.contractData.num = this.numContrat;
        this.contractData.numero = this.numContrat;
        this.contractData.adresseInterim = this.workAdress;
        this.contractData.workAdress = this.workAdress;
      }

      // Go to yousign
      this.sharedService.setCurrentJobyer(this.jobyer);
      this.sharedService.setCurrentOffer(this.currentOffer);
      this.sharedService.setContractData(this.contractData);
      this.router.navigate(['app/contract/recruitment']);
    });
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
      message = message + " Certaines informations de votre compte sont manquantes, veuillez les renseigner.";
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
}
