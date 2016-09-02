import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: '[extra-search-results]',
  template: require('./extra-search-results.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./extra-search-results.scss')]
})
export class ExtraSearchResults {
}
