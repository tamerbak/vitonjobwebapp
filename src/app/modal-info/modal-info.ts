import {Component, Input} from "@angular/core";
declare let jQuery: any;

@Component({
  selector: '[modal-info]',
  template: require('./modal-info.html')
})

export class ModalInfo{
  @Input()
  msg: string;

  constructor() {
  }

  ngOnInit() {
  }

  close(): void {
    jQuery('#modal-info').modal('hide');
  }
}
