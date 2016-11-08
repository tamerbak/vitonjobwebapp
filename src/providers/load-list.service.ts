import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Configs} from "../configurations/configs";

/**
 * @author Amal ROCHD
 * @description web service access point for loading data from server
 * @module Authentication
 */

@Injectable()
export class LoadListService {
  configuration;

  constructor(private http: Http) {
    this.http = http;
  }

  /**
   * @description load a list of countries with their codes
   * @return JSON results in the form of {country name, country code}
   */
  loadCountries(projectTarget) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    var sql = "SELECT pk_user_pays as id, nom, indicatif_telephonique FROM user_pays ORDER BY nom";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();

      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }


  loadCountry(paysId) {
    //  Init project parameters
    var sql = "SELECT pk_user_pays as id, nom, indicatif_telephonique FROM user_pays where pk_user_pays ="+ paysId;

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
   * @description load a list of nationalities
   * @return JSON results
   */
  loadNationalities() {
    var sql = "SELECT pk_user_nationalite, libelle FROM user_nationalite WHERE dirty = 'N' ORDER BY libelle";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();

      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  loadNationality(nationalityId) {
    var sql = "SELECT pk_user_nationalite, libelle FROM user_nationalite WHERE  pk_user_nationalite='"+nationalityId +"' and dirty = 'N' ORDER BY libelle";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();

      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          console.log("done",data);
          resolve(data);
        });
    })
  }

  loadConventions() {
    let sql = "select pk_user_convention_collective as id, code, libelle from user_convention_collective";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();

      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.data);
        });
    });
  }

  /**
   * @description     loading qualities list
   * @return qualities list in the format {id : X, libelle : X}
   */
  loadQualities(projectTarget: string, type: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    var sql = "select pk_user_indispensable as \"idQuality\", libelle as libelle from user_indispensable where UPPER(dirty) ='N' and type='" + type + "'";
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