<script setup lang="ts">
import CreateUserForm from './CreateUserForm.vue'
import { useAuth } from '../composable/useAuth'
import useMessage  from '../composable/useMessage'
import { ref, nextTick } from 'vue'
import { reactive, computed } from 'vue'
import router from '../router/index.js'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { useLoading } from 'vue-loading-overlay'

const { login, auth } = useAuth()
const { errorHandler } = useMessage()

const showCreateUserForm = ref(false)
const createUserFormRef = ref(null)
const state = reactive ({
    mail: '',
    password: '',
})
const rules = {
    mail: { required, email },
    password: { required }
}
const v$ = useVuelidate(rules, state)

const $loading= useLoading()
const loginContainer = ref(null)

const isAllValid = computed(() => {
    return v$.value.$errors.length === 0
})
const validating = async () => {
    await v$.value.$validate()
}
const logginIn = async () => {
    await validating()
    if(isAllValid.value === false) return
    const loader = $loading.show({
        container: loginContainer.value
    })
    await login(auth, state.mail, state.password)
        .then(() => {
            router.push("/")
            state.mail = ""
            state.password = ""
            loader.hide()   
        })
        .catch((err) => {
            // 20220307 firebaseエラー発生時、メッセージが表示されない対応
            errorHandler(err)
            loader.hide()
        })
}

const showingCreateUserForm = () => {
    showCreateUserForm.value = true
    nextTick(() => {
        createUserFormRef.value.inputEmailRef.focus()
    })
}
</script>
<template>
    <div 
        class="flex flex-col w-2/5 min-w-400 mx-auto bg-gray-200 rounded-2xl shadow-around"
        style="font: inherit;">
        <div
            ref="loginContainer"
            id="form-wrapper"
            class="flex flex-col w-3/5 mx-auto my-4 px-4 pt-0 pb-8 bg-gray-100 "
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
            <transition name="fade" mode="out-in">
                <button v-if="isAllValid" class="btn hover:bg-yellow-700" @click="logginIn">Login</button>
                <button v-else class="btn btn-disable" disabled>Login</button>
            </transition>
        </div>
        <div class="mt-4 mx-auto justify-center">
            ===または===
        </div>
        <div class="mx-auto justify-center">
            <a href="#" @click="showingCreateUserForm">
                ユーザーを新規作成
            </a>
        </div>
        <CreateUserForm 
            ref="createUserFormRef"
            v-show="showCreateUserForm"/>
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

.fade-enter-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>