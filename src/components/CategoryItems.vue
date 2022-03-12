<script setup lang="ts">
import { defineProps, defineEmits, toRefs, ref } from 'vue'
import Item from './Item'
import useItemSorters from '../composable/useItemSorters'
import useDatabase from '../composable/useDatabase'
import { DisplayCategory, CategoryItemsSorterType } from '@/composable/types'
import ConfirmPopup from './ConfirmPopup'

const props = defineProps<{ // eslint-disable-line vue/valid-define-props
    category: DisplayCategory 
}>() 

defineEmits(['openModal'])
const {
    deleteAllItems
} = useDatabase()
const { category } = toRefs(props)
const { 
    sortedDisplayItems,
    sorter,
    changeSorter
} = useItemSorters(category)

const showConfirm = ref(false)

/** カテゴリ削除確認ポップアップを表示 */
const showingDeleteConfirm = () => {
    showConfirm.value = true
}
const closeConfirm = () => {
    showConfirm.value = false
}
const changingSorter = (sorterKind: CategoryItemsSorterType) => {
    changeSorter(sorterKind)
}
</script>
<template>
    <ConfirmPopup
        v-show="showConfirm"
        @close="closeConfirm"
        @yes="deleteAllItems(category)">
        アイテム全削除していいの？？？
    </ConfirmPopup>
    <div class="flex justify-evenly my-2"
        v-show="sortedDisplayItems.length">
        <button 
            :class="sorter?.sorterType === 'period' ? ['px-1', 'rounded-2xl', 'bg-gray-300'] : []"
            @click="changingSorter('period')">期限</button>
        <button
            :class="sorter?.sorterType === 'value' ? ['px-1', 'rounded-2xl', 'bg-gray-300'] : []"
            @click="changingSorter('value')">数量</button>
        <button 
            :class="sorter?.sorterType === 'addDate' ? ['px-1', 'rounded-2xl', 'bg-gray-300'] : []"
            @click="changingSorter('addDate')">作成日</button>
        <button 
            @click="showingDeleteConfirm">全削除</button>
    </div>
    <div class="flex justify-end m-2 bg-white p-2"
        v-for="(item, index) in sortedDisplayItems"
        v-bind:key="index"
        @click="$emit('openModal', item)">
        <Item
            :item="item"/>
    </div>
</template>

<style scoped>

</style>