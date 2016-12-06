import {Component} from "@angular/core";
import {SharedService} from "../../providers/shared.service";
import {ROUTER_DIRECTIVES, Router} from "@angular/router";

declare var Messenger, jQuery: any;
declare var google: any;
declare var moment: any;
declare var require;

@Component({
  selector: '[iframe]',
  template: require('./iframe.html'),
  styles: [require('./iframe.scss')],
})

export class Iframe {
  currentUser: any;
  file64: any;

  constructor(private sharedService: SharedService,
              private router: Router) {
    this.currentUser = this.sharedService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['home']);
    }

    this.file64 = this.sharedService.getCurrentQuote();
  }

  ngOnInit(): void {

    let iframe = document.createElement('iframe');
    iframe.frameBorder = "0";
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.id = "youSign";
    iframe.style.overflow = "hidden";
    iframe.style.height = "100%";
    iframe.style.width = "100%";
    iframe.setAttribute("src", this.file64);

    jQuery('#iframPlaceHolder').append(iframe);
  }

  openQuote() {
    window.open(this.file64);
  }
}
