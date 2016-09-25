import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Configs} from "../configurations/configs";


@Injectable()
export class CommunesService {
  data: any = null;

  constructor(public http: Http) {
  }

  getCommunes(letters) {
    let sql = "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) % lower_unaccent('" + letters + "') limit 5";
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
          this.data = data.data;
          resolve(this.data);
        });
    });
  }

  loadCities() {
    let sql = "select pk_user_ville as id, nom from user_ville order by nom asc";

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
          this.data = data.data;
          resolve(this.data);
        });
    });
  }

  autocompleteCity(letters) {
    let sql = "select pk_user_ville as id, nom from user_ville where lower_unaccent(nom) % lower_unaccent('" + letters + "') order by nom asc limit 5";
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
