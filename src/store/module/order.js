import api from '@/api/api.js'
export default {
  namespaced: true,
  state: {
    orderData: {},
    deliverieData: [],
    paymentsData: []
  },
  mutations: {
    updateOrderData (state, order) {
      state.orderData = order
    },
    updateDeliverieData (state, deliverie) {
      state.deliverieData = deliverie
    },
    updatePaymentsData (state, payments) {
      state.paymentsData = payments
    }
  },
  actions: {
    async orderLoadingData ({ commit }, {
      name,
      address,
      phone,
      email,
      deliveryTypeId,
      paymentTypeId,
      comment
    }) {
      try {
        const order = await api.fetchApi(`api/orders?userAccessKey=${localStorage.getItem('userAccessKey')}`, 'POST', {
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
    },
    async deliverieLoadingData ({ commit }) {
      try {
        const deliverie = await api.fetchApi('api/deliveries')
        commit('updateDeliverieData', deliverie)
      } catch (e) {
        console.log('Ошибка в экшане deliverieLoadingData')
        throw e
      }
    },
    async paymentsLoadingData ({ commit }, {
      deliveryTypeId
    }) {
      try {
        const payments = await api.fetchApi(`api/payments?deliveryTypeId=${deliveryTypeId}`)
        commit('updatePaymentsData', payments)
      } catch (e) {
        console.log('Ошибка в экшане paymentsLoadingData')
        throw e
      }
    }
  }
}
