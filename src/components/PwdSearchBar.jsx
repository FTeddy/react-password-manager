import React from 'react'
import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
import store from '../mobx/index.js'

@observer class PwdSearchBar extends React.Component {
  constructor () {
    super()
    this.state = {
      query: ''
    }
  }

  componentDidMount() {
    this.props.onLoad(this, store.userId)
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
    store.query = this.state.query
    if (store.passList) {
      let searched = Object.entries(store.passList).filter(pwd => {
        if (pwd[1].url.indexOf(this.state.query) > -1) {
          return true
        } else {
          return false
        }
      })
      store.passFilter = searched
      store.isSearch = true
      // console.log(searched);
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

const firebaseToProps = (props, ref) => ({
  onLoad: (thisComp, userId) => { ref('passManager')
    .orderByChild('userId').equalTo(userId)
    // .once('value').then((snapshot) => {
    //   store.isadd = true
    //   console.log(snapshot.val());
    //   loadPassList(snapshot.val())
    // })
    .on('value', (snapshot) => {
      thisComp.searchSites()
    })
  }
})

export default connect(firebaseToProps)(PwdSearchBar);
