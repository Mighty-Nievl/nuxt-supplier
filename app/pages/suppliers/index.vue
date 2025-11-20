<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Manajemen Supplier</h1>
        <p class="text-gray-600 mt-1">Kelola data supplier dan pengaturan jatuh tempo</p>
      </div>
      <button @click="showAddModal = true" class="btn btn-primary">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Tambah Supplier
      </button>
    </div>

    <!-- Search -->
    <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Cari supplier..."
        class="input max-w-md"
      />
    </div>

    <!-- Suppliers Grid -->
    <div v-if="filteredSuppliers.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SupplierCard
        v-for="supplier in filteredSuppliers"
        :key="supplier.id"
        :supplier="supplier"
        :stats="store.supplierStats[supplier.id]"
        @edit="editSupplier"
        @delete="deleteSupplier"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="card text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        {{ searchQuery ? 'Supplier tidak ditemukan' : 'Belum ada supplier' }}
      </h3>
      <p class="text-gray-600 mb-4">
        {{ searchQuery ? 'Coba kata kunci lain' : 'Mulai dengan menambahkan supplier pertama Anda' }}
      </p>
      <button v-if="!searchQuery" @click="showAddModal = true" class="btn btn-primary mx-auto">
        Tambah Supplier
      </button>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div
        v-if="showAddModal || editingSupplier"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-xl max-w-md w-full p-6">
          <h2 class="text-xl font-semibold mb-4">
            {{ editingSupplier ? 'Edit Supplier' : 'Tambah Supplier Baru' }}
          </h2>

          <SupplierForm
            :initial-data="editingSupplier"
            @submit="handleFormSubmit"
            @cancel="closeModal"
          />
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
const showAddModal = ref(false)
const editingSupplier = ref<Supplier | null>(null)

const filteredSuppliers = computed(() => {
  if (!searchQuery.value) return store.suppliers
  
  const query = searchQuery.value.toLowerCase()
  return store.suppliers.filter(s => 
    s.name.toLowerCase().includes(query)
  )
})

const editSupplier = (id: string) => {
  const supplier = store.getSupplierById(id)
  if (supplier) {
    editingSupplier.value = supplier
    showAddModal.value = true // Also show modal when editing
  }
}

const deleteSupplier = (id: string) => {
  if (confirm('Yakin ingin menghapus supplier ini? Supplier dengan riwayat barang masuk tidak dapat dihapus.')) {
    try {
      const result = store.deleteSupplier(id)
      if (result) {
        success('Berhasil', 'Supplier berhasil dihapus')
      }
    } catch (error: any) {
      danger('Gagal', error.message)
    }
  }
}

const handleFormSubmit = (data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => {
  if (editingSupplier.value) {
    // Update existing
    store.updateSupplier(editingSupplier.value.id, data)
    success('Berhasil', 'Supplier berhasil diupdate')
  } else {
    // Add new
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
