import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Configs} from "../configurations/configs";


@Injectable()
export class ProfileService{
  http: any;

  constructor(http: Http) {
    this.http = http;
  }

  loadAdditionalUserInformations(id) {
    let sql = "select j.*, n.libelle as nationalite_libelle from user_jobyer as j, user_nationalite as n where j.pk_user_jobyer = '" + id + "' and j.fk_user_nationalite = n.pk_user_nationalite;";
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

  loadProfilePicture(accountId, tel?, role?) {
    let sql;
    if (!this.isEmpty(accountId)) {
      sql = "select encode(photo_de_profil::bytea, 'escape') from user_account where pk_user_account = '" + accountId + "';";
    } else {
      sql = "select encode(photo_de_profil::bytea, 'escape') from user_account where telephone = '" + tel + "' and role = '" + role + "';";
    }
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

  uploadProfilePictureInServer(imgUri, accountId) {
    let sql = "update user_account set photo_de_profil ='" + imgUri + "' where pk_user_account = '" + accountId + "';";
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

  updateUserPersonalAddress(id: string, name, streetNumber, street, cp, ville, pays, role) {
    //  Now we need to save the address
    let addressData = {
      'class': 'com.vitonjob.localisation.AdressToken',
      'street': street,
      'cp': cp,
      'ville': ville,
      'pays': pays,
      'name': name,
      'streetNumber': streetNumber,
      // 'role': (this.projectTarget == 'employer' ? 'employeur' : this.projectTarget),
      'role': role,
      'id': id,
      'type': 'personnelle'
    };
    let addressDataStr = JSON.stringify(addressData);
    let encodedAddress = btoa(addressDataStr);
    let data = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 239,
      'args': [{
        'class': 'fr.protogen.masterdata.model.CCalloutArguments',
        label: 'Adresse',
        value: encodedAddress
      }]
    };
    let stringData = JSON.stringify(data);
    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, stringData, {headers: headers})
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  /**
   * @description update employer and jobyer job address
   * @param id  : entreprise id for employer role and role id for jobyer role, address
   */
  updateUserJobAddress(id: string, name, streetNumber, street, cp, ville, pays, role) {
    //  Now we need to save the address
    let addressData = {
      'class': 'com.vitonjob.localisation.AdressToken',
      'street': street,
      'cp': cp,
      'ville': ville,
      'pays': pays,
      'name': name,
      'streetNumber': streetNumber,
      'role': role,
      'id': id,
      'type': 'travaille'
    };
    let addressDataStr = JSON.stringify(addressData);
    let encodedAddress = btoa(addressDataStr);
    let data = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 239,
      'args': [{
        'class': 'fr.protogen.masterdata.model.CCalloutArguments',
        label: 'Adresse',
        value: encodedAddress
      }]
    };
    let stringData = JSON.stringify(data);

    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, stringData, {headers: headers})
        .subscribe((data: any) => {
          resolve(data);
        });
    });
  }

  uploadScan(scanData, userId, field, action, role) {
    //let role = (this.projectTarget == 'employer' ? 'employeur' : this.projectTarget)
    let scanDataObj = {
      "class": 'com.vitonjob.callouts.files.DataToken',
      "table": 'user_' + role,
      "field": field,
      "id": userId,
      "operation": action,
      "encodedFile": scanData
    };
    let scanDataStr = JSON.stringify(scanDataObj);
    let encodedData = btoa(scanDataStr);

    let body = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 342,
      'args': [{
        'class': 'fr.protogen.masterdata.model.CCalloutArguments',
        label: 'Upload fichier',
        value: encodedData
      }]
    };
    let stringData = JSON.stringify(body);

    //  send request
    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, stringData, {headers: headers})
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getScan(userId, field, role) {
    let scanDataObj = {
      "class": 'com.vitonjob.callouts.files.DataToken',
      "table": 'user_' + role,
      "field": field,
      "id": userId,
      "operation": 'get',
      "encodedFile": ''
    };
    let scanDataStr = JSON.stringify(scanDataObj);
    let encodedData = btoa(scanDataStr);

    let body = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 342,
      'args': [{
        'class': 'fr.protogen.masterdata.model.CCalloutArguments',
        label: 'Upload fichier',
        value: encodedData
      }]
    };
    let stringData = JSON.stringify(body);

    //  send request
    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, stringData, {headers: headers})
        .map(res => res.json())
        .subscribe((data:any) => {
          let files = '';
          if(data && data.file)
            files = data.file;
          resolve(files);
        });
    });
  }

  countEntreprisesByRaisonSocial(companyname: string) {
    let sql = "select count(*) from user_entreprise where nom_ou_raison_sociale='" + companyname + "';";
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

  countEntreprisesBySIRET(siret) {
    let sql = "select count(*) from user_entreprise where siret='" + siret + "';";
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

  /**
   * @description update jobyer information
   * @param title, lastname, firstname, numSS, cni, nationalityId, roleId, birthdate, birthplace
   */
  updateJobyerCivility(title, lastname, firstname, numSS, cni, nationalityId, roleId, birthdate, birthdepId, birthplace, birthCountryId, numStay, dateStay, dateFromStay, dateToStay, isStay, prefecture, isFrench, isEuropean, regionId) {
    let sql = "";
    //building the sql request
    sql = "update user_jobyer set  " +
      "titre='" + title + "', " +
      "nom='" + lastname + "', " +
      "prenom='" + firstname + "', " +
      (!this.isEmpty(numSS) ? ("numero_securite_sociale ='" + numSS + "', ") : "") +
      (!this.isEmpty(cni) ? ("cni ='" + cni + "', ") : "") +
      (!this.isEmpty(birthdate) ? ("date_de_naissance ='" + birthdate + "', ") : ("date_de_naissance =" + null + ", "));

    sql = sql + (!this.isEmpty(dateStay) ? (" date_de_delivrance='" + dateStay + "', ") : ("date_de_delivrance=" + null+ ", ")) +
      (!this.isEmpty(dateFromStay) ? (" debut_validite='" + dateFromStay + "', ") : (" debut_validite=" + null+ ", ")) +
      (!this.isEmpty(dateToStay) ? (" fin_validite='" + dateToStay + "', ") : (" fin_validite=" + null+ ", "));

    if (isFrench) {
      sql = sql + " fk_user_nationalite ='" + nationalityId + "', " +
        "lieu_de_naissance ='" + birthplace + "', " +
        (!this.isEmpty(birthCountryId) ? ("fk_user_pays ='" + birthCountryId + "', ") : "") +
        (!this.isEmpty(birthdepId) ? ("fk_user_departement ='" + birthdepId + "', ") : "") +
        "fk_user_identifiants_nationalite='" + regionId + "' " +
        //birthcp à ajouter
        "where pk_user_jobyer ='" + roleId + "';";
    } else {
      if (isEuropean == 0) {
        sql = sql + " fk_user_nationalite ='" + nationalityId + "', " +
          (!this.isEmpty(birthCountryId) ? ("fk_user_pays ='" + birthCountryId + "', ") : "") +
          "lieu_de_naissance ='" + birthplace + "', " +
          (!this.isEmpty(regionId) ? ("fk_user_identifiants_nationalite ='" + regionId + "', ") : "") +
          "numero_titre_sejour ='" + numStay + "' " +
          "where pk_user_jobyer ='" + roleId + "';";
      } else {
        sql = sql + " fk_user_nationalite ='" + nationalityId + "' " +
          ", numero_titre_sejour ='" + numStay + "' " +
          (!this.isEmpty(birthCountryId) ? (", fk_user_pays ='" + birthCountryId + "' ") : "") +
          (!this.isEmpty(isStay) ? (", est_resident='" + isStay + "' ") : "") +
          (!this.isEmpty(prefecture) ? (", instance_delivrance='" + this.sqlfyText(prefecture) + "' ") : "") +
          (!this.isEmpty(regionId) ? (", fk_user_identifiants_nationalite='" + regionId + "' ") : "") +
          "where pk_user_jobyer ='" + roleId + "';";
      }
    }
    console.clear();
    console.log(sql);
    debugger;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          console.clear();
          console.log(data);
          debugger;
          resolve(data);
        });
    })
  }

  updateJobyerCivilityFirstTime(title, lastname, firstname, roleId) {
    let sql = "";
    //building the sql request
    sql = "update user_jobyer set  " +
      "titre='" + title + "', " +
      "nom='" + lastname + "', " +
      "prenom='" + firstname + "'" +
      "where pk_user_jobyer ='" + roleId + "';";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }


  updateEmployerCivility(title, lastname, firstname, companyname, siret, ape, roleId, entrepriseId, medecineId, conventionId, forRecruitment) {
    let sql = "update user_employeur set ";
    sql = sql + " titre='" + title + "' ";
    sql = sql + ", nom='" + lastname + "', prenom='" + firstname + "' where pk_user_employeur=" + roleId + ";";
    sql = sql + " update user_entreprise set nom_ou_raison_sociale='" + companyname + "' ";
    siret = (!siret ? "" : siret);
    sql = sql + " , siret='" + siret + "' ";
    if (conventionId && conventionId > 0) {
      sql = sql + " , fk_user_convention_collective='" + conventionId + "' ";
    }
    if (medecineId && medecineId > 0)
      sql = sql + " , fk_user_medecine_de_travail='" + medecineId + "' ";
    ape = (!ape ? "" : ape);
    sql = sql + " , ape_ou_naf='" + ape + "' where  pk_user_entreprise=" + entrepriseId;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          resolve(data);
        });
    })
  }

  updateEmployerCivilityFirstTime(title, lastname, firstname, companyname, ape, roleId, entrepriseId, conventionId) {
    let sql = "update user_employeur set ";
    sql = sql + " titre='" + title + "' ";
    sql = sql + ", nom='" + lastname + "', prenom='" + firstname + "' where pk_user_employeur=" + roleId + ";";
    sql = sql + " update user_entreprise set nom_ou_raison_sociale='" + companyname + "' ";
    if (conventionId && conventionId > 0) {
      sql = sql + " , fk_user_convention_collective='" + conventionId + "' ";
    }
    ape = (!ape ? "" : ape);
    sql = sql + " , ape_ou_naf='" + ape + "' where  pk_user_entreprise=" + entrepriseId;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  updateEmployerCivilityForRecruitment(siret, entrepriseId) {
    let sql = " update user_entreprise set siret ='" + siret + "' where  pk_user_entreprise=" + entrepriseId;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  updateRecruiterCivility(title, lastname, firstname, accountid) {
    let sql = "update user_recruteur set ";
    sql = sql + " titre='" + title + "', ";
    sql = sql + " nom='" + lastname + "', prenom='" + firstname + "' where fk_user_account=" + accountid + ";";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }


  getAddressByUser(id, role) {
    let payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      id: 165,
      args: [
        {
          class: 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Requete de recherche',
          value: btoa(id)
        },
        {
          class: 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'ID Offre',
          value: btoa(role == 'employer' ? 'employeur' : 'jobyer')
        }
      ]
    }
    let stringData = JSON.stringify(payload);

    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.calloutURL, stringData, {headers: headers})
        .subscribe((data: any) => {
          resolve(JSON.parse(data._body));
        });
    });
  }

  getIdentifiantNationalityByNationality(natId) {
    let sql = "select i.* from user_identifiants_nationalite as i, user_nationalite as n where i.pk_user_identifiants_nationalite = n.fk_user_identifiants_nationalite and n.pk_user_nationalite = '" + natId + "'";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any)=> {
          resolve(data);
        });
    })

  }

  getPrefecture(nom) {
    let sql = "select pk_user_prefecture as id from user_prefecture where nom = '" + this.sqlfyText(nom) + "'";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any)=> {
          resolve(data);
        });
    })

  }

  updateSpontaneousContact(value, accountid) {
    let sql = "update user_account set ";
    sql = sql + " accepte_candidatures='" + this.sqlfyText(value) + "'";
    sql = sql + " where pk_user_account=" + accountid + ";";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any)=> {
          resolve(data);
        });
    })

  }

  getIsSpontaneousContact(accountid) {
    let sql = "select accepte_candidatures from user_account where pk_user_account = " + accountid + ";";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any)=> {
          resolve(data.data[0]);
        });
    });
  }

    getEmployerOfferStats(entrepriseId) {
      let sql = `
        SELECT
          -- Published offers
          COUNT(uoe.*) as published_offers
        FROM user_offre_entreprise uoe
        WHERE
          uoe.fk_user_entreprise = ` + entrepriseId + `
          AND UPPER(uoe.dirty) = 'N'
          AND UPPER(uoe.publiee) = 'OUI'
      ;`;

      return new Promise(resolve => {
        let headers = Configs.getHttpTextHeaders();
        this.http.post(Configs.sqlURL, sql, {headers: headers})
          .map(res => res.json())
          .subscribe((data: any)=> {
            resolve(data.data[0]);
          });
      });
    }

    getEmployerMissionStats(entrepriseId) {
      let sql = `
        SELECT
          -- Pending recruitment
          COUNT(CASE WHEN (
            UPPER(uc.signature_jobyer) = 'NON'
            OR UPPER(uc.signature_employeur) = 'NON'
          ) THEN 1 ELSE NULL END) AS pending_recruitments
        
          -- Mission in progress
          , COUNT(CASE WHEN (
            UPPER(uc.signature_employeur) = 'OUI'
            AND UPPER(uc.signature_jobyer) = 'OUI'
            AND UPPER(uc.accompli) = 'NON'
            AND UPPER(uc.dirty) = 'N'
          ) THEN 1 ELSE NULL END) AS missions_in_progress
        FROM user_contrat uc
        WHERE
          uc.fk_user_entreprise = ` + entrepriseId + `
          AND UPPER(uc.dirty) = 'N'
      ;`;

      return new Promise(resolve => {
        let headers = Configs.getHttpTextHeaders();
        this.http.post(Configs.sqlURL, sql, {headers: headers})
          .map(res => res.json())
          .subscribe((data: any)=> {
            resolve(data.data[0]);
          });
      });
    }

  /*getPaysByIndex(index){
   let sql = "select pk_user_pays as id from user_prefecture where nom = '" + this.sqlfyText(nom) + "'";

   return new Promise(resolve => {
   let headers = Configs.getHttpTextHeaders();
   this.http.post(Configs.sqlURL, sql, {headers: headers})
   .map(res => res.json())
   .subscribe((data: any)=> {
   resolve(data);
   });
   })

   }*/

  getCountryByIndex(index, countries) {
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].indicatif_telephonique == index) {
        return countries[i];
      }
    }
  }

  getCountryById(id, countries) {
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].id == id) {
        return countries[i];
      }
    }
  }

  sqlfyText(txt) {
    if (!txt || txt.length == 0)
      return "";
    return txt.replace("'", "''");
  }


  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }
}
