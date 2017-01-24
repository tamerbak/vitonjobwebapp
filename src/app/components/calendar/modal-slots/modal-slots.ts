import {Component} from "@angular/core";
declare var jQuery: any;

@Component({
  selector: '[modal-slots]',
  template: require('./modal-slots.html')
})

export class ModalSlots{

  constructor() {
  }

  ngOnInit() {

  }


  close(): void {
    jQuery('#modal-slots').modal('hide');
  }
}
