<script setup>
import { ref, defineProps,  watch, toRefs, nextTick } from 'vue'
const props = defineProps(['item','show'])
const {
    item,
    show
} = toRefs(props)

const form = ref({
    id: '',
    category_id: '',
    category_name:'',
    name: '',
    value: '',
    period: '',
    unit_name: ''
})
const inputRef = ref(null)
watch(show, (newValue) => {
    if(newValue){
        nextTick(() => inputRef.value.focus())
        Object.assign(form.value, item.value)
        return
    }
    inputRef.value.blur()
    Object.keys(form.value).forEach(key => {
        form.value[key] = ''
    })
})
</script>

<template>
    <!--②アイテム編集(モーダル)-->
    <div class="fixed  top-0 left-0 right-0 flex justify-center mt-48">
        <div 
            @click="$emit('closeModal')" 
            class="fixed inset-0 bg-gray-400 opacity-50">
            <!--モーダルウィンドウ-->
        </div>
        <div class=" bg-white relative rounded-xl p-5"
            style="max-width: 400px;">
            <div class="flex justify-end">
                <!--戻るボタン、削除ボタン-->
                <div class="mr-auto">
                    <button class="text-3xl"
                        @click="$emit('closeModal')">
                        ←
                    </button>
                </div>
                <div>
                <button 
                        class="px-4 py-2 bg-red-500 hover:bg-red-700 
                    text-white rounded-lg font-bold text-xs"
                        @click="$emit('deleteItem', form.id),
                                $emit('closeModal')">
                    アイテムを削除
                </button><!--削除-->
            </div>
            </div>
            <div class="my-4">
                <!--編集項目のひとかたまり-->
                <label>
                    <!--カテゴリ-->
                    アイテム名
                </label>
                <input
                    ref="inputRef" 
                    class="border rounded-lg px-4 py-2 text-xs"
                    v-model="form.name"><!--カテゴリ名-->
            </div>
            <div class="my-4 flex justify-end">
                <!--編集項目のひとかたまり-->
                <label class="mr-auto">
                    <!--数量-->
                    数量
                </label>
                <input class="w-14 border rounded-lg text-center"
                    v-model.number="form.value"><!--数量-->
            </div>
            <div class="my-4 flex justify-end">
                <!--編集項目のひとかたまり-->
                <label class="mr-auto">
                    <!--個数の単位-->
                    単位
                </label>
                <input class="w-14 border rounded-lg text-center"
                    v-model.number="form.unit_name">
            </div>
            <div class="my-4 flex justify-end">
                <!--編集項目のひとかたまり-->
                <label class="mr-auto">
                    <!--賞味期限-->
                    残り日数
                </label>
                <input type="text" 
                    class="w-14 border rounded-lg text-center"
                
                    v-model.number="form.period"><!--賞味期限-->
            </div>
            <div>
                <!-- 更新ボタン -->
                <button class="px-4 py-2 bg-green-500 hover:bg-green-700 
                    text-white rounded-lg font-bold text-xs"
                    @click="$emit('updateItem', form),
                            $emit('closeModal')">
                    更新
                </button>
            </div>
        </div>
    </div>
</template>
