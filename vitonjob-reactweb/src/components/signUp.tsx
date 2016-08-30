import * as React from "react";
import {Navbar,Nav,NavItem,NavDropdown,MenuItem,Grid,Row,Col,Form,FormGroup,Button,ControlLabel,FormControl,Label} from "react-bootstrap";
import Select = require("react-select");
import { Router, Link } from 'react-router';

import AuthServices from '../services/authenticationServices';
import AuthActions from '../actions/authenticationActions';
import ListActions from '../actions/listActions';
import RemoteValidationActions from '../actions/remoteValidationActions';
import ListStore from '../stores/listStore';
import RemoteValidationStore from '../stores/remoteValidationStore';
import Utils from '../utils/utils';



export interface SignUpProps { }
export interface SignUpStats {
    index?:string,
    phone?:string,
    email?:string,
    password?: string,
    passwordConfirmation?: string,
    countryCodesList?: {value:string,label:string}[],
    phoneNumberHint?: string,
    emailHint?: string,
    passwordHint?:string,
    passwordConfirmationHint?:string,
    isPhoneNumberExist?: boolean,
    isEmailExist?: boolean,
    isPhoneNumberValid?:boolean,
    isPasswordValid?:boolean,
    isEmailValid?:boolean,
    isFormValid?:boolean,
    isLoading?: boolean
}

export class SignUp extends React.Component<SignUpProps, SignUpStats> {

    //set contextTypes four router (necessary for redirection by react-router to pages)
    static contextTypes: React.ValidationMap<any> = {
        router: React.PropTypes.func.isRequired
    };

    refs:any;
    constructor(props:any) {
      super(props);
      //initial state
      this.state = {
        index:"33", // country calling code
        phone:'',   // basic part of full phonenumber
        email:'',
        password: '',
        passwordConfirmation: '',
        countryCodesList : [], //list of country calling codes
        phoneNumberHint : '', // message to show in case of full phonenumber errors
        passwordHint:'', // message to show in case of password errors
        passwordConfirmationHint:'', // message to show in case of password errors
        isPhoneNumberExist: null, // boolean defines if the full phonenumber exist in database
        isEmailExist:null,
        isEmailValid:false,
        isPhoneNumberValid:false, // boolean defines if the full phonenumber syntax is valid
        isPasswordValid:false, // boolean defines if the password is valid
        isFormValid:false, // boolean defines if the Form is valid and ready to authenticate
        isLoading:false // boolean defines state of Regestration operation
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
      this.getUserByPhoneNumber= this.getUserByPhoneNumber.bind(this);
      this.SignUp= this.SignUp.bind(this);
      this.gotoHome = this.gotoHome.bind(this);
    }

    componentWillMount() {
      //add Lists and remoteValidations stores changes listeners
      ListStore.addChangeListener(this.onChangeListStore);
      RemoteValidationStore.addChangeListener(this.onChangeRemoteValidationStore);
    }

    componentDidMount() {
      ListActions.getCountryCallingCodes();
      RemoteValidationActions.initialize();
    }

    componentWillUnmount() {
      //remove the stores changes listeners
      ListStore.removeChangeListener(this.onChangeListStore);
      RemoteValidationStore.removeChangeListener(this.onChangeRemoteValidationStore);
    }

    //function to navigate to Home Page
    gotoHome(){
        (this.context as any).router.push('/')
    }

    //function: load country calling codes List from the store
    onChangeListStore() {
      this.setState({
        countryCodesList: ListStore.getCountryCallingsCodes()
      });
    }

    //function: change the state of isPhoneNumberExist and call isPhoneNumberValid()
    onChangeRemoteValidationStore() {
      this.setState(
        {
          isPhoneNumberExist: RemoteValidationStore.isPhoneNumberExist(),
          isEmailExist: RemoteValidationStore.isEmailExist()
        },
        function(){
          this.isPhoneNumberValid();
          this.isEmailValid()
        }
      );
    }

    handlePasswordChange(e:any) {
        this.setState(
          {
            password: e.target.value
          },
          function(){
            this.isPasswordValid()
          }
        );
    }

    handlePasswordConfirmationChange(e:any) {
        this.setState(
          {
            passwordConfirmation: e.target.value
          },
          function(){
            this.isPasswordValid()
          }
        );
    }

    handlePhoneChange(e:any) {
        var newValue = e.target.value.replace(/[^0-9]/g, "");
        var isIndexExist:boolean = Utils.listHasValue(this.state.countryCodesList,this.state.index);

        this.setState(
          {
            phone:newValue,
            isPhoneNumberExist:null
          },
          function(){
            this.isPhoneNumberValid();
            this.getUserByPhoneNumber()
          }
        );

    }

    handleEmailChange(e:any) {
        this.setState(
          {
            email:e.target.value.trim(),
            isEmailExist:null
          },
          function(){
            this.isEmailValid();
            this.getUserByEmail()
          }
        );
    }

    getUserByPhoneNumber(){
      var isIndexExist:boolean = Utils.listHasValue(this.state.countryCodesList,this.state.index);
      if(this.state.phone.length == 9 && isIndexExist){
        RemoteValidationActions.getUserByPhone(this.state.index,this.state.phone);
      }
    }

    getUserByEmail(){
      if(Utils.isEmailValid(this.state.email)){
        RemoteValidationActions.getUserByEmail(this.state.email);
      }
    }

    handleIndexChange(e:any) {
        var newValue = e.target.value.replace(/[^0-9]/g, "");

        this.setState(
          {
            index: newValue,
            isPhoneNumberExist:null
          },
          function(){
            this.isPhoneNumberValid()
            this.getUserByPhoneNumber()
          }
        );

    }

    // call Registration service and logIn/notify the user in success/failure case
    SignUp(){
      if(this.state.isFormValid){
        var index = this.state.index;
        var phoneNumber = this.state.phone;
        var password = this.state.password;
        var email = this.state.email;

        //state of authentication: Loading
        this.setState({
          isLoading :true
        });


        AuthServices
        .Athenticate(index,phoneNumber,password,email,'employeur')
          .then((res:any) => {
            //state of authentication: Done
            this.setState({
              isLoading :false
            });

            //case of authentication failure : server unavailable or connection problem
						if (!res || res.length == 0 || (res.id == 0 && res.status == "failure")) {
							console.log("Serveur non disponible ou problème de connexion.");
              return;
						}


            //case of success : call AuthAction logIn and redirect to home page (for now...)
            AuthActions.logUserIn(res);
            this.gotoHome();

          })
          .catch((err:any) => {
            //state of authentication operation : done
            this.setState({
              isLoading :false
            });
          });
      }

    }

    //verify if the full phonenumber is valid and show error message for every case
    isPhoneNumberValid(){
      var isIndexExist:boolean = Utils.listHasValue(this.state.countryCodesList,this.state.index);
      var index:string = this.state.index;
      var phoneNumber:string = this.state.phone;
      var password:string = this.state.password;
      var isPhoneNumberExist:boolean = this.state.isPhoneNumberExist;

      var phoneMsg:string ='';

      var _isPhoneNumberValid:boolean = true;

      if(!index || !phoneNumber ){
        phoneMsg = "Veillez saisir l'indicatif téléphonique et le téléphone";
        _isPhoneNumberValid = false;
      }else{
        if(phoneNumber.length != 9){
          phoneMsg = "le numéro de téléphone doit contenir 9 chiffres";
          _isPhoneNumberValid =false;
        }else if(!isIndexExist){
          phoneMsg = "l'indicatif téléphonique est non disponible";
          _isPhoneNumberValid =false;
        }else{
          if(isPhoneNumberExist == null){
            phoneMsg = "Verification en cours ...";
            _isPhoneNumberValid =false;
          }else if(isPhoneNumberExist == true){
            phoneMsg = "Ce numéro de téléphone est déja utilisé";
            _isPhoneNumberValid =false;
          }else{
            phoneMsg = "";
          }
        }
      }

      this.setState(
        {
          phoneNumberHint: phoneMsg,
          isPhoneNumberValid : _isPhoneNumberValid
        },
        function(){
          this.isFormValid();
        }

      );


    }

    //verify if the password is valid and show error message for every case
    isPasswordValid(){
      var password:string = this.state.password;
      var passwordConf:string = this.state.passwordConfirmation;

      var passwordMsg:string ='';
      var password2Msg:string ='';

      var _isPasswordValid:boolean = true;

      if(!password ){
        passwordMsg = "le mot de passe est obligatoire";
        password2Msg = "";
        _isPasswordValid = false;
      }else if(password.length < 8 ){
        passwordMsg = "votre mot de passe doit comporter 8 caractères minimum";
        password2Msg = "";
        _isPasswordValid = false;
      }else if(password !== passwordConf){
        passwordMsg = "";
        password2Msg = "Les deux mots de passe ne sont pas identiques";
        _isPasswordValid = false;
      }else{
        passwordMsg = "";
      }


      this.setState(
        {
          passwordHint: passwordMsg,
          passwordConfirmationHint: password2Msg,
          isPasswordValid:_isPasswordValid
        },
        function(){
          this.isFormValid();
        }
      );

    }

    //verify if the email is valid/exist andshow error message for every case
    isEmailValid(){
      var isEmailValid:boolean = Utils.isEmailValid(this.state.email);
      var isEmailExist:boolean = this.state.isEmailExist;

      var emailMsg:string ='';
      var _isEmailFormValid:boolean = true;

      if(this.state.email==""){
        emailMsg = "l'adresse e-mail est obligatoire";
        _isEmailFormValid = false;
      }else if(!isEmailValid){
        emailMsg = "Adresse e-mail incorrecte ";
        _isEmailFormValid = false;
      }else if(isEmailExist == true){
        emailMsg = "Cette adresse e-mail a été déjà utilisé. Veuillez choisir une autre.";
        _isEmailFormValid = false;
      }else if(isEmailExist == null){
        emailMsg = "Vérification en cours ...";
        _isEmailFormValid = false;
      }else{
        emailMsg = ""
      }

      this.setState(
        {
          emailHint: emailMsg,
          isEmailValid:_isEmailFormValid
        },
        function(){
          this.isFormValid();
        }
      );

    }


    //verify if all form input and remote validation are valid
    isFormValid(){
      var isPhoneValid:boolean = this.state.isPhoneNumberValid;
      var isPasswordValid:boolean = this.state.isPasswordValid;
      var isEmailValid:boolean = this.state.isEmailValid;

      var _isFormValid:boolean = false;

      if(isPhoneValid && isPasswordValid && isEmailValid){
        _isFormValid = true;
      }

      this.setState({
        isFormValid : _isFormValid
      });

    }

    HandleCountryCodeListChange(option:any) {
        this.setState({index:option.value });
    }

    render() {
        let isLoading = this.state.isLoading;
        let isFormValid = this.state.isFormValid;
        return (
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={6} mdPush={3}>
                <Form horizontal>

                  <FormGroup controlId="formCountry">
                    <Col componentClass={ControlLabel} sm={3}>
                      Pays
                    </Col>
                    <Col sm={9}>
                      <Select ref='fieldInput'
                        name="name1"
                        value={this.state.index}
                        onChange={this.HandleCountryCodeListChange}
                        options={this.state.countryCodesList}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formPhoneNumber">
                    <div>
                      <Col componentClass={ControlLabel} sm={3}>
                        Téléphone
                      </Col>
                      <Col sm={3}>
                        <FormControl type="text" placeholder="Indice" maxLength={ 4 } value={ this.state.index} onChange={ this.handleIndexChange.bind(this) }  />
                      </Col>
                      <Col sm={6}>
                        <FormControl type="text" placeholder="Tèlèphone" maxLength={ 9 } value={ this.state.phone} onChange={ this.handlePhoneChange.bind(this) }  />
                      </Col>
                    </div>
                    <div>
                      <Col smOffset={3} sm={9}>
                        <Label bsStyle="danger">
                          {this.state.phoneNumberHint}
                        </Label>
                      </Col>
                    </div>
                  </FormGroup>

                  <FormGroup controlId="formEmail">
                    <div>
                      <Col componentClass={ControlLabel} sm={3}>
                        Email
                      </Col>
                      <Col sm={9}>
                        <FormControl
                        type="text"
                        placeholder="Email"
                        onChange={ this.handleEmailChange.bind(this)} />
                      </Col>
                    </div>
                    <div>
                      <Col smOffset={3} sm={9}>
                        <Label bsStyle="danger">
                          {this.state.emailHint}
                        </Label>
                      </Col>
                    </div>
                  </FormGroup>

                  <FormGroup controlId="formPassword">
                    <div>
                      <Col componentClass={ControlLabel} sm={3}>
                        Mot de Passe
                      </Col>
                      <Col sm={9}>
                        <FormControl
                        type="password"
                        placeholder="Mot de passe"
                        onChange={ this.handlePasswordChange.bind(this)} />
                      </Col>
                    </div>
                    <div>
                      <Col smOffset={3} sm={9}>
                        <Label bsStyle="danger">
                          {this.state.passwordHint}
                        </Label>
                      </Col>
                    </div>
                  </FormGroup>

                  <FormGroup controlId="formPasswordConfirmation">
                    <div>
                      <Col componentClass={ControlLabel} sm={3}>
                        Mot de Passe 2
                      </Col>
                      <Col sm={9}>
                        <FormControl
                        type="password"
                        placeholder="Mot de passe 2"
                        onChange={ this.handlePasswordConfirmationChange.bind(this)} />
                      </Col>
                    </div>
                    <div>
                      <Col smOffset={3} sm={9}>
                        <Label bsStyle="danger">
                          {this.state.passwordConfirmationHint}
                        </Label>
                      </Col>
                    </div>
                  </FormGroup>

                  <FormGroup>
                    <Col smOffset={3} sm={9}>
                      <Button
                        bsStyle="primary"
                        disabled= { !isFormValid  || isLoading }
                        onClick= { !isLoading ? this.SignUp : null } >
                        { isLoading ? 'Inscription...' : "S'inscrire" }
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Grid>

        );
    }
}
