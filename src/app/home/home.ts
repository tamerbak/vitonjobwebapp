import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router, ActivatedRoute, Params} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {SearchService} from "../../providers/search-service";
import {SharedService} from "../../providers/shared.service";
import {HomeService} from "../../providers/home.service";
import {Configs} from "../../configurations/configs";
import {ModalWelcome} from "../modal-welcome/modal-welcome";
import {ModalProfile} from "../modal-profile/modal-profile";
import {ModalPassword} from "../modal-password/modal-password";
import {ModalNotificationContract} from "../modal-notification-contract/modal-notification-contract";
import {ModalGeneralCondition} from "../modal-general-condition/modal-general-condition";
import {RecruitButton} from "../components/recruit-button/recruit-button";
import {HomeList} from "../components/home-list-component/home-list-component";
import {Utils} from "../utils/utils";
import {SearchBar} from "../components/search-bar/search-bar";
import {LOGIN_BEFORE_ADVERT_POSTULAT} from "../../configurations/appConstants";
import {AdvertService} from "../../providers/advert.service";
import {PartnersService} from "../../providers/partners-service";
import {ContractService} from "../../providers/contract-service";
declare let jQuery: any;
declare let require: any;
declare let Messenger: any;

@Component({
  selector: 'home',
  template: require('./home.html'),
  directives: [
    ROUTER_DIRECTIVES,
    AlertComponent,
    ModalWelcome,
    ModalProfile,
    ModalPassword,
    ModalNotificationContract,
    ModalGeneralCondition,
    RecruitButton,
    HomeList,
    SearchBar
  ],
  providers: [
    SearchService,
    HomeService,
    PartnersService,
    AdvertService,
    ContractService
  ],
  styles: [require('./home.scss')],
  encapsulation: ViewEncapsulation.None
})

export class Home{
  currentUser: any;
  projectTarget: string;

  // Research fields
  cityQuery: string = "";
  scQuery: string = "";

  alerts: Array<Object>;
  hideLoader: boolean = true;
  hideCityLoader: boolean = true;
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
              private advertService: AdvertService,
              private partnersService: PartnersService,
              private contractService: ContractService,
              private sharedService: SharedService) {
    if (this.router.url === '/jobyer') {
      this.sharedService.setProjectTarget('jobyer');
    } else if (this.router.url === '/employeur') {
      this.sharedService.setProjectTarget('employer');
    }
    this.currentUser = this.sharedService.getCurrentUser();
    let role = this.sharedService.getProjectTarget();
    if (role == "employer") {
      this.projectTarget = "employer";
      this.sharedService.setProjectTarget("employer");
    } else {
      this.projectTarget = "jobyer";
      this.sharedService.setProjectTarget("jobyer");
    }
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
      this.openAppropriateModal();
    } else {
      this.projectTarget = this.sharedService.getProjectTarget();
    }

    this.homeService.loadHomeData((this.projectTarget)).then(data => {
      this.homeServiceData = data;
      this.initHomeList();
    });

    this.config = Configs.setConfigs(this.projectTarget);

    myContent.css({"padding": "0", "padding-right": "0"});
    if  (screen.width <= 1199) {
      myContent.css({"background-size": "cover"});
      myNavBar.css({"background-color": "$primary-color-one", "border-color": "$primary-color-one"});
      this.isTablet = true;
    } else {
      myContent.css({"background-image": ""});
      myContent.css({"background-size": "cover"});
      myNavBar.css({"background-color": "$primary-color-one", "border-color": "$primary-color-one"});
    }

    //afficher une notification pour les jobyers qui ont des contrats en attente
    if(this.currentUser && this.projectTarget == "jobyer") {
      this.showContratEnAttenteNotif();
    }

    this.sharedService.setCurrentOffer(null);
    this.sharedService.setCurrentSearch(null);
    this.sharedService.setCurrentSearchCity(null);
    this.sharedService.setLastResult(null);

  }

  openAppropriateModal(){
    //dans le cas de la renitialisation du mot de passe: obliger l'utilisateur à modifier son passwd
    if (this.currentUser.mot_de_passe_reinitialise == "Oui") {
      jQuery('#modal-password').modal({
        keyboard: false,
        backdrop: 'static'
      });
      jQuery('#modal-password').modal('show');
    }

    //dans le cas de l'inscription: afficher la modale des condition générale
    if (this.isEmpty(this.currentUser.titre) && this.isEmpty(this.currentUser.nom) && this.isEmpty(this.currentUser.prenom)) {
      jQuery('#modal-general-condition').modal({
        keyboard: false,
        backdrop: 'static'
      });
      jQuery('#modal-general-condition').modal('show');
    }else{
      this.redirectToAdvertAfterPostulat();
    }
  }

  ngAfterViewInit(): void {
    let self = this;
    // Catch enter from search inputs to launch search
    /*jQuery('.search-input-semantique').keydown( function(e) {
      var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
      if(key == 13) {
        e.preventDefault();
        self.doSemanticSearch();
      }
    });
    jQuery('.search-input-city').keydown( function(e) {
      var key = e.charCode ? e.charCode : e.keyCode ? e.keyCode : 0;
      if(key == 13) {
        e.preventDefault();
        self.doOffersByCitySearch();
      }
    });*/
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

  doSemanticSearch() {
    if (Utils.isEmpty(this.scQuery) || !this.scQuery.match(/[a-z]/i)) {
     // this.addAlert("warning", "Veuillez saisir une requête avant de lancer la recherche");
      return;
    }

    this.hideLoader = false;
    this.searchService.semanticSearch(this.scQuery, 0, this.projectTarget).then((results: any) => {
      this.hideLoader = true;
      let data = (this.projectTarget == 'jobyer') ? results.offerEnterprise : results.offerJobyers;
      this.sharedService.setLastIndexation({resultsIndex : results.indexation});
      this.sharedService.setLastResult(data);
      this.sharedService.setCurrentSearch(this.scQuery);
      this.sharedService.setCurrentSearchCity(null);
      this.router.navigate(['search/results',{searchType:'semantic'}]);
    });
  }

  doOffersByCitySearch() {
   if (Utils.isEmpty(this.cityQuery) || !this.cityQuery.match(/[a-z]/i)) {
   //   this.addAlert("warning", "Veuillez saisir le nom d'une ville avant de lancer la recherche");
      return;
    }

    this.hideCityLoader = false;
    this.searchService.searchOffersByCity(this.cityQuery, this.projectTarget).then((data: any) => {
      this.hideCityLoader = true;
      this.sharedService.setLastResult(data);
      this.sharedService.setCurrentSearch(null);
      this.sharedService.setCurrentSearchCity(this.cityQuery);
      this.router.navigate(['search/results']);
    });
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

  //traitement à l'issue de la réponse aux condition générale
  onGCRefused(gcRefused: boolean){
    let self = this;
    //en cas de refus, se déconnecter
    //en cas d'acceptation, afficher la modale de bienvenue
    jQuery('#modal-general-condition').on('hidden.bs.modal', function (e) {
      if(!gcRefused) {
        jQuery('#modal-welcome').modal({
          keyboard: false,
          backdrop: 'static'
        });
        jQuery('#modal-welcome').modal('show');
        //afficher ensuite la modale du profile
        jQuery('#modal-welcome').on('hidden.bs.modal', function (e) {
          jQuery('#modal-profile').modal({
            keyboard: false,
            backdrop: 'static'
          });
          jQuery('#modal-profile').modal('show');
          jQuery('#modal-profile').on('hidden.bs.modal', function (e) {
            this.redirectToAdvertAfterPostulat();
          });
        });
      }else{
        self.sharedService.logOut();
        location.reload();
      }
    });
  }

  //redirige l'utilisateur vers la page de l'annonce à laquelle il a postulé
  //s'il n'a pas postulé, on ne fais rien
  //ceci est valable juste pour les jobyers connectés
  redirectToAdvertAfterPostulat(){
    let redirectionArgs = this.sharedService.getRedirectionArgs();
    if(redirectionArgs && !this.currentUser.estEmployeur && !this.currentUser.estRecruteur){
      let advertId = redirectionArgs.args.advertId;
      let partnerCode = redirectionArgs.args.partnerCode;
      let jobyerId = this.sharedService.getCurrentUser().jobyer.id;

      if (redirectionArgs.obj == LOGIN_BEFORE_ADVERT_POSTULAT &&
        advertId != 0 && !Utils.isEmpty(advertId)) {
        if(!Utils.isEmpty(partnerCode)) {
          this.partnersService.getPartnerByCode(partnerCode).then((data: any) => {
            if (data && data.data && data.data.length != 0) {
              let partnerId = data.data[0].id;
              this.advertService.saveAdvertInterest(advertId, jobyerId, partnerId).then((data: any) => {
                this.sharedService.setRedirectionArgs(null);
                this.router.navigate(['advert/details', {id: advertId}]);
              });
            } else {
              this.sharedService.setRedirectionArgs(null);
            }
          });
        }else{
          this.advertService.saveAdvertInterest(advertId, jobyerId).then((data: any) => {
            this.sharedService.setRedirectionArgs(null);
            this.router.navigate(['advert/details', {id: advertId}]);
          });
        }
      } else {
        this.sharedService.setRedirectionArgs(null);
        return;
      }
    }else{
      this.sharedService.setRedirectionArgs(null);
    }
  }

  displayPartnerLogo(): boolean {
    if (this.sharedService.getPartner()) {
      return true;
    }
    return false;
  }

  showContratEnAttenteNotif(){
    let alreadyPassedByHome = this.sharedService.isAlreadyInHome();
    if(!alreadyPassedByHome) {
      this.sharedService.setAlreadyInHome(true);
      this.contractService.getCountNonSignedContract("jobyer", this.currentUser.jobyer.id).then((data: any) => {
        if (data && data.data && data.data.length > 0) {
          let nbContrat = +(data.data[0].nbContrat);
          if(nbContrat > 0) {
            Messenger().post({
              message: "Vous avez <b><a href='#/contract/list'>" + nbContrat + " contrat(s) en attente de signature.</a></b>",
              type: 'info',
              showCloseButton: true,
              extraClasses: 'messenger-fixed messenger-on-top messenger-on-right',
              theme: 'future'
            });
          }
        }
      });
    }
  }
}
