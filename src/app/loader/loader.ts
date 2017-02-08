/**
 * Created by kelvin on 08/02/2017.
 */

import {Component} from "@angular/core";

declare let jQuery: any;

@Component({
  selector: '[loader]',
  template: require('./loader.html'),
  styles: [require('./loader.scss')]
})

export class Loader {

  constructor() {
  }

  ngOnInit() {
  }

  close(): void {
    jQuery('#loader').modal('hide');
  }
}
