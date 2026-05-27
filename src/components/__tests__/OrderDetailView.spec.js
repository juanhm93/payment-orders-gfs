import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { useOrderStore } from '@/stores/order'
import OrderDetailView from '@/views/OrderDetailView.vue'
import OrderListView from '@/views/OrderListView.vue'
import OrderCreateView from '@/views/OrderCreateView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import BaseLoader from '@/components/global/BaseLoader.vue'
import BaseSelect from '@/components/global/BaseSelect.vue'
import BaseInput from '@/components/global/BaseInput.vue'
import BaseButton from '@/components/global/BaseButton.vue'
import BaseModal from '@/components/global/BaseModal.vue'

vi.mock('@/composables/useOrder')

import { useOrder } from '@/composables/useOrder'

function createUseOrderMock(overrides = {}) {
  return {
    onSubmitUpdateStatus: vi.fn(),
    openModal: vi.fn(),
    closeModal: vi.fn(),
    isLoading: ref(false),
    showMessageSuccess: ref(false),
    showMessageError: ref(false),
    isModalOpen: ref(false),
    statusError: ref(''),
    status: ref(''),
    ...overrides,
  }
}

const components = {
  BaseLoader,
  BaseSelect,
  BaseInput,
  BaseButton,
  BaseModal,
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/order/:orderId', component: OrderDetailView, name: 'order-detail' },
    { path: '/', component: OrderListView, name: 'order-list' },
    { path: '/order/create', component: OrderCreateView, name: 'create-order' },
  ],
})

const orderMock = {
  id: 1,
  supplierName: 'Comercializadora Andina',
  ammount: 1200000,
  concept: 'Compra de insumos',
  createdAt: '2026-05-25T00:00:00.000Z',
  status: 'BORRADOR',
}

const orderMockStatusApproved = {
  id: 1,
  supplierName: 'Comercializadora Andina',
  ammount: 1200000,
  concept: 'Compra de insumos',
  createdAt: '2026-05-25T00:00:00.000Z',
  status: 'APROBADA',
}

describe('OrderDetailView Component', () => {
  beforeEach(() => {
    vi.mocked(useOrder).mockReturnValue(createUseOrderMock())
  })

  it('should render correctly order detail card', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const orderStore = useOrderStore()
    orderStore.orderData = orderMock
    const wrapper = mount(OrderDetailView, {
      global: { plugins: [router, pinia], components },
      props: { orderId: orderMock.id.toString() },
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('[data-testid="order-detail-card"]').exists()).toBe(true)
  })

  it('should render correctly order detail loading when order is loading', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const orderStore = useOrderStore()
    orderStore.isLoading = true
    const wrapper = mount(OrderDetailView, {
      global: { plugins: [router, pinia], components },
      props: { orderId: orderMock.id.toString() },
    })
    expect(wrapper.find('[data-testid="order-detail-loading"]').exists()).toBe(true)
  })

  it('should render correctly order detail error when order is not found', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const orderStore = useOrderStore()
    orderStore.error = 'Error al cargar la orden'
    const wrapper = mount(OrderDetailView, {
      global: { plugins: [router, pinia], components },
      props: { orderId: orderMock.id.toString() },
    })
    expect(wrapper.find('[data-testid="order-detail-error"]').exists()).toBe(true)
  })

  it('should render correctly order detail error message when submit update status fails', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    vi.mocked(useOrder).mockReturnValue(createUseOrderMock({ showMessageError: ref(true) }))

    const wrapper = mount(OrderDetailView, {
      global: { plugins: [router, pinia], components },
      props: { orderId: orderMock.id.toString() },
    })

    expect(wrapper.find('[data-testid="order-detail-error-message"]').exists()).toBe(true)
  })

  it('should validate status select when change status', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    vi.mocked(useOrder).mockReturnValue(
      createUseOrderMock({ statusError: ref('El estatus es requerido') }),
    )

    const wrapper = mount(OrderDetailView, {
      global: { plugins: [router, pinia], components },
      props: { orderId: orderMock.id.toString() },
    })

    expect(wrapper.find('[data-testid="select-error"]').exists()).toBe(true)
    expect(wrapper.find('[data-testid="select-error"]').text()).toBe('El estatus es requerido')
  })

  it('should render correctly a form to update status', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    vi.mocked(useOrder).mockReturnValue(createUseOrderMock())

    const wrapper = mount(OrderDetailView, {
      global: { plugins: [router, pinia], components },
      props: { orderId: orderMock.id.toString() },
    })

    expect(wrapper.find('[data-testid="update-status-form"]').exists()).toBe(true)
  })

  it('should render correctly options to update status when order status is BORRADOR', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const orderStore = useOrderStore()
    orderStore.orderData = orderMock
    const wrapper = mount(OrderDetailView, {
      global: { plugins: [router, pinia], components },
      props: { orderId: orderMock.id.toString() },
    })
    const orderStatusSelect = wrapper.find('[data-testid="order-status-select"]')

    expect(orderStatusSelect.exists()).toBe(true)
    expect(orderStatusSelect.element.options.length).toBe(2)
    expect(orderStatusSelect.element.options[0].text).toBe('Aprobada')
    expect(orderStatusSelect.element.options[1].text).toBe('Rechazada')
  })

  it('should render correctly options to update status when order status is APROBADA', () => {
    const pinia = createPinia()
    setActivePinia(pinia)
    const orderStore = useOrderStore()
    orderStore.orderData = orderMockStatusApproved

    const wrapper = mount(OrderDetailView, {
      global: { plugins: [router, pinia], components },
      props: { orderId: orderMockStatusApproved.id.toString() },
    })

    const orderStatusSelect = wrapper.find('[data-testid="order-status-select"]')

    expect(orderStatusSelect.exists()).toBe(true)
    expect(orderStatusSelect.element.options.length).toBe(1)
    expect(orderStatusSelect.element.options[0].text).toBe('Pagada')
  })
})
