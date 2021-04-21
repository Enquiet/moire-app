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
    // I add my pictures. because one picture comes from the server
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
      materialIds,
      seasonIds,
      colorIds,
      minPrice,
      maxPrice,
      page,
      limit
    }) {
      const list = await api.fetchApi(`api/products?categoryId=${categoryId}&materialIds[]=${materialIds}&seasonIds[]=${seasonIds}&colorIds[]=${colorIds}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&limit=${limit}`)
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
