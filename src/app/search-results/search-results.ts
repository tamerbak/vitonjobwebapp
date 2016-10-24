import {Component, ViewEncapsulation, ViewChildren} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {SearchService} from "../../providers/search-service";
import {ProfileService} from "../../providers/profile.service";
import {RecruitButton} from "../components/recruit-button/recruit-button";
import {GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/core";
import {ModalNotificationContract} from "../modal-notification-contract/modal-notification-contract";
import {ModalProfile} from "../modal-profile/modal-profile";


declare var jQuery: any;

@Component({
  selector: '[search-results]',
  template: require('./search-results.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./search-results.scss')],
  directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES, RecruitButton, ModalNotificationContract, ModalProfile],
  providers: [SearchService, ProfileService]
})
export class SearchResults{
  @ViewChildren('Map') map: any;

  searchResults: any;
  currentUser: any;
  projectTarget: string;
  isRecruteur: boolean = false;

  lat: number;
  lng: number;
  searchResultPos: {lat: number,lng: number,info: string}[] = []
  selected = true;
  mapDisplay = 'block';

  currentJobyer: any;
  fromPage: string = "recruitment";

  constructor(private sharedService: SharedService,
              private router: Router,
              private profileService: ProfileService) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    } else {
      this.projectTarget = this.sharedService.getProjectTarget();
      // this.router.navigate(['app/home']);
    }
  }
  ngOnInit() {
    //  Retrieving last search
    this.selected = this.sharedService.getMapView();
    if (this.selected) {
      this.mapDisplay = 'block';
    } else {
      this.mapDisplay = 'none';
    }
    let jsonResults = this.sharedService.getLastResult();
    if (jsonResults) {
      this.searchResults = jsonResults;
      for (let i = 0; i < this.searchResults.length; i++) {
        let r = this.searchResults[i];
        r.matching = Number(r.matching).toFixed(2);
        r.index = i + 1;
        r.avatar = "../assets/images/avatar.png";
        if (r.latitude !== '0' && r.longitude !== '0') {
          var info = "";
          let matching: string = (r.matching.toString().indexOf('.') < 0) ? r.matching : r.matching.toString().split('.')[0];
          if (this.projectTarget == 'employer') {
            info = "<h4>" + r.prenom + ' ' + r.nom.substring(0, 1) + ". <span style='background-color: #14baa6; color: white; font-size: small;border-radius: 25px;'>&nbsp;" + matching + "%&nbsp;</span></h4>" +
              "<p>" + r.titreOffre + "</p>" +
              "<p><span style='color: #29bb00; font-size: large;'>&#9679;</span> &nbsp; Disponible</p>" +
              "<p style='text-decoration: underline;'>D�tails</p> ";

          } else {
            info = "<h4>" + r.entreprise + " <span style='background-color: #14baa6; color: white; font-size: small;border-radius: 25px;'>&nbsp;" + matching + "%&nbsp;</span></h4>" +
              "<p>" + r.titreOffre + "</p>" +
              "<p><span style='color: #29bb00; font-size: large;'>&#9679;</span> &nbsp; Disponible</p>" +
              "<p style='text-decoration: underline;'>D�tails</p> ";
          }
          this.searchResultPos.push({lat: Number(r.latitude), lng: Number(r.longitude), info: info})
        }
      }
      if (this.searchResultPos.length >= 1) {
        this.lat = +this.searchResultPos[0].lat;
        this.lng = +this.searchResultPos[0].lng;
      }

      //load profile pictures
      for (let i = 0; i < this.searchResults.length; i++) {
        var role = this.projectTarget == 'employer' ? "jobyer" : "employeur";
        this.profileService.loadProfilePicture(null, this.searchResults[i].tel, role).then((data: any) => {
          //regex to test if the returned data is base64
          if (data && data.data && data.data[0] && !this.isEmpty(data.data[0].encode) && data.data[0].encode.startsWith("data:image/")) {
            this.searchResults[i].avatar = data.data[0].encode;
          }
        });
      }
    }
  }

  onChange(value) {
    this.sharedService.setMapView(value)
    if (value) {
      this.mapDisplay = 'block';
    } else {
      this.mapDisplay = 'none';
    }
    setTimeout(function () {
      window.dispatchEvent(new Event("resize"));
    }, 1);
    if (this.searchResultPos.length >= 1) {
      this.lat = +this.searchResultPos[0].lat;
      this.lng = +this.searchResultPos[0].lng;
    }
  }

  centerChange(event) {
    if (this.searchResultPos.length >= 1) {
      this.lat = +this.searchResultPos[0].lat;
      this.lng = +this.searchResultPos[0].lng;
    }
  }

  contract(index) {
    let currentEmployer = this.sharedService.getCurrentUser();
    let o = this.sharedService.getCurrentOffer();
    //navigate to contract page
    if (o != null) {
      this.sharedService.setCurrentJobyer(this.searchResults[index]);
      this.router.navigate(['app/contract/recruitment-form']);
    }
  }

  /**
   * @description Selecting an item allows to call an action sheet for communications and contract
   * @param item the selected Employer/Jobyer
   */
  itemSelected(item) {
    let o = this.sharedService.getCurrentOffer();
    this.sharedService.setSearchResult(item);
    this.router.navigate(['app/search/details']);
    //this.router.navigate(['app/search/details', {item, o}]);
  }

  onRecruite(params) {
    this.currentJobyer = params.jobyer;
    if (params.obj == "profile") {
      jQuery('#modal-profile').modal('show');
    }else{
      jQuery('#modal-notification-contract').modal({
        keyboard: false,
        backdrop: 'static'
      });
      jQuery('#modal-notification-contract').modal('show');
    }
  }

  onProfileUpdated(params) {
    this.currentJobyer = params.jobyer;
    if (params.obj == "contract") {
      jQuery('#modal-profile').on('hidden.bs.modal', function (e) {
        jQuery('#modal-notification-contract').modal('show');
      })
    }
  }


  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }
}
