import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Configs} from "../configurations/configs";

@Injectable()
export class AdvertService {
  constructor(public http : Http){

  }

  loadAdverts(idEntreprise){
    let sql = "select pk_user_annonce_entreprise as id, titre as title, contenu as content, thumbnail, created " +
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
              let adv= {
                id : r.id,
                title : r.title,
                content : this.prepareContent(r.content),
                briefContent : this.prepareBriefContent(r.content),
                created : this.parseDate(r.created),
                thumbnail : this.prepareImage(r.thumbnail),
                isThumbnail : r.thumbnail && r.thumbnail.length>0
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
  sqlfy(d) {
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " 00:00:00+00";
  }

  sqlfyText(text) {
    if (!text || text.length == 0)
      return "";
    return text.replace(/'/g, "''")
  }
}
