import VueRouter from 'vue-router'
import Vue from 'vue'
import Login from '../views/login/login.vue'
Vue.use(VueRouter)

const router=new VueRouter({
    routes :[
        {name:'login',path:'/login',component:Login}
    ]
})

export default router