<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen"
                class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
                @click.self="$emit('close')">
                <div
                    class="relative bg-gradient-to-br from-white via-white to-gray-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl transform transition-all">
                    <!-- Decorative gradient blur -->
                    <div class="absolute -top-20 -right-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl"></div>
                    <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>

                    <!-- Warning Icon with animation -->
                    <div class="relative flex items-center justify-center w-20 h-20 mx-auto mb-6">
                        <!-- Pulsing background -->
                        <div class="absolute inset-0 bg-red-500/20 dark:bg-red-500/30 rounded-full animate-ping"></div>
                        <div
                            class="absolute inset-0 bg-gradient-to-br from-red-500/30 to-red-600/30 rounded-full blur-xl">
                        </div>

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
                        {{ title }}
                    </h3>

                    <!-- Message -->
                    <p class="text-gray-600 dark:text-gray-400 text-center mb-8 leading-relaxed">
                        {{ message }}
                    </p>

                    <!-- Actions -->
                    <div class="flex gap-4">
                        <button @click="$emit('close')"
                            class="flex-1 px-6 py-3.5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all transform hover:scale-105 active:scale-95 shadow-sm">
                            Batal
                        </button>
                        <button @click="$emit('confirm')"
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
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
defineProps<{
    isOpen: boolean
    title: string
    message: string
}>()

defineEmits<{
    (e: 'close'): void
    (e: 'confirm'): void
}>()
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .transform,
.modal-leave-active .transform {
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.modal-enter-from .transform,
.modal-leave-to .transform {
    transform: scale(0.95) translateY(10px);
    opacity: 0;
}
</style>
