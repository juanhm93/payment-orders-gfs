<script setup>
defineOptions({
  inheritAttrs: false,
})

defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  containerClass: {
    type: String,
    required: false,
    default: '',
  },
  error: {
    type: String,
    required: false,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>
<template>
  <div class="flex flex-col gap-2" :class="containerClass">
    <label v-if="label">{{ label }}</label>
    <input
      :value="modelValue"
      @input="updateValue"
      v-bind="$attrs"
      class="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
    />
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
  </div>
</template>

<style scoped></style>
