<template>
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Supplier</th>
          <th>Total</th>
          <th>Jatuh Tempo</th>
          <th>Status</th>
          <th class="text-right">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="goods.length === 0">
          <td colspan="6" class="text-center text-gray-500 dark:text-gray-400 py-8">
            {{ emptyMessage }}
          </td>
        </tr>
        <tr
          v-for="item in goods"
          :key="item.id"
          class="cursor-pointer"
          @click="$emit('view', item.id)"
        >
          <td>{{ formatDate(item.purchaseDate) }}</td>
          <td>
            <div class="font-medium text-gray-900 dark:text-gray-100">{{ item.supplierName }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">{{ item.items.length }} item</div>
          </td>
          <td class="font-semibold text-gray-900 dark:text-gray-100">{{ formatCurrency(item.totalAmount) }}</td>
          <td>
            <div>{{ formatDate(item.dueDate) }}</div>
            <div class="text-xs" :class="getDueDateColor(item.dueDate, item.paymentStatus)">
              {{ formatRelativeDate(item.dueDate) }}
            </div>
          </td>
          <td>
            <PaymentStatusBadge :status="item.paymentStatus" :due-date="item.dueDate" />
          </td>
          <td class="text-right">
            <div class="flex justify-end gap-2">
              <button
                v-if="item.paymentStatus === 'unpaid'"
                @click.stop="confirmPayment(item.id)"
                class="btn btn-success btn-sm"
              >
                Tandai Lunas
              </button>
              <button
                v-else
                @click.stop="$emit('markUnpaid', item.id)"
                class="btn btn-secondary btn-sm"
              >
                Batalkan
              </button>
              <button
                @click.stop="$emit('delete', item.id)"
                class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                title="Hapus"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="showConfirmModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeConfirmModal"
      >
        <div class="bg-white dark:bg-gray-800 rounded-xl max-w-sm w-full p-6 text-center">
          <div class="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-6 h-6 text-green-600 dark:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">Konfirmasi Pembayaran</h3>
          
          <div class="flex gap-3 justify-center w-full">
            <button 
              @click="closeConfirmModal" 
              class="btn bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 w-36 font-bold flex justify-center items-center"
            >
              Batal
            </button>
            <button 
              @click="handleConfirm" 
              class="btn btn-success w-36 font-bold flex justify-center items-center"
            >
              LUNAS
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import type { IncomingGoods } from '~/types/supplier'

defineProps<{
  goods: IncomingGoods[]
  emptyMessage?: string
}>()

const emit = defineEmits<{
  view: [id: string]
  markPaid: [id: string]
  markUnpaid: [id: string]
  delete: [id: string]
}>()

const { formatDate, formatRelativeDate, formatCurrency, isOverdue, isUpcoming } = useDateHelpers()

const showConfirmModal = ref(false)
const confirmId = ref<string | null>(null)

const confirmPayment = (id: string) => {
  confirmId.value = id
  showConfirmModal.value = true
}

const closeConfirmModal = () => {
  showConfirmModal.value = false
  confirmId.value = null
}

const handleConfirm = () => {
  if (confirmId.value) {
    emit('markPaid', confirmId.value)
    closeConfirmModal()
  }
}

const getDueDateColor = (dueDate: string, status: 'paid' | 'unpaid') => {
  if (status === 'paid') return 'text-green-600 dark:text-green-500'
  if (isOverdue(dueDate)) return 'text-red-600 dark:text-red-500 font-semibold'
  if (isUpcoming(dueDate, 7)) return 'text-yellow-600 dark:text-yellow-500 font-semibold'
  return 'text-gray-500 dark:text-gray-400'
}
</script>

<style scoped>
.btn-sm {
  @apply px-3 py-1 text-sm;
}
</style>
