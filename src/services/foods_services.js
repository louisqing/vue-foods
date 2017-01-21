import baseService from './base_service'
import foodsApi from './api/foods_api'

export default {
  getFoods() {
    return baseService.get(foodsApi.list)
  }
}
