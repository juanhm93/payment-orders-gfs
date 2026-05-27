import { createRouter, createWebHistory } from 'vue-router'
import OrderListView from '@/views/OrderListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'order-list',
      component: OrderListView,
    },
    {
      path: '/order/create',
      name: 'create-order',
      component: () => import('@/views/OrderCreateView.vue'),
    },
    {
      path: '/order/:id',
      name: 'order-detail',
      component: () => import('@/views/OrderDetailView.vue'),
    },
  ],
})

export default router
