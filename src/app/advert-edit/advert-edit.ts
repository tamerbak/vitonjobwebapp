import {Component, ViewEncapsulation} from "@angular/core";
import {AdvertService} from "../../providers/advert.service";
import {SharedService} from "../../providers/shared.service";
import {Router, ROUTER_DIRECTIVES, ActivatedRoute, Params} from "@angular/router";
import {ACCORDION_DIRECTIVES, AlertComponent} from "ng2-bootstrap";
import {Utils} from "../utils/utils";

declare var jQuery : any;

@Component({
  selector: '[advert-edit]',
  template: require('./advert-edit.html'),
  encapsulation: ViewEncapsulation.None,
  styles:[require('./advert-edit.scss')],
  directives: [ACCORDION_DIRECTIVES, ROUTER_DIRECTIVES, AlertComponent],
  providers:[AdvertService, SharedService],
})

export class AdvertEdit {
  currentUser: any;
  advert: any;
  idAdvert : any;
  obj: string = 'add';
  thumbnailData : any;
  attachementData : any;
  coverData : any;
  alerts : any = [];

  constructor(private advertService: AdvertService,
              private router: Router,
              private route: ActivatedRoute,
              private sharedService: SharedService) {
    this.currentUser = this.sharedService.getCurrentUser();

    if (!this.currentUser || (!this.currentUser.estEmployeur && !this.currentUser.estRecruteur)) {
      this.router.navigate(['home']);
    }
    this.advert = {
      'class' : 'com.vitonjob.annonces.Annonce',
      idEntreprise : this.currentUser.employer.entreprises[0].id,
      titre : '',
      description : '',
      attachement : {
        'class':'com.vitonjob.annonces.Attachement',
        code : 0,
        status : '',
        fileContent : ''
      },
      thumbnail : {
        'class':'com.vitonjob.annonces.Attachement',
        code : 0,
        status : '',
        fileContent : ''
      },
      imgbg : {
        'class':'com.vitonjob.annonces.Attachement',
        code : 0,
        status : '',
        fileContent : ''
      },
      rubriques : []
    };
  }

  ngOnInit() {
    window['CKEDITOR']['replace']( 'content_cke' );

    //obj = "add", "detail"
    this.route.params.forEach((params: Params) => {
      this.obj = params['obj'];
    });

    if (this.obj == "detail") {
      this.advert = this.sharedService.getCurrentAdv();

      jQuery('.fileinput-thumbnail').append(
        jQuery('<img>').attr('src', this.advert.thumbnail.fileContent)
      );
      jQuery('.fileinput-imgbg').append(
        jQuery('<img>').attr('src', this.advert.imgbg.fileContent)
      );
    }

  }

  ngAfterViewInit(): void {
    let self = this;
    jQuery(document).ready(function () {
      jQuery('.thumbnailinput').on('change.bs.fileinput', function (e, file) {
        self.thumbnailData = file.result;
      });
      jQuery('.thumbnailinput').on('clear.bs.fileinput', function (e, file) {
        self.thumbnailData = null;
      });

      jQuery('.cover').on('change.bs.fileinput', function (e, file) {
        self.coverData = file.result;
      });
      jQuery('.cover').on('clear.bs.fileinput', function (e, file) {
        self.coverData = null;
      });

    });

  }


  submitAttachement(){
    let fileField = jQuery('#attachement_field');
    if(fileField && fileField[0]){
      let fs = fileField[0].files;
      if(fs && fs.length>0){
        let f : any = fs[0];
        let fr = new FileReader();
        fr.onload = (file:any) =>{
          this.attachementData = file.target.result;
        }

        fr.readAsDataURL(f);

      }
    }

  }


  ckExport(){
    let object = jQuery('#cke_1_contents').children();
    let ifr = object.contents().find("body");
    let html = ifr.html();
    return html;
  }

  isEmpty(str){
    return Utils.isEmpty(str);
  }

  saveAdvert(){
    this.advert.description = btoa(this.ckExport());
    if(this.attachementData && this.attachementData.length>0){
      let prefix = this.attachementData.split(',')[0];
      prefix = prefix.split(';')[0];
      let ext = prefix.split('/')[1];
      let base64 = 'attachment.'+ext+";"+this.attachementData.split(',')[1];
      this.advert.attachement.fileContent = base64;
    }

    if(this.thumbnailData && this.thumbnailData.length>0){
      let prefix = this.thumbnailData.split(',')[0];
      prefix = prefix.split(';')[0];
      let ext = prefix.split('/')[1];
      let base64 = 'thumbnail.'+ext+";"+this.thumbnailData.split(',')[1];
      this.advert.thumbnail.fileContent = base64;
    }

    if(this.coverData && this.coverData.length>0){
      let prefix = this.coverData.split(',')[0];
      prefix = prefix.split(';')[0];
      let ext = prefix.split('/')[1];
      let base64 = 'imgbg.'+ext+";"+this.coverData.split(',')[1];
      this.advert.imgbg.fileContent = base64;
    }

    this.alert("Prière de patienter, la sauvegarde peut prendre un moment à cause de la taille des fichiers","info");
    this.advertService.saveNewAdvert(this.advert).then((result : any)=>{
      this.idAdvert = result.id;
      this.alert("L'annonce a été sauvegardée avec succès","info");
      this.thumbnailData = '';
      this.attachementData = '';
      this.coverData = '';
    });
  }

  saveAdvertWithOffer(){
    this.advert.description = btoa(this.ckExport());
    if(this.attachementData && this.attachementData.length>0){
      let prefix = this.attachementData.split(',')[0];
      prefix = prefix.split(';')[0];
      let ext = prefix.split('/')[1];
      let base64 = 'attachment.'+ext+";"+this.attachementData.split(',')[1];
      this.advert.attachement.fileContent = base64;
    }

    if(this.thumbnailData && this.thumbnailData.length>0){
      let prefix = this.thumbnailData.split(',')[0];
      prefix = prefix.split(';')[0];
      let ext = prefix.split('/')[1];
      let base64 = 'thumbnail.'+ext+";"+this.thumbnailData.split(',')[1];
      this.advert.thumbnail.fileContent = base64;
    }

    if(this.coverData && this.coverData.length>0){
      let prefix = this.coverData.split(',')[0];
      prefix = prefix.split(';')[0];
      let ext = prefix.split('/')[1];
      let base64 = 'imgbg.'+ext+";"+this.coverData.split(',')[1];
      this.advert.imgbg.fileContent = base64;
    }
    this.alert("Prière de patienter, la sauvegarde peut prendre un moment à cause de la taille des fichiers","info");
    this.advertService.saveNewAdvert(this.advert).then((result : any)=>{
      this.idAdvert = result.id;
      this.sharedService.setAdvertMode({advMode : true, id : this.idAdvert});
      this.router.navigate(['offer/edit', {obj:'add'}]);
    });
  }

  alert(msg, type){
    this.alerts = [{type: type, msg: msg}];
  }
}
