import { ref, computed, watch } from 'vue'
import { Ref } from '@vue/reactivity'
import { MemoItem, MemoFilterType } from './types'
import { MEMO_FILTER_MAP } from './constants'

const memoItems: Ref<Array<MemoItem>> = ref([])
const mailText = ref("")
/**
 * フィルター
 * ※このスコープに置かないと、メモアイテム追加、メモアイテム数量編集
 * した時に *`'value'`* に戻ってしまう
 */
const filter = ref(MEMO_FILTER_MAP['value'])

export default function useMemoItems() {

    const displayItems = computed(() => {
        console.log("computing displayItems")
        if(!filter.value) return memoItems.value
        console.log("filter.value")
        console.log(filter.value)
        return memoItems.value 
        .filter(filter.value.filter)
    })

    // このスコープにあるとリアクティブにならない
    // const mailText = ref("")

    /**
     * filterを変更する
     * @param filterType このフィルター名に変更する
     */
    const changeFilter = (filterType: MemoFilterType) => {
        filter.value = MEMO_FILTER_MAP[filterType]
    }

    // watch(memoItems, ...) を watch(displayItems, ...)より先に記述することで、
    // watchされる順番もmemoItems => displayItems の順になり、
    // 初期表示時のmailText.valueが正しい値になる(memoItemsではなくdisplayItemsから生成される)
    watch(memoItems, (newValue) => {
        console.log("memoItems changed")
        console.log(memoItems.value)
        console.log(newValue)
        mailText.value = generateMailText(newValue)
        // Vue 3.xでは、配列の*変更*(置き換えではなく)を監視するには明示的に deep オプションを付ける必要あり
        // https://v3.ja.vuejs.org/guide/migration/watch.html#%E6%A6%82%E8%A6%81
    }, {deep: true})

    watch(displayItems, (newValue)=>{
        console.log("displayItems changed")
        console.log(displayItems.value)
        console.log(newValue)
        mailText.value = generateMailText(newValue)
    })

    /**
     * @param memoItems *`watch`* 内で渡される *displayItems*または*memoItems*の変更後の値
     * @returns 生成された mailtext
     */
    const generateMailText = (memoItems: Array<MemoItem>): string => {
        let result = '買い物ヨロシクゥ！' + '\n' + '================' + '\n'
        memoItems.forEach(item => {
            // ・トマト: 1個
            result += '\n' + `・${item.name}: ${item.value}${item.unit_name}` + '\n'
        })
        return result
    }
  
    return { memoItems, filter, displayItems, mailText, changeFilter }
}