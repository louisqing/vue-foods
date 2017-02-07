import Vue from 'vue'
import Vuex from 'vuex'
import restaurant from './restaurant'
import food from './food'
import cart from './cart'
import order from './order'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    restaurant,
    food,
    cart,
    order
  }
})
