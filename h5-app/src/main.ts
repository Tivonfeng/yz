import './assets/main.css'

import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import { Lazyload } from 'vant'
import '@vant/touch-emulator'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(MotionPlugin)
app.use(Lazyload)

app.mount('#app')
