<script setup>
import { computed } from 'vue'
import { useOrder } from '@/composables/useOrder'

const {
  onSubmit,
  supplierName,
  ammount,
  concept,
  supplierNameError,
  ammountError,
  conceptError,
  isLoading,
  showMessageError,
} = useOrder()

const isDisabled = computed(
  () =>
    !!supplierNameError.value || !!ammountError.value || !!conceptError.value || isLoading.value,
)
</script>

<template>
  <div>
    <div class="flex w-full justify-center py-4">
      <BaseAlert v-if="showMessageError" variant="error">
        Hubo un error al crear la orden.
      </BaseAlert>
    </div>

    <div class="flex w-full justify-center py-4">
      <article
        class="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200"
      >
        <div class="border-b border-gray-100 bg-gray-50 px-6 py-5">
          <h2 class="text-lg font-semibold text-gray-900">Nueva orden de pago</h2>
          <p class="mt-1 text-sm text-gray-500">Completa los datos del proveedor y el monto.</p>
        </div>

        <form class="px-6 py-6" @submit.prevent="onSubmit">
          <BaseInput
            v-model="supplierName"
            id="supplier-name-input"
            label="Proveedor"
            placeholder="Ingrese el nombre del proveedor"
            type="text"
            :error="supplierNameError"
            container-class="pb-4"
          />
          <BaseInput
            v-model.number="ammount"
            id="ammount-input"
            label="Monto"
            placeholder="Ingrese el monto"
            type="number"
            :error="ammountError"
            container-class="pb-4"
          />
          <BaseInput
            v-model="concept"
            id="concept-input"
            label="Concepto"
            placeholder="Ingrese el concepto"
            type="text"
            :error="conceptError"
            container-class="pb-6"
          />
          <BaseButton
            id="create-order-button"
            data-testid="create-order-button"
            type="submit"
            variant="primary"
            width="full"
            :disabled="isDisabled"
            class="flex min-h-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            <BaseLoader v-if="isLoading" size="small" data-testid="loader-button" />
            <span v-else data-testid="create-order-button-text">Crear orden</span>
          </BaseButton>
        </form>
      </article>
    </div>
  </div>
</template>
