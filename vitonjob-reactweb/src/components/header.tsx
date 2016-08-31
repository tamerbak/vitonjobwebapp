import * as React from "react";
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from "react-bootstrap";
import {Link} from "react-router";

import AuthActions from '../actions/authenticationActions';
import AuthStore from '../stores/authenticationStore';

export interface HeaderProps {}

export class Header extends React.Component<{}, any> {
  constructor() {
    super();
    this.state = {
      authenticated: AuthStore.isAuthenticated()
    }
    this.logout = this.logout.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    //add AuthStore change listener callback to get user state
    AuthStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    //remove AuthStore change listener callback
    AuthStore.removeChangeListener(this.onChange);
  }

  onChange() {
    //get the state of user when the AuthStore emit a change event
    this.setState({
      authenticated: AuthStore.isAuthenticated()
    });
  }

  //function : call the logUserOut AuthAction and change authenticated value
  logout() {
    AuthActions.logUserOut();
    this.setState({authenticated: false});
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
              { !this.state.authenticated ? (
              <Nav pullRight>
                <NavItem>
                  <Link to="/signIn">Se connecter</Link>
                </NavItem>
                <NavItem>
                  <Link to="/signUp">S'inscrire</Link>
                </NavItem>
              </Nav>
              ) : (
                <Nav pullRight>
                  <NavItem onClick={this.logout}>Déconnexion</NavItem>
                </Nav>
              )}
            </Navbar.Collapse>
          </Navbar>

        );
    }
}
