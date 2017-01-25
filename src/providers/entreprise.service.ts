/**
 * Created by kelvin on 19/12/2016.
 */

import {Injectable} from '@angular/core';
import {SharedService} from "./shared.service";
import {Configs} from "../configurations/configs";
import {Http} from "@angular/http";

declare var Messenger: any;

@Injectable()
export class EntrepriseService {
  constructor(private sharedService: SharedService,
              private http: Http) {
  }

  /**
   * Switch active entreprise
   *
   * @param user
   * @param id
   */
  swapEntreprise(id): any[] {
    let user = this.sharedService.getCurrentUser();

    let entrepriseTmp = user.employer.entreprises[0];
    user.employer.entreprises[0] = user.employer.entreprises[id];
    user.employer.entreprises[id] = entrepriseTmp;

    this.sharedService.setCurrentUser(user);
    console.log('Switch from "' + entrepriseTmp.nom + '" to "' + user.employer.entreprises[0].nom + '".');

    Messenger().post({
      message: 'Vous êtes bien connecté en tant que ' + user.employer.entreprises[0].nom + '.' ,
      type: 'success',
      showCloseButton: true
    });

    return user.employer.entreprises;
  }

  createEntreprise(accountId, employerId, companyname, ape, conventionId) {
    let sql = "insert into user_entreprise (" +
      "fk_user_account," +
      "fk_user_employeur," +
      "nom_ou_raison_sociale," +
      "ape_ou_naf," +
      "fk_user_convention_collective" +
      ") VALUES (" +
      "'" + accountId + "'," +
      "'" + employerId + "'," +
      "'" + companyname + "'," +
      "'" + ape + "'," +
      "" + conventionId + "" +
      ") returning pk_user_entreprise";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  checkEntrepriseNameAvailable() {
    return true;
  }
}
