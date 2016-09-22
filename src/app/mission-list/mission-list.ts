// import {Component} from '@angular/core';
// import {NavController} from 'ionic-angular';
// import {Configs} from '../../configurations/configs';
// import {GlobalConfigs} from '../../configurations/globalConfigs';
// import {ContractService} from '../../providers/contract-service/contract-service';
// import {DatePicker} from 'ionic-native';
// import {MissionDetailsPage} from '../mission-details/mission-details';
// import {Storage, SqlStorage} from 'ionic-angular';
// import {DateConverter} from '../../pipes/date-converter/date-converter';
// import {MissionPointingPage} from "../mission-pointing/mission-pointing";

// Import updated from mobile to web
import {ContractService} from '../providers/contract-service';


import {Component, ViewEncapsulation} from '@angular/core';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {OffersService} from "../providers/offer.service";
import {SharedService} from "../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AlertComponent} from 'ng2-bootstrap/components/alert';
import {SearchService} from "../providers/search-service";
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

/*
 Generated class for the MissionListPage page.
 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  // templateUrl: 'build/pages/mission-list/mission-list.html',
  // pipes: [DateConverter],
  // providers: [ContractService]

  selector: '[mission-list]',
  template: require('./mission-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./mission-list.scss')],
  directives: [ACCORDION_DIRECTIVES, ROUTER_DIRECTIVES, AlertComponent, BUTTON_DIRECTIVES],
  providers: [ContractService]
  // providers: [missionsService, SearchService]

})
export class MissionList {
  projectTarget: string;
  isEmployer: boolean;
  themeColor: string;

  employer: any;
  jobyer: any;
  society: string;
  contractList: any;
  missionListTitle: string;
  currentUserVar: string;
  inversedThemeColor: string;
  backgroundImage: any;
  badgeColor: any;
  missionList: any;

  currentUser: any;

  missionsObjNow: any;
  missionsObjFutur: any;
  missionsObjPast: any;
  missionNow: any;
  missionFutur: any;
  missionPast: any;

  // Web
  typeMissionModel: string = '0';

  constructor(private sharedService: SharedService,
              // public gc: GlobalConfigs,
              // public nav: NavController,
              private router: Router,
              private contractService: ContractService) {

    this.currentUser = this.sharedService.getCurrentUser();
    console.log(this.currentUser)
    if(!this.currentUser){
      this.router.navigate(['app/dashboard']);
    }else{
      this.sharedService.setCurrentMission(null);

      this.isEmployer = this.currentUser.estEmployeur;
      // Get target to determine configs
      this.projectTarget = (this.isEmployer ? 'employer' : 'jobyer');

      this.contractList = [];

      this.missionNow = [];
      this.missionFutur = [];
      this.missionPast = [];

      this.missionsObjNow = {header: 'Missions en cours', list: this.missionNow, loaded: false};
      this.missionsObjFutur = {header: 'Missions en attente', list: this.missionFutur, loaded: false};
      this.missionsObjPast = {header: 'Missions terminées', list: this.missionPast, loaded: false};

      this.missionList = [];
      this.missionList.push(this.missionsObjNow);
      this.missionList.push(this.missionsObjFutur);
      this.missionList.push(this.missionsObjPast);
    }
  }

  ngOnInit() {

    //get contracts
    var id;
    if (this.isEmployer) {
      id = this.currentUser.employer.entreprises[0].id;
    } else {
      id = this.currentUser.jobyer.id;
    }

    this.contractService.getContracts(id, this.projectTarget).then((data: any) => {

      if (data.data) {
        this.contractList = data.data;
        for (let i = 0; i < this.contractList.length; i++) {
          let item = this.contractList[i];
          if (item.date_de_debut) {
            if (item.signature_jobyer.toUpperCase() == 'OUI' && item.accompli.toUpperCase() == 'NON')
            // Mission en cours
              this.missionNow.push(item);
            if (item.signature_jobyer.toUpperCase() == 'NON')
            // Mission in futur
              this.missionFutur.push(item);
            //else
            if (item.accompli.toUpperCase() == 'OUI')
            // Mission in past
              this.missionPast.push(item);
          }
        }

        this.missionNow = this.missionNow.sort((a, b) => {
          return this.dayDifference(b.date_de_debut, a.date_de_debut)
        });

        this.missionFutur = this.missionFutur.sort((a, b) => {
          return this.dayDifference(a.date_de_debut, b.date_de_debut)
        });

        this.missionPast = this.missionPast.sort((a, b) => {
          return this.dayDifference(b.date_de_debut, a.date_de_debut)
        });
      }
    });
  }


  dayDifference(first, second) {
    if (first)
      first = new Date(first).getTime();
    else
      first = new Date().getTime();
    if (second)
      second = new Date(second).getTime();
    else
      second = new Date().getTime();
    return Math.round((first - second) / (1000 * 60 * 60 * 24)) + 1;
  }

  toStringDate(date: any) {
    if (date)
      date = new Date(date);
    else
      date = new Date();
    return date.getDate() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getFullYear();
  }

  goToDetailMission(mission) {
    // this.nav.push(MissionDetailsPage, {contract: contract});
    this.sharedService.setCurrentMission(mission);
    this.router.navigate(['app/mission/details']);
    console.log('goToDetailMission');
  }

  // goToMissionPointingPage(contract) {
  //   // this.nav.push(MissionPointingPage, {contract: contract});
  //   console.log('goToMissionPointingPage');
  // }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }

  upperCase(str) {
    if (this.isEmpty(str))
      return '';
    return str.toUpperCase();
  }
}
