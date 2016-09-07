import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Configs} from '../configurations/configs';

/**
 * @author Amal ROCHD
 * @description web service access point for user authentication and inscription
 * @module Authentication
 */

@Injectable()
export class AuthenticationService {
    configuration;
    
    constructor(private http: Http) {
        this.http = http;
    }

    /**
		* @description get user information by his phone and role
		* @param phone, role
		* @return JSON results in the form of user accounts
	*/
	getUserByPhone(tel, role){
		//  Init project parameters
		this.configuration = Configs.setConfigs(role);
		var sql= "select pk_user_account, email, role from user_account where telephone = '"+tel+"'";
		return new Promise(resolve => {
			let headers = Configs.getHttpTextHeaders();
			this.http.post(this.configuration.sqlURL, sql, {headers:headers})
	          .map(res => res.json())
	          .subscribe(data => {
	            resolve(data);
	          });
	    })
	}
	
	/**
		* @description get user information by his mail and role
		* @param mail, role
		* @return JSON results in the form of user accounts
	*/
	getUserByMail(mail, role){
		//  Init project parameters
		this.configuration = Configs.setConfigs(role);

		role = (role === 'employer') ? 'employeur' : role;
		var sql = "select pk_user_account, email, telephone, role from user_account where LOWER(email) = lower_unaccent('"+mail+"')";

	    return new Promise(resolve => {
			let headers = Configs.getHttpTextHeaders();
			this.http.post(this.configuration.sqlURL, sql, {headers:headers})
	          .map(res => res.json())
	          .subscribe(data => {
	            resolve(data);
	          });
	    })
	}
	
	/**
     * @description Insert a user_account if it does not exist
     * @param email, phone, password, role
     * @return JSON results in the form of user accounts
     */
    authenticate(email, phone, password, projectTarget, isRecruteur){
       //debugger;
        //  Init project parameters
        this.configuration = Configs.setConfigs(projectTarget);

        //Prepare the request
        var login: any =
        {
            'class': 'com.vitonjob.callouts.auth.AuthToken',
            'email': email,
            'telephone': "+" + phone,
            'password': password,
            'role': (isRecruteur ? 'recruteur' : (projectTarget == 'employer' ? 'employeur' : projectTarget))
        };
        login = JSON.stringify(login);

        var encodedLogin = btoa(login);
        var dataLog = {
            'class': 'fr.protogen.masterdata.model.CCallout',
            'id': 240,
            'args': [{
                'class': 'fr.protogen.masterdata.model.CCalloutArguments',
                label: 'requete authentification',
                value: encodedLogin
            }]
        };
        let body = JSON.stringify(dataLog);
        console.log(body);
       //debugger;
        return new Promise(resolve => {
            let headers = Configs.getHttpJsonHeaders();
            this.http.post(this.configuration.calloutURL, body, {headers:headers})
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        })
    }
	
	isEmpty(str){
		if(str == '' || str == 'null' || !str)
			return true;
		else
			return false;
	}
}