import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../views/login/login.vue'
import Home from '../views/home/home.vue'
import Welcome from '../views/welcome/welcome.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome }
      ]
    }

  ]
})

export default router
