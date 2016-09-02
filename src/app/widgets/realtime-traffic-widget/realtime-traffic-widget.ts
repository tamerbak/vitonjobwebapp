import {Component, ViewEncapsulation} from '@angular/core';
import {RickshawChart} from '../../components/rickshaw/rickshaw';
import {ConfigService} from '../../core/config';
declare var Rickshaw: any;

@Component({
  selector: '[realtime-traffic-widget]',
  template: require('./realtime-traffic-widget.html'),
  directives: [RickshawChart],
  encapsulation: ViewEncapsulation.None,
  styles: [require('../../../../node_modules/rickshaw/rickshaw.css')]
})

export class RealtimeTrafficWidget {
  seriesData: Array<any> = [ [], [] ];
  random: any;
  series: Array<any>;
  config: any;

  constructor(config: ConfigService) {
    this.config = config.getConfig();

    this.random = new Rickshaw.Fixtures.RandomData(30);

    for (let i = 0; i < 30; i++) {
      this.random.addData(this.seriesData);
    }
    this.series = [
      {
        color: this.config.settings.colors['gray-dark'],
        data: this.seriesData[0],
        name: 'Uploads'
      }, {
        color: this.config.settings.colors.gray,
        data: this.seriesData[1],
        name: 'Downloads'
      }
    ];
  }
}
