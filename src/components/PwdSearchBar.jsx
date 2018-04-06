import React from 'react'
import { observer } from 'mobx-react'
import store from '../mobx/index.js'

@observer class PwdSearchBar extends React.Component {
  constructor () {
    super()
    this.state = {
      query: ''
    }
  }

  onInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  searchSites = () => {
    if (this.state.query === '') {
      return store.isSearch = false
    }
    if (store.passList) {
      let searched = Object.entries(store.passList).filter(pwd => {
        if (pwd[1].url.indexOf(this.state.query) > -1) {
          return true
        }
      })
      store.passFilter = searched
      store.isSearch = true
      console.log(searched);
      // console.log(store.passFilter);
    }
  }

  render () {
    return (
      <div className="container">
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input className="input" name="query" type="text" placeholder="Search for sites..." onChange={ this.onInput }/>
          </p>
          <p className="control">
            <button className="button is-info" onClick={ this.searchSites }>
              Search
            </button>
          </p>
          <p className="control">
            <button className="button is-info" onClick={ store.modalTrigger }>
              Add
            </button>
          </p>
        </div>
      </div>
    )
  }
}

export default PwdSearchBar;
