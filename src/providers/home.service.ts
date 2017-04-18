/**
 * Created by jakjoud on 20/10/2016.
 */
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Http, Headers} from "@angular/http";
import {Configs} from "../configurations/configs";
import {Offer} from "../dto/offer";

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
      resultCapacity: 8,
      resultCapacityOffers: 8,
      startIndex: 0,
      startIndexOffers: 0,
      type: projectType
    };

    if(query.type == null)
      query.type = 'jobyer';

    let encodedArg = btoa(JSON.stringify(query));
    var payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 10012,
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

    if(query.type == null)
      query.type = 'jobyer';

    let encodedArg = btoa(JSON.stringify(query));
    var payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 10012,
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

          for (let i = 0; i < this.data.recentOffers.length; ++i) {
            this.data.recentOffers[i].idMetier = 0;
          }
          for (let i = 0; i < this.data.upcomingOffers.length; ++i) {
            this.data.upcomingOffers[i].idMetier = 0;
          }


          resolve(this.data);
        });
    });

  }

  loadOfferType(projectType: string, offers: any) {

    console.log('loadOfferType');

    let ids = [];
    console.log(offers);
    for (let i = 0; i < offers.recentOffers.length; ++i) {
      ids.push(offers.recentOffers[i].idOffer);
    }
    for (let i = 0; i < offers.upcomingOffers.length; ++i) {
      ids.push(offers.upcomingOffers[i].idOffer);
    }
    console.log('ids: ' + ids.join(', '));

    let to = projectType == 'jobyer' ? 'user_offre_entreprise' : 'user_offre_jobyer';
    // let sql = "select adresse_google_maps, nom, numero  from user_adresse where pk_user_adresse in (" +
    //   "select fk_user_adresse from " + table + " where pk_" + table + " in (" +
    //     "select fk_" + table + " from " + to + " where pk_" + to + " IN (" + ids.join(", ") + ")" +
    //     ")" +
    //   ")"
    // ;

    let sql = " SELECT j.fk_user_metier, o.pk_" + to +
    " FROM user_pratique_job pj" +
    " LEFT JOIN user_job j ON j.pk_user_job = pj.fk_user_job" +
    " LEFT JOIN " + to + " o ON o.pk_" + to + " = pj.fk_" + to + "" +
    " WHERE o.pk_" + to + " IN (" + ids.join(", ") + ")"
    ;
    console.log(sql);


    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data : any) => {

          console.log(data);

          let typePerOfferId = [];
          for (let i = 0; i < data.data.length; ++i) {
            typePerOfferId[data.data[i]['pk_' + to]] = data.data[i]['fk_user_metier'];
          }

          for (let i = 0; i < offers.recentOffers.length; ++i) {
            if (typePerOfferId[offers.recentOffers[i].idOffer]) {
              offers.recentOffers[i].idMetier = typePerOfferId[offers.recentOffers[i].idOffer];
            }
          }
          for (let i = 0; i < offers.upcomingOffers.length; ++i) {
            if (typePerOfferId[offers.upcomingOffers[i].idOffer]) {
              offers.upcomingOffers[i].idMetier = typePerOfferId[offers.upcomingOffers[i].idOffer];
            }
          }

          console.log(offers);

          resolve(data);
        });
    });
  }
}
