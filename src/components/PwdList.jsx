import React from 'react'
import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
import store from '../mobx/index.js'

import 'bulma/css/bulma.css'
import '../App.css'



@observer class PwdList extends React.Component {

  componentDidMount() {
    this.loadCheck()
    this.props.onUpdate()
  }

  componentWillUpdate(nextProps, nextState) {
    this.loadCheck()
    this.loadPassList()
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
    // console.log('enter');
    if (!store.passList || store.isAdd || store.isDelete) {
      if (this.props.passManager) {
        // console.log('confirm');
        store.passList = this.props.passManager
        let searched = Object.entries(store.passList).filter(pwd => {
          if (pwd[1].url.indexOf(store.query) > -1) {
            return true
          } else {
            return false
          }
        })
        store.passFilter = searched
        store.isDelete = false
        store.isAdd = false
      }
    }
  }

  deleteData = (pwd) => {
    store.isDelete = true
    this.props.removeData(pwd)

  }

  static getData = (passwords) => {
    console.log('masuk ', passwords)
    store.loadPasswords(passwords)
  }

  render () {
    if (store.isSearch) {
      return (
        <tbody>
          {
            store.passFilter ?
            store.passFilter.map((pwd, i) => (
              <tr key={ i } onClick={ () => store.modalUpdateTrigger(pwd) }>
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
    } else {
      return (
        <tbody>
          {
            store.passList ?
            Object.entries(this.props.passManager).map((pwd, i) => (
              <tr key={ i } onClick={ () => store.modalUpdateTrigger(pwd) }>
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
  removeData: (key) => {
    ref('passManager').child(key).set(null)
  },
  onUpdate: () => { ref('passManager').on('value', function(snapshot) {
    // console.log(snapshot.val());
    store.isadd = true
    // const passwords = Object.keys(snapshot.val()).map(key => ({
    //   ...snapshot.val()[key],
    //   id: key
    // }))
    // console.log('pass ==> ', passwords)
    // store.loadPasswords(passwords)
    // console.log('this nya', this)
    // PwdList.getData(passwords)
    // console.log('store  ', store)
  }) }
})

export default connect(firebaseToProps)(PwdList);
