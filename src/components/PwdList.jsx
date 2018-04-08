import React from 'react'
import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
import store from '../mobx/index.js'

import 'bulma/css/bulma.css'
import '../App.css'

import swal from 'sweetalert2'

@observer class PwdList extends React.Component {

  componentDidMount() {
    this.loadCheck()
    this.props.onLoad(this.loadPassList, store.userId)
  }

  componentWillUnmount() {
    store.isSearch = false
    store.passList = null
  }

  componentWillUpdate(nextProps, nextState) {
    this.loadCheck()
  }

  loadCheck = () => {
    if (!this.props.passManager) {
      store.isLoading = true
    } else {
      store.isLoading = false
    }
  }

  loadPassList = (snapshot) => {
    // console.log(store.passList);
    if (!store.passList || store.isAdd || store.isDelete) {
      // console.log('step2');
      // if (this.props.passManager) {
        store.passList = snapshot
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
      // }
    }
  }

  deleteData = (pwd) => {
    swal({
      title: 'Are you sure',
      text: `You can't recover this data`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      confirmButtonClass: 'button is-danger',
      cancelButtonClass: 'button is-info',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        store.isDelete = true
        this.props.removeData(pwd)
        swal(
          'Entry Deleted',
          'The site account data is removed',
          'success'
        )
      }
    })

  }

  static getData = (passwords) => {
    store.loadPasswords(passwords)
  }

  render () {
    if (store.isSearch) {
      return (
        <tbody>
          {
            store.passFilter ?
            store.passFilter.map((pwd, i) => (
              <tr key={ i }>
                <td className="short-p" onClick={ () => store.modalUpdateTrigger(pwd) }>
                  { pwd[1].url }
                </td>
                <td className="short-p" onClick={ () => store.modalUpdateTrigger(pwd) }>
                  { pwd[1].username }
                </td>
                <td className="short-p" onClick={ () => store.modalUpdateTrigger(pwd) }>
                  { pwd[1].password }
                </td>
                <td className="short-p" onClick={ () => store.modalUpdateTrigger(pwd) }>
                  { pwd[1].notes }
                </td>
                <td className="short-p" onClick={ () => store.modalUpdateTrigger(pwd) }>
                  { new Date(pwd[1].createdAt).toDateString() }
                </td>
                <td className="short-p" onClick={ () => store.modalUpdateTrigger(pwd) }>
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
            Object.entries(store.passList).map((pwd, i) => (
              <tr key={ i }>
                <td className="short-p" onClick={ () => store.modalUpdateTrigger(pwd) }>
                  { pwd[1].url }
                </td>
                <td className="short-p" onClick={ () => store.modalUpdateTrigger(pwd) }>
                  { pwd[1].username }
                </td>
                <td className="short-p" onClick={ () => store.modalUpdateTrigger(pwd) }>
                  { pwd[1].password }
                </td>
                <td className="short-p" onClick={ () => store.modalUpdateTrigger(pwd) }>
                  { pwd[1].notes }
                </td>
                <td className="short-p" onClick={ () => store.modalUpdateTrigger(pwd) }>
                  { new Date(pwd[1].createdAt).toDateString() }
                </td>
                <td className="short-p" onClick={ () => store.modalUpdateTrigger(pwd) }>
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
  newData: (data) => { ref('passManager').push(data) },
  removeData: (key) => {
    ref('passManager').child(key).set(null)
  },
  onLoad: (loadPassList, userId) => {
    ref('passManager')
    .orderByChild('userId').equalTo(userId)
    // .once('value').then((snapshot) => {
    //   store.isadd = true
    //   console.log(snapshot.val());
    //   loadPassList(snapshot.val())
    // })
    .on('value', (snapshot) => {
      store.isadd = true
      loadPassList(snapshot.val())
    })
  }
})

export default connect(firebaseToProps)(PwdList);
