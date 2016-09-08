import { Injectable } from '@angular/core';

/**
	* @author Amal ROCHD
	* @description service for validating different data
*/

@Injectable()
export class ValidationDataService {
	constructor() {
	}
	
	/**
		* @description check if an email is valid
		* @param id of the email component
	*/
	checkEmail(email) {
      var EMAIL_REGEXP = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
      var isMatchRegex = EMAIL_REGEXP.test(email);
      return isMatchRegex;
    }
}
