import { ref } from 'vue'

export type NotificationType = 'success' | 'warning' | 'danger' | 'info'

export interface Notification {
    id: string
    type: NotificationType
    title: string
    message: string
    duration?: number
}

const notifications = ref<Notification[]>([])

export const useNotifications = () => {
    const show = (
        type: NotificationType,
        title: string,
        message: string,
        duration: number = 5000
    ) => {
        const id = `notif-${Date.now()}-${Math.random()}`

        const notification: Notification = {
            id,
            type,
            title,
            message,
            duration
        }

        notifications.value.push(notification)

        if (duration > 0) {
            setTimeout(() => {
                remove(id)
            }, duration)
        }

        return id
    }

    const remove = (id: string) => {
        const index = notifications.value.findIndex(n => n.id === id)
        if (index > -1) {
            notifications.value.splice(index, 1)
        }
    }

    const success = (title: string, message: string, duration?: number) => {
        return show('success', title, message, duration)
    }

    const warning = (title: string, message: string, duration?: number) => {
        return show('warning', title, message, duration)
    }

    const danger = (title: string, message: string, duration?: number) => {
        return show('danger', title, message, duration)
    }

    const info = (title: string, message: string, duration?: number) => {
        return show('info', title, message, duration)
    }

    const clear = () => {
        notifications.value = []
    }

    return {
        notifications,
        show,
        remove,
        success,
        warning,
        danger,
        info,
        clear
    }
}
