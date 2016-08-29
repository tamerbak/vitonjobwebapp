import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute } from 'react-router';

import {App} from "./components/app";
import {SignIn} from "./components/signIn";

export interface RootProps {history:any }

export class Root extends React.Component<RootProps, {}> {

    render() {
        return (
          <Router history={this.props.history}>
            <Route path="/" component={App}>
              <Route path="/signIn" component={SignIn}/>
            </Route>
          </Router>
        );
    }
}
