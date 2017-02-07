<template>
  <li class="food-item" @click="selectFood(food,$event)">
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
      <price :food="food"></price> 
      <div class="control-wrapper">
        <cart-control :food="food"></cart-control>
      </div>
    </div>
  </li>
</template>

<script>
  import cartControl from 'components/foods/cart/control'
  import price from 'components/foods/food/price'
  import eventBus from 'src/event_bus'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    components: {
      cartControl,
      price
    },
    methods: {
      selectFood(item, event) {
        eventBus.$emit('clickFoodEvent', item, event)
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
      
      .control-wrapper {
        position: absolute;
        right: 0;
        bottom: 12px;
      }
    }
  }
</style>