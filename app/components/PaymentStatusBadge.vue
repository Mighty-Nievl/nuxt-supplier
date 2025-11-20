<template>
  <span :class="['badge', badgeClass]">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import type { PaymentStatus } from '~/types/supplier'

const props = defineProps<{
  status: PaymentStatus
  dueDate?: string
}>()

const { getDueDateStatus } = useDateHelpers()

const badgeClass = computed(() => {
  if (props.status === 'paid') {
    return 'badge-success'
  }
  
  if (props.dueDate) {
    const status = getDueDateStatus(props.dueDate, props.status)
    return `badge-${status.color}`
  }
  
  return 'badge-info'
})

const label = computed(() => {
  if (props.status === 'paid') {
    return 'Lunas'
  }
  
  if (props.dueDate) {
    const status = getDueDateStatus(props.dueDate, props.status)
    return status.label
  }
  
  return 'Belum Lunas'
})
</script>
