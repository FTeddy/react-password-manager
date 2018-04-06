import React from 'react'
import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
import store from '../mobx/index.js'

import 'bulma/css/bulma.css'
import '../App.css'

@observer class PwdForm extends React.Component {
  constructor () {
    super()
    this.state = {
      url: '',
      username: '',
      password: '',
      notes: ''
    }
  }

  onInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitData = () => {
    const nowDate = new Date()
    const data = {
      url: this.state.url,
      username: this.state.username,
      password: this.state.password,
      notes: this.state.notes,
      createdAt: nowDate.toString(),
      updatedAt: nowDate.toString()
    }
    store.isAdd = true
    this.props.newData(data)

    store.modalClose()
  }

  render () {
    return (
      <div className={ store.pwdModalClass }>
        <div className="modal-background" onClick={ store.modalTrigger }></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title has-text-left short-p">Add new Site</p>
              <button className="delete" aria-label="close" onClick={ store.modalTrigger }></button>
            </header>
            <section className="modal-card-body">
              <div className="field-body short">
                <div className="field">
                  <label className="label has-text-left">URL:</label>
                  <p className="control">
                    <input className="input" type="text" name="url" onChange={ this.onInput }/>
                  </p>
                </div>
                <div className="field">
                  <label className="label has-text-left">Username:</label>
                  <p className="control">
                    <input className="input" type="text" name="username" onChange={ this.onInput }/>
                  </p>
                </div>
              </div>

              <div className="field short">
                <label className="label has-text-left">Password</label>
                <p className="control">
                  <input className="input" type="password" name="password" onChange={ this.onInput }/>
                </p>
              </div>
              <div className="field short">
                <label className="label has-text-left">Notes:</label>
                <p className="control">
                  <textarea className="textarea" type="textarea" name="notes" onChange={ this.onInput }></textarea>
                </p>
              </div>

            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={ this.submitData }>Submit</button>
              <button className="button" onClick={ store.modalClose }>Cancel</button>
            </footer>
          </div>
      </div>
    )
  }
}

const firebaseToProps = (props, ref) => ({
  passManager: 'passManager',
  newData: (data) => { ref('passManager').push(data) }
})

export default connect(firebaseToProps)(PwdForm);
