<script setup>
import { defineEmits, ref } from 'vue'
import useMemoItems from '../disposable/useMemoItems.js'
defineEmits(['capture-memo-items'])

const {
    createMail,
    mailText,
} = useMemoItems()

const showMail = ref(false)

function creatingMail(){
    createMail()
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
                メールで共有
            </div>
            <div class="fixed  top-0 left-0 right-0 flex justify-center mt-48"
                v-show="showMail">
                <div 
                    class="fixed inset-0 bg-gray-400 opacity-50"
                    @click="showMail=false">
                    <!--モーダルウィンドウ-->
                </div>
                <div class=" bg-white relative rounded-xl p-5"
                    style="max-width: 800px;">
                    <textarea name="" id="" cols="50" rows="20"
                        v-model="mailText">
                    </textarea>
                </div> 
            </div>               
        </div>
        <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
            </svg>
            <div @click="$emit('capture-memo-items')">
                <!--画像で保存-->
                画像で保存
            </div>
        </div>
    </div>
</template>>