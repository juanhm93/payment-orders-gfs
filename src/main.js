import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BaseLoader from './components/global/BaseLoader.vue'
import BaseIcon from './components/global/BaseIcon.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('BaseLoader', BaseLoader)
app.component('BaseIcon', BaseIcon)

app.mount('#app')
