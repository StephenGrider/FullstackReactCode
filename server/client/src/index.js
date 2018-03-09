import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './components/reducers';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}><App /></Provider>,  
  document.querySelector('#root'));

console.log('STRIPE KEY IS: ', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is: ', process.env.NODE_ENV);
  