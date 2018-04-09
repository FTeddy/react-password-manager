import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SplashNav from './SplashNav'
import store from '../mobx/index.js'

configure({ adapter: new Adapter() })

import { Provider } from 'react-firebase'
import { initializeApp } from 'firebase'
import { Link, withRouter } from 'react-router-dom';


const config = {
  apiKey: "AIzaSyApg6pnCCpqDYYg2-HJWDsr1nF3i3p3RjQ",
  authDomain: "hacktiv8-2c76e.firebaseapp.com",
  databaseURL: "https://hacktiv8-2c76e.firebaseio.com",
  projectId: "hacktiv8-2c76e",
};
const firebaseApp = initializeApp(config)

let wrapper

beforeEach(() => {
  wrapper = shallow(
    // <Provider firebaseApp={firebaseApp}>
      <SplashNav  />
    // </Provider>
  )
})

test('should render <SplashNav />', () => {
  // console.log(wrapper.instance());
  expect(wrapper).toBeDefined()
  console.log(wrapper.find('.navbar'));
})
