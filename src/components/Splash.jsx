import React from 'react'
import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
// import store from '../mobx/index.js'
import { Route, Switch} from 'react-router-dom';

import 'bulma/css/bulma.css'
import '../App.css'

import SplashNav from './SplashNav'
import RegisterForm from './userAcc/RegisterForm'
import LoginForm from './userAcc/LoginForm'

@observer class Splash extends React.Component {
  render () {
    return (
      <div className="hero is-light-blue-bold is-fullheight">
        <div className="hero-head">
          <SplashNav/>
        </div>

        <Switch>
          <Route exact path="/" component={ LoginForm }/>
          <Route path="/register" component={ RegisterForm }/>
        </Switch>

      </div>
    )
  }
}

const firebaseToProps = (props, ref) => ({
  // passManager: 'passManager',
  // newData: (data) => { ref('passManager').push(data) }
})

export default connect(firebaseToProps)(Splash);
