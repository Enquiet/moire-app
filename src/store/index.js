import Vue from 'vue'
import Vuex from 'vuex'
import products from './module/products'
import filters from './module/filters'
import baskets from './module/baskets'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    products,
    filters,
    baskets
  }
})
