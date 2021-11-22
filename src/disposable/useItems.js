// db -> itemsRef -> displayItems
import { useDatabase } from './useDatabase.js'
import { onValue, update, push, set } from 'firebase/database'
import { ref, computed, onMounted } from 'vue'

const { fetchAllItems, fetchAllCategories, deleteAllItems } = useDatabase()

export default function useItems(){
    const itemsRef = ref(null)
    const categoriesRef = ref(null)

    const items = ref([])
    const categories = ref([])

    const getAllItems = () => {
        console.log("getAllItems");
        itemsRef.value = fetchAllItems()
        onValue(itemsRef.value, (snapshot) => {
            console.log("onValue: itemRef");
            console.log(itemsRef);
            let _items = []
            if(snapshot.exists()){
              snapshot.forEach((childSnapshot) => {
                const key = childSnapshot.key
                const data = childSnapshot.val()
                _items.push({
                  id: key,
                  category_id: data.category_id,
                  category_name: data.category_name,
                  name: data.name,
                  value: data.value,
                  period: data.period,
                  unit_name: data.unit_name
                })
              })
            }
            items.value = _items
          })
    }

    const getAllCategories = () => {
        console.log("getAllItems");
        categoriesRef.value = fetchAllCategories()
        onValue(categoriesRef.value, (snapshot) => {
        console.log("onValue: categoriesRef");
        let _categories = []
        if(snapshot.exists()){
            snapshot.forEach((childSnapshot) => {
            const key = childSnapshot.key
            const data = childSnapshot.val()
            _categories.push({
                id: key,
                name: data.name
            })
          })
        }
        categories.value = _categories
        })

    }
    const createItem = (item_name, category_id, category_name) => {
        const updates = {}
        const newPostKey = push(itemsRef.value).key // e.g. -Mns223jg86j8yHEkK43
        const newItem = {
            "category_id": category_id,
            "category_name": category_name,
            "name": item_name,
            "value": 1,
            "period": 1,
            "unit_name": ""
        }
        updates[newPostKey] = newItem
        update(itemsRef.value, updates)
    }

    const updateItem = (item) => {
        const key = item.key
        const updateRef = itemsRef.value + "/" + key
        set(updateRef, item)
    }

    onMounted(() => {
        getAllItems()
        getAllCategories()
    })

    const displayCategories = computed(() => {
        let _displayCategories = []
        categories.value.map(category => {
          let dispItems = ""
          console.log(items.value);
          dispItems = items.value.filter(item => {
            return item.category_id.toString() === category.id // return を忘れないこと!
          })
          console.log(dispItems);
          _displayCategories.push({
            id: category.id,
            name: category.name,
            items: dispItems
          })
        })
        return _displayCategories
      })
    
    // ↓ onValue イベントリスナーを useItems() 内の
    // 最上位スコープに置くと、ログイン後 console でエラー
    // onValue(itemsRef.value, (snapshot) => {
    //     console.log("onValue: itemRef");
    //     console.log(itemsRef);
    //     let _items = []
    //     if(snapshot.exists()){
    //       snapshot.forEach((childSnapshot) => {
    //         const key = childSnapshot.key
    //         const data = childSnapshot.val()
    //         _items.push({
    //           id: key,
    //           category_id: data.category_id,
    //           category_name: data.category_name,
    //           name: data.name,
    //           value: data.value,
    //           period: data.period,
    //           unit_name: data.unit_name
    //         })
    //       })
    //     }
    //     items.value = _items
    //   })

    // onValue(categoriesRef.value, (snapshot) => {
    //     console.log("onValue: categoriesRef");
    //     let _categories = []
    //     if(snapshot.exists()){
    //         snapshot.forEach((childSnapshot) => {
    //         const key = childSnapshot.key
    //         const data = childSnapshot.val()
    //         _categories.push({
    //             id: key,
    //             name: data.name
    //         })
    //       })
    //     }
    //     categories.value = _categories
    // })

    return { 
        items, 
        categories, 
        itemsRef,
        categoriesRef,
        displayCategories, 
        getAllItems,
        getAllCategories,
        createItem,
        deleteAllItems,
        updateItem
    }
}