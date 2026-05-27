<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const title = computed(() => {
  if (route.name === 'order-list') {
    return 'Ordernes de pago'
  }
  if (route.name === 'create-order') {
    return 'Crear orden de pago'
  }
  return 'Dashboard'
})
</script>

<template>
  <div class="min-h-full">
    <nav class="bg-gray-800/50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="shrink-0">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
                class="size-8"
              />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <RouterLink
                  :to="{ name: 'order-list' }"
                  class="rounded-md px-3 py-2 text-sm font-medium text-white"
                  active-class="bg-gray-950/50"
                >
                  Lista de ordernes de pago
                </RouterLink>
                <RouterLink
                  :to="{ name: 'create-order' }"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                  active-class="bg-gray-950/50"
                >
                  Crear orden de pago
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                class="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">View notifications</span>
                <BaseIcon icon="notification" />
              </button>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button
              type="button"
              command="--toggle"
              commandfor="mobile-menu"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
              @click="toggleMenu"
            >
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>
              <BaseIcon icon="menu" />
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" :hidden="!isMenuOpen" class="block md:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <!-- Current: "bg-gray-950/50 text-white", Default: "text-gray-300 hover:bg-white/5 hover:text-white" -->
          <RouterLink
            :to="{ name: 'order-list' }"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            active-class="bg-gray-950/50"
          >
            Lista de ordernes de pago
          </RouterLink>
          <RouterLink
            :to="{ name: 'create-order' }"
            class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
            active-class="bg-gray-950/50"
          >
            Crear orden de pago
          </RouterLink>
        </div>
      </div>
    </nav>

    <header
      class="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10"
    >
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">{{ title }}</h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped></style>
