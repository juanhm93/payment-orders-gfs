<script setup>
defineProps({
  size: {
    type: String,
    default: 'large',
    validator: (value) => ['small', 'medium', 'large'].includes(value),
  },
})
</script>

<template>
  <div
    role="status"
    aria-label="Cargando"
    class="inline-block shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent text-gray-500"
    :class="{
      'size-4': size === 'small',
      'size-8': size === 'medium',
      'size-12': size === 'large',
    }"
  />
</template>
