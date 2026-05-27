<script setup>
defineProps({
  page: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPages: {
    type: Number,
    required: true,
    default: 10,
  },
  onPrevious: {
    type: Function,
    required: true,
  },
  onNext: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div class="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-4 py-3">
    <span class="text-sm text-gray-600">{{ page }} de {{ totalPages }}</span>
    <div class="flex items-center gap-2">
      <BaseButton
        variant="secondary"
        :disabled="page === 1"
        class="disabled:cursor-not-allowed disabled:opacity-50"
        @click="onPrevious"
      >
        Anterior
      </BaseButton>
      <BaseButton
        variant="primary"
        :disabled="page === totalPages"
        class="disabled:cursor-not-allowed disabled:opacity-50"
        @click="onNext"
      >
        Siguiente
      </BaseButton>
    </div>
  </div>
</template>
