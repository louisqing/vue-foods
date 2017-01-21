import service from 'services/foods_services'
const GET_FOODS = 'get_foods'

const state = {
  foods: []
}

const getters = {
  foods: satate => state.foods
}

const actions = {
  getFoods({commit}) {
    service.getFoods().then((response) => {
      commit(GET_FOODS, response.data)
    })
  }
}

const mutations = {
  [GET_FOODS] (state, foods) {
    state.foods = foods
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
