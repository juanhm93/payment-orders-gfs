<script setup>
import { computed, useAttrs } from 'vue'

defineOptions({
  inheritAttrs: false,
})

defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
  errors: {
    type: Array,
    default: () => [],
  },
  classContainer: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()

const labelFor = computed(() => attrs.id ?? attrs.name ?? undefined)

const selectClass = computed(() => {
  return {
    'w-full p-2.5 border border-gray-300 rounded-md bg-white text-gray-900': true,
  }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <label :for="labelFor">
      {{ label }}
    </label>
    <select
      v-bind="$attrs"
      :class="selectClass"
      :value="modelValue"
      @change="emit('update:modelValue', $event.target.value)"
    >
      <slot name="options">
        <option v-for="opt in options" :key="String(opt.value)" :value="opt.value">
          {{ opt.text }}
        </option>
      </slot>
    </select>
    <p v-for="error in errors" :key="`${label}-${error}`" class="mt-2 text-xs text-red-600">
      {{ error }}
    </p>
  </div>
</template>
