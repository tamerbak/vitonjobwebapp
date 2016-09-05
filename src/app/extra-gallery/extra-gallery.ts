import {Component, ViewEncapsulation} from '@angular/core';

declare var jQuery: any;
declare var Shuffle: any;

@Component({
  selector: '[extra-gallery]',
  template: require('./extra-gallery.html'),
  encapsulation: ViewEncapsulation.None,
  styles: [require('./extra-gallery.scss')]
})
export class ExtraGallery {
  magnificOptions: any = { delegate: '.img-thumbnail > a',  type: 'image', gallery: { enabled: true  } };
  items: Array<any> = [
  {
    'name': 'Mountains',
    'groups': [
      'nature'
    ],
    'src': 'assets/images/pictures/1.jpg',
    'date': '10 mins'
  },
  {
    'name': 'Empire State Pigeon',
    'groups': [
      'people'
    ],
    'src': 'assets/images/pictures/2.jpg',
    'date': '1 hour',
    'like': true
  },
  {
    'name': 'Big Lake',
    'groups': [
      'nature'
    ],
    'src': 'assets/images/pictures/3.jpg',
    'date': '2 mins',
    'like': true
  },
  {
    'name': 'Forest',
    'groups': [
      'nature'
    ],
    'src': 'assets/images/pictures/4.jpg',
    'date': '2 mins',
    'like': true
  },
  {
    'name': 'Smile',
    'groups': [
      'people'
    ],
    'src': 'assets/images/pictures/5.jpg',
    'date': '2 mins'
  },
  {
    'name': 'Smile',
    'groups': [
      'people'
    ],
    'src': 'assets/images/pictures/6.jpg',
    'date': '1 hour',
    'like': true
  },
  {
    'name': 'Fog',
    'groups': [
      'nature'
    ],
    'src': 'assets/images/pictures/8.jpg',
    'date': '2 mins',
    'like': true
  },
  {
    'name': 'Beach',
    'groups': [
      'people'
    ],
    'src': 'assets/images/pictures/9.jpg',
    'date': '2 mins'
  },
  {
    'name': 'Pause',
    'groups': [
      'people'
    ],
    'src': 'assets/images/pictures/10.jpg',
    'date': '3 hour',
    'like': true
  },
  {
    'name': 'Space',
    'groups': [
      'space'
    ],
    'src': 'assets/images/pictures/11.jpg',
    'date': '3 hour',
    'like': true
  },
  {
    'name': 'Shuttle',
    'groups': [
      'space'
    ],
    'src': 'assets/images/pictures/13.jpg',
    'date': '35 mins',
    'like': true
  },
  {
    'name': 'Sky',
    'groups': [
      'space'
    ],
    'src': 'assets/images/pictures/14.jpg',
    'date': '2 mins'
  }
];
  activeGroup: string = 'all';
  order: boolean = false;
  $gallery: any;
  shuffle: any;
  shuffleOptions: Object = { itemSelector: '.gallery-item', sizer: '.js-shuffle-sizer', delimeter: ','};

  activeGroupSelected(group): void {
    this.shuffle.filter(group);
    this.activeGroup = group;
  }

  orderSelected(order): void {
    function sortByTitle(element): string {
      return element.getAttribute('data-title').toLowerCase();
    }

    this.shuffle.sort({
      reverse: order,
      by: sortByTitle
    });
    this.order = order;
  }

  ngOnInit(): void {
    this.$gallery = jQuery('#magnific');
    this.$gallery.magnificPopup(this.magnificOptions);

    setTimeout(() => {
      let x = 0;
      let d = this;
      jQuery('.gallery-item').each(function(): void {
        jQuery(this).attr('data-groups', '["' + d.items[x].groups + '"]');
        x++;
      });
      this.shuffle = new Shuffle(this.$gallery, this.shuffleOptions);
    });
  }
}

