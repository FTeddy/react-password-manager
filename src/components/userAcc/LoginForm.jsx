import React from 'react'
import { observer } from 'mobx-react'
import { connect } from 'react-firebase'
import store from '../../mobx/index.js'

@observer class LoginForm extends React.Component {
  constructor () {
    super()
    this.state = {
      email: '',
      password: '',
      err: ''
    }
  }
  onInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  login = () => {
    if (store.isLoading === false) {
      store.isLoading = true
      store.buttonLoginClass = 'button is-rounded is-loading full'
      this.props.login(this.state.email, this.state.password)
    }
  }

  enterMain = () => {
    this.props.history.push(`${this.props.match.path}home/1`)
  }
  render () {
    return (
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-3"></div>
            <div className="column is-6 notification is-light">

              { store.isLogin ? (
                <div>
                  <h1 className="title">Welcome to Azure, { store.displayName }</h1>
                  <button className="button is-rounded full" onClick={ this.enterMain }>
                    Enter
                  </button>
                </div>
              ) : (
                <div>
                  <h1 className="title">Welcome to Azure Password Manager</h1>
                  <p>{ this.state.err }</p>
                  <div className="field short">
                    <p className="control">
                      <input className="input" type="text"
                        placeholder="email..."
                        name="email" onChange={ this.onInput }/>
                    </p>
                  </div>
                  <div className="field short">
                    <p className="control">
                      <input className="input" type="password"
                        placeholder="password..."
                        name="password" onChange={ this.onInput }/>
                    </p>
                  </div>
                  <div className="control short">
                    <button className={ store.buttonLoginClass } onClick={ this.login }>Login</button>
                  </div>
                </div>
              ) }

            </div>
            <div className="column is-3"></div>
          </div>
        </div>
      </div>
    )
  }
}

const firebaseToProps = (props, ref, firebaseApp) => ({
  passAccount: 'passAccount',
  newAccount: (data) => { ref('passAccount').push(data) },
  login: (email, password) => {
    firebaseApp.auth().signInWithEmailAndPassword(email, password).then(()=>{
      console.log('logged in');
      store.isLoading = false
      store.buttonLoginClass = 'button is-rounded full'
    }).catch(err =>{
      this.setState({
        err: err.message
      })
      console.log(err.code);
      console.log(err.message);
    })
  }
})

export default connect(firebaseToProps)(LoginForm);
