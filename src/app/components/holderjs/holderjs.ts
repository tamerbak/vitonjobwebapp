import {Directive, ElementRef} from "@angular/core";
declare let jQuery: any;
declare let Holder: any;

@Directive({
  selector: '[holderjs]'
})

export class HolderJs {
  $el: any;

  constructor(el: ElementRef) {
    this.$el = jQuery(el.nativeElement);
  }

  ngOnInit(): void {
    Holder.run({
      images: this.$el[0]
    });
  }

}
