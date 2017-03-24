import {ContractService} from "../../providers/contract-service";
import {Component, ViewEncapsulation} from "@angular/core";
import {ACCORDION_DIRECTIVES, BUTTON_DIRECTIVES} from "ng2-bootstrap/ng2-bootstrap";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router,ActivatedRoute} from "@angular/router";
import {AlertComponent} from "ng2-bootstrap/components/alert";
import {MissionService} from "../../providers/mission-service";
import {Helpers} from "../../providers/helpers.service";
import {Utils} from "../utils/utils";
import { InfiniteScroll } from 'angular2-infinite-scroll';


@Component({
  selector: '[mission-list]',
  template: require('./mission-list.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./mission-list.scss')],
  directives: [ROUTER_DIRECTIVES, BUTTON_DIRECTIVES,InfiniteScroll],
  providers: [ContractService, MissionService, Helpers]
})
export class MissionList{
  projectTarget: string;
  isEmployer: boolean;
  loading:boolean = true;

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

  missionNowCount: string ="";
  missionFutureCount: string ="";
  missionPastCount: string ="";
  missionCanceledCount: string ="";

  currentTypeList: any;

  queryOffset:number = 0;
  queryLimit:number = 5;
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
    this.missionsObjCanceled = {header: 'Missions annulées', list: this.missionCanceled, loaded: false};

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
    this.getContractsCount();
  }

  onScrollDown () {
    this.getContractsByType(this.typeMissionModel);
  }

  loadList(type){
    this.currentTypeList =[];
    this.queryOffset =0;
    this.queryLimit =5;
    this.getContractsCount();
    this.getContractsByType(type);
  }

  getContractsCount(){
     this.contractService.getNowContractsCount(this.userId, this.projectTarget).then((data: any) => {
        if (data.data) {
          this.missionNowCount = data.data[0].count == 0 ? 'Aucune':''+data.data[0].count;
        }
     });

     if(this.isEmployer) {
       this.contractService.getFutureContractsCount(this.userId, this.projectTarget).then((data: any) => {
         if (data.data) {
           this.missionFutureCount = data.data[0].count == 0 ? 'Aucune' : ('' + data.data[0].count);
         }
       });
     }

     this.contractService.getPastContractsCount(this.userId, this.projectTarget).then((data: any) => {
        if (data.data) {
          this.missionPastCount = data.data[0].count == 0 ? 'Aucune':data.data[0].count;
        }
      });

      this.contractService.getCanceledContractsCount(this.userId, this.projectTarget).then((data: any) => {
        if (data.data) {
          this.missionCanceledCount = data.data[0].count == 0 ? 'Aucune':data.data[0].count;
        }
      });
  }

    getContractsByType(type){
        this.loading = true;
        this.contractService.getContractsByType(type,this.queryOffset,this.queryLimit,this.userId, this.projectTarget).then((data: any) => {
          if (data.data) {
            this.contractList = data.data;
            for (let i = 0; i < this.contractList.length; i++) {
              let item = this.contractList[i];
              this.currentTypeList.push(item);

              //retrieve mission hours of today
              this.getMissionHours(item);
            }
            this.queryOffset = this.queryOffset + this.queryLimit;

            this.currentTypeList = this.currentTypeList.sort((a, b) => {
              return this.dayDifference(b.date_de_debut, a.date_de_debut)
            });
            this.loading = false;
          }
        });
    }


  getMissionHours(item){
      this.missionService.listMissionHours(item, true).then((data: any) => {
        if (data.data) {
          let missionHoursTemp = data.data;
          let array = this.missionService.getTodayMission(missionHoursTemp);
          let missionHours = array[0];
          let missionPauses = array[1];
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
