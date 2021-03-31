import api from '@/api/api.js'
export default {
  namespaced: true,
  state: {
    orderData: {}
  },
  mutations: {
    updateOrderData (state, order) {
      state.orderData = order
    }
  },
  actions: {
    async orderLoadingData ({ commit, state }, {
      name,
      address,
      phone,
      email,
      deliveryTypeId,
      paymentTypeId,
      comment
    }) {
      try {
        const order = await api.fetchApi('api/orders', 'POST', {
          name,
          address,
          phone,
          email,
          deliveryTypeId,
          paymentTypeId,
          comment
        })
        commit('updateOrderData', order)
      } catch (e) {
        console.log('Ошибка в экшане orderLoadingData')
        throw e
      }
    }
  }
}
