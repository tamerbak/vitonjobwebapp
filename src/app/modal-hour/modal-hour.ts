import {Component, Input, Output, EventEmitter} from "@angular/core";
import {DateUtils} from "../utils/date-utils";
import {Utils} from "../utils/utils";
import {AlertComponent} from 'ng2-bootstrap/components/alert';

declare let jQuery: any;

@Component({
  selector: '[modal-hour]',
  template: require('./modal-hour.html'),
  styles: [require('./modal-hour.scss')],
  directives: [AlertComponent]
})
export class ModalHour {
  alerts: Array<Object>;

  date: Date;
  time: Date;

  @Output()
  confirmed = new EventEmitter<any>();

  constructor() {
  }

  validate(){
    if(!DateUtils.isDateValid(this.date) || Utils.isEmpty(this.time)){
      this.addAlert("danger", "Veuillez renseigner la date et l'heure avant de pouvoir valider.");
      return;
    }

    jQuery("#modal-hour").modal('hide');
    this.confirmed.emit({date: this.date, time: this.time});
  }

  close(){
    jQuery("#modal-hour").modal('hide');
  }

  addAlert(type, msg): void {
    this.alerts = [{type: type, msg: msg}];
  }
}
