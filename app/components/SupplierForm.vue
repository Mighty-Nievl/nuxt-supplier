<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <!-- Name Field -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Nama Supplier <span class="text-red-500">*</span>
      </label>
      <input
        v-model="formData.name"
        type="text"
        required
        placeholder="Masukkan nama supplier"
        class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>

    <!-- Due Date Type -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Tipe Jatuh Tempo <span class="text-red-500">*</span>
      </label>
      <select
        v-model="formData.dueDateType"
        required
        class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 dark:text-white cursor-pointer"
      >
        <option value="date">Tanggal Spesifik (1-31)</option>
        <option value="days">Jumlah Hari</option>
        <option value="weeks">Jumlah Minggu</option>
        <option value="months">Jumlah Bulan</option>
      </select>
    </div>

    <!-- Due Date Value -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {{ dueDateValueLabel }} <span class="text-red-500">*</span>
      </label>
      <input
        v-model="formData.dueDateValue"
        :type="formData.dueDateType === 'date' ? 'number' : 'number'"
        :min="formData.dueDateType === 'date' ? 1 : 1"
        :max="formData.dueDateType === 'date' ? 31 : undefined"
        required
        :placeholder="dueDateValuePlaceholder"
        class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
      />
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-3 pt-2">
      <button
        type="button"
        @click="$emit('cancel')"
        class="flex-1 px-6 py-2.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all transform hover:scale-105 active:scale-95"
      >
        Batal
      </button>
      <button
        type="submit"
        class="flex-1 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white rounded-xl font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all transform hover:scale-105 active:scale-95"
      >
        {{ initialData ? 'Update' : 'Simpan' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Supplier, DueDateType } from '~/types/supplier'

const props = defineProps<{
  initialData?: Supplier | null
}>()

const emit = defineEmits<{
  submit: [data: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>]
  cancel: []
}>()

const formData = reactive({
  name: props.initialData?.name || '',
  dueDateType: (props.initialData?.dueDateType || 'days') as DueDateType,
  dueDateValue: props.initialData?.dueDateValue || 30,
  collectionDay: props.initialData?.collectionDay,
  additionalWeeks: props.initialData?.additionalWeeks
})

const dueDateValueLabel = computed(() => {
  switch (formData.dueDateType) {
    case 'date':
      return 'Tanggal (1-31)'
    case 'days':
      return 'Jumlah Hari'
    case 'weeks':
      return 'Jumlah Minggu'
    case 'months':
      return 'Jumlah Bulan'
    default:
      return 'Nilai'
  }
})

const dueDateValuePlaceholder = computed(() => {
  switch (formData.dueDateType) {
    case 'date':
      return 'Contoh: 15 (untuk tanggal 15 setiap bulan)'
    case 'days':
      return 'Contoh: 30 (30 hari setelah pembelian)'
    case 'weeks':
      return 'Contoh: 4 (4 minggu setelah pembelian)'
    case 'months':
      return 'Contoh: 1 (1 bulan setelah pembelian)'
    default:
      return ''
  }
})

const handleSubmit = () => {
  emit('submit', {
    name: formData.name,
    dueDateType: formData.dueDateType,
    dueDateValue: formData.dueDateValue,
    collectionDay: formData.collectionDay,
    additionalWeeks: formData.additionalWeeks
  })
}
</script>
