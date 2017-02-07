<template>
  <li class="order-item">
  <div class="order-item-wrapper">
    <div class="order-header">
      <h1 class="title">订单号: <span class="order_no">{{order.order_number}}</span> </h1>
      <span class="status">{{order.status}}</span>
    </div>
    <div class="order-content" v-if="order.foods.length > 0">
       <span class="food-title">{{order.foods[0].name}}</span>
       <span class="food-quantity">X{{order.foods[0].quantity}}</span>
    </div>
    <div class="order-footer">
      <div class="foot-wrapper">
        <div class="footer-left">
          下单时间为{{order.created_at}}
        </div>
        <div class="footer-right">
          共<span class="total_quantity">{{totalQuantity}}</span>件商品, 实付<span class="total_price">￥ {{totalPrice}}</span>
        </div>   
      </div>
    </div>
    <div class="order-button">
      <span class="order-detail">
        查看详情
      </span>
    </div>
  </div>
  </li>
</template>

<script>
  export default {
    props: {
      order: {
        type: Object
      }
    },
    computed: {
      totalQuantity() {
        var totalQuantity = 0
        this.order.foods.forEach((food) => {
          totalQuantity += food.quantity
        })
        return totalQuantity
      },
      totalPrice() {
        var totalPrice = 0
        this.order.foods.forEach((food) => {
          totalPrice += food.quantity * food.price
        })
        return totalPrice
      }
    }
  }
</script>

<style lang="scss" scoped>
  .order-item {
     background: #fff;
     margin-top: 10px;   
     line-height: 24px;
     font-size: 12px;
     color: rgb(77,85,93);  
    .order-item-wrapper {
      padding: 5px;
      .order-header {
        border-bottom: 1px solid rgba(7,17,27,0.1);
        padding-bottom: 5px;
        line-height: 24px;
        font-size: 12px;
        color: rgb(77,85,93);
        .title {
          display: inline-block;
          .order_no {
            line-height: 14px;
            font-size: 14px;
            color: rgb(7,17,27);
          }
        }
        .status {
          display: inline-block;
          float: right;
        }
      }
      .order-content {
        padding-top: 10px;
        padding-left: 50px;
        padding-right: 25px;
        
        .food-quantity {
          float: right;
        }
      }
      .foot-wrapper {
        .footer-left {
          display: inline-block;
          width: 45%;
          margin-right: 5%;
        }
        .footer-right {
          display: inline-block;
          width: 45%;
          text-align: right;
        }
      }
      .order-button {
        border-top: 1px solid rgba(7,17,27,0.1);
        padding-top: 10px;
        text-align: right;
        .order-detail {
          text-align: center;
          z-index: 10;
          padding: 0 12px;
          box-sizing: border-box;
          border-radius: 12px;
          font-size: 10px;
          color: #fff;
          background: rgb(0,160,220);
        }
      }


    }
  }

</style>

