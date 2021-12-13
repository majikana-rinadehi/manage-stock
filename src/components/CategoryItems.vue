<script setup>
import { defineProps, defineEmits, toRefs } from 'vue'
import Item from './Item.vue'
import useItemFilters from '../disposable/useItemFilters.js'
import useDatabase from '../disposable/useDatabase.js'

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
        <Item
            :item="item"/>
    </div>
</template>

<style scoped>

</style>