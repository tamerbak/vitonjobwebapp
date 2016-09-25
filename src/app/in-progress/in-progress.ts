import {Component, ViewEncapsulation} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: '[in-progress]',
  host: {
    class: 'progress-page app'
  },
  template: require('./in-progress.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./in-progress.scss')]
})
export class InProgressPage {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  searchResult(): void {
    this.router.navigate(['/app', 'dashboard']);
  }

}
