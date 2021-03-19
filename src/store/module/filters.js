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
      try {
        const categoies = await api.fetchApi('api/productCategories')
        commit('updateProductCategoies', categoies)
      } catch (e) {
        console.log('оишбка в экшене getCategies')
        throw e
      }
    },
    async getMaterial ({ commit }) {
      try {
        const materials = await api.fetchApi('api/materials')
        commit('updateMaterail', materials)
      } catch (e) {
        console.log('оишбка в экшене getMaterial')
        throw e
      }
    },
    async getSeasons ({ commit }) {
      try {
        const seasons = await api.fetchApi('api/seasons')
        commit('updateSeasonProducts', seasons)
      } catch (e) {
        console.log('оишбка в экшене getSeasons')
        throw e
      }
    },
    async getColor ({ commit }) {
      try {
        const colors = await api.fetchApi('api/colors')
        commit('updateColor', colors)
      } catch (e) {
        console.log('оишбка в экшене getColor')
        throw e
      }
    }
  }
}
