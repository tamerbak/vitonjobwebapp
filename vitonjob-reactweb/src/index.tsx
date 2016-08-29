import * as React from "react";
import * as ReactDOM from "react-dom";
import {hashHistory} from 'react-router';

import {Root} from './root';


ReactDOM.render(
    <Root history={hashHistory}/>,
    document.body
);
