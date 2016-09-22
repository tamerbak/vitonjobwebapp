import {provideRouter, RouterConfig} from '@angular/router';
import {Core} from './core';
import {Dashboard} from './../dashboard/dashboard';
import {Inbox} from '../inbox/inbox';
import {Widgets} from '../widgets/widgets';
import {Charts} from '../charts/charts';
import {Profile} from '../profile/profile';
import {Civility} from '../civility/civility';
import {Settings} from '../settings/settings';
import {RecruitList} from '../recruit-list/recruit-list';
import {Attachements} from '../attachements/attachements';
import {PendingContracts} from '../pending-contracts/pending-contracts';
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
import {OfferList} from '../offer-list/offer-list';
import {OfferDetail} from '../offer-detail/offer-detail';
import {OfferAdd} from '../offer-add/offer-add';
import {SearchResults} from '../search-results/search-results';
import {SearchDetails} from '../search-details/search-details';
import {SearchCriteria} from '../search-criteria/search-criteria';
import {MissionList} from '../mission-list/mission-list';
import {MissionDetails} from '../mission-details/mission-details';
import {MissionEndReleve} from "../mission-end-releve/mission-end-releve";
import {MissionEndInvoice} from "../mission-end-invoice/mission-end-invoice";
import {Contract} from "../contract/contract";
import {Yousign} from "../yousign/yousign";
import {WalletCreate} from '../wallet-create/wallet-create';
import {MissionPointing} from '../mission-pointing/mission-pointing';

/**
 * This module contains all routes for the project
 */
export const CoreRoutes: RouterConfig = [
  {
    path: 'app',
    component: Core,
    children: [

      // Application
      {path: 'dashboard', component: Dashboard},

      // User parameters
      {path: 'profile', component: Profile},
      {path: 'civility', component: Civility},
      {path: 'settings', component: Settings},

      // Template deprecated
      {path: 'inbox', component: Inbox},
      {path: 'widgets', component: Widgets},
      {path: 'charts', component: Charts},
      {path: 'forms/elements', component: FormsElements},
      {path: 'forms/validation', component: FormsValidation},
      {path: 'forms/wizard', component: FormsWizard},
      {path: 'ui/components', component: UiComponents},
      {path: 'ui/notifications', component: UiNotifications},
      {path: 'ui/icons', component: UiIcons},
      {path: 'ui/buttons', component: UiButtons},
      {path: 'ui/tabs-accordion', component: UiTabsAccordion},
      {path: 'ui/list-groups', component: UiListGroups},
      {path: 'grid', component: Grid},
      {path: 'maps/google', component: MapsGoogle},
      {path: 'maps/vector', component: MapsVector},
      {path: 'tables/basic', component: TablesBasic},
      {path: 'tables/dynamic', component: TablesDynamic},
      {path: 'extra/calendar', component: ExtraCalendar},
      {path: 'extra/invoice', component: ExtraInvoice},
      {path: 'extra/gallery', component: ExtraGallery},
      {path: 'extra/search', component: ExtraSearchResults},
      {path: 'extra/timeline', component: ExtraTimeLine},

      // Offers management
      {path: 'offer/list', component: OfferList},
      {path: 'offer/detail', component: OfferDetail},
      {path: 'offer/add', component: OfferAdd},

      // Search management
      {path: 'search/results', component: SearchResults},
      {path: 'search/details', component: SearchDetails},
      {path: 'search/criteria', component: SearchCriteria},

      // Mission management
      {path: 'mission/list', component: MissionList},
      {path: 'mission/details', component: MissionDetails},
      {path: 'mission/details', component: MissionDetails},
      {path: 'mission/pointing', component: MissionPointing},

      // Contract management
      {path: 'contract/recruitment-form', component: Contract},
      {path: 'contract/recruitment', component: Yousign},
      {path: 'contract/hours-record', component: MissionEndReleve},
      {path: 'contract/invoice', component: MissionEndInvoice},

      // Payment
      {path: 'wallet/create', component: WalletCreate},

      // Grouped recruitment
      {path: 'recruitList', component: RecruitList},
      {path: 'pendingContracts', component: PendingContracts},

      // Attachments chest
      {path: 'attachements', component: Attachements},

    ]
  }
];
