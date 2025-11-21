import { defineStore } from 'pinia'
import type {
  Supplier,
  IncomingGoods,
  IncomingGoodsItem,
  PaymentStatus,
  AppSettings,
  SupplierStats
} from '~/types/supplier'
import { addDays, addWeeks, addMonths, parseISO, formatISO } from 'date-fns'

const SUPPLIERS_KEY = 'suppliers'
const INCOMING_GOODS_KEY = 'incoming_goods'
const SETTINGS_KEY = 'app_settings'

export const useSupplierStore = defineStore('supplier', {
  state: () => ({
    suppliers: [] as Supplier[],
    incomingGoods: [] as IncomingGoods[],
    settings: {
      enablePartialPayment: false,
      notificationDays: 7,
      googleSheetId: '',
      googleApiKey: '',
      googleSheetsUrl: '',
      autoSync: false
    } as AppSettings,
    isLoading: false
  }),

  getters: {
    // Get all unpaid invoices
    unpaidInvoices: (state) => {
      return state.incomingGoods.filter(goods => goods.paymentStatus === 'unpaid')
    },

    // Get overdue invoices (past due date and unpaid)
    overdueInvoices: (state) => {
      const now = new Date()
      return state.incomingGoods.filter(goods => {
        if (goods.paymentStatus === 'paid') return false
        const dueDate = parseISO(goods.dueDate)
        return dueDate < now
      })
    },

    // Get upcoming due dates (within notification days)
    upcomingDueDates: (state) => {
      const now = new Date()
      const notificationDate = addDays(now, state.settings.notificationDays)

      return state.incomingGoods.filter(goods => {
        if (goods.paymentStatus === 'paid') return false
        const dueDate = parseISO(goods.dueDate)
        return dueDate >= now && dueDate <= notificationDate
      })
    },

    // Calculate total debt
    totalDebt: (state) => {
      return state.incomingGoods
        .filter(goods => goods.paymentStatus === 'unpaid')
        .reduce((sum, goods) => sum + goods.totalAmount, 0)
    },

    // Get statistics per supplier
    supplierStats: (state) => {
      const stats: Record<string, SupplierStats> = {}

      state.suppliers.forEach(supplier => {
        const supplierGoods = state.incomingGoods.filter(
          goods => goods.supplierId === supplier.id
        )

        stats[supplier.id] = {
          totalPurchases: supplierGoods.reduce((sum, goods) => sum + goods.totalAmount, 0),
          totalDebt: supplierGoods
            .filter(goods => goods.paymentStatus === 'unpaid')
            .reduce((sum, goods) => sum + goods.totalAmount, 0),
          unpaidInvoices: supplierGoods.filter(goods => goods.paymentStatus === 'unpaid').length
        }
      })

      return stats
    },

    // Get incoming goods by supplier
    getGoodsBySupplier: (state) => {
      return (supplierId: string) => {
        return state.incomingGoods.filter(goods => goods.supplierId === supplierId)
      }
    },

    // Get supplier by ID
    getSupplierById: (state) => {
      return (id: string) => {
        return state.suppliers.find(s => s.id === id)
      }
    },

    // Get incoming goods by ID
    getIncomingGoodsById: (state) => {
      return (id: string) => {
        return state.incomingGoods.find(g => g.id === id)
      }
    }
  },

  actions: {
    // ============ SUPPLIER CRUD ============

    addSupplier(supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) {
      const newSupplier: Supplier = {
        ...supplier,
        id: this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      this.suppliers.push(newSupplier)
      this.saveToLocalStorage()
      return newSupplier
    },

    updateSupplier(id: string, updates: Partial<Omit<Supplier, 'id' | 'createdAt'>>) {
      const index = this.suppliers.findIndex(s => s.id === id)
      if (index === -1) return false

      const current = this.suppliers[index]
      if (!current) return false
      
      this.suppliers[index] = {
        id: current.id,
        name: updates.name ?? current.name,
        dueDateType: updates.dueDateType ?? current.dueDateType,
        dueDateValue: updates.dueDateValue ?? current.dueDateValue,
        createdAt: current.createdAt,
        updatedAt: new Date().toISOString()
      }

      this.saveToLocalStorage()
      return true
    },

    deleteSupplier(id: string) {
      // Check if supplier has any incoming goods
      const hasGoods = this.incomingGoods.some(goods => goods.supplierId === id)
      if (hasGoods) {
        throw new Error('Tidak dapat menghapus supplier yang memiliki riwayat barang masuk')
      }

      const index = this.suppliers.findIndex(s => s.id === id)
      if (index === -1) return false

      this.suppliers.splice(index, 1)
      this.saveToLocalStorage()
      return true
    },

    // ============ INCOMING GOODS CRUD ============

    addIncomingGoods(data: {
      supplierId: string
      purchaseDate: string
      items: Omit<IncomingGoodsItem, 'id' | 'subtotal'>[]
      notes?: string
    }) {
      const supplier = this.getSupplierById(data.supplierId)
      if (!supplier) {
        throw new Error('Supplier tidak ditemukan')
      }

      // Calculate items with subtotals
      const items: IncomingGoodsItem[] = data.items.map(item => ({
        ...item,
        id: this.generateId(),
        subtotal: item.quantity * item.unitPrice
      }))

      // Calculate total
      const totalAmount = items.reduce((sum, item) => sum + item.subtotal, 0)

      // Calculate due date based on supplier settings
      const dueDate = this.calculateDueDate(data.purchaseDate, supplier)

      const newGoods: IncomingGoods = {
        id: this.generateId(),
        supplierId: data.supplierId,
        supplierName: supplier.name,
        purchaseDate: data.purchaseDate,
        items,
        totalAmount,
        dueDate,
        paymentStatus: 'unpaid',
        notes: data.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      this.incomingGoods.push(newGoods)
      this.saveToLocalStorage()
      return newGoods
    },

    updateIncomingGoods(id: string, updates: Partial<Omit<IncomingGoods, 'id' | 'createdAt'>>) {
      const index = this.incomingGoods.findIndex(g => g.id === id)
      if (index === -1) return false

      const current = this.incomingGoods[index]
      if (!current) return false
      
      this.incomingGoods[index] = {
        id: current.id,
        supplierId: updates.supplierId ?? current.supplierId,
        supplierName: updates.supplierName ?? current.supplierName,
        purchaseDate: updates.purchaseDate ?? current.purchaseDate,
        items: updates.items ?? current.items,
        totalAmount: updates.totalAmount ?? current.totalAmount,
        dueDate: updates.dueDate ?? current.dueDate,
        paymentStatus: updates.paymentStatus ?? current.paymentStatus,
        notes: updates.notes ?? current.notes,
        createdAt: current.createdAt,
        updatedAt: new Date().toISOString(),
        paidAt: updates.paidAt ?? current.paidAt
      }

      this.saveToLocalStorage()
      return true
    },

    deleteIncomingGoods(id: string) {
      const index = this.incomingGoods.findIndex(g => g.id === id)
      if (index === -1) return false

      this.incomingGoods.splice(index, 1)
      this.saveToLocalStorage()
      return true
    },

    // ============ PAYMENT ACTIONS ============

    markAsPaid(incomingGoodsId: string) {
      const index = this.incomingGoods.findIndex(g => g.id === incomingGoodsId)
      if (index === -1) return false

      const item = this.incomingGoods[index]
      if (!item) return false
      
      item.paymentStatus = 'paid'
      item.paidAt = new Date().toISOString()
      item.updatedAt = new Date().toISOString()

      this.saveToLocalStorage()
      return true
    },

    markAsUnpaid(incomingGoodsId: string) {
      const index = this.incomingGoods.findIndex(g => g.id === incomingGoodsId)
      if (index === -1) return false

      const item = this.incomingGoods[index]
      if (!item) return false
      
      item.paymentStatus = 'unpaid'
      item.paidAt = undefined
      item.updatedAt = new Date().toISOString()

      this.saveToLocalStorage()
      return true
    },

    // ============ SETTINGS ============

    updateSettings(settings: Partial<AppSettings>) {
      this.settings = {
        ...this.settings,
        ...settings
      }
      this.saveToLocalStorage()
    },

    // ============ HELPERS ============

    calculateDueDate(purchaseDate: string, supplier: Supplier): string {
      const purchase = parseISO(purchaseDate)
      let dueDate = new Date(purchase)

      // Step 1: Calculate base due date
      if (supplier.dueDateType === 'days') {
        const days = Number(supplier.dueDateValue)
        dueDate = addDays(purchase, days)
      } else if (supplier.dueDateType === 'weeks') {
        const weeks = Number(supplier.dueDateValue)
        dueDate = addWeeks(purchase, weeks)
      } else if (supplier.dueDateType === 'months') {
        const months = Number(supplier.dueDateValue)
        dueDate = addMonths(purchase, months)
      } else {
        // dueDateType === 'date', calculate next occurrence of specific date
        const targetDate = Number(supplier.dueDateValue)
        const purchaseDay = purchase.getDate()
        const purchaseMonth = purchase.getMonth()
        const purchaseYear = purchase.getFullYear()

        // If purchase date is before target date in same month, use same month
        // Otherwise, use next month
        let dueMonth = purchaseDay < targetDate ? purchaseMonth : purchaseMonth + 1
        let dueYear = purchaseYear

        // Handle year rollover
        if (dueMonth > 11) {
          dueMonth = 0
          dueYear++
        }

        // Create due date, handling invalid dates (e.g., Feb 31 -> Feb 28/29)
        dueDate = new Date(dueYear, dueMonth, targetDate)
        
        // If the day doesn't match (e.g., set to 31 but month only has 30 days),
        // it will automatically roll to next month. We need to go back to last day of intended month.
        if (dueDate.getDate() !== targetDate) {
          dueDate.setDate(0) // Go to last day of previous month
        }
      }

      // Step 2: Adjust for collection day (if specified)
      if (supplier.collectionDay !== undefined) {
        const targetDay = supplier.collectionDay // 0-6 (0=Sunday, 1=Monday, etc)
        const currentDay = dueDate.getDay()
        
        // Calculate days to add to reach target day
        let daysToAdd = targetDay - currentDay
        if (daysToAdd <= 0) {
          daysToAdd += 7 // Move to next week if target day has passed
        }
        
        dueDate = addDays(dueDate, daysToAdd)
      }

      // Step 3: Add additional weeks (if specified)
      if (supplier.additionalWeeks && supplier.additionalWeeks > 0) {
        dueDate = addWeeks(dueDate, supplier.additionalWeeks)
      }

      return formatISO(dueDate)
    },

    generateId(): string {
      return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    },

    // ============ PERSISTENCE ============

    saveToLocalStorage() {
      if (typeof window === 'undefined') return

      try {
        localStorage.setItem(SUPPLIERS_KEY, JSON.stringify(this.suppliers))
        localStorage.setItem(INCOMING_GOODS_KEY, JSON.stringify(this.incomingGoods))
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settings))
      } catch (error) {
        console.error('Failed to save to localStorage:', error)
      }
    },

    loadFromLocalStorage() {
      if (typeof window === 'undefined') return

      try {
        const suppliersData = localStorage.getItem(SUPPLIERS_KEY)
        const goodsData = localStorage.getItem(INCOMING_GOODS_KEY)
        const settingsData = localStorage.getItem(SETTINGS_KEY)

        if (suppliersData) {
          this.suppliers = JSON.parse(suppliersData)
        }

        if (goodsData) {
          this.incomingGoods = JSON.parse(goodsData)
        }

        if (settingsData) {
          this.settings = { ...this.settings, ...JSON.parse(settingsData) }
        }
      } catch (error) {
        console.error('Failed to load from localStorage:', error)
      }
    },

    // ============ GOOGLE SHEETS SYNC (via Apps Script) ============

    async syncToGoogleSheets() {
      if (!this.settings.googleSheetsUrl) {
        throw new Error('URL Google Apps Script belum dikonfigurasi')
      }

      // Validate we have data to sync
      if (this.suppliers.length === 0 && this.incomingGoods.length === 0) {
        throw new Error('Tidak ada data untuk disinkronkan. Tambahkan supplier atau barang masuk terlebih dahulu.')
      }

      this.isLoading = true

      try {
        // Using no-cors mode (same as POS project)
        await fetch(this.settings.googleSheetsUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            action: 'save',
            suppliers: this.suppliers,
            incomingGoods: this.incomingGoods
          })
        })

        // Update last synced timestamp
        this.settings.lastSyncedAt = new Date().toISOString()
        this.saveToLocalStorage()
        
        console.log('Data sent to Google Sheets via Apps Script')
        console.log('Suppliers:', this.suppliers.length)
        console.log('Incoming Goods:', this.incomingGoods.length)
        return true
      } catch (error) {
        console.error('Failed to sync to Google Sheets:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async loadFromGoogleSheets() {
      if (!this.settings.googleSheetsUrl) {
        throw new Error('URL Google Apps Script belum dikonfigurasi')
      }

      this.isLoading = true

      try {
        const response = await fetch(`${this.settings.googleSheetsUrl}?action=load`)
        const data = await response.json()

        if (data.suppliers) {
          this.suppliers = data.suppliers
        }

        if (data.incomingGoods) {
          this.incomingGoods = data.incomingGoods
        }

        this.saveToLocalStorage()
        console.log('Data loaded from Google Sheets via Apps Script')
        return true
      } catch (error) {
        console.error('Failed to load from Google Sheets:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // ============ DATA MANAGEMENT ============

    exportData() {
      return {
        suppliers: this.suppliers,
        incomingGoods: this.incomingGoods,
        settings: this.settings,
        exportedAt: new Date().toISOString()
      }
    },

    importData(data: { suppliers?: Supplier[], incomingGoods?: IncomingGoods[], settings?: AppSettings }) {
      if (data.suppliers) {
        this.suppliers = data.suppliers
      }

      if (data.incomingGoods) {
        this.incomingGoods = data.incomingGoods
      }

      if (data.settings) {
        this.settings = { ...this.settings, ...data.settings }
      }

      this.saveToLocalStorage()
    },

    clearAllData() {
      this.suppliers = []
      this.incomingGoods = []
      this.saveToLocalStorage()
    }
  }
})
