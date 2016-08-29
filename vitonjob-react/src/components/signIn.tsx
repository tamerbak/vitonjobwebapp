import * as React from "react";
import {Navbar,Nav,NavItem,NavDropdown,MenuItem,Grid,Row,Col,Form,FormGroup,Button,ControlLabel,FormControl,Label} from "react-bootstrap";
import Select = require("react-select");

import {Header} from "./header";
import * as NumericInput from 'react-numeric-input';

export interface SignInProps { }

export class SignIn extends React.Component<{}, any> {
    state:any;
    refs:any;
    constructor(props:any) {
      super(props);
      this.state = {
        password: '',
        phone:'',
        index:"33",
        phoneMsg : '',
        isPhoneNumberExist: false
      };


      this.handleTextChange = this.handleTextChange.bind(this);
      this.handlePhoneChange = this.handlePhoneChange;
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    onClick(event:any){

    }


    handleTextChange(e:any) {
        console.log(e.target.value);
        this.setState({password: e.target.value});

    }

    handlePhoneChange(e:any) {
        var newValue = e.target.value.replace(/[^0-9]/g, "");
        this.setState({phone:newValue });
    }

    handleIndexChange(e:any) {
        var newValue = e.target.value.replace(/[^0-9]/g, "");
        var isIndexExist:boolean = contains(this.state.countryCodesList,newValue);

    }

    render() {
        return (
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={6} mdPush={3}>
                <Form horizontal>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Select ref='fieldInput'
                        name="name1"
                        value={this.state.index}
                        onChange={this.onChange}
                        options={this.state.countryCodesList}
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup controlId="formGroupPhoneNumber">
                    <div>
                      <Col componentClass={ControlLabel} sm={2}>
                        Téléphone
                      </Col>
                      <Col sm={3}>
                        <FormControl type="text" placeholder="Indice" maxLength={ 4 } value={ this.state.index} onChange={ this.handleIndexChange.bind(this) }  />
                      </Col>
                      <Col sm={7}>
                        <FormControl type="text" placeholder="Tèlèphone" maxLength={ 9 } value={ this.state.phone} onChange={ this.handlePhoneChange.bind(this) }  />

                      </Col>
                    </div>
                  </FormGroup>

                  <FormGroup controlId="formHorizontalPassword">
                    <Col componentClass={ControlLabel} sm={2}>
                      Mot de Passe
                    </Col>
                    <Col sm={10}>
                      <FormControl type="password" placeholder="Mot de passe" maxLength={ 9 } />
                    </Col>
                  </FormGroup>

                  <FormGroup>
                    <Col smOffset={2} sm={10}>
                      <Button onClick={this.onClick.bind(this)} >
                        Se connecter
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
