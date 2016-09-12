import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Configs} from '../configurations/configs';

@Injectable()
export class OffersService {
    configuration;
	offerList:any;

    
    constructor(private http: Http) {
        this.http = http;
    }

    /**
     * @description Get the corresponding candidates of a specific offer
     * @param offer the reference offer
     * @param projectTarget the project target configuration (jobyer/employer)
     * @return {Promise<T>|Promise<R>|Promise} a promise of returning the candidates
     */
    getCorrespondingOffers(offer:any, projectTarget:string) {
        //  Init project parameters
        this.configuration = Configs.setConfigs(projectTarget);

        //  Get job and offer reference
        let job = offer.jobData.job;

        let table = (projectTarget === 'jobyer') ? 'user_offre_entreprise' : 'user_offre_jobyer';
        let sql = "select pk_"+table+" from "+table+" where dirty='N' and pk_"+table+" in (select fk_"+table+" from user_pratique_job where fk_user_job in ( select pk_user_job from user_job where lower_unaccent(libelle) % lower_unaccent('"+this.sqlfyText(job)+"')))";
        return new Promise(resolve => {
            let headers = new Headers();
            headers = Configs.getHttpTextHeaders();
            this.http.post(Configs.sqlURL, sql, {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.offerList = data.data;
                    resolve(this.offerList);
                });
        });
    }
	
	saveAutoSearchMode(projectTarget, idOffer, mode){
		let table = projectTarget == 'jobyer' ? "user_offre_jobyer":"user_offre_entreprise";
		let sql = "update "+table+" set recherche_automatique='"+ mode +"' where pk_"+table+"="+idOffer;
        console.log(sql);
		return new Promise(resolve => {
            let headers = new Headers();
            headers = Configs.getHttpTextHeaders();
            this.http.post(Configs.sqlURL, sql, {headers: headers})
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        });
	}
	
	convertToFormattedHour(value) {
        var hours = Math.floor(value / 60);
        var minutes = value % 60;
        if (!hours && !minutes) {
            return '';
        } else {
            return ((hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes));
        }
    }
	
	isEmpty(str){
		if(str == '' || str == 'null' || !str)
			return true;
		else
			return false;
	}
	
	sqlfy(d){
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" 00:00:00+00";
    }

    sqlfyText(text){
        if(!text || text.length == 0)
            return "";
        return text.replace(/'/g , "''")
    }
}