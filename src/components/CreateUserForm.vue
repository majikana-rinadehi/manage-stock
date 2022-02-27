<script setup lang="ts">
import { useAuth } from '../composable/useAuth'
import { ref } from 'vue'
import { reactive, computed, defineExpose } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

const { addUser } = useAuth()

const inputEmailRef = ref(null)
defineExpose({inputEmailRef})
const state = reactive ({
    signupEmail: '',
    signupPassword: '',
    signupPasswordConfirm: ''
})
const REGEX_PASSWORD = helpers.regex(/^[0-9a-zA-Z.?/-]{6,}$/)
const sameAsPassword = (value: string) => value === state.signupPassword
const rules = computed(() => ({
    signupEmail: { required, email },
    signupPassword: { required, REGEX_PASSWORD },
    signupPasswordConfirm: { sameAsPassword }
}))
const v$ = useVuelidate(rules, state, { $scope: false })

const isAllValid = computed(() => {
    return v$.value.$errors.length === 0
})
const validating = async () => {
    await v$.value.$validate()
}

const signingUp = async () => {
    await validating()
    if (!isAllValid.value) return
    await addUser(state.signupEmail, state.signupPassword)
        .then(() => {
            state.signupEmail = ""
            state.signupPassword = ""
            state.signupPasswordConfirm = ''
            v$.value.$reset()
        })
}

</script>
<template>
    <div class="w-4/5 my-4 mx-auto justify-center">
        <div 
            class="flex flex-col w-3/5 mx-auto my-4 px-4 pt-0 pb-8 bg-gray-lightest"
            style="font: inherit;">
            <div class="flex flex-col h-16 mb-4 p-2 items-center">
                <div class="self-start text-base h-40">mail</div>
                <input ref="inputEmailRef" type="text" id="user" v-model="state.signupEmail">
                <div v-for="error in v$.signupEmail.$errors"
                    :key="error.$uid">
                    <div class="text-xs text-red-500">
                        {{ error.$message }}
                    </div>
                </div>
            </div>
            <div class="flex flex-col h-20 mb-4 p-2 items-center">
                <div class="self-start text-base h-40">password</div>
                <input type="password" id="mail" v-model="state.signupPassword">
                <div v-for="error in v$.signupPassword.$errors"
                    :key="error.$uid">
                    <div class="text-xs text-red-500"
                        v-if="error.$validator === 'REGEX_PASSWORD'">
                        半角英数字記号で6文字以上で入力してください
                    </div>
                    <div class="text-xs text-red-500"
                        v-if="error.$validator === 'required'">
                        パスワードがないんですけど
                    </div>
                </div>
            </div>
            <div class="flex flex-col h-16 mb-4 p-2 items-center">
                <div class="self-start text-base h-40">password(確認用)</div>
                <input type="password" id="mail" v-model="state.signupPasswordConfirm">
                <div v-for="error in v$.signupPasswordConfirm.$errors"
                    :key="error.$uid">
                    <div class="text-xs text-red-500"
                        v-if="error.$validator === 'sameAsPassword'">
                        同じパスワードを入力してください
                    </div>
                </div>
            </div>
            <div class="flex w-4/5 h-8 my-4 mx-auto justify-center">
                <button v-if="isAllValid" class="btn hover:bg-yellow-700" @click="signingUp">SignUp</button>
                <button v-if="!isAllValid" class="btn btn-disable" disabled>SignUp</button>
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