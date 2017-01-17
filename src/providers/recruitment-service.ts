import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Configs} from "../configurations/configs";
import {Utils} from "../app/utils/utils";

@Injectable()
export class RecruitmentService {
  configuration: any;

  constructor(public http: Http) {
  }

    insertGroupedRecruitment(accountId, jobyerId, jobId, offerId){
    let sql = "insert into user_recrutement_groupe (created, fk_user_account, fk_user_jobyer, fk_user_job, fk_user_offre_entreprise, signe) values (" +
      "'" + new Date().toISOString() + "', " +
      "" + accountId + ", " +
      "" + jobyerId + ", " +
      "" + jobId + ", " +
      "" + (Utils.isEmpty(offerId) ? null : offerId) + ", " +
      "'Non')";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getGroupedRecruitment(accountId, jobyerId, jobId, offerId){
    let sql = "select * from user_recrutement_groupe where fk_user_account = " + accountId + " and " +
      " fk_user_jobyer = " + jobyerId + " and " +
      " fk_user_job = " + jobId + " and " +
      (Utils.isEmpty(offerId) ? "" : " fk_user_offre_entreprise = " + offerId + " and ") +
      " upper(signe) = 'NON'";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  deleteGroupedRecruitment(accountId, jobyerId, jobId){
    let sql = "delete from user_recrutement_groupe where fk_user_account = " + accountId + " and fk_user_jobyer = " + jobyerId + " and fk_user_job = " + jobId + " and upper(signe) = 'NON'";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getNonSignedGroupedRecruitments(accountId){
    let sql = "select rg.created, j.pk_user_jobyer as id, j.nom, j.prenom, o.titre from user_jobyer as j, user_recrutement_groupe as rg " +
      " LEFT JOIN user_offre_entreprise as o  ON " +
      " rg.fk_user_offre_entreprise = o.pk_user_offre_entreprise " +
      " where rg.fk_user_account = " + accountId + " and " +
      " upper(rg.signe) = 'NON' and " +
      " rg.fk_user_jobyer = j.pk_user_jobyer " +
      " order by rg.created desc";

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
