<template>
  <div>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight': totalCount > 0}">          
          {{totalPrice}}元
        </div>
        <div class="desc" >
          另外需要配送费用{{restaurant.deliveryPrice}}元
        </div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>     
    </div>
     <div class="ball-container">
        <transition-group name="drop" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
          <div v-for="ball in balls" v-show="ball.show" :key="ball" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
      <cart-detail v-show="listShow" :show="listShow"></cart-detail>
  </div>
  <transition name="fade">
    <div class="list-mask" v-show="listShow" @click="hideList"></div>
  </transition>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import cartDetail from './cart_detail'
  import eventBus from 'src/event_bus'
  export default {
    data() {
      let balls = [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }

      ]
      return {
        balls,
        dropBalls: [],
        fold: true
      }
    },
    components: {
      cartDetail
    },
    computed: {
      ...mapGetters({
        restaurant: 'restaurant',
        foods: 'selected_foods'
      }),
      totalPrice() {
        var total = 0
        this.foods.forEach((food) => {
          total += food.price * food.quantity
        })
        return total
      },
      totalCount() {
        var count = 0
        this.foods.forEach((food) => {
          count += food.quantity
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.restaurant.minPrice}元起送`
        } else if (this.totalPrice < this.restaurant.minPrice) {
          return `还差${this.restaurant.minPrice - this.totalPrice}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.restaurant.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow () {
        if (this.totalCount === 0) {
          this.fold = true
          return false
        }
        let show = !this.fold
        return show
      }
    },
    created () {
      eventBus.$on('addFoodEvent', (target) => {
        this._drop(target)
      })
    },
    methods: {
      beforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webKitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webKitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      enter (el) {
        /* eslint-disable no-unused-vars */
        let _ = el.offsetHeight
        this.$nextTick(() => {
          el.style.webKitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webKitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
        })
      },
      afterEnter (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      _drop(element) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = element
            this.dropBalls.push(ball)
            return
          }
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      hideList () {
        this.fold = true
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return
        }
        window.alert(`支付${this.totalPrice}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 50;
    height: 48px;
    background: #000;
    .content {
      display: flex;
      background: #141d27;
      font-size: 0;
      color: rgba(255,255,255,0.4);
      .content-left {
        flex: 1;
        .logo-wrapper {
          display: inline-block;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          height: 56px;
          width: 56px;
          box-sizing: border-box;
          vertical-align: top;
          border-radius: 50%;
          background: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            vertical-align: top;
            border-radius: 50%;
            background: rgb(43,52,60);
            text-align: center;
            i {
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
            }
            &.highlight {
              background: #F9C34D;
              i {
                color: #fff;
              }
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            background: rgb(240,20,20);
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          margin-top: 12px;
          line-height: 24px;
          padding-right: 12px;
          box-sizing: border-box;
          border-right: 1px solid rgba(255,255,255,0.1);
          font-size: 16px;
          font-weight: 700;
          &.highlight {
            color: #fff;
          }
        }
        .desc {
          display: inline-block;
          line-height: 24px;
          vertical-align: top;
          margin: 12px 0 0 12px;
          font-size: 10px;
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          background: #2b333b; 
          &.not-enough {
            background: #2b333b;    
          }
          &.enough {
            background: #00b43c;
            color: #fff;
          }         
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32;
        bottom: 22px;
        z-index: 200;
        &.drop-enter-active,&.drop-leave-active {
          transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41);
          .inner {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgb(0,160,220);
            transition: all 0.4s linear;
          }
        }
      }
    }
  }
  .list-mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 40;
      backdrop-filter: blur(10px);
      background: rgba(7,17,27,0.6);
      &.fade-enter-active,&.fade-leave-active {
        transition: all 0.5s;
        opacity:1;        
      }
      &.fade-enter,&.fade-leave {
        opacity: 0;
        background: rgba(7,17,27,0);       
      }
  }
</style>