import { ref } from 'vue'
import useDatabase from './useDatabase'
const {
    deleteItems 
} = useDatabase()

type itemIds = Array<string>
/**
 * 選択されたアイテムのIDを格納する配列
 */
const selectedItems = ref<itemIds>([])

const showCheckbox = ref(false)

export default function useSelectDelete(){

    const deleteSelectedItems = async () => {
        if (selectedItems.value.length) {
            await deleteItems(selectedItems.value)
        }

        resetSelect()

        showCheckbox.value = false
    }

    const resetSelect = () => {
        selectedItems.value = []
    }

    const canselSelect = () => {
        resetSelect()
        showCheckbox.value = false
    }

    return {
        selectedItems,
        showCheckbox,
        deleteSelectedItems,
        resetSelect,
        canselSelect
    }
}