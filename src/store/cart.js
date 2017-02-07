import Vue from 'vue'
import {checkFoodInCart} from 'common/js/cart_utils'
const CHECK_CART = 'check_cart'
const ADD_FOOD = 'add_food_to_cart'
const DECREASE_FOOD = 'sub_add_from_cart'
const CLEAR_CART = 'clear_cart'

const state = {
  is_checked: false,
  selected_foods: []
}

const getters = {
  selected_foods: state => state.selected_foods,
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
  },
  emptyCart({commit}) {
    commit(CLEAR_CART)
  }
}

const mutations = {
  [CHECK_CART] (state) {
    state.is_cart_checked = true
  },
  [ADD_FOOD] (state, food) {
    let isFoodInCart = checkFoodInCart(food, state.selected_foods)
    if (isFoodInCart) {
      food.quantity ++
    } else {
      Vue.set(food, 'quantity', 1)
      state.selected_foods.push(food)
    }
  },
  [DECREASE_FOOD] (state, food) {
    let isFoodInCart = checkFoodInCart(food, state.selected_foods)
    if (isFoodInCart) {
      if (food.quantity === 0) {
        return
      } else {
        food.quantity --
      }
    }
  },
  [CLEAR_CART] (state) {
    state.selected_foods = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
