
import {Injectable} from "@angular/core";
import {CCallout} from "../dto/generium/ccallout";
import {CCalloutArguments} from "../dto/generium/ccallout-arguments";
import {Configs} from "../configurations/configs";
import {Http} from "@angular/http";

const CAMPAIGN_CALLOUT_ID = 70000;

@Injectable()
export class CampaignService {

  constructor(private http: Http) {
  }

  /**
   * Establish the connection with the Campaign callout
   *
   * @param subject
   * @param token
   * @returns {Promise<T>}
   * @private
   */
  private _getCampaign(subject, token) {

    // Build payload
    let payloadFinal = new CCallout(CAMPAIGN_CALLOUT_ID, [
      new CCalloutArguments(subject, token),
    ]);

    // Call the Callout
    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, payloadFinal.forge(), {headers: headers})
        .subscribe((data: any) => {
          resolve(data);
        });
    });
  }

  /**
   * Get campaign by code
   *
   * @param code
   * @returns {Promise<T>}
   */
  getCampaignByCode(code: string) {
    let token = {
      'class': 'com.vitonjob.callouts.commun.model.Token',
      'mode': 'view',
      'code': code,
    };
    return this._getCampaign('Récupération code promo', token);
  }

  /**
   * Subscribe the account to the given campaign
   *
   * @param code
   * @param idAccount
   * @returns {Promise<T>}
   */
  subscribeToCampaign(code: string, idAccount: number) {
    let token = {
      'class': 'com.vitonjob.callouts.commun.model.Token',
      'mode': 'view',
      'code': code,
      'subscriber': idAccount,
    };
    return this._getCampaign('Inscrire compte au code promo', token);
  }

  /**
   * Retrieve the list of Campaign that the account is subscribe
   *
   * @param idAccount
   * @returns {Promise<T>}
   */
  getCampaignsPerAccount(idAccount: number) {
    let token = {
      'class': 'com.vitonjob.callouts.commun.model.Token',
      'mode': 'view',
      'subscriber': idAccount,
    };
    return this._getCampaign("Récupération des codes promos d'un compte", token);
  }
}
