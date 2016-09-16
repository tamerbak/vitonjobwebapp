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
    selector: '[offer-detail]',
	template: require('./offer-detail.html'),
	encapsulation: ViewEncapsulation.None,
	styles: [require('./offer-detail.scss')],
	directives: [ROUTER_DIRECTIVES, AlertComponent, Widget, NKDatetime],
	providers: [OffersService, SearchService]
})

export class OfferDetail {
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
		this.offer = this.sharedService.getCurrentOffer();
		//display alert if offer is obsolete
		if(this.offer.obsolete){
			this.addAlert("warning", "Attention: Cette offre est obsolète. Veuillez mettre à jour les créneaux de disponibilités.");
		}
		//load all sectors, if not yet loaded in local
		this.sectors = this.sharedService.getSectorList();
		if(!this.sectors || this.sectors.length == 0){
			this.offersService.loadSectorsToLocal().then((data: any) =>{
				this.sharedService.setSectorList(data);
				this.sectors = data;	
			})
		}
		//load all jobs, if not yet loaded in local
		var jobList = this.sharedService.getJobList();
		if(!jobList || jobList.length == 0){
			this.offersService.loadJobsToLocal().then((data: any) =>{
				this.sharedService.setJobList(data);
				//display selected job of the current offer
				this.sectorSelected(this.offer.jobData.idSector);
			})
		}else{
			//display selected job of the current offer
			this.sectorSelected(this.offer.jobData.idSector);
		}
		
		//load all qualities
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
		
		//display calendar slots of the current offer
		this.convertSlotsForDisplay();
		
		//init slot
		this.slot = {
            date: 0,
            startHour: 0,
            endHour: 0
		};	
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
	
	validateJob(){
		// --> Job state
		this.offer.title = this.offer.jobData.job+' '+((this.offer.jobData.level != 'junior')?'Expérimenté':'Débutant');
		
		this.offersService.updateOfferJob(this.offer, this.projectTarget);
		this.setOfferInLocal();
		this.addAlert("success", "Informations enregistrées avec succès.");
	}
	
	watchLevel(e){
		this.offer.jobData.level = e.target.value;
	}
	
	removeSlot(item) {
		/*for(let i = 0; i < this.offer.calendarData.length; i++){
			if(this.offer.calendarData[i].idCalendar == item.idCalendar){
				this.offer.calendarData.splice(i, 1);
				break;
			}
		}*/
		this.offer.calendarData.splice(this.offer.calendarData.indexOf(item), 1);
		this.convertSlotsForSaving();
		this.offersService.updateOfferCalendar(this.offer, this.projectTarget);
		this.sharedService.setCurrentOffer(this.offer);
	}
	
	addSlot(){
		this.convertSlotsForSaving();
		this.slot.date = this.slot.date.getTime();
		var h = this.slot.startHour.getHours() * 60;
		var m = this.slot.startHour.getMinutes();
		this.slot.startHour = h + m;
		h = this.slot.endHour.getHours() * 60;
		m = this.slot.endHour.getMinutes();
		this.slot.endHour = h + m;
		this.offer.calendarData.push(this.slot);
		
		this.offersService.updateOfferCalendar(this.offer, this.projectTarget).then(() => {
			this.sharedService.setCurrentOffer(this.offer);
			this.slot = {
				date: 0,
				startHour: 0,
				endHour: 0
			};
			this.convertSlotsForDisplay();
		})
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
		this.offersService.updateOfferQualities(this.offer, this.projectTarget);
		this.setOfferInLocal();
	}
	
	addQuality(){
		if(this.isEmpty(this.selectedQuality)){
			return;
		}
		//searching the selected quality in the list of qualities of the current offer
		var q1 = this.offer.qualityData.filter((v)=> {
			return (v.idQuality == this.selectedQuality);
		});
		//ignore the add request if quality is already added
		if(this.offer.qualityData.indexOf(q1[0]) != -1){
			return;	
		}
		//searching the selected quality in the generel list of qualities
		var q2 = this.qualities.filter((v)=> {
			return (v.idQuality == this.selectedQuality);
		});
		this.offer.qualityData.push(q2[0]);
		this.offersService.updateOfferQualities(this.offer, this.projectTarget);
		this.setOfferInLocal();
	}
	
	removeLanguage(item){
		this.offer.languageData.splice(this.offer.languageData.indexOf(item), 1);
		this.offersService.updateOfferLanguages(this.offer, this.projectTarget);
		this.setOfferInLocal();
	}
	
	addLanguage(){
		if(this.isEmpty(this.selectedLang)){
			return;
		}
		//searching the selected lang in the general list of langs
		var langTemp = this.langs.filter((v)=> {
			return (v.idLanguage == this.selectedLang);
		});
		//delete the lang from the cyurrent offer lang list, if already existant
		if(this.offer.languageData.indexOf(langTemp[0]) != -1){
			this.offer.languageData.splice(this.offer.languageData.indexOf(langTemp[0]), 1);
			
		}
		langTemp[0]['level'] = this.selectedLevel;
		this.offer.languageData.push(langTemp[0]);
		this.offersService.updateOfferQualities(this.offer, this.projectTarget);
		this.setOfferInLocal();
	}
	
    setOfferInLocal(){
		//set offer in local
		this.currentUser = this.offersService.spliceOfferInLocal(this.currentUser, this.offer, this.projectTarget);
		this.sharedService.setCurrentUser(this.currentUser);
		this.sharedService.setCurrentOffer(this.offer);
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