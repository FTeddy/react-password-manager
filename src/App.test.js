import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

import { Provider } from 'react-firebase'
import { initializeApp } from 'firebase'

const config = {
  apiKey: "AIzaSyApg6pnCCpqDYYg2-HJWDsr1nF3i3p3RjQ",
  authDomain: "hacktiv8-2c76e.firebaseapp.com",
  databaseURL: "https://hacktiv8-2c76e.firebaseio.com",
  projectId: "hacktiv8-2c76e",
};

const firebaseApp = initializeApp(config)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider firebaseApp={firebaseApp}>
      <App />
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
