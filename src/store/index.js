import Vue from 'vue'
import Vuex from 'vuex'
import productModule from './module/products'
import categoryModule from './module/productCategoies'
import productSeason from './module/productSeason'
import productMaterial from './module/productMaterial'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    productModule,
    categoryModule,
    productSeason,
    productMaterial
  }
})
