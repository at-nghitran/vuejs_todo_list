import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/auth/Login'
import Home from '../views/Home'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/home',
    name: 'home',
    component: Home
  }]
})

export default router
