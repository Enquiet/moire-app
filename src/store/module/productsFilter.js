import { API_URL } from '@/helpers/API.js'
export default {
  namespaced: true,
  state: {
    categoryData: [],
    materialDate: [],
    seasonDate: [],
    colorDate: []
  },
  mutations: {
    updateProductCategoies (state, category) {
      state.categoryData = category
    },
    updateMaterail (state, material) {
      state.materialDate = material
    },
    updateSeasonProducts (state, seasons) {
      state.seasonDate = seasons
    },
    updateColor (state, color) {
      state.colorDate = color
    }
  },
  gettes: {
    getAllCategory (state) {
      return state.categoryData.items.pop()
    }
  },
  actions: {
    getListCategies (context) {
      fetch(API_URL + '/api/productCategories', {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(response => {
          context.commit('updateProductCategoies', response)
        })
    },
    getListMaterial (context) {
      return fetch(API_URL + '/api/materials', {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          context.commit('updateMaterail', data)
        })
    },
    getListSeasons (context) {
      return fetch(API_URL + '/api/seasons', {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(response => {
          context.commit('updateSeasonProducts', response)
        })
    },
    getListColor (context) {
      return fetch(API_URL + '/api/colors', {
        method: 'GET'
      })
        .then(response => { return response.json() })
        .then(response => {
          context.commit('updateColor', response)
        })
    }
  }
}
