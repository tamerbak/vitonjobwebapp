import {Injectable} from '@angular/core';

/**
	* @author Amal ROCHD
	* @description service shared between different components of the app
*/

@Injectable()
export class SharedService {
	/*currentUser: any;
	currentOffer: any;
	lastResult: any;
	sectorList = [];
	jobList = [];
	qualityList = [];
	langList = [];*/

	constructor() {

	}

	logOut(){
		this.setCurrentUser(null);
		this.setCurrentOffer(null);
		this.setLastResult(null);
		this.setSearchResult(null);
		this.setLangList(null);
		this.setQualityList(null);
		this.setJobList(null);
		this.setOptionMission(null);
	}

	setCurrentUser(user){
		localStorage.setItem('currentUser', JSON.stringify(user));
	}

	getCurrentUser(){
		return JSON.parse(localStorage.getItem('currentUser'));
		//return this.currentUser;
	}

	setCurrentOffer(offer){
		localStorage.setItem('currentOffer', JSON.stringify(offer));
	}

	getCurrentOffer(){
		return JSON.parse(localStorage.getItem('currentOffer'));
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

	setSearchResult(item){
		localStorage.setItem('searchResult', JSON.stringify(item));
	}

	getSearchResult(){
		return JSON.parse(localStorage.getItem('searchResult'));
	}

	setOptionMission(option){
		localStorage.setItem('optionMission', JSON.stringify(option));
	}

	getOptionMIssion(){
		return JSON.parse(localStorage.getItem('optionMission'));
	}
}
