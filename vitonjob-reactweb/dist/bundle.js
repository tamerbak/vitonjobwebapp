/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var react_router_1 = __webpack_require__(3);
	var root_1 = __webpack_require__(67);
	ReactDOM.render(React.createElement(root_1.Root, {history: react_router_1.hashHistory}), document.body);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.createMemoryHistory = exports.hashHistory = exports.browserHistory = exports.applyRouterMiddleware = exports.formatPattern = exports.useRouterHistory = exports.match = exports.routerShape = exports.locationShape = exports.PropTypes = exports.RoutingContext = exports.RouterContext = exports.createRoutes = exports.useRoutes = exports.RouteContext = exports.Lifecycle = exports.History = exports.Route = exports.Redirect = exports.IndexRoute = exports.IndexRedirect = exports.withRouter = exports.IndexLink = exports.Link = exports.Router = undefined;
	
	var _RouteUtils = __webpack_require__(4);
	
	Object.defineProperty(exports, 'createRoutes', {
	  enumerable: true,
	  get: function get() {
	    return _RouteUtils.createRoutes;
	  }
	});
	
	var _PropTypes2 = __webpack_require__(5);
	
	Object.defineProperty(exports, 'locationShape', {
	  enumerable: true,
	  get: function get() {
	    return _PropTypes2.locationShape;
	  }
	});
	Object.defineProperty(exports, 'routerShape', {
	  enumerable: true,
	  get: function get() {
	    return _PropTypes2.routerShape;
	  }
	});
	
	var _PatternUtils = __webpack_require__(11);
	
	Object.defineProperty(exports, 'formatPattern', {
	  enumerable: true,
	  get: function get() {
	    return _PatternUtils.formatPattern;
	  }
	});
	
	var _Router2 = __webpack_require__(13);
	
	var _Router3 = _interopRequireDefault(_Router2);
	
	var _Link2 = __webpack_require__(44);
	
	var _Link3 = _interopRequireDefault(_Link2);
	
	var _IndexLink2 = __webpack_require__(45);
	
	var _IndexLink3 = _interopRequireDefault(_IndexLink2);
	
	var _withRouter2 = __webpack_require__(46);
	
	var _withRouter3 = _interopRequireDefault(_withRouter2);
	
	var _IndexRedirect2 = __webpack_require__(48);
	
	var _IndexRedirect3 = _interopRequireDefault(_IndexRedirect2);
	
	var _IndexRoute2 = __webpack_require__(50);
	
	var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);
	
	var _Redirect2 = __webpack_require__(49);
	
	var _Redirect3 = _interopRequireDefault(_Redirect2);
	
	var _Route2 = __webpack_require__(51);
	
	var _Route3 = _interopRequireDefault(_Route2);
	
	var _History2 = __webpack_require__(52);
	
	var _History3 = _interopRequireDefault(_History2);
	
	var _Lifecycle2 = __webpack_require__(53);
	
	var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);
	
	var _RouteContext2 = __webpack_require__(54);
	
	var _RouteContext3 = _interopRequireDefault(_RouteContext2);
	
	var _useRoutes2 = __webpack_require__(55);
	
	var _useRoutes3 = _interopRequireDefault(_useRoutes2);
	
	var _RouterContext2 = __webpack_require__(41);
	
	var _RouterContext3 = _interopRequireDefault(_RouterContext2);
	
	var _RoutingContext2 = __webpack_require__(56);
	
	var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);
	
	var _PropTypes3 = _interopRequireDefault(_PropTypes2);
	
	var _match2 = __webpack_require__(57);
	
	var _match3 = _interopRequireDefault(_match2);
	
	var _useRouterHistory2 = __webpack_require__(61);
	
	var _useRouterHistory3 = _interopRequireDefault(_useRouterHistory2);
	
	var _applyRouterMiddleware2 = __webpack_require__(62);
	
	var _applyRouterMiddleware3 = _interopRequireDefault(_applyRouterMiddleware2);
	
	var _browserHistory2 = __webpack_require__(63);
	
	var _browserHistory3 = _interopRequireDefault(_browserHistory2);
	
	var _hashHistory2 = __webpack_require__(66);
	
	var _hashHistory3 = _interopRequireDefault(_hashHistory2);
	
	var _createMemoryHistory2 = __webpack_require__(58);
	
	var _createMemoryHistory3 = _interopRequireDefault(_createMemoryHistory2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Router = _Router3.default; /* components */
	
	exports.Link = _Link3.default;
	exports.IndexLink = _IndexLink3.default;
	exports.withRouter = _withRouter3.default;
	
	/* components (configuration) */
	
	exports.IndexRedirect = _IndexRedirect3.default;
	exports.IndexRoute = _IndexRoute3.default;
	exports.Redirect = _Redirect3.default;
	exports.Route = _Route3.default;
	
	/* mixins */
	
	exports.History = _History3.default;
	exports.Lifecycle = _Lifecycle3.default;
	exports.RouteContext = _RouteContext3.default;
	
	/* utils */
	
	exports.useRoutes = _useRoutes3.default;
	exports.RouterContext = _RouterContext3.default;
	exports.RoutingContext = _RoutingContext3.default;
	exports.PropTypes = _PropTypes3.default;
	exports.match = _match3.default;
	exports.useRouterHistory = _useRouterHistory3.default;
	exports.applyRouterMiddleware = _applyRouterMiddleware3.default;
	
	/* histories */
	
	exports.browserHistory = _browserHistory3.default;
	exports.hashHistory = _hashHistory3.default;
	exports.createMemoryHistory = _createMemoryHistory3.default;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isValidChild(object) {
	  return object == null || _react2.default.isValidElement(object);
	}
	
	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}
	
	function createRoute(defaultProps, props) {
	  return _extends({}, defaultProps, props);
	}
	
	function createRouteFromReactElement(element) {
	  var type = element.type;
	  var route = createRoute(type.defaultProps, element.props);
	
	  if (route.children) {
	    var childRoutes = createRoutesFromReactChildren(route.children, route);
	
	    if (childRoutes.length) route.childRoutes = childRoutes;
	
	    delete route.children;
	  }
	
	  return route;
	}
	
	/**
	 * Creates and returns a routes object from the given ReactChildren. JSX
	 * provides a convenient way to visualize how routes in the hierarchy are
	 * nested.
	 *
	 *   import { Route, createRoutesFromReactChildren } from 'react-router'
	 *
	 *   const routes = createRoutesFromReactChildren(
	 *     <Route component={App}>
	 *       <Route path="home" component={Dashboard}/>
	 *       <Route path="news" component={NewsFeed}/>
	 *     </Route>
	 *   )
	 *
	 * Note: This method is automatically used when you provide <Route> children
	 * to a <Router> component.
	 */
	function createRoutesFromReactChildren(children, parentRoute) {
	  var routes = [];
	
	  _react2.default.Children.forEach(children, function (element) {
	    if (_react2.default.isValidElement(element)) {
	      // Component classes may have a static create* method.
	      if (element.type.createRouteFromReactElement) {
	        var route = element.type.createRouteFromReactElement(element, parentRoute);
	
	        if (route) routes.push(route);
	      } else {
	        routes.push(createRouteFromReactElement(element));
	      }
	    }
	  });
	
	  return routes;
	}
	
	/**
	 * Creates and returns an array of routes from the given object which
	 * may be a JSX route, a plain object route, or an array of either.
	 */
	function createRoutes(routes) {
	  if (isReactChildren(routes)) {
	    routes = createRoutesFromReactChildren(routes);
	  } else if (routes && !Array.isArray(routes)) {
	    routes = [routes];
	  }
	
	  return routes;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.router = exports.routes = exports.route = exports.components = exports.component = exports.location = exports.history = exports.falsy = exports.locationShape = exports.routerShape = undefined;
	
	var _react = __webpack_require__(1);
	
	var _deprecateObjectProperties = __webpack_require__(7);
	
	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);
	
	var _InternalPropTypes = __webpack_require__(10);
	
	var InternalPropTypes = _interopRequireWildcard(_InternalPropTypes);
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	var routerShape = exports.routerShape = shape({
	  push: func.isRequired,
	  replace: func.isRequired,
	  go: func.isRequired,
	  goBack: func.isRequired,
	  goForward: func.isRequired,
	  setRouteLeaveHook: func.isRequired,
	  isActive: func.isRequired
	});
	
	var locationShape = exports.locationShape = shape({
	  pathname: string.isRequired,
	  search: string.isRequired,
	  state: object,
	  action: string.isRequired,
	  key: string
	});
	
	// Deprecated stuff below:
	
	var falsy = exports.falsy = InternalPropTypes.falsy;
	var history = exports.history = InternalPropTypes.history;
	var location = exports.location = locationShape;
	var component = exports.component = InternalPropTypes.component;
	var components = exports.components = InternalPropTypes.components;
	var route = exports.route = InternalPropTypes.route;
	var routes = exports.routes = InternalPropTypes.routes;
	var router = exports.router = routerShape;
	
	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var deprecatePropType = function deprecatePropType(propType, message) {
	      return function () {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
	        return propType.apply(undefined, arguments);
	      };
	    };
	
	    var deprecateInternalPropType = function deprecateInternalPropType(propType) {
	      return deprecatePropType(propType, 'This prop type is not intended for external use, and was previously exported by mistake. These internal prop types are deprecated for external use, and will be removed in a later version.');
	    };
	
	    var deprecateRenamedPropType = function deprecateRenamedPropType(propType, name) {
	      return deprecatePropType(propType, 'The `' + name + '` prop type is now exported as `' + name + 'Shape` to avoid name conflicts. This export is deprecated and will be removed in a later version.');
	    };
	
	    exports.falsy = falsy = deprecateInternalPropType(falsy);
	    exports.history = history = deprecateInternalPropType(history);
	    exports.component = component = deprecateInternalPropType(component);
	    exports.components = components = deprecateInternalPropType(components);
	    exports.route = route = deprecateInternalPropType(route);
	    exports.routes = routes = deprecateInternalPropType(routes);
	
	    exports.location = location = deprecateRenamedPropType(location, 'location');
	    exports.router = router = deprecateRenamedPropType(router, 'router');
	  })();
	}
	
	var defaultExport = {
	  falsy: falsy,
	  history: history,
	  location: location,
	  component: component,
	  components: components,
	  route: route,
	  // For some reason, routes was never here.
	  router: router
	};
	
	if (process.env.NODE_ENV !== 'production') {
	  defaultExport = (0, _deprecateObjectProperties2.default)(defaultExport, 'The default export from `react-router/lib/PropTypes` is deprecated. Please use the named exports instead.');
	}
	
	exports.default = defaultExport;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function () {
	            throw new Error('setTimeout is not defined');
	        }
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function () {
	            throw new Error('clearTimeout is not defined');
	        }
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.canUseMembrane = undefined;
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var canUseMembrane = exports.canUseMembrane = false;
	
	// No-op by default.
	var deprecateObjectProperties = function deprecateObjectProperties(object) {
	  return object;
	};
	
	if (process.env.NODE_ENV !== 'production') {
	  try {
	    if (Object.defineProperty({}, 'x', {
	      get: function get() {
	        return true;
	      }
	    }).x) {
	      exports.canUseMembrane = canUseMembrane = true;
	    }
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	
	  if (canUseMembrane) {
	    deprecateObjectProperties = function deprecateObjectProperties(object, message) {
	      // Wrap the deprecated object in a membrane to warn on property access.
	      var membrane = {};
	
	      var _loop = function _loop(prop) {
	        if (!Object.prototype.hasOwnProperty.call(object, prop)) {
	          return 'continue';
	        }
	
	        if (typeof object[prop] === 'function') {
	          // Can't use fat arrow here because of use of arguments below.
	          membrane[prop] = function () {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
	            return object[prop].apply(object, arguments);
	          };
	          return 'continue';
	        }
	
	        // These properties are non-enumerable to prevent React dev tools from
	        // seeing them and causing spurious warnings when accessing them. In
	        // principle this could be done with a proxy, but support for the
	        // ownKeys trap on proxies is not universal, even among browsers that
	        // otherwise support proxies.
	        Object.defineProperty(membrane, prop, {
	          get: function get() {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, message) : void 0;
	            return object[prop];
	          }
	        });
	      };
	
	      for (var prop in object) {
	        var _ret = _loop(prop);
	
	        if (_ret === 'continue') continue;
	      }
	
	      return membrane;
	    };
	  }
	}
	
	exports.default = deprecateObjectProperties;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = routerWarning;
	exports._resetWarned = _resetWarned;
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var warned = {};
	
	function routerWarning(falseToWarn, message) {
	  // Only issue deprecation warnings once.
	  if (message.indexOf('deprecated') !== -1) {
	    if (warned[message]) {
	      return;
	    }
	
	    warned[message] = true;
	  }
	
	  message = '[react-router] ' + message;
	
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }
	
	  _warning2.default.apply(undefined, [falseToWarn, message].concat(args));
	}
	
	function _resetWarned() {
	  warned = {};
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.routes = exports.route = exports.components = exports.component = exports.history = undefined;
	exports.falsy = falsy;
	
	var _react = __webpack_require__(1);
	
	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var arrayOf = _react.PropTypes.arrayOf;
	var oneOfType = _react.PropTypes.oneOfType;
	var element = _react.PropTypes.element;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;
	function falsy(props, propName, componentName) {
	  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	}
	
	var history = exports.history = shape({
	  listen: func.isRequired,
	  push: func.isRequired,
	  replace: func.isRequired,
	  go: func.isRequired,
	  goBack: func.isRequired,
	  goForward: func.isRequired
	});
	
	var component = exports.component = oneOfType([func, string]);
	var components = exports.components = oneOfType([component, object]);
	var route = exports.route = oneOfType([object, element]);
	var routes = exports.routes = oneOfType([route, arrayOf(route)]);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.getParams = getParams;
	exports.formatPattern = formatPattern;
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}
	
	function _compilePattern(pattern) {
	  var regexpSource = '';
	  var paramNames = [];
	  var tokens = [];
	
	  var match = void 0,
	      lastIndex = 0,
	      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
	  while (match = matcher.exec(pattern)) {
	    if (match.index !== lastIndex) {
	      tokens.push(pattern.slice(lastIndex, match.index));
	      regexpSource += escapeRegExp(pattern.slice(lastIndex, match.index));
	    }
	
	    if (match[1]) {
	      regexpSource += '([^/]+)';
	      paramNames.push(match[1]);
	    } else if (match[0] === '**') {
	      regexpSource += '(.*)';
	      paramNames.push('splat');
	    } else if (match[0] === '*') {
	      regexpSource += '(.*?)';
	      paramNames.push('splat');
	    } else if (match[0] === '(') {
	      regexpSource += '(?:';
	    } else if (match[0] === ')') {
	      regexpSource += ')?';
	    }
	
	    tokens.push(match[0]);
	
	    lastIndex = matcher.lastIndex;
	  }
	
	  if (lastIndex !== pattern.length) {
	    tokens.push(pattern.slice(lastIndex, pattern.length));
	    regexpSource += escapeRegExp(pattern.slice(lastIndex, pattern.length));
	  }
	
	  return {
	    pattern: pattern,
	    regexpSource: regexpSource,
	    paramNames: paramNames,
	    tokens: tokens
	  };
	}
	
	var CompiledPatternsCache = Object.create(null);
	
	function compilePattern(pattern) {
	  if (!CompiledPatternsCache[pattern]) CompiledPatternsCache[pattern] = _compilePattern(pattern);
	
	  return CompiledPatternsCache[pattern];
	}
	
	/**
	 * Attempts to match a pattern on the given pathname. Patterns may use
	 * the following special characters:
	 *
	 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
	 *                  captured string is considered a "param"
	 * - ()             Wraps a segment of the URL that is optional
	 * - *              Consumes (non-greedy) all characters up to the next
	 *                  character in the pattern, or to the end of the URL if
	 *                  there is none
	 * - **             Consumes (greedy) all characters up to the next character
	 *                  in the pattern, or to the end of the URL if there is none
	 *
	 *  The function calls callback(error, matched) when finished.
	 * The return value is an object with the following properties:
	 *
	 * - remainingPathname
	 * - paramNames
	 * - paramValues
	 */
	function matchPattern(pattern, pathname) {
	  // Ensure pattern starts with leading slash for consistency with pathname.
	  if (pattern.charAt(0) !== '/') {
	    pattern = '/' + pattern;
	  }
	
	  var _compilePattern2 = compilePattern(pattern);
	
	  var regexpSource = _compilePattern2.regexpSource;
	  var paramNames = _compilePattern2.paramNames;
	  var tokens = _compilePattern2.tokens;
	
	
	  if (pattern.charAt(pattern.length - 1) !== '/') {
	    regexpSource += '/?'; // Allow optional path separator at end.
	  }
	
	  // Special-case patterns like '*' for catch-all routes.
	  if (tokens[tokens.length - 1] === '*') {
	    regexpSource += '$';
	  }
	
	  var match = pathname.match(new RegExp('^' + regexpSource, 'i'));
	  if (match == null) {
	    return null;
	  }
	
	  var matchedPath = match[0];
	  var remainingPathname = pathname.substr(matchedPath.length);
	
	  if (remainingPathname) {
	    // Require that the match ends at a path separator, if we didn't match
	    // the full path, so any remaining pathname is a new path segment.
	    if (matchedPath.charAt(matchedPath.length - 1) !== '/') {
	      return null;
	    }
	
	    // If there is a remaining pathname, treat the path separator as part of
	    // the remaining pathname for properly continuing the match.
	    remainingPathname = '/' + remainingPathname;
	  }
	
	  return {
	    remainingPathname: remainingPathname,
	    paramNames: paramNames,
	    paramValues: match.slice(1).map(function (v) {
	      return v && decodeURIComponent(v);
	    })
	  };
	}
	
	function getParamNames(pattern) {
	  return compilePattern(pattern).paramNames;
	}
	
	function getParams(pattern, pathname) {
	  var match = matchPattern(pattern, pathname);
	  if (!match) {
	    return null;
	  }
	
	  var paramNames = match.paramNames;
	  var paramValues = match.paramValues;
	
	  var params = {};
	
	  paramNames.forEach(function (paramName, index) {
	    params[paramName] = paramValues[index];
	  });
	
	  return params;
	}
	
	/**
	 * Returns a version of the given pattern with params interpolated. Throws
	 * if there is a dynamic segment of the pattern for which there is no param.
	 */
	function formatPattern(pattern, params) {
	  params = params || {};
	
	  var _compilePattern3 = compilePattern(pattern);
	
	  var tokens = _compilePattern3.tokens;
	
	  var parenCount = 0,
	      pathname = '',
	      splatIndex = 0;
	
	  var token = void 0,
	      paramName = void 0,
	      paramValue = void 0;
	  for (var i = 0, len = tokens.length; i < len; ++i) {
	    token = tokens[i];
	
	    if (token === '*' || token === '**') {
	      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;
	
	      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : (0, _invariant2.default)(false) : void 0;
	
	      if (paramValue != null) pathname += encodeURI(paramValue);
	    } else if (token === '(') {
	      parenCount += 1;
	    } else if (token === ')') {
	      parenCount -= 1;
	    } else if (token.charAt(0) === ':') {
	      paramName = token.substring(1);
	      paramValue = params[paramName];
	
	      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : (0, _invariant2.default)(false) : void 0;
	
	      if (paramValue != null) pathname += encodeURIComponent(paramValue);
	    } else {
	      pathname += token;
	    }
	  }
	
	  return pathname.replace(/\/+/g, '/');
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createHashHistory = __webpack_require__(14);
	
	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);
	
	var _useQueries = __webpack_require__(30);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _createTransitionManager = __webpack_require__(33);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _InternalPropTypes = __webpack_require__(10);
	
	var _RouterContext = __webpack_require__(41);
	
	var _RouterContext2 = _interopRequireDefault(_RouterContext);
	
	var _RouteUtils = __webpack_require__(4);
	
	var _RouterUtils = __webpack_require__(43);
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function isDeprecatedHistory(history) {
	  return !history || !history.__v2_compatible__;
	}
	
	/* istanbul ignore next: sanity check */
	function isUnsupportedHistory(history) {
	  // v3 histories expose getCurrentLocation, but aren't currently supported.
	  return history && history.getCurrentLocation;
	}
	
	var _React$PropTypes = _react2.default.PropTypes;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	
	/**
	 * A <Router> is a high-level API for automatically setting up
	 * a router that renders a <RouterContext> with all the props
	 * it needs each time the URL changes.
	 */
	
	var Router = _react2.default.createClass({
	  displayName: 'Router',
	
	
	  propTypes: {
	    history: object,
	    children: _InternalPropTypes.routes,
	    routes: _InternalPropTypes.routes, // alias for children
	    render: func,
	    createElement: func,
	    onError: func,
	    onUpdate: func,
	
	    // Deprecated:
	    parseQueryString: func,
	    stringifyQuery: func,
	
	    // PRIVATE: For client-side rehydration of server match.
	    matchContext: object
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      render: function render(props) {
	        return _react2.default.createElement(_RouterContext2.default, props);
	      }
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      location: null,
	      routes: null,
	      params: null,
	      components: null
	    };
	  },
	  handleError: function handleError(error) {
	    if (this.props.onError) {
	      this.props.onError.call(this, error);
	    } else {
	      // Throw errors by default so we don't silently swallow them!
	      throw error; // This error probably occurred in getChildRoutes or getComponents.
	    }
	  },
	  componentWillMount: function componentWillMount() {
	    var _this = this;
	
	    var _props = this.props;
	    var parseQueryString = _props.parseQueryString;
	    var stringifyQuery = _props.stringifyQuery;
	
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(!(parseQueryString || stringifyQuery), '`parseQueryString` and `stringifyQuery` are deprecated. Please create a custom history. http://tiny.cc/router-customquerystring') : void 0;
	
	    var _createRouterObjects = this.createRouterObjects();
	
	    var history = _createRouterObjects.history;
	    var transitionManager = _createRouterObjects.transitionManager;
	    var router = _createRouterObjects.router;
	
	
	    this._unlisten = transitionManager.listen(function (error, state) {
	      if (error) {
	        _this.handleError(error);
	      } else {
	        _this.setState(state, _this.props.onUpdate);
	      }
	    });
	
	    this.history = history;
	    this.router = router;
	  },
	  createRouterObjects: function createRouterObjects() {
	    var matchContext = this.props.matchContext;
	
	    if (matchContext) {
	      return matchContext;
	    }
	
	    var history = this.props.history;
	    var _props2 = this.props;
	    var routes = _props2.routes;
	    var children = _props2.children;
	
	
	    !!isUnsupportedHistory(history) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'You have provided a history object created with history v3.x. ' + 'This version of React Router is not compatible with v3 history ' + 'objects. Please use history v2.x instead.') : (0, _invariant2.default)(false) : void 0;
	
	    if (isDeprecatedHistory(history)) {
	      history = this.wrapDeprecatedHistory(history);
	    }
	
	    var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes || children));
	    var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
	    var routingHistory = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);
	
	    return { history: routingHistory, transitionManager: transitionManager, router: router };
	  },
	  wrapDeprecatedHistory: function wrapDeprecatedHistory(history) {
	    var _props3 = this.props;
	    var parseQueryString = _props3.parseQueryString;
	    var stringifyQuery = _props3.stringifyQuery;
	
	
	    var createHistory = void 0;
	    if (history) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'It appears you have provided a deprecated history object to `<Router/>`, please use a history provided by ' + 'React Router with `import { browserHistory } from \'react-router\'` or `import { hashHistory } from \'react-router\'`. ' + 'If you are using a custom history please create it with `useRouterHistory`, see http://tiny.cc/router-usinghistory for details.') : void 0;
	      createHistory = function createHistory() {
	        return history;
	      };
	    } else {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`Router` no longer defaults the history prop to hash history. Please use the `hashHistory` singleton instead. http://tiny.cc/router-defaulthistory') : void 0;
	      createHistory = _createHashHistory2.default;
	    }
	
	    return (0, _useQueries2.default)(createHistory)({ parseQueryString: parseQueryString, stringifyQuery: stringifyQuery });
	  },
	
	
	  /* istanbul ignore next: sanity check */
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : void 0;
	
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : void 0;
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlisten) this._unlisten();
	  },
	  render: function render() {
	    var _state = this.state;
	    var location = _state.location;
	    var routes = _state.routes;
	    var params = _state.params;
	    var components = _state.components;
	    var _props4 = this.props;
	    var createElement = _props4.createElement;
	    var render = _props4.render;
	
	    var props = _objectWithoutProperties(_props4, ['createElement', 'render']);
	
	    if (location == null) return null; // Async match
	
	    // Only forward non-Router-specific props to routing context, as those are
	    // the only ones that might be custom routing context props.
	    Object.keys(Router.propTypes).forEach(function (propType) {
	      return delete props[propType];
	    });
	
	    return render(_extends({}, props, {
	      history: this.history,
	      router: this.router,
	      location: location,
	      routes: routes,
	      params: params,
	      components: components,
	      createElement: createElement
	    }));
	  }
	});
	
	exports.default = Router;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(15);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(16);
	
	var _PathUtils = __webpack_require__(17);
	
	var _ExecutionEnvironment = __webpack_require__(18);
	
	var _DOMUtils = __webpack_require__(19);
	
	var _DOMStateStorage = __webpack_require__(20);
	
	var _createDOMHistory = __webpack_require__(21);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}
	
	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();
	
	  if (isAbsolutePath(path)) return true;
	
	  _DOMUtils.replaceHashPath('/' + path);
	
	  return false;
	}
	
	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}
	
	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}
	
	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}
	
	var DefaultQueryKey = '_k';
	
	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;
	
	  var queryKey = options.queryKey;
	
	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;
	
	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();
	
	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);
	
	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    } else {
	      key = state = null;
	    }
	
	    var location = _PathUtils.parsePath(path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.
	
	      transitionTo(getCurrentLocation());
	    }
	
	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    var path = (basename || '') + pathname + search;
	
	    if (queryKey) {
	      path = addQueryStringValueToPath(path, queryKey, key);
	      _DOMStateStorage.saveState(key, state);
	    } else {
	      // Drop key and state.
	      location.key = location.state = null;
	    }
	
	    var currentHash = _DOMUtils.getHashPath();
	
	    if (action === _Actions.PUSH) {
	      if (currentHash !== path) {
	        window.location.hash = path;
	      } else {
	        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
	      }
	    } else if (currentHash !== path) {
	      // REPLACE
	      _DOMUtils.replaceHashPath(path);
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopHashChangeListener = undefined;
	
	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listenBefore(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }
	
	  function push(location) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.push(location);
	  }
	
	  function replace(location) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.replace(location);
	  }
	
	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();
	
	  function go(n) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;
	
	    history.go(n);
	  }
	
	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);
	
	    history.registerTransitionHook(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);
	
	    if (--listenerCount === 0) stopHashChangeListener();
	  }
	
	  // deprecated
	  function pushState(state, path) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.pushState(state, path);
	  }
	
	  // deprecated
	  function replaceState(state, path) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;
	
	    history.replaceState(state, path);
	  }
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    push: push,
	    replace: replace,
	    go: go,
	    createHref: createHref,
	
	    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
	    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
	    pushState: pushState, // deprecated - warning is in createHistory
	    replaceState: replaceState // deprecated - warning is in createHistory
	  });
	}
	
	exports['default'] = createHashHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	
	var warning = function() {};
	
	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }
	
	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }
	
	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}
	
	module.exports = warning;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';
	
	exports.__esModule = true;
	var PUSH = 'PUSH';
	
	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';
	
	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';
	
	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.extractPath = extractPath;
	exports.parsePath = parsePath;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(15);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);
	
	  if (match == null) return string;
	
	  return string.substring(match[0].length);
	}
	
	function parsePath(path) {
	  var pathname = extractPath(path);
	  var search = '';
	  var hash = '';
	
	  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;
	
	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }
	
	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }
	
	  if (pathname === '') pathname = '/';
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;
	
	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}
	
	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}
	
	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}
	
	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}
	
	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}
	
	function go(n) {
	  if (n) window.history.go(n);
	}
	
	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}
	
	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */
	
	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}
	
	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */
	
	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*eslint-disable no-empty */
	'use strict';
	
	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(15);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var KeyPrefix = '@@History/';
	var QuotaExceededErrors = ['QuotaExceededError', 'QUOTA_EXCEEDED_ERR'];
	
	var SecurityError = 'SecurityError';
	
	function createKey(key) {
	  return KeyPrefix + key;
	}
	
	function saveState(key, state) {
	  try {
	    if (state == null) {
	      window.sessionStorage.removeItem(createKey(key));
	    } else {
	      window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	    }
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;
	
	      return;
	    }
	
	    if (QuotaExceededErrors.indexOf(error.name) >= 0 && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;
	
	      return;
	    }
	
	    throw error;
	  }
	}
	
	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;
	
	      return null;
	    }
	  }
	
	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }
	
	  return null;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _ExecutionEnvironment = __webpack_require__(18);
	
	var _DOMUtils = __webpack_require__(19);
	
	var _createHistory = __webpack_require__(22);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));
	
	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;
	
	    return history.listen(listener);
	  }
	
	  return _extends({}, history, {
	    listen: listen
	  });
	}
	
	exports['default'] = createDOMHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(15);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _deepEqual = __webpack_require__(23);
	
	var _deepEqual2 = _interopRequireDefault(_deepEqual);
	
	var _PathUtils = __webpack_require__(17);
	
	var _AsyncUtils = __webpack_require__(26);
	
	var _Actions = __webpack_require__(16);
	
	var _createLocation2 = __webpack_require__(27);
	
	var _createLocation3 = _interopRequireDefault(_createLocation2);
	
	var _runTransitionHook = __webpack_require__(28);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _deprecate = __webpack_require__(29);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}
	
	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}
	
	var DefaultKeyLength = 6;
	
	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var getUserConfirmation = options.getUserConfirmation;
	  var keyLength = options.keyLength;
	
	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;
	
	  var transitionHooks = [];
	
	  function listenBefore(hook) {
	    transitionHooks.push(hook);
	
	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }
	
	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;
	
	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }
	
	  function updateLocation(newLocation) {
	    var current = getCurrent();
	
	    location = newLocation;
	
	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }
	
	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }
	
	  function listen(listener) {
	    changeListeners.push(listener);
	
	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }
	
	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }
	
	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }
	
	  var pendingLocation = undefined;
	
	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.
	
	    pendingLocation = nextLocation;
	
	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.
	
	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);
	
	          if (nextPath === prevPath && _deepEqual2['default'](location.state, nextLocation.state)) nextLocation.action = _Actions.REPLACE;
	        }
	
	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);
	
	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }
	
	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }
	
	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }
	
	  function goBack() {
	    go(-1);
	  }
	
	  function goForward() {
	    go(1);
	  }
	
	  function createKey() {
	    return createRandomKey(keyLength);
	  }
	
	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;
	
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	
	    var result = pathname;
	
	    if (search) result += search;
	
	    if (hash) result += hash;
	
	    return result;
	  }
	
	  function createHref(location) {
	    return createPath(location);
	  }
	
	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];
	
	    if (typeof action === 'object') {
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'The state (2nd) argument to history.createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;
	
	      if (typeof location === 'string') location = _PathUtils.parsePath(location);
	
	      location = _extends({}, location, { state: action });
	
	      action = key;
	      key = arguments[3] || createKey();
	    }
	
	    return _createLocation3['default'](location, action, key);
	  }
	
	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }
	
	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }
	
	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	    push(_extends({ state: state }, path));
	  }
	
	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	    replace(_extends({ state: state }, path));
	  }
	
	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,
	
	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}
	
	exports['default'] = createHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(24);
	var isArguments = __webpack_require__(25);
	
	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	
	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();
	
	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;
	
	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}
	
	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}
	
	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}
	
	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 24 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;
	
	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 25 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';
	
	exports = module.exports = supportsArgumentsClass ? supported : unsupported;
	
	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};
	
	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var _slice = Array.prototype.slice;
	exports.loopAsync = loopAsync;
	
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var sync = false,
	      hasNext = false,
	      doneArgs = undefined;
	
	  function done() {
	    isDone = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = [].concat(_slice.call(arguments));
	      return;
	    }
	
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) {
	      return;
	    }
	
	    hasNext = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      return;
	    }
	
	    sync = true;
	
	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work.call(this, currentTurn++, next, done);
	    }
	
	    sync = false;
	
	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(this, doneArgs);
	      return;
	    }
	
	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  }
	
	  next();
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(15);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _Actions = __webpack_require__(16);
	
	var _PathUtils = __webpack_require__(17);
	
	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	  if (typeof location === 'string') location = _PathUtils.parsePath(location);
	
	  if (typeof action === 'object') {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'The state (2nd) argument to createLocation is deprecated; use a ' + 'location descriptor instead') : undefined;
	
	    location = _extends({}, location, { state: action });
	
	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }
	
	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;
	
	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}
	
	exports['default'] = createLocation;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(15);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);
	
	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}
	
	exports['default'] = runTransitionHook;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(15);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function deprecate(fn, message) {
	  return function () {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] ' + message) : undefined;
	    return fn.apply(this, arguments);
	  };
	}
	
	exports['default'] = deprecate;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(15);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _queryString = __webpack_require__(31);
	
	var _runTransitionHook = __webpack_require__(28);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _PathUtils = __webpack_require__(17);
	
	var _deprecate = __webpack_require__(29);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	var SEARCH_BASE_KEY = '$searchBase';
	
	function defaultStringifyQuery(query) {
	  return _queryString.stringify(query).replace(/%20/g, '+');
	}
	
	var defaultParseQueryString = _queryString.parse;
	
	function isNestedObject(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
	  }return false;
	}
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var history = createHistory(options);
	
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;
	
	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;
	
	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;
	
	    function addQuery(location) {
	      if (location.query == null) {
	        var search = location.search;
	
	        location.query = parseQueryString(search.substring(1));
	        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
	      }
	
	      // TODO: Instead of all the book-keeping here, this should just strip the
	      // stringified query from the search.
	
	      return location;
	    }
	
	    function appendQuery(location, query) {
	      var _extends2;
	
	      var searchBaseSpec = location[SEARCH_BASE_KEY];
	      var queryString = query ? stringifyQuery(query) : '';
	      if (!searchBaseSpec && !queryString) {
	        return location;
	      }
	
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;
	
	      if (typeof location === 'string') location = _PathUtils.parsePath(location);
	
	      var searchBase = undefined;
	      if (searchBaseSpec && location.search === searchBaseSpec.search) {
	        searchBase = searchBaseSpec.searchBase;
	      } else {
	        searchBase = location.search || '';
	      }
	
	      var search = searchBase;
	      if (queryString) {
	        search += (search ? '&' : '?') + queryString;
	      }
	
	      return _extends({}, location, (_extends2 = {
	        search: search
	      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
	    }
	
	    // Override all read methods with query-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addQuery(location), callback);
	      });
	    }
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addQuery(location));
	      });
	    }
	
	    // Override all write methods with query-aware versions.
	    function push(location) {
	      history.push(appendQuery(location, location.query));
	    }
	
	    function replace(location) {
	      history.replace(appendQuery(location, location.query));
	    }
	
	    function createPath(location, query) {
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](!query, 'the query argument to createPath is deprecated; use a location descriptor instead') : undefined;
	
	      return history.createPath(appendQuery(location, query || location.query));
	    }
	
	    function createHref(location, query) {
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](!query, 'the query argument to createHref is deprecated; use a location descriptor instead') : undefined;
	
	      return history.createHref(appendQuery(location, query || location.query));
	    }
	
	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      var fullLocation = history.createLocation.apply(history, [appendQuery(location, location.query)].concat(args));
	      if (location.query) {
	        fullLocation.query = location.query;
	      }
	      return addQuery(fullLocation);
	    }
	
	    // deprecated
	    function pushState(state, path, query) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	      push(_extends({ state: state }, path, { query: query }));
	    }
	
	    // deprecated
	    function replaceState(state, path, query) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	      replace(_extends({ state: state }, path, { query: query }));
	    }
	
	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,
	
	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}
	
	exports['default'] = useQueries;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(32);
	
	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};
	
	exports.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}
	
		str = str.trim().replace(/^(\?|#|&)/, '');
	
		if (!str) {
			return {};
		}
	
		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;
	
			key = decodeURIComponent(key);
	
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);
	
			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
	
			return ret;
		}, {});
	};
	
	exports.stringify = function (obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
	
			if (val === undefined) {
				return '';
			}
	
			if (val === null) {
				return key;
			}
	
			if (Array.isArray(val)) {
				return val.slice().sort().map(function (val2) {
					return strictUriEncode(key) + '=' + strictUriEncode(val2);
				}).join('&');
			}
	
			return strictUriEncode(key) + '=' + strictUriEncode(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = createTransitionManager;
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _Actions = __webpack_require__(16);
	
	var _computeChangedRoutes2 = __webpack_require__(34);
	
	var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);
	
	var _TransitionUtils = __webpack_require__(35);
	
	var _isActive2 = __webpack_require__(37);
	
	var _isActive3 = _interopRequireDefault(_isActive2);
	
	var _getComponents = __webpack_require__(38);
	
	var _getComponents2 = _interopRequireDefault(_getComponents);
	
	var _matchRoutes = __webpack_require__(40);
	
	var _matchRoutes2 = _interopRequireDefault(_matchRoutes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function hasAnyProperties(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p)) return true;
	  }return false;
	}
	
	function createTransitionManager(history, routes) {
	  var state = {};
	
	  // Signature should be (location, indexOnly), but needs to support (path,
	  // query, indexOnly)
	  function isActive(location) {
	    var indexOnlyOrDeprecatedQuery = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	    var deprecatedIndexOnly = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	    var indexOnly = void 0;
	    if (indexOnlyOrDeprecatedQuery && indexOnlyOrDeprecatedQuery !== true || deprecatedIndexOnly !== null) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`isActive(pathname, query, indexOnly) is deprecated; use `isActive(location, indexOnly)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
	      location = { pathname: location, query: indexOnlyOrDeprecatedQuery };
	      indexOnly = deprecatedIndexOnly || false;
	    } else {
	      location = history.createLocation(location);
	      indexOnly = indexOnlyOrDeprecatedQuery;
	    }
	
	    return (0, _isActive3.default)(location, indexOnly, state.location, state.routes, state.params);
	  }
	
	  function createLocationFromRedirectInfo(location) {
	    return history.createLocation(location, _Actions.REPLACE);
	  }
	
	  var partialNextState = void 0;
	
	  function match(location, callback) {
	    if (partialNextState && partialNextState.location === location) {
	      // Continue from where we left off.
	      finishMatch(partialNextState, callback);
	    } else {
	      (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
	        if (error) {
	          callback(error);
	        } else if (nextState) {
	          finishMatch(_extends({}, nextState, { location: location }), callback);
	        } else {
	          callback();
	        }
	      });
	    }
	  }
	
	  function finishMatch(nextState, callback) {
	    var _computeChangedRoutes = (0, _computeChangedRoutes3.default)(state, nextState);
	
	    var leaveRoutes = _computeChangedRoutes.leaveRoutes;
	    var changeRoutes = _computeChangedRoutes.changeRoutes;
	    var enterRoutes = _computeChangedRoutes.enterRoutes;
	
	
	    (0, _TransitionUtils.runLeaveHooks)(leaveRoutes, state);
	
	    // Tear down confirmation hooks for left routes
	    leaveRoutes.filter(function (route) {
	      return enterRoutes.indexOf(route) === -1;
	    }).forEach(removeListenBeforeHooksForRoute);
	
	    // change and enter hooks are run in series
	    (0, _TransitionUtils.runChangeHooks)(changeRoutes, state, nextState, function (error, redirectInfo) {
	      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);
	
	      (0, _TransitionUtils.runEnterHooks)(enterRoutes, nextState, finishEnterHooks);
	    });
	
	    function finishEnterHooks(error, redirectInfo) {
	      if (error || redirectInfo) return handleErrorOrRedirect(error, redirectInfo);
	
	      // TODO: Fetch components after state is updated.
	      (0, _getComponents2.default)(nextState, function (error, components) {
	        if (error) {
	          callback(error);
	        } else {
	          // TODO: Make match a pure function and have some other API
	          // for "match and update state".
	          callback(null, null, state = _extends({}, nextState, { components: components }));
	        }
	      });
	    }
	
	    function handleErrorOrRedirect(error, redirectInfo) {
	      if (error) callback(error);else callback(null, createLocationFromRedirectInfo(redirectInfo));
	    }
	  }
	
	  var RouteGuid = 1;
	
	  function getRouteID(route) {
	    var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	    return route.__id__ || create && (route.__id__ = RouteGuid++);
	  }
	
	  var RouteHooks = Object.create(null);
	
	  function getRouteHooksForRoutes(routes) {
	    return routes.reduce(function (hooks, route) {
	      hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
	      return hooks;
	    }, []);
	  }
	
	  function transitionHook(location, callback) {
	    (0, _matchRoutes2.default)(routes, location, function (error, nextState) {
	      if (nextState == null) {
	        // TODO: We didn't actually match anything, but hang
	        // onto error/nextState so we don't have to matchRoutes
	        // again in the listen callback.
	        callback();
	        return;
	      }
	
	      // Cache some state here so we don't have to
	      // matchRoutes() again in the listen callback.
	      partialNextState = _extends({}, nextState, { location: location });
	
	      var hooks = getRouteHooksForRoutes((0, _computeChangedRoutes3.default)(state, partialNextState).leaveRoutes);
	
	      var result = void 0;
	      for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
	        // Passing the location arg here indicates to
	        // the user that this is a transition hook.
	        result = hooks[i](location);
	      }
	
	      callback(result);
	    });
	  }
	
	  /* istanbul ignore next: untestable with Karma */
	  function beforeUnloadHook() {
	    // Synchronously check to see if any route hooks want
	    // to prevent the current window/tab from closing.
	    if (state.routes) {
	      var hooks = getRouteHooksForRoutes(state.routes);
	
	      var message = void 0;
	      for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
	        // Passing no args indicates to the user that this is a
	        // beforeunload hook. We don't know the next location.
	        message = hooks[i]();
	      }
	
	      return message;
	    }
	  }
	
	  var unlistenBefore = void 0,
	      unlistenBeforeUnload = void 0;
	
	  function removeListenBeforeHooksForRoute(route) {
	    var routeID = getRouteID(route, false);
	    if (!routeID) {
	      return;
	    }
	
	    delete RouteHooks[routeID];
	
	    if (!hasAnyProperties(RouteHooks)) {
	      // teardown transition & beforeunload hooks
	      if (unlistenBefore) {
	        unlistenBefore();
	        unlistenBefore = null;
	      }
	
	      if (unlistenBeforeUnload) {
	        unlistenBeforeUnload();
	        unlistenBeforeUnload = null;
	      }
	    }
	  }
	
	  /**
	   * Registers the given hook function to run before leaving the given route.
	   *
	   * During a normal transition, the hook function receives the next location
	   * as its only argument and can return either a prompt message (string) to show the user,
	   * to make sure they want to leave the page; or `false`, to prevent the transition.
	   * Any other return value will have no effect.
	   *
	   * During the beforeunload event (in browsers) the hook receives no arguments.
	   * In this case it must return a prompt message to prevent the transition.
	   *
	   * Returns a function that may be used to unbind the listener.
	   */
	  function listenBeforeLeavingRoute(route, hook) {
	    // TODO: Warn if they register for a route that isn't currently
	    // active. They're probably doing something wrong, like re-creating
	    // route objects on every location change.
	    var routeID = getRouteID(route);
	    var hooks = RouteHooks[routeID];
	
	    if (!hooks) {
	      var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);
	
	      RouteHooks[routeID] = [hook];
	
	      if (thereWereNoRouteHooks) {
	        // setup transition & beforeunload hooks
	        unlistenBefore = history.listenBefore(transitionHook);
	
	        if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
	      }
	    } else {
	      if (hooks.indexOf(hook) === -1) {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'adding multiple leave hooks for the same route is deprecated; manage multiple confirmations in your own code instead') : void 0;
	
	        hooks.push(hook);
	      }
	    }
	
	    return function () {
	      var hooks = RouteHooks[routeID];
	
	      if (hooks) {
	        var newHooks = hooks.filter(function (item) {
	          return item !== hook;
	        });
	
	        if (newHooks.length === 0) {
	          removeListenBeforeHooksForRoute(route);
	        } else {
	          RouteHooks[routeID] = newHooks;
	        }
	      }
	    };
	  }
	
	  /**
	   * This is the API for stateful environments. As the location
	   * changes, we update state and call the listener. We can also
	   * gracefully handle errors and redirects.
	   */
	  function listen(listener) {
	    // TODO: Only use a single history listener. Otherwise we'll
	    // end up with multiple concurrent calls to match.
	    return history.listen(function (location) {
	      if (state.location === location) {
	        listener(null, state);
	      } else {
	        match(location, function (error, redirectLocation, nextState) {
	          if (error) {
	            listener(error);
	          } else if (redirectLocation) {
	            history.transitionTo(redirectLocation);
	          } else if (nextState) {
	            listener(null, nextState);
	          } else {
	            process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : void 0;
	          }
	        });
	      }
	    });
	  }
	
	  return {
	    isActive: isActive,
	    match: match,
	    listenBeforeLeavingRoute: listenBeforeLeavingRoute,
	    listen: listen
	  };
	}
	
	//export default useRoutes
	
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(11);
	
	function routeParamsChanged(route, prevState, nextState) {
	  if (!route.path) return false;
	
	  var paramNames = (0, _PatternUtils.getParamNames)(route.path);
	
	  return paramNames.some(function (paramName) {
	    return prevState.params[paramName] !== nextState.params[paramName];
	  });
	}
	
	/**
	 * Returns an object of { leaveRoutes, changeRoutes, enterRoutes } determined by
	 * the change from prevState to nextState. We leave routes if either
	 * 1) they are not in the next state or 2) they are in the next state
	 * but their params have changed (i.e. /users/123 => /users/456).
	 *
	 * leaveRoutes are ordered starting at the leaf route of the tree
	 * we're leaving up to the common parent route. enterRoutes are ordered
	 * from the top of the tree we're entering down to the leaf route.
	 *
	 * changeRoutes are any routes that didn't leave or enter during
	 * the transition.
	 */
	function computeChangedRoutes(prevState, nextState) {
	  var prevRoutes = prevState && prevState.routes;
	  var nextRoutes = nextState.routes;
	
	  var leaveRoutes = void 0,
	      changeRoutes = void 0,
	      enterRoutes = void 0;
	  if (prevRoutes) {
	    (function () {
	      var parentIsLeaving = false;
	      leaveRoutes = prevRoutes.filter(function (route) {
	        if (parentIsLeaving) {
	          return true;
	        } else {
	          var isLeaving = nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
	          if (isLeaving) parentIsLeaving = true;
	          return isLeaving;
	        }
	      });
	
	      // onLeave hooks start at the leaf route.
	      leaveRoutes.reverse();
	
	      enterRoutes = [];
	      changeRoutes = [];
	
	      nextRoutes.forEach(function (route) {
	        var isNew = prevRoutes.indexOf(route) === -1;
	        var paramsChanged = leaveRoutes.indexOf(route) !== -1;
	
	        if (isNew || paramsChanged) enterRoutes.push(route);else changeRoutes.push(route);
	      });
	    })();
	  } else {
	    leaveRoutes = [];
	    changeRoutes = [];
	    enterRoutes = nextRoutes;
	  }
	
	  return {
	    leaveRoutes: leaveRoutes,
	    changeRoutes: changeRoutes,
	    enterRoutes: enterRoutes
	  };
	}
	
	exports.default = computeChangedRoutes;
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.runEnterHooks = runEnterHooks;
	exports.runChangeHooks = runChangeHooks;
	exports.runLeaveHooks = runLeaveHooks;
	
	var _AsyncUtils = __webpack_require__(36);
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createTransitionHook(hook, route, asyncArity) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    hook.apply(route, args);
	
	    if (hook.length < asyncArity) {
	      var callback = args[args.length - 1];
	      // Assume hook executes synchronously and
	      // automatically call the callback.
	      callback();
	    }
	  };
	}
	
	function getEnterHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onEnter) hooks.push(createTransitionHook(route.onEnter, route, 3));
	
	    return hooks;
	  }, []);
	}
	
	function getChangeHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onChange) hooks.push(createTransitionHook(route.onChange, route, 4));
	    return hooks;
	  }, []);
	}
	
	function runTransitionHooks(length, iter, callback) {
	  if (!length) {
	    callback();
	    return;
	  }
	
	  var redirectInfo = void 0;
	  function replace(location, deprecatedPathname, deprecatedQuery) {
	    if (deprecatedPathname) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`replaceState(state, pathname, query) is deprecated; use `replace(location)` with a location descriptor instead. http://tiny.cc/router-isActivedeprecated') : void 0;
	      redirectInfo = {
	        pathname: deprecatedPathname,
	        query: deprecatedQuery,
	        state: location
	      };
	
	      return;
	    }
	
	    redirectInfo = location;
	  }
	
	  (0, _AsyncUtils.loopAsync)(length, function (index, next, done) {
	    iter(index, replace, function (error) {
	      if (error || redirectInfo) {
	        done(error, redirectInfo); // No need to continue.
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}
	
	/**
	 * Runs all onEnter hooks in the given array of routes in order
	 * with onEnter(nextState, replace, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replace short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	function runEnterHooks(routes, nextState, callback) {
	  var hooks = getEnterHooks(routes);
	  return runTransitionHooks(hooks.length, function (index, replace, next) {
	    hooks[index](nextState, replace, next);
	  }, callback);
	}
	
	/**
	 * Runs all onChange hooks in the given array of routes in order
	 * with onChange(prevState, nextState, replace, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replace short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */
	function runChangeHooks(routes, state, nextState, callback) {
	  var hooks = getChangeHooks(routes);
	  return runTransitionHooks(hooks.length, function (index, replace, next) {
	    hooks[index](state, nextState, replace, next);
	  }, callback);
	}
	
	/**
	 * Runs all onLeave hooks in the given array of routes in order.
	 */
	function runLeaveHooks(routes, prevState) {
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    if (routes[i].onLeave) routes[i].onLeave.call(routes[i], prevState);
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	exports.mapAsync = mapAsync;
	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;
	  var sync = false,
	      hasNext = false,
	      doneArgs = void 0;
	
	  function done() {
	    isDone = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      doneArgs = [].concat(Array.prototype.slice.call(arguments));
	      return;
	    }
	
	    callback.apply(this, arguments);
	  }
	
	  function next() {
	    if (isDone) {
	      return;
	    }
	
	    hasNext = true;
	    if (sync) {
	      // Iterate instead of recursing if possible.
	      return;
	    }
	
	    sync = true;
	
	    while (!isDone && currentTurn < turns && hasNext) {
	      hasNext = false;
	      work.call(this, currentTurn++, next, done);
	    }
	
	    sync = false;
	
	    if (isDone) {
	      // This means the loop finished synchronously.
	      callback.apply(this, doneArgs);
	      return;
	    }
	
	    if (currentTurn >= turns && hasNext) {
	      isDone = true;
	      callback();
	    }
	  }
	
	  next();
	}
	
	function mapAsync(array, work, callback) {
	  var length = array.length;
	  var values = [];
	
	  if (length === 0) return callback(null, values);
	
	  var isDone = false,
	      doneCount = 0;
	
	  function done(index, error, value) {
	    if (isDone) return;
	
	    if (error) {
	      isDone = true;
	      callback(error);
	    } else {
	      values[index] = value;
	
	      isDone = ++doneCount === length;
	
	      if (isDone) callback(null, values);
	    }
	  }
	
	  array.forEach(function (item, index) {
	    work(item, index, function (error, value) {
	      done(index, error, value);
	    });
	  });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = isActive;
	
	var _PatternUtils = __webpack_require__(11);
	
	function deepEqual(a, b) {
	  if (a == b) return true;
	
	  if (a == null || b == null) return false;
	
	  if (Array.isArray(a)) {
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return deepEqual(item, b[index]);
	    });
	  }
	
	  if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
	    for (var p in a) {
	      if (!Object.prototype.hasOwnProperty.call(a, p)) {
	        continue;
	      }
	
	      if (a[p] === undefined) {
	        if (b[p] !== undefined) {
	          return false;
	        }
	      } else if (!Object.prototype.hasOwnProperty.call(b, p)) {
	        return false;
	      } else if (!deepEqual(a[p], b[p])) {
	        return false;
	      }
	    }
	
	    return true;
	  }
	
	  return String(a) === String(b);
	}
	
	/**
	 * Returns true if the current pathname matches the supplied one, net of
	 * leading and trailing slash normalization. This is sufficient for an
	 * indexOnly route match.
	 */
	function pathIsActive(pathname, currentPathname) {
	  // Normalize leading slash for consistency. Leading slash on pathname has
	  // already been normalized in isActive. See caveat there.
	  if (currentPathname.charAt(0) !== '/') {
	    currentPathname = '/' + currentPathname;
	  }
	
	  // Normalize the end of both path names too. Maybe `/foo/` shouldn't show
	  // `/foo` as active, but in this case, we would already have failed the
	  // match.
	  if (pathname.charAt(pathname.length - 1) !== '/') {
	    pathname += '/';
	  }
	  if (currentPathname.charAt(currentPathname.length - 1) !== '/') {
	    currentPathname += '/';
	  }
	
	  return currentPathname === pathname;
	}
	
	/**
	 * Returns true if the given pathname matches the active routes and params.
	 */
	function routeIsActive(pathname, routes, params) {
	  var remainingPathname = pathname,
	      paramNames = [],
	      paramValues = [];
	
	  // for...of would work here but it's probably slower post-transpilation.
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    var route = routes[i];
	    var pattern = route.path || '';
	
	    if (pattern.charAt(0) === '/') {
	      remainingPathname = pathname;
	      paramNames = [];
	      paramValues = [];
	    }
	
	    if (remainingPathname !== null && pattern) {
	      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
	      if (matched) {
	        remainingPathname = matched.remainingPathname;
	        paramNames = [].concat(paramNames, matched.paramNames);
	        paramValues = [].concat(paramValues, matched.paramValues);
	      } else {
	        remainingPathname = null;
	      }
	
	      if (remainingPathname === '') {
	        // We have an exact match on the route. Just check that all the params
	        // match.
	        // FIXME: This doesn't work on repeated params.
	        return paramNames.every(function (paramName, index) {
	          return String(paramValues[index]) === String(params[paramName]);
	        });
	      }
	    }
	  }
	
	  return false;
	}
	
	/**
	 * Returns true if all key/value pairs in the given query are
	 * currently active.
	 */
	function queryIsActive(query, activeQuery) {
	  if (activeQuery == null) return query == null;
	
	  if (query == null) return true;
	
	  return deepEqual(query, activeQuery);
	}
	
	/**
	 * Returns true if a <Link> to the given pathname/query combination is
	 * currently active.
	 */
	function isActive(_ref, indexOnly, currentLocation, routes, params) {
	  var pathname = _ref.pathname;
	  var query = _ref.query;
	
	  if (currentLocation == null) return false;
	
	  // TODO: This is a bit ugly. It keeps around support for treating pathnames
	  // without preceding slashes as absolute paths, but possibly also works
	  // around the same quirks with basenames as in matchRoutes.
	  if (pathname.charAt(0) !== '/') {
	    pathname = '/' + pathname;
	  }
	
	  if (!pathIsActive(pathname, currentLocation.pathname)) {
	    // The path check is necessary and sufficient for indexOnly, but otherwise
	    // we still need to check the routes.
	    if (indexOnly || !routeIsActive(pathname, routes, params)) {
	      return false;
	    }
	  }
	
	  return queryIsActive(query, currentLocation.query);
	}
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _AsyncUtils = __webpack_require__(36);
	
	var _makeStateWithLocation = __webpack_require__(39);
	
	var _makeStateWithLocation2 = _interopRequireDefault(_makeStateWithLocation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getComponentsForRoute(nextState, route, callback) {
	  if (route.component || route.components) {
	    callback(null, route.component || route.components);
	    return;
	  }
	
	  var getComponent = route.getComponent || route.getComponents;
	  if (!getComponent) {
	    callback();
	    return;
	  }
	
	  var location = nextState.location;
	
	  var nextStateWithLocation = (0, _makeStateWithLocation2.default)(nextState, location);
	
	  getComponent.call(route, nextStateWithLocation, callback);
	}
	
	/**
	 * Asynchronously fetches all components needed for the given router
	 * state and calls callback(error, components) when finished.
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getComponents method.
	 */
	function getComponents(nextState, callback) {
	  (0, _AsyncUtils.mapAsync)(nextState.routes, function (route, index, callback) {
	    getComponentsForRoute(nextState, route, callback);
	  }, callback);
	}
	
	exports.default = getComponents;
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = makeStateWithLocation;
	
	var _deprecateObjectProperties = __webpack_require__(7);
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function makeStateWithLocation(state, location) {
	  if (process.env.NODE_ENV !== 'production' && _deprecateObjectProperties.canUseMembrane) {
	    var stateWithLocation = _extends({}, state);
	
	    // I don't use deprecateObjectProperties here because I want to keep the
	    // same code path between development and production, in that we just
	    // assign extra properties to the copy of the state object in both cases.
	
	    var _loop = function _loop(prop) {
	      if (!Object.prototype.hasOwnProperty.call(location, prop)) {
	        return 'continue';
	      }
	
	      Object.defineProperty(stateWithLocation, prop, {
	        get: function get() {
	          process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'Accessing location properties directly from the first argument to `getComponent`, `getComponents`, `getChildRoutes`, and `getIndexRoute` is deprecated. That argument is now the router state (`nextState` or `partialNextState`) rather than the location. To access the location, use `nextState.location` or `partialNextState.location`.') : void 0;
	          return location[prop];
	        }
	      });
	    };
	
	    for (var prop in location) {
	      var _ret = _loop(prop);
	
	      if (_ret === 'continue') continue;
	    }
	
	    return stateWithLocation;
	  }
	
	  return _extends({}, state, location);
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.default = matchRoutes;
	
	var _AsyncUtils = __webpack_require__(36);
	
	var _makeStateWithLocation = __webpack_require__(39);
	
	var _makeStateWithLocation2 = _interopRequireDefault(_makeStateWithLocation);
	
	var _PatternUtils = __webpack_require__(11);
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _RouteUtils = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getChildRoutes(route, location, paramNames, paramValues, callback) {
	  if (route.childRoutes) {
	    return [null, route.childRoutes];
	  }
	  if (!route.getChildRoutes) {
	    return [];
	  }
	
	  var sync = true,
	      result = void 0;
	
	  var partialNextState = {
	    location: location,
	    params: createParams(paramNames, paramValues)
	  };
	
	  var partialNextStateWithLocation = (0, _makeStateWithLocation2.default)(partialNextState, location);
	
	  route.getChildRoutes(partialNextStateWithLocation, function (error, childRoutes) {
	    childRoutes = !error && (0, _RouteUtils.createRoutes)(childRoutes);
	    if (sync) {
	      result = [error, childRoutes];
	      return;
	    }
	
	    callback(error, childRoutes);
	  });
	
	  sync = false;
	  return result; // Might be undefined.
	}
	
	function getIndexRoute(route, location, paramNames, paramValues, callback) {
	  if (route.indexRoute) {
	    callback(null, route.indexRoute);
	  } else if (route.getIndexRoute) {
	    var partialNextState = {
	      location: location,
	      params: createParams(paramNames, paramValues)
	    };
	
	    var partialNextStateWithLocation = (0, _makeStateWithLocation2.default)(partialNextState, location);
	
	    route.getIndexRoute(partialNextStateWithLocation, function (error, indexRoute) {
	      callback(error, !error && (0, _RouteUtils.createRoutes)(indexRoute)[0]);
	    });
	  } else if (route.childRoutes) {
	    (function () {
	      var pathless = route.childRoutes.filter(function (childRoute) {
	        return !childRoute.path;
	      });
	
	      (0, _AsyncUtils.loopAsync)(pathless.length, function (index, next, done) {
	        getIndexRoute(pathless[index], location, paramNames, paramValues, function (error, indexRoute) {
	          if (error || indexRoute) {
	            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
	            done(error, routes);
	          } else {
	            next();
	          }
	        });
	      }, function (err, routes) {
	        callback(null, routes);
	      });
	    })();
	  } else {
	    callback();
	  }
	}
	
	function assignParams(params, paramNames, paramValues) {
	  return paramNames.reduce(function (params, paramName, index) {
	    var paramValue = paramValues && paramValues[index];
	
	    if (Array.isArray(params[paramName])) {
	      params[paramName].push(paramValue);
	    } else if (paramName in params) {
	      params[paramName] = [params[paramName], paramValue];
	    } else {
	      params[paramName] = paramValue;
	    }
	
	    return params;
	  }, params);
	}
	
	function createParams(paramNames, paramValues) {
	  return assignParams({}, paramNames, paramValues);
	}
	
	function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
	  var pattern = route.path || '';
	
	  if (pattern.charAt(0) === '/') {
	    remainingPathname = location.pathname;
	    paramNames = [];
	    paramValues = [];
	  }
	
	  // Only try to match the path if the route actually has a pattern, and if
	  // we're not just searching for potential nested absolute paths.
	  if (remainingPathname !== null && pattern) {
	    try {
	      var matched = (0, _PatternUtils.matchPattern)(pattern, remainingPathname);
	      if (matched) {
	        remainingPathname = matched.remainingPathname;
	        paramNames = [].concat(paramNames, matched.paramNames);
	        paramValues = [].concat(paramValues, matched.paramValues);
	      } else {
	        remainingPathname = null;
	      }
	    } catch (error) {
	      callback(error);
	    }
	
	    // By assumption, pattern is non-empty here, which is the prerequisite for
	    // actually terminating a match.
	    if (remainingPathname === '') {
	      var _ret2 = function () {
	        var match = {
	          routes: [route],
	          params: createParams(paramNames, paramValues)
	        };
	
	        getIndexRoute(route, location, paramNames, paramValues, function (error, indexRoute) {
	          if (error) {
	            callback(error);
	          } else {
	            if (Array.isArray(indexRoute)) {
	              var _match$routes;
	
	              process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(indexRoute.every(function (route) {
	                return !route.path;
	              }), 'Index routes should not have paths') : void 0;
	              (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
	            } else if (indexRoute) {
	              process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(!indexRoute.path, 'Index routes should not have paths') : void 0;
	              match.routes.push(indexRoute);
	            }
	
	            callback(null, match);
	          }
	        });
	
	        return {
	          v: void 0
	        };
	      }();
	
	      if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	    }
	  }
	
	  if (remainingPathname != null || route.childRoutes) {
	    // Either a) this route matched at least some of the path or b)
	    // we don't have to load this route's children asynchronously. In
	    // either case continue checking for matches in the subtree.
	    var onChildRoutes = function onChildRoutes(error, childRoutes) {
	      if (error) {
	        callback(error);
	      } else if (childRoutes) {
	        // Check the child routes to see if any of them match.
	        matchRoutes(childRoutes, location, function (error, match) {
	          if (error) {
	            callback(error);
	          } else if (match) {
	            // A child route matched! Augment the match and pass it up the stack.
	            match.routes.unshift(route);
	            callback(null, match);
	          } else {
	            callback();
	          }
	        }, remainingPathname, paramNames, paramValues);
	      } else {
	        callback();
	      }
	    };
	
	    var result = getChildRoutes(route, location, paramNames, paramValues, onChildRoutes);
	    if (result) {
	      onChildRoutes.apply(undefined, result);
	    }
	  } else {
	    callback();
	  }
	}
	
	/**
	 * Asynchronously matches the given location to a set of routes and calls
	 * callback(error, state) when finished. The state object will have the
	 * following properties:
	 *
	 * - routes       An array of routes that matched, in hierarchical order
	 * - params       An object of URL parameters
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getChildRoutes method.
	 */
	function matchRoutes(routes, location, callback, remainingPathname) {
	  var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	  var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];
	
	  if (remainingPathname === undefined) {
	    // TODO: This is a little bit ugly, but it works around a quirk in history
	    // that strips the leading slash from pathnames when using basenames with
	    // trailing slashes.
	    if (location.pathname.charAt(0) !== '/') {
	      location = _extends({}, location, {
	        pathname: '/' + location.pathname
	      });
	    }
	    remainingPathname = location.pathname;
	  }
	
	  (0, _AsyncUtils.loopAsync)(routes.length, function (index, next, done) {
	    matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
	      if (error || match) {
	        done(error, match);
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _deprecateObjectProperties = __webpack_require__(7);
	
	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);
	
	var _getRouteParams = __webpack_require__(42);
	
	var _getRouteParams2 = _interopRequireDefault(_getRouteParams);
	
	var _RouteUtils = __webpack_require__(4);
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var array = _React$PropTypes.array;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	
	/**
	 * A <RouterContext> renders the component tree for a given router state
	 * and sets the history object and the current location in context.
	 */
	
	var RouterContext = _react2.default.createClass({
	  displayName: 'RouterContext',
	
	
	  propTypes: {
	    history: object,
	    router: object.isRequired,
	    location: object.isRequired,
	    routes: array.isRequired,
	    params: object.isRequired,
	    components: array.isRequired,
	    createElement: func.isRequired
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      createElement: _react2.default.createElement
	    };
	  },
	
	
	  childContextTypes: {
	    history: object,
	    location: object.isRequired,
	    router: object.isRequired
	  },
	
	  getChildContext: function getChildContext() {
	    var _props = this.props;
	    var router = _props.router;
	    var history = _props.history;
	    var location = _props.location;
	
	    if (!router) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`<RouterContext>` expects a `router` rather than a `history`') : void 0;
	
	      router = _extends({}, history, {
	        setRouteLeaveHook: history.listenBeforeLeavingRoute
	      });
	      delete router.listenBeforeLeavingRoute;
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      location = (0, _deprecateObjectProperties2.default)(location, '`context.location` is deprecated, please use a route component\'s `props.location` instead. http://tiny.cc/router-accessinglocation');
	    }
	
	    return { history: history, location: location, router: router };
	  },
	  createElement: function createElement(component, props) {
	    return component == null ? null : this.props.createElement(component, props);
	  },
	  render: function render() {
	    var _this = this;
	
	    var _props2 = this.props;
	    var history = _props2.history;
	    var location = _props2.location;
	    var routes = _props2.routes;
	    var params = _props2.params;
	    var components = _props2.components;
	
	    var element = null;
	
	    if (components) {
	      element = components.reduceRight(function (element, components, index) {
	        if (components == null) return element; // Don't create new children; use the grandchildren.
	
	        var route = routes[index];
	        var routeParams = (0, _getRouteParams2.default)(route, params);
	        var props = {
	          history: history,
	          location: location,
	          params: params,
	          route: route,
	          routeParams: routeParams,
	          routes: routes
	        };
	
	        if ((0, _RouteUtils.isReactChildren)(element)) {
	          props.children = element;
	        } else if (element) {
	          for (var prop in element) {
	            if (Object.prototype.hasOwnProperty.call(element, prop)) props[prop] = element[prop];
	          }
	        }
	
	        if ((typeof components === 'undefined' ? 'undefined' : _typeof(components)) === 'object') {
	          var elements = {};
	
	          for (var key in components) {
	            if (Object.prototype.hasOwnProperty.call(components, key)) {
	              // Pass through the key as a prop to createElement to allow
	              // custom createElement functions to know which named component
	              // they're rendering, for e.g. matching up to fetched data.
	              elements[key] = _this.createElement(components[key], _extends({
	                key: key }, props));
	            }
	          }
	
	          return elements;
	        }
	
	        return _this.createElement(components, props);
	      }, element);
	    }
	
	    !(element === null || element === false || _react2.default.isValidElement(element)) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'The root route must render a single element') : (0, _invariant2.default)(false) : void 0;
	
	    return element;
	  }
	});
	
	exports.default = RouterContext;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PatternUtils = __webpack_require__(11);
	
	/**
	 * Extracts an object of params the given route cares about from
	 * the given params object.
	 */
	function getRouteParams(route, params) {
	  var routeParams = {};
	
	  if (!route.path) return routeParams;
	
	  (0, _PatternUtils.getParamNames)(route.path).forEach(function (p) {
	    if (Object.prototype.hasOwnProperty.call(params, p)) {
	      routeParams[p] = params[p];
	    }
	  });
	
	  return routeParams;
	}
	
	exports.default = getRouteParams;
	module.exports = exports['default'];

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.createRouterObject = createRouterObject;
	exports.createRoutingHistory = createRoutingHistory;
	
	var _deprecateObjectProperties = __webpack_require__(7);
	
	var _deprecateObjectProperties2 = _interopRequireDefault(_deprecateObjectProperties);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createRouterObject(history, transitionManager) {
	  return _extends({}, history, {
	    setRouteLeaveHook: transitionManager.listenBeforeLeavingRoute,
	    isActive: transitionManager.isActive
	  });
	}
	
	// deprecated
	function createRoutingHistory(history, transitionManager) {
	  history = _extends({}, history, transitionManager);
	
	  if (process.env.NODE_ENV !== 'production') {
	    history = (0, _deprecateObjectProperties2.default)(history, '`props.history` and `context.history` are deprecated. Please use `context.router`. http://tiny.cc/router-contextchanges');
	  }
	
	  return history;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _PropTypes = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var bool = _React$PropTypes.bool;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	var oneOfType = _React$PropTypes.oneOfType;
	
	
	function isLeftClickEvent(event) {
	  return event.button === 0;
	}
	
	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}
	
	// TODO: De-duplicate against hasAnyProperties in createTransitionManager.
	function isEmptyObject(object) {
	  for (var p in object) {
	    if (Object.prototype.hasOwnProperty.call(object, p)) return false;
	  }return true;
	}
	
	function createLocationDescriptor(to, _ref) {
	  var query = _ref.query;
	  var hash = _ref.hash;
	  var state = _ref.state;
	
	  if (query || hash || state) {
	    return { pathname: to, query: query, hash: hash, state: state };
	  }
	
	  return to;
	}
	
	/**
	 * A <Link> is used to create an <a> element that links to a route.
	 * When that route is active, the link gets the value of its
	 * activeClassName prop.
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route path="/posts/:postID" component={Post} />
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to={`/posts/${post.id}`} />
	 *
	 * Links may pass along location state and/or query string parameters
	 * in the state/query props, respectively.
	 *
	 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
	 */
	var Link = _react2.default.createClass({
	  displayName: 'Link',
	
	
	  contextTypes: {
	    router: _PropTypes.routerShape
	  },
	
	  propTypes: {
	    to: oneOfType([string, object]).isRequired,
	    query: object,
	    hash: string,
	    state: object,
	    activeStyle: object,
	    activeClassName: string,
	    onlyActiveOnIndex: bool.isRequired,
	    onClick: func,
	    target: string
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onlyActiveOnIndex: false,
	      style: {}
	    };
	  },
	  handleClick: function handleClick(event) {
	    if (this.props.onClick) this.props.onClick(event);
	
	    if (event.defaultPrevented) return;
	
	    !this.context.router ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<Link>s rendered outside of a router context cannot navigate.') : (0, _invariant2.default)(false) : void 0;
	
	    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
	
	    // If target prop is set (e.g. to "_blank"), let browser handle link.
	    /* istanbul ignore if: untestable with Karma */
	    if (this.props.target) return;
	
	    event.preventDefault();
	
	    var _props = this.props;
	    var to = _props.to;
	    var query = _props.query;
	    var hash = _props.hash;
	    var state = _props.state;
	
	    var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });
	
	    this.context.router.push(location);
	  },
	  render: function render() {
	    var _props2 = this.props;
	    var to = _props2.to;
	    var query = _props2.query;
	    var hash = _props2.hash;
	    var state = _props2.state;
	    var activeClassName = _props2.activeClassName;
	    var activeStyle = _props2.activeStyle;
	    var onlyActiveOnIndex = _props2.onlyActiveOnIndex;
	
	    var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);
	
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(!(query || hash || state), 'the `query`, `hash`, and `state` props on `<Link>` are deprecated, use `<Link to={{ pathname, query, hash, state }}/>. http://tiny.cc/router-isActivedeprecated') : void 0;
	
	    // Ignore if rendered outside the context of router, simplifies unit testing.
	    var router = this.context.router;
	
	
	    if (router) {
	      var location = createLocationDescriptor(to, { query: query, hash: hash, state: state });
	      props.href = router.createHref(location);
	
	      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
	        if (router.isActive(location, onlyActiveOnIndex)) {
	          if (activeClassName) {
	            if (props.className) {
	              props.className += ' ' + activeClassName;
	            } else {
	              props.className = activeClassName;
	            }
	          }
	
	          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
	        }
	      }
	    }
	
	    return _react2.default.createElement('a', _extends({}, props, { onClick: this.handleClick }));
	  }
	});
	
	exports.default = Link;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Link = __webpack_require__(44);
	
	var _Link2 = _interopRequireDefault(_Link);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * An <IndexLink> is used to link to an <IndexRoute>.
	 */
	var IndexLink = _react2.default.createClass({
	  displayName: 'IndexLink',
	  render: function render() {
	    return _react2.default.createElement(_Link2.default, _extends({}, this.props, { onlyActiveOnIndex: true }));
	  }
	});
	
	exports.default = IndexLink;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = withRouter;
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _hoistNonReactStatics = __webpack_require__(47);
	
	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
	
	var _PropTypes = __webpack_require__(5);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}
	
	function withRouter(WrappedComponent, options) {
	  var withRef = options && options.withRef;
	
	  var WithRouter = _react2.default.createClass({
	    displayName: 'WithRouter',
	
	    contextTypes: { router: _PropTypes.routerShape },
	    propTypes: { router: _PropTypes.routerShape },
	
	    getWrappedInstance: function getWrappedInstance() {
	      !withRef ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'To access the wrapped instance, you need to specify ' + '`{ withRef: true }` as the second argument of the withRouter() call.') : (0, _invariant2.default)(false) : void 0;
	
	      return this.wrappedInstance;
	    },
	    render: function render() {
	      var _this = this;
	
	      var router = this.props.router || this.context.router;
	      var props = _extends({}, this.props, { router: router });
	
	      if (withRef) {
	        props.ref = function (c) {
	          _this.wrappedInstance = c;
	        };
	      }
	
	      return _react2.default.createElement(WrappedComponent, props);
	    }
	  });
	
	  WithRouter.displayName = 'withRouter(' + getDisplayName(WrappedComponent) + ')';
	  WithRouter.WrappedComponent = WrappedComponent;
	
	  return (0, _hoistNonReactStatics2.default)(WithRouter, WrappedComponent);
	}
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 47 */
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';
	
	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};
	
	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};
	
	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';
	
	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);
	
	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }
	
	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {
	
	                }
	            }
	        }
	    }
	
	    return targetComponent;
	};


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Redirect = __webpack_require__(49);
	
	var _Redirect2 = _interopRequireDefault(_Redirect);
	
	var _InternalPropTypes = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;
	
	/**
	 * An <IndexRedirect> is used to redirect from an indexRoute.
	 */
	
	var IndexRedirect = _react2.default.createClass({
	  displayName: 'IndexRedirect',
	
	
	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = _Redirect2.default.createRouteFromReactElement(element);
	      } else {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'An <IndexRedirect> does not make sense at the root of your route config') : void 0;
	      }
	    }
	  },
	
	  propTypes: {
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _InternalPropTypes.falsy,
	    children: _InternalPropTypes.falsy
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});
	
	exports.default = IndexRedirect;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(4);
	
	var _PatternUtils = __webpack_require__(11);
	
	var _InternalPropTypes = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;
	
	/**
	 * A <Redirect> is used to declare another URL path a client should
	 * be sent to when they request a given URL.
	 *
	 * Redirects are placed alongside routes in the route configuration
	 * and are traversed in the same manner.
	 */
	
	var Redirect = _react2.default.createClass({
	  displayName: 'Redirect',
	
	
	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element) {
	      var route = (0, _RouteUtils.createRouteFromReactElement)(element);
	
	      if (route.from) route.path = route.from;
	
	      route.onEnter = function (nextState, replace) {
	        var location = nextState.location;
	        var params = nextState.params;
	
	
	        var pathname = void 0;
	        if (route.to.charAt(0) === '/') {
	          pathname = (0, _PatternUtils.formatPattern)(route.to, params);
	        } else if (!route.to) {
	          pathname = location.pathname;
	        } else {
	          var routeIndex = nextState.routes.indexOf(route);
	          var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
	          var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
	          pathname = (0, _PatternUtils.formatPattern)(pattern, params);
	        }
	
	        replace({
	          pathname: pathname,
	          query: route.query || location.query,
	          state: route.state || location.state
	        });
	      };
	
	      return route;
	    },
	    getRoutePattern: function getRoutePattern(routes, routeIndex) {
	      var parentPattern = '';
	
	      for (var i = routeIndex; i >= 0; i--) {
	        var route = routes[i];
	        var pattern = route.path || '';
	
	        parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;
	
	        if (pattern.indexOf('/') === 0) break;
	      }
	
	      return '/' + parentPattern;
	    }
	  },
	
	  propTypes: {
	    path: string,
	    from: string, // Alias for path
	    to: string.isRequired,
	    query: object,
	    state: object,
	    onEnter: _InternalPropTypes.falsy,
	    children: _InternalPropTypes.falsy
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<Redirect> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});
	
	exports.default = Redirect;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(4);
	
	var _InternalPropTypes = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var func = _react2.default.PropTypes.func;
	
	/**
	 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
	 * a JSX route config.
	 */
	
	var IndexRoute = _react2.default.createClass({
	  displayName: 'IndexRoute',
	
	
	  statics: {
	    createRouteFromReactElement: function createRouteFromReactElement(element, parentRoute) {
	      /* istanbul ignore else: sanity check */
	      if (parentRoute) {
	        parentRoute.indexRoute = (0, _RouteUtils.createRouteFromReactElement)(element);
	      } else {
	        process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'An <IndexRoute> does not make sense at the root of your route config') : void 0;
	      }
	    }
	  },
	
	  propTypes: {
	    path: _InternalPropTypes.falsy,
	    component: _InternalPropTypes.component,
	    components: _InternalPropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<IndexRoute> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});
	
	exports.default = IndexRoute;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _RouteUtils = __webpack_require__(4);
	
	var _InternalPropTypes = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;
	
	/**
	 * A <Route> is used to declare which components are rendered to the
	 * page when the URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is
	 * requested, the tree is searched depth-first to find a route whose
	 * path matches the URL.  When one is found, all routes in the tree
	 * that lead to it are considered "active" and their components are
	 * rendered into the DOM, nested in the same order as in the tree.
	 */
	
	var Route = _react2.default.createClass({
	  displayName: 'Route',
	
	
	  statics: {
	    createRouteFromReactElement: _RouteUtils.createRouteFromReactElement
	  },
	
	  propTypes: {
	    path: string,
	    component: _InternalPropTypes.component,
	    components: _InternalPropTypes.components,
	    getComponent: func,
	    getComponents: func
	  },
	
	  /* istanbul ignore next: sanity check */
	  render: function render() {
	     true ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, '<Route> elements are for router configuration only and should not be rendered') : (0, _invariant2.default)(false) : void 0;
	  }
	});
	
	exports.default = Route;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _InternalPropTypes = __webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * A mixin that adds the "history" instance variable to components.
	 */
	var History = {
	
	  contextTypes: {
	    history: _InternalPropTypes.history
	  },
	
	  componentWillMount: function componentWillMount() {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'the `History` mixin is deprecated, please access `context.router` with your own `contextTypes`. http://tiny.cc/router-historymixin') : void 0;
	    this.history = this.context.history;
	  }
	};
	
	exports.default = History;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var object = _react2.default.PropTypes.object;
	
	/**
	 * The Lifecycle mixin adds the routerWillLeave lifecycle method to a
	 * component that may be used to cancel a transition or prompt the user
	 * for confirmation.
	 *
	 * On standard transitions, routerWillLeave receives a single argument: the
	 * location we're transitioning to. To cancel the transition, return false.
	 * To prompt the user for confirmation, return a prompt message (string).
	 *
	 * During the beforeunload event (assuming you're using the useBeforeUnload
	 * history enhancer), routerWillLeave does not receive a location object
	 * because it isn't possible for us to know the location we're transitioning
	 * to. In this case routerWillLeave must return a prompt message to prevent
	 * the user from closing the window/tab.
	 */
	
	var Lifecycle = {
	
	  contextTypes: {
	    history: object.isRequired,
	    // Nested children receive the route as context, either
	    // set by the route component using the RouteContext mixin
	    // or by some other ancestor.
	    route: object
	  },
	
	  propTypes: {
	    // Route components receive the route object as a prop.
	    route: object
	  },
	
	  componentDidMount: function componentDidMount() {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'the `Lifecycle` mixin is deprecated, please use `context.router.setRouteLeaveHook(route, hook)`. http://tiny.cc/router-lifecyclemixin') : void 0;
	    !this.routerWillLeave ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : (0, _invariant2.default)(false) : void 0;
	
	    var route = this.props.route || this.context.route;
	
	    !route ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : (0, _invariant2.default)(false) : void 0;
	
	    this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlistenBeforeLeavingRoute) this._unlistenBeforeLeavingRoute();
	  }
	};
	
	exports.default = Lifecycle;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var object = _react2.default.PropTypes.object;
	
	/**
	 * The RouteContext mixin provides a convenient way for route
	 * components to set the route in context. This is needed for
	 * routes that render elements that want to use the Lifecycle
	 * mixin to prevent transitions.
	 */
	
	var RouteContext = {
	
	  propTypes: {
	    route: object.isRequired
	  },
	
	  childContextTypes: {
	    route: object.isRequired
	  },
	
	  getChildContext: function getChildContext() {
	    return {
	      route: this.props.route
	    };
	  },
	  componentWillMount: function componentWillMount() {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, 'The `RouteContext` mixin is deprecated. You can provide `this.props.route` on context with your own `contextTypes`. http://tiny.cc/router-routecontextmixin') : void 0;
	  }
	};
	
	exports.default = RouteContext;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _useQueries = __webpack_require__(30);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _createTransitionManager = __webpack_require__(33);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know about routing.
	 *
	 * Enhances history objects with the following methods:
	 *
	 * - listen((error, nextState) => {})
	 * - listenBeforeLeavingRoute(route, (nextLocation) => {})
	 * - match(location, (error, redirectLocation, nextState) => {})
	 * - isActive(pathname, query, indexOnly=false)
	 */
	function useRoutes(createHistory) {
	  process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`useRoutes` is deprecated. Please use `createTransitionManager` instead.') : void 0;
	
	  return function () {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var routes = _ref.routes;
	
	    var options = _objectWithoutProperties(_ref, ['routes']);
	
	    var history = (0, _useQueries2.default)(createHistory)(options);
	    var transitionManager = (0, _createTransitionManager2.default)(history, routes);
	    return _extends({}, history, transitionManager);
	  };
	}
	
	exports.default = useRoutes;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RouterContext = __webpack_require__(41);
	
	var _RouterContext2 = _interopRequireDefault(_RouterContext);
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RoutingContext = _react2.default.createClass({
	  displayName: 'RoutingContext',
	  componentWillMount: function componentWillMount() {
	    process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(false, '`RoutingContext` has been renamed to `RouterContext`. Please use `import { RouterContext } from \'react-router\'`. http://tiny.cc/router-routercontext') : void 0;
	  },
	  render: function render() {
	    return _react2.default.createElement(_RouterContext2.default, this.props);
	  }
	});
	
	exports.default = RoutingContext;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _createMemoryHistory = __webpack_require__(58);
	
	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
	
	var _createTransitionManager = __webpack_require__(33);
	
	var _createTransitionManager2 = _interopRequireDefault(_createTransitionManager);
	
	var _RouteUtils = __webpack_require__(4);
	
	var _RouterUtils = __webpack_require__(43);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	/**
	 * A high-level API to be used for server-side rendering.
	 *
	 * This function matches a location to a set of routes and calls
	 * callback(error, redirectLocation, renderProps) when finished.
	 *
	 * Note: You probably don't want to use this in a browser unless you're using
	 * server-side rendering with async routes.
	 */
	function match(_ref, callback) {
	  var history = _ref.history;
	  var routes = _ref.routes;
	  var location = _ref.location;
	
	  var options = _objectWithoutProperties(_ref, ['history', 'routes', 'location']);
	
	  !(history || location) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2.default)(false, 'match needs a history or a location') : (0, _invariant2.default)(false) : void 0;
	
	  history = history ? history : (0, _createMemoryHistory2.default)(options);
	  var transitionManager = (0, _createTransitionManager2.default)(history, (0, _RouteUtils.createRoutes)(routes));
	
	  var unlisten = void 0;
	
	  if (location) {
	    // Allow match({ location: '/the/path', ... })
	    location = history.createLocation(location);
	  } else {
	    // Pick up the location from the history via synchronous history.listen
	    // call if needed.
	    unlisten = history.listen(function (historyLocation) {
	      location = historyLocation;
	    });
	  }
	
	  var router = (0, _RouterUtils.createRouterObject)(history, transitionManager);
	  history = (0, _RouterUtils.createRoutingHistory)(history, transitionManager);
	
	  transitionManager.match(location, function (error, redirectLocation, nextState) {
	    callback(error, redirectLocation, nextState && _extends({}, nextState, {
	      history: history,
	      router: router,
	      matchContext: { history: history, transitionManager: transitionManager, router: router }
	    }));
	
	    // Defer removing the listener to here to prevent DOM histories from having
	    // to unwind DOM event listeners unnecessarily, in case callback renders a
	    // <Router> and attaches another history listener.
	    if (unlisten) {
	      unlisten();
	    }
	  });
	}
	
	exports.default = match;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = createMemoryHistory;
	
	var _useQueries = __webpack_require__(30);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _useBasename = __webpack_require__(59);
	
	var _useBasename2 = _interopRequireDefault(_useBasename);
	
	var _createMemoryHistory = __webpack_require__(60);
	
	var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createMemoryHistory(options) {
	  // signatures and type checking differ between `useRoutes` and
	  // `createMemoryHistory`, have to create `memoryHistory` first because
	  // `useQueries` doesn't understand the signature
	  var memoryHistory = (0, _createMemoryHistory2.default)(options);
	  var createHistory = function createHistory() {
	    return memoryHistory;
	  };
	  var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
	  history.__v2_compatible__ = true;
	  return history;
	}
	module.exports = exports['default'];

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(15);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _ExecutionEnvironment = __webpack_require__(18);
	
	var _PathUtils = __webpack_require__(17);
	
	var _runTransitionHook = __webpack_require__(28);
	
	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);
	
	var _deprecate = __webpack_require__(29);
	
	var _deprecate2 = _interopRequireDefault(_deprecate);
	
	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var history = createHistory(options);
	
	    var basename = options.basename;
	
	    var checkedBaseHref = false;
	
	    function checkBaseHref() {
	      if (checkedBaseHref) {
	        return;
	      }
	
	      // Automatically use the value of <base href> in HTML
	      // documents as basename if it's not explicitly given.
	      if (basename == null && _ExecutionEnvironment.canUseDOM) {
	        var base = document.getElementsByTagName('base')[0];
	        var baseHref = base && base.getAttribute('href');
	
	        if (baseHref != null) {
	          basename = baseHref;
	
	          process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Automatically setting basename using <base href> is deprecated and will ' + 'be removed in the next major release. The semantics of <base href> are ' + 'subtly different from basename. Please pass the basename explicitly in ' + 'the options to createHistory') : undefined;
	        }
	      }
	
	      checkedBaseHref = true;
	    }
	
	    function addBasename(location) {
	      checkBaseHref();
	
	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;
	
	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }
	
	      return location;
	    }
	
	    function prependBasename(location) {
	      checkBaseHref();
	
	      if (!basename) return location;
	
	      if (typeof location === 'string') location = _PathUtils.parsePath(location);
	
	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;
	
	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }
	
	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }
	
	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }
	
	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }
	
	    function replace(location) {
	      history.replace(prependBasename(location));
	    }
	
	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }
	
	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }
	
	    function createLocation(location) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      return addBasename(history.createLocation.apply(history, [prependBasename(location)].concat(args)));
	    }
	
	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	      push(_extends({ state: state }, path));
	    }
	
	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _PathUtils.parsePath(path);
	
	      replace(_extends({ state: state }, path));
	    }
	
	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,
	
	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}
	
	exports['default'] = useBasename;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _warning = __webpack_require__(15);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _PathUtils = __webpack_require__(17);
	
	var _Actions = __webpack_require__(16);
	
	var _createHistory = __webpack_require__(22);
	
	var _createHistory2 = _interopRequireDefault(_createHistory);
	
	function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}
	
	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }
	
	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));
	
	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;
	
	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }
	
	  entries = entries.map(function (entry) {
	    var key = history.createKey();
	
	    if (typeof entry === 'string') return { pathname: entry, key: key };
	
	    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });
	
	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
	  });
	
	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
	  }
	
	  var storage = createStateStorage(entries);
	
	  function saveState(key, state) {
	    storage[key] = state;
	  }
	
	  function readState(key) {
	    return storage[key];
	  }
	
	  function getCurrentLocation() {
	    var entry = entries[current];
	    var basename = entry.basename;
	    var pathname = entry.pathname;
	    var search = entry.search;
	
	    var path = (basename || '') + pathname + (search || '');
	
	    var key = undefined,
	        state = undefined;
	    if (entry.key) {
	      key = entry.key;
	      state = readState(key);
	    } else {
	      key = history.createKey();
	      state = null;
	      entry.key = key;
	    }
	
	    var location = _PathUtils.parsePath(path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }
	
	  function go(n) {
	    if (n) {
	      if (!canGo(n)) {
	        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
	        return;
	      }
	
	      current += n;
	
	      var currentLocation = getCurrentLocation();
	
	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }
	
	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;
	
	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) entries.splice(current);
	
	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }
	
	  return history;
	}
	
	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = useRouterHistory;
	
	var _useQueries = __webpack_require__(30);
	
	var _useQueries2 = _interopRequireDefault(_useQueries);
	
	var _useBasename = __webpack_require__(59);
	
	var _useBasename2 = _interopRequireDefault(_useBasename);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function useRouterHistory(createHistory) {
	  return function (options) {
	    var history = (0, _useQueries2.default)((0, _useBasename2.default)(createHistory))(options);
	    history.__v2_compatible__ = true;
	    return history;
	  };
	}
	module.exports = exports['default'];

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RouterContext = __webpack_require__(41);
	
	var _RouterContext2 = _interopRequireDefault(_RouterContext);
	
	var _routerWarning = __webpack_require__(8);
	
	var _routerWarning2 = _interopRequireDefault(_routerWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }
	
	  if (process.env.NODE_ENV !== 'production') {
	    middlewares.forEach(function (middleware, index) {
	      process.env.NODE_ENV !== 'production' ? (0, _routerWarning2.default)(middleware.renderRouterContext || middleware.renderRouteComponent, 'The middleware specified at index ' + index + ' does not appear to be ' + 'a valid React Router middleware.') : void 0;
	    });
	  }
	
	  var withContext = middlewares.map(function (middleware) {
	    return middleware.renderRouterContext;
	  }).filter(Boolean);
	  var withComponent = middlewares.map(function (middleware) {
	    return middleware.renderRouteComponent;
	  }).filter(Boolean);
	
	  var makeCreateElement = function makeCreateElement() {
	    var baseCreateElement = arguments.length <= 0 || arguments[0] === undefined ? _react.createElement : arguments[0];
	    return function (Component, props) {
	      return withComponent.reduceRight(function (previous, renderRouteComponent) {
	        return renderRouteComponent(previous, props);
	      }, baseCreateElement(Component, props));
	    };
	  };
	
	  return function (renderProps) {
	    return withContext.reduceRight(function (previous, renderRouterContext) {
	      return renderRouterContext(previous, renderProps);
	    }, _react2.default.createElement(_RouterContext2.default, _extends({}, renderProps, {
	      createElement: makeCreateElement(renderProps.createElement)
	    })));
	  };
	};
	
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createBrowserHistory = __webpack_require__(64);
	
	var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
	
	var _createRouterHistory = __webpack_require__(65);
	
	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _createRouterHistory2.default)(_createBrowserHistory2.default);
	module.exports = exports['default'];

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _Actions = __webpack_require__(16);
	
	var _PathUtils = __webpack_require__(17);
	
	var _ExecutionEnvironment = __webpack_require__(18);
	
	var _DOMUtils = __webpack_require__(19);
	
	var _DOMStateStorage = __webpack_require__(20);
	
	var _createDOMHistory = __webpack_require__(21);
	
	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);
	
	/**
	 * Creates and returns a history object that uses HTML5's history API
	 * (pushState, replaceState, and the popstate event) to manage history.
	 * This is the recommended method of managing history in browsers because
	 * it provides the cleanest URLs.
	 *
	 * Note: In browsers that do not support the HTML5 history API full
	 * page reloads will be used to preserve URLs.
	 */
	function createBrowserHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;
	
	  var forceRefresh = options.forceRefresh;
	
	  var isSupported = _DOMUtils.supportsHistory();
	  var useRefresh = !isSupported || forceRefresh;
	
	  function getCurrentLocation(historyState) {
	    try {
	      historyState = historyState || window.history.state || {};
	    } catch (e) {
	      historyState = {};
	    }
	
	    var path = _DOMUtils.getWindowPath();
	    var _historyState = historyState;
	    var key = _historyState.key;
	
	    var state = undefined;
	    if (key) {
	      state = _DOMStateStorage.readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	
	      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null);
	    }
	
	    var location = _PathUtils.parsePath(path);
	
	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }
	
	  function startPopStateListener(_ref) {
	    var transitionTo = _ref.transitionTo;
	
	    function popStateListener(event) {
	      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.
	
	      transitionTo(getCurrentLocation(event.state));
	    }
	
	    _DOMUtils.addEventListener(window, 'popstate', popStateListener);
	
	    return function () {
	      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
	    };
	  }
	
	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;
	
	    if (action === _Actions.POP) return; // Nothing to do.
	
	    _DOMStateStorage.saveState(key, state);
	
	    var path = (basename || '') + pathname + search + hash;
	    var historyState = {
	      key: key
	    };
	
	    if (action === _Actions.PUSH) {
	      if (useRefresh) {
	        window.location.href = path;
	        return false; // Prevent location update.
	      } else {
	          window.history.pushState(historyState, null, path);
	        }
	    } else {
	      // REPLACE
	      if (useRefresh) {
	        window.location.replace(path);
	        return false; // Prevent location update.
	      } else {
	          window.history.replaceState(historyState, null, path);
	        }
	    }
	  }
	
	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));
	
	  var listenerCount = 0,
	      stopPopStateListener = undefined;
	
	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    var unlisten = history.listenBefore(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }
	
	  function listen(listener) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    var unlisten = history.listen(listener);
	
	    return function () {
	      unlisten();
	
	      if (--listenerCount === 0) stopPopStateListener();
	    };
	  }
	
	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);
	
	    history.registerTransitionHook(hook);
	  }
	
	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);
	
	    if (--listenerCount === 0) stopPopStateListener();
	  }
	
	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    registerTransitionHook: registerTransitionHook,
	    unregisterTransitionHook: unregisterTransitionHook
	  });
	}
	
	exports['default'] = createBrowserHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	exports.default = function (createHistory) {
	  var history = void 0;
	  if (canUseDOM) history = (0, _useRouterHistory2.default)(createHistory)();
	  return history;
	};
	
	var _useRouterHistory = __webpack_require__(61);
	
	var _useRouterHistory2 = _interopRequireDefault(_useRouterHistory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	
	module.exports = exports['default'];

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createHashHistory = __webpack_require__(14);
	
	var _createHashHistory2 = _interopRequireDefault(_createHashHistory);
	
	var _createRouterHistory = __webpack_require__(65);
	
	var _createRouterHistory2 = _interopRequireDefault(_createRouterHistory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _createRouterHistory2.default)(_createHashHistory2.default);
	module.exports = exports['default'];

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var react_router_1 = __webpack_require__(3);
	var app_1 = __webpack_require__(68);
	var signIn_1 = __webpack_require__(330);
	var signUp_1 = __webpack_require__(354);
	//set routes to different pages with react-router
	var Root = (function (_super) {
	    __extends(Root, _super);
	    function Root() {
	        _super.apply(this, arguments);
	    }
	    Root.prototype.render = function () {
	        return (React.createElement(react_router_1.Router, {history: this.props.history}, React.createElement(react_router_1.Route, {path: "/", component: app_1.App}, React.createElement(react_router_1.Route, {path: "/signIn", component: signIn_1.SignIn}), React.createElement(react_router_1.Route, {path: "/signUp", component: signUp_1.SignUp}))));
	    };
	    return Root;
	}(React.Component));
	exports.Root = Root;


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var header_1 = __webpack_require__(69);
	var App = (function (_super) {
	    __extends(App, _super);
	    function App() {
	        _super.apply(this, arguments);
	    }
	    App.prototype.render = function () {
	        return (React.createElement("div", null, React.createElement(header_1.Header, null), this.props.children));
	    };
	    return App;
	}(React.Component));
	exports.App = App;


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var react_bootstrap_1 = __webpack_require__(70);
	var react_router_1 = __webpack_require__(3);
	var authenticationActions_1 = __webpack_require__(321);
	var authenticationStore_1 = __webpack_require__(328);
	var Header = (function (_super) {
	    __extends(Header, _super);
	    function Header() {
	        _super.call(this);
	        this.state = {
	            authenticated: authenticationStore_1.default.isAuthenticated()
	        };
	        this.logout = this.logout.bind(this);
	        this.onChange = this.onChange.bind(this);
	    }
	    Header.prototype.componentWillMount = function () {
	        //add AuthStore change listener callback to get user state
	        authenticationStore_1.default.addChangeListener(this.onChange);
	    };
	    Header.prototype.componentWillUnmount = function () {
	        //remove AuthStore change listener callback
	        authenticationStore_1.default.removeChangeListener(this.onChange);
	    };
	    Header.prototype.onChange = function () {
	        //get the state of user when the AuthStore emit a change event
	        this.setState({
	            authenticated: authenticationStore_1.default.isAuthenticated()
	        });
	    };
	    //function : call the logUserOut AuthAction and change authenticated value
	    Header.prototype.logout = function () {
	        authenticationActions_1.default.logUserOut();
	        this.setState({ authenticated: false });
	    };
	    Header.prototype.render = function () {
	        return (React.createElement(react_bootstrap_1.Navbar, {fluid: true}, React.createElement(react_bootstrap_1.Navbar.Header, null, React.createElement(react_bootstrap_1.Navbar.Brand, null, React.createElement("img", {id: "logo", alt: "VitOnJob", src: "img/logo.png"})), React.createElement(react_bootstrap_1.Navbar.Toggle, null)), React.createElement(react_bootstrap_1.Navbar.Collapse, null, !this.state.authenticated ? (React.createElement(react_bootstrap_1.Nav, {pullRight: true}, React.createElement(react_bootstrap_1.NavItem, null, React.createElement(react_router_1.Link, {to: "/signIn"}, "Se connecter")), React.createElement(react_bootstrap_1.NavItem, null, React.createElement(react_router_1.Link, {to: "/signUp"}, "S'inscrire")))) : (React.createElement(react_bootstrap_1.Nav, {pullRight: true}, React.createElement(react_bootstrap_1.NavItem, {onClick: this.logout}, "Déconnexion"))))));
	    };
	    return Header;
	}(React.Component));
	exports.Header = Header;


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.utils = exports.Well = exports.Tooltip = exports.Thumbnail = exports.Tabs = exports.TabPane = exports.Table = exports.TabContent = exports.TabContainer = exports.Tab = exports.SplitButton = exports.SafeAnchor = exports.Row = exports.ResponsiveEmbed = exports.Radio = exports.ProgressBar = exports.Popover = exports.PanelGroup = exports.Panel = exports.Pagination = exports.Pager = exports.PageItem = exports.PageHeader = exports.OverlayTrigger = exports.Overlay = exports.NavItem = exports.NavDropdown = exports.NavbarBrand = exports.Navbar = exports.Nav = exports.ModalTitle = exports.ModalHeader = exports.ModalFooter = exports.ModalBody = exports.Modal = exports.MenuItem = exports.Media = exports.ListGroupItem = exports.ListGroup = exports.Label = exports.Jumbotron = exports.InputGroup = exports.Image = exports.HelpBlock = exports.Grid = exports.Glyphicon = exports.FormGroup = exports.FormControl = exports.Form = exports.Fade = exports.DropdownButton = exports.Dropdown = exports.Collapse = exports.Col = exports.ControlLabel = exports.Clearfix = exports.Checkbox = exports.CarouselItem = exports.Carousel = exports.ButtonToolbar = exports.ButtonGroup = exports.Button = exports.BreadcrumbItem = exports.Breadcrumb = exports.Badge = exports.Alert = exports.Accordion = undefined;
	
	var _Accordion2 = __webpack_require__(71);
	
	var _Accordion3 = _interopRequireDefault(_Accordion2);
	
	var _Alert2 = __webpack_require__(166);
	
	var _Alert3 = _interopRequireDefault(_Alert2);
	
	var _Badge2 = __webpack_require__(170);
	
	var _Badge3 = _interopRequireDefault(_Badge2);
	
	var _Breadcrumb2 = __webpack_require__(171);
	
	var _Breadcrumb3 = _interopRequireDefault(_Breadcrumb2);
	
	var _BreadcrumbItem2 = __webpack_require__(172);
	
	var _BreadcrumbItem3 = _interopRequireDefault(_BreadcrumbItem2);
	
	var _Button2 = __webpack_require__(176);
	
	var _Button3 = _interopRequireDefault(_Button2);
	
	var _ButtonGroup2 = __webpack_require__(177);
	
	var _ButtonGroup3 = _interopRequireDefault(_ButtonGroup2);
	
	var _ButtonToolbar2 = __webpack_require__(179);
	
	var _ButtonToolbar3 = _interopRequireDefault(_ButtonToolbar2);
	
	var _Carousel2 = __webpack_require__(180);
	
	var _Carousel3 = _interopRequireDefault(_Carousel2);
	
	var _CarouselItem2 = __webpack_require__(182);
	
	var _CarouselItem3 = _interopRequireDefault(_CarouselItem2);
	
	var _Checkbox2 = __webpack_require__(185);
	
	var _Checkbox3 = _interopRequireDefault(_Checkbox2);
	
	var _Clearfix2 = __webpack_require__(186);
	
	var _Clearfix3 = _interopRequireDefault(_Clearfix2);
	
	var _ControlLabel2 = __webpack_require__(188);
	
	var _ControlLabel3 = _interopRequireDefault(_ControlLabel2);
	
	var _Col2 = __webpack_require__(189);
	
	var _Col3 = _interopRequireDefault(_Col2);
	
	var _Collapse2 = __webpack_require__(190);
	
	var _Collapse3 = _interopRequireDefault(_Collapse2);
	
	var _Dropdown2 = __webpack_require__(203);
	
	var _Dropdown3 = _interopRequireDefault(_Dropdown2);
	
	var _DropdownButton2 = __webpack_require__(229);
	
	var _DropdownButton3 = _interopRequireDefault(_DropdownButton2);
	
	var _Fade2 = __webpack_require__(231);
	
	var _Fade3 = _interopRequireDefault(_Fade2);
	
	var _Form2 = __webpack_require__(232);
	
	var _Form3 = _interopRequireDefault(_Form2);
	
	var _FormControl2 = __webpack_require__(233);
	
	var _FormControl3 = _interopRequireDefault(_FormControl2);
	
	var _FormGroup2 = __webpack_require__(236);
	
	var _FormGroup3 = _interopRequireDefault(_FormGroup2);
	
	var _Glyphicon2 = __webpack_require__(184);
	
	var _Glyphicon3 = _interopRequireDefault(_Glyphicon2);
	
	var _Grid2 = __webpack_require__(237);
	
	var _Grid3 = _interopRequireDefault(_Grid2);
	
	var _HelpBlock2 = __webpack_require__(238);
	
	var _HelpBlock3 = _interopRequireDefault(_HelpBlock2);
	
	var _Image2 = __webpack_require__(239);
	
	var _Image3 = _interopRequireDefault(_Image2);
	
	var _InputGroup2 = __webpack_require__(240);
	
	var _InputGroup3 = _interopRequireDefault(_InputGroup2);
	
	var _Jumbotron2 = __webpack_require__(243);
	
	var _Jumbotron3 = _interopRequireDefault(_Jumbotron2);
	
	var _Label2 = __webpack_require__(244);
	
	var _Label3 = _interopRequireDefault(_Label2);
	
	var _ListGroup2 = __webpack_require__(245);
	
	var _ListGroup3 = _interopRequireDefault(_ListGroup2);
	
	var _ListGroupItem2 = __webpack_require__(246);
	
	var _ListGroupItem3 = _interopRequireDefault(_ListGroupItem2);
	
	var _Media2 = __webpack_require__(247);
	
	var _Media3 = _interopRequireDefault(_Media2);
	
	var _MenuItem2 = __webpack_require__(254);
	
	var _MenuItem3 = _interopRequireDefault(_MenuItem2);
	
	var _Modal2 = __webpack_require__(255);
	
	var _Modal3 = _interopRequireDefault(_Modal2);
	
	var _ModalBody2 = __webpack_require__(273);
	
	var _ModalBody3 = _interopRequireDefault(_ModalBody2);
	
	var _ModalFooter2 = __webpack_require__(275);
	
	var _ModalFooter3 = _interopRequireDefault(_ModalFooter2);
	
	var _ModalHeader2 = __webpack_require__(276);
	
	var _ModalHeader3 = _interopRequireDefault(_ModalHeader2);
	
	var _ModalTitle2 = __webpack_require__(277);
	
	var _ModalTitle3 = _interopRequireDefault(_ModalTitle2);
	
	var _Nav2 = __webpack_require__(278);
	
	var _Nav3 = _interopRequireDefault(_Nav2);
	
	var _Navbar2 = __webpack_require__(279);
	
	var _Navbar3 = _interopRequireDefault(_Navbar2);
	
	var _NavbarBrand2 = __webpack_require__(280);
	
	var _NavbarBrand3 = _interopRequireDefault(_NavbarBrand2);
	
	var _NavDropdown2 = __webpack_require__(284);
	
	var _NavDropdown3 = _interopRequireDefault(_NavDropdown2);
	
	var _NavItem2 = __webpack_require__(285);
	
	var _NavItem3 = _interopRequireDefault(_NavItem2);
	
	var _Overlay2 = __webpack_require__(286);
	
	var _Overlay3 = _interopRequireDefault(_Overlay2);
	
	var _OverlayTrigger2 = __webpack_require__(295);
	
	var _OverlayTrigger3 = _interopRequireDefault(_OverlayTrigger2);
	
	var _PageHeader2 = __webpack_require__(296);
	
	var _PageHeader3 = _interopRequireDefault(_PageHeader2);
	
	var _PageItem2 = __webpack_require__(297);
	
	var _PageItem3 = _interopRequireDefault(_PageItem2);
	
	var _Pager2 = __webpack_require__(300);
	
	var _Pager3 = _interopRequireDefault(_Pager2);
	
	var _Pagination2 = __webpack_require__(301);
	
	var _Pagination3 = _interopRequireDefault(_Pagination2);
	
	var _Panel2 = __webpack_require__(303);
	
	var _Panel3 = _interopRequireDefault(_Panel2);
	
	var _PanelGroup2 = __webpack_require__(155);
	
	var _PanelGroup3 = _interopRequireDefault(_PanelGroup2);
	
	var _Popover2 = __webpack_require__(304);
	
	var _Popover3 = _interopRequireDefault(_Popover2);
	
	var _ProgressBar2 = __webpack_require__(305);
	
	var _ProgressBar3 = _interopRequireDefault(_ProgressBar2);
	
	var _Radio2 = __webpack_require__(306);
	
	var _Radio3 = _interopRequireDefault(_Radio2);
	
	var _ResponsiveEmbed2 = __webpack_require__(307);
	
	var _ResponsiveEmbed3 = _interopRequireDefault(_ResponsiveEmbed2);
	
	var _Row2 = __webpack_require__(308);
	
	var _Row3 = _interopRequireDefault(_Row2);
	
	var _SafeAnchor2 = __webpack_require__(173);
	
	var _SafeAnchor3 = _interopRequireDefault(_SafeAnchor2);
	
	var _SplitButton2 = __webpack_require__(309);
	
	var _SplitButton3 = _interopRequireDefault(_SplitButton2);
	
	var _Tab2 = __webpack_require__(311);
	
	var _Tab3 = _interopRequireDefault(_Tab2);
	
	var _TabContainer2 = __webpack_require__(312);
	
	var _TabContainer3 = _interopRequireDefault(_TabContainer2);
	
	var _TabContent2 = __webpack_require__(313);
	
	var _TabContent3 = _interopRequireDefault(_TabContent2);
	
	var _Table2 = __webpack_require__(315);
	
	var _Table3 = _interopRequireDefault(_Table2);
	
	var _TabPane2 = __webpack_require__(314);
	
	var _TabPane3 = _interopRequireDefault(_TabPane2);
	
	var _Tabs2 = __webpack_require__(316);
	
	var _Tabs3 = _interopRequireDefault(_Tabs2);
	
	var _Thumbnail2 = __webpack_require__(317);
	
	var _Thumbnail3 = _interopRequireDefault(_Thumbnail2);
	
	var _Tooltip2 = __webpack_require__(318);
	
	var _Tooltip3 = _interopRequireDefault(_Tooltip2);
	
	var _Well2 = __webpack_require__(319);
	
	var _Well3 = _interopRequireDefault(_Well2);
	
	var _utils2 = __webpack_require__(320);
	
	var _utils = _interopRequireWildcard(_utils2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	exports.Accordion = _Accordion3['default'];
	exports.Alert = _Alert3['default'];
	exports.Badge = _Badge3['default'];
	exports.Breadcrumb = _Breadcrumb3['default'];
	exports.BreadcrumbItem = _BreadcrumbItem3['default'];
	exports.Button = _Button3['default'];
	exports.ButtonGroup = _ButtonGroup3['default'];
	exports.ButtonToolbar = _ButtonToolbar3['default'];
	exports.Carousel = _Carousel3['default'];
	exports.CarouselItem = _CarouselItem3['default'];
	exports.Checkbox = _Checkbox3['default'];
	exports.Clearfix = _Clearfix3['default'];
	exports.ControlLabel = _ControlLabel3['default'];
	exports.Col = _Col3['default'];
	exports.Collapse = _Collapse3['default'];
	exports.Dropdown = _Dropdown3['default'];
	exports.DropdownButton = _DropdownButton3['default'];
	exports.Fade = _Fade3['default'];
	exports.Form = _Form3['default'];
	exports.FormControl = _FormControl3['default'];
	exports.FormGroup = _FormGroup3['default'];
	exports.Glyphicon = _Glyphicon3['default'];
	exports.Grid = _Grid3['default'];
	exports.HelpBlock = _HelpBlock3['default'];
	exports.Image = _Image3['default'];
	exports.InputGroup = _InputGroup3['default'];
	exports.Jumbotron = _Jumbotron3['default'];
	exports.Label = _Label3['default'];
	exports.ListGroup = _ListGroup3['default'];
	exports.ListGroupItem = _ListGroupItem3['default'];
	exports.Media = _Media3['default'];
	exports.MenuItem = _MenuItem3['default'];
	exports.Modal = _Modal3['default'];
	exports.ModalBody = _ModalBody3['default'];
	exports.ModalFooter = _ModalFooter3['default'];
	exports.ModalHeader = _ModalHeader3['default'];
	exports.ModalTitle = _ModalTitle3['default'];
	exports.Nav = _Nav3['default'];
	exports.Navbar = _Navbar3['default'];
	exports.NavbarBrand = _NavbarBrand3['default'];
	exports.NavDropdown = _NavDropdown3['default'];
	exports.NavItem = _NavItem3['default'];
	exports.Overlay = _Overlay3['default'];
	exports.OverlayTrigger = _OverlayTrigger3['default'];
	exports.PageHeader = _PageHeader3['default'];
	exports.PageItem = _PageItem3['default'];
	exports.Pager = _Pager3['default'];
	exports.Pagination = _Pagination3['default'];
	exports.Panel = _Panel3['default'];
	exports.PanelGroup = _PanelGroup3['default'];
	exports.Popover = _Popover3['default'];
	exports.ProgressBar = _ProgressBar3['default'];
	exports.Radio = _Radio3['default'];
	exports.ResponsiveEmbed = _ResponsiveEmbed3['default'];
	exports.Row = _Row3['default'];
	exports.SafeAnchor = _SafeAnchor3['default'];
	exports.SplitButton = _SplitButton3['default'];
	exports.Tab = _Tab3['default'];
	exports.TabContainer = _TabContainer3['default'];
	exports.TabContent = _TabContent3['default'];
	exports.Table = _Table3['default'];
	exports.TabPane = _TabPane3['default'];
	exports.Tabs = _Tabs3['default'];
	exports.Thumbnail = _Thumbnail3['default'];
	exports.Tooltip = _Tooltip3['default'];
	exports.Well = _Well3['default'];
	exports.utils = _utils;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PanelGroup = __webpack_require__(155);
	
	var _PanelGroup2 = _interopRequireDefault(_PanelGroup);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var Accordion = function (_React$Component) {
	  (0, _inherits3['default'])(Accordion, _React$Component);
	
	  function Accordion() {
	    (0, _classCallCheck3['default'])(this, Accordion);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Accordion.prototype.render = function render() {
	    return _react2['default'].createElement(
	      _PanelGroup2['default'],
	      (0, _extends3['default'])({}, this.props, { accordion: true }),
	      this.props.children
	    );
	  };
	
	  return Accordion;
	}(_react2['default'].Component);
	
	exports['default'] = Accordion;
	module.exports = exports['default'];

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _assign = __webpack_require__(73);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];
	
	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }
	
	  return target;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	module.exports = __webpack_require__(78).Object.assign;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(76);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(91)});

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(77)
	  , core      = __webpack_require__(78)
	  , ctx       = __webpack_require__(79)
	  , hide      = __webpack_require__(81)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 77 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 78 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(80);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(82)
	  , createDesc = __webpack_require__(90);
	module.exports = __webpack_require__(86) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(83)
	  , IE8_DOM_DEFINE = __webpack_require__(85)
	  , toPrimitive    = __webpack_require__(89)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(86) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(84);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(86) && !__webpack_require__(87)(function(){
	  return Object.defineProperty(__webpack_require__(88)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(87)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 87 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(84)
	  , document = __webpack_require__(77).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(84);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 90 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(92)
	  , gOPS     = __webpack_require__(107)
	  , pIE      = __webpack_require__(108)
	  , toObject = __webpack_require__(109)
	  , IObject  = __webpack_require__(96)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(87)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(93)
	  , enumBugKeys = __webpack_require__(106);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(94)
	  , toIObject    = __webpack_require__(95)
	  , arrayIndexOf = __webpack_require__(99)(false)
	  , IE_PROTO     = __webpack_require__(103)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 94 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(96)
	  , defined = __webpack_require__(98);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(97);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 97 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 98 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(95)
	  , toLength  = __webpack_require__(100)
	  , toIndex   = __webpack_require__(102);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(101)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(101)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(104)('keys')
	  , uid    = __webpack_require__(105);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(77)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 105 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 106 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 107 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 108 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(98);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 110 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(112);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(113);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(133);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(114), __esModule: true };

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(115);
	__webpack_require__(128);
	module.exports = __webpack_require__(132).f('iterator');

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(116)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(117)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(101)
	  , defined   = __webpack_require__(98);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(118)
	  , $export        = __webpack_require__(76)
	  , redefine       = __webpack_require__(119)
	  , hide           = __webpack_require__(81)
	  , has            = __webpack_require__(94)
	  , Iterators      = __webpack_require__(120)
	  , $iterCreate    = __webpack_require__(121)
	  , setToStringTag = __webpack_require__(125)
	  , getPrototypeOf = __webpack_require__(127)
	  , ITERATOR       = __webpack_require__(126)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(81);

/***/ },
/* 120 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(122)
	  , descriptor     = __webpack_require__(90)
	  , setToStringTag = __webpack_require__(125)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(81)(IteratorPrototype, __webpack_require__(126)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(83)
	  , dPs         = __webpack_require__(123)
	  , enumBugKeys = __webpack_require__(106)
	  , IE_PROTO    = __webpack_require__(103)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(88)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(124).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(82)
	  , anObject = __webpack_require__(83)
	  , getKeys  = __webpack_require__(92);
	
	module.exports = __webpack_require__(86) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(77).document && document.documentElement;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(82).f
	  , has = __webpack_require__(94)
	  , TAG = __webpack_require__(126)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(104)('wks')
	  , uid        = __webpack_require__(105)
	  , Symbol     = __webpack_require__(77).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(94)
	  , toObject    = __webpack_require__(109)
	  , IE_PROTO    = __webpack_require__(103)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(129);
	var global        = __webpack_require__(77)
	  , hide          = __webpack_require__(81)
	  , Iterators     = __webpack_require__(120)
	  , TO_STRING_TAG = __webpack_require__(126)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(130)
	  , step             = __webpack_require__(131)
	  , Iterators        = __webpack_require__(120)
	  , toIObject        = __webpack_require__(95);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(117)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 130 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 131 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(126);

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(135);
	__webpack_require__(144);
	__webpack_require__(145);
	__webpack_require__(146);
	module.exports = __webpack_require__(78).Symbol;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(77)
	  , has            = __webpack_require__(94)
	  , DESCRIPTORS    = __webpack_require__(86)
	  , $export        = __webpack_require__(76)
	  , redefine       = __webpack_require__(119)
	  , META           = __webpack_require__(136).KEY
	  , $fails         = __webpack_require__(87)
	  , shared         = __webpack_require__(104)
	  , setToStringTag = __webpack_require__(125)
	  , uid            = __webpack_require__(105)
	  , wks            = __webpack_require__(126)
	  , wksExt         = __webpack_require__(132)
	  , wksDefine      = __webpack_require__(137)
	  , keyOf          = __webpack_require__(138)
	  , enumKeys       = __webpack_require__(139)
	  , isArray        = __webpack_require__(140)
	  , anObject       = __webpack_require__(83)
	  , toIObject      = __webpack_require__(95)
	  , toPrimitive    = __webpack_require__(89)
	  , createDesc     = __webpack_require__(90)
	  , _create        = __webpack_require__(122)
	  , gOPNExt        = __webpack_require__(141)
	  , $GOPD          = __webpack_require__(143)
	  , $DP            = __webpack_require__(82)
	  , $keys          = __webpack_require__(92)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(142).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(108).f  = $propertyIsEnumerable;
	  __webpack_require__(107).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(118)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(81)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(105)('meta')
	  , isObject = __webpack_require__(84)
	  , has      = __webpack_require__(94)
	  , setDesc  = __webpack_require__(82).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(87)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(77)
	  , core           = __webpack_require__(78)
	  , LIBRARY        = __webpack_require__(118)
	  , wksExt         = __webpack_require__(132)
	  , defineProperty = __webpack_require__(82).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(92)
	  , toIObject = __webpack_require__(95);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(92)
	  , gOPS    = __webpack_require__(107)
	  , pIE     = __webpack_require__(108);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(97);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(95)
	  , gOPN      = __webpack_require__(142).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(93)
	  , hiddenKeys = __webpack_require__(106).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(108)
	  , createDesc     = __webpack_require__(90)
	  , toIObject      = __webpack_require__(95)
	  , toPrimitive    = __webpack_require__(89)
	  , has            = __webpack_require__(94)
	  , IE8_DOM_DEFINE = __webpack_require__(85)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(86) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 144 */
/***/ function(module, exports) {



/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(137)('asyncIterator');

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(137)('observable');

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(148);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(152);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(112);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(149), __esModule: true };

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(150);
	module.exports = __webpack_require__(78).Object.setPrototypeOf;

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(76);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(151).set});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(84)
	  , anObject = __webpack_require__(83);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(79)(Function.call, __webpack_require__(143).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(153), __esModule: true };

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(154);
	var $Object = __webpack_require__(78).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(76)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(122)});

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _assign = __webpack_require__(73);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	var _ValidComponentChildren = __webpack_require__(165);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  accordion: _react2['default'].PropTypes.bool,
	  activeKey: _react2['default'].PropTypes.any,
	  defaultActiveKey: _react2['default'].PropTypes.any,
	  onSelect: _react2['default'].PropTypes.func,
	  role: _react2['default'].PropTypes.string
	};
	
	var defaultProps = {
	  accordion: false
	};
	
	// TODO: Use uncontrollable.
	
	var PanelGroup = function (_React$Component) {
	  (0, _inherits3['default'])(PanelGroup, _React$Component);
	
	  function PanelGroup(props, context) {
	    (0, _classCallCheck3['default'])(this, PanelGroup);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleSelect = _this.handleSelect.bind(_this);
	
	    _this.state = {
	      activeKey: props.defaultActiveKey
	    };
	    return _this;
	  }
	
	  PanelGroup.prototype.handleSelect = function handleSelect(key, e) {
	    e.preventDefault();
	
	    if (this.props.onSelect) {
	      this.props.onSelect(key, e);
	    }
	
	    if (this.state.activeKey === key) {
	      key = null;
	    }
	
	    this.setState({ activeKey: key });
	  };
	
	  PanelGroup.prototype.render = function render() {
	    var _this2 = this;
	
	    var _props = this.props;
	    var accordion = _props.accordion;
	    var propsActiveKey = _props.activeKey;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['accordion', 'activeKey', 'className', 'children']);
	
	    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['defaultActiveKey', 'onSelect']);
	
	    var bsProps = _splitBsPropsAndOmit[0];
	    var elementProps = _splitBsPropsAndOmit[1];
	
	
	    var activeKey = void 0;
	    if (accordion) {
	      activeKey = propsActiveKey != null ? propsActiveKey : this.state.activeKey;
	      elementProps.role = elementProps.role || 'tablist';
	    }
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends3['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      _ValidComponentChildren2['default'].map(children, function (child) {
	        var childProps = {
	          bsStyle: child.props.bsStyle || bsProps.bsStyle
	        };
	
	        if (accordion) {
	          (0, _assign2['default'])(childProps, {
	            headerRole: 'tab',
	            panelRole: 'tabpanel',
	            collapsible: true,
	            expanded: child.props.eventKey === activeKey,
	            onSelect: (0, _createChainedFunction2['default'])(_this2.handleSelect, child.props.onSelect)
	          });
	        }
	
	        return (0, _react.cloneElement)(child, childProps);
	      })
	    );
	  };
	
	  return PanelGroup;
	}(_react2['default'].Component);
	
	PanelGroup.propTypes = propTypes;
	PanelGroup.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('panel-group', PanelGroup);
	module.exports = exports['default'];

/***/ },
/* 156 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (obj, keys) {
	  var target = {};
	
	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }
	
	  return target;
	};

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports._curry = exports.bsSizes = exports.bsStyles = exports.bsClass = undefined;
	
	var _entries = __webpack_require__(159);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	exports.prefix = prefix;
	exports.getClassSet = getClassSet;
	exports.splitBsProps = splitBsProps;
	exports.splitBsPropsAndOmit = splitBsPropsAndOmit;
	exports.addStyle = addStyle;
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _react = __webpack_require__(1);
	
	var _StyleConfig = __webpack_require__(163);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function curry(fn) {
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var last = args[args.length - 1];
	    if (typeof last === 'function') {
	      return fn.apply(undefined, args);
	    }
	    return function (Component) {
	      return fn.apply(undefined, args.concat([Component]));
	    };
	  };
	} // TODO: The publicly exposed parts of this should be in lib/BootstrapUtils.
	
	function prefix(props, variant) {
	  !(props.bsClass != null) ? process.env.NODE_ENV !== 'production' ? (0, _invariant2['default'])(false, 'A `bsClass` prop is required for this component') : (0, _invariant2['default'])(false) : void 0;
	  return props.bsClass + (variant ? '-' + variant : '');
	}
	
	var bsClass = exports.bsClass = curry(function (defaultClass, Component) {
	  var propTypes = Component.propTypes || (Component.propTypes = {});
	  var defaultProps = Component.defaultProps || (Component.defaultProps = {});
	
	  propTypes.bsClass = _react.PropTypes.string;
	  defaultProps.bsClass = defaultClass;
	
	  return Component;
	});
	
	var bsStyles = exports.bsStyles = curry(function (styles, defaultStyle, Component) {
	  if (typeof defaultStyle !== 'string') {
	    Component = defaultStyle;
	    defaultStyle = undefined;
	  }
	
	  var existing = Component.STYLES || [];
	  var propTypes = Component.propTypes || {};
	
	  styles.forEach(function (style) {
	    if (existing.indexOf(style) === -1) {
	      existing.push(style);
	    }
	  });
	
	  var propType = _react.PropTypes.oneOf(existing);
	
	  // expose the values on the propType function for documentation
	  Component.STYLES = propType._values = existing;
	
	  Component.propTypes = (0, _extends3['default'])({}, propTypes, {
	    bsStyle: propType
	  });
	
	  if (defaultStyle !== undefined) {
	    var defaultProps = Component.defaultProps || (Component.defaultProps = {});
	    defaultProps.bsStyle = defaultStyle;
	  }
	
	  return Component;
	});
	
	var bsSizes = exports.bsSizes = curry(function (sizes, defaultSize, Component) {
	  if (typeof defaultSize !== 'string') {
	    Component = defaultSize;
	    defaultSize = undefined;
	  }
	
	  var existing = Component.SIZES || [];
	  var propTypes = Component.propTypes || {};
	
	  sizes.forEach(function (size) {
	    if (existing.indexOf(size) === -1) {
	      existing.push(size);
	    }
	  });
	
	  var values = [];
	  existing.forEach(function (size) {
	    var mappedSize = _StyleConfig.SIZE_MAP[size];
	    if (mappedSize && mappedSize !== size) {
	      values.push(mappedSize);
	    }
	
	    values.push(size);
	  });
	
	  var propType = _react.PropTypes.oneOf(values);
	  propType._values = values;
	
	  // expose the values on the propType function for documentation
	  Component.SIZES = existing;
	
	  Component.propTypes = (0, _extends3['default'])({}, propTypes, {
	    bsSize: propType
	  });
	
	  if (defaultSize !== undefined) {
	    if (!Component.defaultProps) {
	      Component.defaultProps = {};
	    }
	    Component.defaultProps.bsSize = defaultSize;
	  }
	
	  return Component;
	});
	
	function getClassSet(props) {
	  var _classes;
	
	  var classes = (_classes = {}, _classes[prefix(props)] = true, _classes);
	
	  if (props.bsSize) {
	    var bsSize = _StyleConfig.SIZE_MAP[props.bsSize] || props.bsSize;
	    classes[prefix(props, bsSize)] = true;
	  }
	
	  if (props.bsStyle) {
	    classes[prefix(props, props.bsStyle)] = true;
	  }
	
	  return classes;
	}
	
	function getBsProps(props) {
	  return {
	    bsClass: props.bsClass,
	    bsSize: props.bsSize,
	    bsStyle: props.bsStyle,
	    bsRole: props.bsRole
	  };
	}
	
	function isBsProp(propName) {
	  return propName === 'bsClass' || propName === 'bsSize' || propName === 'bsStyle' || propName === 'bsRole';
	}
	
	function splitBsProps(props) {
	  var elementProps = {};
	  (0, _entries2['default'])(props).forEach(function (_ref) {
	    var propName = _ref[0];
	    var propValue = _ref[1];
	
	    if (!isBsProp(propName)) {
	      elementProps[propName] = propValue;
	    }
	  });
	
	  return [getBsProps(props), elementProps];
	}
	
	function splitBsPropsAndOmit(props, omittedPropNames) {
	  var isOmittedProp = {};
	  omittedPropNames.forEach(function (propName) {
	    isOmittedProp[propName] = true;
	  });
	
	  var elementProps = {};
	  (0, _entries2['default'])(props).forEach(function (_ref2) {
	    var propName = _ref2[0];
	    var propValue = _ref2[1];
	
	    if (!isBsProp(propName) && !isOmittedProp[propName]) {
	      elementProps[propName] = propValue;
	    }
	  });
	
	  return [getBsProps(props), elementProps];
	}
	
	/**
	 * Add a style variant to a Component. Mutates the propTypes of the component
	 * in order to validate the new variant.
	 */
	function addStyle(Component) {
	  for (var _len2 = arguments.length, styleVariant = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	    styleVariant[_key2 - 1] = arguments[_key2];
	  }
	
	  bsStyles(styleVariant, Component);
	}
	
	var _curry = exports._curry = curry;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(160), __esModule: true };

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(161);
	module.exports = __webpack_require__(78).Object.entries;

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(76)
	  , $entries = __webpack_require__(162)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(92)
	  , toIObject = __webpack_require__(95)
	  , isEnum    = __webpack_require__(108).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 163 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var Size = exports.Size = {
	  LARGE: 'large',
	  SMALL: 'small',
	  XSMALL: 'xsmall'
	};
	
	var SIZE_MAP = exports.SIZE_MAP = {
	  large: 'lg',
	  medium: 'md',
	  small: 'sm',
	  xsmall: 'xs',
	  lg: 'lg',
	  md: 'md',
	  sm: 'sm',
	  xs: 'xs'
	};
	
	var DEVICE_SIZES = exports.DEVICE_SIZES = ['lg', 'md', 'sm', 'xs'];
	
	var State = exports.State = {
	  SUCCESS: 'success',
	  WARNING: 'warning',
	  DANGER: 'danger',
	  INFO: 'info'
	};
	
	var Style = exports.Style = {
	  DEFAULT: 'default',
	  PRIMARY: 'primary',
	  LINK: 'link',
	  INVERSE: 'inverse'
	};

/***/ },
/* 164 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @param {function} functions to chain
	 * @returns {function|null}
	 */
	function createChainedFunction() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  return funcs.filter(function (f) {
	    return f != null;
	  }).reduce(function (acc, f) {
	    if (typeof f !== 'function') {
	      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
	    }
	
	    if (acc === null) {
	      return f;
	    }
	
	    return function chainedFunction() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      acc.apply(this, args);
	      f.apply(this, args);
	    };
	  }, null);
	}
	
	exports['default'] = createChainedFunction;
	module.exports = exports['default'];

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * Iterates through children that are typically specified as `props.children`,
	 * but only maps over children that are "valid components".
	 *
	 * The mapFunction provided index will be normalised to the components mapped,
	 * so an invalid component would not increase the index.
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func.
	 * @param {*} context Context for func.
	 * @return {object} Object containing the ordered map of results.
	 */
	function map(children, func, context) {
	  var index = 0;
	
	  return _react2['default'].Children.map(children, function (child) {
	    if (!_react2['default'].isValidElement(child)) {
	      return child;
	    }
	
	    return func.call(context, child, index++);
	  });
	}
	
	/**
	 * Iterates through children that are "valid components".
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child with the index reflecting the position relative to "valid components".
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func.
	 * @param {*} context Context for context.
	 */
	// TODO: This module should be ElementChildren, and should use named exports.
	
	function forEach(children, func, context) {
	  var index = 0;
	
	  _react2['default'].Children.forEach(children, function (child) {
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }
	
	    func.call(context, child, index++);
	  });
	}
	
	/**
	 * Count the number of "valid components" in the Children container.
	 *
	 * @param {?*} children Children tree container.
	 * @returns {number}
	 */
	function count(children) {
	  var result = 0;
	
	  _react2['default'].Children.forEach(children, function (child) {
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }
	
	    ++result;
	  });
	
	  return result;
	}
	
	/**
	 * Finds children that are typically specified as `props.children`,
	 * but only iterates over children that are "valid components".
	 *
	 * The provided forEachFunc(child, index) will be called for each
	 * leaf child with the index reflecting the position relative to "valid components".
	 *
	 * @param {?*} children Children tree container.
	 * @param {function(*, int)} func.
	 * @param {*} context Context for func.
	 * @returns {array} of children that meet the func return statement
	 */
	function filter(children, func, context) {
	  var index = 0;
	  var result = [];
	
	  _react2['default'].Children.forEach(children, function (child) {
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }
	
	    if (func.call(context, child, index++)) {
	      result.push(child);
	    }
	  });
	
	  return result;
	}
	
	function find(children, func, context) {
	  var index = 0;
	  var result = undefined;
	
	  _react2['default'].Children.forEach(children, function (child) {
	    if (result) {
	      return;
	    }
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }
	
	    if (func.call(context, child, index++)) {
	      result = child;
	    }
	  });
	
	  return result;
	}
	
	function every(children, func, context) {
	  var index = 0;
	  var result = true;
	
	  _react2['default'].Children.forEach(children, function (child) {
	    if (!result) {
	      return;
	    }
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }
	
	    if (!func.call(context, child, index++)) {
	      result = false;
	    }
	  });
	
	  return result;
	}
	
	function some(children, func, context) {
	  var index = 0;
	  var result = false;
	
	  _react2['default'].Children.forEach(children, function (child) {
	    if (result) {
	      return;
	    }
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }
	
	    if (func.call(context, child, index++)) {
	      result = true;
	    }
	  });
	
	  return result;
	}
	
	function toArray(children) {
	  var result = [];
	
	  _react2['default'].Children.forEach(children, function (child) {
	    if (!_react2['default'].isValidElement(child)) {
	      return;
	    }
	
	    result.push(child);
	  });
	
	  return result;
	}
	
	exports['default'] = {
	  map: map,
	  forEach: forEach,
	  count: count,
	  find: find,
	  filter: filter,
	  every: every,
	  some: some,
	  toArray: toArray
	};
	module.exports = exports['default'];

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _values = __webpack_require__(167);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _StyleConfig = __webpack_require__(163);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  onDismiss: _react2['default'].PropTypes.func,
	  closeLabel: _react2['default'].PropTypes.string
	};
	
	var defaultProps = {
	  closeLabel: 'Close alert'
	};
	
	var Alert = function (_React$Component) {
	  (0, _inherits3['default'])(Alert, _React$Component);
	
	  function Alert() {
	    (0, _classCallCheck3['default'])(this, Alert);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Alert.prototype.renderDismissButton = function renderDismissButton(onDismiss) {
	    return _react2['default'].createElement(
	      'button',
	      {
	        type: 'button',
	        className: 'close',
	        onClick: onDismiss,
	        'aria-hidden': 'true',
	        tabIndex: '-1'
	      },
	      _react2['default'].createElement(
	        'span',
	        null,
	        '×'
	      )
	    );
	  };
	
	  Alert.prototype.renderSrOnlyDismissButton = function renderSrOnlyDismissButton(onDismiss, closeLabel) {
	    return _react2['default'].createElement(
	      'button',
	      {
	        type: 'button',
	        className: 'close sr-only',
	        onClick: onDismiss
	      },
	      closeLabel
	    );
	  };
	
	  Alert.prototype.render = function render() {
	    var _extends2;
	
	    var _props = this.props;
	    var onDismiss = _props.onDismiss;
	    var closeLabel = _props.closeLabel;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['onDismiss', 'closeLabel', 'className', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var dismissable = !!onDismiss;
	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'dismissable')] = dismissable, _extends2));
	
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends4['default'])({}, elementProps, {
	        role: 'alert',
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      dismissable && this.renderDismissButton(onDismiss),
	      children,
	      dismissable && this.renderSrOnlyDismissButton(onDismiss, closeLabel)
	    );
	  };
	
	  return Alert;
	}(_react2['default'].Component);
	
	Alert.propTypes = propTypes;
	Alert.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsStyles)((0, _values2['default'])(_StyleConfig.State), _StyleConfig.State.INFO, (0, _bootstrapUtils.bsClass)('alert', Alert));
	module.exports = exports['default'];

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(168), __esModule: true };

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(169);
	module.exports = __webpack_require__(78).Object.values;

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(76)
	  , $values = __webpack_require__(162)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// TODO: `pullRight` doesn't belong here. There's no special handling here.
	
	var propTypes = {
	  pullRight: _react2['default'].PropTypes.bool
	};
	
	var defaultProps = {
	  pullRight: false
	};
	
	var Badge = function (_React$Component) {
	  (0, _inherits3['default'])(Badge, _React$Component);
	
	  function Badge() {
	    (0, _classCallCheck3['default'])(this, Badge);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Badge.prototype.hasContent = function hasContent(children) {
	    var result = false;
	
	    _react2['default'].Children.forEach(children, function (child) {
	      if (result) {
	        return;
	      }
	
	      if (child || child === 0) {
	        result = true;
	      }
	    });
	
	    return result;
	  };
	
	  Badge.prototype.render = function render() {
	    var _props = this.props;
	    var pullRight = _props.pullRight;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['pullRight', 'className', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _extends3['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
	      'pull-right': pullRight,
	
	      // Hack for collapsing on IE8.
	      hidden: !this.hasContent(children)
	    });
	
	    return _react2['default'].createElement(
	      'span',
	      (0, _extends3['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      children
	    );
	  };
	
	  return Badge;
	}(_react2['default'].Component);
	
	Badge.propTypes = propTypes;
	Badge.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('badge', Badge);
	module.exports = exports['default'];

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _BreadcrumbItem = __webpack_require__(172);
	
	var _BreadcrumbItem2 = _interopRequireDefault(_BreadcrumbItem);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var Breadcrumb = function (_React$Component) {
	  (0, _inherits3['default'])(Breadcrumb, _React$Component);
	
	  function Breadcrumb() {
	    (0, _classCallCheck3['default'])(this, Breadcrumb);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Breadcrumb.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement('ol', (0, _extends3['default'])({}, elementProps, {
	      role: 'navigation',
	      'aria-label': 'breadcrumbs',
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return Breadcrumb;
	}(_react2['default'].Component);
	
	Breadcrumb.Item = _BreadcrumbItem2['default'];
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('breadcrumb', Breadcrumb);
	module.exports = exports['default'];

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SafeAnchor = __webpack_require__(173);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * If set to true, renders `span` instead of `a`
	   */
	  active: _react2['default'].PropTypes.bool,
	  /**
	   * `href` attribute for the inner `a` element
	   */
	  href: _react2['default'].PropTypes.string,
	  /**
	   * `title` attribute for the inner `a` element
	   */
	  title: _react2['default'].PropTypes.node,
	  /**
	   * `target` attribute for the inner `a` element
	   */
	  target: _react2['default'].PropTypes.string
	};
	
	var defaultProps = {
	  active: false
	};
	
	var BreadcrumbItem = function (_React$Component) {
	  (0, _inherits3['default'])(BreadcrumbItem, _React$Component);
	
	  function BreadcrumbItem() {
	    (0, _classCallCheck3['default'])(this, BreadcrumbItem);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  BreadcrumbItem.prototype.render = function render() {
	    var _props = this.props;
	    var active = _props.active;
	    var href = _props.href;
	    var title = _props.title;
	    var target = _props.target;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['active', 'href', 'title', 'target', 'className']);
	
	    // Don't try to render these props on non-active <span>.
	
	    var linkProps = { href: href, title: title, target: target };
	
	    return _react2['default'].createElement(
	      'li',
	      { className: (0, _classnames2['default'])(className, { active: active }) },
	      active ? _react2['default'].createElement('span', props) : _react2['default'].createElement(_SafeAnchor2['default'], (0, _extends3['default'])({}, props, linkProps))
	    );
	  };
	
	  return BreadcrumbItem;
	}(_react2['default'].Component);
	
	BreadcrumbItem.propTypes = propTypes;
	BreadcrumbItem.defaultProps = defaultProps;
	
	exports['default'] = BreadcrumbItem;
	module.exports = exports['default'];

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  href: _react2['default'].PropTypes.string,
	  onClick: _react2['default'].PropTypes.func,
	  disabled: _react2['default'].PropTypes.bool,
	  role: _react2['default'].PropTypes.string,
	  tabIndex: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	  /**
	   * this is sort of silly but needed for Button
	   */
	  componentClass: _elementType2['default']
	};
	
	var defaultProps = {
	  componentClass: 'a'
	};
	
	function isTrivialHref(href) {
	  return !href || href.trim() === '#';
	}
	
	/**
	 * There are situations due to browser quirks or Bootstrap CSS where
	 * an anchor tag is needed, when semantically a button tag is the
	 * better choice. SafeAnchor ensures that when an anchor is used like a
	 * button its accessible. It also emulates input `disabled` behavior for
	 * links, which is usually desirable for Buttons, NavItems, MenuItems, etc.
	 */
	
	var SafeAnchor = function (_React$Component) {
	  (0, _inherits3['default'])(SafeAnchor, _React$Component);
	
	  function SafeAnchor(props, context) {
	    (0, _classCallCheck3['default'])(this, SafeAnchor);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleClick = _this.handleClick.bind(_this);
	    return _this;
	  }
	
	  SafeAnchor.prototype.handleClick = function handleClick(event) {
	    var _props = this.props;
	    var disabled = _props.disabled;
	    var href = _props.href;
	    var onClick = _props.onClick;
	
	
	    if (disabled || isTrivialHref(href)) {
	      event.preventDefault();
	    }
	
	    if (disabled) {
	      event.stopPropagation();
	      return;
	    }
	
	    if (onClick) {
	      onClick(event);
	    }
	  };
	
	  SafeAnchor.prototype.render = function render() {
	    var _props2 = this.props;
	    var Component = _props2.componentClass;
	    var disabled = _props2.disabled;
	    var props = (0, _objectWithoutProperties3['default'])(_props2, ['componentClass', 'disabled']);
	
	
	    if (isTrivialHref(props.href)) {
	      props.role = props.role || 'button';
	      // we want to make sure there is a href attribute on the node
	      // otherwise, the cursor incorrectly styled (except with role='button')
	      props.href = props.href || '';
	    }
	
	    if (disabled) {
	      props.tabIndex = -1;
	      props.style = (0, _extends3['default'])({ pointerEvents: 'none' }, props.style);
	    }
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, props, {
	      onClick: this.handleClick
	    }));
	  };
	
	  return SafeAnchor;
	}(_react2['default'].Component);
	
	SafeAnchor.propTypes = propTypes;
	SafeAnchor.defaultProps = defaultProps;
	
	exports['default'] = SafeAnchor;
	module.exports = exports['default'];

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _createChainableTypeChecker = __webpack_require__(175);
	
	var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function elementType(props, propName, componentName, location, propFullName) {
	  var propValue = props[propName];
	  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
	
	  if (_react2.default.isValidElement(propValue)) {
	    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
	  }
	
	  if (propType !== 'function' && propType !== 'string') {
	    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected an element type (a string ') + 'or a ReactClass).');
	  }
	
	  return null;
	}
	
	exports.default = (0, _createChainableTypeChecker2.default)(elementType);

/***/ },
/* 175 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = createChainableTypeChecker;
	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	// Mostly taken from ReactPropTypes.
	
	function createChainableTypeChecker(validate) {
	  function checkType(isRequired, props, propName, componentName, location, propFullName) {
	    var componentNameSafe = componentName || '<<anonymous>>';
	    var propFullNameSafe = propFullName || propName;
	
	    if (props[propName] == null) {
	      if (isRequired) {
	        return new Error('Required ' + location + ' `' + propFullNameSafe + '` was not specified ' + ('in `' + componentNameSafe + '`.'));
	      }
	
	      return null;
	    }
	
	    for (var _len = arguments.length, args = Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
	      args[_key - 6] = arguments[_key];
	    }
	
	    return validate.apply(undefined, [props, propName, componentNameSafe, location, propFullNameSafe].concat(args));
	  }
	
	  var chainedCheckType = checkType.bind(null, false);
	  chainedCheckType.isRequired = checkType.bind(null, true);
	
	  return chainedCheckType;
	}

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _values = __webpack_require__(167);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _StyleConfig = __webpack_require__(163);
	
	var _SafeAnchor = __webpack_require__(173);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  active: _react2['default'].PropTypes.bool,
	  disabled: _react2['default'].PropTypes.bool,
	  block: _react2['default'].PropTypes.bool,
	  onClick: _react2['default'].PropTypes.func,
	  componentClass: _elementType2['default'],
	  href: _react2['default'].PropTypes.string,
	  /**
	   * Defines HTML button type attribute
	   * @defaultValue 'button'
	   */
	  type: _react2['default'].PropTypes.oneOf(['button', 'reset', 'submit'])
	};
	
	var defaultProps = {
	  active: false,
	  block: false,
	  disabled: false
	};
	
	var Button = function (_React$Component) {
	  (0, _inherits3['default'])(Button, _React$Component);
	
	  function Button() {
	    (0, _classCallCheck3['default'])(this, Button);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Button.prototype.renderAnchor = function renderAnchor(elementProps, className) {
	    return _react2['default'].createElement(_SafeAnchor2['default'], (0, _extends4['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, elementProps.disabled && 'disabled')
	    }));
	  };
	
	  Button.prototype.renderButton = function renderButton(_ref, className) {
	    var componentClass = _ref.componentClass;
	    var elementProps = (0, _objectWithoutProperties3['default'])(_ref, ['componentClass']);
	
	    var Component = componentClass || 'button';
	
	    return _react2['default'].createElement(Component, (0, _extends4['default'])({}, elementProps, {
	      type: elementProps.type || 'button',
	      className: className
	    }));
	  };
	
	  Button.prototype.render = function render() {
	    var _extends2;
	
	    var _props = this.props;
	    var active = _props.active;
	    var block = _props.block;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['active', 'block', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {
	      active: active
	    }, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'block')] = block, _extends2));
	    var fullClassName = (0, _classnames2['default'])(className, classes);
	
	    if (elementProps.href) {
	      return this.renderAnchor(elementProps, fullClassName);
	    }
	
	    return this.renderButton(elementProps, fullClassName);
	  };
	
	  return Button;
	}(_react2['default'].Component);
	
	Button.propTypes = propTypes;
	Button.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('btn', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL, _StyleConfig.Size.XSMALL], (0, _bootstrapUtils.bsStyles)([].concat((0, _values2['default'])(_StyleConfig.State), [_StyleConfig.Style.DEFAULT, _StyleConfig.Style.PRIMARY, _StyleConfig.Style.LINK]), _StyleConfig.Style.DEFAULT, Button)));
	module.exports = exports['default'];

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _all = __webpack_require__(178);
	
	var _all2 = _interopRequireDefault(_all);
	
	var _Button = __webpack_require__(176);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  vertical: _react2['default'].PropTypes.bool,
	  justified: _react2['default'].PropTypes.bool,
	
	  /**
	   * Display block buttons; only useful when used with the "vertical" prop.
	   * @type {bool}
	   */
	  block: (0, _all2['default'])(_react2['default'].PropTypes.bool, function (_ref) {
	    var block = _ref.block;
	    var vertical = _ref.vertical;
	    return block && !vertical ? new Error('`block` requires `vertical` to be set to have any effect') : null;
	  })
	};
	
	var defaultProps = {
	  block: false,
	  justified: false,
	  vertical: false
	};
	
	var ButtonGroup = function (_React$Component) {
	  (0, _inherits3['default'])(ButtonGroup, _React$Component);
	
	  function ButtonGroup() {
	    (0, _classCallCheck3['default'])(this, ButtonGroup);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  ButtonGroup.prototype.render = function render() {
	    var _extends2;
	
	    var _props = this.props;
	    var block = _props.block;
	    var justified = _props.justified;
	    var vertical = _props.vertical;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['block', 'justified', 'vertical', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[(0, _bootstrapUtils.prefix)(bsProps)] = !vertical, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'vertical')] = vertical, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'justified')] = justified, _extends2[(0, _bootstrapUtils.prefix)(_Button2['default'].defaultProps, 'block')] = block, _extends2));
	
	    return _react2['default'].createElement('div', (0, _extends4['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return ButtonGroup;
	}(_react2['default'].Component);
	
	ButtonGroup.propTypes = propTypes;
	ButtonGroup.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('btn-group', ButtonGroup);
	module.exports = exports['default'];

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = all;
	
	var _createChainableTypeChecker = __webpack_require__(175);
	
	var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function all() {
	  for (var _len = arguments.length, validators = Array(_len), _key = 0; _key < _len; _key++) {
	    validators[_key] = arguments[_key];
	  }
	
	  function allPropTypes() {
	    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      args[_key2] = arguments[_key2];
	    }
	
	    var error = null;
	
	    validators.forEach(function (validator) {
	      if (error != null) {
	        return;
	      }
	
	      var result = validator.apply(undefined, args);
	      if (result != null) {
	        error = result;
	      }
	    });
	
	    return error;
	  }
	
	  return (0, _createChainableTypeChecker2.default)(allPropTypes);
	}

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(176);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var ButtonToolbar = function (_React$Component) {
	  (0, _inherits3['default'])(ButtonToolbar, _React$Component);
	
	  function ButtonToolbar() {
	    (0, _classCallCheck3['default'])(this, ButtonToolbar);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  ButtonToolbar.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement('div', (0, _extends3['default'])({}, elementProps, {
	      role: 'toolbar',
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return ButtonToolbar;
	}(_react2['default'].Component);
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('btn-toolbar', (0, _bootstrapUtils.bsSizes)(_Button2['default'].SIZES, ButtonToolbar));
	module.exports = exports['default'];

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _CarouselCaption = __webpack_require__(181);
	
	var _CarouselCaption2 = _interopRequireDefault(_CarouselCaption);
	
	var _CarouselItem = __webpack_require__(182);
	
	var _CarouselItem2 = _interopRequireDefault(_CarouselItem);
	
	var _Glyphicon = __webpack_require__(184);
	
	var _Glyphicon2 = _interopRequireDefault(_Glyphicon);
	
	var _SafeAnchor = __webpack_require__(173);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _ValidComponentChildren = __webpack_require__(165);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// TODO: `slide` should be `animate`.
	
	// TODO: Use uncontrollable.
	
	var propTypes = {
	  slide: _react2['default'].PropTypes.bool,
	  indicators: _react2['default'].PropTypes.bool,
	  interval: _react2['default'].PropTypes.number,
	  controls: _react2['default'].PropTypes.bool,
	  pauseOnHover: _react2['default'].PropTypes.bool,
	  wrap: _react2['default'].PropTypes.bool,
	  /**
	   * Callback fired when the active item changes.
	   *
	   * ```js
	   * (eventKey: any) => any | (eventKey: any, event: Object) => any
	   * ```
	   *
	   * If this callback takes two or more arguments, the second argument will
	   * be a persisted event object with `direction` set to the direction of the
	   * transition.
	   */
	  onSelect: _react2['default'].PropTypes.func,
	  onSlideEnd: _react2['default'].PropTypes.func,
	  activeIndex: _react2['default'].PropTypes.number,
	  defaultActiveIndex: _react2['default'].PropTypes.number,
	  direction: _react2['default'].PropTypes.oneOf(['prev', 'next']),
	  prevIcon: _react2['default'].PropTypes.node,
	  nextIcon: _react2['default'].PropTypes.node
	};
	
	var defaultProps = {
	  slide: true,
	  interval: 5000,
	  pauseOnHover: true,
	  wrap: true,
	  indicators: true,
	  controls: true,
	  prevIcon: _react2['default'].createElement(_Glyphicon2['default'], { glyph: 'chevron-left' }),
	  nextIcon: _react2['default'].createElement(_Glyphicon2['default'], { glyph: 'chevron-right' })
	};
	
	var Carousel = function (_React$Component) {
	  (0, _inherits3['default'])(Carousel, _React$Component);
	
	  function Carousel(props, context) {
	    (0, _classCallCheck3['default'])(this, Carousel);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleMouseOver = _this.handleMouseOver.bind(_this);
	    _this.handleMouseOut = _this.handleMouseOut.bind(_this);
	    _this.handlePrev = _this.handlePrev.bind(_this);
	    _this.handleNext = _this.handleNext.bind(_this);
	    _this.handleItemAnimateOutEnd = _this.handleItemAnimateOutEnd.bind(_this);
	
	    var defaultActiveIndex = props.defaultActiveIndex;
	
	
	    _this.state = {
	      activeIndex: defaultActiveIndex != null ? defaultActiveIndex : 0,
	      previousActiveIndex: null,
	      direction: null
	    };
	
	    _this.isUnmounted = false;
	    return _this;
	  }
	
	  Carousel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    var activeIndex = this.getActiveIndex();
	
	    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
	      clearTimeout(this.timeout);
	
	      this.setState({
	        previousActiveIndex: activeIndex,
	        direction: nextProps.direction != null ? nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
	      });
	    }
	  };
	
	  Carousel.prototype.componentDidMount = function componentDidMount() {
	    this.waitForNext();
	  };
	
	  Carousel.prototype.componentWillUnmount = function componentWillUnmount() {
	    clearTimeout(this.timeout);
	    this.isUnmounted = true;
	  };
	
	  Carousel.prototype.handleMouseOver = function handleMouseOver() {
	    if (this.props.pauseOnHover) {
	      this.pause();
	    }
	  };
	
	  Carousel.prototype.handleMouseOut = function handleMouseOut() {
	    if (this.isPaused) {
	      this.play();
	    }
	  };
	
	  Carousel.prototype.handlePrev = function handlePrev(e) {
	    var index = this.getActiveIndex() - 1;
	
	    if (index < 0) {
	      if (!this.props.wrap) {
	        return;
	      }
	      index = _ValidComponentChildren2['default'].count(this.props.children) - 1;
	    }
	
	    this.select(index, e, 'prev');
	  };
	
	  Carousel.prototype.handleNext = function handleNext(e) {
	    var index = this.getActiveIndex() + 1;
	    var count = _ValidComponentChildren2['default'].count(this.props.children);
	
	    if (index > count - 1) {
	      if (!this.props.wrap) {
	        return;
	      }
	      index = 0;
	    }
	
	    this.select(index, e, 'next');
	  };
	
	  Carousel.prototype.handleItemAnimateOutEnd = function handleItemAnimateOutEnd() {
	    var _this2 = this;
	
	    this.setState({
	      previousActiveIndex: null,
	      direction: null
	    }, function () {
	      _this2.waitForNext();
	
	      if (_this2.props.onSlideEnd) {
	        _this2.props.onSlideEnd();
	      }
	    });
	  };
	
	  Carousel.prototype.getActiveIndex = function getActiveIndex() {
	    var activeIndexProp = this.props.activeIndex;
	    return activeIndexProp != null ? activeIndexProp : this.state.activeIndex;
	  };
	
	  Carousel.prototype.getDirection = function getDirection(prevIndex, index) {
	    if (prevIndex === index) {
	      return null;
	    }
	
	    return prevIndex > index ? 'prev' : 'next';
	  };
	
	  Carousel.prototype.select = function select(index, e, direction) {
	    clearTimeout(this.timeout);
	
	    // TODO: Is this necessary? Seems like the only risk is if the component
	    // unmounts while handleItemAnimateOutEnd fires.
	    if (this.isUnmounted) {
	      return;
	    }
	
	    var previousActiveIndex = this.getActiveIndex();
	    direction = direction || this.getDirection(previousActiveIndex, index);
	
	    var onSelect = this.props.onSelect;
	
	
	    if (onSelect) {
	      if (onSelect.length > 1) {
	        // React SyntheticEvents are pooled, so we need to remove this event
	        // from the pool to add a custom property. To avoid unnecessarily
	        // removing objects from the pool, only do this when the listener
	        // actually wants the event.
	        if (e) {
	          e.persist();
	          e.direction = direction;
	        } else {
	          e = { direction: direction };
	        }
	
	        onSelect(index, e);
	      } else {
	        onSelect(index);
	      }
	    }
	
	    if (this.props.activeIndex == null && index !== previousActiveIndex) {
	      if (this.state.previousActiveIndex != null) {
	        // If currently animating don't activate the new index.
	        // TODO: look into queueing this canceled call and
	        // animating after the current animation has ended.
	        return;
	      }
	
	      this.setState({
	        activeIndex: index,
	        previousActiveIndex: previousActiveIndex,
	        direction: direction
	      });
	    }
	  };
	
	  Carousel.prototype.waitForNext = function waitForNext() {
	    var _props = this.props;
	    var slide = _props.slide;
	    var interval = _props.interval;
	    var activeIndexProp = _props.activeIndex;
	
	
	    if (!this.isPaused && slide && interval && activeIndexProp == null) {
	      this.timeout = setTimeout(this.handleNext, interval);
	    }
	  };
	
	  // This might be a public API.
	
	
	  Carousel.prototype.pause = function pause() {
	    this.isPaused = true;
	    clearTimeout(this.timeout);
	  };
	
	  // This might be a public API.
	
	
	  Carousel.prototype.play = function play() {
	    this.isPaused = false;
	    this.waitForNext();
	  };
	
	  Carousel.prototype.renderIndicators = function renderIndicators(children, activeIndex, bsProps) {
	    var _this3 = this;
	
	    var indicators = [];
	
	    _ValidComponentChildren2['default'].forEach(children, function (child, index) {
	      indicators.push(_react2['default'].createElement('li', {
	        key: index,
	        className: index === activeIndex ? 'active' : null,
	        onClick: function onClick(e) {
	          return _this3.select(index, e);
	        }
	      }),
	
	      // Force whitespace between indicator elements. Bootstrap requires
	      // this for correct spacing of elements.
	      ' ');
	    });
	
	    return _react2['default'].createElement(
	      'ol',
	      { className: (0, _bootstrapUtils.prefix)(bsProps, 'indicators') },
	      indicators
	    );
	  };
	
	  Carousel.prototype.renderControls = function renderControls(wrap, children, activeIndex, prevIcon, nextIcon, bsProps) {
	    var controlClassName = (0, _bootstrapUtils.prefix)(bsProps, 'control');
	    var count = _ValidComponentChildren2['default'].count(children);
	
	    return [(wrap || activeIndex !== 0) && _react2['default'].createElement(
	      _SafeAnchor2['default'],
	      {
	        key: 'prev',
	        className: (0, _classnames2['default'])(controlClassName, 'left'),
	        onClick: this.handlePrev
	      },
	      prevIcon
	    ), (wrap || activeIndex !== count - 1) && _react2['default'].createElement(
	      _SafeAnchor2['default'],
	      {
	        key: 'next',
	        className: (0, _classnames2['default'])(controlClassName, 'right'),
	        onClick: this.handleNext
	      },
	      nextIcon
	    )];
	  };
	
	  Carousel.prototype.render = function render() {
	    var _this4 = this;
	
	    var _props2 = this.props;
	    var slide = _props2.slide;
	    var indicators = _props2.indicators;
	    var controls = _props2.controls;
	    var wrap = _props2.wrap;
	    var prevIcon = _props2.prevIcon;
	    var nextIcon = _props2.nextIcon;
	    var className = _props2.className;
	    var children = _props2.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props2, ['slide', 'indicators', 'controls', 'wrap', 'prevIcon', 'nextIcon', 'className', 'children']);
	    var _state = this.state;
	    var previousActiveIndex = _state.previousActiveIndex;
	    var direction = _state.direction;
	
	    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['interval', 'pauseOnHover', 'onSelect', 'onSlideEnd', 'activeIndex', // Accessed via this.getActiveIndex().
	    'defaultActiveIndex', 'direction']);
	
	    var bsProps = _splitBsPropsAndOmit[0];
	    var elementProps = _splitBsPropsAndOmit[1];
	
	
	    var activeIndex = this.getActiveIndex();
	
	    var classes = (0, _extends3['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
	      slide: slide
	    });
	
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends3['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes),
	        onMouseOver: this.handleMouseOver,
	        onMouseOut: this.handleMouseOut
	      }),
	      indicators && this.renderIndicators(children, activeIndex, bsProps),
	      _react2['default'].createElement(
	        'div',
	        { className: (0, _bootstrapUtils.prefix)(bsProps, 'inner') },
	        _ValidComponentChildren2['default'].map(children, function (child, index) {
	          var active = index === activeIndex;
	          var previousActive = slide && index === previousActiveIndex;
	
	          return (0, _react.cloneElement)(child, {
	            active: active,
	            index: index,
	            animateOut: previousActive,
	            animateIn: active && previousActiveIndex != null && slide,
	            direction: direction,
	            onAnimateOutEnd: previousActive ? _this4.handleItemAnimateOutEnd : null
	          });
	        })
	      ),
	      controls && this.renderControls(wrap, children, activeIndex, prevIcon, nextIcon, bsProps)
	    );
	  };
	
	  return Carousel;
	}(_react2['default'].Component);
	
	Carousel.propTypes = propTypes;
	Carousel.defaultProps = defaultProps;
	
	Carousel.Caption = _CarouselCaption2['default'];
	Carousel.Item = _CarouselItem2['default'];
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('carousel', Carousel);
	module.exports = exports['default'];

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  componentClass: _elementType2['default']
	};
	
	var defaultProps = {
	  componentClass: 'div'
	};
	
	var CarouselCaption = function (_React$Component) {
	  (0, _inherits3['default'])(CarouselCaption, _React$Component);
	
	  function CarouselCaption() {
	    (0, _classCallCheck3['default'])(this, CarouselCaption);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  CarouselCaption.prototype.render = function render() {
	    var _props = this.props;
	    var Component = _props.componentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return CarouselCaption;
	}(_react2['default'].Component);
	
	CarouselCaption.propTypes = propTypes;
	CarouselCaption.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('carousel-caption', CarouselCaption);
	module.exports = exports['default'];

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _TransitionEvents = __webpack_require__(183);
	
	var _TransitionEvents2 = _interopRequireDefault(_TransitionEvents);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// TODO: This should use a timeout instead of TransitionEvents, or else just
	// not wait until transition end to trigger continuing animations.
	
	var propTypes = {
	  direction: _react2['default'].PropTypes.oneOf(['prev', 'next']),
	  onAnimateOutEnd: _react2['default'].PropTypes.func,
	  active: _react2['default'].PropTypes.bool,
	  animateIn: _react2['default'].PropTypes.bool,
	  animateOut: _react2['default'].PropTypes.bool,
	  index: _react2['default'].PropTypes.number
	};
	
	var defaultProps = {
	  active: false,
	  animateIn: false,
	  animateOut: false
	};
	
	var CarouselItem = function (_React$Component) {
	  (0, _inherits3['default'])(CarouselItem, _React$Component);
	
	  function CarouselItem(props, context) {
	    (0, _classCallCheck3['default'])(this, CarouselItem);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleAnimateOutEnd = _this.handleAnimateOutEnd.bind(_this);
	
	    _this.state = {
	      direction: null
	    };
	
	    _this.isUnmounted = false;
	    return _this;
	  }
	
	  CarouselItem.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (this.props.active !== nextProps.active) {
	      this.setState({ direction: null });
	    }
	  };
	
	  CarouselItem.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
	    var _this2 = this;
	
	    var active = this.props.active;
	
	    var prevActive = prevProps.active;
	
	    if (!active && prevActive) {
	      _TransitionEvents2['default'].addEndEventListener(_reactDom2['default'].findDOMNode(this), this.handleAnimateOutEnd);
	    }
	
	    if (active !== prevActive) {
	      setTimeout(function () {
	        return _this2.startAnimation();
	      }, 20);
	    }
	  };
	
	  CarouselItem.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.isUnmounted = true;
	  };
	
	  CarouselItem.prototype.handleAnimateOutEnd = function handleAnimateOutEnd() {
	    if (this.isUnmounted) {
	      return;
	    }
	
	    if (this.props.onAnimateOutEnd) {
	      this.props.onAnimateOutEnd(this.props.index);
	    }
	  };
	
	  CarouselItem.prototype.startAnimation = function startAnimation() {
	    if (this.isUnmounted) {
	      return;
	    }
	
	    this.setState({
	      direction: this.props.direction === 'prev' ? 'right' : 'left'
	    });
	  };
	
	  CarouselItem.prototype.render = function render() {
	    var _props = this.props;
	    var direction = _props.direction;
	    var active = _props.active;
	    var animateIn = _props.animateIn;
	    var animateOut = _props.animateOut;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['direction', 'active', 'animateIn', 'animateOut', 'className']);
	
	
	    delete props.onAnimateOutEnd;
	    delete props.index;
	
	    var classes = {
	      item: true,
	      active: active && !animateIn || animateOut
	    };
	    if (direction && active && animateIn) {
	      classes[direction] = true;
	    }
	    if (this.state.direction && (animateIn || animateOut)) {
	      classes[this.state.direction] = true;
	    }
	
	    return _react2['default'].createElement('div', (0, _extends3['default'])({}, props, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return CarouselItem;
	}(_react2['default'].Component);
	
	CarouselItem.propTypes = propTypes;
	CarouselItem.defaultProps = defaultProps;
	
	exports['default'] = CarouselItem;
	module.exports = exports['default'];

/***/ },
/* 183 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This file contains a modified version of:
	 * https://github.com/facebook/react/blob/v0.12.0/src/addons/transitions/ReactTransitionEvents.js
	 *
	 * This source code is licensed under the BSD-style license found here:
	 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
	 * An additional grant of patent rights can be found here:
	 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
	 */
	
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	
	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },
	
	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};
	
	var endEvents = [];
	
	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;
	
	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }
	
	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }
	
	  for (var baseEventName in EVENT_NAME_MAP) {
	    // eslint-disable-line guard-for-in
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}
	
	if (canUseDOM) {
	  detectEvents();
	}
	
	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.
	
	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}
	
	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}
	
	var ReactTransitionEvents = {
	  addEndEventListener: function addEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },
	  removeEndEventListener: function removeEndEventListener(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function (endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};
	
	exports['default'] = ReactTransitionEvents;
	module.exports = exports['default'];

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * An icon name. See e.g. http://getbootstrap.com/components/#glyphicons
	   */
	  glyph: _react2['default'].PropTypes.string.isRequired
	};
	
	var Glyphicon = function (_React$Component) {
	  (0, _inherits3['default'])(Glyphicon, _React$Component);
	
	  function Glyphicon() {
	    (0, _classCallCheck3['default'])(this, Glyphicon);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Glyphicon.prototype.render = function render() {
	    var _extends2;
	
	    var _props = this.props;
	    var glyph = _props.glyph;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['glyph', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[(0, _bootstrapUtils.prefix)(bsProps, glyph)] = true, _extends2));
	
	    return _react2['default'].createElement('span', (0, _extends4['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return Glyphicon;
	}(_react2['default'].Component);
	
	Glyphicon.propTypes = propTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('glyphicon', Glyphicon);
	module.exports = exports['default'];

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  inline: _react2['default'].PropTypes.bool,
	  disabled: _react2['default'].PropTypes.bool,
	  /**
	   * Only valid if `inline` is not set.
	   */
	  validationState: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
	  /**
	   * Attaches a ref to the `<input>` element. Only functions can be used here.
	   *
	   * ```js
	   * <Checkbox inputRef={ref => { this.input = ref; }} />
	   * ```
	   */
	  inputRef: _react2['default'].PropTypes.func
	};
	
	var defaultProps = {
	  inline: false,
	  disabled: false
	};
	
	var Checkbox = function (_React$Component) {
	  (0, _inherits3['default'])(Checkbox, _React$Component);
	
	  function Checkbox() {
	    (0, _classCallCheck3['default'])(this, Checkbox);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Checkbox.prototype.render = function render() {
	    var _props = this.props;
	    var inline = _props.inline;
	    var disabled = _props.disabled;
	    var validationState = _props.validationState;
	    var inputRef = _props.inputRef;
	    var className = _props.className;
	    var style = _props.style;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['inline', 'disabled', 'validationState', 'inputRef', 'className', 'style', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var input = _react2['default'].createElement('input', (0, _extends3['default'])({}, elementProps, {
	      ref: inputRef,
	      type: 'checkbox',
	      disabled: disabled
	    }));
	
	    if (inline) {
	      var _classes2;
	
	      var _classes = (_classes2 = {}, _classes2[(0, _bootstrapUtils.prefix)(bsProps, 'inline')] = true, _classes2.disabled = disabled, _classes2);
	
	      // Use a warning here instead of in propTypes to get better-looking
	      // generated documentation.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(!validationState, '`validationState` is ignored on `<Checkbox inline>`. To display ' + 'validation state on an inline checkbox, set `validationState` on a ' + 'parent `<FormGroup>` or other element instead.') : void 0;
	
	      return _react2['default'].createElement(
	        'label',
	        { className: (0, _classnames2['default'])(className, _classes), style: style },
	        input,
	        children
	      );
	    }
	
	    var classes = (0, _extends3['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
	      disabled: disabled
	    });
	    if (validationState) {
	      classes['has-' + validationState] = true;
	    }
	
	    return _react2['default'].createElement(
	      'div',
	      { className: (0, _classnames2['default'])(className, classes), style: style },
	      _react2['default'].createElement(
	        'label',
	        null,
	        input,
	        children
	      )
	    );
	  };
	
	  return Checkbox;
	}(_react2['default'].Component);
	
	Checkbox.propTypes = propTypes;
	Checkbox.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('checkbox', Checkbox);
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _capitalize = __webpack_require__(187);
	
	var _capitalize2 = _interopRequireDefault(_capitalize);
	
	var _StyleConfig = __webpack_require__(163);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  componentClass: _elementType2['default'],
	
	  /**
	   * Apply clearfix
	   *
	   * on Extra small devices Phones
	   *
	   * adds class `visible-xs-block`
	   */
	  visibleXsBlock: _react2['default'].PropTypes.bool,
	  /**
	   * Apply clearfix
	   *
	   * on Small devices Tablets
	   *
	   * adds class `visible-sm-block`
	   */
	  visibleSmBlock: _react2['default'].PropTypes.bool,
	  /**
	   * Apply clearfix
	   *
	   * on Medium devices Desktops
	   *
	   * adds class `visible-md-block`
	   */
	  visibleMdBlock: _react2['default'].PropTypes.bool,
	  /**
	   * Apply clearfix
	   *
	   * on Large devices Desktops
	   *
	   * adds class `visible-lg-block`
	   */
	  visibleLgBlock: _react2['default'].PropTypes.bool
	};
	
	var defaultProps = {
	  componentClass: 'div'
	};
	
	var Clearfix = function (_React$Component) {
	  (0, _inherits3['default'])(Clearfix, _React$Component);
	
	  function Clearfix() {
	    (0, _classCallCheck3['default'])(this, Clearfix);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Clearfix.prototype.render = function render() {
	    var _props = this.props;
	    var Component = _props.componentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    _StyleConfig.DEVICE_SIZES.forEach(function (size) {
	      var propName = 'visible' + (0, _capitalize2['default'])(size) + 'Block';
	      if (elementProps[propName]) {
	        classes['visible-' + size + '-block'] = true;
	      }
	
	      delete elementProps[propName];
	    });
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return Clearfix;
	}(_react2['default'].Component);
	
	Clearfix.propTypes = propTypes;
	Clearfix.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('clearfix', Clearfix);
	module.exports = exports['default'];

/***/ },
/* 187 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = capitalize;
	function capitalize(string) {
	  return "" + string.charAt(0).toUpperCase() + string.slice(1);
	}
	module.exports = exports["default"];

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
	   */
	  htmlFor: _react2['default'].PropTypes.string,
	  srOnly: _react2['default'].PropTypes.bool
	};
	
	var defaultProps = {
	  srOnly: false
	};
	
	var contextTypes = {
	  $bs_formGroup: _react2['default'].PropTypes.object
	};
	
	var ControlLabel = function (_React$Component) {
	  (0, _inherits3['default'])(ControlLabel, _React$Component);
	
	  function ControlLabel() {
	    (0, _classCallCheck3['default'])(this, ControlLabel);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  ControlLabel.prototype.render = function render() {
	    var formGroup = this.context.$bs_formGroup;
	    var controlId = formGroup && formGroup.controlId;
	
	    var _props = this.props;
	    var _props$htmlFor = _props.htmlFor;
	    var htmlFor = _props$htmlFor === undefined ? controlId : _props$htmlFor;
	    var srOnly = _props.srOnly;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['htmlFor', 'srOnly', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(controlId == null || htmlFor === controlId, '`controlId` is ignored on `<ControlLabel>` when `htmlFor` is specified.') : void 0;
	
	    var classes = (0, _extends3['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
	      'sr-only': srOnly
	    });
	
	    return _react2['default'].createElement('label', (0, _extends3['default'])({}, elementProps, {
	      htmlFor: htmlFor,
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return ControlLabel;
	}(_react2['default'].Component);
	
	ControlLabel.propTypes = propTypes;
	ControlLabel.defaultProps = defaultProps;
	ControlLabel.contextTypes = contextTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('control-label', ControlLabel);
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _StyleConfig = __webpack_require__(163);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  componentClass: _elementType2['default'],
	
	  /**
	   * The number of columns you wish to span
	   *
	   * for Extra small devices Phones (<768px)
	   *
	   * class-prefix `col-xs-`
	   */
	  xs: _react2['default'].PropTypes.number,
	  /**
	   * The number of columns you wish to span
	   *
	   * for Small devices Tablets (≥768px)
	   *
	   * class-prefix `col-sm-`
	   */
	  sm: _react2['default'].PropTypes.number,
	  /**
	   * The number of columns you wish to span
	   *
	   * for Medium devices Desktops (≥992px)
	   *
	   * class-prefix `col-md-`
	   */
	  md: _react2['default'].PropTypes.number,
	  /**
	   * The number of columns you wish to span
	   *
	   * for Large devices Desktops (≥1200px)
	   *
	   * class-prefix `col-lg-`
	   */
	  lg: _react2['default'].PropTypes.number,
	  /**
	   * Hide column
	   *
	   * on Extra small devices Phones
	   *
	   * adds class `hidden-xs`
	   */
	  xsHidden: _react2['default'].PropTypes.bool,
	  /**
	   * Hide column
	   *
	   * on Small devices Tablets
	   *
	   * adds class `hidden-sm`
	   */
	  smHidden: _react2['default'].PropTypes.bool,
	  /**
	   * Hide column
	   *
	   * on Medium devices Desktops
	   *
	   * adds class `hidden-md`
	   */
	  mdHidden: _react2['default'].PropTypes.bool,
	  /**
	   * Hide column
	   *
	   * on Large devices Desktops
	   *
	   * adds class `hidden-lg`
	   */
	  lgHidden: _react2['default'].PropTypes.bool,
	  /**
	   * Move columns to the right
	   *
	   * for Extra small devices Phones
	   *
	   * class-prefix `col-xs-offset-`
	   */
	  xsOffset: _react2['default'].PropTypes.number,
	  /**
	   * Move columns to the right
	   *
	   * for Small devices Tablets
	   *
	   * class-prefix `col-sm-offset-`
	   */
	  smOffset: _react2['default'].PropTypes.number,
	  /**
	   * Move columns to the right
	   *
	   * for Medium devices Desktops
	   *
	   * class-prefix `col-md-offset-`
	   */
	  mdOffset: _react2['default'].PropTypes.number,
	  /**
	   * Move columns to the right
	   *
	   * for Large devices Desktops
	   *
	   * class-prefix `col-lg-offset-`
	   */
	  lgOffset: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the right
	   *
	   * for Extra small devices Phones
	   *
	   * class-prefix `col-xs-push-`
	   */
	  xsPush: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the right
	   *
	   * for Small devices Tablets
	   *
	   * class-prefix `col-sm-push-`
	   */
	  smPush: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the right
	   *
	   * for Medium devices Desktops
	   *
	   * class-prefix `col-md-push-`
	   */
	  mdPush: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the right
	   *
	   * for Large devices Desktops
	   *
	   * class-prefix `col-lg-push-`
	   */
	  lgPush: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the left
	   *
	   * for Extra small devices Phones
	   *
	   * class-prefix `col-xs-pull-`
	   */
	  xsPull: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the left
	   *
	   * for Small devices Tablets
	   *
	   * class-prefix `col-sm-pull-`
	   */
	  smPull: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the left
	   *
	   * for Medium devices Desktops
	   *
	   * class-prefix `col-md-pull-`
	   */
	  mdPull: _react2['default'].PropTypes.number,
	  /**
	   * Change the order of grid columns to the left
	   *
	   * for Large devices Desktops
	   *
	   * class-prefix `col-lg-pull-`
	   */
	  lgPull: _react2['default'].PropTypes.number
	};
	
	var defaultProps = {
	  componentClass: 'div'
	};
	
	var Col = function (_React$Component) {
	  (0, _inherits3['default'])(Col, _React$Component);
	
	  function Col() {
	    (0, _classCallCheck3['default'])(this, Col);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Col.prototype.render = function render() {
	    var _props = this.props;
	    var Component = _props.componentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = [];
	
	    _StyleConfig.DEVICE_SIZES.forEach(function (size) {
	      function popProp(propSuffix, modifier) {
	        var propName = '' + size + propSuffix;
	        var propValue = elementProps[propName];
	
	        if (propValue != null) {
	          classes.push((0, _bootstrapUtils.prefix)(bsProps, '' + size + modifier + '-' + propValue));
	        }
	
	        delete elementProps[propName];
	      }
	
	      popProp('', '');
	      popProp('Offset', '-offset');
	      popProp('Push', '-push');
	      popProp('Pull', '-pull');
	
	      var hiddenPropName = size + 'Hidden';
	      if (elementProps[hiddenPropName]) {
	        classes.push('hidden-' + size);
	      }
	      delete elementProps[hiddenPropName];
	    });
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return Col;
	}(_react2['default'].Component);
	
	Col.propTypes = propTypes;
	Col.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('col', Col);
	module.exports = exports['default'];

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _style = __webpack_require__(191);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Transition = __webpack_require__(199);
	
	var _Transition2 = _interopRequireDefault(_Transition);
	
	var _capitalize = __webpack_require__(187);
	
	var _capitalize2 = _interopRequireDefault(_capitalize);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var MARGINS = {
	  height: ['marginTop', 'marginBottom'],
	  width: ['marginLeft', 'marginRight']
	};
	
	// reading a dimension prop will cause the browser to recalculate,
	// which will let our animations work
	function triggerBrowserReflow(node) {
	  node.offsetHeight; // eslint-disable-line no-unused-expressions
	}
	
	function getDimensionValue(dimension, elem) {
	  var value = elem['offset' + (0, _capitalize2['default'])(dimension)];
	  var margins = MARGINS[dimension];
	
	  return value + parseInt((0, _style2['default'])(elem, margins[0]), 10) + parseInt((0, _style2['default'])(elem, margins[1]), 10);
	}
	
	var propTypes = {
	  /**
	   * Show the component; triggers the expand or collapse animation
	   */
	  'in': _react2['default'].PropTypes.bool,
	
	  /**
	   * Unmount the component (remove it from the DOM) when it is collapsed
	   */
	  unmountOnExit: _react2['default'].PropTypes.bool,
	
	  /**
	   * Run the expand animation when the component mounts, if it is initially
	   * shown
	   */
	  transitionAppear: _react2['default'].PropTypes.bool,
	
	  /**
	   * Duration of the collapse animation in milliseconds, to ensure that
	   * finishing callbacks are fired even if the original browser transition end
	   * events are canceled
	   */
	  timeout: _react2['default'].PropTypes.number,
	
	  /**
	   * Callback fired before the component expands
	   */
	  onEnter: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component starts to expand
	   */
	  onEntering: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component has expanded
	   */
	  onEntered: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired before the component collapses
	   */
	  onExit: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component starts to collapse
	   */
	  onExiting: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component has collapsed
	   */
	  onExited: _react2['default'].PropTypes.func,
	
	  /**
	   * The dimension used when collapsing, or a function that returns the
	   * dimension
	   *
	   * _Note: Bootstrap only partially supports 'width'!
	   * You will need to supply your own CSS animation for the `.width` CSS class._
	   */
	  dimension: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf(['height', 'width']), _react2['default'].PropTypes.func]),
	
	  /**
	   * Function that returns the height or width of the animating DOM node
	   *
	   * Allows for providing some custom logic for how much the Collapse component
	   * should animate in its specified dimension. Called with the current
	   * dimension prop value and the DOM node.
	   */
	  getDimensionValue: _react2['default'].PropTypes.func,
	
	  /**
	   * ARIA role of collapsible element
	   */
	  role: _react2['default'].PropTypes.string
	};
	
	var defaultProps = {
	  'in': false,
	  timeout: 300,
	  unmountOnExit: false,
	  transitionAppear: false,
	
	  dimension: 'height',
	  getDimensionValue: getDimensionValue
	};
	
	var Collapse = function (_React$Component) {
	  (0, _inherits3['default'])(Collapse, _React$Component);
	
	  function Collapse(props, context) {
	    (0, _classCallCheck3['default'])(this, Collapse);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleEnter = _this.handleEnter.bind(_this);
	    _this.handleEntering = _this.handleEntering.bind(_this);
	    _this.handleEntered = _this.handleEntered.bind(_this);
	    _this.handleExit = _this.handleExit.bind(_this);
	    _this.handleExiting = _this.handleExiting.bind(_this);
	    return _this;
	  }
	
	  /* -- Expanding -- */
	
	
	  Collapse.prototype.handleEnter = function handleEnter(elem) {
	    var dimension = this._dimension();
	    elem.style[dimension] = '0';
	  };
	
	  Collapse.prototype.handleEntering = function handleEntering(elem) {
	    var dimension = this._dimension();
	    elem.style[dimension] = this._getScrollDimensionValue(elem, dimension);
	  };
	
	  Collapse.prototype.handleEntered = function handleEntered(elem) {
	    var dimension = this._dimension();
	    elem.style[dimension] = null;
	  };
	
	  /* -- Collapsing -- */
	
	
	  Collapse.prototype.handleExit = function handleExit(elem) {
	    var dimension = this._dimension();
	    elem.style[dimension] = this.props.getDimensionValue(dimension, elem) + 'px';
	  };
	
	  Collapse.prototype.handleExiting = function handleExiting(elem) {
	    var dimension = this._dimension();
	
	    triggerBrowserReflow(elem);
	    elem.style[dimension] = '0';
	  };
	
	  Collapse.prototype._dimension = function _dimension() {
	    return typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension;
	  };
	
	  // for testing
	
	
	  Collapse.prototype._getScrollDimensionValue = function _getScrollDimensionValue(elem, dimension) {
	    return elem['scroll' + (0, _capitalize2['default'])(dimension)] + 'px';
	  };
	
	  Collapse.prototype.render = function render() {
	    var _props = this.props;
	    var onEnter = _props.onEnter;
	    var onEntering = _props.onEntering;
	    var onEntered = _props.onEntered;
	    var onExit = _props.onExit;
	    var onExiting = _props.onExiting;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'className']);
	
	
	    delete props.dimension;
	    delete props.getDimensionValue;
	
	    var handleEnter = (0, _createChainedFunction2['default'])(this.handleEnter, onEnter);
	    var handleEntering = (0, _createChainedFunction2['default'])(this.handleEntering, onEntering);
	    var handleEntered = (0, _createChainedFunction2['default'])(this.handleEntered, onEntered);
	    var handleExit = (0, _createChainedFunction2['default'])(this.handleExit, onExit);
	    var handleExiting = (0, _createChainedFunction2['default'])(this.handleExiting, onExiting);
	
	    var classes = {
	      width: this._dimension() === 'width'
	    };
	
	    return _react2['default'].createElement(_Transition2['default'], (0, _extends3['default'])({}, props, {
	      'aria-expanded': props.role ? props['in'] : null,
	      className: (0, _classnames2['default'])(className, classes),
	      exitedClassName: 'collapse',
	      exitingClassName: 'collapsing',
	      enteredClassName: 'collapse in',
	      enteringClassName: 'collapsing',
	      onEnter: handleEnter,
	      onEntering: handleEntering,
	      onEntered: handleEntered,
	      onExit: handleExit,
	      onExiting: handleExiting
	    }));
	  };
	
	  return Collapse;
	}(_react2['default'].Component);
	
	Collapse.propTypes = propTypes;
	Collapse.defaultProps = defaultProps;
	
	exports['default'] = Collapse;
	module.exports = exports['default'];

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var camelize = __webpack_require__(192),
	    hyphenate = __webpack_require__(194),
	    _getComputedStyle = __webpack_require__(196),
	    removeStyle = __webpack_require__(198);
	
	var has = Object.prototype.hasOwnProperty;
	
	module.exports = function style(node, property, value) {
	  var css = '',
	      props = property;
	
	  if (typeof property === 'string') {
	
	    if (value === undefined) return node.style[camelize(property)] || _getComputedStyle(node).getPropertyValue(hyphenate(property));else (props = {})[property] = value;
	  }
	
	  for (var key in props) if (has.call(props, key)) {
	    !props[key] && props[key] !== 0 ? removeStyle(node, hyphenate(key)) : css += hyphenate(key) + ':' + props[key] + ';';
	  }
	
	  node.style.cssText += ';' + css;
	};

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
	 */
	
	'use strict';
	var camelize = __webpack_require__(193);
	var msPattern = /^-ms-/;
	
	module.exports = function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, 'ms-'));
	};

/***/ },
/* 193 */
/***/ function(module, exports) {

	"use strict";
	
	var rHyphen = /-(.)/g;
	
	module.exports = function camelize(string) {
	  return string.replace(rHyphen, function (_, chr) {
	    return chr.toUpperCase();
	  });
	};

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014, Facebook, Inc.
	 * All rights reserved.
	 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
	 */
	
	"use strict";
	
	var hyphenate = __webpack_require__(195);
	var msPattern = /^ms-/;
	
	module.exports = function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, "-ms-");
	};

/***/ },
/* 195 */
/***/ function(module, exports) {

	'use strict';
	
	var rUpper = /([A-Z])/g;
	
	module.exports = function hyphenate(string) {
	  return string.replace(rUpper, '-$1').toLowerCase();
	};

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var babelHelpers = __webpack_require__(197);
	
	var _utilCamelizeStyle = __webpack_require__(192);
	
	var _utilCamelizeStyle2 = babelHelpers.interopRequireDefault(_utilCamelizeStyle);
	
	var rposition = /^(top|right|bottom|left)$/;
	var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;
	
	module.exports = function _getComputedStyle(node) {
	  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
	  var doc = node.ownerDocument;
	
	  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : { //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
	    getPropertyValue: function getPropertyValue(prop) {
	      var style = node.style;
	
	      prop = (0, _utilCamelizeStyle2['default'])(prop);
	
	      if (prop == 'float') prop = 'styleFloat';
	
	      var current = node.currentStyle[prop] || null;
	
	      if (current == null && style && style[prop]) current = style[prop];
	
	      if (rnumnonpx.test(current) && !rposition.test(prop)) {
	        // Remember the original values
	        var left = style.left;
	        var runStyle = node.runtimeStyle;
	        var rsLeft = runStyle && runStyle.left;
	
	        // Put in the new values to get a computed value out
	        if (rsLeft) runStyle.left = node.currentStyle.left;
	
	        style.left = prop === 'fontSize' ? '1em' : current;
	        current = style.pixelLeft + 'px';
	
	        // Revert the changed values
	        style.left = left;
	        if (rsLeft) runStyle.left = rsLeft;
	      }
	
	      return current;
	    }
	  };
	};

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === "object") {
	    factory(exports);
	  } else {
	    factory(root.babelHelpers = {});
	  }
	})(this, function (global) {
	  var babelHelpers = global;
	
	  babelHelpers.interopRequireDefault = function (obj) {
	    return obj && obj.__esModule ? obj : {
	      "default": obj
	    };
	  };
	
	  babelHelpers._extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];
	
	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }
	
	    return target;
	  };
	})

/***/ },
/* 198 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function removeStyle(node, key) {
	  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
	};

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EXITING = exports.ENTERED = exports.ENTERING = exports.EXITED = exports.UNMOUNTED = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _properties = __webpack_require__(200);
	
	var _properties2 = _interopRequireDefault(_properties);
	
	var _on = __webpack_require__(202);
	
	var _on2 = _interopRequireDefault(_on);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var transitionEndEvent = _properties2.default.end;
	
	var UNMOUNTED = exports.UNMOUNTED = 0;
	var EXITED = exports.EXITED = 1;
	var ENTERING = exports.ENTERING = 2;
	var ENTERED = exports.ENTERED = 3;
	var EXITING = exports.EXITING = 4;
	
	/**
	 * The Transition component lets you define and run css transitions with a simple declarative api.
	 * It works similar to React's own [CSSTransitionGroup](http://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup)
	 * but is specifically optimized for transitioning a single child "in" or "out".
	 *
	 * You don't even need to use class based css transitions if you don't want to (but it is easiest).
	 * The extensive set of lifecyle callbacks means you have control over
	 * the transitioning now at each step of the way.
	 */
	
	var Transition = function (_React$Component) {
	  _inherits(Transition, _React$Component);
	
	  function Transition(props, context) {
	    _classCallCheck(this, Transition);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Transition).call(this, props, context));
	
	    var initialStatus = void 0;
	    if (props.in) {
	      // Start enter transition in componentDidMount.
	      initialStatus = props.transitionAppear ? EXITED : ENTERED;
	    } else {
	      initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
	    }
	    _this.state = { status: initialStatus };
	
	    _this.nextCallback = null;
	    return _this;
	  }
	
	  _createClass(Transition, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.transitionAppear && this.props.in) {
	        this.performEnter(this.props);
	      }
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.in && this.props.unmountOnExit) {
	        if (this.state.status === UNMOUNTED) {
	          // Start enter transition in componentDidUpdate.
	          this.setState({ status: EXITED });
	        }
	      } else {
	        this._needsUpdate = true;
	      }
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      var status = this.state.status;
	
	      if (this.props.unmountOnExit && status === EXITED) {
	        // EXITED is always a transitional state to either ENTERING or UNMOUNTED
	        // when using unmountOnExit.
	        if (this.props.in) {
	          this.performEnter(this.props);
	        } else {
	          this.setState({ status: UNMOUNTED });
	        }
	
	        return;
	      }
	
	      // guard ensures we are only responding to prop changes
	      if (this._needsUpdate) {
	        this._needsUpdate = false;
	
	        if (this.props.in) {
	          if (status === EXITING) {
	            this.performEnter(this.props);
	          } else if (status === EXITED) {
	            this.performEnter(this.props);
	          }
	          // Otherwise we're already entering or entered.
	        } else {
	          if (status === ENTERING || status === ENTERED) {
	            this.performExit(this.props);
	          }
	          // Otherwise we're already exited or exiting.
	        }
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.cancelNextCallback();
	    }
	  }, {
	    key: 'performEnter',
	    value: function performEnter(props) {
	      var _this2 = this;
	
	      this.cancelNextCallback();
	      var node = _reactDom2.default.findDOMNode(this);
	
	      // Not this.props, because we might be about to receive new props.
	      props.onEnter(node);
	
	      this.safeSetState({ status: ENTERING }, function () {
	        _this2.props.onEntering(node);
	
	        _this2.onTransitionEnd(node, function () {
	          _this2.safeSetState({ status: ENTERED }, function () {
	            _this2.props.onEntered(node);
	          });
	        });
	      });
	    }
	  }, {
	    key: 'performExit',
	    value: function performExit(props) {
	      var _this3 = this;
	
	      this.cancelNextCallback();
	      var node = _reactDom2.default.findDOMNode(this);
	
	      // Not this.props, because we might be about to receive new props.
	      props.onExit(node);
	
	      this.safeSetState({ status: EXITING }, function () {
	        _this3.props.onExiting(node);
	
	        _this3.onTransitionEnd(node, function () {
	          _this3.safeSetState({ status: EXITED }, function () {
	            _this3.props.onExited(node);
	          });
	        });
	      });
	    }
	  }, {
	    key: 'cancelNextCallback',
	    value: function cancelNextCallback() {
	      if (this.nextCallback !== null) {
	        this.nextCallback.cancel();
	        this.nextCallback = null;
	      }
	    }
	  }, {
	    key: 'safeSetState',
	    value: function safeSetState(nextState, callback) {
	      // This shouldn't be necessary, but there are weird race conditions with
	      // setState callbacks and unmounting in testing, so always make sure that
	      // we can cancel any pending setState callbacks after we unmount.
	      this.setState(nextState, this.setNextCallback(callback));
	    }
	  }, {
	    key: 'setNextCallback',
	    value: function setNextCallback(callback) {
	      var _this4 = this;
	
	      var active = true;
	
	      this.nextCallback = function (event) {
	        if (active) {
	          active = false;
	          _this4.nextCallback = null;
	
	          callback(event);
	        }
	      };
	
	      this.nextCallback.cancel = function () {
	        active = false;
	      };
	
	      return this.nextCallback;
	    }
	  }, {
	    key: 'onTransitionEnd',
	    value: function onTransitionEnd(node, handler) {
	      this.setNextCallback(handler);
	
	      if (node) {
	        (0, _on2.default)(node, transitionEndEvent, this.nextCallback);
	        setTimeout(this.nextCallback, this.props.timeout);
	      } else {
	        setTimeout(this.nextCallback, 0);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var status = this.state.status;
	      if (status === UNMOUNTED) {
	        return null;
	      }
	
	      var _props = this.props;
	      var children = _props.children;
	      var className = _props.className;
	
	      var childProps = _objectWithoutProperties(_props, ['children', 'className']);
	
	      Object.keys(Transition.propTypes).forEach(function (key) {
	        return delete childProps[key];
	      });
	
	      var transitionClassName = void 0;
	      if (status === EXITED) {
	        transitionClassName = this.props.exitedClassName;
	      } else if (status === ENTERING) {
	        transitionClassName = this.props.enteringClassName;
	      } else if (status === ENTERED) {
	        transitionClassName = this.props.enteredClassName;
	      } else if (status === EXITING) {
	        transitionClassName = this.props.exitingClassName;
	      }
	
	      var child = _react2.default.Children.only(children);
	      return _react2.default.cloneElement(child, _extends({}, childProps, {
	        className: (0, _classnames2.default)(child.props.className, className, transitionClassName)
	      }));
	    }
	  }]);
	
	  return Transition;
	}(_react2.default.Component);
	
	Transition.propTypes = {
	  /**
	   * Show the component; triggers the enter or exit animation
	   */
	  in: _react2.default.PropTypes.bool,
	
	  /**
	   * Unmount the component (remove it from the DOM) when it is not shown
	   */
	  unmountOnExit: _react2.default.PropTypes.bool,
	
	  /**
	   * Run the enter animation when the component mounts, if it is initially
	   * shown
	   */
	  transitionAppear: _react2.default.PropTypes.bool,
	
	  /**
	   * A Timeout for the animation, in milliseconds, to ensure that a node doesn't
	   * transition indefinately if the browser transitionEnd events are
	   * canceled or interrupted.
	   *
	   * By default this is set to a high number (5 seconds) as a failsafe. You should consider
	   * setting this to the duration of your animation (or a bit above it).
	   */
	  timeout: _react2.default.PropTypes.number,
	
	  /**
	   * CSS class or classes applied when the component is exited
	   */
	  exitedClassName: _react2.default.PropTypes.string,
	  /**
	   * CSS class or classes applied while the component is exiting
	   */
	  exitingClassName: _react2.default.PropTypes.string,
	  /**
	   * CSS class or classes applied when the component is entered
	   */
	  enteredClassName: _react2.default.PropTypes.string,
	  /**
	   * CSS class or classes applied while the component is entering
	   */
	  enteringClassName: _react2.default.PropTypes.string,
	
	  /**
	   * Callback fired before the "entering" classes are applied
	   */
	  onEnter: _react2.default.PropTypes.func,
	  /**
	   * Callback fired after the "entering" classes are applied
	   */
	  onEntering: _react2.default.PropTypes.func,
	  /**
	   * Callback fired after the "enter" classes are applied
	   */
	  onEntered: _react2.default.PropTypes.func,
	  /**
	   * Callback fired before the "exiting" classes are applied
	   */
	  onExit: _react2.default.PropTypes.func,
	  /**
	   * Callback fired after the "exiting" classes are applied
	   */
	  onExiting: _react2.default.PropTypes.func,
	  /**
	   * Callback fired after the "exited" classes are applied
	   */
	  onExited: _react2.default.PropTypes.func
	};
	
	// Name the function so it is clearer in the documentation
	function noop() {}
	
	Transition.displayName = 'Transition';
	
	Transition.defaultProps = {
	  in: false,
	  unmountOnExit: false,
	  transitionAppear: false,
	
	  timeout: 5000,
	
	  onEnter: noop,
	  onEntering: noop,
	  onEntered: noop,
	
	  onExit: noop,
	  onExiting: noop,
	  onExited: noop
	};
	
	exports.default = Transition;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(201);
	
	var has = Object.prototype.hasOwnProperty,
	    transform = 'transform',
	    transition = {},
	    transitionTiming,
	    transitionDuration,
	    transitionProperty,
	    transitionDelay;
	
	if (canUseDOM) {
	  transition = getTransitionProperties();
	
	  transform = transition.prefix + transform;
	
	  transitionProperty = transition.prefix + 'transition-property';
	  transitionDuration = transition.prefix + 'transition-duration';
	  transitionDelay = transition.prefix + 'transition-delay';
	  transitionTiming = transition.prefix + 'transition-timing-function';
	}
	
	module.exports = {
	  transform: transform,
	  end: transition.end,
	  property: transitionProperty,
	  timing: transitionTiming,
	  delay: transitionDelay,
	  duration: transitionDuration
	};
	
	function getTransitionProperties() {
	  var endEvent,
	      prefix = '',
	      transitions = {
	    O: 'otransitionend',
	    Moz: 'transitionend',
	    Webkit: 'webkitTransitionEnd',
	    ms: 'MSTransitionEnd'
	  };
	
	  var element = document.createElement('div');
	
	  for (var vendor in transitions) if (has.call(transitions, vendor)) {
	    if (element.style[vendor + 'TransitionProperty'] !== undefined) {
	      prefix = '-' + vendor.toLowerCase() + '-';
	      endEvent = transitions[vendor];
	      break;
	    }
	  }
	
	  if (!endEvent && element.style.transitionProperty !== undefined) endEvent = 'transitionend';
	
	  return { end: endEvent, prefix: prefix };
	}

/***/ },
/* 201 */
/***/ function(module, exports) {

	'use strict';
	module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(201);
	var on = function on() {};
	
	if (canUseDOM) {
	  on = (function () {
	
	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.addEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.attachEvent('on' + eventName, handler);
	    };
	  })();
	}
	
	module.exports = on;

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _activeElement = __webpack_require__(204);
	
	var _activeElement2 = _interopRequireDefault(_activeElement);
	
	var _contains = __webpack_require__(206);
	
	var _contains2 = _interopRequireDefault(_contains);
	
	var _keycode = __webpack_require__(207);
	
	var _keycode2 = _interopRequireDefault(_keycode);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _all = __webpack_require__(178);
	
	var _all2 = _interopRequireDefault(_all);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _isRequiredForA11y = __webpack_require__(208);
	
	var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);
	
	var _uncontrollable = __webpack_require__(209);
	
	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _ButtonGroup = __webpack_require__(177);
	
	var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);
	
	var _DropdownMenu = __webpack_require__(212);
	
	var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);
	
	var _DropdownToggle = __webpack_require__(227);
	
	var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	var _PropTypes = __webpack_require__(228);
	
	var _ValidComponentChildren = __webpack_require__(165);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var TOGGLE_ROLE = _DropdownToggle2['default'].defaultProps.bsRole;
	var MENU_ROLE = _DropdownMenu2['default'].defaultProps.bsRole;
	
	var propTypes = {
	  /**
	   * The menu will open above the dropdown button, instead of below it.
	   */
	  dropup: _react2['default'].PropTypes.bool,
	
	  /**
	   * An html id attribute, necessary for assistive technologies, such as screen readers.
	   * @type {string|number}
	   * @required
	   */
	  id: (0, _isRequiredForA11y2['default'])(_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),
	
	  componentClass: _elementType2['default'],
	
	  /**
	   * The children of a Dropdown may be a `<Dropdown.Toggle>` or a `<Dropdown.Menu>`.
	   * @type {node}
	   */
	  children: (0, _all2['default'])((0, _PropTypes.requiredRoles)(TOGGLE_ROLE, MENU_ROLE), (0, _PropTypes.exclusiveRoles)(MENU_ROLE)),
	
	  /**
	   * Whether or not component is disabled.
	   */
	  disabled: _react2['default'].PropTypes.bool,
	
	  /**
	   * Align the menu to the right side of the Dropdown toggle
	   */
	  pullRight: _react2['default'].PropTypes.bool,
	
	  /**
	   * Whether or not the Dropdown is visible.
	   *
	   * @controllable onToggle
	   */
	  open: _react2['default'].PropTypes.bool,
	
	  /**
	   * A callback fired when the Dropdown closes.
	   */
	  onClose: _react2['default'].PropTypes.func,
	
	  /**
	   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
	   * `open` value.
	   *
	   * ```js
	   * function(Boolean isOpen) {}
	   * ```
	   * @controllable open
	   */
	  onToggle: _react2['default'].PropTypes.func,
	
	  /**
	   * A callback fired when a menu item is selected.
	   *
	   * ```js
	   * (eventKey: any, event: Object) => any
	   * ```
	   */
	  onSelect: _react2['default'].PropTypes.func,
	
	  /**
	   * If `'menuitem'`, causes the dropdown to behave like a menu item rather than
	   * a menu button.
	   */
	  role: _react2['default'].PropTypes.string
	};
	
	var defaultProps = {
	  componentClass: _ButtonGroup2['default']
	};
	
	var Dropdown = function (_React$Component) {
	  (0, _inherits3['default'])(Dropdown, _React$Component);
	
	  function Dropdown(props, context) {
	    (0, _classCallCheck3['default'])(this, Dropdown);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleClick = _this.handleClick.bind(_this);
	    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
	    _this.handleClose = _this.handleClose.bind(_this);
	
	    _this._focusInDropdown = false;
	    _this.lastOpenEventType = null;
	    return _this;
	  }
	
	  Dropdown.prototype.componentDidMount = function componentDidMount() {
	    this.focusNextOnOpen();
	  };
	
	  Dropdown.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
	    if (!nextProps.open && this.props.open) {
	      this._focusInDropdown = (0, _contains2['default'])(_reactDom2['default'].findDOMNode(this.menu), (0, _activeElement2['default'])(document));
	    }
	  };
	
	  Dropdown.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
	    var open = this.props.open;
	
	    var prevOpen = prevProps.open;
	
	    if (open && !prevOpen) {
	      this.focusNextOnOpen();
	    }
	
	    if (!open && prevOpen) {
	      // if focus hasn't already moved from the menu lets return it
	      // to the toggle
	      if (this._focusInDropdown) {
	        this._focusInDropdown = false;
	        this.focus();
	      }
	    }
	  };
	
	  Dropdown.prototype.handleClick = function handleClick() {
	    if (this.props.disabled) {
	      return;
	    }
	
	    this.toggleOpen('click');
	  };
	
	  Dropdown.prototype.handleKeyDown = function handleKeyDown(event) {
	    if (this.props.disabled) {
	      return;
	    }
	
	    switch (event.keyCode) {
	      case _keycode2['default'].codes.down:
	        if (!this.props.open) {
	          this.toggleOpen('keydown');
	        } else if (this.menu.focusNext) {
	          this.menu.focusNext();
	        }
	        event.preventDefault();
	        break;
	      case _keycode2['default'].codes.esc:
	      case _keycode2['default'].codes.tab:
	        this.handleClose(event);
	        break;
	      default:
	    }
	  };
	
	  Dropdown.prototype.toggleOpen = function toggleOpen(eventType) {
	    var open = !this.props.open;
	
	    if (open) {
	      this.lastOpenEventType = eventType;
	    }
	
	    if (this.props.onToggle) {
	      this.props.onToggle(open);
	    }
	  };
	
	  Dropdown.prototype.handleClose = function handleClose() {
	    if (!this.props.open) {
	      return;
	    }
	
	    this.toggleOpen(null);
	  };
	
	  Dropdown.prototype.focusNextOnOpen = function focusNextOnOpen() {
	    var menu = this.menu;
	
	    if (!menu.focusNext) {
	      return;
	    }
	
	    if (this.lastOpenEventType === 'keydown' || this.props.role === 'menuitem') {
	      menu.focusNext();
	    }
	  };
	
	  Dropdown.prototype.focus = function focus() {
	    var toggle = _reactDom2['default'].findDOMNode(this.toggle);
	
	    if (toggle && toggle.focus) {
	      toggle.focus();
	    }
	  };
	
	  Dropdown.prototype.renderToggle = function renderToggle(child, props) {
	    var _this2 = this;
	
	    var ref = function ref(c) {
	      _this2.toggle = c;
	    };
	
	    if (typeof child.ref === 'string') {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(false, 'String refs are not supported on `<Dropdown.Toggle>` components. ' + 'To apply a ref to the component use the callback signature:\n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute') : void 0;
	    } else {
	      ref = (0, _createChainedFunction2['default'])(child.ref, ref);
	    }
	
	    return (0, _react.cloneElement)(child, (0, _extends3['default'])({}, props, {
	      ref: ref,
	      bsClass: (0, _bootstrapUtils.prefix)(props, 'toggle'),
	      onClick: (0, _createChainedFunction2['default'])(child.props.onClick, this.handleClick),
	      onKeyDown: (0, _createChainedFunction2['default'])(child.props.onKeyDown, this.handleKeyDown)
	    }));
	  };
	
	  Dropdown.prototype.renderMenu = function renderMenu(child, _ref) {
	    var _this3 = this;
	
	    var id = _ref.id;
	    var onClose = _ref.onClose;
	    var onSelect = _ref.onSelect;
	    var props = (0, _objectWithoutProperties3['default'])(_ref, ['id', 'onClose', 'onSelect']);
	
	    var ref = function ref(c) {
	      _this3.menu = c;
	    };
	
	    if (typeof child.ref === 'string') {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(false, 'String refs are not supported on `<Dropdown.Menu>` components. ' + 'To apply a ref to the component use the callback signature:\n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute') : void 0;
	    } else {
	      ref = (0, _createChainedFunction2['default'])(child.ref, ref);
	    }
	
	    return (0, _react.cloneElement)(child, (0, _extends3['default'])({}, props, {
	      ref: ref,
	      labelledBy: id,
	      bsClass: (0, _bootstrapUtils.prefix)(props, 'menu'),
	      onClose: (0, _createChainedFunction2['default'])(child.props.onClose, onClose, this.handleClose),
	      onSelect: (0, _createChainedFunction2['default'])(child.props.onSelect, onSelect, this.handleClose)
	    }));
	  };
	
	  Dropdown.prototype.render = function render() {
	    var _classes,
	        _this4 = this;
	
	    var _props = this.props;
	    var Component = _props.componentClass;
	    var id = _props.id;
	    var dropup = _props.dropup;
	    var disabled = _props.disabled;
	    var pullRight = _props.pullRight;
	    var open = _props.open;
	    var onClose = _props.onClose;
	    var onSelect = _props.onSelect;
	    var role = _props.role;
	    var bsClass = _props.bsClass;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'id', 'dropup', 'disabled', 'pullRight', 'open', 'onClose', 'onSelect', 'role', 'bsClass', 'className', 'children']);
	
	
	    delete props.onToggle;
	
	    var classes = (_classes = {}, _classes[bsClass] = true, _classes.open = open, _classes.disabled = disabled, _classes);
	
	    if (dropup) {
	      classes[bsClass] = false;
	      classes.dropup = true;
	    }
	
	    // This intentionally forwards bsSize and bsStyle (if set) to the
	    // underlying component, to allow it to render size and style variants.
	
	    return _react2['default'].createElement(
	      Component,
	      (0, _extends3['default'])({}, props, {
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      _ValidComponentChildren2['default'].map(children, function (child) {
	        switch (child.props.bsRole) {
	          case TOGGLE_ROLE:
	            return _this4.renderToggle(child, {
	              id: id, disabled: disabled, open: open, role: role, bsClass: bsClass
	            });
	          case MENU_ROLE:
	            return _this4.renderMenu(child, {
	              id: id, open: open, pullRight: pullRight, bsClass: bsClass, onClose: onClose, onSelect: onSelect
	            });
	          default:
	            return child;
	        }
	      })
	    );
	  };
	
	  return Dropdown;
	}(_react2['default'].Component);
	
	Dropdown.propTypes = propTypes;
	Dropdown.defaultProps = defaultProps;
	
	(0, _bootstrapUtils.bsClass)('dropdown', Dropdown);
	
	var UncontrolledDropdown = (0, _uncontrollable2['default'])(Dropdown, { open: 'onToggle' });
	
	UncontrolledDropdown.Toggle = _DropdownToggle2['default'];
	UncontrolledDropdown.Menu = _DropdownMenu2['default'];
	
	exports['default'] = UncontrolledDropdown;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var babelHelpers = __webpack_require__(197);
	
	exports.__esModule = true;
	
	/**
	 * document.activeElement
	 */
	exports['default'] = activeElement;
	
	var _ownerDocument = __webpack_require__(205);
	
	var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);
	
	function activeElement() {
	  var doc = arguments[0] === undefined ? document : arguments[0];
	
	  try {
	    return doc.activeElement;
	  } catch (e) {}
	}
	
	module.exports = exports['default'];

/***/ },
/* 205 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = ownerDocument;
	
	function ownerDocument(node) {
	  return node && node.ownerDocument || document;
	}
	
	module.exports = exports["default"];

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(201);
	
	var contains = (function () {
	  var root = canUseDOM && document.documentElement;
	
	  return root && root.contains ? function (context, node) {
	    return context.contains(node);
	  } : root && root.compareDocumentPosition ? function (context, node) {
	    return context === node || !!(context.compareDocumentPosition(node) & 16);
	  } : function (context, node) {
	    if (node) do {
	      if (node === context) return true;
	    } while (node = node.parentNode);
	
	    return false;
	  };
	})();
	
	module.exports = contains;

/***/ },
/* 207 */
/***/ function(module, exports) {

	// Source: http://jsfiddle.net/vWx8V/
	// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes
	
	/**
	 * Conenience method returns corresponding value for given keyName or keyCode.
	 *
	 * @param {Mixed} keyCode {Number} or keyName {String}
	 * @return {Mixed}
	 * @api public
	 */
	
	exports = module.exports = function(searchInput) {
	  // Keyboard Events
	  if (searchInput && 'object' === typeof searchInput) {
	    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
	    if (hasKeyCode) searchInput = hasKeyCode
	  }
	
	  // Numbers
	  if ('number' === typeof searchInput) return names[searchInput]
	
	  // Everything else (cast to string)
	  var search = String(searchInput)
	
	  // check codes
	  var foundNamedKey = codes[search.toLowerCase()]
	  if (foundNamedKey) return foundNamedKey
	
	  // check aliases
	  var foundNamedKey = aliases[search.toLowerCase()]
	  if (foundNamedKey) return foundNamedKey
	
	  // weird character?
	  if (search.length === 1) return search.charCodeAt(0)
	
	  return undefined
	}
	
	/**
	 * Get by name
	 *
	 *   exports.code['enter'] // => 13
	 */
	
	var codes = exports.code = exports.codes = {
	  'backspace': 8,
	  'tab': 9,
	  'enter': 13,
	  'shift': 16,
	  'ctrl': 17,
	  'alt': 18,
	  'pause/break': 19,
	  'caps lock': 20,
	  'esc': 27,
	  'space': 32,
	  'page up': 33,
	  'page down': 34,
	  'end': 35,
	  'home': 36,
	  'left': 37,
	  'up': 38,
	  'right': 39,
	  'down': 40,
	  'insert': 45,
	  'delete': 46,
	  'command': 91,
	  'left command': 91,
	  'right command': 93,
	  'numpad *': 106,
	  'numpad +': 107,
	  'numpad -': 109,
	  'numpad .': 110,
	  'numpad /': 111,
	  'num lock': 144,
	  'scroll lock': 145,
	  'my computer': 182,
	  'my calculator': 183,
	  ';': 186,
	  '=': 187,
	  ',': 188,
	  '-': 189,
	  '.': 190,
	  '/': 191,
	  '`': 192,
	  '[': 219,
	  '\\': 220,
	  ']': 221,
	  "'": 222
	}
	
	// Helper aliases
	
	var aliases = exports.aliases = {
	  'windows': 91,
	  '⇧': 16,
	  '⌥': 18,
	  '⌃': 17,
	  '⌘': 91,
	  'ctl': 17,
	  'control': 17,
	  'option': 18,
	  'pause': 19,
	  'break': 19,
	  'caps': 20,
	  'return': 13,
	  'escape': 27,
	  'spc': 32,
	  'pgup': 33,
	  'pgdn': 34,
	  'ins': 45,
	  'del': 46,
	  'cmd': 91
	}
	
	
	/*!
	 * Programatically add the following
	 */
	
	// lower case chars
	for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32
	
	// numbers
	for (var i = 48; i < 58; i++) codes[i - 48] = i
	
	// function keys
	for (i = 1; i < 13; i++) codes['f'+i] = i + 111
	
	// numpad keys
	for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96
	
	/**
	 * Get by code
	 *
	 *   exports.name[13] // => 'Enter'
	 */
	
	var names = exports.names = exports.title = {} // title for backward compat
	
	// Create reverse mapping
	for (i in codes) names[codes[i]] = i
	
	// Add aliases
	for (var alias in aliases) {
	  codes[alias] = aliases[alias]
	}


/***/ },
/* 208 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports.default = isRequiredForA11y;
	function isRequiredForA11y(validator) {
	  return function validate(props, propName, componentName, location, propFullName) {
	    var componentNameSafe = componentName || '<<anonymous>>';
	    var propFullNameSafe = propFullName || propName;
	
	    if (props[propName] == null) {
	      return new Error('The ' + location + ' `' + propFullNameSafe + '` is required to make ' + ('`' + componentNameSafe + '` accessible for users of assistive ') + 'technologies such as screen readers.');
	    }
	
	    for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
	      args[_key - 5] = arguments[_key];
	    }
	
	    return validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
	  };
	}

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _createUncontrollable = __webpack_require__(210);
	
	var _createUncontrollable2 = _interopRequireDefault(_createUncontrollable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mixin = {
	  shouldComponentUpdate: function shouldComponentUpdate() {
	    //let the forceUpdate trigger the update
	    return !this._notifying;
	  }
	};
	
	function set(component, propName, handler, value, args) {
	  if (handler) {
	    component._notifying = true;
	    handler.call.apply(handler, [component, value].concat(args));
	    component._notifying = false;
	  }
	
	  component._values[propName] = value;
	
	  if (component.isMounted()) component.forceUpdate();
	}
	
	exports.default = (0, _createUncontrollable2.default)([mixin], set);
	module.exports = exports['default'];

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.default = createUncontrollable;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	var _utils = __webpack_require__(211);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createUncontrollable(mixins, set) {
	
	  return uncontrollable;
	
	  function uncontrollable(Component, controlledValues) {
	    var methods = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	
	    var displayName = Component.displayName || Component.name || 'Component',
	        basePropTypes = utils.getType(Component).propTypes,
	        isCompositeComponent = utils.isReactComponent(Component),
	        controlledProps = Object.keys(controlledValues),
	        propTypes;
	
	    var OMIT_PROPS = ['valueLink', 'checkedLink'].concat(controlledProps.map(utils.defaultKey));
	
	    propTypes = utils.uncontrolledPropTypes(controlledValues, basePropTypes, displayName);
	
	    (0, _invariant2.default)(isCompositeComponent || !methods.length, '[uncontrollable] stateless function components cannot pass through methods ' + 'because they have no associated instances. Check component: ' + displayName + ', ' + 'attempting to pass through methods: ' + methods.join(', '));
	
	    methods = utils.transform(methods, function (obj, method) {
	      obj[method] = function () {
	        var _refs$inner;
	
	        return (_refs$inner = this.refs.inner)[method].apply(_refs$inner, arguments);
	      };
	    }, {});
	
	    var component = _react2.default.createClass(_extends({
	
	      displayName: 'Uncontrolled(' + displayName + ')',
	
	      mixins: mixins,
	
	      propTypes: propTypes
	
	    }, methods, {
	      componentWillMount: function componentWillMount() {
	        var _this = this;
	
	        var props = this.props;
	
	        this._values = {};
	
	        controlledProps.forEach(function (key) {
	          _this._values[key] = props[utils.defaultKey(key)];
	        });
	      },
	
	
	      /**
	       * If a prop switches from controlled to Uncontrolled
	       * reset its value to the defaultValue
	       */
	      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        var _this2 = this;
	
	        var props = this.props;
	
	        controlledProps.forEach(function (key) {
	          if (utils.getValue(nextProps, key) === undefined && utils.getValue(props, key) !== undefined) {
	            _this2._values[key] = nextProps[utils.defaultKey(key)];
	          }
	        });
	      },
	      getControlledInstance: function getControlledInstance() {
	        return this.refs.inner;
	      },
	      render: function render() {
	        var _this3 = this;
	
	        var newProps = {},
	            props = omitProps(this.props);
	
	        utils.each(controlledValues, function (handle, propName) {
	          var linkPropName = utils.getLinkName(propName),
	              prop = _this3.props[propName];
	
	          if (linkPropName && !isProp(_this3.props, propName) && isProp(_this3.props, linkPropName)) {
	            prop = _this3.props[linkPropName].value;
	          }
	
	          newProps[propName] = prop !== undefined ? prop : _this3._values[propName];
	
	          newProps[handle] = setAndNotify.bind(_this3, propName);
	        });
	
	        newProps = _extends({}, props, newProps, {
	          ref: isCompositeComponent ? 'inner' : null
	        });
	
	        return _react2.default.createElement(Component, newProps);
	      }
	    }));
	
	    component.ControlledComponent = Component;
	
	    /**
	     * useful when wrapping a Component and you want to control
	     * everything
	     */
	    component.deferControlTo = function (newComponent) {
	      var additions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var nextMethods = arguments[2];
	
	      return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
	    };
	
	    return component;
	
	    function setAndNotify(propName, value) {
	      var linkName = utils.getLinkName(propName),
	          handler = this.props[controlledValues[propName]];
	
	      if (linkName && isProp(this.props, linkName) && !handler) {
	        handler = this.props[linkName].requestChange;
	      }
	
	      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	        args[_key - 2] = arguments[_key];
	      }
	
	      set(this, propName, handler, value, args);
	    }
	
	    function isProp(props, prop) {
	      return props[prop] !== undefined;
	    }
	
	    function omitProps(props) {
	      var result = {};
	
	      utils.each(props, function (value, key) {
	        if (OMIT_PROPS.indexOf(key) === -1) result[key] = value;
	      });
	
	      return result;
	    }
	  }
	}
	module.exports = exports['default'];

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.version = undefined;
	exports.uncontrolledPropTypes = uncontrolledPropTypes;
	exports.getType = getType;
	exports.getValue = getValue;
	exports.getLinkName = getLinkName;
	exports.defaultKey = defaultKey;
	exports.chain = chain;
	exports.transform = transform;
	exports.each = each;
	exports.has = has;
	exports.isReactComponent = isReactComponent;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _invariant = __webpack_require__(12);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function readOnlyPropType(handler, name) {
	  return function (props, propName) {
	    if (props[propName] !== undefined) {
	      if (!props[handler]) {
	        return new Error('You have provided a `' + propName + '` prop to ' + '`' + name + '` without an `' + handler + '` handler. This will render a read-only field. ' + 'If the field should be mutable use `' + defaultKey(propName) + '`. Otherwise, set `' + handler + '`');
	      }
	    }
	  };
	}
	
	function uncontrolledPropTypes(controlledValues, basePropTypes, displayName) {
	  var propTypes = {};
	
	  if (process.env.NODE_ENV !== 'production' && basePropTypes) {
	    transform(controlledValues, function (obj, handler, prop) {
	      (0, _invariant2.default)(typeof handler === 'string' && handler.trim().length, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop);
	
	      obj[prop] = readOnlyPropType(handler, displayName);
	    }, propTypes);
	  }
	
	  return propTypes;
	}
	
	var version = exports.version = _react2.default.version.split('.').map(parseFloat);
	
	function getType(component) {
	  if (version[0] >= 15 || version[0] === 0 && version[1] >= 13) return component;
	
	  return component.type;
	}
	
	function getValue(props, name) {
	  var linkPropName = getLinkName(name);
	
	  if (linkPropName && !isProp(props, name) && isProp(props, linkPropName)) return props[linkPropName].value;
	
	  return props[name];
	}
	
	function isProp(props, prop) {
	  return props[prop] !== undefined;
	}
	
	function getLinkName(name) {
	  return name === 'value' ? 'valueLink' : name === 'checked' ? 'checkedLink' : null;
	}
	
	function defaultKey(key) {
	  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
	}
	
	function chain(thisArg, a, b) {
	  return function chainedFunction() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    a && a.call.apply(a, [thisArg].concat(args));
	    b && b.call.apply(b, [thisArg].concat(args));
	  };
	}
	
	function transform(obj, cb, seed) {
	  each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
	  return seed;
	}
	
	function each(obj, cb, thisArg) {
	  if (Array.isArray(obj)) return obj.forEach(cb, thisArg);
	
	  for (var key in obj) {
	    if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
	  }
	}
	
	function has(o, k) {
	  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
	}
	
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	function isReactComponent(component) {
	  return !!(component && component.prototype && component.prototype.isReactComponent);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _from = __webpack_require__(213);
	
	var _from2 = _interopRequireDefault(_from);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _keycode = __webpack_require__(207);
	
	var _keycode2 = _interopRequireDefault(_keycode);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _RootCloseWrapper = __webpack_require__(222);
	
	var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	var _ValidComponentChildren = __webpack_require__(165);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  open: _react2['default'].PropTypes.bool,
	  pullRight: _react2['default'].PropTypes.bool,
	  onClose: _react2['default'].PropTypes.func,
	  labelledBy: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
	  onSelect: _react2['default'].PropTypes.func
	};
	
	var defaultProps = {
	  bsRole: 'menu',
	  pullRight: false
	};
	
	var DropdownMenu = function (_React$Component) {
	  (0, _inherits3['default'])(DropdownMenu, _React$Component);
	
	  function DropdownMenu(props) {
	    (0, _classCallCheck3['default'])(this, DropdownMenu);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props));
	
	    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
	    return _this;
	  }
	
	  DropdownMenu.prototype.handleKeyDown = function handleKeyDown(event) {
	    switch (event.keyCode) {
	      case _keycode2['default'].codes.down:
	        this.focusNext();
	        event.preventDefault();
	        break;
	      case _keycode2['default'].codes.up:
	        this.focusPrevious();
	        event.preventDefault();
	        break;
	      case _keycode2['default'].codes.esc:
	      case _keycode2['default'].codes.tab:
	        this.props.onClose(event);
	        break;
	      default:
	    }
	  };
	
	  DropdownMenu.prototype.getItemsAndActiveIndex = function getItemsAndActiveIndex() {
	    var items = this.getFocusableMenuItems();
	    var activeIndex = items.indexOf(document.activeElement);
	
	    return { items: items, activeIndex: activeIndex };
	  };
	
	  DropdownMenu.prototype.getFocusableMenuItems = function getFocusableMenuItems() {
	    var node = _reactDom2['default'].findDOMNode(this);
	    if (!node) {
	      return [];
	    }
	
	    return (0, _from2['default'])(node.querySelectorAll('[tabIndex="-1"]'));
	  };
	
	  DropdownMenu.prototype.focusNext = function focusNext() {
	    var _getItemsAndActiveInd = this.getItemsAndActiveIndex();
	
	    var items = _getItemsAndActiveInd.items;
	    var activeIndex = _getItemsAndActiveInd.activeIndex;
	
	    if (items.length === 0) {
	      return;
	    }
	
	    var nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
	    items[nextIndex].focus();
	  };
	
	  DropdownMenu.prototype.focusPrevious = function focusPrevious() {
	    var _getItemsAndActiveInd2 = this.getItemsAndActiveIndex();
	
	    var items = _getItemsAndActiveInd2.items;
	    var activeIndex = _getItemsAndActiveInd2.activeIndex;
	
	    if (items.length === 0) {
	      return;
	    }
	
	    var prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
	    items[prevIndex].focus();
	  };
	
	  DropdownMenu.prototype.render = function render() {
	    var _extends2,
	        _this2 = this;
	
	    var _props = this.props;
	    var open = _props.open;
	    var pullRight = _props.pullRight;
	    var onClose = _props.onClose;
	    var labelledBy = _props.labelledBy;
	    var onSelect = _props.onSelect;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['open', 'pullRight', 'onClose', 'labelledBy', 'onSelect', 'className', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'right')] = pullRight, _extends2));
	
	    var list = _react2['default'].createElement(
	      'ul',
	      (0, _extends4['default'])({}, elementProps, {
	        role: 'menu',
	        className: (0, _classnames2['default'])(className, classes),
	        'aria-labelledby': labelledBy
	      }),
	      _ValidComponentChildren2['default'].map(children, function (child) {
	        return _react2['default'].cloneElement(child, {
	          onKeyDown: (0, _createChainedFunction2['default'])(child.props.onKeyDown, _this2.handleKeyDown),
	          onSelect: (0, _createChainedFunction2['default'])(child.props.onSelect, onSelect)
	        });
	      })
	    );
	
	    if (open) {
	      return _react2['default'].createElement(
	        _RootCloseWrapper2['default'],
	        { noWrap: true, onRootClose: onClose },
	        list
	      );
	    }
	
	    return list;
	  };
	
	  return DropdownMenu;
	}(_react2['default'].Component);
	
	DropdownMenu.propTypes = propTypes;
	DropdownMenu.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('dropdown-menu', DropdownMenu);
	module.exports = exports['default'];

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(214), __esModule: true };

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(115);
	__webpack_require__(215);
	module.exports = __webpack_require__(78).Array.from;

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(79)
	  , $export        = __webpack_require__(76)
	  , toObject       = __webpack_require__(109)
	  , call           = __webpack_require__(216)
	  , isArrayIter    = __webpack_require__(217)
	  , toLength       = __webpack_require__(100)
	  , createProperty = __webpack_require__(218)
	  , getIterFn      = __webpack_require__(219);
	
	$export($export.S + $export.F * !__webpack_require__(221)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(83);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(120)
	  , ITERATOR   = __webpack_require__(126)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(82)
	  , createDesc      = __webpack_require__(90);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(220)
	  , ITERATOR  = __webpack_require__(126)('iterator')
	  , Iterators = __webpack_require__(120);
	module.exports = __webpack_require__(78).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(97)
	  , TAG = __webpack_require__(126)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(126)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _addEventListener = __webpack_require__(223);
	
	var _addEventListener2 = _interopRequireDefault(_addEventListener);
	
	var _createChainedFunction = __webpack_require__(225);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	var _ownerDocument = __webpack_require__(226);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	// TODO: Consider using an ES6 symbol here, once we use babel-runtime.
	var CLICK_WAS_INSIDE = '__click_was_inside';
	
	var counter = 0;
	
	function isLeftClickEvent(event) {
	  return event.button === 0;
	}
	
	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}
	
	function getSuppressRootClose() {
	  var id = CLICK_WAS_INSIDE + '_' + counter++;
	  return {
	    id: id,
	    suppressRootClose: function suppressRootClose(event) {
	      // Tag the native event to prevent the root close logic on document click.
	      // This seems safer than using event.nativeEvent.stopImmediatePropagation(),
	      // which is only supported in IE >= 9.
	      event.nativeEvent[id] = true;
	    }
	  };
	}
	
	var RootCloseWrapper = function (_React$Component) {
	  _inherits(RootCloseWrapper, _React$Component);
	
	  function RootCloseWrapper(props) {
	    _classCallCheck(this, RootCloseWrapper);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RootCloseWrapper).call(this, props));
	
	    _this.handleDocumentMouse = _this.handleDocumentMouse.bind(_this);
	    _this.handleDocumentKeyUp = _this.handleDocumentKeyUp.bind(_this);
	
	    var _getSuppressRootClose = getSuppressRootClose();
	
	    var id = _getSuppressRootClose.id;
	    var suppressRootClose = _getSuppressRootClose.suppressRootClose;
	
	
	    _this._suppressRootId = id;
	
	    _this._suppressRootCloseHandler = suppressRootClose;
	    return _this;
	  }
	
	  _createClass(RootCloseWrapper, [{
	    key: 'bindRootCloseHandlers',
	    value: function bindRootCloseHandlers() {
	      var doc = (0, _ownerDocument2.default)(this);
	
	      this._onDocumentMouseListener = (0, _addEventListener2.default)(doc, this.props.event, this.handleDocumentMouse);
	
	      this._onDocumentKeyupListener = (0, _addEventListener2.default)(doc, 'keyup', this.handleDocumentKeyUp);
	    }
	  }, {
	    key: 'handleDocumentMouse',
	    value: function handleDocumentMouse(e) {
	      // This is now the native event.
	      if (e[this._suppressRootId]) {
	        return;
	      }
	
	      if (this.props.disabled || isModifiedEvent(e) || !isLeftClickEvent(e)) {
	        return;
	      }
	
	      this.props.onRootClose && this.props.onRootClose();
	    }
	  }, {
	    key: 'handleDocumentKeyUp',
	    value: function handleDocumentKeyUp(e) {
	      if (e.keyCode === 27 && this.props.onRootClose) {
	        this.props.onRootClose();
	      }
	    }
	  }, {
	    key: 'unbindRootCloseHandlers',
	    value: function unbindRootCloseHandlers() {
	      if (this._onDocumentMouseListener) {
	        this._onDocumentMouseListener.remove();
	      }
	
	      if (this._onDocumentKeyupListener) {
	        this._onDocumentKeyupListener.remove();
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.bindRootCloseHandlers();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var event = _props.event;
	      var noWrap = _props.noWrap;
	      var children = _props.children;
	
	      var child = _react2.default.Children.only(children);
	
	      var handlerName = event == 'click' ? 'onClick' : 'onMouseDown';
	
	      if (noWrap) {
	        return _react2.default.cloneElement(child, _defineProperty({}, handlerName, (0, _createChainedFunction2.default)(this._suppressRootCloseHandler, child.props[handlerName])));
	      }
	
	      // Wrap the child in a new element, so the child won't have to handle
	      // potentially combining multiple onClick listeners.
	      return _react2.default.createElement(
	        'div',
	        _defineProperty({}, handlerName, this._suppressRootCloseHandler),
	        child
	      );
	    }
	  }, {
	    key: 'getWrappedDOMNode',
	    value: function getWrappedDOMNode() {
	      // We can't use a ref to identify the wrapped child, since we might be
	      // stealing the ref from the owner, but we know exactly the DOM structure
	      // that will be rendered, so we can just do this to get the child's DOM
	      // node for doing size calculations in OverlayMixin.
	      var node = _reactDom2.default.findDOMNode(this);
	      return this.props.noWrap ? node : node.firstChild;
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.unbindRootCloseHandlers();
	    }
	  }]);
	
	  return RootCloseWrapper;
	}(_react2.default.Component);
	
	exports.default = RootCloseWrapper;
	
	
	RootCloseWrapper.displayName = 'RootCloseWrapper';
	
	RootCloseWrapper.propTypes = {
	  onRootClose: _react2.default.PropTypes.func,
	
	  /**
	   * Disable the the RootCloseWrapper, preventing it from triggering
	   * `onRootClose`.
	   */
	  disabled: _react2.default.PropTypes.bool,
	  /**
	   * Passes the suppress click handler directly to the child component instead
	   * of placing it on a wrapping div. Only use when you can be sure the child
	   * properly handle the click event.
	   */
	  noWrap: _react2.default.PropTypes.bool,
	  /**
	   * Choose which document mouse event to bind to
	   */
	  event: _react2.default.PropTypes.oneOf(['click', 'mousedown'])
	};
	
	RootCloseWrapper.defaultProps = {
	  event: 'click'
	};
	module.exports = exports['default'];

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (node, event, handler) {
	  (0, _on2.default)(node, event, handler);
	  return {
	    remove: function remove() {
	      (0, _off2.default)(node, event, handler);
	    }
	  };
	};
	
	var _on = __webpack_require__(202);
	
	var _on2 = _interopRequireDefault(_on);
	
	var _off = __webpack_require__(224);
	
	var _off2 = _interopRequireDefault(_off);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = exports['default'];

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var canUseDOM = __webpack_require__(201);
	var off = function off() {};
	
	if (canUseDOM) {
	
	  off = (function () {
	
	    if (document.addEventListener) return function (node, eventName, handler, capture) {
	      return node.removeEventListener(eventName, handler, capture || false);
	    };else if (document.attachEvent) return function (node, eventName, handler) {
	      return node.detachEvent('on' + eventName, handler);
	    };
	  })();
	}
	
	module.exports = off;

/***/ },
/* 225 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Safe chained function
	 *
	 * Will only create a new function if needed,
	 * otherwise will pass back existing functions or null.
	 *
	 * @param {function} functions to chain
	 * @returns {function|null}
	 */
	function createChainedFunction() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  return funcs.filter(function (f) {
	    return f != null;
	  }).reduce(function (acc, f) {
	    if (typeof f !== 'function') {
	      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
	    }
	
	    if (acc === null) {
	      return f;
	    }
	
	    return function chainedFunction() {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }
	
	      acc.apply(this, args);
	      f.apply(this, args);
	    };
	  }, null);
	}
	
	exports.default = createChainedFunction;
	module.exports = exports['default'];

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (componentOrElement) {
	  return (0, _ownerDocument2.default)(_reactDom2.default.findDOMNode(componentOrElement));
	};
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _ownerDocument = __webpack_require__(205);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = exports['default'];

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _Button = __webpack_require__(176);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _SafeAnchor = __webpack_require__(173);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  noCaret: _react2['default'].PropTypes.bool,
	  open: _react2['default'].PropTypes.bool,
	  title: _react2['default'].PropTypes.string,
	  useAnchor: _react2['default'].PropTypes.bool
	};
	
	var defaultProps = {
	  open: false,
	  useAnchor: false,
	  bsRole: 'toggle'
	};
	
	var DropdownToggle = function (_React$Component) {
	  (0, _inherits3['default'])(DropdownToggle, _React$Component);
	
	  function DropdownToggle() {
	    (0, _classCallCheck3['default'])(this, DropdownToggle);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  DropdownToggle.prototype.render = function render() {
	    var _props = this.props;
	    var noCaret = _props.noCaret;
	    var open = _props.open;
	    var useAnchor = _props.useAnchor;
	    var bsClass = _props.bsClass;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['noCaret', 'open', 'useAnchor', 'bsClass', 'className', 'children']);
	
	
	    delete props.bsRole;
	
	    var Component = useAnchor ? _SafeAnchor2['default'] : _Button2['default'];
	    var useCaret = !noCaret;
	
	    // This intentionally forwards bsSize and bsStyle (if set) to the
	    // underlying component, to allow it to render size and style variants.
	
	    // FIXME: Should this really fall back to `title` as children?
	
	    return _react2['default'].createElement(
	      Component,
	      (0, _extends3['default'])({}, props, {
	        role: 'button',
	        className: (0, _classnames2['default'])(className, bsClass),
	        'aria-haspopup': true,
	        'aria-expanded': open
	      }),
	      children || props.title,
	      useCaret && ' ',
	      useCaret && _react2['default'].createElement('span', { className: 'caret' })
	    );
	  };
	
	  return DropdownToggle;
	}(_react2['default'].Component);
	
	DropdownToggle.propTypes = propTypes;
	DropdownToggle.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('dropdown-toggle', DropdownToggle);
	module.exports = exports['default'];

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.requiredRoles = requiredRoles;
	exports.exclusiveRoles = exclusiveRoles;
	
	var _createChainableTypeChecker = __webpack_require__(175);
	
	var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);
	
	var _ValidComponentChildren = __webpack_require__(165);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function requiredRoles() {
	  for (var _len = arguments.length, roles = Array(_len), _key = 0; _key < _len; _key++) {
	    roles[_key] = arguments[_key];
	  }
	
	  return (0, _createChainableTypeChecker2['default'])(function (props, propName, component) {
	    var missing = void 0;
	
	    roles.every(function (role) {
	      if (!_ValidComponentChildren2['default'].some(props.children, function (child) {
	        return child.props.bsRole === role;
	      })) {
	        missing = role;
	        return false;
	      }
	
	      return true;
	    });
	
	    if (missing) {
	      return new Error('(children) ' + component + ' - Missing a required child with bsRole: ' + (missing + '. ' + component + ' must have at least one child of each of ') + ('the following bsRoles: ' + roles.join(', ')));
	    }
	
	    return null;
	  });
	}
	
	function exclusiveRoles() {
	  for (var _len2 = arguments.length, roles = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    roles[_key2] = arguments[_key2];
	  }
	
	  return (0, _createChainableTypeChecker2['default'])(function (props, propName, component) {
	    var duplicate = void 0;
	
	    roles.every(function (role) {
	      var childrenWithRole = _ValidComponentChildren2['default'].filter(props.children, function (child) {
	        return child.props.bsRole === role;
	      });
	
	      if (childrenWithRole.length > 1) {
	        duplicate = role;
	        return false;
	      }
	
	      return true;
	    });
	
	    if (duplicate) {
	      return new Error('(children) ' + component + ' - Duplicate children detected of bsRole: ' + (duplicate + '. Only one child each allowed with the following ') + ('bsRoles: ' + roles.join(', ')));
	    }
	
	    return null;
	  });
	}

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Dropdown = __webpack_require__(203);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _splitComponentProps2 = __webpack_require__(230);
	
	var _splitComponentProps3 = _interopRequireDefault(_splitComponentProps2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = (0, _extends3['default'])({}, _Dropdown2['default'].propTypes, {
	
	  // Toggle props.
	  bsStyle: _react2['default'].PropTypes.string,
	  bsSize: _react2['default'].PropTypes.string,
	  title: _react2['default'].PropTypes.node.isRequired,
	  noCaret: _react2['default'].PropTypes.bool,
	
	  // Override generated docs from <Dropdown>.
	  /**
	   * @private
	   */
	  children: _react2['default'].PropTypes.node
	});
	
	var DropdownButton = function (_React$Component) {
	  (0, _inherits3['default'])(DropdownButton, _React$Component);
	
	  function DropdownButton() {
	    (0, _classCallCheck3['default'])(this, DropdownButton);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  DropdownButton.prototype.render = function render() {
	    var _props = this.props;
	    var bsSize = _props.bsSize;
	    var bsStyle = _props.bsStyle;
	    var title = _props.title;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['bsSize', 'bsStyle', 'title', 'children']);
	
	    var _splitComponentProps = (0, _splitComponentProps3['default'])(props, _Dropdown2['default'].ControlledComponent);
	
	    var dropdownProps = _splitComponentProps[0];
	    var toggleProps = _splitComponentProps[1];
	
	
	    return _react2['default'].createElement(
	      _Dropdown2['default'],
	      (0, _extends3['default'])({}, dropdownProps, {
	        bsSize: bsSize,
	        bsStyle: bsStyle
	      }),
	      _react2['default'].createElement(
	        _Dropdown2['default'].Toggle,
	        (0, _extends3['default'])({}, toggleProps, {
	          bsSize: bsSize,
	          bsStyle: bsStyle
	        }),
	        title
	      ),
	      _react2['default'].createElement(
	        _Dropdown2['default'].Menu,
	        null,
	        children
	      )
	    );
	  };
	
	  return DropdownButton;
	}(_react2['default'].Component);
	
	DropdownButton.propTypes = propTypes;
	
	exports['default'] = DropdownButton;
	module.exports = exports['default'];

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _entries = __webpack_require__(159);
	
	var _entries2 = _interopRequireDefault(_entries);
	
	exports["default"] = splitComponentProps;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function splitComponentProps(props, Component) {
	  var componentPropTypes = Component.propTypes;
	
	  var parentProps = {};
	  var childProps = {};
	
	  (0, _entries2["default"])(props).forEach(function (_ref) {
	    var propName = _ref[0];
	    var propValue = _ref[1];
	
	    if (componentPropTypes[propName]) {
	      parentProps[propName] = propValue;
	    } else {
	      childProps[propName] = propValue;
	    }
	  });
	
	  return [parentProps, childProps];
	}
	module.exports = exports["default"];

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Transition = __webpack_require__(199);
	
	var _Transition2 = _interopRequireDefault(_Transition);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * Show the component; triggers the fade in or fade out animation
	   */
	  'in': _react2['default'].PropTypes.bool,
	
	  /**
	   * Unmount the component (remove it from the DOM) when it is faded out
	   */
	  unmountOnExit: _react2['default'].PropTypes.bool,
	
	  /**
	   * Run the fade in animation when the component mounts, if it is initially
	   * shown
	   */
	  transitionAppear: _react2['default'].PropTypes.bool,
	
	  /**
	   * Duration of the fade animation in milliseconds, to ensure that finishing
	   * callbacks are fired even if the original browser transition end events are
	   * canceled
	   */
	  timeout: _react2['default'].PropTypes.number,
	
	  /**
	   * Callback fired before the component fades in
	   */
	  onEnter: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component starts to fade in
	   */
	  onEntering: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the has component faded in
	   */
	  onEntered: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired before the component fades out
	   */
	  onExit: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component starts to fade out
	   */
	  onExiting: _react2['default'].PropTypes.func,
	  /**
	   * Callback fired after the component has faded out
	   */
	  onExited: _react2['default'].PropTypes.func
	};
	
	var defaultProps = {
	  'in': false,
	  timeout: 300,
	  unmountOnExit: false,
	  transitionAppear: false
	};
	
	var Fade = function (_React$Component) {
	  (0, _inherits3['default'])(Fade, _React$Component);
	
	  function Fade() {
	    (0, _classCallCheck3['default'])(this, Fade);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Fade.prototype.render = function render() {
	    return _react2['default'].createElement(_Transition2['default'], (0, _extends3['default'])({}, this.props, {
	      className: (0, _classnames2['default'])(this.props.className, 'fade'),
	      enteredClassName: 'in',
	      enteringClassName: 'in'
	    }));
	  };
	
	  return Fade;
	}(_react2['default'].Component);
	
	Fade.propTypes = propTypes;
	Fade.defaultProps = defaultProps;
	
	exports['default'] = Fade;
	module.exports = exports['default'];

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  horizontal: _react2['default'].PropTypes.bool,
	  inline: _react2['default'].PropTypes.bool,
	  componentClass: _elementType2['default']
	};
	
	var defaultProps = {
	  horizontal: false,
	  inline: false,
	  componentClass: 'form'
	};
	
	var Form = function (_React$Component) {
	  (0, _inherits3['default'])(Form, _React$Component);
	
	  function Form() {
	    (0, _classCallCheck3['default'])(this, Form);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Form.prototype.render = function render() {
	    var _props = this.props;
	    var horizontal = _props.horizontal;
	    var inline = _props.inline;
	    var Component = _props.componentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['horizontal', 'inline', 'componentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = [];
	    if (horizontal) {
	      classes.push((0, _bootstrapUtils.prefix)(bsProps, 'horizontal'));
	    }
	    if (inline) {
	      classes.push((0, _bootstrapUtils.prefix)(bsProps, 'inline'));
	    }
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return Form;
	}(_react2['default'].Component);
	
	Form.propTypes = propTypes;
	Form.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('form', Form);
	module.exports = exports['default'];

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _FormControlFeedback = __webpack_require__(234);
	
	var _FormControlFeedback2 = _interopRequireDefault(_FormControlFeedback);
	
	var _FormControlStatic = __webpack_require__(235);
	
	var _FormControlStatic2 = _interopRequireDefault(_FormControlStatic);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  componentClass: _elementType2['default'],
	  /**
	   * Only relevant if `componentClass` is `'input'`.
	   */
	  type: _react2['default'].PropTypes.string,
	  /**
	   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
	   */
	  id: _react2['default'].PropTypes.string
	};
	
	var defaultProps = {
	  componentClass: 'input'
	};
	
	var contextTypes = {
	  $bs_formGroup: _react2['default'].PropTypes.object
	};
	
	var FormControl = function (_React$Component) {
	  (0, _inherits3['default'])(FormControl, _React$Component);
	
	  function FormControl() {
	    (0, _classCallCheck3['default'])(this, FormControl);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  FormControl.prototype.render = function render() {
	    var formGroup = this.context.$bs_formGroup;
	    var controlId = formGroup && formGroup.controlId;
	
	    var _props = this.props;
	    var Component = _props.componentClass;
	    var type = _props.type;
	    var _props$id = _props.id;
	    var id = _props$id === undefined ? controlId : _props$id;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'type', 'id', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(controlId == null || id === controlId, '`controlId` is ignored on `<FormControl>` when `id` is specified.') : void 0;
	
	    // input[type="file"] should not have .form-control.
	    var classes = void 0;
	    if (type !== 'file') {
	      classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	    }
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      type: type,
	      id: id,
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return FormControl;
	}(_react2['default'].Component);
	
	FormControl.propTypes = propTypes;
	FormControl.defaultProps = defaultProps;
	FormControl.contextTypes = contextTypes;
	
	FormControl.Feedback = _FormControlFeedback2['default'];
	FormControl.Static = _FormControlStatic2['default'];
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('form-control', FormControl);
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Glyphicon = __webpack_require__(184);
	
	var _Glyphicon2 = _interopRequireDefault(_Glyphicon);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var defaultProps = {
	  bsRole: 'feedback'
	};
	
	var contextTypes = {
	  $bs_formGroup: _react2['default'].PropTypes.object
	};
	
	var FormControlFeedback = function (_React$Component) {
	  (0, _inherits3['default'])(FormControlFeedback, _React$Component);
	
	  function FormControlFeedback() {
	    (0, _classCallCheck3['default'])(this, FormControlFeedback);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  FormControlFeedback.prototype.getGlyph = function getGlyph(validationState) {
	    switch (validationState) {
	      case 'success':
	        return 'ok';
	      case 'warning':
	        return 'warning-sign';
	      case 'error':
	        return 'remove';
	      default:
	        return null;
	    }
	  };
	
	  FormControlFeedback.prototype.renderDefaultFeedback = function renderDefaultFeedback(formGroup, className, classes, elementProps) {
	    var glyph = this.getGlyph(formGroup && formGroup.validationState);
	    if (!glyph) {
	      return null;
	    }
	
	    return _react2['default'].createElement(_Glyphicon2['default'], (0, _extends3['default'])({}, elementProps, {
	      glyph: glyph,
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  FormControlFeedback.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    if (!children) {
	      return this.renderDefaultFeedback(this.context.$bs_formGroup, className, classes, elementProps);
	    }
	
	    var child = _react2['default'].Children.only(children);
	    return _react2['default'].cloneElement(child, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(child.props.className, className, classes)
	    }));
	  };
	
	  return FormControlFeedback;
	}(_react2['default'].Component);
	
	FormControlFeedback.defaultProps = defaultProps;
	FormControlFeedback.contextTypes = contextTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('form-control-feedback', FormControlFeedback);
	module.exports = exports['default'];

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  componentClass: _elementType2['default']
	};
	
	var defaultProps = {
	  componentClass: 'p'
	};
	
	var FormControlStatic = function (_React$Component) {
	  (0, _inherits3['default'])(FormControlStatic, _React$Component);
	
	  function FormControlStatic() {
	    (0, _classCallCheck3['default'])(this, FormControlStatic);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  FormControlStatic.prototype.render = function render() {
	    var _props = this.props;
	    var Component = _props.componentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return FormControlStatic;
	}(_react2['default'].Component);
	
	FormControlStatic.propTypes = propTypes;
	FormControlStatic.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('form-control-static', FormControlStatic);
	module.exports = exports['default'];

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _StyleConfig = __webpack_require__(163);
	
	var _ValidComponentChildren = __webpack_require__(165);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
	   */
	  controlId: _react2['default'].PropTypes.string,
	  validationState: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error'])
	};
	
	var childContextTypes = {
	  $bs_formGroup: _react2['default'].PropTypes.object.isRequired
	};
	
	var FormGroup = function (_React$Component) {
	  (0, _inherits3['default'])(FormGroup, _React$Component);
	
	  function FormGroup() {
	    (0, _classCallCheck3['default'])(this, FormGroup);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  FormGroup.prototype.getChildContext = function getChildContext() {
	    var _props = this.props;
	    var controlId = _props.controlId;
	    var validationState = _props.validationState;
	
	
	    return {
	      $bs_formGroup: {
	        controlId: controlId,
	        validationState: validationState
	      }
	    };
	  };
	
	  FormGroup.prototype.hasFeedback = function hasFeedback(children) {
	    var _this2 = this;
	
	    return _ValidComponentChildren2['default'].some(children, function (child) {
	      return child.props.bsRole === 'feedback' || child.props.children && _this2.hasFeedback(child.props.children);
	    });
	  };
	
	  FormGroup.prototype.render = function render() {
	    var _props2 = this.props;
	    var validationState = _props2.validationState;
	    var className = _props2.className;
	    var children = _props2.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props2, ['validationState', 'className', 'children']);
	
	    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['controlId']);
	
	    var bsProps = _splitBsPropsAndOmit[0];
	    var elementProps = _splitBsPropsAndOmit[1];
	
	
	    var classes = (0, _extends3['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
	      'has-feedback': this.hasFeedback(children)
	    });
	    if (validationState) {
	      classes['has-' + validationState] = true;
	    }
	
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends3['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      children
	    );
	  };
	
	  return FormGroup;
	}(_react2['default'].Component);
	
	FormGroup.propTypes = propTypes;
	FormGroup.childContextTypes = childContextTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('form-group', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], FormGroup));
	module.exports = exports['default'];

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * Turn any fixed-width grid layout into a full-width layout by this property.
	   *
	   * Adds `container-fluid` class.
	   */
	  fluid: _react2['default'].PropTypes.bool,
	  /**
	   * You can use a custom element for this component
	   */
	  componentClass: _elementType2['default']
	};
	
	var defaultProps = {
	  componentClass: 'div',
	  fluid: false
	};
	
	var Grid = function (_React$Component) {
	  (0, _inherits3['default'])(Grid, _React$Component);
	
	  function Grid() {
	    (0, _classCallCheck3['default'])(this, Grid);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Grid.prototype.render = function render() {
	    var _props = this.props;
	    var fluid = _props.fluid;
	    var Component = _props.componentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['fluid', 'componentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.prefix)(bsProps, fluid && 'fluid');
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return Grid;
	}(_react2['default'].Component);
	
	Grid.propTypes = propTypes;
	Grid.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('container', Grid);
	module.exports = exports['default'];

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var HelpBlock = function (_React$Component) {
	  (0, _inherits3['default'])(HelpBlock, _React$Component);
	
	  function HelpBlock() {
	    (0, _classCallCheck3['default'])(this, HelpBlock);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  HelpBlock.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement('span', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return HelpBlock;
	}(_react2['default'].Component);
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('help-block', HelpBlock);
	module.exports = exports['default'];

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * Sets image as responsive image
	   */
	  responsive: _react2['default'].PropTypes.bool,
	
	  /**
	   * Sets image shape as rounded
	   */
	  rounded: _react2['default'].PropTypes.bool,
	
	  /**
	   * Sets image shape as circle
	   */
	  circle: _react2['default'].PropTypes.bool,
	
	  /**
	   * Sets image shape as thumbnail
	   */
	  thumbnail: _react2['default'].PropTypes.bool
	};
	
	var defaultProps = {
	  responsive: false,
	  rounded: false,
	  circle: false,
	  thumbnail: false
	};
	
	var Image = function (_React$Component) {
	  (0, _inherits3['default'])(Image, _React$Component);
	
	  function Image() {
	    (0, _classCallCheck3['default'])(this, Image);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Image.prototype.render = function render() {
	    var _classes;
	
	    var _props = this.props;
	    var responsive = _props.responsive;
	    var rounded = _props.rounded;
	    var circle = _props.circle;
	    var thumbnail = _props.thumbnail;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['responsive', 'rounded', 'circle', 'thumbnail', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (_classes = {}, _classes[(0, _bootstrapUtils.prefix)(bsProps, 'responsive')] = responsive, _classes[(0, _bootstrapUtils.prefix)(bsProps, 'rounded')] = rounded, _classes[(0, _bootstrapUtils.prefix)(bsProps, 'circle')] = circle, _classes[(0, _bootstrapUtils.prefix)(bsProps, 'thumbnail')] = thumbnail, _classes);
	
	    return _react2['default'].createElement('img', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return Image;
	}(_react2['default'].Component);
	
	Image.propTypes = propTypes;
	Image.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('img', Image);
	module.exports = exports['default'];

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _InputGroupAddon = __webpack_require__(241);
	
	var _InputGroupAddon2 = _interopRequireDefault(_InputGroupAddon);
	
	var _InputGroupButton = __webpack_require__(242);
	
	var _InputGroupButton2 = _interopRequireDefault(_InputGroupButton);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _StyleConfig = __webpack_require__(163);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var InputGroup = function (_React$Component) {
	  (0, _inherits3['default'])(InputGroup, _React$Component);
	
	  function InputGroup() {
	    (0, _classCallCheck3['default'])(this, InputGroup);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  InputGroup.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement('span', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return InputGroup;
	}(_react2['default'].Component);
	
	InputGroup.Addon = _InputGroupAddon2['default'];
	InputGroup.Button = _InputGroupButton2['default'];
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('input-group', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], InputGroup));
	module.exports = exports['default'];

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var InputGroupAddon = function (_React$Component) {
	  (0, _inherits3['default'])(InputGroupAddon, _React$Component);
	
	  function InputGroupAddon() {
	    (0, _classCallCheck3['default'])(this, InputGroupAddon);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  InputGroupAddon.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement('span', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return InputGroupAddon;
	}(_react2['default'].Component);
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('input-group-addon', InputGroupAddon);
	module.exports = exports['default'];

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var InputGroupButton = function (_React$Component) {
	  (0, _inherits3['default'])(InputGroupButton, _React$Component);
	
	  function InputGroupButton() {
	    (0, _classCallCheck3['default'])(this, InputGroupButton);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  InputGroupButton.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement('span', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return InputGroupButton;
	}(_react2['default'].Component);
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('input-group-btn', InputGroupButton);
	module.exports = exports['default'];

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  componentClass: _elementType2['default']
	};
	
	var defaultProps = {
	  componentClass: 'div'
	};
	
	var Jumbotron = function (_React$Component) {
	  (0, _inherits3['default'])(Jumbotron, _React$Component);
	
	  function Jumbotron() {
	    (0, _classCallCheck3['default'])(this, Jumbotron);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Jumbotron.prototype.render = function render() {
	    var _props = this.props;
	    var Component = _props.componentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return Jumbotron;
	}(_react2['default'].Component);
	
	Jumbotron.propTypes = propTypes;
	Jumbotron.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('jumbotron', Jumbotron);
	module.exports = exports['default'];

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _values = __webpack_require__(167);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _StyleConfig = __webpack_require__(163);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var Label = function (_React$Component) {
	  (0, _inherits3['default'])(Label, _React$Component);
	
	  function Label() {
	    (0, _classCallCheck3['default'])(this, Label);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Label.prototype.hasContent = function hasContent(children) {
	    var result = false;
	
	    _react2['default'].Children.forEach(children, function (child) {
	      if (result) {
	        return;
	      }
	
	      if (child || child === 0) {
	        result = true;
	      }
	    });
	
	    return result;
	  };
	
	  Label.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _extends3['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
	
	      // Hack for collapsing on IE8.
	      hidden: !this.hasContent(children)
	    });
	
	    return _react2['default'].createElement(
	      'span',
	      (0, _extends3['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      children
	    );
	  };
	
	  return Label;
	}(_react2['default'].Component);
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('label', (0, _bootstrapUtils.bsStyles)([].concat((0, _values2['default'])(_StyleConfig.State), [_StyleConfig.Style.DEFAULT, _StyleConfig.Style.PRIMARY]), _StyleConfig.Style.DEFAULT, Label));
	module.exports = exports['default'];

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _ListGroupItem = __webpack_require__(246);
	
	var _ListGroupItem2 = _interopRequireDefault(_ListGroupItem);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _ValidComponentChildren = __webpack_require__(165);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * You can use a custom element type for this component.
	   *
	   * If not specified, it will be treated as `'li'` if every child is a
	   * non-actionable `<ListGroupItem>`, and `'div'` otherwise.
	   */
	  componentClass: _elementType2['default']
	};
	
	function getDefaultComponent(children) {
	  if (!children) {
	    // FIXME: This is the old behavior. Is this right?
	    return 'div';
	  }
	
	  if (_ValidComponentChildren2['default'].some(children, function (child) {
	    return child.type !== _ListGroupItem2['default'] || child.props.href || child.props.onClick;
	  })) {
	    return 'div';
	  }
	
	  return 'ul';
	}
	
	var ListGroup = function (_React$Component) {
	  (0, _inherits3['default'])(ListGroup, _React$Component);
	
	  function ListGroup() {
	    (0, _classCallCheck3['default'])(this, ListGroup);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  ListGroup.prototype.render = function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var _props$componentClass = _props.componentClass;
	    var Component = _props$componentClass === undefined ? getDefaultComponent(children) : _props$componentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['children', 'componentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    var useListItem = Component === 'ul' && _ValidComponentChildren2['default'].every(children, function (child) {
	      return child.type === _ListGroupItem2['default'];
	    });
	
	    return _react2['default'].createElement(
	      Component,
	      (0, _extends3['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      useListItem ? _ValidComponentChildren2['default'].map(children, function (child) {
	        return (0, _react.cloneElement)(child, { listItem: true });
	      }) : children
	    );
	  };
	
	  return ListGroup;
	}(_react2['default'].Component);
	
	ListGroup.propTypes = propTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('list-group', ListGroup);
	module.exports = exports['default'];

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _values = __webpack_require__(167);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _StyleConfig = __webpack_require__(163);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  active: _react2['default'].PropTypes.any,
	  disabled: _react2['default'].PropTypes.any,
	  header: _react2['default'].PropTypes.node,
	  listItem: _react2['default'].PropTypes.bool,
	  onClick: _react2['default'].PropTypes.func,
	  href: _react2['default'].PropTypes.string,
	  type: _react2['default'].PropTypes.string
	};
	
	var defaultProps = {
	  listItem: false
	};
	
	var ListGroupItem = function (_React$Component) {
	  (0, _inherits3['default'])(ListGroupItem, _React$Component);
	
	  function ListGroupItem() {
	    (0, _classCallCheck3['default'])(this, ListGroupItem);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  ListGroupItem.prototype.renderHeader = function renderHeader(header, headingClassName) {
	    if (_react2['default'].isValidElement(header)) {
	      return (0, _react.cloneElement)(header, {
	        className: (0, _classnames2['default'])(header.props.className, headingClassName)
	      });
	    }
	
	    return _react2['default'].createElement(
	      'h4',
	      { className: headingClassName },
	      header
	    );
	  };
	
	  ListGroupItem.prototype.render = function render() {
	    var _props = this.props;
	    var active = _props.active;
	    var disabled = _props.disabled;
	    var className = _props.className;
	    var header = _props.header;
	    var listItem = _props.listItem;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['active', 'disabled', 'className', 'header', 'listItem', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _extends3['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
	      active: active,
	      disabled: disabled
	    });
	
	    var Component = void 0;
	
	    if (elementProps.href) {
	      Component = 'a';
	    } else if (elementProps.onClick) {
	      Component = 'button';
	      elementProps.type = elementProps.type || 'button';
	    } else if (listItem) {
	      Component = 'li';
	    } else {
	      Component = 'span';
	    }
	
	    elementProps.className = (0, _classnames2['default'])(className, classes);
	
	    // TODO: Deprecate `header` prop.
	    if (header) {
	      return _react2['default'].createElement(
	        Component,
	        elementProps,
	        this.renderHeader(header, (0, _bootstrapUtils.prefix)(bsProps, 'heading')),
	        _react2['default'].createElement(
	          'p',
	          { className: (0, _bootstrapUtils.prefix)(bsProps, 'text') },
	          children
	        )
	      );
	    }
	
	    return _react2['default'].createElement(
	      Component,
	      elementProps,
	      children
	    );
	  };
	
	  return ListGroupItem;
	}(_react2['default'].Component);
	
	ListGroupItem.propTypes = propTypes;
	ListGroupItem.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('list-group-item', (0, _bootstrapUtils.bsStyles)((0, _values2['default'])(_StyleConfig.State), ListGroupItem));
	module.exports = exports['default'];

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _MediaBody = __webpack_require__(248);
	
	var _MediaBody2 = _interopRequireDefault(_MediaBody);
	
	var _MediaHeading = __webpack_require__(249);
	
	var _MediaHeading2 = _interopRequireDefault(_MediaHeading);
	
	var _MediaLeft = __webpack_require__(250);
	
	var _MediaLeft2 = _interopRequireDefault(_MediaLeft);
	
	var _MediaList = __webpack_require__(251);
	
	var _MediaList2 = _interopRequireDefault(_MediaList);
	
	var _MediaListItem = __webpack_require__(252);
	
	var _MediaListItem2 = _interopRequireDefault(_MediaListItem);
	
	var _MediaRight = __webpack_require__(253);
	
	var _MediaRight2 = _interopRequireDefault(_MediaRight);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  componentClass: _elementType2['default']
	};
	
	var defaultProps = {
	  componentClass: 'div'
	};
	
	var Media = function (_React$Component) {
	  (0, _inherits3['default'])(Media, _React$Component);
	
	  function Media() {
	    (0, _classCallCheck3['default'])(this, Media);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Media.prototype.render = function render() {
	    var _props = this.props;
	    var Component = _props.componentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return Media;
	}(_react2['default'].Component);
	
	Media.propTypes = propTypes;
	Media.defaultProps = defaultProps;
	
	Media.Heading = _MediaHeading2['default'];
	Media.Body = _MediaBody2['default'];
	Media.Left = _MediaLeft2['default'];
	Media.Right = _MediaRight2['default'];
	Media.List = _MediaList2['default'];
	Media.ListItem = _MediaListItem2['default'];
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('media', Media);
	module.exports = exports['default'];

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  componentClass: _elementType2['default']
	};
	
	var defaultProps = {
	  componentClass: 'div'
	};
	
	var MediaBody = function (_React$Component) {
	  (0, _inherits3['default'])(MediaBody, _React$Component);
	
	  function MediaBody() {
	    (0, _classCallCheck3['default'])(this, MediaBody);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  MediaBody.prototype.render = function render() {
	    var _props = this.props;
	    var Component = _props.componentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return MediaBody;
	}(_react2['default'].Component);
	
	MediaBody.propTypes = propTypes;
	MediaBody.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('media-body', MediaBody);
	module.exports = exports['default'];

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  componentClass: _elementType2['default']
	};
	
	var defaultProps = {
	  componentClass: 'h4'
	};
	
	var MediaHeading = function (_React$Component) {
	  (0, _inherits3['default'])(MediaHeading, _React$Component);
	
	  function MediaHeading() {
	    (0, _classCallCheck3['default'])(this, MediaHeading);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  MediaHeading.prototype.render = function render() {
	    var _props = this.props;
	    var Component = _props.componentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return MediaHeading;
	}(_react2['default'].Component);
	
	MediaHeading.propTypes = propTypes;
	MediaHeading.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('media-heading', MediaHeading);
	module.exports = exports['default'];

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Media = __webpack_require__(247);
	
	var _Media2 = _interopRequireDefault(_Media);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * Align the media to the top, middle, or bottom of the media object.
	   */
	  align: _react2['default'].PropTypes.oneOf(['top', 'middle', 'bottom'])
	};
	
	var MediaLeft = function (_React$Component) {
	  (0, _inherits3['default'])(MediaLeft, _React$Component);
	
	  function MediaLeft() {
	    (0, _classCallCheck3['default'])(this, MediaLeft);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  MediaLeft.prototype.render = function render() {
	    var _props = this.props;
	    var align = _props.align;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['align', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    if (align) {
	      // The class is e.g. `media-top`, not `media-left-top`.
	      classes[(0, _bootstrapUtils.prefix)(_Media2['default'].defaultProps, align)] = true;
	    }
	
	    return _react2['default'].createElement('div', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return MediaLeft;
	}(_react2['default'].Component);
	
	MediaLeft.propTypes = propTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('media-left', MediaLeft);
	module.exports = exports['default'];

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var MediaList = function (_React$Component) {
	  (0, _inherits3['default'])(MediaList, _React$Component);
	
	  function MediaList() {
	    (0, _classCallCheck3['default'])(this, MediaList);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  MediaList.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement('ul', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return MediaList;
	}(_react2['default'].Component);
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('media-list', MediaList);
	module.exports = exports['default'];

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var MediaListItem = function (_React$Component) {
	  (0, _inherits3['default'])(MediaListItem, _React$Component);
	
	  function MediaListItem() {
	    (0, _classCallCheck3['default'])(this, MediaListItem);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  MediaListItem.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement('li', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return MediaListItem;
	}(_react2['default'].Component);
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('media', MediaListItem);
	module.exports = exports['default'];

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Media = __webpack_require__(247);
	
	var _Media2 = _interopRequireDefault(_Media);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * Align the media to the top, middle, or bottom of the media object.
	   */
	  align: _react2['default'].PropTypes.oneOf(['top', 'middle', 'bottom'])
	};
	
	var MediaRight = function (_React$Component) {
	  (0, _inherits3['default'])(MediaRight, _React$Component);
	
	  function MediaRight() {
	    (0, _classCallCheck3['default'])(this, MediaRight);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  MediaRight.prototype.render = function render() {
	    var _props = this.props;
	    var align = _props.align;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['align', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    if (align) {
	      // The class is e.g. `media-top`, not `media-right-top`.
	      classes[(0, _bootstrapUtils.prefix)(_Media2['default'].defaultProps, align)] = true;
	    }
	
	    return _react2['default'].createElement('div', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return MediaRight;
	}(_react2['default'].Component);
	
	MediaRight.propTypes = propTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('media-right', MediaRight);
	module.exports = exports['default'];

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _all = __webpack_require__(178);
	
	var _all2 = _interopRequireDefault(_all);
	
	var _SafeAnchor = __webpack_require__(173);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * Highlight the menu item as active.
	   */
	  active: _react2['default'].PropTypes.bool,
	
	  /**
	   * Disable the menu item, making it unselectable.
	   */
	  disabled: _react2['default'].PropTypes.bool,
	
	  /**
	   * Styles the menu item as a horizontal rule, providing visual separation between
	   * groups of menu items.
	   */
	  divider: (0, _all2['default'])(_react2['default'].PropTypes.bool, function (_ref) {
	    var divider = _ref.divider;
	    var children = _ref.children;
	    return divider && children ? new Error('Children will not be rendered for dividers') : null;
	  }),
	
	  /**
	   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
	   */
	  eventKey: _react2['default'].PropTypes.any,
	
	  /**
	   * Styles the menu item as a header label, useful for describing a group of menu items.
	   */
	  header: _react2['default'].PropTypes.bool,
	
	  /**
	   * HTML `href` attribute corresponding to `a.href`.
	   */
	  href: _react2['default'].PropTypes.string,
	
	  /**
	   * Callback fired when the menu item is clicked.
	   */
	  onClick: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired when the menu item is selected.
	   *
	   * ```js
	   * (eventKey: any, event: Object) => any
	   * ```
	   */
	  onSelect: _react2['default'].PropTypes.func
	};
	
	var defaultProps = {
	  divider: false,
	  disabled: false,
	  header: false
	};
	
	var MenuItem = function (_React$Component) {
	  (0, _inherits3['default'])(MenuItem, _React$Component);
	
	  function MenuItem(props, context) {
	    (0, _classCallCheck3['default'])(this, MenuItem);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleClick = _this.handleClick.bind(_this);
	    return _this;
	  }
	
	  MenuItem.prototype.handleClick = function handleClick(event) {
	    var _props = this.props;
	    var href = _props.href;
	    var disabled = _props.disabled;
	    var onSelect = _props.onSelect;
	    var eventKey = _props.eventKey;
	
	
	    if (!href || disabled) {
	      event.preventDefault();
	    }
	
	    if (disabled) {
	      return;
	    }
	
	    if (onSelect) {
	      onSelect(eventKey, event);
	    }
	  };
	
	  MenuItem.prototype.render = function render() {
	    var _props2 = this.props;
	    var active = _props2.active;
	    var disabled = _props2.disabled;
	    var divider = _props2.divider;
	    var header = _props2.header;
	    var onClick = _props2.onClick;
	    var className = _props2.className;
	    var style = _props2.style;
	    var props = (0, _objectWithoutProperties3['default'])(_props2, ['active', 'disabled', 'divider', 'header', 'onClick', 'className', 'style']);
	
	    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['eventKey', 'onSelect']);
	
	    var bsProps = _splitBsPropsAndOmit[0];
	    var elementProps = _splitBsPropsAndOmit[1];
	
	
	    if (divider) {
	      // Forcibly blank out the children; separators shouldn't render any.
	      elementProps.children = undefined;
	
	      return _react2['default'].createElement('li', (0, _extends3['default'])({}, elementProps, {
	        role: 'separator',
	        className: (0, _classnames2['default'])(className, 'divider'),
	        style: style
	      }));
	    }
	
	    if (header) {
	      return _react2['default'].createElement('li', (0, _extends3['default'])({}, elementProps, {
	        role: 'heading',
	        className: (0, _classnames2['default'])(className, (0, _bootstrapUtils.prefix)(bsProps, 'header')),
	        style: style
	      }));
	    }
	
	    return _react2['default'].createElement(
	      'li',
	      {
	        role: 'presentation',
	        className: (0, _classnames2['default'])(className, { active: active, disabled: disabled }),
	        style: style
	      },
	      _react2['default'].createElement(_SafeAnchor2['default'], (0, _extends3['default'])({}, elementProps, {
	        role: 'menuitem',
	        tabIndex: '-1',
	        onClick: (0, _createChainedFunction2['default'])(onClick, this.handleClick)
	      }))
	    );
	  };
	
	  return MenuItem;
	}(_react2['default'].Component);
	
	MenuItem.propTypes = propTypes;
	MenuItem.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('dropdown', MenuItem);
	module.exports = exports['default'];

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _events = __webpack_require__(256);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _ownerDocument = __webpack_require__(205);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	var _inDOM = __webpack_require__(201);
	
	var _inDOM2 = _interopRequireDefault(_inDOM);
	
	var _scrollbarSize = __webpack_require__(259);
	
	var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _Modal = __webpack_require__(260);
	
	var _Modal2 = _interopRequireDefault(_Modal);
	
	var _isOverflowing = __webpack_require__(269);
	
	var _isOverflowing2 = _interopRequireDefault(_isOverflowing);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _Fade = __webpack_require__(231);
	
	var _Fade2 = _interopRequireDefault(_Fade);
	
	var _ModalBody = __webpack_require__(273);
	
	var _ModalBody2 = _interopRequireDefault(_ModalBody);
	
	var _ModalDialog = __webpack_require__(274);
	
	var _ModalDialog2 = _interopRequireDefault(_ModalDialog);
	
	var _ModalFooter = __webpack_require__(275);
	
	var _ModalFooter2 = _interopRequireDefault(_ModalFooter);
	
	var _ModalHeader = __webpack_require__(276);
	
	var _ModalHeader2 = _interopRequireDefault(_ModalHeader);
	
	var _ModalTitle = __webpack_require__(277);
	
	var _ModalTitle2 = _interopRequireDefault(_ModalTitle);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	var _splitComponentProps2 = __webpack_require__(230);
	
	var _splitComponentProps3 = _interopRequireDefault(_splitComponentProps2);
	
	var _StyleConfig = __webpack_require__(163);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = (0, _extends3['default'])({}, _Modal2['default'].propTypes, _ModalDialog2['default'].propTypes, {
	
	  /**
	   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
	   * trigger an "onHide" when clicked.
	   */
	  backdrop: _react2['default'].PropTypes.oneOf(['static', true, false]),
	
	  /**
	   * Close the modal when escape key is pressed
	   */
	  keyboard: _react2['default'].PropTypes.bool,
	
	  /**
	   * Open and close the Modal with a slide and fade animation.
	   */
	  animation: _react2['default'].PropTypes.bool,
	
	  /**
	   * A Component type that provides the modal content Markup. This is a useful
	   * prop when you want to use your own styles and markup to create a custom
	   * modal component.
	   */
	  dialogComponentClass: _elementType2['default'],
	
	  /**
	   * When `true` The modal will automatically shift focus to itself when it
	   * opens, and replace it to the last focused element when it closes.
	   * Generally this should never be set to false as it makes the Modal less
	   * accessible to assistive technologies, like screen-readers.
	   */
	  autoFocus: _react2['default'].PropTypes.bool,
	
	  /**
	   * When `true` The modal will prevent focus from leaving the Modal while
	   * open. Consider leaving the default value here, as it is necessary to make
	   * the Modal work well with assistive technologies, such as screen readers.
	   */
	  enforceFocus: _react2['default'].PropTypes.bool,
	
	  /**
	   * When `true` The modal will show itself.
	   */
	  show: _react2['default'].PropTypes.bool,
	
	  /**
	   * A callback fired when the header closeButton or non-static backdrop is
	   * clicked. Required if either are specified.
	   */
	  onHide: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired before the Modal transitions in
	   */
	  onEnter: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired as the Modal begins to transition in
	   */
	  onEntering: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired after the Modal finishes transitioning in
	   */
	  onEntered: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired right before the Modal transitions out
	   */
	  onExit: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired as the Modal begins to transition out
	   */
	  onExiting: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired after the Modal finishes transitioning out
	   */
	  onExited: _react2['default'].PropTypes.func,
	
	  /**
	   * @private
	   */
	  container: _Modal2['default'].propTypes.container
	});
	
	var defaultProps = (0, _extends3['default'])({}, _Modal2['default'].defaultProps, {
	  animation: true,
	  dialogComponentClass: _ModalDialog2['default']
	});
	
	var childContextTypes = {
	  $bs_modal: _react2['default'].PropTypes.shape({
	    onHide: _react2['default'].PropTypes.func
	  })
	};
	
	var Modal = function (_React$Component) {
	  (0, _inherits3['default'])(Modal, _React$Component);
	
	  function Modal(props, context) {
	    (0, _classCallCheck3['default'])(this, Modal);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleEntering = _this.handleEntering.bind(_this);
	    _this.handleExited = _this.handleExited.bind(_this);
	    _this.handleWindowResize = _this.handleWindowResize.bind(_this);
	    _this.handleDialogClick = _this.handleDialogClick.bind(_this);
	
	    _this.state = {
	      style: {}
	    };
	    return _this;
	  }
	
	  Modal.prototype.getChildContext = function getChildContext() {
	    return {
	      $bs_modal: {
	        onHide: this.props.onHide
	      }
	    };
	  };
	
	  Modal.prototype.componentWillUnmount = function componentWillUnmount() {
	    // Clean up the listener if we need to.
	    this.handleExited();
	  };
	
	  Modal.prototype.handleEntering = function handleEntering() {
	    // FIXME: This should work even when animation is disabled.
	    _events2['default'].on(window, 'resize', this.handleWindowResize);
	    this.updateStyle();
	  };
	
	  Modal.prototype.handleExited = function handleExited() {
	    // FIXME: This should work even when animation is disabled.
	    _events2['default'].off(window, 'resize', this.handleWindowResize);
	  };
	
	  Modal.prototype.handleWindowResize = function handleWindowResize() {
	    this.updateStyle();
	  };
	
	  Modal.prototype.handleDialogClick = function handleDialogClick(e) {
	    if (e.target !== e.currentTarget) {
	      return;
	    }
	
	    this.props.onHide();
	  };
	
	  Modal.prototype.updateStyle = function updateStyle() {
	    if (!_inDOM2['default']) {
	      return;
	    }
	
	    var dialogNode = this._modal.getDialogElement();
	    var dialogHeight = dialogNode.scrollHeight;
	
	    var document = (0, _ownerDocument2['default'])(dialogNode);
	    var bodyIsOverflowing = (0, _isOverflowing2['default'])(_reactDom2['default'].findDOMNode(this.props.container || document.body));
	    var modalIsOverflowing = dialogHeight > document.documentElement.clientHeight;
	
	    this.setState({
	      style: {
	        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? (0, _scrollbarSize2['default'])() : undefined,
	        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? (0, _scrollbarSize2['default'])() : undefined
	      }
	    });
	  };
	
	  Modal.prototype.render = function render() {
	    var _this2 = this;
	
	    var _props = this.props;
	    var backdrop = _props.backdrop;
	    var animation = _props.animation;
	    var show = _props.show;
	    var Dialog = _props.dialogComponentClass;
	    var className = _props.className;
	    var style = _props.style;
	    var children = _props.children;
	    var onEntering = _props.onEntering;
	    var onExited = _props.onExited;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['backdrop', 'animation', 'show', 'dialogComponentClass', 'className', 'style', 'children', 'onEntering', 'onExited']);
	
	    var _splitComponentProps = (0, _splitComponentProps3['default'])(props, _Modal2['default']);
	
	    var baseModalProps = _splitComponentProps[0];
	    var dialogProps = _splitComponentProps[1];
	
	
	    var inClassName = show && !animation && 'in';
	
	    return _react2['default'].createElement(
	      _Modal2['default'],
	      (0, _extends3['default'])({}, baseModalProps, {
	        ref: function ref(c) {
	          _this2._modal = c;
	        },
	        show: show,
	        onEntering: (0, _createChainedFunction2['default'])(onEntering, this.handleEntering),
	        onExited: (0, _createChainedFunction2['default'])(onExited, this.handleExited),
	        backdrop: backdrop,
	        backdropClassName: (0, _classnames2['default'])((0, _bootstrapUtils.prefix)(props, 'backdrop'), inClassName),
	        containerClassName: (0, _bootstrapUtils.prefix)(props, 'open'),
	        transition: animation ? _Fade2['default'] : undefined,
	        dialogTransitionTimeout: Modal.TRANSITION_DURATION,
	        backdropTransitionTimeout: Modal.BACKDROP_TRANSITION_DURATION
	      }),
	      _react2['default'].createElement(
	        Dialog,
	        (0, _extends3['default'])({}, dialogProps, {
	          style: (0, _extends3['default'])({}, this.state.style, style),
	          className: (0, _classnames2['default'])(className, inClassName),
	          onClick: backdrop === true ? this.handleDialogClick : null
	        }),
	        children
	      )
	    );
	  };
	
	  return Modal;
	}(_react2['default'].Component);
	
	Modal.propTypes = propTypes;
	Modal.defaultProps = defaultProps;
	Modal.childContextTypes = childContextTypes;
	
	Modal.Body = _ModalBody2['default'];
	Modal.Header = _ModalHeader2['default'];
	Modal.Title = _ModalTitle2['default'];
	Modal.Footer = _ModalFooter2['default'];
	
	Modal.Dialog = _ModalDialog2['default'];
	
	Modal.TRANSITION_DURATION = 300;
	Modal.BACKDROP_TRANSITION_DURATION = 150;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('modal', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], Modal));
	module.exports = exports['default'];

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var on = __webpack_require__(202),
	    off = __webpack_require__(224),
	    filter = __webpack_require__(257);
	
	module.exports = { on: on, off: off, filter: filter };

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var contains = __webpack_require__(206),
	    qsa = __webpack_require__(258);
	
	module.exports = function (selector, handler) {
	  return function (e) {
	    var top = e.currentTarget,
	        target = e.target,
	        matches = qsa(top, selector);
	
	    if (matches.some(function (match) {
	      return contains(match, target);
	    })) handler.call(this, e);
	  };
	};

/***/ },
/* 258 */
/***/ function(module, exports) {

	'use strict';
	//     Zepto.js
	//     (c) 2010-2015 Thomas Fuchs
	//     Zepto.js may be freely distributed under the MIT license.
	var simpleSelectorRE = /^[\w-]*$/,
	    toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
	
	module.exports = function qsa(element, selector) {
	  var maybeID = selector[0] === '#',
	      maybeClass = selector[0] === '.',
	      nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
	      isSimple = simpleSelectorRE.test(nameOnly),
	      found;
	
	  if (isSimple) {
	    if (maybeID) {
	      element = element.getElementById ? element : document;
	      return (found = element.getElementById(nameOnly)) ? [found] : [];
	    }
	
	    if (element.getElementsByClassName && maybeClass) return toArray(element.getElementsByClassName(nameOnly));
	
	    return toArray(element.getElementsByTagName(selector));
	  }
	
	  return toArray(element.querySelectorAll(selector));
	};

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var canUseDOM = __webpack_require__(201);
	
	var size;
	
	module.exports = function (recalc) {
	  if (!size || recalc) {
	    if (canUseDOM) {
	      var scrollDiv = document.createElement('div');
	
	      scrollDiv.style.position = 'absolute';
	      scrollDiv.style.top = '-9999px';
	      scrollDiv.style.width = '50px';
	      scrollDiv.style.height = '50px';
	      scrollDiv.style.overflow = 'scroll';
	
	      document.body.appendChild(scrollDiv);
	      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	      document.body.removeChild(scrollDiv);
	    }
	  }
	
	  return size;
	};

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*eslint-disable react/prop-types */
	
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _componentOrElement = __webpack_require__(261);
	
	var _componentOrElement2 = _interopRequireDefault(_componentOrElement);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _Portal = __webpack_require__(262);
	
	var _Portal2 = _interopRequireDefault(_Portal);
	
	var _ModalManager = __webpack_require__(264);
	
	var _ModalManager2 = _interopRequireDefault(_ModalManager);
	
	var _ownerDocument = __webpack_require__(226);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	var _addEventListener = __webpack_require__(223);
	
	var _addEventListener2 = _interopRequireDefault(_addEventListener);
	
	var _addFocusListener = __webpack_require__(272);
	
	var _addFocusListener2 = _interopRequireDefault(_addFocusListener);
	
	var _inDOM = __webpack_require__(201);
	
	var _inDOM2 = _interopRequireDefault(_inDOM);
	
	var _activeElement = __webpack_require__(204);
	
	var _activeElement2 = _interopRequireDefault(_activeElement);
	
	var _contains = __webpack_require__(206);
	
	var _contains2 = _interopRequireDefault(_contains);
	
	var _getContainer = __webpack_require__(263);
	
	var _getContainer2 = _interopRequireDefault(_getContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var modalManager = new _ModalManager2.default();
	
	/**
	 * Love them or hate them, `<Modal/>` provides a solid foundation for creating dialogs, lightboxes, or whatever else.
	 * The Modal component renders its `children` node in front of a backdrop component.
	 *
	 * The Modal offers a few helpful features over using just a `<Portal/>` component and some styles:
	 *
	 * - Manages dialog stacking when one-at-a-time just isn't enough.
	 * - Creates a backdrop, for disabling interaction below the modal.
	 * - It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
	 * - It disables scrolling of the page content while open.
	 * - Adds the appropriate ARIA roles are automatically.
	 * - Easily pluggable animations via a `<Transition/>` component.
	 *
	 * Note that, in the same way the backdrop element prevents users from clicking or interacting
	 * with the page content underneath the Modal, Screen readers also need to be signaled to not to
	 * interact with page content while the Modal is open. To do this, we use a common technique of applying
	 * the `aria-hidden='true'` attribute to the non-Modal elements in the Modal `container`. This means that for
	 * a Modal to be truly modal, it should have a `container` that is _outside_ your app's
	 * React hierarchy (such as the default: document.body).
	 */
	var Modal = _react2.default.createClass({
	  displayName: 'Modal',
	
	
	  propTypes: _extends({}, _Portal2.default.propTypes, {
	
	    /**
	     * Set the visibility of the Modal
	     */
	    show: _react2.default.PropTypes.bool,
	
	    /**
	     * A Node, Component instance, or function that returns either. The Modal is appended to it's container element.
	     *
	     * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
	     * page content can be placed behind a virtual backdrop as well as a visual one.
	     */
	    container: _react2.default.PropTypes.oneOfType([_componentOrElement2.default, _react2.default.PropTypes.func]),
	
	    /**
	     * A callback fired when the Modal is opening.
	     */
	    onShow: _react2.default.PropTypes.func,
	
	    /**
	     * A callback fired when either the backdrop is clicked, or the escape key is pressed.
	     *
	     * The `onHide` callback only signals intent from the Modal,
	     * you must actually set the `show` prop to `false` for the Modal to close.
	     */
	    onHide: _react2.default.PropTypes.func,
	
	    /**
	     * Include a backdrop component.
	     */
	    backdrop: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.bool, _react2.default.PropTypes.oneOf(['static'])]),
	
	    /**
	     * A callback fired when the escape key, if specified in `keyboard`, is pressed.
	     */
	    onEscapeKeyUp: _react2.default.PropTypes.func,
	
	    /**
	     * A callback fired when the backdrop, if specified, is clicked.
	     */
	    onBackdropClick: _react2.default.PropTypes.func,
	
	    /**
	     * A style object for the backdrop component.
	     */
	    backdropStyle: _react2.default.PropTypes.object,
	
	    /**
	     * A css class or classes for the backdrop component.
	     */
	    backdropClassName: _react2.default.PropTypes.string,
	
	    /**
	     * A css class or set of classes applied to the modal container when the modal is open,
	     * and removed when it is closed.
	     */
	    containerClassName: _react2.default.PropTypes.string,
	
	    /**
	     * Close the modal when escape key is pressed
	     */
	    keyboard: _react2.default.PropTypes.bool,
	
	    /**
	     * A `<Transition/>` component to use for the dialog and backdrop components.
	     */
	    transition: _elementType2.default,
	
	    /**
	     * The `timeout` of the dialog transition if specified. This number is used to ensure that
	     * transition callbacks are always fired, even if browser transition events are canceled.
	     *
	     * See the Transition `timeout` prop for more infomation.
	     */
	    dialogTransitionTimeout: _react2.default.PropTypes.number,
	
	    /**
	     * The `timeout` of the backdrop transition if specified. This number is used to
	     * ensure that transition callbacks are always fired, even if browser transition events are canceled.
	     *
	     * See the Transition `timeout` prop for more infomation.
	     */
	    backdropTransitionTimeout: _react2.default.PropTypes.number,
	
	    /**
	     * When `true` The modal will automatically shift focus to itself when it opens, and
	     * replace it to the last focused element when it closes. This also
	     * works correctly with any Modal children that have the `autoFocus` prop.
	     *
	     * Generally this should never be set to `false` as it makes the Modal less
	     * accessible to assistive technologies, like screen readers.
	     */
	    autoFocus: _react2.default.PropTypes.bool,
	
	    /**
	     * When `true` The modal will prevent focus from leaving the Modal while open.
	     *
	     * Generally this should never be set to `false` as it makes the Modal less
	     * accessible to assistive technologies, like screen readers.
	     */
	    enforceFocus: _react2.default.PropTypes.bool,
	
	    /**
	     * Callback fired before the Modal transitions in
	     */
	    onEnter: _react2.default.PropTypes.func,
	
	    /**
	     * Callback fired as the Modal begins to transition in
	     */
	    onEntering: _react2.default.PropTypes.func,
	
	    /**
	     * Callback fired after the Modal finishes transitioning in
	     */
	    onEntered: _react2.default.PropTypes.func,
	
	    /**
	     * Callback fired right before the Modal transitions out
	     */
	    onExit: _react2.default.PropTypes.func,
	
	    /**
	     * Callback fired as the Modal begins to transition out
	     */
	    onExiting: _react2.default.PropTypes.func,
	
	    /**
	     * Callback fired after the Modal finishes transitioning out
	     */
	    onExited: _react2.default.PropTypes.func
	
	  }),
	
	  getDefaultProps: function getDefaultProps() {
	    var noop = function noop() {};
	
	    return {
	      show: false,
	      backdrop: true,
	      keyboard: true,
	      autoFocus: true,
	      enforceFocus: true,
	      onHide: noop
	    };
	  },
	  getInitialState: function getInitialState() {
	    return { exited: !this.props.show };
	  },
	  render: function render() {
	    var _props = this.props;
	    var show = _props.show;
	    var container = _props.container;
	    var children = _props.children;
	    var Transition = _props.transition;
	    var backdrop = _props.backdrop;
	    var dialogTransitionTimeout = _props.dialogTransitionTimeout;
	    var className = _props.className;
	    var style = _props.style;
	    var onExit = _props.onExit;
	    var onExiting = _props.onExiting;
	    var onEnter = _props.onEnter;
	    var onEntering = _props.onEntering;
	    var onEntered = _props.onEntered;
	
	
	    var dialog = _react2.default.Children.only(children);
	
	    var mountModal = show || Transition && !this.state.exited;
	    if (!mountModal) {
	      return null;
	    }
	
	    var _dialog$props = dialog.props;
	    var role = _dialog$props.role;
	    var tabIndex = _dialog$props.tabIndex;
	
	
	    if (role === undefined || tabIndex === undefined) {
	      dialog = (0, _react.cloneElement)(dialog, {
	        role: role === undefined ? 'document' : role,
	        tabIndex: tabIndex == null ? '-1' : tabIndex
	      });
	    }
	
	    if (Transition) {
	      dialog = _react2.default.createElement(
	        Transition,
	        {
	          transitionAppear: true,
	          unmountOnExit: true,
	          'in': show,
	          timeout: dialogTransitionTimeout,
	          onExit: onExit,
	          onExiting: onExiting,
	          onExited: this.handleHidden,
	          onEnter: onEnter,
	          onEntering: onEntering,
	          onEntered: onEntered
	        },
	        dialog
	      );
	    }
	
	    return _react2.default.createElement(
	      _Portal2.default,
	      {
	        ref: this.setMountNode,
	        container: container
	      },
	      _react2.default.createElement(
	        'div',
	        {
	          ref: 'modal',
	          role: role || 'dialog',
	          style: style,
	          className: className
	        },
	        backdrop && this.renderBackdrop(),
	        dialog
	      )
	    );
	  },
	  renderBackdrop: function renderBackdrop() {
	    var _props2 = this.props;
	    var Transition = _props2.transition;
	    var backdropTransitionTimeout = _props2.backdropTransitionTimeout;
	
	
	    var backdrop = _react2.default.createElement('div', { ref: 'backdrop',
	      style: this.props.backdropStyle,
	      className: this.props.backdropClassName,
	      onClick: this.handleBackdropClick
	    });
	
	    if (Transition) {
	      backdrop = _react2.default.createElement(
	        Transition,
	        { transitionAppear: true,
	          'in': this.props.show,
	          timeout: backdropTransitionTimeout
	        },
	        backdrop
	      );
	    }
	
	    return backdrop;
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.show) {
	      this.setState({ exited: false });
	    } else if (!nextProps.transition) {
	      // Otherwise let handleHidden take care of marking exited.
	      this.setState({ exited: true });
	    }
	  },
	  componentWillUpdate: function componentWillUpdate(nextProps) {
	    if (!this.props.show && nextProps.show) {
	      this.checkForFocus();
	    }
	  },
	  componentDidMount: function componentDidMount() {
	    if (this.props.show) {
	      this.onShow();
	    }
	  },
	  componentDidUpdate: function componentDidUpdate(prevProps) {
	    var transition = this.props.transition;
	
	
	    if (prevProps.show && !this.props.show && !transition) {
	      // Otherwise handleHidden will call this.
	      this.onHide();
	    } else if (!prevProps.show && this.props.show) {
	      this.onShow();
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    var _props3 = this.props;
	    var show = _props3.show;
	    var transition = _props3.transition;
	
	
	    if (show || transition && !this.state.exited) {
	      this.onHide();
	    }
	  },
	  onShow: function onShow() {
	    var doc = (0, _ownerDocument2.default)(this);
	    var container = (0, _getContainer2.default)(this.props.container, doc.body);
	
	    modalManager.add(this, container, this.props.containerClassName);
	
	    this._onDocumentKeyupListener = (0, _addEventListener2.default)(doc, 'keyup', this.handleDocumentKeyUp);
	
	    this._onFocusinListener = (0, _addFocusListener2.default)(this.enforceFocus);
	
	    this.focus();
	
	    if (this.props.onShow) {
	      this.props.onShow();
	    }
	  },
	  onHide: function onHide() {
	    modalManager.remove(this);
	
	    this._onDocumentKeyupListener.remove();
	
	    this._onFocusinListener.remove();
	
	    this.restoreLastFocus();
	  },
	  setMountNode: function setMountNode(ref) {
	    this.mountNode = ref ? ref.getMountNode() : ref;
	  },
	  handleHidden: function handleHidden() {
	    this.setState({ exited: true });
	    this.onHide();
	
	    if (this.props.onExited) {
	      var _props4;
	
	      (_props4 = this.props).onExited.apply(_props4, arguments);
	    }
	  },
	  handleBackdropClick: function handleBackdropClick(e) {
	    if (e.target !== e.currentTarget) {
	      return;
	    }
	
	    if (this.props.onBackdropClick) {
	      this.props.onBackdropClick(e);
	    }
	
	    if (this.props.backdrop === true) {
	      this.props.onHide();
	    }
	  },
	  handleDocumentKeyUp: function handleDocumentKeyUp(e) {
	    if (this.props.keyboard && e.keyCode === 27 && this.isTopModal()) {
	      if (this.props.onEscapeKeyUp) {
	        this.props.onEscapeKeyUp(e);
	      }
	      this.props.onHide();
	    }
	  },
	  checkForFocus: function checkForFocus() {
	    if (_inDOM2.default) {
	      this.lastFocus = (0, _activeElement2.default)();
	    }
	  },
	  focus: function focus() {
	    var autoFocus = this.props.autoFocus;
	    var modalContent = this.getDialogElement();
	    var current = (0, _activeElement2.default)((0, _ownerDocument2.default)(this));
	    var focusInModal = current && (0, _contains2.default)(modalContent, current);
	
	    if (modalContent && autoFocus && !focusInModal) {
	      this.lastFocus = current;
	
	      if (!modalContent.hasAttribute('tabIndex')) {
	        modalContent.setAttribute('tabIndex', -1);
	        (0, _warning2.default)(false, 'The modal content node does not accept focus. ' + 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".');
	      }
	
	      modalContent.focus();
	    }
	  },
	  restoreLastFocus: function restoreLastFocus() {
	    // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
	    if (this.lastFocus && this.lastFocus.focus) {
	      this.lastFocus.focus();
	      this.lastFocus = null;
	    }
	  },
	  enforceFocus: function enforceFocus() {
	    var enforceFocus = this.props.enforceFocus;
	
	
	    if (!enforceFocus || !this.isMounted() || !this.isTopModal()) {
	      return;
	    }
	
	    var active = (0, _activeElement2.default)((0, _ownerDocument2.default)(this));
	    var modal = this.getDialogElement();
	
	    if (modal && modal !== active && !(0, _contains2.default)(modal, active)) {
	      modal.focus();
	    }
	  },
	
	
	  //instead of a ref, which might conflict with one the parent applied.
	  getDialogElement: function getDialogElement() {
	    var node = this.refs.modal;
	    return node && node.lastChild;
	  },
	  isTopModal: function isTopModal() {
	    return modalManager.isTopModal(this);
	  }
	});
	
	Modal.manager = modalManager;
	
	exports.default = Modal;
	module.exports = exports['default'];

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _createChainableTypeChecker = __webpack_require__(175);
	
	var _createChainableTypeChecker2 = _interopRequireDefault(_createChainableTypeChecker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function validate(props, propName, componentName, location, propFullName) {
	  var propValue = props[propName];
	  var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
	
	  if (_react2.default.isValidElement(propValue)) {
	    return new Error('Invalid ' + location + ' `' + propFullName + '` of type ReactElement ' + ('supplied to `' + componentName + '`, expected a ReactComponent or a ') + 'DOMElement. You can usually obtain a ReactComponent or DOMElement ' + 'from a ReactElement by attaching a ref to it.');
	  }
	
	  if ((propType !== 'object' || typeof propValue.render !== 'function') && propValue.nodeType !== 1) {
	    return new Error('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected a ReactComponent or a ') + 'DOMElement.');
	  }
	
	  return null;
	}
	
	exports.default = (0, _createChainableTypeChecker2.default)(validate);

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _componentOrElement = __webpack_require__(261);
	
	var _componentOrElement2 = _interopRequireDefault(_componentOrElement);
	
	var _ownerDocument = __webpack_require__(226);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	var _getContainer = __webpack_require__(263);
	
	var _getContainer2 = _interopRequireDefault(_getContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
	 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
	 * The children of `<Portal/>` component will be appended to the `container` specified.
	 */
	var Portal = _react2.default.createClass({
	
	  displayName: 'Portal',
	
	  propTypes: {
	    /**
	     * A Node, Component instance, or function that returns either. The `container` will have the Portal children
	     * appended to it.
	     */
	    container: _react2.default.PropTypes.oneOfType([_componentOrElement2.default, _react2.default.PropTypes.func])
	  },
	
	  componentDidMount: function componentDidMount() {
	    this._renderOverlay();
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this._renderOverlay();
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (this._overlayTarget && nextProps.container !== this.props.container) {
	      this._portalContainerNode.removeChild(this._overlayTarget);
	      this._portalContainerNode = (0, _getContainer2.default)(nextProps.container, (0, _ownerDocument2.default)(this).body);
	      this._portalContainerNode.appendChild(this._overlayTarget);
	    }
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._unrenderOverlay();
	    this._unmountOverlayTarget();
	  },
	  _mountOverlayTarget: function _mountOverlayTarget() {
	    if (!this._overlayTarget) {
	      this._overlayTarget = document.createElement('div');
	      this._portalContainerNode = (0, _getContainer2.default)(this.props.container, (0, _ownerDocument2.default)(this).body);
	      this._portalContainerNode.appendChild(this._overlayTarget);
	    }
	  },
	  _unmountOverlayTarget: function _unmountOverlayTarget() {
	    if (this._overlayTarget) {
	      this._portalContainerNode.removeChild(this._overlayTarget);
	      this._overlayTarget = null;
	    }
	    this._portalContainerNode = null;
	  },
	  _renderOverlay: function _renderOverlay() {
	
	    var overlay = !this.props.children ? null : _react2.default.Children.only(this.props.children);
	
	    // Save reference for future access.
	    if (overlay !== null) {
	      this._mountOverlayTarget();
	      this._overlayInstance = _reactDom2.default.unstable_renderSubtreeIntoContainer(this, overlay, this._overlayTarget);
	    } else {
	      // Unrender if the component is null for transitions to null
	      this._unrenderOverlay();
	      this._unmountOverlayTarget();
	    }
	  },
	  _unrenderOverlay: function _unrenderOverlay() {
	    if (this._overlayTarget) {
	      _reactDom2.default.unmountComponentAtNode(this._overlayTarget);
	      this._overlayInstance = null;
	    }
	  },
	  render: function render() {
	    return null;
	  },
	  getMountNode: function getMountNode() {
	    return this._overlayTarget;
	  },
	  getOverlayDOMNode: function getOverlayDOMNode() {
	    if (!this.isMounted()) {
	      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
	    }
	
	    if (this._overlayInstance) {
	      if (this._overlayInstance.getWrappedDOMNode) {
	        return this._overlayInstance.getWrappedDOMNode();
	      } else {
	        return _reactDom2.default.findDOMNode(this._overlayInstance);
	      }
	    }
	
	    return null;
	  }
	});
	
	exports.default = Portal;
	module.exports = exports['default'];

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getContainer;
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getContainer(container, defaultContainer) {
	  container = typeof container === 'function' ? container() : container;
	  return _reactDom2.default.findDOMNode(container) || defaultContainer;
	}
	module.exports = exports['default'];

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _style = __webpack_require__(191);
	
	var _style2 = _interopRequireDefault(_style);
	
	var _class = __webpack_require__(265);
	
	var _class2 = _interopRequireDefault(_class);
	
	var _scrollbarSize = __webpack_require__(259);
	
	var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);
	
	var _isOverflowing = __webpack_require__(269);
	
	var _isOverflowing2 = _interopRequireDefault(_isOverflowing);
	
	var _manageAriaHidden = __webpack_require__(271);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function findIndexOf(arr, cb) {
	  var idx = -1;
	  arr.some(function (d, i) {
	    if (cb(d, i)) {
	      idx = i;
	      return true;
	    }
	  });
	  return idx;
	}
	
	function findContainer(data, modal) {
	  return findIndexOf(data, function (d) {
	    return d.modals.indexOf(modal) !== -1;
	  });
	}
	
	/**
	 * Proper state managment for containers and the modals in those containers.
	 *
	 * @internal Used by the Modal to ensure proper styling of containers.
	 */
	
	var ModalManager = function () {
	  function ModalManager() {
	    var hideSiblingNodes = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	    _classCallCheck(this, ModalManager);
	
	    this.hideSiblingNodes = hideSiblingNodes;
	    this.modals = [];
	    this.containers = [];
	    this.data = [];
	  }
	
	  _createClass(ModalManager, [{
	    key: 'add',
	    value: function add(modal, container, className) {
	      var modalIdx = this.modals.indexOf(modal);
	      var containerIdx = this.containers.indexOf(container);
	
	      if (modalIdx !== -1) {
	        return modalIdx;
	      }
	
	      modalIdx = this.modals.length;
	      this.modals.push(modal);
	
	      if (this.hideSiblingNodes) {
	        (0, _manageAriaHidden.hideSiblings)(container, modal.mountNode);
	      }
	
	      if (containerIdx !== -1) {
	        this.data[containerIdx].modals.push(modal);
	        return modalIdx;
	      }
	
	      var data = {
	        modals: [modal],
	        //right now only the first modal of a container will have its classes applied
	        classes: className ? className.split(/\s+/) : [],
	        //we are only interested in the actual `style` here becasue we will override it
	        style: {
	          overflow: container.style.overflow,
	          paddingRight: container.style.paddingRight
	        }
	      };
	
	      var style = { overflow: 'hidden' };
	
	      data.overflowing = (0, _isOverflowing2.default)(container);
	
	      if (data.overflowing) {
	        // use computed style, here to get the real padding
	        // to add our scrollbar width
	        style.paddingRight = parseInt((0, _style2.default)(container, 'paddingRight') || 0, 10) + (0, _scrollbarSize2.default)() + 'px';
	      }
	
	      (0, _style2.default)(container, style);
	
	      data.classes.forEach(_class2.default.addClass.bind(null, container));
	
	      this.containers.push(container);
	      this.data.push(data);
	
	      return modalIdx;
	    }
	  }, {
	    key: 'remove',
	    value: function remove(modal) {
	      var modalIdx = this.modals.indexOf(modal);
	
	      if (modalIdx === -1) {
	        return;
	      }
	
	      var containerIdx = findContainer(this.data, modal);
	      var data = this.data[containerIdx];
	      var container = this.containers[containerIdx];
	
	      data.modals.splice(data.modals.indexOf(modal), 1);
	
	      this.modals.splice(modalIdx, 1);
	
	      // if that was the last modal in a container,
	      // clean up the container stylinhg.
	      if (data.modals.length === 0) {
	        Object.keys(data.style).forEach(function (key) {
	          return container.style[key] = data.style[key];
	        });
	
	        data.classes.forEach(_class2.default.removeClass.bind(null, container));
	
	        if (this.hideSiblingNodes) {
	          (0, _manageAriaHidden.showSiblings)(container, modal.mountNode);
	        }
	        this.containers.splice(containerIdx, 1);
	        this.data.splice(containerIdx, 1);
	      } else if (this.hideSiblingNodes) {
	        //otherwise make sure the next top modal is visible to a SR
	        (0, _manageAriaHidden.ariaHidden)(false, data.modals[data.modals.length - 1].mountNode);
	      }
	    }
	  }, {
	    key: 'isTopModal',
	    value: function isTopModal(modal) {
	      return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
	    }
	  }]);
	
	  return ModalManager;
	}();
	
	exports.default = ModalManager;
	module.exports = exports['default'];

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = {
	  addClass: __webpack_require__(266),
	  removeClass: __webpack_require__(268),
	  hasClass: __webpack_require__(267)
	};

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hasClass = __webpack_require__(267);
	
	module.exports = function addClass(element, className) {
	  if (element.classList) element.classList.add(className);else if (!hasClass(element)) element.className = element.className + ' ' + className;
	};

/***/ },
/* 267 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function hasClass(element, className) {
	  if (element.classList) return !!className && element.classList.contains(className);else return (' ' + element.className + ' ').indexOf(' ' + className + ' ') !== -1;
	};

/***/ },
/* 268 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function removeClass(element, className) {
	  if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
	};

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isOverflowing;
	
	var _isWindow = __webpack_require__(270);
	
	var _isWindow2 = _interopRequireDefault(_isWindow);
	
	var _ownerDocument = __webpack_require__(205);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isBody(node) {
	  return node && node.tagName.toLowerCase() === 'body';
	}
	
	function bodyIsOverflowing(node) {
	  var doc = (0, _ownerDocument2.default)(node);
	  var win = (0, _isWindow2.default)(doc);
	  var fullWidth = win.innerWidth;
	
	  // Support: ie8, no innerWidth
	  if (!fullWidth) {
	    var documentElementRect = doc.documentElement.getBoundingClientRect();
	    fullWidth = documentElementRect.right - Math.abs(documentElementRect.left);
	  }
	
	  return doc.body.clientWidth < fullWidth;
	}
	
	function isOverflowing(container) {
	  var win = (0, _isWindow2.default)(container);
	
	  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
	}
	module.exports = exports['default'];

/***/ },
/* 270 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function getWindow(node) {
	  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
	};

/***/ },
/* 271 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ariaHidden = ariaHidden;
	exports.hideSiblings = hideSiblings;
	exports.showSiblings = showSiblings;
	
	var BLACKLIST = ['template', 'script', 'style'];
	
	var isHidable = function isHidable(_ref) {
	  var nodeType = _ref.nodeType;
	  var tagName = _ref.tagName;
	  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
	};
	
	var siblings = function siblings(container, mount, cb) {
	  mount = [].concat(mount);
	
	  [].forEach.call(container.children, function (node) {
	    if (mount.indexOf(node) === -1 && isHidable(node)) {
	      cb(node);
	    }
	  });
	};
	
	function ariaHidden(show, node) {
	  if (!node) {
	    return;
	  }
	  if (show) {
	    node.setAttribute('aria-hidden', 'true');
	  } else {
	    node.removeAttribute('aria-hidden');
	  }
	}
	
	function hideSiblings(container, mountNode) {
	  siblings(container, mountNode, function (node) {
	    return ariaHidden(true, node);
	  });
	}
	
	function showSiblings(container, mountNode) {
	  siblings(container, mountNode, function (node) {
	    return ariaHidden(false, node);
	  });
	}

/***/ },
/* 272 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = addFocusListener;
	/**
	 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
	 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
	 *
	 * We only allow one Listener at a time to avoid stack overflows
	 */
	function addFocusListener(handler) {
	  var useFocusin = !document.addEventListener;
	  var remove = void 0;
	
	  if (useFocusin) {
	    document.attachEvent('onfocusin', handler);
	    remove = function remove() {
	      return document.detachEvent('onfocusin', handler);
	    };
	  } else {
	    document.addEventListener('focus', handler, true);
	    remove = function remove() {
	      return document.removeEventListener('focus', handler, true);
	    };
	  }
	
	  return { remove: remove };
	}
	module.exports = exports['default'];

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var ModalBody = function (_React$Component) {
	  (0, _inherits3['default'])(ModalBody, _React$Component);
	
	  function ModalBody() {
	    (0, _classCallCheck3['default'])(this, ModalBody);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  ModalBody.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement('div', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return ModalBody;
	}(_react2['default'].Component);
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('modal-body', ModalBody);
	module.exports = exports['default'];

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _StyleConfig = __webpack_require__(163);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * A css class to apply to the Modal dialog DOM node.
	   */
	  dialogClassName: _react2['default'].PropTypes.string
	};
	
	var ModalDialog = function (_React$Component) {
	  (0, _inherits3['default'])(ModalDialog, _React$Component);
	
	  function ModalDialog() {
	    (0, _classCallCheck3['default'])(this, ModalDialog);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  ModalDialog.prototype.render = function render() {
	    var _extends2;
	
	    var _props = this.props;
	    var dialogClassName = _props.dialogClassName;
	    var className = _props.className;
	    var style = _props.style;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['dialogClassName', 'className', 'style', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var bsClassName = (0, _bootstrapUtils.prefix)(bsProps);
	
	    var modalStyle = (0, _extends4['default'])({ display: 'block' }, style);
	
	    var dialogClasses = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[bsClassName] = false, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'dialog')] = true, _extends2));
	
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends4['default'])({}, elementProps, {
	        tabIndex: '-1',
	        role: 'dialog',
	        style: modalStyle,
	        className: (0, _classnames2['default'])(className, bsClassName)
	      }),
	      _react2['default'].createElement(
	        'div',
	        { className: (0, _classnames2['default'])(dialogClassName, dialogClasses) },
	        _react2['default'].createElement(
	          'div',
	          { className: (0, _bootstrapUtils.prefix)(bsProps, 'content'), role: 'document' },
	          children
	        )
	      )
	    );
	  };
	
	  return ModalDialog;
	}(_react2['default'].Component);
	
	ModalDialog.propTypes = propTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('modal', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], ModalDialog));
	module.exports = exports['default'];

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var ModalFooter = function (_React$Component) {
	  (0, _inherits3['default'])(ModalFooter, _React$Component);
	
	  function ModalFooter() {
	    (0, _classCallCheck3['default'])(this, ModalFooter);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  ModalFooter.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement('div', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return ModalFooter;
	}(_react2['default'].Component);
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('modal-footer', ModalFooter);
	module.exports = exports['default'];

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// TODO: `aria-label` should be `closeLabel`.
	
	var propTypes = {
	  /**
	   * The 'aria-label' attribute provides an accessible label for the close
	   * button. It is used for Assistive Technology when the label text is not
	   * readable.
	   */
	  'aria-label': _react2['default'].PropTypes.string,
	
	  /**
	   * Specify whether the Component should contain a close button
	   */
	  closeButton: _react2['default'].PropTypes.bool,
	
	  /**
	   * A Callback fired when the close button is clicked. If used directly inside
	   * a Modal component, the onHide will automatically be propagated up to the
	   * parent Modal `onHide`.
	   */
	  onHide: _react2['default'].PropTypes.func
	};
	
	var defaultProps = {
	  'aria-label': 'Close',
	  closeButton: false
	};
	
	var contextTypes = {
	  $bs_modal: _react2['default'].PropTypes.shape({
	    onHide: _react2['default'].PropTypes.func
	  })
	};
	
	var ModalHeader = function (_React$Component) {
	  (0, _inherits3['default'])(ModalHeader, _React$Component);
	
	  function ModalHeader() {
	    (0, _classCallCheck3['default'])(this, ModalHeader);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  ModalHeader.prototype.render = function render() {
	    var _props = this.props;
	    var label = _props['aria-label'];
	    var closeButton = _props.closeButton;
	    var onHide = _props.onHide;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['aria-label', 'closeButton', 'onHide', 'className', 'children']);
	
	
	    var modal = this.context.$bs_modal;
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends3['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      closeButton && _react2['default'].createElement(
	        'button',
	        {
	          type: 'button',
	          className: 'close',
	          'aria-label': label,
	          onClick: (0, _createChainedFunction2['default'])(modal.onHide, onHide)
	        },
	        _react2['default'].createElement(
	          'span',
	          { 'aria-hidden': 'true' },
	          '×'
	        )
	      ),
	      children
	    );
	  };
	
	  return ModalHeader;
	}(_react2['default'].Component);
	
	ModalHeader.propTypes = propTypes;
	ModalHeader.defaultProps = defaultProps;
	ModalHeader.contextTypes = contextTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('modal-header', ModalHeader);
	module.exports = exports['default'];

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var ModalTitle = function (_React$Component) {
	  (0, _inherits3['default'])(ModalTitle, _React$Component);
	
	  function ModalTitle() {
	    (0, _classCallCheck3['default'])(this, ModalTitle);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  ModalTitle.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement('h4', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return ModalTitle;
	}(_react2['default'].Component);
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('modal-title', ModalTitle);
	module.exports = exports['default'];

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _keycode = __webpack_require__(207);
	
	var _keycode2 = _interopRequireDefault(_keycode);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _all = __webpack_require__(178);
	
	var _all2 = _interopRequireDefault(_all);
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	var _ValidComponentChildren = __webpack_require__(165);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// TODO: Should we expose `<NavItem>` as `<Nav.Item>`?
	
	// TODO: This `bsStyle` is very unlike the others. Should we rename it?
	
	// TODO: `pullRight` and `pullLeft` don't render right outside of `navbar`.
	// Consider renaming or replacing them.
	
	var propTypes = {
	  /**
	   * Marks the NavItem with a matching `eventKey` as active. Has a
	   * higher precedence over `activeHref`.
	   */
	  activeKey: _react2['default'].PropTypes.any,
	
	  /**
	   * Marks the child NavItem with a matching `href` prop as active.
	   */
	  activeHref: _react2['default'].PropTypes.string,
	
	  /**
	   * NavItems are be positioned vertically.
	   */
	  stacked: _react2['default'].PropTypes.bool,
	
	  justified: (0, _all2['default'])(_react2['default'].PropTypes.bool, function (_ref) {
	    var justified = _ref.justified;
	    var navbar = _ref.navbar;
	    return justified && navbar ? Error('justified navbar `Nav`s are not supported') : null;
	  }),
	
	  /**
	   * A callback fired when a NavItem is selected.
	   *
	   * ```js
	   * function (
	   * 	Any eventKey,
	   * 	SyntheticEvent event?
	   * )
	   * ```
	   */
	  onSelect: _react2['default'].PropTypes.func,
	
	  /**
	   * ARIA role for the Nav, in the context of a TabContainer, the default will
	   * be set to "tablist", but can be overridden by the Nav when set explicitly.
	   *
	   * When the role is set to "tablist" NavItem focus is managed according to
	   * the ARIA authoring practices for tabs:
	   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
	   */
	  role: _react2['default'].PropTypes.string,
	
	  /**
	   * Apply styling an alignment for use in a Navbar. This prop will be set
	   * automatically when the Nav is used inside a Navbar.
	   */
	  navbar: _react2['default'].PropTypes.bool,
	
	  /**
	   * Float the Nav to the right. When `navbar` is `true` the appropriate
	   * contextual classes are added as well.
	   */
	  pullRight: _react2['default'].PropTypes.bool,
	
	  /**
	   * Float the Nav to the left. When `navbar` is `true` the appropriate
	   * contextual classes are added as well.
	   */
	  pullLeft: _react2['default'].PropTypes.bool
	};
	
	var defaultProps = {
	  justified: false,
	  pullRight: false,
	  pullLeft: false,
	  stacked: false
	};
	
	var contextTypes = {
	  $bs_navbar: _react2['default'].PropTypes.shape({
	    bsClass: _react2['default'].PropTypes.string
	  }),
	
	  $bs_tabContainer: _react2['default'].PropTypes.shape({
	    activeKey: _react2['default'].PropTypes.any,
	    onSelect: _react2['default'].PropTypes.func.isRequired,
	    getTabId: _react2['default'].PropTypes.func.isRequired,
	    getPaneId: _react2['default'].PropTypes.func.isRequired
	  })
	};
	
	var Nav = function (_React$Component) {
	  (0, _inherits3['default'])(Nav, _React$Component);
	
	  function Nav() {
	    (0, _classCallCheck3['default'])(this, Nav);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Nav.prototype.componentDidUpdate = function componentDidUpdate() {
	    var _this2 = this;
	
	    if (!this._needsRefocus) {
	      return;
	    }
	
	    this._needsRefocus = false;
	
	    var children = this.props.children;
	
	    var _getActiveProps = this.getActiveProps();
	
	    var activeKey = _getActiveProps.activeKey;
	    var activeHref = _getActiveProps.activeHref;
	
	
	    var activeChild = _ValidComponentChildren2['default'].find(children, function (child) {
	      return _this2.isActive(child, activeKey, activeHref);
	    });
	
	    var childrenArray = _ValidComponentChildren2['default'].toArray(children);
	    var activeChildIndex = childrenArray.indexOf(activeChild);
	
	    var childNodes = _reactDom2['default'].findDOMNode(this).children;
	    var activeNode = childNodes && childNodes[activeChildIndex];
	
	    if (!activeNode || !activeNode.firstChild) {
	      return;
	    }
	
	    activeNode.firstChild.focus();
	  };
	
	  Nav.prototype.handleTabKeyDown = function handleTabKeyDown(onSelect, event) {
	    var nextActiveChild = void 0;
	
	    switch (event.keyCode) {
	      case _keycode2['default'].codes.left:
	      case _keycode2['default'].codes.up:
	        nextActiveChild = this.getNextActiveChild(-1);
	        break;
	      case _keycode2['default'].codes.right:
	      case _keycode2['default'].codes.down:
	        nextActiveChild = this.getNextActiveChild(1);
	        break;
	      default:
	        // It was a different key; don't handle this keypress.
	        return;
	    }
	
	    event.preventDefault();
	
	    if (onSelect && nextActiveChild && nextActiveChild.props.eventKey) {
	      onSelect(nextActiveChild.props.eventKey);
	    }
	
	    this._needsRefocus = true;
	  };
	
	  Nav.prototype.getNextActiveChild = function getNextActiveChild(offset) {
	    var _this3 = this;
	
	    var children = this.props.children;
	
	    var validChildren = children.filter(function (child) {
	      return child.props.eventKey && !child.props.disabled;
	    });
	
	    var _getActiveProps2 = this.getActiveProps();
	
	    var activeKey = _getActiveProps2.activeKey;
	    var activeHref = _getActiveProps2.activeHref;
	
	
	    var activeChild = _ValidComponentChildren2['default'].find(children, function (child) {
	      return _this3.isActive(child, activeKey, activeHref);
	    });
	
	    // This assumes the active child is not disabled.
	    var activeChildIndex = validChildren.indexOf(activeChild);
	    if (activeChildIndex === -1) {
	      // Something has gone wrong. Select the first valid child we can find.
	      return validChildren[0];
	    }
	
	    var nextIndex = activeChildIndex + offset;
	    var numValidChildren = validChildren.length;
	
	    if (nextIndex >= numValidChildren) {
	      nextIndex = 0;
	    } else if (nextIndex < 0) {
	      nextIndex = numValidChildren - 1;
	    }
	
	    return validChildren[nextIndex];
	  };
	
	  Nav.prototype.getActiveProps = function getActiveProps() {
	    var tabContainer = this.context.$bs_tabContainer;
	
	    if (tabContainer) {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(this.props.activeKey == null && !this.props.activeHref, 'Specifying a `<Nav>` `activeKey` or `activeHref` in the context of ' + 'a `<TabContainer>` is not supported. Instead use `<TabContainer ' + ('activeKey={' + this.props.activeKey + '} />`.')) : void 0;
	
	      return tabContainer;
	    }
	
	    return this.props;
	  };
	
	  Nav.prototype.isActive = function isActive(_ref2, activeKey, activeHref) {
	    var props = _ref2.props;
	
	    if (props.active || activeKey != null && props.eventKey === activeKey || activeHref && props.href === activeHref) {
	      return true;
	    }
	
	    return props.active;
	  };
	
	  Nav.prototype.getTabProps = function getTabProps(child, tabContainer, navRole, active, onSelect) {
	    var _this4 = this;
	
	    if (!tabContainer && navRole !== 'tablist') {
	      // No tab props here.
	      return null;
	    }
	
	    var _child$props = child.props;
	    var id = _child$props.id;
	    var controls = _child$props['aria-controls'];
	    var eventKey = _child$props.eventKey;
	    var role = _child$props.role;
	    var onKeyDown = _child$props.onKeyDown;
	    var tabIndex = _child$props.tabIndex;
	
	
	    if (tabContainer) {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(!id && !controls, 'In the context of a `<TabContainer>`, `<NavItem>`s are given ' + 'generated `id` and `aria-controls` attributes for the sake of ' + 'proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly, provide a `generateChildId` ' + 'prop to the parent `<TabContainer>`.') : void 0;
	
	      id = tabContainer.getTabId(eventKey);
	      controls = tabContainer.getPaneId(eventKey);
	    }
	
	    if (navRole === 'tablist') {
	      role = role || 'tab';
	      onKeyDown = (0, _createChainedFunction2['default'])(function (event) {
	        return _this4.handleTabKeyDown(onSelect, event);
	      }, onKeyDown);
	      tabIndex = active ? tabIndex : -1;
	    }
	
	    return {
	      id: id,
	      role: role,
	      onKeyDown: onKeyDown,
	      'aria-controls': controls,
	      tabIndex: tabIndex
	    };
	  };
	
	  Nav.prototype.render = function render() {
	    var _extends2,
	        _this5 = this;
	
	    var _props = this.props;
	    var stacked = _props.stacked;
	    var justified = _props.justified;
	    var onSelect = _props.onSelect;
	    var propsRole = _props.role;
	    var propsNavbar = _props.navbar;
	    var pullRight = _props.pullRight;
	    var pullLeft = _props.pullLeft;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['stacked', 'justified', 'onSelect', 'role', 'navbar', 'pullRight', 'pullLeft', 'className', 'children']);
	
	
	    var tabContainer = this.context.$bs_tabContainer;
	    var role = propsRole || (tabContainer ? 'tablist' : null);
	
	    var _getActiveProps3 = this.getActiveProps();
	
	    var activeKey = _getActiveProps3.activeKey;
	    var activeHref = _getActiveProps3.activeHref;
	
	    delete props.activeKey; // Accessed via this.getActiveProps().
	    delete props.activeHref; // Accessed via this.getActiveProps().
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'stacked')] = stacked, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'justified')] = justified, _extends2));
	
	    var navbar = propsNavbar != null ? propsNavbar : this.context.$bs_navbar;
	    var pullLeftClassName = void 0;
	    var pullRightClassName = void 0;
	
	    if (navbar) {
	      var navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };
	
	      classes[(0, _bootstrapUtils.prefix)(navbarProps, 'nav')] = true;
	
	      pullRightClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'right');
	      pullLeftClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'left');
	    } else {
	      pullRightClassName = 'pull-right';
	      pullLeftClassName = 'pull-left';
	    }
	
	    classes[pullRightClassName] = pullRight;
	    classes[pullLeftClassName] = pullLeft;
	
	    return _react2['default'].createElement(
	      'ul',
	      (0, _extends4['default'])({}, elementProps, {
	        role: role,
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      _ValidComponentChildren2['default'].map(children, function (child) {
	        var active = _this5.isActive(child, activeKey, activeHref);
	        var childOnSelect = (0, _createChainedFunction2['default'])(child.props.onSelect, onSelect, tabContainer && tabContainer.onSelect);
	
	        return (0, _react.cloneElement)(child, (0, _extends4['default'])({}, _this5.getTabProps(child, tabContainer, role, active, childOnSelect), {
	          active: active,
	          activeKey: activeKey,
	          activeHref: activeHref,
	          onSelect: childOnSelect
	        }));
	      })
	    );
	  };
	
	  return Nav;
	}(_react2['default'].Component);
	
	Nav.propTypes = propTypes;
	Nav.defaultProps = defaultProps;
	Nav.contextTypes = contextTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('nav', (0, _bootstrapUtils.bsStyles)(['tabs', 'pills'], Nav));
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _uncontrollable = __webpack_require__(209);
	
	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);
	
	var _Grid = __webpack_require__(237);
	
	var _Grid2 = _interopRequireDefault(_Grid);
	
	var _NavbarBrand = __webpack_require__(280);
	
	var _NavbarBrand2 = _interopRequireDefault(_NavbarBrand);
	
	var _NavbarCollapse = __webpack_require__(281);
	
	var _NavbarCollapse2 = _interopRequireDefault(_NavbarCollapse);
	
	var _NavbarHeader = __webpack_require__(282);
	
	var _NavbarHeader2 = _interopRequireDefault(_NavbarHeader);
	
	var _NavbarToggle = __webpack_require__(283);
	
	var _NavbarToggle2 = _interopRequireDefault(_NavbarToggle);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _StyleConfig = __webpack_require__(163);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * Create a fixed navbar along the top of the screen, that scrolls with the
	   * page
	   */
	  fixedTop: _react2['default'].PropTypes.bool,
	  /**
	   * Create a fixed navbar along the bottom of the screen, that scrolls with
	   * the page
	   */
	  fixedBottom: _react2['default'].PropTypes.bool,
	  /**
	   * Create a full-width navbar that scrolls away with the page
	   */
	  staticTop: _react2['default'].PropTypes.bool,
	  /**
	   * An alternative dark visual style for the Navbar
	   */
	  inverse: _react2['default'].PropTypes.bool,
	  /**
	   * Allow the Navbar to fluidly adjust to the page or container width, instead
	   * of at the predefined screen breakpoints
	   */
	  fluid: _react2['default'].PropTypes.bool,
	
	  /**
	   * Set a custom element for this component.
	   */
	  componentClass: _elementType2['default'],
	  /**
	   * A callback fired when the `<Navbar>` body collapses or expands. Fired when
	   * a `<Navbar.Toggle>` is clicked and called with the new `navExpanded`
	   * boolean value.
	   *
	   * @controllable navExpanded
	   */
	  onToggle: _react2['default'].PropTypes.func,
	
	  /**
	   * Explicitly set the visiblity of the navbar body
	   *
	   * @controllable onToggle
	   */
	  expanded: _react2['default'].PropTypes.bool,
	
	  role: _react2['default'].PropTypes.string
	}; // TODO: Remove this pragma once we upgrade eslint-config-airbnb.
	/* eslint-disable react/no-multi-comp */
	
	var defaultProps = {
	  componentClass: 'nav',
	  fixedTop: false,
	  fixedBottom: false,
	  staticTop: false,
	  inverse: false,
	  fluid: false
	};
	
	var childContextTypes = {
	  $bs_navbar: _react.PropTypes.shape({
	    bsClass: _react.PropTypes.string,
	    expanded: _react.PropTypes.bool,
	    onToggle: _react.PropTypes.func.isRequired
	  })
	};
	
	var Navbar = function (_React$Component) {
	  (0, _inherits3['default'])(Navbar, _React$Component);
	
	  function Navbar(props, context) {
	    (0, _classCallCheck3['default'])(this, Navbar);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleToggle = _this.handleToggle.bind(_this);
	    return _this;
	  }
	
	  Navbar.prototype.getChildContext = function getChildContext() {
	    var _props = this.props;
	    var bsClass = _props.bsClass;
	    var expanded = _props.expanded;
	
	
	    return {
	      $bs_navbar: {
	        bsClass: bsClass,
	        expanded: expanded,
	        onToggle: this.handleToggle
	      }
	    };
	  };
	
	  Navbar.prototype.handleToggle = function handleToggle() {
	    var _props2 = this.props;
	    var onToggle = _props2.onToggle;
	    var expanded = _props2.expanded;
	
	
	    onToggle(!expanded);
	  };
	
	  Navbar.prototype.render = function render() {
	    var _extends2;
	
	    var _props3 = this.props;
	    var Component = _props3.componentClass;
	    var fixedTop = _props3.fixedTop;
	    var fixedBottom = _props3.fixedBottom;
	    var staticTop = _props3.staticTop;
	    var inverse = _props3.inverse;
	    var fluid = _props3.fluid;
	    var className = _props3.className;
	    var children = _props3.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props3, ['componentClass', 'fixedTop', 'fixedBottom', 'staticTop', 'inverse', 'fluid', 'className', 'children']);
	
	    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['expanded', 'onToggle']);
	
	    var bsProps = _splitBsPropsAndOmit[0];
	    var elementProps = _splitBsPropsAndOmit[1];
	
	    // will result in some false positives but that seems better
	    // than false negatives. strict `undefined` check allows explicit
	    // "nulling" of the role if the user really doesn't want one
	
	    if (elementProps.role === undefined && Component !== 'nav') {
	      elementProps.role = 'navigation';
	    }
	
	    if (inverse) {
	      bsProps.bsStyle = _StyleConfig.Style.INVERSE;
	    }
	
	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'fixed-top')] = fixedTop, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'fixed-bottom')] = fixedBottom, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'static-top')] = staticTop, _extends2));
	
	    return _react2['default'].createElement(
	      Component,
	      (0, _extends4['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      _react2['default'].createElement(
	        _Grid2['default'],
	        { fluid: fluid },
	        children
	      )
	    );
	  };
	
	  return Navbar;
	}(_react2['default'].Component);
	
	Navbar.propTypes = propTypes;
	Navbar.defaultProps = defaultProps;
	Navbar.childContextTypes = childContextTypes;
	
	(0, _bootstrapUtils.bsClass)('navbar', Navbar);
	
	var UncontrollableNavbar = (0, _uncontrollable2['default'])(Navbar, { expanded: 'onToggle' });
	
	function createSimpleWrapper(tag, suffix, displayName) {
	  var Wrapper = function Wrapper(_ref, _ref2) {
	    var Component = _ref.componentClass;
	    var className = _ref.className;
	    var pullRight = _ref.pullRight;
	    var pullLeft = _ref.pullLeft;
	    var props = (0, _objectWithoutProperties3['default'])(_ref, ['componentClass', 'className', 'pullRight', 'pullLeft']);
	    var _ref2$$bs_navbar = _ref2.$bs_navbar;
	    var navbarProps = _ref2$$bs_navbar === undefined ? { bsClass: 'navbar' } : _ref2$$bs_navbar;
	    return _react2['default'].createElement(Component, (0, _extends4['default'])({}, props, {
	      className: (0, _classnames2['default'])(className, (0, _bootstrapUtils.prefix)(navbarProps, suffix), pullRight && (0, _bootstrapUtils.prefix)(navbarProps, 'right'), pullLeft && (0, _bootstrapUtils.prefix)(navbarProps, 'left'))
	    }));
	  };
	
	  Wrapper.displayName = displayName;
	
	  Wrapper.propTypes = {
	    componentClass: _elementType2['default'],
	    pullRight: _react2['default'].PropTypes.bool,
	    pullLeft: _react2['default'].PropTypes.bool
	  };
	
	  Wrapper.defaultProps = {
	    componentClass: tag,
	    pullRight: false,
	    pullLeft: false
	  };
	
	  Wrapper.contextTypes = {
	    $bs_navbar: _react.PropTypes.shape({
	      bsClass: _react.PropTypes.string
	    })
	  };
	
	  return Wrapper;
	}
	
	UncontrollableNavbar.Brand = _NavbarBrand2['default'];
	UncontrollableNavbar.Header = _NavbarHeader2['default'];
	UncontrollableNavbar.Toggle = _NavbarToggle2['default'];
	UncontrollableNavbar.Collapse = _NavbarCollapse2['default'];
	
	UncontrollableNavbar.Form = createSimpleWrapper('div', 'form', 'NavbarForm');
	UncontrollableNavbar.Text = createSimpleWrapper('p', 'text', 'NavbarText');
	UncontrollableNavbar.Link = createSimpleWrapper('a', 'link', 'NavbarLink');
	
	// Set bsStyles here so they can be overridden.
	exports['default'] = (0, _bootstrapUtils.bsStyles)([_StyleConfig.Style.DEFAULT, _StyleConfig.Style.INVERSE], _StyleConfig.Style.DEFAULT, UncontrollableNavbar);
	module.exports = exports['default'];

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var contextTypes = {
	  $bs_navbar: _react2['default'].PropTypes.shape({
	    bsClass: _react2['default'].PropTypes.string
	  })
	};
	
	var NavbarBrand = function (_React$Component) {
	  (0, _inherits3['default'])(NavbarBrand, _React$Component);
	
	  function NavbarBrand() {
	    (0, _classCallCheck3['default'])(this, NavbarBrand);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  NavbarBrand.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className', 'children']);
	
	    var navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };
	
	    var bsClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'brand');
	
	    if (_react2['default'].isValidElement(children)) {
	      return _react2['default'].cloneElement(children, {
	        className: (0, _classnames2['default'])(children.props.className, className, bsClassName)
	      });
	    }
	
	    return _react2['default'].createElement(
	      'span',
	      (0, _extends3['default'])({}, props, { className: (0, _classnames2['default'])(className, bsClassName) }),
	      children
	    );
	  };
	
	  return NavbarBrand;
	}(_react2['default'].Component);
	
	NavbarBrand.contextTypes = contextTypes;
	
	exports['default'] = NavbarBrand;
	module.exports = exports['default'];

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Collapse = __webpack_require__(190);
	
	var _Collapse2 = _interopRequireDefault(_Collapse);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var contextTypes = {
	  $bs_navbar: _react.PropTypes.shape({
	    bsClass: _react.PropTypes.string,
	    expanded: _react.PropTypes.bool
	  })
	};
	
	var NavbarCollapse = function (_React$Component) {
	  (0, _inherits3['default'])(NavbarCollapse, _React$Component);
	
	  function NavbarCollapse() {
	    (0, _classCallCheck3['default'])(this, NavbarCollapse);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  NavbarCollapse.prototype.render = function render() {
	    var _props = this.props;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['children']);
	
	    var navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };
	
	    var bsClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'collapse');
	
	    return _react2['default'].createElement(
	      _Collapse2['default'],
	      (0, _extends3['default'])({ 'in': navbarProps.expanded }, props),
	      _react2['default'].createElement(
	        'div',
	        { className: bsClassName },
	        children
	      )
	    );
	  };
	
	  return NavbarCollapse;
	}(_react2['default'].Component);
	
	NavbarCollapse.contextTypes = contextTypes;
	
	exports['default'] = NavbarCollapse;
	module.exports = exports['default'];

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var contextTypes = {
	  $bs_navbar: _react2['default'].PropTypes.shape({
	    bsClass: _react2['default'].PropTypes.string
	  })
	};
	
	var NavbarHeader = function (_React$Component) {
	  (0, _inherits3['default'])(NavbarHeader, _React$Component);
	
	  function NavbarHeader() {
	    (0, _classCallCheck3['default'])(this, NavbarHeader);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  NavbarHeader.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };
	
	    var bsClassName = (0, _bootstrapUtils.prefix)(navbarProps, 'header');
	
	    return _react2['default'].createElement('div', (0, _extends3['default'])({}, props, { className: (0, _classnames2['default'])(className, bsClassName) }));
	  };
	
	  return NavbarHeader;
	}(_react2['default'].Component);
	
	NavbarHeader.contextTypes = contextTypes;
	
	exports['default'] = NavbarHeader;
	module.exports = exports['default'];

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  onClick: _react.PropTypes.func,
	  /**
	   * The toggle content, if left empty it will render the default toggle (seen above).
	   */
	  children: _react.PropTypes.node
	};
	
	var contextTypes = {
	  $bs_navbar: _react.PropTypes.shape({
	    bsClass: _react.PropTypes.string,
	    expanded: _react.PropTypes.bool,
	    onToggle: _react.PropTypes.func.isRequired
	  })
	};
	
	var NavbarToggle = function (_React$Component) {
	  (0, _inherits3['default'])(NavbarToggle, _React$Component);
	
	  function NavbarToggle() {
	    (0, _classCallCheck3['default'])(this, NavbarToggle);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  NavbarToggle.prototype.render = function render() {
	    var _props = this.props;
	    var onClick = _props.onClick;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['onClick', 'className', 'children']);
	
	    var navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };
	
	    var buttonProps = (0, _extends3['default'])({
	      type: 'button'
	    }, props, {
	      onClick: (0, _createChainedFunction2['default'])(onClick, navbarProps.onToggle),
	      className: (0, _classnames2['default'])(className, (0, _bootstrapUtils.prefix)(navbarProps, 'toggle'), !navbarProps.expanded && 'collapsed')
	    });
	
	    if (children) {
	      return _react2['default'].createElement(
	        'button',
	        buttonProps,
	        children
	      );
	    }
	
	    return _react2['default'].createElement(
	      'button',
	      buttonProps,
	      _react2['default'].createElement(
	        'span',
	        { className: 'sr-only' },
	        'Toggle navigation'
	      ),
	      _react2['default'].createElement('span', { className: 'icon-bar' }),
	      _react2['default'].createElement('span', { className: 'icon-bar' }),
	      _react2['default'].createElement('span', { className: 'icon-bar' })
	    );
	  };
	
	  return NavbarToggle;
	}(_react2['default'].Component);
	
	NavbarToggle.propTypes = propTypes;
	NavbarToggle.contextTypes = contextTypes;
	
	exports['default'] = NavbarToggle;
	module.exports = exports['default'];

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Dropdown = __webpack_require__(203);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _splitComponentProps2 = __webpack_require__(230);
	
	var _splitComponentProps3 = _interopRequireDefault(_splitComponentProps2);
	
	var _ValidComponentChildren = __webpack_require__(165);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = (0, _extends3['default'])({}, _Dropdown2['default'].propTypes, {
	
	  // Toggle props.
	  title: _react2['default'].PropTypes.node.isRequired,
	  noCaret: _react2['default'].PropTypes.bool,
	  active: _react2['default'].PropTypes.bool,
	
	  // Override generated docs from <Dropdown>.
	  /**
	   * @private
	   */
	  children: _react2['default'].PropTypes.node
	});
	
	var NavDropdown = function (_React$Component) {
	  (0, _inherits3['default'])(NavDropdown, _React$Component);
	
	  function NavDropdown() {
	    (0, _classCallCheck3['default'])(this, NavDropdown);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  NavDropdown.prototype.isActive = function isActive(_ref, activeKey, activeHref) {
	    var props = _ref.props;
	
	    var _this2 = this;
	
	    if (props.active || activeKey != null && props.eventKey === activeKey || activeHref && props.href === activeHref) {
	      return true;
	    }
	
	    if (props.children) {
	      return _ValidComponentChildren2['default'].some(props.children, function (child) {
	        return _this2.isActive(child, activeKey, activeHref);
	      });
	    }
	
	    return props.active;
	  };
	
	  NavDropdown.prototype.render = function render() {
	    var _this3 = this;
	
	    var _props = this.props;
	    var title = _props.title;
	    var activeKey = _props.activeKey;
	    var activeHref = _props.activeHref;
	    var className = _props.className;
	    var style = _props.style;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['title', 'activeKey', 'activeHref', 'className', 'style', 'children']);
	
	
	    var active = this.isActive(this, activeKey, activeHref);
	    delete props.active; // Accessed via this.isActive().
	    delete props.eventKey; // Accessed via this.isActive().
	
	    var _splitComponentProps = (0, _splitComponentProps3['default'])(props, _Dropdown2['default'].ControlledComponent);
	
	    var dropdownProps = _splitComponentProps[0];
	    var toggleProps = _splitComponentProps[1];
	
	    // Unlike for the other dropdowns, styling needs to go to the `<Dropdown>`
	    // rather than the `<Dropdown.Toggle>`.
	
	    return _react2['default'].createElement(
	      _Dropdown2['default'],
	      (0, _extends3['default'])({}, dropdownProps, {
	        componentClass: 'li',
	        className: (0, _classnames2['default'])(className, { active: active }),
	        style: style
	      }),
	      _react2['default'].createElement(
	        _Dropdown2['default'].Toggle,
	        (0, _extends3['default'])({}, toggleProps, { useAnchor: true }),
	        title
	      ),
	      _react2['default'].createElement(
	        _Dropdown2['default'].Menu,
	        null,
	        _ValidComponentChildren2['default'].map(children, function (child) {
	          return _react2['default'].cloneElement(child, {
	            active: _this3.isActive(child, activeKey, activeHref)
	          });
	        })
	      )
	    );
	  };
	
	  return NavDropdown;
	}(_react2['default'].Component);
	
	NavDropdown.propTypes = propTypes;
	
	exports['default'] = NavDropdown;
	module.exports = exports['default'];

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SafeAnchor = __webpack_require__(173);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  active: _react2['default'].PropTypes.bool,
	  disabled: _react2['default'].PropTypes.bool,
	  role: _react2['default'].PropTypes.string,
	  href: _react2['default'].PropTypes.string,
	  onClick: _react2['default'].PropTypes.func,
	  onSelect: _react2['default'].PropTypes.func,
	  eventKey: _react2['default'].PropTypes.any
	};
	
	var defaultProps = {
	  active: false,
	  disabled: false
	};
	
	var NavItem = function (_React$Component) {
	  (0, _inherits3['default'])(NavItem, _React$Component);
	
	  function NavItem(props, context) {
	    (0, _classCallCheck3['default'])(this, NavItem);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleClick = _this.handleClick.bind(_this);
	    return _this;
	  }
	
	  NavItem.prototype.handleClick = function handleClick(e) {
	    if (this.props.onSelect) {
	      e.preventDefault();
	
	      if (!this.props.disabled) {
	        this.props.onSelect(this.props.eventKey, e);
	      }
	    }
	  };
	
	  NavItem.prototype.render = function render() {
	    var _props = this.props;
	    var active = _props.active;
	    var disabled = _props.disabled;
	    var onClick = _props.onClick;
	    var className = _props.className;
	    var style = _props.style;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['active', 'disabled', 'onClick', 'className', 'style']);
	
	
	    delete props.onSelect;
	    delete props.eventKey;
	
	    // These are injected down by `<Nav>` for building `<SubNav>`s.
	    delete props.activeKey;
	    delete props.activeHref;
	
	    if (!props.role) {
	      if (props.href === '#') {
	        props.role = 'button';
	      }
	    } else if (props.role === 'tab') {
	      props['aria-selected'] = active;
	    }
	
	    return _react2['default'].createElement(
	      'li',
	      {
	        role: 'presentation',
	        className: (0, _classnames2['default'])(className, { active: active, disabled: disabled }),
	        style: style
	      },
	      _react2['default'].createElement(_SafeAnchor2['default'], (0, _extends3['default'])({}, props, {
	        disabled: disabled,
	        onClick: (0, _createChainedFunction2['default'])(onClick, this.handleClick)
	      }))
	    );
	  };
	
	  return NavItem;
	}(_react2['default'].Component);
	
	NavItem.propTypes = propTypes;
	NavItem.defaultProps = defaultProps;
	
	exports['default'] = NavItem;
	module.exports = exports['default'];

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Overlay = __webpack_require__(287);
	
	var _Overlay2 = _interopRequireDefault(_Overlay);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _Fade = __webpack_require__(231);
	
	var _Fade2 = _interopRequireDefault(_Fade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = (0, _extends3['default'])({}, _Overlay2['default'].propTypes, {
	
	  /**
	   * Set the visibility of the Overlay
	   */
	  show: _react2['default'].PropTypes.bool,
	  /**
	   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
	   */
	  rootClose: _react2['default'].PropTypes.bool,
	  /**
	   * A callback invoked by the overlay when it wishes to be hidden. Required if
	   * `rootClose` is specified.
	   */
	  onHide: _react2['default'].PropTypes.func,
	
	  /**
	   * Use animation
	   */
	  animation: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _elementType2['default']]),
	
	  /**
	   * Callback fired before the Overlay transitions in
	   */
	  onEnter: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired as the Overlay begins to transition in
	   */
	  onEntering: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired after the Overlay finishes transitioning in
	   */
	  onEntered: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired right before the Overlay transitions out
	   */
	  onExit: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired as the Overlay begins to transition out
	   */
	  onExiting: _react2['default'].PropTypes.func,
	
	  /**
	   * Callback fired after the Overlay finishes transitioning out
	   */
	  onExited: _react2['default'].PropTypes.func
	});
	
	var defaultProps = {
	  animation: _Fade2['default'],
	  rootClose: false,
	  show: false
	};
	
	var Overlay = function (_React$Component) {
	  (0, _inherits3['default'])(Overlay, _React$Component);
	
	  function Overlay() {
	    (0, _classCallCheck3['default'])(this, Overlay);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Overlay.prototype.render = function render() {
	    var _props = this.props;
	    var animation = _props.animation;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['animation', 'children']);
	
	
	    var transition = animation === true ? _Fade2['default'] : animation || null;
	
	    var child = void 0;
	
	    if (!transition) {
	      child = (0, _react.cloneElement)(children, {
	        className: (0, _classnames2['default'])(children.props.className, 'in')
	      });
	    } else {
	      child = children;
	    }
	
	    return _react2['default'].createElement(
	      _Overlay2['default'],
	      (0, _extends3['default'])({}, props, {
	        transition: transition
	      }),
	      child
	    );
	  };
	
	  return Overlay;
	}(_react2['default'].Component);
	
	Overlay.propTypes = propTypes;
	Overlay.defaultProps = defaultProps;
	
	exports['default'] = Overlay;
	module.exports = exports['default'];

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Portal = __webpack_require__(262);
	
	var _Portal2 = _interopRequireDefault(_Portal);
	
	var _Position = __webpack_require__(288);
	
	var _Position2 = _interopRequireDefault(_Position);
	
	var _RootCloseWrapper = __webpack_require__(222);
	
	var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Built on top of `<Position/>` and `<Portal/>`, the overlay component is great for custom tooltip overlays.
	 */
	var Overlay = function (_React$Component) {
	  _inherits(Overlay, _React$Component);
	
	  function Overlay(props, context) {
	    _classCallCheck(this, Overlay);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Overlay).call(this, props, context));
	
	    _this.state = { exited: !props.show };
	    _this.onHiddenListener = _this.handleHidden.bind(_this);
	    return _this;
	  }
	
	  _createClass(Overlay, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (nextProps.show) {
	        this.setState({ exited: false });
	      } else if (!nextProps.transition) {
	        // Otherwise let handleHidden take care of marking exited.
	        this.setState({ exited: true });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var container = _props.container;
	      var containerPadding = _props.containerPadding;
	      var target = _props.target;
	      var placement = _props.placement;
	      var shouldUpdatePosition = _props.shouldUpdatePosition;
	      var rootClose = _props.rootClose;
	      var children = _props.children;
	      var Transition = _props.transition;
	
	      var props = _objectWithoutProperties(_props, ['container', 'containerPadding', 'target', 'placement', 'shouldUpdatePosition', 'rootClose', 'children', 'transition']);
	
	      // Don't un-render the overlay while it's transitioning out.
	
	
	      var mountOverlay = props.show || Transition && !this.state.exited;
	      if (!mountOverlay) {
	        // Don't bother showing anything if we don't have to.
	        return null;
	      }
	
	      var child = children;
	
	      // Position is be inner-most because it adds inline styles into the child,
	      // which the other wrappers don't forward correctly.
	      child = _react2.default.createElement(
	        _Position2.default,
	        { container: container, containerPadding: containerPadding, target: target, placement: placement, shouldUpdatePosition: shouldUpdatePosition },
	        child
	      );
	
	      if (Transition) {
	        var onExit = props.onExit;
	        var onExiting = props.onExiting;
	        var onEnter = props.onEnter;
	        var onEntering = props.onEntering;
	        var onEntered = props.onEntered;
	
	        // This animates the child node by injecting props, so it must precede
	        // anything that adds a wrapping div.
	
	        child = _react2.default.createElement(
	          Transition,
	          {
	            'in': props.show,
	            transitionAppear: true,
	            onExit: onExit,
	            onExiting: onExiting,
	            onExited: this.onHiddenListener,
	            onEnter: onEnter,
	            onEntering: onEntering,
	            onEntered: onEntered
	          },
	          child
	        );
	      }
	
	      // This goes after everything else because it adds a wrapping div.
	      if (rootClose) {
	        child = _react2.default.createElement(
	          _RootCloseWrapper2.default,
	          { onRootClose: props.onHide },
	          child
	        );
	      }
	
	      return _react2.default.createElement(
	        _Portal2.default,
	        { container: container },
	        child
	      );
	    }
	  }, {
	    key: 'handleHidden',
	    value: function handleHidden() {
	      this.setState({ exited: true });
	
	      if (this.props.onExited) {
	        var _props2;
	
	        (_props2 = this.props).onExited.apply(_props2, arguments);
	      }
	    }
	  }]);
	
	  return Overlay;
	}(_react2.default.Component);
	
	Overlay.propTypes = _extends({}, _Portal2.default.propTypes, _Position2.default.propTypes, {
	
	  /**
	   * Set the visibility of the Overlay
	   */
	  show: _react2.default.PropTypes.bool,
	
	  /**
	   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
	   */
	  rootClose: _react2.default.PropTypes.bool,
	
	  /**
	   * A Callback fired by the Overlay when it wishes to be hidden.
	   *
	   * __required__ when `rootClose` is `true`.
	   *
	   * @type func
	   */
	  onHide: function onHide(props) {
	    var propType = _react2.default.PropTypes.func;
	    if (props.rootClose) {
	      propType = propType.isRequired;
	    }
	
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }
	
	    return propType.apply(undefined, [props].concat(args));
	  },
	
	
	  /**
	   * A `<Transition/>` component used to animate the overlay changes visibility.
	   */
	  transition: _elementType2.default,
	
	  /**
	   * Callback fired before the Overlay transitions in
	   */
	  onEnter: _react2.default.PropTypes.func,
	
	  /**
	   * Callback fired as the Overlay begins to transition in
	   */
	  onEntering: _react2.default.PropTypes.func,
	
	  /**
	   * Callback fired after the Overlay finishes transitioning in
	   */
	  onEntered: _react2.default.PropTypes.func,
	
	  /**
	   * Callback fired right before the Overlay transitions out
	   */
	  onExit: _react2.default.PropTypes.func,
	
	  /**
	   * Callback fired as the Overlay begins to transition out
	   */
	  onExiting: _react2.default.PropTypes.func,
	
	  /**
	   * Callback fired after the Overlay finishes transitioning out
	   */
	  onExited: _react2.default.PropTypes.func
	});
	
	exports.default = Overlay;
	module.exports = exports['default'];

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _componentOrElement = __webpack_require__(261);
	
	var _componentOrElement2 = _interopRequireDefault(_componentOrElement);
	
	var _calculatePosition = __webpack_require__(289);
	
	var _calculatePosition2 = _interopRequireDefault(_calculatePosition);
	
	var _getContainer = __webpack_require__(263);
	
	var _getContainer2 = _interopRequireDefault(_getContainer);
	
	var _ownerDocument = __webpack_require__(226);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * The Position component calculates the coordinates for its child, to position
	 * it relative to a `target` component or node. Useful for creating callouts
	 * and tooltips, the Position component injects a `style` props with `left` and
	 * `top` values for positioning your component.
	 *
	 * It also injects "arrow" `left`, and `top` values for styling callout arrows
	 * for giving your components a sense of directionality.
	 */
	var Position = function (_React$Component) {
	  _inherits(Position, _React$Component);
	
	  function Position(props, context) {
	    _classCallCheck(this, Position);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Position).call(this, props, context));
	
	    _this.state = {
	      positionLeft: 0,
	      positionTop: 0,
	      arrowOffsetLeft: null,
	      arrowOffsetTop: null
	    };
	
	    _this._needsFlush = false;
	    _this._lastTarget = null;
	    return _this;
	  }
	
	  _createClass(Position, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.updatePosition(this.getTarget());
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      this._needsFlush = true;
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps) {
	      if (this._needsFlush) {
	        this._needsFlush = false;
	        this.maybeUpdatePosition(this.props.placement !== prevProps.placement);
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var children = _props.children;
	      var className = _props.className;
	
	      var props = _objectWithoutProperties(_props, ['children', 'className']);
	
	      var _state = this.state;
	      var positionLeft = _state.positionLeft;
	      var positionTop = _state.positionTop;
	
	      var arrowPosition = _objectWithoutProperties(_state, ['positionLeft', 'positionTop']);
	
	      // These should not be forwarded to the child.
	
	
	      delete props.target;
	      delete props.container;
	      delete props.containerPadding;
	      delete props.shouldUpdatePosition;
	
	      var child = _react2.default.Children.only(children);
	      return (0, _react.cloneElement)(child, _extends({}, props, arrowPosition, {
	        // FIXME: Don't forward `positionLeft` and `positionTop` via both props
	        // and `props.style`.
	        positionLeft: positionLeft,
	        positionTop: positionTop,
	        className: (0, _classnames2.default)(className, child.props.className),
	        style: _extends({}, child.props.style, {
	          left: positionLeft,
	          top: positionTop
	        })
	      }));
	    }
	  }, {
	    key: 'getTarget',
	    value: function getTarget() {
	      var target = this.props.target;
	
	      var targetElement = typeof target === 'function' ? target() : target;
	      return targetElement && _reactDom2.default.findDOMNode(targetElement) || null;
	    }
	  }, {
	    key: 'maybeUpdatePosition',
	    value: function maybeUpdatePosition(placementChanged) {
	      var target = this.getTarget();
	
	      if (!this.props.shouldUpdatePosition && target === this._lastTarget && !placementChanged) {
	        return;
	      }
	
	      this.updatePosition(target);
	    }
	  }, {
	    key: 'updatePosition',
	    value: function updatePosition(target) {
	      this._lastTarget = target;
	
	      if (!target) {
	        this.setState({
	          positionLeft: 0,
	          positionTop: 0,
	          arrowOffsetLeft: null,
	          arrowOffsetTop: null
	        });
	
	        return;
	      }
	
	      var overlay = _reactDom2.default.findDOMNode(this);
	      var container = (0, _getContainer2.default)(this.props.container, (0, _ownerDocument2.default)(this).body);
	
	      this.setState((0, _calculatePosition2.default)(this.props.placement, overlay, target, container, this.props.containerPadding));
	    }
	  }]);
	
	  return Position;
	}(_react2.default.Component);
	
	Position.propTypes = {
	  /**
	   * A node, element, or function that returns either. The child will be
	   * be positioned next to the `target` specified.
	   */
	  target: _react2.default.PropTypes.oneOfType([_componentOrElement2.default, _react2.default.PropTypes.func]),
	
	  /**
	   * "offsetParent" of the component
	   */
	  container: _react2.default.PropTypes.oneOfType([_componentOrElement2.default, _react2.default.PropTypes.func]),
	  /**
	   * Minimum spacing in pixels between container border and component border
	   */
	  containerPadding: _react2.default.PropTypes.number,
	  /**
	   * How to position the component relative to the target
	   */
	  placement: _react2.default.PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	  /**
	   * Whether the position should be changed on each update
	   */
	  shouldUpdatePosition: _react2.default.PropTypes.bool
	};
	
	Position.displayName = 'Position';
	
	Position.defaultProps = {
	  containerPadding: 0,
	  placement: 'right',
	  shouldUpdatePosition: false
	};
	
	exports.default = Position;
	module.exports = exports['default'];

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = calculatePosition;
	
	var _offset = __webpack_require__(290);
	
	var _offset2 = _interopRequireDefault(_offset);
	
	var _position = __webpack_require__(291);
	
	var _position2 = _interopRequireDefault(_position);
	
	var _scrollTop = __webpack_require__(293);
	
	var _scrollTop2 = _interopRequireDefault(_scrollTop);
	
	var _ownerDocument = __webpack_require__(226);
	
	var _ownerDocument2 = _interopRequireDefault(_ownerDocument);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getContainerDimensions(containerNode) {
	  var width = void 0,
	      height = void 0,
	      scroll = void 0;
	
	  if (containerNode.tagName === 'BODY') {
	    width = window.innerWidth;
	    height = window.innerHeight;
	
	    scroll = (0, _scrollTop2.default)((0, _ownerDocument2.default)(containerNode).documentElement) || (0, _scrollTop2.default)(containerNode);
	  } else {
	    var _getOffset = (0, _offset2.default)(containerNode);
	
	    width = _getOffset.width;
	    height = _getOffset.height;
	
	    scroll = (0, _scrollTop2.default)(containerNode);
	  }
	
	  return { width: width, height: height, scroll: scroll };
	}
	
	function getTopDelta(top, overlayHeight, container, padding) {
	  var containerDimensions = getContainerDimensions(container);
	  var containerScroll = containerDimensions.scroll;
	  var containerHeight = containerDimensions.height;
	
	  var topEdgeOffset = top - padding - containerScroll;
	  var bottomEdgeOffset = top + padding - containerScroll + overlayHeight;
	
	  if (topEdgeOffset < 0) {
	    return -topEdgeOffset;
	  } else if (bottomEdgeOffset > containerHeight) {
	    return containerHeight - bottomEdgeOffset;
	  } else {
	    return 0;
	  }
	}
	
	function getLeftDelta(left, overlayWidth, container, padding) {
	  var containerDimensions = getContainerDimensions(container);
	  var containerWidth = containerDimensions.width;
	
	  var leftEdgeOffset = left - padding;
	  var rightEdgeOffset = left + padding + overlayWidth;
	
	  if (leftEdgeOffset < 0) {
	    return -leftEdgeOffset;
	  } else if (rightEdgeOffset > containerWidth) {
	    return containerWidth - rightEdgeOffset;
	  }
	
	  return 0;
	}
	
	function calculatePosition(placement, overlayNode, target, container, padding) {
	  var childOffset = container.tagName === 'BODY' ? (0, _offset2.default)(target) : (0, _position2.default)(target, container);
	
	  var _getOffset2 = (0, _offset2.default)(overlayNode);
	
	  var overlayHeight = _getOffset2.height;
	  var overlayWidth = _getOffset2.width;
	
	
	  var positionLeft = void 0,
	      positionTop = void 0,
	      arrowOffsetLeft = void 0,
	      arrowOffsetTop = void 0;
	
	  if (placement === 'left' || placement === 'right') {
	    positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;
	
	    if (placement === 'left') {
	      positionLeft = childOffset.left - overlayWidth;
	    } else {
	      positionLeft = childOffset.left + childOffset.width;
	    }
	
	    var topDelta = getTopDelta(positionTop, overlayHeight, container, padding);
	
	    positionTop += topDelta;
	    arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
	    arrowOffsetLeft = void 0;
	  } else if (placement === 'top' || placement === 'bottom') {
	    positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;
	
	    if (placement === 'top') {
	      positionTop = childOffset.top - overlayHeight;
	    } else {
	      positionTop = childOffset.top + childOffset.height;
	    }
	
	    var leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);
	
	    positionLeft += leftDelta;
	    arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
	    arrowOffsetTop = void 0;
	  } else {
	    throw new Error('calcOverlayPosition(): No such placement of "' + placement + '" found.');
	  }
	
	  return { positionLeft: positionLeft, positionTop: positionTop, arrowOffsetLeft: arrowOffsetLeft, arrowOffsetTop: arrowOffsetTop };
	}
	module.exports = exports['default'];

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var contains = __webpack_require__(206),
	    getWindow = __webpack_require__(270),
	    ownerDocument = __webpack_require__(205);
	
	module.exports = function offset(node) {
	  var doc = ownerDocument(node),
	      win = getWindow(doc),
	      docElem = doc && doc.documentElement,
	      box = { top: 0, left: 0, height: 0, width: 0 };
	
	  if (!doc) return;
	
	  // Make sure it's not a disconnected DOM node
	  if (!contains(docElem, node)) return box;
	
	  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();
	
	  if (box.width || box.height) {
	
	    box = {
	      top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
	      left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
	      width: (box.width == null ? node.offsetWidth : box.width) || 0,
	      height: (box.height == null ? node.offsetHeight : box.height) || 0
	    };
	  }
	
	  return box;
	};

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var babelHelpers = __webpack_require__(197);
	
	exports.__esModule = true;
	exports['default'] = position;
	
	var _offset = __webpack_require__(290);
	
	var _offset2 = babelHelpers.interopRequireDefault(_offset);
	
	var _offsetParent = __webpack_require__(292);
	
	var _offsetParent2 = babelHelpers.interopRequireDefault(_offsetParent);
	
	var _scrollTop = __webpack_require__(293);
	
	var _scrollTop2 = babelHelpers.interopRequireDefault(_scrollTop);
	
	var _scrollLeft = __webpack_require__(294);
	
	var _scrollLeft2 = babelHelpers.interopRequireDefault(_scrollLeft);
	
	var _style = __webpack_require__(191);
	
	var _style2 = babelHelpers.interopRequireDefault(_style);
	
	function nodeName(node) {
	  return node.nodeName && node.nodeName.toLowerCase();
	}
	
	function position(node, offsetParent) {
	  var parentOffset = { top: 0, left: 0 },
	      offset;
	
	  // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
	  // because it is its only offset parent
	  if ((0, _style2['default'])(node, 'position') === 'fixed') {
	    offset = node.getBoundingClientRect();
	  } else {
	    offsetParent = offsetParent || (0, _offsetParent2['default'])(node);
	    offset = (0, _offset2['default'])(node);
	
	    if (nodeName(offsetParent) !== 'html') parentOffset = (0, _offset2['default'])(offsetParent);
	
	    parentOffset.top += parseInt((0, _style2['default'])(offsetParent, 'borderTopWidth'), 10) - (0, _scrollTop2['default'])(offsetParent) || 0;
	    parentOffset.left += parseInt((0, _style2['default'])(offsetParent, 'borderLeftWidth'), 10) - (0, _scrollLeft2['default'])(offsetParent) || 0;
	  }
	
	  // Subtract parent offsets and node margins
	  return babelHelpers._extends({}, offset, {
	    top: offset.top - parentOffset.top - (parseInt((0, _style2['default'])(node, 'marginTop'), 10) || 0),
	    left: offset.left - parentOffset.left - (parseInt((0, _style2['default'])(node, 'marginLeft'), 10) || 0)
	  });
	}
	
	module.exports = exports['default'];

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var babelHelpers = __webpack_require__(197);
	
	exports.__esModule = true;
	exports['default'] = offsetParent;
	
	var _ownerDocument = __webpack_require__(205);
	
	var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);
	
	var _style = __webpack_require__(191);
	
	var _style2 = babelHelpers.interopRequireDefault(_style);
	
	function nodeName(node) {
	  return node.nodeName && node.nodeName.toLowerCase();
	}
	
	function offsetParent(node) {
	  var doc = (0, _ownerDocument2['default'])(node),
	      offsetParent = node && node.offsetParent;
	
	  while (offsetParent && nodeName(node) !== 'html' && (0, _style2['default'])(offsetParent, 'position') === 'static') {
	    offsetParent = offsetParent.offsetParent;
	  }
	
	  return offsetParent || doc.documentElement;
	}
	
	module.exports = exports['default'];

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var getWindow = __webpack_require__(270);
	
	module.exports = function scrollTop(node, val) {
	  var win = getWindow(node);
	
	  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;
	
	  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
	};

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var getWindow = __webpack_require__(270);
	
	module.exports = function scrollTop(node, val) {
	  var win = getWindow(node);
	
	  if (val === undefined) return win ? 'pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft : node.scrollLeft;
	
	  if (win) win.scrollTo(val, 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop);else node.scrollLeft = val;
	};

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _contains = __webpack_require__(206);
	
	var _contains2 = _interopRequireDefault(_contains);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _Overlay = __webpack_require__(286);
	
	var _Overlay2 = _interopRequireDefault(_Overlay);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * Check if value one is inside or equal to the of value
	 *
	 * @param {string} one
	 * @param {string|array} of
	 * @returns {boolean}
	 */
	function isOneOf(one, of) {
	  if (Array.isArray(of)) {
	    return of.indexOf(one) >= 0;
	  }
	  return one === of;
	}
	
	var triggerType = _react2['default'].PropTypes.oneOf(['click', 'hover', 'focus']);
	
	var propTypes = (0, _extends3['default'])({}, _Overlay2['default'].propTypes, {
	
	  /**
	  * Specify which action or actions trigger Overlay visibility
	  */
	  trigger: _react2['default'].PropTypes.oneOfType([triggerType, _react2['default'].PropTypes.arrayOf(triggerType)]),
	
	  /**
	   * A millisecond delay amount to show and hide the Overlay once triggered
	   */
	  delay: _react2['default'].PropTypes.number,
	  /**
	   * A millisecond delay amount before showing the Overlay once triggered.
	   */
	  delayShow: _react2['default'].PropTypes.number,
	  /**
	   * A millisecond delay amount before hiding the Overlay once triggered.
	   */
	  delayHide: _react2['default'].PropTypes.number,
	
	  // FIXME: This should be `defaultShow`.
	  /**
	   * The initial visibility state of the Overlay. For more nuanced visibility
	   * control, consider using the Overlay component directly.
	   */
	  defaultOverlayShown: _react2['default'].PropTypes.bool,
	
	  /**
	   * An element or text to overlay next to the target.
	   */
	  overlay: _react2['default'].PropTypes.node.isRequired,
	
	  /**
	   * @private
	   */
	  onBlur: _react2['default'].PropTypes.func,
	  /**
	   * @private
	   */
	  onClick: _react2['default'].PropTypes.func,
	  /**
	   * @private
	   */
	  onFocus: _react2['default'].PropTypes.func,
	  /**
	   * @private
	   */
	  onMouseOut: _react2['default'].PropTypes.func,
	  /**
	   * @private
	   */
	  onMouseOver: _react2['default'].PropTypes.func,
	
	  // Overridden props from `<Overlay>`.
	  /**
	   * @private
	   */
	  target: _react2['default'].PropTypes.oneOf([null]),
	  /**
	  * @private
	  */
	  onHide: _react2['default'].PropTypes.oneOf([null]),
	  /**
	   * @private
	   */
	  show: _react2['default'].PropTypes.oneOf([null])
	});
	
	var defaultProps = {
	  defaultOverlayShown: false,
	  trigger: ['hover', 'focus']
	};
	
	var OverlayTrigger = function (_React$Component) {
	  (0, _inherits3['default'])(OverlayTrigger, _React$Component);
	
	  function OverlayTrigger(props, context) {
	    (0, _classCallCheck3['default'])(this, OverlayTrigger);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleToggle = _this.handleToggle.bind(_this);
	    _this.handleDelayedShow = _this.handleDelayedShow.bind(_this);
	    _this.handleDelayedHide = _this.handleDelayedHide.bind(_this);
	    _this.handleHide = _this.handleHide.bind(_this);
	
	    _this.handleMouseOver = function (e) {
	      return _this.handleMouseOverOut(_this.handleDelayedShow, e);
	    };
	    _this.handleMouseOut = function (e) {
	      return _this.handleMouseOverOut(_this.handleDelayedHide, e);
	    };
	
	    _this._mountNode = null;
	
	    _this.state = {
	      show: props.defaultOverlayShown
	    };
	    return _this;
	  }
	
	  OverlayTrigger.prototype.componentDidMount = function componentDidMount() {
	    this._mountNode = document.createElement('div');
	    this.renderOverlay();
	  };
	
	  OverlayTrigger.prototype.componentDidUpdate = function componentDidUpdate() {
	    this.renderOverlay();
	  };
	
	  OverlayTrigger.prototype.componentWillUnmount = function componentWillUnmount() {
	    _reactDom2['default'].unmountComponentAtNode(this._mountNode);
	    this._mountNode = null;
	
	    clearTimeout(this._hoverShowDelay);
	    clearTimeout(this._hoverHideDelay);
	  };
	
	  OverlayTrigger.prototype.handleToggle = function handleToggle() {
	    if (this.state.show) {
	      this.hide();
	    } else {
	      this.show();
	    }
	  };
	
	  OverlayTrigger.prototype.handleDelayedShow = function handleDelayedShow() {
	    var _this2 = this;
	
	    if (this._hoverHideDelay != null) {
	      clearTimeout(this._hoverHideDelay);
	      this._hoverHideDelay = null;
	      return;
	    }
	
	    if (this.state.show || this._hoverShowDelay != null) {
	      return;
	    }
	
	    var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;
	
	    if (!delay) {
	      this.show();
	      return;
	    }
	
	    this._hoverShowDelay = setTimeout(function () {
	      _this2._hoverShowDelay = null;
	      _this2.show();
	    }, delay);
	  };
	
	  OverlayTrigger.prototype.handleDelayedHide = function handleDelayedHide() {
	    var _this3 = this;
	
	    if (this._hoverShowDelay != null) {
	      clearTimeout(this._hoverShowDelay);
	      this._hoverShowDelay = null;
	      return;
	    }
	
	    if (!this.state.show || this._hoverHideDelay != null) {
	      return;
	    }
	
	    var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;
	
	    if (!delay) {
	      this.hide();
	      return;
	    }
	
	    this._hoverHideDelay = setTimeout(function () {
	      _this3._hoverHideDelay = null;
	      _this3.hide();
	    }, delay);
	  };
	
	  // Simple implementation of mouseEnter and mouseLeave.
	  // React's built version is broken: https://github.com/facebook/react/issues/4251
	  // for cases when the trigger is disabled and mouseOut/Over can cause flicker
	  // moving from one child element to another.
	
	
	  OverlayTrigger.prototype.handleMouseOverOut = function handleMouseOverOut(handler, e) {
	    var target = e.currentTarget;
	    var related = e.relatedTarget || e.nativeEvent.toElement;
	
	    if (!related || related !== target && !(0, _contains2['default'])(target, related)) {
	      handler(e);
	    }
	  };
	
	  OverlayTrigger.prototype.handleHide = function handleHide() {
	    this.hide();
	  };
	
	  OverlayTrigger.prototype.show = function show() {
	    this.setState({ show: true });
	  };
	
	  OverlayTrigger.prototype.hide = function hide() {
	    this.setState({ show: false });
	  };
	
	  OverlayTrigger.prototype.makeOverlay = function makeOverlay(overlay, props) {
	    return _react2['default'].createElement(
	      _Overlay2['default'],
	      (0, _extends3['default'])({}, props, {
	        show: this.state.show,
	        onHide: this.handleHide,
	        target: this
	      }),
	      overlay
	    );
	  };
	
	  OverlayTrigger.prototype.renderOverlay = function renderOverlay() {
	    _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, this._overlay, this._mountNode);
	  };
	
	  OverlayTrigger.prototype.render = function render() {
	    var _props = this.props;
	    var trigger = _props.trigger;
	    var overlay = _props.overlay;
	    var children = _props.children;
	    var onBlur = _props.onBlur;
	    var onClick = _props.onClick;
	    var onFocus = _props.onFocus;
	    var onMouseOut = _props.onMouseOut;
	    var onMouseOver = _props.onMouseOver;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['trigger', 'overlay', 'children', 'onBlur', 'onClick', 'onFocus', 'onMouseOut', 'onMouseOver']);
	
	
	    delete props.delay;
	    delete props.delayShow;
	    delete props.delayHide;
	    delete props.defaultOverlayShown;
	
	    var child = _react2['default'].Children.only(children);
	    var childProps = child.props;
	
	    var triggerProps = {
	      'aria-describedby': overlay.props.id
	    };
	
	    // FIXME: The logic here for passing through handlers on this component is
	    // inconsistent. We shouldn't be passing any of these props through.
	
	    triggerProps.onClick = (0, _createChainedFunction2['default'])(childProps.onClick, onClick);
	
	    if (isOneOf('click', trigger)) {
	      triggerProps.onClick = (0, _createChainedFunction2['default'])(triggerProps.onClick, this.handleToggle);
	    }
	
	    if (isOneOf('hover', trigger)) {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(!(trigger === 'hover'), '[react-bootstrap] Specifying only the `"hover"` trigger limits the ' + 'visibility of the overlay to just mouse users. Consider also ' + 'including the `"focus"` trigger so that touch and keyboard only ' + 'users can see the overlay as well.') : void 0;
	
	      triggerProps.onMouseOver = (0, _createChainedFunction2['default'])(childProps.onMouseOver, onMouseOver, this.handleMouseOver);
	      triggerProps.onMouseOut = (0, _createChainedFunction2['default'])(childProps.onMouseOut, onMouseOut, this.handleMouseOut);
	    }
	
	    if (isOneOf('focus', trigger)) {
	      triggerProps.onFocus = (0, _createChainedFunction2['default'])(childProps.onFocus, onFocus, this.handleDelayedShow);
	      triggerProps.onBlur = (0, _createChainedFunction2['default'])(childProps.onBlur, onBlur, this.handleDelayedHide);
	    }
	
	    this._overlay = this.makeOverlay(overlay, props);
	
	    return (0, _react.cloneElement)(child, triggerProps);
	  };
	
	  return OverlayTrigger;
	}(_react2['default'].Component);
	
	OverlayTrigger.propTypes = propTypes;
	OverlayTrigger.defaultProps = defaultProps;
	
	exports['default'] = OverlayTrigger;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var PageHeader = function (_React$Component) {
	  (0, _inherits3['default'])(PageHeader, _React$Component);
	
	  function PageHeader() {
	    (0, _classCallCheck3['default'])(this, PageHeader);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  PageHeader.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends3['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      _react2['default'].createElement(
	        'h1',
	        null,
	        children
	      )
	    );
	  };
	
	  return PageHeader;
	}(_react2['default'].Component);
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('page-header', PageHeader);
	module.exports = exports['default'];

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _PagerItem = __webpack_require__(298);
	
	var _PagerItem2 = _interopRequireDefault(_PagerItem);
	
	var _deprecationWarning = __webpack_require__(299);
	
	var _deprecationWarning2 = _interopRequireDefault(_deprecationWarning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	exports['default'] = _deprecationWarning2['default'].wrapper(_PagerItem2['default'], '`<PageItem>`', '`<Pager.Item>`');
	module.exports = exports['default'];

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SafeAnchor = __webpack_require__(173);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  disabled: _react2['default'].PropTypes.bool,
	  previous: _react2['default'].PropTypes.bool,
	  next: _react2['default'].PropTypes.bool,
	  onClick: _react2['default'].PropTypes.func,
	  onSelect: _react2['default'].PropTypes.func,
	  eventKey: _react2['default'].PropTypes.any
	};
	
	var defaultProps = {
	  disabled: false,
	  previous: false,
	  next: false
	};
	
	var PagerItem = function (_React$Component) {
	  (0, _inherits3['default'])(PagerItem, _React$Component);
	
	  function PagerItem(props, context) {
	    (0, _classCallCheck3['default'])(this, PagerItem);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleSelect = _this.handleSelect.bind(_this);
	    return _this;
	  }
	
	  PagerItem.prototype.handleSelect = function handleSelect(e) {
	    var _props = this.props;
	    var disabled = _props.disabled;
	    var onSelect = _props.onSelect;
	    var eventKey = _props.eventKey;
	
	
	    if (onSelect || disabled) {
	      e.preventDefault();
	    }
	
	    if (disabled) {
	      return;
	    }
	
	    if (onSelect) {
	      onSelect(eventKey, e);
	    }
	  };
	
	  PagerItem.prototype.render = function render() {
	    var _props2 = this.props;
	    var disabled = _props2.disabled;
	    var previous = _props2.previous;
	    var next = _props2.next;
	    var onClick = _props2.onClick;
	    var className = _props2.className;
	    var style = _props2.style;
	    var props = (0, _objectWithoutProperties3['default'])(_props2, ['disabled', 'previous', 'next', 'onClick', 'className', 'style']);
	
	
	    delete props.onSelect;
	    delete props.eventKey;
	
	    return _react2['default'].createElement(
	      'li',
	      {
	        className: (0, _classnames2['default'])(className, { disabled: disabled, previous: previous, next: next }),
	        style: style
	      },
	      _react2['default'].createElement(_SafeAnchor2['default'], (0, _extends3['default'])({}, props, {
	        disabled: disabled,
	        onClick: (0, _createChainedFunction2['default'])(onClick, this.handleSelect)
	      }))
	    );
	  };
	
	  return PagerItem;
	}(_react2['default'].Component);
	
	PagerItem.propTypes = propTypes;
	PagerItem.defaultProps = defaultProps;
	
	exports['default'] = PagerItem;
	module.exports = exports['default'];

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _typeof2 = __webpack_require__(112);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	exports._resetWarned = _resetWarned;
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var warned = {};
	
	function deprecationWarning(oldname, newname, link) {
	  var message = void 0;
	
	  if ((typeof oldname === 'undefined' ? 'undefined' : (0, _typeof3['default'])(oldname)) === 'object') {
	    message = oldname.message;
	  } else {
	    message = oldname + ' is deprecated. Use ' + newname + ' instead.';
	
	    if (link) {
	      message += '\nYou can read more about it at ' + link;
	    }
	  }
	
	  if (warned[message]) {
	    return;
	  }
	
	  process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(false, message) : void 0;
	  warned[message] = true;
	}
	
	deprecationWarning.wrapper = function (Component) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  return function (_Component) {
	    (0, _inherits3['default'])(DeprecatedComponent, _Component);
	
	    function DeprecatedComponent() {
	      (0, _classCallCheck3['default'])(this, DeprecatedComponent);
	      return (0, _possibleConstructorReturn3['default'])(this, _Component.apply(this, arguments));
	    }
	
	    DeprecatedComponent.prototype.componentWillMount = function componentWillMount() {
	      deprecationWarning.apply(undefined, args);
	
	      if (_Component.prototype.componentWillMount) {
	        var _Component$prototype$;
	
	        for (var _len2 = arguments.length, methodArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	          methodArgs[_key2] = arguments[_key2];
	        }
	
	        (_Component$prototype$ = _Component.prototype.componentWillMount).call.apply(_Component$prototype$, [this].concat(methodArgs));
	      }
	    };
	
	    return DeprecatedComponent;
	  }(Component);
	};
	
	exports['default'] = deprecationWarning;
	function _resetWarned() {
	  warned = {};
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _PagerItem = __webpack_require__(298);
	
	var _PagerItem2 = _interopRequireDefault(_PagerItem);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	var _ValidComponentChildren = __webpack_require__(165);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  onSelect: _react2['default'].PropTypes.func
	};
	
	var Pager = function (_React$Component) {
	  (0, _inherits3['default'])(Pager, _React$Component);
	
	  function Pager() {
	    (0, _classCallCheck3['default'])(this, Pager);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Pager.prototype.render = function render() {
	    var _props = this.props;
	    var onSelect = _props.onSelect;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['onSelect', 'className', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(
	      'ul',
	      (0, _extends3['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      _ValidComponentChildren2['default'].map(children, function (child) {
	        return (0, _react.cloneElement)(child, {
	          onSelect: (0, _createChainedFunction2['default'])(child.props.onSelect, onSelect)
	        });
	      })
	    );
	  };
	
	  return Pager;
	}(_react2['default'].Component);
	
	Pager.propTypes = propTypes;
	
	Pager.Item = _PagerItem2['default'];
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('pager', Pager);
	module.exports = exports['default'];

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _PaginationButton = __webpack_require__(302);
	
	var _PaginationButton2 = _interopRequireDefault(_PaginationButton);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  activePage: _react2['default'].PropTypes.number,
	  items: _react2['default'].PropTypes.number,
	  maxButtons: _react2['default'].PropTypes.number,
	
	  /**
	   * When `true`, will display the first and the last button page
	   */
	  boundaryLinks: _react2['default'].PropTypes.bool,
	
	  /**
	   * When `true`, will display the default node value ('&hellip;').
	   * Otherwise, will display provided node (when specified).
	   */
	  ellipsis: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
	
	  /**
	   * When `true`, will display the default node value ('&laquo;').
	   * Otherwise, will display provided node (when specified).
	   */
	  first: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
	
	  /**
	   * When `true`, will display the default node value ('&raquo;').
	   * Otherwise, will display provided node (when specified).
	   */
	  last: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
	
	  /**
	   * When `true`, will display the default node value ('&lsaquo;').
	   * Otherwise, will display provided node (when specified).
	   */
	  prev: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
	
	  /**
	   * When `true`, will display the default node value ('&rsaquo;').
	   * Otherwise, will display provided node (when specified).
	   */
	  next: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
	
	  onSelect: _react2['default'].PropTypes.func,
	
	  /**
	   * You can use a custom element for the buttons
	   */
	  buttonComponentClass: _elementType2['default']
	};
	
	var defaultProps = {
	  activePage: 1,
	  items: 1,
	  maxButtons: 0,
	  first: false,
	  last: false,
	  prev: false,
	  next: false,
	  ellipsis: true,
	  boundaryLinks: false
	};
	
	var Pagination = function (_React$Component) {
	  (0, _inherits3['default'])(Pagination, _React$Component);
	
	  function Pagination() {
	    (0, _classCallCheck3['default'])(this, Pagination);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Pagination.prototype.renderPageButtons = function renderPageButtons(activePage, items, maxButtons, boundaryLinks, ellipsis, buttonProps) {
	    var pageButtons = [];
	
	    var startPage = void 0;
	    var endPage = void 0;
	    var hasHiddenPagesAfter = void 0;
	
	    if (maxButtons) {
	      var hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
	      startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
	      hasHiddenPagesAfter = startPage + maxButtons <= items;
	
	      if (!hasHiddenPagesAfter) {
	        endPage = items;
	        startPage = items - maxButtons + 1;
	        if (startPage < 1) {
	          startPage = 1;
	        }
	      } else {
	        endPage = startPage + maxButtons - 1;
	      }
	    } else {
	      startPage = 1;
	      endPage = items;
	    }
	
	    for (var pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
	      pageButtons.push(_react2['default'].createElement(
	        _PaginationButton2['default'],
	        (0, _extends3['default'])({}, buttonProps, {
	          key: pagenumber,
	          eventKey: pagenumber,
	          active: pagenumber === activePage
	        }),
	        pagenumber
	      ));
	    }
	
	    if (boundaryLinks && ellipsis && startPage !== 1) {
	      pageButtons.unshift(_react2['default'].createElement(
	        _PaginationButton2['default'],
	        {
	          key: 'ellipsisFirst',
	          disabled: true,
	          componentClass: buttonProps.componentClass
	        },
	        _react2['default'].createElement(
	          'span',
	          { 'aria-label': 'More' },
	          ellipsis === true ? '…' : ellipsis
	        )
	      ));
	
	      pageButtons.unshift(_react2['default'].createElement(
	        _PaginationButton2['default'],
	        (0, _extends3['default'])({}, buttonProps, {
	          key: 1,
	          eventKey: 1,
	          active: false
	        }),
	        '1'
	      ));
	    }
	
	    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
	      pageButtons.push(_react2['default'].createElement(
	        _PaginationButton2['default'],
	        {
	          key: 'ellipsis',
	          disabled: true,
	          componentClass: buttonProps.componentClass
	        },
	        _react2['default'].createElement(
	          'span',
	          { 'aria-label': 'More' },
	          ellipsis === true ? '…' : ellipsis
	        )
	      ));
	
	      if (boundaryLinks && endPage !== items) {
	        pageButtons.push(_react2['default'].createElement(
	          _PaginationButton2['default'],
	          (0, _extends3['default'])({}, buttonProps, {
	            key: items,
	            eventKey: items,
	            active: false
	          }),
	          items
	        ));
	      }
	    }
	
	    return pageButtons;
	  };
	
	  Pagination.prototype.render = function render() {
	    var _props = this.props;
	    var activePage = _props.activePage;
	    var items = _props.items;
	    var maxButtons = _props.maxButtons;
	    var boundaryLinks = _props.boundaryLinks;
	    var ellipsis = _props.ellipsis;
	    var first = _props.first;
	    var last = _props.last;
	    var prev = _props.prev;
	    var next = _props.next;
	    var onSelect = _props.onSelect;
	    var buttonComponentClass = _props.buttonComponentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['activePage', 'items', 'maxButtons', 'boundaryLinks', 'ellipsis', 'first', 'last', 'prev', 'next', 'onSelect', 'buttonComponentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    var buttonProps = {
	      onSelect: onSelect,
	      componentClass: buttonComponentClass
	    };
	
	    return _react2['default'].createElement(
	      'ul',
	      (0, _extends3['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      first && _react2['default'].createElement(
	        _PaginationButton2['default'],
	        (0, _extends3['default'])({}, buttonProps, {
	          eventKey: 1,
	          disabled: activePage === 1
	        }),
	        _react2['default'].createElement(
	          'span',
	          { 'aria-label': 'First' },
	          first === true ? '«' : first
	        )
	      ),
	      prev && _react2['default'].createElement(
	        _PaginationButton2['default'],
	        (0, _extends3['default'])({}, buttonProps, {
	          eventKey: activePage - 1,
	          disabled: activePage === 1
	        }),
	        _react2['default'].createElement(
	          'span',
	          { 'aria-label': 'Previous' },
	          prev === true ? '‹' : prev
	        )
	      ),
	      this.renderPageButtons(activePage, items, maxButtons, boundaryLinks, ellipsis, buttonProps),
	      next && _react2['default'].createElement(
	        _PaginationButton2['default'],
	        (0, _extends3['default'])({}, buttonProps, {
	          eventKey: activePage + 1,
	          disabled: activePage >= items
	        }),
	        _react2['default'].createElement(
	          'span',
	          { 'aria-label': 'Next' },
	          next === true ? '›' : next
	        )
	      ),
	      last && _react2['default'].createElement(
	        _PaginationButton2['default'],
	        (0, _extends3['default'])({}, buttonProps, {
	          eventKey: items,
	          disabled: activePage >= items
	        }),
	        _react2['default'].createElement(
	          'span',
	          { 'aria-label': 'Last' },
	          last === true ? '»' : last
	        )
	      )
	    );
	  };
	
	  return Pagination;
	}(_react2['default'].Component);
	
	Pagination.propTypes = propTypes;
	Pagination.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('pagination', Pagination);
	module.exports = exports['default'];

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _SafeAnchor = __webpack_require__(173);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// TODO: This should be `<Pagination.Item>`.
	
	// TODO: This should use `componentClass` like other components.
	
	var propTypes = {
	  componentClass: _elementType2['default'],
	  className: _react2['default'].PropTypes.string,
	  eventKey: _react2['default'].PropTypes.any,
	  onSelect: _react2['default'].PropTypes.func,
	  disabled: _react2['default'].PropTypes.bool,
	  active: _react2['default'].PropTypes.bool,
	  onClick: _react2['default'].PropTypes.func
	};
	
	var defaultProps = {
	  componentClass: _SafeAnchor2['default'],
	  active: false,
	  disabled: false
	};
	
	var PaginationButton = function (_React$Component) {
	  (0, _inherits3['default'])(PaginationButton, _React$Component);
	
	  function PaginationButton(props, context) {
	    (0, _classCallCheck3['default'])(this, PaginationButton);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleClick = _this.handleClick.bind(_this);
	    return _this;
	  }
	
	  PaginationButton.prototype.handleClick = function handleClick(event) {
	    var _props = this.props;
	    var disabled = _props.disabled;
	    var onSelect = _props.onSelect;
	    var eventKey = _props.eventKey;
	
	
	    if (disabled) {
	      return;
	    }
	
	    if (onSelect) {
	      onSelect(eventKey, event);
	    }
	  };
	
	  PaginationButton.prototype.render = function render() {
	    var _props2 = this.props;
	    var Component = _props2.componentClass;
	    var active = _props2.active;
	    var disabled = _props2.disabled;
	    var onClick = _props2.onClick;
	    var className = _props2.className;
	    var style = _props2.style;
	    var props = (0, _objectWithoutProperties3['default'])(_props2, ['componentClass', 'active', 'disabled', 'onClick', 'className', 'style']);
	
	
	    if (Component === _SafeAnchor2['default']) {
	      // Assume that custom components want `eventKey`.
	      delete props.eventKey;
	    }
	
	    delete props.onSelect;
	
	    return _react2['default'].createElement(
	      'li',
	      {
	        className: (0, _classnames2['default'])(className, { active: active, disabled: disabled }),
	        style: style
	      },
	      _react2['default'].createElement(Component, (0, _extends3['default'])({}, props, {
	        disabled: disabled,
	        onClick: (0, _createChainedFunction2['default'])(onClick, this.handleClick)
	      }))
	    );
	  };
	
	  return PaginationButton;
	}(_react2['default'].Component);
	
	PaginationButton.propTypes = propTypes;
	PaginationButton.defaultProps = defaultProps;
	
	exports['default'] = PaginationButton;
	module.exports = exports['default'];

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _values = __webpack_require__(167);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Collapse = __webpack_require__(190);
	
	var _Collapse2 = _interopRequireDefault(_Collapse);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _StyleConfig = __webpack_require__(163);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// TODO: Use uncontrollable.
	
	var propTypes = {
	  collapsible: _react2['default'].PropTypes.bool,
	  onSelect: _react2['default'].PropTypes.func,
	  header: _react2['default'].PropTypes.node,
	  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
	  footer: _react2['default'].PropTypes.node,
	  defaultExpanded: _react2['default'].PropTypes.bool,
	  expanded: _react2['default'].PropTypes.bool,
	  eventKey: _react2['default'].PropTypes.any,
	  headerRole: _react2['default'].PropTypes.string,
	  panelRole: _react2['default'].PropTypes.string,
	
	  // From Collapse.
	  onEnter: _react2['default'].PropTypes.func,
	  onEntering: _react2['default'].PropTypes.func,
	  onEntered: _react2['default'].PropTypes.func,
	  onExit: _react2['default'].PropTypes.func,
	  onExiting: _react2['default'].PropTypes.func,
	  onExited: _react2['default'].PropTypes.func
	};
	
	var defaultProps = {
	  defaultExpanded: false
	};
	
	var Panel = function (_React$Component) {
	  (0, _inherits3['default'])(Panel, _React$Component);
	
	  function Panel(props, context) {
	    (0, _classCallCheck3['default'])(this, Panel);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleClickTitle = _this.handleClickTitle.bind(_this);
	
	    _this.state = {
	      expanded: _this.props.defaultExpanded
	    };
	    return _this;
	  }
	
	  Panel.prototype.handleClickTitle = function handleClickTitle(e) {
	    // FIXME: What the heck? This API is horrible. This needs to go away!
	    e.persist();
	    e.selected = true;
	
	    if (this.props.onSelect) {
	      this.props.onSelect(this.props.eventKey, e);
	    } else {
	      e.preventDefault();
	    }
	
	    if (e.selected) {
	      this.setState({ expanded: !this.state.expanded });
	    }
	  };
	
	  Panel.prototype.shouldRenderFill = function shouldRenderFill(child) {
	    return _react2['default'].isValidElement(child) && child.props.fill != null;
	  };
	
	  Panel.prototype.renderHeader = function renderHeader(collapsible, header, id, role, expanded, bsProps) {
	    var titleClassName = (0, _bootstrapUtils.prefix)(bsProps, 'title');
	
	    if (!collapsible) {
	      if (!_react2['default'].isValidElement(header)) {
	        return header;
	      }
	
	      return (0, _react.cloneElement)(header, {
	        className: (0, _classnames2['default'])(header.props.className, titleClassName)
	      });
	    }
	
	    if (!_react2['default'].isValidElement(header)) {
	      return _react2['default'].createElement(
	        'h4',
	        { role: 'presentation', className: titleClassName },
	        this.renderAnchor(header, id, role, expanded)
	      );
	    }
	
	    return (0, _react.cloneElement)(header, {
	      className: (0, _classnames2['default'])(header.props.className, titleClassName),
	      children: this.renderAnchor(header.props.children, id, role, expanded)
	    });
	  };
	
	  Panel.prototype.renderAnchor = function renderAnchor(header, id, role, expanded) {
	    return _react2['default'].createElement(
	      'a',
	      {
	        role: role,
	        href: id && '#' + id,
	        onClick: this.handleClickTitle,
	        'aria-controls': id,
	        'aria-expanded': expanded,
	        'aria-selected': expanded
	      },
	      header
	    );
	  };
	
	  Panel.prototype.renderCollapsibleBody = function renderCollapsibleBody(id, expanded, role, children, bsProps, animationHooks) {
	    return _react2['default'].createElement(
	      _Collapse2['default'],
	      (0, _extends3['default'])({ 'in': expanded }, animationHooks),
	      _react2['default'].createElement(
	        'div',
	        {
	          id: id,
	          role: role,
	          className: (0, _bootstrapUtils.prefix)(bsProps, 'collapse'),
	          'aria-hidden': !expanded
	        },
	        this.renderBody(children, bsProps)
	      )
	    );
	  };
	
	  Panel.prototype.renderBody = function renderBody(rawChildren, bsProps) {
	    var children = [];
	    var bodyChildren = [];
	
	    var bodyClassName = (0, _bootstrapUtils.prefix)(bsProps, 'body');
	
	    function maybeAddBody() {
	      if (!bodyChildren.length) {
	        return;
	      }
	
	      // Derive the key from the index here, since we need to make one up.
	      children.push(_react2['default'].createElement(
	        'div',
	        { key: children.length, className: bodyClassName },
	        bodyChildren
	      ));
	
	      bodyChildren = [];
	    }
	
	    // Convert to array so we can re-use keys.
	    _react2['default'].Children.toArray(rawChildren).forEach(function (child) {
	      if (_react2['default'].isValidElement(child) && child.props.fill) {
	        maybeAddBody();
	
	        // Remove the child's unknown `fill` prop.
	        children.push((0, _react.cloneElement)(child, { fill: undefined }));
	
	        return;
	      }
	
	      bodyChildren.push(child);
	    });
	
	    maybeAddBody();
	
	    return children;
	  };
	
	  Panel.prototype.render = function render() {
	    var _props = this.props;
	    var collapsible = _props.collapsible;
	    var header = _props.header;
	    var id = _props.id;
	    var footer = _props.footer;
	    var propsExpanded = _props.expanded;
	    var headerRole = _props.headerRole;
	    var panelRole = _props.panelRole;
	    var className = _props.className;
	    var children = _props.children;
	    var onEnter = _props.onEnter;
	    var onEntering = _props.onEntering;
	    var onEntered = _props.onEntered;
	    var onExit = _props.onExit;
	    var onExiting = _props.onExiting;
	    var onExited = _props.onExited;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['collapsible', 'header', 'id', 'footer', 'expanded', 'headerRole', 'panelRole', 'className', 'children', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited']);
	
	    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['defaultExpanded', 'eventKey', 'onSelect']);
	
	    var bsProps = _splitBsPropsAndOmit[0];
	    var elementProps = _splitBsPropsAndOmit[1];
	
	
	    var expanded = propsExpanded != null ? propsExpanded : this.state.expanded;
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends3['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes),
	        id: collapsible ? null : id
	      }),
	      header && _react2['default'].createElement(
	        'div',
	        { className: (0, _bootstrapUtils.prefix)(bsProps, 'heading') },
	        this.renderHeader(collapsible, header, id, headerRole, expanded, bsProps)
	      ),
	      collapsible ? this.renderCollapsibleBody(id, expanded, panelRole, children, bsProps, { onEnter: onEnter, onEntering: onEntering, onEntered: onEntered, onExit: onExit, onExiting: onExiting, onExited: onExited }) : this.renderBody(children, bsProps),
	      footer && _react2['default'].createElement(
	        'div',
	        { className: (0, _bootstrapUtils.prefix)(bsProps, 'footer') },
	        footer
	      )
	    );
	  };
	
	  return Panel;
	}(_react2['default'].Component);
	
	Panel.propTypes = propTypes;
	Panel.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('panel', (0, _bootstrapUtils.bsStyles)([].concat((0, _values2['default'])(_StyleConfig.State), [_StyleConfig.Style.DEFAULT, _StyleConfig.Style.PRIMARY]), _StyleConfig.Style.DEFAULT, Panel));
	module.exports = exports['default'];

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _isRequiredForA11y = __webpack_require__(208);
	
	var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * An html id attribute, necessary for accessibility
	   * @type {string}
	   * @required
	   */
	  id: (0, _isRequiredForA11y2['default'])(_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),
	
	  /**
	   * Sets the direction the Popover is positioned towards.
	   */
	  placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	
	  /**
	   * The "top" position value for the Popover.
	   */
	  positionTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	  /**
	   * The "left" position value for the Popover.
	   */
	  positionLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	
	  /**
	   * The "top" position value for the Popover arrow.
	   */
	  arrowOffsetTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	  /**
	   * The "left" position value for the Popover arrow.
	   */
	  arrowOffsetLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	
	  /**
	   * Title content
	   */
	  title: _react2['default'].PropTypes.node
	};
	
	var defaultProps = {
	  placement: 'right'
	};
	
	var Popover = function (_React$Component) {
	  (0, _inherits3['default'])(Popover, _React$Component);
	
	  function Popover() {
	    (0, _classCallCheck3['default'])(this, Popover);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Popover.prototype.render = function render() {
	    var _extends2;
	
	    var _props = this.props;
	    var placement = _props.placement;
	    var positionTop = _props.positionTop;
	    var positionLeft = _props.positionLeft;
	    var arrowOffsetTop = _props.arrowOffsetTop;
	    var arrowOffsetLeft = _props.arrowOffsetLeft;
	    var title = _props.title;
	    var className = _props.className;
	    var style = _props.style;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['placement', 'positionTop', 'positionLeft', 'arrowOffsetTop', 'arrowOffsetLeft', 'title', 'className', 'style', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[placement] = true, _extends2));
	
	    var outerStyle = (0, _extends4['default'])({
	      display: 'block',
	      top: positionTop,
	      left: positionLeft
	    }, style);
	
	    var arrowStyle = {
	      top: arrowOffsetTop,
	      left: arrowOffsetLeft
	    };
	
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends4['default'])({}, elementProps, {
	        role: 'tooltip',
	        className: (0, _classnames2['default'])(className, classes),
	        style: outerStyle
	      }),
	      _react2['default'].createElement('div', { className: 'arrow', style: arrowStyle }),
	      title && _react2['default'].createElement(
	        'h3',
	        { className: (0, _bootstrapUtils.prefix)(bsProps, 'title') },
	        title
	      ),
	      _react2['default'].createElement(
	        'div',
	        { className: (0, _bootstrapUtils.prefix)(bsProps, 'content') },
	        children
	      )
	    );
	  };
	
	  return Popover;
	}(_react2['default'].Component);
	
	Popover.propTypes = propTypes;
	Popover.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('popover', Popover);
	module.exports = exports['default'];

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _values = __webpack_require__(167);
	
	var _values2 = _interopRequireDefault(_values);
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _StyleConfig = __webpack_require__(163);
	
	var _ValidComponentChildren = __webpack_require__(165);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var ROUND_PRECISION = 1000;
	
	/**
	 * Validate that children, if any, are instances of `<ProgressBar>`.
	 */
	function onlyProgressBar(props, propName, componentName) {
	  var children = props[propName];
	  if (!children) {
	    return null;
	  }
	
	  var error = null;
	
	  _react2['default'].Children.forEach(children, function (child) {
	    if (error) {
	      return;
	    }
	
	    if (child.type === ProgressBar) {
	      // eslint-disable-line no-use-before-define
	      return;
	    }
	
	    var childIdentifier = _react2['default'].isValidElement(child) ? child.type.displayName || child.type.name || child.type : child;
	    error = new Error('Children of ' + componentName + ' can contain only ProgressBar ' + ('components. Found ' + childIdentifier + '.'));
	  });
	
	  return error;
	}
	
	var propTypes = {
	  min: _react.PropTypes.number,
	  now: _react.PropTypes.number,
	  max: _react.PropTypes.number,
	  label: _react.PropTypes.node,
	  srOnly: _react.PropTypes.bool,
	  striped: _react.PropTypes.bool,
	  active: _react.PropTypes.bool,
	  children: onlyProgressBar,
	
	  /**
	   * @private
	   */
	  isChild: _react.PropTypes.bool
	};
	
	var defaultProps = {
	  min: 0,
	  max: 100,
	  active: false,
	  isChild: false,
	  srOnly: false,
	  striped: false
	};
	
	function getPercentage(now, min, max) {
	  var percentage = (now - min) / (max - min) * 100;
	  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
	}
	
	var ProgressBar = function (_React$Component) {
	  (0, _inherits3['default'])(ProgressBar, _React$Component);
	
	  function ProgressBar() {
	    (0, _classCallCheck3['default'])(this, ProgressBar);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  ProgressBar.prototype.renderProgressBar = function renderProgressBar(_ref) {
	    var _extends2;
	
	    var min = _ref.min;
	    var now = _ref.now;
	    var max = _ref.max;
	    var label = _ref.label;
	    var srOnly = _ref.srOnly;
	    var striped = _ref.striped;
	    var active = _ref.active;
	    var className = _ref.className;
	    var style = _ref.style;
	    var props = (0, _objectWithoutProperties3['default'])(_ref, ['min', 'now', 'max', 'label', 'srOnly', 'striped', 'active', 'className', 'style']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {
	      active: active
	    }, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'striped')] = active || striped, _extends2));
	
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends4['default'])({}, elementProps, {
	        role: 'progressbar',
	        className: (0, _classnames2['default'])(className, classes),
	        style: (0, _extends4['default'])({ width: getPercentage(now, min, max) + '%' }, style),
	        'aria-valuenow': now,
	        'aria-valuemin': min,
	        'aria-valuemax': max
	      }),
	      srOnly ? _react2['default'].createElement(
	        'span',
	        { className: 'sr-only' },
	        label
	      ) : label
	    );
	  };
	
	  ProgressBar.prototype.render = function render() {
	    var _props = this.props;
	    var isChild = _props.isChild;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['isChild']);
	
	
	    if (isChild) {
	      return this.renderProgressBar(props);
	    }
	
	    var min = props.min;
	    var now = props.now;
	    var max = props.max;
	    var label = props.label;
	    var srOnly = props.srOnly;
	    var striped = props.striped;
	    var active = props.active;
	    var bsClass = props.bsClass;
	    var bsStyle = props.bsStyle;
	    var className = props.className;
	    var children = props.children;
	    var wrapperProps = (0, _objectWithoutProperties3['default'])(props, ['min', 'now', 'max', 'label', 'srOnly', 'striped', 'active', 'bsClass', 'bsStyle', 'className', 'children']);
	
	
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends4['default'])({}, wrapperProps, {
	        className: (0, _classnames2['default'])(className, 'progress')
	      }),
	      children ? _ValidComponentChildren2['default'].map(children, function (child) {
	        return (0, _react.cloneElement)(child, { isChild: true });
	      }) : this.renderProgressBar({
	        min: min, now: now, max: max, label: label, srOnly: srOnly, striped: striped, active: active, bsClass: bsClass, bsStyle: bsStyle
	      })
	    );
	  };
	
	  return ProgressBar;
	}(_react2['default'].Component);
	
	ProgressBar.propTypes = propTypes;
	ProgressBar.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('progress-bar', (0, _bootstrapUtils.bsStyles)((0, _values2['default'])(_StyleConfig.State), ProgressBar));
	module.exports = exports['default'];

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  inline: _react2['default'].PropTypes.bool,
	  disabled: _react2['default'].PropTypes.bool,
	  /**
	   * Only valid if `inline` is not set.
	   */
	  validationState: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
	  /**
	   * Attaches a ref to the `<input>` element. Only functions can be used here.
	   *
	   * ```js
	   * <Radio inputRef={ref => { this.input = ref; }} />
	   * ```
	   */
	  inputRef: _react2['default'].PropTypes.func
	};
	
	var defaultProps = {
	  inline: false,
	  disabled: false
	};
	
	var Radio = function (_React$Component) {
	  (0, _inherits3['default'])(Radio, _React$Component);
	
	  function Radio() {
	    (0, _classCallCheck3['default'])(this, Radio);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Radio.prototype.render = function render() {
	    var _props = this.props;
	    var inline = _props.inline;
	    var disabled = _props.disabled;
	    var validationState = _props.validationState;
	    var inputRef = _props.inputRef;
	    var className = _props.className;
	    var style = _props.style;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['inline', 'disabled', 'validationState', 'inputRef', 'className', 'style', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var input = _react2['default'].createElement('input', (0, _extends3['default'])({}, elementProps, {
	      ref: inputRef,
	      type: 'radio',
	      disabled: disabled
	    }));
	
	    if (inline) {
	      var _classes2;
	
	      var _classes = (_classes2 = {}, _classes2[(0, _bootstrapUtils.prefix)(bsProps, 'inline')] = true, _classes2.disabled = disabled, _classes2);
	
	      // Use a warning here instead of in propTypes to get better-looking
	      // generated documentation.
	      process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(!validationState, '`validationState` is ignored on `<Radio inline>`. To display ' + 'validation state on an inline radio, set `validationState` on a ' + 'parent `<FormGroup>` or other element instead.') : void 0;
	
	      return _react2['default'].createElement(
	        'label',
	        { className: (0, _classnames2['default'])(className, _classes), style: style },
	        input,
	        children
	      );
	    }
	
	    var classes = (0, _extends3['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
	      disabled: disabled
	    });
	    if (validationState) {
	      classes['has-' + validationState] = true;
	    }
	
	    return _react2['default'].createElement(
	      'div',
	      { className: (0, _classnames2['default'])(className, classes), style: style },
	      _react2['default'].createElement(
	        'label',
	        null,
	        input,
	        children
	      )
	    );
	  };
	
	  return Radio;
	}(_react2['default'].Component);
	
	Radio.propTypes = propTypes;
	Radio.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('radio', Radio);
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	// TODO: This should probably take a single `aspectRatio` prop.
	
	var propTypes = {
	  /**
	   * This component requires a single child element
	   */
	  children: _react.PropTypes.element.isRequired,
	  /**
	   * 16by9 aspect ratio
	   */
	  a16by9: _react.PropTypes.bool,
	  /**
	   * 4by3 aspect ratio
	   */
	  a4by3: _react.PropTypes.bool
	};
	
	var defaultProps = {
	  a16by9: false,
	  a4by3: false
	};
	
	var ResponsiveEmbed = function (_React$Component) {
	  (0, _inherits3['default'])(ResponsiveEmbed, _React$Component);
	
	  function ResponsiveEmbed() {
	    (0, _classCallCheck3['default'])(this, ResponsiveEmbed);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  ResponsiveEmbed.prototype.render = function render() {
	    var _extends2;
	
	    var _props = this.props;
	    var a16by9 = _props.a16by9;
	    var a4by3 = _props.a4by3;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['a16by9', 'a4by3', 'className', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(a16by9 || a4by3, 'Either `a16by9` or `a4by3` must be set.') : void 0;
	    process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(!(a16by9 && a4by3), 'Only one of `a16by9` or `a4by3` can be set.') : void 0;
	
	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[(0, _bootstrapUtils.prefix)(bsProps, '16by9')] = a16by9, _extends2[(0, _bootstrapUtils.prefix)(bsProps, '4by3')] = a4by3, _extends2));
	
	    return _react2['default'].createElement(
	      'div',
	      { className: (0, _classnames2['default'])(classes) },
	      (0, _react.cloneElement)(children, (0, _extends4['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, (0, _bootstrapUtils.prefix)(bsProps, 'item'))
	      }))
	    );
	  };
	
	  return ResponsiveEmbed;
	}(_react2['default'].Component);
	
	ResponsiveEmbed.propTypes = propTypes;
	ResponsiveEmbed.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('embed-responsive', ResponsiveEmbed);
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  componentClass: _elementType2['default']
	};
	
	var defaultProps = {
	  componentClass: 'div'
	};
	
	var Row = function (_React$Component) {
	  (0, _inherits3['default'])(Row, _React$Component);
	
	  function Row() {
	    (0, _classCallCheck3['default'])(this, Row);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Row.prototype.render = function render() {
	    var _props = this.props;
	    var Component = _props.componentClass;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['componentClass', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return Row;
	}(_react2['default'].Component);
	
	Row.propTypes = propTypes;
	Row.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('row', Row);
	module.exports = exports['default'];

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Button = __webpack_require__(176);
	
	var _Button2 = _interopRequireDefault(_Button);
	
	var _Dropdown = __webpack_require__(203);
	
	var _Dropdown2 = _interopRequireDefault(_Dropdown);
	
	var _SplitToggle = __webpack_require__(310);
	
	var _SplitToggle2 = _interopRequireDefault(_SplitToggle);
	
	var _splitComponentProps2 = __webpack_require__(230);
	
	var _splitComponentProps3 = _interopRequireDefault(_splitComponentProps2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = (0, _extends3['default'])({}, _Dropdown2['default'].propTypes, {
	
	  // Toggle props.
	  bsStyle: _react2['default'].PropTypes.string,
	  bsSize: _react2['default'].PropTypes.string,
	  href: _react2['default'].PropTypes.string,
	  onClick: _react2['default'].PropTypes.func,
	  /**
	   * The content of the split button.
	   */
	  title: _react2['default'].PropTypes.node.isRequired,
	  /**
	   * Accessible label for the toggle; the value of `title` if not specified.
	   */
	  toggleLabel: _react2['default'].PropTypes.string,
	
	  // Override generated docs from <Dropdown>.
	  /**
	   * @private
	   */
	  children: _react2['default'].PropTypes.node
	});
	
	var SplitButton = function (_React$Component) {
	  (0, _inherits3['default'])(SplitButton, _React$Component);
	
	  function SplitButton() {
	    (0, _classCallCheck3['default'])(this, SplitButton);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  SplitButton.prototype.render = function render() {
	    var _props = this.props;
	    var bsSize = _props.bsSize;
	    var bsStyle = _props.bsStyle;
	    var title = _props.title;
	    var toggleLabel = _props.toggleLabel;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['bsSize', 'bsStyle', 'title', 'toggleLabel', 'children']);
	
	    var _splitComponentProps = (0, _splitComponentProps3['default'])(props, _Dropdown2['default'].ControlledComponent);
	
	    var dropdownProps = _splitComponentProps[0];
	    var buttonProps = _splitComponentProps[1];
	
	
	    return _react2['default'].createElement(
	      _Dropdown2['default'],
	      (0, _extends3['default'])({}, dropdownProps, {
	        bsSize: bsSize,
	        bsStyle: bsStyle
	      }),
	      _react2['default'].createElement(
	        _Button2['default'],
	        (0, _extends3['default'])({}, buttonProps, {
	          disabled: props.disabled,
	          bsSize: bsSize,
	          bsStyle: bsStyle
	        }),
	        title
	      ),
	      _react2['default'].createElement(_SplitToggle2['default'], {
	        'aria-label': toggleLabel || title,
	        bsSize: bsSize,
	        bsStyle: bsStyle
	      }),
	      _react2['default'].createElement(
	        _Dropdown2['default'].Menu,
	        null,
	        children
	      )
	    );
	  };
	
	  return SplitButton;
	}(_react2['default'].Component);
	
	SplitButton.propTypes = propTypes;
	
	SplitButton.Toggle = _SplitToggle2['default'];
	
	exports['default'] = SplitButton;
	module.exports = exports['default'];

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _DropdownToggle = __webpack_require__(227);
	
	var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var SplitToggle = function (_React$Component) {
	  (0, _inherits3['default'])(SplitToggle, _React$Component);
	
	  function SplitToggle() {
	    (0, _classCallCheck3['default'])(this, SplitToggle);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  SplitToggle.prototype.render = function render() {
	    return _react2['default'].createElement(_DropdownToggle2['default'], (0, _extends3['default'])({}, this.props, {
	      useAnchor: false,
	      noCaret: false
	    }));
	  };
	
	  return SplitToggle;
	}(_react2['default'].Component);
	
	SplitToggle.defaultProps = _DropdownToggle2['default'].defaultProps;
	
	exports['default'] = SplitToggle;
	module.exports = exports['default'];

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _TabContainer = __webpack_require__(312);
	
	var _TabContainer2 = _interopRequireDefault(_TabContainer);
	
	var _TabContent = __webpack_require__(313);
	
	var _TabContent2 = _interopRequireDefault(_TabContent);
	
	var _TabPane = __webpack_require__(314);
	
	var _TabPane2 = _interopRequireDefault(_TabPane);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = (0, _extends3['default'])({}, _TabPane2['default'].propTypes, {
	
	  disabled: _react2['default'].PropTypes.bool,
	
	  title: _react2['default'].PropTypes.node,
	
	  /**
	   * tabClassName is used as className for the associated NavItem
	   */
	  tabClassName: _react2['default'].PropTypes.string
	});
	
	var Tab = function (_React$Component) {
	  (0, _inherits3['default'])(Tab, _React$Component);
	
	  function Tab() {
	    (0, _classCallCheck3['default'])(this, Tab);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Tab.prototype.render = function render() {
	    var props = (0, _extends3['default'])({}, this.props);
	
	    // These props are for the parent `<Tabs>` rather than the `<TabPane>`.
	    delete props.title;
	    delete props.disabled;
	    delete props.tabClassName;
	
	    return _react2['default'].createElement(_TabPane2['default'], props);
	  };
	
	  return Tab;
	}(_react2['default'].Component);
	
	Tab.propTypes = propTypes;
	
	Tab.Container = _TabContainer2['default'];
	Tab.Content = _TabContent2['default'];
	Tab.Pane = _TabPane2['default'];
	
	exports['default'] = Tab;
	module.exports = exports['default'];

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _uncontrollable = __webpack_require__(209);
	
	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var TAB = 'tab';
	var PANE = 'pane';
	
	var idPropType = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]);
	
	var propTypes = {
	  /**
	   * HTML id attribute, required if no `generateChildId` prop
	   * is specified.
	   */
	  id: function id(props) {
	    var error = null;
	
	    if (!props.generateChildId) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      error = idPropType.apply(undefined, [props].concat(args));
	
	      if (!error && !props.id) {
	        error = new Error('In order to properly initialize Tabs in a way that is accessible ' + 'to assistive technologies (such as screen readers) an `id` or a ' + '`generateChildId` prop to TabContainer is required');
	      }
	    }
	
	    return error;
	  },
	
	
	  /**
	   * A function that takes an `eventKey` and `type` and returns a unique id for
	   * child tab `<NavItem>`s and `<TabPane>`s. The function _must_ be a pure
	   * function, meaning it should always return the _same_ id for the same set
	   * of inputs. The default value requires that an `id` to be set for the
	   * `<TabContainer>`.
	   *
	   * The `type` argument will either be `"tab"` or `"pane"`.
	   *
	   * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
	   */
	  generateChildId: _react.PropTypes.func,
	
	  /**
	   * A callback fired when a tab is selected.
	   *
	   * @controllable activeKey
	   */
	  onSelect: _react.PropTypes.func,
	
	  /**
	   * The `eventKey` of the currently active tab.
	   *
	   * @controllable onSelect
	   */
	  activeKey: _react.PropTypes.any
	};
	
	var childContextTypes = {
	  $bs_tabContainer: _react2['default'].PropTypes.shape({
	    activeKey: _react.PropTypes.any,
	    onSelect: _react.PropTypes.func.isRequired,
	    getTabId: _react.PropTypes.func.isRequired,
	    getPaneId: _react.PropTypes.func.isRequired
	  })
	};
	
	var TabContainer = function (_React$Component) {
	  (0, _inherits3['default'])(TabContainer, _React$Component);
	
	  function TabContainer() {
	    (0, _classCallCheck3['default'])(this, TabContainer);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  TabContainer.prototype.getChildContext = function getChildContext() {
	    var _props = this.props;
	    var activeKey = _props.activeKey;
	    var onSelect = _props.onSelect;
	    var generateChildId = _props.generateChildId;
	    var id = _props.id;
	
	
	    var getId = generateChildId || function (key, type) {
	      return id ? id + '-' + type + '-' + key : null;
	    };
	
	    return {
	      $bs_tabContainer: {
	        activeKey: activeKey,
	        onSelect: onSelect,
	        getTabId: function getTabId(key) {
	          return getId(key, TAB);
	        },
	        getPaneId: function getPaneId(key) {
	          return getId(key, PANE);
	        }
	      }
	    };
	  };
	
	  TabContainer.prototype.render = function render() {
	    var _props2 = this.props;
	    var children = _props2.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props2, ['children']);
	
	
	    delete props.generateChildId;
	    delete props.onSelect;
	    delete props.activeKey;
	
	    return _react2['default'].cloneElement(_react2['default'].Children.only(children), props);
	  };
	
	  return TabContainer;
	}(_react2['default'].Component);
	
	TabContainer.propTypes = propTypes;
	TabContainer.childContextTypes = childContextTypes;
	
	exports['default'] = (0, _uncontrollable2['default'])(TabContainer, { activeKey: 'onSelect' });
	module.exports = exports['default'];

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  componentClass: _elementType2['default'],
	
	  /**
	   * Sets a default animation strategy for all children `<TabPane>`s. Use
	   * `false` to disable, `true` to enable the default `<Fade>` animation or any
	   * `<Transition>` component.
	   */
	  animation: _react.PropTypes.oneOfType([_react.PropTypes.bool, _elementType2['default']]),
	
	  /**
	   * Unmount tabs (remove it from the DOM) when they are no longer visible
	   */
	  unmountOnExit: _react.PropTypes.bool
	};
	
	var defaultProps = {
	  componentClass: 'div',
	  animation: true,
	  unmountOnExit: false
	};
	
	var contextTypes = {
	  $bs_tabContainer: _react.PropTypes.shape({
	    activeKey: _react.PropTypes.any
	  })
	};
	
	var childContextTypes = {
	  $bs_tabContent: _react.PropTypes.shape({
	    bsClass: _react.PropTypes.string,
	    animation: _react.PropTypes.oneOfType([_react.PropTypes.bool, _elementType2['default']]),
	    activeKey: _react.PropTypes.any,
	    unmountOnExit: _react.PropTypes.bool,
	    onPaneEnter: _react.PropTypes.func.isRequired,
	    onPaneExited: _react.PropTypes.func.isRequired,
	    exiting: _react.PropTypes.bool.isRequired
	  })
	};
	
	var TabContent = function (_React$Component) {
	  (0, _inherits3['default'])(TabContent, _React$Component);
	
	  function TabContent(props, context) {
	    (0, _classCallCheck3['default'])(this, TabContent);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handlePaneEnter = _this.handlePaneEnter.bind(_this);
	    _this.handlePaneExited = _this.handlePaneExited.bind(_this);
	
	    // Active entries in state will be `null` unless `animation` is set. Need
	    // to track active child in case keys swap and the active child changes
	    // but the active key does not.
	    _this.state = {
	      activeKey: null,
	      activeChild: null
	    };
	    return _this;
	  }
	
	  TabContent.prototype.getChildContext = function getChildContext() {
	    var _props = this.props;
	    var bsClass = _props.bsClass;
	    var animation = _props.animation;
	    var unmountOnExit = _props.unmountOnExit;
	
	
	    var stateActiveKey = this.state.activeKey;
	    var containerActiveKey = this.getContainerActiveKey();
	
	    var activeKey = stateActiveKey != null ? stateActiveKey : containerActiveKey;
	    var exiting = stateActiveKey != null && stateActiveKey !== containerActiveKey;
	
	    return {
	      $bs_tabContent: {
	        bsClass: bsClass,
	        animation: animation,
	        activeKey: activeKey,
	        unmountOnExit: unmountOnExit,
	        onPaneEnter: this.handlePaneEnter,
	        onPaneExited: this.handlePaneExited,
	        exiting: exiting
	      }
	    };
	  };
	
	  TabContent.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    if (!nextProps.animation && this.state.activeChild) {
	      this.setState({ activeKey: null, activeChild: null });
	    }
	  };
	
	  TabContent.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.isUnmounted = true;
	  };
	
	  TabContent.prototype.handlePaneEnter = function handlePaneEnter(child, childKey) {
	    if (!this.props.animation) {
	      return false;
	    }
	
	    // It's possible that this child should be transitioning out.
	    if (childKey !== this.getContainerActiveKey()) {
	      return false;
	    }
	
	    this.setState({
	      activeKey: childKey,
	      activeChild: child
	    });
	
	    return true;
	  };
	
	  TabContent.prototype.handlePaneExited = function handlePaneExited(child) {
	    // This might happen as everything is unmounting.
	    if (this.isUnmounted) {
	      return;
	    }
	
	    this.setState(function (_ref) {
	      var activeChild = _ref.activeChild;
	
	      if (activeChild !== child) {
	        return null;
	      }
	
	      return {
	        activeKey: null,
	        activeChild: null
	      };
	    });
	  };
	
	  TabContent.prototype.getContainerActiveKey = function getContainerActiveKey() {
	    var tabContainer = this.context.$bs_tabContainer;
	    return tabContainer && tabContainer.activeKey;
	  };
	
	  TabContent.prototype.render = function render() {
	    var _props2 = this.props;
	    var Component = _props2.componentClass;
	    var className = _props2.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props2, ['componentClass', 'className']);
	
	    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['animation', 'unmountOnExit']);
	
	    var bsProps = _splitBsPropsAndOmit[0];
	    var elementProps = _splitBsPropsAndOmit[1];
	
	
	    return _react2['default'].createElement(Component, (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, (0, _bootstrapUtils.prefix)(bsProps, 'content'))
	    }));
	  };
	
	  return TabContent;
	}(_react2['default'].Component);
	
	TabContent.propTypes = propTypes;
	TabContent.defaultProps = defaultProps;
	TabContent.contextTypes = contextTypes;
	TabContent.childContextTypes = childContextTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('tab', TabContent);
	module.exports = exports['default'];

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _elementType = __webpack_require__(174);
	
	var _elementType2 = _interopRequireDefault(_elementType);
	
	var _warning = __webpack_require__(9);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _createChainedFunction = __webpack_require__(164);
	
	var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);
	
	var _Fade = __webpack_require__(231);
	
	var _Fade2 = _interopRequireDefault(_Fade);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * Uniquely identify the `<TabPane>` among its siblings.
	   */
	  eventKey: _react.PropTypes.any,
	
	  /**
	   * Use animation when showing or hiding `<TabPane>`s. Use `false` to disable,
	   * `true` to enable the default `<Fade>` animation or any `<Transition>`
	   * component.
	   */
	  animation: _react.PropTypes.oneOfType([_react.PropTypes.bool, _elementType2['default']]),
	
	  /** @private **/
	  id: _react.PropTypes.string,
	
	  /** @private **/
	  'aria-labelledby': _react.PropTypes.string,
	
	  /**
	   * If not explicitly specified and rendered in the context of a
	   * `<TabContent>`, the `bsClass` of the `<TabContent>` suffixed by `-pane`.
	   * If otherwise not explicitly specified, `tab-pane`.
	   */
	  bsClass: _react2['default'].PropTypes.string,
	
	  /**
	   * Transition onEnter callback when animation is not `false`
	   */
	  onEnter: _react.PropTypes.func,
	
	  /**
	   * Transition onEntering callback when animation is not `false`
	   */
	  onEntering: _react.PropTypes.func,
	
	  /**
	   * Transition onEntered callback when animation is not `false`
	   */
	  onEntered: _react.PropTypes.func,
	
	  /**
	   * Transition onExit callback when animation is not `false`
	   */
	  onExit: _react.PropTypes.func,
	
	  /**
	   * Transition onExiting callback when animation is not `false`
	   */
	  onExiting: _react.PropTypes.func,
	
	  /**
	   * Transition onExited callback when animation is not `false`
	   */
	  onExited: _react.PropTypes.func,
	
	  /**
	   * Unmount the tab (remove it from the DOM) when it is no longer visible
	   */
	  unmountOnExit: _react.PropTypes.bool
	};
	
	var contextTypes = {
	  $bs_tabContainer: _react.PropTypes.shape({
	    getId: _react.PropTypes.func,
	    unmountOnExit: _react.PropTypes.bool
	  }),
	  $bs_tabContent: _react.PropTypes.shape({
	    bsClass: _react.PropTypes.string,
	    animation: _react.PropTypes.oneOfType([_react.PropTypes.bool, _elementType2['default']]),
	    activeKey: _react.PropTypes.any,
	    unmountOnExit: _react.PropTypes.bool,
	    onPaneEnter: _react.PropTypes.func.isRequired,
	    onPaneExited: _react.PropTypes.func.isRequired,
	    exiting: _react.PropTypes.bool.isRequired
	  })
	};
	
	/**
	 * We override the `<TabContainer>` context so `<Nav>`s in `<TabPane>`s don't
	 * conflict with the top level one.
	 */
	var childContextTypes = {
	  $bs_tabContainer: _react.PropTypes.oneOf([null])
	};
	
	var TabPane = function (_React$Component) {
	  (0, _inherits3['default'])(TabPane, _React$Component);
	
	  function TabPane(props, context) {
	    (0, _classCallCheck3['default'])(this, TabPane);
	
	    var _this = (0, _possibleConstructorReturn3['default'])(this, _React$Component.call(this, props, context));
	
	    _this.handleEnter = _this.handleEnter.bind(_this);
	    _this.handleExited = _this.handleExited.bind(_this);
	
	    _this['in'] = false;
	    return _this;
	  }
	
	  TabPane.prototype.getChildContext = function getChildContext() {
	    return {
	      $bs_tabContainer: null
	    };
	  };
	
	  TabPane.prototype.componentDidMount = function componentDidMount() {
	    if (this.shouldBeIn()) {
	      // In lieu of the action event firing.
	      this.handleEnter();
	    }
	  };
	
	  TabPane.prototype.componentDidUpdate = function componentDidUpdate() {
	    if (this['in']) {
	      if (!this.shouldBeIn()) {
	        // We shouldn't be active any more. Notify the parent.
	        this.handleExited();
	      }
	    } else if (this.shouldBeIn()) {
	      // We are the active child. Notify the parent.
	      this.handleEnter();
	    }
	  };
	
	  TabPane.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this['in']) {
	      // In lieu of the action event firing.
	      this.handleExited();
	    }
	  };
	
	  TabPane.prototype.handleEnter = function handleEnter() {
	    var tabContent = this.context.$bs_tabContent;
	    if (!tabContent) {
	      return;
	    }
	
	    this['in'] = tabContent.onPaneEnter(this, this.props.eventKey);
	  };
	
	  TabPane.prototype.handleExited = function handleExited() {
	    var tabContent = this.context.$bs_tabContent;
	    if (!tabContent) {
	      return;
	    }
	
	    tabContent.onPaneExited(this);
	    this['in'] = false;
	  };
	
	  TabPane.prototype.getAnimation = function getAnimation() {
	    if (this.props.animation != null) {
	      return this.props.animation;
	    }
	
	    var tabContent = this.context.$bs_tabContent;
	    return tabContent && tabContent.animation;
	  };
	
	  TabPane.prototype.isActive = function isActive() {
	    var tabContent = this.context.$bs_tabContent;
	    var activeKey = tabContent && tabContent.activeKey;
	
	    return this.props.eventKey === activeKey;
	  };
	
	  TabPane.prototype.shouldBeIn = function shouldBeIn() {
	    return this.getAnimation() && this.isActive();
	  };
	
	  TabPane.prototype.render = function render() {
	    var _props = this.props;
	    var eventKey = _props.eventKey;
	    var className = _props.className;
	    var onEnter = _props.onEnter;
	    var onEntering = _props.onEntering;
	    var onEntered = _props.onEntered;
	    var onExit = _props.onExit;
	    var onExiting = _props.onExiting;
	    var onExited = _props.onExited;
	    var propsUnmountOnExit = _props.unmountOnExit;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['eventKey', 'className', 'onEnter', 'onEntering', 'onEntered', 'onExit', 'onExiting', 'onExited', 'unmountOnExit']);
	    var _context = this.context;
	    var tabContent = _context.$bs_tabContent;
	    var tabContainer = _context.$bs_tabContainer;
	
	    var _splitBsPropsAndOmit = (0, _bootstrapUtils.splitBsPropsAndOmit)(props, ['animation']);
	
	    var bsProps = _splitBsPropsAndOmit[0];
	    var elementProps = _splitBsPropsAndOmit[1];
	
	
	    var active = this.isActive();
	    var animation = this.getAnimation();
	
	    var unmountOnExit = propsUnmountOnExit != null ? propsUnmountOnExit : tabContent && tabContent.unmountOnExit;
	
	    if (!active && !animation && unmountOnExit) {
	      return null;
	    }
	
	    var Transition = animation === true ? _Fade2['default'] : animation || null;
	
	    if (tabContent) {
	      bsProps.bsClass = (0, _bootstrapUtils.prefix)(tabContent, 'pane');
	    }
	
	    var classes = (0, _extends3['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), {
	      active: active
	    });
	
	    if (tabContainer) {
	      process.env.NODE_ENV !== 'production' ? (0, _warning2['default'])(!elementProps.id && !elementProps['aria-labelledby'], 'In the context of a `<TabContainer>`, `<TabPanes>` are given ' + 'generated `id` and `aria-labelledby` attributes for the sake of ' + 'proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly provide a `generateChildId` ' + 'prop to the parent `<TabContainer>`.') : void 0;
	
	      elementProps.id = tabContainer.getPaneId(eventKey);
	      elementProps['aria-labelledby'] = tabContainer.getTabId(eventKey);
	    }
	
	    var pane = _react2['default'].createElement('div', (0, _extends3['default'])({}, elementProps, {
	      role: 'tabpanel',
	      'aria-hidden': !active,
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	
	    if (Transition) {
	      var exiting = tabContent && tabContent.exiting;
	
	      return _react2['default'].createElement(
	        Transition,
	        {
	          'in': active && !exiting,
	          onEnter: (0, _createChainedFunction2['default'])(this.handleEnter, onEnter),
	          onEntering: onEntering,
	          onEntered: onEntered,
	          onExit: onExit,
	          onExiting: onExiting,
	          onExited: (0, _createChainedFunction2['default'])(this.handleExited, onExited),
	          unmountOnExit: unmountOnExit
	        },
	        pane
	      );
	    }
	
	    return pane;
	  };
	
	  return TabPane;
	}(_react2['default'].Component);
	
	TabPane.propTypes = propTypes;
	TabPane.contextTypes = contextTypes;
	TabPane.childContextTypes = childContextTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('tab-pane', TabPane);
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  striped: _react2['default'].PropTypes.bool,
	  bordered: _react2['default'].PropTypes.bool,
	  condensed: _react2['default'].PropTypes.bool,
	  hover: _react2['default'].PropTypes.bool,
	  responsive: _react2['default'].PropTypes.bool
	};
	
	var defaultProps = {
	  bordered: false,
	  condensed: false,
	  hover: false,
	  responsive: false,
	  striped: false
	};
	
	var Table = function (_React$Component) {
	  (0, _inherits3['default'])(Table, _React$Component);
	
	  function Table() {
	    (0, _classCallCheck3['default'])(this, Table);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Table.prototype.render = function render() {
	    var _extends2;
	
	    var _props = this.props;
	    var striped = _props.striped;
	    var bordered = _props.bordered;
	    var condensed = _props.condensed;
	    var hover = _props.hover;
	    var responsive = _props.responsive;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['striped', 'bordered', 'condensed', 'hover', 'responsive', 'className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'striped')] = striped, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'bordered')] = bordered, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'condensed')] = condensed, _extends2[(0, _bootstrapUtils.prefix)(bsProps, 'hover')] = hover, _extends2));
	
	    var table = _react2['default'].createElement('table', (0, _extends4['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	
	    if (responsive) {
	      return _react2['default'].createElement(
	        'div',
	        { className: (0, _bootstrapUtils.prefix)(bsProps, 'responsive') },
	        table
	      );
	    }
	
	    return table;
	  };
	
	  return Table;
	}(_react2['default'].Component);
	
	Table.propTypes = propTypes;
	Table.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('table', Table);
	module.exports = exports['default'];

/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _isRequiredForA11y = __webpack_require__(208);
	
	var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);
	
	var _uncontrollable = __webpack_require__(209);
	
	var _uncontrollable2 = _interopRequireDefault(_uncontrollable);
	
	var _Nav = __webpack_require__(278);
	
	var _Nav2 = _interopRequireDefault(_Nav);
	
	var _NavItem = __webpack_require__(285);
	
	var _NavItem2 = _interopRequireDefault(_NavItem);
	
	var _TabContainer = __webpack_require__(312);
	
	var _TabContainer2 = _interopRequireDefault(_TabContainer);
	
	var _TabContent = __webpack_require__(313);
	
	var _TabContent2 = _interopRequireDefault(_TabContent);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _ValidComponentChildren = __webpack_require__(165);
	
	var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var TabContainer = _TabContainer2['default'].ControlledComponent;
	
	var propTypes = {
	  /**
	   * Mark the Tab with a matching `eventKey` as active.
	   *
	   * @controllable onSelect
	   */
	  activeKey: _react2['default'].PropTypes.any,
	
	  /**
	   * Navigation style
	   */
	  bsStyle: _react2['default'].PropTypes.oneOf(['tabs', 'pills']),
	
	  animation: _react2['default'].PropTypes.bool,
	
	  id: (0, _isRequiredForA11y2['default'])(_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),
	
	  /**
	   * Callback fired when a Tab is selected.
	   *
	   * ```js
	   * function (
	   * 	Any eventKey,
	   * 	SyntheticEvent event?
	   * )
	   * ```
	   *
	   * @controllable activeKey
	   */
	  onSelect: _react2['default'].PropTypes.func,
	
	  /**
	   * Unmount tabs (remove it from the DOM) when it is no longer visible
	   */
	  unmountOnExit: _react2['default'].PropTypes.bool
	};
	
	var defaultProps = {
	  bsStyle: 'tabs',
	  animation: true,
	  unmountOnExit: false
	};
	
	function getDefaultActiveKey(children) {
	  var defaultActiveKey = void 0;
	  _ValidComponentChildren2['default'].forEach(children, function (child) {
	    if (defaultActiveKey == null) {
	      defaultActiveKey = child.props.eventKey;
	    }
	  });
	
	  return defaultActiveKey;
	}
	
	var Tabs = function (_React$Component) {
	  (0, _inherits3['default'])(Tabs, _React$Component);
	
	  function Tabs() {
	    (0, _classCallCheck3['default'])(this, Tabs);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Tabs.prototype.renderTab = function renderTab(child) {
	    var _child$props = child.props;
	    var title = _child$props.title;
	    var eventKey = _child$props.eventKey;
	    var disabled = _child$props.disabled;
	    var tabClassName = _child$props.tabClassName;
	
	    if (title == null) {
	      return null;
	    }
	
	    return _react2['default'].createElement(
	      _NavItem2['default'],
	      {
	        eventKey: eventKey,
	        disabled: disabled,
	        className: tabClassName
	      },
	      title
	    );
	  };
	
	  Tabs.prototype.render = function render() {
	    var _props = this.props;
	    var id = _props.id;
	    var onSelect = _props.onSelect;
	    var animation = _props.animation;
	    var unmountOnExit = _props.unmountOnExit;
	    var bsClass = _props.bsClass;
	    var className = _props.className;
	    var style = _props.style;
	    var children = _props.children;
	    var _props$activeKey = _props.activeKey;
	    var activeKey = _props$activeKey === undefined ? getDefaultActiveKey(children) : _props$activeKey;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['id', 'onSelect', 'animation', 'unmountOnExit', 'bsClass', 'className', 'style', 'children', 'activeKey']);
	
	
	    return _react2['default'].createElement(
	      TabContainer,
	      {
	        id: id,
	        activeKey: activeKey,
	        onSelect: onSelect,
	        className: className,
	        style: style
	      },
	      _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          _Nav2['default'],
	          (0, _extends3['default'])({}, props, {
	            role: 'tablist'
	          }),
	          _ValidComponentChildren2['default'].map(children, this.renderTab)
	        ),
	        _react2['default'].createElement(
	          _TabContent2['default'],
	          {
	            bsClass: bsClass,
	            animation: animation,
	            unmountOnExit: unmountOnExit
	          },
	          children
	        )
	      )
	    );
	  };
	
	  return Tabs;
	}(_react2['default'].Component);
	
	Tabs.propTypes = propTypes;
	Tabs.defaultProps = defaultProps;
	
	(0, _bootstrapUtils.bsClass)('tab', Tabs);
	
	exports['default'] = (0, _uncontrollable2['default'])(Tabs, { activeKey: 'onSelect' });
	module.exports = exports['default'];

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _SafeAnchor = __webpack_require__(173);
	
	var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  src: _react2['default'].PropTypes.string,
	  alt: _react2['default'].PropTypes.string,
	  href: _react2['default'].PropTypes.string
	};
	
	var Thumbnail = function (_React$Component) {
	  (0, _inherits3['default'])(Thumbnail, _React$Component);
	
	  function Thumbnail() {
	    (0, _classCallCheck3['default'])(this, Thumbnail);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Thumbnail.prototype.render = function render() {
	    var _props = this.props;
	    var src = _props.src;
	    var alt = _props.alt;
	    var className = _props.className;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['src', 'alt', 'className', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var Component = elementProps.href ? _SafeAnchor2['default'] : 'div';
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement(
	      Component,
	      (0, _extends3['default'])({}, elementProps, {
	        className: (0, _classnames2['default'])(className, classes)
	      }),
	      _react2['default'].createElement('img', { src: src, alt: alt }),
	      children && _react2['default'].createElement(
	        'div',
	        { className: 'caption' },
	        children
	      )
	    );
	  };
	
	  return Thumbnail;
	}(_react2['default'].Component);
	
	Thumbnail.propTypes = propTypes;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('thumbnail', Thumbnail);
	module.exports = exports['default'];

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends3 = __webpack_require__(72);
	
	var _extends4 = _interopRequireDefault(_extends3);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _isRequiredForA11y = __webpack_require__(208);
	
	var _isRequiredForA11y2 = _interopRequireDefault(_isRequiredForA11y);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var propTypes = {
	  /**
	   * An html id attribute, necessary for accessibility
	   * @type {string|number}
	   * @required
	   */
	  id: (0, _isRequiredForA11y2['default'])(_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),
	
	  /**
	   * Sets the direction the Tooltip is positioned towards.
	   */
	  placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
	
	  /**
	   * The "top" position value for the Tooltip.
	   */
	  positionTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	  /**
	   * The "left" position value for the Tooltip.
	   */
	  positionLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	
	  /**
	   * The "top" position value for the Tooltip arrow.
	   */
	  arrowOffsetTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
	  /**
	   * The "left" position value for the Tooltip arrow.
	   */
	  arrowOffsetLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string])
	};
	
	var defaultProps = {
	  placement: 'right'
	};
	
	var Tooltip = function (_React$Component) {
	  (0, _inherits3['default'])(Tooltip, _React$Component);
	
	  function Tooltip() {
	    (0, _classCallCheck3['default'])(this, Tooltip);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Tooltip.prototype.render = function render() {
	    var _extends2;
	
	    var _props = this.props;
	    var placement = _props.placement;
	    var positionTop = _props.positionTop;
	    var positionLeft = _props.positionLeft;
	    var arrowOffsetTop = _props.arrowOffsetTop;
	    var arrowOffsetLeft = _props.arrowOffsetLeft;
	    var className = _props.className;
	    var style = _props.style;
	    var children = _props.children;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['placement', 'positionTop', 'positionLeft', 'arrowOffsetTop', 'arrowOffsetLeft', 'className', 'style', 'children']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _extends4['default'])({}, (0, _bootstrapUtils.getClassSet)(bsProps), (_extends2 = {}, _extends2[placement] = true, _extends2));
	
	    var outerStyle = (0, _extends4['default'])({
	      top: positionTop,
	      left: positionLeft
	    }, style);
	
	    var arrowStyle = {
	      top: arrowOffsetTop,
	      left: arrowOffsetLeft
	    };
	
	    return _react2['default'].createElement(
	      'div',
	      (0, _extends4['default'])({}, elementProps, {
	        role: 'tooltip',
	        className: (0, _classnames2['default'])(className, classes),
	        style: outerStyle
	      }),
	      _react2['default'].createElement('div', { className: (0, _bootstrapUtils.prefix)(bsProps, 'arrow'), style: arrowStyle }),
	      _react2['default'].createElement(
	        'div',
	        { className: (0, _bootstrapUtils.prefix)(bsProps, 'inner') },
	        children
	      )
	    );
	  };
	
	  return Tooltip;
	}(_react2['default'].Component);
	
	Tooltip.propTypes = propTypes;
	Tooltip.defaultProps = defaultProps;
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('tooltip', Tooltip);
	module.exports = exports['default'];

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends2 = __webpack_require__(72);
	
	var _extends3 = _interopRequireDefault(_extends2);
	
	var _objectWithoutProperties2 = __webpack_require__(156);
	
	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
	
	var _classCallCheck2 = __webpack_require__(110);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _possibleConstructorReturn2 = __webpack_require__(111);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(147);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _bootstrapUtils = __webpack_require__(158);
	
	var _StyleConfig = __webpack_require__(163);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var Well = function (_React$Component) {
	  (0, _inherits3['default'])(Well, _React$Component);
	
	  function Well() {
	    (0, _classCallCheck3['default'])(this, Well);
	    return (0, _possibleConstructorReturn3['default'])(this, _React$Component.apply(this, arguments));
	  }
	
	  Well.prototype.render = function render() {
	    var _props = this.props;
	    var className = _props.className;
	    var props = (0, _objectWithoutProperties3['default'])(_props, ['className']);
	
	    var _splitBsProps = (0, _bootstrapUtils.splitBsProps)(props);
	
	    var bsProps = _splitBsProps[0];
	    var elementProps = _splitBsProps[1];
	
	
	    var classes = (0, _bootstrapUtils.getClassSet)(bsProps);
	
	    return _react2['default'].createElement('div', (0, _extends3['default'])({}, elementProps, {
	      className: (0, _classnames2['default'])(className, classes)
	    }));
	  };
	
	  return Well;
	}(_react2['default'].Component);
	
	exports['default'] = (0, _bootstrapUtils.bsClass)('well', (0, _bootstrapUtils.bsSizes)([_StyleConfig.Size.LARGE, _StyleConfig.Size.SMALL], Well));
	module.exports = exports['default'];

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ValidComponentChildren = exports.createChainedFunction = exports.bootstrapUtils = undefined;
	
	var _bootstrapUtils2 = __webpack_require__(158);
	
	var _bootstrapUtils = _interopRequireWildcard(_bootstrapUtils2);
	
	var _createChainedFunction2 = __webpack_require__(164);
	
	var _createChainedFunction3 = _interopRequireDefault(_createChainedFunction2);
	
	var _ValidComponentChildren2 = __webpack_require__(165);
	
	var _ValidComponentChildren3 = _interopRequireDefault(_ValidComponentChildren2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	exports.bootstrapUtils = _bootstrapUtils;
	exports.createChainedFunction = _createChainedFunction3['default'];
	exports.ValidComponentChildren = _ValidComponentChildren3['default'];

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var appDispatcher_1 = __webpack_require__(322);
	var authConstants_1 = __webpack_require__(326);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    //Action : The logUserIn Action
	    logUserIn: function (data) {
	        appDispatcher_1.default.dispatch({
	            actionType: authConstants_1.default.LOGIN_CASE,
	            data: data
	        });
	    },
	    //Action : The logUserOut Action
	    logUserOut: function () {
	        appDispatcher_1.default.dispatch({
	            actionType: authConstants_1.default.LOGOUT_CASE
	        });
	    }
	};


/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var flux_1 = __webpack_require__(323);
	var AppDispatcher = new flux_1.Dispatcher();
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AppDispatcher;


/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	module.exports.Dispatcher = __webpack_require__(324);


/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */
	
	'use strict';
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var invariant = __webpack_require__(325);
	
	var _prefix = 'ID_';
	
	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */
	
	var Dispatcher = (function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);
	
	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }
	
	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */
	
	  Dispatcher.prototype.register = function register(callback) {
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };
	
	  /**
	   * Removes a callback based on its token.
	   */
	
	  Dispatcher.prototype.unregister = function unregister(id) {
	    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };
	
	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */
	
	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };
	
	  /**
	   * Dispatches a payload to all registered callbacks.
	   */
	
	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };
	
	  /**
	   * Is this Dispatcher currently dispatching.
	   */
	
	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };
	
	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };
	
	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };
	
	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };
	
	  return Dispatcher;
	})();
	
	module.exports = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	"use strict";
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function (condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var keyMirror = __webpack_require__(327);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = keyMirror({
	    LOGIN_CASE: null,
	    LOGOUT_CASE: null,
	    V_CASE: null,
	    X_CASE: null
	});


/***/ },
/* 327 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */
	
	"use strict";
	
	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  if (!(obj instanceof Object && !Array.isArray(obj))) {
	    throw new Error('keyMirror(...): Argument must be an object.');
	  }
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};
	
	module.exports = keyMirror;


/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var appDispatcher_1 = __webpack_require__(322);
	var authConstants_1 = __webpack_require__(326);
	var events_1 = __webpack_require__(329);
	var CHANGE_EVENT = 'change';
	function setUser(data) {
	    if (!localStorage.getItem('user_id')) {
	        localStorage.setItem('user_id', data.id);
	    }
	}
	function removeUser() {
	    localStorage.removeItem('user_id');
	}
	var AuthStoreClass = (function (_super) {
	    __extends(AuthStoreClass, _super);
	    function AuthStoreClass() {
	        _super.apply(this, arguments);
	    }
	    AuthStoreClass.prototype.emitChange = function () {
	        this.emit(CHANGE_EVENT);
	    };
	    AuthStoreClass.prototype.addChangeListener = function (callback) {
	        this.on(CHANGE_EVENT, callback);
	    };
	    AuthStoreClass.prototype.removeChangeListener = function (callback) {
	        this.removeListener(CHANGE_EVENT, callback);
	    };
	    AuthStoreClass.prototype.isAuthenticated = function () {
	        if (localStorage.getItem('user_id')) {
	            return true;
	        }
	        return false;
	    };
	    AuthStoreClass.prototype.getUserId = function () {
	        return localStorage.getItem('user_id');
	    };
	    return AuthStoreClass;
	}(events_1.EventEmitter));
	var AuthStore = new AuthStoreClass();
	// register a callback for the dispatcher and respond appropriately to various action types
	AuthStore.dispatchToken = appDispatcher_1.default.register(function (action) {
	    switch (action.actionType) {
	        case authConstants_1.default.LOGIN_CASE:
	            setUser(action.data);
	            AuthStore.emitChange();
	            break;
	        case authConstants_1.default.LOGOUT_CASE:
	            removeUser();
	            AuthStore.emitChange();
	            break;
	        default:
	    }
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AuthStore;


/***/ },
/* 329 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var react_bootstrap_1 = __webpack_require__(70);
	var Select = __webpack_require__(331);
	var authenticationServices_1 = __webpack_require__(338);
	var authenticationActions_1 = __webpack_require__(321);
	var listActions_1 = __webpack_require__(346);
	var remoteValidationActions_1 = __webpack_require__(349);
	var listStore_1 = __webpack_require__(351);
	var remoteValidationStore_1 = __webpack_require__(352);
	var utils_1 = __webpack_require__(353);
	var SignIn = (function (_super) {
	    __extends(SignIn, _super);
	    function SignIn(props) {
	        _super.call(this, props);
	        //initial state
	        this.state = {
	            index: "33",
	            phone: '',
	            password: '',
	            countryCodesList: [],
	            phoneNumberHint: '',
	            passwordHint: '',
	            isPhoneNumberExist: null,
	            isPhoneNumberValid: false,
	            isPasswordValid: false,
	            isFormValid: false,
	            isLoading: false // boolean defines state of Authentication operation
	        };
	        //bind functions
	        this.onChangeRemoteValidationStore = this.onChangeRemoteValidationStore.bind(this);
	        this.onChangeListStore = this.onChangeListStore.bind(this);
	        this.handlePasswordChange = this.handlePasswordChange.bind(this);
	        this.handlePhoneChange = this.handlePhoneChange.bind(this);
	        this.HandleCountryCodeListChange = this.HandleCountryCodeListChange.bind(this);
	        this.isPhoneNumberValid = this.isPhoneNumberValid.bind(this);
	        this.isPasswordValid = this.isPasswordValid.bind(this);
	        this.getUserByPhoneNumber = this.getUserByPhoneNumber.bind(this);
	        this.logIn = this.logIn.bind(this);
	        this.gotoHome = this.gotoHome.bind(this);
	    }
	    SignIn.prototype.componentWillMount = function () {
	        //add Lists and remoteValidations stores changes listeners
	        listStore_1.default.addChangeListener(this.onChangeListStore);
	        remoteValidationStore_1.default.addChangeListener(this.onChangeRemoteValidationStore);
	    };
	    SignIn.prototype.componentDidMount = function () {
	        listActions_1.default.getCountryCallingCodes();
	        remoteValidationActions_1.default.initialize();
	    };
	    SignIn.prototype.componentWillUnmount = function () {
	        //remove the stores changes listeners
	        listStore_1.default.removeChangeListener(this.onChangeListStore);
	        remoteValidationStore_1.default.removeChangeListener(this.onChangeRemoteValidationStore);
	    };
	    //function to nvigate to Home Page
	    SignIn.prototype.gotoHome = function () {
	        this.context.router.push('/');
	    };
	    //function: load country calling codes List from the store
	    SignIn.prototype.onChangeListStore = function () {
	        this.setState({
	            countryCodesList: listStore_1.default.getCountryCallingsCodes()
	        });
	    };
	    //function: change the state of isPhoneNumberExist and call isPhoneNumberValid()
	    SignIn.prototype.onChangeRemoteValidationStore = function () {
	        this.setState({
	            isPhoneNumberExist: remoteValidationStore_1.default.isPhoneNumberExist(),
	        }, function () {
	            this.isPhoneNumberValid();
	        });
	    };
	    SignIn.prototype.handlePasswordChange = function (e) {
	        console.log(e.target.value);
	        this.setState({
	            password: e.target.value
	        }, function () {
	            this.isPasswordValid();
	        });
	    };
	    SignIn.prototype.handlePhoneChange = function (e) {
	        var newValue = e.target.value.replace(/[^0-9]/g, "");
	        var isIndexExist = utils_1.default.listHasValue(this.state.countryCodesList, this.state.index);
	        this.setState({
	            phone: newValue,
	            isPhoneNumberExist: null
	        }, function () {
	            this.isPhoneNumberValid();
	            this.getUserByPhoneNumber();
	        });
	    };
	    SignIn.prototype.getUserByPhoneNumber = function () {
	        var isIndexExist = utils_1.default.listHasValue(this.state.countryCodesList, this.state.index);
	        if (this.state.phone.length == 9 && isIndexExist) {
	            remoteValidationActions_1.default.getUserByPhone(this.state.index, this.state.phone);
	        }
	    };
	    SignIn.prototype.handleIndexChange = function (e) {
	        var newValue = e.target.value.replace(/[^0-9]/g, "");
	        this.setState({
	            index: newValue,
	            isPhoneNumberExist: null
	        }, function () {
	            this.isPhoneNumberValid();
	            this.getUserByPhoneNumber();
	        });
	    };
	    // call Authenticate service and logIn/notify the user in success/failure case
	    SignIn.prototype.logIn = function () {
	        var _this = this;
	        if (this.state.isFormValid) {
	            var index = this.state.index;
	            var phoneNumber = this.state.phone;
	            var password = this.state.password;
	            //state of authentication: Loading
	            this.setState({
	                isLoading: true
	            });
	            authenticationServices_1.default
	                .Athenticate(index, phoneNumber, password, '', '')
	                .then(function (res) {
	                //state of authentication: Done
	                _this.setState({
	                    isLoading: false
	                });
	                //case of authentication failure : server unavailable or connection problem
	                if (!res || res.length == 0 || (res.id == 0 && res.status == "failure")) {
	                    console.log("Serveur non disponible ou problème de connexion.");
	                    return;
	                }
	                //case of incorrect password
	                if (res.id == 0 && res.status == "passwordError") {
	                    _this.setState({
	                        passwordHint: "le mot de passe saisi est incorrect"
	                    });
	                    return;
	                }
	                //case of success : call AuthAction logIn and redirect to home page (for now...)
	                authenticationActions_1.default.logUserIn(res);
	                _this.gotoHome();
	            })
	                .catch(function (err) {
	                console.log(err);
	                //state of authentication operation : done
	                _this.setState({
	                    isLoading: false
	                });
	            });
	        }
	    };
	    //verify if the full phonenumber is valid and show error message for every case
	    SignIn.prototype.isPhoneNumberValid = function () {
	        var isIndexExist = utils_1.default.listHasValue(this.state.countryCodesList, this.state.index);
	        var index = this.state.index;
	        var phoneNumber = this.state.phone;
	        var password = this.state.password;
	        var isPhoneNumberExist = this.state.isPhoneNumberExist;
	        var phoneMsg = '';
	        var _isPhoneNumberValid = true;
	        if (!index || !phoneNumber) {
	            phoneMsg = "Veillez saisir l'indicatif téléphonique et le téléphone";
	            _isPhoneNumberValid = false;
	        }
	        else {
	            if (phoneNumber.length != 9) {
	                phoneMsg = "le numéro de téléphone doit contenir 9 chiffres";
	                _isPhoneNumberValid = false;
	            }
	            else if (!isIndexExist) {
	                phoneMsg = "l'indicatif téléphonique est non disponible";
	                _isPhoneNumberValid = false;
	            }
	            else {
	                if (isPhoneNumberExist == null) {
	                    phoneMsg = "Verification en cours ...";
	                    _isPhoneNumberValid = false;
	                }
	                else if (isPhoneNumberExist == false) {
	                    phoneMsg = "Ce numéro de téléphone est non inscrit";
	                    _isPhoneNumberValid = false;
	                }
	                else {
	                    phoneMsg = "";
	                }
	            }
	        }
	        this.setState({
	            phoneNumberHint: phoneMsg,
	            isPhoneNumberValid: _isPhoneNumberValid
	        }, function () {
	            this.isFormValid();
	        });
	    };
	    //verify if the password is valid and show error message for every case
	    SignIn.prototype.isPasswordValid = function () {
	        var password = this.state.password;
	        var passwordMsg = '';
	        var _isPasswordValid = true;
	        if (!password) {
	            passwordMsg = "le mot de passe est obligatoire";
	            _isPasswordValid = false;
	        }
	        else {
	            passwordMsg = "";
	        }
	        this.setState({
	            passwordHint: passwordMsg,
	            isPasswordValid: _isPasswordValid
	        }, function () {
	            this.isFormValid();
	        });
	    };
	    //verify if all form input and remote validation are valid
	    SignIn.prototype.isFormValid = function () {
	        var isPhoneValid = this.state.isPhoneNumberValid;
	        var isPasswordValid = this.state.isPasswordValid;
	        var _isFormValid = false;
	        if (isPhoneValid && isPasswordValid) {
	            _isFormValid = true;
	        }
	        this.setState({
	            isFormValid: _isFormValid
	        });
	    };
	    SignIn.prototype.HandleCountryCodeListChange = function (option) {
	        this.setState({ index: option.value });
	    };
	    SignIn.prototype.render = function () {
	        var isLoading = this.state.isLoading;
	        var isFormValid = this.state.isFormValid;
	        return (React.createElement(react_bootstrap_1.Grid, null, React.createElement(react_bootstrap_1.Row, {className: "show-grid"}, React.createElement(react_bootstrap_1.Col, {xs: 12, md: 6, mdPush: 3}, React.createElement(react_bootstrap_1.Form, {horizontal: true}, React.createElement(react_bootstrap_1.FormGroup, null, React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Pays"), React.createElement(react_bootstrap_1.Col, {sm: 9}, React.createElement(Select, {ref: 'fieldInput', name: "name1", value: this.state.index, onChange: this.HandleCountryCodeListChange, options: this.state.countryCodesList}))), React.createElement(react_bootstrap_1.FormGroup, {controlId: "formGroupPhoneNumber"}, React.createElement("div", null, React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Téléphone"), React.createElement(react_bootstrap_1.Col, {sm: 3}, React.createElement(react_bootstrap_1.FormControl, {type: "text", placeholder: "Indice", maxLength: 4, value: this.state.index, onChange: this.handleIndexChange.bind(this)})), React.createElement(react_bootstrap_1.Col, {sm: 6}, React.createElement(react_bootstrap_1.FormControl, {type: "text", placeholder: "Tèlèphone", maxLength: 9, value: this.state.phone, onChange: this.handlePhoneChange.bind(this)}))), React.createElement("div", null, React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, React.createElement(react_bootstrap_1.Label, {bsStyle: "danger"}, this.state.phoneNumberHint)))), React.createElement(react_bootstrap_1.FormGroup, {controlId: "formHorizontalPassword"}, React.createElement("div", null, React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Mot de Passe"), React.createElement(react_bootstrap_1.Col, {sm: 9}, React.createElement(react_bootstrap_1.FormControl, {type: "password", placeholder: "Mot de passe", onChange: this.handlePasswordChange.bind(this)}))), React.createElement("div", null, React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, React.createElement(react_bootstrap_1.Label, {bsStyle: "danger"}, this.state.passwordHint)))), React.createElement(react_bootstrap_1.FormGroup, null, React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, React.createElement(react_bootstrap_1.Button, {bsStyle: "primary", disabled: !isFormValid || isLoading, onClick: !isLoading ? this.logIn : null}, isLoading ? 'Connexion...' : 'Se connecter'))))))));
	    };
	    //set contextTypes four router (necessary for redirection by react-router to pages)
	    SignIn.contextTypes = {
	        router: React.PropTypes.func.isRequired
	    };
	    return SignIn;
	}(React.Component));
	exports.SignIn = SignIn;


/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(2);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _reactInputAutosize = __webpack_require__(332);
	
	var _reactInputAutosize2 = _interopRequireDefault(_reactInputAutosize);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _blacklist = __webpack_require__(333);
	
	var _blacklist2 = _interopRequireDefault(_blacklist);
	
	var _utilsStripDiacritics = __webpack_require__(334);
	
	var _utilsStripDiacritics2 = _interopRequireDefault(_utilsStripDiacritics);
	
	var _Async = __webpack_require__(335);
	
	var _Async2 = _interopRequireDefault(_Async);
	
	var _Option = __webpack_require__(336);
	
	var _Option2 = _interopRequireDefault(_Option);
	
	var _Value = __webpack_require__(337);
	
	var _Value2 = _interopRequireDefault(_Value);
	
	function stringifyValue(value) {
		if (typeof value === 'object') {
			return JSON.stringify(value);
		} else {
			return value;
		}
	}
	
	var stringOrNode = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]);
	
	var instanceId = 1;
	
	var Select = _react2['default'].createClass({
	
		displayName: 'Select',
	
		propTypes: {
			addLabelText: _react2['default'].PropTypes.string, // placeholder displayed when you want to add a label on a multi-value input
			allowCreate: _react2['default'].PropTypes.bool, // whether to allow creation of new entries
			'aria-label': _react2['default'].PropTypes.string, // Aria label (for assistive tech)
			'aria-labelledby': _react2['default'].PropTypes.string, // HTML ID of an element that should be used as the label (for assistive tech)
			autoBlur: _react2['default'].PropTypes.bool, // automatically blur the component when an option is selected
			autofocus: _react2['default'].PropTypes.bool, // autofocus the component on mount
			autosize: _react2['default'].PropTypes.bool, // whether to enable autosizing or not
			backspaceRemoves: _react2['default'].PropTypes.bool, // whether backspace removes an item if there is no text input
			backspaceToRemoveMessage: _react2['default'].PropTypes.string, // Message to use for screenreaders to press backspace to remove the current item -
			// {label} is replaced with the item label
			className: _react2['default'].PropTypes.string, // className for the outer element
			clearAllText: stringOrNode, // title for the "clear" control when multi: true
			clearValueText: stringOrNode, // title for the "clear" control
			clearable: _react2['default'].PropTypes.bool, // should it be possible to reset value
			delimiter: _react2['default'].PropTypes.string, // delimiter to use to join multiple values for the hidden field value
			disabled: _react2['default'].PropTypes.bool, // whether the Select is disabled or not
			escapeClearsValue: _react2['default'].PropTypes.bool, // whether escape clears the value when the menu is closed
			filterOption: _react2['default'].PropTypes.func, // method to filter a single option (option, filterString)
			filterOptions: _react2['default'].PropTypes.any, // boolean to enable default filtering or function to filter the options array ([options], filterString, [values])
			ignoreAccents: _react2['default'].PropTypes.bool, // whether to strip diacritics when filtering
			ignoreCase: _react2['default'].PropTypes.bool, // whether to perform case-insensitive filtering
			inputProps: _react2['default'].PropTypes.object, // custom attributes for the Input
			inputRenderer: _react2['default'].PropTypes.func, // returns a custom input component
			isLoading: _react2['default'].PropTypes.bool, // whether the Select is loading externally or not (such as options being loaded)
			joinValues: _react2['default'].PropTypes.bool, // joins multiple values into a single form field with the delimiter (legacy mode)
			labelKey: _react2['default'].PropTypes.string, // path of the label value in option objects
			matchPos: _react2['default'].PropTypes.string, // (any|start) match the start or entire string when filtering
			matchProp: _react2['default'].PropTypes.string, // (any|label|value) which option property to filter on
			menuBuffer: _react2['default'].PropTypes.number, // optional buffer (in px) between the bottom of the viewport and the bottom of the menu
			menuContainerStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu container
			menuRenderer: _react2['default'].PropTypes.func, // renders a custom menu with options
			menuStyle: _react2['default'].PropTypes.object, // optional style to apply to the menu
			multi: _react2['default'].PropTypes.bool, // multi-value input
			name: _react2['default'].PropTypes.string, // generates a hidden <input /> tag with this field name for html forms
			newOptionCreator: _react2['default'].PropTypes.func, // factory to create new options when allowCreate set
			noResultsText: stringOrNode, // placeholder displayed when there are no matching search results
			onBlur: _react2['default'].PropTypes.func, // onBlur handler: function (event) {}
			onBlurResetsInput: _react2['default'].PropTypes.bool, // whether input is cleared on blur
			onChange: _react2['default'].PropTypes.func, // onChange handler: function (newValue) {}
			onClose: _react2['default'].PropTypes.func, // fires when the menu is closed
			onFocus: _react2['default'].PropTypes.func, // onFocus handler: function (event) {}
			onInputChange: _react2['default'].PropTypes.func, // onInputChange handler: function (inputValue) {}
			onMenuScrollToBottom: _react2['default'].PropTypes.func, // fires when the menu is scrolled to the bottom; can be used to paginate options
			onOpen: _react2['default'].PropTypes.func, // fires when the menu is opened
			onValueClick: _react2['default'].PropTypes.func, // onClick handler for value labels: function (value, event) {}
			openAfterFocus: _react2['default'].PropTypes.bool, // boolean to enable opening dropdown when focused
			openOnFocus: _react2['default'].PropTypes.bool, // always open options menu on focus
			optionClassName: _react2['default'].PropTypes.string, // additional class(es) to apply to the <Option /> elements
			optionComponent: _react2['default'].PropTypes.func, // option component to render in dropdown
			optionRenderer: _react2['default'].PropTypes.func, // optionRenderer: function (option) {}
			options: _react2['default'].PropTypes.array, // array of options
			pageSize: _react2['default'].PropTypes.number, // number of entries to page when using page up/down keys
			placeholder: stringOrNode, // field placeholder, displayed when there's no value
			required: _react2['default'].PropTypes.bool, // applies HTML5 required attribute when needed
			resetValue: _react2['default'].PropTypes.any, // value to use when you clear the control
			scrollMenuIntoView: _react2['default'].PropTypes.bool, // boolean to enable the viewport to shift so that the full menu fully visible when engaged
			searchable: _react2['default'].PropTypes.bool, // whether to enable searching feature or not
			simpleValue: _react2['default'].PropTypes.bool, // pass the value to onChange as a simple value (legacy pre 1.0 mode), defaults to false
			style: _react2['default'].PropTypes.object, // optional style to apply to the control
			tabIndex: _react2['default'].PropTypes.string, // optional tab index of the control
			tabSelectsValue: _react2['default'].PropTypes.bool, // whether to treat tabbing out while focused to be value selection
			value: _react2['default'].PropTypes.any, // initial field value
			valueComponent: _react2['default'].PropTypes.func, // value component to render
			valueKey: _react2['default'].PropTypes.string, // path of the label value in option objects
			valueRenderer: _react2['default'].PropTypes.func, // valueRenderer: function (option) {}
			wrapperStyle: _react2['default'].PropTypes.object },
	
		// optional style to apply to the component wrapper
		statics: { Async: _Async2['default'] },
	
		getDefaultProps: function getDefaultProps() {
			return {
				addLabelText: 'Add "{label}"?',
				autosize: true,
				allowCreate: false,
				backspaceRemoves: true,
				backspaceToRemoveMessage: 'Press backspace to remove {label}',
				clearable: true,
				clearAllText: 'Clear all',
				clearValueText: 'Clear value',
				delimiter: ',',
				disabled: false,
				escapeClearsValue: true,
				filterOptions: true,
				ignoreAccents: true,
				ignoreCase: true,
				inputProps: {},
				isLoading: false,
				joinValues: false,
				labelKey: 'label',
				matchPos: 'any',
				matchProp: 'any',
				menuBuffer: 0,
				multi: false,
				noResultsText: 'No results found',
				onBlurResetsInput: true,
				openAfterFocus: false,
				optionComponent: _Option2['default'],
				pageSize: 5,
				placeholder: 'Select...',
				required: false,
				resetValue: null,
				scrollMenuIntoView: true,
				searchable: true,
				simpleValue: false,
				tabSelectsValue: true,
				valueComponent: _Value2['default'],
				valueKey: 'value'
			};
		},
	
		getInitialState: function getInitialState() {
			return {
				inputValue: '',
				isFocused: false,
				isLoading: false,
				isOpen: false,
				isPseudoFocused: false,
				required: false
			};
		},
	
		componentWillMount: function componentWillMount() {
			this._instancePrefix = 'react-select-' + ++instanceId + '-';
			var valueArray = this.getValueArray(this.props.value);
	
			if (this.props.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], this.props.multi)
				});
			}
		},
	
		componentDidMount: function componentDidMount() {
			if (this.props.autofocus) {
				this.focus();
			}
		},
	
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var valueArray = this.getValueArray(nextProps.value, nextProps);
	
			if (nextProps.required) {
				this.setState({
					required: this.handleRequired(valueArray[0], nextProps.multi)
				});
			}
		},
	
		componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
			if (nextState.isOpen !== this.state.isOpen) {
				var handler = nextState.isOpen ? nextProps.onOpen : nextProps.onClose;
				handler && handler();
			}
		},
	
		componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
			// focus to the selected option
			if (this.refs.menu && this.refs.focused && this.state.isOpen && !this.hasScrolledToOption) {
				var focusedOptionNode = _reactDom2['default'].findDOMNode(this.refs.focused);
				var menuNode = _reactDom2['default'].findDOMNode(this.refs.menu);
				menuNode.scrollTop = focusedOptionNode.offsetTop;
				this.hasScrolledToOption = true;
			} else if (!this.state.isOpen) {
				this.hasScrolledToOption = false;
			}
	
			if (this._scrollToFocusedOptionOnUpdate && this.refs.focused && this.refs.menu) {
				this._scrollToFocusedOptionOnUpdate = false;
				var focusedDOM = _reactDom2['default'].findDOMNode(this.refs.focused);
				var menuDOM = _reactDom2['default'].findDOMNode(this.refs.menu);
				var focusedRect = focusedDOM.getBoundingClientRect();
				var menuRect = menuDOM.getBoundingClientRect();
				if (focusedRect.bottom > menuRect.bottom || focusedRect.top < menuRect.top) {
					menuDOM.scrollTop = focusedDOM.offsetTop + focusedDOM.clientHeight - menuDOM.offsetHeight;
				}
			}
			if (this.props.scrollMenuIntoView && this.refs.menuContainer) {
				var menuContainerRect = this.refs.menuContainer.getBoundingClientRect();
				if (window.innerHeight < menuContainerRect.bottom + this.props.menuBuffer) {
					window.scrollBy(0, menuContainerRect.bottom + this.props.menuBuffer - window.innerHeight);
				}
			}
			if (prevProps.disabled !== this.props.disabled) {
				this.setState({ isFocused: false }); // eslint-disable-line react/no-did-update-set-state
				this.closeMenu();
			}
		},
	
		focus: function focus() {
			if (!this.refs.input) return;
			this.refs.input.focus();
	
			if (this.props.openAfterFocus) {
				this.setState({
					isOpen: true
				});
			}
		},
	
		blurInput: function blurInput() {
			if (!this.refs.input) return;
			this.refs.input.blur();
		},
	
		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},
	
		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},
	
		handleTouchEnd: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;
	
			// Fire the mouse events
			this.handleMouseDown(event);
		},
	
		handleTouchEndClearValue: function handleTouchEndClearValue(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;
	
			// Clear the value
			this.clearValue(event);
		},
	
		handleMouseDown: function handleMouseDown(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
	
			if (event.target.tagName === 'INPUT') {
				return;
			}
	
			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();
	
			// for the non-searchable select, toggle the menu
			if (!this.props.searchable) {
				this.focus();
				return this.setState({
					isOpen: !this.state.isOpen
				});
			}
	
			if (this.state.isFocused) {
				// On iOS, we can get into a state where we think the input is focused but it isn't really,
				// since iOS ignores programmatic calls to input.focus() that weren't triggered by a click event.
				// Call focus() again here to be safe.
				this.focus();
	
				var input = this.refs.input;
				if (typeof input.getInput === 'function') {
					// Get the actual DOM input if the ref is an <Input /> component
					input = input.getInput();
				}
	
				// clears the value so that the cursor will be at the end of input when the component re-renders
				input.value = '';
	
				// if the input is focused, ensure the menu is open
				this.setState({
					isOpen: true,
					isPseudoFocused: false
				});
			} else {
				// otherwise, focus the input and open the menu
				this._openAfterFocus = true;
				this.focus();
			}
		},
	
		handleMouseDownOnArrow: function handleMouseDownOnArrow(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			// If the menu isn't open, let the event bubble to the main handleMouseDown
			if (!this.state.isOpen) {
				return;
			}
			// prevent default event handlers
			event.stopPropagation();
			event.preventDefault();
			// close the menu
			this.closeMenu();
		},
	
		handleMouseDownOnMenu: function handleMouseDownOnMenu(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, or if the component is disabled, ignore it.
			if (this.props.disabled || event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();
	
			this._openAfterFocus = true;
			this.focus();
		},
	
		closeMenu: function closeMenu() {
			this.setState({
				isOpen: false,
				isPseudoFocused: this.state.isFocused && !this.props.multi,
				inputValue: ''
			});
			this.hasScrolledToOption = false;
		},
	
		handleInputFocus: function handleInputFocus(event) {
			var isOpen = this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
			if (this.props.onFocus) {
				this.props.onFocus(event);
			}
			this.setState({
				isFocused: true,
				isOpen: isOpen
			});
			this._openAfterFocus = false;
		},
	
		handleInputBlur: function handleInputBlur(event) {
			// The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
			if (this.refs.menu && (this.refs.menu === document.activeElement || this.refs.menu.contains(document.activeElement))) {
				this.focus();
				return;
			}
	
			if (this.props.onBlur) {
				this.props.onBlur(event);
			}
			var onBlurredState = {
				isFocused: false,
				isOpen: false,
				isPseudoFocused: false
			};
			if (this.props.onBlurResetsInput) {
				onBlurredState.inputValue = '';
			}
			this.setState(onBlurredState);
		},
	
		handleInputChange: function handleInputChange(event) {
			var newInputValue = event.target.value;
			if (this.state.inputValue !== event.target.value && this.props.onInputChange) {
				var nextState = this.props.onInputChange(newInputValue);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null && typeof nextState !== 'object') {
					newInputValue = '' + nextState;
				}
			}
			this.setState({
				isOpen: true,
				isPseudoFocused: false,
				inputValue: newInputValue
			});
		},
	
		handleKeyDown: function handleKeyDown(event) {
			if (this.props.disabled) return;
			switch (event.keyCode) {
				case 8:
					// backspace
					if (!this.state.inputValue && this.props.backspaceRemoves) {
						event.preventDefault();
						this.popValue();
					}
					return;
				case 9:
					// tab
					if (event.shiftKey || !this.state.isOpen || !this.props.tabSelectsValue) {
						return;
					}
					this.selectFocusedOption();
					return;
				case 13:
					// enter
					if (!this.state.isOpen) return;
					event.stopPropagation();
					this.selectFocusedOption();
					break;
				case 27:
					// escape
					if (this.state.isOpen) {
						this.closeMenu();
						event.stopPropagation();
					} else if (this.props.clearable && this.props.escapeClearsValue) {
						this.clearValue(event);
						event.stopPropagation();
					}
					break;
				case 38:
					// up
					this.focusPreviousOption();
					break;
				case 40:
					// down
					this.focusNextOption();
					break;
				case 33:
					// page up
					this.focusPageUpOption();
					break;
				case 34:
					// page down
					this.focusPageDownOption();
					break;
				case 35:
					// end key
					this.focusEndOption();
					break;
				case 36:
					// home key
					this.focusStartOption();
					break;
				// case 188: // ,
				// 	if (this.props.allowCreate && this.props.multi) {
				// 		event.preventDefault();
				// 		event.stopPropagation();
				// 		this.selectFocusedOption();
				// 	} else {
				// 		return;
				// 	}
				// break;
				default:
					return;
			}
			event.preventDefault();
		},
	
		handleValueClick: function handleValueClick(option, event) {
			if (!this.props.onValueClick) return;
			this.props.onValueClick(option, event);
		},
	
		handleMenuScroll: function handleMenuScroll(event) {
			if (!this.props.onMenuScrollToBottom) return;
			var target = event.target;
	
			if (target.scrollHeight > target.offsetHeight && !(target.scrollHeight - target.offsetHeight - target.scrollTop)) {
				this.props.onMenuScrollToBottom();
			}
		},
	
		handleRequired: function handleRequired(value, multi) {
			if (!value) return true;
			return multi ? value.length === 0 : Object.keys(value).length === 0;
		},
	
		getOptionLabel: function getOptionLabel(op) {
			return op[this.props.labelKey];
		},
	
		/**
	  * Turns a value into an array from the given options
	  * @param	{String|Number|Array}	value		- the value of the select input
	  * @param	{Object}		nextProps	- optionally specify the nextProps so the returned array uses the latest configuration
	  * @returns	{Array}	the value of the select represented in an array
	  */
		getValueArray: function getValueArray(value, nextProps) {
			var _this = this;
	
			/** support optionally passing in the `nextProps` so `componentWillReceiveProps` updates will function as expected */
			var props = typeof nextProps === 'object' ? nextProps : this.props;
			if (props.multi) {
				if (typeof value === 'string') value = value.split(props.delimiter);
				if (!Array.isArray(value)) {
					if (value === null || value === undefined) return [];
					value = [value];
				}
				return value.map(function (value) {
					return _this.expandValue(value, props);
				}).filter(function (i) {
					return i;
				});
			}
			var expandedValue = this.expandValue(value, props);
			return expandedValue ? [expandedValue] : [];
		},
	
		/**
	  * Retrieve a value from the given options and valueKey
	  * @param	{String|Number|Array}	value	- the selected value(s)
	  * @param	{Object}		props	- the Select component's props (or nextProps)
	  */
		expandValue: function expandValue(value, props) {
			if (typeof value !== 'string' && typeof value !== 'number') return value;
			var options = props.options;
			var valueKey = props.valueKey;
	
			if (!options) return;
			for (var i = 0; i < options.length; i++) {
				if (options[i][valueKey] === value) return options[i];
			}
		},
	
		setValue: function setValue(value) {
			var _this2 = this;
	
			if (this.props.autoBlur) {
				this.blurInput();
			}
			if (!this.props.onChange) return;
			if (this.props.required) {
				var required = this.handleRequired(value, this.props.multi);
				this.setState({ required: required });
			}
			if (this.props.simpleValue && value) {
				value = this.props.multi ? value.map(function (i) {
					return i[_this2.props.valueKey];
				}).join(this.props.delimiter) : value[this.props.valueKey];
			}
			this.props.onChange(value);
		},
	
		selectValue: function selectValue(value) {
			var _this3 = this;
	
			//NOTE: update value in the callback to make sure the input value is empty so that there are no sttyling issues (Chrome had issue otherwise)
			this.hasScrolledToOption = false;
			if (this.props.multi) {
				this.setState({
					inputValue: '',
					focusedIndex: null
				}, function () {
					_this3.addValue(value);
				});
			} else {
				this.setState({
					isOpen: false,
					inputValue: '',
					isPseudoFocused: this.state.isFocused
				}, function () {
					_this3.setValue(value);
				});
			}
		},
	
		addValue: function addValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.concat(value));
		},
	
		popValue: function popValue() {
			var valueArray = this.getValueArray(this.props.value);
			if (!valueArray.length) return;
			if (valueArray[valueArray.length - 1].clearableValue === false) return;
			this.setValue(valueArray.slice(0, valueArray.length - 1));
		},
	
		removeValue: function removeValue(value) {
			var valueArray = this.getValueArray(this.props.value);
			this.setValue(valueArray.filter(function (i) {
				return i !== value;
			}));
			this.focus();
		},
	
		clearValue: function clearValue(event) {
			// if the event was triggered by a mousedown and not the primary
			// button, ignore it.
			if (event && event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			event.stopPropagation();
			event.preventDefault();
			this.setValue(this.props.resetValue);
			this.setState({
				isOpen: false,
				inputValue: ''
			}, this.focus);
		},
	
		focusOption: function focusOption(option) {
			this.setState({
				focusedOption: option
			});
		},
	
		focusNextOption: function focusNextOption() {
			this.focusAdjacentOption('next');
		},
	
		focusPreviousOption: function focusPreviousOption() {
			this.focusAdjacentOption('previous');
		},
	
		focusPageUpOption: function focusPageUpOption() {
			this.focusAdjacentOption('page_up');
		},
	
		focusPageDownOption: function focusPageDownOption() {
			this.focusAdjacentOption('page_down');
		},
	
		focusStartOption: function focusStartOption() {
			this.focusAdjacentOption('start');
		},
	
		focusEndOption: function focusEndOption() {
			this.focusAdjacentOption('end');
		},
	
		focusAdjacentOption: function focusAdjacentOption(dir) {
			var options = this._visibleOptions.map(function (option, index) {
				return { option: option, index: index };
			}).filter(function (option) {
				return !option.option.disabled;
			});
			this._scrollToFocusedOptionOnUpdate = true;
			if (!this.state.isOpen) {
				this.setState({
					isOpen: true,
					inputValue: '',
					focusedOption: this._focusedOption || options[dir === 'next' ? 0 : options.length - 1].option
				});
				return;
			}
			if (!options.length) return;
			var focusedIndex = -1;
			for (var i = 0; i < options.length; i++) {
				if (this._focusedOption === options[i].option) {
					focusedIndex = i;
					break;
				}
			}
			if (dir === 'next' && focusedIndex !== -1) {
				focusedIndex = (focusedIndex + 1) % options.length;
			} else if (dir === 'previous') {
				if (focusedIndex > 0) {
					focusedIndex = focusedIndex - 1;
				} else {
					focusedIndex = options.length - 1;
				}
			} else if (dir === 'start') {
				focusedIndex = 0;
			} else if (dir === 'end') {
				focusedIndex = options.length - 1;
			} else if (dir === 'page_up') {
				var potentialIndex = focusedIndex - this.props.pageSize;
				if (potentialIndex < 0) {
					focusedIndex = 0;
				} else {
					focusedIndex = potentialIndex;
				}
			} else if (dir === 'page_down') {
				var potentialIndex = focusedIndex + this.props.pageSize;
				if (potentialIndex > options.length - 1) {
					focusedIndex = options.length - 1;
				} else {
					focusedIndex = potentialIndex;
				}
			}
	
			if (focusedIndex === -1) {
				focusedIndex = 0;
			}
	
			this.setState({
				focusedIndex: options[focusedIndex].index,
				focusedOption: options[focusedIndex].option
			});
		},
	
		selectFocusedOption: function selectFocusedOption() {
			// if (this.props.allowCreate && !this.state.focusedOption) {
			// 	return this.selectValue(this.state.inputValue);
			// }
			if (this._focusedOption) {
				return this.selectValue(this._focusedOption);
			}
		},
	
		renderLoading: function renderLoading() {
			if (!this.props.isLoading) return;
			return _react2['default'].createElement(
				'span',
				{ className: 'Select-loading-zone', 'aria-hidden': 'true' },
				_react2['default'].createElement('span', { className: 'Select-loading' })
			);
		},
	
		renderValue: function renderValue(valueArray, isOpen) {
			var _this4 = this;
	
			var renderLabel = this.props.valueRenderer || this.getOptionLabel;
			var ValueComponent = this.props.valueComponent;
			if (!valueArray.length) {
				return !this.state.inputValue ? _react2['default'].createElement(
					'div',
					{ className: 'Select-placeholder' },
					this.props.placeholder
				) : null;
			}
			var onClick = this.props.onValueClick ? this.handleValueClick : null;
			if (this.props.multi) {
				return valueArray.map(function (value, i) {
					return _react2['default'].createElement(
						ValueComponent,
						{
							id: _this4._instancePrefix + '-value-' + i,
							instancePrefix: _this4._instancePrefix,
							disabled: _this4.props.disabled || value.clearableValue === false,
							key: 'value-' + i + '-' + value[_this4.props.valueKey],
							onClick: onClick,
							onRemove: _this4.removeValue,
							value: value
						},
						renderLabel(value),
						_react2['default'].createElement(
							'span',
							{ className: 'Select-aria-only' },
							' '
						)
					);
				});
			} else if (!this.state.inputValue) {
				if (isOpen) onClick = null;
				return _react2['default'].createElement(
					ValueComponent,
					{
						id: this._instancePrefix + '-value-item',
						disabled: this.props.disabled,
						instancePrefix: this._instancePrefix,
						onClick: onClick,
						value: valueArray[0]
					},
					renderLabel(valueArray[0])
				);
			}
		},
	
		renderInput: function renderInput(valueArray, focusedOptionIndex) {
			if (this.props.inputRenderer) {
				return this.props.inputRenderer();
			} else {
				var _classNames;
	
				var className = (0, _classnames2['default'])('Select-input', this.props.inputProps.className);
				var isOpen = !!this.state.isOpen;
	
				var ariaOwns = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, this._instancePrefix + '-list', isOpen), _defineProperty(_classNames, this._instancePrefix + '-backspace-remove-message', this.props.multi && !this.props.disabled && this.state.isFocused && !this.state.inputValue), _classNames));
	
				// TODO: Check how this project includes Object.assign()
				var inputProps = _extends({}, this.props.inputProps, {
					role: 'combobox',
					'aria-expanded': '' + isOpen,
					'aria-owns': ariaOwns,
					'aria-haspopup': '' + isOpen,
					'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
					'aria-labelledby': this.props['aria-labelledby'],
					'aria-label': this.props['aria-label'],
					className: className,
					tabIndex: this.props.tabIndex,
					onBlur: this.handleInputBlur,
					onChange: this.handleInputChange,
					onFocus: this.handleInputFocus,
					ref: 'input',
					required: this.state.required,
					value: this.state.inputValue
				});
	
				if (this.props.disabled || !this.props.searchable) {
					var divProps = (0, _blacklist2['default'])(this.props.inputProps, 'inputClassName');
					return _react2['default'].createElement('div', _extends({}, divProps, {
						role: 'combobox',
						'aria-expanded': isOpen,
						'aria-owns': isOpen ? this._instancePrefix + '-list' : this._instancePrefix + '-value',
						'aria-activedescendant': isOpen ? this._instancePrefix + '-option-' + focusedOptionIndex : this._instancePrefix + '-value',
						className: className,
						tabIndex: this.props.tabIndex || 0,
						onBlur: this.handleInputBlur,
						onFocus: this.handleInputFocus,
						ref: 'input',
						'aria-readonly': '' + !!this.props.disabled,
						style: { border: 0, width: 1, display: 'inline-block' } }));
				}
	
				if (this.props.autosize) {
					return _react2['default'].createElement(_reactInputAutosize2['default'], _extends({}, inputProps, { minWidth: '5px' }));
				}
				return _react2['default'].createElement(
					'div',
					{ className: className },
					_react2['default'].createElement('input', inputProps)
				);
			}
		},
	
		renderClear: function renderClear() {
			if (!this.props.clearable || !this.props.value || this.props.multi && !this.props.value.length || this.props.disabled || this.props.isLoading) return;
			return _react2['default'].createElement(
				'span',
				{ className: 'Select-clear-zone', title: this.props.multi ? this.props.clearAllText : this.props.clearValueText,
					'aria-label': this.props.multi ? this.props.clearAllText : this.props.clearValueText,
					onMouseDown: this.clearValue,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEndClearValue
				},
				_react2['default'].createElement('span', { className: 'Select-clear', dangerouslySetInnerHTML: { __html: '&times;' } })
			);
		},
	
		renderArrow: function renderArrow() {
			return _react2['default'].createElement(
				'span',
				{ className: 'Select-arrow-zone', onMouseDown: this.handleMouseDownOnArrow },
				_react2['default'].createElement('span', { className: 'Select-arrow', onMouseDown: this.handleMouseDownOnArrow })
			);
		},
	
		filterOptions: function filterOptions(excludeOptions) {
			var _this5 = this;
	
			var filterValue = this.state.inputValue;
			var options = this.props.options || [];
			if (typeof this.props.filterOptions === 'function') {
				return this.props.filterOptions.call(this, options, filterValue, excludeOptions);
			} else if (this.props.filterOptions) {
				if (this.props.ignoreAccents) {
					filterValue = (0, _utilsStripDiacritics2['default'])(filterValue);
				}
				if (this.props.ignoreCase) {
					filterValue = filterValue.toLowerCase();
				}
				if (excludeOptions) excludeOptions = excludeOptions.map(function (i) {
					return i[_this5.props.valueKey];
				});
				return options.filter(function (option) {
					if (excludeOptions && excludeOptions.indexOf(option[_this5.props.valueKey]) > -1) return false;
					if (_this5.props.filterOption) return _this5.props.filterOption.call(_this5, option, filterValue);
					if (!filterValue) return true;
					var valueTest = String(option[_this5.props.valueKey]);
					var labelTest = String(option[_this5.props.labelKey]);
					if (_this5.props.ignoreAccents) {
						if (_this5.props.matchProp !== 'label') valueTest = (0, _utilsStripDiacritics2['default'])(valueTest);
						if (_this5.props.matchProp !== 'value') labelTest = (0, _utilsStripDiacritics2['default'])(labelTest);
					}
					if (_this5.props.ignoreCase) {
						if (_this5.props.matchProp !== 'label') valueTest = valueTest.toLowerCase();
						if (_this5.props.matchProp !== 'value') labelTest = labelTest.toLowerCase();
					}
					return _this5.props.matchPos === 'start' ? _this5.props.matchProp !== 'label' && valueTest.substr(0, filterValue.length) === filterValue || _this5.props.matchProp !== 'value' && labelTest.substr(0, filterValue.length) === filterValue : _this5.props.matchProp !== 'label' && valueTest.indexOf(filterValue) >= 0 || _this5.props.matchProp !== 'value' && labelTest.indexOf(filterValue) >= 0;
				});
			} else {
				return options;
			}
		},
	
		renderMenu: function renderMenu(options, valueArray, focusedOption) {
			var _this6 = this;
	
			if (options && options.length) {
				if (this.props.menuRenderer) {
					return this.props.menuRenderer({
						focusedOption: focusedOption,
						focusOption: this.focusOption,
						labelKey: this.props.labelKey,
						options: options,
						selectValue: this.selectValue,
						valueArray: valueArray
					});
				} else {
					var _ret = (function () {
						var Option = _this6.props.optionComponent;
						var renderLabel = _this6.props.optionRenderer || _this6.getOptionLabel;
	
						return {
							v: options.map(function (option, i) {
								var isSelected = valueArray && valueArray.indexOf(option) > -1;
								var isFocused = option === focusedOption;
								var optionRef = isFocused ? 'focused' : null;
								var optionClass = (0, _classnames2['default'])(_this6.props.optionClassName, {
									'Select-option': true,
									'is-selected': isSelected,
									'is-focused': isFocused,
									'is-disabled': option.disabled
								});
	
								return _react2['default'].createElement(
									Option,
									{
										instancePrefix: _this6._instancePrefix,
										optionIndex: i,
										className: optionClass,
										isDisabled: option.disabled,
										isFocused: isFocused,
										key: 'option-' + i + '-' + option[_this6.props.valueKey],
										onSelect: _this6.selectValue,
										onFocus: _this6.focusOption,
										option: option,
										isSelected: isSelected,
										ref: optionRef
									},
									renderLabel(option)
								);
							})
						};
					})();
	
					if (typeof _ret === 'object') return _ret.v;
				}
			} else if (this.props.noResultsText) {
				return _react2['default'].createElement(
					'div',
					{ className: 'Select-noresults' },
					this.props.noResultsText
				);
			} else {
				return null;
			}
		},
	
		renderHiddenField: function renderHiddenField(valueArray) {
			var _this7 = this;
	
			if (!this.props.name) return;
			if (this.props.joinValues) {
				var value = valueArray.map(function (i) {
					return stringifyValue(i[_this7.props.valueKey]);
				}).join(this.props.delimiter);
				return _react2['default'].createElement('input', {
					type: 'hidden',
					ref: 'value',
					name: this.props.name,
					value: value,
					disabled: this.props.disabled });
			}
			return valueArray.map(function (item, index) {
				return _react2['default'].createElement('input', { key: 'hidden.' + index,
					type: 'hidden',
					ref: 'value' + index,
					name: _this7.props.name,
					value: stringifyValue(item[_this7.props.valueKey]),
					disabled: _this7.props.disabled });
			});
		},
	
		getFocusableOptionIndex: function getFocusableOptionIndex(selectedOption) {
			var options = this._visibleOptions;
			if (!options.length) return null;
	
			var focusedOption = this.state.focusedOption || selectedOption;
			if (focusedOption && !focusedOption.disabled) {
				var focusedOptionIndex = options.indexOf(focusedOption);
				if (focusedOptionIndex !== -1) {
					return focusedOptionIndex;
				}
			}
	
			for (var i = 0; i < options.length; i++) {
				if (!options[i].disabled) return i;
			}
			return null;
		},
	
		renderOuter: function renderOuter(options, valueArray, focusedOption) {
			var menu = this.renderMenu(options, valueArray, focusedOption);
			if (!menu) {
				return null;
			}
	
			return _react2['default'].createElement(
				'div',
				{ ref: 'menuContainer', className: 'Select-menu-outer', style: this.props.menuContainerStyle },
				_react2['default'].createElement(
					'div',
					{ ref: 'menu', role: 'listbox', className: 'Select-menu', id: this._instancePrefix + '-list',
						style: this.props.menuStyle,
						onScroll: this.handleMenuScroll,
						onMouseDown: this.handleMouseDownOnMenu },
					menu
				)
			);
		},
	
		render: function render() {
			var valueArray = this.getValueArray(this.props.value);
			var options = this._visibleOptions = this.filterOptions(this.props.multi ? valueArray : null);
			var isOpen = this.state.isOpen;
			if (this.props.multi && !options.length && valueArray.length && !this.state.inputValue) isOpen = false;
			var focusedOptionIndex = this.getFocusableOptionIndex(valueArray[0]);
	
			var focusedOption = null;
			if (focusedOptionIndex !== null) {
				focusedOption = this._focusedOption = this._visibleOptions[focusedOptionIndex];
			} else {
				focusedOption = this._focusedOption = null;
			}
			var className = (0, _classnames2['default'])('Select', this.props.className, {
				'Select--multi': this.props.multi,
				'Select--single': !this.props.multi,
				'is-disabled': this.props.disabled,
				'is-focused': this.state.isFocused,
				'is-loading': this.props.isLoading,
				'is-open': isOpen,
				'is-pseudo-focused': this.state.isPseudoFocused,
				'is-searchable': this.props.searchable,
				'has-value': valueArray.length
			});
	
			var removeMessage = null;
			if (this.props.multi && !this.props.disabled && valueArray.length && !this.state.inputValue && this.state.isFocused && this.props.backspaceRemoves) {
				removeMessage = _react2['default'].createElement(
					'span',
					{ id: this._instancePrefix + '-backspace-remove-message', className: 'Select-aria-only', 'aria-live': 'assertive' },
					this.props.backspaceToRemoveMessage.replace('{label}', valueArray[valueArray.length - 1][this.props.labelKey])
				);
			}
	
			return _react2['default'].createElement(
				'div',
				{ ref: 'wrapper',
					className: className,
					style: this.props.wrapperStyle },
				this.renderHiddenField(valueArray),
				_react2['default'].createElement(
					'div',
					{ ref: 'control',
						className: 'Select-control',
						style: this.props.style,
						onKeyDown: this.handleKeyDown,
						onMouseDown: this.handleMouseDown,
						onTouchEnd: this.handleTouchEnd,
						onTouchStart: this.handleTouchStart,
						onTouchMove: this.handleTouchMove
					},
					_react2['default'].createElement(
						'span',
						{ className: 'Select-multi-value-wrapper', id: this._instancePrefix + '-value' },
						this.renderValue(valueArray, isOpen),
						this.renderInput(valueArray, focusedOptionIndex)
					),
					removeMessage,
					this.renderLoading(),
					this.renderClear(),
					this.renderArrow()
				),
				isOpen ? this.renderOuter(options, !this.props.multi ? valueArray : null, focusedOption) : null
			);
		}
	
	});
	
	exports['default'] = Select;
	module.exports = exports['default'];

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var React = __webpack_require__(1);
	
	var sizerStyle = { position: 'absolute', top: 0, left: 0, visibility: 'hidden', height: 0, overflow: 'scroll', whiteSpace: 'pre' };
	
	var AutosizeInput = React.createClass({
		displayName: 'AutosizeInput',
	
		propTypes: {
			className: React.PropTypes.string, // className for the outer element
			defaultValue: React.PropTypes.any, // default field value
			inputClassName: React.PropTypes.string, // className for the input element
			inputStyle: React.PropTypes.object, // css styles for the input element
			minWidth: React.PropTypes.oneOfType([// minimum width for input element
			React.PropTypes.number, React.PropTypes.string]),
			onChange: React.PropTypes.func, // onChange handler: function(newValue) {}
			placeholder: React.PropTypes.string, // placeholder text
			placeholderIsMinWidth: React.PropTypes.bool, // don't collapse size to less than the placeholder
			style: React.PropTypes.object, // css styles for the outer element
			value: React.PropTypes.any },
		// field value
		getDefaultProps: function getDefaultProps() {
			return {
				minWidth: 1
			};
		},
		getInitialState: function getInitialState() {
			return {
				inputWidth: this.props.minWidth
			};
		},
		componentDidMount: function componentDidMount() {
			this.copyInputStyles();
			this.updateInputWidth();
		},
		componentDidUpdate: function componentDidUpdate() {
			this.updateInputWidth();
		},
		copyInputStyles: function copyInputStyles() {
			if (!this.isMounted() || !window.getComputedStyle) {
				return;
			}
			var inputStyle = window.getComputedStyle(this.refs.input);
			if (!inputStyle) {
				return;
			}
			var widthNode = this.refs.sizer;
			widthNode.style.fontSize = inputStyle.fontSize;
			widthNode.style.fontFamily = inputStyle.fontFamily;
			widthNode.style.fontWeight = inputStyle.fontWeight;
			widthNode.style.fontStyle = inputStyle.fontStyle;
			widthNode.style.letterSpacing = inputStyle.letterSpacing;
			if (this.props.placeholder) {
				var placeholderNode = this.refs.placeholderSizer;
				placeholderNode.style.fontSize = inputStyle.fontSize;
				placeholderNode.style.fontFamily = inputStyle.fontFamily;
				placeholderNode.style.fontWeight = inputStyle.fontWeight;
				placeholderNode.style.fontStyle = inputStyle.fontStyle;
				placeholderNode.style.letterSpacing = inputStyle.letterSpacing;
			}
		},
		updateInputWidth: function updateInputWidth() {
			if (!this.isMounted() || typeof this.refs.sizer.scrollWidth === 'undefined') {
				return;
			}
			var newInputWidth = undefined;
			if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
				newInputWidth = Math.max(this.refs.sizer.scrollWidth, this.refs.placeholderSizer.scrollWidth) + 2;
			} else {
				newInputWidth = this.refs.sizer.scrollWidth + 2;
			}
			if (newInputWidth < this.props.minWidth) {
				newInputWidth = this.props.minWidth;
			}
			if (newInputWidth !== this.state.inputWidth) {
				this.setState({
					inputWidth: newInputWidth
				});
			}
		},
		getInput: function getInput() {
			return this.refs.input;
		},
		focus: function focus() {
			this.refs.input.focus();
		},
		blur: function blur() {
			this.refs.input.blur();
		},
		select: function select() {
			this.refs.input.select();
		},
		render: function render() {
			var sizerValue = this.props.defaultValue || this.props.value || '';
			var wrapperStyle = this.props.style || {};
			if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';
			var inputStyle = _extends({}, this.props.inputStyle);
			inputStyle.width = this.state.inputWidth + 'px';
			inputStyle.boxSizing = 'content-box';
			var inputProps = _extends({}, this.props);
			inputProps.className = this.props.inputClassName;
			inputProps.style = inputStyle;
			// ensure props meant for `AutosizeInput` don't end up on the `input`
			delete inputProps.inputClassName;
			delete inputProps.inputStyle;
			delete inputProps.minWidth;
			delete inputProps.placeholderIsMinWidth;
			return React.createElement(
				'div',
				{ className: this.props.className, style: wrapperStyle },
				React.createElement('input', _extends({}, inputProps, { ref: 'input' })),
				React.createElement(
					'div',
					{ ref: 'sizer', style: sizerStyle },
					sizerValue
				),
				this.props.placeholder ? React.createElement(
					'div',
					{ ref: 'placeholderSizer', style: sizerStyle },
					this.props.placeholder
				) : null
			);
		}
	});
	
	module.exports = AutosizeInput;

/***/ },
/* 333 */
/***/ function(module, exports) {

	module.exports = function blacklist (src) {
	  var copy = {}
	  var filter = arguments[1]
	
	  if (typeof filter === 'string') {
	    filter = {}
	    for (var i = 1; i < arguments.length; i++) {
	      filter[arguments[i]] = true
	    }
	  }
	
	  for (var key in src) {
	    // blacklist?
	    if (filter[key]) continue
	
	    copy[key] = src[key]
	  }
	
	  return copy
	}


/***/ },
/* 334 */
/***/ function(module, exports) {

	'use strict';
	
	var map = [{ 'base': 'A', 'letters': /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g }, { 'base': 'AA', 'letters': /[\uA732]/g }, { 'base': 'AE', 'letters': /[\u00C6\u01FC\u01E2]/g }, { 'base': 'AO', 'letters': /[\uA734]/g }, { 'base': 'AU', 'letters': /[\uA736]/g }, { 'base': 'AV', 'letters': /[\uA738\uA73A]/g }, { 'base': 'AY', 'letters': /[\uA73C]/g }, { 'base': 'B', 'letters': /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g }, { 'base': 'C', 'letters': /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g }, { 'base': 'D', 'letters': /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g }, { 'base': 'DZ', 'letters': /[\u01F1\u01C4]/g }, { 'base': 'Dz', 'letters': /[\u01F2\u01C5]/g }, { 'base': 'E', 'letters': /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g }, { 'base': 'F', 'letters': /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g }, { 'base': 'G', 'letters': /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g }, { 'base': 'H', 'letters': /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g }, { 'base': 'I', 'letters': /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g }, { 'base': 'J', 'letters': /[\u004A\u24BF\uFF2A\u0134\u0248]/g }, { 'base': 'K', 'letters': /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g }, { 'base': 'L', 'letters': /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g }, { 'base': 'LJ', 'letters': /[\u01C7]/g }, { 'base': 'Lj', 'letters': /[\u01C8]/g }, { 'base': 'M', 'letters': /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g }, { 'base': 'N', 'letters': /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g }, { 'base': 'NJ', 'letters': /[\u01CA]/g }, { 'base': 'Nj', 'letters': /[\u01CB]/g }, { 'base': 'O', 'letters': /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g }, { 'base': 'OI', 'letters': /[\u01A2]/g }, { 'base': 'OO', 'letters': /[\uA74E]/g }, { 'base': 'OU', 'letters': /[\u0222]/g }, { 'base': 'P', 'letters': /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g }, { 'base': 'Q', 'letters': /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g }, { 'base': 'R', 'letters': /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g }, { 'base': 'S', 'letters': /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g }, { 'base': 'T', 'letters': /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g }, { 'base': 'TZ', 'letters': /[\uA728]/g }, { 'base': 'U', 'letters': /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g }, { 'base': 'V', 'letters': /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g }, { 'base': 'VY', 'letters': /[\uA760]/g }, { 'base': 'W', 'letters': /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g }, { 'base': 'X', 'letters': /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g }, { 'base': 'Y', 'letters': /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g }, { 'base': 'Z', 'letters': /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g }, { 'base': 'a', 'letters': /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g }, { 'base': 'aa', 'letters': /[\uA733]/g }, { 'base': 'ae', 'letters': /[\u00E6\u01FD\u01E3]/g }, { 'base': 'ao', 'letters': /[\uA735]/g }, { 'base': 'au', 'letters': /[\uA737]/g }, { 'base': 'av', 'letters': /[\uA739\uA73B]/g }, { 'base': 'ay', 'letters': /[\uA73D]/g }, { 'base': 'b', 'letters': /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g }, { 'base': 'c', 'letters': /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g }, { 'base': 'd', 'letters': /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g }, { 'base': 'dz', 'letters': /[\u01F3\u01C6]/g }, { 'base': 'e', 'letters': /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g }, { 'base': 'f', 'letters': /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g }, { 'base': 'g', 'letters': /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g }, { 'base': 'h', 'letters': /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g }, { 'base': 'hv', 'letters': /[\u0195]/g }, { 'base': 'i', 'letters': /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g }, { 'base': 'j', 'letters': /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g }, { 'base': 'k', 'letters': /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g }, { 'base': 'l', 'letters': /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g }, { 'base': 'lj', 'letters': /[\u01C9]/g }, { 'base': 'm', 'letters': /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g }, { 'base': 'n', 'letters': /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g }, { 'base': 'nj', 'letters': /[\u01CC]/g }, { 'base': 'o', 'letters': /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g }, { 'base': 'oi', 'letters': /[\u01A3]/g }, { 'base': 'ou', 'letters': /[\u0223]/g }, { 'base': 'oo', 'letters': /[\uA74F]/g }, { 'base': 'p', 'letters': /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g }, { 'base': 'q', 'letters': /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g }, { 'base': 'r', 'letters': /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g }, { 'base': 's', 'letters': /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g }, { 'base': 't', 'letters': /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g }, { 'base': 'tz', 'letters': /[\uA729]/g }, { 'base': 'u', 'letters': /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g }, { 'base': 'v', 'letters': /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g }, { 'base': 'vy', 'letters': /[\uA761]/g }, { 'base': 'w', 'letters': /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g }, { 'base': 'x', 'letters': /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g }, { 'base': 'y', 'letters': /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g }, { 'base': 'z', 'letters': /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g }];
	
	module.exports = function stripDiacritics(str) {
		for (var i = 0; i < map.length; i++) {
			str = str.replace(map[i].letters, map[i].base);
		}
		return str;
	};

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Select = __webpack_require__(331);
	
	var _Select2 = _interopRequireDefault(_Select);
	
	var _utilsStripDiacritics = __webpack_require__(334);
	
	var _utilsStripDiacritics2 = _interopRequireDefault(_utilsStripDiacritics);
	
	var requestId = 0;
	
	function initCache(cache) {
		if (cache && typeof cache !== 'object') {
			cache = {};
		}
		return cache ? cache : null;
	}
	
	function updateCache(cache, input, data) {
		if (!cache) return;
		cache[input] = data;
	}
	
	function getFromCache(cache, input) {
		if (!cache) return;
		for (var i = input.length; i >= 0; --i) {
			var cacheKey = input.slice(0, i);
			if (cache[cacheKey] && (input === cacheKey || cache[cacheKey].complete)) {
				return cache[cacheKey];
			}
		}
	}
	
	function thenPromise(promise, callback) {
		if (!promise || typeof promise.then !== 'function') return;
		return promise.then(function (data) {
			callback(null, data);
		}, function (err) {
			callback(err);
		});
	}
	
	var stringOrNode = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.node]);
	
	var Async = _react2['default'].createClass({
		displayName: 'Async',
	
		propTypes: {
			cache: _react2['default'].PropTypes.any, // object to use to cache results, can be null to disable cache
			ignoreAccents: _react2['default'].PropTypes.bool, // whether to strip diacritics when filtering (shared with Select)
			ignoreCase: _react2['default'].PropTypes.bool, // whether to perform case-insensitive filtering (shared with Select)
			isLoading: _react2['default'].PropTypes.bool, // overrides the isLoading state when set to true
			loadOptions: _react2['default'].PropTypes.func.isRequired, // function to call to load options asynchronously
			loadingPlaceholder: _react2['default'].PropTypes.string, // replaces the placeholder while options are loading
			minimumInput: _react2['default'].PropTypes.number, // the minimum number of characters that trigger loadOptions
			noResultsText: stringOrNode, // placeholder displayed when there are no matching search results (shared with Select)
			onInputChange: _react2['default'].PropTypes.func, // onInputChange handler: function (inputValue) {}
			placeholder: stringOrNode, // field placeholder, displayed when there's no value (shared with Select)
			searchPromptText: stringOrNode, // label to prompt for search input
			searchingText: _react2['default'].PropTypes.string },
		// message to display while options are loading
		getDefaultProps: function getDefaultProps() {
			return {
				cache: true,
				ignoreAccents: true,
				ignoreCase: true,
				loadingPlaceholder: 'Loading...',
				minimumInput: 0,
				searchingText: 'Searching...',
				searchPromptText: 'Type to search'
			};
		},
		getInitialState: function getInitialState() {
			return {
				cache: initCache(this.props.cache),
				isLoading: false,
				options: []
			};
		},
		componentWillMount: function componentWillMount() {
			this._lastInput = '';
		},
		componentDidMount: function componentDidMount() {
			this.loadOptions('');
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if (nextProps.cache !== this.props.cache) {
				this.setState({
					cache: initCache(nextProps.cache)
				});
			}
		},
		focus: function focus() {
			this.refs.select.focus();
		},
		resetState: function resetState() {
			this._currentRequestId = -1;
			this.setState({
				isLoading: false,
				options: []
			});
		},
		getResponseHandler: function getResponseHandler(input) {
			var _this = this;
	
			var _requestId = this._currentRequestId = requestId++;
			return function (err, data) {
				if (err) throw err;
				if (!_this.isMounted()) return;
				updateCache(_this.state.cache, input, data);
				if (_requestId !== _this._currentRequestId) return;
				_this.setState({
					isLoading: false,
					options: data && data.options || []
				});
			};
		},
		loadOptions: function loadOptions(input) {
			if (this.props.onInputChange) {
				var nextState = this.props.onInputChange(input);
				// Note: != used deliberately here to catch undefined and null
				if (nextState != null) {
					input = '' + nextState;
				}
			}
			if (this.props.ignoreAccents) input = (0, _utilsStripDiacritics2['default'])(input);
			if (this.props.ignoreCase) input = input.toLowerCase();
	
			this._lastInput = input;
			if (input.length < this.props.minimumInput) {
				return this.resetState();
			}
			var cacheResult = getFromCache(this.state.cache, input);
			if (cacheResult) {
				return this.setState({
					options: cacheResult.options
				});
			}
			this.setState({
				isLoading: true
			});
			var responseHandler = this.getResponseHandler(input);
			var inputPromise = thenPromise(this.props.loadOptions(input, responseHandler), responseHandler);
			return inputPromise ? inputPromise.then(function () {
				return input;
			}) : input;
		},
		render: function render() {
			var noResultsText = this.props.noResultsText;
			var _state = this.state;
			var isLoading = _state.isLoading;
			var options = _state.options;
	
			if (this.props.isLoading) isLoading = true;
			var placeholder = isLoading ? this.props.loadingPlaceholder : this.props.placeholder;
			if (isLoading) {
				noResultsText = this.props.searchingText;
			} else if (!options.length && this._lastInput.length < this.props.minimumInput) {
				noResultsText = this.props.searchPromptText;
			}
			return _react2['default'].createElement(_Select2['default'], _extends({}, this.props, {
				ref: 'select',
				isLoading: isLoading,
				noResultsText: noResultsText,
				onInputChange: this.loadOptions,
				options: options,
				placeholder: placeholder
			}));
		}
	});
	
	module.exports = Async;

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var Option = _react2['default'].createClass({
		displayName: 'Option',
	
		propTypes: {
			children: _react2['default'].PropTypes.node,
			className: _react2['default'].PropTypes.string, // className (based on mouse position)
			instancePrefix: _react2['default'].PropTypes.string.isRequired, // unique prefix for the ids (used for aria)
			isDisabled: _react2['default'].PropTypes.bool, // the option is disabled
			isFocused: _react2['default'].PropTypes.bool, // the option is focused
			isSelected: _react2['default'].PropTypes.bool, // the option is selected
			onFocus: _react2['default'].PropTypes.func, // method to handle mouseEnter on option element
			onSelect: _react2['default'].PropTypes.func, // method to handle click on option element
			onUnfocus: _react2['default'].PropTypes.func, // method to handle mouseLeave on option element
			option: _react2['default'].PropTypes.object.isRequired, // object that is base for that option
			optionIndex: _react2['default'].PropTypes.number },
		// index of the option, used to generate unique ids for aria
		blockEvent: function blockEvent(event) {
			event.preventDefault();
			event.stopPropagation();
			if (event.target.tagName !== 'A' || !('href' in event.target)) {
				return;
			}
			if (event.target.target) {
				window.open(event.target.href, event.target.target);
			} else {
				window.location.href = event.target.href;
			}
		},
	
		handleMouseDown: function handleMouseDown(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onSelect(this.props.option, event);
		},
	
		handleMouseEnter: function handleMouseEnter(event) {
			this.onFocus(event);
		},
	
		handleMouseMove: function handleMouseMove(event) {
			this.onFocus(event);
		},
	
		handleTouchEnd: function handleTouchEnd(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;
	
			this.handleMouseDown(event);
		},
	
		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},
	
		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},
	
		onFocus: function onFocus(event) {
			if (!this.props.isFocused) {
				this.props.onFocus(this.props.option, event);
			}
		},
		render: function render() {
			var _props = this.props;
			var option = _props.option;
			var instancePrefix = _props.instancePrefix;
			var optionIndex = _props.optionIndex;
	
			var className = (0, _classnames2['default'])(this.props.className, option.className);
	
			return option.disabled ? _react2['default'].createElement(
				'div',
				{ className: className,
					onMouseDown: this.blockEvent,
					onClick: this.blockEvent },
				this.props.children
			) : _react2['default'].createElement(
				'div',
				{ className: className,
					style: option.style,
					role: 'option',
					onMouseDown: this.handleMouseDown,
					onMouseEnter: this.handleMouseEnter,
					onMouseMove: this.handleMouseMove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove,
					onTouchEnd: this.handleTouchEnd,
					id: instancePrefix + '-option-' + optionIndex,
					title: option.title },
				this.props.children
			);
		}
	});
	
	module.exports = Option;

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _classnames = __webpack_require__(157);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var Value = _react2['default'].createClass({
	
		displayName: 'Value',
	
		propTypes: {
			children: _react2['default'].PropTypes.node,
			disabled: _react2['default'].PropTypes.bool, // disabled prop passed to ReactSelect
			id: _react2['default'].PropTypes.string, // Unique id for the value - used for aria
			onClick: _react2['default'].PropTypes.func, // method to handle click on value label
			onRemove: _react2['default'].PropTypes.func, // method to handle removal of the value
			value: _react2['default'].PropTypes.object.isRequired },
	
		// the option object for this value
		handleMouseDown: function handleMouseDown(event) {
			if (event.type === 'mousedown' && event.button !== 0) {
				return;
			}
			if (this.props.onClick) {
				event.stopPropagation();
				this.props.onClick(this.props.value, event);
				return;
			}
			if (this.props.value.href) {
				event.stopPropagation();
			}
		},
	
		onRemove: function onRemove(event) {
			event.preventDefault();
			event.stopPropagation();
			this.props.onRemove(this.props.value);
		},
	
		handleTouchEndRemove: function handleTouchEndRemove(event) {
			// Check if the view is being dragged, In this case
			// we don't want to fire the click event (because the user only wants to scroll)
			if (this.dragging) return;
	
			// Fire the mouse events
			this.onRemove(event);
		},
	
		handleTouchMove: function handleTouchMove(event) {
			// Set a flag that the view is being dragged
			this.dragging = true;
		},
	
		handleTouchStart: function handleTouchStart(event) {
			// Set a flag that the view is not being dragged
			this.dragging = false;
		},
	
		renderRemoveIcon: function renderRemoveIcon() {
			if (this.props.disabled || !this.props.onRemove) return;
			return _react2['default'].createElement(
				'span',
				{ className: 'Select-value-icon',
					'aria-hidden': 'true',
					onMouseDown: this.onRemove,
					onTouchEnd: this.handleTouchEndRemove,
					onTouchStart: this.handleTouchStart,
					onTouchMove: this.handleTouchMove },
				'×'
			);
		},
	
		renderLabel: function renderLabel() {
			var className = 'Select-value-label';
			return this.props.onClick || this.props.value.href ? _react2['default'].createElement(
				'a',
				{ className: className, href: this.props.value.href, target: this.props.value.target, onMouseDown: this.handleMouseDown, onTouchEnd: this.handleMouseDown },
				this.props.children
			) : _react2['default'].createElement(
				'span',
				{ className: className, role: 'option', 'aria-selected': 'true', id: this.props.id },
				this.props.children
			);
		},
	
		render: function render() {
			return _react2['default'].createElement(
				'div',
				{ className: (0, _classnames2['default'])('Select-value', this.props.value.className),
					style: this.props.value.style,
					title: this.props.value.title
				},
				this.renderRemoveIcon(),
				this.renderLabel()
			);
		}
	
	});
	
	module.exports = Value;

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var apiUrls_1 = __webpack_require__(339);
	var request = __webpack_require__(340);
	var md5_1 = __webpack_require__(345);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    //Service : Authentication service
	    Athenticate: function (index, phoneNumber, password, email, role) {
	        var fullPhoneNumber = "+" + index + phoneNumber;
	        var passwordHash = md5_1.Md5.hashStr(password);
	        var login = {
	            'class': 'com.vitonjob.callouts.auth.AuthToken',
	            'email': email,
	            'telephone': fullPhoneNumber,
	            'password': passwordHash,
	            'role': role
	        };
	        var loginStr = JSON.stringify(login);
	        var encodedLogin = btoa(loginStr);
	        var dataLog = {
	            'class': 'fr.protogen.masterdata.model.CCallout',
	            'id': 214,
	            'args': [{
	                    'class': 'fr.protogen.masterdata.model.CCalloutArguments',
	                    label: 'requete authentification',
	                    value: encodedLogin
	                }]
	        };
	        var body = JSON.stringify(dataLog);
	        return new Promise(function (resolve, reject) {
	            request
	                .post(apiUrls_1.default.CALLOUT_URL)
	                .send(body)
	                .set('Content-Type', 'application/json')
	                .end(function (err, response) {
	                if (err)
	                    reject(err);
	                resolve(JSON.parse(response.text));
	            });
	        });
	    },
	    //Service : get User by his phonenumber from the server
	    getUserByPhone: function (phoneNumber) {
	        var sql = "select pk_user_account, email, role from user_account where telephone = '" + phoneNumber + "'";
	        return new Promise(function (resolve, reject) {
	            request
	                .post(apiUrls_1.default.SQL_URL)
	                .send(sql)
	                .set('Content-Type', 'text/plain')
	                .end(function (err, response) {
	                if (err)
	                    reject(err);
	                resolve(JSON.parse(response.text));
	            });
	        });
	    },
	    //Service : get User by his email from the server
	    getUserByEmail: function (email) {
	        var sql = "select pk_user_account, email, telephone, role from user_account where LOWER(email) = lower_unaccent('" + email + "')";
	        return new Promise(function (resolve, reject) {
	            request
	                .post(apiUrls_1.default.SQL_URL)
	                .send(sql)
	                .set('Content-Type', 'text/plain')
	                .end(function (err, response) {
	                if (err)
	                    reject(err);
	                resolve(JSON.parse(response.text));
	            });
	        });
	    }
	};


/***/ },
/* 339 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    SQL_URL: 'http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/sql',
	    CALLOUT_URL: 'http://vitonjobv1.datqvvgppi.us-west-2.elasticbeanstalk.com/api/business'
	};


/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Root reference for iframes.
	 */
	
	var root;
	if (typeof window !== 'undefined') { // Browser window
	  root = window;
	} else if (typeof self !== 'undefined') { // Web Worker
	  root = self;
	} else { // Other environments
	  console.warn("Using browser-only version of superagent in non-browser environment");
	  root = this;
	}
	
	var Emitter = __webpack_require__(341);
	var requestBase = __webpack_require__(342);
	var isObject = __webpack_require__(343);
	
	/**
	 * Noop.
	 */
	
	function noop(){};
	
	/**
	 * Expose `request`.
	 */
	
	var request = module.exports = __webpack_require__(344).bind(null, Request);
	
	/**
	 * Determine XHR.
	 */
	
	request.getXHR = function () {
	  if (root.XMLHttpRequest
	      && (!root.location || 'file:' != root.location.protocol
	          || !root.ActiveXObject)) {
	    return new XMLHttpRequest;
	  } else {
	    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
	    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
	  }
	  throw Error("Browser-only verison of superagent could not find XHR");
	};
	
	/**
	 * Removes leading and trailing whitespace, added to support IE.
	 *
	 * @param {String} s
	 * @return {String}
	 * @api private
	 */
	
	var trim = ''.trim
	  ? function(s) { return s.trim(); }
	  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };
	
	/**
	 * Serialize the given `obj`.
	 *
	 * @param {Object} obj
	 * @return {String}
	 * @api private
	 */
	
	function serialize(obj) {
	  if (!isObject(obj)) return obj;
	  var pairs = [];
	  for (var key in obj) {
	    pushEncodedKeyValuePair(pairs, key, obj[key]);
	  }
	  return pairs.join('&');
	}
	
	/**
	 * Helps 'serialize' with serializing arrays.
	 * Mutates the pairs array.
	 *
	 * @param {Array} pairs
	 * @param {String} key
	 * @param {Mixed} val
	 */
	
	function pushEncodedKeyValuePair(pairs, key, val) {
	  if (val != null) {
	    if (Array.isArray(val)) {
	      val.forEach(function(v) {
	        pushEncodedKeyValuePair(pairs, key, v);
	      });
	    } else if (isObject(val)) {
	      for(var subkey in val) {
	        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
	      }
	    } else {
	      pairs.push(encodeURIComponent(key)
	        + '=' + encodeURIComponent(val));
	    }
	  } else if (val === null) {
	    pairs.push(encodeURIComponent(key));
	  }
	}
	
	/**
	 * Expose serialization method.
	 */
	
	 request.serializeObject = serialize;
	
	 /**
	  * Parse the given x-www-form-urlencoded `str`.
	  *
	  * @param {String} str
	  * @return {Object}
	  * @api private
	  */
	
	function parseString(str) {
	  var obj = {};
	  var pairs = str.split('&');
	  var pair;
	  var pos;
	
	  for (var i = 0, len = pairs.length; i < len; ++i) {
	    pair = pairs[i];
	    pos = pair.indexOf('=');
	    if (pos == -1) {
	      obj[decodeURIComponent(pair)] = '';
	    } else {
	      obj[decodeURIComponent(pair.slice(0, pos))] =
	        decodeURIComponent(pair.slice(pos + 1));
	    }
	  }
	
	  return obj;
	}
	
	/**
	 * Expose parser.
	 */
	
	request.parseString = parseString;
	
	/**
	 * Default MIME type map.
	 *
	 *     superagent.types.xml = 'application/xml';
	 *
	 */
	
	request.types = {
	  html: 'text/html',
	  json: 'application/json',
	  xml: 'application/xml',
	  urlencoded: 'application/x-www-form-urlencoded',
	  'form': 'application/x-www-form-urlencoded',
	  'form-data': 'application/x-www-form-urlencoded'
	};
	
	/**
	 * Default serialization map.
	 *
	 *     superagent.serialize['application/xml'] = function(obj){
	 *       return 'generated xml here';
	 *     };
	 *
	 */
	
	 request.serialize = {
	   'application/x-www-form-urlencoded': serialize,
	   'application/json': JSON.stringify
	 };
	
	 /**
	  * Default parsers.
	  *
	  *     superagent.parse['application/xml'] = function(str){
	  *       return { object parsed from str };
	  *     };
	  *
	  */
	
	request.parse = {
	  'application/x-www-form-urlencoded': parseString,
	  'application/json': JSON.parse
	};
	
	/**
	 * Parse the given header `str` into
	 * an object containing the mapped fields.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function parseHeader(str) {
	  var lines = str.split(/\r?\n/);
	  var fields = {};
	  var index;
	  var line;
	  var field;
	  var val;
	
	  lines.pop(); // trailing CRLF
	
	  for (var i = 0, len = lines.length; i < len; ++i) {
	    line = lines[i];
	    index = line.indexOf(':');
	    field = line.slice(0, index).toLowerCase();
	    val = trim(line.slice(index + 1));
	    fields[field] = val;
	  }
	
	  return fields;
	}
	
	/**
	 * Check if `mime` is json or has +json structured syntax suffix.
	 *
	 * @param {String} mime
	 * @return {Boolean}
	 * @api private
	 */
	
	function isJSON(mime) {
	  return /[\/+]json\b/.test(mime);
	}
	
	/**
	 * Return the mime type for the given `str`.
	 *
	 * @param {String} str
	 * @return {String}
	 * @api private
	 */
	
	function type(str){
	  return str.split(/ *; */).shift();
	};
	
	/**
	 * Return header field parameters.
	 *
	 * @param {String} str
	 * @return {Object}
	 * @api private
	 */
	
	function params(str){
	  return str.split(/ *; */).reduce(function(obj, str){
	    var parts = str.split(/ *= */),
	        key = parts.shift(),
	        val = parts.shift();
	
	    if (key && val) obj[key] = val;
	    return obj;
	  }, {});
	};
	
	/**
	 * Initialize a new `Response` with the given `xhr`.
	 *
	 *  - set flags (.ok, .error, etc)
	 *  - parse header
	 *
	 * Examples:
	 *
	 *  Aliasing `superagent` as `request` is nice:
	 *
	 *      request = superagent;
	 *
	 *  We can use the promise-like API, or pass callbacks:
	 *
	 *      request.get('/').end(function(res){});
	 *      request.get('/', function(res){});
	 *
	 *  Sending data can be chained:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' })
	 *        .end(function(res){});
	 *
	 *  Or passed to `.send()`:
	 *
	 *      request
	 *        .post('/user')
	 *        .send({ name: 'tj' }, function(res){});
	 *
	 *  Or passed to `.post()`:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' })
	 *        .end(function(res){});
	 *
	 * Or further reduced to a single call for simple cases:
	 *
	 *      request
	 *        .post('/user', { name: 'tj' }, function(res){});
	 *
	 * @param {XMLHTTPRequest} xhr
	 * @param {Object} options
	 * @api private
	 */
	
	function Response(req, options) {
	  options = options || {};
	  this.req = req;
	  this.xhr = this.req.xhr;
	  // responseText is accessible only if responseType is '' or 'text' and on older browsers
	  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
	     ? this.xhr.responseText
	     : null;
	  this.statusText = this.req.xhr.statusText;
	  this._setStatusProperties(this.xhr.status);
	  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
	  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
	  // getResponseHeader still works. so we get content-type even if getting
	  // other headers fails.
	  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
	  this._setHeaderProperties(this.header);
	  this.body = this.req.method != 'HEAD'
	    ? this._parseBody(this.text ? this.text : this.xhr.response)
	    : null;
	}
	
	/**
	 * Get case-insensitive `field` value.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */
	
	Response.prototype.get = function(field){
	  return this.header[field.toLowerCase()];
	};
	
	/**
	 * Set header related properties:
	 *
	 *   - `.type` the content type without params
	 *
	 * A response of "Content-Type: text/plain; charset=utf-8"
	 * will provide you with a `.type` of "text/plain".
	 *
	 * @param {Object} header
	 * @api private
	 */
	
	Response.prototype._setHeaderProperties = function(header){
	  // content-type
	  var ct = this.header['content-type'] || '';
	  this.type = type(ct);
	
	  // params
	  var obj = params(ct);
	  for (var key in obj) this[key] = obj[key];
	};
	
	/**
	 * Parse the given body `str`.
	 *
	 * Used for auto-parsing of bodies. Parsers
	 * are defined on the `superagent.parse` object.
	 *
	 * @param {String} str
	 * @return {Mixed}
	 * @api private
	 */
	
	Response.prototype._parseBody = function(str){
	  var parse = request.parse[this.type];
	  if (!parse && isJSON(this.type)) {
	    parse = request.parse['application/json'];
	  }
	  return parse && str && (str.length || str instanceof Object)
	    ? parse(str)
	    : null;
	};
	
	/**
	 * Set flags such as `.ok` based on `status`.
	 *
	 * For example a 2xx response will give you a `.ok` of __true__
	 * whereas 5xx will be __false__ and `.error` will be __true__. The
	 * `.clientError` and `.serverError` are also available to be more
	 * specific, and `.statusType` is the class of error ranging from 1..5
	 * sometimes useful for mapping respond colors etc.
	 *
	 * "sugar" properties are also defined for common cases. Currently providing:
	 *
	 *   - .noContent
	 *   - .badRequest
	 *   - .unauthorized
	 *   - .notAcceptable
	 *   - .notFound
	 *
	 * @param {Number} status
	 * @api private
	 */
	
	Response.prototype._setStatusProperties = function(status){
	  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  if (status === 1223) {
	    status = 204;
	  }
	
	  var type = status / 100 | 0;
	
	  // status / class
	  this.status = this.statusCode = status;
	  this.statusType = type;
	
	  // basics
	  this.info = 1 == type;
	  this.ok = 2 == type;
	  this.clientError = 4 == type;
	  this.serverError = 5 == type;
	  this.error = (4 == type || 5 == type)
	    ? this.toError()
	    : false;
	
	  // sugar
	  this.accepted = 202 == status;
	  this.noContent = 204 == status;
	  this.badRequest = 400 == status;
	  this.unauthorized = 401 == status;
	  this.notAcceptable = 406 == status;
	  this.notFound = 404 == status;
	  this.forbidden = 403 == status;
	};
	
	/**
	 * Return an `Error` representative of this response.
	 *
	 * @return {Error}
	 * @api public
	 */
	
	Response.prototype.toError = function(){
	  var req = this.req;
	  var method = req.method;
	  var url = req.url;
	
	  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
	  var err = new Error(msg);
	  err.status = this.status;
	  err.method = method;
	  err.url = url;
	
	  return err;
	};
	
	/**
	 * Expose `Response`.
	 */
	
	request.Response = Response;
	
	/**
	 * Initialize a new `Request` with the given `method` and `url`.
	 *
	 * @param {String} method
	 * @param {String} url
	 * @api public
	 */
	
	function Request(method, url) {
	  var self = this;
	  this._query = this._query || [];
	  this.method = method;
	  this.url = url;
	  this.header = {}; // preserves header name case
	  this._header = {}; // coerces header names to lowercase
	  this.on('end', function(){
	    var err = null;
	    var res = null;
	
	    try {
	      res = new Response(self);
	    } catch(e) {
	      err = new Error('Parser is unable to parse the response');
	      err.parse = true;
	      err.original = e;
	      // issue #675: return the raw response if the response parsing fails
	      err.rawResponse = self.xhr && self.xhr.responseText ? self.xhr.responseText : null;
	      // issue #876: return the http status code if the response parsing fails
	      err.statusCode = self.xhr && self.xhr.status ? self.xhr.status : null;
	      return self.callback(err);
	    }
	
	    self.emit('response', res);
	
	    var new_err;
	    try {
	      if (res.status < 200 || res.status >= 300) {
	        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
	        new_err.original = err;
	        new_err.response = res;
	        new_err.status = res.status;
	      }
	    } catch(e) {
	      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
	    }
	
	    // #1000 don't catch errors from the callback to avoid double calling it
	    if (new_err) {
	      self.callback(new_err, res);
	    } else {
	      self.callback(null, res);
	    }
	  });
	}
	
	/**
	 * Mixin `Emitter` and `requestBase`.
	 */
	
	Emitter(Request.prototype);
	for (var key in requestBase) {
	  Request.prototype[key] = requestBase[key];
	}
	
	/**
	 * Set Content-Type to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.xml = 'application/xml';
	 *
	 *      request.post('/')
	 *        .type('xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 *      request.post('/')
	 *        .type('application/xml')
	 *        .send(xmlstring)
	 *        .end(callback);
	 *
	 * @param {String} type
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.type = function(type){
	  this.set('Content-Type', request.types[type] || type);
	  return this;
	};
	
	/**
	 * Set responseType to `val`. Presently valid responseTypes are 'blob' and
	 * 'arraybuffer'.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .responseType('blob')
	 *        .end(callback);
	 *
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.responseType = function(val){
	  this._responseType = val;
	  return this;
	};
	
	/**
	 * Set Accept to `type`, mapping values from `request.types`.
	 *
	 * Examples:
	 *
	 *      superagent.types.json = 'application/json';
	 *
	 *      request.get('/agent')
	 *        .accept('json')
	 *        .end(callback);
	 *
	 *      request.get('/agent')
	 *        .accept('application/json')
	 *        .end(callback);
	 *
	 * @param {String} accept
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.accept = function(type){
	  this.set('Accept', request.types[type] || type);
	  return this;
	};
	
	/**
	 * Set Authorization field value with `user` and `pass`.
	 *
	 * @param {String} user
	 * @param {String} pass
	 * @param {Object} options with 'type' property 'auto' or 'basic' (default 'basic')
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.auth = function(user, pass, options){
	  if (!options) {
	    options = {
	      type: 'basic'
	    }
	  }
	
	  switch (options.type) {
	    case 'basic':
	      var str = btoa(user + ':' + pass);
	      this.set('Authorization', 'Basic ' + str);
	    break;
	
	    case 'auto':
	      this.username = user;
	      this.password = pass;
	    break;
	  }
	  return this;
	};
	
	/**
	* Add query-string `val`.
	*
	* Examples:
	*
	*   request.get('/shoes')
	*     .query('size=10')
	*     .query({ color: 'blue' })
	*
	* @param {Object|String} val
	* @return {Request} for chaining
	* @api public
	*/
	
	Request.prototype.query = function(val){
	  if ('string' != typeof val) val = serialize(val);
	  if (val) this._query.push(val);
	  return this;
	};
	
	/**
	 * Queue the given `file` as an attachment to the specified `field`,
	 * with optional `filename`.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} field
	 * @param {Blob|File} file
	 * @param {String} filename
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.attach = function(field, file, filename){
	  this._getFormData().append(field, file, filename || file.name);
	  return this;
	};
	
	Request.prototype._getFormData = function(){
	  if (!this._formData) {
	    this._formData = new root.FormData();
	  }
	  return this._formData;
	};
	
	/**
	 * Invoke the callback with `err` and `res`
	 * and handle arity check.
	 *
	 * @param {Error} err
	 * @param {Response} res
	 * @api private
	 */
	
	Request.prototype.callback = function(err, res){
	  var fn = this._callback;
	  this.clearTimeout();
	  fn(err, res);
	};
	
	/**
	 * Invoke callback with x-domain error.
	 *
	 * @api private
	 */
	
	Request.prototype.crossDomainError = function(){
	  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
	  err.crossDomain = true;
	
	  err.status = this.status;
	  err.method = this.method;
	  err.url = this.url;
	
	  this.callback(err);
	};
	
	/**
	 * Invoke callback with timeout error.
	 *
	 * @api private
	 */
	
	Request.prototype._timeoutError = function(){
	  var timeout = this._timeout;
	  var err = new Error('timeout of ' + timeout + 'ms exceeded');
	  err.timeout = timeout;
	  this.callback(err);
	};
	
	/**
	 * Compose querystring to append to req.url
	 *
	 * @api private
	 */
	
	Request.prototype._appendQueryString = function(){
	  var query = this._query.join('&');
	  if (query) {
	    this.url += ~this.url.indexOf('?')
	      ? '&' + query
	      : '?' + query;
	  }
	};
	
	/**
	 * Initiate request, invoking callback `fn(res)`
	 * with an instanceof `Response`.
	 *
	 * @param {Function} fn
	 * @return {Request} for chaining
	 * @api public
	 */
	
	Request.prototype.end = function(fn){
	  var self = this;
	  var xhr = this.xhr = request.getXHR();
	  var timeout = this._timeout;
	  var data = this._formData || this._data;
	
	  // store callback
	  this._callback = fn || noop;
	
	  // state change
	  xhr.onreadystatechange = function(){
	    if (4 != xhr.readyState) return;
	
	    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
	    // result in the error "Could not complete the operation due to error c00c023f"
	    var status;
	    try { status = xhr.status } catch(e) { status = 0; }
	
	    if (0 == status) {
	      if (self.timedout) return self._timeoutError();
	      if (self._aborted) return;
	      return self.crossDomainError();
	    }
	    self.emit('end');
	  };
	
	  // progress
	  var handleProgress = function(e){
	    if (e.total > 0) {
	      e.percent = e.loaded / e.total * 100;
	    }
	    e.direction = 'download';
	    self.emit('progress', e);
	  };
	  if (this.hasListeners('progress')) {
	    xhr.onprogress = handleProgress;
	  }
	  try {
	    if (xhr.upload && this.hasListeners('progress')) {
	      xhr.upload.onprogress = handleProgress;
	    }
	  } catch(e) {
	    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
	    // Reported here:
	    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
	  }
	
	  // timeout
	  if (timeout && !this._timer) {
	    this._timer = setTimeout(function(){
	      self.timedout = true;
	      self.abort();
	    }, timeout);
	  }
	
	  // querystring
	  this._appendQueryString();
	
	  // initiate request
	  if (this.username && this.password) {
	    xhr.open(this.method, this.url, true, this.username, this.password);
	  } else {
	    xhr.open(this.method, this.url, true);
	  }
	
	  // CORS
	  if (this._withCredentials) xhr.withCredentials = true;
	
	  // body
	  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
	    // serialize stuff
	    var contentType = this._header['content-type'];
	    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
	    if (!serialize && isJSON(contentType)) serialize = request.serialize['application/json'];
	    if (serialize) data = serialize(data);
	  }
	
	  // set header fields
	  for (var field in this.header) {
	    if (null == this.header[field]) continue;
	    xhr.setRequestHeader(field, this.header[field]);
	  }
	
	  if (this._responseType) {
	    xhr.responseType = this._responseType;
	  }
	
	  // send stuff
	  this.emit('request', this);
	
	  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
	  // We need null here if data is undefined
	  xhr.send(typeof data !== 'undefined' ? data : null);
	  return this;
	};
	
	
	/**
	 * Expose `Request`.
	 */
	
	request.Request = Request;
	
	/**
	 * GET `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.get = function(url, data, fn){
	  var req = request('GET', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.query(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * HEAD `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.head = function(url, data, fn){
	  var req = request('HEAD', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * OPTIONS query to `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.options = function(url, data, fn){
	  var req = request('OPTIONS', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * DELETE `url` with optional callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	function del(url, fn){
	  var req = request('DELETE', url);
	  if (fn) req.end(fn);
	  return req;
	};
	
	request['del'] = del;
	request['delete'] = del;
	
	/**
	 * PATCH `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.patch = function(url, data, fn){
	  var req = request('PATCH', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * POST `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed} [data]
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.post = function(url, data, fn){
	  var req = request('POST', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};
	
	/**
	 * PUT `url` with optional `data` and callback `fn(res)`.
	 *
	 * @param {String} url
	 * @param {Mixed|Function} [data] or fn
	 * @param {Function} [fn]
	 * @return {Request}
	 * @api public
	 */
	
	request.put = function(url, data, fn){
	  var req = request('PUT', url);
	  if ('function' == typeof data) fn = data, data = null;
	  if (data) req.send(data);
	  if (fn) req.end(fn);
	  return req;
	};


/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	if (true) {
	  module.exports = Emitter;
	}
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module of mixed-in functions shared between node and client code
	 */
	var isObject = __webpack_require__(343);
	
	/**
	 * Clear previous timeout.
	 *
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.clearTimeout = function _clearTimeout(){
	  this._timeout = 0;
	  clearTimeout(this._timer);
	  return this;
	};
	
	/**
	 * Override default response body parser
	 *
	 * This function will be called to convert incoming data into request.body
	 *
	 * @param {Function}
	 * @api public
	 */
	
	exports.parse = function parse(fn){
	  this._parser = fn;
	  return this;
	};
	
	/**
	 * Override default request body serializer
	 *
	 * This function will be called to convert data set via .send or .attach into payload to send
	 *
	 * @param {Function}
	 * @api public
	 */
	
	exports.serialize = function serialize(fn){
	  this._serializer = fn;
	  return this;
	};
	
	/**
	 * Set timeout to `ms`.
	 *
	 * @param {Number} ms
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.timeout = function timeout(ms){
	  this._timeout = ms;
	  return this;
	};
	
	/**
	 * Promise support
	 *
	 * @param {Function} resolve
	 * @param {Function} reject
	 * @return {Request}
	 */
	
	exports.then = function then(resolve, reject) {
	  if (!this._fullfilledPromise) {
	    var self = this;
	    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
	      self.end(function(err, res){
	        if (err) innerReject(err); else innerResolve(res);
	      });
	    });
	  }
	  return this._fullfilledPromise.then(resolve, reject);
	}
	
	/**
	 * Allow for extension
	 */
	
	exports.use = function use(fn) {
	  fn(this);
	  return this;
	}
	
	
	/**
	 * Get request header `field`.
	 * Case-insensitive.
	 *
	 * @param {String} field
	 * @return {String}
	 * @api public
	 */
	
	exports.get = function(field){
	  return this._header[field.toLowerCase()];
	};
	
	/**
	 * Get case-insensitive header `field` value.
	 * This is a deprecated internal API. Use `.get(field)` instead.
	 *
	 * (getHeader is no longer used internally by the superagent code base)
	 *
	 * @param {String} field
	 * @return {String}
	 * @api private
	 * @deprecated
	 */
	
	exports.getHeader = exports.get;
	
	/**
	 * Set header `field` to `val`, or multiple fields with one object.
	 * Case-insensitive.
	 *
	 * Examples:
	 *
	 *      req.get('/')
	 *        .set('Accept', 'application/json')
	 *        .set('X-API-Key', 'foobar')
	 *        .end(callback);
	 *
	 *      req.get('/')
	 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
	 *        .end(callback);
	 *
	 * @param {String|Object} field
	 * @param {String} val
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.set = function(field, val){
	  if (isObject(field)) {
	    for (var key in field) {
	      this.set(key, field[key]);
	    }
	    return this;
	  }
	  this._header[field.toLowerCase()] = val;
	  this.header[field] = val;
	  return this;
	};
	
	/**
	 * Remove header `field`.
	 * Case-insensitive.
	 *
	 * Example:
	 *
	 *      req.get('/')
	 *        .unset('User-Agent')
	 *        .end(callback);
	 *
	 * @param {String} field
	 */
	exports.unset = function(field){
	  delete this._header[field.toLowerCase()];
	  delete this.header[field];
	  return this;
	};
	
	/**
	 * Write the field `name` and `val` for "multipart/form-data"
	 * request bodies.
	 *
	 * ``` js
	 * request.post('/upload')
	 *   .field('foo', 'bar')
	 *   .end(callback);
	 * ```
	 *
	 * @param {String} name
	 * @param {String|Blob|File|Buffer|fs.ReadStream} val
	 * @return {Request} for chaining
	 * @api public
	 */
	exports.field = function(name, val) {
	  this._getFormData().append(name, val);
	  return this;
	};
	
	/**
	 * Abort the request, and clear potential timeout.
	 *
	 * @return {Request}
	 * @api public
	 */
	exports.abort = function(){
	  if (this._aborted) {
	    return this;
	  }
	  this._aborted = true;
	  this.xhr && this.xhr.abort(); // browser
	  this.req && this.req.abort(); // node
	  this.clearTimeout();
	  this.emit('abort');
	  return this;
	};
	
	/**
	 * Enable transmission of cookies with x-domain requests.
	 *
	 * Note that for this to work the origin must not be
	 * using "Access-Control-Allow-Origin" with a wildcard,
	 * and also must set "Access-Control-Allow-Credentials"
	 * to "true".
	 *
	 * @api public
	 */
	
	exports.withCredentials = function(){
	  // This is browser-only functionality. Node side is no-op.
	  this._withCredentials = true;
	  return this;
	};
	
	/**
	 * Set the max redirects to `n`. Does noting in browser XHR implementation.
	 *
	 * @param {Number} n
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.redirects = function(n){
	  this._maxRedirects = n;
	  return this;
	};
	
	/**
	 * Convert to a plain javascript object (not JSON string) of scalar properties.
	 * Note as this method is designed to return a useful non-this value,
	 * it cannot be chained.
	 *
	 * @return {Object} describing method, url, and data of this request
	 * @api public
	 */
	
	exports.toJSON = function(){
	  return {
	    method: this.method,
	    url: this.url,
	    data: this._data,
	    headers: this._header
	  };
	};
	
	/**
	 * Check if `obj` is a host object,
	 * we don't want to serialize these :)
	 *
	 * TODO: future proof, move to compoent land
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	
	exports._isHost = function _isHost(obj) {
	  var str = {}.toString.call(obj);
	
	  switch (str) {
	    case '[object File]':
	    case '[object Blob]':
	    case '[object FormData]':
	      return true;
	    default:
	      return false;
	  }
	}
	
	/**
	 * Send `data` as the request body, defaulting the `.type()` to "json" when
	 * an object is given.
	 *
	 * Examples:
	 *
	 *       // manual json
	 *       request.post('/user')
	 *         .type('json')
	 *         .send('{"name":"tj"}')
	 *         .end(callback)
	 *
	 *       // auto json
	 *       request.post('/user')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // manual x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send('name=tj')
	 *         .end(callback)
	 *
	 *       // auto x-www-form-urlencoded
	 *       request.post('/user')
	 *         .type('form')
	 *         .send({ name: 'tj' })
	 *         .end(callback)
	 *
	 *       // defaults to x-www-form-urlencoded
	 *      request.post('/user')
	 *        .send('name=tobi')
	 *        .send('species=ferret')
	 *        .end(callback)
	 *
	 * @param {String|Object} data
	 * @return {Request} for chaining
	 * @api public
	 */
	
	exports.send = function(data){
	  var obj = isObject(data);
	  var type = this._header['content-type'];
	
	  // merge
	  if (obj && isObject(this._data)) {
	    for (var key in data) {
	      this._data[key] = data[key];
	    }
	  } else if ('string' == typeof data) {
	    // default to x-www-form-urlencoded
	    if (!type) this.type('form');
	    type = this._header['content-type'];
	    if ('application/x-www-form-urlencoded' == type) {
	      this._data = this._data
	        ? this._data + '&' + data
	        : data;
	    } else {
	      this._data = (this._data || '') + data;
	    }
	  } else {
	    this._data = data;
	  }
	
	  if (!obj || this._isHost(data)) return this;
	
	  // default to json
	  if (!type) this.type('json');
	  return this;
	};


/***/ },
/* 343 */
/***/ function(module, exports) {

	/**
	 * Check if `obj` is an object.
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 * @api private
	 */
	
	function isObject(obj) {
	  return null !== obj && 'object' === typeof obj;
	}
	
	module.exports = isObject;


/***/ },
/* 344 */
/***/ function(module, exports) {

	// The node and browser modules expose versions of this with the
	// appropriate constructor function bound as first argument
	/**
	 * Issue a request:
	 *
	 * Examples:
	 *
	 *    request('GET', '/users').end(callback)
	 *    request('/users').end(callback)
	 *    request('/users', callback)
	 *
	 * @param {String} method
	 * @param {String|Function} url or callback
	 * @return {Request}
	 * @api public
	 */
	
	function request(RequestConstructor, method, url) {
	  // callback
	  if ('function' == typeof url) {
	    return new RequestConstructor('GET', method).end(url);
	  }
	
	  // url first
	  if (2 == arguments.length) {
	    return new RequestConstructor('GET', method);
	  }
	
	  return new RequestConstructor(method, url);
	}
	
	module.exports = request;


/***/ },
/* 345 */
/***/ function(module, exports) {

	/*
	
	TypeScript Md5
	==============
	
	Based on work by
	* Joseph Myers: http://www.myersdaily.org/joseph/javascript/md5-text.html
	* André Cruz: https://github.com/satazor/SparkMD5
	* Raymond Hill: https://github.com/gorhill/yamd5.js
	
	Effectively a TypeScrypt re-write of Raymond Hill JS Library
	
	The MIT License (MIT)
	
	Copyright (C) 2014 Raymond Hill
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	
	
	
	            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
	                    Version 2, December 2004
	
	 Copyright (C) 2015 André Cruz <amdfcruz@gmail.com>
	
	 Everyone is permitted to copy and distribute verbatim or modified
	 copies of this license document, and changing it is allowed as long
	 as the name is changed.
	
	            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
	   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
	
	  0. You just DO WHAT THE FUCK YOU WANT TO.
	  
	
	*/
	var Md5 = (function () {
	    function Md5() {
	        this._state = new Int32Array(4);
	        this._buffer = new ArrayBuffer(68);
	        this._buffer8 = new Uint8Array(this._buffer, 0, 68);
	        this._buffer32 = new Uint32Array(this._buffer, 0, 17);
	        this.start();
	    }
	    // One time hashing functions
	    Md5.hashStr = function (str, raw) {
	        if (raw === void 0) { raw = false; }
	        return this.onePassHasher
	            .start()
	            .appendStr(str)
	            .end(raw);
	    };
	    ;
	    Md5.hashAsciiStr = function (str, raw) {
	        if (raw === void 0) { raw = false; }
	        return this.onePassHasher
	            .start()
	            .appendAsciiStr(str)
	            .end(raw);
	    };
	    ;
	    Md5.prototype.start = function () {
	        this._dataLength = 0;
	        this._bufferLength = 0;
	        this._state.set(Md5.stateIdentity);
	        return this;
	    };
	    // Char to code point to to array conversion:
	    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
	    // #Example.3A_Fixing_charCodeAt_to_handle_non-Basic-Multilingual-Plane_characters_if_their_presence_earlier_in_the_string_is_unknown
	    Md5.prototype.appendStr = function (str) {
	        var buf8 = this._buffer8, buf32 = this._buffer32, bufLen = this._bufferLength, code, i;
	        for (i = 0; i < str.length; i += 1) {
	            code = str.charCodeAt(i);
	            if (code < 128) {
	                buf8[bufLen++] = code;
	            }
	            else if (code < 0x800) {
	                buf8[bufLen++] = (code >>> 6) + 0xC0;
	                buf8[bufLen++] = code & 0x3F | 0x80;
	            }
	            else if (code < 0xD800 || code > 0xDBFF) {
	                buf8[bufLen++] = (code >>> 12) + 0xE0;
	                buf8[bufLen++] = (code >>> 6 & 0x3F) | 0x80;
	                buf8[bufLen++] = (code & 0x3F) | 0x80;
	            }
	            else {
	                code = ((code - 0xD800) * 0x400) + (str.charCodeAt(++i) - 0xDC00) + 0x10000;
	                if (code > 0x10FFFF) {
	                    throw 'Unicode standard supports code points up to U+10FFFF';
	                }
	                buf8[bufLen++] = (code >>> 18) + 0xF0;
	                buf8[bufLen++] = (code >>> 12 & 0x3F) | 0x80;
	                buf8[bufLen++] = (code >>> 6 & 0x3F) | 0x80;
	                buf8[bufLen++] = (code & 0x3F) | 0x80;
	            }
	            if (bufLen >= 64) {
	                this._dataLength += 64;
	                Md5._md5cycle(this._state, buf32);
	                bufLen -= 64;
	                buf32[0] = buf32[16];
	            }
	        }
	        this._bufferLength = bufLen;
	        return this;
	    };
	    Md5.prototype.appendAsciiStr = function (str) {
	        var buf8 = this._buffer8, buf32 = this._buffer32, bufLen = this._bufferLength, i, j = 0;
	        for (;;) {
	            i = Math.min(str.length - j, 64 - bufLen);
	            while (i--) {
	                buf8[bufLen++] = str.charCodeAt(j++);
	            }
	            if (bufLen < 64) {
	                break;
	            }
	            this._dataLength += 64;
	            Md5._md5cycle(this._state, buf32);
	            bufLen = 0;
	        }
	        this._bufferLength = bufLen;
	        return this;
	    };
	    Md5.prototype.appendByteArray = function (input) {
	        var buf8 = this._buffer8, buf32 = this._buffer32, bufLen = this._bufferLength, i, j = 0;
	        for (;;) {
	            i = Math.min(input.length - j, 64 - bufLen);
	            while (i--) {
	                buf8[bufLen++] = input[j++];
	            }
	            if (bufLen < 64) {
	                break;
	            }
	            this._dataLength += 64;
	            Md5._md5cycle(this._state, buf32);
	            bufLen = 0;
	        }
	        this._bufferLength = bufLen;
	        return this;
	    };
	    Md5.prototype.getState = function () {
	        var self = this, s = self._state;
	        return {
	            buffer: String.fromCharCode.apply(null, self._buffer8),
	            buflen: self._bufferLength,
	            length: self._dataLength,
	            state: [s[0], s[1], s[2], s[3]]
	        };
	    };
	    Md5.prototype.setState = function (state) {
	        var buf = state.buffer, x = state.state, s = this._state, i;
	        this._dataLength = state.length;
	        this._bufferLength = state.buflen;
	        s[0] = x[0];
	        s[1] = x[1];
	        s[2] = x[2];
	        s[3] = x[3];
	        for (i = 0; i < buf.length; i += 1) {
	            this._buffer8[i] = buf.charCodeAt(i);
	        }
	    };
	    Md5.prototype.end = function (raw) {
	        if (raw === void 0) { raw = false; }
	        var bufLen = this._bufferLength, buf8 = this._buffer8, buf32 = this._buffer32, i = (bufLen >> 2) + 1, dataBitsLen;
	        this._dataLength += bufLen;
	        buf8[bufLen] = 0x80;
	        buf8[bufLen + 1] = buf8[bufLen + 2] = buf8[bufLen + 3] = 0;
	        buf32.set(Md5.buffer32Identity.subarray(i), i);
	        if (bufLen > 55) {
	            Md5._md5cycle(this._state, buf32);
	            buf32.set(Md5.buffer32Identity);
	        }
	        // Do the final computation based on the tail and length
	        // Beware that the final length may not fit in 32 bits so we take care of that
	        dataBitsLen = this._dataLength * 8;
	        if (dataBitsLen <= 0xFFFFFFFF) {
	            buf32[14] = dataBitsLen;
	        }
	        else {
	            var matches = dataBitsLen.toString(16).match(/(.*?)(.{0,8})$/), lo = parseInt(matches[2], 16), hi = parseInt(matches[1], 16) || 0;
	            buf32[14] = lo;
	            buf32[15] = hi;
	        }
	        Md5._md5cycle(this._state, buf32);
	        return raw ? this._state : Md5._hex(this._state);
	    };
	    Md5._hex = function (x) {
	        var hc = Md5.hexChars, ho = Md5.hexOut, n, offset, j, i;
	        for (i = 0; i < 4; i += 1) {
	            offset = i * 8;
	            n = x[i];
	            for (j = 0; j < 8; j += 2) {
	                ho[offset + 1 + j] = hc.charAt(n & 0x0F);
	                n >>>= 4;
	                ho[offset + 0 + j] = hc.charAt(n & 0x0F);
	                n >>>= 4;
	            }
	        }
	        return ho.join('');
	    };
	    Md5._md5cycle = function (x, k) {
	        var a = x[0], b = x[1], c = x[2], d = x[3];
	        // ff()
	        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
	        a = (a << 7 | a >>> 25) + b | 0;
	        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
	        d = (d << 12 | d >>> 20) + a | 0;
	        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
	        c = (c << 17 | c >>> 15) + d | 0;
	        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
	        b = (b << 22 | b >>> 10) + c | 0;
	        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
	        a = (a << 7 | a >>> 25) + b | 0;
	        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
	        d = (d << 12 | d >>> 20) + a | 0;
	        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
	        c = (c << 17 | c >>> 15) + d | 0;
	        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
	        b = (b << 22 | b >>> 10) + c | 0;
	        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
	        a = (a << 7 | a >>> 25) + b | 0;
	        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
	        d = (d << 12 | d >>> 20) + a | 0;
	        c += (d & a | ~d & b) + k[10] - 42063 | 0;
	        c = (c << 17 | c >>> 15) + d | 0;
	        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
	        b = (b << 22 | b >>> 10) + c | 0;
	        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
	        a = (a << 7 | a >>> 25) + b | 0;
	        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
	        d = (d << 12 | d >>> 20) + a | 0;
	        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
	        c = (c << 17 | c >>> 15) + d | 0;
	        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
	        b = (b << 22 | b >>> 10) + c | 0;
	        // gg()
	        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
	        a = (a << 5 | a >>> 27) + b | 0;
	        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
	        d = (d << 9 | d >>> 23) + a | 0;
	        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
	        c = (c << 14 | c >>> 18) + d | 0;
	        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
	        b = (b << 20 | b >>> 12) + c | 0;
	        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
	        a = (a << 5 | a >>> 27) + b | 0;
	        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
	        d = (d << 9 | d >>> 23) + a | 0;
	        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
	        c = (c << 14 | c >>> 18) + d | 0;
	        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
	        b = (b << 20 | b >>> 12) + c | 0;
	        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
	        a = (a << 5 | a >>> 27) + b | 0;
	        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
	        d = (d << 9 | d >>> 23) + a | 0;
	        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
	        c = (c << 14 | c >>> 18) + d | 0;
	        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
	        b = (b << 20 | b >>> 12) + c | 0;
	        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
	        a = (a << 5 | a >>> 27) + b | 0;
	        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
	        d = (d << 9 | d >>> 23) + a | 0;
	        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
	        c = (c << 14 | c >>> 18) + d | 0;
	        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
	        b = (b << 20 | b >>> 12) + c | 0;
	        // hh()
	        a += (b ^ c ^ d) + k[5] - 378558 | 0;
	        a = (a << 4 | a >>> 28) + b | 0;
	        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
	        d = (d << 11 | d >>> 21) + a | 0;
	        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
	        c = (c << 16 | c >>> 16) + d | 0;
	        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
	        b = (b << 23 | b >>> 9) + c | 0;
	        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
	        a = (a << 4 | a >>> 28) + b | 0;
	        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
	        d = (d << 11 | d >>> 21) + a | 0;
	        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
	        c = (c << 16 | c >>> 16) + d | 0;
	        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
	        b = (b << 23 | b >>> 9) + c | 0;
	        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
	        a = (a << 4 | a >>> 28) + b | 0;
	        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
	        d = (d << 11 | d >>> 21) + a | 0;
	        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
	        c = (c << 16 | c >>> 16) + d | 0;
	        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
	        b = (b << 23 | b >>> 9) + c | 0;
	        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
	        a = (a << 4 | a >>> 28) + b | 0;
	        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
	        d = (d << 11 | d >>> 21) + a | 0;
	        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
	        c = (c << 16 | c >>> 16) + d | 0;
	        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
	        b = (b << 23 | b >>> 9) + c | 0;
	        // ii()
	        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
	        a = (a << 6 | a >>> 26) + b | 0;
	        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
	        d = (d << 10 | d >>> 22) + a | 0;
	        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
	        c = (c << 15 | c >>> 17) + d | 0;
	        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
	        b = (b << 21 | b >>> 11) + c | 0;
	        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
	        a = (a << 6 | a >>> 26) + b | 0;
	        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
	        d = (d << 10 | d >>> 22) + a | 0;
	        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
	        c = (c << 15 | c >>> 17) + d | 0;
	        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
	        b = (b << 21 | b >>> 11) + c | 0;
	        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
	        a = (a << 6 | a >>> 26) + b | 0;
	        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
	        d = (d << 10 | d >>> 22) + a | 0;
	        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
	        c = (c << 15 | c >>> 17) + d | 0;
	        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
	        b = (b << 21 | b >>> 11) + c | 0;
	        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
	        a = (a << 6 | a >>> 26) + b | 0;
	        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
	        d = (d << 10 | d >>> 22) + a | 0;
	        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
	        c = (c << 15 | c >>> 17) + d | 0;
	        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
	        b = (b << 21 | b >>> 11) + c | 0;
	        x[0] = a + x[0] | 0;
	        x[1] = b + x[1] | 0;
	        x[2] = c + x[2] | 0;
	        x[3] = d + x[3] | 0;
	    };
	    Md5.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
	    Md5.buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	    Md5.hexChars = '0123456789abcdef';
	    Md5.hexOut = [];
	    // Permanent instance is to use for one-call hashing
	    Md5.onePassHasher = new Md5();
	    return Md5;
	})();
	exports.Md5 = Md5;
	if (Md5.hashStr('hello') !== '5d41402abc4b2a76b9719d911017c592') {
	    console.error('Md5 self test failed.');
	}


/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var appDispatcher_1 = __webpack_require__(322);
	var listConstants_1 = __webpack_require__(347);
	var listServices_1 = __webpack_require__(348);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    // Action : get the country calling codes List
	    getCountryCallingCodes: function () {
	        listServices_1.default
	            .getCountryCallingCodes()
	            .then(function (res) {
	            appDispatcher_1.default.dispatch({
	                actionType: listConstants_1.default.COUNTRY_CODES_CASE,
	                response: res
	            });
	        })
	            .catch(function (err) {
	            appDispatcher_1.default.dispatch({
	                actionType: listConstants_1.default.ERROR_GETTING_LIST_CASE,
	                error: err,
	                listName: "CountryCallingCodesList",
	            });
	        });
	    }
	};


/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var keyMirror = __webpack_require__(327);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = keyMirror({
	    COUNTRY_CODES_CASE: null,
	    ERROR_GETTING_LIST_CASE: null,
	});


/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var apiUrls_1 = __webpack_require__(339);
	var request = __webpack_require__(340);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    //Service : get the country calling codes list from the server
	    getCountryCallingCodes: function () {
	        var sql = "SELECT nom, indicatif_telephonique FROM user_pays ORDER BY nom";
	        return new Promise(function (resolve, reject) {
	            request
	                .post(apiUrls_1.default.SQL_URL)
	                .send(sql)
	                .set('Content-Type', 'text/plain')
	                .end(function (err, response) {
	                if (err)
	                    reject(err);
	                resolve(JSON.parse(response.text));
	            });
	        });
	    }
	};


/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var appDispatcher_1 = __webpack_require__(322);
	var remoteValidationConstants_1 = __webpack_require__(350);
	var authenticationServices_1 = __webpack_require__(338);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    //Action: initialize states of validations values
	    initialize: function () {
	        appDispatcher_1.default.dispatch({
	            actionType: remoteValidationConstants_1.default.INITIALIZE_CASE
	        });
	    },
	    //verify if the user exists by his phoneNumber
	    getUserByPhone: function (countryCode, phoneNumber) {
	        var fullPhoneNumber = "+" + countryCode + phoneNumber;
	        authenticationServices_1.default
	            .getUserByPhone(fullPhoneNumber)
	            .then(function (res) {
	            //Action: fetching done
	            appDispatcher_1.default.dispatch({
	                actionType: remoteValidationConstants_1.default.USER_BY_PHONE_CASE,
	                response: res
	            });
	        })
	            .catch(function (err) {
	            //Action: fetching error
	            appDispatcher_1.default.dispatch({
	                actionType: remoteValidationConstants_1.default.ERROR_CASE,
	                error: err,
	                message: "error in getting user by phonenumber",
	            });
	        });
	    },
	    //verify if the user exists by his email
	    getUserByEmail: function (email) {
	        authenticationServices_1.default
	            .getUserByEmail(email)
	            .then(function (res) {
	            //Action: fetching done
	            appDispatcher_1.default.dispatch({
	                actionType: remoteValidationConstants_1.default.USER_BY_EMAIL_CASE,
	                response: res
	            });
	        })
	            .catch(function (err) {
	            //Action: fetching error
	            appDispatcher_1.default.dispatch({
	                actionType: remoteValidationConstants_1.default.ERROR_CASE,
	                error: err,
	                message: "error in getting user by email",
	            });
	        });
	    }
	};


/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var keyMirror = __webpack_require__(327);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = keyMirror({
	    USER_BY_PHONE_CASE: null,
	    ERROR_CASE: null,
	    USER_BY_EMAIL_CASE: null,
	    INITIALIZE_CASE: null,
	});


/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var appDispatcher_1 = __webpack_require__(322);
	var listConstants_1 = __webpack_require__(347);
	var events_1 = __webpack_require__(329);
	var CHANGE_EVENT = 'change';
	var _countryCodes = [];
	function fillCountryCallingCodeList(response) {
	    _countryCodes = [];
	    var data = response.data;
	    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
	        var obj = data_1[_i];
	        _countryCodes.push({
	            value: obj.indicatif_telephonique,
	            label: obj.nom
	        });
	    }
	}
	var ListStoreClass = (function (_super) {
	    __extends(ListStoreClass, _super);
	    function ListStoreClass() {
	        _super.apply(this, arguments);
	    }
	    ListStoreClass.prototype.emitChange = function () {
	        this.emit(CHANGE_EVENT);
	    };
	    ListStoreClass.prototype.addChangeListener = function (callback) {
	        this.on(CHANGE_EVENT, callback);
	    };
	    ListStoreClass.prototype.removeChangeListener = function (callback) {
	        this.removeListener(CHANGE_EVENT, callback);
	    };
	    ListStoreClass.prototype.getCountryCallingsCodes = function () {
	        return _countryCodes;
	    };
	    return ListStoreClass;
	}(events_1.EventEmitter));
	var ListStore = new ListStoreClass();
	// register a callback for the dispatcher and respond appropriately to various action types
	ListStore.dispatchToken = appDispatcher_1.default.register(function (action) {
	    switch (action.actionType) {
	        case listConstants_1.default.COUNTRY_CODES_CASE:
	            fillCountryCallingCodeList(action.response);
	            ListStore.emitChange();
	            break;
	        case listConstants_1.default.ERROR_GETTING_LIST_CASE:
	            console.log("error in getting list: " + action.listName);
	            console.log(action.error);
	            ListStore.emitChange();
	            break;
	        default:
	    }
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ListStore;


/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var appDispatcher_1 = __webpack_require__(322);
	var remoteValidationConstants_1 = __webpack_require__(350);
	var events_1 = __webpack_require__(329);
	var CHANGE_EVENT = 'change';
	var _isPhoneNumberExist = null;
	var _isEmailExist = null;
	function initializeStates() {
	    _isPhoneNumberExist = null;
	    _isEmailExist = null;
	}
	function setPhoneNumberState(response) {
	    if (!response || response.data.length == 0) {
	        _isPhoneNumberExist = false;
	    }
	    else {
	        _isPhoneNumberExist = true;
	    }
	}
	function setEmailState(response) {
	    if (!response || response.data.length == 0) {
	        _isEmailExist = false;
	    }
	    else {
	        _isEmailExist = true;
	    }
	}
	var RemoteValidationStoreClass = (function (_super) {
	    __extends(RemoteValidationStoreClass, _super);
	    function RemoteValidationStoreClass() {
	        _super.apply(this, arguments);
	    }
	    RemoteValidationStoreClass.prototype.emitChange = function () {
	        this.emit(CHANGE_EVENT);
	    };
	    RemoteValidationStoreClass.prototype.addChangeListener = function (callback) {
	        this.on(CHANGE_EVENT, callback);
	    };
	    RemoteValidationStoreClass.prototype.removeChangeListener = function (callback) {
	        this.removeListener(CHANGE_EVENT, callback);
	    };
	    RemoteValidationStoreClass.prototype.isPhoneNumberExist = function () {
	        return _isPhoneNumberExist;
	    };
	    RemoteValidationStoreClass.prototype.isEmailExist = function () {
	        return _isEmailExist;
	    };
	    return RemoteValidationStoreClass;
	}(events_1.EventEmitter));
	var RemoteValidationStore = new RemoteValidationStoreClass();
	// register a callback for the dispatcher and respond appropriately to various action types
	RemoteValidationStore.dispatchToken = appDispatcher_1.default.register(function (action) {
	    switch (action.actionType) {
	        case remoteValidationConstants_1.default.INITIALIZE_CASE:
	            initializeStates();
	            //RemoteValidationStore.emitChange();
	            break;
	        case remoteValidationConstants_1.default.USER_BY_PHONE_CASE:
	            setPhoneNumberState(action.response);
	            RemoteValidationStore.emitChange();
	            break;
	        case remoteValidationConstants_1.default.USER_BY_EMAIL_CASE:
	            setEmailState(action.response);
	            RemoteValidationStore.emitChange();
	            break;
	        case remoteValidationConstants_1.default.ERROR_CASE:
	            console.log(action.message, action.error);
	            RemoteValidationStore.emitChange();
	            break;
	        default:
	    }
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = RemoteValidationStore;


/***/ },
/* 353 */
/***/ function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = {
	    //Action: verify if a value exist in a list of objects
	    listHasValue: function (list, val) {
	        if (list == null) {
	            return false;
	        }
	        else {
	            var i = list.length;
	            while (i--) {
	                if (list[i].value === val) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    },
	    isEmailValid: function (email) {
	        var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	        return emailReg.test(email);
	    }
	};


/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var react_bootstrap_1 = __webpack_require__(70);
	var Select = __webpack_require__(331);
	var authenticationServices_1 = __webpack_require__(338);
	var authenticationActions_1 = __webpack_require__(321);
	var listActions_1 = __webpack_require__(346);
	var remoteValidationActions_1 = __webpack_require__(349);
	var listStore_1 = __webpack_require__(351);
	var remoteValidationStore_1 = __webpack_require__(352);
	var utils_1 = __webpack_require__(353);
	var SignUp = (function (_super) {
	    __extends(SignUp, _super);
	    function SignUp(props) {
	        _super.call(this, props);
	        //initial state
	        this.state = {
	            index: "33",
	            phone: '',
	            email: '',
	            password: '',
	            passwordConfirmation: '',
	            countryCodesList: [],
	            phoneNumberHint: '',
	            passwordHint: '',
	            passwordConfirmationHint: '',
	            isPhoneNumberExist: null,
	            isEmailExist: null,
	            isEmailValid: false,
	            isPhoneNumberValid: false,
	            isPasswordValid: false,
	            isFormValid: false,
	            isLoading: false // boolean defines state of Regestration operation
	        };
	        //bind functions
	        this.onChangeRemoteValidationStore = this.onChangeRemoteValidationStore.bind(this);
	        this.onChangeListStore = this.onChangeListStore.bind(this);
	        this.handlePasswordChange = this.handlePasswordChange.bind(this);
	        this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
	        this.handlePhoneChange = this.handlePhoneChange.bind(this);
	        this.handleEmailChange = this.handleEmailChange.bind(this);
	        this.HandleCountryCodeListChange = this.HandleCountryCodeListChange.bind(this);
	        this.isPhoneNumberValid = this.isPhoneNumberValid.bind(this);
	        this.isPasswordValid = this.isPasswordValid.bind(this);
	        this.getUserByPhoneNumber = this.getUserByPhoneNumber.bind(this);
	        this.SignUp = this.SignUp.bind(this);
	        this.gotoHome = this.gotoHome.bind(this);
	    }
	    SignUp.prototype.componentWillMount = function () {
	        //add Lists and remoteValidations stores changes listeners
	        listStore_1.default.addChangeListener(this.onChangeListStore);
	        remoteValidationStore_1.default.addChangeListener(this.onChangeRemoteValidationStore);
	    };
	    SignUp.prototype.componentDidMount = function () {
	        listActions_1.default.getCountryCallingCodes();
	        remoteValidationActions_1.default.initialize();
	    };
	    SignUp.prototype.componentWillUnmount = function () {
	        //remove the stores changes listeners
	        listStore_1.default.removeChangeListener(this.onChangeListStore);
	        remoteValidationStore_1.default.removeChangeListener(this.onChangeRemoteValidationStore);
	    };
	    //function to navigate to Home Page
	    SignUp.prototype.gotoHome = function () {
	        this.context.router.push('/');
	    };
	    //function: load country calling codes List from the store
	    SignUp.prototype.onChangeListStore = function () {
	        this.setState({
	            countryCodesList: listStore_1.default.getCountryCallingsCodes()
	        });
	    };
	    //function: change the state of isPhoneNumberExist and call isPhoneNumberValid()
	    SignUp.prototype.onChangeRemoteValidationStore = function () {
	        this.setState({
	            isPhoneNumberExist: remoteValidationStore_1.default.isPhoneNumberExist(),
	            isEmailExist: remoteValidationStore_1.default.isEmailExist()
	        }, function () {
	            this.isPhoneNumberValid();
	            this.isEmailValid();
	        });
	    };
	    SignUp.prototype.handlePasswordChange = function (e) {
	        this.setState({
	            password: e.target.value
	        }, function () {
	            this.isPasswordValid();
	        });
	    };
	    SignUp.prototype.handlePasswordConfirmationChange = function (e) {
	        this.setState({
	            passwordConfirmation: e.target.value
	        }, function () {
	            this.isPasswordValid();
	        });
	    };
	    SignUp.prototype.handlePhoneChange = function (e) {
	        var newValue = e.target.value.replace(/[^0-9]/g, "");
	        var isIndexExist = utils_1.default.listHasValue(this.state.countryCodesList, this.state.index);
	        this.setState({
	            phone: newValue,
	            isPhoneNumberExist: null
	        }, function () {
	            this.isPhoneNumberValid();
	            this.getUserByPhoneNumber();
	        });
	    };
	    SignUp.prototype.handleEmailChange = function (e) {
	        this.setState({
	            email: e.target.value.trim(),
	            isEmailExist: null
	        }, function () {
	            this.isEmailValid();
	            this.getUserByEmail();
	        });
	    };
	    SignUp.prototype.getUserByPhoneNumber = function () {
	        var isIndexExist = utils_1.default.listHasValue(this.state.countryCodesList, this.state.index);
	        if (this.state.phone.length == 9 && isIndexExist) {
	            remoteValidationActions_1.default.getUserByPhone(this.state.index, this.state.phone);
	        }
	    };
	    SignUp.prototype.getUserByEmail = function () {
	        if (utils_1.default.isEmailValid(this.state.email)) {
	            remoteValidationActions_1.default.getUserByEmail(this.state.email);
	        }
	    };
	    SignUp.prototype.handleIndexChange = function (e) {
	        var newValue = e.target.value.replace(/[^0-9]/g, "");
	        this.setState({
	            index: newValue,
	            isPhoneNumberExist: null
	        }, function () {
	            this.isPhoneNumberValid();
	            this.getUserByPhoneNumber();
	        });
	    };
	    // call Registration service and logIn/notify the user in success/failure case
	    SignUp.prototype.SignUp = function () {
	        var _this = this;
	        if (this.state.isFormValid) {
	            var index = this.state.index;
	            var phoneNumber = this.state.phone;
	            var password = this.state.password;
	            var email = this.state.email;
	            //state of authentication: Loading
	            this.setState({
	                isLoading: true
	            });
	            authenticationServices_1.default
	                .Athenticate(index, phoneNumber, password, email, 'employeur')
	                .then(function (res) {
	                //state of authentication: Done
	                _this.setState({
	                    isLoading: false
	                });
	                //case of authentication failure : server unavailable or connection problem
	                if (!res || res.length == 0 || (res.id == 0 && res.status == "failure")) {
	                    console.log("Serveur non disponible ou problème de connexion.");
	                    return;
	                }
	                //case of success : call AuthAction logIn and redirect to home page (for now...)
	                authenticationActions_1.default.logUserIn(res);
	                _this.gotoHome();
	            })
	                .catch(function (err) {
	                //state of authentication operation : done
	                _this.setState({
	                    isLoading: false
	                });
	            });
	        }
	    };
	    //verify if the full phonenumber is valid and show error message for every case
	    SignUp.prototype.isPhoneNumberValid = function () {
	        var isIndexExist = utils_1.default.listHasValue(this.state.countryCodesList, this.state.index);
	        var index = this.state.index;
	        var phoneNumber = this.state.phone;
	        var password = this.state.password;
	        var isPhoneNumberExist = this.state.isPhoneNumberExist;
	        var phoneMsg = '';
	        var _isPhoneNumberValid = true;
	        if (!index || !phoneNumber) {
	            phoneMsg = "Veillez saisir l'indicatif téléphonique et le téléphone";
	            _isPhoneNumberValid = false;
	        }
	        else {
	            if (phoneNumber.length != 9) {
	                phoneMsg = "le numéro de téléphone doit contenir 9 chiffres";
	                _isPhoneNumberValid = false;
	            }
	            else if (!isIndexExist) {
	                phoneMsg = "l'indicatif téléphonique est non disponible";
	                _isPhoneNumberValid = false;
	            }
	            else {
	                if (isPhoneNumberExist == null) {
	                    phoneMsg = "Verification en cours ...";
	                    _isPhoneNumberValid = false;
	                }
	                else if (isPhoneNumberExist == true) {
	                    phoneMsg = "Ce numéro de téléphone est déja utilisé";
	                    _isPhoneNumberValid = false;
	                }
	                else {
	                    phoneMsg = "";
	                }
	            }
	        }
	        this.setState({
	            phoneNumberHint: phoneMsg,
	            isPhoneNumberValid: _isPhoneNumberValid
	        }, function () {
	            this.isFormValid();
	        });
	    };
	    //verify if the password is valid and show error message for every case
	    SignUp.prototype.isPasswordValid = function () {
	        var password = this.state.password;
	        var passwordConf = this.state.passwordConfirmation;
	        var passwordMsg = '';
	        var password2Msg = '';
	        var _isPasswordValid = true;
	        if (!password) {
	            passwordMsg = "le mot de passe est obligatoire";
	            password2Msg = "";
	            _isPasswordValid = false;
	        }
	        else if (password.length < 8) {
	            passwordMsg = "votre mot de passe doit comporter 8 caractères minimum";
	            password2Msg = "";
	            _isPasswordValid = false;
	        }
	        else if (password !== passwordConf) {
	            passwordMsg = "";
	            password2Msg = "Les deux mots de passe ne sont pas identiques";
	            _isPasswordValid = false;
	        }
	        else {
	            passwordMsg = "";
	        }
	        this.setState({
	            passwordHint: passwordMsg,
	            passwordConfirmationHint: password2Msg,
	            isPasswordValid: _isPasswordValid
	        }, function () {
	            this.isFormValid();
	        });
	    };
	    //verify if the email is valid/exist andshow error message for every case
	    SignUp.prototype.isEmailValid = function () {
	        var isEmailValid = utils_1.default.isEmailValid(this.state.email);
	        var isEmailExist = this.state.isEmailExist;
	        var emailMsg = '';
	        var _isEmailFormValid = true;
	        if (this.state.email == "") {
	            emailMsg = "l'adresse e-mail est obligatoire";
	            _isEmailFormValid = false;
	        }
	        else if (!isEmailValid) {
	            emailMsg = "Adresse e-mail incorrecte ";
	            _isEmailFormValid = false;
	        }
	        else if (isEmailExist == true) {
	            emailMsg = "Cette adresse e-mail a été déjà utilisé. Veuillez choisir une autre.";
	            _isEmailFormValid = false;
	        }
	        else if (isEmailExist == null) {
	            emailMsg = "Vérification en cours ...";
	            _isEmailFormValid = false;
	        }
	        else {
	            emailMsg = "";
	        }
	        this.setState({
	            emailHint: emailMsg,
	            isEmailValid: _isEmailFormValid
	        }, function () {
	            this.isFormValid();
	        });
	    };
	    //verify if all form input and remote validation are valid
	    SignUp.prototype.isFormValid = function () {
	        var isPhoneValid = this.state.isPhoneNumberValid;
	        var isPasswordValid = this.state.isPasswordValid;
	        var isEmailValid = this.state.isEmailValid;
	        var _isFormValid = false;
	        if (isPhoneValid && isPasswordValid && isEmailValid) {
	            _isFormValid = true;
	        }
	        this.setState({
	            isFormValid: _isFormValid
	        });
	    };
	    SignUp.prototype.HandleCountryCodeListChange = function (option) {
	        this.setState({ index: option.value });
	    };
	    SignUp.prototype.render = function () {
	        var isLoading = this.state.isLoading;
	        var isFormValid = this.state.isFormValid;
	        return (React.createElement(react_bootstrap_1.Grid, null, React.createElement(react_bootstrap_1.Row, {className: "show-grid"}, React.createElement(react_bootstrap_1.Col, {xs: 12, md: 6, mdPush: 3}, React.createElement(react_bootstrap_1.Form, {horizontal: true}, React.createElement(react_bootstrap_1.FormGroup, {controlId: "formCountry"}, React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Pays"), React.createElement(react_bootstrap_1.Col, {sm: 9}, React.createElement(Select, {ref: 'fieldInput', name: "name1", value: this.state.index, onChange: this.HandleCountryCodeListChange, options: this.state.countryCodesList}))), React.createElement(react_bootstrap_1.FormGroup, {controlId: "formPhoneNumber"}, React.createElement("div", null, React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Téléphone"), React.createElement(react_bootstrap_1.Col, {sm: 3}, React.createElement(react_bootstrap_1.FormControl, {type: "text", placeholder: "Indice", maxLength: 4, value: this.state.index, onChange: this.handleIndexChange.bind(this)})), React.createElement(react_bootstrap_1.Col, {sm: 6}, React.createElement(react_bootstrap_1.FormControl, {type: "text", placeholder: "Tèlèphone", maxLength: 9, value: this.state.phone, onChange: this.handlePhoneChange.bind(this)}))), React.createElement("div", null, React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, React.createElement(react_bootstrap_1.Label, {bsStyle: "danger"}, this.state.phoneNumberHint)))), React.createElement(react_bootstrap_1.FormGroup, {controlId: "formEmail"}, React.createElement("div", null, React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Email"), React.createElement(react_bootstrap_1.Col, {sm: 9}, React.createElement(react_bootstrap_1.FormControl, {type: "text", placeholder: "Email", onChange: this.handleEmailChange.bind(this)}))), React.createElement("div", null, React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, React.createElement(react_bootstrap_1.Label, {bsStyle: "danger"}, this.state.emailHint)))), React.createElement(react_bootstrap_1.FormGroup, {controlId: "formPassword"}, React.createElement("div", null, React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Mot de Passe"), React.createElement(react_bootstrap_1.Col, {sm: 9}, React.createElement(react_bootstrap_1.FormControl, {type: "password", placeholder: "Mot de passe", onChange: this.handlePasswordChange.bind(this)}))), React.createElement("div", null, React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, React.createElement(react_bootstrap_1.Label, {bsStyle: "danger"}, this.state.passwordHint)))), React.createElement(react_bootstrap_1.FormGroup, {controlId: "formPasswordConfirmation"}, React.createElement("div", null, React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Mot de Passe 2"), React.createElement(react_bootstrap_1.Col, {sm: 9}, React.createElement(react_bootstrap_1.FormControl, {type: "password", placeholder: "Mot de passe 2", onChange: this.handlePasswordConfirmationChange.bind(this)}))), React.createElement("div", null, React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, React.createElement(react_bootstrap_1.Label, {bsStyle: "danger"}, this.state.passwordConfirmationHint)))), React.createElement(react_bootstrap_1.FormGroup, null, React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, React.createElement(react_bootstrap_1.Button, {bsStyle: "primary", disabled: !isFormValid || isLoading, onClick: !isLoading ? this.SignUp : null}, isLoading ? 'Inscription...' : "S'inscrire"))))))));
	    };
	    //set contextTypes four router (necessary for redirection by react-router to pages)
	    SignUp.contextTypes = {
	        router: React.PropTypes.func.isRequired
	    };
	    return SignUp;
	}(React.Component));
	exports.SignUp = SignUp;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map