/**
 * Created by jakjoud on 20/10/2016.
 */
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Http, Headers} from "@angular/http";
import {Configs} from "../configurations/configs";

@Injectable()
export class HomeService {
  data: any;

  constructor(private http: Http) {
    this.data = null;
  }

  /**
   * Gets the appropriate home screen data for a preamptive selection of offers and tiers
   * @param projectType
   */
  loadHomeData(projectType: string) {
    let query = {
      "class": "com.vitonjob.model.Query",
      dateReference: null,
      resultCapacity: 10,
      resultCapacityOffers: 10,
      startIndex: 0,
      startIndexOffers: 0,
      type: projectType
    };

    let encodedArg = btoa(JSON.stringify(query));
    var payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 320,
      'args': [
        {
          'class': 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Document query',
          value: encodedArg
        }
      ]
    };

    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpJsonHeaders();

      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });

  }

  loadMore(projectType: string, offset: number, offersOffset) {
    let query = {
      "class": "com.vitonjob.model.Query",
      dateReference: null,
      resultCapacity: 5,
      resultCapacityOffers: 5,
      startIndex: offset,
      startIndexOffers: offersOffset,
      type: projectType
    };

    let encodedArg = btoa(JSON.stringify(query));
    var payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 320,
      'args': [
        {
          'class': 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Document query',
          value: encodedArg
        }
      ]
    };

    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpJsonHeaders();

      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });

  }


}