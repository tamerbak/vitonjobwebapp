import {Component} from '@angular/core';
import {AlertComponent} from 'ng2-bootstrap/components/alert';
import {Widget} from '../core/widget/widget';
import {ModalComponent} from './modal-component/modal-component';

declare var jQuery: any;

@Component({
  selector: '[ui-components]',
  template: require('./ui-components.html'),
  directives: [AlertComponent, Widget, ModalComponent]
})
export class UiComponents {
  alerts: Array<Object>;

  constructor() {
    this.alerts = [
      {
        type: 'success',
        msg: '<span class="fw-semi-bold">Success:</span> You successfully read this important alert message.'
      },
      {
        type: 'info',
        msg: '<span class="fw-semi-bold">Info:</span> This alert needs your attention, but it\'s not super important.'
      },
      {
        type: 'warning',
        msg: '<span class="fw-semi-bold">Warning:</span> Best check yo self, you\'re not looking too good.'
      },
      {
        type: 'danger',
        msg: '<span class="fw-semi-bold">Danger:</span> Change this and that and try again.  ' +
          '<a class="btn btn-default btn-xs pull-xs-right mr" href="#">Ignore</a>  ' +
          '<a class="btn btn-danger btn-xs pull-xs-right mr-xs" href="#">Take this action</a>'
      }
    ];
  }

  addAlert(): void {
    this.alerts.push({type: 'warning', msg: 'Another alert!'});
  };

  closeAlert(index): void {
    this.alerts.splice(index, 1);
  };

  ngOnInit(): void {
    jQuery('#popover1, #popover2').popover();
  }
}

