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

export class Home{
  currentUser: any;
  projectTarget: string;
  scQuery: string;
  alerts: Array<Object>;
  hideLoader: boolean = true;
  config: any;
  isTablet: boolean = false;
  /*
   *  HOME SCREEN LISTS
   */
  recentOffers: any = [];
  upcomingOffers: any = [];
  recentUsers: any = [];
  previousRecentOffers: any = [];
  previousUpcomingOffers: any = [];
  previousRecentUsers: any = [];
  nextRecentOffers: any = [];
  nextUpcomingOffers: any = [];
  nextRecentUsers: any = [];
  homeServiceData: any = [];
  maxLines: number = 8;
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

    this.homeService.loadHomeData((this.projectTarget)).then(data => {
      this.homeServiceData = data;
      this.initHomeList();
    });

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

  initHomeList() {
    if (!this.homeServiceData || this.homeServiceData.length == 0)
      return;

    //  Let us start with recent offers

    let data = this.homeServiceData.recentOffers;
    let max = data.length > this.maxLines ? this.maxLines : data.length;
    for (let i = 0; i < max; i++) {
      this.recentOffers.push(data[i]);
    }

    for (let i = this.maxLines; i < data.length; i++) {
      this.nextRecentOffers.push(data[i]);
    }

    //  Now we deal with upcoming offers

    data = this.homeServiceData.upcomingOffers;
    max = data.length > this.maxLines ? this.maxLines : data.length;
    for (let i = 0; i < max; i++) {
      this.upcomingOffers.push(data[i]);
    }

    for (let i = this.maxLines; i < data.length; i++) {
      this.nextUpcomingOffers.push(data[i]);
    }

    //  Finally new users

    data = this.homeServiceData.users;
    max = data.length > this.maxLines ? this.maxLines : data.length;
    for (let i = 0; i < max; i++) {
      this.recentUsers.push(data[i]);
    }

    for (let i = this.maxLines; i < data.length; i++) {
      this.nextRecentUsers.push(data[i]);
    }
  }
  ngOnDestroy() {
    jQuery('.content').css({"padding": "92px 20px 42px 20px"});
  }

  onClickCard(e) {
    console.log(e);
    var el = e.target;
    if (jQuery(el).hasClass('fa'))
      el = jQuery(el).parent('a');

    console.log(el);
    //jQuery('.material-card > .mc-btn-action').click(function () {
      var card = jQuery(el).parent('.material-card');
      var icon = jQuery(el).children('i');
      icon.addClass('fa-spin-fast');

      if (card.hasClass('mc-active')) {
        card.removeClass('mc-active');

        window.setTimeout(function() {
          icon
            .removeClass('fa-arrow-left')
            .removeClass('fa-spin-fast')
            .addClass('fa-bars');

        }, 800);
      } else {
        card.addClass('mc-active');

        window.setTimeout(function() {
          icon
            .removeClass('fa-bars')
            .removeClass('fa-spin-fast')
            .addClass('fa-arrow-left');

        }, 800);
      }
    //});
  }
  doSemanticSearch() {
    /*if (!this.currentUser) {
     this.sharedService.setFromPage("home");
     this.router.navigate(['login']);
     return;
     }*/

    if (Utils.isEmpty(this.scQuery) || !this.scQuery.match(/[a-z]/i)) {
      this.addAlert("warning", "Veuillez saisir un job avant de lancer la recherche");
      return;
    }

    this.hideLoader = false;
    this.searchService.semanticSearch(this.scQuery, 0, this.projectTarget).then((data: any) => {
      this.hideLoader = true;
      if (data.length == 0) {
        this.addAlert("warning", "Aucun résultat trouvé pour votre recherche.");
        return;
      }
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
      this.router.navigate(['search/results']);
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

  previousUsers() {
    if (this.previousRecentUsers.length == 0)
      return;
    this.nextRecentUsers = [];
    for (let i = 0; i < this.recentUsers.length; i++)
      this.nextRecentUsers.push(this.recentUsers[i]);

    this.recentUsers = [];
    for (let i = 0; i < this.previousRecentUsers.length; i++) {
      this.recentUsers.push(this.previousRecentUsers[i]);
    }

    this.previousRecentUsers = [];
    let offset = this.homeServiceData.query.startIndex - this.homeServiceData.query.resultCapacity;

    if (offset <= 0) {
      offset = 0;
      this.homeServiceData.query.startIndex = offset;
      return;
    }

    this.homeServiceData.query.startIndex = offset;
    this.homeService.loadMore(this.projectTarget, this.homeServiceData.query.startIndex, this.homeServiceData.query.startIndexOffers).then((data: any) => {
      let newData = data.users;
      let max = newData.length > this.maxLines ? this.maxLines : newData.length;
      for (let i = 0; i < max; i++) {
        this.previousRecentUsers.push(newData[i]);
      }
    });

  }

  nextUsers() {
    if (this.nextRecentUsers.length == 0)
      return;
    this.previousRecentUsers = [];
    for (let i = 0; i < this.recentUsers.length; i++)
      this.previousRecentUsers.push(this.recentUsers[i]);

    this.recentUsers = [];
    for (let i = 0; i < this.nextRecentUsers.length; i++) {
      this.recentUsers.push(this.nextRecentUsers[i]);
    }

    this.nextRecentUsers = [];
    let offset = this.homeServiceData.query.startIndex + this.homeServiceData.query.resultCapacity;
    this.homeServiceData.query.startIndex = offset;
    this.homeService.loadMore(this.projectTarget, this.homeServiceData.query.startIndex, this.homeServiceData.query.startIndexOffers).then((data: any) => {
      let newData = data.users;
      let max = newData.length > this.maxLines ? this.maxLines : newData.length;
      for (let i = 0; i < max; i++) {
        this.nextRecentUsers.push(newData[i]);
      }
    });

  }

  nextOffers() {
    if (this.nextRecentOffers.length == 0)
      return;

    this.previousRecentOffers = [];
    for (let i = 0; i < this.recentOffers.length; i++)
      this.previousRecentOffers.push(this.recentOffers[i]);

    this.recentOffers = [];
    for (let i = 0; i < this.nextRecentOffers.length; i++)
      this.recentOffers.push(this.nextRecentOffers[i]);

    this.previousUpcomingOffers = [];
    for (let i = 0; i < this.upcomingOffers.length; i++)
      this.previousUpcomingOffers.push(this.upcomingOffers[i]);

    this.upcomingOffers = [];
    for (let i = 0; i < this.nextUpcomingOffers.length; i++)
      this.upcomingOffers.push(this.nextUpcomingOffers[i]);

    this.nextRecentOffers = [];
    this.nextUpcomingOffers = [];
    let offset = this.homeServiceData.query.startIndexOffers + this.homeServiceData.query.resultCapacityOffers;
    this.homeServiceData.query.startIndexOffers = offset;
    this.homeService.loadMore(this.projectTarget, this.homeServiceData.query.startIndex, this.homeServiceData.query.startIndexOffers).then((data: any) => {
      //debugger;
      let newData = data.recentOffers;
      let max = newData.length > this.maxLines ? this.maxLines : newData.length;
      for (let i = 0; i < max; i++) {
        this.nextRecentOffers.push(newData[i]);
      }
      newData = data.upcomingOffers;
      max = newData.length > this.maxLines ? this.maxLines : newData.length;
      for (let i = 0; i < max; i++) {
        this.nextUpcomingOffers.push(newData[i]);
      }
    });
  }

  previousOffers() {
    if (this.previousRecentOffers.length == 0)
      return;
    this.nextRecentOffers = [];
    for (let i = 0; i < this.recentOffers.length; i++)
      this.nextRecentOffers.push(this.recentOffers[i]);

    this.recentOffers = [];
    for (let i = 0; i < this.previousRecentOffers.length; i++)
      this.recentOffers.push(this.previousRecentOffers[i]);


    this.nextUpcomingOffers = [];
    for (let i = 0; i < this.upcomingOffers.length; i++)
      this.nextUpcomingOffers.push(this.upcomingOffers[i]);

    this.upcomingOffers = [];
    for (let i = 0; i < this.previousUpcomingOffers.length; i++)
      this.upcomingOffers.push(this.previousUpcomingOffers[i]);

    this.previousRecentOffers = [];
    this.previousUpcomingOffers = [];
    let offset = this.homeServiceData.query.startIndexOffers - this.homeServiceData.query.resultCapacityOffers;
    if (offset <= 0) {
      offset = 0;
      this.homeServiceData.query.startIndexOffers = offset;
      return;
    }

    this.homeServiceData.query.startIndexOffers = offset;
    this.homeService.loadMore(this.projectTarget, this.homeServiceData.query.startIndex, this.homeServiceData.query.startIndexOffers).then((data: any) => {
      let newData = data.recentOffers;
      let max = newData.length > this.maxLines ? this.maxLines : newData.length;
      for (let i = 0; i < max; i++) {
        this.previousRecentOffers.push(newData[i]);
      }
      newData = data.upcomingOffers;
      max = newData.length > this.maxLines ? this.maxLines : newData.length;
      for (let i = 0; i < max; i++) {
        this.previousUpcomingOffers.push(newData[i]);
      }
    });
  }

  simplifyDate(time) {
    let d = new Date(time);
    let str = d.getDate() + "/";
    str = str + (d.getMonth() + 1) + "/";
    str = str + d.getFullYear();
    return str;
  }

  searchOffer(o) {
    let jobTitle = o.jobTitle;
    let searchFields = {
      class: 'com.vitonjob.callouts.recherche.SearchQuery',
      job: jobTitle,
      metier: '',
      lieu: '',
      nom: '',
      entreprise: '',
      date: '',
      table: this.projectTarget == 'jobyer' ? 'user_offre_entreprise' : 'user_offre_jobyer',
      idOffre: '0'
    };

    this.searchService.criteriaSearch(searchFields, this.projectTarget).then((data: any) => {
      debugger;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let r = data[i];
        if (r.idOffre == o.idOffer) {
          this.sharedService.setSearchResult(r);
          this.router.navigate(['search/details']);
          break;
        }
      }
    });
  }

  onRecruite(o) {
    let jobTitle = o.jobTitle;
    let searchFields = {
      class: 'com.vitonjob.callouts.recherche.SearchQuery',
      job: jobTitle,
      metier: '',
      lieu: '',
      nom: '',
      entreprise: '',
      date: '',
      table: this.projectTarget == 'jobyer' ? 'user_offre_entreprise' : 'user_offre_jobyer',
      idOffre: '0'
    };

    this.searchService.criteriaSearch(searchFields, this.projectTarget).then((data: any) => {
      debugger;
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let r = data[i];
        if (r.idOffre == o.idOffer) {

          this.currentJobyer = r.jobyer;
          if (r.obj == "profile") {
            jQuery('#modal-profile').modal('show');
          } else {
            jQuery('#modal-notification-contract').modal('show');
          }


          // this.sharedService.setSearchResult(r);
          // this.router.navigate(['search/details']);
          break;
        }
      }
    });

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
