<template>
  <form @submit.prevent="handleSubmit">
    <!-- Nama Supplier -->
    <div class="mb-4">
      <label class="label">Nama Supplier</label>
      <input
        v-model="formData.name"
        type="text"
        class="input"
        placeholder="Contoh: PT Sumber Rejeki"
        required
      />
    </div>

    <!-- Tipe Jatuh Tempo -->
    <div class="mb-4">
      <label class="label">Tipe Jatuh Tempo</label>
      <div class="flex gap-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="formData.dueDateType"
            type="radio"
            value="days"
            class="w-4 h-4 text-indigo-600"
          />
          <span>Jumlah Hari</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="formData.dueDateType"
            type="radio"
            value="date"
            class="w-4 h-4 text-indigo-600"
          />
          <span>Tanggal Spesifik</span>
        </label>
      </div>
    </div>

    <!-- Jatuh Tempo Value -->
    <div class="mb-6">
      <label class="label">
        {{ formData.dueDateType === 'days' ? 'Jumlah Hari' : 'Tanggal (1-31)' }}
      </label>
      <input
        v-if="formData.dueDateType === 'days'"
        v-model.number="formData.dueDateValue"
        type="number"
        min="1"
        max="365"
        class="input"
        placeholder="Contoh: 30"
        required
      />
      <input
        v-else
        v-model.number="formData.dueDateValue"
        type="number"
        min="1"
        max="31"
        class="input"
        placeholder="Contoh: 15 (tanggal 15 setiap bulan)"
        required
      />
      <p class="text-xs text-gray-500 mt-1">
        {{ formData.dueDateType === 'days' 
          ? 'Jatuh tempo dihitung dari tanggal pembelian' 
          : 'Jatuh tempo pada tanggal ini setiap bulan' 
        }}
      </p>
    </div>

    <!-- Actions -->
    <div class="flex gap-3">
      <button type="button" @click="$emit('cancel')" class="btn btn-secondary flex-1">
        Batal
      </button>
      <button type="submit" class="btn btn-primary flex-1">
        {{ isEditing ? 'Simpan' : 'Tambah' }}
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

const isEditing = computed(() => !!props.initialData)

const formData = ref({
  name: '',
  dueDateType: 'days' as DueDateType,
  dueDateValue: 30 as string | number
})

// Initialize form data if editing
watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = {
      name: newData.name,
      dueDateType: newData.dueDateType,
      dueDateValue: newData.dueDateValue
    }
  } else {
    resetForm()
  }
}, { immediate: true })

const resetForm = () => {
  formData.value = {
    name: '',
    dueDateType: 'days',
    dueDateValue: 30
  }
}

const handleSubmit = () => {
  emit('submit', {
    name: formData.value.name,
    dueDateType: formData.value.dueDateType,
    dueDateValue: formData.value.dueDateValue
  })
}
</script>
