/* eslint-disable no-unused-vars */
import { computed, ref, ComputedRef } from 'vue'
import { DisplayCategory, Item } from './types'
import { Ref } from '@vue/reactivity'
import moment from 'moment'

export default function useItemFilters(category: Ref<DisplayCategory>){

    const filter: Ref<null | ((a: Item, b: Item) => number)> = ref(
        (itemA: Item, itemB: Item) => {
            const valueA = itemA.add_date
            const valueB = itemB.add_date
            return moment(valueA).isAfter(valueB) ? 1 : -1 // 作成日時の昇順で並び替え
          }
    ) // setFilterによってソート関数が割り当てられる

    const setFilter = (filterKind: string) => {
        if (filterKind === 'sortByPeriod'){
            console.log("sortByPeriod");
            filter.value = (itemA, itemB) => {
                const periodA = itemA.period
                const periodB = itemB.period
                return periodA - periodB // 残り期限日数の昇順で並び替え
              }

        } else if(filterKind === 'sortByValue'){
            console.log("sortByValue");
            filter.value = (itemA, itemB) => {
                const valueA = itemA.value
                const valueB = itemB.value
                return valueA - valueB // 残り個数の昇順で並び替え
              }
        } else if(filterKind === 'sortByAddDate'){
            console.log("sortByAddDate");
            filter.value = (itemA, itemB) => {
                const valueA = itemA.add_date
                const valueB = itemB.add_date
                return moment(valueA).isAfter(valueB) ? 1 : -1 // 作成日時の昇順で並び替え
              }
        } else {
            console.log("no filter");
            filter.value = null
        }
    }
    
    const filteredDisplayItems: ComputedRef<Item[]> = computed(() => {
        console.log("start compute");
        console.log("filter")
        console.log(filter.value)
        console.log("category.value.items")
        console.log(category.value.items)
        return filter.value
            ? category.value.items.sort(filter.value)
            : category.value.items
    })

    return {
        filteredDisplayItems,
        filter,
        setFilter
    }
}
/* eslint-enable no-unused-vars */
