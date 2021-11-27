<template>
    <!--③買い物メモ-->
    <div class="overflow-y-scroll fixed  top-0 left-0 right-0 flex justify-center mt-48"
        style="max-height: 70%;">
    <!-- ↑ここにoverflow-y-scroll、 max-height...で少しだけスクロールするようになった -->
        <div 
            class="fixed inset-0 bg-gray-400 opacity-50"
            @click="$emit('closeList')"></div>
        <!-- ここからモーダルコンテンツ -->
        <div class="bg-white relative rounded-xl p-5"
            style="min-width: 400px; max-height: 90%;">
            <!--タイトル「買い物/Todo」メモ-->
            <div class="text-2xl font-black">
                {{ listTitle }}
            </div>
            <!-- ヘッダー -->
            <div class="flex justify-end">
                <!--戻るボタン-->
                <div class="justify-self-start mr-auto">
                    <button 
                        class="text-xl"
                        @click="$emit('closeList')">←</button>
                </div>
                <!-- リセットボタン -->
                <div>
                    <button
                        @click="resetItems"
                        class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 
                        text-white rounded-lg mr-2 font-bold text-xs">
                            リセット
                    </button>
                </div>
            </div>
            <!-- アイテム表示欄 スクロールする -->
            <div class="overflow-y-scroll flex-col justify-between bg-gray-200 m-4 p-2 text-sm"
                style="max-height: 70%;">
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
        </div>
        <ShoppingFooter/>
    </div>
    </div>
</template>
<script>
import MemoItem from './MemoItem.vue'
import ShoppingFooter from './ShoppingFooter.vue'

export default {
    name: 'ShoppingList',
    components: {
        MemoItem,
        ShoppingFooter
    },
    props: ['show','displayCategories','listTitle'],
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