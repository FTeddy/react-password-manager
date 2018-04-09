import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { observer } from 'mobx-react'
import store from './mobx/index.js'

import Splash from './components/Splash.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import PwdHome from './components/PwdHome.jsx'

@observer export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={ Splash }/>
            <Route exact path="/register" component={ Splash }/>
            <Route exact path="/home/:page" render={ () => (
                store.isLogin ? (
                  <PwdHome />
                ) : (
                  <Redirect to="/" />
                )
              ) }/>
            <Route component={ ErrorPage } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
