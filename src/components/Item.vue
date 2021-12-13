<script setup>
import { defineProps, defineEmits, toRefs, ref } from 'vue'
import useItemFilters from '../disposable/useItemFilters.js'
import useDatabase from '../disposable/useDatabase.js'
import useSelectDelete from '../disposable/useSelectDelete'

const props = defineProps({
    category: Object,
})

defineEmits(['openModal','incrementValue','decrementValue'])
const {
    deleteAllItems
} = useDatabase()
const { category } = toRefs(props)
console.log(category.value);
const { 
    filteredDisplayItems,
    setFilter
} = useItemFilters(category)
const {
    selectedItems,
    showCheckbox
} = useSelectDelete()
</script>
<template>
    <div class="flex justify-evenly my-2">
        <button @click="setFilter('sortByPeriod')">期限で並び替え</button>
        <button @click="setFilter('sortByValue')">数量で並び替え</button>
        <button @click="deleteAllItems(category)">全削除</button>
    </div>
    <div class="flex justify-end m-2 bg-white p-2"
        v-for="(item, index) in filteredDisplayItems"
        v-bind:key="index"
        @click="$emit('openModal', item)">
        <!-- 選択削除ボタン -->
        <div v-show="showCheckbox" 
            @click.stop="">
            <input 
                type="checkbox" 
                v-model="selectedItems.indexOf(item.id) !== -1"
                @input="selectedItems.push(item.id)">
        </div>
        <!--アイテム-->
        <div class="bg-red-500 -mt-2 h-7 w-2 mr-3"
            v-if="item.period == 1">
        </div>
        <div class="bg-yellow-500 -mt-2 h-7 w-2 mr-3"
            v-else-if="item.period == 2">
        </div>
        <div class="bg-green-500 -mt-2 h-7 w-2 mr-3"
            v-else-if="item.period >= 3">
        </div>
        <div v-else class="-mt-2 h-7 w-2 mr-3">
        </div>
        <div class="mr-auto font-bold">
            <!--アイテム名-->
            {{item.name}}
        </div>
        <div class="mr-3">
            <button 
                class="font-bold"
                @click.stop="$emit('incrementValue', item.id)">
                <!--プラスボタン-->
                ＋
            </button>
            <span class="border rounded-lg px-4 py-2 text-xs">
                {{item.value + item.unit_name}}
            </span>
            <button 
                class="font-black"
                @click.stop="$emit('decrementValue', item.id)">
                <!--マイナスボタン-->
                −
            </button>
        </div>
        <div class="mr-0">
            <!--あと何日-->
            <span class="border rounded-lg px-4 py-2 text-xs">
                {{item.period}}日
            </span>
        </div>
    </div>
</template>

<style scoped>

</style>