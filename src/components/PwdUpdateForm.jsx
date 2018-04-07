import React from 'react'
import { connect } from 'react-firebase'
import { observer } from 'mobx-react'
import store from '../mobx/index.js'

import 'bulma/css/bulma.css'
import '../App.css'

@observer class PwdUpdateForm extends React.Component {
  constructor () {
    super()
    this.state = {
      url: '',
      username: '',
      password: '',
      notes: '',
      id: ''
    }
  }

  componentWillReact () {
    if (this.state.id !== store.selectedPass[0]) {
      this.updateData()
    }
  }

  updateData = () => {
    this.setState({
      url: store.selectedPass[1].url,
      username: store.selectedPass[1].username,
      password: store.selectedPass[1].password,
      notes: store.selectedPass[1].notes,
      id: store.selectedPass[0]
    })
  }

  onInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.name === 'password') {
      store.passValidate(e.target.value)
    }
  }

  submitData = () => {
    const nowDate = new Date()
    const data = {
      url: this.state.url,
      username: this.state.username,
      password: this.state.password,
      notes: this.state.notes,
      updatedAt: nowDate.toString()
    }
    store.isAdd = true
    this.props.updateData(data)
    store.modalUpdateClose()
  }

  render () {
    return store.selectedPass[1] ? (
      <div className={ store.pwdEditClass }>
        <div className="modal-background" onClick={ store.modalUpdateClose }></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title has-text-left short-p">Edit Site</p>
              <button className="delete" aria-label="close" onClick={ store.modalUpdateClose }></button>
            </header>
            <section className="modal-card-body">
              <div className="field-body short">
                <div className="field">
                  <label className="label has-text-left">URL:</label>
                  <p className="control">
                    <input className="input" type="text" value={ this.state.url } name="url" onChange={ this.onInput }/>
                  </p>
                </div>
                <div className="field">
                  <label className="label has-text-left">Username:</label>
                  <p className="control">
                    <input className="input" type="text" value={ this.state.username } name="username" onChange={ this.onInput }/>
                  </p>
                </div>
              </div>

              <div className="field short">
                <label className="label has-text-left">Password</label>
                <p className="control">
                  <input className="input" type="password" value={ this.state.password } name="password" onChange={ this.onInput }/>
                  <progress className={ store.pwdProgColor } value={ store.pwdProgress } max="100"></progress>
                </p>
              </div>
              <div className="field short">
                <label className="label has-text-left">Notes:</label>
                <p className="control">
                  <textarea className="textarea" type="textarea" value={ this.state.notes } name="notes" onChange={ this.onInput }></textarea>
                </p>
              </div>

            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={ this.submitData }>Submit</button>
              <button className="button" onClick={ store.modalUpdateClose }>Cancel</button>
            </footer>
          </div>
      </div>
    ) : ( <div></div> )
  }
}

const firebaseToProps = (props, ref) => ({
  passManager: 'passManager',
  updateData: (data) => { ref('passManager').child(store.selectedPass[0]).update(data) }
})

export default connect(firebaseToProps)(PwdUpdateForm);
