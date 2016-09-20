import {Component} from '@angular/core';

declare var jQuery: any;

@Component({
  selector: '[breaktime-component]',
  template: require('./breaktime-component.html')
})
export class BreaktimeComponent {
  ok(): void {
    jQuery('#my-modal18-content').breaktime('hide');
  }
}

