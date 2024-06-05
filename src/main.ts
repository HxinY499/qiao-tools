import './global.less'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import { entry } from './buried-point'
import router from './router'

entry()

const app = createApp(App)
app.use(router)
const pinia = createPinia()
app.use(pinia)

app.mount('#app')
