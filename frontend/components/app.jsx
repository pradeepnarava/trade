import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import {
  AuthRoute,
  ProtectedRoute,
  RenderIfLoggedIn,
  RenderIfLoggedOut
} from '../util/session_util';
import Logo from './logo/logo';
import Search from './search/search';
import Nav from './nav';
import Dashboard from './dashboard';
import Splash from './splash';
import LogInPage from './session/log_in_page';
import SignUpPage from './user/sign_up_page';
import StockPage from './stock/stock_page';
import Balance from './balance/Balance';
import ErrorsCleanerContainer from './error/errors_cleaner_container';

const App = props => (
  <div className="app">
    <header>
      <Logo />
      <div className="search-container">
        <RenderIfLoggedIn component={Search} />
      </div>
      <Nav />
    </header>
    <main>
      <ErrorsCleanerContainer />
      <Switch>
        <Route exact path="/" render={() =>
          <div>
            <RenderIfLoggedIn component={Dashboard} />
            <RenderIfLoggedOut component={Splash} />
          </div>
        } />
        <AuthRoute exact path="/log_in" component={LogInPage} />
        <AuthRoute exact path="/sign_up" component={SignUpPage} />
        <ProtectedRoute exact path="/stocks/:symbol" component={StockPage} />
        <ProtectedRoute exact path="/balance" component={withRouter(Balance)} />
        <Route path="/" render={() => <Redirect to="/" />} />
      </Switch>
    </main>
  </div>
);

export default App;
