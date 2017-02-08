/**
 * Created by kelvin on 08/02/2017.
 */

import {Injectable} from "@angular/core";

declare let jQuery: any;

@Injectable()
export class LoaderService {

  modal: any;

  constructor() {
  }

  display(): void {
    this.modal = jQuery('#loader');
    this.modal.modal({
      keyboard: false,
      backdrop: 'static'
    });
    this.modal.modal('show');
  }

  hide(): void {
    this.modal.modal('hide');
  }
}
