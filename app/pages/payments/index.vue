<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Tracking Pembayaran</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2 text-lg">Monitor dan kelola pembayaran ke supplier</p>
    </div>

    <!-- Stats - SUPER PREMIUM -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- Sudah Jatuh Tempo -->
      <div
        class="relative overflow-hidden bg-gradient-to-br from-red-50/90 via-red-50/70 to-white/90 dark:from-red-900/30 dark:via-red-800/20 dark:to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-red-200/60 dark:border-red-700/50 shadow-xl shadow-red-500/10 hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 group hover:-translate-y-1">
        <!-- Animated gradient blurs -->
        <div
          class="absolute -top-10 -right-10 w-32 h-32 bg-red-400/30 dark:bg-red-500/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500">
        </div>
        <div
          class="absolute -bottom-10 -left-10 w-32 h-32 bg-red-300/20 dark:bg-red-600/10 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500">
        </div>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-4">
            <!-- Animated icon container -->
            <div class="relative">
              <div
                class="absolute inset-0 bg-red-500/20 dark:bg-red-500/30 rounded-xl blur-md group-hover:blur-lg transition-all">
              </div>
              <div
                class="relative w-12 h-12 rounded-xl bg-gradient-to-br from-red-100 via-red-50 to-red-100/80 dark:from-red-900/50 dark:via-red-800/40 dark:to-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400 shadow-lg shadow-red-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3
              class="text-sm font-bold bg-gradient-to-r from-red-800 to-red-600 dark:from-red-300 dark:to-red-400 bg-clip-text text-transparent uppercase tracking-wider">
              Sudah Jatuh Tempo</h3>
          </div>
          <p
            class="text-5xl font-black bg-gradient-to-br from-red-600 via-red-600 to-red-700 dark:from-red-500 dark:to-red-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
            {{ store.overdueInvoices.length }}</p>
          <div
            class="inline-flex items-center gap-2 bg-gradient-to-r from-red-100/80 to-red-50/80 dark:from-red-900/30 dark:to-red-800/20 backdrop-blur-sm py-2 px-4 rounded-xl border border-red-200/50 dark:border-red-700/30 shadow-sm">
            <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm font-bold text-red-700 dark:text-red-300">{{ formatCurrency(overdueTotal) }}</p>
          </div>
        </div>
      </div>

      <!-- Segera Jatuh Tempo -->
      <div
        class="relative overflow-hidden bg-gradient-to-br from-yellow-50/90 via-yellow-50/70 to-white/90 dark:from-yellow-900/30 dark:via-yellow-800/20 dark:to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-yellow-200/60 dark:border-yellow-700/50 shadow-xl shadow-yellow-500/10 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 group hover:-translate-y-1">
        <!-- Animated gradient blurs -->
        <div
          class="absolute -top-10 -right-10 w-32 h-32 bg-yellow-400/30 dark:bg-yellow-500/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500">
        </div>
        <div
          class="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-300/20 dark:bg-yellow-600/10 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500">
        </div>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-4">
            <!-- Animated icon container -->
            <div class="relative">
              <div
                class="absolute inset-0 bg-yellow-500/20 dark:bg-yellow-500/30 rounded-xl blur-md group-hover:blur-lg transition-all">
              </div>
              <div
                class="relative w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100/80 dark:from-yellow-900/50 dark:via-yellow-800/40 dark:to-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shadow-lg shadow-yellow-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3
              class="text-sm font-bold bg-gradient-to-r from-yellow-800 to-yellow-600 dark:from-yellow-300 dark:to-yellow-400 bg-clip-text text-transparent uppercase tracking-wider">
              Segera Jatuh Tempo</h3>
          </div>
          <p
            class="text-5xl font-black bg-gradient-to-br from-yellow-600 via-yellow-600 to-yellow-700 dark:from-yellow-500 dark:to-yellow-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
            {{ store.upcomingDueDates.length }}</p>
          <div
            class="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100/80 to-yellow-50/80 dark:from-yellow-900/30 dark:to-yellow-800/20 backdrop-blur-sm py-2 px-4 rounded-xl border border-yellow-200/50 dark:border-yellow-700/30 shadow-sm">
            <svg class="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm font-bold text-yellow-700 dark:text-yellow-300">{{ formatCurrency(upcomingTotal) }}</p>
          </div>
        </div>
      </div>

      <!-- Total Belum Lunas -->
      <div
        class="relative overflow-hidden bg-gradient-to-br from-blue-50/90 via-blue-50/70 to-white/90 dark:from-blue-900/30 dark:via-blue-800/20 dark:to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/60 dark:border-blue-700/50 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 group hover:-translate-y-1">
        <!-- Animated gradient blurs -->
        <div
          class="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/30 dark:bg-blue-500/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500">
        </div>
        <div
          class="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500">
        </div>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-4">
            <!-- Animated icon container -->
            <div class="relative">
              <div
                class="absolute inset-0 bg-blue-500/20 dark:bg-blue-500/30 rounded-xl blur-md group-hover:blur-lg transition-all">
              </div>
              <div
                class="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100/80 dark:from-blue-900/50 dark:via-blue-800/40 dark:to-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h3
              class="text-sm font-bold bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-300 dark:to-blue-400 bg-clip-text text-transparent uppercase tracking-wider">
              Total Belum Lunas</h3>
          </div>
          <p
            class="text-5xl font-black bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-300">
            {{ store.unpaidInvoices.length }}</p>
          <div
            class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100/80 to-blue-50/80 dark:from-blue-900/30 dark:to-blue-800/20 backdrop-blur-sm py-2 px-4 rounded-xl border border-blue-200/50 dark:border-blue-700/30 shadow-sm">
            <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm font-bold text-blue-700 dark:text-blue-300">{{ formatCurrency(store.totalDebt) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs - SUPER PREMIUM -->
    <div class="mb-8">
      <div
        class="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-800/80 dark:to-gray-800 p-2 rounded-2xl inline-flex flex-wrap gap-2 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl">
        <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value" :class="[
          'px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2.5 relative overflow-hidden group',
          activeTab === tab.value
            ? 'bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-500/40 scale-105'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:shadow-md hover:scale-105 active:scale-95'
        ]">
          <span class="relative z-10">{{ tab.label }}</span>
          <span v-if="tab.count > 0" :class="[
            'relative z-10 px-2.5 py-1 rounded-lg text-xs font-black transition-all duration-300',
            activeTab === tab.value
              ? 'bg-white/30 text-white backdrop-blur-sm shadow-lg'
              : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 group-hover:bg-emerald-100 group-hover:text-emerald-700 dark:group-hover:bg-emerald-900/50 dark:group-hover:text-emerald-300'
          ]">
            {{ tab.count }}
          </span>
          <!-- Shine effect for active tab -->
          <div v-if="activeTab === tab.value"
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700">
          </div>
        </button>
      </div>
    </div>

    <!-- Table -->
    <div
      class="card bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <IncomingGoodsTable :goods="displayedGoods" :empty-message="emptyMessage" @view="viewInvoice"
        @mark-paid="markAsPaid" @mark-unpaid="markAsUnpaid" @delete="confirmDeleteInvoice" />
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="deleteConfirmation.show"
        class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
        @click.self="cancelDelete">
        <div
          class="relative bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl transform transition-all">
          <!-- Decorative gradient blur -->
          <div class="absolute -top-20 -right-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>

          <!-- Warning Icon with animation -->
          <div class="relative flex items-center justify-center w-20 h-20 mx-auto mb-6">
            <!-- Pulsing background -->
            <div class="absolute inset-0 bg-red-500/20 dark:bg-red-500/30 rounded-full animate-ping"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded-full blur-xl"></div>

            <!-- Icon container -->
            <div
              class="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 rounded-full shadow-lg shadow-red-500/30">
              <svg class="w-10 h-10 text-red-600 dark:text-red-500" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>

          <!-- Title -->
          <h3
            class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent text-center mb-3">
            Hapus Invoice?
          </h3>

          <!-- Message -->
          <p class="text-gray-600 dark:text-gray-400 text-center mb-8 leading-relaxed">
            Yakin ingin menghapus invoice dari <span class="font-bold text-gray-900 dark:text-white px-1">{{
              deleteConfirmation.supplierName }}</span>?
            <span class="block mt-2 text-sm text-gray-500 dark:text-gray-500">Tindakan ini tidak dapat
              dibatalkan.</span>
          </p>

          <!-- Actions -->
          <div class="flex gap-4">
            <button @click="cancelDelete"
              class="flex-1 px-6 py-3.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all transform hover:scale-105 active:scale-95 shadow-sm">
              Batal
            </button>
            <button @click="executeDelete"
              class="flex-1 px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold shadow-xl shadow-red-500/40 hover:shadow-2xl hover:shadow-red-500/50 transition-all transform hover:scale-105 active:scale-95 relative overflow-hidden group">
              <span class="relative z-10">Hapus</span>
              <!-- Shine effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700">
              </div>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const store = useSupplierStore()
const router = useRouter()
const route = useRoute()
const { success, danger } = useNotifications()
const { formatCurrency } = useDateHelpers()

type TabValue = 'all' | 'overdue' | 'upcoming' | 'unpaid' | 'paid'

const activeTab = ref<TabValue>('all')

// Delete confirmation state
const deleteConfirmation = ref({
  show: false,
  id: '',
  supplierName: ''
})

const tabs = computed(() => [
  { label: 'Semua', value: 'all' as TabValue, count: store.incomingGoods.length },
  { label: 'Jatuh Tempo', value: 'overdue' as TabValue, count: store.overdueInvoices.length },
  { label: 'Segera Jatuh Tempo', value: 'upcoming' as TabValue, count: store.upcomingDueDates.length },
  { label: 'Belum Lunas', value: 'unpaid' as TabValue, count: store.unpaidInvoices.length },
  { label: 'Lunas', value: 'paid' as TabValue, count: store.incomingGoods.filter(g => g.paymentStatus === 'paid').length }
])

const displayedGoods = computed(() => {
  switch (activeTab.value) {
    case 'overdue':
      return store.overdueInvoices
    case 'upcoming':
      return store.upcomingDueDates
    case 'unpaid':
      return store.unpaidInvoices
    case 'paid':
      return store.incomingGoods.filter(g => g.paymentStatus === 'paid')
    default:
      return store.incomingGoods
  }
})

const emptyMessage = computed(() => {
  switch (activeTab.value) {
    case 'overdue':
      return 'Tidak ada invoice yang jatuh tempo'
    case 'upcoming':
      return 'Tidak ada invoice yang akan jatuh tempo'
    case 'unpaid':
      return 'Semua invoice sudah lunas'
    case 'paid':
      return 'Belum ada invoice yang lunas'
    default:
      return 'Belum ada barang masuk'
  }
})

const overdueTotal = computed(() => {
  return store.overdueInvoices.reduce((sum, g) => sum + g.totalAmount, 0)
})

const upcomingTotal = computed(() => {
  return store.upcomingDueDates.reduce((sum, g) => sum + g.totalAmount, 0)
})

const viewInvoice = (id: string) => {
  router.push(`/incoming-goods/${id}`)
}

const markAsPaid = (id: string) => {
  const result = store.markAsPaid(id)
  if (result) {
    success('Berhasil', 'Invoice ditandai sebagai lunas')
  } else {
    danger('Gagal', 'Invoice tidak ditemukan')
  }
}

const markAsUnpaid = (id: string) => {
  const result = store.markAsUnpaid(id)
  if (result) {
    success('Berhasil', 'Status pembayaran dibatalkan')
  } else {
    danger('Gagal', 'Invoice tidak ditemukan')
  }
}

const confirmDeleteInvoice = (id: string) => {
  const invoice = store.incomingGoods.find(g => g.id === id)
  if (invoice) {
    deleteConfirmation.value = {
      show: true,
      id: id,
      supplierName: invoice.supplierName
    }
  }
}

const executeDelete = () => {
  if (deleteConfirmation.value.id) {
    const result = store.deleteIncomingGoods(deleteConfirmation.value.id)
    if (result) {
      success('Berhasil', 'Invoice berhasil dihapus')
    } else {
      danger('Gagal', 'Invoice tidak ditemukan')
    }
  }
  cancelDelete()
}

const cancelDelete = () => {
  deleteConfirmation.value = {
    show: false,
    id: '',
    supplierName: ''
  }
}

// Check for filter query param
onMounted(() => {
  if (route.query.filter) {
    activeTab.value = route.query.filter as TabValue
  }
})
</script>
