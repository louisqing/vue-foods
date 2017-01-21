import Vue from 'vue'
import service from 'services/foods_services'
const GET_FOODS = 'get_foods'
const SCROLL = 'scroll'
const HEIGHT_PUSH = 'heightPush'
const HEIGHT_CLEAR = 'heightClear'

const state = {
  foods: [],
  listHeight: [],
  scrollY: 0
}

const getters = {
  foods: state => state.foods,
  listHeight: state => state.listHeight,
  scrollY: state => state.scrollY
}

const actions = {
  getFoods({commit}, {scroll, calHeight}) {
    service.getFoods().then((response) => {
      commit(GET_FOODS, response.data)
      commit(HEIGHT_CLEAR)
      Vue.nextTick(() => {
        scroll()
        calHeight()
      })
    })
  },
  scrollFoodsY({commit}, scrollY) {
    commit(SCROLL, scrollY)
  },
  foodsHeightPush({commit}, height) {
    commit(HEIGHT_PUSH, height)
  },
  foodsHeightClear({commit}) {
    commit(HEIGHT_CLEAR)
  }
}

const mutations = {
  [GET_FOODS] (state, foods) {
    state.foods = foods
  },
  [SCROLL] (state, scrollY) {
    state.scrollY = scrollY
  },
  [HEIGHT_CLEAR] (state) {
    state.listHeight = []
  },
  [HEIGHT_PUSH] (state, height) {
    state.listHeight.push(height)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
