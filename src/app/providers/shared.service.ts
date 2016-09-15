import {Injectable} from '@angular/core';

/**
	* @author Amal ROCHD
	* @description service shared between different components of the app
*/

@Injectable()
export class SharedService {
	currentUser: any;
	currentOffer: any;
	currentMission: any;
	lastResult: any;

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

	setCurrentMission(mission){
		this.currentMission = mission;
	}

	getCurrentMission(){
		return this.currentMission;
	}

	setLastResult(result){
		this.lastResult = result;
	}

	getLastResult(){
		return this.lastResult;
	}
}
