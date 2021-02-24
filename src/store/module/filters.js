import api from '@/helpers/api.js'
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
    async getListCategies ({ commit }) {
      const categoies = await api.fetchApi('api/productCategories', 'GET')
      commit('updateProductCategoies', categoies)
    },
    async getListMaterial ({ commit }) {
      const materials = await api.fetchApi('api/materials', 'GET')
      commit('updateMaterail', materials)
    },
    async getListSeasons ({ commit }) {
      const seasons = await api.fetchApi('api/seasons', 'GET')
      commit('updateSeasonProducts', seasons)
    },
    async getListColor ({ commit }) {
      const colors = await api.fetchApi('api/colors', 'GET')
      commit('updateColor', colors)
    }
  }
}
