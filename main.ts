import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import App from './App.vue'
import router from './router/index'

// Tema customizado com cores da cultura afro
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'afroTheme',
    themes: {
      afroTheme: {
        dark: false,
        colors: {
          primary: '#6B4423', // Marrom escuro
          secondary: '#D4AF37', // Dourado
          accent: '#E67E22', // Laranja queimado
          success: '#27AE60', // Verde esmeralda
          info: '#3498DB', // Azul royal
          warning: '#F39C12', // Amarelo dourado
          error: '#C0392B', // Vermelho terra
          background: '#FDF6E3', // Bege claro
          surface: '#FFFFFF',
        }
      }
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
