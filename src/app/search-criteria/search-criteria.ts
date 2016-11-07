import {Component, ViewEncapsulation} from "@angular/core";
import {OffersService} from "../../providers/offer.service";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {NKDatetime} from "ng2-datetime/ng2-datetime";
import {Configs} from "../../configurations/configs";
import {CommunesService} from "../../providers/communes.service";
import {SearchService} from "../../providers/search-service";
import {Utils} from "../utils/utils";
declare var jQuery,Messenger: any;

@Component({
  selector: '[search-criteria]',
  template: require('./search-criteria.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./search-criteria.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent, NKDatetime],
  providers: [OffersService, CommunesService, SearchService]
})

export class SearchCriteria {
  currentUser: any;
  projectTarget: string;
  idSector: any;
  sectors: any = [];
  idJob: any;
  jobs: any = [];
  sector: any;
  job: any;
  availabilityDate: Date;
  alerts: Array<Object>;
  city: any;
  filters: any = [];
  datepickerOpts: any;
  hideJobLoader: boolean = true;

  constructor(private sharedService: SharedService,
              public offersService: OffersService,
              private communesService : CommunesService,
              private router: Router,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    } else {
      this.projectTarget = this.sharedService.getProjectTarget();
      //this.router.navigate(['home']);
    }
    this.buildFilters();
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
        this.hideJobLoader = true;
      })
    }

    //initialize options for datepicker
    //dateoption for slotDate
    this.datepickerOpts = {
      startDate: new Date(),
      autoclose: true,
      todayHighlight: true,
      format: 'dd/mm/yyyy',
      language: 'fr'
    };
  }

  sectorSelected(sector) {
    jQuery('.job-select').select2("val", "");
    let sectorsTemp = this.sectors.filter((v)=> {
      return (v.id == sector);
    });
    this.sector = sectorsTemp[0].libelle;
    //get job list
    let jobList = this.sharedService.getJobList();
    this.jobs = jobList.filter((v)=> {
      return (v.idsector == sector);
    });
  }

  jobSelected(idJob) {
    let jobsTemp = this.jobs.filter((v)=> {
      return (v.id == idJob);
    });
    this.job = jobsTemp[0].libelle;
  }

  validateSearch() {
    let ignoreSector: boolean = false;
    if (Utils.isEmpty(this.sector) || (this.job && this.job.length > 0))
      ignoreSector = true;
    if (Utils.isEmpty(this.job))
      this.job = '';
    if (Utils.isEmpty(this.city))
      this.city = '';

    let date = '';
    if (this.availabilityDate) {
      date = this.availabilityDate.getDate() + '/' + (this.availabilityDate.getMonth() + 1) + '/' + this.availabilityDate.getFullYear();
    }

    let searchFields = {
      class: 'com.vitonjob.callouts.recherche.SearchQuery',
      job: this.job,
      metier: (ignoreSector) ? '' : this.sector,
      lieu: this.city,
      nom: this.filters[2].value,
      entreprise: this.projectTarget == 'jobyer' ? this.filters[5].value : '',
      date: date,
      table: this.projectTarget == 'jobyer' ? 'user_offre_entreprise' : 'user_offre_jobyer',
      idOffre: '0'
    };
    console.log(JSON.stringify(searchFields));
    this.searchService.criteriaSearch(searchFields, this.projectTarget).then((data: any) => {
      this.sharedService.setLastResult(data);
      Messenger().post({
        message: "Votre recherche "+(data.length ==0 ?"n'":"")+"a donné " + (data.length == 0 ?"aucun résultat" : (data.length == 1 ? "un seul résultat":(data.length+' résultats'))),
        type: 'success',
        showCloseButton: true
      });
      this.router.navigate(['search/results']);
    });
  }

  ngAfterViewInit() {
    //city select
    jQuery('.city').select2({
      ajax: {
        url: Configs.sqlURL,
        type: 'POST',
        dataType: 'json',
        quietMillis: 250,
        transport: function(params){
          params.beforeSend = Configs.getSelect2TextHeaders();
          return jQuery.ajax(params);
        },
        data: this.communesService.getCitiesByTerm(),
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
    jQuery('.city').on('change',
      (e) => {
        this.city = e.added.nom;
      }
    );

    //sector and job select
    let self = this;
    // Initialize constraint between sector and job
    let sector = jQuery('.sector-select').select2();
    let job = jQuery('.job-select').select2();

    sector
      .val(this.idSector).trigger("change")
      .on("change", function (e) {
          self.sectorSelected(e.val);
        }
      );

    job
      .val(this.idJob).trigger("change")
      .on("change", function (e) {
          self.jobSelected(e.val);
        }
      );
  }

  /**
   * @descirption depending on the nature of the project this method constructs the required buttons and input for filters
   */
  buildFilters() {
    if (this.projectTarget == 'jobyer') {
      var filter = {
        title: 'Métier',
        field: 'metier',
        activated: false,
        placeHolder: 'Secteur',
        icon: 'pie',
        value: ''
      };

      this.filters.push(filter);

      filter = {
        title: 'Job',
        field: 'job',
        activated: false,
        placeHolder: 'Job',
        icon: 'briefcase',
        value: ''
      };

      this.filters.push(filter);

      filter = {
        title: 'Nom',
        field: 'nom',
        activated: false,
        placeHolder: 'Nom / Prénom',
        icon: 'person',
        value: ''
      };

      this.filters.push(filter);

      filter = {
        title: 'Localisation',
        field: 'lieu',
        activated: false,
        placeHolder: 'Rue, Ville, Code postal, ...',
        icon: 'pin',
        value: ''
      };

      this.filters.push(filter);

      filter = {
        title: 'Date de disponibilité',
        field: 'date',
        activated: false,
        placeHolder: 'JJ/MM/AAAA',
        icon: 'calendar',
        value: ''
      };

      this.filters.push(filter);

      filter = {
        title: 'Entreprise',
        field: 'entreprise',
        activated: false,
        placeHolder: 'Entreprise',
        icon: 'people',
        value: ''
      };

      this.filters.push(filter);

    } else {

      var filter = {
        title: 'Métier',
        field: 'metier',
        activated: false,
        placeHolder: 'Secteur',
        icon: 'pie',
        value: ''
      };

      this.filters.push(filter);

      filter = {
        title: 'Job',
        field: 'job',
        activated: false,
        placeHolder: 'Job',
        icon: 'briefcase',
        value: ''
      };

      this.filters.push(filter);

      filter = {
        title: 'Nom',
        field: 'nom',
        activated: false,
        placeHolder: 'Nom / Prénom',
        icon: 'person',
        value: ''
      };

      this.filters.push(filter);

      filter = {
        title: 'Localisation',
        field: 'lieu',
        activated: false,
        placeHolder: 'Rue, Ville, Code postal, ...',
        icon: 'pin',
        value: ''
      };

      this.filters.push(filter);

      filter = {
        title: 'Date de disponibilité',
        field: 'date',
        activated: false,
        placeHolder: 'JJ/MM/AAAA',
        icon: 'calendar',
        value: ''
      };

      this.filters.push(filter);
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
    let dateOptions = {
      weekday: "long", month: "long", year: "numeric",
      day: "numeric"//, hour: "2-digit", minute: "2-digit"
    };
    return new Date(date).toLocaleDateString('fr-FR', dateOptions);
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}
