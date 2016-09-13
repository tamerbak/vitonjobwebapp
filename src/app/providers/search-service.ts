import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Configs} from '../configurations/configs';

/**
 * @author jakjoud abdeslam
 * @description web service access point for semantic and regular search
 * @module Search
 */
@Injectable()
export class SearchService {
  data: any = null;
  configuration : any;
  constructor(public http: Http) {
  }

  /**
   * @description Make search by criteria and return a promise of results
   * @param searchQuery The filters of the search
   * @param projectTarget project configuration (jobyer/employer)
   * @return a promise of data results in the same format of the semantic search
     */
  criteriaSearch(searchQuery : any, projectTarget : string){
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);

    //  Prepare payload
    var query = JSON.stringify(searchQuery);

    var payload = {
      'class' : 'fr.protogen.masterdata.model.CCallout',
      id : 246,
      args : [
        {
          class : 'fr.protogen.masterdata.model.CCalloutArguments',
          label : 'Requete de recherche',
          value : btoa(query)
        }
      ]
    };

    // don't have the data yet
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers:headers})
          .map(res => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          });
    });
  }
}