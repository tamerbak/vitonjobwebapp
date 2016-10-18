import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {SharedService} from "../../providers/shared.service";
import {MissionService} from "../../providers/mission-service";
import {DateConverter} from "../../pipes/date-converter/date-converter";
import {TimeConverter} from "../../pipes/time-converter/time-converter";
import {Utils} from "../utils/utils";

@Component({
  selector: '[mission-pointing]',
  template: require('./mission-pointing.html'),
  styles: [require('./mission-pointing.scss')],
  pipes: [DateConverter, TimeConverter],
  providers: [SharedService, MissionService],
})
export class MissionPointing {
  projectTarget: string = 'employer';
  isEmployer: boolean;
  currentUser: any;

  contract: any;
  //records of user_heure_mission of a contract
  missionHours = [];
  missionPauses = [];

  disableBtnPointing;
  nextPointing;

  constructor(private sharedService: SharedService,
              private missionService: MissionService,
              private router: Router) {
    // Retrieve the project target
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['app/home']);
    }
    this.isEmployer = this.currentUser.estEmployeur;
    //get missions
    this.contract = this.sharedService.getCurrentMission();

    //retrieve mission hours of today
    this.missionService.listMissionHours(this.contract, true).then((data: any) => {
      if (data.data) {
        let missionHoursTemp = data.data;
        let array = this.missionService.getTodayMission(missionHoursTemp);
        this.missionHours = array[0];
        this.missionPauses = array[1];
        //prepare the mission pauses array to display
        for (let i = 0; i < this.missionHours.length; i++) {
          let day = this.missionHours[i];
          if (this.missionPauses[i] && this.missionPauses[i].length != 0) {
            for (let j = 0; j < this.missionPauses[i].length; j++) {
              let pause = this.missionPauses[i][j];
              this.missionPauses[i][j].pause_debut_temp = (this.isEmpty(pause.pause_debut_new) ? pause.pause_debut : this.missionService.convertToFormattedHour(pause.pause_debut_new));
              this.missionPauses[i][j].pause_fin_temp = (this.isEmpty(pause.pause_fin_new) ? pause.pause_fin : this.missionService.convertToFormattedHour(pause.pause_fin_new));
            }
          }
        }
        this.disableBtnPointing = this.missionService.disablePointing(this.missionHours, this.missionPauses).disabled;
        this.nextPointing = this.missionService.disablePointing(this.missionHours, this.missionPauses).nextPointing;
      }
    });
  }

  pointHour(autoPointing) {
    if (this.nextPointing) {
      let h = new Date().getHours();
      let m = new Date().getMinutes();
      let minutesNow = this.missionService.convertHoursToMinutes(h + ':' + m);
      this.nextPointing.pointe = minutesNow;
      this.missionService.savePointing(this.nextPointing).then((data: any) => {
        //retrieve mission hours of today
        this.missionService.listMissionHours(this.contract, true).then((data: any) => {
          if (data.data) {
            let missionHoursTemp = data.data;
            let array = this.missionService.getTodayMission(missionHoursTemp);
            this.missionHours = array[0];
            this.missionPauses = array[1];
            this.disableBtnPointing = true;
            this.router.navigate(['app/mission/details']);          }
        });
      });
    }
  }

  upperCase(str) {
    if (str == null || !str)
      return '';
    return str.toUpperCase();
  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }
}
