import {Component, Input, Injector, ViewChildren} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {GOOGLE_MAPS_DIRECTIVES} from "angular2-google-maps/core";

declare let jQuery: any;
declare let Messenger: any;

/**
 * Map visualizer
 */
@Component({
  selector: '[map-visualizer]',
  directives: [
    ROUTER_DIRECTIVES,
    GOOGLE_MAPS_DIRECTIVES
  ],
  providers: [],
  template: require('./map-visualizer.html'),
  styles: [require('./map-visualizer.scss')]
})
export class MapVisualizer {

  @Input()
  listElement: any[] = [];

  @ViewChildren('Map')
  map: any;

  lat: number = 48;
  lng: number = 2;
  // lat: number = 46.75984;
  // lng: number = 1.738281;
  searchResultPos: {lat: number,lng: number,info: string}[] = [];

  constructor(private injector: Injector) {
    // this.showNum = this.injector.get('showNum');
  }

  // constructor(el: ElementRef) {
  //   // this.myCurrentContent = el.nativeElement.innerHTML;
  //   // el.nativeElement.innerHTML = 'hello';
  //   // el.nativeElement.style.backgroundColor = 'red';
  // }

  ngOnInit() {
    for (let i = 0; i < this.listElement.length; ++i) {
      this.searchResultPos.push({
        lat: this.listElement[i].viewerData['map_lat'],
        lng: this.listElement[i].viewerData['map_lng'],
        info: this.listElement[i].label
      });
    }
  }

}
