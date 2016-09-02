import {Directive, ElementRef, Input} from '@angular/core';
declare var jQuery: any;
const d3 = require('d3/d3.js');
const nv = require('nvd3/build/nv.d3.js');

@Directive ({
  selector: '[nvd3-chart]'
})

export class Nvd3Chart {
  $el: any;
  @Input() chart: any;
  @Input() height: string;
  @Input() datum: any;

  constructor(el: ElementRef) {
    this.$el = jQuery(el.nativeElement);
  }

  render(): void {
    nv.addGraph(() => {
      let chart = this.chart;
      d3.select(this.$el.find('svg')[0])
        .style('height', this.height || '300px')
        .datum(this.datum)
        .transition().duration(500)
        .call(chart)
      ;

      jQuery(window).on('sn:resize', chart.update);

      return chart;
    });
  }

  ngOnInit(): void {
    this.render();
  }
}
