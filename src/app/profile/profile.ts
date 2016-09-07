import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: '[profile]',
  template: require('./profile.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./profile.scss')]
})
export class Profile {
}
