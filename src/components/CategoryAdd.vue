<script setup lang="ts">
import { ref, defineEmits, nextTick } from 'vue'

const emit = defineEmits(['CategoryAdded'])

const show = ref(false)
const categoryName = ref("")
const inputRef = ref(null)
const buttonRef = ref(null)
// const isComposing = ref(false)

// 「+カテゴリを追加」押下時
const showInput = () => {
  show.value = true
  nextTick(() => {
    inputRef.value.focus() 
  })
}

// 
const closeInput = () => {
      inputRef.value.blur()
      show.value = false;
      categoryName.value = '';
      nextTick(() => {
        buttonRef.value.focus()
      })
}

const addCategory = () => {
  if(categoryName.value !== '' ){
      emit('CategoryAdded', categoryName.value);
      inputRef.value.blur()
      categoryName.value = '';
      show.value = false;
      nextTick(() => {
        buttonRef.value.focus()
      })
  }
}
</script>

<template>
  <div 
    v-show="!show"
    class="flex mx-2 hover:bg-gray-300 rounded-lg">
      <button 
        ref="buttonRef"
        @click="showInput">
          <!--＋カテゴリを追加-->
          ＋カテゴリを追加
      </button>
  </div>
  <div 
    v-show="show"
    class="flex justify-end mx-2 hover:bg-gray-300 rounded-lg">
      <div class="justify-self-start mr-auto p-2">
          <input
              ref="inputRef" 
              @keydown.enter="addCategory"
              class="w-full h-6 p-2"
              type="text"
              placeholder="新しいカテゴリ名"
              v-model="categoryName">
      </div>
      <div class="flex m-2">
          <button 
            @click="addCategory"
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
