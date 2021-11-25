/* eslint-disable no-unused-vars */

import { 
    query,
    onSnapshot,
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'
import { db } from '../settings/firebase.js'
import { useAuth } from './useAuth'
import { ref, computed } from 'vue'

const {
    user
} = useAuth()

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
    
                querySnapshot.docChanges().forEach(change => {
                    if ( change.type === "added"){
                        console.log("New city: ", change.doc.data());
                    }
                    if ( change.type === "modified"){
                        console.log("Modified city: ", change.doc.data());
                    }
                    if ( change.type === "removed"){
                        console.log("Removed city: ", change.doc.data());
                    }
                })
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
    
                querySnapshot.docChanges().forEach(change => {
                    if ( change.type === "added"){
                        console.log("New city: ", change.doc.data());
                    }
                    if ( change.type === "modified"){
                        console.log("Modified city: ", change.doc.data());
                    }
                    if ( change.type === "removed"){
                        console.log("Removed city: ", change.doc.data());
                    }
                })
            })    
        }
    
        return { items, categories, setListener }
    }

    // nested items in each categories
    // to display in Home_2.vue
    const computedCategories = computed(() => {
        let displayCategories = []
        categories.value.map(category => {
          let dispItems = ""
          console.log(items.value);
          dispItems = items.value.filter(item => {
              console.log(item.category_id, category.id);
            return item.category_id.toString() === category.id // return を忘れないこと!
          })
          console.log(dispItems);
          displayCategories.push({
            id: category.id,
            name: category.name,
            items: dispItems
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
      }

    const updateItem = async (form) => {
        const uid = user.value ? user.value.uid : ""
        const itemId = form.id
        console.log("form: ",form);
        console.log("itemId: ",itemId);
        const inninnRef = doc(db, `users/${uid}/items/${itemId}`)
        await updateDoc(inninnRef, {
            "category_id": form.category_id,
            "category_name": form.category_name,
            "name": form.name,
            "value": form.value,
            "period": form.period,
            "unit_name": form.unit_name
        })
    }

    const deleteItem = async (itemId) => {
        const uid = user.value ? user.value.uid : ""
        await deleteDoc(doc(db, `users/${uid}/items/${itemId}`))
    }
    return {
        useListener,
        computedCategories,
        addItem,
        updateItem,
        deleteItem
    }
}
/* eslint-enable no-unused-vars */
