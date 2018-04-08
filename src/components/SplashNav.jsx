import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
import store from '../mobx/index.js'

import 'bulma/css/bulma.css'
import '../App.css'

@observer class SplashNav extends React.Component {
  componentDidMount() {
    this.props.userObserve()
    // console.log(this.props);
  }
  render () {
    return (
      <nav className="navbar" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link to="/" className="title">Azure</Link>
          </div>
          <div className="navbar-item">
            <Link to="/register" className="button is-warning is-outlined">Register</Link>
          </div>
          { store.isLogin ? (
            <div className="navbar-item">
              <button className="button is-info" onClick={ () => this.props.logout(this) }>logout</button>
            </div>
          ) : (<div></div>) }
        </div>
      </nav>
    )
  }
}

const firebaseToProps = (props, ref, firebaseApp) => ({
  userObserve: () => {
    firebaseApp.auth().onAuthStateChanged( (user) => {
      if (user) {
        // console.log(user);
        store.isLogin = true
        store.displayName = user.displayName
        store.userId = user.uid
      } else {
        // console.log('user loggd out');
        store.isLogin = false
        store.displayName = ''
        store.userId = ''
      }
    })
  },
  logout: (thisComp) => {
    firebaseApp.auth().signOut().then( () => {
      store.isLogin = false
      thisComp.props.history.push(`/`)
    }).catch(err => {
      console.log(err.code);
      console.log(err.message);
    })
  }
})

export default withRouter(connect(firebaseToProps)(SplashNav));
