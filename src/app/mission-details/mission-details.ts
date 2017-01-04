import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {AlertComponent} from 'ng2-bootstrap/components/alert';

import {GlobalConfigs} from "../../configurations/globalConfigs";

import {SharedService} from "../../providers/shared.service";
import {MissionService} from "../../providers/mission-service";
import {FinanceService} from "../../providers/finance.service";
import {ContractService} from "../../providers/contract-service";

import {DateConverter} from "../../pipes/date-converter/date-converter";
import {TimeConverter} from "../../pipes/time-converter/time-converter";

import {ModalModifySchedule} from "./modal-modify-schedule/modal-modify-schedule";
import {ModalInfo} from "../modal-info/modal-info";
import {Utils} from "../utils/utils";
import {ModalOptions} from "../modal-options/modal-options";

declare var Messenger: any;
declare var jQuery: any;

@Component({
  selector: '[mission-details]',
  template: require('./mission-details.html'),
  styles: [require('./mission-details.scss')],
  pipes: [DateConverter, TimeConverter],
  providers: [ContractService, SharedService, MissionService, FinanceService, GlobalConfigs],
  directives: [ROUTER_DIRECTIVES, AlertComponent, ModalModifySchedule, ModalInfo, ModalOptions]
})
export class MissionDetails{
// TODO Set dynamically
  projectTarget: string = 'employer';
  isEmployer: boolean;
  themeColor: string;

  contract: any;

  //records of user_heure_mission of a contract
  missionHours = [];
  initialMissionHours = [];

  isNewMission = true;
  invoiceReady: boolean = false;

  optionMission: string;

  enterpriseName: string = "--";
  jobyerName: string = "--";
  currentUser: any;

  /*
   *   Invoice management
   */
  invoiceId: number;
  isInvoiceAvailable: boolean = false;
  isReleveAvailable: boolean = false;

  missionPauses = [];
  alerts: Array<Object>;

  //end mission
  endMissionMsg: string;
  /*
   * PREREQUIS
   */
  prerequisObligatoires : any = [];

  isSignContractClicked: boolean = false;

  modalParams: any = {type: '', message: ''};

  constructor(private sharedService: SharedService,
              private missionService: MissionService,
              private financeService: FinanceService,
              private router: Router) {

    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
      return;
    } else {
      this.isEmployer = this.currentUser.estEmployeur;
      this.projectTarget = (this.currentUser.estRecruteur ? 'employer' : (this.currentUser.estEmployeur ? 'employer' : 'jobyer'));

      //get missions
      this.contract = this.sharedService.getCurrentMission();

      this.refreshGraphicalData();

      /*
       * Prerequis
       */
      if(this.isNewMission){
        this.missionService.getPrerequisObligatoires(this.contract.pk_user_contrat).then(data=>{
          this.prerequisObligatoires = data;
        });
      } else {
        this.prerequisObligatoires = [];
      }

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
            for (let i = 0; i < this.missionHours.length; i++) {
              let day = this.missionHours[i];
              this.missionHours[i].heure_debut_temp = (Utils.isEmpty(day.heure_debut_new) ? this.missionService.convertToFormattedHour(day.heure_debut) : this.missionService.convertToFormattedHour(day.heure_debut_new));
              this.missionHours[i].heure_fin_temp = (Utils.isEmpty(day.heure_fin_new) ? this.missionService.convertToFormattedHour(day.heure_fin) : this.missionService.convertToFormattedHour(day.heure_fin_new));
              if (this.missionPauses[i] && this.missionPauses[i].length != 0) {
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

      this.getOptionMission();

      // TODO
      //  Getting contract score
      // this.notationService.loadContractNotation(this.contract, this.projectTarget).then(
      //   (score: any) => {
      //     this.rating = score;
      //     this.starsText = this.writeStars(this.rating);
      //   });

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
    /*for (var i = 0; i < this.missionHours.length; i++) {
      if (this.missionPauses[i]) {
        for (var j = 0; j < this.missionPauses[i].length; j++) {
          //verify if there are empty pause hours
          if (Utils.isEmpty(this.missionPauses[i][j].pause_debut_temp) || Utils.isEmpty(this.missionPauses[i][j].pause_fin_temp)) {
            this.addAlert("warning", "Veuillez renseigner toutes les heures de pauses avant de valider.");
            return;
          } else {
            //verify if pause hours are valid
            if (!this.isHourValid(i, j, true, false, this.missionService.convertHoursToMinutes(this.missionPauses[i][j].pause_debut_temp)))
              return;
            if (!this.isHourValid(i, j, false, false, this.missionService.convertHoursToMinutes(this.missionPauses[i][j].pause_fin_temp)))
              return;
          }
        }
      }
    }

    this.missionService.addPauses(this.missionHours, this.missionPauses, this.contract.pk_user_contrat).then((data: any) => {
      if (!data || data.status == "failure") {
        this.addAlert("danger", "Erreur lors de l'enregistrement des données");
        return;
      } else {
        // data saved
        this.addAlert("success", "Vos données ont été bien enregistrées");
        // Update contract status
        this.contract.vu = 'Oui';
        var message = "Horaire du contrat numéro : " + this.contract.numero + " validé";
        //this.sendInfoBySMS(message, "toJobyer");
        if (this.contract.option_mission != "1.0") {
          //this.missionService.schedulePointeuse(this.contract, this.missionHours, this.missionPauses);
        }
      }
    });*/
    this.missionService.setContratToVu(this.contract.pk_user_contrat).then((data: any) => {
      if (!data || data.status == "failure") {
        this.addAlert("danger", "Erreur lors de l'enregistrement des données");
        return;
      } else {
        // data saved
        this.addAlert("success", "Vos données ont été bien enregistrées");
        // Update contract status
        this.contract.vu = 'Oui';
        var message = "Horaire du contrat numéro : " + this.contract.numero + " validé";
        //this.sendInfoBySMS(message, "toJobyer");
        if (this.contract.option_mission != "1.0") {
          //this.missionService.schedulePointeuse(this.contract, this.missionHours, this.missionPauses);
        }
      }
    });
    this.navigationPreviousPage();
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

  generateTimesheet() {
    this.missionService.saveCorrectedMissions(
      this.contract.pk_user_contrat, this.missionHours, this.missionPauses
    ).then((data: any) => {
      if (data && data.status == "success") {
        console.log("timesheet saved");
        var message = "Le relevé d'heure du contrat numéro : " + this.contract.numero + "vous a été envoyé";
        var objectifNotif = "MissionDetailsPage";
        this.sendInfoBySMS(message, "toJobyer");

        // Return to the list
        this.navigationPreviousPage();
      }
    });
  }

  signSchedule() {
    this.missionService.signSchedule(this.contract).then((data: any) => {
      if (!data || data.status == "failure") {
        this.addAlert("danger", "Erreur lors de l'enregistrement des données");
        return;
      } else {
        // data saved
        if (this.contract.option_mission == "2.0" && !this.isEmployer) {
          var message = "Le relevé d'heure du contrat numéro " + this.contract.numero + " a été signé.";
          this.sendInfoBySMS(message, "toEmployer");
        }
      }
    });

// Return to the list
    this.navigationPreviousPage();
  }

  validateWork() {
    let nbWorkHours = this.missionService.calculateNbWorkHours(this.missionHours);
    this.missionService.saveEndMission(this.contract.pk_user_contrat, nbWorkHours, this.contract.fk_user_jobyer).then(val => {
      Messenger().post({
        message: "Informations enregistrées avec succès.",
        type: 'success',
        showCloseButton: true
      });

      this.missionService.endOfMission(this.contract.pk_user_contrat).then((data: any) => {
        this.endMissionMsg = "Les détails de cette missions sont en cours de traitements, vous serez contacté par SMS une fois la facturation effectuée";
        jQuery('#modal-info').modal({
          keyboard: false,
          backdrop: 'static'
        });
        jQuery('#modal-info').modal('show');

        let idContrat = data.id;
        let idOffre = data.offerId;
        let rate = data.rate;

        this.financeService.loadInvoice(idContrat, idOffre, rate).then((invoiceData: any) => {

          let partner = GlobalConfigs.global['electronic-signature'];
          let idInvoice = invoiceData.invoiceId;

          let bean = {
            'class': (partner === 'yousign' ? 'com.vitonjob.yousign.callouts.YousignConfig' :
                (partner === 'docusign' ? 'com.vitonjob.docusign.model.DSConfig' :
                    '')
            ),
            employerFirstName : data.employerFirstName,
            employerLastName : data.employerLastName,
            employerEmail : data.employerEmail,
            employerPhone : data.employerPhone,
            jobyerFirstName : data.jobyerFirstName,
            jobyerLastName : data.jobyerLastName,
            jobyerEmail : data.jobyerEmail,
            jobyerPhone : data.jobyerPhone,
            idContract : idContrat,
            idInvoice : idInvoice,
            idDocument : idInvoice,
            environnement:'DEV'
          };
          this.missionService.signEndOfMission(bean).then(signatureData=>{
            this.financeService.checkInvoice(this.contract.pk_user_contrat).then((invoice: any)=>{
              if(invoice){
                this.invoiceId = invoice.pk_user_facture_voj;

                if(this.projectTarget == 'employer')
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
    //this.navigationPreviousPage();
  }

  resetForm() {
    var array = this.missionService.constructMissionHoursArray(this.initialMissionHours);
    this.missionHours = array[0];
    this.missionPauses = array[1];
  }

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
  }

  colorHour(i, j, isStartMission, isStartPause, isAccepted) {
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

  /**
   * Call the hours record signature page
   */
  eomReleve() {
    this.sharedService.setCurrentInvoice(this.invoiceId);
    this.router.navigate(['contract/hours-record']);
  }

  /**
   * Call the invoice signature page
   */
  eomInvoice() {
    this.sharedService.setCurrentInvoice(this.invoiceId);
    this.router.navigate(['contract/invoice']);
  }

  getOptionMission() {
    if (this.isEmpty(this.contract.option_mission)) {
      this.optionMission = "Mode de suivi de mission n°1";
      this.contract.option_mission = "1.0";
    } else {
      this.optionMission = "Mode de suivi de mission n°" + this.contract.option_mission.substring(0, 1);
    }
  }

  launchContractModal() {
    //debugger;
    //jQuery('#modal-contract').modal('show');
    //Create to Iframe to show the contract in the modal
    this.isSignContractClicked = true;
    let iframe = document.createElement('iframe');
    iframe.frameBorder = "0";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.id = "docuSign";
    iframe.style.overflow = "hidden";
    iframe.style.height = "100%";
    iframe.style.width = "100%";
    iframe.setAttribute("src", this.contract.lien_jobyer);
    //iframe.setAttribute("src", "https://demo.docusign.net/Signing/startinsession.aspx?t=fbfcf9f4-4188-4e94-8f64-641c2f16b653");

    document.getElementById("iframPlaceHolder").appendChild(iframe);

  }

  openModifyScheduleModal() {
    jQuery('#modal-modify-schedule').modal({
      keyboard: false,
      backdrop: 'static'
    });
    jQuery('#modal-modify-schedule').modal('show');
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
    this.router.navigate(['mission/list']);
  }

  removeMission() {
    if (this.canRemoveMission() == false) {
      // Validation modal
      this.modalParams.type = "mission.delete";
      this.modalParams.message = "Êtes-vous sûr de vouloir annuler la mission " + '"' + this.contract.titre + '"' + " ?";
      this.modalParams.btnTitle = "Annuler la mission";
      this.modalParams.btnClasses = "btn btn-danger";
      this.modalParams.modalTitle = "Annulation de la mission";
      jQuery("#modal-options").modal('show');

    }
  }

  canRemoveMission() {
    // Check to at least on contract is not signed
    return (this.contract.signature_employeur.toUpperCase() == "OUI"
      && this.contract.signature_jobyer.toUpperCase() == "OUI");
  }

  disableAllUI() {
    return this.contract.annule_par != 'null';
  }

  isCanceled() {
    return Utils.isEmpty(this.contract.annule_par) == false;
  }
}
