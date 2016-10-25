import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {InProgressPage} from "../in-progress/in-progress";
import {AttachementsService} from "../../providers/attachements.service";
declare var jQuery, require: any;

@Component({
  selector: '[attachements]',
  template: require('./attachements.html'),
  directives: [ROUTER_DIRECTIVES, InProgressPage],
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
        // debugger;
      })
    });
  }

  saveFile(){
    if(!this.scanData || this.scanData == null){
      return;
    }

    this.attachementSerice.uploadFile(this.currentUser, this.fileName, this.scanData).then(data =>{
      if(data){
        this.attachments.push(data);
        jQuery('.fileinput').fileinput('clear')
        this.fileName ='';
      }
    });
  }

  viewFile(a){
    this.fileContent = "";
    this.selFileName = a.fileName;
    this.attachementSerice.downloadActualFile(a.id, a.fileName).then(data => {
      if(data){
        // debugger;
        this.fileContent = data['stream'];
        this.viewMode=true;
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
}
