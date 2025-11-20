<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">Pengaturan</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">Konfigurasi aplikasi dan sinkronisasi data</p>
    </div>

    <!-- Google Sheets Integration -->
    <div class="card mb-6">
      <h3 class="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">🔗 Integrasi Google Sheets</h3>
      
      <div class="mb-4">
        <label class="label">URL Google Apps Script</label>
        <input
          v-model="settings.googleSheetsUrl"
          type="url"
          class="input"
          placeholder="https://script.google.com/macros/s/..."
        />
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          URL deployment Google Apps Script untuk sinkronisasi data
        </p>
      </div>

      <div class="mb-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="settings.autoSync"
            type="checkbox"
            class="w-4 h-4 text-indigo-600 rounded"
          />
          <span class="text-sm font-medium text-gray-900 dark:text-gray-100">Auto-sync ke Google Sheets</span>
        </label>
        <p class="text-xs text-gray-500 dark:text-gray-400 ml-6">
          Otomatis sinkronkan data setiap kali ada perubahan
        </p>
      </div>

      <div class="flex gap-3">
        <button
          @click="syncToSheets"
          :disabled="!settings.googleSheetsUrl || isSyncing"
          class="btn btn-primary"
        >
          <svg v-if="!isSyncing" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          <svg v-else class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {{ isSyncing ? 'Menyinkronkan...' : 'Upload ke Sheets' }}
        </button>
        <button
          @click="loadFromSheets"
          :disabled="!settings.googleSheetsUrl || isSyncing"
          class="btn btn-secondary"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download dari Sheets
        </button>
      </div>

      <div v-if="settings.lastSyncedAt" class="mt-4 text-sm text-gray-600 dark:text-gray-400">
        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Terakhir disinkronkan: {{ formatLastSync(settings.lastSyncedAt) }}
      </div>
    </div>

    <!-- Appearance Settings -->
    <div class="card mb-6">
      <h3 class="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">🎨 Tampilan</h3>
      
      <div class="mb-4">
        <label class="flex items-center justify-between cursor-pointer group">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
              <svg v-if="!isDark" class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-900 dark:text-gray-100">Mode Gelap (Dark Mode)</span>
              <p class="text-xs text-gray-500 dark:text-gray-400">Aktifkan tema gelap untuk kenyamanan mata</p>
            </div>
          </div>
          <button
            @click="toggleDarkMode"
            type="button"
            :class="[
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
              isDark ? 'bg-indigo-600' : 'bg-gray-200'
            ]"
          >
            <span
              :class="[
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                isDark ? 'translate-x-5' : 'translate-x-0'
              ]"
            />
          </button>
        </label>
      </div>
    </div>

    <!-- Notification Settings -->
    <div class="card mb-6">
      <h3 class="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">🔔 Pengaturan Notifikasi</h3>
      
      <div class="mb-4">
        <label class="label">Notifikasi Jatuh Tempo (Hari Sebelumnya)</label>
        <input
          v-model.number="settings.notificationDays"
          type="number"
          min="1"
          max="30"
          class="input max-w-xs"
        />
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Notifikasi akan muncul {{ settings.notificationDays }} hari sebelum jatuh tempo
        </p>
      </div>
    </div>

    <!-- Payment Settings -->
    <div class="card mb-6">
      <h3 class="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">💰 Pengaturan Pembayaran</h3>
      
      <div class="mb-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            v-model="settings.enablePartialPayment"
            type="checkbox"
            class="w-4 h-4 text-indigo-600 rounded"
          />
          <span class="text-sm font-medium text-gray-900 dark:text-gray-100">Aktifkan Pembayaran Cicilan</span>
        </label>
        <p class="text-xs text-gray-500 dark:text-gray-400 ml-6">
          Fitur ini belum tersedia. Akan diaktifkan di update mendatang.
        </p>
      </div>
    </div>

    <!-- Data Management -->
    <div class="card mb-6">
      <h3 class="font-semibold text-lg mb-4 text-gray-900 dark:text-gray-100">💾 Manajemen Data</h3>
      
      <div class="flex flex-col gap-3">
        <div>
          <button @click="exportData" class="btn btn-outline">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export Data (JSON)
          </button>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Download semua data sebagai file JSON untuk backup
          </p>
        </div>

        <div>
          <label class="btn btn-outline cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Import Data (JSON)
            <input
              type="file"
              accept=".json"
              class="hidden"
              @change="importData"
            />
          </label>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Restore data dari file backup JSON
          </p>
        </div>

        <div class="pt-4 border-t border-gray-200 dark:border-gray-700">
          <button @click="clearAllData" class="btn btn-danger">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Hapus Semua Data
          </button>
          <p class="text-xs text-red-600 mt-1">
            ⚠️ Perhatian: Tindakan ini tidak dapat dibatalkan!
          </p>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="flex justify-end">
      <button @click="saveSettings" class="btn btn-primary">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Simpan Pengaturan
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
