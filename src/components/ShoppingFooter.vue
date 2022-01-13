<script setup>
import { defineEmits, ref } from 'vue'
import useMemoItems from '../disposable/useMemoItems.js'
import useMessage from '../disposable/useMessage.js'
import { firebaseApp } from '../settings/firebase.js'
import { getFunctions, httpsCallable } from 'firebase/functions'
defineEmits(['capture-memo-items', 'open-capture'])

const {
    mailText,
} = useMemoItems()
const {
    setMessage
} = useMessage()

const showMail = ref(false)
const sendTo = ref("")
const mailSubject = ref("")
const functions = getFunctions(firebaseApp)
const sendMail = httpsCallable(functions, 'sendMail')
const sendingMail = () =>{
    const data = {}
    data["from"] = "rudyrudy2103@gmail.com",
    data["to"] = sendTo.value,
    data["subject"] = mailSubject.value,
    data["text"] = mailText.value

    sendMail(data)
        .then(() => {
            showMail.value = false
            setMessage("メールを送信しました","info",3000)
        })
        .catch(err => {
            showMail.value = false
            setMessage("メールの送信に失敗しました","error",3000)
            console.log(err);
        })
}
const sendLine = httpsCallable(functions, 'sendLine')
const sendingLine = () => {
    const data = {}
    data['text'] = mailText.value
    sendLine(data)
        .then(() => {
            showMail.value = false
            setMessage("LINEを送信しました","info",3000)
        })
        .catch(err => {
            showMail.value = false
            setMessage("LINEの送信に失敗しました","error",3000)
            console.log(err);
        })
}

function creatingMail(){
    showMail.value = true
}
</script>

<template>
    <div class="flex justify-start justify-between">
        <!--全部買ったボタン-->
        <button class="px-4 py-2 bg-green-500 hover:bg-green-700 
            text-white rounded-lg font-bold text-xs">全部買った</button>
        <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <div @click="creatingMail()">
                <!--メールで共有-->
                メール/Lineで共有
            </div>
            <div class="fixed  top-0 left-0 right-0 flex justify-center mt-48"
                v-show="showMail">
                <div 
                    class="fixed inset-0 bg-gray-400 opacity-50"
                    @click="showMail=false">
                    <!--モーダルウィンドウ-->
                </div>
                <!-- メールテキスト -->
                <div class=" bg-white relative rounded-xl p-5"
                    style="max-width: 800px;">
                    <textarea name="" id="" cols="50" rows="20"
                        v-model="mailText">
                    </textarea>
                    <div>
                        <label for="send-to">宛先メールアドレス</label>
                        <input type="mail" v-model="sendTo" id="send-to">
                        <div>
                            <button @click="sendingMail">メールを送信</button>
                        </div>
                        <div>
                            <button @click="sendingLine">LINEを送信</button>
                        </div>
                    </div>
                </div> 
            </div>               
        </div>
        <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
            <div @click="$emit('capture-memo-items'), $emit('open-capture')">
                <!--画像で保存-->
                画像で保存
            </div>
        </div>
    </div>
</template>>