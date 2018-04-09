import React from 'react'
// import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
import store from '../mobx/index.js'

import 'bulma/css/bulma.css'
import '../App.css'

import SplashNav from './SplashNav'
import PwdSearchBar from './PwdSearchBar'
import PwdForm from './PwdForm'
import PwdList from './PwdList'
import PwdUpdateForm from './PwdUpdateForm'

@observer export class PwdHome extends React.Component {
  render () {
    return (
      <div className="hero is-light-blue-bold is-fullheight">
        <div className="hero-head">
          <SplashNav/>
        </div>
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
            {
              store.isLoading ? (
                <div className="">
                  <button className="button is-info is-loading full">Loading</button>
                </div>
              ) : (
                <div></div>
              )
            }
          </div>

          <PwdForm />
          <PwdUpdateForm />
        </div>
      </div>
    )
  }
}

export default PwdHome;
