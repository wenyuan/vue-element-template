import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../views/Home.vue'

const routes = [
  {
    path: '/login',
    // 路线级别代码切分
    // 通过配置 webpackChunkName，将为该路由生成一个单独的块(login.[hash].js)
    // 在该路由被访问时，会懒加载(lazy-loaded)该 js 文件
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history', // 需要后台配置支持
  base: process.env.BASE_URL,
  routes
})

export default router
