<template>
  <div class="order-wrapper" ref="ordersWrapper">
    <ul v-show="orders && orders.length" >
      <order-item :order="order" v-for="order in orders"></order-item>
    </ul>
    <div class="no-order" v-show="!orders || !orders.length "></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import BScroll from 'better-scroll'
  import orderItem from './order_item'
  export default {
    computed: {
      ...mapGetters({
        orders: 'orders'
      })
    },
    components: {
      orderItem
    },
    created() {
      this.$store.dispatch('getOrders', {
        scroll: this._initScroll
      })
    },
    methods: {
      _initScroll() {
        this.ordersScroll = new BScroll(this.$refs.ordersWrapper, {
          click: true
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .order-wrapper {
    position: absolute;
    top: 174px;
    width: 100%;
    overflow: auto;
    background: #f5f5f5;
  }
</style>