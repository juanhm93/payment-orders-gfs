import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getOrders } from '@/services/orderService'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const isLoading = ref(false)
  const error = ref(null)
  const ordersEmpty = computed(() => orders.value.length === 0)
  const totalCount = ref(0)
  const itemsPerPage = ref(10)
  const currentPage = ref(1)
  const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage.value))

  async function checkParams() {
    const params = new URLSearchParams(window.location.search)
    const page = params.get('_page')
    const perPage = params.get('_per_page')
    if (page) {
      currentPage.value = parseInt(page)
    }
    if (perPage) {
      itemsPerPage.value = parseInt(perPage)
    }
  }

  async function fetchOrders() {
    isLoading.value = true
    try {
      const { data, totalOrders } = await getOrders(currentPage.value, itemsPerPage.value)
      // console.log(data, totalCount)
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
    }
    await fetchOrders()
  }

  async function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
    await fetchOrders()
  }

  return {
    orders,
    isLoading,
    error,
    totalPages,
    ordersEmpty,
    currentPage,
    totalCount,
    itemsPerPage,
    checkParams,
    fetchOrders,
    previousPage,
    nextPage,
  }
})
