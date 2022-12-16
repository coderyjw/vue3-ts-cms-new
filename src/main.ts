import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import '@/assets/css/index.less'

import router from '@/router'
import pinia from '@/store'

import icons from './global/register-icons'

const app = createApp(App)

app.use(icons)
app.use(pinia)
app.use(router)

app.mount('#app')
