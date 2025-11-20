<template>
  <div v-if="goods" class="max-w-5xl mx-auto">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex items-center gap-3 mb-3">
        <NuxtLink to="/incoming-goods" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div class="flex-1">
          <h1 class="text-2xl font-bold text-gray-900">Detail Barang Masuk</h1>
          <p class="text-gray-600 text-sm mt-1">{{ goods.supplierName }}</p>
        </div>
        <div class="flex gap-2">
          <button v-if="!isEditing" @click="isEditing = true" class="btn btn-secondary">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button v-if="isEditing" @click="cancelEdit" class="btn btn-secondary">
            Batal
          </button>
          <button v-if="isEditing" @click="saveChanges" class="btn btn-primary">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Simpan
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Purchase Info -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Informasi Pembelian
          </h3>
          
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Pembelian</label>
                <input
                  v-if="isEditing"
                  v-model="editForm.purchaseDate"
                  type="date"
                  class="input"
                />
                <p v-else class="text-gray-900 font-medium">{{ formatDate(goods.purchaseDate) }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Jatuh Tempo</label>
                <p class="text-gray-900 font-medium">{{ formatDate(goods.dueDate) }}</p>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
              <textarea
                v-if="isEditing"
                v-model="editForm.notes"
                class="input"
                rows="2"
                placeholder="Tambahkan catatan..."
              ></textarea>
              <p v-else class="text-gray-700">{{ goods.notes || '-' }}</p>
            </div>
          </div>
        </div>

        <!-- Items -->
        <div class="card">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold flex items-center gap-2">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Daftar Barang
            </h3>
            <button v-if="isEditing" @click="addItem" class="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Tambah Item
            </button>
          </div>

          <div class="space-y-3">
            <div
              v-for="(item, index) in editForm.items"
              :key="index"
              class="relative"
            >
              <!-- Edit Mode -->
              <div v-if="isEditing" class="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div class="grid grid-cols-12 gap-3">
                  <div class="col-span-5">
                    <label class="block text-xs font-medium text-gray-600 mb-1">Nama Barang</label>
                    <input
                      v-model="item.name"
                      type="text"
                      class="input input-sm"
                      placeholder="Nama barang"
                    />
                  </div>
                  <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-600 mb-1">Qty</label>
                    <input
                      v-model.number="item.quantity"
                      type="number"
                      class="input input-sm"
                      placeholder="0"
                      min="1"
                    />
                  </div>
                  <div class="col-span-4">
                    <label class="block text-xs font-medium text-gray-600 mb-1">Harga Satuan</label>
                    <input
                      v-model.number="item.unitPrice"
                      type="number"
                      class="input input-sm"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div class="col-span-1 flex items-end justify-center pb-1">
                    <button @click="removeItem(index)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="mt-2 text-right text-sm font-medium text-gray-700">
                  Subtotal: {{ formatCurrency(getItemSubtotal(item)) }}
                </div>
              </div>

              <!-- View Mode -->
              <div v-else class="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">{{ item.name }}</p>
                    <p class="text-sm text-gray-600 mt-1">
                      {{ item.quantity }} × {{ formatCurrency(item.unitPrice || 0) }}
                    </p>
                  </div>
                  <p class="font-semibold text-gray-900">{{ formatCurrency(getItemSubtotal(item)) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Total -->
          <div class="mt-6 pt-4 border-t-2 border-gray-200">
            <div class="flex justify-between items-center">
              <span class="text-lg font-semibold text-gray-700">Total</span>
              <span class="text-2xl font-bold text-indigo-600">{{ formatCurrency(totalAmount) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Payment Status -->
        <div class="card">
          <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Status Pembayaran
          </h3>
          
          <div class="mb-4">
            <PaymentStatusBadge :status="goods.paymentStatus" class="text-sm" />
          </div>

          <div v-if="goods.paymentStatus === 'paid' && goods.paidAt" class="text-sm text-gray-600 mb-4 bg-green-50 p-3 rounded-lg">
            <p class="font-medium text-green-800">Dibayar pada:</p>
            <p class="text-green-700">{{ formatDate(goods.paidAt) }}</p>
          </div>

          <button
            v-if="goods.paymentStatus === 'unpaid'"
            @click="markAsPaid"
            class="btn btn-primary w-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Tandai Sudah Dibayar
          </button>
          <button
            v-else
            @click="markAsUnpaid"
            class="btn btn-secondary w-full"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Tandai Belum Dibayar
          </button>
        </div>

        <!-- Danger Zone -->
        <div class="card border-2 border-red-200 bg-red-50">
          <h3 class="text-lg font-semibold mb-3 text-red-700 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Danger Zone
          </h3>
          <p class="text-sm text-red-600 mb-3">Tindakan ini tidak dapat dibatalkan</p>
          <button @click="deleteGoods" class="btn btn-danger w-full">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Hapus Barang Masuk
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Not Found -->
  <div v-else class="text-center py-16">
    <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <p class="text-gray-600 text-lg mb-4">Barang masuk tidak ditemukan</p>
    <NuxtLink to="/incoming-goods" class="btn btn-primary">
      Kembali ke Daftar
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { IncomingGoodsItem } from '~/types/supplier'

const route = useRoute()
const router = useRouter()
const store = useSupplierStore()
const { success, danger } = useNotifications()

const id = route.params.id as string
const goods = computed(() => store.incomingGoods.find(g => g.id === id))

const isEditing = ref(false)
const editForm = ref({
  purchaseDate: '',
  notes: '',
  items: [] as IncomingGoodsItem[]
})

// Initialize edit form
watch(goods, (newGoods) => {
  if (newGoods) {
    editForm.value = {
      purchaseDate: newGoods.purchaseDate,
      notes: newGoods.notes || '',
      items: JSON.parse(JSON.stringify(newGoods.items)) // Deep copy
    }
  }
}, { immediate: true })

const getItemSubtotal = (item: IncomingGoodsItem) => {
  const qty = Number(item.quantity) || 0
  const price = Number(item.unitPrice) || 0
  return qty * price
}

const totalAmount = computed(() => {
  return editForm.value.items.reduce((sum, item) => sum + getItemSubtotal(item), 0)
})

const addItem = () => {
  editForm.value.items.push({
    id: `item-${Date.now()}`,
    name: '',
    quantity: 1,
    unitPrice: 0,
    subtotal: 0
  })
}

const removeItem = (index: number) => {
  editForm.value.items.splice(index, 1)
}

const saveChanges = () => {
  if (!goods.value) return

  // Validate
  if (editForm.value.items.length === 0) {
    danger('Gagal', 'Minimal harus ada 1 item')
    return
  }

  if (editForm.value.items.some(item => !item.name || item.quantity <= 0 || item.unitPrice <= 0)) {
    danger('Gagal', 'Semua item harus diisi dengan benar')
    return
  }

  const result = store.updateIncomingGoods(id, {
    purchaseDate: editForm.value.purchaseDate,
    notes: editForm.value.notes,
    items: editForm.value.items,
    totalAmount: totalAmount.value
  })

  if (result) {
    isEditing.value = false
    success('Berhasil', 'Barang masuk berhasil diupdate')
  }
}

const cancelEdit = () => {
  if (goods.value) {
    editForm.value = {
      purchaseDate: goods.value.purchaseDate,
      notes: goods.value.notes || '',
      items: JSON.parse(JSON.stringify(goods.value.items))
    }
  }
  isEditing.value = false
}

const markAsPaid = () => {
  if (store.markAsPaid(id)) {
    success('Berhasil', 'Pembayaran berhasil dicatat')
  }
}

const markAsUnpaid = () => {
  if (store.markAsUnpaid(id)) {
    success('Berhasil', 'Status pembayaran diubah menjadi belum dibayar')
  }
}

const deleteGoods = () => {
  if (!confirm('Yakin ingin menghapus barang masuk ini?')) return

  if (store.deleteIncomingGoods(id)) {
    success('Berhasil', 'Barang masuk berhasil dihapus')
    router.push('/incoming-goods')
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
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
</script>
