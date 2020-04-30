import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux/store'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import axios from 'axios'
import { BrowserRouter } from 'react-router-dom';

axios.defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6Ikx1aXogRWR1YXJkbyBNb3VyYSIsImVtYWlsIjoibHVpei5lbW9mQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1ODgxMDMwNjEsImV4cCI6MTU4ODM2MjI2MX0.c2FxzHU5Al3i9ZRCjmbPECwG94EwfdS6FbyZsD4n6BE'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
