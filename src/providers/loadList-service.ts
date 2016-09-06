import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Configs} from '../configurations/configs';

@Injectable()
export class LoadListService {

	constructor(private http: Http) {

	}

	/**
		* @description load a list of nationalities
		* @return JSON results
	*/
	loadNationalities() {
		//  Init project parameters
		var sql = "select pk_user_nationalite, libelle from user_nationalite";

		return new Promise(resolve => {
			let headers = Configs.getHttpTextHeaders();

			this.http.post(Configs.sqlURL, sql, {headers:headers})
			.map(res => res.json())
			.subscribe(data => {
	            resolve(data);
			});
		})
	}
}
