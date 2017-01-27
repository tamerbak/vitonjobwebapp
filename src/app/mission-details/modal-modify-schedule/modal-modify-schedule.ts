import {Component, Input} from '@angular/core';
import {AlertComponent} from 'ng2-bootstrap/components/alert';

import {SharedService} from "../../../providers/shared.service";
import {MissionService} from "../../../providers/mission-service";

import {DateConverter} from '../../../pipes/date-converter/date-converter';
import {TimeConverter} from '../../../pipes/time-converter/time-converter';
import {Utils} from "../../utils/utils";

declare var jQuery: any;

@Component({
  selector: '[modal-modify-schedule]',
  template: require('./modal-modify-schedule.html'),
  providers: [SharedService, MissionService],
  directives: [AlertComponent],
  pipes: [DateConverter, TimeConverter]
})
export class ModalModifySchedule{
  isEmployer: boolean;
  currentUser: any;

  contract: any;
  //records of user_heure_mission of a contract
  @Input()
  missionHours;
  @Input()
  missionPauses;

  indexArray = [];


  alerts: Array<Object>;

  constructor(private sharedService: SharedService,
              private missionService: MissionService) {
    this.currentUser = this.sharedService.getCurrentUser();
    this.isEmployer = this.currentUser.estEmployeur;
    this.contract = this.sharedService.getCurrentMission();
  }

  ngOnInit() {
    this.initHours();
  }

  initHours(){
    //initializing missionHours and missionPauses
    for (let i = 0; i < this.missionHours.length; i++) {
      let day = this.missionHours[i];
      this.missionHours[i].heure_debut_temp = (Utils.isEmpty(day.heure_debut_new) ? this.missionService.convertToFormattedHour(day.heure_debut) : this.missionService.convertToFormattedHour(day.heure_debut_new));
      this.missionHours[i].heure_fin_temp = (Utils.isEmpty(day.heure_fin_new) ? this.missionService.convertToFormattedHour(day.heure_fin) : this.missionService.convertToFormattedHour(day.heure_fin_new));
      if (this.missionPauses[i] && this.missionPauses[i].length != 0) {
        for (let j = 0; j < this.missionPauses[i].length; j++) {
          let pause = this.missionPauses[i][j];
          this.missionPauses[i][j].pause_debut_temp = (Utils.isEmpty(pause.pause_debut_new) ? pause.pause_debut : this.missionService.convertToFormattedHour(pause.pause_debut_new));
          this.missionPauses[i][j].pause_fin_temp = (Utils.isEmpty(pause.pause_fin_new) ? pause.pause_fin : this.missionService.convertToFormattedHour(pause.pause_fin_new));
        }
      }
    }
  }

  watchInput(i, j, isStartMission, isStartPause) {
    var indexObj = {missionHourIndex: i, pauseIndex: j, isStartMission: isStartMission, isStartPause: isStartPause};
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

  modifyScheduledHour() {
    /*let isScheduleValid = this.checkHoursValidity();
    if (!isScheduleValid) {
      return;
    }*/

    let hoursArray = [];
    let h: number;
    let m: number;
    for (let i = 0; i < this.missionHours.length; i++) {
      let day = this.missionHours[i];
      let savedHeureDebut = (Utils.isEmpty(day.heure_debut_new) ? this.missionService.convertToFormattedHour(day.heure_debut) : this.missionService.convertToFormattedHour(day.heure_debut_new));
      if(day.heure_debut_temp != savedHeureDebut){
        day.heure_debut_new = day.heure_debut_temp;
        h = +day.heure_debut_temp.split(':')[0] * 60;
        m = +day.heure_debut_temp.split(':')[1];
        hoursArray.push({id:day.id, newHour: h + m, isPause: false, isStart: true, isPointe: false});
      }
      let savedHeureFin = (Utils.isEmpty(day.heure_fin_new) ? this.missionService.convertToFormattedHour(day.heure_fin) : this.missionService.convertToFormattedHour(day.heure_fin_new));
      if(day.heure_fin_temp != savedHeureFin){
        day.heure_fin_new = day.heure_fin_temp;
        h = +day.heure_fin_temp.split(':')[0] * 60;
        m = +day.heure_fin_temp.split(':')[1];
        hoursArray.push({id:day.id, newHour: h + m, isPause: false, isStart: false, isPointe: false});
      }
      if(day.heure_debut_pointe_temp != day.heure_debut_pointe){
        day.heure_debut_pointe = day.heure_debut_pointe_temp;
        h = +day.heure_debut_pointe_temp.split(':')[0] * 60;
        m = +day.heure_debut_pointe_temp.split(':')[1];
        hoursArray.push({id:day.id, newHour: h + m, isPause: false, isStart: true, isPointe: true});
      }
      if(day.heure_fin_pointe_temp != day.heure_fin_pointe){
        day.heure_fin_pointe = day.heure_fin_pointe_temp;
        h = +day.heure_fin_pointe_temp.split(':')[0] * 60;
        m = +day.heure_fin_pointe_temp.split(':')[1];
        hoursArray.push({id:day.id, newHour: h + m, isPause: false, isStart: false, isPointe: true});
      }
      if (this.missionPauses[i] && this.missionPauses[i].length != 0) {
        for (let j = 0; j < this.missionPauses[i].length; j++) {
          let pause = this.missionPauses[i][j];
          let savedPauseDebut = (Utils.isEmpty(pause.pause_debut_new) ? pause.pause_debut : this.missionService.convertToFormattedHour(pause.pause_debut_new));
          if (pause.pause_debut_temp != savedPauseDebut) {
            pause.pause_debut_new = pause.pause_debut_temp;
            h = +pause.pause_debut_temp.split(':')[0] * 60;
            m = +pause.pause_debut_temp.split(':')[1];
            hoursArray.push({id: pause.id, newHour: h + m, isPause: true, isStart: true, isPointe: false});
          }
          let savedPauseFin = (Utils.isEmpty(pause.pause_fin_new) ? pause.pause_fin : this.missionService.convertToFormattedHour(pause.pause_fin_new));
          if (pause.pause_fin_temp != savedPauseFin) {
            pause.pause_fin_new = pause.pause_fin_temp;
            h = +pause.pause_fin_temp.split(':')[0] * 60;
            m = +pause.pause_fin_temp.split(':')[1];
            hoursArray.push({id: pause.id, newHour: h + m, isPause: true, isStart: false, isPointe: false});
          }
          if (pause.pause_debut_pointe_temp != pause.pause_debut_pointe) {
            pause.pause_debut_pointe = pause.pause_debut_pointe_temp;
            h = +pause.pause_debut_pointe_temp.split(':')[0] * 60;
            m = +pause.pause_debut_pointe_temp.split(':')[1];
            hoursArray.push({id: pause.id, newHour: h + m, isPause: true, isStart: true, isPointe: true});
          }
          if (pause.pause_fin_pointe_temp != pause.pause_fin_pointe) {
            pause.pause_fin_pointe = pause.pause_fin_pointe_temp;
            h = +pause.pause_fin_pointe_temp.split(':')[0] * 60;
            m = +pause.pause_fin_pointe_temp.split(':')[1];
            hoursArray.push({id: pause.id, newHour: h + m, isPause: true, isStart: false, isPointe: true});
          }
        }
      }
    }

    this.missionService.saveNewHours(hoursArray).then((data) => {
      jQuery('#modal-modify-schedule').modal('hide');
      return;
    });
  }

  checkHoursValidity() {
    for (var i = 0; i < this.missionHours.length; i++) {
      if (Utils.isEmpty(this.missionHours[i].heure_debut_temp) || Utils.isEmpty(this.missionHours[i].heure_fin_temp)) {
        this.addAlert("warning", "Veuillez renseigner toutes les heures de missions avant de valider.");
        return false;
      } else {
        if (!this.isHourValid(i, -1, false, true, this.missionService.convertHoursToMinutes(this.missionHours[i].heure_debut_temp)))
          return false;
        if (!this.isHourValid(i, -1, false, false, this.missionService.convertHoursToMinutes(this.missionHours[i].heure_fin_temp)))
          return false;
      }
      if (this.missionPauses[i] && this.missionPauses[i].length != 0) {
        for (var j = 0; j < this.missionPauses[i].length; j++) {
          //verify if there are empty pause hours
          if (Utils.isEmpty(this.missionPauses[i][j].pause_debut_temp) || Utils.isEmpty(this.missionPauses[i][j].pause_fin_temp)) {
            this.addAlert("warning", "Veuillez renseigner toutes les heures de pauses avant de valider.");
            return false;
          } else {
            //verify if pause hours are valid
            if (!this.isHourValid(i, j, true, false, this.missionService.convertHoursToMinutes(this.missionPauses[i][j].pause_debut_temp)))
              return false;
            if (!this.isHourValid(i, j, false, false, this.missionService.convertHoursToMinutes(this.missionPauses[i][j].pause_fin_temp)))
              return false;
          }
        }
      }
    }
    return true;
  }

  isHourValid(i, j, isStartPause, isStartMission, newHour) {
    var startMission = this.isEmpty(this.missionHours[i].heure_debut_new) ? this.missionHours[i].heure_debut : this.missionHours[i].heure_debut_new;
    var endMission = this.isEmpty(this.missionHours[i].heure_fin_new) ? this.missionHours[i].heure_fin : this.missionHours[i].heure_fin_new;
    if (j >= 0) {
      var startPause = this.isEmpty(this.missionPauses[i][j].pause_debut_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][j].pause_debut_temp) : this.missionPauses[i][j].pause_debut_new;
      var endPause = this.isEmpty(this.missionPauses[i][j].pause_fin_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][j].pause_fin_temp) : this.missionPauses[i][j].pause_fin_new;
    }

    if (isStartPause) {
      if (+startMission >= +newHour && startMission != "") {
        this.addAlert("danger", "L'heure de début de pause doit être supérieure à l'heure de début de travail.");
        return false;
      }
      if (+endMission <= +newHour && endMission != "") {
        this.addAlert("danger", "L'heure de début de pause doit être inférieure à l'heure de fin de travail.");
        return false;
      }
      if (+endPause <= +newHour && endPause != "") {
        this.addAlert("danger", "L'heure de début de pause doit être inférieure à l'heure de fin de pause.");
        return false;
      }
      for (var k = 0; k < this.missionPauses[i].length; k++) {
        var startOtherPause = this.isEmpty(this.missionPauses[i][k].pause_debut_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_debut_temp) : this.missionPauses[i][k].pause_debut_new;
        var endOtherPause = this.isEmpty(this.missionPauses[i][k].pause_fin_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_fin_temp) : this.missionPauses[i][k].pause_fin_new;
        if (j < k && ((+newHour >= +startOtherPause && startOtherPause != "") || (+newHour >= +endOtherPause && endOtherPause != ""))) {
          this.addAlert("danger", "L'heure de début de pause doit être inférieure aux heures de pauses postérieurs.");
          return false;
        }
        if (j > k && ((+newHour <= +startOtherPause && startOtherPause != "") || (+newHour <= +endOtherPause && endOtherPause != ""))) {
          this.addAlert("danger", "L'heure de début de pause doit être supérieure aux heures de pauses antérieurs.");
          return false;
        }
      }
    } else {
      if (j >= 0) {
        if (+startMission >= +newHour && startMission != "") {
          this.addAlert("danger", "L'heure de fin de pause doit être supérieure à l'heure de début de travail.");
          return false;
        }
        if (+endMission <= +newHour && endMission != "") {
          this.addAlert("danger", "L'heure de fin de pause doit être inférieure à l'heure de fin de travail.");
          return false;
        }
        if (+newHour <= +startPause && startPause != "") {
          this.addAlert("danger", "L'heure de fin de pause doit être supérieure à l'heure de début de pause.");
          return false;
        }
        for (var k = 0; k < this.missionPauses[i].length; k++) {
          var startOtherPause = this.isEmpty(this.missionPauses[i][k].pause_debut_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_debut_temp) : this.missionPauses[i][k].pause_debut_new;
          var endOtherPause = this.isEmpty(this.missionPauses[i][k].pause_fin_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_fin_temp) : this.missionPauses[i][k].pause_fin_new;
          if (j < k && ((+newHour >= +startOtherPause && startOtherPause != "") || (+newHour >= +endOtherPause && endOtherPause != ""))) {
            this.addAlert("danger", "L'heure de fin de pause doit être inférieure aux heures de pauses postérieurs.");
            return false;
          }
          if (j > k && ((+newHour <= +startOtherPause && startOtherPause != "") || (+newHour <= +endOtherPause && endOtherPause != ""))) {
            this.addAlert("danger", "L'heure de fin de pause doit être supérieure aux heures de pauses antérieurs.");
            return false;
          }
        }
      }
    }

    if (isStartMission) {
      if (+newHour >= +endMission && endMission != "") {
        this.addAlert("danger", "L'heure de début de travail doit être inférieure à l'heure de fin de travail.");
        return false;
      }
      if (this.missionPauses[i]) {
        for (var k = 0; k < this.missionPauses[i].length; k++) {
          var startOtherPause = this.isEmpty(this.missionPauses[i][k].pause_debut_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_debut_temp) : this.missionPauses[i][k].pause_debut_new;
          var endOtherPause = this.isEmpty(this.missionPauses[i][k].pause_fin_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_fin_temp) : this.missionPauses[i][k].pause_fin_new;
          if ((+newHour >= +startOtherPause && startOtherPause != "") || (+newHour >= +endOtherPause && endOtherPause != "")) {
            this.addAlert("danger", "L'heure de début de travail doit être inférieure aux heures de pauses.");
            return false;
          }
        }
      }
    } else {
      if ((!j && j != 0) || j < 0) {
        if (+startMission >= +newHour && startMission != "") {
          this.addAlert("danger", "L'heure de fin de travail doit être supérieure à l'heure de début de travail.");
          return false;
        }
        if (this.missionPauses[i]) {
          for (var k = 0; k < this.missionPauses[i].length; k++) {
            var startOtherPause = this.isEmpty(this.missionPauses[i][k].pause_debut_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_debut_temp) : this.missionPauses[i][k].pause_debut_new;
            var endOtherPause = this.isEmpty(this.missionPauses[i][k].pause_fin_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_fin_temp) : this.missionPauses[i][k].pause_fin_new;
            if ((+newHour <= +startOtherPause && startOtherPause != "") || (+newHour <= +endOtherPause && endOtherPause != "")) {
              this.addAlert("danger", "L'heure de fin de travail doit être supérieure aux heures de pauses.");
              return false;
            }
          }
        }
      }
    }
    return true;
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
    this.initHours();
    jQuery('#modal-modify-schedule').modal('hide');
  }
}
