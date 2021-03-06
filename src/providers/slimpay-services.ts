import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Configs} from "../configurations/configs";

// declare function Promise(): any;

@Injectable()
export class SlimPayService{

  constructor(public http: Http) {
  }

  signSEPA(entrepriseId) {
    //Prepare the request
    let bean: any =
    {
      class: 'com.vitonjob.slimpay.model.SlimpayConfig',
      idEntreprise: entrepriseId
    };
    let encodedArg = btoa(JSON.stringify(bean));

    // Compute ID according to env
    let calloutId = 10011;
    if (Configs.env == 'PROD') {
      calloutId = 326;
    }

    var payload = {
      class: 'fr.protogen.masterdata.model.CCallout',
      'id': calloutId,
      'args': [
        {
          class: 'fr.protogen.masterdata.model.CCalloutArguments',
          value: encodedArg
        }
      ]
    };

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpJsonHeaders();

      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  checkSEPARequestState(entrepriseId) {
    let sql = 'select etat_demande_sepa as etat from user_coordonnees_bancaires where fk_user_entreprise=' + entrepriseId;
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
}
