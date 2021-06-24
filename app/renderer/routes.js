import React from 'react';
import { Switch, Route } from 'react-router';

import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';
import Player from './components/Player';
import Auth from './components/Auth';

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/loggedin" component={LoggedInPage} />
    <Route exact path="/player" component={Player} />
  </Switch>
);
