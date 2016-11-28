import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Configs} from "../configurations/configs";
import {DateUtils} from "../app/utils/date-utils";

@Injectable()
export class CandidatureService {
  configuration: any;

  constructor(public http: Http) {
  }

  getCandidatureOffre(offerId, jobyerId){
    let sql = "select * from user_candidatures_aux_offres where fk_user_offre_entreprise = " + offerId + " and fk_user_jobyer = " + jobyerId;

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  setCandidatureOffre(offerId, jobyerId){
    let sql = "insert into user_candidatures_aux_offres (date, fk_user_offre_entreprise, fk_user_jobyer) values ('" + DateUtils.sqlfy(new Date()) + "', " + offerId + ", " + jobyerId + ")";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  deleteCandidatureOffre(offerId, jobyerId){
    let sql = "delete from user_candidatures_aux_offres where fk_user_offre_entreprise = " + offerId + " and fk_user_jobyer = " + jobyerId;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getJobyersByOfferCandidature(offerId){
    let sql = "select a. * from user_account as a , user_jobyer as j, user_candidatures_aux_offres as co where co.fk_user_offre_entreprise = " + offerId + " and co.fk_user_jobyer = j.pk_user_jobyer and j.fk_user_account = a.pk_user_account";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
}