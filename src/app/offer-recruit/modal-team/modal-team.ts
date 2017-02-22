import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";

declare let jQuery: any;
declare let Messenger: any;

@Component({
  selector: '[modal-team]',
  directives: [ROUTER_DIRECTIVES],
  providers: [],
  template: require('./modal-team.html'),
  styles: [require('./modal-team.scss')]
})
export class ModalTeam {

  @Input()
  jobyers: any[] = [];

  @Output()
  jobyerSelected: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  close() {
    jQuery("#modal-team").modal('hide');
    this.jobyerSelected.emit(null);
  }

  isJobyerAvailableForThisSlot(jobyer: any): boolean {
    return true;
  }

  assignJobyerToThisSlot(jobyer: any): void {
    console.log('assignJobyerToThisSlot');
    console.log(jobyer);
    if (this.isJobyerAvailableForThisSlot(jobyer) === false) {
      console.log('assignJobyerToThisSlot but jobyer not available');
      return;
    }
    this.jobyerSelected.emit(jobyer);
    this.close();
  }
}
