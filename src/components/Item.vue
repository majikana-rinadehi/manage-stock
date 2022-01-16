<script setup lang="ts">
import { defineProps, defineEmits, toRefs, computed } from 'vue'
import useDatabase from '../disposable/useDatabase'
import useSelectDelete from '../disposable/useSelectDelete'
import type { Item } from '../disposable/types'

const props = defineProps<{ item: Item }>() // eslint-disable-line vue/valid-define-props

defineEmits(['incrementValue','decrementValue'])
const {
    incrementValue,
    decrementValue
} = useDatabase()
const { item } = toRefs(props)
const {
    selectedItems,
    showCheckbox
} = useSelectDelete()
const toggleSelected = () => {
    const index = selectedItems.value.indexOf(item.value.id)
    if(index !== -1){
        selectedItems.value.splice(index, 1)
        return
    }
    selectedItems.value.push(item.value.id)
}
const isSelected = computed(() => {
    return selectedItems.value.indexOf(item.value.id) !== -1;
})
</script>
<template>
    <div v-show="showCheckbox" 
        @click.stop="">
        <input 
            type="checkbox" 
            v-model="isSelected"
            @input="toggleSelected">
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
            @click.stop="incrementValue(item.id)">
            <!--プラスボタン-->
            ＋
        </button>
        <span class="border rounded-lg px-4 py-2 text-xs">
            {{item.value + item.unit_name}}
        </span>
        <button 
            class="font-black"
            @click.stop="decrementValue(item.id)">
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
</template>

<style scoped>

</style>