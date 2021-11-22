<script setup>
import useItems from '../disposable/useItems.js'
import ItemAdd from './ItemAdd.vue'
import Item from './Item.vue'

const { 
        displayCategories,
        createItem,
        deleteAllItems,
        updateItem
    } = useItems()

const testCreateItem = () => {
  createItem("test_name", "1", "食材")
}

const testUpdateItem = () => {
  updateItem({
    key: "aaa",
    category_id: 1,
    category_name: "食材",
    name: "updated",
    value: 1,
    period: 1,
    unit_name: "本"
  })
}
</script>

<template>
  <body> 
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
                  v-for="(category, index) in displayCategories"
                  v-bind:key="index">
                    <!--カテゴリアイテム-->
                    <div class="font-black text-lg">
                        <!--カテゴリ名-->
                        {{category.name}}
                    </div>
                    <Item
                      @item-added="createItem"
                      :category="category"
                      :category_id="category.id"
                      :category_name="category.name"
                      />
                <ItemAdd 
                    :category_id="category.id"> <!--タスク追加コンポーネント-->
                </ItemAdd>
                </div>
            </div>
        </div>   
  </body>
</template>

<style>
</style>
