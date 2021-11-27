<script setup>
import { toRefs, ref, defineProps, defineEmits, nextTick } from 'vue'

const emit = defineEmits(['ItemAdded'])
const props = defineProps({
  'category_id': String,
  'category_name': String
})
const { category_id, category_name } = toRefs(props)

const show = ref(false)
const item_name = ref("")
const inputRef = ref(null)
const buttonRef = ref(null)
// const isComposing = ref(false)

// 「+アイテムを追加」押下時
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
      item_name.value = '';
      nextTick(() => {
        buttonRef.value.focus()
      })
}

const addItem = () => {
  // if(isComposing.value === true) { 
  //     isComposing.value === false
  //     return
  //  }

  // if(item_name.value === 'おまん' ){
  if(item_name.value !== '' ){
      emit('ItemAdded', item_name.value, category_id.value, category_name.value);
      inputRef.value.blur()
      console.log("focusout from input");
      item_name.value = '';
      show.value = false;
      nextTick(() => {
        buttonRef.value.focus()
        console.log("focus to button");
      })
  }
}

const compositionStart = () => console.log("composition start")
const compositionEnd = () => console.log("composition end")
const inputEvent = () => console.log("input event")

// const endComposing = () => {
//   if(isComposing.value === true) { isComposing.value === false }
// }
</script>

<template>
  <div 
    v-show="!show"
    class="flex mx-2 hover:bg-gray-300 rounded-lg">
      <button 
        ref="buttonRef"
        @click="showInput">
          <!--アイテムを追加-->
          ＋アイテムを追加
      </button>
  </div>
  <div 
    v-show="show"
    class="flex justify-end mx-2 hover:bg-gray-300 rounded-lg">
      <div class="justify-self-start mr-auto p-2">
          <!-- 何故か、@keydown.enter にすると、押下後「+アイテムを追加」にフォーカス行かない -->
          <input
              ref="inputRef" 
              @keydown.enter="addItem"
              @compositionstart="compositionStart"
              @compositionend="compositionEnd"
              @input="inputEvent"
              class="w-full h-6 p-2"
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
