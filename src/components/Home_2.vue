<script setup>
import useDatabase from '../disposable/useDatabase.js'
import ItemAdd_2 from './ItemAdd_2.vue'
import Item from './Item.vue'
import Modal from './Modal.vue'
import { ref, onMounted } from 'vue'

const { 
  useListener,
  computedCategories,
  addItem,
  updateItem,
  deleteItem
} = useDatabase()

const {
  setListener, 
  items,
  categories,
} = useListener()

onMounted(setListener)

const showModal = ref(false)
const modalItem = ref("")

const openModal = (item) => {
  showModal.value = true
  modalItem.value = item
}

const closeModal = () => {
  showModal.value = false
}
</script>

<template>
  <body> 
    <div>{{ items }}</div>
    <div>{{ categories }}</div>
    <div>{{ computedCategories }}</div>
    <!-- <div> {{ items }}</div>
    <div> {{ categories }}</div>
    <div> {{ displayCategories }}</div>
    <div> {{ itemsRef }}</div>
    <div> {{ categoriesRef }}</div>
    <div> {{ user }}</div> -->
    <button @click="deleteAllItems">deleteAll</button>
    <button @click="testCreateItem">testCreateItem</button>
    <button @click="testUpdateItem">testUpdateItem</button>
     <div class="my-5">
            <!--①,②,③-->
            <div class="flex">
                <!--①:カテゴリアイテム-->
                <div class="bg-gray-200 m-2 p-2 text-sm mx-auto" style="min-width: 420px;"
                  v-for="(category, index) in computedCategories"
                  v-bind:key="index">
                    <!--カテゴリアイテム-->
                    <div class="font-black text-lg">
                        <!--カテゴリ名-->
                        {{category.name}}
                    </div>
                    <Item
                      @open-modal="openModal"
                      :category="category"
                      :category_id="category.id"
                      />
                <ItemAdd_2 
                    @item-added="addItem"
                    :category_name="category.name"
                    :category_id="category.id"> <!--タスク追加コンポーネント-->
                </ItemAdd_2>
                </div>
            </div>
        </div> 
        <modal 
          v-show="showModal" 
          @close-modal="closeModal"
          @delete-item="deleteItem"
          @update-item="updateItem"
          :item="modalItem"
          :show="showModal">
        </modal>  
  </body>
</template>

<style>
</style>
