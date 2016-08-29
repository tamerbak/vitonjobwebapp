"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_router_1 = require('react-router');
var app_1 = require("./components/app");
var signIn_1 = require("./components/signIn");
var Root = (function (_super) {
    __extends(Root, _super);
    function Root() {
        _super.apply(this, arguments);
    }
    Root.prototype.render = function () {
        return (React.createElement(react_router_1.Router, {history: this.props.history}, 
            React.createElement(react_router_1.Route, {path: "/", component: app_1.App}, 
                React.createElement(react_router_1.Route, {path: "/signIn", component: signIn_1.SignIn})
            )
        ));
    };
    return Root;
}(React.Component));
exports.Root = Root;
//# sourceMappingURL=root.js.map