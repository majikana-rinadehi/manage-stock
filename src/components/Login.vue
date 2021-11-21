<script setup>
import { useAuth } from '../disposable/useAuth.js'
import { ref } from 'vue'
import router from '../router/index.js'

const { login, auth } = useAuth()

const email = ref('')
const password = ref('')

const logginIn = async () => {
    await login(auth, email.value, password.value)
    router.push("/")
    email.value = ""
    password.value = ""
}
</script>
<template>
    <div class="login">
        <form action="">
            <div>
                <label for="">email</label>
                <input type="text" v-model="email">
            </div>
            <div>
                <label for="">password</label>
                <input type="password" v-model="password">
            </div>
            <div>
                <button @click.prevent="logginIn">login</button>
            </div>
        </form>
    </div>
</template>
