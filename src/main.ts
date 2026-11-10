import { createApp } from 'vue'
import './style.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import { VCalendar } from 'vuetify/labs/VCalendar'

const vuetify = createVuetify({
  components: {
    VCalendar,
  },
  theme: {
    defaultTheme: 'orbital',
    themes: {
      orbital: {
        dark: true,
        colors: {
          background: '#11111a',
          surface: '#20202b',
          primary: '#71e2ff',
          secondary: '#ff70ad',
        },
      },
    },
  },
})

createApp(App).use(router).use(vuetify).mount('#app')
