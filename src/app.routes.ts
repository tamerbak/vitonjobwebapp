import { provideRouter, RouterConfig } from '@angular/router';
import {CoreRoutes} from './app/core/core.routes';
import {ErrorPage} from './app/error/error';
import {LoginPage} from './app/login/login';
import {REDIRECTTO} from './app/core/core';
import {SignupPage} from "./app/signup/signup";

export const routes: RouterConfig = [
  ...CoreRoutes,
  { path: 'error', component: ErrorPage},
  { path: 'login', component: LoginPage},
  { path: 'signup', component: SignupPage},
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: REDIRECTTO },
];


export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
