import {Injectable} from "@angular/core";
import {Configs} from "../configurations/configs";
import {Http, Headers} from "@angular/http";
import {DateUtils} from "../app/utils/date-utils";
import {GlobalConfigs} from "../configurations/globalConfigs";
import {Utils} from "../app/utils/utils";
import {Offer} from "../dto/offer";
import {ContractData} from "../dto/contract";

// HACK: To fix: error TS2307: Cannot find module 'node'.
declare function unescape(s: string): string;

/**
 * @author daoudi amine
 * @description services for contracts yousign
 * @module Contract
 */
@Injectable()
export class ContractService {
  data: any = null;
  configuration: any;

  constructor(public http: Http) {

  }

  getNumContract(projectTarget) {
    this.configuration = Configs.setConfigs(projectTarget);
    let sql = "select nextval('sequence_num_contrat') as numct";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.data;
          resolve(this.data);
        });
    });
  }

  dayDifference(first, second) {
    if (first)
      first = new Date(first).getTime();
    else
      first = new Date().getTime();
    if (second)
      second = new Date(second).getTime();
    else
      second = new Date().getTime();
    return Math.round((first - second) / (1000 * 60 * 60 * 24)) + 1;
  }

  //to remove after correction Jobyer object in api service
  getJobyerId(jobyer: any, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    var dt = new Date();
    var sql = "select pk_user_jobyer from user_jobyer where fk_user_account in (select pk_user_account from user_account where email='" + jobyer.email + "' or telephone='" + jobyer.tel + "') limit 1";

    //console.log(sql);


    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  getJobyerAdress(id){
    let sql = "SELECT    user_adresse_jobyer.fk_user_jobyer,    user_adresse_jobyer.personnelle,    " +
      "user_adresse.nom AS lieu_dit,    user_adresse.numero AS numero,    user_code_postal.code AS cp,    " +
      "user_rue.nom AS rue,    user_ville.nom AS ville " +
      "FROM    public.user_adresse_jobyer,    public.user_adresse,    " +
      "public.user_code_postal,    public.user_rue,    public.user_ville " +
      "WHERE    user_adresse.pk_user_adresse = user_adresse_jobyer.fk_user_adresse AND   " +
      "user_code_postal.pk_user_code_postal = user_adresse.fk_user_code_postal AND   " +
      "user_rue.pk_user_rue = user_adresse.fk_user_rue AND   " +
      "user_ville.pk_user_ville = user_adresse.fk_user_ville AND   " +
      "lower_unaccent(user_adresse_jobyer.personnelle)='oui' AND   " +
      "user_adresse_jobyer.dirty ='N' AND   " +
      "user_adresse_jobyer.fk_user_jobyer= "+ id;

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data:any) => {
          let adr = '';
          if(data.data && data.data.length>0){
            let row = data.data[0];
            adr = row.lieu_dit+" ";
            adr = adr + row.numero+" ";
            adr = adr + row.rue+" ";
            adr = adr + row.cp+" ";
            adr = adr + row.ville+" ";
            adr = adr.trim();
          }
          resolve(adr);
        });
    });
  }

  getJobyerComplementData(jobyer: any, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    var dt = new Date();
    var sql = "select user_jobyer.pk_user_jobyer as id, user_jobyer.numero_securite_sociale as numss, " +
      "user_pays.nom as nationalite, cni, numero_titre_sejour, debut_validite, fin_validite " +
      " from user_jobyer, user_pays " +
      " where user_jobyer.fk_user_pays=user_pays.pk_user_pays " +
      " and fk_user_account in (select pk_user_account from user_account where email='" + jobyer.email + "' or telephone='" + jobyer.tel + "') limit 1";

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          //console.log('retrieved data : ' + JSON.stringify(data));
          this.data = data.data;
          resolve(this.data);
        });
    });
  }

  /**
   * @description get employer Entreprise contracts
   * @param employerEntrepriseId
   * @return JSON results in form of created contract Id
   */
  getContracts(id: number, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    if (projectTarget == 'employer') {
      var sql = "SELECT c.pk_user_contrat,c.*, j.nom, j.prenom FROM user_contrat as c, user_jobyer as j where c.fk_user_jobyer = j.pk_user_jobyer and c.fk_user_entreprise ='" + id + "' order by c.pk_user_contrat AND c.dirty = 'N'";
    } else {
      var sql = "SELECT c.pk_user_contrat,c.*, e.nom_ou_raison_sociale as nom FROM user_contrat as c, user_entreprise as e where c.fk_user_entreprise = e.pk_user_entreprise and c.fk_user_jobyer ='" + id + "' AND c.dirty = 'N' order by c.pk_user_contrat";
    }

    //console.log(sql);

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          this.data = data;
          resolve(this.data);
        });
    });
  }

  getContractsByType(type:number,offset:number,limit:number,id: number, projectTarget: string) {
    //  Init project parameters
   let sqlComm = "SELECT " +
     "distinct (SELECT COUNT(*) FROM user_heure_mission WHERE fk_user_contrat = c.pk_user_contrat AND (date_debut_pointe IS NULL OR date_fin_pointe IS NULL)) as pointages_a_faire, ";
    var employerSql = sqlComm +
      "c.*, " +
      "j.nom, j.prenom, " +
      "a.telephone, " +
      "f.releve_signe_employeur " +
      "FROM user_jobyer as j, user_account as a, user_contrat as c " +
      "LEFT JOIN user_facture_voj as f ON c.pk_user_contrat = f.fk_user_contrat " +
      "WHERE c.fk_user_jobyer = j.pk_user_jobyer " +
      "AND j.fk_user_account = a.pk_user_account " +
      "AND c.fk_user_entreprise ='" + id + "'";

    var jobyerSql = sqlComm +
      "c.pk_user_contrat,c.*, e.nom_ou_raison_sociale as nom FROM user_contrat as c, user_entreprise as e where c.fk_user_entreprise = e.pk_user_entreprise and c.fk_user_jobyer ='" + id + "'";

    var typeSql ="";
    if(type ==0){
      typeSql = " and c.date_de_debut is not null and upper(c.signature_jobyer) = 'OUI' and upper(c.releve_employeur)='NON' and c.annule_par is null";
    }else if(type ==1){
      typeSql = " and c.date_de_debut is not null and upper(c.signature_jobyer) = 'NON' and c.annule_par is null";
    }else if(type ==2){
      typeSql =  " and c.date_de_debut is not null and upper(c.releve_employeur) = 'OUI' and c.annule_par is null";
    }else if(type ==3){
      typeSql =  " and c.date_de_debut is not null and c.annule_par is not null";
    }

    var orderBySql = " AND c.dirty = 'N' ORDER BY c.date_de_debut DESC ";
    var rangeSql = " LIMIT "+limit +" OFFSET "+offset;

    this.configuration = Configs.setConfigs(projectTarget);
    if (projectTarget == 'employer') {
      orderBySql += ', j.nom ASC ';
      var sql = employerSql + typeSql + orderBySql + rangeSql;
    } else {
      var sql = jobyerSql + typeSql + orderBySql + rangeSql;
    }

    //console.log(sql);
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          this.data = data;
          resolve(this.data);
        });
    });
  }

  getNowContractsCount(id: number, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    if (projectTarget == 'employer') {
      var sql = "SELECT count(*) FROM user_contrat as c, user_jobyer as j where c.fk_user_jobyer = j.pk_user_jobyer and c.fk_user_entreprise ='" + id + "' and c.date_de_debut is not null and upper(c.signature_jobyer) = 'OUI' and upper(c.accompli)='NON' and c.annule_par is null AND c.dirty='N'";
    } else {
      var sql = "SELECT count(*) FROM user_contrat as c, user_entreprise as e where c.fk_user_entreprise = e.pk_user_entreprise and c.fk_user_jobyer ='" + id + "' and c.date_de_debut is not null and upper(c.signature_jobyer) = 'OUI' and upper(c.accompli)='NON' and c.annule_par is null AND c.dirty='N'";
    }

    //console.log(sql);

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          this.data = data;
          resolve(this.data);
        });
    });
  }

  getFutureContractsCount(id: number, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    if (projectTarget == 'employer') {
      var sql = "SELECT count(*) FROM user_contrat as c, user_jobyer as j where c.fk_user_jobyer = j.pk_user_jobyer and c.fk_user_entreprise ='" + id + "' and c.date_de_debut is not null and upper(c.signature_jobyer) = 'NON' and c.annule_par is null AND c.dirty='N'";
    } else {
      var sql = "SELECT count(*) FROM user_contrat as c, user_entreprise as e where c.fk_user_entreprise = e.pk_user_entreprise and c.fk_user_jobyer ='" + id + "' and c.date_de_debut is not null and upper(c.signature_jobyer) = 'NON' and c.annule_par is null AND c.dirty='N'";
    }

    //console.log(sql);

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          this.data = data;
          resolve(this.data);
        });
    });
  }

  getPastContractsCount(id: number, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    if (projectTarget == 'employer') {
      var sql = "SELECT count(*) FROM user_contrat as c, user_jobyer as j where c.fk_user_jobyer = j.pk_user_jobyer and c.fk_user_entreprise ='" + id + "' and c.date_de_debut is not null and upper(c.accompli) = 'OUI' and c.annule_par is null AND c.dirty='N'";
    } else {
      var sql = "SELECT count(*) FROM user_contrat as c, user_entreprise as e where c.fk_user_entreprise = e.pk_user_entreprise and c.fk_user_jobyer ='" + id + "' and c.date_de_debut is not null and upper(c.accompli) = 'OUI' and c.annule_par is null AND c.dirty='N'";
    }

    //console.log(sql);

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          this.data = data;
          resolve(this.data);
        });
    });
  }

  getCanceledContractsCount(id: number, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    if (projectTarget == 'employer') {
      var sql = "SELECT count(*) FROM user_contrat as c, user_jobyer as j where c.fk_user_jobyer = j.pk_user_jobyer and c.fk_user_entreprise ='" + id + "' and c.date_de_debut is not null and c.annule_par is not null AND c.dirty='N'";
    } else {
      var sql = "SELECT count(*) FROM user_contrat as c, user_entreprise as e where c.fk_user_entreprise = e.pk_user_entreprise and c.fk_user_jobyer ='" + id + "' and c.date_de_debut is not null and c.annule_par is not null AND c.dirty='N'";
    }

    //console.log(sql);

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          this.data = data;
          resolve(this.data);
        });
    });
  }

  /**
   * @description save a contract into database
   * @param contract object
   * @param jobyerId
   * @param employerEntrepriseId
   * @return JSON results in form of created contract Id
   */
  saveContract(contract: any, jobyerId: Number, employerEntrepriseId: Number, projectTarget: string, accountId, idOffer) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    var dt = new Date();
    let epi = (contract.epi?'OUI':'NON');
    let isScheduleFixed = (contract.isScheduleFixed == 'true' ? 'OUI' : 'NON');
    let listeEPI = "";
    if(contract.epiList && contract.epiList.length != 0) {
      for (let i = 0; i < contract.epiList.length; i++) {
        listeEPI = listeEPI + ";" + contract.epiList[i].libelle;
      }
    }

    var sql = "INSERT INTO user_contrat (" +
      " created," +
      " date_de_debut," +
      " date_de_fin," +
      " date_debut_terme," +
      " date_fin_terme," +
      " date_signature," +
      " heure_debut," +
      " heure_fin," +
      " motif_de_recours," +
      " numero," +
      " periode_essai," +
      " tarif_heure," +
      " horaires_fixes," +
      " fk_user_entreprise," +
      " fk_user_jobyer," +
      " signature_employeur," +
      " signature_jobyer," +
      " taux_indemnite_fin_de_mission," +
      " taux_conges_payes," +
      " titre_transport," +
      " zones_transport," +
      " surveillance_medicale_renforcee," +
      " debut_souplesse," +
      " fin_souplesse," +
      " organisation_particuliere," +
      " elements_soumis_a_des_cotisations," +
      " elements_non_soumis_a_des_cotisations," +
      " recours," +
      " titre," +
      " option_mission," +
      " equipements_fournis_par_l_ai," +
      " fk_user_periodicite_des_paiements," +
      " embauche_autorise," +
      " epi," +
      " rapatriement_a_la_charge_de_l_ai," +
      " liste_epi," +
      " moyen_d_acces," +
      " contact_sur_place," +
      " telephone_contact," +
      " caracteristiques_du_poste," +
      " duree_moyenne_mensuelle," +
      " siege_social," +
      " statut," +
      " filiere," +
      " contact," +
      " indemnite_fin_de_mission," +
      " n_titre_travail," +
      " periodes_non_travaillees," +
      " centre_de_medecine_entreprise," +
      " adresse_centre_de_medecine_entreprise," +
      " risques," +
      " lieu_de_mission," +
      " en_brouillon," +
      " duree_hebdomadaire," +
      " fk_user_offre_entreprise" +
      ")" +
      " VALUES ("
      + "'" + new Date().toISOString() + "',"
      + "" + DateUtils.displayableDateToSQL(contract.missionStartDate) + ","
      + "" + DateUtils.displayableDateToSQL(contract.missionEndDate) + ","
      + "" + (contract.termStartDate?"'"+contract.termStartDate+"'":"null") + ","
      + "" + (contract.termEndDate?"'"+contract.termEndDate+"'":"null") + ","
      + "'" + DateUtils.dateToSqlTimestamp(new Date()) + "',"
      + "'" + DateUtils.getMinutesFromDate(contract.workStartHour) + "',"
      + "'" + DateUtils.getMinutesFromDate(contract.workEndHour) + "',"
      + "'" + Utils.sqlfyText(contract.justification) + "',"
      + "'" + Utils.sqlfyText(contract.num) + "',"
      + "'" + contract.trialPeriod + "',"
      + "'" + contract.baseSalary + "',"
      + "'" + isScheduleFixed + "',"
      + "'" + employerEntrepriseId + "',"
      + "'" + jobyerId + "',"
      + "'NON',"
      + "'NON',"
      + "10,"
      + "10,"
      + "'" + Utils.sqlfyText(contract.titreTransport) + "',"
      + "'" + Utils.sqlfyText(contract.zonesTitre) + "',"
      + "'" + Utils.sqlfyText(contract.medicalSurv) + "',"
      + "" + (!Utils.isEmpty(contract.debutSouplesse)?"'"+contract.debutSouplesse+"'":null) + ","
      + "" + (!Utils.isEmpty(contract.finSouplesse)?"'"+contract.finSouplesse+"'":null) + ","
      //+ "" + this.checkNull(contract.finSouplesse) + ","
      + "'" + Utils.sqlfyText(contract.usualWorkTimeHours) + "',"
      + "'" + contract.elementsCotisation + "',"
      + "'" + contract.elementsNonCotisation + "',"
      + "'" + Utils.sqlfyText(contract.motif) + "',"
      + "'" + Utils.sqlfyText(contract.titre) + "',"
      + "(select option_mission :: numeric from user_account where pk_user_account = '" + accountId + "'),"
      + "'" + epi + "',"
      + "'" + contract.periodicite + "',"
      + "'OUI',"
      + "'" + Utils.sqlfyText(contract.epiProvidedBy) + "',"
      + "'OUI',"
      + "'" + Utils.sqlfyText(listeEPI) + "',"
      + "'" + Utils.sqlfyText(contract.moyenAcces) + "',"
      + "'" + Utils.sqlfyText(contract.offerContact) + "',"
      + "'" + Utils.sqlfyText(contract.contactPhone) + "',"
      + "'" + Utils.sqlfyText(contract.characteristics) + "',"
      + "'" + contract.MonthlyAverageDuration + "',"
      + "'" + Utils.sqlfyText(contract.headOffice) + "',"
      + "'" + Utils.sqlfyText(contract.category) + "',"
      + "'" + Utils.sqlfyText(contract.sector) + "',"
      + "'" + Utils.sqlfyText(contract.contact) + "',"
      + "'" + contract.indemniteFinMission + "',"
      + "'" + Utils.sqlfyText(contract.numeroTitreTravail) + "',"
      + "'" + Utils.sqlfyText(contract.periodesNonTravaillees) + "',"
      + "'" + Utils.sqlfyText(contract.centreMedecineEntreprise) + "',"
      + "'" + Utils.sqlfyText(contract.adresseCentreMedecineEntreprise) + "',"
      + "'" + Utils.sqlfyText(contract.postRisks) + "',"
      + "'" + Utils.sqlfyText(contract.workAdress) + "',"
      + "'NON',"
      + "'" + contract.workTimeHours + "',"
      + "'" + idOffer + "'"
      + ")"
      + " RETURNING pk_user_contrat";

    console.log("save contract request");
    console.log(sql);

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  updateContractData(contract: any, jobyerId: Number, employerEntrepriseId: Number, projectTarget: string, accountId, idOffer) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    let dt = new Date();
    let epi = (contract.epi?'OUI':'NON');
    let isScheduleFixed = (contract.isScheduleFixed == 'true' ? 'OUI' : 'NON');
    let listeEPI = "";
    if(contract.epiList && contract.epiList.length != 0) {
      for (let i = 0; i < contract.epiList.length; i++) {
        listeEPI = listeEPI + ";" + contract.epiList[i].libelle;
      }
    }

    let sql = "UPDATE user_contrat SET " +
      "created = '" + new Date().toISOString() + "', " +
      "date_de_debut = " + DateUtils.displayableDateToSQL(contract.missionStartDate) + ", " +
      "date_de_fin = " + DateUtils.displayableDateToSQL(contract.missionEndDate) + ", " +
      "date_debut_terme = " + (contract.termStartDate?"'"+contract.termStartDate+"'":"null") + ", " +
      "date_fin_terme = " + (contract.termEndDate?"'"+contract.termEndDate+"'":"null") + ", " +
      "date_signature = '" + DateUtils.dateToSqlTimestamp(new Date()) + "', " +
      "heure_debut = '" + DateUtils.getMinutesFromDate(contract.workStartHour) + "', " +
      "heure_fin = '" + DateUtils.getMinutesFromDate(contract.workEndHour) + "', " +
      "motif_de_recours = '" + Utils.sqlfyText(contract.justification) + "', " +
      "numero = '" + Utils.sqlfyText(contract.num) + "', " +
      "periode_essai = '" + contract.trialPeriod + "', " +
      "tarif_heure = '" + contract.baseSalary + "', " +
      "horaires_fixes = '" + isScheduleFixed + "'," +
      "fk_user_entreprise = '" + employerEntrepriseId + "'," +
      "fk_user_jobyer = '" + jobyerId + "', " +
      "signature_employeur = 'NON', " +
      "signature_jobyer = 'NON', " +
      "taux_indemnite_fin_de_mission = 10, " +
      "taux_conges_payes = 10, " +
      "titre_transport = '" + Utils.sqlfyText(contract.titreTransport) + "', " +
      "zones_transport = '" + Utils.sqlfyText(contract.zonesTitre) + "', " +
      "surveillance_medicale_renforcee = '" + Utils.sqlfyText(contract.medicalSurv) + "', " +
      "debut_souplesse = " + (!Utils.isEmpty(contract.debutSouplesse)?"'"+contract.debutSouplesse+"'":null) + ", " +
      "fin_souplesse = " + (!Utils.isEmpty(contract.finSouplesse)?"'"+contract.finSouplesse+"'":null) + ", " +
      "organisation_particuliere = '" + Utils.sqlfyText(contract.usualWorkTimeHours) + "', " +
      "elements_soumis_a_des_cotisations = '" + contract.elementsCotisation + "', " +
      "elements_non_soumis_a_des_cotisations = '" + contract.elementsNonCotisation + "', " +
      "recours = '" + Utils.sqlfyText(contract.motif) + "', " +
      "titre = '" + Utils.sqlfyText(contract.titre) + "', " +
      "option_mission = (select option_mission :: numeric from user_account where pk_user_account = '" + accountId + "'), " +
      "equipements_fournis_par_l_ai = '" + epi + "', " +
      "fk_user_periodicite_des_paiements = '" + contract.periodicite + "', " +
      "embauche_autorise = 'OUI', " +
      "epi = '" + Utils.sqlfyText(contract.epiProvidedBy) + "', " +
      "rapatriement_a_la_charge_de_l_ai = 'OUI', " +
      "liste_epi = '" + Utils.sqlfyText(listeEPI) + "'," +
      "moyen_d_acces = '" + Utils.sqlfyText(contract.moyenAcces) + "', " +
      "contact_sur_place = '" + Utils.sqlfyText(contract.offerContact) + "', " +
      "telephone_contact = '" + Utils.sqlfyText(contract.contactPhone) + "', " +
      "caracteristiques_du_poste = '" + Utils.sqlfyText(contract.characteristics) + "', " +
      "duree_moyenne_mensuelle = '" + contract.MonthlyAverageDuration + "', " +
      "siege_social = '" + Utils.sqlfyText(contract.headOffice) + "', " +
      "statut = '" + Utils.sqlfyText(contract.category) + "', " +
      "filiere = '" + Utils.sqlfyText(contract.sector) + "', " +
      "contact = '" + Utils.sqlfyText(contract.contact) + "', " +
      "indemnite_fin_de_mission = '" + contract.indemniteFinMission + "', " +
      "n_titre_travail = '" + Utils.sqlfyText(contract.numeroTitreTravail) + "', " +
      "periodes_non_travaillees = '" + Utils.sqlfyText(contract.periodesNonTravaillees) + "', " +
      "centre_de_medecine_entreprise = '" + Utils.sqlfyText(contract.centreMedecineEntreprise) + "', " +
      "adresse_centre_de_medecine_entreprise = '" + Utils.sqlfyText(contract.adresseCentreMedecineEntreprise) + "', " +
      "risques = '" + Utils.sqlfyText(contract.postRisks) + "', " +
      "lieu_de_mission = '" + Utils.sqlfyText(contract.workAdress) + "', " +
      "en_brouillon = 'NON', " +
      "duree_hebdomadaire = "+ contract.workTimeHours + ", " +
      "fk_user_offre_entreprise = '" + idOffer + "' " +
      "WHERE pk_user_contrat = '" + contract.id + "'";

    console.log("save contract request");
    console.log(sql);

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

  updateContract(contractData, projectTarget) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    let sql = "UPDATE user_contrat SET " +
      "lien_jobyer = '" + Utils.sqlfyText(contractData.partnerJobyerLink)
      + "', lien_employeur = '" + Utils.sqlfyText(contractData.partnerEmployerLink)
      + "', demande_jobyer = '" + Utils.sqlfyText(contractData.demandeJobyer)
      + "', demande_employeur = '" + Utils.sqlfyText(contractData.demandeEmployer)
      + "', enveloppe_employeur = '" + Utils.sqlfyText(contractData.enveloppeEmployeur)
      + "', enveloppe_jobyer = '" + Utils.sqlfyText(contractData.enveloppeJobyer)
      + "' WHERE pk_user_contrat = '" + contractData.id + "'" ;
      return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;

          resolve(this.data);
        });
    });
  }

  checkNull(date) {
    if (!date || date.length == '')
      return null;
    return "'" + date + "'";
  }

  setOffer(idContract, idOffer) {
    let sql = "update user_contrat set fk_user_offre_entreprise = " + idOffer + " where pk_user_contrat=" + idContract;

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  /**
   * Load predefined recours list
   */
  loadRecoursList() {
    let sql = "select pk_user_recours as id, libelle from user_recours";
    //console.log(sql);


    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.data;
          resolve(this.data);
        });
    });
  }

  loadPeriodicites(projectTarget){
    let sql = "select pk_user_periodicite_des_paiements as id, libelle from user_periodicite_des_paiements";
    //console.log(sql);

    this.configuration = Configs.setConfigs(projectTarget);
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.data;
          resolve(this.data);
        });
    });
  }

  /**
   * Loading justification list
   * @param idRecours identifier of recours
   */
  loadJustificationsList(projectTarget) {
    let sql = "select pk_user_justificatifs_de_recours as id, libelle from user_justificatifs_de_recours where dirty = 'N'";
    //console.log(sql);

    this.configuration = Configs.setConfigs(projectTarget);
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = data.data;
          resolve(this.data);
        });
    });
  }

  /**
   * @Description Converts a timeStamp to date string :
   * @param date : a timestamp date
   * @param options Date options
   */
  toDateString(date: number, options: any) {
    options = (options) ? options : '';
    ////console.log(JSON.stringify(this.slots));
    ////console.log('Calendar slot in ms: ' + date);
    ////console.log('Calendar slot in date format: ' + new Date(date));
    return new Date(date).toLocaleDateString('fr-FR', options);
  }


  /**
   * @Description Converts a timeStamp to date string
   * @param time : a timestamp date
   */
  toHourString(time: number) {
    let minutes = (time % 60) < 10 ? "0" + (time % 60).toString() : (time % 60).toString();
    let hours = Math.trunc(time / 60) < 10 ? "0" + Math.trunc(time / 60).toString() : Math.trunc(time / 60).toString();
    return hours + ":" + minutes;
  }

  prepareHoraire(calendar,prerequis, epis, epiProvidedBy, address, moyen, contact, phone) {

    let html = "<br><p><b>Calendrier de travail</b></p><ul>";

    if (calendar && calendar.length > 0) {
      let slots = [];
      for (let i = 0; i < calendar.length; i++) {
        let c = calendar[i];
        slots.push(c);
      }
      for(let i = 0 ; i < slots.length-1 ; i++)
        for(let j = i ; j < slots.length ; j++){
          if(slots[i].date>slots[j].date){
            let tmp = slots[i];
            slots[i] = slots[j];
            slots[j] = tmp;
          }
        }
      for (let i = 0; i < slots.length; i++) {
        let c = slots[i];
        if(c.date == c.dateEnd)
          html = html + "<li><span style='font-weight:bold'>" + this.toDateString(c.date, '') + "</span>&nbsp;&nbsp; de " + this.toHourString(c.startHour) + " à " + this.toHourString(c.endHour) + "</li>";
        else
          html = html + "<li><span style='font-weight:bold'>" + this.toDateString(c.date, '') +" au " + this.toDateString(c.dateEnd, '') + "</span>&nbsp;&nbsp; de " + this.toHourString(c.startHour) + " à " + this.toHourString(c.endHour) + "</li>";
      }

    }

    html = html + "</ul>";

    if(prerequis && prerequis.length > 0){
      html = html + "<br><p><b>Formations et habilitations</b></p><ul>";
      for (let i = 0; i < prerequis.length; i++) {
        let p = prerequis[i];
        html = html + "<li>"+ p + "</li>";
      }
      html = html + "</ul>";
    }


    if(epis && epis.length>0){
      html = html + "<br><p><b>Equipements de protection individuels</b></p><ul>";
      for (let i = 0; i < epis.length; i++) {
        let p = epis[i];
        html = html + "<li>"+ p + "</li>";
      }
      html = html + "</ul>";
    }

    html = html + "<br><p><b>Adresse de la mission : </b>"+address+"</p>";
    html = html + "<br><p><b>Moyen d'accès : </b>"+moyen+"</p>";
    if(contact && contact.length>0)
      html = html + "<br><p><b>Contact sur place : </b>"+contact+"</p>";
    if(phone && phone.length>0)
      html = html + "<br><p><b>N° Téléphone : </b>"+phone+"</p>";
    return html;
  }

  /**
   * @description call yousign service
   * @param employer
   * @param jobyer
   * @return JSON results in form of youSign Object
   */
  callYousign(user: any, employer: any, jobyer: any, contract: ContractData, projectTarget: string, currentOffer: any, idQuote: any) {
    let horaires = '';

    if (currentOffer) {
      horaires = this.prepareHoraire(currentOffer.calendarData,
        contract.prerequis,
        contract.epiList,
        contract.epiProvidedBy,
        contract.adresseInterim,
        contract.moyenAcces,
        contract.offerContact,
        contract.contactPhone
      );
    }
    //get configuration
    let sh = 'Horaires variables selon planning';
    let eh = '';
    sh = DateUtils.toHourString(contract.workStartHour);
    eh = " à "+DateUtils.toHourString(contract.workEndHour);
    if(contract.isScheduleFixed == 'false'){
      eh = eh + " puis variables selon planning.";
    }

    if(!contract.epiList || contract.epiList.length == 0){
      contract.equipements = "Aucun équipement de sécurité";
    } else {
      //contract.equipements = "Voir annexe";
      let listeEPI = "";
      for (let i = 0; i < contract.epiList.length; i++) {
        listeEPI = listeEPI + contract.epiList[i] + "<br>";
      }
      contract.equipements = listeEPI;
    }

    this.configuration = Configs.setConfigs(projectTarget);
    let jsonData = {
      "titre": user.titre,
      "prenom": user.prenom,
      "nom": user.nom,
      "entreprise": employer.entreprises[0].nom,
      "adresseEntreprise": contract.workAdress,
      "jobyerPrenom": contract.jobyerPrenom,
      "jobyerNom": contract.jobyerNom,
      "nss": contract.jobyerNumSS,
      "dateNaissance": DateUtils.toDateString(contract.jobyerBirthDate),
      "lieuNaissance": contract.jobyerLieuNaissance,
      "nationalite": contract.jobyerNationaliteLibelle,
      "adresseDomicile": jobyer.address,
      "dateDebutMission": contract.missionStartDate,
      "dateFinMission": contract.missionEndDate,
      "periodeEssai": contract.trialPeriod == null ? "" : ( contract.trialPeriod == 1 ? "1 jour" : (contract.trialPeriod + " jours")),
      "dateDebutTerme": DateUtils.toDateString(contract.termStartDate),
      "dateFinTerme": DateUtils.toDateString(contract.termEndDate),
      "motifRecours": contract.justification,
      "justificationRecours": contract.motif,
      "qualification": contract.qualification,
      "caracteristiquePoste": Utils.preventNull(contract.characteristics),
      "tempsTravail": {
        "nombreHeures": +contract.workTimeHours,
        "variables": contract.workTimeVariable,
      },
      "horaireHabituel": {
        "debut": sh,
        "fin": eh,
        "variables": contract.workHourVariable,
      },
      "posteARisque": "Non",
      "surveillanceMedicale": contract.medicalSurv,
      "epi": contract.epi,
      "salaireBase": contract.baseSalary,
      "dureeMoyenneMensuelle": contract.MonthlyAverageDuration,
      "salaireHN": contract.salaryNHours,
      "salaireHS": {
        "35h": contract.salarySH35,
        "43h": contract.salarySH43,
      },
      "droitRepos": contract.restRight,
      "adresseInterim": contract.adresseInterim,
      "client": contract.customer,
      "primeDiverses": contract.primes,
      "SiegeSocial": contract.headOffice,
      "ContenuMission": contract.headOffice,
      "categorie": contract.category,
      "filiere": contract.sector,
      "HeureDebutMission": sh,
      "HeureFinMission": eh,
      "num": contract.num,

      "numero": contract.num,
      "contact": contract.contact,
      "indemniteFinMission": contract.indemniteFinMission,
      "indemniteCongesPayes": contract.indemniteCongesPayes,
      "moyenAcces": contract.moyenAcces,
      "numeroTitreTravail": contract.numeroTitreTravail,
      "debutTitreTravail": contract.jobyerDebutTitreTravail,
      "finTitreTravail": contract.jobyerFinTitreTravail,
      "periodesNonTravaillees": contract.periodesNonTravaillees,
      "debutSouplesse": DateUtils.toDateString(contract.debutSouplesse),
      "finSouplesse": DateUtils.toDateString(contract.finSouplesse),
      "equipements": contract.equipements,
      "centreMedecineEntreprise": contract.centreMedecineEntreprise,
      "adresseCentreMedecineEntreprise": contract.adresseCentreMedecineEntreprise,
      "centreMedecineETT": contract.centreMedecineETT,
      "adresseCentreMedecineETT": contract.adresseCentreMedecineETT,
      "risques": Utils.preventNull(contract.postRisks.split("%0A").join(" - ")),
      "titreTransport": contract.titreTransport,
      "zonesTitre": contract.zonesTitre,
      "elementsCotisation": ""+contract.elementsCotisation,
      "elementsNonCotisation": ""+contract.elementsNonCotisation,
      "horaires": horaires,
      "organisationParticuliere":''
    };

    let partner = GlobalConfigs.global['electronic-signature'];

    var dataSign = JSON.stringify(
      {
        'class': (partner === 'yousign' ? 'com.vitonjob.yousign.callouts.YousignConfig' :
            (partner === 'docusign' ? 'com.vitonjob.docusign.model.DSConfig' :
                ''
            )
        ),
        'employerFirstName': user.prenom,
        'employerLastName': user.nom,
        'employerEmail': user.email,
        'employerPhone': user.tel,
        'jobyerFirstName': contract.jobyerPrenom,
        'jobyerLastName': contract.jobyerNom,
        'jobyerEmail': jobyer.email,
        'jobyerPhone': jobyer.tel,
        'idQuote': idQuote,
        'idDocument' : idQuote,
        'data': btoa(unescape(encodeURIComponent(JSON.stringify(jsonData)))),
        'environnement': Configs.env
      });


    // Compute ID according to env
    let calloutId = 10337;
    if (Configs.env == 'PROD') {
      calloutId = 10537;
    }

    var payload = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      'id': (partner === 'yousign' ? 224 :
          (partner === 'docusign' ? calloutId :
              -1
          )
      ),
      'args': [
        {
          'class': 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Signature electronique',
          value: btoa(dataSign)
        }
      ]
    };

    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = new Headers();
      headers = Configs.getHttpJsonHeaders();

      this.http.post(Configs.yousignURL, JSON.stringify(payload), {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          //
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }



  generateMission(idContract, offer) {
    let calendar = offer.calendarData;
    if (calendar && calendar.length > 0) {
      //sort calendar by start date
      calendar.sort(function(a, b) {
        return b.date - a.date;
      });
      for (let i = 0; i < calendar.length; i++) {
        let c = calendar[i];
        if(c.pause){
          //j keeps the index of the pause
          let j = i;
          // i should be incremented to verify the next slot (either mission hour or pause)
          i = i + 1;
          while(calendar[i].pause){
            i = i + 1;
          }
          this.generateMissionHour(idContract, calendar[i]).then((data: any) => {
            for(let k = j; k < i; k++) {
              this.generateMissionPause(calendar[k], data.data[0].pk_user_heure_mission);
            }
          });
        }else{
          this.generateMissionHour(idContract, c);
        }
      }
    }
  }

  generateMissionHour(idContract, c) {
    let d = new Date(c.date);
    let f = new Date(c.dateEnd);
    let sql = "insert into user_heure_mission " +
      "(fk_user_contrat, " +
      "jour_debut, " +
      "jour_fin, " +
      "heure_debut, " +
      "heure_fin, " +
      "validation_jobyer, " +
      "validation_employeur) " +
      "values " +
      "(" + idContract + ", " +
      "'" + DateUtils.sqlfy(d) + "', " +
      "'" + DateUtils.sqlfy(f) + "', " +
      "" + c.startHour + ", " +
      "" + c.endHour + "," +
      "'NON', " +
      "'NON')" +
      " RETURNING pk_user_heure_mission";
    ;
    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  generateMissionPause(c, missionHourId) {
    let sql = "insert into user_pause " +
      "(fk_user_heure_mission, " +
      "debut, " +
      "fin) " +
      "values " +
      "(" + missionHourId + ", " +
      "'" + DateUtils.getMinutesFromDate(new Date(c.date)) + "', " +
      "'" + DateUtils.getMinutesFromDate(new Date(c.dateEnd)) + "')";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  checkDocusignSignatureState(contractId, role) {
    let signColName;
    if(role == 'jobyer'){
      signColName = "signature_jobyer";
    }else{
      signColName = "signature_employeur";
    }

    let sql = 'select ' + signColName + ' as etat from user_contrat where pk_user_contrat=' + contractId;
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

  getContractsByOffer(offerId) {
    let sql = 'select * from user_contrat where fk_user_offre_entreprise=' + offerId;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getNonSignedEmployerContracts(entrepriseId){
    let sql = 'SELECT '
    + 'c.pk_user_contrat as id '
      + ', c.numero as num '
      + ', c.en_brouillon as "isDraft" '
      + ', c.fk_user_offre_entreprise as "idOffer" '
      + ', uoe.fk_user_offre_entreprise as "idOfferType" '
      + ', c.created, c.lien_employeur as "partnerEmployerLink" '
      + ', j.nom, j.prenom, j.lieu_de_naissance as "lieuNaissance" '
      + ', j.date_de_naissance as "jobyerBirthDate" '
      + ', j.numero_securite_sociale as "numSS" '
      + ', j.pk_user_jobyer as "jobyerId" '
      + ', a.email '
      + ', a.telephone as tel '
      + ', (SELECT ' +
          'count(*) ' +
          'FROM user_offre_entreprise uoe2 ' +
          'WHERE uoe2.fk_user_offre_entreprise = uoe.fk_user_offre_entreprise' +
        ') AS "nbChildren" '
      + ', slot.premier_jour as jour '
      + ", to_char(slot.premier_jour, 'HH24')::integer * 60 + to_char(slot.premier_jour, 'MI')::integer as heure_debut "
    + 'FROM '
      + 'user_contrat as c, '
      + 'user_jobyer as j, '
      + 'user_account as a, '
      + 'user_offre_entreprise as uoe '
    + 'LEFT JOIN ( '
      + "SELECT d.fk_user_offre_entreprise, MIN(d.jour + (d.heure_debut::text||' minute')::INTERVAL) as premier_jour "
      + 'FROM user_disponibilites_des_offres d '
      + 'GROUP BY d.fk_user_offre_entreprise '
    + ') slot ON slot.fk_user_offre_entreprise = uoe.pk_user_offre_entreprise '
    + 'WHERE '
    + "c.dirty='N' "
    + 'AND c.fk_user_entreprise=' + entrepriseId + ' '
    + "AND upper(c.signature_employeur) = 'NON' "
    + 'AND c.fk_user_jobyer = j.pk_user_jobyer '
    + 'AND a.pk_user_account = j.fk_user_account '
    + 'AND uoe.pk_user_offre_entreprise = c.fk_user_offre_entreprise '
    + 'ORDER BY c.created DESC '
  ;

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getNonSignedJobyerContracts(jobyerId){
    let sql = "SELECT minHM.fk_user_contrat, minHM.jour, minHM.heure_debut, " +
      'c.pk_user_contrat as id, c.numero as num, c.created, c.en_brouillon as "isDraft",c.signature_employeur, c.lien_jobyer as \"partnerJobyerLink\", ' +
      "e.nom, e.prenom " +
      "FROM " +
      "(SELECT MIN(uhm.jour_debut)as jour, " +
        "MIN(uhm.heure_debut) as heure_debut, " +
        "uhm.fk_user_contrat " +
        "FROM user_heure_mission as uhm " +
        "GROUP BY uhm.fk_user_contrat " +
        "ORDER BY uhm.fk_user_contrat " +
      ") minHM, user_contrat as c, user_entreprise as ent, user_employeur as e " +
      "WHERE minHM.fk_user_contrat = c.pk_user_contrat " +
      "AND c.fk_user_jobyer = " + jobyerId + " " +
      "AND upper(c.signature_employeur) = 'OUI' " +
      "AND upper(c.signature_jobyer) = 'NON' " +
      "AND c.dirty = 'N' " +
      "AND c.fk_user_entreprise = ent.pk_user_entreprise " +
      "AND ent.fk_user_employeur = e.pk_user_employeur " +
      "ORDER BY c.created DESC";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  getCountNonSignedContract(projectTarget, roleId){
    let sql = "";
    if(projectTarget == "jobyer"){
      sql = "SELECT count(*) as \"nbContrat\" " +
        "FROM user_contrat " +
        "WHERE fk_user_jobyer = " + roleId + " " +
        "AND upper(signature_employeur) = 'OUI' " +
        "AND upper(signature_jobyer) = 'NON' " +
        "AND dirty = 'N'";
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

  getContractDataInfos(contractId, projectTarget){
    let sql = 'SELECT ' +
        'c.pk_user_contrat as id,' +
        'c.numero as num,' +
        'c.en_brouillon as \"isDraft\",' +
        'c.fk_user_offre_entreprise as \"idOffer\",' +
        'c.created,' +
        'c.tarif_heure as \"baseSalary\",' +
        'c.horaires_fixes as \"isScheduleFixed\",' +
        'c.heure_debut as \"workStartHour\",' +
        'c.heure_fin as \"workEndHour\",' +
        'c.date_de_debut as \"missionStartDate\",' +
        'c.date_de_fin as \"missionEndDate\",' +
        'c.date_debut_terme as \"termStartDate\",' +
        'c.date_fin_terme as \"termEndDate\",' +
        'c.periode_essai as \"trialPeriod\",' +
        'c.motif_de_recours as justification,' +
        'c.recours as motif,' +
        'c.surveillance_medicale_renforcee as \"medicalSurv\",' +
        'c.equipements_fournis_par_l_ai as epi,' +
        'c.elements_non_soumis_a_des_cotisations as \"elementsNonCotisation\",' +
        'c.elements_soumis_a_des_cotisations as \"elementsCotisation\",' +
        'c.zones_transport as \"zonesTitre\",' +
        'c.titre_transport as \"titreTransport\",' +
        'c.debut_souplesse as \"debutSouplesse\",' +
        'c.fin_souplesse as \"finSouplesse\",' +
        'c.liste_epi as \"epiString\",' +
        'c.moyen_d_acces as \"moyenAcces\",' +
        'c.contact_sur_place as \"offerContact\",' +
        'c.telephone_contact as \"contactPhone\",' +
        'c.caracteristiques_du_poste as characteristics,' +
        'c.duree_moyenne_mensuelle as \"MonthlyAverageDuration\",' +
        'c.siege_social as \"headOffice\",' +
        'c.lieu_de_mission as \"workAdress\",' +
        'c.statut as category,' +
        'c.filiere as sector,' +
        'c.contact,' +
        'c.indemnite_fin_de_mission as \"indemniteFinMission\",' +
        'c.n_titre_travail as \"numeroTitreTravail\",' +
        'c.periodes_non_travaillees as \"periodesNonTravaillees\",' +
        'c.centre_de_medecine_entreprise as \"centreMedecineEntreprise\",' +
        'c.adresse_centre_de_medecine_entreprise as \"adresseCentreMedecineEntreprise\",' +
        'c.risques as \"postRisks\",' +
        'c.epi as \"epiProvidedBy\",' +
        'c.fk_user_periodicite_des_paiements as periodicite,' +
        'c.lien_employeur as \"partnerEmployerLink\",' +
        'c.lien_jobyer as \"partnerJobyerLink\",' +
        'c.demande_jobyer as \"demandeJobyer\",' +
        'c.demande_employeur as \"demandeEmployer\",' +
        'c.enveloppe_jobyer as \"enveloppeJobyer\",' +
        'c.enveloppe_employeur as \"enveloppeEmployeur\",' +
        'c.duree_hebdomadaire as \"workTimeHours\",' +
        'j.nom as \"jobyerNom\",' +
        'j.prenom as \"jobyerPrenom\",' +
        'j.numero_securite_sociale as \"jobyerNumSS\",' +
        'j.lieu_de_naissance as \"jobyerLieuNaissance\",j.date_de_naissance as \"jobyerBirthDate\",' +
        'j.pk_user_jobyer as \"jobyerId\",' +
        'j.debut_validite as \"jobyerDebutTitreTravail\",' +
        'j.fin_validite as \"jobyerFinTitreTravail\",' +
        'n.libelle as \"jobyerNationaliteLibelle\",' +
        'a.email,' +
        'a.telephone as tel,' +
        'o.titre as qualification ' +
      'FROM user_contrat as c ' +
      'LEFT JOIN user_jobyer j ON c.fk_user_jobyer = j.pk_user_jobyer ' +
      'LEFT JOIN user_nationalite n ON j.fk_user_nationalite = n.pk_user_nationalite ' +
      'LEFT JOIN user_account a ON a.pk_user_account = j.fk_user_account ' +
      'LEFT JOIN user_offre_entreprise o ON o.pk_user_offre_entreprise = c.fk_user_offre_entreprise ' +
      "WHERE " +
        "c.pk_user_contrat = '" + contractId+ "' " +
        "AND c.dirty = 'N'"
    ;

    this.configuration = Configs.setConfigs(projectTarget);
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any)=> {
          if(data && data.status == "success" && data.data && data.data.length > 0){
            let contractData: ContractData = new ContractData();
            let res = data.data[0];
            Utils.copyKeyValues(res, contractData);
            resolve(contractData);
          }
        });
    });
  }

  formatNumContrat(num) {
    let snum = num + "";
    let zeros = 10 - snum.length;
    if (zeros < 0)
      return snum;

    for (let i = 0; i < zeros; i++)
      snum = "0" + snum;

    return snum;
  }

  saveInitialContract(contractNum: number, jobyerId: Number, employerEntrepriseId: Number, idOffer: Number, projectTarget: string) {
    //  Init project parameters
    this.configuration = Configs.setConfigs(projectTarget);
    let sql = "INSERT INTO user_contrat (" +
      " created," +
      " numero," +
      " fk_user_entreprise," +
      " fk_user_jobyer," +
      " signature_employeur," +
      " signature_jobyer," +
      " en_brouillon," +
      " fk_user_offre_entreprise" +
      ")" +
      " VALUES ("
      + "'" + new Date().toISOString() + "',"
      + "'" + Utils.sqlfyText(contractNum) + "',"
      + "'" + employerEntrepriseId + "',"
      + "'" + jobyerId + "',"
      + "'NON',"
      + "'NON',"
      + "'OUI',"
      + "'" + idOffer + "'"
      + ")"
      + " RETURNING pk_user_contrat as \"contractId\"";

    return new Promise(resolve => {
      let headers = new Headers();
      headers = Configs.getHttpTextHeaders();
      this.http.post(this.configuration.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          if(data && data.status == "success" && data.data && data.data.length > 0){
            resolve(data.data[0]);
          }
        });
    });
  }

  prepareRecruitement(entrepriseId, email, tel, idOffer, jobyerId, projectTarget){
    let bean = {
      class: "com.vitonjob.gcr.model.Query",
      entrepriseId : entrepriseId,
      email : email,
      tel : tel,
      idOffer : idOffer,
      jobyerId: jobyerId
    };

    let body = {
      'class': 'fr.protogen.masterdata.model.CCallout',
      id: 20053,
      args: [
        {
          class: 'fr.protogen.masterdata.model.CCalloutArguments',
          label: 'Préparation du recrutement',
          value: btoa(JSON.stringify(bean))
        }
      ]
    };

    this.configuration = Configs.setConfigs(projectTarget);
    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(this.configuration.calloutURL, body, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any) => {
        resolve(data);
      });
    });
  }

  /**
   *
   * @param contractList
   * @param contract
   * @returns {boolean}
   */
  canCancelContract(contractList, contract): boolean {

    let children = contractList.filter((e)=> {
      return e.idOfferType == contract.idOfferType;
    });
    return (children.length > 0);
  }

  /**
   *
   * @param offerId
   * @returns {Promise<T>}
   */
  cancelContractFromContractId(id: number) {
let sql = "UPDATE user_contrat SET dirty='Y' WHERE pk_user_contrat = " + id;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any)=> {
          resolve(data);
        });
    });
  }

  /**
   *
   * @param contractList
   * @param contract
   * @returns {undefined|Promise<T>}
   */
  cancelContract(contractList, contract) {
    // Retrieve offerType and offerType children
    console.log('cancelContract');
    console.log(contractList);
    console.log(contract);

    // this.cancelOfferFromOfferId(contract.idOffer);
    return this.cancelContractFromContractId(contract.id);
  }
}
