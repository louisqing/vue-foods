const CHECK_CART = 'check_cart'
const ADD_FOOD_TO_CART = 'add_food_to_cart'
const SUB_FOOD_TO_CART = 'sub_add_from_cart'
const CLEAR_CART = 'clear_cart'

const state = {
  is_checked: false,
  line_items: [
    {
      quantity: 2,
      price: 20.0
    },
    {
      quantity: 3,
      price: 50.0
    }
  ]
}

const getters = {
  line_items: state => state.line_items,
  is_checked: state => state.is_checked
}

const actions = {
  getCart({commit}) {
  },
  checkCart({commit}) {
  }
}

const mutations = {
  [CHECK_CART] (state) {
    state.is_cart_checked = true
  },
  [ADD_FOOD_TO_CART] (state, food) {
  },
  [SUB_FOOD_TO_CART] (state, food) {
    // state.
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
