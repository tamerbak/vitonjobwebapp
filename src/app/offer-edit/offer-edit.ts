import {Component, NgZone, ViewEncapsulation} from "@angular/core";
import {OffersService} from "../../providers/offer.service";
import {DomSanitizationService} from "@angular/platform-browser";
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
import {AdvertService} from "../../providers/advert.service";
import {MissionService} from "../../providers/mission-service";
import {ConventionParameters} from "./convention-parameters/convention-parameters";
import {Offer} from "../../dto/offer";
import {Job} from "../../dto/job";
import {SelectLanguages} from "../components/select-languages/select-languages";
import {SelectList} from "../components/select-list/select-list";
import {Calendar} from "../components/calendar/calendar";
import {EnvironmentService} from "../../providers/environment.service";
import {Address} from "../../dto/address";
import {AutocompleteAddress} from "../components/autocomplete-address/autocomplete-address";
import {ProfileService} from "../../providers/profile.service";
import {Loader} from "../loader/loader";
import {LoaderService} from "../../providers/loader.service";

declare let Messenger, jQuery: any;
declare let google: any;
declare let moment: any;
declare let require;

@Component({
  selector: '[offer-edit]',
  template: require('./offer-edit.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./offer-edit.scss')],
  directives: [
    ROUTER_DIRECTIVES,
    AlertComponent,
    NKDatetime,
    ModalOptions,
    ModalOfferTempQuote,
    ConventionParameters,
    SelectLanguages,
    SelectList,
    Calendar,
    AutocompleteAddress,
    Loader
  ],
  providers: [
    OffersService,
    SearchService,
    FinanceService,
    LoadListService,
    ConventionService,
    CandidatureService,
    SmsService,
    AdvertService,
    MissionService,
    EnvironmentService,
    ProfileService
  ]
})

export class OfferEdit {

  selectedJob: any;
  initSectorDone = false;

  offer: Offer;

  fullLoad: boolean = false;

  sectors: any = [];
  jobs: any = [];

  qualities = [];
  langs = [];
  projectTarget: string;
  isEmployer: boolean;
  currentUser: any;
  slot: any;
  slots = [];

  alerts: Array<Object>;
  alertsSlot: Array<Object>;
  alertsConditionEmp: Array<Object>;
  hideJobLoader: boolean = true;
  datepickerOpts: any;

  /**
   * Controller arguments
   */
  obj: string;
  type: string;

  videoAvailable: boolean = false;
  youtubeLink: string;
  youtubeLinkSafe: any;
  isLinkValid: boolean = true;

  /*
   * Collective conventions management
   */
  convention: any;
  conventionComponentMsg: string;
  personalizeConvention = false;
  minimumClassificationRate: number = -1;
  refreshParametrage: boolean = false;

  categoriesHeure: any = [];
  majorationsHeure: any = [];
  indemnites: any = [];
  dataValidation: boolean = false;

  autoSearchModeTitle: string;
  modalParams: any = {type: '', message: ''};
  keepCurrentOffer: boolean = false;
  triedValidate: boolean = false;
  isConditionEmpValid = true;
  isConditionEmpExist: boolean = true;

  //Full time
  isFulltime: boolean = false;
  isPause: boolean = false;
  isOfferInContract: boolean;
  isOfferArchived: boolean;

  plageDate: string;
  isPeriodic: boolean = false;

  // startDate: any;
  // endDate: any;
  // untilDate: any;
  // createEvent: any;
  // isEventCreated = false;

  /*
   *  ADVERTISEMENTS MANAGEMENT
   */
  advertMode: any;
  advertId: string;

  personalizeConventionInit: boolean = false;

  savedSoftwares: any[] = [];
  selectedSoftware: any;
  softwares: any[];
  expSoftware: number = 1;

  isValidAddress: boolean = true;


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
              private environmentService:EnvironmentService,
              private advertService: AdvertService,
              private loader: LoaderService) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
      return;
    }

    this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    this.isEmployer = (this.projectTarget == 'employer');

    this.environmentService.reload();
    //obj = "add", "detail", or "recruit"
    this.route.params.forEach((params: Params) => {
      this.obj = params['obj'];
      this.type = params['type'];
    });

    let currentOffer = this.sharedService.getCurrentOffer();

    if (this.obj == "detail" || (currentOffer && currentOffer.idOffer > 0)) {

      this.loader.display();

      this.offer = currentOffer;
      this.offersService.getOfferById(this.offer.idOffer, this.projectTarget, this.offer).then(()=> {
        this.refreshParametrage = true;
        this.fullLoad = true;
        this.offer.adresse.type = "adresse_de_travail";
        this.loader.hide();

        // If we come from a template, remove the id to implicit copy the offer.
        if (this.type == 'planif') {
          this.offer.idOffer = 0;
          this.offer.offerType = false;
          this.offer.calendarData = [];
        }
      });
    } else {
      this.offer = new Offer();
      if (this.type == 'template') {
        this.offer.offerType = true;
      }
    }

    this.loadLists();

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

  loadLists(): void {

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
      this.listService.loadLanguages().then((data: any) => {
        this.langs = data.data;
        this.sharedService.setLangList(this.langs);
      });
    }

    //load Softwares for jobyers pharmaciens
    this.listService.loadPharmacieSoftwares().then((data: any) => {
      this.softwares = data.data;
    });

  }

  ngOnInit(): void {

    if (this.obj == "detail") {

      /**
       * Existing offer initialization
       */

      this.isOfferArchived = (this.offer.etat == 'en archive' ? true : false);

      this.isOfferInContract = (this.offer.etat == 'en contrat' ? true : false);
      if (this.isOfferInContract) {
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

      this.autoSearchModeTitle = this.offer.rechercheAutomatique ? "Désactiver la recherche auto" : "Activer la recherche auto";
      if (this.offer.obsolete) {
        //display alert if offer is obsolete
        this.addAlert("warning", "Attention: Cette offre est obsolète. Veuillez mettre à jour les créneaux de disponibilités.", "general");
        //display calendar slots of the current offer
      }

    } else {

      /**
       * New offer initialization
       */
      this.offer.telephone = (Utils.isEmpty(this.currentUser.tel) == false)
        ? this.currentUser.tel.replace('+33', '0')
        : ''
      ;
      this.offer.contact = (this.currentUser.prenom + " " + this.currentUser.nom).trim();

      let addr;

      if (this.projectTarget == 'employer') {
        addr = this.currentUser.employer.entreprises[0].workAdress;
        this.offer.adresse.type = "adresse_de_travail";
      } else {
        addr = this.currentUser.jobyer.personnalAdress;
        this.offer.adresse.type = "depart_vers_le_travail";
      }

      this.offer.adresse.streetNumber = addr.streetNumber;
      this.offer.adresse.name = addr.name;
      this.offer.adresse.fullAdress = AddressUtils.constructFullAddress(addr.name, addr.streetNumber, addr.street, addr.zipCode, addr.city, addr.country);
      this.offer.adresse.street = addr.street;
      this.offer.adresse.cp = addr.zipCode;
      this.offer.adresse.ville = addr.city;
      this.offer.adresse.pays = addr.country;
    }

    let self = this;

    //load all sectors and job, if not yet loaded in local
    this.sectors = this.sharedService.getSectorList();

    if (!this.sectors || this.sectors.length == 0) {//} || !jobList || jobList.length == 0) {
      this.offersService.loadSectorsToLocal().then((data: any) => {
        this.sharedService.setSectorList(data);
        this.sectors = data;

        // Load job
        this.hideJobLoader = false;
        // this.offersService.loadJobsToLocal().then((data2: any) => {
        // this.sharedService.setJobList(data2);
        this.hideJobLoader = true;

        if (this.obj == "detail") {
          //display selected job of the current offer
          this.selectNewSector(this.offer.jobData.idSector);
        }
        self.initSectorDone = true;

        // })
      })
    } else {
      if (this.obj == "detail") {
        //display selected job of the current offer
        this.selectNewSector(this.offer.jobData.idSector);
      }
      self.initSectorDone = true;
    }

    // get mastered softwares for jobyers pharmaciens
    if (this.obj == "detail") {
      this.offersService.getOfferSoftwares(this.offer.idOffer).then((data: any) => {
        if (data) {
          this.savedSoftwares = data;
        }
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
  }

  ngAfterViewInit() {
    let self = this;

    //get timepickers elements
    var elements = [];
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
        self.jobs.push(item);
        return item.libelle;
      },
      dropdownCssClass: "bigdrop",
      escapeMarkup: function (markup) {
        return markup;
      },
      minimumInputLength: 1,
      initSelection: function (element, callback) {
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

  sectorSelected(sector) {

    //set sector info in jobdata
    this.offer.jobData.idSector = sector;
    //
    var sectorsTemp = this.sectors.filter((v) => {
      return (v.id == sector);
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
        this.selectNewSector(this.offer.jobData.idSector);
      });
    }
  }

  watchLevel(e) {

    this.offer.jobData.level = e.target.value;
  }

  setOfferInLocal() {
    //set offer in local
    this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, this.offer, this.projectTarget);
    this.sharedService.setCurrentUser(this.currentUser);
    this.sharedService.setCurrentOffer(this.offer);
  }

  saveOffer(stayOnPage = false) {
    this.triedValidate = true;

    if (!this.isFormValid()) {
      return;
    }

    //values of condition de travail should not be null
    if (!this.isConditionEmpValid) {
      return;
    }

    if (this.obj != "detail") {

      let level = (this.offer.jobData.level === 'senior') ? 'Expérimenté' : 'Débutant';
      this.offer.title = this.offer.jobData.job + " " + level;

      if (this.projectTarget == 'employer') {
        this.offer.entrepriseId = this.currentUser.employer.entreprises[0].id;
      } else {
        this.offer.jobyerId = this.currentUser.jobyer.id;
      }

      //this.router.navigate(['offer/calendar', {offer: this.offer, isOfferToAdd: true}]);
      this.offersService.createOffer(this.offer, this.projectTarget).then((data: any) => {
        this.dataValidation = true;
        let offer = this.offer;

        if (this.projectTarget == 'employer') {

          //save values of condition de travail
          this.saveConditionEmp(offer);

          this.currentUser.employer.entreprises[0].offers.push(offer);

          if (this.offer.offerType) {
            this.validateJob(stayOnPage);
          }
        } else {
          this.currentUser.jobyer.offers.push(offer);
        }

        if (this.projectTarget == 'employer') {
          for (let i = 0; i < this.savedSoftwares.length; i++) {
            this.saveSoftware(this.savedSoftwares[i], offer.idOffer);
          }
        }

        this.sharedService.setCurrentUser(this.currentUser);
        Messenger().post({
          message: "L'offre " + "'" + this.offer.title + "'" + " a été ajoutée avec succès",
          type: 'success',
          showCloseButton: true
        });
        //redirection depending on the case
        /*if (!Utils.isEmpty(this.advertId)) {
          this.advertService.updateAdvertWithOffer(this.advertId, offer.idOffer).then((data: any) => {
            this.router.navigate(['advert/edit', {obj: 'add'}]);
          });
          return;
        }*/
        if (this.type == 'template') {
          return ;
        }

        if (this.obj == "add") {
          if(this.projectTarget == "employer"){
            this.dataValidation = true;
            this.sharedService.setCurrentOffer(offer);
            this.keepCurrentOffer = true;
            this.modalParams.type = "offer.annonce";
            this.modalParams.message = "Voulez-vous ajouter plus de détails à cette offre ?";
            this.modalParams.btnTitle = "Oui";
            this.modalParams.btnCancelTitle = "Plus tard";
            this.modalParams.btnClasses = "btn btn-success";
            this.modalParams.modalTitle = "Plus de détails";
            this.modalParams.fromOffer = true;
            //this.modalParams.offer = offer;
            jQuery("#modal-options").modal('show');
          }else{
            //redirect to offer-list and display public offers
            this.router.navigate(['offer/list', {typeOfferModel: '0'}]);
          }
        }

        if (this.obj == "recruit") {
          if(this.projectTarget == "employer") {
            this.dataValidation = true;
            this.sharedService.setCurrentOffer(offer);
            this.keepCurrentOffer = true;
            this.modalParams.type = "offer.annonce";
            this.modalParams.message = "Voulez-vous ajouter plus de détails à cette offre ?";
            this.modalParams.btnTitle = "Oui";
            this.modalParams.btnCancelTitle = "Plus tard";
            this.modalParams.btnClasses = "btn btn-success";
            this.modalParams.modalTitle = "Plus de détails";
            //this.modalParams.offer = offer;
            this.modalParams.obj = 'recruit';
            this.modalParams.fromOffer = true;
            jQuery("#modal-options").modal('show');
          }else{
            this.router.navigate(['offer/list', {typeOfferModel: '0'}]);
          }
        }

        if (this.obj == "pendingContracts") {
          if(this.projectTarget == "employer") {
            this.dataValidation = true;
            this.sharedService.setCurrentOffer(offer);
            this.keepCurrentOffer = true;
            this.modalParams.type = "offer.annonce";
            this.modalParams.message = "Voulez-vous ajouter plus de détails à cette offre ?";
            this.modalParams.btnTitle = "Oui";
            this.modalParams.btnCancelTitle = "Plus tard";
            this.modalParams.btnClasses = "btn btn-success";
            this.modalParams.modalTitle = "Plus de détails";
            //this.modalParams.offer = offer;
            this.modalParams.obj = this.obj;
            this.modalParams.fromOffer = true;
            jQuery("#modal-options").modal('show');
          }else{
            this.router.navigate(['offer/list', {typeOfferModel: '0'}]);
          }
          //this.sharedService.setCurrentOffer(offer);
          //this.router.navigate(['pendingContracts', {obj: this.obj}]);
        }
      });
    } else {

      this.offersService.saveOffer(this.offer, this.projectTarget).then((data: any) => {
        console.log('L offre a été sauvegardée avec succès');
      });

      if (this.projectTarget == 'employer') {
        //save values of condition de travail
        this.saveConditionEmp(this.offer);
      }

      this.validateJob(stayOnPage);
    }
  }

  validateJob(stayOnPage = false) {
    // --> Job state
    this.dataValidation = true;
    this.offer.title = this.offer.jobData.job + ' ' + ((this.offer.jobData.level != 'junior') ? 'Expérimenté' : 'Débutant');

    this.dataValidation = true;
    this.offersService.updateOfferJob(this.offer, this.projectTarget);
    this.setOfferInLocal();

    if (this.type != 'template') {
      Messenger().post({
        message: "Informations enregistrées avec succès.",
        type: 'success',
        showCloseButton: true
      });
    }

    if (stayOnPage == true) {
      return;
    }

    //redirection depending on the case
    if (this.projectTarget == 'employer' && this.type != 'template') {
      this.advertService.getAdvertByOffer(this.offer.idOffer).then((advert: any) => {
        if (!Utils.isEmpty(advert)) {
          this.dataValidation = true;
          this.sharedService.setCurrentOffer(this.offer);
          this.keepCurrentOffer = true;
          this.modalParams.type = "offer.annonce";
          this.modalParams.message = "Voulez-vous ajouter plus de détails à cette offre ?";
          this.modalParams.btnTitle = "Oui";
          this.modalParams.btnCancelTitle = "Plus tard";
          this.modalParams.btnClasses = "btn btn-success";
          this.modalParams.modalTitle = "Plus de détails";
          //this.modalParams.offer = this.offer;
          this.modalParams.advert = advert;
          this.modalParams.fromOffer = true;
          jQuery("#modal-options").modal('show');
          //this.advertService.updateAdvertWithOffer(this.advertId, this.offer.idOffer);
          //this.router.navigate(['advert/list']);
          //return;
        } else {
          this.dataValidation = true;
          this.sharedService.setCurrentOffer(this.offer);
          this.keepCurrentOffer = true;
          this.modalParams.type = "offer.annonce";
          this.modalParams.message = "Voulez-vous ajouter plus de détails à cette offre ?";
          this.modalParams.btnTitle = "Oui";
          this.modalParams.btnCancelTitle = "Plus tard";
          this.modalParams.btnClasses = "btn btn-success";
          this.modalParams.modalTitle = "Plus de détails";
          //this.modalParams.offer = this.offer;
          this.modalParams.fromOffer = true;
          jQuery("#modal-options").modal('show');
        }
      });
    } else {
      //redirect to offer-list and display public offers
      let typeOffer = this.offer.visible ? 0 : 1;
      if (this.type == 'template') {
        this.router.navigate(['offer/type/list']);
      } else {
        this.router.navigate(['offer/list', {typeOfferModel: typeOffer}]);
      }
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
    jQuery("#modal-options").modal('show');
  }

  copyOffer() {
    this.sharedService.setCurrentOffer(this.offersService.serializeOffer(this.offer));
    this.dataValidation = true;
    this.modalParams.type = "offer.copy";
    this.modalParams.message = "Voulez-vous ajouter une nouvelle offre à partir de celle-ci ?";
    this.modalParams.btnTitle = "Copier l'offre";
    this.modalParams.btnClasses = "btn btn-primary";
    this.modalParams.modalTitle = "Copie de l'offre";
    jQuery("#modal-options").modal('show');
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
        Messenger().post({
          message: "Votre offre a bien été déplacée dans «Mes offres en ligne».",
          type: 'success',
          showCloseButton: true
        });
      } else {
        if (this.projectTarget == 'employer') {
          this.candidatureService.getJobyersByOfferCandidature(this.offer.idOffer).then((data: any) => {
            if (data && data.data && data.data.length >= 1) {
              for (let i = 0; i < data.data.length; i++) {
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
    if (this.projectTarget == 'employer') {
      this.dataValidation = true;
      this.keepCurrentOffer = true;
      this.sharedService.setCurrentOffer(this.offer);
      this.saveOffer();
      this.router.navigate(['offer/recruit']);
      return;
    }else{
      let offer = this.offer;

      let searchQuery = {
        class: 'com.vitonjob.recherche.model.SearchQuery',
        queryType: 'OFFER',
        idOffer: offer.idOffer,
        resultsType: this.projectTarget == 'jobyer' ? 'employer' : 'jobyer'
      };
      this.searchService.advancedSearch(searchQuery).then((data: any)=> {
        this.sharedService.setLastResult(data);
        this.sharedService.setCurrentOffer(offer);
        this.sharedService.setCurrentSearch(null);
        this.sharedService.setCurrentSearchCity(null);
        this.keepCurrentOffer = true;
        this.router.navigate(['search/results']);
      });
    }
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

    this.saveOffer(true);

    let offer = this.sharedService.getCurrentOffer();
    if (offer != null) {
      let self = this;
      this.loader.display();
      this.financeService.loadPrevQuotePdf(offer.idOffer).then((data: any) => {

        let file64 = 'data:application/pdf;base64, ' + data.pdf;
        this.sharedService.setCurrentQuote(file64);
        this.keepCurrentOffer = true;
        this.loader.hide();
        self.router.navigate(['iframe/quote']);

      });
    }
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

  onAddressValidation(e): void {
    this.isValidAddress = e.isValidAddress;
  }

  /**
   * Form validation process
   *
   * @returns {boolean}
   */
  isFormValid() {
    let errors = [];

    if (!this.offer.offerType && (!this.offer.calendarData || this.offer.calendarData.length == 0)) {
      this.addAlert("warning", "Veuillez saisir les horaires de travail pour continuer.", "general");
      errors.push({
        type: 'required',
        label: this.projectTarget == 'jobyer' ? "Choix des disponibilités" : "Choix des horaires de travail"
      })
    }

    if (!this.isValidAddress) {
      errors.push({
        type: 'required',
        label: this.projectTarget == "employer"
          ? "Saisissez  l'adresse de la mission"
          : "Saisissez  l'adresse de départ vers le lieu de travail"
      })
    }

    // Error checking by a global method
    let required_fields = 'input[required], select[required]';
    jQuery(required_fields).each(function () {

      let tn = jQuery(this).prop("tagName");

      if (!jQuery(this).val() || jQuery(this).val() == "0") {
        let id = '#' + jQuery(this).attr('id') || 0;
        let label = jQuery(this).data('label') || 'Champ incomplet';
        let cible = jQuery(this).data('cible') || id;
        let error = {type: 'required', label: false, cible: false};

        if (cible)  error.cible = cible;
        if (label)  error.label = label;

        // Insert current error object
        if (error)    errors.push(error);
      }
    });

    /* Gestion des erreurs */
    if (errors.length > 0) {
      let first = errors[0];

      let n = 0;
      let cpl = "";
      for (n; n < errors.length; n++) {
        let e = errors[n];

        if (e.cible) {

          if (e.label)
            cpl += "<br> • <b hover='" + e.cible + "'>" + e.label + "</b>";

          jQuery(e.cible).addClass('warning-empty')
            .off('change click').on('change click', function () {
            if (jQuery(this).val())
              jQuery(this).removeClass('warning-empty')
          });
        } else
          cpl += "<br> • <b>" + e.label + "</b>";
      }

      if (first.cible) {
        let pos = jQuery(first.cible).offset();
        window.scrollTo(pos.left, pos.top - 100);
      } else
        window.scrollTo(0, 0);

      this.addAlert("danger", "Merci de compléter les informations suivantes pour valider votre offre :  " + cpl, "general");

      // Mise en surbrillance du champ en erreur survolé
      jQuery('[hover]').on('mouseenter', function () {
        let c = jQuery(this).attr('hover');
        jQuery(c).addClass('warn-focus');
      }).on('mouseleave', function () {
        let c = jQuery(this).attr('hover');
        jQuery(c).removeClass('warn-focus');
      })
    }
    return errors.length == 0;
  }

  /**
   * Handler that catch all event from conventio parameter component
   * @param data
   */
  conventionParametrageChange(data: {filters: any, msg: string, parametrageId: number}) {
    if (!data) {
      console.warn('Empty convention parameter event');
    }
    this.conventionComponentMsg = data.msg;
    if (data.parametrageId > 0) {
      // Good classification: set offer parametrage id
      this.offer.parametrageConvention = data.parametrageId;
      this.minimumClassificationRate = parseFloat(parseFloat(data.filters.rate).toFixed(2));
    } else {
      // Not good classification: display message
      this.offer.parametrageConvention = -1;
      this.minimumClassificationRate = -1;
    }
  }

  displayClassification() {
    return this.projectTarget == 'employer';
  }

  saveSoftware(software, idOffer) {
    this.offersService.saveSoftware(software, idOffer).then((expId: any) => {
      let savedSoft = {expId: expId, softId: software.id, nom: software.nom};
      if (this.obj == 'detail') {
        this.savedSoftwares.push(savedSoft);
      }
    })
  }

  removeSoftware(item) {
    this.savedSoftwares.splice(this.savedSoftwares.indexOf(item), 1);
    if (this.obj == 'detail') {
      this.offersService.deleteSoftware(item.expId);
    }
  }

  addSoftware() {
    if (Utils.isEmpty(this.selectedSoftware)) {
      return;
    }
    let softwaresTemp = this.softwares.filter((v)=> {
      return (v.id == this.selectedSoftware);
    });


    //if the selected software is already saved, do not re-add it
    for (let i = 0; i < this.savedSoftwares.length; i++) {
      if (this.savedSoftwares[i].softId == this.selectedSoftware) {
        this.selectedSoftware = "";
        return;
      }
    }

    if (this.obj == 'detail') {
      //if software is not yet added
      this.saveSoftware(softwaresTemp[0], this.offer.idOffer);
      this.selectedSoftware = "";
    } else {
      softwaresTemp[0].softId = softwaresTemp[0].id;
      this.savedSoftwares.push(softwaresTemp[0]);
      this.selectedSoftware = "";
    }
  }

  useAsType(value) {
    this.type = 'template';
    if (value) {
      this.offer.offerType = true;
      this.obj = 'add';
      this.offer.idOffer = 0;
      this.saveOffer(false);
    } else {
      this.deleteOffer();
    }
  }

  /**
   * On offer type mode, the slots are hidden
   *
   * @returns {boolean}
   */
  isTemplate() {
    return !(this.isEmpty(this.type) || this.type != 'template');
  }

  isPlanif() {
    return !(this.isEmpty(this.type) || this.type != 'planif');
  }

  isConcretOffer() {
    return this.isEmpty(this.type);
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }

  preventNull(str){
    return Utils.preventNull(str);
  }
}
