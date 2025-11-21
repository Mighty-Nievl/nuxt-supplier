# 📦 Nuxt Supplier Management System

Aplikasi manajemen supplier dan barang masuk yang dibangun dengan Nuxt 3, Vue 3, TypeScript, dan Tailwind CSS. Sistem ini membantu Anda mengelola data supplier, mencatat barang masuk, melacak hutang, dan mengelola pembayaran dengan mudah.

## ✨ Fitur Utama

### 🏢 Manajemen Supplier
- ✅ Tambah, edit, dan hapus data supplier
- ✅ Pengaturan jatuh tempo fleksibel (tanggal spesifik, hari, minggu, bulan)
- ✅ Statistik supplier (total pembelian, hutang, invoice belum lunas)
- ✅ Pencarian dan sorting supplier
- ✅ Navigasi cepat ke halaman barang masuk per supplier

### 📥 Barang Masuk
- ✅ Catat barang masuk dengan detail item
- ✅ Perhitungan otomatis jatuh tempo berdasarkan pengaturan supplier
- ✅ Perhitungan otomatis subtotal dan total
- ✅ Filter berdasarkan supplier, status pembayaran, dan tanggal
- ✅ Sorting berdasarkan berbagai kriteria
- ✅ Edit dan hapus transaksi barang masuk
- ✅ Tampilan detail lengkap per transaksi

### 💰 Pembayaran
- ✅ Daftar invoice yang belum lunas
- ✅ Notifikasi jatuh tempo (sudah jatuh tempo, hari ini, besok, minggu ini)
- ✅ Pencatatan pembayaran
- ✅ Filter berdasarkan supplier dan status jatuh tempo
- ✅ Statistik pembayaran (total hutang, sudah jatuh tempo, dll)

### 📊 Dashboard
- ✅ Ringkasan statistik (total supplier, barang masuk, hutang)
- ✅ Daftar invoice yang akan jatuh tempo
- ✅ Daftar supplier dengan hutang terbesar
- ✅ Akses cepat ke fitur-fitur utama

### ⚙️ Pengaturan
- ✅ Konfigurasi notifikasi jatuh tempo
- ✅ Integrasi Google Sheets (opsional)
- ✅ Auto-sync dengan Google Sheets
- ✅ Export/import data
- ✅ Mode gelap/terang

## 🛠️ Teknologi yang Digunakan

- **Framework**: [Nuxt 3](https://nuxt.com/) - Framework Vue.js yang powerful
- **UI Framework**: [Vue 3](https://vuejs.org/) dengan Composition API
- **State Management**: [Pinia](https://pinia.vuejs.org/) - Store yang modern dan type-safe
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Type Safety**: [TypeScript](https://www.typescriptlang.org/) - JavaScript dengan type checking
- **Utilities**: 
  - [VueUse](https://vueuse.org/) - Collection of Vue Composition Utilities
  - [date-fns](https://date-fns.org/) - Modern JavaScript date utility library

## 📋 Prasyarat

Pastikan Anda sudah menginstal:
- **Node.js** versi 18.x atau lebih tinggi
- **npm**, **pnpm**, **yarn**, atau **bun** sebagai package manager

## 🚀 Instalasi

1. **Clone repository** (jika dari Git):
```bash
git clone <repository-url>
cd nuxt-supplier
```

2. **Install dependencies**:
```bash
# Menggunakan npm
npm install

# Menggunakan pnpm (recommended)
pnpm install

# Menggunakan yarn
yarn install

# Menggunakan bun
bun install
```

## 💻 Development

Jalankan development server di `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## 🏗️ Production

### Build untuk Production

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

### Preview Production Build

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

## 📁 Struktur Proyek

```
nuxt-supplier/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css          # Global styles & Tailwind
│   ├── components/
│   │   ├── DeleteConfirmationModal.vue
│   │   ├── IncomingGoodsForm.vue
│   │   ├── IncomingGoodsTable.vue
│   │   ├── SupplierCard.vue
│   │   └── SupplierForm.vue
│   ├── composables/
│   │   ├── useDateHelpers.ts    # Helper untuk tanggal & currency
│   │   └── useNotifications.ts  # Sistem notifikasi
│   ├── pages/
│   │   ├── incoming-goods/
│   │   │   ├── [id].vue         # Detail barang masuk
│   │   │   ├── index.vue        # Daftar barang masuk
│   │   │   └── new.vue          # Tambah barang masuk
│   │   ├── payments/
│   │   │   └── index.vue        # Halaman pembayaran
│   │   ├── settings.vue         # Pengaturan aplikasi
│   │   ├── suppliers/
│   │   │   └── index.vue        # Manajemen supplier
│   │   └── index.vue            # Dashboard
│   ├── stores/
│   │   └── supplier.ts          # Pinia store
│   ├── types/
│   │   └── supplier.ts          # TypeScript type definitions
│   └── app.vue                  # Root component
├── public/                      # Static assets
├── nuxt.config.ts              # Konfigurasi Nuxt
├── tailwind.config.js          # Konfigurasi Tailwind
├── tsconfig.json               # Konfigurasi TypeScript
└── package.json                # Dependencies & scripts
```

## 🎨 Fitur UI/UX

- **Responsive Design** - Tampilan optimal di desktop, tablet, dan mobile
- **Dark Mode** - Mode gelap yang nyaman untuk mata
- **Smooth Animations** - Transisi dan animasi yang halus
- **Modern Glassmorphism** - Desain modern dengan efek glass
- **Interactive Components** - Komponen yang interaktif dengan hover effects
- **Toast Notifications** - Notifikasi yang informatif dan tidak mengganggu

## 💾 Penyimpanan Data

Data disimpan di **localStorage** browser dengan struktur:
- `suppliers` - Data supplier
- `incomingGoods` - Data barang masuk
- `settings` - Pengaturan aplikasi

### Integrasi Google Sheets (Opsional)

Aplikasi mendukung sinkronisasi dengan Google Sheets:
1. Buka halaman **Settings**
2. Masukkan **Google Sheets URL** (Apps Script URL)
3. Aktifkan **Auto Sync** jika diinginkan
4. Gunakan tombol **Sync Now** untuk sinkronisasi manual

## 🔧 Konfigurasi

### Tailwind CSS
Konfigurasi Tailwind dapat diubah di `tailwind.config.js` untuk menyesuaikan:
- Warna tema
- Font
- Breakpoints
- Dan lainnya

### Nuxt Config
Konfigurasi Nuxt di `nuxt.config.ts` untuk:
- Modules
- App metadata
- Build options
- Runtime config

## 📝 Penggunaan

### 1. Tambah Supplier
1. Buka halaman **Suppliers**
2. Klik tombol **Tambah Supplier**
3. Isi nama supplier dan pengaturan jatuh tempo
4. Klik **Simpan**

### 2. Catat Barang Masuk
1. Buka halaman **Barang Masuk**
2. Klik tombol **Tambah Barang Masuk**
3. Pilih supplier
4. Tambahkan item barang dengan nama, jumlah, dan harga
5. Isi catatan jika diperlukan
6. Klik **Simpan**

### 3. Catat Pembayaran
1. Buka halaman **Pembayaran**
2. Cari invoice yang ingin dibayar
3. Klik tombol **Bayar**
4. Konfirmasi pembayaran

## 🤝 Kontribusi

Kontribusi selalu diterima! Silakan:
1. Fork repository
2. Buat branch fitur (`git checkout -b fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin fitur-baru`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini bersifat private dan untuk penggunaan internal.

## 📞 Kontak & Dukungan

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Dibuat dengan ❤️ menggunakan Nuxt 3 & Vue 3**
