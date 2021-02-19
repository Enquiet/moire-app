import { API_URL } from '@/helpers/API.js'
export default {
  namespaced: true,
  state: {
    productDate: [],
    allproductDate: []
  },
  mutations: {
    updateProductDate (state, list) {
      state.productDate = list
    },
    updateAllProductDate (state, all) {
      state.allproductDate = all
    }
  },
  getters: {
    getImgProducts (state) {
      let imgProduct
      return state.productDate.items.map(elem => {
        elem.colors.forEach(file => {
          imgProduct = file.gallery.map(i => {
            return {
              ...i,
              img: i.file.url
            }
          })
        })
        return {
          ...elem,
          img: imgProduct
        }
      })
    }
  },
  actions: {
    getLoadProducts (context, {
      categoryId,
      minPrice,
      maxPrice,
      limit,
      page,
      materials,
      seasons,
      color
    }) {
      return fetch(API_URL + '/api/products?categoryId=' + categoryId + '&materialIds[]=' + materials + '&seasonIds[]=' + seasons + '&colorIds[]=' + color + '&page=' + page + '&limit=' + limit + '&minPrice=' + minPrice + '&maxPrice=' + maxPrice, {
        method: 'GET'
      }).then(response => {
        return response.json()
      })
        .then((response) => {
          console.log(response)
          context.commit('updateProductDate', response)
        })
    },
    getAllProducts (context) {
      return fetch(API_URL + '/api/products', {
        method: 'GET'
      })
        .then(date => {
          return date.json()
        })
        .then((date) => {
          context.commit('updateAllProductDate', date)
        })
    }
  }

}
