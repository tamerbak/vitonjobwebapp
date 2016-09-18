import {Component} from '@angular/core';
import {OffersService} from "../providers/offer.service";
import {SharedService} from "../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';import {GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

declare var jQuery: any;

@Component({
    selector: '[search-details]',
	template: require('./search-details.html'),
	styles: [require('./search-details.scss')],
	directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES],
	providers: [OffersService]
})

export class SearchDetails {
	currentUser: any;
	offer: any;
	result: any;
    fullTitle:string = '';
    fullName:string = '';
    matching:string = '';
	avatar: string;
	lat: number; 
	lng: number;
	zoom: number;
	languages:any[];
    qualities:any[];
	
	constructor(private sharedService: SharedService,
	public offersService:OffersService,
	private router: Router){}
	
	ngOnInit(): void {
		this.currentUser = this.sharedService.getCurrentUser();
		this.result = this.sharedService.getSearchResult();
		this.offer = this.sharedService.getCurrentOffer();
		
		//get offer title, employer/jobyer name and matching
		if (this.result.titreOffre)
		this.fullTitle = this.result.titreOffre;
        if (this.result.titreoffre)
		this.fullTitle = this.fullTitle + this.result.titreoffre;
		if (!this.currentUser.estEmployeur)
		this.fullName = this.result.entreprise;
        else
		this.fullName = this.result.titre + ' ' + this.result.prenom + ' ' + this.result.nom;
		this.matching = this.result.matching + "%";
		
		//load markers
		this.lat = + this.result.latitude;
		this.lng = + this.result.longitude;
		this.zoom = 12;
		
		//get qualities and langs of the selected offer	
		let table = this.currentUser.estEmployeur ? 'user_offre_jobyer' : 'user_offre_entreprise';
		let idOffers = [];
        idOffers.push(this.result.idOffre);
		this.offersService.getOffersLanguages(idOffers, table).then((data: any) => {
			if (data)
				this.languages = data;
		});
		this.offersService.getOffersQualities(idOffers, table).then((data: any)=> {
			if (data)
				this.qualities = data;
		});
	}

	isEmpty(str){
		if(str == '' || str == 'null' || !str)
		return true;
		else
		return false;
	}
}