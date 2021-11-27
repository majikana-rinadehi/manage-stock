import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../disposable/useAuth.js'
import Home_2 from '../components/Home_2.vue'
import Login from '../components/Login.vue'
import useMessage from '../disposable/useMessage.js'

const { setMessage } = useMessage()
const { isAuthenticated } = useAuth()
const routes = [
  {
    path: '/',
    name: 'Home_2',
    component: Home_2,
    meta: { requiresAuth: true} 
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false} 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value){
    setMessage("ログインしてください", "error")
    return {
      path: "/login"
    }
  }
})

export default router
