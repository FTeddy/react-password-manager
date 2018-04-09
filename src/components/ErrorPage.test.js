import React from 'react';
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ErrorPage from './ErrorPage'

configure({ adapter: new Adapter() })

test('Makes sure error message is rendered', () => {
  let wrapper = shallow(<ErrorPage />)
  expect(wrapper).toBeDefined()
  expect(wrapper.find('p').text()).toEqual('404 Error')
})
