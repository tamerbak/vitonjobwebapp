import {Component, ViewEncapsulation} from '@angular/core';
import {Widget} from '../core/widget/widget';
declare var jQuery: any;

@Component({
  selector: '[ui-list-groups]',
  template: require('./ui-list-groups.html'),
  directives: [Widget],
  encapsulation: ViewEncapsulation.None,
  styles: [require('./ui-list-groups.scss')]
})
export class UiListGroups {
  sortOptions: Object = { placeholder: 'list-group-item list-group-item-placeholder', forcePlaceholderSize: true };
  nest1Options: Object = { group: 1 };
  nest2Options: Object = { group: 1 };

  ngOnInit(): void {
    jQuery( '.list-group-sortable' ).sortable(this.sortOptions);
    jQuery( '#nestable1' ).nestable(this.nest1Options);
    jQuery( '#nestable2' ).nestable(this.nest2Options);
  }
}

