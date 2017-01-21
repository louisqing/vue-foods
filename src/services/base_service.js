import Vue from 'vue'
import url from './api/url'
export default {
  get(api, params = {}) {
    let apiUrl = `${url}${api}`
    return Vue.http.get(apiUrl, {params: params}).then((response) => {
      return response.data
    })
  },
  post(api, params = {}) {
    let apiUrl = `${url}${api}`
    return Vue.http.post(apiUrl, params).then((response) => {
      return response.data
    })
  }
}
