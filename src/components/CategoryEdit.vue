<script setup lang="ts">
import { toRefs, ref, defineProps, defineEmits, nextTick, watch } from 'vue'
import { Category } from '../disposable/types'
import ConfirmPopup from './ConfirmPopup'

const emit = defineEmits(['update', 'delete'])
const props = defineProps<{ // eslint-disable-line vue/valid-define-props
  category: Category
}>()
const { category } = toRefs(props)

const show = ref(false)
const showConfirm = ref(false)
const categoryName = ref("")
const inputRef = ref(null)
const buttonRef = ref(null)

watch(show, (newValue) => {
  if(newValue) {
    categoryName.value = category.value.name 
  }
})

// 「編集ボタン✎」押下時
const showInput = () => {
  show.value = true
  nextTick(() => {
    inputRef.value.focus()
  })
}

// 更新
const updateCategory = () => {
  emit('update', categoryName.value, category.value.id)
  closeInput()
}

// 削除
const deleteCategory = () => {
  emit('delete', category.value.id)
  closeInput()
}

const showDeleteConfirm = () => {
  showConfirm.value = true
}

const closeConfirm = () => {
  showConfirm.value = false
}

const closeInput = () => {
  inputRef.value.blur()
  show.value = false;
  categoryName.value = '';
}

const compositionStart = () => console.log("composition start")
const compositionEnd = () => console.log("composition end")
const inputEvent = () => console.log("input event")

</script>

<template>
  <ConfirmPopup
    v-show="showConfirm"
    @close="closeConfirm"
    @yes="deleteCategory">
    カテゴリ削除していいの？？？
  </ConfirmPopup>
  <div 
    v-show="!show"
    class="flex mx-2 rounded-lg">
    <div class="font-black text-lg">
        <!--カテゴリ名-->
        {{category.name}}
    </div>
    <button 
      class="absolute top-2 right-2 hover:bg-gray-500"
      @click="showInput">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
      </svg>  
    </button>
  </div>
  <div 
    v-show="show"
    class="flex justify-end mx-2 rounded-lg">
    <div class="justify-self-start mr-auto p-2">
      <input
          ref="inputRef" 
          @keydown.enter="closeInput"
          class="w-full h-6 p-2"
          type="text"
          placeholder="新しいカテゴリ名"
          v-model="categoryName">
    </div>
    <div class="flex m-2">
        <button 
          @click="updateCategory"
          class="px-4 py-2 bg-green-500 hover:bg-green-700 
          text-white rounded-lg mr-2 font-bold text-xs">
        変更
        </button><!--追加-->
        <button 
          @click="closeInput"
          class="px-4 py-2 bg-yellow-500 hover:bg-yellow-700 
        text-white rounded-lg font-bold text-xs">
        キャンセル
        </button><!--キャンセル-->
        <button 
          @click="showDeleteConfirm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button><!--削除-->
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
