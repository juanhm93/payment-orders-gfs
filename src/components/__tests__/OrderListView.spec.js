import { describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useOrderStore } from '@/stores/order'
import { mount } from '@vue/test-utils'
import OrderListView from '@/views/OrderListView.vue'
import OrderCreateView from '@/views/OrderCreateView.vue'
import OrderDetailView from '@/views/OrderDetailView.vue'
import db from '../../../db.json'
import BaseLoader from '@/components/global/BaseLoader.vue'
import BaseSelect from '@/components/global/BaseSelect.vue'
import BaseInput from '@/components/global/BaseInput.vue'
import BaseAlert from '@/components/global/BaseAlert.vue'
import PageNavigator from '@/components/global/PageNavigator.vue'
import BaseButton from '@/components/global/BaseButton.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: OrderListView, name: 'order-list' },
    { path: '/order/create', component: OrderCreateView, name: 'create-order' },
    { path: '/order/:orderId', component: OrderDetailView, name: 'order-detail' },
  ],
})

const components = {
  BaseLoader,
  BaseSelect,
  BaseInput,
  BaseAlert,
  BaseButton,
  PageNavigator,
}

describe('OrderListView Component', () => {
  it('should render loading state correctly when loading', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const orderStore = useOrderStore()
    orderStore.isLoading = true

    const wrapper = mount(OrderListView, {
      global: {
        plugins: [pinia, router],
        components,
      },
    })
    expect(wrapper.find('#loading-orders').exists()).toBe(true)
  })

  it('should render empty state correctly when orders are empty', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const orderStore = useOrderStore()
    orderStore.orders = []
    orderStore.isLoading = false

    const wrapper = mount(OrderListView, {
      global: {
        plugins: [pinia, router],
        components,
      },
    })
    expect(wrapper.find('#empty-orders').exists()).toBe(true)
  })

  it('should render table correctly when orders have data', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const orderStore = useOrderStore()
    orderStore.orders = db.orders
    orderStore.isLoading = false

    const wrapper = mount(OrderListView, {
      global: {
        plugins: [pinia, router],
        components,
      },
    })
    expect(wrapper.findAll('[data-testid="order-table-row"]').length).toBe(db.orders.length)
  })

  it('should render error state correctly when there is an error', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const orderStore = useOrderStore()
    orderStore.error = 'Error al cargar las órdenes de pago'
    orderStore.isLoading = false

    const wrapper = mount(OrderListView, {
      global: {
        plugins: [pinia, router],
        components,
      },
    })
    expect(wrapper.find('#error-orders').exists()).toBe(true)
  })
  it('should fields status select and search input correctly', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const orderStore = useOrderStore()
    orderStore.orders = db.orders
    orderStore.error = null

    const wrapper = mount(OrderListView, {
      global: {
        plugins: [pinia, router],
        components,
      },
    })
    expect(wrapper.find('[data-testid="status-select"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="search-input"]').exists()).toBe(true)
  })
})
