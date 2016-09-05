import {Component, ViewEncapsulation} from '@angular/core';
import {GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

@Component({
  selector: '[extra-time-line]',
  template: require('./extra-time-line.html'),
  directives: [GOOGLE_MAPS_DIRECTIVES],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./extra-time-line.scss')]
})
export class ExtraTimeLine {
}
