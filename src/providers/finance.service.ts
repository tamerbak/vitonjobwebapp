import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Http, Headers} from "@angular/http";
import {Configs} from "../configurations/configs";


/*
 Generated class for the FinanceService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class FinanceService {
  data: any;
  invoiceId: number = 0;
  configuration: any;
  projectTarget: any;

  constructor(private http: Http) {
    this.data = null;
  }

  loadPrevQuote(id) {
    let bean = {
      'class': 'com.vitonjob.api.CalloutConfiguration',
      idContrat: 0,
      idOffre: id,
      mode: 'VALEURS',
      preContract: true,
      documentType: 'NONE',
      env: Configs.env
    };

    let str = JSON.stringify(bean);
    let encodedArg = btoa(str);
    var payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 10042,
      'args': [
        {
          'class': 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Document query',
          value: encodedArg
        }
      ]
    };

    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();

      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);

        });
    });

  }

  loadPrevQuotePdf(id) {
    let bean = {
      'class': 'com.vitonjob.api.CalloutConfiguration',
      idContrat: 0,
      idOffre: id,
      mode: 'VALEURS',
      preContract: true,
      documentType: 'PREV',
      env: Configs.env
    };

    let str = JSON.stringify(bean);
    let encodedArg = btoa(str);
    var payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 10042,
      'args': [
        {
          'class': 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Document query',
          value: encodedArg
        }
      ]
    };

    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();

      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);

        });
    });
  }

  loadQuote(id, rate) {
    let bean = {
      'class': 'com.vitonjob.api.CalloutConfiguration',
      idContrat: 0,
      idOffre: id,
      mode: 'VALEURS',
      preContract: true,
      documentType: 'QUOTE',
      env: Configs.env
    };

    let encodedArg = btoa(JSON.stringify(bean));
    var payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 10042,
      'args': [
        {
          'class': 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Document query',
          value: encodedArg
        }
      ]
    };

    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpJsonHeaders();

      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          //// debugger;
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

  loadInvoice(idContrat, id, rate) {
    let bean = {
      'class': 'com.vitonjob.api.CalloutConfiguration',
      idContrat: idContrat,
      idOffre: id,
      mode: 'VALEURS',
      preContract: false,
      documentType: 'INVOICE',
      env: Configs.env
    };

    let encodedArg = btoa(JSON.stringify(bean));
    var payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 10042,
      'args': [
        {
          'class': 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Document query',
          value: encodedArg
        }
      ]
    };

    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpJsonHeaders();

      this.http.post(Configs.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          //// debugger;
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }

  loadInvoiceSignature(idInvoice) {
    let sql = "select * from user_facture_voj where pk_user_facture_voj=" + idInvoice;

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.data[0];
          resolve(this.data);
        });
    });
  }

  checkInvoice(idContrat) {
    let sql = "select * from user_facture_voj where fk_user_contrat=" + idContrat;

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.invoiceId = 0;
          this.data = null;
          if (data && data.data && data.data.length > 0) {
            this.data = data.data[0];
          }

          resolve(this.data);
        });
    });
  }
}
