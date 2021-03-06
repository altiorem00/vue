import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/pages/MainPage'
import NotFoundPages from '@/pages/NotFoundPages'
import ProductPage from '@/pages/ProductPage'
import Cart from '@/pages/Cart'
import OrdersPage from '@/pages/OrdersPage'
import OrderInfoPage from '@/pages/OrederInfoPage'

Vue.use(VueRouter)

const routes = [
  {
    name: 'main',
    component: MainPage,
    path: '/'
  },
  {
    name: 'notFound',
    component: NotFoundPages,
    path: '*'
  },
  {
    name: 'product',
    component: ProductPage,
    path: '/product/:id'
  },
  {
    name: 'cart',
    component: Cart,
    path: '/cart'
  },
  {
    name: 'order',
    component: OrdersPage,
    path: '/order'
  },
  {
    name: 'orderInfo',
    component: OrderInfoPage,
    path: '/order/:id'
  }
]

const router = new VueRouter({
  routes
})

export default router
