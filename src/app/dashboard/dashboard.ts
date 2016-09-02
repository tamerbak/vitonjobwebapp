import {Component, ViewEncapsulation} from '@angular/core';
import {Widget} from '../core/widget/widget';
import {ProgressAnimate} from '../core/utils/progress-animate';
import {AnimateNumber} from '../core/utils/animate-number';
import {CheckAll} from '../core/utils/check-all';
import {GeoLocationsWidget} from './geo-locations-widget/geo-locations-widget';
import {MarkerStatsWidget} from './marker-stats-widget/marker-stats-widget';
import {BootstrapCalendar} from './bootstrap-calendar/bootstrap-calendar';
import {ConfigService} from '../core/config';

@Component({
  selector: 'dashboard',
  template: require('./dashboard.html'),
  directives: [Widget, ProgressAnimate, AnimateNumber, CheckAll, GeoLocationsWidget, MarkerStatsWidget, BootstrapCalendar],
  styles: [require('./dashboard.scss')],
  encapsulation: ViewEncapsulation.None
})

export class Dashboard {
  config: any;
  month: any;
  year: any;

  constructor(config: ConfigService) {
    this.config = config.getConfig();
  }

  ngOnInit(): void {
    let now = new Date();
    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();
  }
}
