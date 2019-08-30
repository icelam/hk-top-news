import 'core-js/es/map';
import 'core-js/es/set';

import React from 'react';
import ReactDOM from 'react-dom';

import '@styles/index.scss';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '@store/reducers';

import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
