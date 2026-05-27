<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value),
  },
  width: {
    type: String,
    required: false,
    default: 'default',
    validator: (value) => ['default', 'full'].includes(value),
  },
})

const buttonClass = computed(() => {
  return {
    'rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600':
      props.variant === 'primary',
    'rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 transition-colors hover:bg-gray-50':
      props.variant === 'secondary',
    'w-full': props.width === 'full',
  }
})
</script>

<template>
  <button :class="buttonClass" v-bind="$attrs">
    <slot> </slot>
  </button>
</template>
