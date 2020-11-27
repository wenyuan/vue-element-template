import Vue from 'vue'

// A modern alternative to CSS resets
import 'normalize.css/normalize.css'

// Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// Global CSS
import '@/styles/index.scss'

import App from './App.vue'
import router from './router'
import store from './store'

import * as filters from './filters' // global filters

Vue.use(ElementUI, {
  size: 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
