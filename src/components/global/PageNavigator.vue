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
  <div class="flex justify-end items-center bg-gray-200 px-3 py-1">
    <div class="flex items-center gap-2">
      <button
        class="px-4 py-2 bg-gray-800 rounded-md text-white text-sm"
        :class="{ 'opacity-50 cursor-not-allowed': page === 1 }"
        :disabled="page === 1"
        @click="onPrevious"
      >
        Anterior
      </button>
      <span class="text-gray-900"> {{ page }} de {{ totalPages }}</span>
      <button
        class="px-4 py-2 bg-gray-800 rounded-md text-white text-sm"
        :class="{ 'opacity-50 cursor-not-allowed': page === totalPages }"
        :disabled="page === totalPages"
        @click="onNext"
      >
        Siguiente
      </button>
    </div>
  </div>
</template>
