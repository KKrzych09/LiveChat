import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

// Import firebase auth service
import { projectAuth } from './firebase/config'

import './registerServiceWorker'

let app

projectAuth.onAuthStateChanged(() => {
    if(!app) {
        app = createApp(App)
        .use(router)
        .mount('#app')
    }
})


