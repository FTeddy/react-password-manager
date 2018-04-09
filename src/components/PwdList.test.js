import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import PwdList from './PwdList'
import { PwdList as Origin }  from './PwdList'

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

let wrapper, data
beforeEach(() => {
  store.userId = 'test'
  data = {

  }
  wrapper = shallow(
      <PwdList />
  ).dive()
})

test('should render <PwdList /> with <tbody>', () => {
  // console.log(wrapper.instance());
  expect(wrapper).toBeDefined()
  expect(wrapper.find('tbody')).toBeDefined()
})

test('functions to load and remove exist', () => {
  expect(wrapper.instance().props.removeData).toBeDefined()
  expect(wrapper.instance().props.onLoading).toBeDefined()
})

test('unmount will untrigger search flag and empty data', () => {
    wrapper.unmount();
    expect(store.isSearch).toEqual(false)
    expect(store.passList).toEqual(null)
})

test('data loading', () => {
  let loadPassList = wrapper.instance().loadPassList
  store.userId = 'wg2CpVI7VjYWhehrFrOid2ABB052'
  wrapper.instance().props.onLoading(loadPassList, store.userId, function(){
    expect(store.isLoading).toEqual(true)
  })
})

test('firebase data loader to be called on did mount', () => {
  const componentDidMountSpy = jest.spyOn(PwdList.prototype, 'componentDidMount');
  // console.log(PwdList.prototype);
  // const fakeLoad = jest.spyOn(wrapper.instance().props, 'onLoading');

  const wrapperB = shallow(<PwdList/>).dive();
  // console.log(wrapperB.instance().props.onLoad);
  expect(PwdList.prototype.componentDidMount).toHaveBeenCalledTimes(1)
  // expect(wrapperB.instance().props.onLoading).toHaveBeenCalledTimes(1)
  componentDidMountSpy.mockClear();
})

test('Load passlist', () => {
  store.passList = null
  let fakeSnapShot = {
    data1: {
      url: 'web1',
      email: 'email',
      password: 'password',
      notes: 'notes',
      createdAt: (new Date()).toString(),
      updatedAt: (new Date()).toString()
    }
  }
  wrapper.instance().loadPassList(fakeSnapShot)
  expect(store.passList).toBeDefined()
  expect(store.passList.data1.url).toEqual(fakeSnapShot.data1.url)
  expect(store.passFilter).toBeDefined()
  expect(store.isDelete).toEqual(false)
  expect(store.isAdd).toEqual(false)
  expect(store.isLoading).toEqual(false)
})

test('Swal trigger on button click ', () => {
  let classSwal = '.swal2-popup swal2-modal swal2-show'
  // testID
  wrapper.find('.delete is-medium').first().prop('onClick')
  expect(wrapper.find(classSwal)).toBeDefined()
})

test('delete data', () => {
  let userId = 'testID'
  let classSwal = '.swal2-popup swal2-modal swal2-show'
  wrapper.find('.delete is-medium').first().prop('onClick')
  wrapper.instance().deleteData(userId, () => {
    console.log('aaaa');

  })
  wrapper.find('swal2-confirm button is-danger').first().prop('onClick')
  expect(wrapper.find(classSwal)).toBeDefined()
  expect(store.isDelete).toEqual(false)
})

test('rendering search and trigger edit modalUpdateTrigger', () => {
  store.isSearch = true
  let nowDate = new Date().toString()
  store.passFilter = [
    ['id', {
      url: 'web1',
      email: 'email',
      password: 'password',
      notes: 'notes',
      createdAt: nowDate,
      updatedAt: nowDate
    }]
  ]
  store.pwdEditClass = 'modal'
  wrapper.find('td.short-p').first().simulate('click')
  expect(store.pwdEditClass).toEqual('modal is-active')
  store.pwdEditClass = 'modal'
  store.modalUpdateTrigger({data:'test'})
  expect(store.pwdEditClass).toEqual('modal is-active')
})
