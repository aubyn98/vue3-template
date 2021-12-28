import './common/pollify'
import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from 'router'
import store from 'store'

// common -------------------
import plugins from 'plugins'
import 'styles'
// --------------------------

createApp(App).use(store).use(router).use(plugins).mount('#app')
