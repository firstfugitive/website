import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: 'server'
  },

  dev: false,

  mode: 'universal',
  devtools: true,

  env: {
    CTF_PREVIEW: process.env.ENVIRONMENT !== 'prod',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'firstfugitive-website',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  components: [
    {
      path: '~/components/atom/',
      watch: true
    }, {
      path: '~/components/molecule/',
      watch: true
    }, {
      path: '~/components/organism/',
      watch: true
    }, {
      path: '~/components/pageContent/',
      prefix: 'page',
      watch: true
    }
  ],


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  /* serverMiddleware: [
    { path: '/server-middleware', handler: '~/middleware/index.js' }
  ] */
  target: 'server',
})
