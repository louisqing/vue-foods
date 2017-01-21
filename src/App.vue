<template>
  <div>   
    <v-header ></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/foods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/comments">评论</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/restaurant">商家</router-link>
      </div>
      <div class="tab-item">
         <router-link to="/orders">订单</router-link>
      </div>
    </div>    
    <router-view></router-view>
  </div>
</template>

<script>
import header from 'components/header/header'
export default {
  name: 'app',
  components: {
    'v-header': header
  },
  created() {
    this.$store.dispatch('getRetaurant')
  }
}
</script>

<style lang="scss">
  @import 'common/sass/mixin.scss';
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7,17,27,0.1));
    .tab-item {
      flex: 1;
      text-align: center;
      a {
        display: block;
        color: rgb(77,85,93);
      }
      a.active{
        color: rgb(240,20,20)
      }
    }
  }
</style>
