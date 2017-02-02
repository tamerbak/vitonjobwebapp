import {Component, ViewEncapsulation} from "@angular/core";
import {AdvertService} from "../../providers/advert.service";
import {SharedService} from "../../providers/shared.service";
import {Router, ROUTER_DIRECTIVES, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap";
import {Utils} from "../utils/utils";
import {OffersService} from "../../providers/offer.service";
import {Configs} from "../../configurations/configs";

declare let jQuery: any;
declare let Messenger: any;
declare let unescape;


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
  type: string = 'add';
  obj: string;
  offerId: number;
  thumbnailData: any;
  coverData: any;
  alerts: any = [];
  contractFormArray = [];
  descriptionPlaceholder: string;
  contractForm: any;

  selectedJob = [];
  jobs = [];

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
      link: '',
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
      contractForm: '',
      isPartialTime: false
    };

    this.contractForm = {
      isInterim: false, isFormation: false, isCDD: false, isCDI: false
    }
  }

  ngOnInit() {
    window['CKEDITOR']['replace']('content_cke');
    this.descriptionPlaceholder = "<p><span style='font-family:Trebuchet MS,Helvetica,sans-serif'><u><span style='font-size:22px'><strong>Description de l&#39;annonce</strong></span></u></span></p>" +
      "    <p><span style='font-size:36px'><strong>L</strong></span>orem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id ex luctus, feugiat nisi in, elementum orci. Pellentesque et porta odio. Sed magna arcu, ullamcorper vitae lacinia eu, fringilla sit amet arcu. Vivamus porta massa a elit feugiat vehicula. Aliquam erat volutpat. Praesent volutpat a dolor ac bibendum. Aenean ultrices bibendum nisl, at tristique neque ornare placerat. Donec convallis rhoncus mauris ut commodo. Fusce pulvinar sagittis turpis ut rhoncus.</p> " +
      "<p><em>Sed dapibus porta enim, vitae fringilla tellus imperdiet id. Ut placerat imperdiet ante et pharetra. Etiam dapibus, diam eu convallis scelerisque, arcu nisl efficitur urna, et faucibus lorem nisl non odio. Nulla congue urna at mi luctus, sit amet congue metus dictum. Quisque mollis aliquet tellus, non aliquet diam accumsan ac. Pellentesque ac suscipit nibh. Nulla facilisi. Integer hendrerit ac felis eget sollicitudin. Etiam cursus quis lectus mollis tempor. Nam sapien dolor, ultricies sit amet eleifend non, aliquet eu tortor.</em></p> " +
      "<p><strong>Etiam gravida sed risus id ultricies. Proin malesuada purus condimentum leo porta dapibus. Proin sollicitudin et tellus at lobortis. Mauris posuere malesuada sagittis. Suspendisse non lectus id diam viverra pellentesque sit amet semper lorem. Nullam a justo et libero placerat auctor sed eu justo. Proin eget erat id libero posuere condimentum. Sed facilisis gravida mauris, eget varius nibh suscipit in. Etiam vel quam eu tortor elementum commodo quis eget lectus. Pellentesque id pellentesque lacus, vitae pellentesque massa.</strong></p> " +
      "<p>&nbsp;</p>"

    //type = "add", "detail"
    this.route.params.forEach((params: Params) => {
      this.type = params['type'];
      this.obj = params['obj'];
    });

    let offer = this.sharedService.getCurrentOffer();
    if(!Utils.isEmpty(offer)){
      this.offerId = offer.idOffer;
    }else{
      this.offerId = 0;
    }

    if (this.type == "detail") {
      this.advert = this.sharedService.getCurrentAdv();
      this.advert.link = Utils.isEmpty(this.advert.link) ? "" : this.advert.link;

      this.idAdvert = this.advert.id;
      this.prepareDataForDisplaying(this.advert.attachement.fileContent);
      this.prepareImageForDisplaying(this.advert.thumbnail, 'thumbnail');
      this.prepareImageForDisplaying(this.advert.imgbg, 'cover');
    }

    this.prepareInputs();
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

      let titre = self.advert.titre;
      if (self.type == "detail") {
        let advertTitleObj = {
          id: "0",
          libelle: titre,
          idsector: "0"
        };
        jQuery(".job-select").select2('data', advertTitleObj);
      }
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

  /**
   * Prepare input such as select
   */
  prepareInputs() {
    var self = this;

    let job = jQuery('.job-select').select2({
      maximumSelectionLength: 1,
      tokenSeparators: [",", " "],
      createSearchChoice: function (term, data) {
        if (self.jobs.length == 0) {
          return {
            id: '0', libelle: term
          };
        }
      },
      ajax: {
        url: Configs.sqlURL,
        type: 'POST',
        dataType: 'json',
        quietMillis: 250,
        transport: function (params) {
          params.beforeSend = Configs.getSelect2TextHeaders();
          return jQuery.ajax(params);
        },
        data: function (term, page) {
          return self.offerService.selectJobs(term, 0);
        },
        results: function (data, page) {
          self.jobs = data.data;
          return {results: data.data};
        },
        cache: false,

      },

      formatResult: function (item) {
        let libelle = item.libelle;
        if (item.id == 0) {
          libelle = libelle + " (H/F)"
        } else {
          libelle = "Proposition : " + libelle
        }
        return libelle;
      },
      formatSelection: function (item) {
        let libelle = item.libelle;
        if (item.id == 0 && item.idsector != "0") {
          libelle = libelle + " (H/F)"
        }
        if(item.idsector != "0"){
          self.advert.titre = libelle;
        }
        return libelle;
      },
      dropdownCssClass: "bigdrop",
      escapeMarkup: function (markup) {
        return markup;
      },
      minimumInputLength: 1,
      initSelection: function(element, callback) {
      }
    });
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
      let contractForms = this.advert.contractForm.split(';');
      for(let i = 0; i < contractForms.length; i++){
        if(contractForms[i] == "Intérim"){
          this.contractForm.isInterim = true;
        }
        if(contractForms[i] == "Formation"){
          this.contractForm.isFormation = true;
        }
        if(contractForms[i] == "CDD"){
          this.contractForm.isCDD = true;
        }
        if(contractForms[i] == "CDI"){
          this.contractForm.isCDI = true;
        }
      }
    }
  }

  prepareDataForSaving(){
    this.advert.description = btoa(unescape(encodeURIComponent((this.ckExport()))));
    this.advert.contractForm = '';
    if (this.contractForm.isInterim) {
      this.advert.contractForm = this.advert.contractForm + ";Intérim";
    }
    if (this.contractForm.isFormation) {
      this.advert.contractForm = this.advert.contractForm + ";Formation";
    }
    if (this.contractForm.isCDD) {
      this.advert.contractForm = this.advert.contractForm + ";CDD";
    }
    if (this.contractForm.isCDI) {
      this.advert.contractForm = this.advert.contractForm + ";CDI";
    }
  }

  saveAdvert() {
    this.prepareDataForSaving();
    if(!this.isFormValid()){
      if(!Utils.isEmpty(this.advert.link) && !Utils.isValidUrl(this.advert.link)){
        this.alert("Le lien spécifié de l'annonce n'est pas valide", "warning");
        return;
      }
      this.alert("Veuillez renseigner le titre de l'annonce avant d'enregistrer", "warning");
      return;
    }

    this.alert("Prière de patienter, la sauvegarde peut prendre un moment à cause de la taille des fichiers", "info");

    //dans le cas d'une modification d'une annonce deja créée
    if (this.idAdvert) {
      this.advertService.saveAdvert(this.advert).then((result: any) => {
        if(result && result.status == 'success'){
          this.alert("L'annonce a été enregistré avec succès", "info");
          Messenger().post({
            message: "L'annonce " + "'" + this.advert.titre + "'" + " a été modifiée avec succès",
            type: 'success',
            showCloseButton: true
          });
          //this.router.navigate(['advert/list']);
          if (this.obj == "recruit") {
            this.router.navigate(['search/results', {obj: this.obj}]);
            return;
          }
          if (this.obj == "pendingContracts") {
            this.router.navigate(['pendingContracts', {obj: this.obj}]);
            return;
          }
          this.router.navigate(['offer/list']);
        }else{
          Messenger().post({
            message: "Une erreur est survenue lors de l'enregistrement de l'annonce.",
            type: 'error',
            showCloseButton: true
          });
          this.alerts = [];
        }
      });
    } else {
      // dans le cas d'une création d'une nouvelle annonce
      this.advertService.saveNewAdvert(this.advert, this.offerId).then((result: any) => {
        if(result.id != 0) {
          this.idAdvert = result.id;
          Messenger().post({
            message: "L'annonce " + "'" + this.advert.titre + "'" + " a été sauvegardée avec succès",
            type: 'success',
            showCloseButton: true
          });
          this.resetForm();
          if (this.obj == "recruit") {
            this.router.navigate(['search/results', {obj: this.obj}]);
            return;
          }
          if (this.obj == "pendingContracts") {
            this.router.navigate(['pendingContracts', {obj: this.obj}]);
            return;
          }
          this.router.navigate(['offer/list']);
          //this.router.navigate(['offer/list']);
        }else{
          Messenger().post({
            message: "Une erreur est survenue lors de l'enregistrement de l'annonce.",
            type: 'error',
            showCloseButton: true
          });
          this.alerts = [];
        }
      });
    }
  }

  /*saveAdvertWithOffer() {
   this.prepareDataForSaving();

   if(!this.isFormValid()){
   if(!Utils.isEmpty(this.advert.link) && !Utils.isValidUrl(this.advert.link)){
   this.alert("Le lien spécifié de l'annonce n'est pas valide", "warning");
   return;
   }
   this.alert("Veuillez renseigner le titre de l'annonce avant d'enregistrer", "warning");
   return;
   }



   this.alert("Prière de patienter, la sauvegarde peut prendre un moment à cause de la taille des fichiers", "info");

   if (this.idAdvert) {
   this.advertService.saveAdvert(this.advert).then((result: any) => {
   if(result && result.status == 'success') {
   this.alert("L'annonce a été enregistré avec succès", "info");
   let offer = this.offerService.getOfferByIdFromLocal(this.currentUser, this.advert.offerId);
   if (offer == null) {
   this.router.navigate(['offer/edit', {obj: 'add', adv: this.idAdvert}]);
   } else {
   this.sharedService.setCurrentOffer(offer);
   this.router.navigate(['offer/edit', {obj: 'detail', adv: this.idAdvert}]);
   }
   }else{
   Messenger().post({
   message: "Une erreur est survenue lors de l'enregistrement de l'annonce.",
   type: 'error',
   showCloseButton: true
   });
   this.alerts = [];
   }
   });
   } else {
   this.advertService.saveNewAdvert(this.advert).then((result: any) => {
   if(result.id != 0) {
   this.idAdvert = result.id;
   this.alert("L'annonce a été sauvegardée avec succès", "info");
   this.router.navigate(['offer/edit', {obj: 'add', adv: this.idAdvert}]);
   }else{
   Messenger().post({
   message: "Une erreur est survenue lors de l'enregistrement de l'annonce.",
   type: 'error',
   showCloseButton: true
   });
   this.alerts = [];
   }
   });
   }
   }*/

  resetForm(){
    this.alerts = [];
    this.advert = {
      'class': 'com.vitonjob.annonces.Annonce',
      idEntreprise: this.currentUser.employer.entreprises[0].id,
      titre: '',
      link:'',
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
      contractForm: '',
      isPartialTime: false
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

  watchTimeForm(e){
    this.advert.isPartialTime = (e.target.value == '0' ? true : false);
  }


  isFormValid(){
    if(this.advert && !this.isEmpty(this.advert.titre)){
      if(!Utils.isEmpty(this.advert.link) && !Utils.isValidUrl(this.advert.link)){
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  alert(msg, type) {
    this.alerts = [{type: type, msg: msg}];
  }

  isEmpty(str) {
    return Utils.isEmpty(str);
  }
}
