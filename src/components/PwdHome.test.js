import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { PwdHome } from './PwdHome'
import store from '../mobx/index.js'

configure({ adapter: new Adapter() })

let wrapper

beforeEach(() => {
  wrapper = shallow(<PwdHome />)
})

test('should render <PwdHome /> with <div className="hero is-light-blue-bold is-fullheight">', () => {
  expect(wrapper).toBeDefined()
  expect(wrapper.find('div').first().hasClass('hero is-light-blue-bold is-fullheight'))
})

test('child components SplashNav, PwdSearchBar, PwdForm, PwdList and PwdUpdateForm should exist', () => {
  expect(wrapper.find('SplashNav')).toBeDefined()
  expect(wrapper.find('PwdSearchBar')).toBeDefined()
  expect(wrapper.find('PwdForm')).toBeDefined()
  expect(wrapper.find('PwdList')).toBeDefined()
  expect(wrapper.find('PwdUpdateForm')).toBeDefined()
})

test('loading should exist', () => {
  expect(wrapper.find('.button is-info is-loading full')).toBeDefined()
})

test('There is no need for a state', () => {
  expect(wrapper.state()).toBeFalsy()
})

test('data is loading test', () => {
  store.isLoading = true
  expect(wrapper.find('.button is-info is-loading full')).toBeDefined()
})
