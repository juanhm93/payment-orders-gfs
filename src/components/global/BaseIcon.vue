<script setup>
import * as svgIcons from '@/utils/iconSvg'
defineProps({
  icon: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div v-html="svgIcons[icon]"></div>
</template>
