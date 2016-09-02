import {Component, ViewEncapsulation} from '@angular/core';
import {RickshawChart} from '../../components/rickshaw/rickshaw';
declare var Rickshaw: any;

@Component({
  selector: '[marker-stats-widget]',
  template: '<div class="chart-overflow-bottom" rickshaw-chart [series]="series" [height]="100" [seriesData]="seriesData" [random]="random" [realtime]="true">' +
  '</div>',
  directives: [RickshawChart],
  encapsulation: ViewEncapsulation.None,
  styles: [require('../../../../node_modules/rickshaw/rickshaw.css')]
})

export class MarkerStatsWidget {
  seriesData: Array<any> = [ [], [] ];
  random: any;
  series: Array<any>;

  constructor() {
    this.random = new Rickshaw.Fixtures.RandomData(30);

    for (let i = 0; i < 30; i++) {
      this.random.addData(this.seriesData);
    }
    this.series = [
      {
        color: '#F7653F',
        data: this.seriesData[0],
        name: 'Uploads'
      }, {
        color: '#F7D9C5',
        data: this.seriesData[1],
        name: 'Downloads'
      }
    ];
  }
}
