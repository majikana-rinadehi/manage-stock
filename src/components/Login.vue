<script setup lang="ts">
import { useAuth } from '../disposable/useAuth'
import { ref, reactive, computed, onMounted } from 'vue'
import router from '../router/index.js'
import { REGEXP_MAIL, REGEXP_PASSWORD } from '../disposable/regex'

const { login, auth } = useAuth()

const email = ref('')
const password = ref('')
const errors = reactive<{[index: string]: boolean}>({"mail": false, "password": false})
const isAllValid = computed(() => {
    console.log(Object.keys(errors))
    console.log(Object.keys(errors).map(property => errors[property]))
    return Object.keys(errors).map(property => errors[property]).every(v => v === false)
})

const logginIn = async () => {
    await login(auth, email.value, password.value)
    router.push("/")
    email.value = ""
    password.value = ""
}

const validate = () => {
    console.log('validate')
    errors.mail = !REGEXP_MAIL.test(email.value)
    errors.password = !REGEXP_PASSWORD.test(password.value)
}

onMounted(() => {
    validate()
})

</script>
<template>
    <div class="flex flex-col w-2/5 min-w-400 mx-auto bg-gray-light rounded-2xl shadow-around"
        style="font: inherit;">
        <div id="form-wrapper"
            class="flex flex-col w-3/5 mx-auto my-4 px-4 pt-0 pb-8 bg-gray-lightest "
            style="font: inherit;">
            <div class="flex flex-col h-16 mb-4 p-2 items-center">
                <div class="self-start text-base h-40">email</div>
                <input @input="validate" type="text" id="email-input" v-model="email">
                <div class="text-xs" :class="[errors.mail ? 'text-red-600' : 'text-green-600']">
                    {{ errors.mail ? "メールアドレスの形式が変!" : "✓"}}
                </div>
            </div>
            <div class="flex flex-col h-16 items-center">
                <div class="self-start text-base h-40">password</div>
                <input @input="validate" type="password" id="password-input" v-model="password">
                <div class="text-xs" :class="[errors.password ? 'text-red-600' : 'text-green-600']">
                    {{ errors.password ? "パスワードは半角英数字記号で!" : "✓"}}
                </div>
            </div>
        </div>
        <div class="flex w-4/5 h-8 my-4 mx-auto justify-center">
        <button v-if="isAllValid" class="btn hover:bg-yellow-700" @click="logginIn">Login</button>
        <button v-if="!isAllValid" class="btn btn-disable" disabled>Login</button>
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