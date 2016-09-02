// Polyfills
import 'es6-shim';
import 'es6-promise';
import 'es7-reflect-metadata';
import 'zone.js/dist/zone';

if ('production' === process.env.ENV) {
  require('rxjs/add/operator/map');
  require('rxjs/add/operator/mergeMap');

} else {

  /* tslint:disable */
  Error['stackTraceLimit'] = Infinity;
  /* tslint:enable */
  require('zone.js/dist/long-stack-trace-zone');
  require('rxjs/add/operator/map');
  require('rxjs/add/operator/mergeMap');
}

// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
