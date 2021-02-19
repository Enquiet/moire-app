import Vue from 'vue'
import Vuex from 'vuex'
import productModule from './module/products'
import filterModule from './module/productsFilter'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    productModule,
    filterModule
  }
})
