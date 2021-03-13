import api from '@/api/api.js'
import img from '@/helpers/image.js'
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
  getters: {
    updateNewImages (state) {
      return state.productData.colors.map(item => {
        const url = img.map(e => e.image)
        return {
          ...item.gallery[0].file,
          id: item.color.id,
          list: url
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
      const list = await api.fetchApi(`api/products?categoryId=${categoryId}&materialIds[]=${materials}&seasonIds[]=${seasons}&colorIds[]=${color}'&page=${page}&limit=${limit}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
      commit('updateProductDate', list)
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
