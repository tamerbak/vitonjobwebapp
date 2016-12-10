import {Component, ViewEncapsulation} from "@angular/core";
import {AdvertService} from "../../providers/advert.service";
import {SharedService} from "../../providers/shared.service";
import {Router, ROUTER_DIRECTIVES, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap";
import {Utils} from "../utils/utils";
import {OffersService} from "../../providers/offer.service";

declare var jQuery: any;
declare var Messenger: any;


@Component({
  selector: '[advert-edit]',
  template: require('./advert-edit.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./advert-edit.scss')],
  directives: [ROUTER_DIRECTIVES, AlertComponent],
  providers: [AdvertService, OffersService],
})

export class AdvertEdit{
  currentUser: any;
  advert: any;
  idAdvert: any;
  obj: string = 'add';
  thumbnailData: any;
  coverData: any;
  alerts: any = [];
  contractFormArray = [];

  constructor(private advertService: AdvertService,
              private router: Router,
              private route: ActivatedRoute,
              private sharedService: SharedService,
              private offerService: OffersService) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser || (!this.currentUser.estEmployeur && !this.currentUser.estRecruteur)) {
      this.router.navigate(['home']);
    }

    this.advert = {
      'class': 'com.vitonjob.annonces.Annonce',
      idEntreprise: this.currentUser.employer.entreprises[0].id,
      titre: '',
      description: '',
      attachement: {
        'class': 'com.vitonjob.annonces.Attachement',
        code: 0,
        status: '',
        fileContent: ''
      },
      thumbnail: {
        'class': 'com.vitonjob.annonces.Attachement',
        code: 0,
        status: '',
        fileContent: ''
      },
      imgbg: {
        'class': 'com.vitonjob.annonces.Attachement',
        code: 0,
        status: '',
        fileContent: ''
      },
      contractForm: ''
    };
  }

  ngOnInit() {
    window['CKEDITOR']['replace']('content_cke');

    //obj = "add", "detail"
    this.route.params.forEach((params: Params) => {
      this.obj = params['obj'];
    });

    if (this.obj == "detail") {
      this.advert = this.sharedService.getCurrentAdv();
      this.idAdvert = this.advert.id;
      this.prepareDataForDisplaying(this.advert.attachement.fileContent);
      this.prepareImageForDisplaying(this.advert.thumbnail, 'thumbnail');
      this.prepareImageForDisplaying(this.advert.imgbg, 'cover');
    }
  }

  ngAfterViewInit(): void {
    let self = this;
    jQuery(document).ready(function () {
      jQuery('.thumbnailinput').on('change.bs.fileinput', function (e, file) {
        self.thumbnailData = file.result;
        self.advert.thumbnail.fileContent = file.result;
        self.prepareImageForDisplaying(self.advert.thumbnail, 'thumbnail');
      });
      jQuery('.thumbnailinput').on('clear.bs.fileinput', function (e, file) {
        self.thumbnailData = null;
        self.deleteFile(self.advert.thumbnail);
      });

      jQuery('.cover').on('change.bs.fileinput', function (e, file) {
        self.coverData = file.result;
        self.advert.imgbg.fileContent = file.result;
        self.prepareImageForDisplaying(self.advert.imgbg, 'cover');
      });
      jQuery('.cover').on('clear.bs.fileinput', function (e, file) {
        self.coverData = null;
        self.deleteFile(self.advert.imgbg);
      });
    });
  }

  submitAttachement() {
    let fileField = jQuery('#attachement_field');
    if (fileField && fileField[0]) {
      let fs = fileField[0].files;
      if (fs && fs.length > 0) {
        let f: any = fs[0];
        let fr = new FileReader();
        fr.onload = (file: any) => {
          let fileContent = file.target.result;
          let content = fileContent.split(',')[1];
          let base64 = f.name + ";" + content;
          this.advert.attachement.fileContent = base64;
          this.advert.attachement.fileName = f.name;
        }
        fr.readAsDataURL(f);
      }
    }
  }

  ckExport() {
    let object = jQuery('#cke_content_cke').children().children().children();
    let ifr = object.contents().find("body");
    let html = ifr.html();
    return html;
  }

  prepareImageForDisplaying(obj, name) {
    let content = obj.fileContent;
    if (!this.isEmpty(content)) {
      let prefix = content.split(',')[0];
      prefix = prefix.split(';')[0];
      let ext = prefix.split('/')[1];
      let base64 = name + '.' + ext + ";" + content.split(',')[1];
      obj.fileContent = base64;
      obj.fileName = name + '.' + ext;
    }
  }

  prepareDataForDisplaying(content) {
    //attachement
    if (!this.isEmpty(content)) {
      let prefix = content.split(';')[0];
      this.advert.attachement.fileContent = content;
      this.advert.attachement.fileName = prefix;
    }
    //contract form
    if(!this.isEmpty(this.advert.contractForm)) {
      this.contractFormArray = this.advert.contractForm.split(";");
    }
  }

  saveAdvert() {
    this.advert.description = btoa(this.ckExport());

    if(!this.isFormValid()){
      this.alert("Veuillez renseigner le titre de l'annonce avant d'enregistrer", "warning");
      return;
    }

    this.alert("Prière de patienter, la sauvegarde peut prendre un moment à cause de la taille des fichiers", "info");

    if (this.idAdvert) {
      this.advertService.saveAdvert(this.advert).then((result: any) => {
        this.alert("L'annonce a été enregistré avec succès", "info");
        Messenger().post({
          message: "L'annonce " + "'" + this.advert.titre + "'" + " a été modifiée avec succès",
          type: 'success',
          showCloseButton: true
        });
        this.router.navigate(['advert/list']);
      });
    } else {
      this.advertService.saveNewAdvert(this.advert).then((result: any) => {
        this.idAdvert = result.id;
          Messenger().post({
            message: "L'annonce " + "'" + this.advert.titre + "'" + " a été sauvegardée avec succès",
            type: 'success',
            showCloseButton: true
          });
        this.resetForm();
      });
    }
  }

  saveAdvertWithOffer() {
    this.advert.description = btoa(this.ckExport());

    if(!this.isFormValid()){
      this.alert("Veuillez renseigner le titre de l'annonce avant d'enregistrer", "warning");
      return;
    }

    this.alert("Prière de patienter, la sauvegarde peut prendre un moment à cause de la taille des fichiers", "info");

    if (this.idAdvert) {
      this.advertService.saveAdvert(this.advert).then((result: any) => {
        this.alert("L'annonce a été enregistré avec succès", "info");
        let offer = this.offerService.getOfferByIdFromLocal(this.currentUser, this.advert.offerId);
        if(offer == null){
          this.router.navigate(['offer/edit', {obj: 'add', adv: this.idAdvert}]);
        }else{
          this.sharedService.setCurrentOffer(offer);
          this.router.navigate(['offer/edit', {obj: 'detail', adv: this.idAdvert}]);
        }
      });
    } else {
      this.advertService.saveNewAdvert(this.advert).then((result: any) => {
        this.idAdvert = result.id;
        this.alert("L'annonce a été sauvegardée avec succès", "info");
        this.router.navigate(['offer/edit', {obj: 'add', adv: this.idAdvert}]);
      });
    }
  }

  resetForm(){
    this.alerts = [];
    this.advert = {
      'class': 'com.vitonjob.annonces.Annonce',
      idEntreprise: this.currentUser.employer.entreprises[0].id,
      titre: '',
      description: '',
      attachement: {
        'class': 'com.vitonjob.annonces.Attachement',
        code: 0,
        status: '',
        fileContent: ''
      },
      thumbnail: {
        'class': 'com.vitonjob.annonces.Attachement',
        code: 0,
        status: '',
        fileContent: ''
      },
      imgbg: {
        'class': 'com.vitonjob.annonces.Attachement',
        code: 0,
        status: '',
        fileContent: ''
      },
      contractForm: ''
    };
    this.idAdvert = null;

    //clear contract form select
    this.contractFormArray = [];
    //empty ckeditor
    let object = jQuery('#cke_content_cke').children().children().children();
    let ifr = object.contents().find("body");
    ifr.empty();

    //clear thumbnail and cover input
    this.thumbnailData = null;
    this.coverData = null;
    jQuery('.thumbnailinput').fileinput('reset');
    jQuery('.cover').fileinput('reset');

    //clear attchement
    jQuery('#attachement_field').val('');
  }

  deleteFile(attach) {
    attach.fileName = "";
    attach.fileContent = "";
  }

  downloadFile(attach) {
    let content = attach.fileContent.split(';')[1];
    var url = "data:application/octet-stream;base64," + content;
    window.open(url);
  }

  isFormValid(){
    if(this.advert && !this.isEmpty(this.advert.titre)){
      return true;
    } else {
      return false;
    }
  }

  setContractFormSelected(selectElement) {
    this.advert.contractForm = '';
    for (let i = 0; i < selectElement.options.length; i++) {
      let optionElement = selectElement.options[i];
      if (optionElement.selected == true) {
        this.advert.contractForm = this.advert.contractForm + ";" + optionElement.text;
      }
    }
  }

  alert(msg, type) {
    this.alerts = [{type: type, msg: msg}];
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }
}