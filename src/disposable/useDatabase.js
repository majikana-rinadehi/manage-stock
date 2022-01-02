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
    writeBatch,
    orderBy
} from 'firebase/firestore'
import { db } from '../settings/firebase.js'
import { useAuth } from './useAuth'
import { ref, computed } from 'vue'
import  useMessage  from './useMessage.js'

const {
    user
} = useAuth()

const {
    setMessage
} = useMessage()

export default function useDatabase(){
    const items = ref([])
    const categories = ref([])

    const useListener = () => {
         
        /**
         * listener for items, categories called in Home_2.vue by onMounted()
         * ※order by upd_date asc
         */
        function setListener(){
            const uid = user.value ? user.value.uid : ""
            const itemsQuery = query(collection(db, `users/${uid}/items`), orderBy("upd_date", "asc"))
            const unsubItems = onSnapshot(itemsQuery, querySnapshot => {
                const _items = []
                querySnapshot.forEach(doc => {
                    const data = doc.data()
                    _items.push({
                        "id": doc.id,
                        "category_id": data.category_id,
                        "category_name": data.category_name,
                        "name": data.name,
                        "value": data.value,
                        "period": data.period,
                        "unit_name": data.unit_name
                    })
                })
                items.value = _items
            })

            // listener for categories
            const categoriesQuery = query(collection(db, `users/${uid}/categories`), orderBy("upd_date", "asc"))
            const unsubCategories = onSnapshot(categoriesQuery, querySnapshot => {
                const _categories = []
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
    // to display in Home_2.vue
    const computedCategories = computed(() => {
        let displayCategories = []
        categories.value.map(category => {
          let dispItems = ref("")
          console.log(items.value);
          dispItems.value = items.value.filter(item => {
              console.log(item.category_id, category.id);
            return item.category_id === category.id // return を忘れないこと!
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

      const addItem = async (itemName, categoryId, categoryName) => {
        const uid = user.value ? user.value.uid : ""
        const date = new Date()
        const docRef = await addDoc(collection(db, `users/${uid}/items`), {
            "category_id": categoryId,
            "category_name": categoryName,
            "name": itemName,
            "value": 1,
            "period": 1,
            "unit_name": "",
            "add_date": date.toLocaleTimeString(),
            "upd_date": date.toLocaleTimeString()
        })
        console.log(docRef);
        setMessage("アイテムを追加しました","info",3000)
      }

      /**
       * add category
       * @param {string} categoryName 
       */
      const addCategory = async(categoryName) => {
        const uid = user.value ? user.value.uid : ""
        const date = new Date()
        const docRef = await addDoc(collection(db, `users/${uid}/categories`), {
            "name": categoryName,
            "add_date": date.toLocaleTimeString(),
            "upd_date": date.toLocaleTimeString(),
        })
        console.log(docRef);
        setMessage("カテゴリを追加しました","info",3000)
      }

    const updateItem = async (form) => {
        const uid = user.value ? user.value.uid : ""
        const itemId = form.id
        const date = new Date()
        console.log("form: ",form);
        console.log("itemId: ",itemId);
        const itemRef = doc(db, `users/${uid}/items/${itemId}`)
        await updateDoc(itemRef, {
            "category_id": form.category_id,
            "category_name": form.category_name,
            "name": form.name,
            "value": form.value,
            "period": form.period,
            "unit_name": form.unit_name,
            "upd_date": date.toLocaleTimeString()
        })
        setMessage("アイテムを更新しました","info",3000)
    }

    const deleteItem = async (itemId) => {
        const uid = user.value ? user.value.uid : ""
        await deleteDoc(doc(db, `users/${uid}/items/${itemId}`))
        setMessage("アイテムを削除しました","info",3000)
    }

    const deleteCategory = async(categoryId) => {
        const uid = user.value ? user.value.uid : ""
        await deleteDoc(doc(db, `users/${uid}/categories/${categoryId}`))
        setMessage("カテゴリを削除しました","info",3000)
    }

    const deleteItems = async (itemIds) => {
        const uid = user.value ? user.value.uid : ""
        const batch = writeBatch(db)
        itemIds.forEach(itemId => {
            batch.delete(doc(db, `users/${uid}/items/${itemId}`))
        })
        await batch.commit()
        setMessage("複数アイテムを削除しました","info",3000)
    }

    const deleteAllItems = async (category) => {
        const uid = user.value ? user.value.uid : ""
        const batch = writeBatch(db)
        category.items.forEach(item => {
            const itemId = item.id
            batch.delete(doc(db, `users/${uid}/items/${itemId}`))
        })
        await batch.commit()
        setMessage("全アイテムを削除しました","info",3000)
    }

    const incrementValue = async (itemId) => {
        const uid = user.value ? user.value.uid : ""
        await updateDoc(doc(db, `users/${uid}/items/${itemId}`), {
            value: increment(1)
        })
    }

    const decrementValue = async (itemId) => {
        const uid = user.value ? user.value.uid : ""
        await updateDoc(doc(db, `users/${uid}/items/${itemId}`), {
            value: increment(-1)
        })
    }

    /**
     * !!!for development!!!
     * add these field
     * - users/${uid}/items/${itemId}/add_date
     * - users/${uid}/items/${itemId}/upd_date
     * - users/${uid}/categories/${categoryId}/add_date
     * - users/${uid}/categories/${categoryId}/upd_date
     */
    const addField = async () => {
        const uid = user.value ? user.value.uid : ""
        const batch = writeBatch(db)
        const date = new Date()
        console.log("items.value")
        console.log(items.value)
        items.value.forEach(item => {
            const itemId = item.id
            console.log(itemId)
            batch.set(doc(db, `users/${uid}/items/${itemId}`), {
                add_date: date.toISOString(), // e.g. 2022-01-02T11:14:15.057Z
                upd_date: date.toISOString()

            }, { merge: true })
        })
        categories.value.forEach(category => {
            const categoryId = category.id
            batch.set(doc(db, `users/${uid}/categories/${categoryId}`), {
                add_date: date.toISOString(),
                upd_date: date.toISOString()
            }, { merge: true })
        })
        await batch.commit()
        setMessage("バッチ処理完了---っ!!!♡","info",3000)
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
        deleteAllItems,
        addField
    }
}
/* eslint-enable no-unused-vars */
