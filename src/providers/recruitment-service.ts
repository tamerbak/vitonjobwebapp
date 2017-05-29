import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Configs} from "../configurations/configs";
import {Utils} from "../app/utils/utils";
import {CalendarQuarter} from "../dto/calendar-quarter";
import {CalendarQuarterPerDay} from "../dto/calendar-quarter-per-day";
import {CalendarSlot} from "../dto/calendar-slot";
import {Offer} from "../dto/offer";
import {OffersService} from "./offer.service";
import {ContractService} from "./contract-service";
import {Router} from "@angular/router";
import {SharedService} from "./shared.service";
import {Entreprise} from "../dto/entreprise";
import {CCalloutArguments} from "../dto/generium/ccallout-arguments";
import {CCallout} from "../dto/generium/ccallout";

const RECRUIT_CALLOUT_ID = 3001;

/**
 * Contains all the recruitment logic
 */
@Injectable()
export class RecruitmentService {

  configuration: any;

  errorMessage: string = '';

  constructor(public http: Http,
              public router: Router,
              public offersService: OffersService,
              public sharedService: SharedService,
              public contractService: ContractService) {
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
  loadSlots(slots: CalendarSlot[], dateLimitStart?, dateLimitEnd?, concat?): CalendarQuarterPerDay {

    // Generate a new CalendarQuarterPerDay
    let planning = new CalendarQuarterPerDay();

    // Order slots per date
    slots.sort((n1, n2)=> {
      let ts1 = new Date(n1.date).getTime() + n1.startHour;
      let ts2 = new Date(n2.date).getTime() + n2.startHour;
      return ts1 - ts2;
    });

    for (let i: number = 0; i < slots.length; ++i) {

      // If with one slot all the limits are reach, stop here and prevent it.
      let dateStart = new Date(slots[i].date);
      let dateEnd = new Date(slots[i].dateEnd);
      if (dateLimitStart && dateLimitEnd && dateStart < dateLimitStart && dateEnd > dateLimitEnd) {
        planning.setFullAvailable();
        return planning;
      }

      // Retrieve the first Quarter of this slot, the first 15 min
      let quart: CalendarQuarter = new CalendarQuarter(slots[i].date);
      quart.setHours(slots[i].startHour / 60);
      quart.setMinutes(slots[i].startHour % 60);

      // Retrieve the last Quarter of this slot, the last 15 min
      let quartEnd = new Date(slots[i].dateEnd);
      quartEnd.setHours((slots[i].endHour - 1) / 60);
      quartEnd.setMinutes((slots[i].endHour - 1) % 60);

      // Then generate all the Quarter from the first to the last
      let previousQuart = null;
      do {
        // Check if the slot is on 2 days
        if (concat == null && previousQuart != quart.getDate()) {
          planning.nextSlot();
        }

        planning.pushQuart(quart);
        previousQuart = quart.getDate();

        // Add 15 min to the current quarter
        quart = new CalendarQuarter(quart.getTime() + 15 * 60 * 1000);

        // Check that we arrived to the last quarter, if not, continue the process
      } while (quart.getTime() < quartEnd.getTime());
      if (concat == null) {
        planning.nextSlot();
      }
    }

    return planning;
  }

  /**
   * Controls if the jobyer if available for a specifique quarter of a specifique day
   *
   * @param date
   * @param availabilities
   * @param quarterId
   * @param employerPlanning
   * @param jobyerSelected
   * @returns {any}
   */
  isJobyerAvailable(date, availabilities, quarterId, employerPlanning?, jobyerSelected?): boolean {

    // Then for each day of the calendar
    if (employerPlanning) {
      let similarDays = employerPlanning.quartersPerDay.filter((e)=> {
        return e.date == date;
      });
      // Check that the jobyer is not busy by an other slot the same day
      let busy: boolean = false;
      for (let j = 0; j < similarDays.length; ++j) {
        if (similarDays[j].quarters[quarterId] == jobyerSelected.id) {
          busy = true;
        }
      }
      if (busy) {
        return null;
      }
      if (jobyerSelected.toujours_disponible) {
        return true;
      }
    }

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
   * Return an array of day assigned to the given jobyer
   *
   * TODO : A tester
   *
   * @returns {Array}
   */
  allPlanning2JobyerPlanning(availabilities, jobyerSelected): {date: string, quarters: any[]}[] {
    let jobyerDay = availabilities.quartersPerDay.filter((d)=> {
      for (let quarterId = 0; quarterId < (24 * 4); ++quarterId) {
        if (d.quarters[quarterId] == jobyerSelected.id) {
          return true;
        }
      }
      return false;
    });
    let mergedJobyerDay: any[] = [];
    for (let i = 0; i < jobyerDay.length; ++i) {
      if (mergedJobyerDay[jobyerDay[i].date] == null) {
        mergedJobyerDay[jobyerDay[i].date] = {
          date: jobyerDay[i].date,
          quarters: []
        };
      }
      for (let quarterId = 0; quarterId < (24 * 4); ++quarterId) {
        if (jobyerDay[i].quarters[quarterId] == jobyerSelected.id) {
          mergedJobyerDay[jobyerDay[i].date].quarters[quarterId] = jobyerSelected.id;
        }
      }
    }

    if (Utils.isEmpty(jobyerDay) == false) {
      console.log('allPlanning2JobyerPlanning.jobyerDay');
      console.log(jobyerDay);
      console.log('allPlanning2JobyerPlanning.mergedJobyerDay');
      console.log(mergedJobyerDay);
    }
    return mergedJobyerDay;
  }

  /**
   * Return the number of hours separating 2 days:
   * > If 2 days are following themselves, such as the monday and tuesday of the same week, returns 0.
   * > Otherwhise, if the 2 days are monday and thursday, returns 48.
   * > If the d1 is after d2, return -1.
   *
   * TODO : A tester
   *
   * @param d1
   * @param d2
   * @returns {number}
   */
  getHoursBetween2Days(d1, d2): number {
    let d1Date = new Date(d1.date);
    let d2Date = new Date(d2.date);

    let d1Time: number = d1Date.getTime();
    let d2Time: number = d2Date.getTime();

    let shift = (((d2Time - d1Time) / (24 * 60 * 60 * 1000)) - 1) * 4 * 24;
    console.log(shift);
    return shift;
  }

  /**
   * TODO: Controls that the jobyer cans legally work
   *
   * @returns {boolean}
   */
  isJobyerCanWorkThisQuarter(employerPlanning, jobyerSelected): boolean {

    // Break control
    let breakAccumulate: number = 0;
    let minimumBreakTime: number = 11 * 4; // HACK : multiplicated by 4 because counted in Quarter
    let firstBreakIgnored: boolean = false;

    // Workload control
    let workLoad: number = 0;
    let maximumWorkLoad: number = 10 * 4;

    let jobyerAvailabilities = this.allPlanning2JobyerPlanning(employerPlanning, jobyerSelected);

    let day: {date: string, quarters: any[]} = null;
    let previousDay = null;
    for (let prop in jobyerAvailabilities) {
      day = jobyerAvailabilities[prop];
      // Add the number of hours betwen the current and the previous day into the rest time.
      if (previousDay != null && previousDay != day) {
        breakAccumulate += this.getHoursBetween2Days(previousDay, day);
      }

      // Parse the day and add the non assigned moment to the rest time.
      for (let quarterId = 0; quarterId < (24*4); ++quarterId) {
        if (day.quarters[quarterId] == jobyerSelected.id) {
          if (firstBreakIgnored && workLoad == 0 && breakAccumulate < minimumBreakTime) {
            this.errorMessage = 'Le temps de repos minimum légal ne serait pas respecté';
            this.errorMessage += ' (le ' + day.date + ')';
            console.log(this.errorMessage);
            return false;
          }
          breakAccumulate = 0;
          ++workLoad;
        } else {
          if (breakAccumulate == 0 && workLoad > maximumWorkLoad) {
            this.errorMessage = 'Le temps de travail maximum légal ne serait pas respecté';
            this.errorMessage += ' (le ' + day.date + ')';
            console.log(this.errorMessage);
            return false;
          }
          ++breakAccumulate;
          if (workLoad > 0 && breakAccumulate > 0) {
            firstBreakIgnored = true;
          }
          workLoad = 0;
        }
      }

      previousDay = day;
    }
    /*let similarDays = availabilities.quartersPerDay.filter((e)=> {
      return e.date == date;
    });
    let workLoad: number = 0;
    for (let j = 0; j < similarDays.length; ++j) {
      for (let quarterId = 0; quarterId < (24*4); ++quarterId) {
        if (similarDays[j].quarters[quarterId] == jobyerSelected.id) {
          ++workLoad;
        }
      }
    }
    // HACK: maximum daily hours = 10 * quarterPerHour
    return (workLoad <= (10 * 4));
    */

    // if (Utils.isEmpty(errorMessage) == false) {
    //   console.log(errorMessage);
    //   return false;
    // }

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
  loadJobyerAvailabilities(jobyersAvailabilities, jobyer, dateLimitStart?, dateLimitEnd?) {
    let availabilities = jobyersAvailabilities.get(jobyer.id);
    if (Utils.isEmpty(availabilities) == true) {
      availabilities = this.loadSlots(
        jobyer.disponibilites, dateLimitStart, dateLimitEnd, true
      );
      if (availabilities.isFullAvailable() == true) {
        jobyer.toujours_disponible = true;
      }
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
    let consecWorkTime : number = 0;
    let pauseTime : number = 0;

    // Get tje jobyer availabilities from the team
    let availabilities = jobyersAvailabilities.get(jobyerSelected.id);

    // Then for each day of the calendar
    for (let i = 0; i < employerPlanning.quartersPerDay.length; ++i) {

      let day = employerPlanning.quartersPerDay[i];

      // We check all quarter
      for (let quarterId = 0; quarterId < 24 * 4; ++quarterId) {

        // Check that this quarter is required or is not assigned yet
        if (day.quarters[quarterId] === null || day.quarters[quarterId] > 0) {
          pauseTime++;
          if(pauseTime >= 44){
            consecWorkTime = 0;
          }
          continue;
        }

        // If the quarter is not assigned, check if the jobyer is available
        let jobyerAvailable = this.isJobyerAvailable(
          day.date, availabilities, quarterId, employerPlanning, jobyerSelected
        );

        // If the jobyer is available, check if the jobyer cans legally work
        if (jobyerAvailable && consecWorkTime<40 /*&& this.isJobyerCanWorkThisQuarter(employerPlanning, jobyerSelected) === true*/) {

          this.assignThisQuarterTo(day, quarterId, jobyerSelected.id);

          consecWorkTime++;
          pauseTime = 0;


        } else {
          pauseTime++;
          if(pauseTime >= 44){
            consecWorkTime = 0;
          }
          continue;
        }
      }
    }
    // TODO controller si l'un des créneaux est bloquant
  }

  /**
   * Assign a specific slot to a specific jobyer.
   *
   * @param day
   * @param jobyersAvailabilities
   * @param jobyerSelected
   * @param from
   * @param to
   * @param employerPlanning
   */
  assignSlotToThisJobyer(day: any,
                         jobyersAvailabilities,
                         jobyerSelected,
                         from: number,
                         to: number,
                         employerPlanning: CalendarQuarterPerDay) {
    let availabilities = [];
    if (jobyerSelected !== null) {
      availabilities = jobyersAvailabilities.get(jobyerSelected.id);
    }

    let consecWorkTime : number = 0;
    let pauseTime : number = 0;

    // Construct consecutive work time before current slot
    let pauses = 0;
    for(let i = 0 ; i < employerPlanning.quartersPerDay.length ; i++){
      let precDay = employerPlanning.quartersPerDay[i];
      let sameday = precDay.date == day.date;
      let eoc = false;

      for(let quarterId = 0 ; quarterId < 24*4 ; quarterId++){
        let q = precDay.quarters[quarterId];
        if(sameday && quarterId>=from){
          eoc = true;
          break;
        }
        if(q == null || q != jobyerSelected.id){
          pauses++;
          if (pauses >= 44){
            consecWorkTime=0;
          }
          continue;
        }

        consecWorkTime++;
        pauses = 0;
      }
      if(eoc)
        break;
    }

    for (let quarterId = from; quarterId <= to; ++quarterId) {

      // If no jobyer given, this is unassignment process
      if (jobyerSelected == null) {
        day.quarters[quarterId] = 0;
        continue;
      }

      // Check that this quarter is required or is not assigned yet
      if (day.quarters[quarterId] === null || day.quarters[quarterId] > 0) {
        pauseTime++;
        if(pauseTime >= 44){
          consecWorkTime = 0;
        }
      }

      // If the quarter is not assigned, check if the jobyer is available
      let jobyerAvailable = this.isJobyerAvailable(
        day.date, availabilities, quarterId, employerPlanning, jobyerSelected
      );

      // If the jobyer is available, check if the jobyer cans legally work
      if (jobyerAvailable && consecWorkTime<40) {

        this.assignThisQuarterTo(day, quarterId, jobyerSelected.id);
        consecWorkTime++;
        pauseTime = 0;
      } else {
        pauseTime++;
        if(pauseTime >= 44){
          consecWorkTime = 0;
        }
        continue;
      }
    }

    if (jobyerSelected == null) {
      return;
    }

    this.errorMessage = '';
    if (this.isJobyerCanWorkThisQuarter(employerPlanning, jobyerSelected) === false) {
      console.log('PAS LEGAL: ' + this.errorMessage);
      for (let quarterId = from; quarterId <= to; ++quarterId) {
        this.assignThisQuarterTo(day, quarterId, 0);
      }
        return;
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

  retrieveJobyersAvailabilitiesByOffer(idOffer: number) {

    let payloadFinal = new CCallout(RECRUIT_CALLOUT_ID, [
      new CCalloutArguments('Planification', {
        'class': 'com.vitonjob.callouts.offer.model.RecruitToken',
        'idOffer': idOffer,
        // 'userType': (projectTarget === 'employer') ? 'employeur' : 'jobyer'
      }),
    ]);

    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, payloadFinal.forge(), {headers: headers})
        .map(res => res.json())
        .subscribe((data: any) => {
          resolve(data);
        });
    });

  }

  retrieveJobyersAlwaysAvailable(jobyers: any[]) {

    let ids: number[] = [];

    for (let i = 0; i < jobyers.length; ++i) {
      ids.push(jobyers[i].id);
    }

    let sql = "SELECT pk_user_jobyer, toujours_disponible FROM user_jobyer WHERE pk_user_jobyer IN (" + ids.join(',') + ")";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          if (data.status == "success") {
            for (let i = 0; i < data.data.length; ++i) {
              let jobyer = jobyers.filter((j: any) => {
                return (j.id == data.data[i].pk_user_jobyer);
              });
              if (jobyer.length > 0) {
                jobyer[0].toujours_disponible = jobyer[0].toujours_disponible || (data.data[i].toujours_disponible == 'Oui');

              }
            }
          }

          resolve(data);
        });
    });
  }

  retrieveJobyersPicture(jobyers: any[]) {

    let ids: number[] = [];

    for (let i = 0; i < jobyers.length; ++i) {
      ids.push(jobyers[i].id);
    }

    let sql =
      "SELECT j.pk_user_jobyer, encode(a.photo_de_profil::bytea, 'escape') AS avatar " +
      "FROM user_jobyer j " +
      "LEFT JOIN user_account a ON j.fk_user_account = a.pk_user_account " +
      "WHERE j.pk_user_jobyer IN (" + ids.join(',') + ")";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          if (data.status == "success") {
            for (let i = 0; i < data.data.length; ++i) {
              let jobyer = jobyers.filter((j: any) => {
                return (j.id == data.data[i].pk_user_jobyer);
              });
              if (jobyer.length > 0 && Utils.isEmpty(data.data[i].avatar) == false) {
                jobyer[0].avatar = data.data[i].avatar;
              }
            }
          }

          resolve(data);
        });
    });
  }

  translateFromQuartersPerJobyerToSlotsPerJobyer(employerPlanning: CalendarQuarterPerDay, jobyers: any[]): {jobyerId: number; slots: any[]}[] {
    let slotsPerJobyer: {jobyerId: number; slots: any[]}[] = [];


    let startQuarterId = null;
    let startQuarterDate = null;
    let endQuarterId = null;
    let endQuarterDate = null;
    let jobyerId = null;

    for (let i = 0; i < employerPlanning.quartersPerDay.length; ++i) {
      let date = employerPlanning.quartersPerDay[i].date;
      let quarters = employerPlanning.quartersPerDay[i].quarters;
      for (let j = 0; j < quarters.length; ++j) {

        if (quarters[j] === 0) {
          quarters[j] = null;
        }

        if (jobyerId != quarters[j]) {

          if (jobyerId == null) {
            // Init data
            jobyerId = quarters[j];
            startQuarterId = j;
            startQuarterDate = date + "";

          } else {
            // Complete slot
            endQuarterId = j;
            endQuarterDate = date + "";

            // Generate new slot
            let slot = new CalendarSlot();
            slot.date = new Date(startQuarterDate).getTime();
            slot.startHour = startQuarterId * 15;
            slot.dateEnd = new Date(endQuarterDate).getTime();
            slot.endHour = endQuarterId * 15;

            // Assign the slot to the jobyer
            let slotsLine = slotsPerJobyer.filter((spj)=> {
              return (spj.jobyerId == jobyerId);
            });
            if (slotsLine.length == 0) {
              let slots = [slot];
              slotsPerJobyer.push({
                jobyerId: jobyerId,
                slots: slots
              })
            } else {
              slotsLine[0].slots.push(slot);
            }

            jobyerId = quarters[j];
            if (jobyerId != null) {
              // Init data
              jobyerId = quarters[j];
              startQuarterId = j;
              startQuarterDate = date + "";
            }
          }

        }

      }
    }

    return slotsPerJobyer;
  }

  /**
   * Generate contract from assigned slots
   *
   * @param offer
   * @param employerPlanning
   * @param jobyers
   * @param projectTarget
   */
  generateContractFromEmployerPlanning(offer: Offer, employerPlanning: CalendarQuarterPerDay, jobyers: any[], projectTarget: string, entrepriseId: number) {
    let stateMsg = "";
    return new Promise(resolve => {
      // Format slots
      let slotsPerJobyer: {jobyerId: number; slots: any[]}[] = this.translateFromQuartersPerJobyerToSlotsPerJobyer(employerPlanning, jobyers);
      //let slotsPerJobyer: {jobyerId: number; slots: any[]}[] = [{jobyerId: 28317, slots: offer.calendarData}];

      //vérifier si la répartition a été bien effectuée
      if(!slotsPerJobyer || slotsPerJobyer.length == 0){
        stateMsg = "Aucun créneau n'a été affecté. Veuillez vérifier votre répartition ou contacter l'administrateur";
      }else{
        for (let i = 0; i < slotsPerJobyer.length; i++) {
          let jobyerId = slotsPerJobyer[i].jobyerId;
          let slots = JSON.parse((JSON.stringify(slotsPerJobyer[i].slots)));
          if(Utils.isEmpty(jobyerId) || jobyerId == 0 || Utils.isEmpty(slots) || slots.length == 0){
            stateMsg = "La répartition est incohérente. Veuillez la vérifier ou contacter l'administrateur";
          }
        }
      }
      if(!Utils.isEmpty(stateMsg)){
        resolve(stateMsg);
        return;
      }

      // recuperer le timezone de l'offre pour mettre a jour les slots généré avec ce timezone
      let currentTimeZoneOffset = offer.calendarData[0].date.getTimezoneOffset();

      //si la répartition est cohérente, continuer : générer des offres avec les slots de chaque jobyer à partir de l'offre mère: on aura une offre par jobyer
      for (let i = 0; i < slotsPerJobyer.length; i++) {
        let offerCopy: Offer = JSON.parse((JSON.stringify(offer)));
        offerCopy.calendarData = [];
        offerCopy.calendarData = slotsPerJobyer[i].slots;
        offerCopy.entrepriseId = entrepriseId;
        /*for(let j = 0; j < offerCopy.languageData.length; j++){
         offerCopy.languageData[j].level = (offerCopy.languageData[j].level == "junior" ? 1 : 2);
         }*/
        offerCopy.languageData = [];
        offerCopy.qualityData = [];
        for(let j = 0; j < offerCopy.calendarData.length; j++){
          offerCopy.calendarData[j].class = "com.vitonjob.callouts.offer.model.CalendarData";
          offerCopy.calendarData[j].date = offerCopy.calendarData[j].date - currentTimeZoneOffset * 60000;
          offerCopy.calendarData[j].dateEnd = offerCopy.calendarData[j].dateEnd - currentTimeZoneOffset * 60000;
        }
        offerCopy.class = "com.vitonjob.callouts.offer.model.OfferData";
        offerCopy.adresse.type = "adresse_de_travail";
        offerCopy.idParentOffer = offerCopy.idOffer;

        // Add the offer to the current user's offers
        let currentUser = this.sharedService.getCurrentUser();
        let currentUserEntreprise: Entreprise = currentUser.employer.entreprises[0];
        offerCopy.etat = 'en archive';
        currentUserEntreprise.offers.push(offerCopy);
        this.sharedService.setCurrentUser(currentUser);

        this.offersService.copyOffer(offerCopy, projectTarget, "en archive").then((data: any) => {
          if(data && !Utils.isEmpty(data._body)) {
            let savedOffer = JSON.parse(data._body);
            this.saveRecruitmentConfiguration(slotsPerJobyer[i].jobyerId, savedOffer.idOffer).then((data: any) => {
              //get next num contract
              this.contractService.getNumContract(projectTarget).then((data: any) => {
                let contractNum;
                if (data && data.length > 0) {
                  contractNum = this.contractService.formatNumContrat(data[0].numct);
                } else {
                  stateMsg = "Une erreur est survenue lors de la génération du contrat. Veuillez contacter votre administrateur.";
                  resolve(stateMsg);
                  return;
                }

                //save contract with initial infos
                this.contractService.saveInitialContract(
                  contractNum,
                  slotsPerJobyer[i].jobyerId,
                  entrepriseId,
                  savedOffer.idOffer,
                  projectTarget
                ).then((data: any) => {
                  let contractId = data.contractId;
                  //generate hour mission based on the offer slots
                  this.contractService.generateMission(contractId, savedOffer);
                  if (i == slotsPerJobyer.length - 1) {
                    stateMsg = "";
                    resolve(stateMsg);
                  }
                });
              });
            });
          } else {
            stateMsg = "Une erreur est survenue lors de la génération des offres. Veuillez contacter votre administrateur";
            resolve(stateMsg);
          }
        });
      }
    });
  }

  saveRecruitmentConfiguration(jobyerId, offerId){
    let sql = "insert into user_configuration_recrutement (fk_user_jobyer, fk_user_offre_entreprise) values ";
    let values = " (" + jobyerId + "," + offerId + ") ";
    sql = sql + values;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.status == "success") {
            resolve(data);
          }
        });
    });
  }


}
