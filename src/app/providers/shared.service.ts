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
}
