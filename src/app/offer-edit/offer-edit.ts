import {Component, ViewEncapsulation} from "@angular/core";
import {OffersService} from "../../providers/offer.service";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
declare var Messenger:any;

@Component({
  selector: '[offer-edit]',
  template: require('./offer-edit.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./offer-edit.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent, NKDatetime],
  providers: [OffersService]
})

export class OfferEdit {
  offer: any;
  sectors: any = [];
  jobs: any = [];
  selectedSector: any;
  qualities = [];
  langs = [];
  projectTarget: string;
  currentUser: any;
  slot: any;
  slots = [];
  selectedQuality: any;
  selectedLang: any;
  selectedLevel = "junior";
  slotsToSave = [];
  alerts: Array<Object>;
  alertsSlot: Array<Object>;
  hideJobLoader: boolean = true;
  datepickerOpts: any;
  obj: string;

  /*
   * Collective conventions management
   */
  convention : any;
  niveauxConventions : any = [];
  selectedNivConvID: number = 0;
  categoriesConventions : any = [];
  selectedCatConvID: number = 0;
  echelonsConventions : any = [];
  selectedEchConvID: number = 0;
  coefficientsConventions : any = [];
  selectedCoefConvID: number = 0;
  parametersConvention : any = [];
  selectedParamConvID: number = 0;
  minHourRate : number = 0;
  invalidHourRateMessage='';
  invalidHourRate=false;

  constructor(private sharedService: SharedService,
              public offersService: OffersService,
              private router: Router,
              private route: ActivatedRoute) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['app/home']);
    }
    this.convention = {
      id : 0,
      code : '',
      libelle : ''
    }
  }

  ngOnInit(): void {
    this.currentUser = this.sharedService.getCurrentUser();
    this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer')
    //obj = "add" od "detail"
    this.route.params.forEach((params: Params) => {
      this.obj = params['obj'];
    });

    if(this.obj == "detail") {
      this.offer = this.sharedService.getCurrentOffer();
      if (this.offer.obsolete) {
        //display alert if offer is obsolete
        this.addAlert("warning", "Attention: Cette offre est obsolète. Veuillez mettre à jour les créneaux de disponibilités.", "general");
        //display calendar slots of the current offer
      }
      this.convertDetailSlotsForDisplay();
    }else{
      var jobData = {
        'class': "com.vitonjob.callouts.auth.model.JobData",
        job: "",
        sector: "",
        idSector: 0,
        idJob: 0,
        level: 'junior',
        remuneration: null,
        currency: 'euro',
        validated: false
      };
      this.offer = {
        jobData: jobData, calendarData: [], qualityData: [], languageData: [],
        visible: false, title: "", status: "open", videolink: ""
      };
    }

    //load all sectors, if not yet loaded in local
    this.sectors = this.sharedService.getSectorList();
    if (!this.sectors || this.sectors.length == 0) {
      this.offersService.loadSectorsToLocal().then((data: any) => {
        this.sharedService.setSectorList(data);
        this.sectors = data;
      })
    }

    //load all jobs, if not yet loaded in local
    var jobList = this.sharedService.getJobList();
    if (!jobList || jobList.length == 0) {
      this.hideJobLoader = false;
      this.offersService.loadJobsToLocal().then((data: any) => {
        this.sharedService.setJobList(data);
        if(this.obj == "detail"){
          //display selected job of the current offer
          this.sectorSelected(this.offer.jobData.idSector);
        }
        this.hideJobLoader = true;
      })
    }else {
      if(this.obj == "detail"){
        //display selected job of the current offer
        this.sectorSelected(this.offer.jobData.idSector);
      }
    }

    //loadQualities
    this.qualities = this.sharedService.getQualityList();
    if (!this.qualities || this.qualities.length == 0) {
      this.offersService.loadQualities(this.projectTarget).then((data: any) => {
        this.qualities = data.data;
        this.sharedService.setQualityList(this.qualities);
      })
    }

    //loadLanguages
    this.langs = this.sharedService.getLangList();
    if (!this.langs || this.langs.length == 0) {
      this.offersService.loadLanguages(this.projectTarget).then((data: any) => {
        this.langs = data.data;
        this.sharedService.setLangList(this.langs);
      })
    }

    //init slot
    this.slot = {
      date: 0,
      startHour: 0,
      endHour: 0
    };

    //dateoption for slotDate
    this.datepickerOpts = {
      startDate: new Date(),
      autoclose: true,
      todayHighlight: true,
      format: 'dd/mm/yyyy'
    }
  }

  sectorSelected(sector) {
    //set sector info in jobdata
    this.offer.jobData.idSector = sector;
    var sectorsTemp = this.sectors.filter((v)=> {
      return (v.id == sector);
    });
    this.offer.jobData.sector = sectorsTemp[0].libelle;
    //get job list
    var jobList = this.sharedService.getJobList();
    this.jobs = jobList.filter((v)=> {
      return (v.idsector == sector);
    });
  }

  /**
   * The job has been selected we will set the offer's job and the conventions data
   * @param idJob
   */
  jobSelected(idJob) {
    this.offer.jobData.idJob = idJob;
    var jobsTemp = this.jobs.filter((v)=> {
      return (v.id == idJob);
    });
    this.offer.jobData.job = jobsTemp[0].libelle;

    //  Load collective convention
    this.offersService.getConvention(idJob).then(c=>{
      if(c)
        this.convention = c;
      if(this.convention.id>0){
        this.offersService.getConventionNiveaux(this.convention.id).then(data=>{
          this.niveauxConventions = data;
        });
        this.offersService.getConventionCoefficients(this.convention.id).then(data=>{
          this.coefficientsConventions = data;
        });
        this.offersService.getConventionEchelon(this.convention.id).then(data=>{
          this.echelonsConventions = data;
        });
        this.offersService.getConventionCategory(this.convention.id).then(data=>{
          this.categoriesConventions = data;
        });
        this.offersService.getConventionParameters(this.convention.id).then(data=>{
          this.parametersConvention = data;
          this.checkHourRate();
        });
      }
    });
  }

  /**
   * If a collective convention is loaded we need to set the salary to the minimum rate of its parameters
   */
  checkHourRate(){

    if(!this.parametersConvention || this.parametersConvention.length==0)
      return;

    this.selectedParamConvID = this.parametersConvention[0].id;
    this.minHourRate = this.parametersConvention[0].rate;
    for(let i=1 ; i < this.parametersConvention.length ; i++){
      if(this.minHourRate > this.parametersConvention[i].rate){
        this.selectedParamConvID = this.parametersConvention[i].id;
        this.minHourRate = this.parametersConvention[i].rate;
      }
    }

    this.validateRate(this.offer.jobData.remuneration);
  }

  /**
   *
   * @param rate
   * @returns {boolean}
   */
  validateRate(rate){
    if(rate>=this.minHourRate){
      this.invalidHourRateMessage = '';
      this.invalidHourRate = false;
      return true;
    }

    this.invalidHourRateMessage = '* Le taux horaire devrait être supérieur ou égal à '+this.minHourRate;
    this.invalidHourRate = true;
    return false;
  }


  watchLevel(e) {
    this.offer.jobData.level = e.target.value;
  }

  removeSlot(i) {
    if(this.obj == "add") {
      this.slots.splice(i, 1);
    }else{
      this.offer.calendarData.splice(i, 1);
      this.offersService.updateOfferCalendar(this.offer, this.projectTarget);
      this.sharedService.setCurrentOffer(this.offer);
      this.slots = [];
      this.convertDetailSlotsForDisplay();
    }
  }

  addSlot() {
    if (this.slot.date == 0 || this.slot.startHour == 0 || this.slot.endHour == 0) {
      return;
    }
    if (this.checkHour() == false)
      return;

    if(this.obj == "add") {
      this.slotsToSave.push(this.slot);
    }
    this.slot.date = this.slot.date.getTime();
    var h = this.slot.startHour.getHours() * 60;
    var m = this.slot.startHour.getMinutes();
    this.slot.startHour = h + m;
    h = this.slot.endHour.getHours() * 60;
    m = this.slot.endHour.getMinutes();
    this.slot.endHour = h + m;
    if(this.obj == "add") {
      var s = this.convertSlotsForDisplay(this.slot);
      this.slots.push(s);
    }else {
      this.offer.calendarData.push(this.slot);
      this.offersService.updateOfferCalendar(this.offer, this.projectTarget).then(() => {
        this.sharedService.setCurrentOffer(this.offer);
        this.slots = [];
        this.convertDetailSlotsForDisplay();
      });
    }
    //reset datetime component
    this.resetDatetime("slotDate");
    this.resetDatetime('slotEHour');
    this.resetDatetime('slotSHour');
    this.slot = {
      date: 0,
      startHour: 0,
      endHour: 0
    };
  }

  convertSlotsForDisplay(s) {
    var slotTemp = {
      date: this.toDateString(s.date),
      startHour: this.toHourString(s.startHour),
      endHour: this.toHourString(s.endHour)
    };
    return slotTemp;
  }

  convertDetailSlotsForDisplay() {
    for (let i = 0; i < this.offer.calendarData.length; i++) {
      var slotTemp = {
        date: this.toDateString(this.offer.calendarData[i].date),
        startHour: this.toHourString(this.offer.calendarData[i].startHour),
        endHour: this.toHourString(this.offer.calendarData[i].endHour)
      };
      this.slots.push(slotTemp);
    }
  }

  removeQuality(item) {
    this.offer.qualityData.splice(this.offer.qualityData.indexOf(item), 1);
    if(this.obj == "detail") {
      this.offersService.updateOfferQualities(this.offer, this.projectTarget);
      this.setOfferInLocal();
    }
  }

  addQuality() {
    if (this.isEmpty(this.selectedQuality)) {
      return;
    }
    if(this.obj == "detail") {
      //searching the selected quality in the list of qualities of the current offer
      var q1 = this.offer.qualityData.filter((v)=> {
        return (v.idQuality == this.selectedQuality);
      });
      //ignore the add request if quality is already added
      if (this.offer.qualityData.indexOf(q1[0]) != -1) {
        return;
      }
      //searching the selected quality in the generel list of qualities
      var q2 = this.qualities.filter((v)=> {
        return (v.idQuality == this.selectedQuality);
      });
      this.offer.qualityData.push(q2[0]);
      this.offersService.updateOfferQualities(this.offer, this.projectTarget);
      this.setOfferInLocal();
    }else {
      var qualitiesTemp = this.qualities.filter((v)=> {
        return (v.idQuality == this.selectedQuality);
      });
      if (this.offer.qualityData.indexOf(qualitiesTemp[0]) != -1) {
        return;
      }
      this.offer.qualityData.push(qualitiesTemp[0]);
    }
  }

  removeLanguage(item) {
    this.offer.languageData.splice(this.offer.languageData.indexOf(item), 1);
    if(this.obj == "detail") {
      this.offersService.updateOfferLanguages(this.offer, this.projectTarget);
      this.setOfferInLocal();
    }
  }

  addLanguage() {
    if (this.isEmpty(this.selectedLang)) {
      return;
    }
    //searching the selected lang in the general list of langs
    var langTemp = this.langs.filter((v)=> {
      return (v.idLanguage == this.selectedLang);
    });
    //delete the lang from the cyurrent offer lang list, if already existant
    if (this.offer.languageData.indexOf(langTemp[0]) != -1) {
      this.offer.languageData.splice(this.offer.languageData.indexOf(langTemp[0]), 1);
    }
    langTemp[0]['level'] = this.selectedLevel;
    this.offer.languageData.push(langTemp[0]);
    if(this.obj == "detail") {
      this.offersService.updateOfferLanguages(this.offer, this.projectTarget);
      this.setOfferInLocal();
    }
  }

  checkHour() {
    this.alertsSlot = [];
    if (this.slot.startHour && this.slot.endHour && this.slot.startHour >= this.slot.endHour) {
      this.addAlert("warning", "L'heure de début doit être inférieure à l'heure de fin", "slot");
      this.resetDatetime('slotEHour');
      this.slot.endHour = 0;
      return false;
    }
    //check if chosen hour and date are lower than today date and hour
    if (this.slot.date && new Date(this.slot.date).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
      var h = new Date().getHours();
      var m = new Date().getMinutes();
      var minutesNow = this.offersService.convertHoursToMinutes(h + ':' + m);
      if (this.slot.startHour && this.slot.startHour <= new Date()) {
        this.addAlert("warning", "L'heure de début et de fin doivent être supérieures à l'heure actuelle", "slot");
        this.resetDatetime('slotSHour');
        this.slot.startHour = 0;
        this.resetDatetime('slotEHour');
        this.slot.endHour = 0;
        return false;
      }
    }
    return true;
  }

  setOfferInLocal() {
    //set offer in local
    this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, this.offer, this.projectTarget);
    this.sharedService.setCurrentUser(this.currentUser);
    this.sharedService.setCurrentOffer(this.offer);
  }

  editOffer() {
    if(this.obj == "add"){
      this.offer.calendarData = this.slotsToSave;
      if (!this.offer.jobData.job || !this.offer.jobData.sector || !this.offer.jobData.remuneration || !this.offer.calendarData || this.offer.calendarData.length == 0 || this.minHourRate<this.offer.jobData.remuneration) {
        this.addAlert("warning", "Veuillez saisir les détails du job, ainsi que les disponibilités pour pouvoir valider.", "general");
        return;
      }
      let level = (this.offer.jobData.level === 'senior') ? 'Expérimenté' : 'Débutant'
      this.offer.title = this.offer.jobData.job + " " + level;
      this.offer.identity = (this.projectTarget == 'employer' ? this.currentUser.employer.entreprises[0].id : this.currentUser.jobyer.id);
      this.offersService.setOfferInRemote(this.offer, this.projectTarget).then((data: any)=> {
        if (this.projectTarget == 'employer') {
          this.currentUser.employer.entreprises[0].offers.push(JSON.parse(data._body));
        } else {
          this.currentUser.jobyer.offers.push(JSON.parse(data._body));
        }
        this.sharedService.setCurrentUser(this.currentUser);
        Messenger().post({
          message: "l'offre "+"'"+this.offer.title+"'"+" a été ajoutée avec succès",
          type: 'success',
          showCloseButton: true
        });
        this.router.navigate(['app/offer/list']);
      });
    }else{
      this.validateJob();
    }
  }

  validateJob() {
    // --> Job state
    this.offer.title = this.offer.jobData.job + ' ' + ((this.offer.jobData.level != 'junior') ? 'Expérimenté' : 'Débutant');

    this.offersService.updateOfferJob(this.offer, this.projectTarget);
    this.setOfferInLocal();
    Messenger().post({
      message: "Informations enregistrées avec succès.",
      type: 'success',
      showCloseButton: true
    });
  }

  resetDatetime(componentId) {
    let elements: NodeListOf<Element> = document.getElementById(componentId).getElementsByClassName('form-control');
    (<HTMLInputElement>elements[0]).value = null;
  }

  /**
   * @Description Converts a timeStamp to date string
   * @param time : a timestamp date
   */
  toHourString(time: number) {
    let minutes = (time % 60) < 10 ? "0" + (time % 60).toString() : (time % 60).toString();
    let hours = Math.trunc(time / 60) < 10 ? "0" + Math.trunc(time / 60).toString() : Math.trunc(time / 60).toString();
    return hours + ":" + minutes;
  }

  /**
   * @Description Converts a timeStamp to date string :
   * @param date : a timestamp date
   */
  toDateString(date: number) {
    var dateOptions = {
      weekday: "long", month: "long", year: "numeric",
      day: "numeric"//, hour: "2-digit", minute: "2-digit"
    };
    return new Date(date).toLocaleDateString('fr-FR', dateOptions);
  }

  addAlert(type, msg, section): void {
    if (section == "general") {
      this.alerts = [{type: type, msg: msg}];
    }
    if (section == "slot") {
      this.alertsSlot = [{type: type, msg: msg}];
    }
  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }

  ngOnDestroy(): void {
    if(this.obj == "detail")
      this.sharedService.setCurrentOffer(null);
  }
}
