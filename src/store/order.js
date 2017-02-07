import Vue from 'vue'
import service from 'services/order_services'
const GET_ORDERS = 'get_orders'

const state = {
  orders: []
}

const getters = {
  orders: state => state.orders
}

const actions = {
  getOrders({commit}, {scroll}) {
    service.getOrders().then((response) => {
      commit(GET_ORDERS, response.data)
      Vue.nextTick(() => {
        scroll()
      })
    })
  }
}

const mutations = {
  [GET_ORDERS] (state, orders) {
    state.orders = orders
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
