import {Component, Input} from '@angular/core';
import {AlertComponent} from 'ng2-bootstrap/components/alert';

import {SharedService} from "../../../providers/shared.service";
import {MissionService} from "../../../providers/mission-service";

import {DateConverter} from '../../../pipes/date-converter/date-converter';
import {TimeConverter} from '../../../pipes/time-converter/time-converter';
import {Utils} from "../../utils/utils";

declare var jQuery: any;

@Component({
  selector: '[modal-jobyer-pointing]',
  template: require('./modal-jobyer-pointing.html'),
  providers: [SharedService, MissionService],
  directives: [AlertComponent],
  pipes: [DateConverter, TimeConverter]
})
export class ModalJobyerPointing{
  isEmployer: boolean;
  currentUser: any;

  contract: any;
  //records of user_heure_mission of a contract
  @Input()
  missionHours;
  @Input()
  missionPauses;

  @Input() refreshMissionData: Function;

  indexArray = [];
  indexDateArray = [];


  alerts: Array<Object>;

  constructor(private sharedService: SharedService,
              private missionService: MissionService) {
    this.currentUser = this.sharedService.getCurrentUser();
    this.isEmployer = this.currentUser.estEmployeur;
    this.contract = this.sharedService.getCurrentMission();
  }

  ngOnInit() {
    //this.initHours();
  }

  initHours(){
    //initializing missionHours and missionPauses
    console.log(this.missionHours);
    for (let i = 0; i < this.missionHours.length; i++) {
      let day = this.missionHours[i];
      console.log(day);
      console.log(day.heure_debut_pointe);
      console.log(day.heure_fin_pointe)
      this.missionHours[i].heure_debut_pointe = day.heure_debut_pointe;
      this.missionHours[i].heure_fin_pointe = day.heure_fin_pointe;
      if (this.missionPauses[i] && this.missionPauses[i].length != 0) {
        for (let j = 0; j < this.missionPauses[i].length; j++) {
          let pause = this.missionPauses[i][j];
          this.missionPauses[i][j].pause_debut_pointe = pause.pause_debut_new;
          this.missionPauses[i][j].pause_fin_pointe = pause.pause_fin_pointe;
        }
      }
    }
  }

  watchInput0(i, j, isStartMission, isStartPause) {
    
    var indexObj = {missionHourIndex: i, pauseIndex: j, isStartMission: isStartMission, isStartPause: isStartPause};
    console.log(indexObj);
    if (this.indexArray.length == 0) {
      this.indexArray.push(indexObj);
      return;
    }
    let isFound = false;
    for (let k = 0; k < this.indexArray.length; k++) {
      let indexObjTemp = this.indexArray[k];
      if (indexObjTemp.missionHourIndex == indexObj.missionHourIndex && indexObjTemp.pauseIndex == indexObj.pauseIndex && indexObjTemp.isStartMission == indexObj.isStartMission && indexObjTemp.isStartPause == indexObj.isStartPause) {
        isFound = true;
      }
    }
    if (!isFound) {
      this.indexArray.push(indexObj);
    }
  }

  watchInput(isDate,i, j, isStartMission, isStartPause) {

    var indexObj = {isDate:isDate,missionIndex: i, pauseIndex: j, isStartMission: isStartMission, isStartPause: isStartPause};
    console.log(indexObj);
    if (this.indexArray.length == 0) {
      this.indexArray.push(indexObj);
      return;
    }
    let isFound = false;
    for (let k = 0; k < this.indexArray.length; k++) {
      let indexObjTemp = this.indexArray[k];
      if (indexObjTemp.isDate == indexObj.isDate && indexObjTemp.missionIndex == indexObj.missionIndex && indexObjTemp.pauseIndex == indexObj.pauseIndex && indexObjTemp.isStartMission == indexObj.isStartMission && indexObjTemp.isStartPause == indexObj.isStartPause) {
        isFound = true;
      }
    }
    if (!isFound) {
      this.indexArray.push(indexObj);
    }
  }

  modifyPointing(){
    for (let k = 0; k < this.indexArray.length; k++) {
      let isDate = this.indexArray[k].isDate;
      let i = this.indexArray[k].missionIndex;
      let j = this.indexArray[k].pauseIndex;
      let isStartMission = this.indexArray[k].isStartMission;
      let isStartPause = this.indexArray[k].isStartPause;

      let isPause = false;
      let isStart = false;

      let h: number;
      let m: number;
      let id;
      let date;

      


      if(isDate){
        if (isStartPause) {
          isPause = true;
          isStart = true;
          date=this.missionPauses[i][j].date_pause_debut_pointe;
          id = this.missionPauses[i][j].id;
        } else {
          if (j >= 0) {
            isPause = true;
            isStart = false;
            date=this.missionPauses[i][j].date_pause_fin_pointe;
            id = this.missionPauses[i][j].id;
          }
        }
        if (isStartMission) {
          isPause = false;
          isStart = true;
          
          date=this.missionHours[i].date_debut_pointe;
          id = this.missionHours[i].id;
        } else {
          if (!j && j != 0) {
            isPause = false;
            isStart = false;
            date=this.missionHours[i].date_fin_pointe;
            id = this.missionHours[i].id;
          }
        }

        let day = {id:id,pointe:date}
        console.log(day);
        this.missionService.savePointingDate(day, isStart, isPause).then((data: any) => {
          //jQuery('#modal-jobyer-pointing').modal('hide');
          this.refreshMissionData();
          return;
        });
      }
      else
      {
        if (isStartPause) {
          isPause = true;
          isStart = true;
          //this.missionPauses[i][j].pause_debut_new = this.missionPauses[i][j].pause_debut_temp;
          h = +this.missionPauses[i][j].pause_debut_pointe.split(':')[0] * 60;
          m = +this.missionPauses[i][j].pause_debut_pointe.split(':')[1];
          id = this.missionPauses[i][j].id;
        } else {
          if (j >= 0) {
            isPause = true;
            isStart = false;
            //this.missionPauses[i][j].pause_fin_new = this.missionPauses[i][j].pause_fin_temp;
            h = +this.missionPauses[i][j].pause_fin_pointe.split(':')[0] * 60;
            m = +this.missionPauses[i][j].pause_fin_pointe.split(':')[1];
            id = this.missionPauses[i][j].id;
          }
        }
        if (isStartMission) {
          isPause = false;
          isStart = true;
          //this.missionHours[i].heure_debut_new = this.missionHours[i].heure_debut_temp;
          h = +this.missionHours[i].heure_debut_pointe.split(':')[0] * 60;
          m = +this.missionHours[i].heure_debut_pointe.split(':')[1];
          id = this.missionHours[i].id;
        } else {
          if (!j && j != 0) {
            isPause = false;
            isStart = false;
            //this.missionHours[i].heure_fin_new = this.missionHours[i].heure_fin_temp;
            h = +this.missionHours[i].heure_fin_pointe.split(':')[0] * 60;
            m = +this.missionHours[i].heure_fin_pointe.split(':')[1];
            id = this.missionHours[i].id;
          }
        }
        let newHour = h + m;

        let day = {id:id,pointe:newHour}
        console.log(day);
        this.missionService.savePointing(day, isStart, isPause).then((data: any) => {
          //jQuery('#modal-jobyer-pointing').modal('hide');
          this.refreshMissionData();
          return;
        });
      }
    }
    jQuery('#modal-jobyer-pointing').modal('hide');
  }

  isEmpty(str) {
    if (str == '' || str == 'null' || !str)
      return true;
    else
      return false;
  }

  upperCase(str) {
    if (str == null || !str)
      return '';
    return str.toUpperCase();
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }

  close(): void {
    this.refreshMissionData();
    jQuery('#modal-jobyer-pointing').modal('hide');
  }
}
