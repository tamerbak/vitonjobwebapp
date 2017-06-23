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
import {ContractData} from "../../dto/contract";
import {Offer} from "../../dto/offer";
import {DateUtils} from "../utils/date-utils";
import {ConventionParameters} from "../offer-edit/convention-parameters/convention-parameters";
declare let Messenger,jQuery,moment, escape, unescape: any;

/**
 * @author daoudi amine
 * @description Generate contract informations and call yousign service
 * @module Contract
 */
@Component({
  template: require('./contract.html'),
  styles: [require('./contract.scss')],
  directives: [AlertComponent, NKDatetime, ConventionParameters],
  providers: [ContractService, MedecineService, ParametersService, Helpers,SmsService, OffersService,ProfileService,LoadListService, ConventionService, FinanceService, GlobalConfigs, RecruitmentService]
})
export class Contract {

  projectTarget: string;
  isEmployer: boolean;

  employer: any;
  jobyer: any = {};
  currentUser: any;
  contractData: ContractData = new ContractData();
  currentOffer: Offer;
  recours: any;

  dataValidation :boolean = false;

  periodicites : any = [];

  //jobyer Data
  index:any;
  isFrench:any;
  isEuropean:any;
  isCIN:any;
  cni:any;
  isMissionDateValid: boolean = true;

  characteristics1: String;
  characteristics2: String;
  characteristics3: String;

  //  EPI
  epiList : {libelle: string}[] =[];
  selectedEPI : string;
  alerts = [];
  inProgress: boolean = false;

  //info jobyer
  labelTitreIdentite: string;

  //condition de travail
  personalizeConvention = false;
  personalizeConventionInit: boolean = false;
  alertsConditionEmp: Array<Object>;
  categoriesHeure: any = [];
  majorationsHeure: any = [];
  indemnites: any = [];
  convention: any;
  isConditionEmpValid = true;
  isConditionEmpExist: boolean = true;

  constructor(private contractService: ContractService,
              private sharedService: SharedService,
              private offersService : OffersService,
              private smsService: SmsService,
              private router: Router,
              private conventionService: ConventionService,
              private recruitmentService: RecruitmentService) {

    this.currentUser = this.sharedService.getCurrentUser();
    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    this.isEmployer = (this.projectTarget == 'employer');

    //  check if there is a current offer
    this.currentOffer = this.sharedService.getCurrentOffer();

    //go to home if access is not authorized
    let accessValid = this.isAccessAutorised(this.currentUser, this.isEmployer, this.currentOffer);
    if(!accessValid){
      this.router.navigate(['home']);
      return;
    }
  }

  ngOnInit() {
    //TODO: voir commnet empecher l'acces au ngOninit après l'execution du constructeur
    //go to home if access is not authorized
    let accessValid = this.isAccessAutorised(this.currentUser, this.isEmployer, this.currentOffer);
    if (!accessValid) {
      this.router.navigate(['home']);
      return;
    }

    this.employer = this.currentUser.employer;

    let contract = this.sharedService.getContractData();

    //l'objet contrat est vide seulement dans le cas ou l'on passe par une recherche directement (sémantique, par ville, ...)
    if (Utils.isEmpty(contract)) {
      this.contractData = new ContractData();
    } else {
      this.contractData = contract;
    }

    this.getCurrentOffer().then((data: any) => {
      this.currentOffer = data;
      //draft == 'oui', dans le cas des contrats généré à partir d'une offres mère (mais juste lors de la première initialisation est sauvegarde du contrat)
      //ou dans le cas des contrat initialisé à partir d'une recherche
      if (Utils.isEmpty(contract) || this.contractData.isDraft.toUpperCase() == 'OUI') {
        // Retrieve jobyer
        this.jobyer = this.sharedService.getCurrentJobyer();

        // initialize contract data
        this.initContractData();
        //init employer data
        this.initEmployerData();
        //initialize recruitment data
        this.initRecruitmentData();

      } else {
        console.log("contractData raw");
        console.log(this.contractData);
        this.initSavedContract();
      }
    });

    //TODO à ajouter dans le callout prepareRecruitment
    this.offersService.loadEPI().then((data:any)=>{
      this.epiList = data;
    });

    if (this.projectTarget == "employer" && this.currentUser.employer.entreprises[0].conventionCollective.id > 0) {
      this.convention = this.currentUser.employer.entreprises[0].conventionCollective;
    } else {
      this.convention = {
        id: 0,
        code: '',
        libelle: ''
      }
    }
  }

  getCurrentOffer(){
    return new Promise(resolve => {
      //dans le cas ou on passe par la recherche, l'offre retournée ne contient pas des les information complete. Il faut donc recuperer l'offre toute entière
      if(Utils.isEmpty(this.currentOffer.jobData.idJob) || this.currentOffer.jobData.idJob == 0){
        this.offersService.getOfferById(this.currentOffer.idOffer, this.projectTarget, this.currentOffer).then((data: any) => {
          resolve(this.currentOffer);
        });
      }else{
        resolve(this.currentOffer);
      }
    });
  }

  initSavedContract(){
    this.jobyer.id = this.contractData.jobyerId;
    this.jobyer.email = this.contractData.email;
    this.jobyer.tel = this.contractData.tel;

    //fill jobyer address
    this.contractService.getJobyerAdress(this.jobyer.id).then((address: any) => {
      this.contractData.jobyerAddress = address;
    });

    this.contractData.jobyerBirthDate = DateUtils.simpleDateFormat(new Date(this.contractData.jobyerBirthDate));
    this.contractData.jobyerDebutTitreTravail = DateUtils.simpleDateFormat(new Date(this.contractData.jobyerDebutTitreTravail));
    this.contractData.jobyerFinTitreTravail = DateUtils.simpleDateFormat(new Date(this.contractData.jobyerFinTitreTravail));

    let titreTravailArray = this.contractData.numeroTitreTravail.split(' ');
    this.contractData.jobyerTitreTravail = titreTravailArray[titreTravailArray.length - 1];
    this.labelTitreIdentite = titreTravailArray.slice(0, titreTravailArray.length -1).join(" ");

    this.contractData.missionStartDate = DateUtils.simpleDateFormat(new Date(this.contractData.missionStartDate));
    this.contractData.missionEndDate = DateUtils.simpleDateFormat(new Date(this.contractData.missionEndDate));

    this.contractData.termStartDate = DateUtils.dateFormat(new Date(this.contractData.termStartDate));
    this.contractData.termEndDate = DateUtils.dateFormat(new Date(this.contractData.termEndDate));

    this.contractData.isScheduleFixed = (this.contractData.isScheduleFixed.toUpperCase() == "OUI" ? 'true' :'false');
    this.contractData.workStartHour = DateUtils.setMinutesToDate(new Date(), this.contractData.workStartHour);
    this.contractData.workEndHour = DateUtils.setMinutesToDate(new Date(), this.contractData.workEndHour);

    this.contractData.trialPeriod = parseInt(this.contractData.trialPeriod.toString());

    this.contractData.companyName = Utils.preventNull(this.employer.entreprises[0].nom);

    let epiArray = this.contractData.epiString.split(";");
    for(let i = 0; i < epiArray.length; i++){
      let epi = {libelle: epiArray[i]};
      if(Utils.isEmpty(epi.libelle)){
        continue;
      }
      this.contractData.epiList.push(epi);
    }

    /*let postRisks = this.contractData.postRisks.split(' - ');
    if(postRisks && postRisks.length > 0){
      this.postRisks = (postRisks.length >= 1 ? Utils.preventNull(postRisks[0]) : "");
      this.postRisks2 = (postRisks.length >= 2 ? Utils.preventNull(postRisks[1]) : "");
      this.postRisks3 = (postRisks.length >= 3 ? Utils.preventNull(postRisks[2]) : "");
    }*/

    this.contractData.postRisks = Utils.preventNull(unescape(this.contractData.postRisks));

    let characteristics = this.contractData.characteristics.split(' - ');
    if(characteristics && characteristics.length > 0){
      this.characteristics1 = (characteristics.length >= 1 ? characteristics[0] : "");
      this.characteristics2 = (characteristics.length >= 2 ? characteristics[1] : "");
      this.characteristics3 = (characteristics.length >= 3 ? characteristics[2] : "");
    }

    console.log("contractData after affectation");
    console.log(this.contractData);

    //  Load recours list
    this.contractService.loadJustificationsList(this.projectTarget).then(data=> {
      this.recours = data;
    });

    this.contractService.loadPeriodicites(this.projectTarget).then(data=>{
      this.periodicites = data;
    });
  }

  initContractData(){
    this.contractData.missionStartDate = this.getStartDate();
    this.contractData.missionEndDate = this.getEndDate();
    this.contractData.termStartDate = this.getXmlEndDate();
    this.contractData.termEndDate = this.getXmlEndDate();

    this.contractData.isScheduleFixed = (this.IsScheduleFixed() ? 'true' : 'false');
    this.contractData.workStartHour = this.getHourMissionFirstDay()[0];
    this.contractData.workEndHour = this.getHourMissionFirstDay()[1];

    this.getStatutOffer();

    this.contractData.medicalSurv = this.currentOffer.medicalSurv;

    //initialiser le contrat avec les infos de l'offre
    this.contractData.qualification = this.currentOffer.title;
    this.contractData.baseSalary = +Utils.parseNumber(this.currentOffer.jobData.remuneration).toFixed(2);
    //TODO: cette info est obsolete, elle n'est utilisée nul part, à revérifier avec Jakjoud
    this.contractData.salaryNHours = Utils.parseNumber(this.currentOffer.jobData.remuneration).toFixed(2) + " € B/H";

    this.contractData.sector = this.currentOffer.jobData.sector;
    this.contractData.titre = this.currentOffer.title;

    this.contractData.postRisks = Utils.preventNull(unescape(this.currentOffer.risks));
    /*if(!Utils.isEmpty(this.currentOffer.risks)) {
      let risks = JSON.parse(this.currentOffer.risks);
      if (Utils.isEmpty(risks) == false) {
        //this.postRisks1 = risks[0];
        //this.postRisks2 = risks[1];
        //this.postRisks3 = risks[2];
        //this.contractData.postRisks = risks.join('-');
        this.contractData.postRisks = unescape(this.contractData.postRisks);
      }
    }*/

    if(!Utils.isEmpty(this.currentOffer.characteristics)) {
      let characteristics = JSON.parse(this.currentOffer.characteristics);
      if (Utils.isEmpty(characteristics) == false) {
        this.characteristics1 = characteristics[0];
        this.characteristics2 = characteristics[1];
        this.characteristics3 = characteristics[2];
      }
    }

    //this.contractData.workTimeHours = + this.calculateOfferHours();
    this.contractData.workTimeHours = + this.calculateHebdoOfferHours();
    this.contractData.trialPeriod = this.initTrialPeriod(this.currentOffer);

    this.contractData.contactPhone = Utils.preventNull(this.currentOffer.telephone);
    this.contractData.offerContact = Utils.preventNull(this.currentOffer.contact);
    this.contractData.sector = Utils.preventNull(this.currentOffer.jobData.sector);


    //initialiser contract.epiList avec les epi de l'offre
    this.offersService.loadOfferEPIFournish(this.currentOffer.idOffer, "employer").then((data: any)=>{
      if(data) {
        console.log(data);
        console.log(this.currentOffer.equipmentData);
        this.contractData.epiList = [];
        for (let i = 0; i < data.length; ++i) {
          for (let e = 0; e < this.currentOffer.equipmentData.length; ++e) {
            console.log('-');
            console.log(this.currentOffer.equipmentData[e]);
            console.log(data[e]);
            console.log(data[e].libelle);
            console.log('+');
            let by = [
              "",
              "L'entreprise utilisatrice",
              "L'entreprise de travail temporaire",
              "Le salarié"
            ];
            console.log(by);

            if (data[i].id == data[e].id) {
              let tmp: any = this.currentOffer.equipmentData[e];
              let metadata = JSON.parse(tmp.metadata);
              let epi = data[i].libelle + " fourni par " + by[metadata.subValue];
              console.log('epi:'+epi);
              this.contractData.epiList.push({libelle: epi});
            }
          }
        }
      }
      else
        this.contractData.epiList = [];
    });
  }

  initEmployerData(){
    //init employer data
    this.contractData.companyName = Utils.preventNull(this.employer.entreprises[0].nom);
    this.contractData.headOffice = Utils.preventNull(this.employer.entreprises[0].siegeAdress.fullAdress);

    let employerFullName = Utils.preventNull(this.currentUser.titre)+ " " + Utils.preventNull(this.currentUser.nom) + " " + Utils.preventNull(this.currentUser.prenom);
    this.contractData.contact = Utils.preventNull(employerFullName);
  }

  initRecruitmentData(){
    //initialize jobyer data
    let email = this.jobyer.email;
    let tel = this.jobyer.tel;
    let jobyerId = this.jobyer.id;
    let entrepriseId = this.employer.entreprises[0].id;
    let offerId = this.currentOffer.idOffer;
    this.contractService.prepareRecruitement(entrepriseId, email, tel, offerId, jobyerId, this.projectTarget).then((resp:any)=>{
      let datum = resp.jobyer;

      this.contractData.jobyerNom = Utils.preventNull(datum.nom);
      this.contractData.jobyerPrenom = Utils.preventNull(datum.prenom);
      this.contractData.jobyerLieuNaissance = (Utils.isEmpty(datum.lieuNaissance) ? '-' : datum.lieuNaissance);
      if (!Utils.isEmpty(datum.dateNaissance)) {
        let bd = new Date(datum.dateNaissance);
        this.contractData.jobyerBirthDate = DateUtils.simpleDateFormat(bd);
      } else {
        this.contractData.jobyerBirthDate = '';
      }

      this.contractData.jobyerNumSS = Utils.preventNull(datum.numss);
      this.contractData.jobyerNationaliteLibelle = Utils.preventNull(datum.nationalite);
      this.contractData.zonesTitre = datum.moyenTransport;

      this.contractData.jobyerTitreTravail = '';
      //specify if jobyer isFrench or european or a foreigner
      this.isFrench = (datum.pays_index == 33 ? true : false);
      this.isEuropean = (datum.identifiant_nationalite == 42 ? false : true);
      this.isCIN = this.isFrench || this.isEuropean;
      let estResident = datum.est_resident;
      if (this.isEuropean) {
        if (!estResident || Utils.isEmpty(datum.cni) == false) {
          this.labelTitreIdentite = "CNI ou Passeport";
          this.contractData.jobyerTitreTravail = datum.cni;
        } else {
          this.labelTitreIdentite = "Carte de ressortissant";
          this.contractData.jobyerTitreTravail = datum.numero_titre_sejour;
        }
      } else {
        if (estResident) {
          this.labelTitreIdentite = "Carte de résident";
        } else {
          this.labelTitreIdentite = "Titre de séjour";
        }
        this.contractData.jobyerTitreTravail = datum.numero_titre_sejour;
      }
      this.contractData.numeroTitreTravail = this.labelTitreIdentite + " " + this.contractData.jobyerTitreTravail;

      if (!Utils.isEmpty(datum.debut_validite)) {
        let sdate = datum.debut_validite.split(' ')[0];

        let d: Date = new Date(sdate);
        this.contractData.jobyerDebutTitreTravail = Utils.preventNull(DateUtils.simpleDateFormat(d));
      }

      if (!Utils.isEmpty(datum.fin_validite)) {
        let sdate = datum.fin_validite.split(' ')[0];
        let d: Date = new Date(sdate);
        this.contractData.jobyerFinTitreTravail = Utils.preventNull(DateUtils.simpleDateFormat(d));
      }

      this.recours = resp.recours;
      this.periodicites = resp.periodicites;

      this.contractData.centreMedecineEntreprise = resp.medecine.libelle;
      this.contractData.adresseCentreMedecineEntreprise = Utils.preventNull(resp.medecine.adresse) + ' ' + Utils.preventNull(resp.medecine.code_postal);

      for (let i = 0; i < resp.rates.length; i++) {
        if (this.currentOffer.jobData.remuneration < resp.rates[i].taux_horaire) {
          this.contractData.elementsCotisation = parseFloat(resp.rates[i].coefficient);
          break;
        }
      }

      this.contractData.workAdress = resp.adress.adresse_google_maps;
      this.contractData.interimAddress = resp.adress.adresse_google_maps;

      if (resp.duree_collective != 'null') {
        this.contractData.MonthlyAverageDuration = resp.duree_collective;
      } else {
        this.contractData.MonthlyAverageDuration = "35";
      }

      // Notify the jobyer that a new contract was created
      this.notifyJobyerNewContract();
      this.updateDatePickers();

      console.log(JSON.stringify(this.contractData));
    });

    //fill jobyer address
    this.contractService.getJobyerAdress(jobyerId).then((address: any) => {
      this.contractData.jobyerAddress = address;
    });
  }

  recoursSelected(e) {
    if(e.target.value.indexOf("emploi à caractère saisonnier") != -1){
      this.contractData.indemniteFinMission = "0.00%";
    }else{
      this.contractData.indemniteFinMission = "10.00%";
    }
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

  getHourMissionFirstDay(){
    //ordonner le tableau des slots par ordre croissant
    this.currentOffer.calendarData.sort(function(a, b) {
      return (a.date + a.startHour) - (b.date + b.startHour);
    });
    let startH = DateUtils.setMinutesToDate(new Date(), this.currentOffer.calendarData[0].startHour);
    let endH = DateUtils.setMinutesToDate(new Date(), this.currentOffer.calendarData[0].endHour);
    return [startH, endH];
  }

  IsScheduleFixed(){
    let schedule = this.currentOffer.calendarData;
    if(schedule.length == 1){
      return true;
    }

    for(let i = 0; i < schedule.length - 1; i++){
      if(schedule[i].startHour != schedule[i+1].startHour || schedule[i].endHour != schedule[i+1].endHour){
        return false;
      }
    }
    return true;
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

  //Il s'agit ici du nombre d'heures prévues pour la mission du lundi au dimanche, si la mission est à cheval sur 2 semaine il faudra alors prendre la semaine ou il y a le moins d'heures prévues
  calculateHebdoOfferHours(): string {
    //tableau qui va contenir le nombre des heures de mission de chaque semaine
    let weeksArray = [];
    //var qui va contenir l'accumulation du nombre d'heure des jours de chaque semaine
    let weekHours = 0;

    //ordonner le tableau des slots par ordre croissant
    this.currentOffer.calendarData.sort(function(a, b) {
      return b.date - a.date;
    });

    //initialiser weekhours avec les heures du premier slot de la mission
    let calendarEntry1 = this.currentOffer.calendarData[0];
    let dateEntry1Start = DateUtils.setMinutesToDate(new Date(calendarEntry1.date), calendarEntry1.startHour);
    let dateEntry1End = DateUtils.setMinutesToDate(new Date(calendarEntry1.dateEnd), calendarEntry1.endHour);
    weekHours = weekHours + Math.abs(DateUtils.diffBetweenTwoDatesInMinutes(dateEntry1End, dateEntry1Start)) / 60;

    let calendarLength = this.currentOffer.calendarData.length;
    for (let i = 0; i < calendarLength - 1; i++) {
      //si le calendrier ne contient qu'un seul slot, sortir de la boucle (les heures du slot 0 sont comptabilisé avant)
      if(calendarLength == 1){
        break;
      }
      //les heures de pause ne sont pas comtabilisés
      if(this.currentOffer.calendarData[i+1].pause){
        continue;
      }

      calendarEntry1 = this.currentOffer.calendarData[i];
      let calendarEntry2 = this.currentOffer.calendarData[i + 1];
      //verifier si les jours i et i+ 1 sont dans la meme semaine
      let isInSameWeek = DateUtils.isInSameWeek(new Date(calendarEntry1.date), new Date(calendarEntry2.date));

      //si oui, incrémenter weekhours avec le nombre dh'heure du jour i + 1 (le nombre d'heure de i est deja sauvegardé dans l'itération precedante (le cas particulier de i == 0 est deja traité))
      let dateEntry2Start = DateUtils.setMinutesToDate(new Date(calendarEntry2.date), calendarEntry2.startHour);
      let dateEntry2End = DateUtils.setMinutesToDate(new Date(calendarEntry2.dateEnd), calendarEntry2.endHour);
      if (isInSameWeek) {
        weekHours = weekHours + Math.abs(DateUtils.diffBetweenTwoDatesInMinutes(dateEntry2End, dateEntry2Start)) / 60;
      } else {
        //si non, sauvegarder le nombre d'heure de la semaine du jour i dans le weekArray
        weeksArray.push(weekHours);
        //et renitialiser weekHours avec la valeur du jour i + 1
        weekHours = 0;
        weekHours = weekHours + Math.abs(DateUtils.diffBetweenTwoDatesInMinutes(dateEntry2End, dateEntry2Start)) / 60;
      }
    }

    //sauvegarder la valeur de la dernière itération
    weeksArray.push(weekHours);

    //retourner la valeur min du tableau contenant le total des heures de chaque semaine
    return Math.min.apply(Math, weeksArray).toFixed(0);
  }

  getStatutOffer(){
    this.offersService.getStatutOffer(this.currentOffer.idOffer).then((data: any) => {
      if(data && data.data && data.data.length != 0) {
        this.contractData.category = data.data[0].libelle;
      }
    });
  }

  gotoContractListPage(){
    let isValid = !this.missingJobyerData() && this.isMissionDateValid;
    if(!isValid){
      return;
    }
    this.inProgress = true;

    this.contractData.jobyerTitreTravail = Utils.removeAllSpaces(this.contractData.jobyerTitreTravail);
    this.contractData.elementsNonCotisation = 1.0;

    //this.contractData.postRisks = Utils.preventNull(this.postRisks1) + " - " + Utils.preventNull(this.postRisks2) + " - " + Utils.preventNull(this.postRisks3);
    this.contractData.postRisks = escape(this.contractData.postRisks);
    this.contractData.characteristics = this.characteristics1 + " - " + this.characteristics2 + " - " + this.characteristics3;

    console.log("contractData before saving");
    console.log(this.contractData);

    //save condition d'emploi
    this.saveConditionEmp(this.currentOffer);

    // traitement pour les nouveaux contrats
      if(this.contractData.id == 0 || Utils.isEmpty(this.contractData.id)){
        this.contractService.getNumContract(this.projectTarget).then((data: any) => {
          let contractNum;
          if (data && data.length > 0) {
            this.contractData.num = this.contractService.formatNumContrat(data[0].numct);
          } else {
            this.addAlert("danger", "Une erreur est survenue lors de la sauvegarde des données. Veuillez rééssayer l'opération.");
            this.inProgress = false;
            return;
          }
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
                    //this.offersService.spliceOfferInLocal(this.currentUser, this.currentOffer, this.projectTarget);
                    this.sharedService.setCurrentUser(this.currentUser);
                    //place offer in archive if nb contract of the selected offer is equal to its nb poste
                    this.checkOfferState(this.currentOffer);
                    //generate hour mission based on the offer slots
                    this.contractService.generateMission(this.contractData.id, this.currentOffer);
                    if (!Utils.isEmpty(this.jobyer.rgId)) {
                      //update recrutement groupé state
                      this.recruitmentService.updateRecrutementGroupeState(this.jobyer.rgId);
                    }
                    //go to contract list page
                    this.router.navigate(['contract/list']);
                  } else {
                    this.addAlert("danger", "Une erreur est survenue lors de la sauvegarde des données. Veuillez rééssayer l'opération.");
                    this.inProgress = false;
                    return;
                  }
                });
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
            });
        },
          (err) => {
            this.addAlert("danger", "Une erreur est survenue lors de la sauvegarde des données. Veuillez rééssayer l'opération.");
            this.inProgress = false;
            return;
          });
      }else{
        //save contract data
        this.contractService.updateContractData(
          this.contractData,
          this.jobyer.id,
          this.employer.entreprises[0].id,
          this.projectTarget,
          this.currentUser.id,
          this.currentOffer.idOffer).then((data: any) => {
          if (data && data.status == "success") {
            //make the offer state to "en contrat"
            if(this.currentOffer.etat != "en archive") {
              this.offersService.updateOfferState(this.currentOffer.idOffer, "en contrat").then((data: any) => {
                if (data && data.status == "success") {
                  this.currentOffer.etat = "en contrat";
                  //this.offersService.spliceOfferInLocal(this.currentUser, this.currentOffer, this.projectTarget);
                  this.sharedService.setCurrentUser(this.currentUser);
                  //place offer in archive if nb contract of the selected offer is equal to its nb poste
                  this.checkOfferState(this.currentOffer);
                }
              });
            }
            if(!Utils.isEmpty(this.jobyer.rgId)) {
              //update recrutement groupé state
              this.recruitmentService.updateRecrutementGroupeState(this.jobyer.rgId);
            }
            //go to contract list page
            this.router.navigate(['contract/list']);
          } else {
            this.addAlert("danger", "Une erreur est survenue lors de la sauvegarde des données. Veuillez rééssayer l'opération.");
            this.inProgress = false;
            return;
          }
        });
      }
    }

  checkOfferState(offer){
    this.contractService.getContractsByOffer(offer.idOffer).then((data: any) => {
      if(data && data.data && data.data.length != 0 && data.data.length >= offer.nbPoste){
        this.offersService.updateOfferState(offer.idOffer, "en archive");
        offer.etat = "en archive";
        //this.offersService.spliceOfferInLocal(this.currentUser, offer, this.projectTarget);
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
    let message = "Une proposition de recrutement vous a été adressée.";
    let jobyer = this.jobyer;
    let contractData = this.contractData;
    let jobyerBirthDate = this.contractData.jobyerBirthDate;
    if (
      !jobyer.nom || !jobyer.prenom || !jobyer.numSS || !jobyerBirthDate || //!jobyer.lieuNaissance ||
      !jobyer.nationaliteLibelle || !contractData.numeroTitreTravail || !contractData.jobyerDebutTitreTravail || !contractData.jobyerFinTitreTravail || !contractData.qualification
    ) {
      message = message + " Certaines informations de votre compte sont manquantes, veuillez les renseigner : -";
      message = message + ((!jobyer.nom)? " Nom -" : "");
      message = message + ((!jobyer.prenom)? " Prénom -" : "");
      message = message + ((!jobyer.prenom)? " Prénom -" : "");
      message = message + ((!jobyer.numSS)? " Numéro SS -" : "");
      message = message + ((!jobyerBirthDate)? " Date de naissance -" : "");
      //message = message + ((!jobyer.lieuNaissance)? " Lieu de naissance -" : "");
      message = message + ((!jobyer.nationaliteLibelle)? " Pays de nationalité -" : "");
      message = message + ((!jobyer.numeroTitreTravail)? " CNI ou passeport -" : "");
      message = message + ((!contractData.jobyerDebutTitreTravail)? " Valable du -" : "");
      message = message + ((!contractData.jobyerFinTitreTravail)? " Valable au -" : "");
      message = message + ((!contractData.qualification)? " Qualification -" : "");
      message = message + ((Utils.isEmpty(contractData.jobyerAddress))? " Adresse -" : "");

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

  missingJobyerData() {
    return (
      !this.contractData.jobyerNom
      || !this.contractData.jobyerPrenom
      || !this.contractData.jobyerNumSS
      || !this.contractData.jobyerBirthDate
      //|| !this.contractData.jobyerLieuNaissance
      || !this.contractData.jobyerNationaliteLibelle
      || !this.contractData.numeroTitreTravail
      || !this.contractData.jobyerDebutTitreTravail
      || !this.contractData.jobyerFinTitreTravail
      || !this.contractData.qualification
      || Utils.isEmpty(this.contractData.jobyerAddress)
    );
  }

  /*watchMissionStartDate(e){
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
  }*/

  /*getCategory(){
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
  }*/

  addEPI() {

    //si aucun epi n'a été choisi, ne rien faire
    if (Utils.isEmpty(this.selectedEPI)) {
      return;
    }

    let found = false;

    //vérifier si l'epi selectionné dans la liste a été déja choisi
    for (let i = 0; i < this.contractData.epiList.length; i++) {
      if (this.contractData.epiList[i].libelle == this.selectedEPI + " fourni par " + this.contractData.epiProvidedBy) {
        found = true;
        break;
      }
    }
    //si l'epi est dejé choisi, ne rien faire
    if(found)
      return;

    //si l'epi selectionné dans la liste n'a jamais été choisi, l'ajouter dans la liste des epis choisis
    this.contractData.epiList.push({libelle : this.selectedEPI + " fourni par " + this.contractData.epiProvidedBy});
  }

  removeEPI(e){
    let index = -1;
    for(let i = 0 ; i < this.contractData.epiList.length ; i++) {
      if (this.contractData.epiList[i].libelle == e.libelle) {
        index = i;
        break;
      }
    }
    if(index>=0){
      this.contractData.epiList.splice(index,1);
    }
  }

  initTrialPeriod(offer){
    let calendar = offer.calendarData;
    let minDay = new Date(calendar[0].date);
    let maxDay = new Date(calendar[0].date);

    for (let i = 1; i < calendar.length; i++) {
      let date = new Date(calendar[i].date);
      if (minDay.getTime() > date.getTime())
        minDay = date;
      if (maxDay.getTime() < date.getTime())
        maxDay = date;
    }

    let trial = 2;
    let timeDiff = Math.abs(maxDay.getTime() - minDay.getTime());
    let contractLength = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (contractLength <= 1)
      trial = 1;
    else if (contractLength < 30)
      trial = 2;
    else if (contractLength < 60)
      trial = 3;
    else
      trial = 5;
    return trial;
  }

  isAccessAutorised(currentUser, isEmployer, currentOffer){
    //on ne peut accéder qu'en mode connecté
    // accès autorisé aux employeurs et aux recruteurs
    if(Utils.isEmpty(currentUser) || Utils.isEmpty(currentOffer) || !isEmployer){
      return false;
    }else{
      return true;
    }
  }

  /*watchTransportTitle(e){
   this.contractData.titreTransport = e.target.value;
   }*/

  /*initWorkStartHour(){
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
   }*/

  /**
   * Event when "Personalize Working conditions"
   */
  onPersonalizeConvention() {
    if (this.personalizeConvention === false) {
      if (this.personalizeConventionInit === false) {
        //get values for "condition de travail"
        this.getConditionEmpValuesForUpdate();
        this.personalizeConventionInit = true;
      }
    }
    this.personalizeConvention = !this.personalizeConvention;
  }

  getConditionEmpValuesForUpdate() {
    this.conventionService.getHoursCategoriesEmp(this.convention.id, this.currentOffer.idOffer).then((data: any) => {
      if (!data || data.length == 0) {
        this.isConditionEmpExist = false;
        this.offersService.getHoursCategories(this.convention.id).then(data => {
          this.categoriesHeure = this.conventionService.convertValuesToPercent(data);
        });
      } else {
        this.isConditionEmpExist = true;
        this.categoriesHeure = this.conventionService.convertValuesToPercent(data);
      }
    });
    this.majorationsHeure = [];

    this.conventionService.getIndemnitesEmp(this.convention.id, this.currentOffer.idOffer).then((data: any) => {
      if (!data || data.length == 0) {
        this.isConditionEmpExist = false;
        this.offersService.getIndemnites(this.convention.id).then(data => {
          this.indemnites = this.conventionService.convertValuesToPercent(data);
        });
      } else {
        this.isConditionEmpExist = true;
        this.indemnites = this.conventionService.convertValuesToPercent(data);
      }
    });
  }

  watchConditionEmp(e, item) {
    this.alertsConditionEmp = [];
    this.isConditionEmpValid = true;
    if (+e.target.value < item.coefficient || Utils.isEmpty(e.target.value)) {
      this.addAlert("danger", "Les valeurs définies par l'employeur doivent être supérieures ou égales à celles définies par la convention collective.", "conditionEmp");
      this.isConditionEmpValid = false;
      e.target.value = Utils.decimalAdjust('round', item.coefficient, -2).toFixed(2);
    }
    e.target.value = Utils.decimalAdjust('round', e.target.value, -2).toFixed(2);//e.target.value.toFixed(2);
  }

  saveConditionEmp(offer) {
    this.conventionService.updateConditionEmploi(this.currentOffer.idOffer, this.conventionService.convertPercentToRaw(this.categoriesHeure), this.conventionService.convertPercentToRaw(this.majorationsHeure), this.conventionService.convertPercentToRaw(this.indemnites)).then((data: any) => {
        if (!data || data.status == "failure") {
          this.addAlert("danger", "Erreur lors de la sauvegarde des conditions d'emploi.", "conditionEmp");
        }
      })
  }

  addAlert(type, msg, section?): void {
    if (section == "conditionEmp") {
      this.alertsConditionEmp = [{type: type, msg: msg}];
    }else{
      this.alerts = [{type: type, msg: msg}];
    }
  }

  ngOnDestroy(): void {
    this.sharedService.setContractData(null);
    this.sharedService.setCurrentJobyer(null);
    this.sharedService.setCurrentOffer(null);
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }

  preventNull(str){
    return Utils.preventNull(str);
  }
}