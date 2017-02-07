<template>
     <transition name="move">
       <div v-show="showOrder" class="order">
        <mt-header title="订单详细">
          <mt-button icon="back" @click="hide" slot="left"></mt-button>
        </mt-header>
        <label-title label="菜品信息"></label-title>
         <ul>
            <li class="food_item">
             <div class="row">
                <div class="label name col-3">食品名称</div>
                <div class="label quantity col-3">购买数量</div>
                <div class="label total_price col-3">价格</div>
             </div> 
           </li>
           <li v-for="food in order.foods" class="food_item">
             <div class="row">
                <div class="name col-3">{{food.name}}</div>
                <div class="quantity col-3">X {{food.quantity}}</div>
                <div class="total_price col-3">￥ {{food.quantity * food.price}}</div>
             </div> 
           </li>
         </ul> 
         <div class="clearfix" style="margin-top: 12px;"></div>
          <div class="food-detail">
             <div class="price">
               共付 <span>￥ {{totalPrice}}</span>
             </div>
          </div>
         <label-title label="订单信息"></label-title>
          <ul>
            <li class="order-cell">
              <div class="label">订单号码</div>
              <div class="content">{{order.order_number}}</div>
            </li>
            <li class="order-cell">
              <div class="label">订单时间</div>
              <div class="content">{{order.created_at}}</div>
            </li>
            <li class="order-cell">
              <div class="label">支付方式</div>
              <div class="content">{{order | pay}}</div>
            </li>
          </ul>
        </div>
     </transition>
</template>

<script >
  import labelTitle from 'components/label_title/label_title'
  export default {
    props: {
      order: {
        type: Object
      }
    },
    data() {
      return {
        showOrder: false
      }
    },
    components: {
      labelTitle
    },
    computed: {
      totalPrice() {
        var totalPrice = 0
        if (this.order.foods) {
          this.order.foods.forEach((food) => {
            totalPrice += food.quantity * food.price
          })
        }
        return totalPrice
      }
    },
    methods: {
      show() {
        this.showOrder = true
      },
      hide() {
        this.showOrder = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .order {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    width: 100%;
    background: #fff;
    height: 100%;
    &.move-enter-active,&.move-leave{
      transition: all 0.2s linear;
      transform: translate3d(0,0,0);
    }
    &.move-enter,&.move-leave-active {
      transition: all 0.2s linear;
      transform: translate3d(100%,0,0);      
    }
    .food_item {
      .row {
        display: flex;
        padding: 0 12px;
        .col-3 {
          flex: 1;
          margin-right: 3%;
          line-height: 24px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .total_price {
          text-align: right;
        }
        .quantity {
          font-size: 12px;
          color: rgb(77,85,93);
          text-align: center;
        }
        .label {
          line-height: 24px;
          margin-bottom: 6px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
      }
    }
    .food-detail {
      border-top: 1px solid rgba(7,17,27,0.1);
      padding: 10px 15px;
      text-align: right;
      line-height: 24px;
      font-size: 14px;
      color: rgb(7,17,27);
      span {
        color: #EB5160;
      }
    }
    .order-cell {
      display: flex;
      padding: 12px 12px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .label {
        flex: 0.5;
        color: #929292;
      }
      .content {
        flex: 1; 
        text-align: left;
      }
    }
  }
  .mint-header {
    background-color: #FE4D3D;
  }
</style>