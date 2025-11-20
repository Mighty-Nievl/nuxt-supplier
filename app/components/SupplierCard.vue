<template>
  <div 
    @click="navigateToIncomingGoods"
    class="card cursor-pointer hover:shadow-md transition-shadow group"
  >
    <div class="flex items-start justify-between mb-4">
      <div>
        <h3 class="text-lg font-semibold group-hover:text-indigo-600 transition-colors">{{ supplier.name }}</h3>
        <p class="text-sm text-gray-500 mt-1">
          Jatuh Tempo: 
          <span v-if="supplier.dueDateType === 'days'">
            {{ supplier.dueDateValue }} hari setelah pembelian
          </span>
          <span v-else>
            Tanggal {{ formatDate(supplier.dueDateValue as string, 'd') }} setiap bulan
          </span>
        </p>
      </div>
      
      <div class="flex gap-2">
        <button
          @click.stop="$emit('edit', supplier.id)"
          class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
          title="Edit"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          @click.stop="$emit('delete', supplier.id)"
          class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Hapus"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
    
    <div v-if="stats" class="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
      <div>
        <p class="text-xs text-gray-500">Total Pembelian</p>
        <p class="text-lg font-semibold mt-1">{{ formatCurrency(stats.totalPurchases) }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-500">Total Hutang</p>
        <p class="text-lg font-semibold mt-1 text-red-600">{{ formatCurrency(stats.totalDebt) }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-500">Invoice Belum Lunas</p>
        <p class="text-lg font-semibold mt-1">{{ stats.unpaidInvoices }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Supplier, SupplierStats } from '~/types/supplier'

const props = defineProps<{
  supplier: Supplier
  stats?: SupplierStats
}>()

defineEmits<{
  edit: [id: string]
  delete: [id: string]
}>()

const { formatDate, formatCurrency } = useDateHelpers()
const router = useRouter()

const navigateToIncomingGoods = () => {
  router.push({
    path: '/incoming-goods',
    query: { supplierId: props.supplier.id }
  })
}
</script>
