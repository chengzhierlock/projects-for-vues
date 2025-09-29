import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import SearchList from '@/views/search/list.vue'
import ProDetail from '@/views/prodetail'
import Search from '@/views/search/index.vue'
import MyOrder from '@/views/myorder'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import Home from '@/views/layout/home.vue'
import store from '@/store'
import Pay from '@/views/pay'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/search', component: Search },
    { path: '/Searchlist', component: SearchList },
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/myorder', component: MyOrder },
    { path: '/pay', component: Pay }
  ]
})

const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  const token = store.getters.token
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
