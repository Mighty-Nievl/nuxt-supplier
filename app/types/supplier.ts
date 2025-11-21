// Type definitions for Supplier Management System

export type DueDateType = 'date' | 'days' | 'weeks' | 'months'

export interface Supplier {
  id: string
  name: string
  dueDateType: DueDateType // 'date' | 'days' | 'weeks' | 'months'
  dueDateValue: string | number // tanggal spesifik (1-31) atau jumlah (hari/minggu/bulan)
  collectionDay?: number // 0-6 (0=Minggu, 1=Senin, dst) - opsional, hari penagihan
  additionalWeeks?: number // 0-52 - opsional, tambahan minggu setelah collection day
  createdAt: string
  updatedAt: string
}

export interface IncomingGoodsItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export type PaymentStatus = 'unpaid' | 'paid'

export interface IncomingGoods {
  id: string
  supplierId: string
  supplierName: string // denormalized untuk display
  purchaseDate: string // ISO date string
  items: IncomingGoodsItem[]
  totalAmount: number
  dueDate: string // ISO date string, calculated from supplier settings
  paymentStatus: PaymentStatus
  notes?: string
  createdAt: string
  updatedAt: string
  paidAt?: string // timestamp when payment was recorded
}

export interface Payment {
  id: string
  incomingGoodsId: string
  amount: number
  paidAt: string
  notes?: string
}

export interface AppSettings {
  enablePartialPayment: boolean // toggle untuk future use
  notificationDays: number // berapa hari sebelum jatuh tempo (default: 7)
  googleSheetId?: string // ID Google Sheet untuk reference
  googleApiKey?: string // Google API Key for Sheets API
  googleSheetsUrl?: string // Apps Script URL
  autoSync: boolean
  lastSyncedAt?: string // ISO timestamp of last successful sync
}

export interface SupplierStats {
  totalPurchases: number
  totalDebt: number
  unpaidInvoices: number
}

// Google Sheets data structure
export interface SheetsSupplier {
  id: string
  name: string
  dueDateType: string
  dueDateValue: string
  createdAt: string
  updatedAt: string
}

export interface SheetsIncomingGoods {
  id: string
  supplierId: string
  supplierName: string
  purchaseDate: string
  items: string // JSON stringified
  totalAmount: string
  dueDate: string
  paymentStatus: string
  notes: string
  createdAt: string
  updatedAt: string
  paidAt: string
}
