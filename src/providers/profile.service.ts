import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {Configs} from "../configurations/configs";
import {Utils} from "../app/utils/utils";


@Injectable()
export class ProfileService{
  http: any;

  constructor(http: Http) {
    this.http = http;
  }

  loadAdditionalUserInformations(id) {
    let sql = "select j.*, n.libelle as nationalite_libelle from user_jobyer as j LEFT JOIN user_nationalite as n  ON j.fk_user_nationalite = n.pk_user_nationalite where j.pk_user_jobyer = '" + id + "';";
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
      'role': role,
      'id': id,
      'type': (role == "jobyer" ? 'personnelle' : 'siege_social')
    };
    let addressDataStr = JSON.stringify(addressData);
    let encodedAddress = btoa(addressDataStr);
    let data = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 20029,
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
      'type': (role == "jobyer" ? 'travaille' : 'adresse_de_travail')

    };
    let addressDataStr = JSON.stringify(addressData);
    let encodedAddress = btoa(addressDataStr);
    let data = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 20029,
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

  updateUserCorrespondenceAddress(id: string, name, streetNumber, street, cp, ville, pays, role) {
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
      'type': 'correspondance'
    };
    let addressDataStr = JSON.stringify(addressData);
    let encodedAddress = btoa(addressDataStr);
    let data = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 20029,
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
        .subscribe((data: any) => {
          let files = '';
          if (data && data.file)
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
  updateJobyerCivility(title, lastname, firstname, numSS, cni, nationalityId, roleId, birthdate, birthdepId, birthplace, birthCountryId, numStay, dateStay, dateFromStay, dateToStay, isStay, prefecture, isFrench, isEuropean, regionId, cv, nbWorkHours, studyHoursBigValue) {
    title = Utils.sqlfyText(title);
    lastname = Utils.sqlfyText(lastname);
    firstname = Utils.sqlfyText(firstname);
    let sql = "";
    //building the sql request
    sql = "update user_jobyer set  " +
      "titre='" + title + "', " +
      "nom='" + lastname + "', " +
      "prenom='" + firstname + "', " +

      (!this.isEmpty(numSS) ? ("numero_securite_sociale ='" + numSS + "', ") : ("numero_securite_sociale ='', ")) +
      (!this.isEmpty(cni) ? ("cni ='" + cni + "', ") : ("cni ='', ")) +
      (!this.isEmpty(birthdate) ? ("date_de_naissance ='" + birthdate + "', ") : ("date_de_naissance =" + null + ", ")) +

      (!this.isEmpty(numStay) ? (" numero_titre_sejour='" + numStay + "', ") : ("numero_titre_sejour='', ")) +
      (!this.isEmpty(dateStay) ? (" date_de_delivrance='" + dateStay + "', ") : ("date_de_delivrance=" + null + ", ")) +
      (!this.isEmpty(dateFromStay) ? (" debut_validite='" + dateFromStay + "', ") : (" debut_validite=" + null + ", ")) +
      (!this.isEmpty(dateToStay) ? (" fin_validite='" + dateToStay + "', ") : (" fin_validite=" + null + ", ")) +
      (!this.isEmpty(isStay) ? ("est_resident='" + isStay + "', ") : (" est_resident='', ")) +
      (!this.isEmpty(prefecture) ? ("instance_delivrance='" + this.sqlfyText(prefecture) + "', ") : (" instance_delivrance='', ")) +

      (!this.isEmpty(nationalityId) ? (" fk_user_nationalite='" + nationalityId + "', ") : ("fk_user_nationalite=" + null + ", ")) +
      (!this.isEmpty(birthCountryId) ? ("fk_user_pays ='" + birthCountryId + "', ") : ("fk_user_pays='', ")) +
      (!this.isEmpty(regionId) ? (" fk_user_identifiants_nationalite='" + regionId + "', ") : ("fk_user_identifiants_nationalite='', ")) +

      (!this.isEmpty(birthplace) ? (" lieu_de_naissance='" + birthplace + "', ") : ("lieu_de_naissance='', ")) +
      (!this.isEmpty(birthdepId) ? ("fk_user_departement ='" + birthdepId + "', ") : ("fk_user_departement = " + null + ", " )) +
      (!this.isEmpty(nbWorkHours) ? ("nb_heures_de_travail ='" + nbWorkHours + "', ") : ("nb_heures_de_travail = " + 0 + ", " )) +
      (!this.isEmpty(studyHoursBigValue) ? ("plus_de_350_heures_d_etude ='" + studyHoursBigValue + "', ") : ("plus_de_350_heures_d_etude = " + null + ", " )) +
      (!this.isEmpty(cv) ? (" cv='" + Utils.sqlfyText(cv) + "' ") : ("cv='' ")) +

      " where pk_user_jobyer ='" + roleId + "';";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    })
  }

  updateJobyerCivilityFirstTime(title, lastname, firstname, roleId) {
    title = Utils.sqlfyText(title);
    lastname = Utils.sqlfyText(lastname);
    firstname = Utils.sqlfyText(firstname);
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


  updateEmployerCivility(title, lastname, firstname, companyname, siret, ape, roleId, entrepriseId, medecineId, conventionId, collective_heure_hebdo, forRecruitment) {
    title = Utils.sqlfyText(title);
    lastname = Utils.sqlfyText(lastname);
    firstname = Utils.sqlfyText(firstname);
    companyname = Utils.sqlfyText(companyname);
    // Update employer
    let sql = "update user_employeur set ";
    sql = sql + " titre='" + title + "' ";
    sql = sql + ", nom='" + lastname + "', prenom='" + firstname + "'" ;
    collective_heure_hebdo = (!collective_heure_hebdo ? "0" : collective_heure_hebdo);
    sql = sql + " , duree_collective_travail_hebdo='" + collective_heure_hebdo + "' ";
    sql = sql + " where pk_user_employeur=" + roleId + ";";

    // update entreprise
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
    title = Utils.sqlfyText(title);
    lastname = Utils.sqlfyText(lastname);
    firstname = Utils.sqlfyText(firstname);
    companyname = Utils.sqlfyText(companyname);
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
    title = Utils.sqlfyText(title);
    lastname = Utils.sqlfyText(lastname);
    firstname = Utils.sqlfyText(firstname);
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

  loadDisponibilites(idJobyer){
    let sql = "select pk_user_disponibilite_du_jobyer as id, jour, date_de_debut, date_de_fin, heure_de_debut, heure_de_fin, lower_unaccent(interval) as interv " +
      "from user_disponibilite_du_jobyer where fk_user_jobyer="+idJobyer+" and dirty='N' " +
      "order by jour asc";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any)=> {

          let dispos = [];
          if(data || data.data){
            for(let i = 0 ; i < data.data.length ; i++){
              let d = data.data[i];
              if(d.interv == 'oui'){
                dispos.push(
                  {
                    id : d.id,
                    startDate : this.preformatDate(d.date_de_debut),
                    endDate : this.preformatDate(d.date_de_fin),
                    startHour : d.heure_de_debut,
                    endHour : d.heure_de_fin
                  }
                );
              } else {
                dispos.push(
                  {
                    id : d.id,
                    startDate : this.preformatDate(d.jour),
                    endDate : this.preformatDate(d.jour),
                    startHour : d.heure_de_debut,
                    endHour : d.heure_de_fin
                  }
                );
              }
            }
          }
          resolve(dispos);
        });
    });
  }

  saveDisponibilite(jobyerId, disponibilite){
    let interval = (disponibilite.startDate == disponibilite.endDate)?'non':'oui';

    let sql = "insert into user_disponibilite_du_jobyer (" +
      "fk_user_jobyer, " +
      "jour, " +
      "date_de_debut," +
      "date_de_fin," +
      "heure_de_debut," +
      "heure_de_fin," +
      "\"interval\"" +
      ") values (" +
      jobyerId+", " +
      "'"+this.dateToSqlTimestamp(disponibilite.startDate)+"', " +
      "'"+this.dateToSqlTimestamp(disponibilite.startDate)+"'," +
      "'"+this.dateToSqlTimestamp(disponibilite.endDate)+"'," +
      (disponibilite.startHour.getHours()*60+disponibilite.startHour.getMinutes())+"," +
      (disponibilite.endHour.getHours()*60+disponibilite.endHour.getMinutes())+"," +
      "'"+interval+"'" +
      ") returning pk_user_disponibilite_du_jobyer";
    //console.log(sql);
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any)=> {
          resolve(data);
        });
    });
  }

  deleteDisponibility(d){
    let sql = "update user_disponibilite_du_jobyer " +
      "set dirty='Y' " +
      "where pk_user_disponibilite_du_jobyer="+d.id;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any)=> {
          resolve(data);
        });
    });
  }

  preformatDate(strd){
    let d = strd.split(' ')[0];
    return new Date(d);
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

  /*
   Qualities management
   */
  getUserQualities(id: any, projectTarget: string) {
    let table = projectTarget == 'jobyer' ? 'user_qualite_du_jobyer' : 'user_qualite_employeur';
    let foreignKey = projectTarget == 'jobyer' ? 'fk_user_jobyer' : 'fk_user_entreprise';
    let sql = "select pk_user_indispensable as id, libelle from user_indispensable as i, " + table + " as t where i.pk_user_indispensable = t.fk_user_indispensable and t." + foreignKey + " = '" + id + "'";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.data);
        });
    });
  }

  getUserLanguages(id: any, projectTarget: string) {
    let table = projectTarget == 'jobyer' ? 'user_langue_jobyer' : 'user_langue_employeur';
    let foreignKey = projectTarget == 'jobyer' ? 'fk_user_jobyer' : 'fk_user_entreprise';
    let sql = "select pk_user_langue as id, fk_user_niveau as level, libelle from user_langue as i, " + table + " as t where i.pk_user_langue = t.fk_user_langue and t." + foreignKey + " = '" + id + "'";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.data);
        });
    });
  }

  getUserSoftwares(jobyerId){
    let sql = "select exp.pk_user_experience_logiciel_pharmacien as \"expId\", exp.fk_user_logiciels_pharmaciens as \"softId\", exp.annees_experience as experience, log.nom from user_experience_logiciel_pharmacien as exp, user_logiciels_pharmaciens as log where exp.fk_user_logiciels_pharmaciens = log.pk_user_logiciels_pharmaciens and exp.fk_user_jobyer = '" + jobyerId + "'";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.data);
        });
    });
  }

  saveQualities(qualities, id, projectTarget) {
    let table = projectTarget == 'jobyer' ? 'user_qualite_du_jobyer' : 'user_qualite_employeur';
    let foreignKey = projectTarget == 'jobyer' ? 'fk_user_jobyer' : 'fk_user_entreprise';
    this.deleteQualities(id, table, foreignKey).then(data => {

      if(data && qualities && qualities.length != 0)
        this.attachQualities(qualities, id, table, foreignKey);
    });
  }

  saveLanguages(languages, id, projectTarget){
    let table = projectTarget == 'jobyer' ? 'user_langue_jobyer' : 'user_langue_employeur';
    let foreignKey = projectTarget == 'jobyer' ? 'fk_user_jobyer' : 'fk_user_entreprise';
    this.deleteLanguages(id, table, foreignKey).then(data => {
      if(data && languages && languages.length != 0)
        this.attachLanguages(languages, id, table, foreignKey);
    })
  }

  saveSoftware(software, id){
    let sql = " insert into user_experience_logiciel_pharmacien (fk_user_jobyer, fk_user_logiciels_pharmaciens, annees_experience) values (" + id + ", " + software.id + ", " + software.experience + ") RETURNING pk_user_experience_logiciel_pharmacien; ";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let expId = data.data[0].pk_user_experience_logiciel_pharmacien;
          resolve(expId);
        });
    });
  }

  deleteSoftware(id){
    let sql = "delete from user_experience_logiciel_pharmacien where pk_user_experience_logiciel_pharmacien =" + id;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  updateSoftware(id, exp){
    let sql = "update user_experience_logiciel_pharmacien set annees_experience = " + exp + " where pk_user_experience_logiciel_pharmacien =" + id;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  deleteQualities(id, table, foreignKey) {
    let sql = "delete from " + table + " where " + foreignKey + "=" + id;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  attachQualities(qualities, id, table, foreignKey) {
    let sql = "";
    for (let i = 0; i < qualities.length; i++) {
      let q = qualities[i];
      sql = sql + " insert into " + table + " (" + foreignKey + ", fk_user_indispensable) values (" + id + ", " + q.idQuality + "); ";
    }

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          resolve(data);
        });
    });
  }

  deleteLanguages(id, table, foreignKey) {
    let sql = "delete from " + table + " where " + foreignKey + "=" + id;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  attachLanguages(languages, id, table, foreignKey) {
    let sql = "";
    for (let i = 0; i < languages.length; i++) {
      let q = languages[i];
      sql = sql + " insert into " + table + " (" + foreignKey + ", fk_user_langue, fk_user_niveau) values (" + id + ", " + q.id + ", " + q.level + "); ";
    }
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  loadProfileJobs(idJobyer){
    let sql = "select pk_user_job as id, user_job.libelle as libelle, fk_user_niveau as niveau from user_job, user_profil_job where user_job.pk_user_job= user_profil_job.fk_user_job and user_profil_job.dirty='N' and user_profil_job.fk_user_jobyer="+idJobyer;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.data);
        });
    });
  }

  attachJob(j, idJobyer){
    let sql = "insert into user_profil_job (fk_user_jobyer,fk_user_job,fk_user_niveau) values ("+idJobyer+","+j.id+","+j.niveau+")";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          resolve(data.data);
        });
    });
  }

  removeJob(j, idJobyer){
    let sql = "delete from user_profil_job where fk_user_jobyer="+idJobyer+" and fk_user_job="+j.id;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          resolve(data.data);
        });
    });
  }

  loadRequirementsByJob(idjob){

    let sql = "select distinct(p.libelle) as libelle from user_prerquis p where pk_user_prerquis in " +
      "(select fk_user_prerquis from user_prerequis_obligatoires where fk_user_offre_entreprise in " +
      "(select fk_user_offre_entreprise from user_pratique_job where fk_user_job = "+idjob+")" +
      ")";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.data);
        });
    });
  }

  getJobyerInfo(id){
    let jobyerData = {
      'class': 'com.vitonjob.callouts.jobyerInfo.JobyerToken',
      'jobyerId': id
    };
    let jobyerDataStr = JSON.stringify(jobyerData);
    let encodedJobyer = btoa(jobyerDataStr);
    let data = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': 20020,
      'args': [{
        'class': 'fr.protogen.masterdata.model.CCalloutArguments',
        label: 'JobyerInfo',
        value: encodedJobyer
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

  loadOffersByJobyerId(id){
    let sql = "select pk_user_jobyer as id from user_offre_jobyer where pk_user_jobyer = " + id;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
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

  dateToSqlTimestamp(date: Date) {
    var sqlTimestamp = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2) + ' ' +
      ('00' + date.getUTCHours()).slice(-2) + ':' +
      ('00' + date.getUTCMinutes()).slice(-2) + ':' +
      ('00' + date.getUTCSeconds()).slice(-2);
    return sqlTimestamp;
  }
}
