import Vue from 'vue'
import Vuex from 'vuex'
import productModules from './module/products'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    productModules
  }
})
