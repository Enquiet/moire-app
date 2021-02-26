import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/pages/Main'
import Product from '@/pages/Product'
Vue.use(VueRouter)

const routes = [
  { name: 'main', component: Main, path: '/' },
  { name: 'product', component: Product, path: '/product/:id' }
]

const router = new VueRouter({
  routes
})
export default router
