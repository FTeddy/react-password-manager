import React from 'react'
import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
import store from '../../mobx/index.js'

import 'bulma/css/bulma.css'
import '../../App.css'

@observer class RegisterForm extends React.Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      username: '',
      err: ''
    }
  }

  // componentDidMount() {
    // this.props.userObserve()
  // }

  onInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.name === 'password') {
      store.passValidate(e.target.value)
    }
  }
  submitRegistration = () => {
    if (store.isLoading === false) {
      if (store.pwdProgress >= 80) {
        store.isLoading = true
        store.buttonLoginClass = 'button is-rounded is-loading full'
        this.props.registration(this.state.email, this.state.password, this.state.username)
        this.setState({
          email: '',
          password: '',
          username: '',
          err: ''
        })
      } else {
        this.setState({
          err: 'Password should be at least 8 characters long and include lowercase, uppercase, numbers and special characters'
        })
      }
    }
  }
  render () {
    return (
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-3"></div>
            <div className="column is-6 notification is-light">

              <h1 className="title">Register new account</h1>
              <p>{ this.state.err }</p>
              <div className="field short">
                <label className="label has-text-left">Email</label>
                <p className="control">
                  <input className="input" type="text" name="email" onChange={ this.onInput }/>
                </p>
              </div>
              <div className="field short">
                <label className="label has-text-left">Display Name</label>
                <p className="control">
                  <input className="input" type="text" name="username" onChange={ this.onInput }/>
                </p>
              </div>
              <div className="field short">
                <label className="label has-text-left">Password</label>
                <p className="control">
                  <input className="input" type="password" name="password" onChange={ this.onInput }/>
                  <progress className={ store.pwdProgColor } value={ store.pwdProgress } max="100"></progress>
                </p>
              </div>
              <div className="control short">
                <button className={ store.buttonLoginClass } onClick={ this.submitRegistration }>Submit</button>
              </div>

            </div>
            <div className="column is-3"></div>
          </div>
        </div>
      </div>
    )
  }
}

const firebaseToProps = (props, ref, firebaseApp) => ({
  registration: (email, password, username) => {
    firebaseApp.auth().createUserWithEmailAndPassword(email, password).then(()=>{
      firebaseApp.auth().currentUser.updateProfile({
        displayName: username
      }).then(() => {
        store.isLoading = false
        store.buttonLoginClass = 'button is-rounded full'
      }).catch(err => {
        this.setState({
          err: err.message
        })
        console.log(err.code);
        console.log(err.message);
      })
    }).catch(err => {
      this.setState({
        err: err.message
      })
      console.log(err.code);
      console.log(err.message);
    })
  }
  // updateUserName: (username) => {
  //   firebaseApp.auth().currentUser.updateProfile({
  //     displayName: username
  //   }).catch(err => {
  //     console.log(err.code);
  //     console.log(err.message);
  //   })
  // },
  // userObserve: () => {
  //   firebaseApp.auth().onAuthStateChanged( (user) => {
  //     if (user) {
  //       // console.log(user);
  //       store.isLogin = true
  //     } else {
  //       // console.log('user loggd out');
  //       store.isLogin = false
  //     }
  //   })
  // }
})

export default connect(firebaseToProps)(RegisterForm);
