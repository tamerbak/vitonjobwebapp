import {ContractService} from "../../providers/contract-service";
import {Component, ViewEncapsulation} from "@angular/core";
import {ACCORDION_DIRECTIVES, BUTTON_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router,ActivatedRoute} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {MissionService} from "../../providers/mission-service";
import {Helpers} from "../../providers/helpers.service";
import {Utils} from "../utils/utils";

@Component({
  selector: '[mission-list]',
  template: require('./mission-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./mission-list.scss')],
  directives: [ROUTER_DIRECTIVES, BUTTON_DIRECTIVES],
  providers: [ContractService, MissionService, Helpers]
})
export class MissionList{
  projectTarget: string;
  isEmployer: boolean;

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
  missionsObjCanceled: any;
  missionNow: any;
  missionFutur: any;
  missionPast: any;
  missionCanceled: any;

  currentTypeList: any;
  userId:any;

  // Web
  typeMissionModel: string = '0';
  disableBtnPointing;

  constructor(private sharedService: SharedService,
              // public gc: GlobalConfigs,
              // public nav: NavController,
              private router: Router,
              private route: ActivatedRoute,
              private contractService: ContractService,
              private missionService: MissionService) {

    this.currentUser = this.sharedService.getCurrentUser();

    console.log(this.currentUser)
    if (!this.currentUser) {
      this.router.navigate(['home']);
      return;
    } else {
      this.sharedService.setCurrentMission(null);
    }
    this.isEmployer = this.currentUser.estEmployeur;
    // Get target to determine configs
    this.projectTarget = (this.isEmployer ? 'employer' : 'jobyer');

    this.contractList = [];

    this.currentTypeList = [];

    this.missionNow = [];
    this.missionFutur = [];
    this.missionPast = [];
    this.missionCanceled = [];

    this.missionsObjNow = {header: 'Missions en cours', list: this.missionNow, loaded: false};
    this.missionsObjFutur = {header: 'Missions en attente', list: this.missionFutur, loaded: false};
    this.missionsObjPast = {header: 'Missions terminées', list: this.missionPast, loaded: false};
    this.missionsObjCanceled = {header: 'Missions Annulées', list: this.missionCanceled, loaded: false};

    this.missionList = [];
    this.missionList.push(this.missionsObjNow);
    this.missionList.push(this.missionsObjFutur);
    this.missionList.push(this.missionsObjPast);
    this.missionList.push(this.missionsObjCanceled);

    if (this.isEmployer) {
      this.userId = this.currentUser.employer.entreprises[0].id;
    } else {
      this.userId = this.currentUser.jobyer.id;
    }
  }

  getContractsByType(type){
      this.contractService.getContracts(this.userId, this.projectTarget).then((data: any) => {
        this.missionNow = []
        this.missionFutur = []
       this.missionPast =[]
       this.missionCanceled=[]
      if (data.data) {
        this.contractList = data.data;
        for (let i = 0; i < this.contractList.length; i++) {
          let item = this.contractList[i];

          if (item.date_de_debut) {
            if (item.signature_jobyer.toUpperCase() == 'OUI' && item.accompli.toUpperCase() == 'NON' && Utils.isEmpty(item.annule_par))
            // Mission en cours
              this.missionNow.push(item);
            if (item.signature_jobyer.toUpperCase() == 'NON' && Utils.isEmpty(item.annule_par))
            // Mission in futur
              this.missionFutur.push(item);
            //else
            if (item.accompli.toUpperCase() == 'OUI' && Utils.isEmpty(item.annule_par))
            // Mission in past
              this.missionPast.push(item);
            if (!Utils.isEmpty(item.annule_par))
            // Mission canceled
              this.missionCanceled.push(item);
          }
          //retrieve mission hours of today
          this.missionService.listMissionHours(item, true).then((data: any) => {
            if (data.data) {
              let missionHoursTemp = data.data;
              let array = this.missionService.getTodayMission(missionHoursTemp);
              let missionHours = array[0];
              let missionPauses = array[1];
              //item.disableBtnPointing = this.missionService.disablePointing(missionHours, missionPauses).disabled;
              /*let autoPointing = navParams.get('autoPointing');
               if(autoPointing){
               this.nextPointing = navParams.get('nextPointing')
               this.pointHour(true);
               }*/
            }
          });
          if(type == 0){
            this.currentTypeList = this.missionNow;
          }else if(type == 1){
            this.currentTypeList = this.missionFutur;
          }else if(type == 2){
            this.currentTypeList = this.missionPast;
          }else if(type == 3){
            this.currentTypeList = this.missionCanceled;
          }
        }

        this.currentTypeList = this.currentTypeList.sort((a, b) => {
          return this.dayDifference(b.date_de_debut, a.date_de_debut)
        });
      }
    });

  }

  ngOnInit() {
    
    this.route.params.subscribe(params => {
       if(params['type']){
         this.typeMissionModel = params['type'];
       }else{
         this.typeMissionModel = '0';
       }
    });

    //get contracts
    this.getContractsByType(this.typeMissionModel);
  }

  loadList(type){
    this.getContractsByType(type);
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
    this.sharedService.setCurrentMission(mission);
    this.router.navigate(['mission/details']);
    }

  goToMissionPointingPage(mission) {
    this.sharedService.setCurrentMission(mission);
    this.router.navigate(['mission/pointing']);
  }

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
