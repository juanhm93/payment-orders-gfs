<script setup>
import { computed } from 'vue'
const props = defineProps({
  variant: {
    type: String,
    required: true,
    default: 'error',
    validator: (value) => ['error', 'success'].includes(value),
  },
})

const alertClass = computed(() => {
  return {
    'bg-red-500 text-sm text-white p-4 rounded-md': props.variant === 'error',
    'bg-green-500 text-sm text-white p-4 rounded-md': props.variant === 'success',
  }
})
</script>

<template>
  <div :class="alertClass">
    <slot />
  </div>
</template>
