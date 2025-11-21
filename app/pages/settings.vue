<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Pengaturan</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2 text-lg">Konfigurasi aplikasi dan sinkronisasi data</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Google Sheets Integration -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
          <div
            class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          Integrasi Google Sheets
        </h3>

        <div class="space-y-6">
          <div>
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">URL Google Apps
              Script</label>
            <input v-model="settings.googleSheetsUrl" type="url"
              class="w-full px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="https://script.google.com/macros/s/..." />
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              URL deployment Google Apps Script untuk sinkronisasi data
            </p>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
            <div>
              <span class="block text-sm font-medium text-gray-900 dark:text-white">Auto-sync</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Sinkronisasi otomatis saat ada perubahan</span>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.autoSync" class="sr-only peer">
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600">
              </div>
            </label>
          </div>

          <div class="flex gap-3">
            <button @click="syncToSheets" :disabled="!settings.googleSheetsUrl || isSyncing"
              class="flex-1 btn bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-lg shadow-emerald-500/20 px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:transform-none">
              <svg v-if="!isSyncing" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <svg v-else class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {{ isSyncing ? 'Menyinkronkan...' : 'Upload' }}
            </button>
            <button @click="loadFromSheets" :disabled="!settings.googleSheetsUrl || isSyncing"
              class="flex-1 btn bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600 px-4 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-sm disabled:opacity-50">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>

          <div v-if="settings.lastSyncedAt"
            class="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1 bg-gray-50 dark:bg-gray-700/30 py-2 rounded-lg">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Terakhir disinkronkan: <span class="font-medium text-emerald-600 dark:text-emerald-400">{{
              formatLastSync(settings.lastSyncedAt) }}</span>
          </div>
        </div>
      </div>

      <!-- Appearance Settings -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
          <div
            class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          Tampilan
        </h3>

        <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-lg bg-white dark:bg-gray-600 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-500">
              <svg v-if="!isDark" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <span class="block text-sm font-medium text-gray-900 dark:text-white">Mode Gelap</span>
              <span class="text-xs text-gray-500 dark:text-gray-400">Tema gelap untuk kenyamanan mata</span>
            </div>
          </div>
          <button @click="toggleDarkMode" type="button" :class="[
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2',
            isDark ? 'bg-emerald-600' : 'bg-gray-200 dark:bg-gray-600'
          ]">
            <span :class="[
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
              isDark ? 'translate-x-5' : 'translate-x-0'
            ]" />
          </button>
        </div>
      </div>

      <!-- Notification Settings -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
          <div
            class="w-8 h-8 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
          Pengaturan Notifikasi
        </h3>

        <div>
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Notifikasi Jatuh Tempo (Hari
            Sebelumnya)</label>
          <div class="flex items-center gap-3">
            <input v-model.number="settings.notificationDays" type="number" min="1" max="30"
              class="w-24 px-4 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-gray-900 dark:text-white text-center font-bold" />
            <span class="text-gray-600 dark:text-gray-400">Hari</span>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Notifikasi akan muncul {{ settings.notificationDays }} hari sebelum jatuh tempo
          </p>
        </div>
      </div>

      <!-- Payment Settings -->
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
          <div
            class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          Pengaturan Pembayaran
        </h3>

        <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
          <div>
            <span class="block text-sm font-medium text-gray-900 dark:text-white">Pembayaran Cicilan</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">Aktifkan fitur pembayaran bertahap</span>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="settings.enablePartialPayment" class="sr-only peer">
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600">
            </div>
          </label>
        </div>
        <p class="text-xs text-amber-600 dark:text-amber-400 mt-2 flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Fitur ini akan tersedia di update mendatang
        </p>
      </div>

      <!-- Data Management -->
      <div
        class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <h3 class="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
          <div
            class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          Manajemen Data
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            class="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <button @click="exportData" class="w-full flex flex-col items-center gap-3 text-center">
              <div
                class="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <span class="block font-semibold text-gray-900 dark:text-white">Export Data</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">Download backup JSON</span>
              </div>
            </button>
          </div>

          <div
            class="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <label class="w-full flex flex-col items-center gap-3 text-center cursor-pointer">
              <div
                class="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <div>
                <span class="block font-semibold text-gray-900 dark:text-white">Import Data</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">Restore dari file JSON</span>
              </div>
              <input type="file" accept=".json" class="hidden" @change="importData" />
            </label>
          </div>

          <div
            class="p-4 border border-red-200 dark:border-red-800/50 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
            <button @click="clearAllData" class="w-full flex flex-col items-center gap-3 text-center">
              <div
                class="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <span class="block font-semibold text-red-600 dark:text-red-400">Hapus Data</span>
                <span class="text-xs text-red-500 dark:text-red-400/70">Reset semua data aplikasi</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end mt-8 pb-12">
      <button @click="saveSettings"
        class="btn bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-none shadow-lg shadow-emerald-500/20 px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 relative overflow-hidden group">
        <span class="relative z-10 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Simpan Pengaturan
        </span>
        <!-- Shine effect -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700">
        </div>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const store = useSupplierStore()
const { success, danger, warning } = useNotifications()
const { isDark, toggleDarkMode } = useDarkMode()

// Use store settings directly to ensure reactivity
const settings = toRef(store, 'settings')
const isSyncing = ref(false)
const now = ref(new Date())

// Update "now" every minute to keep "ago" text fresh
let timer: ReturnType<typeof setInterval>
onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 60000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const saveSettings = () => {
  store.saveToLocalStorage()
  success('Berhasil', 'Pengaturan berhasil disimpan')
}

const syncToSheets = async () => {
  if (!settings.value.googleSheetsUrl) {
    warning('Perhatian', 'Masukkan URL Google Apps Script terlebih dahulu')
    return
  }

  isSyncing.value = true
  try {
    await store.syncToGoogleSheets()
    success('Berhasil', 'Data berhasil disinkronkan ke Google Sheets')
    // Force update "now" to immediately show "Baru saja"
    now.value = new Date()
  } catch (error: any) {
    danger('Gagal', 'Gagal sinkronisasi: ' + error.message)
  } finally {
    isSyncing.value = false
  }
}

const loadFromSheets = async () => {
  if (!settings.value.googleSheetsUrl) {
    warning('Perhatian', 'Masukkan URL Google Apps Script terlebih dahulu')
    return
  }

  if (!confirm('Data lokal akan ditimpa dengan data dari Google Sheets. Lanjutkan?')) {
    return
  }

  isSyncing.value = true
  try {
    await store.loadFromGoogleSheets()
    success('Berhasil', 'Data berhasil dimuat dari Google Sheets')
  } catch (error: any) {
    danger('Gagal', 'Gagal memuat data: ' + error.message)
  } finally {
    isSyncing.value = false
  }
}

const exportData = () => {
  const data = store.exportData()
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `supplier-data-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
  success('Berhasil', 'Data berhasil diexport')
}

const importData = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string)
      store.importData(data)
      success('Berhasil', 'Data berhasil diimport')
      // Reset input
      input.value = ''
    } catch (error) {
      danger('Gagal', 'File JSON tidak valid')
    }
  }
  reader.readAsText(file)
}

const clearAllData = () => {
  if (!confirm('Yakin ingin menghapus SEMUA data? Tindakan ini tidak dapat dibatalkan!')) {
    return
  }

  if (!confirm('Konfirmasi sekali lagi: Semua data supplier dan barang masuk akan dihapus permanen!')) {
    return
  }

  store.clearAllData()
  success('Berhasil', 'Semua data berhasil dihapus')
}

const formatLastSync = (isoString: string) => {
  const date = new Date(isoString)
  const diffMs = now.value.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Baru saja'
  if (diffMins < 60) return `${diffMins} menit yang lalu`
  if (diffHours < 24) return `${diffHours} jam yang lalu`
  if (diffDays < 7) return `${diffDays} hari yang lalu`

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
