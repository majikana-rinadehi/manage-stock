<script setup>
import { useAuth } from '../disposable/useAuth'
import router from '../router/index.js'

const { logout, isAuthenticated, auth } = useAuth()

const logginOut = async () => {
    await logout(auth)
    router.push("/login")
}
</script>
<template>
    <div class="nav">
        <router-link to="/">
            Home
        </router-link>
        <div v-if="isAuthenticated">
            <span @click="logginOut">logout</span>
        </div>
        <div v-else>   
            <router-link to="/login">
                Login
            </router-link>
        </div>
    </div>
</template>
