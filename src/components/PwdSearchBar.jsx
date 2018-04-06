import React from 'react'

class PwdSearchBar extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input className="input" type="text" placeholder="Search credentials..." />
          </p>
          <p className="control">
            <a className="button is-info">
              Search
            </a>
          </p>
          <p className="control">
            <a className="button is-info">
              Add
            </a>
          </p>
        </div>
      </div>
    )
  }
}

export default PwdSearchBar;
