import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from './elementui'
import iconvue from './iconvue'
import axios from './utils/axios'

const app = createApp(App)
app.config.globalProperties.axios = axios
app.use(store).use(router).use(element).use(iconvue).mount('#app')
