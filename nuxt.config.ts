// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  
  app: {
    head: {
      title: 'Supplier Management - Pencatatan Barang & Jatuh Tempo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Aplikasi pencatatan barang masuk dari supplier dan pengingat jatuh tempo pembayaran' }
      ]
    }
  },
  
  css: ['~/assets/css/main.css'],
  
  ssr: false // SPA mode untuk localStorage compatibility
})