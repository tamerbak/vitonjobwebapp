import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Configs} from "../configurations/configs";
import {Utils} from "../app/utils/utils";
import {CalendarQuarter} from "../dto/calendar-quarter";
import {CalendarQuarterPerDay} from "../dto/calendar-quarter-per-day";
import {CalendarSlot} from "../dto/calendar-slot";

/**
 * Contains all the recruitment logic
 */
@Injectable()
export class RecruitmentService {

  configuration: any;

  constructor(public http: Http) {
  }

  insertGroupedRecruitment(accountId, jobyerId, jobId, offerId) {
    let sql = "insert into user_recrutement_groupe " +
        "(created, fk_user_account, fk_user_jobyer, fk_user_job, fk_user_offre_entreprise, en_contrat) " +
        "values (" +
        "'" + new Date().toISOString() + "', " +
        "" + accountId + ", " +
        "" + jobyerId + ", " +
        "" + jobId + ", " +
        "" + (Utils.isEmpty(offerId) ? null : offerId) + ", " +
        "'Non')"
      ;

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getGroupedRecruitment(accountId, jobyerId, jobId, offerId) {
    let sql = "select * from user_recrutement_groupe where fk_user_account = " + accountId + " and " +
        " fk_user_jobyer = " + jobyerId + " and " +
        " fk_user_job = " + jobId + " and " +
        (Utils.isEmpty(offerId) ? "" : " fk_user_offre_entreprise = " + offerId + " and ") +
        " upper(en_contrat) = 'NON'"
      ;

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  deleteGroupedRecruitment(accountId, jobyerId, jobId) {
    let sql = "delete from user_recrutement_groupe " +
        "where fk_user_account = " + accountId
        + " and fk_user_jobyer = " + jobyerId
        + " and fk_user_job = " + jobId
        + " and upper(en_contrat) = 'NON'"
      ;

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getNonSignedGroupedRecruitments(accountId) {
    let sql = "select " +
      " rg.pk_user_recrutement_groupe as \"rgId\", " +
      " rg.created, " +
      " j.pk_user_jobyer as id, " +
      " j.nom, j.prenom, o.titre, " +
      " o.pk_user_offre_entreprise as \"offerId\" " +
      "FROM user_jobyer as j, user_recrutement_groupe as rg " +
      "LEFT JOIN user_offre_entreprise as o  ON " +
      " rg.fk_user_offre_entreprise = o.pk_user_offre_entreprise " +
      "WHERE rg.fk_user_account = " + accountId + " and " +
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

  updateRecrutementGroupeState(rgId) {
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
   * Convert an array of calendar slots into a CalendarQuarterPerDay
   */
  loadSlots(slots: CalendarSlot[]): CalendarQuarterPerDay {

    // Generate a new CalendarQuarterPerDay
    let planning = new CalendarQuarterPerDay();

    for (let i: number = 0; i < slots.length; ++i) {

      // Retrieve the first Quarter of this slot, the first 15 min
      let quart: CalendarQuarter = new CalendarQuarter(slots[i].date);
      quart.setHours(slots[i].startHour / 60);
      quart.setMinutes(slots[i].startHour % 60);

      // Retrieve the last Quarter of this slot, the last 15 min
      let quartEnd = new Date(slots[i].dateEnd);
      quartEnd.setHours(slots[i].endHour / 60);
      quartEnd.setMinutes(slots[i].endHour % 60);

      // Then generate all the Quarter from the first to the last
      do {
        planning.pushQuart(quart);
        // Add 15 min to the current quarter
        quart = new CalendarQuarter(quart.getTime() + 15 * 60 * 1000);

        // Check that we arrived to the last quarter, if not, continue the process
      } while (quart.getTime() < quartEnd.getTime());
    }

    return planning;
  }

  /**
   * Controls if the jobyer if available for a specifique quarter of a specifique day
   *
   * @param date
   * @param availabilities
   * @param quarterId
   * @returns {any}
   */
  isJobyerAvailable(date, availabilities, quarterId): boolean {
    // Retrieve the day
    let jobyersQuarters = availabilities.quartersPerDay.filter((d) => {
      return d.date == date;
    });
    // If the jobye is available that day
    if (jobyersQuarters.length > 0) {
      // Check if the jobyer is available at the employer's requirements
      if (jobyersQuarters[0].quarters[quarterId] !== null) {
        return jobyersQuarters[0].quarters;
      } else {
        return null;
      }
    }
    return null;
  }

  /**
   * TODO: Controls that the jobyer cans legally work
   *
   * @returns {boolean}
   */
  isJobyerCanWorkThisQuarter(): boolean {
    return true;
  }

  /**
   * Assign a quarter to the jobyer
   *
   * @param date
   * @param quarterId
   * @param jobyerSelected
   */
  assignThisQuarterTo(day, quarterId, jobyerSelected): void {
    let quarters = day.quarters;
    quarters[quarterId] = jobyerSelected;
  }

  /**
   * Add to the jobyersAvailabilities the availabilities of the given jobyer
   * Used when we add a jobyer to the team in order to show his availabilities on the calendar
   *
   * @param jobyersAvailabilities
   * @param jobyer
   */
  loadJobyerAvailabilities(jobyersAvailabilities, jobyer) {
    let availabilities = jobyersAvailabilities.get(jobyer.id);
    if (Utils.isEmpty(availabilities) == true) {
      availabilities = this.loadSlots(
        jobyer.disponibilites
      );
      jobyersAvailabilities.set(jobyer.id, availabilities);
    }
  }

  /**
   * Assign as much quarters as possible to a jobyer for all day of the calendar
   * As soon we find a required employer quarter and a available jobyer quarter, we assign it
   *
   * @param employerPlanning
   * @param jobyersAvailabilities
   * @param jobyerSelected
   */
  assignAsMuchQuarterAsPossibleToThisJobyer(employerPlanning: CalendarQuarterPerDay,
                                            jobyersAvailabilities,
                                            jobyerSelected): void {

    // Get tje jobyer availabilities from the team
    let availabilities = jobyersAvailabilities.get(jobyerSelected);

    // Then for each day of the calendar
    for (let i = 0; i < employerPlanning.quartersPerDay.length; ++i) {
      let day = employerPlanning.quartersPerDay[i];

      // We check all quarter
      for (let quarterId = 0; quarterId < 24 * 4; ++quarterId) {

        // Check that this quarter is required or is not assigned yet
        if (day.quarters[quarterId] === null || day.quarters[quarterId] > 0) {
          continue;
        }

        // If the quarter is not assigned, check if the jobyer is available
        let jobyerAvailable = this.isJobyerAvailable(
          day.date, availabilities, quarterId
        );

        // If the jobyer is available, check if the jobyer cans legally work
        if (jobyerAvailable && this.isJobyerCanWorkThisQuarter() === true) {
          this.assignThisQuarterTo(day, quarterId, jobyerSelected);
        }
      }
    }
  }

  /**
   * Assign a specific slot to a specific jobyer.
   *
   * @param day
   * @param jobyersAvailabilities
   * @param jobyerSelected
   * @param from
   * @param to
   */
  assignSlotToThisJobyer(day: any,
                         jobyersAvailabilities,
                         jobyerSelected,
                          from: number,
                          to: number) {
    let availabilities = jobyersAvailabilities.get(jobyerSelected);

    // TODO : In order to get all the slot quarter,
    // retrieve the first quarter of the slot and the last and assign all of then

    // TODO replace O by the firstQuarterOfTheSlot
    // TODO replace 24 * 4 by the lastQuarterOfTheSlot
    for (let quarterId = from; quarterId <= to; ++quarterId) {
      // Check that this quarter is required or is not assigned yet
      if (day.quarters[quarterId] === null || day.quarters[quarterId] > 0) {
        continue;
      }

      // If the quarter is not assigned, check if the jobyer is available
      let jobyerAvailable = this.isJobyerAvailable(
        day.date, availabilities, quarterId
      );

      // If the jobyer is available, check if the jobyer cans legally work
      if (jobyerAvailable && this.isJobyerCanWorkThisQuarter() === true) {
        this.assignThisQuarterTo(day, quarterId, jobyerSelected);
      }
    }
  }

  /**
   * Return the first quarter id from the slot when the given quarterId belongs
   *
   * @param day
   * @param quarterId
   * @returns {any}
   */
  getFirstQuarterOfSlot(day, quarterId) {
    let i;
    for (i = quarterId; i > 0; --i) {
      if (day.quarters[i] != day.quarters[i - 1]) {
        break;
      }
    }
    return i;
  }

  /**
   * Return the last quarter id from the slot when the given quarterId belongs
   *
   * @param day
   * @param quarterId
   * @returns {any}
   */
  getLastQuarterOfSlot(day, quarterId) {
    let i;
    for (i = quarterId; i < (24 * 4 - 1); ++i) {
      if (day.quarters[i] != day.quarters[i + 1]) {
        break;
      }
    }
    return i;
  }
}
