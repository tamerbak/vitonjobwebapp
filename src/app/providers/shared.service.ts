import {Injectable} from '@angular/core';

/**
	* @author Amal ROCHD
	* @description service shared between different components of the app
*/

@Injectable()
export class SharedService {
	currentUser: any;
	
	constructor() {
		
	}
	
	setCurrentUser(user){
		this.currentUser = user;
	}
	
	getCurrentUser(){
		return this.currentUser;
	}
	
	
	
	
}
