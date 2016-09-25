/*
 * Providers provided by Angular
 */

import "jquery";
import "tether";
import "bootstrap";
import "widgster";
import "jquery-touchswipe/jquery.touchSwipe";
import "jquery-slimscroll/jquery.slimscroll";
import "jquery-animateNumber/jquery.animateNumber";
import "jquery.sparkline/jquery.sparkline.min";
import "webpack-raphael";
import "jQuery-Mapael/js/jquery.mapael";
import "jQuery-Mapael/js/maps/usa_states";
import "jQuery-Mapael/js/maps/world_countries";
import "jquery-flot/jquery.flot.js";
import "jquery-flot/jquery.flot.selection.js";
import "jquery-flot/jquery.flot.time.js";
import "jquery.flot.animator/jquery.flot.animator.js";
import "flot-orderBars/js/jquery.flot.orderBars.js";
import "bootstrap_calendar/bootstrap_calendar/js/bootstrap_calendar.js";
import "croppie/croppie.js";
import "jquery.nestable/jquery.nestable.js";
import "jquery-ui/ui/mouse.js";
import "jquery-ui-touch-punch/jquery.ui.touch-punch.js";
import "jquery-ui/ui/sortable.js";
import "jquery-ui/ui/draggable.js";
import "moment/moment.js";
import "fullcalendar/dist/fullcalendar.js";
import "parsleyjs/dist/parsley.js";
import "bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js";
import "bootstrap-select/dist/js/bootstrap-select.js";
import "select2/select2.js";
import "select2/select2_locale_fr.js";
import "seiyria-bootstrap-slider/js/bootstrap-slider.js";
import "jasny-bootstrap/docs/assets/js/vendor/holder.js";
import "jasny-bootstrap/js/fileinput.js";
import "jasny-bootstrap/js/inputmask.js";
import "dropzone/dist/dropzone.js";
import "bootstrap-application-wizard/src/bootstrap-wizard.js";
import "twitter-bootstrap-wizard/jquery.bootstrap.wizard.js";
import "markdown/lib/markdown.js";
import "bootstrap-markdown/js/bootstrap-markdown.js";
import "ng2-datetime/src/vendor/bootstrap-datepicker/bootstrap-datepicker.min.js";
import "ng2-datetime/src/vendor/bootstrap-timepicker/bootstrap-timepicker.min.js";
import "underscore";
import "backbone";
import "backbone.paginator/lib/backbone.paginator.js";
import "backgrid/lib/backgrid.js";
import "backgrid-paginator/backgrid-paginator.js";
import "messenger/build/js/messenger.js";
import "messenger/docs/welcome/javascripts/location-sel.js";
import "shufflejs/dist/shuffle.js";
import "magnific-popup/dist/jquery.magnific-popup.js";
import "morris.js/morris.js";
import "easy-pie-chart/dist/jquery.easypiechart.js";
import "rickshaw";
import "metrojs/release/MetroJs.Full/MetroJs";
import "pace";
import "skycons/skycons.js";
import "jvectormap/jquery-jvectormap-2.0.3.min.js";
import "jvectormap-world/jquery-jvectormap-world-mill-en.js";
import {enableProdMode} from "@angular/core";
import {NgControl, LocationStrategy, HashLocationStrategy} from "@angular/common";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {HTTP_PROVIDERS} from "@angular/http";
import {GOOGLE_MAPS_PROVIDERS, provideLazyMapsAPILoaderConfig} from "angular2-google-maps/core";
import {APP_ROUTER_PROVIDERS} from "./app.routes";
import {SharedService} from "./providers/shared.service";
import {App} from "./app";
import {ConfigService} from "./app/core/config";
import {Configs} from "./configurations/configs";

//
//

const ENV_PROVIDERS = [];

if ('production' === process.env.ENV) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', function main(): void {
  bootstrap(App, [
    SharedService,
    ConfigService,
    NgControl,
    GOOGLE_MAPS_PROVIDERS,
    provideLazyMapsAPILoaderConfig({
      libraries: ['places'],
      apiKey: Configs.googleMapApiKey
    }),
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...APP_ROUTER_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ])
    .catch(err => console.error(err));
});
