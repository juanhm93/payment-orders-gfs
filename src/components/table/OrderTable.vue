<script setup>
import { formatAmount, formatDate, getStatusPillClass } from '@/utils/helpers'

defineProps({
  headers: {
    type: Array,
    required: true,
  },
  orders: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-100">
      <tr>
        <th
          scope="col"
          class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
          v-for="header in headers"
          :key="header.key"
        >
          {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      <tr
        v-for="order in orders"
        :key="order.id"
        class="transition-colors hover:bg-gray-100 hover:cursor-pointer"
        data-testid="order-table-row"
      >
        <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
          {{ order.supplierName }}
        </td>
        <td class="whitespace-nowrap px-6 py-4 text-sm tabular-nums text-gray-700">
          {{ formatAmount(order.ammount) }}
        </td>
        <td class="max-w-xs truncate px-6 py-4 text-sm text-gray-700" :title="order.concept">
          {{ order.concept }}
        </td>
        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
          {{ formatDate(order.createdAt) }}
        </td>
        <td class="whitespace-nowrap px-6 py-4">
          <span
            class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset"
            :class="getStatusPillClass(order.status)"
          >
            {{ order.status }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
