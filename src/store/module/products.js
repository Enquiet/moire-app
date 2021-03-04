import api from '@/api/api.js'
export default {
  namespaced: true,
  state: {
    productsData: [],
    pagination: 0,
    productData: null
  },
  mutations: {
    updateProductDate (state, list) {
      state.productsData = list.items
    },
    updatePagination (state, { pagination }) {
      state.pagination = pagination.total
    },
    updateProductData (state, product) {
      state.productData = product
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
      const list = await api.fetchApi(`api/products?categoryId=${categoryId}&materialIds[]=${materials}&seasonIds[]=${seasons}&colorIds[]=${color}'&page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}`, 'GET')
      commit('updateProductDate', list)
      commit('updatePagination', list)
    },
    async getLoadProduct ({ commit }, id) {
      const product = await api.fetchApi(`api/products/${id}`, 'GET')
      commit('updateProductData', product)
    }
  }
}
