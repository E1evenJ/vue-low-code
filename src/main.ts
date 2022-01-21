import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from './elementui'
import iconvue from './iconvue'

createApp(App).use(store).use(router).use(element).use(iconvue).mount('#app')
