import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Configs} from "../configurations/configs";

@Injectable()
export class AdvertService {
  constructor(public http : Http){

  }

  loadAdverts(idEntreprise){
    let sql = "select " +
      "pk_user_annonce_entreprise as id" +
      ", titre as titre" +
      ", contenu as content" +
      ", piece_jointe as attachement" +
      ", image_principale as imgbg" +
      ", thumbnail" +
      ", created " +
      ", fk_user_offre_entreprise as \"offerId\" " +
      "from user_annonce_entreprise " +
      "where dirty='N' and fk_user_entreprise="+idEntreprise+" order by pk_user_annonce_entreprise desc";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let adverts = [];
          if(data && data.data){
            for(let i = 0 ; i < data.data.length ; i++){
              let r = data.data[i];
              let adv = {
                id : r.id,
                'class' : 'com.vitonjob.annonces.Annonce',
                idEntreprise : idEntreprise,
                titre : r.titre,
                description : this.prepareContent(r.content),
                briefContent : this.prepareBriefContent(r.content),
                attachement : {
                  'class':'com.vitonjob.annonces.Attachement',
                  code : 0,
                  status : '',
                  fileContent : '',
                  fileName : this.getImageName(r.attachement),
                },
                thumbnail : {
                  'class':'com.vitonjob.annonces.Attachement',
                  code : 0,
                  status : '',
                  fileContent : this.prepareImage(r.thumbnail),
                  fileName: this.getImageName(r.thumbnail)
                },
                isThumbnail : r.thumbnail && r.thumbnail.length > 0,
                imgbg : {
                  'class':'com.vitonjob.annonces.Attachement',
                  code : 0,
                  status : '',
                  fileContent : this.prepareImage(r.imgbg),
                  fileName: this.getImageName(r.imgbg)
                },
                rubriques : [],
                created : this.parseDate(r.created),
                offerId: r.offerId
              };

              adverts.push(adv);
            }
          }
          resolve(adverts);
        });
    });
  }

  saveNewAdvert(advert : any){
    let sql = "insert into user_annonce_entreprise " +
      "(titre, contenu, piece_jointe, thumbnail, image_principale, fk_user_entreprise) " +
      "values " +
      "('"+this.sqlfyText(advert.titre)+"', '"+this.sqlfyText(advert.description)+"', " +
        "'"+this.sqlfyText(advert.attachement.fileContent)+"', '"+this.sqlfyText(advert.thumbnail.fileContent)+"', " +
        "'"+this.sqlfyText(advert.imgbg.fileContent)+"', "+advert.idEntreprise+") returning pk_user_annonce_entreprise";
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let res = {
            id : 0
          };
          if(data && data.data && data.data.length>0){
            res.id = data.data[0].pk_user_annonce_entreprise;
          }
          resolve(res);
        });
    });
  }

  saveAdvert(advert: any) {
    let sql = "UPDATE user_annonce_entreprise " +
      "SET " +
      "titre = '" + this.sqlfyText(advert.titre) + "', " +
      "contenu = '" + this.sqlfyText(advert.description) + "', " +
      "piece_jointe = '" + this.sqlfyText(advert.attachement.fileContent) + "', " +
      "thumbnail = '" + this.sqlfyText(advert.thumbnail.fileContent) + "', " +
      "image_principale = '" + this.sqlfyText(advert.imgbg.fileContent) + "' " +
      "WHERE " +
      "pk_user_annonce_entreprise = " + advert.id + ";"
    ;
    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          let res = {
            id: 0
          };
          if (data && data.data && data.data.length > 0) {
            res.id = data.data[0].pk_user_annonce_entreprise;
          }
          resolve(res);
        });
    });
  }

  prepareContent(content : string){
    if(!content || content.length == 0)
      return "";
    let val = "";
    try{
      val = atob(content);
    }catch(exc){
      val = content;
    }
    return val;
  }

  prepareBriefContent(content : string){
    let cnt = this.prepareContent(content);
    if(cnt.length>128)
      return cnt.substr(0, 128)+'...';
    return cnt;
  }
  parseDate(dateStr: string) {
    if (!dateStr || dateStr.length == 0 || dateStr.split('-').length == 0)
      return '';
    dateStr = dateStr.split(' ')[0];
    return dateStr.split('-')[2] + '/' + dateStr.split('-')[1] + '/' + dateStr.split('-')[0];
  }
  prepareImage(strImg : string){
    if(!strImg || strImg.length == 0)
      return "";

    let file = strImg.split(';')[0];
    let enc = strImg.split(';')[1];
    if(file.split('.').length<=1)
      return enc;

    enc = "data:image/"+file.split('.')[1]+";base64,"+enc;
    return enc;
  }
  getImageName(strImg) {
    if(!strImg || strImg.length == 0)
      return "";

    let file = strImg.split(';')[0];
    return file;
  }

  updateAdvertWithOffer(advertId, offerId) {
    let sql = "UPDATE user_annonce_entreprise " +
        "SET " +
        "fk_user_offre_entreprise = '" + offerId + "' " +
        "WHERE " +
        "pk_user_annonce_entreprise = " + advertId + ";";

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  sqlfy(d) {
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " 00:00:00+00";
  }

  sqlfyText(text) {
    if (!text || text.length == 0)
      return "";
    return text.replace(/'/g, "''")
  }
}
