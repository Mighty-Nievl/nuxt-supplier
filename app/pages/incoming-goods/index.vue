<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Barang Masuk</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2 text-lg">Riwayat pembelian dan status pembayaran</p>
      </div>
      <NuxtLink to="/incoming-goods/new"
        class="btn bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-none shadow-lg shadow-emerald-500/20 px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 relative overflow-hidden group">
        <span class="relative z-10 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Catat Barang Masuk
        </span>
        <!-- Shine effect -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700">
        </div>
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <!-- Search -->
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input v-model="searchQuery" type="text" placeholder="Cari invoice..."
          class="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
      </div>

      <!-- Supplier Filter -->
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <select v-model="filterSupplier"
          class="w-full pl-11 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm text-gray-900 dark:text-white appearance-none cursor-pointer">
          <option value="">Semua Supplier</option>
          <option v-for="supplier in store.suppliers" :key="supplier.id" :value="supplier.id">
            {{ supplier.name }}
          </option>
        </select>
        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <!-- Status Filter -->
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <select v-model="filterStatus"
          class="w-full pl-11 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm text-gray-900 dark:text-white appearance-none cursor-pointer">
          <option value="">Semua Status</option>
          <option value="unpaid">Belum Lunas</option>
          <option value="paid">Lunas</option>
        </select>
        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <!-- Sort By -->
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
          </svg>
        </div>
        <select v-model="sortBy"
          class="w-full pl-11 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm text-gray-900 dark:text-white appearance-none cursor-pointer">
          <option value="newest">Tanggal Terbaru</option>
          <option value="oldest">Tanggal Terlama</option>
          <option value="closest_due_date">Jatuh Tempo Terdekat</option>
          <option value="furthest_due_date">Jatuh Tempo Terlama</option>
          <option value="highest_total">Total Tertinggi</option>
          <option value="lowest_total">Total Terendah</option>
        </select>
        <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div
      class="card bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <IncomingGoodsTable :goods="filteredGoods" empty-message="Belum ada barang masuk" @view="viewInvoice"
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

const searchQuery = ref('')
const filterSupplier = ref('')
const filterStatus = ref('')
const sortBy = ref('newest')

// Delete confirmation state
const deleteConfirmation = ref({
  show: false,
  id: '',
  supplierName: ''
})

onMounted(() => {
  if (route.query.supplierId) {
    filterSupplier.value = route.query.supplierId as string
  }
})

const filteredGoods = computed(() => {
  let result = [...store.incomingGoods]

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(g =>
      g.supplierName.toLowerCase().includes(query) ||
      g.notes?.toLowerCase().includes(query)
    )
  }

  // Filter by supplier
  if (filterSupplier.value) {
    result = result.filter(g => g.supplierId === filterSupplier.value)
  }

  // Filter by status
  if (filterStatus.value) {
    result = result.filter(g => g.paymentStatus === filterStatus.value)
  }

  // Sort
  return result.sort((a, b) => {
    switch (sortBy.value) {
      case 'oldest':
        return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime()
      case 'closest_due_date':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      case 'furthest_due_date':
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
      case 'highest_total':
        return b.totalAmount - a.totalAmount
      case 'lowest_total':
        return a.totalAmount - b.totalAmount
      case 'newest':
      default:
        return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
    }
  })
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
</script>
