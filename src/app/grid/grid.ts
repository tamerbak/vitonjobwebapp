import {Component, ViewEncapsulation} from '@angular/core';
import {Widget} from '../core/widget/widget';
import {GridDemo} from './grid-demo/grid-demo';
declare var jQuery: any;

@Component({
  selector: '[grid]',
  template: require('./grid.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./grid.scss')],
  directives: [Widget, GridDemo]
})
export class Grid {
  sortOptions: Object = {
    connectWith: '.widget-container',
    handle: 'header, .handle',
    cursor: 'move',
    iframeFix: false,
    items: '.widget:not(.locked)',
    opacity: 0.8,
    helper: 'original',
    revert: true,
    forceHelperSize: true,
    placeholder: 'widget widget-placeholder',
    forcePlaceholderSize: true,
    tolerance: 'pointer'
  };

  ngOnInit(): void {
    jQuery('.widget-container').sortable(this.sortOptions);
  }
}
