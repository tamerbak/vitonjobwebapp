import {Component, ViewEncapsulation} from '@angular/core';
import {Widget} from '../core/widget/widget';
import {DropzoneDemo} from '../components/dropzone/dropzone';
import {HolderJs} from '../components/holderjs/holderjs';
import {NKDatetime} from 'ng2-datetime/ng2-datetime';
import {Autosize} from 'angular2-autosize/angular2-autosize';
import {AlertComponent} from 'ng2-bootstrap/components/alert';
declare var jQuery: any;

@Component({
  selector: '[forms-elements]',
  template: require('./forms-elements.html'),
  directives: [Widget, DropzoneDemo, HolderJs, NKDatetime, Autosize, AlertComponent],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./forms-elements.scss')]
})
export class FormsElements {
  colorOptions: Object = {color: '#f0b518'};
  sliderValueOptions: Array<number> = [200, 1547];

  ngOnInit(): void {
    jQuery('#colorpicker').colorpicker(this.colorOptions);
    jQuery('.select2').select2();
    jQuery('.js-slider').slider();
    jQuery('#markdown').markdown();
    jQuery('.selectpicker').selectpicker();
  }
}
