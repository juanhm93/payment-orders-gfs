import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BaseLoader from './components/global/BaseLoader.vue'
import BaseIcon from './components/global/BaseIcon.vue'
import BaseInput from './components/global/BaseInput.vue'
import BaseSelect from './components/global/BaseSelect.vue'
import BaseModal from './components/global/BaseModal.vue'
import BaseButton from './components/global/BaseButton.vue'
import BaseAlert from './components/global/BaseAlert.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('BaseLoader', BaseLoader)
app.component('BaseIcon', BaseIcon)
app.component('BaseInput', BaseInput)
app.component('BaseSelect', BaseSelect)
app.component('BaseModal', BaseModal)
app.component('BaseButton', BaseButton)
app.component('BaseAlert', BaseAlert)

app.mount('#app')
