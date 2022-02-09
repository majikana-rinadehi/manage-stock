<!-- ConfirmPopup.vue Useage
<ConfirmPopup
    v-show="showConfirm" 
    @close="closeConfirm" <= when 「No」is put
    @yes="deleteCategory"> <= when 「Yes」is put
    
    Are you sure to delete? <= message to show

</ConfirmPopup>
 -->

<script setup lang="ts">
import { ref, defineProps,  watch, toRefs, nextTick } from 'vue'
import type { EditForm } from '../disposable/types'

const props = defineProps(['show'])
const {
    show
} = toRefs(props)

</script>

<template>
    <!--②アイテム編集(モーダル)-->
    <div class="fixed  top-0 left-0 right-0 flex justify-center mt-48">
        <div 
            @click="$emit('close')" 
            class="fixed inset-0 bg-gray-400 opacity-50">
            <!--モーダルウィンドウ-->
        </div>
        <div class=" bg-white relative rounded-xl p-5"
            style="max-width: 400px;">
            <div>
                <slot>
                    <!-- message -->
                </slot>
            </div>
            <div class="flex justify-end">
                <!--戻るボタン、削除ボタン-->
                <div class="mr-auto">
                    <button class="px-4 py-2 bg-yellow-500 hover:bg-yellow-700 
                        text-white rounded-lg font-bold text-xs"
                        @click="$emit('close')">
                        うんう！
                    </button>
                </div>
                <div>
                    <button 
                            class="px-4 py-2 bg-red-500 hover:bg-red-700 
                        text-white rounded-lg font-bold text-xs"
                            @click="$emit('yes'),$emit('close')">
                        うんー！
                    </button><!--削除-->
                </div>
            </div>
        </div>
    </div>
</template>
