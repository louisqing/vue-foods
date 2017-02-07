<!-- 食品详情 -->
<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="食品预览图" >
          <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>  
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <price :food="food"></price> 
          <div class="cartcontrol-warpper">
            <control :food="food"></control>           
          </div>
          <transition name="fade">
            <div class="buy" v-show.stop.prevent="checkFoodNotInCar" @click="addFoodToCart($event)">
              加入购物车
              </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <div class="title">商品信息</div>
          <p class="text">{{food.info}}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import price from './price'
  import control from 'components/foods/cart/control'
  import split from 'components/split/split'
  import BScroll from 'better-scroll'
  import {mapGetters} from 'vuex'
  import eventBus from 'src/event_bus'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    components: {
      price,
      control,
      split
    },
    data() {
      return {
        showFlag: false
      }
    },
    computed: {
      ...mapGetters({
        selected_foods: 'selected_foods'
      }),
      checkFoodNotInCar() {
        if (this.food.quantity && this.food.quantity > 0) {
          return false
        }
        return true
      }
    },
    methods: {
      show() {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.showFlag = false
      },
      addFoodToCart(event) {
        if (!event._constructed) {
          return
        }
        eventBus.$emit('addFoodEvent', event.target)
        this.$store.dispatch('addFood', this.food)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    &.move-enter-active,&.move-leave{
      transition: all 0.2s linear;
      transform: translate3d(0,0,0);
    }
    &.move-enter,&.move-leave-active {
      transition: all 0.2s linear;
      transform: translate3d(100%,0,0);      
    }
    .food-content {
      .image-header {
        width: 100%;
        position: relative;
        height: 0;
        padding-top: 100%; //当padding-top为100%时是以width来计算
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .back {
          position: absolute;
          top: 10px;
          left: 0;
          .icon-arrow_lift {
            display: block;
            padding: 10px;
            font-size: 20px;
            color: #fff;
          }
        }        
      }
      .content {
        position: relative;
        padding: 18px;
        .title {
          line-height: 14px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,17,27);
        }
        .detail {
          margin-bottom: 18px;
          line-height: 10px;
          font-size: 0;
          .sell-count,.rating {
            font-size: 10px;
            color: rgb(147,153,159);
          }
          .sell-count {
            margin-right: 12px;
          }
        }
        .cartcontrol-warpper {
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
        .buy {
          position: absolute;
          right: 18px;
          bottom: 18px;
          z-index: 10;
          height: 24px;
          line-height: 24px;
          padding: 0 12px;
          box-sizing: border-box;
          border-radius: 12px;
          font-size: 10px;
          color: #fff;
          background: rgb(0,160,220);
          &.fade-enter-active {
            transition: all 0.2s;
            opacity: 1;
          }
          &.fade-leave-active,&.fade-enter {
            opacity: 0;
          }
        }
      }
      .info {
        padding: 18px;
        .title {
          line-height: 14px;
          margin-bottom: 6px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .text {
          line-height: 24px;
          padding: 0 8px;
          font-size: 12px;
          color: rgb(77,85,93);
        }
      }
    }
  }
</style>