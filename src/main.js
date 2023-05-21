import { createApp } from 'vue'
import { createPinia } from 'pinia'
import NProgress from 'nprogress'
import App from './App.vue'
import router from './router'
import { vue3Debounce } from 'vue-debounce'
import 'animate.css';
import './assets/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.directive('debounce', vue3Debounce({ lock: true }))
NProgress.configure({
    easing: 'ease',
    showSpinner: false,
    startOnLoad: false
});
app.mount('#app')
