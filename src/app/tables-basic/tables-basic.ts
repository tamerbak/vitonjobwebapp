import {Component} from '@angular/core';
import {CheckAll} from '../core/utils/check-all';
import {JqSparkline} from '../components/sparkline/sparkline';
import {ProgressAnimate} from '../core/utils/progress-animate';
import {Widget} from '../core/widget/widget';

@Component({
  selector: '[tables-basic]',
  template: require('./tables-basic.html'),
  directives: [CheckAll, JqSparkline, ProgressAnimate, Widget]
})
export class TablesBasic {
}
