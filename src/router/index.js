import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../views/login/login.vue'
import Home from '../views/home/home.vue'
import Welcome from '../views/welcome/welcome.vue'
import NotFound from '../views/404/NotFound.vue'
import Article from '../views/article/article.vue'
import Image from '../views/image/image.vue'
import Publish from '../views/publish/publish.vue'
import Comment from '../views/comment/comment.vue'
import Setting from '../views/setting/setting.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'login', path: '/login', component: Login },
    { path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome },
        { name: 'article', path: '/article', component: Article },
        { name: 'image', path: '/image', component: Image },
        { name: 'publish', path: '/publish', component: Publish },
        { name: 'comment', path: '/comment', component: Comment },
        { name: 'setting', path: '/setting', component: Setting }

      ]
    },
    { name: '404', path: '*', component: NotFound }

  ]
})

router.beforeEach((to, from, next) => {
  console.log('ok')
  // next()
  // if (to.path === '/login') return next()
  // const user = window.sessionStorage.getItem('hmtoutiao')
  // if (user) {
  //   next()
  // } else {
  //   next('/login')
  // }
  const user = window.sessionStorage.getItem('hmtoutiao')
  if (to.path !== '/login' && !user) return next('login')
  next()
})

export default router
