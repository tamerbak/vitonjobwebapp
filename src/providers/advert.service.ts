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
}
