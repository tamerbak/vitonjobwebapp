import {Component} from '@angular/core';
import {AlertComponent} from 'ng2-bootstrap/components/alert';

import {SharedService} from "../../../providers/shared.service";
import {MissionService} from "../../../providers/mission-service";
import {FinanceService} from "../../../providers/finance.service";

import {DateConverter} from '../../../pipes/date-converter/date-converter';
import {TimeConverter} from '../../../pipes/time-converter/time-converter';

declare var jQuery: any;

@Component({
  selector: '[modal-component]',
  template: require('./modal-component.html'),
  providers: [SharedService, MissionService, FinanceService],
  directives: [AlertComponent],
  pipes: [DateConverter, TimeConverter]
})
export class ModalComponent {
  // TODO Set dynamically
  projectTarget: string = 'employer';
  isEmployer: boolean;
  themeColor: string;

  contract: any;
  missionDetailsTitle: string;

  missionIndex: number;
  missionDayIndex: number;
  missionTimeIsFirst: boolean;
  missionTimeIsStart: boolean;

  //records of user_heure_mission of a contract
  missionHours = [];
  initialMissionHours = [];

  isNewMission = true;
  contractSigned = false;

  store: Storage;
  invoiceReady: boolean = false;

  rating: number = 0;
  starsText: string = '';
  db: Storage;

  optionMission: string;
  backgroundImage: string;

  enterpriseName: string = "--";
  jobyerName: string = "--";
  currentUser: any;

  /*
   *   Invoice management
   */
  invoiceId: number;
  isInvoiceAvailable: boolean = false;
  isReleveAvailable: boolean = false;


  scheduleStartStatus: string = '-1';
  scheduleEndStatus: string = '-1';

  missionPauses = [];
  alerts: Array<Object>;
  hideLoader: boolean = true;
  indexArray = [];

  constructor(private sharedService: SharedService,
              private missionService: MissionService,
              private financeService: FinanceService) {
    this.currentUser = this.sharedService.getCurrentUser();
    this.isEmployer = this.currentUser.estEmployeur;
    this.projectTarget = (this.currentUser.estEmployeur ? 'employer' : 'jobyer');

    //get missions
    this.contract = this.sharedService.getCurrentMission();

    //verify if the mission has already pauses
    this.refreshGraphicalData();

    var forPointing = this.contract.option_mission != "1.0" ? true : false;
    this.missionService.listMissionHours(this.contract, forPointing).then(
      (data: any) => {
        if (data.data) {
          this.initialMissionHours = data.data;
          //initiate pauses array
          var array = this.missionService.constructMissionHoursArray(this.initialMissionHours);
          this.missionHours = array[0];
          this.missionPauses = array[1];
          //prepare the mission pauses array to display
          for(let i = 0; i < this.missionHours.length; i++){
            let day = this.missionHours[i];
            this.missionHours[i].heure_debut_temp = (this.isEmpty(day.heure_debut_new) ? day.heure_debut : this.missionService.convertToFormattedHour(day.heure_debut_new));
            this.missionHours[i].heure_fin_temp = (this.isEmpty(day.heure_fin_new) ? day.heure_fin : this.missionService.convertToFormattedHour(day.heure_fin_new));
            if(this.missionPauses[i] && this.missionPauses[i].length != 0) {
              for (let j = 0; j < this.missionPauses[i].length; j++) {
                let pause = this.missionPauses[i][j];
                this.missionPauses[i][j].pause_debut_temp = (this.isEmpty(pause.pause_debut_new) ? pause.pause_debut : this.missionService.convertToFormattedHour(pause.pause_debut_new));
                this.missionPauses[i][j].pause_fin_temp = (this.isEmpty(pause.pause_fin_new) ? pause.pause_fin : this.missionService.convertToFormattedHour(pause.pause_fin_new));
              }
            }
          }
        }
      });

    this.missionService.getCosignersNames(this.contract).then(
      (data: any) => {
        if (data.data) {
          let cosigners = data.data[0];
          this.enterpriseName = cosigners.enterprise;
          this.jobyerName = cosigners.jobyer;
        }
      });

    if (this.contract.numero_de_facture && this.contract.numero_de_facture != 'null')
      this.invoiceReady = true;


    // TODO
    //  Getting contract score
    // this.notationService.loadContractNotation(this.contract, this.projectTarget).then(
    //   (score: any) => {
    //     this.rating = score;
    //     this.starsText = this.writeStars(this.rating);
    //   });

    console.log(JSON.stringify(this.contract));
    this.financeService.checkInvoice(this.contract.pk_user_contrat).then(
      (invoice: any) => {
        if (invoice) {
          this.invoiceId = invoice.pk_user_facture_voj;

          if (this.projectTarget == 'employer')
            this.isReleveAvailable = invoice.releve_signe_employeur == 'Non';
          else
            this.isReleveAvailable = invoice.releve_signe_jobyer == 'Non';

          this.isInvoiceAvailable = invoice.facture_signee == 'Non' && this.projectTarget == 'employer';
        }
      });
  }

  watchInput(i, j, isStartMission, isStartPause){
    var indexObj = {missionHourIndex:i, pauseIndex:j, isStartMission: isStartMission, isStartPause: isStartPause};
    if(this.indexArray.length == 0) {
      this.indexArray.push(indexObj);
      return;
    }
    let isFound = false;
    for(let k = 0; k < this.indexArray.length; k++) {
      let indexObjTemp = this.indexArray[k];
      if (indexObjTemp.missionHourIndex == indexObj.missionHourIndex && indexObjTemp.pauseIndex == indexObj.pauseIndex && indexObjTemp.isStartMission == indexObj.isStartMission && indexObjTemp.isStartPause == indexObj.isStartPause) {
        isFound = true;
      }
    }
    if(!isFound){
      this.indexArray.push(indexObj);
    }
  }

  modifyScheduledHour(){
    for(let k = 0; k < this.indexArray.length; k++){
      let i = this.indexArray[k].missionHourIndex;
      let j = this.indexArray[k].pauseIndex;
      let isStartMission = this.indexArray[k].isStartMission;
      let isStartPause = this.indexArray[k].isStartPause;

      //var isHourValid = this.isHourValid(i, j, isStartPause, isStartMission, newHour);
      //if(!isHourValid){
      //return;
      //}
      let h: number;
      let m: number;
      let id;
      if(isStartPause){
        this.missionPauses[i][j].pause_debut_new = this.missionPauses[i][j].pause_debut_temp;
        h = + this.missionPauses[i][j].pause_debut_temp.split(':')[0] * 60;
        m = + this.missionPauses[i][j].pause_debut_temp.split(':')[1];
        id = this.missionPauses[i][j].id;
      }else{
        if(j >= 0){
          this.missionPauses[i][j].pause_fin_new = this.missionPauses[i][j].pause_fin_temp;
          h = + this.missionPauses[i][j].pause_fin_temp.split(':')[0] * 60;
          m = + this.missionPauses[i][j].pause_fin_temp.split(':')[1];
          id = this.missionPauses[i][j].id;
        }
      }
      if(isStartMission){
        this.missionHours[i].heure_debut_new = this.missionHours[i].heure_debut_temp;
        h = + this.missionHours[i].heure_debut_temp.split(':')[0] * 60;
        m = + this.missionHours[i].heure_debut_temp.split(':')[1];
        id = this.missionHours[i].id;
      }else{
        if(!j && j != 0){
          this.missionHours[i].heure_fin_new = this.missionHours[i].heure_fin_temp;
          h = + this.missionHours[i].heure_fin_temp.split(':')[0] * 60;
          m = + this.missionHours[i].heure_fin_temp.split(':')[1];
          id = this.missionHours[i].id;
        }
      }
      let newHour = h + m;
      this.missionService.saveNewHour(i, j, isStartMission, isStartPause, id, newHour).then((data) => {
        close();
      });
    }
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


  refreshGraphicalData() {
    this.isNewMission = this.contract.vu.toUpperCase() == 'Oui'.toUpperCase() ? false : true;
  }

  close(): void {
    jQuery('#my-modal18-content').modal('hide');
    this.hideLoader = true;

  }
}
