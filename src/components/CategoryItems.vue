<script setup lang="ts">
import { defineProps, defineEmits, toRefs, ref } from 'vue'
import Item from './Item'
import useItemFilters from '../composable/useItemFilters'
import useDatabase from '../composable/useDatabase'
import { DisplayCategory } from '@/composable/types'
import ConfirmPopup from './ConfirmPopup'

const props = defineProps<{ // eslint-disable-line vue/valid-define-props
    category: DisplayCategory 
}>() 

defineEmits(['openModal','incrementValue','decrementValue'])
const {
    deleteAllItems
} = useDatabase()
const { category } = toRefs(props)
const { 
    filteredDisplayItems,
    setFilter
} = useItemFilters(category)

const showConfirm = ref(false)

const showDeleteConfirm = () => {
    showConfirm.value = true
}

const closeConfirm = () => {
    showConfirm.value = false
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
        v-show="filteredDisplayItems.length">
        <button @click="setFilter('sortByPeriod')">期限</button>
        <button @click="setFilter('sortByValue')">数量</button>
        <button @click="setFilter('sortByAddDate')">作成日</button>
        <button @click="showDeleteConfirm">全削除</button>
    </div>
    <div class="flex justify-end m-2 bg-white p-2"
        v-for="(item, index) in filteredDisplayItems"
        v-bind:key="index"
        @click="$emit('openModal', item)">
        <Item
            :item="item"/>
    </div>
</template>

<style scoped>

</style>