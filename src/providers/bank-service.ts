import {Injectable} from '@angular/core';
import {Configs} from '../configurations/configs';
import {Http, Headers} from '@angular/http';
import {Utils} from "../app/utils/utils";

@Injectable()
export class BankService {


  constructor(public http: Http) {
  }

  loadBankAccount(id, table, projectTarget){
    let sql = "select nom_de_banque, detenteur_du_compte, iban, bic " +
    "from user_coordonnees_bancaires where "+table+"="+id;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      });
    });
  }

  saveBankAccount(id, table, voidAccount, bank){
    let sql = "";
    let estEmployeur = table == "fk_user_jobyer"?"NON":"OUI";
    if(voidAccount)
    sql = "insert into user_coordonnees_bancaires (iban, bic, nom_de_banque, detenteur_du_compte, est_employeur, "+table+") values " +
    "('"+bank.iban+"', '"+bank.bic+"', '"+Utils.sqlfyText(bank.nom_de_banque)+"', '"+Utils.sqlfyText(bank.detenteur_du_compte.trim())+"', '"+estEmployeur+"', "+id+")";
    else
    sql = "update user_coordonnees_bancaires set iban='"+bank.iban+"', bic='"+bank.bic+"', nom_de_banque='"+Utils.sqlfyText(bank.nom_de_banque)+"', detenteur_du_compte='"+Utils.sqlfyText(bank.detenteur_du_compte)+"' where "+table+"="+id;

    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      });
    });
  }
}
