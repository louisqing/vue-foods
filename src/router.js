import Vue from 'vue'
import VueRouter from 'vue-router'
import foods from 'components/foods/foods'
import restaurant from 'components/restaurant/restaurant'
import orders from 'components/orders/orders'

Vue.use(VueRouter)
const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/foods', name: '/foods', component: foods
    },
    {
      path: '/restaurant', name: '/restaurant', component: restaurant
    },
    {
      path: '/orders', name: '/orders', component: orders
    }
  ]
})
router.push('/foods')
export default router
