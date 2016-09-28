import {Component, ViewEncapsulation} from "@angular/core";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {SearchService} from "../../providers/search-service";
import {SharedService} from "../../providers/shared.service";
import {Configs} from "../../configurations/configs";

declare var require: any;
declare var jQuery: any;
declare var Messenger:any;

@Component({
	selector: 'home',
	template: require('./home.html'),
	directives: [ROUTER_DIRECTIVES, AlertComponent],
	providers: [SearchService],
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


  constructor(private router: Router,
              private searchService: SearchService,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {

    let myContent = jQuery('.content');
    let myNavBar = jQuery('.navbar-dashboard');

    this.currentUser = this.sharedService.getCurrentUser();
    if (this.currentUser) {
      this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');
    } else {
      this.projectTarget = this.sharedService.getProjectTarget();
    }

    this.config = Configs.setConfigs(this.projectTarget);

    myContent.css({"padding":"0","padding-right":"0"});
    if (screen.width <= 480) {
      myContent.css(this.config.backgroundImage);
      myContent.css({"background-size": "cover"});
      myNavBar.css({"background-color": "transparent", "border-color": "transparent"});
    } else if (screen.width <= 768) {
      myContent.css(this.config.backgroundImage);
      myContent.css({"background-size":"cover"});
      myNavBar.css({"background-color": "#14baa6","border-color": "#14baa6"});
      this.isTablet = true;
    } else {
      myContent.css({"background-image":""});
      myContent.css({"background-size":"cover"});
      myNavBar.css({"background-color": "#14baa6","border-color": "#14baa6"});
    }

  }


  ngOnDestroy(){
    jQuery('.content').css({"padding":"40px","padding-right":"40px"});
  }

  doSemanticSearch() {
    if (this.isEmpty(this.scQuery) || !this.scQuery.match(/[a-z]/i)) {
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
      Messenger().post({
        message: 'La recherche pour "'+this.scQuery+'" a retourné '+ (data.length == 1 ?'un seul résultat':(data.length+' résultats')),
        type: 'success',
        showCloseButton: true
      });
      this.router.navigate(['app/search/results']);
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
}
