import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Configs} from "../configurations/configs";
import { SharedService } from './shared.service';

@Injectable()
export class OffersService {
  configuration;
  offerList: any;
  listSectors: any;
  listJobs: any;
  convention : any;

  constructor(private http: Http,private sharedService:SharedService) {
    this.http = http;
    this.convention = {
      id:0,
      code:'',
      libelle:''
    };
  }

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

  setOfferInLocal(offerData:any, projectTarget:string) {
        //  Init project parameters
        let offers:any;
        let result:any;

                var data = this.sharedService.getCurrentUser();
                if (projectTarget === 'employer') {
                    let rawData = data.employer;
                    if (rawData && rawData.entreprises && rawData.entreprises[0].offers) {
                        //adding userId for remote storing
                        offerData.identity = rawData.entreprises[0].id;
                        offers = rawData.entreprises[0].offers;
                        offers.push(offerData);
                        // Save new offer list in SqlStorage :
                        this.sharedService.setCurrentUser(data);
                    }
                } else { // jobyer
                    let rawData = data.jobyer;
                    if(rawData)
                        offerData.identity = rawData.id;
                    if (rawData && rawData.offers) {
                        //adding userId for remote storing
                        offers = rawData.offers;
                        offers.push(offerData);
                        // Save new offer list in SqlStorage :
                        this.sharedService.setCurrentUser(data);
                    }
                }
    }

  setOfferInRemote(offerData: any, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);

    offerData.class = 'com.vitonjob.callouts.auth.model.OfferData';
    offerData.idOffer = 0;
    offerData.jobyerId = 0;
    offerData.entrepriseId = 0;
    offerData.status = "OUI";
    offerData.visible = true;

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
      id: 332,
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
        .subscribe((data:any) => {
          let idOffer = JSON.parse(data._body).idOffer;

          this.updateEPI(idOffer,offerData.jobData.epi,projectTarget);

          if(offerData.jobData.prerequisObligatoires && offerData.jobData.prerequisObligatoires.length>0){
            switch (projectTarget) {
              case 'employer' :
                this.updatePrerequisObligatoires(idOffer,offerData.jobData.prerequisObligatoires);
                break;
              case 'jobyer':
                this.updateNecessaryDocuments(idOffer,offerData.jobData.prerequisObligatoires);
                break;
            }

          }
          resolve(data);
        });
    });
  }

  updateEPI(idOffer,plist,projectTarget){
    var table = projectTarget == 'employer' ? "user_epi_employeur":"user_epi_jobyer";
    var fk = projectTarget == 'employer' ? "fk_user_offre_entreprise":"fk_user_offre_jobyer";
    let sql = "delete from "+table+"where "+ fk+"="+idOffer;
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          for(let i = 0 ; i < plist.length ; i++){
            this.getEPI(plist[i]).then(id=>{
              if(id>0){
                this.doUpdateEPI(idOffer, id, projectTarget);
              }else{
                this.insertEPI(plist[i]).then(id=>{
                  this.doUpdateEPI(idOffer, id, projectTarget);
                });
              }
            });
          }
          resolve(data);
        });
    });
   }

  updateNecessaryDocuments(idOffer,plist){
    let sql = "delete from user_prerequis_jobyer where fk_user_offre_jobyer="+idOffer;
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          for(let i = 0 ; i < plist.length ; i++){
            this.getPrerequis(plist[i]).then(id=>{
              if(id>0){
                this.doUpdateNecessaryDocuments(idOffer, id);
              }else{
                this.insertPrerequis(plist[i]).then(id=>{
                  this.doUpdateNecessaryDocuments(idOffer, id);
                });
              }
            });
          }
          resolve(data);
        });
    });
   }

  updatePrerequisObligatoires(idOffer,plist){
    let sql = "delete from user_prerequis_obligatoires where fk_user_offre_entreprise="+idOffer;
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          for(let i = 0 ; i < plist.length ; i++){
            this.getPrerequis(plist[i]).then(id=>{
              if(id>0){
                this.doUpdatePrerequisObligatoire(idOffer, id);
              }else{
                this.insertPrerequis(plist[i]).then(id=>{
                  this.doUpdatePrerequisObligatoire(idOffer, id);
                });
              }
            });
          }
          resolve(data);
        });
    });
  }

  getPrerequis(p){
    let sql = "select pk_user_prerquis as id from user_prerquis where lower_unaccent(libelle) = lower_unaccent('"+p+"')";
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          let id = -1;
          if(data.data && data.data.length>0)
            id = data.data[0].id;
          resolve(id);
        });
    });
  }

  getEPI(p){
    let sql = "select pk_user_epi as id from user_epi where lower_unaccent(libelle) = lower_unaccent('"+p+"')";
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          let id = -1;
          if(data.data && data.data.length>0)
            id = data.data[0].id;
          resolve(id);
        });
    });
  }

  insertEPI(p){
    let sql = "insert into user_epi (libelle) values ('"+p+"') returning pk_user_epi";
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          let id = -1;
          if(data.data && data.data.length>0)
            id = data.data[0].pk_user_epi;
          resolve(id);
        });
    });
  }

  insertPrerequis(p){
    let sql = "insert into user_prerquis (libelle) values ('"+p+"') returning pk_user_prerquis";
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          let id = -1;
          if(data.data && data.data.length>0)
            id = data.data[0].pk_user_prerquis;
          resolve(id);
        });
    });
  }

  doUpdatePrerequisObligatoire(idOffer, idp){
    let sql = "insert into user_prerequis_obligatoires (fk_user_offre_entreprise, fk_user_prerquis) values ("+idOffer+","+idp+")";
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  doUpdateNecessaryDocuments(idOffer, idp){
    let sql = "insert into user_prerequis_jobyer (fk_user_offre_jobyer, fk_user_prerquis) values ("+idOffer+","+idp+")";
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  doUpdateEPI(idOffer, idp, projectTarget){
    var table = projectTarget == 'employer' ? "user_epi_employeur":"user_epi_jobyer";
    var fk = projectTarget == 'employer' ? "fk_user_offre_entreprise":"fk_user_offre_jobyer";
    let sql = "insert into "+table+" ("+fk+",fk_user_epi) values ("+idOffer+","+idp+")";
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
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
    let sql = "select adresse_google_maps from user_adresse where pk_user_adresse in (" +
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
            adr = data.data[0].adresse_google_maps;
          resolve(adr);
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
          if(offer.jobData.prerequisObligatoires){
            this.updateNecessaryDocuments(offer.idOffer,offer.jobData.prerequisObligatoires);
          }

          if(offer.jobData.epi){
            this.updateEPI(offer.idOffer,offer.jobData.epi,"jobyer");
          }
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

          if(offer.jobData.prerequisObligatoires){
            this.updatePrerequisObligatoires(offer.idOffer,offer.jobData.prerequisObligatoires);
          }

          if(offer.jobData.epi){
            this.updateEPI(offer.idOffer,offer.jobData.epi,"employer");
          }
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data);
        });
    });
  }

  updateOfferEntrepriseTitle(offer) {
    //
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
    let type = (projectTarget != "jobyer") ? 'jobyer' : 'employeur';
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
  getConvention(id){
    let sql = "select pk_user_convention_collective as id, code, libelle " +
      "from user_convention_collective " +
      "where pk_user_convention_collective ="+id+"";

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

  /**
   * Loading convention parameters
   * @param idConvention
   * @returns {Promise<T>}
   */
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

  getOfferConventionParameters(idOffer){
    let sql = "select pk_user_parametrage_convention as id, remuneration_de_reference as rate, " +
      "fk_user_convention_collective as idcc, fk_user_categorie_convention as idcat, " +
      "fk_user_echelon_convention as idechelon, fk_user_coefficient_convention as idcoeff, fk_user_niveau_convention_collective as idniv " +
      "from user_parametrage_convention where " +
      "pk_user_parametrage_convention in (select fk_user_parametrage_convention " +
        "from user_offre_entreprise " +
        "where pk_user_offre_entreprise="+idOffer+")";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data:any) => {
          let parameter = {
            idechelon: null,
            idcat:null,
            idcoeff:null,
            idniv:null
          };
          if(data.data && data.data.length>0){

            let d = data.data[0];
            if(d.idechelon && d.idechelon != 'null')
              parameter.idechelon = d.idechelon;
            if(d.idcat && d.idcat != 'null')
              parameter.idcat = d.idcat;
            if(d.idcoeff && d.idcoeff != 'null')
              parameter.idcoeff = d.idcoeff;
            if(d.idniv && d.idniv != 'null')
              parameter.idniv = d.idniv;
          }

          resolve(parameter);
        });
    });
  }

  saveOfferConventionParameters(idOffer, idParameter){
    let sql = 'update user_offre_entreprise set fk_user_parametrage_convention='+idParameter+' where pk_user_offre_entreprise='+idOffer;
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
   *  COLLECTIVE CONVENTIONS ADVANTAGES
   *********************************************************************************************************************/
  getHoursCategories(idConv){
    let sql = "select chc.pk_user_coefficient_heure_conventionnee as id, chc.libelle as libelle, cat.code as code from user_coefficient_heure_conventionnee chc, user_categorie_heures_conventionnees cat where chc.fk_user_categorie_heures_conventionnees=cat.pk_user_categorie_heures_conventionnees and fk_user_convention_collective="+idConv;
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

  getHoursMajoration(idConv){
    let sql = "select m.pk_user_majoration_heure_conventionnee as id, m.libelle as libelle, c.code as code from user_majoration_heure_conventionnee m, user_categorie_majoration_heure c where m.fk_user_categorie_majoration_heure=c.pk_user_categorie_majoration_heure and fk_user_convention_collective="+idConv;
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
    let sql = "select pk_user_indemnite_conventionnee as id, i.libelle as libelle, t.code as code from user_indemnite_conventionnee i, user_type_indemnite t where i.fk_user_type_indemnite = t.pk_user_type_indemnite and fk_user_convention_collective="+idConv;
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
    let sql = "select pk_user_prerquis as id, libelle from user_prerquis where lower_unaccent(libelle) like lower_unaccent('%"+kw+"%') or lower_unaccent(libelle) % lower_unaccent('"+kw+"')";

    return sql;
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

  calculateSlotsDuration(slots, newSlot){
    let totalHours = 0;
    for(let i = 0; i < slots.length; i++){
      let s = slots[i];
      let hs = s.startHour.split(':')[0] * 60;
      let ms = s.startHour.split(':')[1] * 1;
      let minStart: number = hs + ms;
      let he = s.endHour.split(':')[0] * 60;
      let me = s.endHour.split(':')[1] * 1;
      let minEnd = he + me;
      totalHours = totalHours + (minEnd - minStart);
    }
    let hs = newSlot.startHour.getHours() * 60;
    let ms = newSlot.startHour.getMinutes();
    let minStart = hs + ms;
    let he = newSlot.endHour.getHours() * 60;
    let me = newSlot.endHour.getMinutes();
    let minEnd = he + me;
    totalHours = totalHours + (minEnd - minStart);
    return totalHours;
  }
}