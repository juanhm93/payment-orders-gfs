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
} = useOrder()

const isDisabled = computed(
  () =>
    !!supplierNameError.value || !!ammountError.value || !!conceptError.value || isLoading.value,
)
</script>

<template>
  <div class="p-4 rounded-md w-full flex justify-center">
    <div class="bg-gray-800 px-8 py-6 rounded-md min-w-lg">
      <form @submit.prevent="onSubmit">
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
          container-class="pb-8"
        />
        <button
          id="create-order-button"
          data-testid="create-order-button"
          type="submit"
          class="flex min-h-10 items-center justify-center hover:bg-green-900 transition-colors duration-300 bg-green-800 text-white p-2 rounded-md w-full"
          :class="{ 'opacity-50 cursor-not-allowed': isDisabled }"
          :disabled="isDisabled"
        >
          <BaseLoader
            v-if="isLoading"
            size="small"
            class="text-white"
            data-testid="loader-button"
          />
          <span v-else data-testid="create-order-button-text">Crear Orden</span>
        </button>
      </form>
    </div>
  </div>
</template>
