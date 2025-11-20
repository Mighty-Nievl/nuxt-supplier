<template>
  <form @submit.prevent="handleSubmit" class="max-w-3xl">
    <!-- Supplier Selection -->
    <div class="card mb-6">
      <h3 class="font-semibold text-lg mb-4">Informasi Supplier</h3>
      
      <div class="mb-4">
        <label class="label">Pilih Supplier *</label>
        <select v-model="formData.supplierId" class="input" required>
          <option value="">-- Pilih Supplier --</option>
          <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
            {{ supplier.name }}
          </option>
        </select>
        <p v-if="selectedSupplier" class="text-xs text-gray-500 mt-1">
          Jatuh tempo: 
          <span v-if="selectedSupplier.dueDateType === 'days'">
            {{ selectedSupplier.dueDateValue }} hari setelah pembelian
          </span>
          <span v-else>
            Tanggal {{ selectedSupplier.dueDateValue }} setiap bulan
          </span>
        </p>
      </div>

      <div>
        <label class="label">Tanggal Pembelian *</label>
        <input
          v-model="formData.purchaseDate"
          type="date"
          class="input"
          :max="today"
          required
        />
      </div>
    </div>

    <!-- Items -->
    <div class="card mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg">Daftar Barang</h3>
        <button type="button" @click="addItem" class="btn btn-secondary">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Item
        </button>
      </div>

      <div class="space-y-4">
        <div
          v-for="(item, index) in formData.items"
          :key="index"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-start gap-4">
            <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="label">Nama Barang *</label>
                <input
                  v-model="item.name"
                  type="text"
                  class="input"
                  placeholder="Contoh: Beras 5kg"
                  required
                />
              </div>
              <div>
                <label class="label">Jumlah *</label>
                <input
                  v-model.number="item.quantity"
                  type="number"
                  min="1"
                  step="1"
                  class="input"
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <label class="label">Harga Satuan *</label>
                <input
                  v-model.number="item.unitPrice"
                  type="number"
                  min="0"
                  step="100"
                  class="input"
                  placeholder="0"
                  required
                />
              </div>
            </div>
            <button
              v-if="formData.items.length > 1"
              type="button"
              @click="removeItem(index)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-6"
              title="Hapus item"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
          <div class="mt-2 text-right">
            <span class="text-sm text-gray-600">Subtotal: </span>
            <span class="font-semibold">{{ formatCurrency(item.quantity * item.unitPrice) }}</span>
          </div>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-200">
        <div class="flex justify-between items-center">
          <span class="text-lg font-semibold">Total</span>
          <span class="text-2xl font-bold text-indigo-600">{{ formatCurrency(totalAmount) }}</span>
        </div>
      </div>
    </div>

    <!-- Notes -->
    <div class="card mb-6">
      <h3 class="font-semibold text-lg mb-4">Catatan (Opsional)</h3>
      <textarea
        v-model="formData.notes"
        class="input"
        rows="3"
        placeholder="Tambahkan catatan jika diperlukan..."
      ></textarea>
    </div>

    <!-- Summary -->
    <div v-if="selectedSupplier && formData.purchaseDate" class="card mb-6 bg-indigo-50 border-indigo-200">
      <h3 class="font-semibold text-lg mb-3">Ringkasan</h3>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-700">Supplier:</span>
          <span class="font-semibold">{{ selectedSupplier.name }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-700">Tanggal Pembelian:</span>
          <span class="font-semibold">{{ formatDate(formData.purchaseDate) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-700">Jatuh Tempo:</span>
          <span class="font-semibold text-red-600">{{ formatDate(calculatedDueDate) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-700">Total Item:</span>
          <span class="font-semibold">{{ formData.items.length }} item</span>
        </div>
        <div class="flex justify-between pt-2 border-t border-indigo-300">
          <span class="text-gray-700">Total Pembayaran:</span>
          <span class="font-bold text-lg text-indigo-600">{{ formatCurrency(totalAmount) }}</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-4">
      <button type="button" @click="$emit('cancel')" class="btn btn-secondary flex-1">
        Batal
      </button>
      <button type="submit" class="btn btn-primary flex-1" :disabled="!isFormValid">
        Simpan Barang Masuk
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Supplier, IncomingGoodsItem } from '~/types/supplier'

const props = defineProps<{
  suppliers: Supplier[]
  initialData?: any
}>()

const emit = defineEmits<{
  submit: [data: any]
  cancel: []
}>()

const { formatCurrency, formatDate } = useDateHelpers()
const store = useSupplierStore() // Needed for calculateDueDate

const today = new Date().toISOString().split('T')[0]

const formData = ref({
  supplierId: '',
  purchaseDate: today,
  items: [
    { name: '', quantity: 1, unitPrice: 0 }
  ] as Omit<IncomingGoodsItem, 'id' | 'subtotal'>[],
  notes: ''
})

// Initialize if editing
watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = {
      supplierId: newData.supplierId,
      purchaseDate: newData.purchaseDate,
      items: JSON.parse(JSON.stringify(newData.items)), // Deep copy
      notes: newData.notes || ''
    }
  }
}, { immediate: true })

const selectedSupplier = computed(() => {
  if (!formData.value.supplierId) return null
  return props.suppliers.find(s => s.id === formData.value.supplierId)
})

const calculatedDueDate = computed(() => {
  if (!selectedSupplier.value || !formData.value.purchaseDate) return ''
  return store.calculateDueDate(formData.value.purchaseDate, selectedSupplier.value)
})

const totalAmount = computed(() => {
  return formData.value.items.reduce((sum, item) => {
    return sum + (item.quantity * item.unitPrice)
  }, 0)
})

const isFormValid = computed(() => {
  return formData.value.supplierId &&
    formData.value.purchaseDate &&
    formData.value.items.length > 0 &&
    formData.value.items.every(item => item.name && item.quantity > 0 && item.unitPrice >= 0) &&
    totalAmount.value > 0
})

const addItem = () => {
  formData.value.items.push({
    name: '',
    quantity: 1,
    unitPrice: 0
  })
}

const removeItem = (index: number) => {
  formData.value.items.splice(index, 1)
}

const handleSubmit = () => {
  emit('submit', {
    supplierId: formData.value.supplierId,
    purchaseDate: formData.value.purchaseDate,
    items: formData.value.items,
    notes: formData.value.notes || undefined
  })
}
</script>
