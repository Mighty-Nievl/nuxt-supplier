<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-gray-600 mt-1">Overview hutang dan pembayaran supplier</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Total Hutang</p>
            <p class="text-2xl font-bold text-red-600 mt-1">{{ formatCurrency(store.totalDebt) }}</p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Belum Lunas</p>
            <p class="text-2xl font-bold text-gray-900 mt-1">{{ store.unpaidInvoices.length }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Jatuh Tempo</p>
            <p class="text-2xl font-bold text-orange-600 mt-1">{{ store.overdueInvoices.length }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Segera Jatuh Tempo</p>
            <p class="text-2xl font-bold text-yellow-600 mt-1">{{ store.upcomingDueDates.length }}</p>
          </div>
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="card card-hover">
        <h3 class="font-semibold text-lg mb-4">Quick Actions</h3>
        <div class="flex flex-col gap-3">
          <NuxtLink to="/suppliers?action=add" class="btn btn-primary justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Supplier Baru
          </NuxtLink>
          <NuxtLink to="/incoming-goods/new" class="btn btn-outline justify-center">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Catat Barang Masuk
          </NuxtLink>
        </div>
      </div>

      <div class="card">
        <h3 class="font-semibold text-lg mb-4">Total Supplier</h3>
        <p class="text-4xl font-bold text-indigo-600">{{ store.suppliers.length }}</p>
        <NuxtLink to="/suppliers" class="text-sm text-indigo-600 hover:text-indigo-700 mt-2 inline-block">
          Lihat semua supplier →
        </NuxtLink>
      </div>
    </div>

    <!-- Overdue Invoices -->
    <div v-if="store.overdueInvoices.length > 0" class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-900">⚠️ Sudah Jatuh Tempo</h2>
        <NuxtLink to="/payments?filter=overdue" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          Lihat semua →
        </NuxtLink>
      </div>
      <div class="card">
        <IncomingGoodsTable
          :goods="store.overdueInvoices.slice(0, 5)"
          empty-message="Tidak ada invoice yang jatuh tempo"
          @view="viewInvoice"
          @mark-paid="markAsPaid"
          @mark-unpaid="markAsUnpaid"
          @delete="deleteInvoice"
        />
      </div>
    </div>

    <!-- Upcoming Due Dates -->
    <div v-if="store.upcomingDueDates.length > 0" class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-900">🔔 Segera Jatuh Tempo (7 Hari)</h2>
        <NuxtLink to="/payments?filter=upcoming" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          Lihat semua →
        </NuxtLink>
      </div>
      <div class="card">
        <IncomingGoodsTable
          :goods="store.upcomingDueDates.slice(0, 5)"
          empty-message="Tidak ada invoice yang akan jatuh tempo"
          @view="viewInvoice"
          @mark-paid="markAsPaid"
          @mark-unpaid="markAsUnpaid"
          @delete="deleteInvoice"
        />
      </div>
    </div>

    <!-- Recent Incoming Goods -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-900">Barang Masuk (Urut Jatuh Tempo)</h2>
        <NuxtLink to="/incoming-goods" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          Lihat semua →
        </NuxtLink>
      </div>
      <div class="card">
        <IncomingGoodsTable
          :goods="recentGoods"
          empty-message="Belum ada barang masuk"
          @view="viewInvoice"
          @mark-paid="markAsPaid"
          @mark-unpaid="markAsUnpaid"
          @delete="deleteInvoice"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useSupplierStore()
const router = useRouter()
const { formatCurrency } = useDateHelpers()
const { success, danger } = useNotifications()

const recentGoods = computed(() => {
  return [...store.incomingGoods]
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
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
</script>
