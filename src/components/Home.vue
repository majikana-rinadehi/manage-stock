<script setup lang="ts">
import useDatabase from '../disposable/useDatabase'
import ItemAdd_2 from './ItemAdd_2.vue'
import CategoryAdd from './CategoryAdd.vue'
import CategoryItems from './CategoryItems.vue'
import Modal from './Modal.vue'
import ShoppingList from './ShoppingList.vue'
import Header from './Header.vue'
import { ref, onMounted } from 'vue'
import { Item } from '@/disposable/types'

const { 
  useListener,
  computedCategories,
  addItem,
  addCategory,
  deleteCategory,
  updateItem,
  deleteItem
} = useDatabase()

const {
  setListener
} = useListener()

onMounted(setListener)

const showModal = ref(false)
const modalItem = ref<Item>()
const showList = ref(false)
const listTitle = ref("")

const openModal = (item: Item) => {
  showModal.value = true
  modalItem.value = item
}

const closeModal = () => {
  showModal.value = false
}

const openList = (title: string) => {
  listTitle.value = title
  showList.value = true
}

const closeList = () => {
  showList.value = false
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
                <div class="relative bg-gray-200 mx-2 my-6 p-2 text-sm mx-auto shadow-around" 
                    style="min-width: 420px;"
                  v-for="(category, index) in computedCategories"
                  v-bind:key="index">
                    <!--カテゴリアイテム-->
                    <div class="font-black text-lg">
                        <!--カテゴリ名-->
                        {{category.name}}
                    </div>
                    <div 
                      class="absolute top-2 right-2"
                      @click="deleteCategory(category.id)">削除</div>
                    <CategoryItems
                      @open-modal="openModal"
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
        <Modal 
          v-show="showModal" 
          @close-modal="closeModal"
          @delete-item="deleteItem"
          @update-item="updateItem"
          :item="modalItem"
          :show="showModal"/>
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
