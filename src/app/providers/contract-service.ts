import {Injectable} from '@angular/core';
import {Configs} from '../../configurations/configs';
import {Http, Headers} from '@angular/http';

/**
 * @author daoudi amine
 * @description services for contracts yousign
 * @module Contract
 */
@Injectable()
export class ContractService {
    data: any = null;
    configuration : any;

    constructor(public http: Http) {

    }

    /**
     * @description get employer Entreprise contracts
     * @param employerEntrepriseId
     * @return JSON results in form of created contract Id
     */
    getContracts(id:number,projectTarget:string){
        //  Init project parameters
        this.configuration = Configs.setConfigs(projectTarget);
        if(projectTarget == 'employer'){
            var sql = "SELECT c.pk_user_contrat,c.*, j.nom, j.prenom FROM user_contrat as c, user_jobyer as j where c.fk_user_jobyer = j.pk_user_jobyer and c.fk_user_entreprise ='"+id+"' order by c.pk_user_contrat";
        }else{
            var sql = "SELECT c.pk_user_contrat,c.*, e.nom_ou_raison_sociale as nom FROM user_contrat as c, user_entreprise as e where c.fk_user_entreprise = e.pk_user_entreprise and c.fk_user_jobyer ='"+id+"' order by c.pk_user_contrat";
        }

        console.log(sql);

        return new Promise(resolve => {
            let headers = new Headers();
            headers = Configs.getHttpTextHeaders();
            this.http.post(this.configuration.sqlURL, sql, {headers:headers})
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });
    }

}

