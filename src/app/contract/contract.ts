import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {Helpers} from "../../providers/helpers.service";
import {SharedService} from "../../providers/shared.service";
import {ContractService} from "../../providers/contract-service";
import {MedecineService} from "../../providers/medecine.service";
import {ParametersService} from "../../providers/parameters-service";
import {Utils} from "../utils/utils";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {isUndefined} from "es7-reflect-metadata/dist/dist/helper/is-undefined";
import {OffersService} from "../../providers/offer.service";

/**
 * @author daoudi amine
 * @description Generate contract informations and call yousign service
 * @module Contract
 */
@Component({
  template: require('./contract.html'),
  styles: [require('./contract.scss')],
  directives: [NKDatetime],
  providers: [ContractService, OffersService, MedecineService, ParametersService, Helpers]
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

  dataValidation :boolean = false;

  embaucheAutorise : boolean=false;
  rapatriement : boolean=false;
  periodicites : any = [];

  datepickerOpts: any;

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
              private offersService : OffersService,
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
      if (data) {
        let datum = data[0];
        this.jobyer.id = datum.id;
        this.jobyer.numSS = datum.numss;
        this.jobyer.nationaliteLibelle = datum.nationalite;
        this.jobyer.titreTravail = '';
        this.jobyer.debutTitreTravail = new Date();
        this.jobyer.finTitreTravail = new Date();
        if(datum.cni && datum.cni.length>0 && datum.cni != "null")
          this.jobyer.titreTravail = datum.cni;
        else if (datum.numero_titre_sejour && datum.numero_titre_sejour.length>0 && datum.numero_titre_sejour != "null")
          this.jobyer.titreTravail = datum.numero_titre_sejour;
        if(datum.debut_validite && datum.debut_validite.length>0 && datum.debut_validite != "null"){
          let d = new Date(datum.debut_validite);
          this.jobyer.debutTitreTravail = d;
        }
        if(datum.fin_validite && datum.debut_validite.length>0 && datum.fin_validite != "null"){
          let d = new Date(datum.debut_validite);
          this.jobyer.finTitreTravail = d;
        }

        this.contractData.numeroTitreTravail = this.jobyer.titreTravail;
        this.contractData.debutTitreTravail = this.dateFormat(this.jobyer.debutTitreTravail);
        this.contractData.finTitreTravail = this.dateFormat(this.jobyer.finTitreTravail);
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
  }

  recoursSelected(evt) {
    let selectedRecoursLib = evt;
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
    // debugger;
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
      debutTitreTravail: this.dateFormat(this.jobyer.debutTitreTravail),
      finTitreTravail: this.dateFormat(this.jobyer.finTitreTravail),
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

    // console.log(JSON.stringify(this.contractData));

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



}
