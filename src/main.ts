import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import '@/assets/styles/main.scss'

const app = createApp(App)
const aos = () => AOS.init() as void;
app.use(aos)
app.use(createPinia())
app.use(router)

app.mount('#app')
