import { ref, computed, watch } from 'vue'
import { Ref } from '@vue/reactivity'
import { MemoItem, MemoFilterType } from './types'
import { MEMO_FILTER_MAP } from './constants'

const memoItems: Ref<Array<MemoItem>> = ref([])

export default function useMemoItems() {

    const filter = ref(MEMO_FILTER_MAP['value'])

    const displayItems = computed(() => {
        if(!filter.value) return memoItems.value
        return memoItems.value 
            .filter(filter.value.filter)
    })

    const mailText = ref("")

    /**
     * filterを変更する
     * @param filterType このフィルター名に変更する
     */
    const changeFilter = (filterType: MemoFilterType) => {
        filter.value = MEMO_FILTER_MAP[filterType]
    }

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
  
    return { memoItems, filter, displayItems, mailText, changeFilter }
}