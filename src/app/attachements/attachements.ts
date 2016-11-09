import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {AttachementsService} from "../../providers/attachements.service";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {Utils} from "../utils/utils";
declare var jQuery, require: any;

@Component({
  selector: '[attachements]',
  template: require('./attachements.html'),
  directives: [ROUTER_DIRECTIVES, AlertComponent],
  providers: [AttachementsService],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./attachements.scss')]
})
export class Attachements {

  currentUser: any;
  attachments : any = [];
  isEmployer : boolean;
  emptySafe : boolean;
  scanData : string = "";
  fileName : string;
  viewMode :boolean;
  selFileName : string;
  fileContent:string;
  alerts: Array<Object>;
  isUploadInProgress: boolean = false;

  constructor(private sharedService: SharedService,
              private attachementSerice : AttachementsService,
              private router: Router) {
    this.emptySafe = false;
    this.currentUser = this.sharedService.getCurrentUser();
    this.viewMode = false;
    this.selFileName="";
    this.fileContent="";
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    } else {

      this.isEmployer = this.currentUser.estEmployeur;
      this.attachementSerice.loadAttachements(this.currentUser).then(data=>{
        this.attachments = data;
        if(!this.attachments || this.attachments.length == 0){
          this.emptySafe = true;
        }
      });
    }
  }
  ngAfterViewInit(): void {
    let self = this;
    jQuery(document).ready(function () {
      jQuery('.fileinput').on('change.bs.fileinput', function (e, file) {
        self.scanData = file.result;
      })
      jQuery('.fileinput').on('clear.bs.fileinput', function (e, file) {
        self.scanData = null;
      })
    });
  }

  saveFile(){
    if(!this.scanData || this.scanData == null){
      return;
    }

    this.isUploadInProgress = true;
    this.attachementSerice.uploadFile(this.currentUser.id, this.fileName, this.scanData).then((data :any) =>{
      jQuery('.fileinput').fileinput('clear')
      this.fileName ='';
      if(data && data.id != 0){
        this.addAlert("info", "Le fichier est en cours de transfert. Veuillez patienter ...");
        this.attachementSerice.uploadActualFile(data.id, data.fileName, this.scanData).then((res: any) => {
          if(res && res.status == "200"){
            this.addAlert("success", "Le fichier a été bien sauvegardé.");
            this.attachments.push(data);
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

  viewFile(a){
    this.fileContent = "";
    this.selFileName = a.fileName;
    this.addAlert("info", "Le téléchargement du fichier est en cours. Veuillez patienter ...");
    this.attachementSerice.downloadActualFile(a.id, a.fileName).then((data: any)=> {
      if(data){
        this.fileContent = data['stream'];
        this.viewMode=true;
        this.alerts.length = 0;
      }else{
        this.addAlert("danger", "Le téléchargement du fichier a échoué. Veuillez recommencer l'opération.");
      }
    });
  }

  closeModal(){
    this.fileContent = "";
    this.selFileName = "";
    this.viewMode=false;
  }

  deleteFile(a){
    this.attachementSerice.deleteAttachement(a);
    let i = this.attachments.indexOf(a);
    this.attachments.splice(i,1);
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
  isEmpty(str){
    return Utils.isEmpty(str);
  }
}
