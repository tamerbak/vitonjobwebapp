import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Configs} from "../configurations/configs";
import {Utils} from "../app/utils/utils";

@Injectable()
export class ConventionService {
  configuration: any;
  projectTarget: any;

  constructor(private http: Http) {}

  createConditionEmploi(offerId, categories, majors, indemns) {
    let sql = ""
    for(let i = 0; i < categories.length; i++){
      let cat = categories[i];
      let ope = {start:-1, end:-1, hourOperators : false};
      if(cat.debut>0 && cat.fin>0){
        ope.hourOperators = true;
        ope.start = cat.debutHeure*60+cat.debutMinute;
        ope.end = cat.finHeure*60+cat.finMinute;
      }
      let sope = btoa(JSON.stringify(ope));
      sql = sql + "insert into user_offre_categorie_heure_conv (fk_user_offre_entreprise, fk_user_categorie_heures_conventionnees, coefficient, type_de_valeur, operandes) values (" + offerId + ", " + cat.catId + ", " + cat.empValue + ", '" + cat.typeValue + "', '"+sope+"'); ";
    }
    for(let i = 0; i < majors.length; i++){
      let maj = majors[i];
      sql = sql + "insert into user_offre_categorie_major_heure_conv (fk_user_offre_entreprise, fk_user_categorie_majoration_heure, coefficient, type_de_valeur) values (" + offerId + ", " + maj.majId + ", " + maj.empValue + ", '" + maj.typeValue + "'); ";
    }
    for(let i = 0; i < indemns.length; i++){
      let ind = indemns[i];
      sql = sql + "insert into user_offre_type_indemnite (fk_user_offre_entreprise, fk_user_type_indemnite, valeur, type_de_valeur) values (" + offerId + ", " + ind.indId + ", " + ind.empValue + ", '" + ind.typeValue + "'); ";
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

  updateConditionEmploi(offerId, categories, majors, indemns) {
    let sql = ""
    for(let i = 0; i < categories.length; i++){
      let cat = categories[i];
      let ope = {start:-1, end:-1, hourOperators : false};
      if(cat.debut>0 && cat.fin>0){
        ope.hourOperators = true;
        ope.start = cat.debutHeure*60+cat.debutMinute;
        ope.end = cat.finHeure*60+cat.finMinute;
      }
      let sope = btoa(JSON.stringify(ope));
        sql = sql + "update user_offre_categorie_heure_conv set coefficient = " + cat.empValue +
          ", operandes = '" + sope + "'" +
          " where fk_user_offre_entreprise = " + offerId  +
          " and fk_user_categorie_heures_conventionnees = " + cat.catId + "; ";
    }
    for(let i = 0; i < majors.length; i++){
      let maj = majors[i];
        sql = sql + "update user_offre_categorie_major_heure_conv set coefficient = " + maj.empValue +
          " where fk_user_offre_entreprise = " + offerId  +
          " and fk_user_categorie_majoration_heure = " + maj.majId + "; ";

    }
    for(let i = 0; i < indemns.length; i++){
      let ind = indemns[i];
        sql = sql + "update user_offre_type_indemnite set valeur = " + ind.empValue +
          " where fk_user_offre_entreprise = " + offerId  +
          " and fk_user_type_indemnite = " + ind.indId + "; ";

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

  getHoursCategoriesEmp(idConv, idOffer){
    let sql = "select o.pk_user_offre_categorie_heure_conv as \"offerCatId\", o.coefficient as \"empValue\", o.type_de_valeur as \"typeValue\", " +
      " cat.pk_user_categorie_heures_conventionnees as \"catId\",  cat.code, o.operandes, " +
      " chc.pk_user_coefficient_heure_conventionnee as id, chc.libelle, chc.coefficient, chc.formule_jour, chc.debut, chc.fin " +
      "from user_categorie_heures_conventionnees cat " +
      "LEFT JOIN user_coefficient_heure_conventionnee chc " +
      "ON chc.fk_user_categorie_heures_conventionnees = cat.pk_user_categorie_heures_conventionnees " +
      "LEFT JOIN user_offre_categorie_heure_conv o " +
      "ON o.fk_user_categorie_heures_conventionnees = cat.pk_user_categorie_heures_conventionnees " +
      "where chc.fk_user_convention_collective = " + idConv +
      " and o.fk_user_offre_entreprise = " + idOffer + "" +
      " and chc.dirty='N';";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let list = [];
          if(data.data && data.data.length>0){
            list = data.data;
            for(let i = 0; i< list.length ; i++){
              if(list[i].debut<0 || list[i].fin<0){
                list[i].debutHeure = 0;
                list[i].debutMinute = 0;
                list[i].finHeure = 0;
                list[i].finMinute = 0;
              } else {
                if(list[i].operandes && list[i].operandes.length>0){
                  let json = JSON.parse(atob(list[i].operandes));
                  if(json.hourOperators){
                    list[i].debut= json.start;
                    list[i].fin= json.end;
                  }
                }
                let div = Math.floor(list[i].debut/60);
                let rem = list[i].debut % 60;
                list[i].debutHeure = div;
                list[i].debutMinute = rem;

                div = Math.floor(list[i].fin/60);
                rem = list[i].fin % 60;
                if(div>=24){
                  div = 23;
                  rem = 59;
                }

                list[i].finHeure = div;
                list[i].finMinute = rem;

              }
            }
          }

          resolve(list);
        });
    });
  }

  getHoursMajorationEmp(idConv, idOffer){
    let sql = "select o.pk_user_offre_categorie_major_heure_conv as \"offerMajId\", o.coefficient as \"empValue\", o.type_de_valeur as \"typeValue\", " +
      " cat.pk_user_categorie_majoration_heure as \"majId\",  cat.code, " +
      " maj.pk_user_majoration_heure_conventionnee as id, maj.libelle, maj.coefficient " +
      "from user_categorie_majoration_heure cat " +
      "LEFT JOIN user_majoration_heure_conventionnee maj " +
      "ON maj.fk_user_categorie_majoration_heure = cat.pk_user_categorie_majoration_heure " +
      "LEFT JOIN user_offre_categorie_major_heure_conv o " +
      "ON o.fk_user_categorie_majoration_heure = cat.pk_user_categorie_majoration_heure " +
      "where maj.fk_user_convention_collective = " + idConv +
      " and o.fk_user_offre_entreprise = " + idOffer + " and maj.dirty='N'";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let list = [];
          if(data.data && data.data.length>0)
            list = data.data;
          resolve(list);
        });
    });
  }

  getIndemnitesEmp(idConv, idOffer){
    let sql = "select o.pk_user_offre_type_indemnite as \"offerIndId\", o.valeur as \"empValue\", o.type_de_valeur as \"typeValue\", " +
      " cat.pk_user_type_indemnite as \"indId\",  cat.code, " +
      " ind.pk_user_indemnite_conventionnee as id, ind.libelle, ind.valeur as coefficient " +
      "from user_type_indemnite cat " +
      "LEFT JOIN user_indemnite_conventionnee ind " +
      "ON ind.fk_user_type_indemnite = cat.pk_user_type_indemnite " +
      "LEFT JOIN user_offre_type_indemnite o " +
      "ON o.fk_user_type_indemnite = cat.pk_user_type_indemnite " +
      "where ind.fk_user_convention_collective = " + idConv +
      " and o.fk_user_offre_entreprise = " + idOffer + " and ind.dirty='N'";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          let list = [];
          if(data.data && data.data.length>0)
            list = data.data;
          resolve(list);
        });
    });
  }

  convertValuesToPercent(objs){

    for(let i = 0; i < objs.length; i++){
      if(objs[i].typeValue == "%"){
        objs[i].coefficient = (objs[i].coefficient * 100).toFixed(2);
        objs[i].empValue = (objs[i].empValue * 100).toFixed(2);
      }
    }
    return objs;
  }

  convertPercentToRaw(objs){
    for(let i = 0; i < objs.length; i++){
      if(objs[i].typeValue == "%"){
        objs[i].coefficient = objs[i].coefficient / 100;
        objs[i].empValue = objs[i].empValue / 100;
      }
    }
    return objs;
  }

  loadConventionData(employeurId) {
    let sql = "select duree_collective_travail_hebdo " +
      "from user_employeur " +
      "where pk_user_employeur=" + employeurId + ";";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe((data: any) => {
          resolve(data.data);
        });
    });
  }
}
