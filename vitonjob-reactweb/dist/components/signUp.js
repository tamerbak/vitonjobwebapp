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
var utils_1 = require('../utils/utils');
var SignUp = (function (_super) {
    __extends(SignUp, _super);
    function SignUp(props) {
        _super.call(this, props);
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
            isLoading: false
        };
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
        listStore_1.default.addChangeListener(this.onChangeListStore);
        remoteValidationStore_1.default.addChangeListener(this.onChangeRemoteValidationStore);
    };
    SignUp.prototype.componentDidMount = function () {
        listActions_1.default.getCountryCallingCodes();
        remoteValidationActions_1.default.initialize();
    };
    SignUp.prototype.componentWillUnmount = function () {
        listStore_1.default.removeChangeListener(this.onChangeListStore);
        remoteValidationStore_1.default.removeChangeListener(this.onChangeRemoteValidationStore);
    };
    SignUp.prototype.gotoHome = function () {
        this.context.router.push('/');
    };
    SignUp.prototype.onChangeListStore = function () {
        this.setState({
            countryCodesList: listStore_1.default.getCountryCallingsCodes()
        });
    };
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
    SignUp.prototype.SignUp = function () {
        var _this = this;
        if (this.state.isFormValid) {
            var index = this.state.index;
            var phoneNumber = this.state.phone;
            var password = this.state.password;
            var email = this.state.email;
            this.setState({
                isLoading: true
            });
            authenticationServices_1.default
                .Athenticate(index, phoneNumber, password, email, 'employeur')
                .then(function (res) {
                _this.setState({
                    isLoading: false
                });
                if (!res || res.length == 0 || (res.id == 0 && res.status == "failure")) {
                    console.log("Serveur non disponible ou problème de connexion.");
                    return;
                }
                authenticationActions_1.default.logUserIn(res);
                _this.gotoHome();
            })
                .catch(function (err) {
                _this.setState({
                    isLoading: false
                });
            });
        }
    };
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
        return (React.createElement(react_bootstrap_1.Grid, null, 
            React.createElement(react_bootstrap_1.Row, {className: "show-grid"}, 
                React.createElement(react_bootstrap_1.Col, {xs: 12, md: 6, mdPush: 3}, 
                    React.createElement(react_bootstrap_1.Form, {horizontal: true}, 
                        React.createElement(react_bootstrap_1.FormGroup, {controlId: "formCountry"}, 
                            React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Pays"), 
                            React.createElement(react_bootstrap_1.Col, {sm: 9}, 
                                React.createElement(Select, {ref: 'fieldInput', name: "name1", value: this.state.index, onChange: this.HandleCountryCodeListChange, options: this.state.countryCodesList})
                            )), 
                        React.createElement(react_bootstrap_1.FormGroup, {controlId: "formPhoneNumber"}, 
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
                        React.createElement(react_bootstrap_1.FormGroup, {controlId: "formEmail"}, 
                            React.createElement("div", null, 
                                React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Email"), 
                                React.createElement(react_bootstrap_1.Col, {sm: 9}, 
                                    React.createElement(react_bootstrap_1.FormControl, {type: "text", placeholder: "Email", onChange: this.handleEmailChange.bind(this)})
                                )), 
                            React.createElement("div", null, 
                                React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, 
                                    React.createElement(react_bootstrap_1.Label, {bsStyle: "danger"}, this.state.emailHint)
                                )
                            )), 
                        React.createElement(react_bootstrap_1.FormGroup, {controlId: "formPassword"}, 
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
                        React.createElement(react_bootstrap_1.FormGroup, {controlId: "formPasswordConfirmation"}, 
                            React.createElement("div", null, 
                                React.createElement(react_bootstrap_1.Col, {componentClass: react_bootstrap_1.ControlLabel, sm: 3}, "Mot de Passe 2"), 
                                React.createElement(react_bootstrap_1.Col, {sm: 9}, 
                                    React.createElement(react_bootstrap_1.FormControl, {type: "password", placeholder: "Mot de passe 2", onChange: this.handlePasswordConfirmationChange.bind(this)})
                                )), 
                            React.createElement("div", null, 
                                React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, 
                                    React.createElement(react_bootstrap_1.Label, {bsStyle: "danger"}, this.state.passwordConfirmationHint)
                                )
                            )), 
                        React.createElement(react_bootstrap_1.FormGroup, null, 
                            React.createElement(react_bootstrap_1.Col, {smOffset: 3, sm: 9}, 
                                React.createElement(react_bootstrap_1.Button, {bsStyle: "primary", disabled: !isFormValid || isLoading, onClick: !isLoading ? this.SignUp : null}, isLoading ? 'Inscription...' : "S'inscrire")
                            )
                        ))
                )
            )
        ));
    };
    SignUp.contextTypes = {
        router: React.PropTypes.func.isRequired
    };
    return SignUp;
}(React.Component));
exports.SignUp = SignUp;
//# sourceMappingURL=signUp.js.map