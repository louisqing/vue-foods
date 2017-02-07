<template>
  <div class="price">
        <span class="sell-price">￥{{food.price}}</span>
        <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      food: {
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>
    .price {
        font-weight: 700;
        line-height: 24px;
        .sell-price {
          margin-right: 8px;
          font-size: 14px;
          color: rgb(240,20,20);
        }
        .old-price {
          text-decoration: line-through;
          font-size: 10px;
          color: rgb(147,153,159);
        }
      }
</style>