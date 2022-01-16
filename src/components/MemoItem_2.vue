<script setup lang="ts">
import { defineProps, defineEmits, ref, toRefs, watch } from 'vue'
import useMemoFilters from '../disposable/useMemoFilters'

const props = defineProps({
    categories: Object,
    show: Boolean,
    reset: Number
})

const {
    categories,
    show,
    reset
} = toRefs(props)

defineEmits(['openModal','increment','decrement'])

const {
    displayItems
} = useMemoFilters(category)

const memoItems = ref([])

const deleteMemoItem = (deleteItem) => {
    console.log(memoItems.value);
    memoItems.value.forEach((item, i)=>{
        console.log(i + ':' + item.id + ':' + deleteItem.id);
        if (item.id === deleteItem.id){
            memoItems.value.splice(i, 1)
            return
        }
    })
}

const increment = (incrementItem) => {
    let item = memoItems.value.find(item => item.id === incrementItem.id)
    console.log(item);
    item.value += 1
}

const decrement = (decrementItem) => {
    let item = memoItems.value.find(item => item.id === decrementItem.id)
    item.value -= 1
}

//　↓「買い物メモ」を表示/非表示 後実行
watch(show, () => {
    // オブジェクトの配列についてはObject.assign()で
    // ディープコピーできなかったので以下の方法で行う。
    // 参考: https://crieit.net/posts/JavaScript
    memoItems.value = category.value.items 
        .map((obj) => Object.assign({},obj));
})

watch(reset, () => {
    memoItems.value = category.value.items 
        .map((obj) => Object.assign({},obj));
})
</script>

<template>
    <div class="flex justify-end items-center m-2 bg-white p-2"
        v-for="(item, index) in displayItems"
        v-bind:key="index">
        <!--アイテム-->
        <div class="bg-red-500 -mt-3 h-9 w-2 mr-3"
            v-if="item.period == 1">
        </div>
        <div class="bg-yellow-500 -mt-3 h-9 w-2 mr-3"
            v-else-if="item.period == 2">
        </div>
        <div class="bg-green-500 -mt-3 h-9 w-2 mr-3"
            v-else-if="item.period >= 3">
        </div>
        <div v-else class="-mt-3 h-7 w-2 mr-3">
        </div>
        <div class="mr-auto font-bold">
            <!--アイテム名-->
            {{item.name}}
        </div>
        <div class="mr-3">
            <span>買う個数:</span>
            <button 
                class="font-bold"
                @click="increment(item)">
                <!--プラスボタン-->
                ＋
            </button>
            <span class="border rounded-lg px-4 py-2 text-xs">
                {{item.value}}{{ item.unit_name}}
            </span>
            <button 
                class="font-black"
                @click="decrement(item)">
                <!--マイナスボタン-->
                −
            </button>
        </div>
        <div class="mr-0">
            <button 
                        class="px-4 py-2 bg-red-500 hover:bg-red-700 
                    text-white rounded-lg font-bold text-xs ml-5"
                        @click="deleteMemoItem(item)">
                    削除
                </button><!--削除-->
        </div>
    </div>
</template>

<style scoped>

</style>