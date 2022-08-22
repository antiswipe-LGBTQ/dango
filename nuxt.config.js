require('dotenv').config()

export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'antiswipe, rencontres réelles entres jeunes LGBTQ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: `antiswipe c'est sorties en région parisienne pour les LGBTQ de moins de 35 ans pour qu’on puisse se rencontrer hors des applis, dans une ambiance plus conviviale et humaine.` }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
    css: [
        '@/assets/scss/global.scss'
    ],
    
    env: {
      baseUrl: process.env.BASE_URL,
    },

  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
    plugins: [
        { src: '~/plugins/base.js' },
        // { src: '~/plugins/hotjar.js' },
        // { src: '~/plugins/messenger.js', ssr: false }
    ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: {
    dirs: [
        '~/components',
        '~/components/events',
        '~/components/base',
        '~/components/forms',
        '~/components/layout',
        '~/components/interactive',
        '~/components/partials'
    ]
  },
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/moment',
    ['@nuxtjs/google-analytics', {
        id: 'UA-156956427-2'
    }],
    
  ],

  moment: {
    timezone: true,
    defaultTimezone: 'Europe/Paris',
    defaultLocale: 'fr',
    locales: ['fr']
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/moment',
    '@nuxtjs/axios',
    'nuxt-i18n',
    '@nuxtjs/auth',
    [ '@nuxtjs/recaptcha', {
        hideBadge: true,
        version: 3,
        siteKey: process.env.RECAPTCHA
    } ],
    ['nuxt-stripe-module', {
        publishableKey: process.env.STRIPE_PUBLIC,
    }],
  ],

  auth: {
    redirect: {
        logout: '/',
        login: '/compte/login',
        home: false,
        callback: false
    },
    strategies: {
        local: {
            endpoints: {
                login: { url: process.env.NUXT_ENV_API_URL + '/user', method: 'post', propertyName: 'token' },
                logout: { url: process.env.NUXT_ENV_API_URL + '/user/logout', method: 'post' },
                user: { url: process.env.NUXT_ENV_API_URL + '/user', method: 'get', propertyName: 'user' }
            }
        }
    }
},

  i18n: {
    locales: [
        { code: 'fr', iso: 'fr-FR', file: 'fr.js' },
        { code: 'en', iso: 'en-EN', file: 'en.js' }
    ],
    langDir: '@/translations/',
    defaultLocale: 'fr',
    lazy: true
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
 axios: {
    baseURL: process.env.NUXT_ENV_API_URL
},
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend (config, { isDev, isClient }) {
        config.module.rules.push(
          {
            test: /\.svg.html$/,
            loader: 'raw-loader'
          }
        )
    },
    babel: {
      presets(env, [preset, options]) {
          return [["@babel/preset-env", {}]];
      },
      plugins: [
          [
          "@babel/plugin-transform-runtime",
            {
                regenerator: true
            }
          ]
      ]
    }
  }
}
