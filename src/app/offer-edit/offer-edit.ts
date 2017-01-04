import {Component, NgZone, ViewEncapsulation} from "@angular/core";
import {OffersService} from "../../providers/offer.service";
import {DomSanitizationService} from '@angular/platform-browser';
import {SharedService} from "../../providers/shared.service";
import {SearchService} from "../../providers/search-service";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {ModalOptions} from "../modal-options/modal-options";
import {ModalOfferTempQuote} from "../modal-offer-temp-quote/modal-offer-temp-quote";
import {FinanceService} from "../../providers/finance.service";
import {Configs} from "../../configurations/configs";
import {MapsAPILoader} from "angular2-google-maps/core";
import {AddressUtils} from "../utils/addressUtils";
import {LoadListService} from "../../providers/load-list.service";
import {Utils} from "../utils/utils";
import {DateUtils} from "../utils/date-utils";
import {ConventionService} from "../../providers/convention.service";
import {CandidatureService} from "../../providers/candidature-service";
import {SmsService} from "../../providers/sms-service";
import {ModalSlots} from "./modal-slots/modal-slots";
import {AdvertService} from "../../providers/advert.service";
import {MissionService} from "../../providers/mission-service";

declare var Messenger, jQuery: any;
declare var google: any;
declare var moment: any;
declare var require;

@Component({
  selector: '[offer-edit]',
  template: require('./offer-edit.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./offer-edit.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent, NKDatetime, ModalOptions, ModalOfferTempQuote, ModalSlots],
  providers: [OffersService, SearchService, FinanceService,
    LoadListService, ConventionService, CandidatureService,
    SmsService, AdvertService, MissionService]
})

export class OfferEdit{

  selectedJob: any;
  initSectorDone = false;

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
  alertsConditionEmp: Array<Object>;
  hideJobLoader: boolean = true;
  datepickerOpts: any;
  obj: string;

  videoAvailable: boolean = false;
  youtubeLink: string;
  youtubeLinkSafe: any;
  isLinkValid: boolean = true;

  /*
   * Collective conventions management
   */
  convention: any;
  niveauxConventions: any = [];
  selectedNivConvID: number = 0;
  categoriesConventions: any = [];
  selectedCatConvID: number = 0;
  echelonsConventions: any = [];
  selectedEchConvID: number = 0;
  coefficientsConventions: any = [];
  selectedCoefConvID: number = 0;
  parametersConvention: any = [];
  selectedParamConvID: number = 0;
  minHourRate: number = 0;
  invalidHourRateMessage: string = '';
  invalidHourRate = false;
  personalizeConvention = false;

  categoriesHeure: any = [];
  majorationsHeure: any = [];
  indemnites: any = [];
  dataValidation: boolean = false;

  offrePrivacyTitle: string;
  autoSearchModeTitle: string;
  modalParams: any = {type: '', message: ''};
  keepCurrentOffer: boolean = false;
  triedValidate: boolean = false;
  isConditionEmpValid = true;
  isConditionEmpExist: boolean = true;

  /*
   * PREREQUIS
   */
  prerequisOb: string = '';
  prerequisObList: any = [];
  prerequisObligatoires: any = [];


  /*
   * EPI
   */
  epi: string = '';
  epiItems: any = [];
  epiList: any = [];

  /*
   * Offer adress
   */
  autocompleteOA: any;
  offerAddress: string;
  nameOA: string;
  streetNumberOA: string;
  streetOA: string;
  zipCodeOA: string;
  cityOA: string;
  countryOA: string;

  addressOptions = {
    componentRestrictions: {country: "fr"}
  };

  //Full time
  isFulltime: boolean = false;
  isPause: boolean = false;
  isOfferInContract: boolean;
  isOfferArchived: boolean;

  //Calendar
  calendar: any;
  $calendar: any;
  dragOptions: Object = { zIndex: 999, revert: true, revertDuration: 0 };
  event: any = {};

  plageDate: string;
  isPeriodic: boolean = false;

  startDate: any;
  endDate: any;
  untilDate: any;
  createEvent: any;
  isEventCreated = false;

  /*
   *  ADVERTISEMENTS MANAGEMENT
   */
  advertMode : any;
  advertId: string;

  /*
   *  Contact
   */
  offerContact : string;
  tel : string;

  personalizeConventionInit : boolean = false;

  constructor(private sharedService: SharedService,
              public offersService: OffersService,
              private searchService: SearchService,
              private sanitizer: DomSanitizationService,
              private router: Router,
              private financeService: FinanceService,
              private route: ActivatedRoute,
              private zone: NgZone,
              private _loader: MapsAPILoader,
              private listService: LoadListService,
              private conventionService: ConventionService,
              private candidatureService: CandidatureService,
              private smsService: SmsService,
              private advertService : AdvertService) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
    }
    this.convention = {
      id: 0,
      code: '',
      libelle: ''
    }

    this.offer = this.sharedService.getCurrentOffer();
    if(this.offer && this.offer.telephone)
      this.tel = this.offer.telephone;
    if(this.offer && this.offer.contact)
      this.offerContact = this.offer.contact;

  }

  ngOnInit(): void {

    // Init Calendar
    this.initCalendar();
    this.$calendar = jQuery('#calendar');
    this.$calendar.fullCalendar(this.calendar);
    jQuery('.draggable').draggable(this.dragOptions);

    //obj = "add", "detail", or "recruit"
    this.route.params.forEach((params: Params) => {
      this.obj = params['obj'];
      this.advertId = params['adv'];
    });

    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));

    //  Load collective convention
    if (this.projectTarget == "employer" && this.currentUser.employer.entreprises[0].conventionCollective.id > 0) {
      this.convention = this.currentUser.employer.entreprises[0].conventionCollective;
      // Loading convention filters / data
      let filters = this.sharedService.getConventionFilters();
      if (this.isEmpty(filters) === true) {
        this.offersService.getConventionFilters(this.convention.id).then((data: any) => {
          this.sharedService.setConventionFilters(data);
          this.niveauxConventions = data.filter((elem) => { return elem.type == 'niv' });
          this.coefficientsConventions = data.filter((elem) => { return elem.type == 'coe' });
          this.echelonsConventions = data.filter((elem) => { return elem.type == 'ech' });
          this.categoriesConventions = data.filter((elem) => { return elem.type == 'cat' });
        });
      } else {
        this.niveauxConventions = filters.filter((elem) => { return elem.type == 'niv' });
        this.coefficientsConventions = filters.filter((elem) => { return elem.type == 'coe' });
        this.echelonsConventions = filters.filter((elem) => { return elem.type == 'ech' });
        this.categoriesConventions = filters.filter((elem) => { return elem.type == 'cat' });
      }
      this.offersService.getConventionParameters(this.convention.id).then(data => {
        this.parametersConvention = data;
      });
    }

    if (this.obj == "detail") {

      /**
       * Existing offer initialization
       */
      this.offer = this.sharedService.getCurrentOffer();

      this.isOfferArchived = (this.offer.etat == 'en archive' ? true : false);

      this.isOfferInContract = (this.offer.etat == 'en contrat' ? true : false);
      if(this.isOfferInContract){
        //display alert if offer is in contract
        this.addAlert("info", "Cette offre est en contrat. Vous ne pouvez donc pas la modifier.", "general");
      }

      if (!this.offer.videolink) {
        this.videoAvailable = false;
      } else {
        this.videoAvailable = true;
        this.youtubeLink = this.offer.videolink.replace("youtu.be", "www.youtube.com/embed").replace("watch?v=", "embed/");
        this.youtubeLinkSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeLink);
      }
      if (this.offer.visible) {
        this.offrePrivacyTitle = this.offer.visible ? "Rendre l'offre privée" : "Rendre l'offre privée";

      }
      else {
        this.offrePrivacyTitle = this.offer.visble ? "Rendre l'offre privée" : "Mettre l'offre en ligne";
      }
      this.autoSearchModeTitle = this.offer.rechercheAutomatique ? "Désactiver la recherche auto" : "Activer la recherche auto";
      if (this.offer.obsolete) {
        //display alert if offer is obsolete
        this.addAlert("warning", "Attention: Cette offre est obsolète. Veuillez mettre à jour les créneaux de disponibilités.", "general");
        //display calendar slots of the current offer
      }
      if (this.offer.jobData.prerequisObligatoires && this.offer.jobData.prerequisObligatoires.length > 0)
        this.prerequisObligatoires = this.offer.jobData.prerequisObligatoires;
      else
        this.prerequisObligatoires = [];

      //epi
      if (this.offer.jobData.epi && this.offer.jobData.epi.length > 0)
        this.epiList = this.offer.jobData.epi;
      else
        this.epiList = [];

      this.offersService.loadOfferAdress(this.offer.idOffer, this.projectTarget).then((data: any) => {
        this.offerAddress = data;
      });
      this.updateConventionParameters(this.offer.idOffer);

      this.slots = this.convertEventsToSlots(this.$calendar.fullCalendar('clientEvents'));
    } else {

      /**
       * New offer initialization
       */
      var jobData = {
        'class': "com.vitonjob.callouts.auth.model.JobData",
        job: "",
        sector: "",
        idSector: 0,
        idJob: 0,
        level: 'junior',
        remuneration: null,
        currency: 'euro',
        validated: false,
        prerequisObligatoires: [],
        epi: []
      };
      this.offer = {
        jobData: jobData,
        calendarData: [],
        qualityData: [],
        languageData: [],
        visible: false,
        title: "",
        status: "open",
        videolink: "",
        nbPoste: 1
      };
      this.checkHourRate();
    }

    let self = this;

    //load all sectors and job, if not yet loaded in local
    this.sectors = this.sharedService.getSectorList();
    var jobList = this.sharedService.getJobList();
    if (!this.sectors || this.sectors.length == 0 || !jobList || jobList.length == 0) {
      this.offersService.loadSectorsToLocal().then((data: any) => {
        this.sharedService.setSectorList(data);
        this.sectors = data;

        // Load job
        this.hideJobLoader = false;
        this.offersService.loadJobsToLocal().then((data2: any) => {
          this.sharedService.setJobList(data2);
          this.hideJobLoader = true;

          if (this.obj == "detail") {
            //display selected job of the current offer
            this.selectNewSector(this.offer.jobData.idSector);
          }
          self.initSectorDone = true;

        })
      })
    } else {
      if (this.obj == "detail") {
        //display selected job of the current offer
        this.selectNewSector(this.offer.jobData.idSector);
      }
      self.initSectorDone = true;
    }

    //loadQualities
    this.qualities = this.sharedService.getQualityList();
    if (Utils.isEmpty(this.qualities) === true) {
      this.offersService.loadQualities(this.projectTarget).then((data: any) => {
        this.qualities = data.data;
        this.sharedService.setQualityList(this.qualities);
      })
    }

    //loadLanguages
    this.langs = this.sharedService.getLangList();
    if (Utils.isEmpty(this.langs) === true) {
      this.listService.loadOffersLanguages().then((data: any) => {
        this.langs = data.data;
        this.sharedService.setLangList(this.langs);
      });
    }

    //init slot
    this.slot = {
      date: 0,
      dateEnd: 0,
      startHour: 0,
      endHour: 0,
      pause: false
    };
    //dateoption for slotDate
    this.datepickerOpts = {
      language: 'fr-FR',
      startDate: new Date(),
      autoclose: true,
      todayHighlight: true,
      format: 'dd/mm/yyyy'
    };

    /*this.advertMode = this.sharedService.getAdvertMode();
    if(!this.advertMode){
      this.advertMode= {
        advMode : false,
        id : 0
      };
    }

    this.sharedService.setAdvertMode({advMode : false, id : 0});*/
  }

  updateConventionParameters(idOffer) {
    this.offersService.getOfferConventionParameters(idOffer).then((parameter: any) => {

      if (parameter.idechelon && parameter.idechelon != null) {
        this.selectedEchConvID = parseInt(parameter.idechelon + '');
      }
      if (parameter.idcat && parameter.idcat != null) {
        this.selectedCatConvID = parseInt(parameter.idcat + '');
      }
      if (parameter.idcoeff && parameter.idcoeff != null) {
        this.selectedCoefConvID = parseInt(parameter.idcoeff + '');
      }
      if (parameter.idniv && parameter.idniv != null) {
        this.selectedNivConvID = parseInt(parameter.idniv + '');
      }
      this.minHourRate = parameter.rate;
      this.selectedParamConvID = parameter.id;
    });
  }

  ngAfterViewInit() {
    var self = this;
    this._loader.load().then(() => {
      this.autocompleteOA = new google.maps.places.Autocomplete(document.getElementById("autocompleteOfferAdress"), this.addressOptions);
    });

    //get timepickers elements
    var elements = []
    jQuery("input[id^='q-timepicker_']").each(function () {
      elements.push(this.id);
    });

    //add change event to endTime timepicker
    jQuery('#' + elements[1]).timepicker().on('changeTime.timepicker', function (e) {
      if (e.time.value == "0:00") {
        jQuery('#' + elements[1]).timepicker('setTime', '11:59 PM');
      }
    });


    // Initialize constraint between sector and job
    //let sector = jQuery('.sector-select').select2();
    let job = jQuery('.job-select').select2({
      maximumSelectionLength: 1,
      tokenSeparators: [",", " "],
      createSearchChoice: function (term, data) {
        if (self.jobs.length == 0) {
          return {
            id: '0', libelle: term
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
          let idSector = 0;
          if (self.offer && self.offer.jobData && self.offer.jobData.idSector) {
            idSector = self.offer.jobData.idSector;
          }
          return self.offersService.selectJobs(term, idSector);
        },
        results: function (data, page) {
          self.jobs = data.data;
          return {results: data.data};
        },
        cache: false,

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
      minimumInputLength: 1,
      initSelection: function(element, callback) {
      }
    });

    job
      .val(this.offer.jobData.idJob).trigger("change")
      .on("change", function (e) {
          self.jobSelected(e.val);
        }
      );

    if (this.offer.jobData.idJob) {
      this.offersService.selectJobById(this.offer.jobData.idJob).then((job: string) => {
        this.selectedJob = job;
        jQuery(".job-select").select2('data', {id: this.offer.jobData.idJob, libelle: this.selectedJob});
      });
    }


    /*
     * PREREQUIS
     */
    jQuery('.prerequis-select').select2({
      maximumSelectionLength: 1,
      tokenSeparators: [",", " "],
      createSearchChoice: function (term, data) {
        if (self.prerequisObList.length == 0) {
          return {
            id: '0', libelle: term
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
          return self.offersService.selectPrerequis(term);
        },
        results: function (data, page) {
          self.prerequisObList = data.data;
          return {results: data.data};
        },
        cache: false,

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
      minimumInputLength: 1
    });
    jQuery('.prerequis-select').on('select2-selecting',
      (e) => {
        self.prerequisOb = e.choice.libelle;
      }
    )

    /*
     * PREREQUIS
     */
    jQuery('.prerequis-jobyer-select').select2({
      maximumSelectionLength: 1,
      tokenSeparators: [",", " "],
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
          return self.offersService.selectPrerequis(term);
        },
        results: function (data, page) {
          self.prerequisObList = data.data;
          return {results: data.data};
        },
        cache: false,

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
      minimumInputLength: 1
    });
    jQuery('.prerequis-jobyer-select').on('select2-selecting',
      (e) => {
        self.prerequisOb = e.choice.libelle;
      }
    )

    //epi select2

    jQuery('.epi-select').select2({
      maximumSelectionLength: 1,
      tokenSeparators: [",", " "],
      createSearchChoice: function (term, data) {
        if (self.epiItems.length == 0) {
          return {
            id: '0', libelle: term
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
          return self.offersService.selectEPI(term);
        },
        results: function (data, page) {
          self.epiItems = data.data;
          return {results: data.data};
        },
        cache: false,

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
      minimumInputLength: 1
    });
    jQuery('.epi-select').on('select2-selecting',
      (e) => {
        self.epi = e.choice.libelle;
      }
    )

    jQuery('.epi-jobyer-select').select2({
      maximumSelectionLength: 1,
      tokenSeparators: [",", " "],
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
          return self.offersService.selectEPI(term);
        },
        results: function (data, page) {
          self.prerequisObList = data.data;
          return {results: data.data};
        },
        cache: false,

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
      minimumInputLength: 1
    });
    jQuery('.epi-jobyer-select').on('select2-selecting',
      (e) => {
        self.epi = e.choice.libelle;
      }
    )
  }

  /**
   * Event when "Personalize Working conditions"
   */
  onPersonalizeConvention() {
    if (this.personalizeConvention === false) {
      if (this.personalizeConventionInit === false) {
        //get values for "condition de travail"
        if (this.obj != "detail") {
          this.getConditionEmpValuesForCreation();
        } else {
          this.getConditionEmpValuesForUpdate();
        }
        this.personalizeConventionInit = true;
      }
    }
    this.personalizeConvention = !this.personalizeConvention;
  }

  addPrerequis() {
    if (Utils.isEmpty(this.prerequisOb) === true)
      return;
    this.prerequisObligatoires.push(this.prerequisOb);
    this.prerequisOb = '';
  }

  addEPI() {
    if (Utils.isEmpty(this.epi) === true)
      return;
    this.epiList.push(this.epi);
    this.epi = '';
  }

  removePrerequis(p) {
    let index = -1;
    for (let i = 0; i < this.prerequisObligatoires.length; i++)
      if (this.prerequisObligatoires[i] == p) {
        index = i;
        break;
      }

    if (index < 0)
      return;

    this.prerequisObligatoires.splice(index, 1);
  }

  removeEPI(p) {
    let index = -1;
    for (let i = 0; i < this.epiList.length; i++)
      if (this.epi[i] == p) {
        index = i;
        break;
      }

    if (index < 0)
      return;

    this.epiList.splice(index, 1);
  }

  sectorSelected(sector) {

    //set sector info in jobdata
    this.offer.jobData.idSector = sector;
    //
    var sectorsTemp = this.sectors.filter((v) => {
      return (v.id == sector);
    });
    //get job list
    var jobList = this.sharedService.getJobList();
     this.jobs = jobList.filter((v) => {
     return (v.idsector == sector);
     });

    if (sectorsTemp.length > 0) {
      this.offer.jobData.sector = sectorsTemp[0].libelle;
    }

    jQuery('.job-select').select2('val', '');
  }

  selectNewSector(sector) {

    //set sector info in jobdata
    this.offer.jobData.idSector = sector;
    //
    var sectorsTemp = this.sectors.filter((v) => {
      return (v.id == sector);
    });

    if (sectorsTemp.length > 0) {
      this.offer.jobData.sector = sectorsTemp[0].libelle;
    }

  }

  /**
   * The job has been selected we will set the offer's job and the conventions data
   * @param idJob
   */
  jobSelected(idJob) {
    this.offer.jobData.idJob = idJob;
    var jobsTemp = this.jobs.filter((v) => {
      return (v.id == idJob);
    });
    this.offer.jobData.job = jobsTemp[0].libelle;

    if (!this.offer.jobData.sector || this.offer.jobData.sector.length == 0) {
      this.offersService.loadSectorByJobId(idJob).then((sector: any) => {
        this.offer.jobData.idSector = sector.id;
        this.offer.jobData.sector = sector.libelle;
        let id = parseInt(this.offer.jobData.idSector);
        this.selectNewSector(id);

      });
    }
  }

  watchLevel(e) {

    this.offer.jobData.level = e.target.value;
  }


  //<editor-fold desc="Slots management">

  removeSlot(event) {
    if (this.obj != "detail") {
      //remove event from calendar
      let ev = this.calendar.events.filter((e)=> {
        return (new Date(e.start._d).getTime() == new Date(event.start._d).getTime() && new Date(e.end._d).getTime() == new Date(event.end._d).getTime());
      });
      let index = this.calendar.events.indexOf(ev[0]);
      if (index != -1) {
        this.calendar.events.splice(index, 1);
        this.$calendar.fullCalendar('removeEvents', function (event) {
          return new Date(event.start._d).getTime() == new Date(ev[0].start._d).getTime() && new Date(event.end._d).getTime() == new Date(ev[0].end._d).getTime();
        });
        this.slots.splice(index, 1);
        this.slotsToSave.splice(index, 1);
      }
    } else {
      if(this.offer.calendarData.length == 1){
        this.addAlert("danger", "Une offre doit avoir au moins un créneau de disponibilité. Veuillez ajouter un autre créneau avant de pouvoir supprimer celui-ci.", "slot");
        return;
      }
      //searching event in the calendar events
      let ev = this.calendar.events.filter((e)=> {
        return (e.start == event.start._d.getTime() && e.end == event.end._d.getTime());
      });
      let index = this.calendar.events.indexOf(ev[0]);
      if (index != -1) {
        //removing event from calendar
        this.calendar.events.splice(index, 1);
        //render the calendar with the event removed
        this.$calendar.fullCalendar('removeEvents', function (event) {
          return new Date(event.start._d).getTime() == ev[0].start && new Date(event.end._d).getTime() == ev[0].end;
        });
        //remove slot from local
        this.offer.calendarData.splice(index, 1);
        this.slots.splice(index, 1);
        //remove slot from remote
        this.offersService.updateOfferCalendar(this.offer, this.projectTarget).then(() => {
          this.setOfferInLocal();
          //this.slots = [];
          //this.convertDetailSlotsForDisplay();
        });
      }
    }
    this.closeDetailsModal();
  }

  addSlot(ev) {

    if (this.slot.startHour == 0 || this.slot.endHour == 0) {
      return;
    }

    if (this.obj != "detail") {
    	
      this.slots.push(this.slot);
      this.slotsToSave.push(this.slot);
      this.offer.calendarData.push(this.slot);
      return;
    }else{

      if(ev != 'drop'){
        this.slots.push(this.slot);
        let slotClone = this.offersService.cloneSlot(this.slot);
        let slotToSave = this.offersService.convertSlotsForSaving([slotClone]);
        this.offer.calendarData.push(slotToSave[0]);
      }

      this.offersService.updateOfferCalendar(this.offer, this.projectTarget).then(() => {
        this.setOfferInLocal();
        //this.slots = [];
        //this.convertDetailSlotsForDisplay();
      });
    }
  }

  convertSlotsForDisplay(s) {
    var slotTemp = {
      date: this.toDateString(s.date),
      dateEnd: this.toDateString(s.dateEnd),
      startHour: this.toHourString(s.startHour),
      endHour: this.toHourString(s.endHour),
      pause: s.pause
    };
    return slotTemp;
  }

  convertDetailSlotsForDisplay() {
    for (let i = 0; i < this.offer.calendarData.length; i++) {
      var slotTemp = {
        date: this.toDateString(this.offer.calendarData[i].date),
        dateEnd: this.toDateString(this.offer.calendarData[i].dateEnd),
        startHour: this.toHourString(this.offer.calendarData[i].startHour),
        endHour: this.toHourString(this.offer.calendarData[i].endHour),
        pause: this.offer.calendarData[i].pause
      };
      this.slots.push(slotTemp);
    }
  }

  initSlots() {
    for (let i = 0; i < this.offer.calendarData.length; i++) {
      var slotTemp = {
        date: new Date(this.offer.calendarData[i].date),
        dateEnd: new Date(this.offer.calendarData[i].dateEnd),
        startHour: new Date(this.offer.calendarData[i].date),
        endHour: new Date(this.offer.calendarData[i].dateEnd),
        pause: this.offer.calendarData[i].pause
      };
      this.slots.push(slotTemp);
    }
  }

  convertDetailSlotsForCalendar() {
    let events = [];
    if(this.offer){
      for (let i = 0; i < this.offer.calendarData.length; i++) {
        let isPause = this.offer.calendarData[i].pause;
        let startHour = this.toHourString(this.offer.calendarData[i].startHour);
        let endHour = this.toHourString(this.offer.calendarData[i].endHour);
        let startDate = new Date(this.offer.calendarData[i].date);
        let endDate = new Date(this.offer.calendarData[i].dateEnd);

        let title = (isPause ? "Pause de ": "Créneau de ");
        var slotTemp = {
          title: title + startHour + " à " + endHour,
          start: startDate.setHours(+startHour.split(":")[0], +startHour.split(":")[1], 0, 0),
          end: endDate.setHours(+endHour.split(":")[0], +endHour.split(":")[1], 0, 0),
          pause: isPause
        };
        events.push(slotTemp);
      }
    }
    return events;
  }

  convertEventsToSlots(events){
    let eventsConverted = []
    for(let i = 0; i < events.length; i++){
      let slotTemp = {
        date: events[i].start._d,
        dateEnd: events[i].end._d,
        startHour: events[i].start._d,
        endHour: events[i].end._d,
        pause: events[i].pause
      };
      eventsConverted.push(slotTemp);
    }
    return eventsConverted;
  }

  checkHour(slots, slot) {
    this.alertsSlot = [];

    // Compute Minutes format start and end hour of the new slot
    let startHourH = slot.startHour.getHours();
    let startHourM = slot.startHour.getMinutes();
    let startHourTotMinutes = this.offersService.convertHoursToMinutes(startHourH + ':' + startHourM);
    let endHourH = slot.endHour.getHours();
    let endHourM = slot.endHour.getMinutes();
    let endHourTotMinutes = this.offersService.convertHoursToMinutes(endHourH + ':' + endHourM);

    // If end hour is 0:00, force 23:59 such as midnight minute
    if (endHourTotMinutes == 0) {
      endHourTotMinutes = (60 * 24) - 1;
    }

    // Check that today is over than the selected day
    let today = new Date().setHours(0, 0, 0);
    if (today > slot.date) {
      this.addAlert("danger", "La date sélectionnée doit être supérieure ou égale à la date d'aujourd'hui", "slot");
      return false;
    }

    // Check that end hour is over than begin hour
    if (slot.date.getTime() >= slot.dateEnd.getTime()) {
      this.addAlert("danger", "L'heure de début doit être inférieure à l'heure de fin", "slot");
      return false;
    }

    // Check that the slot is not overwriting an other one
    if (!slot.pause) {

      if (this.projectTarget == 'employer') {
        //total hours of one day should be lower than 10h
        let isDailyDurationRespected = this.offersService.isDailySlotsDurationRespected(slots, slot);
        if (!isDailyDurationRespected) {
          this.addAlert("danger", "Le total des heures de travail de chaque journée ne doit pas dépasser les 10 heures. Veuillez réduire la durée de ce créneau", "slot");
          return false;
        }

        if(!this.offersService.isSlotRespectsBreaktime(slots, slot)){
          this.addAlert("danger", "Veuillez mettre un délai de 11h entre deux créneaux situés sur deux jours calendaires différents.", "slot");
          return false;
        }
      }
      for (let i = 0; i < slots.length; i++) {
          // If end hour is 0:00, force 23:59 such as midnight minute
          /*if (slotEndTotMinutes == 0) {
            slotEndTotMinutes = (60 * 24) - 1;
          }*/
          if ((slot.date >= slots[i].date && slot.dateEnd <= slots[i].dateEnd) || (slot.date >= slots[i].date && slot.date < slots[i].dateEnd) || (slot.dateEnd > slots[i].date && slot.dateEnd <= slots[i].dateEnd)) {
            this.addAlert("danger", "Ce créneau chevauche avec un autre", "slot");
            return false;
          }
      }
    } else {
      let isPauseValid = false;
      for (let i = 0; i < slots.length; i++) {
          // If end hour is 0:00, force 23:59 such as midnight minute
          /*if (slotEndTotMinutes == 0) {
            slotEndTotMinutes = (60 * 24) - 1;
          }*/

        if (((slot.date >= slots[i].date && slot.dateEnd <= slots[i].dateEnd) || (slot.date >= slots[i].date && slot.date < slots[i].dateEnd) || (slot.dateEnd > slots[i].date && slot.dateEnd <= slots[i].dateEnd)) && slots[i].pause) {
          this.addAlert("danger", "Cette pause chevauche avec une autre", "slot");
          return false;
        }

        //a break time should be included in a slot
        if (slot.date > slots[i].date && slot.dateEnd < slots[i].dateEnd && !slots[i].pause) {
          isPauseValid = true;
        }
      }
      if (!isPauseValid) {
        this.addAlert("danger", "La période de pause doit être incluse dans l'un des créneaux.", "slot");
        return false;
      }
    }
    return true;
  }

  resetDatetime(componentId) {
    let elements: NodeListOf<Element> = document.getElementById(componentId).getElementsByClassName('form-control');
    (<HTMLInputElement>elements[0]).value = null;
  }

  isDeleteSlotDisabled() {
    return (this.obj == "detail" && this.slots && this.slots.length == 1);
  }

//</editor-fold>

  removeQuality(item) {
    this.offer.qualityData.splice(this.offer.qualityData.indexOf(item), 1);
    if (this.obj == "detail") {
      this.offersService.updateOfferQualities(this.offer, this.projectTarget);
      this.setOfferInLocal();
    }
  }

  addQuality() {
    if (this.isEmpty(this.selectedQuality)) {
      return;
    }
    if (this.obj == "detail") {
      //searching the selected quality in the list of qualities of the current offer
      var q1 = this.offer.qualityData.filter((v) => {
        return (v.idQuality == this.selectedQuality);
      });
      //ignore the add request if quality is already added
      if (this.offer.qualityData.indexOf(q1[0]) != -1) {
        return;
      }
      //searching the selected quality in the generel list of qualities
      var q2 = this.qualities.filter((v) => {
        return (v.idQuality == this.selectedQuality);
      });
      this.offer.qualityData.push(q2[0]);
      this.offersService.updateOfferQualities(this.offer, this.projectTarget);
      this.setOfferInLocal();
    } else {
      var qualitiesTemp = this.qualities.filter((v) => {
        return (v.idQuality == this.selectedQuality);
      });
      if (this.offer.qualityData.indexOf(qualitiesTemp[0]) != -1) {
        return;
      }
      this.offer.qualityData.push(qualitiesTemp[0]);
      this.selectedQuality = "";
    }
  }

  removeLanguage(item) {
    this.offer.languageData.splice(this.offer.languageData.indexOf(item), 1);
    if (this.obj == "detail") {
      this.offersService.updateOfferLanguages(this.offer, this.projectTarget);
      this.setOfferInLocal();
    }
  }

  addLanguage() {
    if (this.isEmpty(this.selectedLang)) {
      return;
    }
    //searching the selected lang in the general list of langs
    var langTemp = this.langs.filter((v) => {
      return (v.idLanguage == this.selectedLang);
    });
    //delete the lang from the current offer lang list, if already existant
    if (this.offer.languageData.indexOf(langTemp[0]) != -1) {
      this.offer.languageData.splice(this.offer.languageData.indexOf(langTemp[0]), 1);
    }
    langTemp[0]['level'] = this.selectedLevel;
    this.offer.languageData.push(langTemp[0]);
    if (this.obj == "detail") {
      this.offersService.updateOfferLanguages(this.offer, this.projectTarget);
      this.setOfferInLocal();
    }
    this.selectedLang = "";
  }

  setOfferInLocal() {
    //set offer in local
    if (this.prerequisObligatoires && this.prerequisObligatoires.length > 0)
      this.offer.jobData.prerequisObligatoires = this.prerequisObligatoires;

    if (this.epiList && this.epiList.length > 0)
      this.offer.jobData.epi = this.epiList;

    this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, this.offer, this.projectTarget);
    this.sharedService.setCurrentUser(this.currentUser);
    this.sharedService.setCurrentOffer(this.offer);
  }

  editOffer() {
    this.triedValidate = true;
    //values of condition de travail should not be null
    if (!this.isConditionEmpValid) {
      return;
    }

    this.offer.contact = this.offerContact;
    this.offer.telephone = this.tel;

    if (this.obj != "detail") {
      this.offer.calendarData = this.offersService.convertSlotsForSaving(this.slotsToSave);

      if(!this.isFormValid()){
          return;
      }

      let level = (this.offer.jobData.level === 'senior') ? 'Expérimenté' : 'Débutant';
      this.offer.title = this.offer.jobData.job + " " + level;
      this.offer.identity = (this.projectTarget == 'employer' ? this.currentUser.employer.entreprises[0].id : this.currentUser.jobyer.id);

      //  Deal with requirements
      if (this.prerequisObligatoires && this.prerequisObligatoires.length > 0) {
        this.offer.jobData.prerequisObligatoires = this.prerequisObligatoires;
      } else {
        this.offer.jobData.prerequisObligatoires = [];
      }

      // epi list
      if (this.epiList && this.epiList.length > 0) {
        this.offer.jobData.epi = this.epiList;
      } else {
        this.offer.jobData.epi = [];
      }

      //this.router.navigate(['offer/calendar', {offer: this.offer, isOfferToAdd: true}]);
      this.offersService.setOfferInRemote(this.offer, this.projectTarget).then((data: any) => {
        this.dataValidation = true;
        let offer = JSON.parse(data._body);


        if (this.prerequisObligatoires && this.prerequisObligatoires.length > 0) {
          offer.jobData.prerequisObligatoires = this.prerequisObligatoires;
        }

        if (this.epiList && this.epiList.length > 0) {
          offer.jobData.epi = this.epiList;
        }

        if (this.projectTarget == 'employer') {

          //save values of condition de travail
          this.saveConditionEmp(offer);

          if (this.offerAddress) {

            this.offersService.saveOfferAdress(offer,
              this.offerAddress, this.streetNumberOA,
              this.streetOA, this.cityOA, this.zipCodeOA,
              this.nameOA, this.countryOA,
              this.currentUser.employer.entreprises[0].id,
              "employeur").then(data => {

              offer.adresse = this.offerAddress;
            });
          }
          this.currentUser.employer.entreprises[0].offers.push(offer);
        } else {


          if (this.offerAddress && this.cityOA && this.cityOA.length > 0) {
            this.offersService.saveOfferAdress(offer,
              this.offerAddress, this.streetNumberOA,
              this.streetOA, this.cityOA, this.zipCodeOA,
              this.nameOA, this.countryOA,
              this.currentUser.jobyer.id,
              "jobyer").then(data => {
              offer.adresse = this.offerAddress;
            });
          }
          this.currentUser.jobyer.offers.push(offer);
        }

        // Offer convention parameters

        if (this.projectTarget == 'employer' && this.selectedParamConvID)
          this.offersService.saveOfferConventionParameters(offer.idOffer, this.selectedParamConvID);

        this.sharedService.setCurrentUser(this.currentUser);
        Messenger().post({
          message: "L'offre " + "'" + this.offer.title + "'" + " a été ajoutée avec succès",
          type: 'success',
          showCloseButton: true
        });
        //redirection depending on the case
        if(!Utils.isEmpty(this.advertId)){
          this.advertService.updateAdvertWithOffer(this.advertId, offer.idOffer).then((data: any) => {
            this.router.navigate(['advert/edit', {obj:'add'}]);
          });
          return;
        }
        if (this.obj == "add") {
          //redirect to offer-list and display public offers
          this.router.navigate(['offer/list', {typeOfferModel: '0'}]);
        } else {
          this.sharedService.setCurrentOffer(offer);
          this.router.navigate(['search/results', {obj: 'recruit'}]);
        }
      });
    } else {
      if (this.projectTarget == 'employer') {
        //save values of condition de travail
        this.saveConditionEmp(this.offer);

        if (this.offerAddress && this.cityOA && this.cityOA.length > 0) {
          this.offersService.saveOfferAdress(this.offer,
            this.offerAddress, this.streetNumberOA,
            this.streetOA, this.cityOA, this.zipCodeOA,
            this.nameOA, this.countryOA,
            this.currentUser.employer.entreprises[0].id,
            "employer").then(data => {
            this.offer.adresse = this.offerAddress;
          });
        }
      } else {
        if (this.offerAddress && this.cityOA && this.cityOA.length > 0) {
          this.offersService.saveOfferAdress(this.offer,
            this.offerAddress, this.streetNumberOA,
            this.streetOA, this.cityOA, this.zipCodeOA,
            this.nameOA, this.countryOA,
            this.currentUser.jobyer.id,
            "jobyer").then(data => {
            this.offer.adresse = this.offerAddress;
          });
        }
      }

      if (this.projectTarget == 'employer' && this.selectedParamConvID) {
        this.offersService.saveOfferConventionParameters(this.offer.idOffer, this.selectedParamConvID);
      }
      this.validateJob();
    }
  }

  validateJob(stayOnPage = false) {
    // --> Job state
    this.dataValidation = true;
    this.offer.title = this.offer.jobData.job + ' ' + ((this.offer.jobData.level != 'junior') ? 'Expérimenté' : 'Débutant');
    if (!this.offer.jobData.job || !this.offer.jobData.sector || !this.offer.jobData.remuneration || !this.offer.calendarData || this.offer.calendarData.length == 0 || this.minHourRate > this.offer.jobData.remuneration) {
      this.addAlert("warning", "Veuillez saisir les détails du job, ainsi que les disponibilités pour pouvoir valider.", "general");
      return;
    }
    this.dataValidation = true;
    this.offersService.updateOfferJob(this.offer, this.projectTarget);
    this.setOfferInLocal();
    Messenger().post({
      message: "Informations enregistrées avec succès.",
      type: 'success',
      showCloseButton: true
    });

    if (stayOnPage == true) {
      return;
    }

    //redirection depending on the case
    if(!Utils.isEmpty(this.advertId)){
      this.advertService.updateAdvertWithOffer(this.advertId, this.offer.idOffer);
      this.router.navigate(['advert/list']);
      return;
    }else{
      //redirect to offer-list and display public offers
      var typeOffer = this.offer.visible ? 0 : 1;
      this.router.navigate(['offer/list', {typeOfferModel: typeOffer}]);
    }
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

  getHourFromDate(time: number) {
    let d = new Date(time);
    let h = d.getHours();
    let m = +d.getMinutes();
    //m = (m.toString().length == 1 ? "0"+m : +m);
    return DateUtils.formatHours(h) + ":" + DateUtils.formatHours(m);
  }

  addAlert(type, msg, section): void {
    if (section == "general"
    ) {
      this.alerts = [{type: type, msg: msg}];
    }
    if (section == "slot") {
      this.alertsSlot = [{type: type, msg: msg}];
    }
    if (section == "conditionEmp") {
      this.alertsConditionEmp = [{type: type, msg: msg}];
    }
  }

  ngOnDestroy(): void {
    if (this.obj == "detail" && this.keepCurrentOffer === false
    )
      this.sharedService.setCurrentOffer(null);
  }

  formHasChanges() {
    if (this.dataValidation) {
      return false;
    }
    return true;
  }

  videoUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeLink);
  }

  updateVideo(deleteLink) {
    this.isLinkValid = true;
    if (deleteLink) {
      this.youtubeLink = "";
    } else {
      if (this.youtubeLink == "" || (this.youtubeLink.indexOf("youtu.be") == -1 && this.youtubeLink.indexOf("www.youtube.com") == -1)) {
        this.isLinkValid = false;
        return;
      }
      this.youtubeLink = this.youtubeLink.replace("youtu.be", "www.youtube.com/embed").replace("watch?v=", "embed/");
      this.youtubeLinkSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeLink);
    }
    this.offersService.updateVideoLink(this.offer.idOffer, this.youtubeLink, this.projectTarget).then(() => {
      if (deleteLink) {
        this.videoAvailable = false;
      } else {
        this.videoAvailable = true;
      }
      this.offer.videolink = this.youtubeLink;
      this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, this.offer, this.projectTarget);
      this.sharedService.setCurrentUser(this.currentUser);
      this.sharedService.setCurrentOffer(this.offer);
    });
  }

  deleteOffer() {
    this.dataValidation = true;
    this.modalParams.type = "offer.delete";
    this.modalParams.message = "Êtes-vous sûr de vouloir supprimer l'offre " + '"' + this.offer.title + '"' + " ?";
    this.modalParams.btnTitle = "Supprimer l'offre";
    this.modalParams.btnClasses = "btn btn-danger";
    this.modalParams.modalTitle = "Suppression de l'offre";
    jQuery("#modal-options").modal('show')
  }

  copyOffer() {
    this.dataValidation = true;
    this.modalParams.type = "offer.copy";
    this.modalParams.message = "Voulez-vous ajouter une nouvelle offre à partir de celle-ci ?";
    this.modalParams.btnTitle = "Copier l'offre";
    this.modalParams.btnClasses = "btn btn-primary";
    this.modalParams.modalTitle = "Copie de l'offre";
    jQuery("#modal-options").modal('show')
  }

  changePrivacy() {
    this.dataValidation = true;
    var offer = this.offer;
    var statut = offer.visible ? 'Non' : 'Oui';
    this.offersService.updateOfferStatut(offer.idOffer, statut, this.projectTarget).then(() => {
      offer.visible = (statut == 'Non' ? false : true);
      this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, offer, this.projectTarget);
      this.sharedService.setCurrentUser(this.currentUser);
      if (offer.visible) {
        this.offrePrivacyTitle = this.offer.visible ? "Rendre l'offre privée" : "Rendre l'offre privée";
        Messenger().post({
          message: "Votre offre a bien été déplacée dans «Mes offres en ligne».",
          type: 'success',
          showCloseButton: true
        });
      } else {
        this.offrePrivacyTitle = this.offer.visble ? "Rendre l'offre privée" : "Mettre l'offre en ligne";
        if(this.projectTarget == 'employer'){
          this.candidatureService.getJobyersByOfferCandidature(this.offer.idOffer).then((data: any) => {
            if(data && data.data && data.data.length >= 1){
              for(let i = 0; i < data.data.length; i++){
                let jobyer = data.data[i];
                this.smsService.sendSms(jobyer.telephone, "L'offre " + this.offer.title + " auquelle vous avez postulé, publiée par " + this.currentUser.employer.entreprises[0].nom + " est passée à l'état privée.");
              }
            }
          })
        }
        Messenger().post({
          message: "Votre offre a bien été déplacée dans «Mes offres privées».",
          type: 'success',
          showCloseButton: true
        });
      }
    });
  }

  launchSearch() {
    this.dataValidation = true;
    var offer = this.offer;

    let searchQuery = {
      class: 'com.vitonjob.recherche.model.SearchQuery',
      queryType: 'OFFER',
      idOffer: offer.idOffer,
      resultsType: this.projectTarget=='jobyer'?'employer':'jobyer'
    };
    this.searchService.advancedSearch(searchQuery).then((data:any)=>{
      this.sharedService.setLastResult(data);
      this.sharedService.setCurrentOffer(offer);
      this.keepCurrentOffer = true;
      this.router.navigate(['search/results']);
    });

  }

  autoSearchMode() {
    this.dataValidation = true;
    var offer = this.offer;
    var mode = offer.rechercheAutomatique ? "Non" : "Oui";
    this.offersService.saveAutoSearchMode(this.projectTarget, offer.idOffer, mode).then((data: any) => {
      if (data && data.status == "success") {
        offer.rechercheAutomatique = !offer.rechercheAutomatique;
        this.autoSearchModeTitle = offer.rechercheAutomatique ? "Désactiver la recherche auto" : "Activer la recherche auto";
        this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, offer, this.projectTarget);
        this.sharedService.setCurrentUser(this.currentUser);
      } else {
        Messenger().post({
          message: "Une erreur est survenue lors de l'enregistrement des données.",
          type: 'success',
          showCloseButton: true
        });
      }
    });
  }

  showQuote() {

    // In order to retrieve updated quote, save current state
    this.validateJob(true);

    let offer = this.sharedService.getCurrentOffer();
    if (offer != null) {
      let self = this;
      this.financeService.loadPrevQuotePdf(offer.idOffer).then((data: any) => {

        let file64 ='data:application/pdf;base64, ' + data.pdf;
        this.sharedService.setCurrentQuote(file64);
        this.keepCurrentOffer = true;
        self.router.navigate(['iframe/quote']);

      });
    }
  }


//<editor-fold desc="Convention collective management">
  /**
   * If a collective convention is loaded we need to set the salary to the minimum rate of its parameters
   */
  checkHourRate() {
    if (!this.parametersConvention || this.parametersConvention.length == 0)
      return;

    this.selectedParamConvID = this.parametersConvention[0].id;
    this.minHourRate = this.parametersConvention[0].rate;
    for (let i = 1; i < this.parametersConvention.length; i++) {
      if (this.minHourRate > this.parametersConvention[i].rate) {
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
  validateRate(rate) {
    let r = parseFloat(rate);
    let roundMin = (Math.round(this.minHourRate * 100) / 100);

    if (r >= roundMin) {
      this.invalidHourRateMessage = '0.00';
      this.invalidHourRate = false;
      return true;
    }

    this.invalidHourRateMessage = roundMin + '';
    this.invalidHourRate = true;
    return false;
  }


  convParametersVisible() {
    if (!this.parametersConvention || this.parametersConvention.length == 0 || !this.offer.jobData.remuneration || this.offer.jobData.remuneration == 0)
      return false;
    return true;
  }

  convNiveauxVisible() {
    if (!this.niveauxConventions || this.niveauxConventions.length == 0)
      return false;
    return true;
  }

  convCoefficientsVisible() {
    if (!this.coefficientsConventions || this.coefficientsConventions.length == 0)
      return false;
    return true;
  }

  convEchelonsVisible() {
    if (!this.echelonsConventions || this.echelonsConventions.length == 0)
      return false;
    return true;
  }

  convCategoriesVisible() {
    if (!this.categoriesConventions || this.categoriesConventions.length == 0)
      return false;
    return true;
  }

  updateHourRateThreshold(field: string, value: number) {
    if (!this.parametersConvention || this.parametersConvention.length == 0)
      return;

    //  Ensure to take the maximum threshold before checking other options
    for (let i = 0; i < this.parametersConvention.length; i++) {
      if (this.minHourRate <= this.parametersConvention[i].rate) {
        this.selectedParamConvID = this.parametersConvention[i].id;
        this.minHourRate = this.parametersConvention[i].rate;
      }
    }

    //  Now let's seek the suitable parameters
    for (let i = 0; i < this.parametersConvention.length; i++) {

      if (field == 'CAT' && value > 0 && this.parametersConvention[i].idcat != value)
        continue;
      if (field == 'COEF' && value > 0 && this.parametersConvention[i].idcoeff != value)
        continue;
      if (field == 'ECH' && value > 0 && this.parametersConvention[i].idechelon != value)
        continue;
      if (field == 'NIV' && value > 0 && this.parametersConvention[i].idniv != value)
        continue;

      if (this.minHourRate > this.parametersConvention[i].rate) {
        this.selectedParamConvID = this.parametersConvention[i].id;
        this.minHourRate = this.parametersConvention[i].rate;
      }
    }

    this.validateRate(this.offer.jobData.remuneration);
  }

  watchOfferAddress(e) {

    let _address = e.target.value;
    let _hint: string = "";

    this.nameOA = _address;
    this.streetNumberOA = "";
    this.streetOA = "";
    this.zipCodeOA = "";
    this.cityOA = "";
    this.countryOA = "";

    this.offerAddress = _address;
  }

  autocompleteOfferAddress() {

    this._loader.load().then(() => {

      //let autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocompletePersonal"), {});
      google.maps.event.addListener(this.autocompleteOA, 'place_changed', () => {

        let place = this.autocompleteOA.getPlace();
        var addressObj = AddressUtils.decorticateGeolocAddress(place);

        this.zone.run(() => {
          this.nameOA = !addressObj.name ? '' : addressObj.name.replace("&#39;", "'");
          this.streetNumberOA = addressObj.streetNumber.replace("&#39;", "'");
          this.streetOA = addressObj.street.replace("&#39;", "'");
          this.zipCodeOA = addressObj.zipCode;
          this.cityOA = addressObj.city.replace("&#39;", "'");
          this.countryOA = (addressObj.country.replace("&#39;", "'") == "" ? 'France' : addressObj.country.replace("&#39;", "'"));
          this.offerAddress = this.constructAdress();
        });
      });
    });
  }

  constructAdress(){
    let adr = "";
    if(this.nameOA && this.nameOA.length>0){
      adr = adr+this.nameOA+", ";
    }

    if(this.streetNumberOA && this.streetNumberOA.length>0){
      adr = adr+this.streetNumberOA+", ";
    }

    if(this.streetOA && this.streetOA.length>0){
      adr = adr+this.streetOA+", ";
    }

    if(this.cityOA && this.cityOA.length>0){
      adr = adr+this.cityOA+", ";
    }

    if(this.zipCodeOA && this.zipCodeOA.length>0){
      adr = adr+this.zipCodeOA+", ";
    }

    if(this.countryOA && this.countryOA.length>0){
      adr = adr+this.countryOA;
    }

    return adr.trim();
  }

  watchFullTime(e) {
    this.isFulltime = e.target.checked;
    if (this.isFulltime) {
      this.slot.startHour = new Date(new Date().setHours(0, 0, 0, 0));
      this.slot.endHour = new Date(new Date().setHours(23, 59, 0, 0));
      this.slot.pause = false;
      this.isPause = false;
    }
  }

  watchPause(e) {
    this.isPause = e.target.checked;
    if (this.isPause) {
      this.isFulltime = false;
      this.slot.pause = true;
    } else {
      this.slot.pause = false;
    }
  }

  watchPeriodicity(e) {
    this.isPeriodic = e.target.checked;
    this.slot.isPeriodic = e.target.checked;
  }

  watchConditionEmp(e, item) {
    this.alertsConditionEmp = [];
    this.isConditionEmpValid = true;
    if (+e.target.value < item.coefficient || Utils.isEmpty(e.target.value)) {
      this.addAlert("danger", "Les valeurs définies par l'employeur doivent être supérieures ou égales à celles définies par la convention collective.", "conditionEmp");
      this.isConditionEmpValid = false;
      e.target.value = this.decimalAdjust('round', item.coefficient, -2).toFixed(2);
    }
    e.target.value = this.decimalAdjust('round', e.target.value, -2).toFixed(2);//e.target.value.toFixed(2);
  }

  decimalAdjust(type, value, exp) {
  // Si la valeur de exp n'est pas définie ou vaut zéro...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // Si la valeur n'est pas un nombre
  // ou si exp n'est pas un entier...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Décalage
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Décalage inversé
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

  saveConditionEmp(offer) {
    if (this.obj != 'detail' || !this.isConditionEmpExist) {
      this.conventionService.createConditionEmploi(offer.idOffer, this.conventionService.convertPercentToRaw(this.categoriesHeure), this.conventionService.convertPercentToRaw(this.majorationsHeure), this.conventionService.convertPercentToRaw(this.indemnites)).then((data: any) => {
        if (!data || data.status == "failure") {
          this.addAlert("danger", "Erreur lors de la sauvegarde des données.", "general");
        }
      })
    } else {
      this.conventionService.updateConditionEmploi(this.offer.idOffer, this.conventionService.convertPercentToRaw(this.categoriesHeure), this.conventionService.convertPercentToRaw(this.majorationsHeure), this.conventionService.convertPercentToRaw(this.indemnites)).then((data: any) => {
        if (!data || data.status == "failure") {
          this.addAlert("danger", "Erreur lors de la sauvegarde des données.", "general");
        }
      })
    }
  }

  getConditionEmpValuesForCreation() {
    this.offersService.getHoursCategories(this.convention.id).then(data => {
      this.categoriesHeure = this.conventionService.convertValuesToPercent(data);
    });
    this.majorationsHeure = [];
    /*this.offersService.getHoursMajoration(this.convention.id).then(data => {
      this.majorationsHeure = this.conventionService.convertValuesToPercent(data);
    });*/
    this.offersService.getIndemnites(this.convention.id).then(data => {
      this.indemnites = this.conventionService.convertValuesToPercent(data);
    });
  }

  getConditionEmpValuesForUpdate() {
    this.conventionService.getHoursCategoriesEmp(this.convention.id, this.offer.idOffer).then((data: any) => {
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
    /*this.conventionService.getHoursMajorationEmp(this.convention.id, this.offer.idOffer).then((data: any) => {
      if (!data || data.length == 0) {
        this.isConditionEmpExist = false;
        this.offersService.getHoursMajoration(this.convention.id).then(data => {
          this.majorationsHeure = this.conventionService.convertValuesToPercent(data);
        });
      } else {
        this.isConditionEmpExist = true;
        this.majorationsHeure = this.conventionService.convertValuesToPercent(data);
      }
    });*/
    this.conventionService.getIndemnitesEmp(this.convention.id, this.offer.idOffer).then((data: any) => {
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

  preventNull(str) {
    return Utils.preventNull(str);
  }


  // calendar functions
  addEvent(event): void {
    this.calendar.events.push(event);
  };

  changeView(view): void {
    this.$calendar.fullCalendar('changeView', view);
  };

  currentMonth(): string {
    return moment(this.$calendar.fullCalendar('getDate')).format('MMM YYYY');
  };

  currentDay(): string {
    return moment(this.$calendar.fullCalendar('getDate')).format('dddd');

  };

  prev(): void {
    this.$calendar.fullCalendar('prev');
  };

  next(): void {
    this.$calendar.fullCalendar('next');
  };

  initCalendar() {
    let date = new Date();
    let d = date.getDate();
    let m = date.getMonth();
    let y = date.getFullYear();

    //get params
    /*this.route.params.forEach((params: Params) => {
     this.offer = params['offer'];
     this.isOfferToAdd = params['isOfferToAdd'];
     });*/

    this.calendar = {
      header: {
        left: '',
        center: 'title',
        right: false
      },
      views: {
        month: { // name of view
          titleFormat: 'MMMM YYYY'
        }
      },
      axisFormat: 'H:mm',
      slotDuration: '00:15:00',
      allDayText:"Au-delà d'un seul jour",
      events: this.convertDetailSlotsForCalendar(),
      selectable: true,
      selectHelper: true,
      eventDurationEditable: true,
      eventStartEditable: true,

      select: (start, end, allDay): any => {

        let today = new Date().setHours(0,0,0);
        if ( start._d.getTime() < today ){
          this.addAlert("warning", "Vous ne pouvez pas sélectionner une date passée.", "general");
          return false;
        }

        this.startDate = start._d;
        this.untilDate = new Date( end._d.getTime() - (24*60*60*1000) );
        this.endDate = end._d;

        /* Add to calculate the plageDate */
        let startTime = (start._d.getDate());
        let endTime = (end._d.getDate() - 1);

        this.plageDate = (startTime == endTime) ? 'single' : 'multiple';


        this.isPeriodic = true; // Périodique par défaut

        this.createEvent = () => {
          this.addSlotInCalendar(start, end, allDay);
        };
        this.resetSlotModal();
        jQuery('#create-event-modal').modal('show');
      },

      eventClick: (event): void => {
        this.event = event;
        jQuery('#show-event-modal').modal('show');
      },

      eventDrop: (event, delta, revertFunc): void => {
        this.dragSlot(event, revertFunc);
      },
      dayRender: (date, cell): void => {
          let today = new Date()
              today.setHours(0, 0, 0); // fix difference
          if (date < today)
                jQuery(cell).addClass('disabled');
      },
      lang : 'fr'
    };
  }

  addSlotInCalendar(start, end, allDay){
    let hs = this.slot.startHour.getHours();
    let ms = this.slot.startHour.getMinutes();
    let he = this.slot.endHour.getHours();
    let me = this.slot.endHour.getMinutes();
    /*
      WORKAROUND THE PROBLEM OF IMPLICIT CONVERSION BETWEEN 12:00 AND 00:00
     */
    if(he == 0 && me ==0){
      this.slot.endHour.setHours(12, 0, 0, 0);
      he = 12;
      me=0;
    }

    /*
      NOW WE START THE REAL TREATMENT
     */
    start._d.setHours(hs, ms, 0, 0);
    end._d.setDate(end._d.getDate() - 1);
    end._d.setHours(he, me, 0, 0);
    //slots should be coherent
    this.slot.date = start._d;
    this.slot.dateEnd = end._d;

    if (this.plageDate == "multiple" && this.isPeriodic){
      
      this.isPeriodic = false; // setting back to false to prevent default
      let nbDays = Math.floor( (this.endDate - this.startDate) / (60*60*24*1000) ) + 1;   
      
      // Boucle de splittage slots with fix for special dates
      for (let n = 0;n < (nbDays>1 ? nbDays : nbDays+1); n++){

        let date_debut = new Date(this.startDate.getFullYear(), 
                                  this.startDate.getMonth(), 
                                  this.startDate.getDate() + n,
                                  this.startDate.getHours(),
                                  this.startDate.getMinutes()
                                  );

        let date_arret = new Date(this.startDate.getFullYear(), 
                                  this.startDate.getMonth(), 
                                  this.startDate.getDate() + (nbDays>1 ? n : n + 1),
                                  this.endDate.getHours(),
                                  this.endDate.getMinutes()
                                  );

        // Récupération du slot splitté 
        let splitted_slot = { from: date_debut, to: date_arret };

        // Normalisation du slot généré par le split / day
        let normalized_slot ={date:date_debut, dateEnd:date_arret,
                              startHour:date_debut, endHour:date_arret,
                              pause:false, allDay:false};
        
        // + Vérification des slots
        if (this.checkHour(this.slots, normalized_slot)) {

          // Sauvegarde des slots splittés
          this.slots.push(normalized_slot);
          this.slotsToSave.push(normalized_slot);
          this.offer.calendarData.push(normalized_slot);

          // Actualisation du rendu graphique
          this.pushSlotInCalendar(splitted_slot)
        }else{
          let infos = "";//"<br>" + "- Le "+splitted_slot.from.toLocaleDateString() + '.'; // Can't do multi alerts - fix
          this.addAlert("warning", " Certains créneaux que vous avez séléctionné ne sont pas valide" + infos, "general");
        }
      

      }

      jQuery('#create-event-modal').modal('hide');
      return true;
    }

    if (this.checkHour(this.slots, this.slot) == false) {
      end._d.setDate(end._d.getDate() + 1);
      return;
    }
    // Show add offer form:
    //this.isEventCreated = true;
    //render slot in the calendar
    let title = (!this.slot.pause ? "Créneau de " : "Pause de ");
    let evt = {
      title: title + DateUtils.formatHours(hs) + ":" + DateUtils.formatHours(ms) + " à " + DateUtils.formatHours(he) + ":" + DateUtils.formatHours(me),
      start: start,
      end: end,
      //allDay is bugged, must be false
      allDay: false,
      //description: 'ici je peux mettre une description de l\'offre',
      backgroundColor: '#64bd63',
      textColor: '#fff',
      pause: this.slot.pause
    }
    if (title) {
      this.$calendar.fullCalendar('renderEvent',
        evt,
        true // make the event "stick"
      );
      this.addEvent(evt);
      this.addSlot('');
    }
    this.$calendar.fullCalendar('unselect');
    jQuery('#create-event-modal').modal('hide');
    this.resetSlotModal();
  }

  pushSlotInCalendar(slot){

    let evt = {
      title: "Créneau Périodique",
      start: slot.from,
      end:   slot.to,

      allDay: false,
      //description: 'ici je peux mettre une description de l\'offre',

      backgroundColor: '#64bd63',
      textColor: '#fff'
    }
    this.$calendar.fullCalendar('renderEvent',
      evt, true // make the event "stick"
    );
    this.addEvent(evt);
    this.$calendar.fullCalendar('unselect');
    this.resetSlotModal();
    return true;
  }

  dragSlot(event, revertFunc){
    this.slot.date = event.start._d;
    this.slot.dateEnd = event.end._d;
    this.slot.startHour = event.start._d;
    this.slot.endHour = event.end._d;
    this.slot.pause = event.pause;
    let evs = this.$calendar.fullCalendar('clientEvents');
    let slotsForDragEv = this.offersService.getSlotsForDraggingEvent(evs, this.slots);
    if(slotsForDragEv && slotsForDragEv.length > 0) {
      if (!this.checkHour(slotsForDragEv, this.slot)) {
        this.slot = {
          date: 0,
          dateEnd: 0,
          startHour: 0,
          endHour: 0,
          pause: false
        };
        revertFunc();
        return;
      }
      this.slots = [];
      this.slots = this.convertEventsToSlots(evs);
      if (this.obj != "detail") {
        this.slotsToSave = [];
        this.slotsToSave = this.convertEventsToSlots(evs);
        this.resetSlotModal();
      } else {
        this.offer.calendarData = [];
        this.offer.calendarData = this.offersService.convertSlotsForSaving(this.slots);
        this.addSlot("drop");
      }
    }else{
      this.resetSlotModal();
      revertFunc();
      return;
    }
  }

  resetSlotModal(){
    this.resetDatetime('slotEHour');
    this.resetDatetime('slotSHour');
    this.slot = {
      date: 0,
      dateEnd: 0,
      startHour: 0,
      endHour: 0,
      pause: false
    };
    this.alertsSlot = [];
    this.isFulltime = false;
    this.isPause = false;
  }

  closeModal(){
    this.resetSlotModal();
    jQuery('#create-event-modal').modal('hide');
  }

  closeDetailsModal(){
    this.alertsSlot = [];
    jQuery('#show-event-modal').modal('hide');
  }

  /* Validation formulaire */
  isFormValid(){
    let roundMin = (Math.round(this.minHourRate * 100) / 100);
    let errors   = [];

    //these conditions should be verified for all roles
    //if (!this.offer.jobData.job || this.offer.jobData.job == 0 || !this.offer.jobData.sector || this.offer.jobData.sector == 0 || !this.offer.jobData.remuneration || !this.offer.calendarData || this.offer.calendarData.length == 0) {
      //this.addAlert("warning", "Veuillez saisir les détails du job, ainsi que les disponibilités pour pouvoir valider.", "general");
      //errors.push({'type':'required'})
    //}
    if (roundMin > this.offer.jobData.remuneration){
    	this.addAlert("warning", "Veuillez saisir un taux horaire valide.", "general");
    }
    if (!this.offer.calendarData || this.offer.calendarData.length == 0) {
      this.addAlert("warning", "Veuillez saisir les horaires de travail pour continuer.", "general");
      errors.push({type:'required', 
      		label: this.projectTarget == 'jobyer' ? "Choix des disponibilités" : "Choix des horaires de travail"})
    }

    //for employer and recruiter roles, the nbPoste field should be filled
    /*if(this.projectTarget == "employer"){
      if(!this.offer.nbPoste ||  this.offer.nbPoste <= 0){
        //this.addAlert("warning", "Veuillez renseigner le nombre de poste requis pour cette offre.", "general");
        errors.push({'type':'required', 'cible':'#input-nbPoste'})
      }

  	  if (jQuery('#autocompleteOfferAdress').val() == ''){
  	    //this.addAlert("warning", "Veuillez renseigner l'adresse de la mission.", "general");
  	    errors.push({'type':'required', 'cible':'#autocompleteOfferAdress'})
  	  }
    }*/

    // Error checking by a global method
    let required_fields = 'input[required], select[required]';
    jQuery(required_fields).each(function(){

    	let tn = jQuery(this).prop("tagName");

        if (!jQuery(this).val() || jQuery(this).val() == "0"){
          let id = '#'+jQuery(this).attr('id') || 0;
          let label = jQuery(this).data('label') || 'Champ incomplet';
          let cible = jQuery(this).data('cible') || id;
          let error = {type:'required', label:false, cible:false};

          if (cible)	error.cible = cible;
          if (label)	error.label = label;

          // Insert current error object
          if (error)  	errors.push(error);
        }
    });

    /* Gestion des erreurs */
    if (errors.length > 0){
    	let first = errors[0];

		let n = 0;
		let cpl = "";
		for (n; n<errors.length;n++){
			let e = errors[n];

			if (e.cible){

				if (e.label)
					cpl += "<br> • <b hover='"+e.cible+"'>"+e.label+"</b>";

				jQuery(e.cible).addClass('warning-empty')
					.off('change click').on('change click', function(){
					if (jQuery(this).val())
				 		jQuery(this).removeClass('warning-empty')
				});
			}else
				cpl += "<br> • <b>"+e.label+"</b>";
		}

		if (first.cible){
			let pos = jQuery(first.cible).offset();
			window.scrollTo(pos.left, pos.top - 100);
		}else
			window.scrollTo(0, 0);

		this.addAlert("danger", "Merci de compléter les informations suivantes pour valider votre offre :  " + cpl, "general");

    	// Mise en surbrillance du champ en erreur survolé
    	jQuery('[hover]').on('mouseenter', function(){
    		let c = jQuery(this).attr('hover');
    		jQuery(c).addClass('warn-focus');
    	}).on('mouseleave', function(){
    		let c = jQuery(this).attr('hover');
    		jQuery(c).removeClass('warn-focus');
    	})
    }
    return errors.length == 0;
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }
}
