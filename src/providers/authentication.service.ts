import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Configs} from "../configurations/configs";

/**
 * @author Amal ROCHD
 * @description web service access point for user authentication and inscription
 * @module Authentication
 */

@Injectable()
export class AuthenticationService {
  configuration;

  constructor(private http: Http) {
    this.http = http;
  }

  /**
   * @description get user information by his phone and role
   * @param phone, role
   * @return JSON results in the form of user accounts
   */
  getUserByPhone(tel, role) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(role);
    var sql = "select pk_user_account, email, role from user_account where telephone = '" + tel + "'";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  getUserByPhoneAndRole(tel, role) {
    //  Init project parameters
    role = role == "employer" ? "employeur":role;
    var sql = "select email, role,mot_de_passe from user_account where role= '"+role+"' and telephone = '" + tel + "'";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      });
    })
  }

  /**
   * @description get user information by his mail and role
   * @param mail, role
   * @return JSON results in the form of user accounts
   */
  getUserByMail(mail, role) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(role);

    var sql = "select pk_user_account, email, telephone, role from user_account where LOWER(email) = lower_unaccent('" + mail + "')";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  /**
   * @description Insert a user_account if it does not exist
   * @param email, phone, password, role
   * @return JSON results in the form of user accounts
   */
  authenticate(email, phone, password, projectTarget, isRecruteur) {
    //debugger;
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);

    //Prepare the request
    var login: any =
    {
      'class': 'com.vitonjob.callouts.auth.AuthToken',
      'email': email,
      'telephone': "+" + phone,
      'password': password,
      'role': (isRecruteur ? 'recruteur' : (projectTarget == 'employer' ? 'employeur' : projectTarget))
    };
    login = JSON.stringify(login);

    var encodedLogin = btoa(login);
    var dataLog = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 20015,
      'args': [{
        'class': 'fr.protogen.masterdata.model.CCalloutArguments',
        label: 'requete authentification',
        value: encodedLogin
      }]
    };
    let body = JSON.stringify(dataLog);

    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, body, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  setNewPassword(phoneOrEmail) {
    let encodedArg = btoa(phoneOrEmail);

    let payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      id: 152,
      args: [{
        'class': 'fr.protogen.masterdata.model.CCalloutArguments',
        label: 'Contact to create',
        value: encodedArg
      }]
    };
    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(this.configuration.calloutURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getPasswordStatus(tel) {
    var sql = "select mot_de_passe_reinitialise from user_account where telephone = '" + tel + "'";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  updatePasswordByPhone(tel, passwd,reset) {
    //var sql = "update user_account set mot_de_passe = '" + passwd + "' where pk_user_account = '" + id + "';";
    var sql = "update user_account set mot_de_passe = '" + passwd + "' , mot_de_passe_reinitialise = '" + reset + "' where telephone = '" + tel + "';";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  sendPasswordBySMS(tel, passwd) {
    tel = tel.replace('+', '00');
    let url = Configs.smsURL;
    let payload = "<fr.protogen.connector.model.SmsModel>"
      + "<telephone>" + tel + "</telephone>"
      + "<text>Votre mot de passe est: " + passwd + ".</text>"
      + "</fr.protogen.connector.model.SmsModel>";

    return new Promise(resolve => {
      let headers = Configs.getHttpXmlHeaders();
      this.http.post(url, payload, {headers: headers})
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  sendPasswordByEmail(email, passwd) {
    let url = Configs.emailURL;
    let payload = "<fr.protogen.connector.model.MailModel>"
      + "<sendTo>" + email + "</sendTo>"
      + "<title>Vit-On-Job - Mot de passe réinitialisé</title>"
      + "<content>"
      + "Suite à votre requête nous avons procédé à une rénitialisation de votre mot de passe."
      + " Votre nouveau mot de passe est : " + passwd
      + "</content>"
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

  updatePasswordByMail(email, password,reset) {
    let sql = "update user_account set mot_de_passe = '" + password + "' , mot_de_passe_reinitialise = '" + reset + "' where email = '" + email + "';";
    //let sql = "update user_account set mot_de_passe = '" + password + "' where email = '" + email + "';";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  updatePasswd(passwd, id,reset) {
    //var sql = "update user_account set mot_de_passe = '" + passwd + "' where pk_user_account = '" + id + "';";
    var sql = "update user_account set mot_de_passe = '" + passwd + "' , mot_de_passe_reinitialise = '" + reset + "' where pk_user_account = '" + id + "';";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }
}
