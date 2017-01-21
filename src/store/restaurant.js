import service from 'services/restaurant_services'
const GET_RESTAURANT = 'get_restaurant'

const state = {
  restaurant: {},
  classMap: ['decrease', 'discount', 'special', 'invoice', 'gurantee']
}

const getters = {
  restaurant: satate => state.restaurant,
  classMap: state => state.classMap
}

const actions = {
  getRetaurant({commit}) {
    service.getRestaurant().then((response) => {
      commit(GET_RESTAURANT, response.data)
    })
  }
}

const mutations = {
  [GET_RESTAURANT] (state, restaurant) {
    state.restaurant = restaurant
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
