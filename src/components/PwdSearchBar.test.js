import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PwdSearchBar from './PwdSearchBar'
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
  wrapper = shallow(<PwdSearchBar />).dive()
})

test('should render <PwdSearchBar />', () => {
  expect(wrapper).toBeDefined()
})

test('should start with input empty', () => {
  expect( wrapper.state('query')).toEqual('')
})

test('testing onchange event for inputs', () => {
  let event = {
    target: {
      name: 'query',
      value: 'me'
    }
  }
  wrapper.instance().onInput(event)
  expect( wrapper.state('query') ).toEqual(event.target.value)
})

test('testing search sites func', () => {
  wrapper.setState({
    query: ''
  })
  wrapper.instance().searchSites()
  expect(store.isSearch).toEqual(false)

  wrapper.setState({
    query: 'me'
  })
  store.passList = {
    data1: {
      url: 'messenger.com',
      email: 'email',
      password: 'password',
      notes: 'notes',
      createdAt: (new Date()).toString(),
      updatedAt: (new Date()).toString()
    }
  }
  wrapper.instance().searchSites()
  // console.log(store.passFilter);
  expect(store.passFilter).toBeDefined()
  expect(store.isSearch).toEqual(true)
})
