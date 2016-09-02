import { provideRouter, RouterConfig } from '@angular/router';
import {Core} from './core';
import {Dashboard} from './../dashboard/dashboard';
import {Inbox} from '../inbox/inbox';
import {Widgets} from '../widgets/widgets';
import {Charts} from '../charts/charts';
import {Profile} from '../profile/profile';
import {FormsElements} from '../forms-elements/forms-elements';
import {FormsValidation} from '../forms-validation/forms-validation';
import {FormsWizard} from '../forms-wizard/forms-wizard';
import {UiComponents} from '../ui-components/ui-components';
import {UiNotifications} from '../ui-notifications/ui-notifications';
import {UiIcons} from '../ui-icons/ui-icons';
import {UiButtons} from '../ui-buttons/ui-buttons';
import {UiTabsAccordion} from '../ui-tabs-accordion/ui-tabs-accordion';
import {UiListGroups} from '../ui-list-groups/ui-list-groups';
import {Grid} from '../grid/grid';
import {MapsGoogle} from '../maps-google/maps-google';
import {MapsVector} from '../maps-vector/maps-vector';
import {TablesBasic} from '../tables-basic/tables-basic';
import {TablesDynamic} from '../tables-dynamic/tables-dynamic';
import {ExtraCalendar} from '../extra-calendar/extra-calendar';
import {ExtraInvoice} from '../extra-invoice/extra-invoice';
import {ExtraGallery} from '../extra-gallery/extra-gallery';
import {ExtraSearchResults} from '../extra-search-results/extra-search-results';
import {ExtraTimeLine} from '../extra-time-line/extra-time-line';

export const CoreRoutes: RouterConfig = [
  {
    path: 'app',
    component: Core,
    children: [
      { path: 'dashboard', component: Dashboard},
      { path: 'inbox', component: Inbox},
      { path: 'widgets', component: Widgets},
      { path: 'charts', component: Charts },
      { path: 'profile', component: Profile },
      { path: 'forms/elements', component: FormsElements },
      { path: 'forms/validation', component: FormsValidation },
      { path: 'forms/wizard', component: FormsWizard },
      { path: 'ui/components', component: UiComponents },
      { path: 'ui/notifications', component: UiNotifications },
      { path: 'ui/icons', component: UiIcons },
      { path: 'ui/buttons', component: UiButtons},
      { path: 'ui/tabs-accordion', component: UiTabsAccordion},
      { path: 'ui/list-groups', component: UiListGroups},
      { path: 'grid', component: Grid},
      { path: 'maps/google', component: MapsGoogle },
      { path: 'maps/vector', component: MapsVector},
      { path: 'tables/basic', component: TablesBasic},
      { path: 'tables/dynamic', component: TablesDynamic},
      { path: 'extra/calendar', component: ExtraCalendar},
      { path: 'extra/invoice', component: ExtraInvoice},
      { path: 'extra/gallery', component: ExtraGallery},
      { path: 'extra/search', component: ExtraSearchResults},
      { path: 'extra/timeline', component: ExtraTimeLine}
    ]
  }
];
