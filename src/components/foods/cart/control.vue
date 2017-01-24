<template>
  <div class="cart-control">
    <transition name="move">
      <div class="food-decrease " v-show="lineItem.quantity > 0" @click="decreaseFoodFromCarat($event)">
        <span class="inner icon-remove_circle_outline">
        </span>
      </div>
    </transition>    
    <div class="food-count" v-show="lineItem.quantity > 0">{{lineItem.quantity}}</div>
    <div class="food-add icon-add_circle" @click="addFoodToCart($event)"></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import eventBus from 'src/event_bus'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    computed: {
      ...mapGetters({
        line_items: 'line_items'
      }),
      lineItem() {
        var lineItem = this.line_items.find((lineItem) => {
          if (lineItem.food.name === this.food.name) {
            return lineItem
          }
        })
        if (!lineItem) {
          lineItem = {
            food: this.food,
            quantity: 0
          }
        }
        return lineItem
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
      decreaseFoodFromCarat(event) {
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