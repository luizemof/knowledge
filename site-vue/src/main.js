import Vue from 'vue'

import 'font-awesome/css/font-awesome.css'

import './config/bootstrap'
import './config/msgs'

import App from './App'
import store from './config/store'
import router from './config/router'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')