import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Configs} from "../configurations/configs";

@Injectable()
export class EmailService{
  constructor(public http: Http){
  }

  sendEmail(email, title, msg) {
    let url = Configs.emailURL;
    let payload = "<fr.protogen.connector.model.MailModel>"
      + "<sendTo>" + email + "</sendTo>"
      + "<title>" + title + "</title>"
      + "<content>" + msg + "</content>"
      + "<status></status>"
      + "</fr.protogen.connector.model.MailModel>";

    return new Promise(resolve => {
      let headers = Configs.getHttpXmlHeaders();
      this.http.post(url, payload, {headers: headers})
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  sendContractNotification(numContrat : string) {
    let body = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      id: 90002,
      args: [
        {
          class: 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'numero de contrat',
          value: btoa(numContrat)
        }
      ]
    };

    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, body, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any) => {
          resolve(data);
        });
    });
  }
}
