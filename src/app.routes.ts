import { provideRouter, RouterConfig } from '@angular/router';
import {CoreRoutes} from './app/core/core.routes';
import {ErrorPage} from './app/error/error';
import {LoginPage} from './app/login/login';

const routes: RouterConfig = [
  ...CoreRoutes,
  { path: 'error', component: ErrorPage},
  { path: 'login', component: LoginPage},
  {
    path: '',
    redirectTo: '/app/dashboard',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/app/dashboard' },
];


export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
