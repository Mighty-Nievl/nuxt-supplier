<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <NuxtLink to="/incoming-goods" class="text-emerald-600 hover:text-emerald-700 mb-2 inline-flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </NuxtLink>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Catat Barang Masuk</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Tambahkan pembelian baru dari supplier</p>
    </div>

    <IncomingGoodsForm
      :suppliers="store.suppliers"
      @submit="handleSubmit"
      @cancel="router.push('/incoming-goods')"
    />
  </div>
</template>

<script setup lang="ts">
const store = useSupplierStore()
const router = useRouter()
const { success, danger } = useNotifications()

const handleSubmit = (data: any) => {
  try {
    store.addIncomingGoods({
      supplierId: data.supplierId,
      purchaseDate: data.purchaseDate,
      items: data.items,
      notes: data.notes
    })
    
    success('Berhasil', 'Barang masuk berhasil dicatat')
    router.push('/incoming-goods')
  } catch (error: any) {
    danger('Gagal', error.message)
  }
}
</script>
