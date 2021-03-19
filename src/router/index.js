import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/pages/Main'
import Product from '@/pages/Product'
import Cart from '@/pages/Cart'
import notFoundPage from '@/pages/404'
Vue.use(VueRouter)

const routes = [
  { name: 'main', component: Main, path: '/' },
  { name: 'product', component: Product, path: '/product/:id' },
  { name: 'cart', component: Cart, path: '/cart' },
  { name: '404', component: notFoundPage, path: '/404' },
  { path: '*', redirect: '*' }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})
export default router
