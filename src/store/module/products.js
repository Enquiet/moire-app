import api from '@/api/api.js'
import fakeImages from '@/helpers/image.js'
export default {
  namespaced: true,
  state: {
    productsData: [],
    pagination: 0,
    productData: null
  },
  mutations: {
    updateProductList (state, list) {
      state.productsData = list.items
    },
    updatePagination (state, { pagination }) {
      state.pagination = pagination.total
    },
    updateProductData (state, product) {
      state.productData = product
    }
  },
  getters: {
    // добавляю свои картинки
    addFakeImages (state) {
      return state.productData.colors.map(item => {
        const gallery = [...item.gallery, ...fakeImages]
        return {
          color: item.color,
          id: item.id,
          gallery
        }
      })
    }
  },
  actions: {
    async getLoadProducts ({ commit }, {
      categoryId,
      minPrice,
      maxPrice,
      limit,
      page,
      materials,
      seasons,
      color
    }) {
      const list = await api.fetchApi(`api/products?${categoryId}&${materials}&${seasons}&${color}&${page}&${limit}&${minPrice}&${maxPrice}`)
      commit('updateProductList', list)
      commit('updatePagination', list)
    },
    async getLoadProduct ({ commit }, id) {
      try {
        const product = await api.fetchApi(`api/products/${id}`)
        commit('updateProductData', product)
      } catch (e) {
        console.log('ошибка в экшене getLoadProduct')
        throw e
      }
    }
  }
}
