import baseService from './base_service'
import orderApi from './api/order_api'

export default {
  getOrders() {
    return baseService.get(orderApi.orders)
  }
}
