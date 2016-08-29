import * as React from "react";
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from "react-bootstrap";

import AuthActions from '../actions/authenticationActions';
import AuthStore from '../stores/AuthStore';

export interface HeaderProps {name:string }

export class Header extends React.Component<{}, any> {
  constructor() {
    super();
    this.state = {
      authenticated: AuthStore.isAuthenticated()
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    AuthStore.addChangeListener(this.onChange);
  }

  componentDidMount() {
    AuthStore.addChangeListener(this.onChange);
  }

  login() {
      AuthActions.logUserIn("profile", "TEST");
      this.setState({authenticated: true});
      

  }

  onChange() {
    console.log("changed :)")
    this.setState({
      authenticated: AuthStore.isAuthenticated()
    });
  }

  logout() {
    AuthActions.logUserOut();
    this.setState({authenticated: false});
    console.log(localStorage.getItem('id_token'))
  }

    render() {
        return (
          <Navbar fluid>
            <Navbar.Header>
              <Navbar.Brand>
                <img id="logo" alt="VitOnJob" src="img/logo.png"/>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
              { !this.state.authenticated ? (
                <NavItem onClick={this.login}>Login</NavItem>
              ) : (
                <NavItem onClick={this.logout}>Logout</NavItem>
              )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

        );
    }
}
