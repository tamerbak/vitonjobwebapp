/**
 * angular2-google-maps - Angular 2 components for Google Maps
 * @version v0.12.0
 * @link https://github.com/SebastianM/angular2-google-maps#readme
 * @license MIT
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var lazy_maps_api_loader_1 = require('./services/maps-api-loader/lazy-maps-api-loader');
var maps_api_loader_1 = require('./services/maps-api-loader/maps-api-loader');
var browser_globals_1 = require('./utils/browser-globals');
// main modules
__export(require('./directives'));
__export(require('./services'));
// Google Maps types
exports.GOOGLE_MAPS_PROVIDERS = [
    browser_globals_1.BROWSER_GLOBALS_PROVIDERS,
    core_1.provide(maps_api_loader_1.MapsAPILoader, { useClass: lazy_maps_api_loader_1.LazyMapsAPILoader }),
];

//# sourceMappingURL=index.js.map
