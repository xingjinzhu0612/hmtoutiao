import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import axios from './api/axios'
import component from './components/component'

import '@/styles/index.less'

Vue.use(component)
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// axios.defaults.headers = {
//   Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hmtoutiao')).token
//   // Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('hmtoutiao')).token
// }

Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
