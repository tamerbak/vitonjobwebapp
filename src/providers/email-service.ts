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
}