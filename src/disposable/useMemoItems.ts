import { ref, computed, watch } from 'vue'
import { Ref } from '@vue/reactivity'
import { MemoItem } from './types'

const memoItems: Ref<Array<MemoItem>> = ref([])
// memoItemsをuseMemoItems()スコープ内に入れると、
// displayItemsが、SyoppingFooter側に反映されない
// その代わり、スコープ外に置くとMemoCategoriesでのincrementがItemにも反映される。。。？

export default function useMemoItems() {

    const filter = ref((item: MemoItem) => item.period === 1 )

    const displayItems = computed(() => {
        if(!filter.value) return memoItems.value
        return memoItems.value 
            .filter(filter.value)
    })

    let mailText = ref("")

    watch(displayItems, (newValue)=>{
        console.log("displayItems changed")
        console.log(displayItems.value)
        console.log(newValue)
        mailText.value = `
買い物ヨロシクゥ！
================
`
        if (newValue.length){
            newValue.forEach(item => {
                mailText.value += `
・${item.name}...${item.value}${item.unit_name}
`
            })
        }
    })
  
    return { memoItems, filter, displayItems, mailText }
}