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

  loadList(src: string, selectedList: any) {

    let ids: number[] = [];
    for (let i = 0; i < selectedList.length; ++i) {
      ids.push(selectedList[i].id);
    }

    let sql = "SELECT " +
      "pk_user_" + src + " as id" +
      ", libelle " +
      ", dirty " +
      "FROM user_" + src + " "
    ;
    if (ids.length > 0) {
      sql += "WHERE pk_user_" + src + " IN (" + ids.join() + ");";
    } else {
      sql += "WHERE dirty = 'N';";

    }

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();

      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.status == "success") {
            resolve(data.data);
          } else {
            resolve(null);
          }
        });
    });

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
    let sql = "SELECT pk_user_convention_collective as id, code, libelle " +
      "FROM user_convention_collective " +
      "WHERE dirty = 'N' " +
      "ORDER BY libelle ASC;"
    ;
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
    var sql = "select pk_user_indispensable as \"id\", libelle as libelle from user_indispensable where UPPER(dirty) ='N' and type='" + type + "'";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  loadLanguages() {
    var sql = "select " +
      "pk_user_langue as id" +
      ", libelle" +
      ", \'junior\' as level " +
      "from user_langue " +
      "where UPPER(dirty) ='N' order by libelle asc";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  loadPharmacieSoftwares(){
    let sql = "select pk_user_logiciels_pharmaciens as id, nom from user_logiciels_pharmaciens where UPPER(dirty) ='N' order by nom asc";
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
