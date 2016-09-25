import {RouterConfig} from '@angular/router';
import {Core} from './core';

/**
 * VitOnJob modules
 */
import {Dashboard} from './../dashboard/dashboard';
import {Profile} from '../profile/profile';
import {Settings} from '../settings/settings';
import {RecruitList} from '../recruit-list/recruit-list';
import {Attachements} from '../attachements/attachements';
import {PendingContracts} from '../pending-contracts/pending-contracts';
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
      {path: 'settings', component: Settings},

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
