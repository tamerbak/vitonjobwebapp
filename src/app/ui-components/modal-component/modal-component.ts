import {Component} from '@angular/core';

declare var jQuery: any;

@Component({
  selector: '[modal-component]',
  template: require('./modal-component.html')
})
export class ModalComponent {
  ok(): void {
    jQuery('#my-modal18-content').modal('hide');
  }
}

