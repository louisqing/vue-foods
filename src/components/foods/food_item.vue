<template>
  <li class="food-item">
    <div class="avatar">
      <img :src="food.icon" width="57" height="57">
    </div>
    <div class="content">
      <h2 class="name">{{food.name}}</h2>
      <p class="desc">{{food.description}}</p>
      <div class="extra">
        <span class="month-sell-count">月售{{food.sellCount}}份</span>
        <span v-if="food.rating > 0">好评率{{food.rating}}%</span>
      </div>
      <div class="price">
        <span class="sell-price">￥{{food.price}}</span>
        <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
      </div>
    </div>
  </li>
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
  @import '../../common/sass/mixin.scss';
  .food-item {
    display: flex;
    margin: 18px;
    @include border-1px(rgba(7,17,27,0.1));
    padding-bottom: 18px;
    &:last-child {
      @include border-none();
      margin-bottom: 0px;
    }
    .avatar {
      flex: 0 0 57px;
      width: 57px;
      margin-right: 10px;
    }
    .content {
      flex: 1;
      .name {
        margin: 2px 0 8px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .desc,.extra {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147,153,159);
      }
      .desc {
        margin-bottom: 8px;
        line-height: 12px;
      }
      .extra {
        &.month-sell-count {
          margin-right: 12px;
        }
      }
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
    }
  }
</style>