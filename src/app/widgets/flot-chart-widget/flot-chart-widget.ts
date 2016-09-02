import {Component} from '@angular/core';
import {Widget} from '../../core/widget/widget';
import {FlotChart} from '../../components/flot/flot';
import {ConfigService} from '../../core/config';
declare var jQuery: any;

@Component({
  selector: '[flot-chart-widget]',
  template: require('./flot-chart-widget.html'),
  directives: [Widget, FlotChart],
})

export class FlotChartWidget {
  configFn: any;
  config: any;

  constructor (config: ConfigService) {
    this.configFn = config;
    this.config = config.getConfig();
  }

  generateRandomData(labels): Array<any> {
    function random(): number {
      return (Math.floor(Math.random() * 30)) + 10;
    }

    let data = [],
      maxValueIndex = 5;

    for (let i = 0; i < labels.length; i++) {
      let randomSeries = [];
      for (let j = 0; j < 25; j++) {
        randomSeries.push([j, Math.floor(maxValueIndex * j) + random()]);
      }
      maxValueIndex--;
      data.push({
        data: randomSeries, showLabels: true, label: labels[i].label, labelPlacement: 'below', canvasRender: true, cColor: 'red', color: labels[i].color
      });
    }
    return data;
  };
}
