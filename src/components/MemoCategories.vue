<script setup lang="ts">
import { defineProps, defineEmits, toRefs, watch } from 'vue'
import useMemoItems from '../disposable/useMemoItems'
import ItemAdd_2 from './ItemAdd_2.vue'
import { Item, DisplayCategory } from '../disposable/types'


const props = defineProps<{ // eslint-disable-line vue/valid-define-props
    displayCategories: DisplayCategory[], 
    show: boolean, 
    reset:  number 
}>() 

const {
    displayCategories, show, reset
} = toRefs(props)

const { 
    memoItems, filter, displayItems
} = useMemoItems()
defineEmits(['openModal','increment','decrement'])

function addMemoItem(item_name: string){
    memoItems.value.push({
        "id":"",
        "category_id":"",
        "category_name":"",
        "name":item_name,
        "value":1,
        "period":1,
        "unit_name":""
    })
}

function deleteMemoItem(deleteItem: Item){
        memoItems.value.forEach((item, i)=>{
            if (item.id === deleteItem.id){
                memoItems.value.splice(i, 1)
                return
            }
        })
    }
function increment(incrementItem: Item){
    let item = memoItems.value.find(item => item.id === incrementItem.id)
    item.value += 1
}
function decrement(decrementItem: Item){
    let item = memoItems.value.find(item => item.id === decrementItem.id)
    item.value -= 1
}
watch(show, () => {
    // オブジェクトの配列についてはObject.assign()で
    // ディープコピーできなかったので以下の方法で行う。
    // 参考: https://crieit.net/posts/JavaScript
    const _memoItems: Item[] = []
    displayCategories.value.forEach(category => {
        if (!category.items.length) return
        category.items.forEach(item => {
            _memoItems.push(item)
        })
        _memoItems.push(category.items)
    })
    memoItems.value = _memoItems
        .map((obj) => Object.assign({},obj))
    // memoItems.value = Object.assign([], _memoItems)
})
watch(reset, () => {
    const _memoItems: Item[] = []
    displayCategories.value.forEach(category => {
        if (!category.items.length) return 
        category.items.forEach(item => {
            if(item) _memoItems.push(item)
        })
        _memoItems.push(category.items)
    })
    memoItems.value = _memoItems
        .map((obj) => Object.assign({},obj))
    // memoItems.value = Object.assign([], _memoItems)
})
</script>
<template>

    <div class="flex flex-col bg-gray-100">
        <div>絞り込み</div>
        <div class="flex justify-evenly">
            <div><button @click="filter = (item) => item.value === 1">数量残り1</button></div>
            <div><button @click="filter = (item) => item.period === 1">期限残り1日</button></div>
            <div><button @click="filter = null">フィルターなし</button></div>
        </div>
    </div>
    

    <!-- id="capture-items-target"をここに移動 -->
    <div id="capture-items-target" 
        class="bg-gray-200 p-2 text-sm m-auto" style="min-width: 420px;">
                    <!--カテゴリアイテム-->
        <div class="font-black text-lg">
            <!--カテゴリ名-->
        </div>
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
        <ItemAdd_2
            @item-added="addMemoItem"/>
    </div>
    
    
</template>

<style scoped>

</style>