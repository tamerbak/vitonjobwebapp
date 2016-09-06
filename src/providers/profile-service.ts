import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Configs} from '../configurations/configs';


@Injectable()
export class ProfileService {
    http:any;

    constructor(http: Http) {
      this.http = http;
    }

    countEntreprisesByRaisonSocial(companyname: string){
        var sql = "select count(*) from user_entreprise where nom_ou_raison_sociale='" + companyname + "';";
        console.log(sql);
        return new Promise(resolve => {
            let headers = new Headers();
            headers = Configs.getHttpTextHeaders();
            this.http.post(Configs.sqlURL, sql, {headers:headers})
			.map(res => res.json())
			.subscribe(data => {
				console.log(data);
				resolve(data);
			});
		});
	}

	countEntreprisesBySIRET(siret){
		var sql = "select count(*) from user_entreprise where siret='" + siret + "';";
        console.log(sql);
        return new Promise(resolve => {
            let headers = new Headers();
            headers = Configs.getHttpTextHeaders();
            this.http.post(Configs.sqlURL, sql, {headers:headers})
			.map(res => res.json())
			.subscribe(data => {
				console.log(data);
				resolve(data);
			});
		});
	}

}
