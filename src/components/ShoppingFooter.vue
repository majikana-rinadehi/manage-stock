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
import useClipboard from '../composable/useClipboard'

defineEmits(['capture-memo-items'])
const $loading = useLoading()

const {
    mailText,
} = useMemoItems()
const {
    setMessage
} = useMessage()
const {
    toClipboard
} = useClipboard()
const state = reactive({
    showMail: false,
    /** 「LINEで送るとは？」ポップアップ */
    showLinePopup: false,
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

const onCopy = async () => {
    try {
        await toClipboard(mailText.value)
        console.log('Copied to Clipboard')
    } catch (error) {
        console.error(error)
    }
}

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
    <div class="mb-8 flex justify-start justify-between items-end">
        <!--全部買ったボタン-->
        <button class="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg font-bold text-xs">全部買った</button>
        <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <button @click="creatingMail()">
                <!--メールで共有-->
                メール/Lineで共有
            </button>
            <!-- メール/LINEで共有モーダル -->
            <div class="fixed top-0 left-0 right-0 flex justify-center mt-48" v-show="state.showMail">
                <div class="fixed inset-0 bg-gray-400 opacity-50" @click="state.showMail = false">
                    <!--モーダルウィンドウ-->
                </div>
                <!-- メールテキスト -->
                <div class="flex flex-col bg-white relative rounded-xl p-5 pb-8" style="max-width: 800px;">
                    <div class="flex justify-end">
                        <div class="mr-auto text-2xl font-black">
                            買い物メモ
                        </div>
                        <svg @click="onCopy" 
                            class="bi bi-clipboard hover:bg-slate-300 cursor-pointer" 
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        </svg>
                    </div>
                    <textarea class="border-4 border-stone-700 font-mono p-4" cols="50" rows="15"
                        v-model="mailText"></textarea>
                    <div class="my-4">
                        <div class="flex flex-col items-center">
                            <label for="send-to">宛先メールアドレス</label>
                            <input class="border-2 border-stone-700" type="mail" v-model="state.sendTo" id="send-to" />
                        </div>
                        <div v-for="error of v$.sendTo.$errors" :key="error.$uid">
                            <div v-show="error.$validator === 'email'" class="text-xs text-red-600">メールアドレスの形式が変!</div>
                            <div v-show="error.$validator === 'required'" class="text-xs text-red-600">メールアドレスがないんですけど
                            </div>
                        </div>
                        <div class="flex justify-center mt-4">
                            <button v-if="isAllValid"
                                class="px-4 py-2 bg-rose-500 hover:bg-rose-800 text-white rounded-lg font-bold text-xs"
                                @click="sendingMail">メールを送信</button>
                            <button v-if="!isAllValid"
                                class="px-4 py-2 bg-gray-300 text-white rounded-lg font-bold text-xs"
                                disabled>メールを送信</button>
                        </div>
                        <div class="text-center mt-4">=====または=====</div>
                        <div class="flex justify-center mt-4">
                            <button
                                class="px-4 py-2 bg-green-500 hover:bg-green-800 text-white rounded-lg font-bold text-xs"
                                @click="sendingLine">LINEを送信</button>
                        </div>
                        <div>
                            <a class="text-xs hover:text-blue-500 hover:underline" href="#"
                                @click="state.showLinePopup = true">「LINEを送信」とは？</a>
                        </div>
                        <div class="mt-4 -mb-20 mx-auto flex justify-center items-center border rounded-full border-gray-500 text-base w-12 h-12 bg-white shadow-around cursor-pointer"
                            style="left:calc(50% - 3rem/2);" @click="state.showMail = false">X</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd" />
            </svg>
            <button @click="$emit('capture-memo-items')">
                <!--画像で保存-->
                メモのスクショを撮る
            </button>
        </div>
    </div>
    <!-- 「LINEで送るとは？」ポップアップ」 -->
    <div class="fixed top-0 left-0 right-0 flex justify-center mt-48" v-show="state.showLinePopup">
        <div class="fixed inset-0 bg-gray-400 opacity-50" @click="state.showLinePopup = false">
            <!--モーダルウィンドウ-->
        </div>
        <div class="flex flex-col bg-white relative rounded-xl py-12 px-28 max-w-md">
            公式ラインに買い物メッセージが送られます。
            <img class="max-w-xs" src="../assets/line_capture.jpg" alt="LINEキャプチャー画面" />
            <div class="mt-4 -mb-20 mx-auto flex justify-center items-center border rounded-full border-gray-500 text-base w-12 h-12 bg-white shadow-around cursor-pointer"
                @click="state.showLinePopup = false">X</div>
        </div>
    </div>
</template>
<style scoped>
.close-btn-temp {
    margin-top: 1rem;
    margin-bottom: -5rem;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10rem;
    border: 1px solid gray;
    font-size: 1rem;
    width: 3rem;
    height: 3rem;
    background: white;
    box-shadow: 0 0 1em rgb(109 101 101);
    cursor: pointer;
}
</style>