import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Configs} from "../configurations/configs";

@Injectable()
export class OffersService {
  configuration;
  offerList: any;
  listSectors: any;
  listJobs: any;
  convention : any;

  constructor(private http: Http) {
    this.http = http;
    this.convention = {
      id:0,
      code:'',
      libelle:''
    };
  }

  /**
   * @description Get the corresponding candidates of a specific offer
   * @param offer the reference offer
   * @param projectTarget the project target configuration (jobyer/employer)
   * @return {Promise<T>|Promise<R>|Promise} a promise of returning the candidates
   */
  getCorrespondingOffers(offer: any, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);

    //  Get job and offer reference
    let job = offer.jobData.job;

    let table = (projectTarget === 'jobyer') ? 'user_offre_entreprise' : 'user_offre_jobyer';
    let sql = "select pk_" + table + " from " + table + " where dirty='N' and pk_" + table + " in (select fk_" + table + " from user_pratique_job where fk_user_job in ( select pk_user_job from user_job where lower_unaccent(libelle) % lower_unaccent('" + this.sqlfyText(job) + "')))";
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

  saveAutoSearchMode(projectTarget, idOffer, mode) {
    let table = projectTarget == 'jobyer' ? "user_offre_jobyer" : "user_offre_entreprise";
    let sql = "update " + table + " set recherche_automatique='" + mode + "' where pk_" + table + "=" + idOffer;
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

  loadSectorsToLocal() {
    let sql = 'select pk_user_metier as id, libelle as libelle from user_metier order by libelle asc';
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.listSectors = data.data;
          resolve(this.listSectors);
        });
    });
  }

  loadJobsToLocal() {
    let sql = 'select pk_user_job as id, libelle as libelle, fk_user_metier as idSector from user_job order by libelle asc';
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.listJobs = data.data;
          resolve(this.listJobs);
        });
    });
  }

  setOfferInRemote(offerData: any, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);

    offerData.class = 'com.vitonjob.callouts.auth.model.OfferData';
    offerData.idOffer = 0;
    offerData.jobyerId = 0;
    offerData.entrepriseId = 0;

    switch (projectTarget) {
      case 'employer' :
        offerData.entrepriseId = offerData.identity;
        break;
      case 'jobyer':
        offerData.jobyerId = offerData.identity;
        break;
    }
    //remove identity key/value from offerData object

    delete offerData['identity'];
    delete offerData.jobData['idLevel'];


    // store in remote database
    let stringData = JSON.stringify(offerData);

    let encoded = btoa(stringData);

    let payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      id: 169,
      args: [{
        'class': 'fr.protogen.masterdata.model.CCalloutArguments',
        label: 'creation offre',
        value: encoded
      },
        {
          'class': 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'type utilisateur',
          value: (projectTarget === 'employer') ? btoa('employeur') : btoa('jobyer')
        }]
    };

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  updateOfferJob(offer, projectTarget) {
    this.configuration = Configs.setConfigs(projectTarget);
    if (projectTarget == 'jobyer') {
      this.updateOfferJobyerJob(offer).then(data => {
        this.updateOfferJobyerTitle(offer);
      });

    } else {
      this.updateOfferEntrepriseJob(offer).then(data => {
        this.updateOfferEntrepriseTitle(offer);
      });
    }
  }

  updateOfferJobyerJob(offer) {
    let sql = "update user_pratique_job set fk_user_job=" + offer.jobData.idJob + ", fk_user_niveau=" + (offer.jobData.level == 'junior' ? 1 : 2) + " " +
      "where fk_user_offre_jobyer=" + offer.idOffer;
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data);
        });
    });
  }

  updateOfferJobyerTitle(offer) {
    let sql = "update user_offre_jobyer set titre='" + offer.title.replace("'", "''") + "', tarif_a_l_heure='" + offer.jobData.remuneration + "' where pk_user_offre_jobyer=" + offer.idOffer;

    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data);
        });
    });
  }

  updateOfferEntrepriseJob(offer) {
    let sql = "update user_pratique_job set fk_user_job=" + offer.jobData.idJob + ", fk_user_niveau=" + (offer.jobData.level == 'junior' ? 1 : 2) + " " +
      "where fk_user_offre_entreprise=" + offer.idOffer;
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data);
        });
    });
  }

  updateOfferEntrepriseTitle(offer) {
    //debugger;
    let sql = "update user_offre_entreprise set titre='" + this.sqlfyText(offer.title) + "', tarif_a_l_heure='" + offer.jobData.remuneration + "' where pk_user_offre_entreprise=" + offer.idOffer;

    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data);
        });
    });
  }

  /*
   *  Update offer calendar
   */
  updateOfferCalendar(offer, projectTarget) {
    return new Promise(resolve => {
      let table = projectTarget == 'jobyer' ? 'user_offre_jobyer' : 'user_offre_entreprise';
      this.deleteCalendar(offer, table);
      this.attacheCalendar(offer, table);
      resolve();
    });
  }

  deleteCalendar(offer, table) {
    let sql = "delete from user_disponibilites_des_offres where fk_" + table + "=" + offer.idOffer;
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

  attacheCalendar(offer, table) {
    for (let i = 0; i < offer.calendarData.length; i++) {
      let l = offer.calendarData[i];
      this.attacheDay(offer.idOffer, table, l);
    }
  }

  attacheDay(idOffer, table, day) {
    let d = new Date(day.date);

    let sdate = this.sqlfy(d);
    let sql = "insert into user_disponibilites_des_offres (fk_" + table + ", jour, heure_debut, heure_fin) values (" + idOffer + ", '" + sdate + "', " + day.startHour + ", " + day.endHour + ")";
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

  /*
   *  Update offer qualities
   */

  updateOfferQualities(offer, projectTarget) {
    let table = projectTarget == 'jobyer' ? 'user_offre_jobyer' : 'user_offre_entreprise';
    this.deleteQualities(offer, table);
    this.attachQualities(offer, table);
  }

  deleteQualities(offer, table) {
    let sql = "delete from user_pratique_indispensable where fk_" + table + "=" + offer.idOffer;
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

  attachQualities(offer, table) {
    for (let i = 0; i < offer.qualityData.length; i++) {
      let q = offer.qualityData[i];
      this.attacheQuality(offer.idOffer, table, q.idQuality);
    }
  }

  attacheQuality(idOffer, table, idQuality) {
    let sql = "insert into user_pratique_indispensable (fk_" + table + ", fk_user_indispensable) values (" + idOffer + ", " + idQuality + ")";
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

  /**
   * @description     loading qualities list
   * @return qualities list in the format {id : X, libelle : X}
   */
  loadQualities(projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    let type = (projectTarget == "jobyer") ? 'jobyer' : 'employeur';
    var sql = "select pk_user_indispensable as \"idQuality\", libelle as libelle from user_indispensable where type='" + type + "'";
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

  /*
   *  Update Offer languages
   */

  updateOfferLanguages(offer, projectTarget) {
    let table = projectTarget == 'jobyer' ? 'user_offre_jobyer' : 'user_offre_entreprise';
    this.deleteLanguages(offer, table);
    this.attacheLanguages(offer, table);
  }

  deleteLanguages(offer, table) {
    let sql = "delete from user_pratique_langue where fk_" + table + "=" + offer.idOffer;
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

  attacheLanguages(offer, table) {
    for (let i = 0; i < offer.languageData.length; i++) {
      let l = offer.languageData[i];
      this.attacheLanguage(offer.idOffer, table, l.idLanguage, l.level);
    }
  }

  attacheLanguage(idOffer, table, idLanguage, level) {
    let sql = "insert into user_pratique_langue (fk_" + table + ", fk_user_langue, fk_user_niveau) values (" + idOffer + ", " + idLanguage + ", " + ((level == 'junior') ? 1 : 2) + ")";
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

  /**
   * @description     loading languages list
   * @return languages list in the format {id : X, libelle : X}
   */
  loadLanguages(projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    var sql = 'select pk_user_langue as \"idLanguage\", libelle as libelle, \'junior\' as level from user_langue';
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

  /*
   *  Update offer statut, job and title
   */

  updateOfferStatut(offerId, statut, projectTarget) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);

    //  Constructing the query
    var table = projectTarget == "jobyer" ? 'user_offre_jobyer' : 'user_offre_entreprise';
    var sql = "update " + table + " set publiee = '" + statut + "' where pk_" + table + " = '" + offerId + "';";

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(
          data => resolve(data),
          err => console.log(err)
        )
    });
  }

  spliceOfferInLocal(currentUser, offer, projectTarget) {
    var offerList = (projectTarget == 'employer' ? currentUser.employer.entreprises[0].offers : currentUser.jobyer.offers);
    var offerTemp = offerList.filter((v)=> {
      return (v.idOffer == offer.idOffer);
    });
    if (offerList.indexOf(offerTemp[0]) != -1) {
      offerList.splice(offerList.indexOf(offerTemp[0]), 1, offer);
    }
    if (projectTarget == 'employer') {
      currentUser.employer.entreprises[0].offers = offerList;
    } else {
      currentUser.jobyer.offers = offerList;
    }
    return currentUser;
  }

  getOffersLanguages(idOffers: any, offerTable: string) {
    let ids = '(' + idOffers[0];
    for (var i = 1; i < idOffers.length; i++)
      ids = ids + ',' + idOffers[i];
    ids = ids + ')';
    var sql = "select pk_user_langue as id, libelle from user_langue where " +
      "pk_user_langue in (select fk_user_langue from user_pratique_langue where fk_" + offerTable + " in " + ids + ")" +
      " group by id, libelle";
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.data);
        });
    });
  }

  /**
   * @description listing qualities related to a set of offers
   * @param idOffers list of offers ID
   * @param offerTable offerTable as user_offre_jobyer or user_offre_entreprise
   * @return the proposition of grouped qualities
   */
  getOffersQualities(idOffers: any, offerTable: string) {
    let ids = '(' + idOffers[0];
    for (var i = 1; i < idOffers.length; i++)
      ids = ids + ',' + idOffers[i];
    ids = ids + ')';
    var sql = "select pk_user_indispensable as id, libelle from user_indispensable where " +
      "pk_user_indispensable in (select fk_user_indispensable from user_pratique_indispensable where fk_" + offerTable + " in " + ids + ")" +
      " group by id, libelle";
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.data);
        });
    });
  }

  /*********************************************************************************************************************
   *  COLLECTIVE CONVENTIONS MANAGEMENT
   *********************************************************************************************************************/

  /**
   * load collective convention based on job ID
   * @param idjob
   * @returns {Promise<T>}
   */
  getConvention(idjob){
    let sql = "select pk_user_convention_collective as id, code, libelle " +
      "from user_convention_collective " +
      "where pk_user_convention_collective in " +
      "(select fk_user_convention_collective from user_job where pk_user_job="+idjob+")";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          if(data.data && data.data.length>0){
            this.convention = data.data[0];
          }
          resolve(this.convention);
        });
    });
  }

  /**
   * Loading all convention levels given convention ID
   * @param idConvention
   * @returns {Promise<T>}
   */
  getConventionNiveaux(idConvention){
    let sql = "select pk_user_niveau_convention_collective as id, code, libelle from user_niveau_convention_collective where fk_user_convention_collective="+idConvention;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let list = [];
          if(data.data && data.data.length>0)
            list = data.data;
          resolve(list);
        });
    });
  }

  /**
   * Loading all convention category given convention ID
   * @param idConvention
   * @returns {Promise<T>}
   */
  getConventionCategory(idConvention){
    let sql = "select pk_user_categorie_convention as id, code, libelle from user_categorie_convention where fk_user_convention_collective="+idConvention;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let list = [];
          if(data.data && data.data.length>0)
            list = data.data;
          resolve(list);
        });
    });
  }

  /**
   * Loading all convention echelons given convention ID
   * @param idConvention
   * @returns {Promise<T>}
   */
  getConventionEchelon(idConvention){
    let sql = "select pk_user_echelon_convention as id, code, libelle from user_echelon_convention where fk_user_convention_collective="+idConvention;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let list = [];
          if(data.data && data.data.length>0)
            list = data.data;
          resolve(list);
        });
    });
  }

  /**
   * Loading all convention coefficients given convention ID
   * @param idConvention
   * @returns {Promise<T>}
   */
  getConventionCoefficients(idConvention){
    let sql = "select pk_user_coefficient_convention as id, code, libelle from user_coefficient_convention where fk_user_convention_collective="+idConvention;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let list = [];
          if(data.data && data.data.length>0)
            list = data.data;
          resolve(list);
        });
    });
  }

  getConventionParameters(idConvention){
    let sql = "select pk_user_parametrage_convention as id, remuneration_de_reference as rate, " +
      "fk_user_convention_collective as idcc, fk_user_categorie_convention as idcat, " +
      "fk_user_echelon_convention as idechelon, fk_user_coefficient_convention as idcoeff, fk_user_niveau_convention_collective as idniv " +
      "from user_parametrage_convention where fk_user_convention_collective="+idConvention;

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let list = [];
          if(data.data && data.data.length>0)
            list = data.data;
          resolve(list);
        });
    });
  }


  /*
   * USEFUL FUNCTIONS
   */


  convertToFormattedHour(value) {
    var hours = Math.floor(value / 60);
    var minutes = value % 60;
    if (!hours && !minutes) {
      return '';
    } else {
      return ((hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes));
    }
  }

  convertHoursToMinutes(hour) {
    if (hour) {
      var hourArray = hour.split(':');
      return hourArray[0] * 60 + parseInt(hourArray[1]);
    }
  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }

  sqlfy(d) {
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " 00:00:00+00";
  }

  sqlfyText(text) {
    if (!text || text.length == 0)
      return "";
    return text.replace(/'/g, "''")
  }
}
