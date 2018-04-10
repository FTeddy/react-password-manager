import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import RegisterForm from './RegisterForm'
import store from '../../mobx/index.js'

configure({ adapter: new Adapter() })

import { Provider } from 'react-firebase'
import { initializeApp } from 'firebase'

const config = {
  apiKey: "AIzaSyApg6pnCCpqDYYg2-HJWDsr1nF3i3p3RjQ",
  authDomain: "hacktiv8-2c76e.firebaseapp.com",
  databaseURL: "https://hacktiv8-2c76e.firebaseio.com",
  projectId: "hacktiv8-2c76e",
};
const firebaseApp = initializeApp(config)

let wrapper

beforeEach(() => {
  wrapper = shallow(<RegisterForm />).dive()
})


test('should render <RegisterForm />', () => {
  expect(wrapper).toBeDefined()
  // store.isLogin = true
  // expect(wrapper.find('.button is-rounded full')).toBeDefined()
})

test('should start with input empty', () => {
  expect( wrapper.state('email')).toEqual('')
  expect( wrapper.state('password')).toEqual('')
  expect( wrapper.state('username')).toEqual('')
  expect( wrapper.state('err')).toEqual('')
})

test('testing onchange event for inputs', () => {
  let event = {
    target: {
      name: 'email',
      value: 'google@google.com'
    }
  }
  wrapper.instance().onInput(event)
  expect( wrapper.state('email') ).toEqual(event.target.value)

  event.target.name = 'password'
  event.target.value = '123456678'
  wrapper.instance().onInput(event)
  expect( wrapper.state('password') ).toEqual(event.target.value)

  event.target.name = 'username'
  event.target.value = 'testName'
  wrapper.instance().onInput(event)
  expect( wrapper.state('username') ).toEqual(event.target.value)
})

test('test submitRegistration error password not sufficients', () => {
  let event = {
    target: {
      name: 'email',
      value: 'google@google.com'
    }
  }
  store.isLoading = false

  wrapper.instance().onInput(event)
  expect( wrapper.state('email') ).toEqual(event.target.value)

  event.target.name = 'password'
  event.target.value = '123456678'
  wrapper.instance().onInput(event)
  expect( wrapper.state('password') ).toEqual(event.target.value)

  event.target.name = 'username'
  event.target.value = 'testName'
  wrapper.instance().onInput(event)
  expect( wrapper.state('username') ).toEqual(event.target.value)

  wrapper.instance().submitRegistration(() => {
    console.log(store.pwdProgress)
    expect(wrapper.state('err')).toEqual('Password should be at least 8 characters long and include lowercase, uppercase, numbers and special characters')
  })

})
