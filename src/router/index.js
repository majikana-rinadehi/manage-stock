import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../disposable/useAuth.js'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'

const { isAuthenticated } = useAuth()
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    return {
      path: "/login"
    }
  }
})

export default router
