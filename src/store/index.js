import Vue from 'vue'
import Vuex from 'vuex'
import products from './module/products'
import filters from './module/filters'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    products,
    filters
  }
})
