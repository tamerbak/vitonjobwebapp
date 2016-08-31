import * as React from "react";
import * as ReactDOM from "react-dom";
import { Router, Route, IndexRoute } from 'react-router';

import {App} from "./components/app";
import {SignIn} from "./components/signIn";
import {SignUp} from "./components/signUp";

export interface RootProps {history:any }

//set routes to different pages with react-router
export class Root extends React.Component<RootProps, {}> {

    render() {
        return (
          <Router history={this.props.history}>
            <Route path="/" component={App}>
              <Route path="/signIn" component={SignIn}/>
              <Route path="/signUp" component={SignUp}/>
            </Route>
          </Router>
        );
    }
}
