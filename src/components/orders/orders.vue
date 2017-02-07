<template>
  <div>
    <div class="order-wrapper" ref="ordersWrapper">
    <ul v-show="orders && orders.length" >
      <order-item :order="order" v-for="order in orders" ></order-item>
    </ul>
    <div class="no-order" v-show="!orders || !orders.length ">暂无订单</div> 
    </div>
    <order :order="selectedOrder" ref="order"></order>   
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import BScroll from 'better-scroll'
  import orderItem from './order_item'
  import order from './order'
  import eventBus from 'src/event_bus'
  export default {
    computed: {
      ...mapGetters({
        orders: 'orders'
      })
    },
    data() {
      return {
        selectedOrder: {}
      }
    },
    components: {
      orderItem,
      order
    },
    created() {
      this.$store.dispatch('getOrders', {
        scroll: this._initScroll
      })
      eventBus.$on('showOrderDetail', (order, event) => {
        this.selectOrder(order, event)
      })
    },
    methods: {
      _initScroll() {
        this.ordersScroll = new BScroll(this.$refs.ordersWrapper, {
          click: true
        })
      },
      selectOrder (order, event) {
        if (!event._constructed) {
          return
        }
        this.selectedOrder = order
        this.$refs.order.show()
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
    height: 100%;
    .no-order {
      text-align: center;
      padding: 16px 0;
      font-size: 12px;
      color: rgb(147, 153, 159);
    }
  }
</style>