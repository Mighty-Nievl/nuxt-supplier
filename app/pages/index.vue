<template>
  <div class="space-y-8">
    <!-- Header -->
    <div
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 dark:from-gray-900 dark:to-gray-800 p-8 text-white shadow-2xl transition-all duration-500">
      <div class="absolute top-0 right-0 -mt-16 -mr-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
      <div class="absolute bottom-0 left-0 -mb-16 -ml-16 h-64 w-64 rounded-full bg-black/10 blur-3xl"></div>

      <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 class="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p class="text-emerald-50 dark:text-gray-400 text-lg">Overview hutang dan pembayaran supplier</p>
        </div>
        <div
          class="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-inner">
          <div class="h-2.5 w-2.5 rounded-full bg-emerald-300 animate-pulse shadow-[0_0_10px_rgba(110,231,183,0.6)]">
          </div>
          <span class="text-sm font-medium text-white tracking-wide">System Online</span>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink to="/incoming-goods/new"
        class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/30">
        <div
          class="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-white/20 blur-2xl transition-transform group-hover:scale-150">
        </div>
        <div class="relative z-10 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold mb-1">Catat Barang Masuk</h3>
            <p class="text-emerald-100 text-sm">Input invoice baru dari supplier</p>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm transition-transform group-hover:rotate-12">
            <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink to="/suppliers"
        class="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all hover:scale-[1.02] hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/30">
        <div
          class="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-emerald-500/5 blur-2xl transition-transform group-hover:scale-150">
        </div>
        <div class="relative z-10 flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">Tambah Supplier</h3>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Kelola data supplier baru</p>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:rotate-12">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Debt -->
      <div
        class="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 group hover:border-red-500/30 transition-all">
        <div
          class="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-red-500/10 blur-xl group-hover:bg-red-500/20 transition-colors">
        </div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div class="p-2.5 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span
              class="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300">
              {{ store.overdueInvoices.length }} Overdue
            </span>
          </div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Hutang</p>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ formatCurrency(store.totalDebt) }}</h3>
        </div>
      </div>

      <!-- Upcoming Due -->
      <div
        class="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 group hover:border-yellow-500/30 transition-all">
        <div
          class="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-yellow-500/10 blur-xl group-hover:bg-yellow-500/20 transition-colors">
        </div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div class="p-2.5 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span
              class="text-xs font-bold px-2.5 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
              7 Hari
            </span>
          </div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Segera Jatuh Tempo</p>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ store.upcomingDueDates.length }} Invoice
          </h3>
        </div>
      </div>

      <!-- Total Suppliers -->
      <div
        class="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 group hover:border-emerald-500/30 transition-all">
        <div
          class="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-emerald-500/10 blur-xl group-hover:bg-emerald-500/20 transition-colors">
        </div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div class="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Supplier</p>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ store.suppliers.length }}</h3>
        </div>
      </div>

      <!-- Total Invoices -->
      <div
        class="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-lg border border-gray-100 dark:border-gray-700 group hover:border-blue-500/30 transition-all">
        <div
          class="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-blue-500/10 blur-xl group-hover:bg-blue-500/20 transition-colors">
        </div>
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-4">
            <div class="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Invoice</p>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ store.incomingGoods.length }}</h3>
        </div>
      </div>
    </div>

    <!-- Overdue Invoices -->
    <div v-if="store.overdueInvoices.length > 0" class="space-y-4">
      <div class="flex items-center justify-between px-1">
        <div class="flex items-center gap-2">
          <div class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Sudah Jatuh Tempo</h2>
        </div>
        <NuxtLink to="/payments?filter=overdue"
          class="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
          Lihat semua →
        </NuxtLink>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <IncomingGoodsTable :goods="store.overdueInvoices.slice(0, 5)"
          empty-message="Tidak ada invoice yang jatuh tempo" @view="viewInvoice" @mark-paid="markAsPaid"
          @mark-unpaid="markAsUnpaid" @delete="confirmDelete" />
      </div>
    </div>

    <!-- Upcoming Due Dates -->
    <div v-if="store.upcomingDueDates.length > 0" class="space-y-4">
      <div class="flex items-center justify-between px-1">
        <div class="flex items-center gap-2">
          <div class="h-2 w-2 rounded-full bg-yellow-500"></div>
          <h2 class="text-lg font-bold text-gray-900 dark:text-white">Segera Jatuh Tempo (7 Hari)</h2>
        </div>
        <NuxtLink to="/payments?filter=upcoming"
          class="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
          Lihat semua →
        </NuxtLink>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <IncomingGoodsTable :goods="store.upcomingDueDates.slice(0, 5)"
          empty-message="Tidak ada invoice yang akan jatuh tempo" @view="viewInvoice" @mark-paid="markAsPaid"
          @mark-unpaid="markAsUnpaid" @delete="confirmDelete" />
      </div>
    </div>

    <!-- Recent Incoming Goods -->
    <div class="space-y-4">
      <div class="flex items-center justify-between px-1">
        <h2 class="text-lg font-bold text-gray-900 dark:text-white">Barang Masuk Terbaru</h2>
        <NuxtLink to="/incoming-goods"
          class="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
          Lihat semua →
        </NuxtLink>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <IncomingGoodsTable :goods="recentGoods" empty-message="Belum ada barang masuk" @view="viewInvoice"
          @mark-paid="markAsPaid" @mark-unpaid="markAsUnpaid" @delete="confirmDelete" />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <DeleteConfirmationModal :is-open="showDeleteModal" :title="'Hapus Invoice'"
      :message="'Apakah Anda yakin ingin menghapus invoice ini? Data yang dihapus tidak dapat dikembalikan.'"
      @close="showDeleteModal = false" @confirm="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import DeleteConfirmationModal from '~/components/DeleteConfirmationModal.vue'

const store = useSupplierStore()
const router = useRouter()
const { formatCurrency } = useDateHelpers()
const { success, danger } = useNotifications()

// Delete Modal State
const showDeleteModal = ref(false)
const itemToDelete = ref<string | null>(null)

const confirmDelete = (id: string) => {
  itemToDelete.value = id
  showDeleteModal.value = true
}

const handleDelete = () => {
  if (itemToDelete.value) {
    const result = store.deleteIncomingGoods(itemToDelete.value)
    if (result) {
      success('Berhasil', 'Invoice berhasil dihapus')
    } else {
      danger('Gagal', 'Invoice tidak ditemukan')
    }
    showDeleteModal.value = false
    itemToDelete.value = null
  }
}

const recentGoods = computed(() => {
  return [...store.incomingGoods]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by created date for "Recent"
    .slice(0, 5)
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
</script>
