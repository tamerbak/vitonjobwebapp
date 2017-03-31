import {Component, Input, ElementRef} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router";
import {ListArray} from "./list-array/list-array";
import {ListViewer} from "./list-viewer/list-viewer";
import {MapVisualizer} from "./list-viewer/map-visualizer/map-visualizer";

declare let jQuery: any;
declare let Messenger: any;

/**
 * Simple modal requesting confirmation
 */
@Component({
  selector: '[list-container]',
  directives: [ROUTER_DIRECTIVES, ListArray, ListViewer],
  providers: [],
  template: require('./list-container.html'),
  styles: [require('./list-container.scss')]
})
export class ListContainer {

  componentData = null;

  @Input()
  listElements: any[] = [];

  canBeSelected: boolean = true;

  // @Input()
  // messageCantConfirm: string = "";
  //
  // @Input()
  // canConfirm: boolean = true;
  //
  // @Output()
  // confirmed = new EventEmitter<any>();
  //
  // @Output()
  // aborted = new EventEmitter<any>();

  myCurrentContent: string = "";

  constructor(el: ElementRef) {
    // this.myCurrentContent = el.nativeElement.innerHTML;
    // el.nativeElement.innerHTML = 'hello';
    // el.nativeElement.style.backgroundColor = 'yellow';
  }

  createHelloWorldComponent() {
    this.componentData = {
      component: MapVisualizer,
      inputs: {
        showNum: 9
      }
    };
  }

  createWorldHelloComponent() {
    // this.componentData = {
    //   component: WorldHelloComponent,
    //   inputs: {
    //     showNum: 2
    //   }
    // };
  }

}
