<script setup lang="ts">
import useMessage from '../composable/useMessage'

const { messageRef } = useMessage()
</script>

<template>
  <!-- mode="out-in" : すでにある要素がフェードアウトしたあとに、新しい要素がフェードインされる -->
  <transition name="fade" mode="out-in">
    <div 
      v-if="messageRef.message" 
      class="relative flex text-base font-black my-4 mx-auto p-2 h-40px w-1/3 rounded-lg box-border align-middle color-gray-900 shadow-around"
      style="font-style: inherit; z-index: 1000;"
      :class = "[messageRef.kind]">
      <!-- ↑:class"{messageRef.kind}"ではない -->
      <div class="text-center w-11/12">
        {{ messageRef.message ? messageRef.message : "" }}
      </div>
      <div 
        class="color-gray-900 cursor-pointer hover:color-gray-50"
        @click="messageRef = { message: '', kind: '' }">☓</div>
    </div>
    <div 
        v-else
        class="invisible relative flex text-base font-black my-4 mx-auto p-2 h-40px w-1/3 rounded-lg box-border align-middle color-gray-900 shadow-around"
        style="font-style: inherit; z-index: 1000;"
        :class = "[messageRef.kind]">
        <!-- ↑:class"{messageRef.kind}"ではない -->
    </div>
  </transition>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active{
  visibility: visible;
}
.error{
  border: 2px solid rgb(233, 102, 51); 
  background:rgb(243, 193, 174);
}
.info{
  border: 2px solid rgb(7, 172, 7); 
  background:rgb(162, 223, 162);
}

.fade-enter-active {
    transition: opacity 0;
}
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-leave-to {
    opacity: 0;
}
</style>
