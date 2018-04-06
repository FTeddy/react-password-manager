import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';

import Splash from './components/Splash.jsx'
import ErrorPage from './components/ErrorPage.jsx'
import PwdHome from './components/PwdHome.jsx'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={ Splash }/>
            <Route exact path="/home/:page" component={ PwdHome }/>
            <Route component={ ErrorPage } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
