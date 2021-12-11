import { ref, computed } from 'vue'

const memoItems = ref([])
// memoItemsをuseMemoItems()スコープ内に入れると、
// displayItemsが、SyoppingFooter側に反映されない
// その代わり、スコープ外に置くとMemoCategoriesでのincrementがItemにも反映される。。。？

export default function useMemoItems() {
    

    const filter = ref((item) => item.period === 1 )

    const displayItems = computed(() => {
        if(!filter.value) return memoItems.value
        return memoItems.value 
            .filter(filter.value)
    })

    let mailText = ref("")

    const createMail = () => {
        mailText.value = `
買い物ヨロシクゥ！
================
`
        if (displayItems.value.length){
            displayItems.value.forEach(item => {
                mailText.value += `
・${item.name}...${item.value}${item.unit_name}
`
            })
        }
        console.log(mailText.value)
    }
  
    return { memoItems, filter, displayItems, mailText, createMail }
}