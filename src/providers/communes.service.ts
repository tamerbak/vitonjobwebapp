import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Configs} from "../configurations/configs";


@Injectable()
export class CommunesService{
  data: any = null;

  constructor(public http: Http){
  }

  getCitiesByTerm(){
    return function(term, page){
      return "select pk_user_ville as id, nom from user_ville where lower_unaccent(nom) % lower_unaccent('" + term + "') order by nom asc limit 5";
    }
  }

  /*getCommunesByTerm(term, selectedCP){
    if (!selectedCP || selectedCP == 0) {
      return "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('%" + term + "%') UNION select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('" + term + "') limit 5";
    } else {
      return "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('%" + term + "%') and fk_user_code_postal=" + selectedCP + " UNION select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('" + term + "') and fk_user_code_postal=" + selectedCP + " limit 5";
    }
  }*/

  getCommunesByTerm(term, birthdep){
    if (!birthdep || birthdep == 0) {
      return "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('%" + term + "%') UNION select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('" + term + "') limit 5";
    } else {
      return "select c.pk_user_commune as id, c.nom, c.code_insee, cp.code from user_commune as c, user_code_postal as cp " +
        " where lower_unaccent(c.nom) like  lower_unaccent('%" + term + "%') and c.fk_user_code_postal = cp.pk_user_code_postal and CAST(cp.code as text) like '" + birthdep + "%' " +
        "UNION select c.pk_user_commune as id, c.nom, c.code_insee, cp.code from user_commune as c, user_code_postal as cp " +
        " where lower_unaccent(c.nom) like lower_unaccent('" + term + "') and c.fk_user_code_postal = cp.pk_user_code_postal and CAST(cp.code as text) like '"
        + birthdep + "%'";
    }
  }

  getCodesPostauxByTerm(){
    return function(term, page){
      return "select pk_user_code_postal as id, code from user_code_postal where code like '%" + term + "%'" // search term
    }
  }

  getDepartmentsByTerm(){
    return function(term, page){
      return "select pk_user_departement as id, nom, numero from user_departement where numero like '%" + term + "%'"
    }
  }

  getPrefecturesByTerm(){
    return function(term, page){
      return "select pk_user_prefecture as id, nom from user_prefecture where lower_unaccent(nom) like lower_unaccent('%" + term + "%') limit 10";
    }
  }

  getCommune(cname){
    let sql = "select c.pk_user_commune as id, c.nom, c.code_insee, c.fk_user_code_postal, cp.code " +
      "from user_commune c left join user_code_postal cp on c.fk_user_code_postal = cp.pk_user_code_postal " +
      "where c.nom='" + cname + "'";

    return new Promise(resolve =>{
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data =>{
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data.data;
          resolve(this.data);
        });
    });
  }

  getCommunes(letters, idcp){
    let sql = "";
    if (!idcp || idcp == 0)
      sql = "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) % lower_unaccent('" + letters + "') limit 5";
    else
      sql = "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) % lower_unaccent('" + letters + "') and fk_user_code_postal=" + idcp + " limit 5";
    return new Promise(resolve =>{
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data =>{
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data.data;
          resolve(this.data);
        });
    });
  }

  getCommunesExact(letters, idcp){
    let sql = "";
    if (!idcp || idcp == 0)
      sql = "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('%" + letters + "%') limit 5";
    else
      sql = "select pk_user_commune as id, nom, code_insee from user_commune where lower_unaccent(nom) like lower_unaccent('%" + letters + "%') and fk_user_code_postal=" + idcp + " limit 5";
    return new Promise(resolve =>{
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data =>{
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data.data;
          resolve(this.data);
        });
    });
  }

  loadCities(){
    let sql = "select pk_user_ville as id, nom from user_ville order by nom asc";

    return new Promise(resolve =>{
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data =>{
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data.data;
          resolve(this.data);
        });
    });
  }

  autocompleteCity(letters){
    let sql = "select pk_user_ville as id, nom from user_ville where lower_unaccent(nom) % lower_unaccent('" + letters + "') order by nom asc limit 5";
    return new Promise(resolve =>{
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        });
    });

  }

  getDepartmentById(id){
    let sql = "select pk_user_departement as id, nom, numero from user_departement where pk_user_departement = '" + id + "'";
    return new Promise(resolve =>{
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data =>{
          resolve(data);
        });
    });
  }
}