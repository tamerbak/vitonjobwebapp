/**
 * Created by kelvin on 19/12/2016.
 */

import {Injectable} from '@angular/core';
import {SharedService} from "./shared.service";

declare var Messenger: any;

@Injectable()
export class EntrepriseService {
  constructor(private sharedService: SharedService) {
  }

  /**
   * Switch active entreprise
   *
   * @param user
   * @param id
   */
  swapEntreprise(id) {
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

  }
}
