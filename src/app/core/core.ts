import {Component, ElementRef} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, NavigationEnd} from '@angular/router';
import {FORM_PROVIDERS} from '@angular/common';
import {Sidebar} from './sidebar/sidebar';
import {Navbar} from './navbar/navbar';
import {ChatSidebar} from './chat-sidebar/chat-sidebar';
import {Widgets} from '../widgets/widgets';
import {Dashboard} from '../dashboard/dashboard';
import {Charts} from '../charts/charts';
import {Inbox} from '../inbox/inbox';
import {Profile} from '../profile/profile';
import {FormsElements} from '../forms-elements/forms-elements';
import {FormsValidation} from '../forms-validation/forms-validation';
import {FormsWizard} from '../forms-wizard/forms-wizard';
import {UiComponents} from '../ui-components/ui-components';
import {UiNotifications} from '../ui-notifications/ui-notifications';
import {UiIcons} from '../ui-icons/ui-icons';
import {UiTabsAccordion} from '../ui-tabs-accordion/ui-tabs-accordion';
import {UiButtons} from '../ui-buttons/ui-buttons';
import {UiListGroups} from '../ui-list-groups/ui-list-groups';
import {Grid} from '../grid/grid';
import {MapsGoogle} from '../maps-google/maps-google';
import {MapsVector} from '../maps-vector/maps-vector';
import {TablesBasic} from '../tables-basic/tables-basic';
import {TablesDynamic} from '../tables-dynamic/tables-dynamic';
import {ExtraCalendar} from '../extra-calendar/extra-calendar';
import {ExtraInvoice} from '../extra-invoice/extra-invoice';
import {ExtraGallery} from '../extra-gallery/extra-gallery';
import {ExtraTimeLine} from '../extra-time-line/extra-time-line';
import {ExtraSearchResults} from '../extra-search-results/extra-search-results';
import {ConfigService} from './config';

declare var Raphael: any;
declare var jQuery: any;
declare var Tether: any;

@Component({
  selector: 'app',
  host: {
    '[class.nav-static]' : 'config.state["nav-static"]',
    '[class.chat-sidebar-opened]' : 'chatOpened',
    '[class.app]' : 'true',
    id: 'app'
  },
  providers: [ FORM_PROVIDERS ],
  directives: [Sidebar, Navbar, ChatSidebar, ROUTER_DIRECTIVES],
  template: require('./core.html')
})
export class Core {
  config: any;
  configFn: any;
  $sidebar: any;
  el: ElementRef;
  chatOpened: boolean;
  router: Router;

  constructor(config: ConfigService,
              el: ElementRef,
              router: Router) {
    Raphael.prototype.safari = function(): any { return; };

    this.el = el;
    this.config = config.getConfig();
    this.configFn = config;
    this.chatOpened = false;
    this.router = router;

    jQuery.fn.onPositionChanged = function (trigger, millis): any {
      if (millis == null) { millis = 100; }
      let o = jQuery(this[0]); // our jquery object
      if (o.length < 1) { return o; }

      let lastPos = null;
      let lastOff = null;
      setInterval(() => {
        if (o == null || o.length < 1) { return o; } // abort if element is non existend eny more
        if (lastPos == null) { lastPos = o.position(); }
        if (lastOff == null) { lastOff = o.offset(); }
        let newPos = o.position();
        let newOff = o.offset();
        if (lastPos.top !== newPos.top || lastPos.left !== newPos.left) {
          jQuery(this).trigger('onPositionChanged', { lastPos: lastPos, newPos: newPos });
          if (typeof (trigger) === 'function') { trigger(lastPos, newPos); }
          lastPos = o.position();
        }
        if (lastOff.top !== newOff.top || lastOff.left !== newOff.left) {
          jQuery(this).trigger('onOffsetChanged', { lastOff: lastOff, newOff: newOff});
          if (typeof (trigger) === 'function') { trigger(lastOff, newOff); }
          lastOff = o.offset();
        }
      }, millis);

      return o;
    };
  }

  toggleSidebarListener(state): void {
    let toggleNavigation = state === 'static' ? this.toggleNavigationState : this.toggleNavigationCollapseState;
    toggleNavigation.apply(this);
    localStorage.setItem('nav-static', this.config.state['nav-static']);
  }

  toggleChatListener(): void {
    jQuery(this.el.nativeElement).find('.chat-notification-sing').remove();
    this.chatOpened = !this.chatOpened;

    setTimeout(() => {
      // demo: add class & badge to indicate incoming messages from contact
      // .js-notification-added ensures notification added only once
      jQuery('.chat-sidebar-user-group:first-of-type .list-group-item:first-child:not(.js-notification-added)')
        .addClass('active js-notification-added')
        .find('.fa-circle')
        .after('<span class="label label-pill label-danger pull-right animated bounceInDown">3</span>');
    }, 1000);
  }

  toggleNavigationState(): void {
    this.config.state['nav-static'] = !this.config.state['nav-static'];
  }

  expandNavigation(): void {
    // this method only makes sense for non-static navigation state
    if (this.isNavigationStatic() && (this.configFn.isScreen('lg') || this.configFn.isScreen('xl'))) { return; }

    jQuery('app').removeClass('nav-collapsed');
    this.$sidebar.find('.active .active').closest('.collapse').collapse('show')
      .siblings('[data-toggle=collapse]').removeClass('collapsed');
  }

  collapseNavigation(): void {
    // this method only makes sense for non-static navigation state
    if (this.isNavigationStatic() && (this.configFn.isScreen('lg') || this.configFn.isScreen('xl'))) { return; }

    jQuery('app').addClass('nav-collapsed');
    this.$sidebar.find('.collapse.in').collapse('hide')
      .siblings('[data-toggle=collapse]').addClass('collapsed');
  }

  /**
   * Check and set navigation collapse according to screen size and navigation state
   */
  checkNavigationState(): void {
    if (this.isNavigationStatic()) {
      if (this.configFn.isScreen('sm') || this.configFn.isScreen('xs') || this.configFn.isScreen('md')) {
        this.collapseNavigation();
      }
    } else {
      if (this.configFn.isScreen('lg') || this.configFn.isScreen('xl')) {
        setTimeout(() => {
          this.collapseNavigation();
        }, this.config.settings.navCollapseTimeout);
      } else {
        this.collapseNavigation();
      }
    }
  }

  isNavigationStatic(): boolean {
    return this.config.state['nav-static'] === true;
  }

  toggleNavigationCollapseState(): void {
    if (jQuery('app').is('.nav-collapsed')) {
      this.expandNavigation();
    } else {
      this.collapseNavigation();
    }
  }

  _sidebarMouseEnter(): void {
    if (this.configFn.isScreen('lg') || this.configFn.isScreen('xl')) {
      this.expandNavigation();
    }
  }
  _sidebarMouseLeave(): void {
    if (this.configFn.isScreen('lg') || this.configFn.isScreen('xl')) {
      this.collapseNavigation();
    }
  }

  enableSwipeCollapsing(): void {
    let d = this;
    jQuery('.content-wrap').swipe({
      swipeLeft: function(): void {
        // this method only makes sense for small screens + ipad
        if (d.configFn.isScreen('lg')) { return; }

        if (!jQuery('app').is('.nav-collapsed')) {
          d.collapseNavigation();
        }
      },
      swipeRight: function(): void {
        // this method only makes sense for small screens + ipad
        if (d.configFn.isScreen('lg')) { return; }

        // check if navigation is collapsing. exiting if true
        if (jQuery('app').is('.nav-busy')) { return; }

        if (jQuery('app').is('.nav-collapsed')) {
          d.expandNavigation();
        }
      },
      threshold: this.configFn.isScreen('xs') ? 100 : 200
    });
  }

  collapseNavIfSmallScreen(): void {
    if (this.configFn.isScreen('xs') || this.configFn.isScreen('sm') || this.configFn.isScreen('md')) {
      this.collapseNavigation();
    }
  }

  ngOnInit(): void {
    setTimeout(() => { jQuery('[data-toggle="tooltip"]').tooltip(); });

    jQuery('[data-toggle="tooltip"]').onPositionChanged(() => { Tether.position(); }, 0);

    if (localStorage.getItem('nav-static') === 'true') {
      this.config.state['nav-static'] = true;
    }

    let $el = jQuery(this.el.nativeElement);
    this.$sidebar = $el.find('[sidebar]');

    setTimeout(() => {
      $el.find('a[href="#"]').on('click', (e) => {
        e.preventDefault();
      });
    });

    this.$sidebar.on('mouseenter', this._sidebarMouseEnter.bind(this));
    this.$sidebar.on('mouseleave', this._sidebarMouseLeave.bind(this));

    this.checkNavigationState();

    this.$sidebar.on('click', () => {
      if (jQuery('app').is('.nav-collapsed')) {
        this.expandNavigation();
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.collapseNavIfSmallScreen();
          window.scrollTo(0, 0);

          $el.find('a[href="#"]').on('click', (e) => {
            e.preventDefault();
          });
        });
      }
    });

    if ('ontouchstart' in window) { this.enableSwipeCollapsing(); }

    this.$sidebar.find('.collapse').on('show.bs.collapse', function(e): void {
        // execute only if we're actually the .collapse element initiated event
        // return for bubbled events
        if (e.target !== e.currentTarget) { return; }

        let $triggerLink = jQuery(this).prev('[data-toggle=collapse]');
        jQuery($triggerLink.data('parent')).find('.collapse.in').not(jQuery(this)).collapse('hide');
      })
      /* adding additional classes to navigation link li-parent for several purposes. see navigation styles */
      .on('show.bs.collapse', function(e): void {
        // execute only if we're actually the .collapse element initiated event
        // return for bubbled events
        if (e.target !== e.currentTarget) { return; }

        jQuery(this).closest('li').addClass('open');
      }).on('hide.bs.collapse', function(e): void {
      // execute only if we're actually the .collapse element initiated event
      // return for bubbled events
      if (e.target !== e.currentTarget) { return; }

      jQuery(this).closest('li').removeClass('open');
    });
  }
}
