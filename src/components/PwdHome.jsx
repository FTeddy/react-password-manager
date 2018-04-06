import React from 'react'
import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
import store from '../mobx/index.js'

import 'bulma/css/bulma.css'
import '../App.css'

import PwdSearchBar from './PwdSearchBar'

@observer class PwdHome extends React.Component {
  render () {
    return (
      <div className="hero is-light-blue-bold is-fullheight">
        <div className="hero-head">

        </div>
        <div className="hero-body is-top">

          <div className="container">
            <PwdSearchBar />
            <table className="table is-bordered is-fullwidth">
              <thead>
                <tr>
                  <th className="has-text-centered">URL</th>
                  <th className="has-text-centered">Username</th>
                  <th className="has-text-centered">Password</th>
                  <th className="has-text-centered">Created at</th>
                  <th className="has-text-centered">Last Updated</th>
                </tr>
              </thead>
            </table>
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

export default connect(firebaseToProps)(PwdHome);
