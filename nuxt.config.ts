// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/i18n'],
  compatibilityDate: '2024-07-25',
  devServer: {
    port: 3000,
  },
  runtimeConfig: {
    apiSendEmailNetxysURL: process.env.API_SEND_EMAIL_NETXYS_URL,
    public: {
      baseUrl: process.env.BASE_URL,
      appName: process.env.APP_NAME,
      defaultLocale: process.env.DEFAULT_LOCALE || 'es',
      production_mode: process.env.NODE_ENV === 'production',
      google_analytics_id: process.env.GOOGLE_ANALYTICS_ID,
    },
  },
  routeRules: {
    
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag === 'lottie-player',
    },
  },
  i18n: {
    // Module Options
    locales: ['es', 'en'],
    defaultLocale: process.env.DEFAULT_LOCALE || 'es',
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
                {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Aref+Ruqaa&family=Laila:wght@600&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css',
        },
      ],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/js/bootstrap.bundle.min.js',
        }
      ],
    },
  },
  css: ['~/assets/css/styles.css'],
});
