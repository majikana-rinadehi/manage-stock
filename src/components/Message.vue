<script setup lang="ts">
import useMessage from '../disposable/useMessage'

const { messageRef } = useMessage()
const isActive = messageRef
</script>

<template>
  <div  
    class="invisible flex text-base font-black my-4 mx-auto p-2 h-40px w-1/3 rounded-lg box-border align-middle color-gray-900 shadow-around"
    style="font-style: inherit; z-index: 1000;"
    :class = "[messageRef.kind, {active: isActive.message}]">
    <!-- ↑:class"{messageRef.kind}"ではない -->
    <div class="text-center w-11/12">
      {{ messageRef.message ? messageRef.message : "" }}
    </div>
    <div 
      class="color-gray-900 cursor-pointer hover:color-gray-50"
      @click="isActive = { message: '', kind: '' }">☓</div>
  </div>
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
</style>
