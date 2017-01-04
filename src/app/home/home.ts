import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {SearchService} from "../../providers/search-service";
import {SharedService} from "../../providers/shared.service";
import {HomeService} from "../../providers/home.service";
import {Configs} from "../../configurations/configs";
import {ModalWelcome} from "../modal-welcome/modal-welcome";
import {ModalProfile} from "../modal-profile/modal-profile";
import {ModalUpdatePassword} from "../modal-update-password/modal-update-password";
import {ModalNotificationContract} from "../modal-notification-contract/modal-notification-contract";
import {ModalGeneralCondition} from "../modal-general-condition/modal-general-condition";
import {RecruitButton} from "../components/recruit-button/recruit-button";
import {HomeList} from "../components/home-list-component/home-list-component";
import {Utils} from "../utils/utils";


declare var require: any;
declare var jQuery: any;
declare var Messenger: any;

@Component({
  selector: 'home',
  template: require('./home.html'),
  directives: [ROUTER_DIRECTIVES, AlertComponent, ModalWelcome, ModalProfile,
    ModalUpdatePassword, ModalNotificationContract, ModalGeneralCondition, RecruitButton, HomeList],
  providers: [SearchService, HomeService],
  styles: [require('./home.scss')],
  encapsulation: ViewEncapsulation.None
})

export class Home {

  currentUser: any;
  projectTarget: string;
  scQuery: string;
  alerts: Array<Object>;
  hideLoader: boolean = true;
  config: any;
  isTablet: boolean = false;

  obj: string;

  currentJobyer: any;

  constructor(private router: Router,
              private searchService: SearchService,
              private homeService: HomeService,
              private route: ActivatedRoute,
              private sharedService: SharedService) {
    if (this.router.url === '/jobyer') {
      this.sharedService.setProjectTarget('jobyer');
    } else if (this.router.url === '/employeur') {
      this.sharedService.setProjectTarget('employer');
    }
    this.currentUser = this.sharedService.getCurrentUser();
    this.scQuery = this.sharedService.getCurrentSearch();
  }

  ngOnInit(): void {

    let myContent = jQuery('.content');
    let myNavBar = jQuery('.navbar-dashboard');

    //get params
    this.route.params.forEach((params: Params) => {
      this.obj = params['obj'];
    });

    if (this.currentUser) {
      this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
      if (this.currentUser.mot_de_passe_reinitialise == "Oui") {
        jQuery('#modal-update-password').modal({
          keyboard: false,
          backdrop: 'static'
        });
        jQuery('#modal-update-password').modal('show');
      }

      if (this.isEmpty(this.currentUser.titre)) {
        jQuery('#modal-general-condition').modal({
          keyboard: false,
          backdrop: 'static'
        });
        jQuery('#modal-general-condition').modal('show');
      }
    } else {
      this.projectTarget = this.sharedService.getProjectTarget();
    }

    this.config = Configs.setConfigs(this.projectTarget);

    myContent.css({"padding": "0", "padding-right": "0"});
    if  (screen.width <= 768) {
      myContent.css({"background-size": "cover"});
      myNavBar.css({"background-color": "#14baa6", "border-color": "#14baa6"});
      this.isTablet = true;
    } else {
      myContent.css({"background-image": ""});
      myContent.css({"background-size": "cover"});
      myNavBar.css({"background-color": "#14baa6", "border-color": "#14baa6"});
    }

    this.sharedService.setCurrentOffer(null);

  }

  ngOnDestroy() {
    jQuery('.content').css({"padding": "92px 20px 42px 20px"});
  }

  doSemanticSearch() {
    /*if (!this.currentUser) {
     this.sharedService.setFromPage("home");
     this.router.navigate(['login']);
     return;
     }*/

    if (Utils.isEmpty(this.scQuery) || !this.scQuery.match(/[a-z]/i)) {
      this.addAlert("warning", "Veuillez saisir une requête avant de lancer la recherche");
      return;
    }

    this.hideLoader = false;
    this.searchService.semanticSearch(this.scQuery, 0, this.projectTarget).then((results: any) => {
      this.hideLoader = true;
      let data = [];
      if(this.projectTarget == 'jobyer')
        data = results.offerEnterprise;
      else
        data = results.offerJobyers;

      if (data.length == 0) {
        this.addAlert("warning", "Aucun résultat trouvé pour votre recherche.");
        return;
      }


      this.sharedService.setLastIndexation({resultsIndex : results.indexation});
      this.sharedService.setLastResult(data);

      // TODO Passer la condition accepteCandidature == 'true' côté callout
      // If jobyer research, count only offers that employer accept contact
      let count = 0;
      if (this.projectTarget == 'jobyer') {
        for (let i = 0; i < data.length; i++) {
          if (data[i].accepteCandidature == 'true') {
            count++;
          }
        }
      } else {
        count = data.length;
      }

      Messenger().post({
        message: 'La recherche pour "' + this.scQuery + '" a donné ' + (count == 1 ? 'un seul résultat' : (count + ' résultats')),
        type: 'success',
        showCloseButton: true
      });
      this.sharedService.setCurrentSearch(this.scQuery);
      this.router.navigate(['search/results',{searchType:'semantic'}]);
    });
  }

  checkForEnterKey(e) {
    if (e.code != "Enter")
      return;

    this.doSemanticSearch();
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }

  onGCRefused(gcRefused: boolean){
    var self = this;
    $('#modal-general-condition').on('hidden.bs.modal', function (e) {
      if(!gcRefused) {
        jQuery('#modal-welcome').modal({
          keyboard: false,
          backdrop: 'static'
        });
        jQuery('#modal-welcome').modal('show');
        $('#modal-welcome').on('hidden.bs.modal', function (e) {
          jQuery('#modal-profile').modal({
            keyboard: false,
            backdrop: 'static'
          });
          jQuery('#modal-profile').modal('show');
        });
      }else{
        self.sharedService.logOut();
        location.reload();
      }
    });
  }
}
