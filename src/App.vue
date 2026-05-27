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
  if (route.name === 'order-detail') {
    return 'Detalle de orden de pago'
  }
  return 'Dashboard'
})

const navLinkClass =
  'rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900'
const navLinkActiveClass = 'bg-gray-100 text-gray-900'
const mobileNavLinkClass =
  'block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900'
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="border-b border-gray-200 bg-white">
      <div class="mx-auto w-full px-4 sm:px-6 lg:px-8">
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
                  :class="navLinkClass"
                  :active-class="navLinkActiveClass"
                >
                  Lista de ordernes de pago
                </RouterLink>
                <RouterLink
                  :to="{ name: 'create-order' }"
                  :class="navLinkClass"
                  :active-class="navLinkActiveClass"
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
                class="relative rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">View notifications</span>
                <BaseIcon icon="notification" />
              </button>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <button
              type="button"
              class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
              @click="toggleMenu"
            >
              <span class="absolute -inset-0.5"></span>
              <span class="sr-only">Open main menu</span>
              <BaseIcon icon="menu" />
            </button>
          </div>
        </div>
      </div>

      <div id="mobile-menu" :hidden="!isMenuOpen" class="block border-t border-gray-100 md:hidden">
        <div class="space-y-1 px-2 pt-2 pb-3 sm:px-3">
          <RouterLink
            :to="{ name: 'order-list' }"
            :class="mobileNavLinkClass"
            :active-class="navLinkActiveClass"
          >
            Lista de ordernes de pago
          </RouterLink>
          <RouterLink
            :to="{ name: 'create-order' }"
            :class="mobileNavLinkClass"
            :active-class="navLinkActiveClass"
          >
            Crear orden de pago
          </RouterLink>
        </div>
      </div>
    </nav>

    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ title }}</h1>
      </div>
    </header>

    <main class="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
