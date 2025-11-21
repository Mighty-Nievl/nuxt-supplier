<template>
  <form @submit.prevent="handleSubmit" class="max-w-5xl mx-auto">
    <!-- Supplier Selection -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        Informasi Supplier
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Pilih Supplier *</label>
          <div class="relative">
            <select v-model="formData.supplierId" required
              class="w-full pl-4 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 dark:text-white appearance-none cursor-pointer">
              <option value="">-- Pilih Supplier --</option>
              <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                {{ supplier.name }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <p v-if="selectedSupplier"
            class="text-sm text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span v-if="selectedSupplier.dueDateType === 'days'">
              Jatuh tempo: {{ selectedSupplier.dueDateValue }} hari setelah pembelian
            </span>
            <span v-else>
              Jatuh tempo: Tanggal {{ selectedSupplier.dueDateValue }} setiap bulan
            </span>
          </p>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tanggal Pembelian *</label>
          <input v-model="formData.purchaseDate" type="date" :max="today" required
            class="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 dark:text-white" />
        </div>
      </div>
    </div>

    <!-- Items Table (Spreadsheet Style) -->
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6 overflow-hidden">
      <div
        class="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
        <h3 class="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <div
            class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          Daftar Barang
        </h3>
        <button type="button" @click="addItem"
          class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-all flex items-center gap-2 shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Item
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead
            class="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th scope="col" class="px-6 py-3 w-12 text-center">#</th>
              <th scope="col" class="px-6 py-3">Nama Barang</th>
              <th scope="col" class="px-6 py-3 w-32 text-center">Jumlah</th>
              <th scope="col" class="px-6 py-3 w-48 text-right">Harga Satuan</th>
              <th scope="col" class="px-6 py-3 w-48 text-right">Subtotal</th>
              <th scope="col" class="px-6 py-3 w-16 text-center"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="(item, index) in formData.items" :key="index"
              class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
              <td class="px-6 py-4 text-center text-gray-400 dark:text-gray-500 font-mono text-xs">
                {{ index + 1 }}
              </td>
              <td class="p-0">
                <input v-model="item.name" type="text" placeholder="Nama barang..." required
                  :ref="(el) => setInputRef(el, index, 'name')" @keydown="(e) => handleKeydown(e, index, 'name')"
                  class="w-full h-full px-6 py-4 bg-transparent border-0 focus:ring-2 focus:ring-inset focus:ring-emerald-500 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
              </td>
              <td class="p-0">
                <input v-model.number="item.quantity" type="number" min="1" step="1" placeholder="0" required
                  :ref="(el) => setInputRef(el, index, 'quantity')"
                  @keydown="(e) => handleKeydown(e, index, 'quantity')"
                  class="w-full h-full px-6 py-4 bg-transparent border-0 focus:ring-2 focus:ring-inset focus:ring-emerald-500 text-center text-gray-900 dark:text-white" />
              </td>
              <td class="p-0">
                <div class="relative h-full">
                  <span
                    class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">Rp</span>
                  <input v-model.number="item.unitPrice" type="number" min="0" step="100" placeholder="0" required
                    :ref="(el) => setInputRef(el, index, 'unitPrice')"
                    @keydown="(e) => handleKeydown(e, index, 'unitPrice')"
                    class="w-full h-full pl-10 pr-6 py-4 bg-transparent border-0 focus:ring-2 focus:ring-inset focus:ring-emerald-500 text-right text-gray-900 dark:text-white" />
                </div>
              </td>
              <td
                class="px-6 py-4 text-right font-medium text-gray-900 dark:text-white bg-gray-50/30 dark:bg-gray-700/30">
                {{ formatCurrency(item.quantity * item.unitPrice) }}
              </td>
              <td class="px-2 py-4 text-center">
                <button v-if="formData.items.length > 1" type="button" @click="removeItem(index)"
                  class="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Hapus item">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot
            class="bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-white">
            <tr>
              <td colspan="4"
                class="px-6 py-4 text-right text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">Total
                Keseluruhan</td>
              <td class="px-6 py-4 text-right text-lg text-emerald-600 dark:text-emerald-400">{{
                formatCurrency(totalAmount) }}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Add Row Button (Bottom) -->
      <div class="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30">
        <button type="button" @click="addItem"
          class="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:border-emerald-500 hover:text-emerald-600 dark:hover:border-emerald-500 dark:hover:text-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all flex items-center justify-center gap-2 font-medium group">
          <svg class="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Baris Baru
        </button>
      </div>
    </div>

    <!-- Notes -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
      <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        Catatan (Opsional)
      </h3>
      <textarea v-model="formData.notes" rows="2" placeholder="Tambahkan catatan jika diperlukan..."
        class="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"></textarea>
    </div>

    <!-- Summary -->
    <div v-if="selectedSupplier && formData.purchaseDate"
      class="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/20 dark:to-gray-800 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800/30 mb-8 shadow-sm">
      <h3 class="font-bold text-lg text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-2">
        <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        Ringkasan Transaksi
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm">
        <div class="flex justify-between border-b border-emerald-100 dark:border-emerald-800/30 pb-2">
          <span class="text-gray-600 dark:text-gray-400">Supplier</span>
          <span class="font-semibold text-gray-900 dark:text-white">{{ selectedSupplier.name }}</span>
        </div>
        <div class="flex justify-between border-b border-emerald-100 dark:border-emerald-800/30 pb-2">
          <span class="text-gray-600 dark:text-gray-400">Tanggal Pembelian</span>
          <span class="font-semibold text-gray-900 dark:text-white">{{ formatDate(formData.purchaseDate) }}</span>
        </div>
        <div class="flex justify-between border-b border-emerald-100 dark:border-emerald-800/30 pb-2">
          <span class="text-gray-600 dark:text-gray-400">Jatuh Tempo</span>
          <span class="font-bold text-red-600 dark:text-red-400">{{ formatDate(calculatedDueDate) }}</span>
        </div>
        <div class="flex justify-between border-b border-emerald-100 dark:border-emerald-800/30 pb-2">
          <span class="text-gray-600 dark:text-gray-400">Total Item</span>
          <span class="font-semibold text-gray-900 dark:text-white">{{ formData.items.length }} item</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-4 pt-4">
      <button type="button" @click="$emit('cancel')"
        class="flex-1 px-6 py-3.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all transform hover:scale-105 active:scale-95 shadow-sm">
        Batal
      </button>
      <button type="submit" :disabled="!isFormValid"
        class="flex-1 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold shadow-xl shadow-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all transform hover:scale-105 active:scale-95 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
        <span class="relative z-10">Simpan Barang Masuk</span>
        <!-- Shine effect -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700">
        </div>
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

// Input Refs for Keyboard Navigation
const inputRefs = ref<HTMLInputElement[]>([])

// Function to set refs dynamically
const setInputRef = (el: any, index: number, field: string) => {
  if (el) {
    // Calculate a unique index for the flat array based on row and field
    // 0: name, 1: quantity, 2: unitPrice
    const fieldIndex = field === 'name' ? 0 : field === 'quantity' ? 1 : 2
    const flatIndex = index * 3 + fieldIndex
    inputRefs.value[flatIndex] = el
  }
}

const handleKeydown = (e: KeyboardEvent, rowIndex: number, field: string) => {
  const fieldIndex = field === 'name' ? 0 : field === 'quantity' ? 1 : 2
  const totalCols = 3
  const totalRows = formData.value.items.length
  const currentIndex = rowIndex * totalCols + fieldIndex

  let nextIndex = currentIndex

  switch (e.key) {
    case 'ArrowRight':
      if (fieldIndex < totalCols - 1) nextIndex = currentIndex + 1
      break
    case 'ArrowLeft':
      if (fieldIndex > 0) nextIndex = currentIndex - 1
      break
    case 'ArrowDown':
      if (rowIndex < totalRows - 1) nextIndex = currentIndex + totalCols
      else if (rowIndex === totalRows - 1) {
        // If at the last row, add a new row and focus its first input
        addItem()
        // Wait for DOM update then focus
        setTimeout(() => {
          const newIndex = (rowIndex + 1) * totalCols // First field of new row
          if (inputRefs.value[newIndex]) inputRefs.value[newIndex].focus()
        }, 50)
        return // Exit to avoid focusing immediately
      }
      break
    case 'ArrowUp':
      if (rowIndex > 0) nextIndex = currentIndex - totalCols
      break
    case 'Enter':
      e.preventDefault() // Prevent form submission
      if (rowIndex === totalRows - 1 && field === 'unitPrice') {
        // If at the last cell (unitPrice of last row), add new row
        addItem()
        setTimeout(() => {
          const newIndex = (rowIndex + 1) * totalCols
          if (inputRefs.value[newIndex]) inputRefs.value[newIndex].focus()
        }, 50)
        return
      } else if (fieldIndex < totalCols - 1) {
        nextIndex = currentIndex + 1
      } else if (rowIndex < totalRows - 1) {
        nextIndex = currentIndex + 1 // Move to next row's first cell
      }
      break
  }

  if (nextIndex !== currentIndex && inputRefs.value[nextIndex]) {
    e.preventDefault()
    inputRefs.value[nextIndex].focus()
  }
}

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
  // Clean up refs
  // Re-indexing happens automatically on re-render but good to keep in mind
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
