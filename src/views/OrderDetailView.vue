<script setup>
import { computed, onMounted } from 'vue'
import { useOrderStore } from '@/stores/order'
import { formatAmount, formatDate, getStatusPillClass } from '@/utils/helpers'
import { ORDER_STATUS_OPTIONS, STATUS } from '@/utils/constants'
import { useOrder } from '@/composables/useOrder'

const orderStore = useOrderStore()
const {
  status,
  statusError,
  isLoading: isLoadingUpdateStatus,
  showMessageSuccess,
  showMessageError,
  isModalOpen,
  onSubmitUpdateStatus,
  openModal,
  closeModal,
} = useOrder()
const props = defineProps({
  orderId: {
    type: String,
    required: true,
  },
})

const order = computed(() => orderStore.orderData)
const loadingPage = computed(() => orderStore.isLoading)

const showButtonChangeStatus = computed(() => {
  if (!order.value) {
    return false
  }
  return ![STATUS.RECHAZADA, STATUS.PAGADA].includes(order.value.status)
})

const optionsCondition = computed(() => {
  if (!order.value) {
    return []
  }
  if (order.value.status === STATUS.BORRADOR) {
    const optiionsToShowWhenStatusIsDraft = (opt) =>
      [STATUS.APROBADA, STATUS.RECHAZADA].includes(opt.value)
    return ORDER_STATUS_OPTIONS.filter(optiionsToShowWhenStatusIsDraft)
  }
  if (order.value.status === STATUS.APROBADA) {
    const optiionsToShowWhenStatusIsApproved = (opt) => [STATUS.PAGADA].includes(opt.value)
    return ORDER_STATUS_OPTIONS.filter(optiionsToShowWhenStatusIsApproved)
  }

  return ORDER_STATUS_OPTIONS
})

onMounted(async () => {
  try {
    await orderStore.fetchOrderById(props.orderId)
  } catch (e) {
    orderStore.error = e
  }
})
</script>

<template>
  <div class="w-full">
    <div class="mx-auto flex w-full max-w-lg flex-col items-center gap-3 p-2">
      <div
        v-if="loadingPage"
        data-testid="order-detail-loading"
        class="flex flex-col items-center gap-2 justify-center text-gray-600"
      >
        <BaseLoader size="large" />
        Cargando la orden...
      </div>

      <Transition name="state-fade" mode="out-in">
        <BaseAlert v-if="orderStore.error" data-testid="order-detail-error" variant="error">
          Error algo salio mal al cargar la orden.
        </BaseAlert>
      </Transition>
      <Transition name="state-fade" mode="out-in">
        <BaseAlert v-if="showMessageError" variant="error" data-testid="order-detail-error-message">
          Hubo un error al cambiar el estatus de la orden.
        </BaseAlert>
      </Transition>
      <Transition name="state-fade" mode="out-in">
        <BaseAlert
          v-if="showMessageSuccess"
          variant="success"
          data-testid="order-detail-success-message"
        >
          El cambio de estatus de la orden se ha realizado correctamente.
        </BaseAlert>
      </Transition>
    </div>

    <div v-if="order" class="w-full flex justify-center py-6">
      <article
        data-testid="order-detail-card"
        class="mx-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200"
      >
        <div class="border-b border-gray-100 bg-gray-50 px-6 py-5">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <p class="text-xs font-medium uppercase tracking-wide text-gray-500">Proveedor</p>
              <h2 class="mt-1 truncate text-xl font-semibold text-gray-900">
                {{ order.supplierName }}
              </h2>
            </div>
            <span
              class="inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset"
              :class="getStatusPillClass(order.status)"
            >
              {{ order.status }}
            </span>
          </div>
        </div>

        <div class="divide-y divide-gray-100 px-6 py-2">
          <div class="flex items-center justify-between gap-4 py-4">
            <p class="text-sm font-medium text-gray-500">Monto</p>
            <p class="text-base font-semibold tabular-nums text-gray-900">
              {{ formatAmount(order.ammount) }}
            </p>
          </div>
          <div
            class="flex flex-col gap-1 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
          >
            <p class="shrink-0 text-sm font-medium text-gray-500">Concepto</p>
            <p class="text-sm text-gray-900 sm:max-w-[60%] sm:text-right">
              {{ order.concept }}
            </p>
          </div>
          <div class="flex items-center justify-between gap-4 py-4">
            <p class="text-sm font-medium text-gray-500">Fecha de creación</p>
            <p class="text-sm text-gray-900">{{ formatDate(order.createdAt) }}</p>
          </div>
        </div>

        <footer class="border-t border-gray-100 bg-gray-50 px-6 py-4">
          <BaseButton
            v-if="showButtonChangeStatus"
            variant="primary"
            width="full"
            @click="openModal"
          >
            Cambiar estado
          </BaseButton>
        </footer>
      </article>
    </div>

    <BaseModal
      v-model:is-open="isModalOpen"
      title="Cambiar estatus"
      description="Selecciona el nuevo estatus para esta orden de pago."
    >
      <template #content>
        <form
          id="update-status-form"
          data-testid="update-status-form"
          @submit="onSubmitUpdateStatus"
        >
          <BaseSelect
            v-model="status"
            id="order-status-select"
            label=""
            data-testid="order-status-select"
            :options="optionsCondition"
            :error="statusError"
          />
        </form>
      </template>
      <template #footer>
        <BaseButton variant="secondary" @click="closeModal"> Cancelar </BaseButton>
        <BaseButton
          variant="primary"
          type="submit"
          form="update-status-form"
          :disabled="isLoadingUpdateStatus"
        >
          <BaseLoader v-if="isLoadingUpdateStatus" size="small" />
          <span v-else>Guardar cambios</span>
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>

<style scoped>
.state-fade-enter-active,
.state-fade-leave-active {
  transition: opacity 0.3s ease;
}
.state-fade-enter-from,
.state-fade-leave-to {
  opacity: 0;
}
</style>
