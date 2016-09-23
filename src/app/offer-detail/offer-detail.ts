import {Component, ViewEncapsulation} from '@angular/core';
import {OffersService} from "../providers/offer.service";
import {SharedService} from "../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AlertComponent} from 'ng2-bootstrap/components/alert';
import {NKDatetime} from 'ng2-datetime/ng2-datetime';

@Component({
	selector: '[offer-detail]',
	template: require('./offer-detail.html'),
	encapsulation: ViewEncapsulation.None,
	styles: [require('./offer-detail.scss')],
	directives: [ROUTER_DIRECTIVES, AlertComponent, NKDatetime],
	providers: [OffersService]
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
	slots = [];
	selectedQuality: any;
	selectedLang: any;
	selectedLevel = "junior";
	alerts: Array<Object>;
	hideJobLoader: boolean = true;
	
	constructor(private sharedService: SharedService,
	public offersService:OffersService,
	private router: Router){
		this.currentUser = this.sharedService.getCurrentUser();
		if(!this.currentUser){
			this.router.navigate(['app/dashboard']);
		}
	}
	
	ngOnInit(): void {
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
			this.hideJobLoader = false;
			this.offersService.loadJobsToLocal().then((data: any) =>{
				this.sharedService.setJobList(data);
				//display selected job of the current offer
				this.sectorSelected(this.offer.jobData.idSector);
				this.hideJobLoader = true;
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
	
	removeSlot(i) {
		this.offer.calendarData.splice(i, 1);
		this.offersService.updateOfferCalendar(this.offer, this.projectTarget);
		this.sharedService.setCurrentOffer(this.offer);
		this.slots = [];
		this.convertSlotsForDisplay();
	}
	
	addSlot(){
		if(this.slot.date == 0 || this.slot.startHour == 0 || this.slot.endHour == 0){
			return;
		}
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
			this.slots = [];
			this.convertSlotsForDisplay();
		});
		//reset datetime component
		let elements: NodeListOf<Element> = document.getElementById('slotDate').getElementsByClassName('form-control');
		(<HTMLInputElement>elements[0]).value = null;
		elements = document.getElementById('slotSHour').getElementsByClassName('form-control');
		(<HTMLInputElement>elements[0]).value = null;
		elements = document.getElementById('slotEHour').getElementsByClassName('form-control');
		(<HTMLInputElement>elements[0]).value = null;
		this.slot = {
			date: 0,
			startHour: 0,
			endHour: 0
		};
	}
	
	convertSlotsForDisplay(){
		for(let i = 0; i < this.offer.calendarData.length; i++){
			var slotTemp = {
				date: this.toDateString(this.offer.calendarData[i].date),
				startHour: this.toHourString(this.offer.calendarData[i].startHour),
				endHour: this.toHourString(this.offer.calendarData[i].endHour)
			};
			this.slots.push(slotTemp);
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
		this.offersService.updateOfferLanguages(this.offer, this.projectTarget);
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
	
	/**
		* @Description Converts a timeStamp to date string :
		* @param date : a timestamp date
	*/
	toDateString(date:number) {
		var dateOptions = {
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
	
	ngOnDestroy(): void {
		this.sharedService.setCurrentOffer(null);
	}
}