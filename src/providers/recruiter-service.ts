import {Injectable} from '@angular/core';
import {Configs} from '../configurations/configs';
import {Http, Headers} from '@angular/http';
declare function md5(value: string): string;

@Injectable()
export class RecruiterService {

  configuration: any;
  projectTarget: string;

  constructor(public http: Http) {
    this.configuration = Configs.setConfigs("employer");
  }

  loadRecruiters(id, projectTarget){
    //  Init project parameters
    var sql = "SELECT r.nom as lastname, r.prenom as firstname, a.telephone as phone, a.email, a.pk_user_account as accountid FROM user_recruteur as r, user_account as a where r.fk_user_employeur = '"+id+"' and r.fk_user_account = a.pk_user_account";
    console.log(sql);
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  insertRecruiters(contacts, employerId, fromPage){
    var sql = "insert into user_account (role, telephone, email, est_employeur) values ";
    var recruiterList = [];
    for(var i = 0; i < contacts.length; i++){
      var recruiter: any = this.constituteRecruiterObject(contacts[i], fromPage);
      recruiterList.push(recruiter);
      var valuesStr = " ('recruteur', '" + recruiter.phone + "', '" + recruiter.email + "', 'non')";
      if(i == 0){
        sql = sql + valuesStr;
        continue;
      }
      sql = sql + ", " + valuesStr;
    }
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers:headers})
        .map(res => res.json())
        .subscribe(values => {
          this.retrieveRecruitersAccount(recruiterList).then((accounts) => {
            this.insertRecruitersInfo(accounts, employerId, recruiterList).then((data) => {
              resolve(data);
            });
          });
        });
    });
  }

  retrieveRecruitersAccount(recruiterList){
    var str = "";
    for(var i = 0; i < recruiterList.length; i++){
      if(i == 0){
        str = "'" + recruiterList[i].phone + "'";
        continue;
      }
      str = str + ", '" + recruiterList[i].phone + "'";
    }
    var sql = "select pk_user_account, email, telephone from user_account where telephone in (" + str  + ") and role = 'recruteur'";
    console.log(sql);
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  insertRecruitersInfo(accountData, employerId, recruiterList){
    var sql = "insert into user_recruteur (nom, prenom, fk_user_account, fk_user_employeur) values ";
    for(var i = 0; i < recruiterList.length; i++){
      recruiterList[i].accountid = accountData.data[i].pk_user_account;
      var valuesStr = "('" + recruiterList[i].lastname + "', '" + recruiterList[i].firstname + "', '" + accountData.data[i].pk_user_account + "', '" + employerId + "')";
      if(i == 0){
        sql = sql + valuesStr;
        continue;
      }
      sql = sql + ", " + valuesStr;
    }
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          let result;
          if(!data || data.status != 'success'){
            result = data;
          }else{
            result = recruiterList;
          }
          resolve(result);
        });
    });
  }

  splitRecruiterName(contact){
    var firstname = '';
    var lastname = '';
    if(contact.name.givenName && contact.name.givenName == contact.displayName && !contact.name.familyName){
      firstname = contact.displayName.split(' ')[0];
      lastname = (contact.displayName.split(' ').length == 1 ? '' : contact.displayName.split(' ')[1]);
    }else{
      firstname = (contact.name.givenName ? contact.name.givenName : (contact.displayName == null ? '' : contact.displayName.split(' ')[0]));
      lastname = (contact.name.familyName ? contact.name.familyName : (contact.displayName == null ? '' : contact.displayName.split(' ')[1]));
    }
    var array = [];
    array.push(firstname);
    array.push(lastname);
    return array;
  }

  constituteRecruiterObject(contact, fromPage){
    var recruiter = {};
    if(fromPage == 'repertory'){
      var name = this.splitRecruiterName(contact);
      var tel = '';
      if(contact.phoneNumbers != null){
        tel = contact.phoneNumbers[0].value.replace(/\s/g, "");
        if(tel.startsWith("06") && tel.length == 10){
          tel = "+33" + tel.substring(1, 10);
        }
      }
      recruiter = {email: (contact.emails != null ? contact.emails[0].value : ''), phone: (contact.phoneNumbers != null ? tel : ''), firstname: name[0], lastname: name[1]};
    }else{
      recruiter = {email: contact.email, phone: contact.phone, firstname: contact.firstname, lastname: contact.lastname};
    }
    return recruiter;
  }

  updateRecruiter(recruiter, employerId){
    var sql1 = "update user_recruteur set nom = '" + recruiter.lastname + "', prenom ='" + recruiter.firstname + "' where fk_user_account = '" + recruiter.accountid + "' and fk_user_employeur = '" + employerId+ "';";
    var sql2 = " update user_account set telephone = '" + recruiter.phone + "' and email = '" + recruiter.email + "' where pk_user_account = '" + recruiter.accountid + "' and role = 'recruteur';";
    var sql = sql1 + sql2;
    console.log(sql);
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  generatePasswd(accountid){
    var passwd = (((1+Math.random())*0x10000)|0).toString(16).substring(1) + 'MO';
    var hashedPasswd = md5(passwd);
    var sql = "update user_account set mot_de_passe = '" + hashedPasswd + "' where pk_user_account = '" + accountid + "'";

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(passwd);
        });
    })
  }

  deleteRecruiter(accountId){
    var sql = "delete from user_recruteur where fk_user_account = '" + accountId + "';";
    sql = sql + " delete from user_account where pk_user_account = '" + accountId + "' and role = 'recruteur';";
    console.log(sql);
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          resolve(data);
        });
    });
  }

  updateRecruiterListInLocal(recruiterList, contacts){
    return new Promise(resolve => {
      for(var i = 0; i < contacts.length; i++){
        var recruiterExist = false;
        for(var j = 0; j < recruiterList.length; j++){
          if(contacts[i].accountid == recruiterList[j].accountid){
            recruiterList.splice(j, 1, contacts[i]);
            recruiterExist = true;
          }
        }
        if(!recruiterExist){
          recruiterList.push(contacts[i]);
        }
      }
      resolve(recruiterList);
    });
  }

  deleteRecruiterFromLocal(recruiterList, recruiter){
    return new Promise(resolve => {
      for(var i = 0; i < recruiterList.length; i++){
        if(recruiter.accountid == recruiterList[i].accountid){
          recruiterList.splice(i, 1);
          break;
        }
      }
      resolve(recruiterList);
    });
  }
}
