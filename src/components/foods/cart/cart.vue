<template>
  <div class="shopcart">
    <div class="content">
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
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        restaurant: 'restaurant',
        line_items: 'line_items'
      }),
      totalPrice() {
        var total = 0
        this.line_items.forEach((lineItem) => {
          total += lineItem.price * lineItem.quantity
        })
        return total
      },
      totalCount() {
        var count = 0
        this.line_items.forEach((lineItem) => {
          count += lineItem.quantity
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
              background: rgb(0,160,220);
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
  }
</style>