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
  getters: {
    totalCartProduct (state) {
      return state.cartProductData.items.reduce((acc, item) => (item.price * item.quantity) + acc, 0)
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
    async updateAmountProduct ({ commit, state }, {
      basketItemId,
      quantity
    }) {
      // commit('updateProductToCard', {
      //  basketItemId,
      //  quantity
      // })
      try {
        const product = await api.fetchApi(`api/baskets/products?userAccessKey=${state.userAccessKey}`, 'PUT', {
          basketItemId,
          quantity
        })
        commit('updateProductToCard', product)
      } catch (e) {
        console.log('ошибка в экшене updateAmountProduct')
        throw e
      }
    },
    async deleteProductCard ({ commit, state }, {
      basketItemId
    }) {
      try {
        commit('updateProductToCard', state)
        const deleteProduct = await api.fetchApi(`api/baskets/products?userAccessKey=${state.userAccessKey}`, 'DELETE', {
          basketItemId
        })
        commit('updateProductToCard', deleteProduct)
      } catch (e) {
        console.log('ошибка в экшене deleteProductCard')
        throw e
      }
    }
  }
}
