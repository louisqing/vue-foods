import baseService from './base_service'
import restaurantApi from './api/restaurant_api'

export default {
  getRestaurant() {
    return baseService.get(restaurantApi.show)
  }
}
