import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])

  return { orders }
})
