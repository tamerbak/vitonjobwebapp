import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Configs} from "../configurations/configs";
import {Utils} from "../app/utils/utils";
import {CalendarQuarter} from "../dto/calendar-quarter";
import {CalendarQuarterPerDay} from "../dto/CalendarQuarterPerDay";
import {CalendarSlot} from "../dto/calendar-slot";

@Injectable()
export class RecruitmentService {
  configuration: any;

  constructor(public http: Http) {
  }

    insertGroupedRecruitment(accountId, jobyerId, jobId, offerId){
    let sql = "insert into user_recrutement_groupe (created, fk_user_account, fk_user_jobyer, fk_user_job, fk_user_offre_entreprise, en_contrat) values (" +
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
      " upper(en_contrat) = 'NON'";

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
    let sql = "delete from user_recrutement_groupe where fk_user_account = " + accountId + " and fk_user_jobyer = " + jobyerId + " and fk_user_job = " + jobId + " and upper(en_contrat) = 'NON'";

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
    let sql = "select rg.pk_user_recrutement_groupe as \"rgId\", rg.created, j.pk_user_jobyer as id, j.nom, j.prenom, o.titre, o.pk_user_offre_entreprise as \"offerId\" from user_jobyer as j, user_recrutement_groupe as rg " +
      " LEFT JOIN user_offre_entreprise as o  ON " +
      " rg.fk_user_offre_entreprise = o.pk_user_offre_entreprise " +
      " where rg.fk_user_account = " + accountId + " and " +
      " upper(rg.en_contrat) = 'NON' and " +
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

  updateRecrutementGroupeState(rgId){
    let sql = "update user_recrutement_groupe set en_contrat = 'Oui' where " +
      " pk_user_recrutement_groupe = " + rgId;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  /**
   * Translate slots into quarts
   */
  loadSlots(slots: CalendarSlot[]): CalendarQuarterPerDay {
    let slotsPerJobyer = [];
    // slots = this.offer.calendarData;

    let slotsPerDay = new CalendarQuarterPerDay();
    for (let i: number = 0; i < slots.length; ++i) {

      let quart: CalendarQuarter = new CalendarQuarter(slots[i].date);
      quart.setHours(slots[i].startHour / 60);
      quart.setMinutes(slots[i].startHour % 60);

      let quartEnd = new Date(slots[i].dateEnd);
      quartEnd.setHours(slots[i].endHour / 60);
      quartEnd.setMinutes(slots[i].endHour % 60);

      do {
        // console.log(quart);

        slotsPerDay.pushQuart(quart);
        quart = new CalendarQuarter(quart.getTime() + 15 * 60 * 1000);
      } while (quart.getTime() <= quartEnd.getTime());
      console.log('Slots per day');
    }
    console.log('Slots per day all');
    console.log(slotsPerDay);

    return slotsPerDay;
  }

  assignAsMuchQuartAsPossibleToThisJobyer(quartPerDay: CalendarQuarterPerDay, jobyer: any): CalendarQuarterPerDay {
    let jobyerCalendarQuarter = this.loadSlots(jobyer.disponibilites);
    return jobyerCalendarQuarter;
  }
}
