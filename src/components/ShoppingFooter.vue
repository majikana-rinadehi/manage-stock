<script setup lang="ts">
import { defineEmits, reactive, computed } from 'vue'
import useMemoItems from '../composable/useMemoItems'
import useMessage from '../composable/useMessage'
import { MailData } from '../composable/types'
import { firebaseApp } from '../settings/firebase.js'
import { getFunctions, httpsCallable } from 'firebase/functions'
import { useLoading } from 'vue-loading-overlay'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

defineEmits(['capture-memo-items'])
const $loading = useLoading()

const {
    mailText,
} = useMemoItems()
const {
    setMessage
} = useMessage()
const state = reactive({
    showMail: false,
    sendTo: "",
    mailSubject: ""
})
const rules = {
    sendTo: { required, email }
}
const v$ = useVuelidate(rules, state)
const validating = async () => {
    await v$.value.$validate()
}
const isAllValid = computed(() => {
    return v$.value.$errors.length === 0
})

const functions = getFunctions(firebaseApp)
const sendMail = httpsCallable(functions, 'sendMail')
const sendLine = httpsCallable(functions, 'sendLine')

const sendingMail = async () => {
    await validating()
    if (isAllValid.value === false) return
    const data: MailData = {
        from: "rudyrudy2103@gmail.com",
        to: state.sendTo,
        subject: state.mailSubject,
        text: mailText.value
    }
    const loader = $loading.show({})
    sendMail(data)
        .then(() => {
            state.showMail = false
            loader.hide()
            setMessage("メールを送信しました", "info", 3000)
        })
        .catch(err => {
            state.showMail = false
            loader.hide()
            setMessage("メールの送信に失敗しました", "error", 3000)
            console.log(err);
        })
}
function creatingMail(): void {
    state.showMail = true
}

/**
 * `mailText.value` の内容をLineで送る
 */
function sendingLine() {
    const data: { text: string } = {
        text: mailText.value
    }
    const loader = $loading.show({})
    sendLine(data)
        .then(() => {
            state.showMail = false
            loader.hide()
            setMessage("Lineを送信しました", "info", 3000)
        })
        .catch(err => {
            state.showMail = false
            loader.hide()
            setMessage("Lineの送信に失敗しました", "error", 3000)
            console.log(err)
        })
}
</script>

<template>
    <div class="flex justify-start justify-between items-end">
        <!--全部買ったボタン-->
        <button
            class="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg font-bold text-xs"
        >全部買った</button>
        <div class="flex">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <button @click="creatingMail()">
                <!--メールで共有-->
                メール/Lineで共有
            </button>
            <div
                class="fixed top-0 left-0 right-0 flex justify-center mt-48"
                v-show="state.showMail"
            >
                <div class="fixed inset-0 bg-gray-400 opacity-50" @click="state.showMail = false">
                    <!--モーダルウィンドウ-->
                </div>
                <!-- メールテキスト -->
                <div class="flex flex-col bg-white relative rounded-xl p-5" style="max-width: 800px;">
                    <div class="self-start text-2xl font-black">
                        買い物メモ
                    </div>
                    <textarea 
                        class="border-4 border-stone-700 font-mono"
                        cols="50" rows="15" v-model="mailText"></textarea>
                    <div class="mt-4">
                        <div class="flex flex-col items-center">
                            <label for="send-to">宛先メールアドレス</label>
                            <input
                                class="border-2 border-stone-700"
                                type="mail"
                                v-model="state.sendTo"
                                id="send-to"
                            />
                        </div>
                        <div v-for="error of v$.sendTo.$errors" :key="error.$uid">
                            <div
                                v-show="error.$validator === 'email'"
                                class="text-xs text-red-600"
                            >メールアドレスの形式が変!</div>
                            <div
                                v-show="error.$validator === 'required'"
                                class="text-xs text-red-600"
                            >メールアドレスがないんですけど</div>
                        </div>
                        <div class="flex justify-center mt-4">
                            <button
                                v-if="isAllValid"
                                class="px-4 py-2 bg-rose-500 hover:bg-rose-800 text-white rounded-lg font-bold text-xs"
                                @click="sendingMail"
                            >メールを送信</button>
                            <button
                                v-if="!isAllValid"
                                class="px-4 py-2 bg-gray-300 text-white rounded-lg font-bold text-xs"
                                disabled
                            >メールを送信</button>
                        </div>
                        <div class="text-center mt-4">
                            =====または=====
                        </div>
                        <div class="flex justify-center mt-4">
                            <button
                                class="px-4 py-2 bg-green-500 hover:bg-green-800 text-white rounded-lg font-bold text-xs"
                                @click="sendingLine"
                            >LINEを送信</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                />
            </svg>
            <button @click="$emit('capture-memo-items')">
                <!--画像で保存-->
                メモのスクショを撮る
            </button>
        </div>
    </div>
</template>
<style scoped>
</style>