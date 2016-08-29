"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var react_router_1 = require("react-router");
var authenticationActions_1 = require('../actions/authenticationActions');
var authenticationStore_1 = require('../stores/authenticationStore');
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
        authenticationStore_1.default.addChangeListener(this.onChange);
    };
    Header.prototype.componentWillUnmount = function () {
        authenticationStore_1.default.removeChangeListener(this.onChange);
    };
    Header.prototype.onChange = function () {
        this.setState({
            authenticated: authenticationStore_1.default.isAuthenticated()
        });
    };
    Header.prototype.logout = function () {
        authenticationActions_1.default.logUserOut();
        this.setState({ authenticated: false });
    };
    Header.prototype.render = function () {
        return (React.createElement(react_bootstrap_1.Navbar, {fluid: true}, 
            React.createElement(react_bootstrap_1.Navbar.Header, null, 
                React.createElement(react_bootstrap_1.Navbar.Brand, null, 
                    React.createElement("img", {id: "logo", alt: "VitOnJob", src: "img/logo.png"})
                ), 
                React.createElement(react_bootstrap_1.Navbar.Toggle, null)), 
            React.createElement(react_bootstrap_1.Navbar.Collapse, null, 
                React.createElement(react_bootstrap_1.Nav, {pullRight: true}, !this.state.authenticated ? (React.createElement(react_bootstrap_1.NavItem, null, 
                    React.createElement(react_router_1.Link, {to: "/signIn"}, "Se connecter")
                )) : (React.createElement(react_bootstrap_1.NavItem, {onClick: this.logout}, "Déconnexion")))
            )));
    };
    return Header;
}(React.Component));
exports.Header = Header;
//# sourceMappingURL=header.js.map