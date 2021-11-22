import { getDatabase, ref, remove } from 'firebase/database'
import { useAuth } from './useAuth.js'

const { user } = useAuth()
const db = getDatabase()

const useDatabase = () => {

    const fetchAllItems = () => {
        const uid = user.value ? user.value.uid : ""
        const itemsRef = ref(db, `users/${uid}/items`)
        return itemsRef
    }

    const fetchAllCategories = () => {
        const uid = user.value ? user.value.uid : ""
        const categoriesRef = ref(db, `users/${uid}/categories`)
        return categoriesRef
    }

    const deleteAllItems = () => {
        return remove(fetchAllItems()) 
    }

    return { fetchAllItems, fetchAllCategories, deleteAllItems }
}

export { useDatabase }