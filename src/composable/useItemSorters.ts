import { computed, ref, ComputedRef } from 'vue'
import { DisplayCategory, Item, CategoryItemsSorterType } from './types'
import { Ref } from '@vue/reactivity'
import { CATEGORY_ITEMS_SORTER_MAP } from './constants'

export default function useItemSorters(category: Ref<DisplayCategory>){

    const sorter = ref(CATEGORY_ITEMS_SORTER_MAP['addDate']) 

    /**
     * *sorter* を変更する
     * @param sorterKind 変更する *sorter* の名前
     */
    const changeSorter = (sorterKind: CategoryItemsSorterType) => {
        sorter.value = CATEGORY_ITEMS_SORTER_MAP[sorterKind]
    }
    
    const sortedDisplayItems: ComputedRef<Item[]> = computed(() => {
        return sorter.value
            ? category.value.items.sort(sorter.value.sorter)
            : category.value.items
    })

    return {
        sortedDisplayItems,
        sorter,
        changeSorter
    }
}
