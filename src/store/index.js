import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app: app, // set namespace 'app' for module app (key: namespace, value: sub module)
    settings: settings,
    user: user
  }
})

export default store
