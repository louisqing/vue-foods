// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'common/sass/index.scss'
import 'mint-ui/lib/style.css'
import 'src/filters'
import {Header, Button} from 'mint-ui'

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

