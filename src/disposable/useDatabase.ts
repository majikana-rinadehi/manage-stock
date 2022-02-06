/* eslint-disable no-unused-vars */
import { 
    query,
    onSnapshot,
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    increment,
    writeBatch
} from 'firebase/firestore'
import { db } from '../settings/firebase.js'
import { useAuth } from './useAuth'
import { ref, computed, ComputedRef } from 'vue'
import  useMessage  from './useMessage'
import { Item, DBItem, Category, DisplayCategory, EditForm } from './types'
import moment from 'moment'

const {
    user
} = useAuth()

const {
    setMessage
} = useMessage()

export default function useDatabase(){
    const items = ref<Item[]>([])
    const categories = ref<Category[]>([])

    const useListener = () => {
         
        // listener for items
        // called in Home.vue by onMounted()
        function setListener(){
            const uid = user.value ? user.value.uid : ""
            const itemsQuery = query(collection(db, `users/${uid}/items`))
            const unsubItems = onSnapshot(itemsQuery, querySnapshot => {
                const _items: Array<Item> = []
                querySnapshot.forEach(doc => {
                    const data = doc.data()
                    _items.push({
                        "id": doc.id,
                        "category_id": data.category_id,
                        "category_name": data.category_name,
                        "name": data.name,
                        "value": data.value,
                        "period": data.period,
                        "unit_name": data.unit_name,
                        "add_date": data.add_date,
                        "upd_date": data.upd_date
                    })
                })
                items.value = _items
            })

            // listener for categories
            const categoriesQuery = query(collection(db, `users/${uid}/categories`))
            const unsubCategories = onSnapshot(categoriesQuery, querySnapshot => {
                const _categories: Category[] = []
                querySnapshot.forEach(doc => {
                    _categories.push({
                        id: doc.id,
                        name: doc.data().name
                    })
                })
                categories.value = _categories
            })    
        }
    
        return { items, categories, setListener }
    }

    // nested items in each categories
    // to display in Home.vue
    const computedCategories: ComputedRef<DisplayCategory[]>  = computed(() => {
        const displayCategories: DisplayCategory[] = []
        categories.value.map(category => {
          const dispItems = ref<Item[]>()
          console.log(items.value);
          dispItems.value = items.value.filter(item => {
              console.log(item.category_id, category.id);
            return item.category_id.toString() === category.id // return を忘れないこと!
          })
          console.log(dispItems.value);
          displayCategories.push({  
            id: category.id,
            name: category.name,
            items: dispItems.value
          })
        })
        return displayCategories
      })

      const addItem = async (itemName: string, categoryId: string, categoryName: string) => {
        const uid = user.value ? user.value.uid : ""
        const sysdate = moment(new Date()).toISOString()
        const newItem: DBItem = {
            "category_id": categoryId,
            "category_name": categoryName,
            "name": itemName,
            "value": 1,
            "period": 1,
            "unit_name": "",
            "add_date": sysdate,
            "upd_date": sysdate 
        }
        const docRef = await addDoc(collection(db, `users/${uid}/items`), newItem)
        console.log(docRef);
        setMessage("アイテムを追加しました","info",3000)
      }

      const addCategory = async(categoryName: string) => {
        const uid = user.value ? user.value.uid : ""
        const docRef = await addDoc(collection(db, `users/${uid}/categories`), {
            "name": categoryName
        })
        console.log(docRef);
        setMessage("カテゴリを追加しました","info",3000)
      }

    const updateItem = async (form: EditForm) => {
        const uid = user.value ? user.value.uid : ""
        const itemId = form.id
        const addDate = form.add_date
        const sysdate = moment(new Date()).toISOString()
        const newItem: DBItem = {
            "category_id": form.category_id,
            "category_name": form.category_name,
            "name": form.name,
            "value": form.value,
            "period": form.period,
            "unit_name": form.unit_name,
            "add_date": addDate,
            "upd_date": sysdate
        }
        const itemRef = doc(db, `users/${uid}/items/${itemId}`)
        await updateDoc(itemRef, newItem)
        setMessage("アイテムを更新しました","info",3000)
    }

    const deleteItem = async (itemId: string) => {
        const uid = user.value ? user.value.uid : ""
        await deleteDoc(doc(db, `users/${uid}/items/${itemId}`))
        setMessage("アイテムを削除しました","info",3000)
    }

    const deleteCategory = async(categoryId: string) => {
        const uid = user.value ? user.value.uid : ""
        await deleteDoc(doc(db, `users/${uid}/categories/${categoryId}`))
        setMessage("カテゴリを削除しました","info",3000)
    }

    const deleteItems = async (itemIds: string[]) => {
        const uid = user.value ? user.value.uid : ""
        const batch = writeBatch(db)
        itemIds.forEach(itemId => {
            batch.delete(doc(db, `users/${uid}/items/${itemId}`))
        })
        await batch.commit()
        setMessage("複数アイテムを削除しました","info",3000)
    }

    const deleteAllItems = async (category: DisplayCategory) => {
        const uid = user.value ? user.value.uid : ""
        const batch = writeBatch(db)
        category.items.forEach(item => {
            const itemId = item.id
            batch.delete(doc(db, `users/${uid}/items/${itemId}`))
        })
        await batch.commit()
        setMessage("全アイテムを削除しました","info",3000)
    }

    const incrementValue = async (itemId: string) => {
        const uid = user.value ? user.value.uid : ""
        const sysdate = moment(new Date()).toISOString()
        await updateDoc(doc(db, `users/${uid}/items/${itemId}`), {
            value: increment(1),
            "upd_date": sysdate
        })
    }

    const decrementValue = async (itemId: string) => {
        const uid = user.value ? user.value.uid : ""
        const sysdate = moment(new Date()).toISOString()
        await updateDoc(doc(db, `users/${uid}/items/${itemId}`), {
            value: increment(-1),
            "upd_date": sysdate
        })
    }
    return {
        useListener,
        computedCategories,
        addItem,
        addCategory,
        deleteCategory,
        updateItem,
        deleteItem,
        incrementValue,
        decrementValue,
        deleteItems,
        deleteAllItems
    }
}
/* eslint-enable no-unused-vars */
