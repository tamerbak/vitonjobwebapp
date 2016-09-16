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
    selector: '[search-details]',
	template: require('./search-details.html'),
	encapsulation: ViewEncapsulation.None,
	styles: [require('./search-details.scss')],
	directives: [ROUTER_DIRECTIVES, AlertComponent, Widget, NKDatetime],
	providers: [OffersService, SearchService]
})

export class SearchDetails {
	fullTitle:string = '';
    fullName:string = '';
    matching:string = '';
	result: any;
    
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
	datepickerOpts: any;
	alerts: Array<Object>;
	temp: Date;
	
	constructor(private sharedService: SharedService,
				public offersService:OffersService,
				private router: Router){}
				
	ngOnInit(): void {
		jQuery('.select2').select2();
		
		this.currentUser = this.sharedService.getCurrentUser();
		this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer')
		
		this.result = this.sharedService.getSearchResult();
		this.offer = this.sharedService.getCurrentOffer();
		
		if (this.result.titreOffre)
            this.fullTitle = this.result.titreOffre;
        if (this.result.titreoffre)
            this.fullTitle = this.fullTitle + this.result.titreoffre;
			
		if (!this.currentUser.estEmployeur)
            this.fullName = this.result.entreprise;
        else
            this.fullName = this.result.titre + ' ' + this.result.prenom + ' ' + this.result.nom;
		this.matching = this.result.matching + "%";
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