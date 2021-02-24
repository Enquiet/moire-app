import api from '@/helpers/api.js'
export default {
  namespaced: true,
  state: {
    productsData: [],
    pagination: 0
  },
  mutations: {
    updateProductDate (state, list) {
      state.productsData = list.items
    },
    updatePagination (state, all) {
      state.pagination = all.pagination.total
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
    }
  }

}
