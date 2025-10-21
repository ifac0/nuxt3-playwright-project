import { defineNuxtConfig } from "nuxt/config";

// nuxt.config.ts
export default defineNuxtConfig({
  ssr: true,
  typescript: {
    strict: true
  },
  nitro: {
    preset: 'node'
  },
  modules: [
    '@nuxtjs/tailwindcss', 
    '@pinia/nuxt',       
  ],
  css: ['~/assets/css/tailwind.css'],
  extends: [
    './my-ui-layer' 
  ]
})
