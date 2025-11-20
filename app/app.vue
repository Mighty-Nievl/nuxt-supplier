<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span class="font-bold text-xl text-gray-900 dark:text-gray-100">Supplier Manager</span>
            </NuxtLink>
          </div>
          
          <div class="flex items-center gap-8">
            <!-- Navigation Links -->
            <div class="hidden md:flex gap-4">
              <NuxtLink
                to="/"
                class="nav-link"
                active-class="nav-link-active"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </NuxtLink>
              <NuxtLink
                to="/suppliers"
                class="nav-link"
                active-class="nav-link-active"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Supplier
              </NuxtLink>
              <NuxtLink
                to="/incoming-goods"
                class="nav-link"
                active-class="nav-link-active"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Barang Masuk
              </NuxtLink>
              <NuxtLink
                to="/payments"
                class="nav-link"
                active-class="nav-link-active"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Pembayaran
              </NuxtLink>
            </div>

            <div class="flex items-center gap-4">
              <!-- Notification Dropdown -->
              <div v-if="upcomingCount > 0" class="relative">
                <button 
                  @click="showNotifications = !showNotifications"
                  class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span class="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">
                    {{ upcomingCount }}
                  </span>
                </button>

                <!-- Dropdown -->
                <div 
                  v-if="showNotifications"
                  class="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
                >
                  <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="font-semibold text-gray-900 dark:text-gray-100">Notifikasi</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{{ upcomingCount }} item memerlukan perhatian</p>
                  </div>

                  <div class="max-h-96 overflow-y-auto">
                    <!-- Overdue Invoices -->
                    <div v-if="store.overdueInvoices.length > 0">
                      <div class="px-4 py-2 bg-red-50 border-b border-red-100">
                        <p class="text-xs font-semibold text-red-800">JATUH TEMPO TERLEWAT</p>
                      </div>
                      <NuxtLink
                        v-for="invoice in store.overdueInvoices"
                        :key="invoice.id"
                        :to="`/incoming-goods/${invoice.id}`"
                        @click="showNotifications = false"
                        class="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                      >
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div class="flex-1 min-w-0">
                            <p class="font-medium text-gray-900 truncate">{{ invoice.supplierName }}</p>
                            <p class="text-sm text-red-600">Jatuh tempo: {{ formatDate(invoice.dueDate) }}</p>
                            <p class="text-sm text-gray-600">{{ formatCurrency(invoice.totalAmount) }}</p>
                          </div>
                        </div>
                      </NuxtLink>
                    </div>

                    <!-- Upcoming Due Dates -->
                    <div v-if="store.upcomingDueDates.length > 0">
                      <div class="px-4 py-2 bg-yellow-50 border-b border-yellow-100">
                        <p class="text-xs font-semibold text-yellow-800">SEGERA JATUH TEMPO</p>
                      </div>
                      <NuxtLink
                        v-for="invoice in store.upcomingDueDates"
                        :key="invoice.id"
                        :to="`/incoming-goods/${invoice.id}`"
                        @click="showNotifications = false"
                        class="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                      >
                        <div class="flex items-start gap-3">
                          <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div class="flex-1 min-w-0">
                            <p class="font-medium text-gray-900 truncate">{{ invoice.supplierName }}</p>
                            <p class="text-sm text-yellow-600">Jatuh tempo: {{ formatDate(invoice.dueDate) }}</p>
                            <p class="text-sm text-gray-600">{{ formatCurrency(invoice.totalAmount) }}</p>
                          </div>
                        </div>
                      </NuxtLink>
                    </div>
                  </div>

                  <div class="p-3 border-t border-gray-200 bg-gray-50">
                    <NuxtLink 
                      to="/payments" 
                      @click="showNotifications = false"
                      class="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      Lihat semua pembayaran →
                    </NuxtLink>
                  </div>
                </div>
              </div>
              
              <NuxtLink to="/settings" class="btn btn-secondary">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Pengaturan
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NuxtPage />
    </main>

    <!-- Notifications Container -->
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <DueDateAlert
        v-for="notif in notifications"
        :key="notif.id"
        :notification="notif"
        @close="removeNotification"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useSupplierStore()
const { notifications, remove: removeNotification } = useNotifications()
const { initDarkMode } = useDarkMode()

// Load data on mount
onMounted(() => {
  store.loadFromLocalStorage()
  initDarkMode()
})

const showNotifications = ref(false)

// Computed
const upcomingCount = computed(() => {
  return store.upcomingDueDates.length + store.overdueInvoices.length
})

// Helpers
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

// Auto-sync logic
let syncTimeout: ReturnType<typeof setTimeout>
watch(
  [() => store.suppliers, () => store.incomingGoods],
  () => {
    if (!store.settings.autoSync || !store.settings.googleSheetsUrl) return

    clearTimeout(syncTimeout)
    syncTimeout = setTimeout(async () => {
      try {
        await store.syncToGoogleSheets()
        // Optional: Show subtle toast or just log
        console.log('Auto-sync completed')
      } catch (error) {
        console.error('Auto-sync failed:', error)
      }
    }, 2000) // Debounce 2 seconds
  },
  { deep: true }
)
</script>

<style scoped>
.nav-link {
  @apply flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium;
}

.nav-link-active {
  @apply bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-800;
}
</style>
