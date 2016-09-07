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

  /**
     * @description update jobyer information
     * @param title, lastname, firstname, numSS, cni, nationalityId, roleId, birthdate, birthplace
     */
  updateJobyerCivility(title, lastname, firstname, numSS, cni, nationalityId, roleId, birthdate, birthplace){
      var sql = "";
      //building the sql request
      if (nationalityId){
          sql = "update user_jobyer set  " +
              "titre='" + title + "', " +
              "nom='" + lastname + "', " +
              "prenom='" + firstname + "', " +
              "numero_securite_sociale='" + numSS + "', " +
              "cni='" + cni + "', " +
              (!birthdate ? " " : "date_de_naissance ='"+ birthdate +"',") +
              "lieu_de_naissance ='" + birthplace + "', " +
              "fk_user_nationalite ='" + nationalityId + "' " +
              "where pk_user_jobyer ='" + roleId + "';";
      } else {
          sql = "update user_jobyer set  " +
              "titre='" + title + "', " +
              "nom='" + lastname + "', " +
              "prenom='" + firstname + "', " +
              "numero_securite_sociale='" + numSS + "', " +
              "cni='" + cni + "', " +
              (!birthdate ? " " : "date_de_naissance ='"+ birthdate +"',") +
              "lieu_de_naissance ='" + birthplace + "' " +
              "where pk_user_jobyer ='" + roleId + "';";
      }

      return new Promise(resolve => {
          let headers = Configs.getHttpTextHeaders();
          this.http.post(Configs.sqlURL, sql, {headers:headers})
              .map(res => res.json())
              .subscribe(data => {
                  resolve(data);
              });
      })
  }

  updateEmployerCivility(title, lastname, firstname, companyname, siret, ape, roleId, entrepriseId, medecineId){
        var sql = "update user_employeur set ";
        sql = sql + " titre='" + title + "' ";
        sql = sql + ", nom='" + lastname + "', prenom='" + firstname + "' where pk_user_employeur=" + roleId + ";";
        sql = sql + " update user_entreprise set nom_ou_raison_sociale='" + companyname + "' ";
        siret = (!siret ? "" : siret);
		sql = sql + " , siret='" + siret + "' ";
        //sql = sql + "urssaf='" + numUrssaf + "', ";
       //debugger;
        if(medecineId && medecineId>0)
            sql = sql + " , fk_user_medecine_de_travail='" + medecineId+ "' ";
        ape = (!ape ? "" : ape);
		sql = sql + " , ape_ou_naf='" + ape + "' where  pk_user_entreprise=" + entrepriseId;
        console.log(sql);
        return new Promise(resolve => {
            let headers = Configs.getHttpTextHeaders();
            this.http.post(Configs.sqlURL, sql, {headers:headers})
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                });
        })
    }

    updateRecruiterCivility(title, lastname, firstname, accountid){
        var sql = "update user_recruteur set ";
        sql = sql + " titre='" + title + "', ";
        sql = sql + " nom='" + lastname + "', prenom='" + firstname + "' where fk_user_account=" + accountid + ";";

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
