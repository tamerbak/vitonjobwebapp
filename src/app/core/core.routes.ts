import {RouterConfig} from "@angular/router";
import {Core} from "./core";
import {Home} from "./../home/home";
import {Profile} from "../profile/profile";
import {Settings} from "../settings/settings";
import {Attachements} from "../attachements/attachements";
import {PendingContracts} from "../pending-contracts/pending-contracts";
import {OfferList} from "../offer-list/offer-list";
import {OfferEdit} from "../offer-edit/offer-edit";
import {SearchResults} from "../search-results/search-results";
import {SearchDetails} from "../search-details/search-details";
import {SearchCriteria} from "../search-criteria/search-criteria";
import {MissionList} from "../mission-list/mission-list";
import {MissionDetails} from "../mission-details/mission-details";
import {MissionEndReleve} from "../mission-end-releve/mission-end-releve";
import {MissionEndInvoice} from "../mission-end-invoice/mission-end-invoice";
import {Contract} from "../contract/contract";
import {Yousign} from "../yousign/yousign";
import {WalletCreate} from "../wallet-create/wallet-create";
import {MissionPointing} from "../mission-pointing/mission-pointing";
import {RecruiterList} from "../recruiter-list/recruiter-list";
import {RecruiterEdit} from "../recruiter-edit/recruiter-edit";
import {ConfirmExitPage, CanAccessPage} from "../../providers/routes.service";
import {PaymentMethod} from "../payment-method/payment-method";
import {About} from "../about/about";
import {AdvertList} from "../advert-list/advert-list";
import {AdvertEdit} from "../advert-edit/advert-edit";

/**
 * VitOnJob modules
 */

/**
 * This module contains all routes for the project
 */
export const CoreRoutes: RouterConfig = [
  {
    path: '',
    component: Core,
    children: [

      // Application
      {path: 'home', component: Home},
      {path: 'jobyer', component: Home},
      {path: 'employeur', component: Home},

      // User parameters
      {path: 'profile', component: Profile, canDeactivate: [ConfirmExitPage]},
      {path: 'settings', component: Settings, canDeactivate: [ConfirmExitPage]},

      // Offers management
      {path: 'offer/list', component: OfferList},
      {path: 'offer/edit', component: OfferEdit, canDeactivate: [ConfirmExitPage]},

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
      {path: 'contract/recruitment', component: Yousign, canActivate: [CanAccessPage]},
      {path: 'contract/hours-record', component: MissionEndReleve},
      {path: 'contract/invoice', component: MissionEndInvoice},

      // Payment
      {path: 'wallet/create', component: WalletCreate, canDeactivate: [ConfirmExitPage]},
      {path: 'payment/method', component: PaymentMethod, canActivate: [CanAccessPage]},

      // Grouped recruitment
      {path: 'pendingContracts', component: PendingContracts},
      {path: 'recruiter/list', component: RecruiterList},
      {path: 'recruiter/edit', component: RecruiterEdit},

      // Attachments chest
      {path: 'attachements', component: Attachements},

      // About
      {path: 'about', component: About},

      // Advert
      {path: 'advert/list', component: AdvertList},
      {path: 'advert/edit', component: AdvertEdit},
    ]
  }
];
