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
  getters: {
    // Вынес ключ пользователя в гетр для того чтоб не дублировать его :)
    accesskey () {
      return localStorage.getItem('userAccessKey')
    }
  },
  actions: {
    async orderLoadingData ({ commit, getters }, data) {
      try {
        const order = await api.fetchApi(`api/orders?userAccessKey=${getters.accesskey}`, 'POST', data)
        commit('updateOrderData', order)
      } catch (e) {
        console.log('Ошибка в экшане orderLoadingData')
        throw e
      }
    },
    async deliverieLoadingData ({ commit }) {
      try {
        const delivery = await api.fetchApi('api/deliveries')
        commit('updateDeliverieData', delivery)
      } catch (e) {
        console.log('Ошибка в экшане deliverieLoadingData')
        throw e
      }
    },
    async paymentsLoadingData ({ commit }, deliveryTypeId) {
      try {
        const payments = await api.fetchApi(`api/payments?deliveryTypeId=${deliveryTypeId}`)
        commit('updatePaymentsData', payments)
      } catch (e) {
        console.log('Ошибка в экшане paymentsLoadingData')
        throw e
      }
    },
    async orderMadeData ({ commit, getters }, id) {
      try {
        const orderMade = await api.fetchApi(`api/orders/${id}?userAccessKey=${getters.accesskey}`)
        commit('updateOrderData', orderMade)
      } catch (e) {
        console.log('Ошибка в экшане orderMadeData')
        throw e
      }
    }
  }
}
