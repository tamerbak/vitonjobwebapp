import {Directive, ElementRef} from "@angular/core";
declare let jQuery: any;
declare let Dropzone: any;

@Directive({
  selector: '[dropzone-demo]'
})

export class DropzoneDemo {
  $el: any;

  constructor(el: ElementRef) {
    this.$el = jQuery(el.nativeElement);
  }

  ngOnInit(): void {
    let dropzone = new Dropzone(this.$el[0], {});
  }

}
