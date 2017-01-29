import {Component, ViewEncapsulation, ViewChildren} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute, Params} from "@angular/router";
import {SearchService} from "../../providers/search-service";
import {ProfileService} from "../../providers/profile.service";
import {RecruitButton} from "../components/recruit-button/recruit-button";
import {GroupedRecruitButton} from "../components/grouped-recruit-button/grouped-recruit-button";
import {GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/core";
import {ModalNotificationContract} from "../modal-notification-contract/modal-notification-contract";
import {ModalProfile} from "../modal-profile/modal-profile";
import {Utils} from "../utils/utils";
import {AlertComponent} from "ng2-bootstrap";

declare var jQuery: any;
declare var Messenger: any;

@Component({
  selector: '[search-results]',
  template: require('./search-results.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./search-results.scss')],
  directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES, RecruitButton, GroupedRecruitButton, ModalNotificationContract, ModalProfile, AlertComponent],
  providers: [SearchService, ProfileService]
})
export class SearchResults{
  @ViewChildren('Map') map: any;

  /**
   * Search system
   */
  scQuery: string;
  lastScQuery: string;
  searchResults: any;
  hideResult: boolean =  false;
  alerts: Array<Object>;

  currentUser: any;
  projectTarget: string;
  isRecruteur: boolean = false;

  lat: number=48.856494;
  lng: number=2.345503;
  searchResultPos: {lat: number,lng: number,info: string}[] = [];
  selected = true;
  mapDisplay = 'block';

  currentJobyer: any;
  fromPage: string = "recruitment";
  obj: string;
  indexationMode : boolean;
  subject: string = "recruit";

  constructor(private sharedService: SharedService,
              private router: Router,
              private searchService: SearchService,
              private profileService: ProfileService,
              private route: ActivatedRoute) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.isRecruteur = this.currentUser.estRecruteur;
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));
    } else {
      this.projectTarget = this.sharedService.getProjectTarget();
      // this.router.navigate(['home']);
    }

    //get params
    this.route.params.forEach((params: Params) => {
      this.obj = params['obj'];
      this.indexationMode = (params['searchType'] && params['searchType']=='semantic');
    });
  }

  ngOnInit() {
    this.loadResult();
  }

  loadResult() {
    //  Retrieving last search
    this.scQuery = this.sharedService.getCurrentSearch();
    this.lastScQuery = this.scQuery;

    this.selected = this.sharedService.getMapView() !== false;
    if (this.selected) {
      this.mapDisplay = 'block';
    } else {
      this.mapDisplay = 'none';
    }
    this.searchResultPos = [];

    let jsonResults = this.sharedService.getLastResult();
    if (jsonResults) {
      this.searchResults = jsonResults;
      for (let i = 0; i < this.searchResults.length; i++) {
        let r = this.searchResults[i];

        // Security for removed account
        if (r.idJobyer == 0) {
          continue;
        }

        r.availabilityText = this.getAvailabilityText(r.availability.text);
        r.availabiltyMinutes = this.getAvailabilityMinutes(r.availability.text);
        r.matching = Number(r.matching).toFixed(2);
        r.index = i + 1;
        r.avatar = "../assets/images/avatar.png";

        if ((r.latitude !== '0' && r.longitude !== '0') &&
          !Utils.isEmpty(r.latitude) && !Utils.isEmpty(r.longitude)) {
          let info = "";
          let toffer = '';
          if(r.titreOffre && r.titreOffre.length>0)
            toffer = r.titreOffre;

          let matching: string = (r.matching.toString().indexOf('.') < 0) ? r.matching : r.matching.toString().split('.')[0];
          if (this.projectTarget == 'employer') {
            info = "<h4>" + r.prenom + ' ' + r.nom.substring(0, 1) + ".&nbsp&nbsp<span class='label label-pill label-success'>&nbsp" + matching + "%&nbsp</span></h4>" +
              "<p>" + toffer + "</p>" +
              "<p><span class='dispo'>&#9679;</span> &nbsp; Disponible</p>" ;

          } else {
            info = "<h4>" + r.entreprise + "&nbsp&nbsp<span class='label label-pill label-success'>&nbsp" + matching + "%&nbsp</span></h4>" +
              "<p>" + toffer + "</p>" +
              "<p><span class='dispo''>&#9679;</span> &nbsp; Disponible</p>";
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
          if (data && data.data && data.data[0] && !Utils.isEmpty(data.data[0].encode) && data.data[0].encode.startsWith("data:image/")) {
            this.searchResults[i].avatar = data.data[0].encode;
          }
        });
      }
    }

    this.showAppropriateModal(this.obj);
  }

  getAvailabilityText(text) {
    let parts: string[] = text.split("et ");

    let hours: number = 0;
    if (parts.length >= 1) {
      hours = parseInt(parts[0]);
    }
    let minutes: number = 0;
    if (parts.length >= 2) {
      minutes = parseInt(parts[1]);
    }

    let hoursText = hours == 0 ? '' : (hours + (hours == 1 ? " heure" : " heures"));
    let minutesText = minutes == 0 ? '' : (minutes + (minutes == 1 ? " minute" : " minutes"));
    let fullText = (hoursText == '' ? '' : hoursText) + (minutesText == '' ? '' : (hoursText == '' ? minutesText : (" et " + minutesText)));
    return fullText;
  }

  getAvailabilityMinutes(text) {
    let parts = text.split("et ");
    let hours: number = 0;
    if (parts.length >= 1) {
      hours = parseInt(parts[0]);
    }
    let minutes: number = 0;
    if (parts.length >= 2) {
      minutes = parseInt(parts[1]);
    }
    return hours * 60 + minutes;
  }

  sortResults() {
    this.searchResults.sort((a, b) => {
      return a.availabiltyMinutes - b.availabiltyMinutes;
    })
  }

  doSemanticSearch() {

    if (Utils.isEmpty(this.scQuery) || !this.scQuery.match(/[a-z]/i)) {
      this.addAlert("warning", "Veuillez saisir une requête avant de lancer la recherche");
      return;
    }

    this.hideResult = true;
    this.searchService.semanticSearch(this.scQuery, 0, this.projectTarget).then((results: any) => {

      let data = [];
      if(this.projectTarget == 'jobyer')
        data = results.offerEnterprise;
      else
        data = results.offerJobyers;

      this.indexationMode = true;

      // TODO Passer la condition accepteCandidature == 'true' côté callout
      // If jobyer research, count only offers that employer accept contact
      let lastResult = [];
      if (this.projectTarget == 'jobyer') {
        for (let i = 0; i < data.length; i++) {
          if (data[i].accepteCandidature == 'true') {
            lastResult.push(data[i]);
          }
        }
      } else {
        lastResult = data;
      }

      this.sharedService.setLastIndexation({resultsIndex : results.indexation});
      this.sharedService.setLastResult(lastResult);
      this.sharedService.setCurrentSearch(this.scQuery);
      this.hideResult = false;
      this.loadResult();
    });
  }

  checkForEnterKey(e) {
    if (e.code != "Enter")
      return;

    this.doSemanticSearch();
  }

  onChange(value) {
    this.selected = value;
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
      this.router.navigate(['contract/recruitment-form']);
    }
  }

  /**
   * @description Selecting an item allows to call an action sheet for communications and contract
   * @param item the selected Employer/Jobyer
   */
  itemSelected(item) {
    let o = this.sharedService.getCurrentOffer();
    this.sharedService.setSearchResult(item);
    this.router.navigate(['search/details']);
    if(this.indexationMode){
      let data = this.sharedService.getLastIndexation();
      let index = null;
      if(data){
        index = data;
        if(index.resultsIndex && index.resultsIndex>0)
          this.searchService.correctIndexation(index.resultsIndex, item.idJob).then(data=>{
            index.resultsIndex = 0;
            this.sharedService.setLastIndexation(index);
          });
      }

    }
    //this.router.navigate(['search/details', {item, o}]);
  }

  onRecruite(params) {
    this.currentJobyer = params.jobyer;
    this.sharedService.setCurrentJobyer(this.currentJobyer);
    if (params.obj == "profile") {
      jQuery('#modal-profile').modal('show');
    } else {
      jQuery('#modal-notification-contract').modal({
        keyboard: false,
        backdrop: 'static'
      });
      jQuery('#modal-notification-contract').modal('show');
    }
  }

  onGroupedRecruite(params) {
    this.currentJobyer = params.jobyer;
    this.sharedService.setCurrentJobyer(this.currentJobyer);
  }

  onProfileUpdated(params) {
    this.currentJobyer = params.jobyer;
    if (params.obj == "contract") {
      jQuery('#modal-profile').on('hidden.bs.modal', function (e) {
        jQuery('#modal-notification-contract').modal('show');
      })
    }
  }

  showAppropriateModal(obj) {
    if (obj == "recruit") {
      //verify if employer profile is filled
      let userData = this.currentUser;
      let currentEmployer = this.currentUser.employer;
      //verification of employer informations
      let redirectToCivility = (currentEmployer && currentEmployer.entreprises[0]) ?
      (Utils.isEmpty(userData.titre)) ||
      (Utils.isEmpty(userData.prenom)) ||
      (Utils.isEmpty(userData.nom)) ||
      (Utils.isEmpty(currentEmployer.entreprises[0].nom)) ||
      (Utils.isEmpty(currentEmployer.entreprises[0].siret)) ||
      (Utils.isEmpty(currentEmployer.entreprises[0].naf)) ||
      (currentEmployer.entreprises[0].conventionCollective.id == 0) ||
      (currentEmployer.entreprises[0].siegeAdress.id == 0) ||
      (currentEmployer.entreprises[0].workAdress.id == 0) : true;
      let isDataValid = !redirectToCivility;
      if (!isDataValid) {
        jQuery('#modal-profile').modal({
          keyboard: false,
          backdrop: 'static'
        });
        jQuery('#modal-profile').modal('show');
      } else {
        //TODO: ajouter le cas ou le profil n'est pas complet
        let o = this.sharedService.getCurrentOffer()
        this.currentJobyer = this.sharedService.getCurrentJobyer();
        jQuery('#modal-notification-contract').modal({
          keyboard: false,
          backdrop: 'static'
        });
        jQuery('#modal-notification-contract').modal('show');
      }
    }
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}
