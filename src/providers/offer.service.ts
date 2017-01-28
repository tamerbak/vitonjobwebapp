import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Configs} from "../configurations/configs";
import {SharedService} from "./shared.service";
import {VOJFramework} from "../voj.framework";
import {Offer} from "../dto/offer";
import {CCalloutArguments} from "../dto/generium/ccallout-arguments";
import {CCallout} from "../dto/generium/ccallout";
import {Utils} from "../app/utils/utils";

const OFFER_CALLOUT_ID = 40020;

@Injectable()
export class OffersService {
  configuration;
  offerList: any;
  listSectors: any;
  listJobs: any;
  convention : any;

  constructor(private http: Http, private sharedService:SharedService) {
    this.http = http;
    this.convention = {
      id:0,
      code:'',
      libelle:''
    };
  }

  /**
   * TODO Kelvin ERROR : Impossible de fournir une vidéo lors de la création de l'offre
   * Update youtube video link
   * @param idOffer
   * @param youtubeLink
   * @param projectTarget
   * @returns {Promise<T>}
   */
  updateVideoLink(idOffer, youtubeLink, projectTarget){
    let table = projectTarget == 'jobyer' ? "user_offre_jobyer":"user_offre_entreprise";
    let sql = "update "+table+" set lien_video='"+this.sqlfyText(youtubeLink)+"' where pk_"+table+"="+idOffer;
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(youtubeLink);
      });
    });
  }

  /**
   * Return the offer's medatada
   *
   * @param idOffer
   * @param projectTarget
   * @returns {Promise<T>}
   */
  getMetaData(idOffer, projectTarget) {
    let table = projectTarget == 'jobyer' ? "user_offre_jobyer" : "user_offre_entreprise";
    let sql = "SELECT lien_video FROM " + table + " WHERE pk_" + table + "=" + idOffer;

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
   * TODO Kelvin LAG: Optimiser pour ne faire qu'un seul appel au lieu d'un par offre
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

  /**
   * TODO Kelvin ARCHITECTIRE : Centraliser les appels à Générium
   * Turn On/Off the search mode
   * @param projectTarget
   * @param idOffer
   * @param mode
   * @returns {Promise<T>}
   */
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

  /**
   * TODO Kelvin WARNING : Les usages ne sont jamais contrôlés. En cas d'erreur de connexion, l'application deviendra instable
   * Return the sectors list
   * @returns {Promise<T>}
   */
  loadSectorsToLocal() {
    let sql = 'select pk_user_metier as id, libelle as libelle from user_metier where dirty = \'N\' order by libelle asc';
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

  /**
   * TODO Kelvin LAG : Avec une liste de plus de 11 000 éléments retournés, cette fonction ne devrait pas être appelé
   * Return the jobs list
   * @returns {Promise<T>}
   */
  loadJobsToLocal() {
    VOJFramework.deprecated();
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

  setOfferInLocal(offerData: any, projectTarget: string) {
    //  Init project parameters
    let offers: any;
    let result: any;

    var data = this.sharedService.getCurrentUser();
    if (projectTarget === 'employer') {
      let rawData = data.employer;
      if (rawData && rawData.entreprises && rawData.entreprises[0].offers) {
        //adding userId for remote storing
        offers = rawData.entreprises[0].offers;
        offers.push(offerData);
        // Save new offer list in SqlStorage :
        this.sharedService.setCurrentUser(data);
      }
    } else { // jobyer
      let rawData = data.jobyer;
      if (rawData && rawData.offers) {
        //adding userId for remote storing
        offers = rawData.offers;
        offers.push(offerData);
        // Save new offer list in SqlStorage :
        this.sharedService.setCurrentUser(data);
      }
    }
  }

  /**
   * Get an offer
   *
   * @param idOffer
   * @param projectTarget
   * @param offer
   * @returns {Promise<T>}
   */
  getOfferById(idOffer: number, projectTarget: string, offer: Offer): any {

    let payloadFinal = new CCallout(OFFER_CALLOUT_ID, [
      new CCalloutArguments('Voir offre', {
        'class': 'com.vitonjob.callouts.offer.model.OfferToken',
        'idOffer': idOffer
      }),
      new CCalloutArguments('Configuration', {
        'class': 'com.vitonjob.callouts.offer.model.CalloutConfiguration',
        'mode': 'view',
        'userType': (projectTarget === 'employer') ? 'employeur' : 'jobyer'
      }),
    ]);

    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, payloadFinal.forge(), {headers: headers})
        .subscribe((data: any) => {
          let remoteOffer: Offer = JSON.parse(data._body);

          // Copy every properties from remote to local
          Object.keys(remoteOffer).forEach((key) => {
            offer[key] = remoteOffer[key];
          });

          // Change slot format from Timestamp to Date
          if (offer['calendarData'] && Utils.isEmpty(offer['calendarData']) === false) {
            for (let i = 0; i < offer['calendarData'].length; ++i) {
              offer['calendarData'][i].date = new Date(offer['calendarData'][i].date);
              offer['calendarData'][i].dateEnd = new Date(offer['calendarData'][i].dateEnd);
            }
          }

          resolve(data);
        });
    });
  }

  /**
   * Create an offer
   *
   * @param offer
   * @param projectTarget
   * @returns {Promise<T>}
   */
  createOffer(offer: Offer, projectTarget: string) {
    offer.idOffer = 0;
    return this._uploadOffer(offer, projectTarget);
  }

  /**
   * Copy an offer
   *
   * @param offer
   * @param projectTarget
   * @returns {Promise<T>}
   */
  copyOffer(offer: Offer, projectTarget: string) {
    offer.idOffer = 0;
    offer.etat = '';
    return this._uploadOffer(offer, projectTarget);
  }

  /**
   * Save an offer
   *
   * @param offer
   * @param projectTarget
   * @returns {Promise<T>}
   */
  saveOffer(offer: Offer, projectTarget: string) {
    return this._uploadOffer(offer, projectTarget);
  }

  /**
   * Upload offer to the callout
   *
   * @param offer
   * @param projectTarget
   * @returns {Promise<T>}
   */
  private _uploadOffer(offer: Offer, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);

    offer.status = "OUI";
    offer.visible = true;

    delete offer['slots'];

    // Change slot format from Date to Timestamp
    if (offer['calendarData'] && Utils.isEmpty(offer['calendarData']) === false) {
      for (let i = 0; i < offer['calendarData'].length; ++i) {
        offer['calendarData'][i].date = new Date(offer['calendarData'][i].date).getTime();
        offer['calendarData'][i].dateEnd = new Date(offer['calendarData'][i].dateEnd).getTime();
      }
    }

    // TODO HACK force jobData type
    offer.jobData.class = 'com.vitonjob.callouts.offer.model.JobData';
    if ((projectTarget === 'employer') && offer.entrepriseId == 0) {
      console.error('Missing entreprise id');
    } else if ((projectTarget !== 'employer') && offer.jobyerId == 0) {
      console.error('Missing jobyer id');
    }

    let payloadFinal = new CCallout(OFFER_CALLOUT_ID, [
      new CCalloutArguments('Création/Edition offre', offer),
      new CCalloutArguments('Configuration', {
        'class': 'com.vitonjob.callouts.offer.model.CalloutConfiguration',
        'mode': offer.idOffer == 0 ? 'creation' : 'edition',
        'userType': (projectTarget === 'employer') ? 'employeur' : 'jobyer'
      }),
    ]);

    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, payloadFinal.forge(), {headers: headers})
        .subscribe((data: any) => {
          offer.idOffer = JSON.parse(data._body).idOffer;
          resolve(data);
        });
    });
  }

  saveOfferAdress(offer, offerAddress, streetNumberOA, streetOA,
                  cityOA, zipCodeOA, nameOA, countryOA, idTiers, type) {

    let addressData = {
      'class': 'com.vitonjob.localisation.AdressToken',
      'street': streetOA,
      'cp': zipCodeOA,
      'ville': cityOA,
      'pays': countryOA,
      'name': nameOA,
      'streetNumber': streetNumberOA,
      'role': type,
      'id': ""+idTiers,
      'type': 'travaille'
    };

    let addressDataStr = JSON.stringify(addressData);
    let encodedAddress = btoa(addressDataStr);
    let data = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 239,
      'args': [{
        'class': 'fr.protogen.masterdata.model.CCalloutArguments',
        label: 'Adresse',
        value: encodedAddress
      }]
    };
    var stringData = JSON.stringify(data);

    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, stringData, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any) => {

          let id = data.id;
          this.updateOfferAdress(id, offer.idOffer, type);
          resolve(data);
        });
    });

  }

  updateOfferAdress(id, idOffer, type){
    let table = type =='jobyer'?'user_offre_jobyer':'user_offre_entreprise';
    let field = type =='jobyer'?'fk_user_adresse_jobyer':'fk_user_adresse_entreprise';

    let sql = "update "+table+" set "+field+"="+id+" where pk_"+table+"="+idOffer;

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

  loadOfferAdress(idOffer, type){
    let to = type =='jobyer'?'user_offre_jobyer':'user_offre_entreprise';
    let table = type =='jobyer'?'user_adresse_jobyer':'user_adresse_entreprise';
    let sql = "select adresse_google_maps, nom, numero  from user_adresse where pk_user_adresse in (" +
                  "select fk_user_adresse from "+table+" where pk_"+table+" in (" +
                    "select fk_"+table+" from "+to+" where pk_"+to+"="+idOffer+"" +
                  ")" +
              ")";

    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data : any) => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          let adr = '';
          if(data && data.data && data.data.length>0)
            adr = data.data[0].numero+" "+data.data[0].nom + " " + data.data[0].adresse_google_maps;
          resolve(adr.trim());
        });
    });
  }

  updateOfferJob(offer, projectTarget) {
    this.configuration = Configs.setConfigs(projectTarget);
    if (projectTarget == 'jobyer') {
      this.updateOfferJobyerTitle(offer);
    } else {
      this.updateOfferEntrepriseTitle(offer);
    }
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

  updateOfferEntrepriseTitle(offer) {
    //
    let sql = "update user_offre_entreprise set titre='" + this.sqlfyText(offer.title) +
      "', tarif_a_l_heure='" + offer.jobData.remuneration +
      "', nombre_de_postes = " + offer.nbPoste +
      ", contact_sur_place = '" + offer.contact +
      "', telephone_contact = '" + offer.telephone +
      "' where pk_user_offre_entreprise=" + offer.idOffer;
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

  /**
   * @description     loading qualities list
   * @return qualities list in the format {id : X, libelle : X}
   */
  loadQualities(projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    let type = (projectTarget != "jobyer") ? 'jobyer' : 'employeur';
    var sql = "select pk_user_indispensable as \"id\", libelle as libelle from user_indispensable where type='" + type + "'";
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

  updateOfferState(offerId, state){
    let sql = "update user_offre_entreprise set etat = '" + state + "' where pk_user_offre_entreprise = " + offerId;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
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
  getConvention(id){
    let sql = "select pk_user_convention_collective as id, code, libelle " +
      "from user_convention_collective " +
      "where pk_user_convention_collective ="+id+" and dirty='N'";

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
  getConventionFilters(idConvention) {

    let sql = `
      SELECT 'niv' as type, pk_user_niveau_convention_collective AS id, code, libelle, 'false' as disabled
      FROM user_niveau_convention_collective
      WHERE fk_user_convention_collective = ` + idConvention + ` and dirty='N'
      UNION SELECT 'coe' as type, pk_user_coefficient_convention AS id, code, libelle, 'false' as disabled
      FROM user_coefficient_convention
      WHERE fk_user_convention_collective = ` + idConvention + ` and dirty='N'
      UNION SELECT 'ech' as type, pk_user_echelon_convention AS id, code, libelle, 'false' as disabled
      FROM user_echelon_convention
      WHERE fk_user_convention_collective = ` + idConvention + ` and dirty='N'
      UNION SELECT 'cat' as type, pk_user_categorie_convention AS id, code, libelle, 'false' as disabled
      FROM user_categorie_convention
      WHERE fk_user_convention_collective = ` + idConvention + ` and dirty='N'
      UNION SELECT 'zon' as type, pk_user_zone_geo_convention AS id, code, libelle, 'false' as disabled
      FROM user_zone_geo_convention
      WHERE fk_user_convention_collective = ` + idConvention + ` and dirty='N'
      UNION SELECT 'ind' as type, pk_user_indice_convention AS id, code, libelle, 'false' as disabled
      FROM user_indice_convention
      WHERE fk_user_convention_collective = ` + idConvention + ` and dirty='N'
      UNION SELECT 'cla' as type, pk_user_classe_convention AS id, code, libelle, 'false' as disabled
      FROM user_classe_convention
      WHERE fk_user_convention_collective = ` + idConvention + ` and dirty='N'
      UNION SELECT 'sta' as type, pk_user_statut_convention AS id, code, libelle, 'false' as disabled
      FROM user_statut_convention
      WHERE dirty='N'
      UNION SELECT 'pos' as type, pk_user_position_convention AS id, code, libelle, 'false' as disabled
      FROM user_position_convention
      WHERE fk_user_convention_collective = ` + idConvention + ` and dirty='N'
      UNION SELECT 'anc' as type, pk_user_anciennete_convention AS id, code, libelle, 'false' as disabled
      FROM user_anciennete_convention
      WHERE fk_user_convention_collective = ` + idConvention + ` and dirty='N'
      ORDER BY libelle
    `;

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let list = [];
          if (data.data && data.data.length > 0) {
            list = data.data;
          }
          resolve(list);
        });
    });
  }

  /*********************************************************************************************************************
   *  COLLECTIVE CONVENTIONS ADVANTAGES
   *********************************************************************************************************************/
  getHoursCategories(idConv){
    let sql = "select cat.pk_user_categorie_heures_conventionnees as \"catId\",  cat.code, " +
    " chc.pk_user_coefficient_heure_conventionnee as id, chc.libelle, chc.coefficient, chc.coefficient as \"empValue\", chc.type_de_valeur as \"typeValue\"," +
    " chc.formule_jour, chc.debut, chc.fin " +
    "from user_categorie_heures_conventionnees cat " +
    "LEFT JOIN user_coefficient_heure_conventionnee chc " +
    "ON chc.fk_user_categorie_heures_conventionnees = cat.pk_user_categorie_heures_conventionnees " +
    " where chc.fk_user_convention_collective = " + idConv+" and chc.dirty='N'";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let list = [];

          if(data.data && data.data.length>0){
            list = data.data;
            for(let i = 0; i< list.length ; i++){
              if(list[i].debut<0 || list[i].fin<0){
                list[i].debutHeure = 0;
                list[i].debutMinute = 0;
                list[i].finHeure = 0;
                list[i].finMinute = 0;
              } else {
                let div = Math.floor(list[i].debut/60);
                let rem = list[i].debut % 60;
                list[i].debutHeure = div;
                list[i].debutMinute = rem;

                div = Math.floor(list[i].fin/60);
                rem = list[i].fin % 60;
                if(div>=24){
                  div = 23;
                  rem = 59;
                }

                list[i].finHeure = div;
                list[i].finMinute = rem;

              }
            }
          }
          resolve(list);
        });
    });
  }

  getHoursMajoration(idConv){
    let sql = "select m.pk_user_majoration_heure_conventionnee as id, m.libelle as libelle, m.coefficient , m.coefficient as \"empValue\", m.type_de_valeur as \"typeValue\", " +
      " c.code as code, c.pk_user_categorie_majoration_heure as \"majId\" " +
      " from user_majoration_heure_conventionnee m, user_categorie_majoration_heure c " +
      " where m.fk_user_categorie_majoration_heure = c.pk_user_categorie_majoration_heure " +
      " and fk_user_convention_collective = " + idConv+" and m.dirty='N'";
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

  getIndemnites(idConv){
    let sql = "select i.pk_user_indemnite_conventionnee as id, i.libelle as libelle, i.valeur as coefficient , i.valeur as \"empValue\", i.type_de_valeur as \"typeValue\", " +
      " t.code as code, t.pk_user_type_indemnite as \"indId\" " +
      " from user_indemnite_conventionnee i, user_type_indemnite t " +
      " where i.fk_user_type_indemnite = t.pk_user_type_indemnite " +
      " and fk_user_convention_collective="+idConv+" and i.dirty='N'";

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

  selectPrerequis(kw){
    let sql = "select pk_user_prerquis as id, libelle from user_prerquis where lower_unaccent(libelle) like lower_unaccent('%"+this.sqlfyText(kw)+"%') or lower_unaccent(libelle) % lower_unaccent('"+this.sqlfyText(kw)+"')";

    return sql;
  }

  selectJobs(kw, idSector){
    let constr = "";
    if(idSector && idSector>0){
      constr = "fk_user_metier="+idSector+" AND ";
    }
    let sql = "SELECT " +
      "j.pk_user_job as id " +
      ", j.libelle " +
      ", fk_user_metier as idsector " +
      ", m.libelle as libelleSector " +
      "FROM user_job j " +
      "LEFT JOIN user_metier m ON m.pk_user_metier = j.fk_user_metier " +
      "WHERE " +
      "("+constr+" ( lower_unaccent(j.libelle) LIKE lower_unaccent('%"+this.sqlfyText(kw)+"%') " +
      "OR lower_unaccent(j.libelle) % lower_unaccent('"+this.sqlfyText(kw)+"'))) " +
      "AND j.dirty = 'N' AND m.dirty = 'N' " +
      "ORDER BY similarity(lower_unaccent(j.libelle),lower_unaccent('"+this.sqlfyText(kw)+"')) DESC"
    ;
    return sql;
  }

  selectJobById(id){
    let sql = "select libelle from user_job where pk_user_job="+id;

    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          let job = "";
          if(data.data && data.data.length>0)
            job = data.data[0].libelle;
          resolve(job);
        });
    });
  }

  loadSectorByJobId(id){
    let sql = "select pk_user_metier as id, libelle from user_metier where pk_user_metier in " +
      "(select fk_user_metier from user_job where pk_user_job="+id+") and dirty='N'";
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          let s = {
            id : 0,
            libelle : ""
          };
          if(data.data && data.data.length>0)
            s = data.data[0];
          resolve(s);
        });
    });
  }

  loadEPI(){
    let sql = "select libelle from user_epi where dirty='N' order by libelle asc ";
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let res = [];
          if(data.data){
            res = data.data;
          }
          resolve(res);
        });
    });
  }

  selectEPI(kw){
    let sql = "select pk_user_epi as id, libelle from user_epi where lower_unaccent(libelle) like lower_unaccent('%"+kw+"%') or lower_unaccent(libelle) % lower_unaccent('"+kw+"')";

    return sql;
  }

  loadOfferEPI(oid, projectTarget){
    var table = projectTarget == 'employer' ? "user_epi_employeur":"user_epi_jobyer";
    var fk = projectTarget == 'employer' ? "fk_user_offre_entreprise":"fk_user_offre_jobyer";
    let sql = "select libelle from user_epi where pk_user_epi in (select fk_user_epi from "+table+" where "+fk+"="+oid+")";
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data.data);
        });
    });
  }

  loadOfferPrerequisObligatoires(oid){
    let sql = "select libelle from user_prerquis where pk_user_prerquis in (select fk_user_prerquis from user_prerequis_obligatoires where fk_user_offre_entreprise="+oid+")";
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data.data);
        });
    });
  }

  loadOfferNecessaryDocuments(oid){
    let sql = "select libelle from user_prerquis where pk_user_prerquis in (select fk_user_prerquis from user_prerequis_jobyer where fk_user_offre_jobyer="+oid+")";
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data.data);
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

  getHourFromDate(d){
    let h = d.getHours() * 60;
    let m = d.getMinutes() * 1;
    let minutes = h + m;
    return minutes;
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

  deleteOffer(offer, projectTarget){

    let table = projectTarget == 'jobyer'?'user_offre_jobyer':'user_offre_entreprise';
    let sql = "update "+table+" set dirty='Y' where pk_"+table+"="+offer.idOffer;

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

  getCategoryByOfferAndConvention(offerId, convId){
    let sql = "select pk_user_categorie_convention as id, libelle from user_categorie_convention where " +
      "fk_user_convention_collective in (select pk_user_convention_collective as id from user_convention_collective where pk_user_convention_collective = " + convId + ") and " +
      "pk_user_categorie_convention in (select fk_user_categorie_convention as idcat from user_parametrage_convention where pk_user_parametrage_convention in (select fk_user_parametrage_convention from user_offre_entreprise where pk_user_offre_entreprise="+offerId+"))";

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

  isDailySlotsDurationRespected(rawSlots, slot){
    //600 is 10h converted to minutes
    let limit = 600;
    let newSlots = this.separateTwoDaysSlot(slot);
    let totalHours = 0;
    for(let j = 0; j < newSlots.length; j++) {
      let newSlot = newSlots[j];
      //newSlot will be modified by the call of setHours function
      //newSlotCopy will contain a raw copy of the original newSlot
      let newSlotCopy = this.cloneSlot(newSlot);
      let startDate = newSlot.date;
      let endDate = newSlot.dateEnd;
      let hs = startDate.getHours() * 60;
      let ms = startDate.getMinutes();
      let minStart = hs + ms;
      let he = endDate.getHours() * 60;
      let me = endDate.getMinutes();
      let minEnd = he + me;
      totalHours = totalHours + (minEnd - minStart);
      if(totalHours > limit){
        return false;
      }
      let currentSDate = newSlotCopy.date.setHours(0, 0, 0, 0);
      for (let k = 0; k < rawSlots.length; k++) {
        let rawSlot = rawSlots[k];
        let slots = this.separateTwoDaysSlot(rawSlot);
        for (let i = 0; i < slots.length; i++) {
          let s = slots[i];
          if (s.pause) {
            continue;
          }
          let ds = s.date;
          let de = s.dateEnd;
          let sCopy = this.cloneSlot(s);
          let sDate = sCopy.date.setHours(0, 0, 0, 0);
          if (sDate != currentSDate) {
            continue;
          }
          let hs = ds.getHours() * 60;
          let ms = ds.getMinutes() * 1;
          let minStart: number = hs + ms;
          let he = de.getHours() * 60;
          let me = de.getMinutes() * 1;
          let minEnd = he + me;
          totalHours = totalHours + (minEnd - minStart);
          if(totalHours > limit){
            return false;
          }
        }
      }
    }
    return true;
  }

  isSlotRespectsBreaktime(slots, newSlot){
    //breaktime is 11h converted to milliseconds
    let breaktime = 39600000;
    let copyNewSlot = this.cloneSlot(newSlot);
    for(let i = 0; i < slots.length; i++) {
      let s = slots[i];
      if (s.pause) {
        continue;
      }
      let copyS = this.cloneSlot(s);
      if (copyS.date.setHours(0, 0, 0, 0) == copyNewSlot.date.setHours(0, 0, 0, 0)) {
        continue;
      } else {
        if (copyS.date > copyNewSlot.date) {
          if (s.date.getTime() - newSlot.dateEnd.getTime() < breaktime) {
            return false;
          }
        } else {
          if (newSlot.date.getTime() - s.dateEnd.getTime() < breaktime) {
            return false;
          }
        }
      }
    }
    return true;
  }

  separateTwoDaysSlot(slot){
    let slotCopy = this.cloneSlot(slot);
    let sDate = slotCopy.date;
    let eDate = slotCopy.dateEnd;
    if(sDate.setHours(0, 0, 0, 0) == eDate.setHours(0, 0, 0, 0)){
      return [slot];
    }else{
      let s1 = {date: slot.date, dateEnd: new Date(sDate.setHours(23, 59)), startHour: slot.startHour, endHour: slot.endHour, pause: slot.pause};
      let s2 = {date: new Date(eDate.setHours(0, 0, 0, 0)), dateEnd: slot.dateEnd, startHour: slot.startHour, endHour: slot.endHour, pause: slot.pause};
      return [s1, s2];
    }
  }

  cloneSlot(slot){
    //trick to clone an object by value
    let newSlot = (JSON.parse(JSON.stringify(slot)));
    newSlot = {
      date: new Date(newSlot.date),
      dateEnd: new Date(newSlot.dateEnd),
      startHour: new Date(newSlot.startHour),
      endHour: new Date(newSlot.endHour),
      pause: newSlot.pause
    }
    return newSlot;
  }

  convertSlotsForSaving(slots){
    let newSlots = [];
    for(let i = 0; i < slots.length; i++){
      let newSlot = {
        date: slots[i].date.getTime(),
        dateEnd: slots[i].dateEnd.getTime(),
        startHour: this.getHourFromDate(slots[i].date),
        endHour: this.getHourFromDate(slots[i].dateEnd),
        pause: slots[i].pause
      }
      newSlots.push(newSlot);
    }
    return newSlots;
  }

  /*
  function returning a cloned list of current slots without the dragged slot
   */
  getSlotsForDraggingEvent(events, slots){
    let index = -1;
    //searching for the dragged slot
    for(let j = 0; j < slots.length; j++){
      for(let i = 0; i < events.length; i++){
        if(events[i].start._d.getTime() == slots[j].date.getTime() && events[i].end._d.getTime() == slots[j].dateEnd.getTime()){
          break;
        }
        if(i == events.length - 1 && events[i].start._d.getTime() != slots[j].date.getTime() && events[i].end._d.getTime() != slots[j].dateEnd.getTime()){
          //dragged slot found :-)
          index = j;
          break;
        }
      }
      //dragged slot found, no more searching
      if(index != -1){
        break;
      }
    }
    // create a copy of the slot list, and remove the dragged slot from it
    if(index != -1) {
      let clonedSlots = [];
      for (let i = 0; i < slots.length; i++) {
        let clonedSlot = this.cloneSlot(slots[i]);
        clonedSlots.push(clonedSlot);
      }
      clonedSlots.splice(index, 1);
      return clonedSlots;
    }else{
      return null;
    }
  }

  getOfferByIdFromLocal(currentUser, offerId){
    let offers = currentUser.employer.entreprises[0].offers;
    for(let i = 0; i < offers.length; i++){
      if(offers[i].idOffer == offerId){
        return offers[i];
      }
    }
    return null;
  }

  getOfferSoftwares(offerId){
    let sql = "select exp.pk_user_logiciels_des_offres as \"expId\", exp.fk_user_logiciels_pharmaciens as \"softId\", log.nom from user_logiciels_des_offres as exp, user_logiciels_pharmaciens as log where exp.fk_user_logiciels_pharmaciens = log.pk_user_logiciels_pharmaciens and exp.fk_user_offre_entreprise = '" + offerId + "'";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.data);
        });
    });
  }

  saveSoftware(software, offerId){
    let sql = " insert into user_logiciels_des_offres (fk_user_offre_entreprise, fk_user_logiciels_pharmaciens) values (" + offerId + ", " + software.id + ") RETURNING pk_user_logiciels_des_offres; ";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let expId = data.data[0].pk_user_logiciels_des_offres;
          resolve(expId);
        });
    });
  }

  deleteSoftware(id){
    let sql = "delete from user_logiciels_des_offres where pk_user_logiciels_des_offres =" + id;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  updateSoftware(id, exp){
    let sql = "update user_logiciels_des_offres set experience = " + exp + " where pk_user_logiciels_des_offres =" + id;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  countInterestedJobyersByOffer(entrepriseId){
    let sql = "select count(co.*) as \"interestedJobyers\", o.titre as title, o.pk_user_offre_entreprise as \"idOffer\" from " +
      " user_candidatures_aux_offres as co, user_offre_entreprise as o where " +
      " co.fk_user_offre_entreprise = o.pk_user_offre_entreprise and o.fk_user_entreprise = " + entrepriseId +
      " group by o.titre, o.pk_user_offre_entreprise ";
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
