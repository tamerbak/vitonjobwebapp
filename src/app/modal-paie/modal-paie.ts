import {Component, Input, Output, EventEmitter, SimpleChanges} from "@angular/core";
import {Utils} from "../utils/utils";
import {AlertComponent} from 'ng2-bootstrap/components/alert';
import {HeureMission} from "../../dto/heureMission";

declare let jQuery: any;

@Component({
  selector: '[modal-paie]',
  template: require('./modal-paie.html'),
  styles: [require('./modal-paie.scss')],
  directives: [AlertComponent]
})
export class ModalPaie {
  alerts: Array<Object>;

  selectedMonth: string;
  pointedMonths: {id: number, name: string}[] = [];

  months: string[];

  @Input()
  missionHours: Array<HeureMission>;

  @Output()
  confirmed = new EventEmitter<any>();

  constructor() {
    this.months = [];
    this.months[0] = "Janvier";
    this.months[1] = "Février";
    this.months[2] = "Mars";
    this.months[3] = "Avril";
    this.months[4] = "Mai";
    this.months[5] = "Juin";
    this.months[6] = "Juillet";
    this.months[7] = "Aout";
    this.months[8] = "Septembre";
    this.months[9] = "Octobre";
    this.months[10] = "Novembre";
    this.months[11] = "Décembre";
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes['missionHours']){
      this.getPointedMonths();
    }
  }

  getPointedMonths(){
    if(Utils.isEmpty(this.missionHours)){
      return;
    }

    //tableau contenant les mois non pointés intégralement
    let monthsToDelete = [];

    for(let i = 0; i < this.missionHours.length; i++){
      let m = this.missionHours[i];
      let d = new Date(m.jour_debut.toString());
      let monthIndex = d.getMonth() + 1;
      let obj = {id: monthIndex, name: this.months[d.getMonth()]};

      if(!Utils.isEmpty(m.date_debut_pointe_corrige) && !Utils.isEmpty(m.date_fin_pointe_corrige)){
        let index = this.pointedMonths.findIndex(p => p.id === obj.id);
        if(index == -1) {
          this.pointedMonths.push(obj);
        }else{
          continue;
        }
      }else{
        let index = monthsToDelete.findIndex(p => p.id === obj.id);
        if(index == -1) {
          monthsToDelete.push(obj);
        }else{
          continue;
        }
      }
    }

    //supprimer les mois non pointés intégralement du tableau pointedMonths
    for(let i = 0; i < this.pointedMonths.length; i++){
      let index = monthsToDelete.findIndex(p => p.id === this.pointedMonths[i].id);
      if(index == 0){
        this.pointedMonths.splice(i, 1);
      }
    }
  }

  generatePayement(){
    if(this.selectedMonth == "0") {
      for (let i = 0; i < this.missionHours.length; i++) {
        let m = this.missionHours[i];

        if (Utils.isEmpty(m.date_debut_pointe_corrige) || Utils.isEmpty(m.date_fin_pointe_corrige)) {
          this.addAlert("warning", "Vous devez valider tous les horaires de travail avant de pouvoir générer la paie de la mission.");
          return;
        }
      }
    }

    jQuery("#modal-paie").modal('hide');
    let monthName = (this.selectedMonth == "0" ? "toute la mission" : this.months[+this.selectedMonth - 1]);
    this.confirmed.emit({monthIndex: this.selectedMonth, monthName:  monthName});
  }

  close(){
    jQuery("#modal-paie").modal('hide');
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }

  isEmpty(str){
    return Utils.isEmpty(str);
  }
}
