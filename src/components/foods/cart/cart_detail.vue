<template>
  <transition name="fold"> 
  <div class="shopcart-list">
    <div class="list-header">
      <h1 class="title">购物车</h1>
      <span class="empty" @click="empty">清空</span>
    </div>
    <div class="list-content" ref="lineItems">
      <ul>
        <li class="food" v-for="item in foods" v-if="item.quantity > 0">
          <span class="name">{{item.name}}</span>
          <div class="price">
            <span>￥ {{item.price * item.quantity}}</span>
          </div>
          <div class="cart-control-wrapper">
            <control :food = "item"></control>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </transition>
</template>
<script>
  import control from './control'
  import {mapGetters} from 'vuex'
  import BSScroll from 'better-scroll'
  import eventBus from 'src/event_bus'
  export default {
    computed: {
      ...mapGetters({
        foods: 'selected_foods'
      })
    },
    created () {
      eventBus.$on('addFoodEvent', () => {
        this.initScroll()
      })
      eventBus.$on('showCartDetail', () => {
        this.initScroll()
      })
    },
    props: {
      show: {
        type: Boolean
      }
    },
    components: {
      control
    },
    methods: {
      initScroll () {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BSScroll(this.$refs.lineItems, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      empty () {
        this.$store.dispatch('emptyCart')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../../common/sass/mixin.scss';
  .shopcart-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1; 
    width: 100%;
    transform: translate3d(0, -100%, 0);
    &.fold-enter-active,&.fold-leave {
      transition: all 0.5s;
    }
    &.fold-enter,&.fold-leave-active {
      transform: translate3d(0, 0, 0);
    }
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rbga(7,17,27,0.1);
      .title {
        float: left;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0,160,220);
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 217px;
      background: #fff;
      overflow: hidden;
      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        @include border-1px(rgba(7,17,27,0.1));
        .name {
          line-height: 24px;
          font-size: 14px;
          color: rgb(7,17,27);
        }  
        .price {
          position: absolute;
          right: 90px;
          bottom: 12px;
          line-height: 24px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240,20,20);
        }
        .cart-control-wrapper {
          position: absolute;
          right: 0;
          bottom: 6px;
        }
      }
    }
  }
</style>