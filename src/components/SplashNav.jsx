import React from 'react'
import 'bulma/css/bulma.css'
import '../App.css'

class SplashNav extends React.Component {
  render () {
    return (
      <nav className="navbar" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="navbar-item">
            <h1 className="title">Azure</h1>
          </div>
          <div className="navbar-item">
            <button className="button is-warning is-outlined">Register</button>
          </div>
        </div>
      </nav>
    )
  }
}

export default SplashNav;
