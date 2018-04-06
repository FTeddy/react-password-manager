import React from 'react'
import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
import store from '../mobx/index.js'

import 'bulma/css/bulma.css'
import '../App.css'

import PwdSearchBar from './PwdSearchBar'
import PwdForm from './PwdForm'
import PwdList from './PwdList'

@observer class PwdHome extends React.Component {

  render () {
    return (
      <div className="hero is-light-blue-bold is-fullheight">
        <div className="hero-head">

        </div>
        <div className="hero-body is-top">

          <div className="container">
            <PwdSearchBar />
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th className="short-p">URL</th>
                  <th className="short-p">Username</th>
                  <th className="short-p">Password</th>
                  <th className="short-p">Notes</th>
                  <th className="short-p">Created at</th>
                  <th className="short-p">Last Updated</th>
                  <th className="short-p"></th>
                </tr>
              </thead>
              <PwdList />
            </table>

          </div>

          <PwdForm />
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