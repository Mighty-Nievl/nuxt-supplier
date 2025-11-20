<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Barang Masuk</h1>
        <p class="text-gray-600 mt-1">Riwayat pembelian dari supplier</p>
      </div>
      <NuxtLink to="/incoming-goods/new" class="btn btn-primary">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Catat Barang Masuk
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="card mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="label">Cari</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari supplier atau catatan..."
            class="input"
          />
        </div>
        <div>
          <label class="label">Supplier</label>
          <select v-model="filterSupplier" class="input">
            <option value="">Semua Supplier</option>
            <option v-for="supplier in store.suppliers" :key="supplier.id" :value="supplier.id">
              {{ supplier.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="label">Status Pembayaran</label>
          <select v-model="filterStatus" class="input">
            <option value="">Semua Status</option>
            <option value="unpaid">Belum Lunas</option>
            <option value="paid">Lunas</option>
          </select>
        </div>
        <div>
          <label class="label">Urutkan</label>
          <select v-model="sortBy" class="input">
            <option value="newest">Tanggal Terbaru</option>
            <option value="oldest">Tanggal Terlama</option>
            <option value="closest_due_date">Jatuh Tempo Terdekat</option>
            <option value="furthest_due_date">Jatuh Tempo Terlama</option>
            <option value="highest_total">Total Tertinggi</option>
            <option value="lowest_total">Total Terendah</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="card">
      <IncomingGoodsTable
        :goods="filteredGoods"
        empty-message="Belum ada barang masuk"
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

const searchQuery = ref('')
const filterSupplier = ref('')
const filterStatus = ref('')
const sortBy = ref('newest')

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
