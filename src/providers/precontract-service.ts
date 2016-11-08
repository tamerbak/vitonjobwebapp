import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Helpers} from "./helpers.service";
import {Configs} from "../configurations/configs";

@Injectable()
export class PrecontractService{
  data : any;

  constructor(public http:Http,
              private helpers:Helpers){

  }

  getContractProject(idTiers, type, URL){
    let sql = "";
    if(type == 'jobyer')
      sql = "select pk_user_projet_de_contrat as id, employeur_actif as coActive, donnees_employeur_mis_a_jour as newData, " +
        "derniere_maj_employeur as updateDate, validation_employeur as completed, fk_user_entreprise as idTiers, fk_user_offre_entreprise " +
        "from user_projet_de_contrat " +
        "where fk_user_jobyer="+idTiers+" AND url_jobyer='"+URL+"'";
    else
      sql = "select pk_user_projet_de_contrat as id, jobyer_actif as coActive, donnees_jobyer_mis_a_jour as newData, " +
        "derniere_maj_jobyer as updateDate, validation_jobyer as completed, fk_user_jobyer as idTiers, fk_user_offre_entreprise " +
        "from user_projet_de_contrat " +
        "where fk_user_entreprise="+idTiers+" AND url_employeur='"+URL+"'";

    console.log(sql);

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data:any) => {
          let table = data.data;
          if(!table || table.length == 0){
            this.data = {
              isValid : false
            };
          } else{
            this.data = table[0];
            this.data.isValid = true;
          }
          resolve(this.data);
        });
    });
  }

  insertFields(contract, fields, type){
    let sql = "insert into user_rubrique_de_contrat " +
      " (identifiant, type_de_rubrique, valeur_actuelle, date_maj, recuperee, fk_user_projet_de_contrat) " +
      " values ";
    for(let i = 0 ; i < fields.length ; i++){
      let f = fields[i];
      let value = '';
      if(typeof f.value === 'boolean')
        value = f.value?'oui':'non';
      else
        value = f.value;
      sql = sql+" ('"+f.id+"','"+type+"','"+value+"','"+this.helpers.dateToSqlTimestamp(new Date())+"','non',"+contract.id+") ";

    }
    console.log(sql);
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data:any) => {
          resolve(data);
        });
    });
  }

  pushFields(contract, fields, type){
    let sql = "";
    for(let i = 0 ; i < fields.length ; i++){
      let f = fields[i];
      let value = '';
      if(typeof f.value === 'boolean')
        value = f.value?'oui':'non';
      else
        value = f.value;
      sql = sql+"update user_rubrique_de_contrat set " +
        "valeur_actuelle='"+value+"'," +
        "date_maj='"+this.helpers.dateToSqlTimestamp(new Date())+"'," +
        "recuperee='non' " +
        "where fk_user_projet_de_contrat="+contract.id+" " +
        "and identifiant='"+f.id+"' " +
        "and type_de_rubrique='"+type+"';";
    }
    console.log(sql);
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data:any) => {
          resolve(data);
        });
    });
  }

  pullFields(contract, type){
    let sql = "select pk_user_rubrique_de_contrat, identifiant as id, valeur_actuelle as value " +
      "from user_rubrique_de_contrat " +
      "where fk_user_projet_de_contrat="+contract.id+" " +
      "and type_de_rubrique<>'"+type+"' " +
      "and recuperee='non'";
    console.log(sql);
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data:any) => {
          let fields = [];
          if(data && data.data && data.data.length>0){
            fields = data.data;
            this.markAsRead(fields);
          }
          resolve(fields);
        });
    });
  }

  markAsRead(fields){
    let ids = "("+fields[0].pk_user_rubrique_de_contrat;
    for(let i = 1 ; i < fields.length ; i++)
      ids = ids+","+fields[i].pk_user_rubrique_de_contrat;
    ids = ids+")"
    let sql = "update user_rubrique_de_contrat set recuperee='oui' where pk_user_rubrique_de_contrat in "+ids;
    console.log(sql);
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data:any) => {
          resolve(data);
        });
    });
  }

  saveProject(idEntreprise, offerId, idJobyer, urlEmpl, urljobyer){
    let sql = "insert into user_projet_de_contrat (url_employeur, url_jobyer, " +
      "employeur_actif, jobyer_actif, " +
      "donnees_employeur_mis_a_jour, donnees_jobyer_mis_a_jour, " +
      "derniere_maj_employeur, derniere_maj_jobyer, " +
      "validation_employeur, validation_jobyer, " +
      "fk_user_offre_entreprise, fk_user_entreprise, fk_user_jobyer) " +
      "values " +
      "('"+urlEmpl+"', '"+urljobyer+"', " +
      "'OUI', 'NON', " +
      "'"+this.helpers.dateToSqlTimestamp(new Date())+"', '"+this.helpers.dateToSqlTimestamp(new Date())+"', " +
      "'"+this.helpers.dateToSqlTimestamp(new Date())+"', '"+this.helpers.dateToSqlTimestamp(new Date())+"', " +
      "'NON', 'NON', " +
      ""+offerId+", "+idEntreprise+", "+idJobyer+")";
    console.log(sql);
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data:any) => {
          resolve(data);
        });
    });
  }
}
