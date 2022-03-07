import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index.js'
import useMessage from './composable/useMessage'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';

const app = createApp(App)

// firebaseAuthのエラーや、キャッチされていないエラーを拾う
const { errorHandler } = useMessage()
app.config.errorHandler = errorHandler
// vue-loading-overlay(ローディング画面)
app.use(VueLoading)
app.use(router)
app.mount('#app')
