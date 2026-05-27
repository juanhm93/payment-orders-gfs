<script setup>
import { defineModel } from 'vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const isModalOpen = defineModel('isOpen', {
  type: Boolean,
  required: true,
})
</script>

<template>
  <div
    v-show="isModalOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="status-modal-title"
  >
    <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" aria-hidden="true"></div>

    <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-200">
      <header class="mb-5">
        <h3 id="status-modal-title" class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ description }}
        </p>
      </header>

      <div class="mb-6">
        <slot name="content"></slot>
      </div>

      <div class="flex justify-end gap-2 pt-4">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
