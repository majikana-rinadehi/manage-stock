<script setup lang="ts">
import { useAuth } from '../disposable/useAuth'
import { ref, nextTick } from 'vue'
import { reactive, computed } from 'vue'
import router from '../router/index.js'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const { login, auth, addUser } = useAuth()

const showCreateUserForm = ref(false)
const signupEmail = ref('')
const signupPassword = ref('')
const inputEmail = ref(null)
const state = reactive ({
    mail: '',
    password: ''
})
const rules = {
    mail: { required, email },
    password: { required }
}
const v$ = useVuelidate(rules, state)

const isAllValid = computed(() => {
    return v$.value.$errors.length === 0
})
const validating = async () => {
    await v$.value.$validate()
}
const logginIn = async () => {
    validating()
    if(isAllValid.value === true){
        await login(auth, state.mail, state.password)
        router.push("/")
        state.mail = ""
        state.password = ""
    }
}

const signingUp = async () => {
    await addUser(signupEmail.value, signupPassword.value)
        .then(() => {
            state.mail = ""
            state.password = ""
            signupEmail.value = ""
            signupPassword.value = ""
            showCreateUserForm.value = false
        })
}

const showingCreateUserForm = () => {
    showCreateUserForm.value = true
    nextTick(() => {
        inputEmail.value.focus()
    })
}
</script>
<template>
    <div class="flex flex-col w-2/5 min-w-400 mx-auto bg-gray-light rounded-2xl shadow-around"
        style="font: inherit;">
        <div id="form-wrapper"
            class="flex flex-col w-3/5 mx-auto my-4 px-4 pt-0 pb-8 bg-gray-lightest "
            style="font: inherit;">
            <div class="flex flex-col h-16 mb-4 p-2 items-center">
                <div class="self-start text-base h-40">mail</div>
                <input type="text" id="email-input" v-model="state.mail">
                <div v-for="error of v$.mail.$errors" :key="error.$uid">
                    <div v-show="error.$validator === 'email'" class="text-xs text-red-600">
                        メールアドレスの形式が変!
                    </div>
                    <div v-show="error.$validator === 'required'" class="text-xs text-red-600">
                        メールアドレスがないんですけど
                    </div>
                </div>
            </div>
            <div class="flex flex-col h-16 items-center">
                <div class="self-start text-base h-40">password</div>
                <input type="password" id="password-input" v-model="state.password">
                <div v-for="error of v$.password.$errors" :key="error.$uid">
                    <div v-show="error.$validator === 'required'" class="text-xs text-red-600">
                        パスワードがないんですけど
                    </div>
                </div>
            </div>
        </div>
        <div class="flex w-4/5 h-8 my-4 mx-auto justify-center">
            <button v-if="isAllValid" class="btn hover:bg-yellow-700" @click="logginIn">Login</button>
            <button v-if="!isAllValid" class="btn btn-disable" disabled>Login</button>
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
                <input ref="inputEmail" type="text" id="user" v-model="signupEmail">
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
.btn-disable{
  color: white;
  background: #8a8787;
}
</style>