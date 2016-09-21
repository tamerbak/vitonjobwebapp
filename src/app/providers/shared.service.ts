import {Injectable} from '@angular/core';

/**
	* @author Amal ROCHD
	* @description service shared between different components of the app
*/

@Injectable()
export class SharedService {
	stockageType: string;
	
	constructor() {
		this.stockageType = localStorage.getItem('stockageType');

	}
	
	logOut() {
		this.setCurrentUser(null);
		this.setCurrentOffer(null);
		this.setLastResult(null);
		this.setSearchResult(null);
		this.setLangList(null);
		this.setQualityList(null);
		this.setJobList(null);
		this.setOptionMission(null);
		this.setProfilImageUrl(null);
	}
	
	setStorageType(value) {
        localStorage.setItem('stockageType', value);
    }

    getStorageType() {
        return localStorage.getItem('stockageType');
    }
	
	setProjectTarget(value) {
		if(this.stockageType == "local")
			localStorage.setItem('projectTarget', value);
		else
			sessionStorage.setItem('projectTarget', value);
    }

    getProjectTarget() {
        if(this.stockageType == "local")
			return localStorage.getItem('projectTarget');
		else
			return sessionStorage.getItem('projectTarget');
    }
	
	setCurrentUser(user) {
		if(this.stockageType == "local")
			localStorage.setItem('currentUser', JSON.stringify(user));
		else
			sessionStorage.setItem('currentUser', JSON.stringify(user));
	}
	
	getCurrentUser() {
		if(this.stockageType == "local")
			return JSON.parse(localStorage.getItem('currentUser'));
		else
			return JSON.parse(sessionStorage.getItem('currentUser'));
	}
	
	setCurrentOffer(offer) {
		if(this.stockageType == "local")
			localStorage.setItem('currentOffer', JSON.stringify(offer));
		else
			sessionStorage.setItem('currentOffer', JSON.stringify(offer));
	}
	
	getCurrentOffer() {
		if(this.stockageType == "local")
			return JSON.parse(localStorage.getItem('currentOffer'));
		else
			return JSON.parse(sessionStorage.getItem('currentOffer'));
	}
	
	setCurrentMission(mission) {
		if(this.stockageType == "local")
			localStorage.setItem('currentMission', JSON.stringify(mission));
		else
			sessionStorage.setItem('currentMission', JSON.stringify(mission));
	}
	
	getCurrentMission() {
		if(this.stockageType == "local")
			return JSON.parse(localStorage.getItem('currentMission'));
		else
			return JSON.parse(sessionStorage.getItem('currentMission'));
	}
	
	setCurrentInvoice(invoice) {
		if(this.stockageType == "local")
			localStorage.setItem('currentInvoice', JSON.stringify(invoice));
		else
			sessionStorage.setItem('currentInvoice', JSON.stringify(invoice));
	}
	
	getCurrentInvoice() {
		if(this.stockageType == "local")
			return JSON.parse(localStorage.getItem('currentInvoice'));
		else
			return JSON.parse(sessionStorage.getItem('currentInvoice'));
	}
	
	setLastResult(result) {
		if(this.stockageType == "local")
			localStorage.setItem('lastResult', JSON.stringify(result));
		else
			sessionStorage.setItem('lastResult', JSON.stringify(result));
	}
	
	getLastResult() {
		if(this.stockageType == "local")
			return JSON.parse(localStorage.getItem('lastResult'));
		else
			return JSON.parse(sessionStorage.getItem('lastResult'));
	}
	
	setSectorList(list) {
		if(this.stockageType == "local")
			localStorage.setItem('sectorList', JSON.stringify(list));
		else
			sessionStorage.setItem('sectorList', JSON.stringify(list));
	}
	
	getSectorList() {
		if(this.stockageType == "local")
			return JSON.parse(localStorage.getItem('sectorList'));
		else
			return JSON.parse(sessionStorage.getItem('sectorList'));
	}
	
	setJobList(list) {
		if(this.stockageType == "local")
			localStorage.setItem('jobList', JSON.stringify(list));
		else
			sessionStorage.setItem('jobList', JSON.stringify(list));
	}
	
	getJobList() {
		if(this.stockageType == "local")
			return JSON.parse(localStorage.getItem('jobList'));
		else
			return JSON.parse(sessionStorage.getItem('jobList'));
	}
	
	setQualityList(list) {
		if(this.stockageType == "local")
			localStorage.setItem('qualityList', JSON.stringify(list));
		else
			sessionStorage.setItem('qualityList', JSON.stringify(list));
	}
	
	getQualityList() {
		if(this.stockageType == "local")
			return JSON.parse(localStorage.getItem('qualityList'));
		else
			return JSON.parse(sessionStorage.getItem('qualityList'));
	}
	
	setLangList(list) {
		if(this.stockageType == "local")
			localStorage.setItem('langList', JSON.stringify(list));
		else
			sessionStorage.setItem('langList', JSON.stringify(list));
	}
	
	getLangList() {
		if(this.stockageType == "local")
			return JSON.parse(localStorage.getItem('langList'));
		else
			return JSON.parse(sessionStorage.getItem('langList'));
	}
	
	setSearchResult(item) {
		if(this.stockageType == "local")
			localStorage.setItem('searchResult', JSON.stringify(item));
		else
			sessionStorage.setItem('searchResult', JSON.stringify(item));
	}
	
	getSearchResult() {
		if(this.stockageType == "local")
			return JSON.parse(localStorage.getItem('searchResult'));
		else
			return JSON.parse(sessionStorage.getItem('searchResult'));
	}
	
	setOptionMission(option) {
		if(this.stockageType == "local")
			localStorage.setItem('optionMission', JSON.stringify(option));
		else
			sessionStorage.setItem('optionMission', JSON.stringify(option));
	}
	
	getOptionMIssion() {
		if(this.stockageType == "local")
			return JSON.parse(localStorage.getItem('optionMission'));
		else
			return JSON.parse(sessionStorage.getItem('optionMission'));
	}
	
	setProfilImageUrl(str){
		if(this.stockageType == "local")
			localStorage.setItem('profilImage', str);
		else
			sessionStorage.setItem('profilImage', str);
	}

	getProfilImageUrl(){
		if(this.stockageType == "local"){
			var image = localStorage.getItem('profilImage');
			if(image !== 'null'){
				return localStorage.getItem('profilImage');
			}
		}else{
			var image = sessionStorage.getItem('profilImage');
			if(image !== 'null'){
				return sessionStorage.getItem('profilImage');
			}
		}
		return 'assets/images/people/a5.jpg';
	}
}