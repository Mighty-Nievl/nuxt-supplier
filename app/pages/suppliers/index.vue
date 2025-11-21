<template>
  <div>
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Manajemen Supplier</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2 text-lg">Kelola data supplier dan pengaturan jatuh tempo</p>
      </div>
      <button @click="showAddModal = true"
        class="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-lg shadow-emerald-500/20 px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Supplier
      </button>
    </div>

    <!-- Search & Sort -->
    <div class="mb-8 flex flex-col md:flex-row gap-4">
      <!-- Search -->
      <div class="flex-1 max-w-md">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input v-model="searchQuery" type="text" placeholder="Cari supplier..."
            class="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
        </div>
      </div>

      <!-- Sort By -->
      <div class="w-full md:w-64">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
            </svg>
          </div>
          <select v-model="sortBy"
            class="w-full pl-11 pr-10 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all shadow-sm text-gray-900 dark:text-white appearance-none cursor-pointer">
            <option value="name-asc">Nama A-Z</option>
            <option value="name-desc">Nama Z-A</option>
            <option value="debt-desc">Hutang Terbesar</option>
            <option value="debt-asc">Hutang Terkecil</option>
            <option value="purchases-desc">Pembelian Terbanyak</option>
            <option value="purchases-asc">Pembelian Tersedikit</option>
            <option value="unpaid-desc">Invoice Belum Lunas Terbanyak</option>
            <option value="unpaid-asc">Invoice Belum Lunas Tersedikit</option>
          </select>
          <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Suppliers Grid -->
    <div v-if="sortedSuppliers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SupplierCard v-for="supplier in sortedSuppliers" :key="supplier.id" :supplier="supplier"
        :stats="store.supplierStats[supplier.id]" @edit="editSupplier" @delete="deleteSupplier" />
    </div>

    <!-- Empty State -->
    <div v-else class="card text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {{ searchQuery ? 'Supplier tidak ditemukan' : 'Belum ada supplier' }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        {{ searchQuery ? 'Coba kata kunci lain' : 'Mulai dengan menambahkan supplier pertama Anda' }}
      </p>
      <button v-if="!searchQuery" @click="showAddModal = true" class="btn btn-primary mx-auto">
        Tambah Supplier
      </button>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showAddModal || editingSupplier"
          class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
          @click.self="closeModal">
          <div
            class="relative bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-3xl max-w-xl w-full max-h-[85vh] p-5 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl transform transition-all">
            <!-- Decorative gradient blur -->
            <div class="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>

            <h2
              class="relative z-10 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
              {{ editingSupplier ? 'Edit Supplier' : 'Tambah Supplier Baru' }}
            </h2>

            <div class="relative z-10">
              <SupplierForm :initial-data="editingSupplier" @submit="handleFormSubmit" @cancel="closeModal" />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

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
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>

          <!-- Title -->
          <h3
            class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent text-center mb-3">
            Hapus Supplier?
          </h3>

          <!-- Message -->
          <p class="text-gray-600 dark:text-gray-400 text-center mb-8 leading-relaxed">
            Yakin ingin menghapus supplier <span class="font-bold text-gray-900 dark:text-white px-1">{{
              deleteConfirmation.supplierName }}</span>?
            <span class="block mt-2 text-sm text-gray-500 dark:text-gray-500">Supplier dengan riwayat barang masuk tidak
              dapat dihapus.</span>
          </p>

          <!-- Actions -->
          <div class="flex gap-4">
            <button @click="cancelDelete"
              class="flex-1 px-6 py-3.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all transform hover:scale-105 active:scale-95 shadow-sm">
              Batal
            </button>
            <button @click="confirmDelete"
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
import type { Supplier, DueDateType } from '~/types/supplier'

const store = useSupplierStore()
const { success, danger } = useNotifications()

const searchQuery = ref('')
const sortBy = ref('name-asc')
const showAddModal = ref(false)
const editingSupplier = ref<Supplier | null>(null)
const deleteConfirmation = ref({
  show: false,
  supplierId: '',
  supplierName: ''
})

const filteredSuppliers = computed(() => {
  if (!searchQuery.value) return store.suppliers

  const query = searchQuery.value.toLowerCase()
  return store.suppliers.filter(s =>
    s.name.toLowerCase().includes(query)
  )
})

const sortedSuppliers = computed(() => {
  const suppliers = [...filteredSuppliers.value]

  switch (sortBy.value) {
    case 'name-asc':
      return suppliers.sort((a, b) => a.name.localeCompare(b.name))
    case 'name-desc':
      return suppliers.sort((a, b) => b.name.localeCompare(a.name))
    case 'debt-desc':
      return suppliers.sort((a, b) => {
        const debtA = store.supplierStats[a.id]?.totalDebt || 0
        const debtB = store.supplierStats[b.id]?.totalDebt || 0
        return debtB - debtA
      })
    case 'debt-asc':
      return suppliers.sort((a, b) => {
        const debtA = store.supplierStats[a.id]?.totalDebt || 0
        const debtB = store.supplierStats[b.id]?.totalDebt || 0
        return debtA - debtB
      })
    case 'purchases-desc':
      return suppliers.sort((a, b) => {
        const purchasesA = store.supplierStats[a.id]?.totalPurchases || 0
        const purchasesB = store.supplierStats[b.id]?.totalPurchases || 0
        return purchasesB - purchasesA
      })
    case 'purchases-asc':
      return suppliers.sort((a, b) => {
        const purchasesA = store.supplierStats[a.id]?.totalPurchases || 0
        const purchasesB = store.supplierStats[b.id]?.totalPurchases || 0
        return purchasesA - purchasesB
      })
    case 'unpaid-desc':
      return suppliers.sort((a, b) => {
        const unpaidA = store.supplierStats[a.id]?.unpaidInvoices || 0
        const unpaidB = store.supplierStats[b.id]?.unpaidInvoices || 0
        return unpaidB - unpaidA
      })
    case 'unpaid-asc':
      return suppliers.sort((a, b) => {
        const unpaidA = store.supplierStats[a.id]?.unpaidInvoices || 0
        const unpaidB = store.supplierStats[b.id]?.unpaidInvoices || 0
        return unpaidA - unpaidB
      })
    default:
      return suppliers
  }
})

const editSupplier = (id: string) => {
  const supplier = store.getSupplierById(id)
  if (supplier) {
    editingSupplier.value = supplier
    showAddModal.value = true
  }
}

const deleteSupplier = (id: string) => {
  const supplier = store.getSupplierById(id)
  if (supplier) {
    deleteConfirmation.value = {
      show: true,
      supplierId: id,
      supplierName: supplier.name
    }
  }
}

const confirmDelete = () => {
  try {
    const result = store.deleteSupplier(deleteConfirmation.value.supplierId)
    if (result) {
      success('Berhasil', 'Supplier berhasil dihapus')
    }
  } catch (error: any) {
    danger('Gagal', error.message)
  }
  cancelDelete()
}

const cancelDelete = () => {
  deleteConfirmation.value = {
    show: false,
    supplierId: '',
    supplierName: ''
  }
}

const handleFormSubmit = (data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => {
  if (editingSupplier.value) {
    store.updateSupplier(editingSupplier.value.id, data)
    success('Berhasil', 'Supplier berhasil diupdate')
  } else {
    store.addSupplier(data)
    success('Berhasil', 'Supplier berhasil ditambahkan')
  }

  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingSupplier.value = null
}

// Check for action query param
onMounted(() => {
  const route = useRoute()
  if (route.query.action === 'add') {
    showAddModal.value = true
  }
})
</script>
