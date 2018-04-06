import React from 'react'
import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
import store from '../mobx/index.js'

import 'bulma/css/bulma.css'
import '../App.css'

@observer class PwdList extends React.Component {

  componentDidMount() {
    this.loadCheck()
  }

  componentWillUpdate(nextProps, nextState) {
    this.loadCheck()
    this.loadPassList()
    // console.log(store.passList)
  }

  componentWillUnmount() {
    store.isSearch = false
  }

  loadCheck = () => {
    if (!this.props.passManager) {
      store.isLoading = true
    } else {
      store.isLoading = false
    }
  }

  loadPassList = () => {
    console.log(store.isDelete);
    console.log(store.isAdd);
    if (!store.passList || store.isAdd || store.isDelete) {
      if (this.props.passManager) {
        console.log('updating');
        store.passList = this.props.passManager
        store.isDelete = false
        store.isAdd = false
      }
    }
  }

  deleteData = (pwd) => {
    // console.log('here!');
    // console.log(pwd);
    store.isDelete = true
    this.props.removeData(pwd)

  }

  render () {
    console.log('render');
    if (store.isSearch) {
      return (
        <tbody>
          {
            store.passFilter ?
            store.passFilter.map((pwd, i) => (
              <tr key={ i }>
                <td className="short-p">
                  { pwd[1].url }
                </td>
                <td className="short-p">
                  { pwd[1].username }
                </td>
                <td className="short-p">
                  { pwd[1].password }
                </td>
                <td className="short-p">
                  { pwd[1].notes }
                </td>
                <td className="short-p">
                  { new Date(pwd[1].createdAt).toDateString() }
                </td>
                <td className="short-p">
                  { new Date(pwd[1].updatedAt).toDateString() }
                </td>
                <td className="short-p">
                  <button className="delete is-medium" onClick={ () => this.deleteData(pwd[1]) }></button>
                </td>
              </tr>
            ))
            :  <tr>

               </tr>
          }
        </tbody>
      )
    } else {
      return (
        <tbody>
          {
            store.passList ?
            Object.entries(this.props.passManager).map((pwd, i) => (
              <tr key={ i }>
                <td className="short-p">
                  { pwd[1].url }
                </td>
                <td className="short-p">
                  { pwd[1].username }
                </td>
                <td className="short-p">
                  { pwd[1].password }
                </td>
                <td className="short-p">
                  { pwd[1].notes }
                </td>
                <td className="short-p">
                  { new Date(pwd[1].createdAt).toDateString() }
                </td>
                <td className="short-p">
                  { new Date(pwd[1].updatedAt).toDateString() }
                </td>
                <td className="short-p">
                  <button className="delete is-medium" onClick={ () => this.deleteData(pwd[0]) }></button>
                </td>
              </tr>
            ))
            :  <tr>

               </tr>
          }
        </tbody>
      )
    }

  }
}

const firebaseToProps = (props, ref) => ({
  passManager: 'passManager',
  newData: (data) => { ref('passManager').push(data) },
  removeData: (key) => { ref('passManager').child(key).set(null) }
})

export default connect(firebaseToProps)(PwdList);
