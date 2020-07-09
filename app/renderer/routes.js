import React from 'react';
import { Switch, Route } from 'react-router';

import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';
import Player from './containers/PlayerContainer';
export default (
  <Switch>
    <Route exact path="/" component={LoginPage} />
    <Route exact path="/loggedin" component={LoggedInPage} />
    <Route exact path="/player" component={Player} />
  </Switch>
);
