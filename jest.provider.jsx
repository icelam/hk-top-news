import React from 'react';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '@store/reducers';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;

ReduxProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ReduxProvider;
