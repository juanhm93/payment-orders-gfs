<script setup>
import { onMounted, ref, computed } from 'vue'
import { useOrderStore } from '@/stores/order'
import OrderMobileCard from '@/components/cards/OrderMobileCard.vue'
import OrderTable from '@/components/table/OrderTable.vue'
import PageNavigator from '@/components/global/PageNavigator.vue'
import { TABLE_HEADERS, FILTER_OPTIONS_BY_STATUS } from '@/utils/constants'

const headers = ref(TABLE_HEADERS)
const orderStore = useOrderStore()
const optionsByStatus = ref(FILTER_OPTIONS_BY_STATUS)

const showCardEmptyOrders = computed(() => {
  return orderStore.ordersEmpty && !orderStore.isLoading && !orderStore.error
})

const showCardOrdersHaveData = computed(() => {
  return !orderStore.ordersEmpty && !orderStore.isLoading && !orderStore.error
})

onMounted(async () => {
  try {
    await orderStore.checkParams()
    await orderStore.fetchOrders()
  } catch (e) {
    orderStore.error = e
  }
})
</script>

<template>
  <section class="order-list-view w-full flex justify-center py-6">
    <div class="w-full max-w-7xl">
      <div v-show="!orderStore.error" class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <BaseSelect
          id="status-select"
          label="Proveedor"
          v-model="orderStore.status"
          container-class="pb-2.5"
          data-testid="status-select"
          :options="optionsByStatus"
        />
        <BaseInput
          id="search-input"
          label="Buscar"
          v-model="orderStore.search"
          placeholder="Buscar... (Por proveedor)"
          type="text"
          data-testid="search-input"
          container-class="pb-2"
        />
        <div class="flex justify-end items-end h-full pb-2.5">
          <button
            type="button"
            class="cursor-pointer border-b border-gray-400 pb-0.5 text-sm text-gray-600 hover:border-gray-600 hover:text-gray-900"
            @click="orderStore.clearFilters"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      <Transition name="state-fade" mode="out-in">
        <BaseAlert v-if="orderStore.error" id="error-orders" key="error" variant="error">
          Error algo salio mal al cargar las órdenes de pago
        </BaseAlert>

        <div v-else-if="orderStore.isLoading" id="loading-orders" key="loading">
          <div class="flex flex-col justify-center items-center gap-4">
            <BaseLoader size="large" />
            <p class="text-gray-600">Cargando órdenes de pago...</p>
          </div>
        </div>

        <p
          v-else-if="showCardEmptyOrders"
          id="empty-orders"
          key="empty"
          class="rounded-2xl bg-white px-6 py-8 text-center text-sm text-gray-500 shadow-lg ring-1 ring-gray-200"
        >
          No hay órdenes de pago para mostrar.
        </p>

        <div v-else-if="showCardOrdersHaveData" key="orders" class="orders-content">
          <!-- Mobile: stacked cards -->
          <div id="table-orders__mobile" class="flex flex-col gap-4 md:hidden mt-4">
            <OrderMobileCard v-for="order in orderStore.orders" :key="order.id" :order="order" />
            <PageNavigator
              :page="orderStore.currentPage"
              :totalPages="orderStore.totalPages"
              :onPrevious="orderStore.previousPage"
              :onNext="orderStore.nextPage"
            />
          </div>

          <!-- Desktop: table -->
          <div
            id="table-orders__desktop"
            class="hidden overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 md:block"
          >
            <OrderTable :orders="orderStore.orders" :headers="headers" />
            <PageNavigator
              :page="orderStore.currentPage"
              :totalPages="orderStore.totalPages"
              :onPrevious="orderStore.previousPage"
              :onNext="orderStore.nextPage"
            />
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.order-list-view {
  animation: pageFadeIn 0.4s ease-out;
}

@keyframes pageFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.state-fade-enter-active,
.state-fade-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.state-fade-enter-from,
.state-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
