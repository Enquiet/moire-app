import api from '@/api/api.js'
export default {
  namespaced: true,
  state: {
    categoiesData: [],
    materialsData: [],
    seasonsData: [],
    colorsData: []
  },
  mutations: {
    updateProductCategoies (state, categoies) {
      state.categoiesData = categoies.items
    },
    updateMaterail (state, materials) {
      state.materialsData = materials.items
    },
    updateSeasonProducts (state, seasons) {
      state.seasonsData = seasons.items
    },
    updateColor (state, colors) {
      state.colorsData = colors.items
    }
  },
  actions: {
    async getCategies ({ commit }) {
      const categoies = await api.fetchApi('api/productCategories')
      commit('updateProductCategoies', categoies)
    },
    async getMaterial ({ commit }) {
      const materials = await api.fetchApi('api/materials')
      commit('updateMaterail', materials)
    },
    async getSeasons ({ commit }) {
      const seasons = await api.fetchApi('api/seasons')
      commit('updateSeasonProducts', seasons)
    },
    async getColor ({ commit }) {
      const colors = await api.fetchApi('api/colors')
      commit('updateColor', colors)
    }
  }
}
