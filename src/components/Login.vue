<script setup lang="ts">
import { useAuth } from '../disposable/useAuth'
import { ref } from 'vue'
import router from '../router/index.js'

const { login, auth, addUser } = useAuth()

const email = ref('')
const password = ref('')
const showCreateUserForm = ref(false)
const signupEmail = ref('')
const signupPassword = ref('')

const logginIn = async () => {
    await login(auth, email.value, password.value)
    router.push("/")
    email.value = ""
    password.value = ""
    signupEmail.value = ""
    signupPassword.value = ""
}

const signingUp = async () => {
    await addUser(signupEmail.value, signupPassword.value)
        .then(() => {
            email.value = ""
            password.value = ""
            signupEmail.value = ""
            signupPassword.value = ""
            showCreateUserForm.value = false
        })

}

const showingCreateUserForm = () => {
    showCreateUserForm.value = true
}

</script>
<template>
    <div class="flex flex-col w-2/5 min-w-400 mx-auto bg-gray-light rounded-2xl shadow-around"
        style="font: inherit;">
        <div id="form-wrapper"
            class="flex flex-col w-3/5 mx-auto my-4 px-4 pt-0 pb-8 bg-gray-lightest "
            style="font: inherit;">
            <div class="flex flex-col h-12 mb-4 p-2 items-center">
                <div class="self-start text-base h-40">email</div>
                <!-- <input v-focus type="text" id="email-input" v-model="email"> -->
                <input type="text" id="email-input" v-model="email">
            </div>
            <div class="flex flex-col h-12 items-center">
                <div class="self-start text-base h-40">password</div>
                <input type="password" id="password-input" v-model="password">
                </div>
        </div>
        <div class="flex w-4/5 h-8 my-4 mx-auto justify-center">
            <button class="btn hover:bg-yellow-700" @click="logginIn">Login</button>
        </div>
        <div class="mt-4 mx-auto justify-center">
            ===または===
        </div>
        <div class="mx-auto justify-center">
            <a href="#" @click="showingCreateUserForm">
                ユーザーを新規作成
            </a>
        </div>
        <div v-show="showCreateUserForm" 
            class="w-4/5 my-4 mx-auto justify-center">
            <div class="my-4 flex justify-end">
                <!--編集項目のひとかたまり-->
                <label class="mr-auto" for="user">mail</label>
                <input type="text" id="user" v-model="signupEmail">
            </div>
            <div class="my-4 flex justify-end">
                 <label class="mr-auto" for="mail">password</label>
                 <input type="password" id="mail" v-model="signupPassword">
            </div>
            <div class="flex w-4/5 h-8 my-4 mx-auto justify-center">
                <button class="btn hover:bg-yellow-700" @click="signingUp">SignUp</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
input{
  border: none;
  border-radius: 0.5em;
  margin: 0 1em;
  width: 80%;
  font: inherit;
  font-size:1em;
  color: rgb(104, 103, 103);
  padding: 0.3em;
}
input:focus{
    outline: none;
}
.btn{
  color: white;
  background: #292727;
  display: block;
  font-weight:bolder;
  font-size: 1em;
  height: 100%;
  padding: 0.2em;
  border-style: none;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.1rem;
  appearance: none;
}
</style>