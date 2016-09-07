import {Component, ViewEncapsulation} from '@angular/core';
import {Widget} from '../core/widget/widget';
import {LiveTile} from '../components/tile/tile';
import {Skycon} from '../components/skycon/skycon';
import {ConfigService} from '../core/config';
import {ChangesChartWidget} from './changes-chart-widget/changes-chart-widget';
import {FlotChartWidget} from './flot-chart-widget/flot-chart-widget';
import {YearsMapWidget} from './years-map-widget/years-map-widget';
import {NasdaqSparklineWidget} from './nasdaq-sparkline-widget/nasdaq-sparkline-widget';
import {RealtimeTrafficWidget} from './realtime-traffic-widget/realtime-traffic-widget';

@Component({
  selector: 'widgets',
  template: require('./widgets.html'),
  directives: [Widget, LiveTile, ChangesChartWidget, FlotChartWidget, YearsMapWidget, Skycon, NasdaqSparklineWidget, RealtimeTrafficWidget],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./widgets.scss')]
})
export class Widgets {
  config: any;
  configFn: any;

  constructor(config: ConfigService) {
    this.configFn = config;
    this.config = config.getConfig();
  }
}
