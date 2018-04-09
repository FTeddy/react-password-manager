import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PwdForm from './PwdForm'
import store from '../mobx/index.js'

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
  wrapper = shallow(<PwdForm />).dive()
})

test('should render <PwdForm /> with <div className="modal">', () => {
  expect(wrapper).toBeDefined()
  expect(wrapper.find('div').first().hasClass('modal'))
})

test('should start with input empty', () => {
  expect( wrapper.state('url')).toEqual('')
  expect( wrapper.state('username')).toEqual('')
  expect( wrapper.state('password')).toEqual('')
  expect( wrapper.state('notes')).toEqual('')
})

test('testing onchange event for inputs', () => {
  let event = {
    target: {
      name: 'url',
      value: 'www.google.com'
    }
  }
  wrapper.instance().onInput(event)
  expect( wrapper.state('url') ).toEqual(event.target.value)

  event.target.name = 'username'
  event.target.value = 'waldo'
  wrapper.instance().onInput(event)
  expect( wrapper.state('username') ).toEqual(event.target.value)

  event.target.name = 'password'
  event.target.value = '123456678'
  wrapper.instance().onInput(event)
  expect( wrapper.state('password') ).toEqual(event.target.value)

  event.target.name = 'notes'
  event.target.value = 'lorem ipsum'
  wrapper.instance().onInput(event)
  expect( wrapper.state('notes') ).toEqual(event.target.value)
})

test('submit data is executed properly',() => {
  let event = {
    target: {
      name: 'url',
      value: 'www.google.com'
    }
  }
  wrapper.instance().onInput(event)
  expect( wrapper.state('url') ).toEqual(event.target.value)

  event.target.name = 'username'
  event.target.value = 'waldo'
  wrapper.instance().onInput(event)
  expect( wrapper.state('username') ).toEqual(event.target.value)

  event.target.name = 'password'
  event.target.value = '123456678'
  wrapper.instance().onInput(event)
  expect( wrapper.state('password') ).toEqual(event.target.value)

  event.target.name = 'notes'
  event.target.value = 'lorem ipsum'
  wrapper.instance().onInput(event)
  expect( wrapper.state('notes') ).toEqual(event.target.value)

  store.userId = 'testID'

  wrapper.instance().submitData()

  expect(store.isAdd).toEqual(true)
})
