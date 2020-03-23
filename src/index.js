import React from "react";
import ReactDOM from "react-dom";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import App from './components/app'
import axios from 'axios';
import {FocusStyleManager} from '@blueprintjs/core'


// define ServiceNow authentication schema for REST calls
// set up axios defaults
if (process.env.NODE_ENV === 'development') {
    // use username and password defined in a config file
    // for local development
    const username = process.env.REACT_APP_USER;
    const password = process.env.REACT_APP_PASSWORD;
    axios.defaults.auth = {
      username,
      password
    };
  } else {
    // use a session token for production build
    axios.defaults.headers['X-userToken'] = window.g_ck;
  }
  axios.defaults.headers.put['Content-Type'] = 'application/json';

FocusStyleManager.onlyShowFocusOnTabs();
ReactDOM.render(<App />, document.getElementById("root"));
