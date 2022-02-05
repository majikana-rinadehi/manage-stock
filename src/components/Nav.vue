<script setup lang="ts">
import { useAuth } from '../disposable/useAuth'
import router from '../router/index.js'

const { logout, isAuthenticated, auth } = useAuth()

const logginOut = async () => {
    await logout(auth)
    router.push("/login")
}
</script>
<template>
    <div class="nav flex justify-end h-28 mb-9">
        <div class="w-1/2 flex justify-center items-center">
            <!--アイコン、タイトル-->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
            <h1 class="text-6xl font-bold">
                <!--アイコン、タイトル-->
                manage-stock
            </h1>
        </div>
        <div class="w-1/4">
            <router-link class="" to="/">
                <button class="w-full h-full text-5xl font-bold bg-yellow-500">
                    Home
                </button> 
            </router-link>
        </div>
        <div class="w-1/4" 
            v-if="isAuthenticated">
            <button class="w-full h-full text-5xl font-bold bg-red-500 hover:bg-red-700"
                @click="logginOut">logout</button>
        </div>
        <div class="w-1/4" v-else>   
            <router-link to="/login">
                <button class="w-full h-full text-5xl font-bold bg-green-500 hover:bg-green-300">
                    Login
                </button>
            </router-link>
        </div>
    </div>
</template>
