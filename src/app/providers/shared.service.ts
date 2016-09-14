import {Injectable} from '@angular/core';

/**
	* @author Amal ROCHD
	* @description service shared between different components of the app
*/

@Injectable()
export class SharedService {
	currentUser: any;
	currentOffer: any;
	lastResult: any;
	sectorList = [];
	jobList = [];
	qualityList = [];
	langList = [];
	
	constructor() {
		
	}
	
	setCurrentUser(user){
		this.currentUser = user;
	}
	
	getCurrentUser(){
		return this.currentUser;
	}
	
	setCurrentOffer(offer){
		this.currentOffer = offer;
	}
	
	getCurrentOffer(){
		return this.currentOffer;
	}
	
	setLastResult(result){
		this.lastResult = result;
	}
	
	getLastResult(){
		return this.lastResult;
	}
	
	setSectorList(list){
		this.sectorList = list;
	}
	
	getSectorList(){
		return this.sectorList;
	}
	
	setJobList(list){
		this.jobList = list;
	}
	
	getJobList(){
		return this.jobList;
	}
	
	setQualityList(list){
		this.qualityList = list;
	}
	
	getQualityList(){
		return this.qualityList;
	}
	
	setLangList(list){
		this.langList = list;
	}
	
	getLangList(){
		return this.langList;
	}
}