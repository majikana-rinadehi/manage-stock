<template>
    <!--③買い物メモ-->
    <div class="fixed  top-0 left-0 right-0 flex justify-center mt-48">
        <div 
            class="fixed inset-0 bg-gray-400 opacity-50"
            @click="$emit('closeList')"></div>
        <div class="bg-white relative rounded-xl p-5"
            style="min-width: 400px;">
            <div class="text-2xl font-black">
                <!--買い物メモ-->
                買い物メモ
            </div>
            <div class="flex justify-end">
                <div class="justify-self-start mr-auto">
                    <!--戻るボタン-->
                    <button 
                        class="text-xl"
                        @click="$emit('closeList')">←</button>
                </div>
                <div>
                    <button
                        @click="resetItems"
                        class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 
                        text-white rounded-lg mr-2 font-bold text-xs">
                            リセット
                    </button>
                </div>
            </div>
            <div class="flex-col justify-between bg-gray-200 m-4 p-2 text-sm">
                <!-- アイテムをカテゴリごとに表示 -->
                <div class="bg-gray-200 p-2 text-sm m-auto" style="min-width: 420px;"
                  v-for="(category, index) in displayCategories"
                  v-bind:key="index">
                    <!--カテゴリアイテム-->
                    <div class="font-black text-lg">
                        <!--カテゴリ名-->
                        {{category.name}}
                    </div>
                    <MemoItem
                        :reset="resetToggle"
                       :show="show"
                       :category="category"/>
            </div>
            <div class="flex justify-start">
                <!--全部買ったボタン-->
                <button class="px-4 py-2 bg-green-500 hover:bg-green-700 
                    text-white rounded-lg font-bold text-xs">全部買った</button>
            </div>
            <div class="flex mt-4">
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <div>
                        <!--メールで共有-->
                        メールで共有
                    </div>
                </div>
            </div>
            <div class="flex mt-4">
                <div class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                    </svg>
                    <div>
                        <!--画像で保存-->
                        画像で保存
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
import MemoItem from './MemoItem.vue'

export default {
    name: 'ShoppingList',
    components: {
        MemoItem
    },
    props: ['show','displayCategories'],
    data(){
        return {
            resetToggle: 1
        }
    },
    methods: {
        resetItems(){
            this.resetToggle *= -1
        }
    }

}
</script>
<style scoped>

</style>