<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Tracking Pembayaran</h1>
      <p class="text-gray-600 mt-1">Monitor dan kelola pembayaran ke supplier</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card bg-red-50 border-red-200">
        <h3 class="text-sm font-medium text-red-800 mb-2">Sudah Jatuh Tempo</h3>
        <p class="text-3xl font-bold text-red-600">{{ store.overdueInvoices.length }}</p>
        <p class="text-sm text-red-700 mt-1">{{ formatCurrency(overdueTotal) }}</p>
      </div>
      
      <div class="card bg-yellow-50 border-yellow-200">
        <h3 class="text-sm font-medium text-yellow-800 mb-2">Segera Jatuh Tempo (7 Hari)</h3>
        <p class="text-3xl font-bold text-yellow-600">{{ store.upcomingDueDates.length }}</p>
        <p class="text-sm text-yellow-700 mt-1">{{ formatCurrency(upcomingTotal) }}</p>
      </div>
      
      <div class="card bg-blue-50 border-blue-200">
        <h3 class="text-sm font-medium text-blue-800 mb-2">Belum Lunas</h3>
        <p class="text-3xl font-bold text-blue-600">{{ store.unpaidInvoices.length }}</p>
        <p class="text-sm text-blue-700 mt-1">{{ formatCurrency(store.totalDebt) }}</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <nav class="flex gap-4">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
            :class="[
              'px-4 py-2 border-b-2 font-medium transition-colors',
              activeTab === tab.value
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            ]"
          >
            {{ tab.label }}
            <span
              v-if="tab.count > 0"
              :class="[
                'ml-2 px-2 py-0.5 rounded-full text-xs font-semibold',
                activeTab === tab.value ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600'
              ]"
            >
              {{ tab.count }}
            </span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Table -->
    <div class="card">
      <IncomingGoodsTable
        :goods="displayedGoods"
        :empty-message="emptyMessage"
        @view="viewInvoice"
        @mark-paid="markAsPaid"
        @mark-unpaid="markAsUnpaid"
        @delete="deleteInvoice"
      />
    </div>
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

const deleteInvoice = (id: string) => {
  if (confirm('Yakin ingin menghapus invoice ini?')) {
    const result = store.deleteIncomingGoods(id)
    if (result) {
      success('Berhasil', 'Invoice berhasil dihapus')
    } else {
      danger('Gagal', 'Invoice tidak ditemukan')
    }
  }
}

// Check for filter query param
onMounted(() => {
  if (route.query.filter) {
    activeTab.value = route.query.filter as TabValue
  }
})
</script>
