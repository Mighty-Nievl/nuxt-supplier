import { parseISO, differenceInDays, format, isBefore, isAfter, addDays } from 'date-fns'
import { id as localeId } from 'date-fns/locale'

export const useDateHelpers = () => {
    /**
     * Calculate days until due date
     * Returns negative number if overdue
     */
    const daysUntilDue = (dueDate: string): number => {
        const due = parseISO(dueDate)
        const now = new Date()
        return differenceInDays(due, now)
    }

    /**
     * Check if a date is overdue
     */
    const isOverdue = (dueDate: string): boolean => {
        const due = parseISO(dueDate)
        const now = new Date()
        return isBefore(due, now)
    }

    /**
     * Check if due date is within notification window
     */
    const isUpcoming = (dueDate: string, notificationDays: number = 7): boolean => {
        const due = parseISO(dueDate)
        const now = new Date()
        const notificationDate = addDays(now, notificationDays)

        return isAfter(due, now) && isBefore(due, notificationDate)
    }

    /**
     * Format date to Indonesian format
     */
    const formatDate = (date: string, formatStr: string = 'dd MMM yyyy'): string => {
        try {
            return format(parseISO(date), formatStr, { locale: localeId })
        } catch {
            return date
        }
    }

    /**
     * Format date to relative string (e.g., "3 hari lagi", "2 hari yang lalu")
     */
    const formatRelativeDate = (dueDate: string): string => {
        const days = daysUntilDue(dueDate)

        if (days === 0) return 'Hari ini'
        if (days === 1) return 'Besok'
        if (days === -1) return 'Kemarin'
        if (days > 0) return `${days} hari lagi`
        return `${Math.abs(days)} hari yang lalu`
    }

    /**
     * Get status color based on due date
     */
    const getDueDateStatus = (dueDate: string, paymentStatus: 'paid' | 'unpaid'): {
        color: 'success' | 'warning' | 'danger' | 'info'
        label: string
    } => {
        if (paymentStatus === 'paid') {
            return { color: 'success', label: 'Lunas' }
        }

        if (isOverdue(dueDate)) {
            return { color: 'danger', label: 'Jatuh Tempo' }
        }

        if (isUpcoming(dueDate, 7)) {
            return { color: 'warning', label: 'Segera Jatuh Tempo' }
        }

        return { color: 'info', label: 'Belum Lunas' }
    }

    /**
     * Format currency to Indonesian Rupiah
     */
    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount)
    }

    return {
        daysUntilDue,
        isOverdue,
        isUpcoming,
        formatDate,
        formatRelativeDate,
        getDueDateStatus,
        formatCurrency
    }
}
