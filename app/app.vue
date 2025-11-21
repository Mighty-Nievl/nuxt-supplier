<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Navigation -->
    <nav
      class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <div class="flex items-center">
            <NuxtLink to="/" class="flex items-center gap-3 group">
              <div
                class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div class="flex flex-col">
                <span
                  class="font-bold text-xl text-gray-900 dark:text-white tracking-tight leading-none">Supplier</span>
                <span
                  class="text-xs font-medium text-emerald-600 dark:text-emerald-400 tracking-widest uppercase">Manager</span>
              </div>
            </NuxtLink>
          </div>

          <div class="flex items-center gap-8">
            <!-- Navigation Links -->
            <div class="hidden md:flex items-center gap-2 bg-gray-100/50 dark:bg-gray-700/30 p-1.5 rounded-2xl">
              <NuxtLink to="/" class="nav-link" active-class="nav-link-active">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </NuxtLink>
              <NuxtLink to="/suppliers" class="nav-link" active-class="nav-link-active">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Supplier
              </NuxtLink>
              <NuxtLink to="/incoming-goods" class="nav-link" active-class="nav-link-active">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                Barang Masuk
              </NuxtLink>
              <NuxtLink to="/payments" class="nav-link" active-class="nav-link-active">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Pembayaran
              </NuxtLink>
            </div>

            <div class="flex items-center gap-3">
              <!-- Notification Dropdown -->
              <div class="relative">
                <button @click="showNotifications = !showNotifications"
                  class="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all relative border border-transparent hover:border-gray-200 dark:hover:border-gray-600 group">
                  <svg class="w-6 h-6 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span v-if="upcomingCount > 0"
                    class="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-800">
                    <span
                      class="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                  </span>
                </button>

                <!-- Dropdown -->
                <div v-if="showNotifications"
                  class="absolute right-0 mt-4 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden ring-1 ring-black ring-opacity-5">
                  <div
                    class="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
                    <div class="flex items-center justify-between">
                      <h3 class="font-bold text-gray-900 dark:text-white">Notifikasi</h3>
                      <span
                        class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                        {{ upcomingCount }} Baru
                      </span>
                    </div>
                  </div>

                  <div class="max-h-[28rem] overflow-y-auto custom-scrollbar">
                    <!-- Empty State -->
                    <div v-if="upcomingCount === 0" class="p-8 text-center">
                      <div
                        class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                      <p class="text-gray-500 dark:text-gray-400 text-sm">Tidak ada notifikasi baru</p>
                    </div>

                    <!-- Overdue Invoices -->
                    <div v-if="store.overdueInvoices.length > 0">
                      <div
                        class="px-4 py-2 bg-red-50/50 dark:bg-red-900/10 border-b border-red-100 dark:border-red-900/20 sticky top-0 backdrop-blur-sm">
                        <p class="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">Jatuh Tempo
                          Terlewat</p>
                      </div>
                      <NuxtLink v-for="invoice in store.overdueInvoices" :key="invoice.id"
                        :to="`/incoming-goods/${invoice.id}`" @click="showNotifications = false"
                        class="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700/50 transition-colors group">
                        <div class="flex items-start gap-3">
                          <div
                            class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0 ring-4 ring-red-100 dark:ring-red-900/30">
                          </div>
                          <div class="flex-1 min-w-0">
                            <p
                              class="font-semibold text-gray-900 dark:text-white truncate group-hover:text-emerald-600 transition-colors">
                              {{ invoice.supplierName }}</p>
                            <p class="text-sm text-red-600 dark:text-red-400 font-medium mt-0.5">Jatuh tempo: {{
                              formatDate(invoice.dueDate) }}</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{
                              formatCurrency(invoice.totalAmount) }}</p>
                          </div>
                        </div>
                      </NuxtLink>
                    </div>

                    <!-- Upcoming Due Dates -->
                    <div v-if="store.upcomingDueDates.length > 0">
                      <div
                        class="px-4 py-2 bg-yellow-50/50 dark:bg-yellow-900/10 border-b border-yellow-100 dark:border-yellow-900/20 sticky top-0 backdrop-blur-sm">
                        <p class="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-wider">
                          Segera Jatuh Tempo</p>
                      </div>
                      <NuxtLink v-for="invoice in store.upcomingDueDates" :key="invoice.id"
                        :to="`/incoming-goods/${invoice.id}`" @click="showNotifications = false"
                        class="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700/50 transition-colors group">
                        <div class="flex items-start gap-3">
                          <div
                            class="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0 ring-4 ring-yellow-100 dark:ring-yellow-900/30">
                          </div>
                          <div class="flex-1 min-w-0">
                            <p
                              class="font-semibold text-gray-900 dark:text-white truncate group-hover:text-emerald-600 transition-colors">
                              {{ invoice.supplierName }}</p>
                            <p class="text-sm text-yellow-600 dark:text-yellow-400 font-medium mt-0.5">Jatuh tempo: {{
                              formatDate(invoice.dueDate) }}</p>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{{
                              formatCurrency(invoice.totalAmount) }}</p>
                          </div>
                        </div>
                      </NuxtLink>
                    </div>
                  </div>

                  <div class="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <NuxtLink to="/payments" @click="showNotifications = false"
                      class="flex items-center justify-center gap-2 w-full py-2 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-colors">
                      Lihat semua pembayaran
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </NuxtLink>
                  </div>
                </div>
              </div>

              <div class="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

              <!-- Dark Mode Toggle -->
              <button @click="toggleDarkMode"
                class="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-600 group"
                :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
                <!-- Sun Icon -->
                <svg v-if="isDark" class="w-6 h-6 group-hover:text-yellow-400 transition-colors" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <!-- Moon Icon -->
                <svg v-else class="w-6 h-6 group-hover:text-purple-600 transition-colors" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>

              <!-- Settings Icon -->
              <NuxtLink to="/settings"
                class="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-600 group"
                title="Pengaturan">
                <svg class="w-6 h-6 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
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
      <DueDateAlert v-for="notif in notifications" :key="notif.id" :notification="notif" @close="removeNotification" />
    </div>

    <!-- Toast Notifications -->
    <Teleport to="body">
      <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-md">
        <TransitionGroup name="toast">
          <div v-for="notification in notificationState.notifications.value" :key="notification.id"
            class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border overflow-hidden backdrop-blur-sm transform transition-all duration-300"
            :class="{
              'border-emerald-200 dark:border-emerald-800': notification.type === 'success',
              'border-blue-200 dark:border-blue-800': notification.type === 'info',
              'border-yellow-200 dark:border-yellow-800': notification.type === 'warning',
              'border-red-200 dark:border-red-800': notification.type === 'danger'
            }">
            <div class="flex items-start gap-3 p-4">
              <!-- Icon -->
              <div class="flex-shrink-0">
                <!-- Success Icon -->
                <div v-if="notification.type === 'success'"
                  class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <svg class="w-6 h-6 text-emerald-600 dark:text-emerald-500" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <!-- Info Icon -->
                <div v-else-if="notification.type === 'info'"
                  class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600 dark:text-blue-500" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <!-- Warning Icon -->
                <div v-else-if="notification.type === 'warning'"
                  class="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                  <svg class="w-6 h-6 text-yellow-600 dark:text-yellow-500" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <!-- Danger Icon -->
                <div v-else-if="notification.type === 'danger'"
                  class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <svg class="w-6 h-6 text-red-600 dark:text-red-500" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">
                  {{ notification.title }}
                </h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ notification.message }}
                </p>
              </div>

              <!-- Close Button -->
              <button @click="notificationState.remove(notification.id)"
                class="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const store = useSupplierStore()
const { notifications, remove: removeNotification } = useNotifications()
const notificationState = useNotifications()
const { initDarkMode, isDark, toggleDarkMode } = useDarkMode()

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
  @apply flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-gray-100 transition-all font-medium hover:shadow-sm;
}

.nav-link-active {
  @apply bg-white dark:bg-gray-600 text-emerald-600 dark:text-emerald-400 shadow-sm;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 20px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.8);
}

/* Toast Animations */
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.2s ease-in;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
