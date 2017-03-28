import {Component, Input, Output, EventEmitter} from "@angular/core";

declare let jQuery: any;

@Component({
  selector: '[modal-hour]',
  template: require('./modal-hour.html'),
  styles: [require('./modal-hour.scss')]
})
export class ModalHour {

  date: Date;
  time: Date;

  @Output()
  confirmed = new EventEmitter<any>();

  constructor() {
  }

  validate(){
    jQuery("#modal-hour").modal('hide');
    this.confirmed.emit({date: this.date, time: this.time});
  }

  close(){
    jQuery("#modal-hour").modal('hide');
  }
}
