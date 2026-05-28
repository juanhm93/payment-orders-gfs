import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { getOrders, getOrderById } from '@/services/orderService'
import { debounce } from '@/utils/debounce'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const orderData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const ordersEmpty = computed(() => orders.value.length === 0)
  const totalCount = ref(0)
  const itemsPerPage = ref(10)
  const currentPage = ref(1)
  const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage.value))
  const status = ref('all')
  const search = ref('')
  const orderId = ref(undefined)

  async function checkParams() {
    const params = new URLSearchParams(window.location.search)
    const page = params.get('_page')
    const perPage = params.get('_per_page')
    const statusParam = params.get('status')
    const searchParam = params.get('supplierName_like')
    const idParam = params.get('id')
    if (page) {
      currentPage.value = parseInt(page)
    }
    if (perPage) {
      itemsPerPage.value = parseInt(perPage)
    }
    if (statusParam) {
      status.value = statusParam
    }
    if (searchParam) {
      search.value = searchParam
    }

    if (idParam) {
      orderId.value = idParam
    }
  }

  async function fetchOrders() {
    isLoading.value = true
    try {
      const { data, totalOrders } = await getOrders(
        currentPage.value,
        itemsPerPage.value,
        status.value,
        search.value,
        orderId.value,
      )

      orders.value = data
      totalCount.value = totalOrders
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  async function previousPage() {
    if (currentPage.value > 1) {
      currentPage.value--
      await fetchOrders()
    }
  }

  async function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      await fetchOrders()
    }
  }

  function clearFilters() {
    status.value = 'all'
    search.value = ''
    orderId.value = undefined
    fetchOrders()
  }

  async function fetchOrderById(id) {
    const idInt = parseInt(id)
    isLoading.value = true
    try {
      const findOrder = orders.value.find((o) => o.id === idInt)
      if (findOrder) {
        orderData.value = findOrder
        return
      }
      const res = await getOrderById(id)
      orderData.value = res
    } catch (e) {
      console.error(e)
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  const debouncedFetchOrders = debounce(() => {
    fetchOrders()
  }, 500)

  watch(status, () => {
    fetchOrders()
  })

  watch(search, () => {
    debouncedFetchOrders()
  })

  return {
    orders,
    isLoading,
    error,
    totalPages,
    ordersEmpty,
    currentPage,
    totalCount,
    itemsPerPage,
    status,
    search,
    orderData,
    checkParams,
    fetchOrders,
    clearFilters,
    fetchOrderById,
    previousPage,
    nextPage,
  }
})
