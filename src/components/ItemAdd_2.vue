<script setup>
import { toRefs, ref, defineProps, defineEmits } from 'vue'

const emit = defineEmits(['ItemAdded'])
const props = defineProps({
  'category_id': String,
  'category_name': String
})
const { category_id, category_name } = toRefs(props)

const show = ref(false)
const item_name = ref("")

const showInput = () => {
  show.value = true
}

const closeInput = () => {
      show.value = false;
      item_name.value = '';
}

const addItem = () => {
  if(item_name.value !== ''){
        console.log(category_id.value); // 1
        console.log(category_name.value); // 食材
        emit('ItemAdded', item_name.value, category_id.value, category_name.value);
        show.value = false;
        item_name.value = '';
  }
}
</script>

<template>
  <div 
    v-if="!show"
    class="flex mx-2 hover:bg-gray-300 rounded-lg">
      <button @click="showInput">
          <!--アイテムを追加-->
          ＋アイテムを追加
      </button>
  </div>
  <div 
    v-else
    class="flex justify-end mx-2 hover:bg-gray-300 rounded-lg">
      <div class="justify-self-start mr-auto p-2">
          <input class="w-full h-6 p-2"
              type="text"
              placeholder="新しいアイテム名"
              v-model="item_name"><!--新しいアイテムを追加-->
      </div>
      <div class="flex m-2">
          <button 
            @click="addItem"
            class="px-4 py-2 bg-green-500 hover:bg-green-700 
            text-white rounded-lg mr-2 font-bold text-xs">
          追加
          </button><!--追加-->
          <button 
            @click="closeInput"
            class="px-4 py-2 bg-red-500 hover:bg-red-700 
          text-white rounded-lg font-bold text-xs">
          キャンセル
          </button><!--キャンセル-->
      </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
