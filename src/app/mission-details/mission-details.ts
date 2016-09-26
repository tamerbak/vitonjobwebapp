import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, ActivatedRoute} from '@angular/router';
import {AlertComponent} from 'ng2-bootstrap/components/alert';
import {BUTTON_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {NKDatetime} from 'ng2-datetime/ng2-datetime';

import {GlobalConfigs} from "../../configurations/globalConfigs";

import {SharedService} from "../../providers/shared.service";
import {MissionService} from "../../providers/mission-service";
import {FinanceService} from "../../providers/finance.service";
import {ContractService} from "../../providers/contract-service";

import {DateConverter} from "../../pipes/date-converter/date-converter";
import {TimeConverter} from "../../pipes/time-converter/time-converter";

import {ModalComponent} from "./modal-component/modal-component";

declare var Messenger:any;


@Component({
  selector: '[mission-details]',
  template: require('./mission-details.html'),
  styles: [require('./mission-details.scss')],
  pipes: [DateConverter, TimeConverter],
  providers: [ContractService, SharedService, MissionService, FinanceService, GlobalConfigs],
  directives: [ROUTER_DIRECTIVES, AlertComponent, NKDatetime, BUTTON_DIRECTIVES, ModalComponent],
})
export class MissionDetails {
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

  pointingClassSwitch = {'non': 'success', 'oui': 'danger'};

  constructor(private route: ActivatedRoute,
              private sharedService: SharedService,
              private missionService: MissionService,
              private financeService: FinanceService,
              private router: Router) {

















    this.currentUser = this.sharedService.getCurrentUser();
    if(!this.currentUser){
      this.router.navigate(['app/dashboard']);

    }else{
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
              for(let j = 0; j < this.missionPauses[i].length; j++){
                let pause = this.missionPauses[i][j];
                this.missionPauses[i][j].pause_debut_temp = (this.isEmpty(pause.pause_debut_new) ? pause.pause_debut : this.missionService.convertToFormattedHour(pause.pause_debut_new));
                this.missionPauses[i][j].pause_fin_temp = (this.isEmpty(pause.pause_fin_new) ? pause.pause_fin : this.missionService.convertToFormattedHour(pause.pause_fin_new));
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

      this.getOptionMission();

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
  }

  addPause(dayIndex) {

    if (!this.isNewMission || !this.isEmployer || this.contract.signature_jobyer.toUpperCase() == 'Non'.toUpperCase()) {
      return;
    }












    if (!this.missionPauses[dayIndex]) {
      this.missionPauses[dayIndex] = [{}];













    } else {
      this.missionPauses[dayIndex].push([{}]);
    }








































  }


  deletePause(dayIndex, pauseIndex) {

    if (!this.isNewMission || !this.isEmployer) {
      return;
    }
    this.missionPauses[dayIndex].splice(pauseIndex, 1);

  }

  validatePauses() {
//verify if there are empty pause hours
    for (var i = 0; i < this.missionHours.length; i++) {
      if (this.missionPauses[i]) {
        for (var j = 0; j < this.missionPauses[i].length; j++) {
          if (this.isEmpty(this.missionPauses[i][j].pause_debut_temp) || this.isEmpty(this.missionPauses[i][j].pause_fin_temp)) {

            this.addAlert("warning", "Veuillez renseigner toutes les heures de pauses avant de valider.");
            return;
          }
        }
      }
    }

    this.missionService.addPauses(this.missionHours, this.missionPauses, this.contract.pk_user_contrat).then((data: any) => {
      if (!data || data.status == "failure") {


        this.addAlert("danger", "Erreur lors de la sauvegarde des données");
        return;
      } else {
// data saved



        this.addAlert("success", "Vos données ont été bien sauvegardées");
// Update contract status
        this.contract.vu = 'Oui';


        var message = "Horaire du contrat n°" + this.contract.numero + " validé";


//this.sendInfoBySMS(message, "toJobyer");
        if (this.contract.option_mission != "1.0") {
//this.missionService.schedulePointeuse(this.contract, this.missionHours, this.missionPauses);
        }
      }
    });
//this.navigationPreviousPage();
  }

  sendPushNotification(message, objectifNotif, who) {
    var id = (who == "toJobyer" ? this.contract.fk_user_jobyer : this.contract.fk_user_entreprise);
// this.pushNotificationService.getToken(id, who).then(token => {
//   this.pushNotificationService.sendPushNotification(token, message, this.contract, objectifNotif).then(data => {
//     this.globalService.showAlertValidation("VitOnJob", "Notification envoyée.");
//   });
// });
  }

  sendInfoBySMS(message, who) {
    if (who == "toJobyer") {
      this.missionService.getTelByJobyer(this.contract.fk_user_jobyer).then((data: any) => {
        this.missionService.sendInfoBySMS(data.data[0]["telephone"], message);
      });
    } else {
      this.missionService.getTelByEmployer(this.contract.fk_user_entreprise).then((data: any) => {
        this.missionService.sendInfoBySMS(data.data[0]["telephone"], message);
      });
    }
  }

// checkPauseHours(i, j, isStartPause, isStartMission) {
//   var startMission = this.missionHours[i].heure_debut;
//   var endMission = this.missionHours[i].heure_fin;
//   if (j >= 0) {
//     var startPause = this.missionService.convertHoursToMinutes(this.missionPauses[i][j].pause_debut);
//     var endPause = this.missionService.convertHoursToMinutes(this.missionPauses[i][j].pause_fin);
//   }
//
//   if (isStartPause) {
//     if (startMission >= startPause) {
//       this.missionPauses[i][j].pause_debut = "";
//       this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être supérieure à l'heure de début de travail.");
//       return;
//     }
//     if (endMission <= startPause) {
//       this.missionPauses[i][j].pause_debut = "";
//       this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être inférieure à l'heure de fin de travail.");
//       return;
//     }
//     if (endPause <= startPause && endPause != "") {
//       this.missionPauses[i][j].pause_debut = "";
//       this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être inférieure à l'heure de fin de pause.");
//       return;
//     }
//     for (var k = 0; k < this.missionPauses[i].length; k++) {
//       var startOtherPause = this.missionPauses[i][k].pause_debut;
//       var endOtherPause = this.missionPauses[i][k].pause_fin;
//       if (j < k && ((startPause >= startOtherPause && startOtherPause != "") || (startPause >= endOtherPause && endOtherPause != ""))) {
//         this.missionPauses[i][j].pause_debut = "";
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être inférieure aux heures de pauses postérieurs.");
//         return;
//       }
//       if (j > k && ((startPause <= startOtherPause && startOtherPause != "") || (startPause <= endOtherPause && endOtherPause != ""))) {
//         this.missionPauses[i][j].pause_debut = "";
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être supérieure aux heures de pauses antérieurs.");
//         return;
//       }
//     }
//   } else {
//     if (j >= 0) {
//       if (startMission >= endPause && startMission != "") {
//         this.missionPauses[i][j].pause_fin = "";
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être supérieure à l'heure de début de travail.");
//         return;
//       }
//       if (endMission <= endPause && endMission != "") {
//         this.missionPauses[i][j].pause_fin = "";
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être inférieure à l'heure de fin de travail.");
//         return;
//       }
//       if (endPause <= startPause && startPause != "") {
//         this.missionPauses[i][j].pause_fin = "";
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être supérieure à l'heure de début de pause.");
//         return;
//       }
//       for (var k = 0; k < this.missionPauses[i].length; k++) {
//         var startOtherPause = this.missionPauses[i][k].pause_debut;
//         var endOtherPause = this.missionPauses[i][k].pause_fin;
//         if (j < k && ((endPause >= startOtherPause && startOtherPause != "") || (endPause >= endOtherPause && endOtherPause != ""))) {
//           this.missionPauses[i][j].pause_fin = "";
//           this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être inférieure aux heures de pauses postérieurs.");
//           return;
//         }
//         if (j > k && ((endPause <= startOtherPause && startOtherPause != "") || (endPause <= endOtherPause && endOtherPause != ""))) {
//           this.missionPauses[i][j].pause_fin = "";
//           this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être supérieure aux heures de pauses antérieurs.");
//           return;
//         }
//       }
//     }
//   }
// }
//
// checkPointedHours(i, j, isStartPause, isStartMission) {
//   var startMission = this.missionHours[i].heure_debut_pointe;
//   var endMission = this.missionHours[i].heure_fin_pointe;
//   if (j >= 0) {
//     var startPause = this.missionPauses[i][j].pause_debut_pointe;
//     var endPause = this.missionPauses[i][j].pause_fin_pointe;
//   }
//
//   if (isStartPause) {
//     if (startMission >= startPause && startMission != "") {
//       this.missionPauses[i][j].pause_debut_pointe = "";
//       this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être supérieure à l'heure de début de travail.");
//       return;
//     }
//     if (endMission <= startPause && endMission != "") {
//       this.missionPauses[i][j].pause_debut_pointe = "";
//       this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être inférieure à l'heure de fin de travail.");
//       return;
//     }
//     if (endPause <= startPause && endPause != "") {
//       this.missionPauses[i][j].pause_debut_pointe = "";
//       this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être inférieure à l'heure de fin de pause.");
//       return;
//     }
//     for (var k = 0; k < this.missionPauses[i].length; k++) {
//       var startOtherPause = this.missionPauses[i][k].pause_debut_pointe;
//       var endOtherPause = this.missionPauses[i][k].pause_fin_pointe;
//       if (j < k && ((startPause >= startOtherPause && startOtherPause != "") || (startPause >= endOtherPause && endOtherPause != ""))) {
//         this.missionPauses[i][j].pause_debut_pointe = "";
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être inférieure aux heures de pauses postérieurs.");
//         return;
//       }
//       if (j > k && ((startPause <= startOtherPause && startOtherPause != "") || (startPause <= endOtherPause && endOtherPause != ""))) {
//         this.missionPauses[i][j].pause_debut_pointe = "";
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être supérieure aux heures de pauses antérieurs.");
//         return;
//       }
//     }
//   } else {
//     if (j >= 0) {
//       if (startMission >= endPause && startMission != "") {
//         this.missionPauses[i][j].pause_fin_pointe = "";
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être supérieure à l'heure de début de travail.");
//         return;
//       }
//       if (endMission <= endPause && endMission != "") {
//         this.missionPauses[i][j].pause_fin_pointe = "";
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être inférieure à l'heure de fin de travail.");
//         return;
//       }
//       if (endPause <= startPause && startPause != "") {
//         this.missionPauses[i][j].pause_fin_pointe = "";
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être supérieure à l'heure de début de pause.");
//         return;
//       }
//       for (var k = 0; k < this.missionPauses[i].length; k++) {
//         var startOtherPause = this.missionPauses[i][k].pause_debut_pointe;
//         var endOtherPause = this.missionPauses[i][k].pause_fin_pointe;
//         if (j < k && ((endPause >= startOtherPause && startOtherPause != "") || (endPause >= endOtherPause && endOtherPause != ""))) {
//           this.missionPauses[i][j].pause_fin_pointe = "";
//           this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être inférieure aux heures de pauses postérieurs.");
//           return;
//         }
//         if (j > k && ((endPause <= startOtherPause && startOtherPause != "") || (endPause <= endOtherPause && endOtherPause != ""))) {
//           this.missionPauses[i][j].pause_fin_pointe = "";
//           this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être supérieure aux heures de pauses antérieurs.");
//           return;
//         }
//       }
//     }
//   }
//   if (isStartMission) {
//     if (startMission >= endMission && endMission != "") {
//       this.missionHours[i].heure_debut_pointe = "";
//       this.globalService.showAlertValidation("VitOnJob", "L'heure de début de travail doit être inférieure à l'heure de fin de travail.");
//       return;
//     }
//     for (var k = 0; k < this.missionPauses[i].length; k++) {
//       var startOtherPause = this.missionPauses[i][k].pause_debut_pointe;
//       var endOtherPause = this.missionPauses[i][k].pause_fin_pointe;
//       if ((startMission >= startOtherPause && startOtherPause != "") || (startMission >= endOtherPause && endOtherPause != "")) {
//         this.missionHours[i].heure_debut_pointe = "";
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de début de travail doit être inférieure aux heures de pauses.");
//         return;
//       }
//     }
//   } else {
//     if ((!j && j != 0) || j < 0) {
//       if (startMission >= endMission && startMission != "") {
//         this.missionHours[i].heure_fin_pointe = "";
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de travail doit être supérieure à l'heure de début de travail.");
//         return;
//       }
//       for (var k = 0; k < this.missionPauses[i].length; k++) {
//         var startOtherPause = this.missionPauses[i][k].pause_debut_pointe;
//         var endOtherPause = this.missionPauses[i][k].pause_fin_pointe;
//         if ((endMission <= startOtherPause && startOtherPause != "") || (endMission <= endOtherPause && endOtherPause != "")) {
//           this.missionHours[i].heure_fin_pointe = "";
//           this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de travail doit être supérieure aux heures de pauses.");
//           return;
//         }
//       }
//     }
//   }
// }
//
// isHourValid(i, j, isStartPause, isStartMission, newHour) {
//   var startMission = this.isEmpty(this.missionHours[i].heure_debut_new) ? this.missionHours[i].heure_debut : this.missionHours[i].heure_debut_new;
//   var endMission = this.isEmpty(this.missionHours[i].heure_fin_new) ? this.missionHours[i].heure_fin : this.missionHours[i].heure_fin_new;
//   if (j >= 0) {
//     var startPause = this.isEmpty(this.missionPauses[i][j].pause_debut_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][j].pause_debut) : this.missionPauses[i][j].pause_debut_new;
//     var endPause = this.isEmpty(this.missionPauses[i][j].pause_fin_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][j].pause_fin) : this.missionPauses[i][j].pause_fin_new;
//   }
//
//   if (isStartPause) {
//     if (startMission >= newHour && startMission != "") {
//       this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être supérieure à l'heure de début de travail.");
//       return false;
//     }
//     if (endMission <= newHour && endMission != "") {
//       this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être inférieure à l'heure de fin de travail.");
//       return false;
//     }
//     if (endPause <= newHour && endPause != "") {
//       this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être inférieure à l'heure de fin de pause.");
//       return false;
//     }
//     for (var k = 0; k < this.missionPauses[i].length; k++) {
//       var startOtherPause = this.isEmpty(this.missionPauses[i][k].pause_debut_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_debut) : this.missionPauses[i][k].pause_debut_new;
//       var endOtherPause = this.isEmpty(this.missionPauses[i][k].pause_fin_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_fin) : this.missionPauses[i][k].pause_fin_new;
//       if (j < k && ((newHour >= startOtherPause && startOtherPause != "") || (newHour >= endOtherPause && endOtherPause != ""))) {
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être inférieure aux heures de pauses postérieurs.");
//         return false;
//       }
//       if (j > k && ((newHour <= startOtherPause && startOtherPause != "") || (newHour <= endOtherPause && endOtherPause != ""))) {
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de début de pause doit être supérieure aux heures de pauses antérieurs.");
//         return false;
//       }
//     }
//   } else {
//     if (j >= 0) {
//       if (startMission >= newHour && startMission != "") {
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être supérieure à l'heure de début de travail.");
//         return false;
//       }
//       if (endMission <= newHour && endMission != "") {
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être inférieure à l'heure de fin de travail.");
//         return false;
//       }
//       if (newHour <= startPause && startPause != "") {
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être supérieure à l'heure de début de pause.");
//         return false;
//       }
//       for (var k = 0; k < this.missionPauses[i].length; k++) {
//         var startOtherPause = this.isEmpty(this.missionPauses[i][k].pause_debut_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_debut) : this.missionPauses[i][k].pause_debut_new;
//         var endOtherPause = this.isEmpty(this.missionPauses[i][k].pause_fin_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_fin) : this.missionPauses[i][k].pause_fin_new;
//         if (j < k && ((newHour >= startOtherPause && startOtherPause != "") || (newHour >= endOtherPause && endOtherPause != ""))) {
//           this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être inférieure aux heures de pauses postérieurs.");
//           return false;
//         }
//         if (j > k && ((newHour <= startOtherPause && startOtherPause != "") || (newHour <= endOtherPause && endOtherPause != ""))) {
//           this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de pause doit être supérieure aux heures de pauses antérieurs.");
//           return false;
//         }
//       }
//     }
//   }
//
//   if (isStartMission) {
//     if (newHour >= endMission && endMission != "") {
//       this.globalService.showAlertValidation("VitOnJob", "L'heure de début de travail doit être inférieure à l'heure de fin de travail.");
//       return false;
//     }
//     if (this.missionPauses[i]) {
//       for (var k = 0; k < this.missionPauses[i].length; k++) {
//         var startOtherPause = this.isEmpty(this.missionPauses[i][k].pause_debut_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_debut) : this.missionPauses[i][k].pause_debut_new;
//         var endOtherPause = this.isEmpty(this.missionPauses[i][k].pause_fin_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_fin) : this.missionPauses[i][k].pause_fin_new;
//         if ((newHour >= startOtherPause && startOtherPause != "") || (newHour >= endOtherPause && endOtherPause != "")) {
//           this.globalService.showAlertValidation("VitOnJob", "L'heure de début de travail doit être inférieure aux heures de pauses.");
//           return false;
//         }
//       }
//     }
//   } else {
//     if ((!j && j != 0) || j < 0) {
//       if (startMission >= newHour && startMission != "") {
//         this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de travail doit être supérieure à l'heure de début de travail.");
//         return false;
//       }
//       if (this.missionPauses[i]) {
//         for (var k = 0; k < this.missionPauses[i].length; k++) {
//           var startOtherPause = this.isEmpty(this.missionPauses[i][k].pause_debut_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_debut) : this.missionPauses[i][k].pause_debut_new;
//           var endOtherPause = this.isEmpty(this.missionPauses[i][k].pause_fin_new) ? this.missionService.convertHoursToMinutes(this.missionPauses[i][k].pause_fin) : this.missionPauses[i][k].pause_fin_new;
//           if ((newHour <= startOtherPause && startOtherPause != "") || (newHour <= endOtherPause && endOtherPause != "")) {
//             this.globalService.showAlertValidation("VitOnJob", "L'heure de fin de travail doit être supérieure aux heures de pauses.");
//             return false;
//           }
//         }
//       }
//     }
//   }
//   return true;
// }
//
// saveCorrectedHours(i, j, isStartPause, isStartMission) {
//   if (isStartPause) {
//     this.missionPauses[i][j].pause_debut_corrigee = this.missionPauses[i][j].pause_debut_pointe;
//     this.missionPauses[i][j].is_pause_debut_corrigee = 'oui';
//     return;
//   } else {
//     if (j >= 0) {
//       this.missionPauses[i][j].pause_fin_corrigee = this.missionPauses[i][j].pause_fin_pointe;
//       this.missionPauses[i][j].is_pause_fin_corrigee = 'oui';
//       return;
//     }
//   }
//   if (isStartMission) {
//     this.missionHours[i].heure_debut_corrigee = this.missionHours[i].heure_debut_pointe;
//     this.missionHours[i].is_heure_debut_corrigee = 'oui';
//     return;
//   } else {
//     if (!j && j != 0) {
//       this.missionHours[i].heure_fin_corrigee = this.missionHours[i].heure_fin_pointe;
//       this.missionHours[i].is_heure_fin_corrigee = 'oui';
//       return;
//     }
//   }
// }
//
// checkHour(i, j, isStartPause, pointing, isStartMission) {
//   if (pointing) {
//     //after checking hour validity, save corrected hours
//     this.checkPointedHours(i, j, isStartPause, isStartMission);
//     this.saveCorrectedHours(i, j, isStartPause, isStartMission);
//   } else {
//     this.checkPauseHours(i, j, isStartPause, isStartMission);
//   }
// }
//
  generateTimesheet() {
    this.missionService.saveCorrectedMissions(
      this.contract.pk_user_contrat, this.missionHours, this.missionPauses
    ).then((data: any) => {
      if (data && data.status == "success") {
        console.log("timesheet saved");
        var message = "Vous avez reçu le relevé d'heure du contrat n°" + this.contract.numero;
        var objectifNotif = "MissionDetailsPage";
        this.sendPushNotification(message, objectifNotif, "toJobyer");
        this.sendInfoBySMS(message, "toJobyer");

// Return to the list
        this.navigationPreviousPage();
      }
    });
  }

  signSchedule() {

    this.missionService.signSchedule(this.contract).then((data: any) => {
      if (!data || data.status == "failure") {
        console.log(data.error);
// TODO : loading.dismiss();
// TODO : this.globalService.showAlertValidation("VitOnJob", "Erreur lors de la sauvegarde des données");
        return;
      } else {
// data saved
        console.log("schedule signed : " + data.status);
        if (this.contract.option_mission == "2.0" && !this.isEmployer) {
          var message = "Le relevé d'heure du contrat n° " + this.contract.numero + " a été signé.";
          var objectifNotif = "MissionDetailsPage";
          this.sendPushNotification(message, objectifNotif, "toEmployer");
          this.sendInfoBySMS(message, "toEmployer");
        }
      }
    });

// Return to the list
    this.navigationPreviousPage();
  }

// displaySignAlert() {
//   let confirm = Alert.create({
//     title: "VitOnJob",
//     message: "Signature fin de mission",
//     buttons: [
//       {
//         text: 'Annuler',
//         handler: () => {
//           console.log('No clicked');
//         }
//       },
//       {
//         text: 'Signer',
//         handler: () => {
//           console.log('Yes clicked');
//           confirm.dismiss().then(() => {
//             this.signSchedule();
//           })
//         }
//       }
//     ]
//   });
//   this.nav.present(confirm);
// }

  validateWork() {
    /*this.store.set('CONTRACT_INVOICE', JSON.stringify(this.contract)).then(data => {
     this.nav.push(ModalInvoicePage);
     });
     */
    this.missionService.saveEndMission(this.contract.pk_user_contrat).then(val => {
      Messenger().post({
        message: "Informations enregistrées avec succès.",
        type: 'success',
        showCloseButton: true
      });
      this.missionService.endOfMission(this.contract.pk_user_contrat).then((data: any) => {
// debugger;

// TODO
// let confirm = Alert.create({
//   title: "VitOnJob",
//   message: "Les détails de cette missions sont en cours de traitements, vous serez contacté par SMS une fois la facturation effectuée",
//   buttons: [
//     {
//       text: 'OK',
//       handler: () => {
//         console.log('No clicked');
//       }
//     }
//   ]
// });
// this.nav.present(confirm);


        let idContrat = data.id;
        let idOffre = data.offerId;
        let rate = data.rate;
// debugger;
        this.financeService.loadInvoice(idContrat, idOffre, rate).then((invoiceData: any) => {
// debugger;
          let idInvoice = invoiceData.invoiceId;
          let bean = {
            "class": 'com.vitonjob.yousign.callouts.YousignConfig',
            employerFirstName: data.employerFirstName,
            employerLastName: data.employerLastName,
            employerEmail: data.employerEmail,
            employerPhone: data.employerPhone,
            jobyerFirstName: data.jobyerFirstName,
            jobyerLastName: data.jobyerLastName,
            jobyerEmail: data.jobyerEmail,
            jobyerPhone: data.jobyerPhone,
            idContract: idContrat,
            idInvoice: idInvoice
          };
          this.missionService.signEndOfMission(bean).then(signatureData=> {
// debugger;
            this.financeService.checkInvoice(this.contract.pk_user_contrat).then((invoice: any)=> {
// debugger;
              if (invoice) {
                this.invoiceId = invoice.pk_user_facture_voj;

                if (this.projectTarget == 'employer')
                  this.isReleveAvailable = invoice.releve_signe_employeur == 'Non';
                else
                  this.isReleveAvailable = invoice.releve_signe_jobyer == 'Non';

                this.isInvoiceAvailable = invoice.facture_signee == 'Non' && this.projectTarget == 'employer';
              }
            });
          });
        });

      });
    });
    this.navigationPreviousPage();
  }

  resetForm() {
//TODO Remove
    console.log('resetForm()');
    var array = this.missionService.constructMissionHoursArray(this.initialMissionHours);
    this.missionHours = array[0];
    this.missionPauses = array[1];
  }

// goBack() {
//   // TODO : this.nav.pop();
// this.navigationPreviousPage();
// }
//
// watchSignedToggle(e) {
//   let loading = Loading.create({
//     content: `
//  <div>
//  <img src='img/loading.gif' />
//  </div>
//  `,
//     spinner: 'hide',
//     duration: 10000
//   });
//   this.nav.present(loading).then(()=> {
//     this.missionService.signContract(this.contract.pk_user_contrat).then((data) => {
//       if (!data || data.status == "failure") {
//         console.log(data.error);
//         loading.dismiss();
//         this.globalService.showAlertValidation("VitOnJob", "Erreur lors de la sauvegarde des données");
//         return;
//       } else {
//         // data saved
//         console.log("contract signed : " + data.status);
//         this.contract.signature_jobyer = 'Oui';
//       }
//     });
//     if (this.contract.option_mission != "1.0") {
//       this.missionService.schedulePointeuse(this.contract, this.missionHours, this.missionPauses);
//     }
//     loading.dismiss();
//   });
// }
//
// launchContractPage() {
//   this.platform.ready().then(() => {
//     cordova.InAppBrowser.open(this.contract.lien_jobyer, "_system", "location=true");
//   });
// }

  disableTimesheetButton() {
    let disable = false;
    var k = 0;
    for (var i = 0; i < this.missionHours.length; i++) {
      var m = this.missionHours[i];
      if (!m.heure_debut_pointe || m.heure_debut_pointe == "null" || !m.heure_fin_pointe || m.heure_fin_pointe == "null") {
        disable = true;
        return disable;
      } else {
        disable = false;
      }
      if (this.missionPauses[i]) {
        for (var j = 0; j < this.missionPauses[i].length; j++) {
          if (this.missionPauses[i][j].pause_debut_pointe == "" || this.missionPauses[i][j].pause_fin_pointe == "") {
            disable = true;
            return disable;
          } else {
            disable = false;
          }
        }
      }
    }
    return disable;
  }


// changeOption() {
//   let modal = Modal.create(ModalTrackMissionPage);
//   this.nav.present(modal);
//   modal.onDismiss(selectedOption => {
//     if (selectedOption) {
//       this.missionService.updateOptionMission(selectedOption, this.contract.pk_user_contrat).then((data) => {
//         if (!data || data.status == 'failure') {
//           this.globalService.showAlertValidation("VitOnJob", "Une erreur est survenue lors de la sauvegarde des données.");
//         } else {
//           console.log("option mission saved successfully");
//           this.contract.option_mission = selectedOption;
//           this.optionMission = "Mode de suivi de mission n°" + selectedOption;
//         }
//       });
//     }
//   });
// }

  /**
   * Stars picker
   *
   setStarPicker() {

let picker = Picker.create();
let options: PickerColumnOption[] = new Array<PickerColumnOption>();
for (let i = 1; i <= 5; i++) {
options.push({
value: i,
text: this.writeStars(i)
})
}

let column = {
selectedIndex: this.rating,
options: options
};
picker.addColumn(column);
picker.addButton('Annuler');
picker.addButton({
text: 'OK',
handler: data => {
//debugger;
this.rating = data.undefined.value;
this.starsText = this.writeStars(this.rating);
this.notationService.saveContractNotation(this.contract, this.projectTarget, this.rating);
}
});
this.nav.present(picker);
}

   /**
   * writing stars
   * @param number of stars writed
   *
   writeStars(number: number): string {
let starText = '';
for (let i = 0; i < number; i++) {
starText += '\u2605'
}
return starText;
}

   presentToast(message: string, duration: number) {
let toast = Toast.create({
message: message,
duration: duration * 1000
});
this.nav.present(toast);
}

   */

  onPointedHourClick(i, j, isStartMission, isStartPause, decision) {
    if (!this.isEmployer || this.upperCase(this.contract.releve_employeur) == 'OUI') {
      return;
    }
    if (isStartPause) {
      if (!this.missionPauses[i][j].pause_debut_pointe)
        return;
    } else {
      if (j >= 0) {
        if (!this.missionPauses[i][j].pause_fin_pointe)
          return;
      }
    }
    if (isStartMission) {
      if (!this.missionHours[i].heure_debut_pointe)
        return;
    } else {
      if (!j && j != 0) {
        if (!this.missionHours[i].heure_fin_pointe)
          return;
      }
    }

    switch (decision) {
      case 'approve':
        this.colorHour(i, j, isStartMission, isStartPause, true);
        break;
      case 'decline':
        this.colorHour(i, j, isStartMission, isStartPause, false);
        break;
      default:
        console.error('Unknown pointing decision ' + decision);
    }

// TODO
// let actionSheet = ActionSheet.create({
//   title: 'Actions',
//   cssClass: 'action-sheets-basic-page',
//   buttons: [
//     {
//       text: 'Valider l\'heure pointée',
//       icon: 'thumbs-up',
//       handler: () => {
//         console.log('Validate clicked');
//         this.colorHour(i, j, isStartMission, isStartPause, true);
//       }
//     },
//     {
//       text: 'Refuser l\'heure pointée',
//       icon: 'thumbs-down',
//       handler: () => {
//         console.log('Refuse clicked');
//         this.colorHour(i, j, isStartMission, isStartPause, false);
//       }
//     },
//     {
//       text: 'Annuler',
//       role: 'cancel', // will always sort to be on the bottom
//       icon: 'close',
//       handler: () => {
//         console.log('Cancel clicked');
//       }
//     }
//   ]
// });

// TODO this.nav.present(actionSheet);
  }

  colorHour(i, j, isStartMission, isStartPause, isAccepted){
    var isCorrected = (isAccepted ? 'Non' : 'Oui');
    var id;
    if (isStartPause) {
      this.missionPauses[i][j].is_pause_debut_corrigee = isCorrected;
      id = this.missionPauses[i][j].id;
    } else {
      if (j >= 0) {
        this.missionPauses[i][j].is_pause_fin_corrigee = isCorrected;
        id = this.missionPauses[i][j].id;
      }
    }
    if (isStartMission) {
      this.missionHours[i].is_heure_debut_corrigee = isCorrected;
      id = this.missionHours[i].id;
    } else {
      if (!j && j != 0) {
        this.missionHours[i].is_heure_fin_corrigee = isCorrected;
        id = this.missionHours[i].id;
      }
    }
    this.missionService.saveIsHourValid(i, j, isStartMission, isStartPause, isCorrected, id).then((data) => {
      console.log("is hour valid saved")
    });
  }

// TODO : Pouvoir saisir un autre horaire
// onHourClick(i, j, isStartMission, isStartPause) {
//   //jobyer cant edit scheduled hours and pauses
//   if (!this.isEmployer || this.upperCase(this.contract.approuve) == 'OUI') {
//     return;
//   }
//   //if schedule not yet validated
//   if (this.upperCase(this.contract.vu) == 'NON' && (j || j == 0)) {
//     this.addPauseHour(i, j, isStartPause);
//     return;
//   }
//   //if schedule already validated
//   var initialHour;
//   var buttons = [
//     {
//       text: 'Modifier l\'heure prévue',
//       icon: 'create',
//       handler: () => {
//         console.log('Modify clicked');
//         this.modifyScheduledHour(i, j, isStartMission, isStartPause);
//       }
//     },
//     {
//       text: 'Annuler',
//       role: 'cancel', // will always sort to be on the bottom
//       icon: 'close',
//       handler: () => {
//         console.log('Cancel clicked');
//       }
//     }
//   ];
//   var eraseBtn = {
//     text: 'Effacer la modification',
//     icon: 'undo',
//     handler: () => {
//       console.log('Erase clicked');
//       actionSheet.onDismiss(() => {
//         this.undoNewHour(i, j, isStartMission, isStartPause);
//       });
//     }
//   };
//   //add erase button into the action sheet in case of : hour is not yet pointed and hour was already modified
//   if (isStartPause) {
//     if (this.missionPauses[i][j].pause_debut_pointe)
//       return;
//     if (this.missionPauses[i][j].pause_debut_new != 'null')
//       buttons.push(eraseBtn);
//     initialHour = this.missionPauses[i][j].pause_debut;
//   } else {
//     if (j >= 0) {
//       if (this.missionPauses[i][j].pause_fin_pointe)
//         return;
//       if (this.missionPauses[i][j].pause_fin_new != 'null')
//         buttons.push(eraseBtn);
//       initialHour = this.missionPauses[i][j].pause_fin;
//     }
//   }
//   if (isStartMission) {
//     if (this.missionHours[i].heure_debut_pointe)
//       return;
//     if (this.missionHours[i].heure_debut_new != 'null')
//       buttons.push(eraseBtn);
//     initialHour = this.missionService.convertToFormattedHour(this.missionHours[i].heure_debut);
//   } else {
//     if (!j && j != 0) {
//       if (this.missionHours[i].heure_fin_pointe)
//         return;
//       if (this.missionHours[i].heure_fin_new != 'null')
//         buttons.push(eraseBtn);
//       initialHour = this.missionService.convertToFormattedHour(this.missionHours[i].heure_fin);
//     }
//   }
//   //display the action sheet
//   let actionSheet = ActionSheet.create({
//     title: 'L\'heure initialement prévue : ' + initialHour,
//     cssClass: 'action-sheets-basic-page',
//     buttons: buttons
//   });
//   this.nav.present(actionSheet);
// }
//








































// undoNewHour(i, j, isStartMission, isStartPause) {
//   //get the initial hour
//   var initialHour;
//   if (isStartPause) {
//     initialHour = this.missionService.convertHoursToMinutes(this.missionPauses[i][j].pause_debut);
//   } else {
//     if (j >= 0) {
//       initialHour = this.missionService.convertHoursToMinutes(this.missionPauses[i][j].pause_fin);
//     }
//   }
//   if (isStartMission) {
//     initialHour = this.missionHours[i].heure_debut;
//   } else {
//     if (!j && j != 0) {
//       initialHour = this.missionHours[i].heure_fin;
//     }
//   }
//
//   var isHourValid = this.isHourValid(i, j, isStartPause, isStartMission, initialHour);
//   if (!isHourValid) {
//     return;
//   }
//
//   var id;
//   if (isStartPause) {
//     id = this.missionPauses[i][j].id;
//     this.missionPauses[i][j].pause_debut_new = 'null';
//   } else {
//     if (j >= 0) {
//       id = this.missionPauses[i][j].id;
//       this.missionPauses[i][j].pause_fin_new = 'null';
//     }
//   }
//   if (isStartMission) {
//     id = this.missionHours[i].id;
//     this.missionHours[i].heure_debut_new = 'null';
//   } else {
//     if (!j && j != 0) {
//       id = this.missionHours[i].id;
//       this.missionHours[i].heure_fin_new = 'null';
//     }
//   }
//   this.missionService.deleteNewHour(i, j, isStartMission, isStartPause, id).then((data) => {
//     console.log("new hour deleted")
//   });
// }
//
// addPauseHour(i, j, isStartPause) {
//   DatePicker.show({
//     date: new Date(),
//     mode: 'time',
//     minuteInterval: 15,
//     is24Hour: true,
//     allowOldDates: true, doneButtonLabel: 'Ok', cancelButtonLabel: 'Annuler', locale: 'fr_FR'
//   }).then(pauseHour => {
//       //verify if the entered pause hour is valid
//       var pauseHour = pauseHour.getHours() * 60 + pauseHour.getMinutes();
//       var isHourValid = this.isHourValid(i, j, isStartPause, false, pauseHour);
//       if (!isHourValid) {
//         return;
//       }
//       //if the pause hour is valid, take it
//       if (isStartPause) {
//         this.missionPauses[i][j].pause_debut = this.missionService.convertToFormattedHour(pauseHour);
//       } else {
//         this.missionPauses[i][j].pause_fin = this.missionService.convertToFormattedHour(pauseHour);
//       }
//     },
//     err => console.log('Error occurred while getting date: ', err)
//   );
// }

  /**
   * Call the hours record signature page
   */
  eomReleve() {
    this.sharedService.setCurrentInvoice(this.invoiceId);
    this.router.navigate(['app/contract/hours-record']);
  }

  /**
   * Call the invoice signature page
   */
  eomInvoice() {
    this.sharedService.setCurrentInvoice(this.invoiceId);
    this.router.navigate(['app/contract/invoice']);
  }

  getOptionMission() {
    if (this.isEmpty(this.contract.option_mission)) {
      this.optionMission = "Mode de suivi de mission n°1";
      this.contract.option_mission = "1.0";
    } else {
      this.optionMission = "Mode de suivi de mission n°" + this.contract.option_mission.substring(0, 1);
    }
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
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

  refreshGraphicalData() {
    this.isNewMission = this.contract.vu.toUpperCase() == 'Oui'.toUpperCase() ? false : true;
  }

  /**
   * Return to the list page in order to refresh all data
   */
  navigationPreviousPage() {
    this.router.navigate(['app/mission/list']);
  }
}
