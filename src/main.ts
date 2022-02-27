import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index.js'
import useMessage from './composable/useMessage'

const app = createApp(App)

// firebaseAuthのエラーや、キャッチされていないエラーを拾う
const { errorHandler } = useMessage()
app.config.errorHandler = errorHandler

app.use(router).mount('#app')
