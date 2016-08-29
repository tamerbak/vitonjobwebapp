"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var react_bootstrap_1 = require("react-bootstrap");
var Select = require("react-select");
var authenticationServices_1 = require('../services/authenticationServices');
var authenticationActions_1 = require('../actions/authenticationActions');
var listActions_1 = require('../actions/listActions');
var remoteValidationActions_1 = require('../actions/remoteValidationActions');
var listStore_1 = require('../stores/listStore');
var remoteValidationStore_1 = require('../stores/remoteValidationStore');
function contains(list, val) {
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
}
var SignIn = (function (_super) {
    __extends(SignIn, _super);
    function SignIn(props) {
        _super.call(this, props);
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
            isLoading: false
        };
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
        listStore_1.default.addChangeListener(this.onChangeListStore);
        remoteValidationStore_1.default.addChangeListener(this.onChangeRemoteValidationStore);
    };
    SignIn.prototype.componentDidMount = function () {
        listActions_1.default.getCountryCallingCodes();
    };
    SignIn.prototype.componentWillUnmount = function () {
        listStore_1.default.removeChangeListener(this.onChangeListStore);
        remoteValidationStore_1.default.removeChangeListener(this.onChangeRemoteValidationStore);
    };
    SignIn.prototype.gotoHome = function () {
        this.context.router.push('/');
    };
    SignIn.prototype.onChangeListStore = function () {
        this.setState({
            countryCodesList: listStore_1.default.getCountryCallingsCodes()
        });
    };
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
        var isIndexExist = contains(this.state.countryCodesList, this.state.index);
        this.setState({
            phone: newValue,
            isPhoneNumberExist: null
        }, function () {
            this.isPhoneNumberValid();
            this.getUserByPhoneNumber();
        });
    };
    SignIn.prototype.getUserByPhoneNumber = function () {
        var isIndexExist = contains(this.state.countryCodesList, this.state.index);
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
    SignIn.prototype.logIn = function () {
        var _this = this;
        if (this.state.isFormValid) {
            var index = this.state.index;
            var phoneNumber = this.state.phone;
            var password = this.state.password;
            this.setState({
                isLoading: true
            });
            authenticationServices_1.default
                .Athenticate(index, phoneNumber, password, '', '')
                .then(function (res) {
                _this.setState({
                    isLoading: false
                });
                if (!res || res.length == 0 || (res.id == 0 && res.status == "failure")) {
                    console.log("Serveur non disponible ou problème de connexion.");
                    return;
                }
                if (res.id == 0 && res.status == "passwordError") {
                    console.log("Numéro de téléphone déjà pris");
                    _this.setState({
                        passwordHint: "le mot de passe saisi est incorrect"
                    });
                    return;
                }
                authenticationActions_1.default.logUserIn(res);
                _this.gotoHome();
            })
                .catch(function (err) {
                console.log(err);
                _this.setState({
                    isLoading: false
                });
            });
        }
    };
    SignIn.prototype.isPhoneNumberValid = function () {
        var isIndexExist = contains(this.state.countryCodesList, this.state.index);
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
        return (React.createElement(react_bootstrap_1.Grid, null, 
            React.createElement(react_bootstrap_1.Row, {className: "show-grid"}, 
                React.createElement(react_bootstrap_1.Col, {xs: 12, md: 6, mdPush: 3}, 
                    React.createElement(react_bootstrap_1.Form, {horizontal: true}, 
                        React.createElement(react_bootstrap_1.FormGroup, null, 
                            React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Pays"), 
                            React.createElement(react_bootstrap_1.Col, {sm: 9}, 
                                React.createElement(Select, {ref: 'fieldInput', name: "name1", value: this.state.index, onChange: this.HandleCountryCodeListChange, options: this.state.countryCodesList})
                            )), 
                        React.createElement(react_bootstrap_1.FormGroup, {controlId: "formGroupPhoneNumber"}, 
                            React.createElement("div", null, 
                                React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Téléphone"), 
                                React.createElement(react_bootstrap_1.Col, {sm: 3}, 
                                    React.createElement(react_bootstrap_1.FormControl, {type: "text", placeholder: "Indice", maxLength: 4, value: this.state.index, onChange: this.handleIndexChange.bind(this)})
                                ), 
                                React.createElement(react_bootstrap_1.Col, {sm: 6}, 
                                    React.createElement(react_bootstrap_1.FormControl, {type: "text", placeholder: "Tèlèphone", maxLength: 9, value: this.state.phone, onChange: this.handlePhoneChange.bind(this)})
                                )), 
                            React.createElement("div", null, 
                                React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, 
                                    React.createElement(react_bootstrap_1.Label, {bsStyle: "danger"}, this.state.phoneNumberHint)
                                )
                            )), 
                        React.createElement(react_bootstrap_1.FormGroup, {controlId: "formHorizontalPassword"}, 
                            React.createElement("div", null, 
                                React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Mot de Passe"), 
                                React.createElement(react_bootstrap_1.Col, {sm: 9}, 
                                    React.createElement(react_bootstrap_1.FormControl, {type: "password", placeholder: "Mot de passe", onChange: this.handlePasswordChange.bind(this)})
                                )), 
                            React.createElement("div", null, 
                                React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, 
                                    React.createElement(react_bootstrap_1.Label, {bsStyle: "danger"}, this.state.passwordHint)
                                )
                            )), 
                        React.createElement(react_bootstrap_1.FormGroup, null, 
                            React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, 
                                React.createElement(react_bootstrap_1.Button, {bsStyle: "primary", disabled: !isFormValid || isLoading, onClick: !isLoading ? this.logIn : null}, isLoading ? 'Connexion...' : 'Se connecter')
                            )
                        ))
                )
            )
        ));
    };
    SignIn.contextTypes = {
        router: React.PropTypes.func.isRequired
    };
    return SignIn;
}(React.Component));
exports.SignIn = SignIn;
//# sourceMappingURL=signIn.js.map