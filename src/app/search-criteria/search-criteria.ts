import {Component, ViewEncapsulation} from '@angular/core';
import {OffersService} from "../../providers/offer.service";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AlertComponent} from 'ng2-bootstrap/components/alert';
import {NKDatetime} from 'ng2-datetime/ng2-datetime';
import {Configs} from "../configurations/configs";
import {CommunesService} from "../../providers/communes.service";
import {SearchService} from "../../providers/search-service";
declare var jQuery: any;

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
	sectors:any = [];
    idJob: any;
	jobs:any = [];
	sector: any;
	job: any;
	availabilityDate: Date;
	alerts: Array<Object>;
	city: any;
	filters:any = [];

	constructor(private sharedService: SharedService,
				public offersService:OffersService,
				private router: Router,
				private searchService: SearchService){}

	ngOnInit(): void {
		this.currentUser = this.sharedService.getCurrentUser();
		if(this.currentUser){
			this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
		}else{
			this.projectTarget = this.sharedService.getProjectTarget();
		}
		this.buildFilters();
		//load all sectors, if not yet loaded in local
		this.sectors = this.sharedService.getSectorList();
		if(!this.sectors || this.sectors.length == 0){
			this.offersService.loadSectorsToLocal().then((data: any) =>{
				this.sharedService.setSectorList(data);
				this.sectors = data;
			})
		}
		//load all jobs, if not yet loaded in local
		let jobList = this.sharedService.getJobList();
		if(!jobList || jobList.length == 0){
			this.offersService.loadJobsToLocal().then((data: any) =>{
				this.sharedService.setJobList(data);
			})
		}
	}

	sectorSelected(sector) {
		let sectorsTemp = this.sectors.filter((v)=> {
			return (v.id == sector);
		});
		//get job list
		let jobList = this.sharedService.getJobList();
		this.jobs = jobList.filter((v)=> {
			return (v.idsector == sector);
		});
		this.sector = sectorsTemp[0].libelle;
	}

	jobSelected(idJob) {
		let jobsTemp = this.jobs.filter((v)=> {
			return (v.id == idJob);
		});
		this.job = jobsTemp[0].libelle;
	}

	validateSearch(){
		let ignoreSector: boolean = false;
        if(this.isEmpty(this.sector) || (this.job && this.job.length>0))
            ignoreSector = true;
        if(this.isEmpty(this.job))
            this.job = '';
        if(this.isEmpty(this.city))
            this.city = '';

        let date = '';
        if(this.availabilityDate){
		date = this.availabilityDate.getDate() + '/' + (this.availabilityDate.getMonth() + 1) + '/' + this.availabilityDate.getFullYear();
        }

        let searchFields = {
            class: 'com.vitonjob.callouts.recherche.SearchQuery',
            job: this.job,
            metier: (ignoreSector)? '' : this.sector,
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
			this.router.navigate(['app/search/results']);
        });
	}

	ngAfterViewInit(){
		jQuery('.city').select2({
			ajax: {
				url: Configs.sqlURL,
				type: 'POST',
				dataType: 'json',
				quietMillis: 250,
				params: {
					contentType: "text/plain",
				},
				data: function (term, page) {
					return "select pk_user_ville as id, nom from user_ville where lower_unaccent(nom) % lower_unaccent('"+term+"') order by nom asc limit 5";
				},
				results: function (data, page) {
					return { results: data.data };
				},
				cache: true
			},
			formatResult: function(item) {
				return  item.nom;
			},
			formatSelection: function(item) {
				return item.nom;
			},
			dropdownCssClass: "bigdrop",
			escapeMarkup: function (markup) { return markup; },
			minimumInputLength: 3,
		});
        jQuery('.city').on('change',
		(e) =>
		{
			this.city = e.added.nom;
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
    toHourString(time:number) {
        let minutes = (time % 60) < 10 ? "0" + (time % 60).toString() : (time % 60).toString();
        let hours = Math.trunc(time / 60) < 10 ? "0" + Math.trunc(time / 60).toString() : Math.trunc(time / 60).toString();
        return hours + ":" + minutes;
	}

	/**
		* @Description Converts a timeStamp to date string :
		* @param date : a timestamp date
	*/
    toDateString(date:number) {
		let dateOptions = {
            weekday: "long", month: "long", year: "numeric",
            day: "numeric"//, hour: "2-digit", minute: "2-digit"
		};
        return new Date(date).toLocaleDateString('fr-FR', dateOptions);
	}

	addAlert(type, msg): void {
		this.alerts = [{type: type, msg: msg}];
	}

	isEmpty(str){
		if(str == '' || str == 'null' || !str)
		return true;
		else
		return false;
	}
}
