import React from 'react'
import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
import store from '../mobx/index.js'

import 'bulma/css/bulma.css'
import '../App.css'

import SplashNav from './SplashNav'

@observer class Splash extends React.Component {

  enterMain = () => {
    this.props.history.push(`${this.props.match.path}home/1`)
  }

  render () {
    return (
      <div className="hero is-light-blue-bold is-fullheight">
        <div className="hero-head">
          <SplashNav/>
        </div>
        <div className="hero-body">

          <div className="container">
            <h1 className="title">Hello</h1>
            <h2 className="subtitle">{ store.hello }</h2>
            <button className="button" onClick={ this.enterMain }>
              Enter
            </button>
          </div>

        </div>
      </div>
    )
  }
}

const firebaseToProps = (props, ref) => ({
  passManager: 'passManager',
  newData: (data) => { ref('passManager').push(data) }
})

export default connect(firebaseToProps)(Splash);
