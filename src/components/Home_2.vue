<script setup>
import useItems from '../disposable/useItems.js'
import ItemAdd from './ItemAdd.vue'
import Item from './Item.vue'

const { 
        displayCategories,
        createItem
    } = useItems()
</script>

<template>
  <body> 
    <!-- <div> {{ items }}</div>
    <div> {{ categories }}</div>
    <div> {{ displayCategories }}</div>
    <div> {{ itemsRef }}</div>
    <div> {{ categoriesRef }}</div>
    <div> {{ user }}</div> -->
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
