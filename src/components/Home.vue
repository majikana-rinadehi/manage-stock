<script setup lang="ts">
import useDatabase from '../composable/useDatabase'
import ItemAdd_2 from './ItemAdd_2'
import CategoryAdd from './CategoryAdd'
import CategoryItems from './CategoryItems'
import CategoryEdit from './CategoryEdit'
import EditItem from './EditItem'
import ShoppingList from './ShoppingList'
import Header from './Header'
import { ref, onMounted } from 'vue'
import { Item, EditForm } from '@/composable/types'
import { useLoading } from 'vue-loading-overlay'

const { 
  useListener,
  computedCategories,
  addItem,
  addCategory,
  deleteCategory,
  updateCategory,
  updateItem,
  deleteItem
} = useDatabase()

const {
  setListener
} = useListener()

onMounted(setListener)

const showEditItem = ref(false)
const editItem = ref<Item>()
const showList = ref(false)
const listTitle = ref("")

const $loading = useLoading()
const fullPage = ref(false)

const openEditItem = (item: Item) => {
  showEditItem.value = true
  editItem.value = item
}

const closeEditItem = () => {
  showEditItem.value = false
}

const openList = (title: string) => {
  listTitle.value = title
  showList.value = true
}

const closeList = () => {
  showList.value = false
}

const updatingCategory = async (categoryName: string, categoryId: string) => {
  const loader = $loading.show({})
  await updateCategory(categoryName, categoryId)
  loader.hide()
}

const deletingCategory = async (categoryId: string) => {
  const loader = $loading.show({})
  await deleteCategory(categoryId)
  loader.hide()
}

const updatingItem = async (form: EditForm) => {
  const loader = $loading.show({})
  await updateItem(form)
  loader.hide()
  closeEditItem()
}

const deletingItem = async (itemId: string) => {
  const loader = $loading.show({})
  await deleteItem(itemId)
  loader.hide()
  closeEditItem()

}
</script>

<template>
  <body> 
    <Header
      @open-list="openList"/>
     <div class="my-5">
            <!--①,②,③-->
            <div class="flex flex-wrap">
                <!--①:カテゴリアイテム-->
                <div class="static bg-gray-200 mx-2 my-6 p-2 text-sm mx-auto shadow-around" 
                    style="min-width: 420px;"
                  v-for="(category, index) in computedCategories"
                  v-bind:key="index">
                    <!--カテゴリアイテム-->
                    <CategoryEdit
                      :category="category"
                      @update="updatingCategory"
                      @delete="deletingCategory"
                    />
                    <CategoryItems
                      @open-modal="openEditItem"
                      :category="category"
                      />
                    <ItemAdd_2 
                      @item-added="addItem"
                      :category-name="category.name"
                      :category-id="category.id"/> <!--タスク追加コンポーネント-->
                </div>
                <div class="bg-gray-200 mx-2 my-6 p-2 text-sm mx-auto shadow-around" 
                    style="min-width: 420px;">
                  <CategoryAdd
                    @category-added="addCategory"
                    />
                </div>
            </div>
        </div> 
        <EditItem 
          v-show="showEditItem" 
          @close-modal="closeEditItem"
          @delete-item="deletingItem"
          @update-item="updatingItem"
          :item="editItem"
          :show="showEditItem"/>
        <ShoppingList
          v-show="showList"
          :show="showList"
          :display-categories="computedCategories"
          :list-title="listTitle"
          @close-list="closeList"/>
  </body>
</template>

<style>
</style>
