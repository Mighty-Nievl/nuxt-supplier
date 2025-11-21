<template>
  <div @click="navigateToIncomingGoods"
    class="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 cursor-pointer overflow-hidden">
    <!-- Hover Gradient Background -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-transparent to-emerald-50/50 dark:to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
    </div>

    <div class="relative z-10">
      <!-- Header Section -->
      <div class="flex items-start justify-between mb-6">
        <div class="flex-1">
          <h3
            class="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {{ supplier.name }}
          </h3>
          <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Jatuh Tempo:
              <span v-if="supplier.dueDateType === 'days'" class="text-gray-900 dark:text-white font-semibold">
                {{ supplier.dueDateValue }} hari
              </span>
              <span v-else class="text-gray-900 dark:text-white font-semibold">
                Tanggal {{ formatDate(supplier.dueDateValue as string, 'd') }}
              </span>
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
          <button @click.stop="$emit('edit', supplier.id)"
            class="p-2.5 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-all hover:scale-110"
            title="Edit">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button @click.stop="$emit('delete', supplier.id)"
            class="p-2.5 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all hover:scale-110"
            title="Hapus">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Stats Section -->
      <div v-if="stats" class="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
        <!-- Total Pembelian -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total
              Pembelian</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">{{ formatCurrency(stats.totalPurchases) }}</p>
          </div>
        </div>

        <!-- Total Hutang -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total Hutang
            </p>
            <p class="text-xl font-bold text-red-600 dark:text-red-500">{{ formatCurrency(stats.totalDebt) }}</p>
          </div>
        </div>

        <!-- Invoice Belum Lunas -->
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Invoice
              Belum Lunas</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">{{ stats.unpaidInvoices }}</p>
          </div>
        </div>
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
