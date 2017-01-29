import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Configs} from "../configurations/configs";

/**
 * @author jakjoud abdeslam
 * @description web service access point for semantic and regular search
 * @module Search
 */
@Injectable()
export class SearchService {
  data: any = null;
  configuration: any;

  constructor(public http: Http) {
  }

  /**
   * @description Make search by criteria and return a promise of results
   * @param searchQuery The filters of the search
   * @param projectTarget project configuration (jobyer/employer)
   * @return a promise of data results in the same format of the semantic search
   */
  criteriaSearch(searchQuery: any, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);

    //  Prepare payload
    var query = JSON.stringify(searchQuery);

    var payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      id: 11,
      args: [
        {
          class: 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Requete de recherche',
          value: btoa(query)
        }
      ]
    };

    // don't have the data yet
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  advancedSearch(searchQuery: any) {
    //  Prepare payload
    var query = JSON.stringify(searchQuery);

    var payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      id: 10045,
      args: [
        {
          class: 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Requete de recherche',
          value: btoa(query)
        }
      ]
    };

    // don't have the data yet
    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  /**
   * @description Performs a natural language search on the database and returns offers
   * @param textQuery
   * @param referenceOffer
   * @return JSON results in form of offers
   */
  semanticSearch(textQuery: string, referenceOffer: number, projectTarget: string) {
    //  Start by identifying the wanted table and prepare the pay load

    let searchType = projectTarget == 'jobyer' ? 'employeur' : 'jobyer';
    let bean =  {
      class :"com.vitonjob.callouts.recherche.model.RequeteRecherche",
      sentence :textQuery,
      type :searchType
    };

    let payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      id: 10046,
      args: [
        {
          class: 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Requete de recherche',
          value: btoa(JSON.stringify(bean))
        }
      ]
    };

    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  /**
   * @description Correct bias parameter of job probability
   * @param index search request identifier
   * @param idJob actual job to consider
   * @returns {Promise<T>|Promise}    Just a status to indicate if the indexation was successful
   */
  correctIndexation(index, idJob){
    let bean =  {
      class :"com.vitonjob.callouts.recherche.model.RequeteIndexation",
      idIndex :index,
      idJob :idJob
    };

    let payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      id: 10048,
      args: [
        {
          class: 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Correction des indexes',
          value: btoa(JSON.stringify(bean))
        }
      ]
    };

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe((data:any) => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

  searchOffersByCity(textQuery, projectTarget){
    let bean = {
      "class": "com.vitonjob.recherche.model.SearchQuery",
      "endDate": null,
      "endHour": 0,
      "firstName": null,
      "idAccount": 0,
      "idEnterprise": 0,
      "idOffer": 0,
      "job": -1,
      "languages": [],
      "lastName": null,
      "level": 0,
      "location": textQuery,
      "qualities": [],
      "queryType": "CRITERIA",
      "resultsType": (projectTarget == 'jobyer' ? 'employer' : 'jobyer'),
      "sector": 0,
      "startDate": null,
      "startHour": 0
    };

    let payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      id: 10047,
      args: [
        {
          class: 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Requete de recherche',
          value: btoa(JSON.stringify(bean))
        }
      ]
    };

    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
}
