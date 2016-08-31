import * as React from "react";

import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from "react-bootstrap";

import {Header} from "./header";

export interface AppProps { }

export class App extends React.Component<{}, {}> {
    render() {
        return (
          <div>
            <Header></Header>
            {this.props.children}
          </div>
        );
    }
}
