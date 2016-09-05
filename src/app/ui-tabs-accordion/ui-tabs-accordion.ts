import {Component} from '@angular/core';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';

declare var jQuery: any;

@Component({
  selector: '[ui-tabs-accordion]',
  template: require('./ui-tabs-accordion.html'),
  directives: [ACCORDION_DIRECTIVES]
})
export class UiTabsAccordion {
  ngOnInit(): void {
    jQuery('.nav-tabs').on('shown.bs.tab', 'a', (e) => {
      if (e.relatedTarget) {
        jQuery(e.relatedTarget).removeClass('active');
      }
    });
  }
}

