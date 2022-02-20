<script setup lang="ts">
import {defineProps, toRefs} from 'vue'
import { User } from 'firebase/auth'
import Item from './Item.vue';

const props = defineProps<{
    user: User
}>()

const { user } = toRefs(props)

</script>
<template>
    <div class="fixed top-0 left-0 right-0 flex justify-center mt-48">
        <div
            @click="$emit('closeModal')" 
            class="fixed inset-0">
            <!--モーダルウィンドウ-->
        </div>
        <div class="fixed top-28 w-1/4 right-0 bg-red-50 rounded-xl p-5">
            <div class="my-4 flex justify-end">
                <!--編集項目のひとかたまり-->
                <label class="mr-auto" for="user">ユーザー名</label>
                <input type="text" id="user" :value="user ? user.displayName : ''" disabled>
            </div>
            <div class="my-4 flex justify-end">
                 <label class="mr-auto" for="mail">mail</label>
                 <input type="text" id="mail" :value="user ? user.email : ''" disabled>
            </div>
            <div class="my-8">
                  <button class="btn hover:bg-yellow-700" @click="$emit('logout')">logout</button>
            </div>
        </div>
    </div>
</template>
<style>
.btn{
  color: white;
  background: #292727;
  font-weight:bolder;
  font-size: 1em;
  height: 100%;
  padding: 0.2em;
  border-style: none;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.1rem;
  appearance: none;
}
</style>