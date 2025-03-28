import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


createApp(App).use(store).use(router).use(Vue3Toastify).mount('#app')
