<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="border-gray-200">
    <div class="flex justify-center items-center w-full border-b">
      <nav class="flex gap-4 w-full justify-center items-center py-4">
        <RouterLink :to="{ name: 'order-list' }" class="text-2xl" active-class="text-pink-500">
          Lista de ordernes de pago
        </RouterLink>
        <RouterLink :to="{ name: 'create-order' }" class="text-2xl" active-class="text-pink-500">
          Crear orden de pago
        </RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped></style>
