const CHECK_CART = 'check_cart'
const ADD_FOOD = 'add_food_to_cart'
const DECREASE_FOOD = 'sub_add_from_cart'
const CLEAR_CART = 'clear_cart'

const state = {
  is_checked: false,
  line_items: []
}

const getters = {
  line_items: state => state.line_items,
  is_checked: state => state.is_checked
}

const actions = {
  getCart({commit}) {
  },
  checkCart({commit}) {
  },
  addFood({commit}, food) {
    commit(ADD_FOOD, food)
  },
  decreaseFood({commit}, food) {
    commit(DECREASE_FOOD, food)
  }
}

const mutations = {
  [CHECK_CART] (state) {
    state.is_cart_checked = true
  },
  [ADD_FOOD] (state, food) {
    var lineItem = state.line_items.find((lineItem) => {
      if (lineItem.food.name === food.name) {
        return lineItem
      }
    })
    if (lineItem) {
      lineItem.quantity ++
    } else {
      state.line_items.push({
        food: food,
        quantity: 1
      })
    }
  },
  [DECREASE_FOOD] (state, food) {
    var lineItem = state.line_items.find((lineItem) => {
      if (lineItem.food.name === food.name) {
        return lineItem
      }
    })
    if (lineItem) {
      if (lineItem.quantity === 0) {
        return
      } else {
        lineItem.quantity --
      }
    }
  },
  [CLEAR_CART] (state, food) {
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
