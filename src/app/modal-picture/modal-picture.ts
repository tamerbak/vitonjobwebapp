import {Component, NgZone} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {ProfileService} from "../../providers/profile.service";


declare var jQuery, require, Messenger: any;

@Component({
  selector: '[modal-picture]',
  directives: [ROUTER_DIRECTIVES],
  providers: [ProfileService],
  template: require('./modal-picture.html'),
  styles: [require('./modal-picture.scss')]
})
export class ModalPicture {

  isPictureChanged: boolean = false;
  pictureUri: string;
  defaultImage: string;
  validationImage: boolean = false;
  currentUser: any;
  isEmployer: boolean;


  constructor(private sharedService: SharedService,
              private profileService: ProfileService,
              private zone: NgZone,
              private router: Router) {
    Messenger.options = {
      theme: 'air',
      extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right'
    }

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['app/home']);
    } else {
      this.isEmployer = this.currentUser.estEmployeur;
      this.pictureUri = ""
      this.validationImage = false;
    }
  }

  ngAfterViewInit(): void {
    var self = this;
    jQuery(document).ready(function () {
      jQuery('#upload').on('change', function () {
        self.readFile(this);
      });
      jQuery('.croppieDiv').croppie({
        viewport: {width: 100, height: 100, type: 'circle'},
        boundary: {width: 250, height: 250},
        showZoomer: false,
      });
    });
  }

  uploadProfilUri(result): void {
    this.pictureUri = result;
    this.validationImage = true;
    if (this.pictureUri && this.isPictureChanged) {
      this.profileService.uploadProfilePictureInServer(this.pictureUri, this.currentUser.id).then((data: any) => {
        if (!data || data.status == "failure") {
          Messenger().post({
            message: 'Serveur non disponible ou problème de connexion',
            type: 'error',
            showCloseButton: true
          });
          this.validationImage = false;
          return;
        } else {
          this.validationImage = false;
          this.sharedService.setProfilImageUrl(this.pictureUri);

          jQuery('#modal-picture').modal('hide');
        }
      })
        .catch((error: any) => {
          // console.log(error);
          this.validationImage = false;
        });
    }
  }

  updatePicture(): void {
    var self = this;
    jQuery('.croppieDiv').croppie('result', {
      type: 'canvas',
      size: 'viewport'
    }).then(function (result) {
      self.uploadProfilUri(result);
    });
  }

  readFile(input) {
    var self = this;
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        self.isPictureChanged = true
        jQuery('.croppieDiv').croppie('bind', {
          url: (e.target as any).result,
        }).then(function () {
          self.isPictureChanged = true;
        });

      }

      reader.readAsDataURL(input.files[0]);
    }
    else {
      Messenger().post({
        message: "une erreur est survenue lors du chargement de l'image",
        type: 'error',
        showCloseButton: true
      });
    }
  }

}
