import api from '@/api/api.js'
export default {
  namespaced: true,
  state: {
    userAccessKey: null,
    cartProductData: []
  },
  mutations: {
    updateAccessKey (state, key) {
      state.userAccessKey = key
    },
    updateCartProductData (state, item) {
      state.cartProductData = item
    },
    updateProductToCard (state, product) {
      state.cartProductData = product
    }
  },
  actions: {
    async loadToCart (context) {
      try {
        const cart = await api.fetchApi(`api/baskets?userAccessKey=${context.state.userAccessKey}`)
        if (!context.state.userAccessKey) {
          localStorage.setItem('userAccessKey', cart.user.accessKey)
          context.commit('updateAccessKey', cart.user.accessKey)
        }
        context.commit('updateCartProductData', cart)
      } catch (e) {
        console.log('ошибка в создании корзины')
        throw e
      }
    },
    async addProductToCard ({ commit, state }, {
      productId,
      colorId,
      sizeId,
      quantity
    }) {
      try {
        const product = await api.fetchApi(`api/baskets/products?userAccessKey=${state.userAccessKey}`, 'POST', {
          productId: productId,
          colorId: colorId,
          sizeId: sizeId,
          quantity: quantity
        })
        commit('updateProductToCard', product)
      } catch (e) {
        console.log('ошибка в экшене addProductToCard')
        throw e
      }
    },
    async setAmountProduct ({ commit, state }, {
      productId,
      quantity
    }) {
      try {
        const product = await api.fetchApi(`api/baskets/products?userAccessKey=${state.userAccessKey}`, 'PUT', {
          productId: productId,
          quantity: quantity
        })
        commit('updateProductToCard', product)
      } catch (e) {
        console.log('ошибка в экшене setAmountProduct')
        throw e
      }
    }
  }
}
