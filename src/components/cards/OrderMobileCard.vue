<script setup>
import { formatAmount, formatDate, getStatusPillClass } from '@/utils/helpers'

defineProps({
  order: {
    type: Object,
    required: true,
  },
})
</script>
<template>
  <article class="overflow-hidden rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200">
    <div class="flex items-start justify-between gap-3">
      <h2 class="text-base font-semibold text-gray-900">
        {{ order.supplierName }}
      </h2>
      <span
        class="inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset"
        :class="getStatusPillClass(order.status)"
      >
        {{ order.status }}
      </span>
    </div>

    <dl class="mt-4 space-y-3 text-sm">
      <div class="flex justify-between gap-4">
        <dt class="text-gray-500">Monto</dt>
        <dd class="font-medium text-gray-900 tabular-nums">
          {{ formatAmount(order.ammount) }}
        </dd>
      </div>
      <div class="flex justify-between gap-4">
        <dt class="shrink-0 text-gray-500">Concepto</dt>
        <dd class="text-right text-gray-900">{{ order.concept }}</dd>
      </div>
      <div class="flex justify-between gap-4">
        <dt class="text-gray-500">Fecha</dt>
        <dd class="text-gray-900">{{ formatDate(order.createdAt) }}</dd>
      </div>
    </dl>
  </article>
</template>
