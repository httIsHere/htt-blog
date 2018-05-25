// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueResource from 'vue-resource'
import store from './store'
// import VueSocketio from 'vue-socket.io'
// import socketio from 'socket.io-client'
import global from './components/Global'

import Toast from './lib/toast/toast'
import Loading from './lib/loading/loading'

import Filter from './plugins/filters'

import Clipboard from 'clipboard'

Vue.prototype.axios = axios
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.API_ROOT
// Vue.prototype.HOST = '/api'

axios.defaults.timeout = 5000

Vue.prototype.global = global

Vue.prototype.$toast = Toast
Vue.prototype.$loading = Loading

Vue.prototype.$copy = Clipboard

Vue.use(VueResource)

Vue.use(Filter)

// Vue.use(VueSocketio, 'http://socketserver.com:1923')
// Vue.use(VueSocketio, socketio('http://127.0.0.0:3001/'), store)

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
