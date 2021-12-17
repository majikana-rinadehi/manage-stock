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
         
        // listener for items
        // called in Home_2.vue by onMounted()
        function setListener(){
            const uid = user.value ? user.value.uid : ""
            const itemsQuery = query(collection(db, `users/${uid}/items`))
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
            const categoriesQuery = query(collection(db, `users/${uid}/categories`))
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

      const addItem = async (itemName, categoryId, categoryName) => {
        const uid = user.value ? user.value.uid : ""
        const docRef = await addDoc(collection(db, `users/${uid}/items`), {
            "category_id": categoryId,
            "category_name": categoryName,
            "name": itemName,
            "value": 1,
            "period": 1,
            "unit_name": ""
        })
        console.log(docRef);
        setMessage("アイテムを追加しました","info",3000)
      }

      const addCategory = async(categoryName) => {
        const uid = user.value ? user.value.uid : ""
        const docRef = await addDoc(collection(db, `users/${uid}/categories`), {
            "name": categoryName
        })
        console.log(docRef);
        setMessage("カテゴリを追加しました","info",3000)
      }

    const updateItem = async (form) => {
        const uid = user.value ? user.value.uid : ""
        const itemId = form.id
        console.log("form: ",form);
        console.log("itemId: ",itemId);
        const itemRef = doc(db, `users/${uid}/items/${itemId}`)
        await updateDoc(itemRef, {
            "category_id": form.category_id,
            "category_name": form.category_name,
            "name": form.name,
            "value": form.value,
            "period": form.period,
            "unit_name": form.unit_name
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
