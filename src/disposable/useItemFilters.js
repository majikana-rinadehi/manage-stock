/* eslint-disable no-unused-vars */
import { computed, ref, watch, onMounted } from 'vue'

export default function useItemFilters(category){

    const filter = ref(null) // setFilterによってソート関数が割り当てられる
    const computedItems = ref([]) 
    // ↑ CRUD 操作があったときに、category の変化を検知して、
    // category.value.items のディープコピーを代入する

    const filteredItems = ref([]) 
    // ↑ 最終的に Item.vue の template に表示するもの
    // filterが変更されたときに、computedItems.value を
    // 新しい filter でソートしたもののディープコピーを代入する

    const setFilter = (filterKind) => {
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
                return valueA - valueB // 残り期限日数の昇順で並び替え
              }
        } else {
            console.log("no filter");
            filter.value = null
        }
    }

    // const computedItems = computed(() => {
    //     return category.value.items
    // })

    // 初回読み込み時に表示するため
    onMounted(() => {
        computedItems.value = Object.assign([], category.value.items) 
    })

    // watch(category.value や watch(category.value.items
    // では、CRUD 操作があったとき、つまりcategory.value.items
    // に変化があってもwatch が反応しない
    // → category.value.items がリアクティブではないため?
    watch(category, () => { 
        console.log("watched");
        computedItems.value = Object.assign([], category.value.items) 
    })

    watch(filter, () => {
        if (filter.value) {
            console.log("sort start");
            const _filteredItems = computedItems.value.sort(filter.value)
            console.log(_filteredItems); // ← sortByPeriodを押すと_filteredItemsまでは反映される
            // Object.assign(filteredItems.value, _filteredItems) //これではフィルターが反映されない
            filteredItems.value = Object.assign([], _filteredItems)
            return
        }
        Object.assign(filteredItems.value, category.value.items)
    })
    
    const filteredDisplayItems = computed(() => {
        console.log("start compute");
        console.log(filteredItems);
        console.log(filteredItems.value);
        return filteredItems.value.length ?
                filteredItems.value :
                computedItems.value
    })

    return {
        filteredDisplayItems,
        filter,
        setFilter
    }
}
/* eslint-enable no-unused-vars */
