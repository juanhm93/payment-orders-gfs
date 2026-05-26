import { describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useOrderStore } from '@/stores/order'
import { mount } from '@vue/test-utils'
import OrderListView from '@/views/OrderListView.vue'
import db from '../../../db.json'

describe('OrderListView Component', () => {
  it('should render loading state correctly when loading', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const orderStore = useOrderStore()
    orderStore.isLoading = true

    const wrapper = mount(OrderListView, {
      global: {
        plugins: [pinia],
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
        plugins: [pinia],
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
        plugins: [pinia],
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
        plugins: [pinia],
      },
    })
    expect(wrapper.find('#error-orders').exists()).toBe(true)
  })
})
