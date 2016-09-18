import {Injectable} from '@angular/core';

/**
	* @author Amal ROCHD
	* @description service shared between different components of the app
*/

@Injectable()
export class SharedService {

	constructor() {

	}

	setCurrentUser(user){
		localStorage.setItem('currentUser', JSON.stringify(user));
	}

	getCurrentUser(){
		return JSON.parse(localStorage.getItem('currentUser'));
	}

	setCurrentOffer(offer){
		localStorage.setItem('currentOffer', JSON.stringify(offer));
	}

	getCurrentOffer(){
		return JSON.parse(localStorage.getItem('currentOffer'));
	}

	setCurrentMission(mission){
        localStorage.setItem('currentMission', JSON.stringify(mission));
	}

	getCurrentMission(){
        return JSON.parse(localStorage.getItem('currentMission'));
	}

	setCurrentInvoice(invoice){
        localStorage.setItem('currentInvoice', JSON.stringify(invoice));
	}

	getCurrentInvoice(){
        return JSON.parse(localStorage.getItem('currentInvoice'));
	}

	setLastResult(result){
		localStorage.setItem('lastResult', JSON.stringify(result));
	}

	getLastResult(){
		return JSON.parse(localStorage.getItem('lastResult'));
	}

	setSectorList(list){
		localStorage.setItem('sectorList', JSON.stringify(list));
	}

	getSectorList(){
		return JSON.parse(localStorage.getItem('sectorList'));
	}

	setJobList(list){
		localStorage.setItem('jobList', JSON.stringify(list));
	}

	getJobList(){
		return JSON.parse(localStorage.getItem('jobList'));
	}

	setQualityList(list){
		localStorage.setItem('qualityList', JSON.stringify(list));
	}

	getQualityList(){
		return JSON.parse(localStorage.getItem('qualityList'));
	}

	setLangList(list){
		localStorage.setItem('langList', JSON.stringify(list));
	}

	getLangList(){
		return JSON.parse(localStorage.getItem('langList'));
	}


}
