<template>
  <div class="cart-control">
    <transition name="move">
      <div class="food-decrease " v-show="food.quantity > 0" @click.stop.prevent="decreaseFoodFromCart($event)">
        <span class="inner icon-remove_circle_outline">
        </span>
      </div>
    </transition>    
    <div class="food-count" v-show="food.quantity > 0">{{food.quantity}}</div>
    <div class="food-add icon-add_circle" @click.stop.prevent="addFoodToCart($event)"></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import eventBus from 'src/event_bus'
  import {checkFoodInCart} from 'common/js/cart_utils'
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    computed: {
      ...mapGetters({
        foods: 'selected_foods'
      })
    },
    created() {
      if (!checkFoodInCart(this.food, this.foods)) {
        Vue.set(this.food, 'quantity', 0)
      }
    },
    methods: {
      addFoodToCart(event) {
        if (!event._constructed) {
          return
        }
        this.$store.dispatch('addFood', this.food)
        eventBus.$emit('addFoodEvent', event.target)
      },
      decreaseFoodFromCart(event) {
        if (!event._constructed) {
          return
        }
        this.$store.dispatch('decreaseFood', this.food)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cart-control {    
    font-size: 0;
    .food-decrease,.food-add {
      display: inline-block;
      padding: 6px;
      color: rgb(0,160,220);
      transition: all 0.4s linear;
    }
    .food-add {
      font-size: 24px;
      line-height: 24px;
    }
    .food-decrease {
      &.move-enter-active,&.move-leave-active {
        opacity: 1;
        transform: translate3D(0,0,0);
        .inner {
          transition: all 0.4s linear;
          transform: rotate(0);
        }
      }
      &.move-enter,&.move-leave-active {
        opacity: 0;
        transform: translate3D(24px,0,0);
        .inner {
          transform: rotate(180deg)
        }
      }
      .inner {
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
      }
    }
    .food-count {
      font-size: 10px;
      line-height: 24px;
      padding-top: 6px;
      width: 12px;
      text-align: center;
      display: inline-block;
      vertical-align: top;
      color: rgb(147,153,159);
    }
  }
</style>