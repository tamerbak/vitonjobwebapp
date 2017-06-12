import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {AttachementsService} from "../../providers/attachements.service";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {Utils} from "../utils/utils";
import {DomSanitizationService} from '@angular/platform-browser';
import {AttachementsDirectory} from "./attachements-directory/attachements-directory";

declare let jQuery: any;
declare let Messenger: any;
//
type Folder = {name: string, folders: Folder[], files: any[]};

@Component({
  selector: '[attachements]',
  template: require('./attachements.html'),
  directives: [ROUTER_DIRECTIVES, AlertComponent, AttachementsDirectory],
  providers: [AttachementsService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./attachements.scss')]
})
export class Attachements {

  currentUser: any;
  attachments: Folder;
  isEmployer : boolean;
  emptySafe : boolean;
  scanData : string = "";
  fileName : string;
  fileNameNotDefault: string;
  viewMode :boolean;
  selFileName : string;
  fileContent : string;
  alerts: Array<Object>;
  isUploadInProgress: boolean = false;

  constructor(private sharedService: SharedService,
              private attachementSerice : AttachementsService,
              private sanitizer: DomSanitizationService,
              private router: Router) {
    this.emptySafe = false;
    this.currentUser = this.sharedService.getCurrentUser();
    this.viewMode = false;
    this.selFileName="";
    this.fileName = "Badge aéroportuaire";
    this.fileContent="";
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    } else {

      this.isEmployer = this.currentUser.estEmployeur;
      this.attachementSerice.loadAttachements(this.currentUser, '*').then(data=>{
        // this.attachments = data;
        this.attachments = this.attachementSerice.groupByFolder(data);
        // if(!this.attachments || this.attachments.length == 0){
        //   this.emptySafe = true;
        // }
      });
    }
  }

  ngAfterViewInit(): void {
    let self = this;
    jQuery('.input-file').each(function() {
      var $input = jQuery(this),
        $label = $input.next('.js-labelFile'),
        labelVal = $label.html();
      $input.on('change', function() {
        var element = (<HTMLInputElement>document.getElementById('file'));
        var fileName = '';
        if (element.value) fileName = element.value.split('\\').pop();
        fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
      });
    });
    jQuery(document).ready(function () {

      jQuery('.fileinput').on('change.bs.fileinput', function (e, file) {
        self.scanData = file.result;
      })
      jQuery('.fileinput').on('clear.bs.fileinput', function (e, file) {
        self.scanData = null;
      })
    });
  }

  submitFile() {
    this.alerts = [];
    let fileField = jQuery('#file');
    if (fileField && fileField[0]) {
      let fs = fileField[0].files;
      if (fs && fs.length > 0) {
        let f: any = fs[0];
        if(f.type == "application/pdf" || f.type == "image/png" || f.type == "image/jpeg") {
          let fr = new FileReader();
          fr.onload = (file: any) => {
            this.scanData = file.target.result;
          };
          fr.readAsDataURL(f);
        }else{
          this.addAlert("warning", "Veuillez choisir une image ou un fichier PDF. Les autres types de fichiers ne sont pas permis.");
          jQuery('#file').val('');
        }
      }
    }
  }

  saveFile(){
    if (!this.fileNameNotDefault)
      this.fileNameNotDefault = '';
    let filename = this.fileName + this.fileNameNotDefault;
    if(!this.scanData || this.scanData == null || Utils.isEmpty(filename)){
      this.addAlert("warning", "Veuillez renseigner le nom du fichier et le charger avant de l'ajouter");
      return;
    }

    this.isUploadInProgress = true;
    this.attachementSerice.uploadFile(this.currentUser, filename, this.scanData, 'Autres').then((data: any) => {
      //jQuery('.fileinput').fileinput('clear')
      //clear attchement
      jQuery('#file').val('');
      this.fileName ='';
      this.fileNameNotDefault ='';
      if(data && data.id != 0){
        this.addAlert("info", "Le fichier est en cours de transfert. Veuillez patienter ...");
        this.attachementSerice.uploadActualFile(data.id, data.fileName, this.scanData).then((res: any) => {
          if(res && res.status == "200"){
            this.addAlert("success", "Le fichier a été bien sauvegardé.");
            this.attachementSerice.addFile(this.attachments, data);
            this.isUploadInProgress = false;
            this.emptySafe = false;
          }else{
            this.addAlert("danger", "Le transfert du fichier a échoué. Veuillez recommencer l'opération.");
            this.isUploadInProgress = false;
          }
        })
      }else{
        this.addAlert("danger", "Le transfert du fichier a échoué. Veuillez recommencer l'opération.");
        this.isUploadInProgress = false;
      }
    });
  }

  onViewFile(a){
    this.fileContent = "";
    this.selFileName = a.fileName;
    this.addAlert("info", "Le téléchargement du fichier est en cours. Veuillez patienter ...");
    this.attachementSerice.downloadActualFile(a.id, a.fileName).then((data: any)=> {
      if(data){
        this.fileContent = data.stream;
        //this.fileContent = "data:image/png;base64,iVBORw..."
        let extension = this.fileContent.split('/')[1].split(';')[0];
        if(extension == 'pdf'){
          window.open(this.fileContent);
        }else{
          this.viewMode=true;
        }
        this.alerts.length = 0;
      }else{
        this.addAlert("danger", "Le téléchargement du fichier a échoué. Veuillez recommencer l'opération.");
      }
    });
  }

  photoURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.fileContent);
  }

  closeModal(){
    this.fileContent = "";
    this.selFileName = "";
    this.viewMode=false;
  }

  onDeleteFile(a) {
    let result = this.attachementSerice.deleteFile(this.attachments, a);
    if (result) {
      Messenger().post({
        message: 'La fichier ' + a.fileName + ' a bien été supprimé',
        type: 'success',
        showCloseButton: true
      });
    } else {
      Messenger().post({
        message: 'Une erreur est survenur lors de la suppression du fichier ' + a.fileName,
        type: 'error',
        showCloseButton: true
      });
    }
  }

  onDownloadFile(a){
    this.addAlert("info", "Le téléchargement du fichier est en cours. Veuillez patienter ...");
    this.fileContent = "";
    this.attachementSerice.downloadActualFile(a.id, a.fileName).then((data: any)=> {
      if(data){
        //data = data:image/png;base64,xxxx
        let url = data.stream;
        let downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.setAttribute("download", data.fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        this.alerts.length = 0;
      }else{
        this.addAlert("danger", "Le téléchargement du fichier a échoué. Veuillez recommencer l'opération.");
      }
    });
  }

  watchFiletype(e){
    this.fileNameNotDefault = "";
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
  isEmpty(str){
    return Utils.isEmpty(str);
  }
}
