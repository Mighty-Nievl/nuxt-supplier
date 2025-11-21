<template>
  <div v-if="goods" class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <NuxtLink to="/incoming-goods"
          class="p-2.5 hover:bg-white dark:hover:bg-gray-800 rounded-xl transition-all group w-fit shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
          <svg
            class="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div class="flex-1">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Detail Barang Masuk</h1>
          <div class="flex items-center gap-2">
            <div
              class="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <p class="text-lg font-medium text-gray-700 dark:text-gray-300">{{ goods.supplierName }}</p>
          </div>
        </div>
        <div class="flex gap-3">
          <button v-if="!isEditing" @click="isEditing = true"
            class="btn bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button v-if="isEditing" @click="cancelEdit"
            class="btn bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm">
            Batal
          </button>
          <button v-if="isEditing" @click="saveChanges"
            class="btn bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-none shadow-lg shadow-emerald-500/20 px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 relative overflow-hidden group">
            <span class="relative z-10 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Simpan
            </span>
            <!-- Shine effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700">
            </div>
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Purchase Info -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <!-- Decorative background -->
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-emerald-50 dark:bg-emerald-900/10 rounded-bl-full -mr-8 -mt-8 pointer-events-none">
          </div>

          <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white relative z-10">
            <div
              class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            Informasi Pembelian
          </h3>

          <div class="space-y-5 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tanggal
                  Pembelian</label>
                <input v-if="isEditing" v-model="editForm.purchaseDate" type="date"
                  class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 dark:text-white" />
                <p v-else class="text-gray-900 dark:text-white font-medium text-lg">{{ formatDate(goods.purchaseDate) }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Tanggal Jatuh
                  Tempo</label>
                <p class="text-gray-900 dark:text-white font-medium text-lg">{{ formatDate(goods.dueDate) }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Catatan</label>
              <textarea v-if="isEditing" v-model="editForm.notes"
                class="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                rows="3" placeholder="Tambahkan catatan..."></textarea>
              <p v-else class="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl">{{
                goods.notes || 'Tidak ada catatan' }}</p>
            </div>
          </div>
        </div>

        <!-- Items -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <div
                class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              Daftar Barang
            </h3>
            <button v-if="isEditing" @click="addItem"
              class="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-xl font-medium flex items-center gap-2 transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Tambah Item
            </button>
          </div>

          <div class="space-y-3">
            <div v-for="(item, index) in editForm.items" :key="index" class="relative">
              <!-- Edit Mode -->
              <div v-if="isEditing"
                class="p-5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                <div class="grid grid-cols-12 gap-3">
                  <div class="col-span-5">
                    <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Nama Barang</label>
                    <input v-model="item.name" type="text"
                      class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="Nama barang" />
                  </div>
                  <div class="col-span-2">
                    <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Qty</label>
                    <input v-model.number="item.quantity" type="number"
                      class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="0" min="1" />
                  </div>
                  <div class="col-span-4">
                    <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Harga
                      Satuan</label>
                    <input v-model.number="item.unitPrice" type="number"
                      class="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                      placeholder="0" min="0" />
                  </div>
                  <div class="col-span-1 flex items-end justify-center pb-1">
                    <button @click="removeItem(index)"
                      class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="mt-2 text-right text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subtotal: <span class="text-emerald-600 dark:text-emerald-400 font-bold">{{
                    formatCurrency(getItemSubtotal(item)) }}</span>
                </div>
              </div>

              <!-- View Mode -->
              <div v-else
                class="p-5 bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all shadow-sm">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900 dark:text-white text-lg">{{ item.name }}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1.5 flex items-center gap-2">
                      <span class="bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded text-xs font-medium">{{
                        item.quantity }} item</span>
                      <span>×</span>
                      <span>{{ formatCurrency(item.unitPrice || 0) }}</span>
                    </p>
                  </div>
                  <p class="font-bold text-emerald-600 dark:text-emerald-400 text-lg">{{
                    formatCurrency(getItemSubtotal(item)) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Total -->
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div
              class="flex justify-between items-center bg-gradient-to-r from-emerald-50 to-transparent dark:from-emerald-900/20 dark:to-transparent p-4 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
              <span class="text-xl font-bold text-gray-900 dark:text-white">Total Pembayaran</span>
              <span class="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{{ formatCurrency(totalAmount)
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Payment Status -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
            <div
              class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            Status Pembayaran
          </h3>

          <div class="mb-6">
            <PaymentStatusBadge :status="goods.paymentStatus" class="text-sm w-full justify-center py-2" />
          </div>

          <div v-if="goods.paymentStatus === 'paid' && goods.paidAt"
            class="text-sm mb-6 bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
            <p class="font-semibold text-green-800 dark:text-green-300 mb-1 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Lunas pada:
            </p>
            <p class="text-green-700 dark:text-green-400 font-medium pl-6">{{ formatDate(goods.paidAt) }}</p>
          </div>

          <button v-if="goods.paymentStatus === 'unpaid'" @click="markAsPaid"
            class="btn bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-none shadow-lg shadow-emerald-500/20 px-5 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 w-full relative overflow-hidden group">
            <span class="relative z-10 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Tandai Sudah Dibayar
            </span>
            <!-- Shine effect -->
            <div
              class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700">
            </div>
          </button>
          <button v-else @click="markAsUnpaid"
            class="btn bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 px-5 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all w-full shadow-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Tandai Belum Dibayar
          </button>
        </div>

        <!-- Danger Zone -->
        <div
          class="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-200 dark:border-red-800/50 shadow-sm">
          <h3 class="text-xl font-bold mb-4 text-red-700 dark:text-red-400 flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            Danger Zone
          </h3>
          <p class="text-sm text-red-600 dark:text-red-400 mb-4 font-medium leading-relaxed">
            Menghapus data barang masuk tidak dapat dibatalkan dan akan mempengaruhi stok barang.
          </p>
          <button @click="confirmDelete"
            class="btn bg-white dark:bg-gray-800 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 px-5 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all w-full shadow-sm">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Hapus Barang Masuk
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div v-if="deleteConfirmation.show"
        class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
        @click.self="cancelDeleteModal">
        <div
          class="relative bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl transform transition-all">
          <!-- Decorative gradient blur -->
          <div class="absolute -top-20 -right-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>

          <!-- Warning Icon with animation -->
          <div class="relative flex items-center justify-center w-20 h-20 mx-auto mb-6">
            <!-- Pulsing background -->
            <div class="absolute inset-0 bg-red-500/20 dark:bg-red-500/30 rounded-full animate-ping"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded-full blur-xl"></div>

            <!-- Icon container -->
            <div
              class="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/40 dark:to-red-800/40 rounded-full shadow-lg shadow-red-500/30">
              <svg class="w-10 h-10 text-red-600 dark:text-red-500" fill="none" stroke="currentColor"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
          </div>

          <!-- Title -->
          <h3
            class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent text-center mb-3">
            Hapus Barang Masuk?
          </h3>

          <!-- Message -->
          <p class="text-gray-600 dark:text-gray-400 text-center mb-8 leading-relaxed">
            Tindakan ini akan menghapus data barang masuk secara permanen dan tidak dapat dibatalkan.
          </p>

          <!-- Actions -->
          <div class="flex gap-4">
            <button @click="cancelDeleteModal"
              class="flex-1 px-6 py-3.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all transform hover:scale-105 active:scale-95 shadow-sm">
              Batal
            </button>
            <button @click="executeDelete"
              class="flex-1 px-6 py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold shadow-xl shadow-red-500/40 hover:shadow-2xl hover:shadow-red-500/50 transition-all transform hover:scale-105 active:scale-95 relative overflow-hidden group">
              <span class="relative z-10">Hapus</span>
              <!-- Shine effect -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700">
              </div>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>

  <!-- Not Found -->
  <div v-else class="text-center py-20">
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl p-12 max-w-md mx-auto border border-gray-200 dark:border-gray-700 shadow-lg">
      <div class="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
        <svg class="w-10 h-10 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p class="text-gray-900 dark:text-white text-xl font-bold mb-2">Barang Masuk Tidak Ditemukan</p>
      <p class="text-gray-600 dark:text-gray-400 mb-8">Data yang Anda cari tidak tersedia atau telah dihapus.</p>
      <NuxtLink to="/incoming-goods"
        class="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-lg shadow-emerald-500/20 px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali ke Daftar
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IncomingGoodsItem } from '~/types/supplier'

const route = useRoute()
const router = useRouter()
const store = useSupplierStore()
const { success, danger } = useNotifications()
const { formatDate, formatCurrency } = useDateHelpers()

const id = route.params.id as string
const goods = computed(() => store.incomingGoods.find(g => g.id === id))

const isEditing = ref(false)
const editForm = ref({
  purchaseDate: '',
  notes: '',
  items: [] as IncomingGoodsItem[]
})

const deleteConfirmation = ref({
  show: false
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

const confirmDelete = () => {
  deleteConfirmation.value.show = true
}

const cancelDeleteModal = () => {
  deleteConfirmation.value.show = false
}

const executeDelete = () => {
  if (store.deleteIncomingGoods(id)) {
    success('Berhasil', 'Barang masuk berhasil dihapus')
    router.push('/incoming-goods')
  }
  cancelDeleteModal()
}
</script>
