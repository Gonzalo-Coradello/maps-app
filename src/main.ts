import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN


if (!navigator.geolocation) {
  alert('Tu navegador no soporta la geolocalización')
  throw new Error('Tu navegador no soporta la geolocalización')
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
