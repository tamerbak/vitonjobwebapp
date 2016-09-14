import {Component, ViewEncapsulation} from '@angular/core';
import {OffersService} from "../providers/offer.service";
import {SharedService} from "../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AlertComponent} from 'ng2-bootstrap/components/alert';
import {SearchService} from "../providers/search-service";
import {Widget} from '../core/widget/widget';
import {NKDatetime} from 'ng2-datetime/ng2-datetime';
declare var jQuery: any;

@Component({
    selector: '[offer-add]',
	template: require('./offer-add.html'),
	encapsulation: ViewEncapsulation.None,
	styles: [require('./offer-add.scss')],
	directives: [ROUTER_DIRECTIVES, AlertComponent, Widget, NKDatetime],
	providers: [OffersService, SearchService]
})

export class OfferAdd {
	offer: any;
	sectors:any = [];
    jobs:any = [];
	selectedSector: any;
	qualities = [];
	langs = [];
	projectTarget: string;
	currentUser: any;
	slot: any;
	selectedQuality: any;
	selectedLang: any;
	selectedLevel = "junior";
	
	alerts: Array<Object>;
	
	constructor(private sharedService: SharedService,
				public offersService:OffersService,
				private router: Router){}
				
	ngOnInit(): void {
		jQuery('.select2').select2();
		
		this.currentUser = this.sharedService.getCurrentUser();
		this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer')
		
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
		
		//load sectors
		this.sectors = this.sharedService.getSectorList();
		if(!this.sectors || this.sectors.length == 0){
			this.offersService.loadSectorsToLocal().then((data: any) =>{
				this.sharedService.setSectorList(data);
				this.sectors = data;	
			})
		}
		
		//load jobs
		var jobList = this.sharedService.getJobList();
		if(!jobList || jobList.length == 0){
			this.offersService.loadJobsToLocal().then((data: any) =>{
				this.sharedService.setJobList(data);
			})
		}
		
		//init slot
		this.slot = {
            date: 0,
            startHour: 0,
            endHour: 0
		};
		
		//loadQualities
		this.qualities = this.sharedService.getQualityList();
		if(!this.qualities || this.qualities.length == 0){
			this.offersService.loadQualities(this.projectTarget).then((data: any) =>{
				this.qualities = data.data;
				this.sharedService.setQualityList(this.qualities);
			})
		}
		
		//loadLanguages
		this.langs = this.sharedService.getLangList();
		if(!this.langs || this.langs.length == 0){
			this.offersService.loadLanguages(this.projectTarget).then((data: any) =>{
				this.langs = data.data;
				this.sharedService.setLangList(this.langs);
			})
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
	
	jobSelected(idJob) {
		this.offer.jobData.idJob = idJob;
		var jobsTemp = this.jobs.filter((v)=> {
			return (v.id == idJob);
		});
		this.offer.jobData.job = jobsTemp[0].libelle;
    }
	
	watchLevel(e){
		this.offer.jobData.level = e.target.value;
	}
	
	removeSlot(item) {
		this.offer.calendarData.splice(this.offer.calendarData.indexOf(item), 1);
	}
	
	addSlot(){
		this.offer.calendarData.push(this.slot);
		this.slot = {
				date: 0,
				startHour: 0,
				endHour: 0
			};
	}

	convertSlotsForDisplay(){
		for(let i = 0; i < this.offer.calendarData.length; i++){
			this.offer.calendarData[i].date = new Date(this.offer.calendarData[i].date);
			var hour = this.toHourString(this.offer.calendarData[i].startHour)
			this.offer.calendarData[i].startHour = new Date(this.offer.calendarData[i].date.setHours(hour.split(':')[0], hour.split(':')[1]));
			hour = this.toHourString(this.offer.calendarData[i].endHour)
			this.offer.calendarData[i].endHour = new Date(this.offer.calendarData[i].date.setHours(hour.split(':')[0], hour.split(':')[1]));
		}
	}
	
	//convert existant slots
	convertSlotsForSaving(){
		for(let i = 0; i < this.offer.calendarData.length; i++){
			this.offer.calendarData[i].date = this.offer.calendarData[i].date.getTime();
			var h = this.offer.calendarData[i].startHour.getHours() * 60;
			var m = this.offer.calendarData[i].startHour.getMinutes();
			this.offer.calendarData[i].startHour = h + m;
			h = this.offer.calendarData[i].endHour.getHours() * 60;
			m = this.offer.calendarData[i].endHour.getMinutes();
			this.offer.calendarData[i].endHour = h + m;
		}
	}
	
	removeQuality(item){
		this.offer.qualityData.splice(this.offer.qualityData.indexOf(item), 1);
	}
	
	addQuality(){
		if(this.isEmpty(this.selectedQuality)){
			return;
		}
		var qualitiesTemp = this.qualities.filter((v)=> {
			return (v.idQuality == this.selectedQuality);
		});
		if(this.offer.qualityData.indexOf(qualitiesTemp[0]) != -1){
			return;	
		}
		this.offer.qualityData.push(qualitiesTemp[0]);
	}
	
	removeLanguage(item){
		this.offer.languageData.splice(this.offer.languageData.indexOf(item), 1);
	}
	
	addLanguage(){
		if(this.isEmpty(this.selectedLang)){
			return;
		}
		var langTemp = this.langs.filter((v)=> {
			return (v.idLanguage == this.selectedLang);
		});
		if(this.offer.languageData.indexOf(langTemp[0]) != -1){
			this.offer.languageData.splice(this.offer.languageData.indexOf(langTemp[0]), 1);
			
		}
		langTemp[0]['level'] = this.selectedLevel;
		this.offer.languageData.push(langTemp[0]);
	}
	
	addOffer(){
		if(!this.offer.jobData.job || !this.offer.jobData.sector || !this.offer.jobData.remuneration || !this.offer.calendarData || this.offer.calendarData.length == 0){
			this.addAlert("warning", "Veuillez saisir les détails du job, ainsi que les disponibilités pour pouvoir valider.");
			return;
		}
		
		let level = (this.offer.jobData.level === 'senior') ? 'Expérimenté' : 'Débutant'
		this.offer.title = this.offer.jobData.job + " " + level;
		this.offer.identity = (this.projectTarget == 'employer' ? this.currentUser.employer.entreprises[0].id : this.currentUser.jobyer.id);
		this.convertSlotsForSaving();
		this.offersService.setOfferInRemote(this.offer, this.projectTarget).then(data => {
			if(this.projectTarget == 'employer'){
				this.currentUser.employer.entreprises[0].offers.push(this.offer);
				
			}else{
				this.currentUser.jobyer.offers.push(this.offer);
			} 
			this.router.navigate(['app/offer/list']);
		});
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