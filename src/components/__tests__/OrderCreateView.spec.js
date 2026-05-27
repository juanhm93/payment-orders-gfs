import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import OrderCreateView from '@/views/OrderCreateView.vue'
import OrderListView from '@/views/OrderListView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import BaseInput from '@/components/global/BaseInput.vue'
import BaseLoader from '@/components/global/BaseLoader.vue'

vi.mock('@/composables/useOrder')

import { useOrder } from '@/composables/useOrder'

const components = {
  BaseInput,
  BaseLoader,
}
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/order/create', component: OrderCreateView },
    { path: '/', component: OrderListView },
  ],
})

function createUseOrderMock(overrides = {}) {
  return {
    onSubmit: vi.fn(),
    supplierName: ref(''),
    ammount: ref(null),
    concept: ref(''),
    supplierNameError: ref(undefined),
    ammountError: ref(undefined),
    conceptError: ref(undefined),
    isLoading: ref(false),
    ...overrides,
  }
}

describe('OrderCreateView Component', () => {
  beforeEach(() => {
    vi.mocked(useOrder).mockReturnValue(createUseOrderMock())
  })

  it('should render form fields correctly', () => {
    const wrapper = mount(OrderCreateView, {
      global: {
        plugins: [router],
        components,
      },
    })

    expect(wrapper.find('#supplier-name-input').exists()).toBeTruthy()
    expect(wrapper.find('#ammount-input').exists()).toBeTruthy()
    expect(wrapper.find('#concept-input').exists()).toBeTruthy()
    expect(wrapper.find('#create-order-button').exists()).toBeTruthy()
  })

  it('should render loader correctly when loading', () => {
    vi.mocked(useOrder).mockReturnValue(
      createUseOrderMock({
        isLoading: ref(true),
      }),
    )

    const wrapper = mount(OrderCreateView, {
      global: {
        plugins: [router],
        components,
      },
    })
    expect(wrapper.find('[data-testid="loader-button"]').exists()).toBeTruthy()
    expect(wrapper.find('[data-testid="create-order-button-text"]').exists()).toBe(false)
  })

  it(`shouldn't submit form when is disabled when supplier name is required`, () => {
    vi.mocked(useOrder).mockReturnValue(
      createUseOrderMock({
        supplierNameError: ref('El nombre del proveedor es requerido'),
      }),
    )

    const wrapper = mount(OrderCreateView, {
      global: {
        plugins: [router],
        components,
      },
    })
    const createOrderButton = wrapper.find('[data-testid="create-order-button"]')
    expect(createOrderButton.element.disabled).toBe(true)
  })
})
