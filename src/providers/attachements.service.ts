import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/map";
import {Configs} from "../configurations/configs";
import {Utils} from "../app/utils/utils";

type File = {id : string, fileName : string, uploadDate : string, fileFolder: string}
type Folder = {name: string, folders: Folder[], files: File[]};

@Injectable()
export class AttachementsService {
  data: any;
  attachement: any;

  constructor(private http: Http) {
    this.data = null;
  }

  loadAttachements(user){

    let entreprise : any = null;
    if (user && Utils.isEmpty(user.employer.entreprises) === false && user.employer.entreprises.length > 0) {
      entreprise = user.employer.entreprises[0];
    }

    let sql = "SELECT pj.pk_user_pieces_justificatives, pj.nom_fichier, pj.date_mise_a_jour, d.file_folder " +
      "FROM user_pieces_justificatives pj " +
      "LEFT JOIN row_document d ON d.file_name = pj.nom_fichier " +
      "WHERE fk_user_account=" + user.id + " " +
      (entreprise ? "and pj.fk_user_entreprise=" + entreprise.id + " " : "") +
      "and pj.dirty='N' AND d.id_window = 2538"
    ;

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.data = [];
          if(data.data){
            for(let i = 0 ; i < data.data.length ; i++){
              //debugger;
              this.data.push({
                id : data.data[i].pk_user_pieces_justificatives,
                fileName : data.data[i].nom_fichier,
                uploadDate : this.parseDate(data.data[i].date_mise_a_jour),
                fileFolder: data.data[i].file_folder,
              });
            }
          }

          resolve(this.data);
        });
    });
  }

  removeLastFileVersion(user, fileName){
    let userId = user.id;

    let entreprise : any = null;
    if (user && Utils.isEmpty(user.employer.entreprises) === false && user.employer.entreprises.length > 0) {
      entreprise = user.employer.entreprises[0];
    }

    let sql = "update user_pieces_justificatives set dirty='Y' where " +
      "fk_user_account="+userId+" " +
      (entreprise ? "and fk_user_entreprise=" + entreprise.id + " " : "") +
      "and nom_fichier='"+fileName+"' ; "; // remove previous version
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          //debugger;
          resolve(data);
        });
    });
  }

  uploadFile(user, fileName, scanUri) {

    let userId = user.id;
    let d = new Date();
    this.removeLastFileVersion(user, fileName);

    let entreprise : any = null;
    if (user && Utils.isEmpty(user.employer.entreprises) === false && user.employer.entreprises.length > 0) {
      entreprise = user.employer.entreprises[0];
    }

    let sql = "insert into user_pieces_justificatives (" +
      "fk_user_account" +
      ", nom_fichier" +
      ", date_mise_a_jour" +
      (entreprise ? ",fk_user_entreprise" : "") +
      ") values (" +
      userId +
      ",'" + fileName +
      "','" + this.sqlfyDate(d) +
      (entreprise ? "','" + entreprise.id : "") +
      "') returning pk_user_pieces_justificatives";
    ////console.log(sql);
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          //debugger;
          this.attachement = null;
          if(data.data){
            this.attachement = {
              id : data.data[0].pk_user_pieces_justificatives,
              fileName : fileName,
              uploadDate : this.parseDate(this.sqlfyDate(d))
            };
            this.updateAttachements(userId, this.attachement.id, fileName, scanUri);
          }

          resolve(this.attachement);
        });
    });
  }

  uploadActualFile(id, fileName, scanUri) {
    let payload = {
      'class': 'fr.protogen.connector.model.StreamedFile',
      fileName : fileName,
      table : 'user_pieces_justificatives',
      identifiant : id,
      stream : scanUri,
      operation : 'PUT'
    };

    var stringData = JSON.stringify(payload);
    //////console.log(stringData);
    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.fssURL, stringData, {headers:headers})
        .subscribe(data => {
          //debugger;
          resolve(data);
        });
    });
  }

  updateAttachements(userId, idAttachment, fileName, scanUri){
    let today = this.sqlfyDate(new Date());
    let storageId = "{	\"class\":\"com.vitonjob.callouts.AttachementDownload\", \"idBean\" : <<DBID>>,	\"idAttachement\" : "+idAttachment+"}";
    let rowId = userId;
    let sql =  "insert into row_document " +
      "(" +
      "file_name, " +
      "file_extension, " +
      "date_creation, " +
      "file_version, " +
      "storage_identifier, " +
      "storage_callout_id, " +
      "id_row, " +
      "id_window, " +
      "id_type, " +
      "id_folder, " +
      "id_user," +
      "text_content" +
      ") values (" +
      "'"+fileName+"'," +
      "'jpg'," +
      "'"+today+"'," +
      "1," +
      "'"+storageId+"'," +
      "0,"+
      ""+rowId+"," +
      "2538," +
      "2," +
      "5," +
      "210," +
      "'"+scanUri+"');";
    sql = sql+"insert into row_document " +
      "(" +
      "file_name, " +
      "file_extension, " +
      "date_creation, " +
      "file_version, " +
      "storage_identifier, " +
      "storage_callout_id, " +
      "id_row, " +
      "id_window, " +
      "id_type, " +
      "id_folder, " +
      "id_user," +
      "text_content" +
      ") values (" +
      "'"+fileName+"'," +
      "'jpg'," +
      "'"+today+"'," +
      "1," +
      "'"+storageId+"'," +
      "0,"+
      ""+rowId+"," +
      "2606," +
      "2," +
      "5," +
      "210," +
      "'"+scanUri+"');";
    ////console.log(sql);

    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          //debugger;
          resolve(this.data);
        });
    });
  }

  deleteAttachement(attachement){
    let sql = "update user_pieces_justificatives set dirty='Y' where pk_user_pieces_justificatives="+attachement.id;

    return new Promise(resolve => {
      let headers = Configs.getHttpTextHeaders();
      this.http.post(Configs.sqlURL, sql, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {

          resolve(data);
        });
    });
  }

  downloadActualFile(id, fileName){
    let payload = {
      'class': 'fr.protogen.connector.model.StreamedFile',
      fileName : fileName,
      table : 'user_pieces_justificatives',
      identifiant : id,
      stream : '',
      operation : 'GET'
    };

    var stringData = JSON.stringify(payload);
    //console.log(stringData);
    return new Promise(resolve => {
      let headers = Configs.getHttpJsonHeaders();
      this.http.post(Configs.fssURL, stringData, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          //debugger;
          this.data = data;
          resolve(this.data);
        });
    });
  }

  private _recursiveGroupeByFolder(folder: Folder, deep: number, folderTree: string[], attachement: File): Folder {
    if (deep < folderTree.length && Utils.isEmpty(folderTree[deep]) == false) {
      console.log(folderTree[deep]);

      // Check if folder exists or create it
      let subFolders = folder.folders.filter((sf) => {
        return (sf.name == folderTree[deep]);
      });
      let subFolder : Folder = {name: folderTree[deep], folders: [], files: []};
      if (Utils.isEmpty(subFolders) == false) {
        subFolder = subFolders[0];
      }

      // {name: folderTree[deep], folders: [], files: []};
      subFolder = this._recursiveGroupeByFolder(
        subFolder,
        deep + 1,
        folderTree,
        attachement
      );

      if (Utils.isEmpty(subFolders) == true) {
        folder.folders.push(subFolder);
      }
    } else {
      folder.files.push(attachement);
    }
    return folder;
  }

  /**
   * Order attachments by folder
   * @param data
   * @returns Folder
   */
  groupByFolder(data: any): Folder {
    let root: Folder = {name: "Mes documents", folders: [], files: []};
    data.forEach((attachement: any) => {
      let folderTree : string [] = attachement.fileFolder.split('/');
      this._recursiveGroupeByFolder(root, 0, folderTree, attachement);
    });

    return root;
  }

  addFile(attachments, data) {
    debugger;
  }

  private _recursiveDeleteFile(folder: Folder, deep: number, folderTree: string[], attachement: File) {
    if (deep < folderTree.length) {

      // Check if folder exists or create it
      let subFolders = folder.folders.filter((sf) => {
        return (sf.name == folderTree[deep]);
      });
      if (Utils.isEmpty(subFolders) == false) {
        return this._recursiveDeleteFile(subFolders[0], deep + 1, folderTree, attachement);
      }
    } else {
      let i = folder.files.indexOf(attachement);
      folder.files.splice(i, 1);
      this.deleteAttachement(attachement);
      return true;
    }
    return false;
  }

  deleteFile(attachments, attachement: File) {
    let folderTree : string [] = attachement.fileFolder.split('/');
    return this._recursiveDeleteFile(attachments, 0, folderTree, attachement);
  }

  parseDate(strdate) {
    if (!strdate)
      return '';
    let d = strdate.split(' ')[0];
    let date = d.split('-')[2] + '/' + d.split('-')[1] + '/' + d.split('-')[0];
    return date;
  }

  getYear(strdate) {
    if (!strdate)
      return '';
    let d = strdate.split(' ')[0];
    let date = d.split('-')[0];
    return date;
  }

  getMonth(strdate) {
    if (!strdate)
      return '';
    let d = strdate.split(' ')[0];
    let date = d.split('-')[1];
    return date;
  }

  sqlfyDate(d) {
    let str = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + '+00';
    return str;
  }
}
