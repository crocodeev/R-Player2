import React from 'react';
import { Switch, Route } from 'react-router';

import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';
import Player from './containers/PlayerContainer';
import Auth from './components/Auth';
import Placeholder from './components/Placeholder';

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route exact path="/loggedin" component={LoggedInPage} />
    <Route exact path="/player" component={Placeholder} />
  </Switch>
);
