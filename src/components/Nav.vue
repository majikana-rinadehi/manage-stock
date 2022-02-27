<script setup lang="ts">
import { useAuth } from '../composable/useAuth'
import { ref } from 'vue'
import router from '../router/index.js'
import UserProfile from './UserProfile'

const { logout, isAuthenticated, auth, user } = useAuth()

const showProfile = ref(false)

const logginOut = async () => {
    closeUserProfile()
    await logout(auth)
    router.push("/login")
}

const openUserProfile = () => {
    showProfile.value = true
}

const closeUserProfile = () => {
    showProfile.value = false
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
                <button class="w-full h-full text-5xl font-bold bg-yellow-500 hover:bg-yellow-600 rounded-t-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </button> 
            </router-link>
        </div>
        <div class="w-1/4 rounded-tl-lg" 
            v-if="isAuthenticated">
            <button class="w-full h-full text-5xl font-bold bg-red-500 hover:bg-red-700 rounded-t-full"
                @click="openUserProfile">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>    
            </button>
            
        </div>
        <div class="w-1/4" v-else>   
            <router-link to="/login">
                <button class="w-full h-full text-5xl font-bold bg-green-500 hover:bg-green-300">
                    login
                </button>
            </router-link>
        </div>
    </div>
    <UserProfile
        v-show="showProfile"
        :user="user"
        @logout="logginOut"
        @close-modal="closeUserProfile"/>
    
</template>
