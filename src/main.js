// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import layer from 'vue-layer'
import store from './store'

require('./common/style/font-awesome.css')
require('./common/style/base.css')

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: '../static/logo.png'
})

Vue.prototype.$layer = layer(Vue)

fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
