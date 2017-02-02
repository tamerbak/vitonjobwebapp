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
import {ModalSubscribe} from "../modal-subscribe/modal-subscribe";
import {CandidatureService} from "../../providers/candidature-service";
import {OffersService} from "../../providers/offer.service";

declare let jQuery: any;
declare let Messenger: any;

@Component({
  selector: '[search-results]',
  template: require('./search-results.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./search-results.scss')],
  directives: [ROUTER_DIRECTIVES, GOOGLE_MAPS_DIRECTIVES, RecruitButton, GroupedRecruitButton, ModalNotificationContract, ModalProfile, ModalSubscribe, AlertComponent],
  providers: [OffersService,SearchService, ProfileService, CandidatureService]
})
export class SearchResults{
  @ViewChildren('Map') map: any;

  /**
   * Search system
   */
  cityQuery: string;
  scQueryCrit: string;
  scQuery: string;
  currentQuery: string;
  lastScQuery: string;
  searchResults: any;
  hideResult: boolean =  false;
  hideLoader: boolean =  true;
  alerts: Array<Object>;

  currentUser: any;
  projectTarget: string;
  isRecruteur: boolean = false;

  lat: number=46.75984;
  lng: number=1.738281;
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
              private offersService: OffersService,
              private route: ActivatedRoute,
              private candidatureService: CandidatureService) {


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
    this.scQueryCrit = this.sharedService.getCurrentSearch();
    this.cityQuery = this.sharedService.getCurrentSearchCity();
    if (Utils.isEmpty(this.scQueryCrit) == false) {
      this.scQuery = this.scQueryCrit + "";
    } else if (Utils.isEmpty(this.cityQuery) == false) {
      this.scQuery = this.cityQuery + "";
    } else {
      this.scQuery = "";
    }
    this.lastScQuery = this.scQuery + "";
    this.currentQuery = this.scQuery + "";
    this.loadResult();
    //this.positionMap();
  }

  ngAfterViewInit() {
    let self = this;
    // Catch enter from search input to launch search
    jQuery('.search-input').keydown( function(e) {
      var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
      if(key == 13) {
        e.preventDefault();
        self.doSearch();
      }
    });
    }

  setCandidatureButtonLabel(item: any){
    if (!this.currentUser || !this.currentUser.jobyer) {
      item.jobyerInterested = false;
      return;
    }
    this.candidatureService.getCandidatureOffre(item.idOffre, this.currentUser.jobyer.id).then((data: any) => {
      if(data && data.data && data.data.length  == 1){
        item.jobyerInterested = true;
      }else{
        item.jobyerInterested = false;
      }
    });
  }



  toHourString(time: number) {
    let minutes = (time % 60) < 10 ? "0" + (time % 60).toString() : (time % 60).toString();
    let hours = Math.trunc(time / 60) < 10 ? "0" + Math.trunc(time / 60).toString() : Math.trunc(time / 60).toString();
    return hours + ":" + minutes;
  }

  toDateString(date: number) {
    var dateOptions = {
      weekday: "long", month: "long", year: "numeric",
      day: "numeric"//, hour: "2-digit", minute: "2-digit"
    };
    return new Date(date).toLocaleDateString('fr-FR', dateOptions);
  }

  loadResult() {

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
        r.slots =[];
        // get disponibilities for jobyer
        let offerProjectTarget = (this.projectTarget == 'employer' ? 'jobyer' : 'employer');
        this.offersService.getOfferCalendarDataById(r.idOffre, offerProjectTarget).then((data: any) => {
          r.dateSlots = [];
          if (data['calendarData'] && Utils.isEmpty(data['calendarData']) === false) {
            //order offer slots
            data['calendarData'].sort((a, b) => {
              return a.date - b.date
            });
            for (let i = 0; i < data['calendarData'].length; ++i) {
              //data['calendarData'][i].date = new Date(data['calendarData'][i].date);
              //data['calendarData'][i].dateEnd = new Date(data['calendarData'][i].dateEnd);
              let nb_days_diff = data.calendarData[i].dateEnd - data.calendarData[i].date;
              nb_days_diff = nb_days_diff / (60 * 60 * 24 * 1000);

              let slotTemp = {
                date: this.toDateString(data.calendarData[i].date),
                dateEnd: this.toDateString(data.calendarData[i].dateEnd),
                startHour: this.toHourString(data.calendarData[i].startHour),
                endHour: this.toHourString(data.calendarData[i].endHour),
                pause: data.calendarData[i].pause,
                nbDays: nb_days_diff
              };
              r.slots.push(slotTemp);
            }
          }
        });

        // Get if jobyer interested
        this.setCandidatureButtonLabel(r);

        let availability = this.getAvailabilityText(r.availability.text);
        r.availabilityText = availability == '' ? '' : ((this.projectTarget=="employer" ? "Ce jobyer se situe à ":"Vous êtes à " ) + availability + " du lieu de la mission");
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
      // if (this.searchResultPos.length >= 1) {
      //   this.lat = +this.searchResultPos[0].lat;
      //   this.lng = +this.searchResultPos[0].lng;
      // }

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

  positionMap() {
    this.searchService.getGeolocalisation(this.currentQuery).then((location: any) => {
      if (location) {
        this.lat = location.lat;
        this.lng = location.lng;
      } else {
        // Paris
        this.lat = 44.2831250;
        this.lng = 44.2831250;
      }
    });
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

  doSearch() {
    this.hideResult = true;
    this.hideLoader = false;
    this.currentQuery = this.scQuery + "";
    if (Utils.isEmpty(this.scQueryCrit) == false) {
      this.doSemanticSearch();
    } else {
      this.doOffersByCitySearch();
    }
  }

  doSemanticSearch() {
    if (Utils.isEmpty(this.currentQuery) || !this.currentQuery.match(/[a-z]/i)) {
      this.addAlert("warning", "Veuillez saisir une requête avant de lancer la recherche");
      return;
    }

    this.sharedService.setCurrentSearch(this.currentQuery);
    this.sharedService.setCurrentSearchCity(null);
    this.searchService.semanticSearch(this.currentQuery, 0, this.projectTarget).then((results: any) => {
      let data = (this.projectTarget == 'jobyer') ? results.offerEnterprise : results.offerJobyers;
      this.sharedService.setLastIndexation({resultsIndex : results.indexation});
      this.sharedService.setLastResult(data);
      this.loadResult();
      this.hideResult = false;
      this.indexationMode = true;
      this.hideLoader = true;
      this.lastScQuery = this.currentQuery = "";
    });
  }

  doOffersByCitySearch() {
    if (Utils.isEmpty(this.currentQuery) || !this.currentQuery.match(/[a-z]/i)) {
      this.addAlert("warning", "Veuillez saisir le nom d'une ville avant de lancer la recherche");
      return;
    }

    this.sharedService.setCurrentSearch(null);
    this.sharedService.setCurrentSearchCity(this.currentQuery);
    this.searchService.searchOffersByCity(this.currentQuery, this.projectTarget).then((data: any) => {
      this.sharedService.setLastResult(data);
      this.loadResult();
      //this.positionMap();
      this.hideResult = false;
      this.hideLoader = true;
      this.lastScQuery = this.currentQuery + "";
    });
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
    // if (this.searchResultPos.length >= 1) {
    //   this.lat = +this.searchResultPos[0].lat;
    //   this.lng = +this.searchResultPos[0].lng;
    // }
  }

  centerChange(event) {
    // if (this.searchResultPos.length >= 1) {
    //   this.lat = +this.searchResultPos[0].lat;
    //   this.lng = +this.searchResultPos[0].lng;
    // }
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

  jobyerInterest(item: any): void {
    item.isInterestBtnDisabled = true;
    if(item.jobyerInterested){
      this.candidatureService.deleteCandidatureOffre(item.idOffre, this.currentUser.jobyer.id).then((data: any) => {
        item.isInterestBtnDisabled = false;
        if(!data || data.status != 'success'){
          this.addAlert("danger", "Erreur lors de la sauvegarde des données.");
        }else{
          item.jobyerInterested = false;
        }
      });
    }else{
      this.candidatureService.setCandidatureOffre(item.idOffre, this.currentUser.jobyer.id).then((data: any) => {
        item.isInterestBtnDisabled = false;
        if(!data || data.status != 'success'){
          this.addAlert("danger", "Erreur lors de la sauvegarde des données.");
        }else{
          item.jobyerInterested = true;
        }
      });
    }
  }

  switchJobyerInterest(item: any): void {
    if (this.currentUser) {
      // Set interest
      this.jobyerInterest(item);
    } else {
      // Invite user to subscribe
      console.log('interest: invite subscribe');
      jQuery('#modal-subscribe').modal({
        keyboard: false,
        backdrop: 'static'
      });
      jQuery('#modal-subscribe').modal('show');
    }
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

  isEmpty(str){
    return Utils.isEmpty(str);
  }
}
