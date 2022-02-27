<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, toRefs, nextTick, computed } from 'vue'
import type { EditForm } from '../composable/types'
import { useVuelidate } from '@vuelidate/core'
import { required, minValue, and, decimal } from '@vuelidate/validators';

// const emit = defineEmits(['closeModal', 'deleteItem', 'updateItem'])
const props = defineProps<{
    item: any,
    show: boolean
}>()
const {
    item,
    show
} = toRefs(props)
// const emit = defineEmits<{
//     (event: 'closeModal'): void,
//     (event: 'deleteItem', id: string): void,
//     (event: 'updateItem', item: EditForm): void,
// }>()

const form = ref<EditForm>({
    id: '',
    category_id: '',
    category_name:'',
    name: '',
    value: 0,
    period: 0,
    unit_name: '',
    add_date: '',
    upd_date: ''
})

const valueRule = and(minValue(0), decimal)
const rules = computed(() => ({
    name: { required },
    value: { valueRule },
    period: { valueRule }
}))

const v$ = useVuelidate(rules, form, { $scope: false })

const inputRef = ref()
const isAllValid = computed(() => v$.value.$errors.length === 0)

watch(show, (newValue) => {
    if(newValue){
        init()
        return
    } else {
        clear()
    }
})

const init = () => {
    nextTick(() => inputRef.value.focus())
    Object.assign(form.value, item.value)
}

const clear = () => {
    inputRef.value.blur()
    Object.keys(form.value).forEach(key => {
        form.value[key] = typeof form.value[key] === 'string'
                        ? ''
                        : 0
    })
}

// const closingModal = () => emit('closeModal')
// const updatingItem = () => {
//     if (!isAllValid.value) return
//     emit('updateItem', form.value)
//     emit('closeModal')
// }
// const deletingItem = () => emit('deleteItem', form.value.id); emit('closeModal')
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
                            @click="$emit('deleteItem', form.id), $emit('closeModal')">
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
                    v-model="form.name"
                    @input="v$.$touch"><!--カテゴリ名-->
                <div v-for="error in v$.name.$errors"
                    :key="error.$uid">
                    <div class="text-xs text-right text-red-500"
                        v-if="error.$validator==='required'">
                        アイテム名は必須です!
                    </div>
                </div>
            </div>
            <div class="my-4">
                <!--編集項目のひとかたまり-->
                <label class="mr-44">
                    <!--数量-->
                    数量
                </label>
                <input class="w-14 border rounded-lg text-center"
                    type="number"
                    v-model.number="form.value"
                    @input="v$.$touch"><!--数量-->
                <div v-for="error in v$.value.$errors"
                    :key="error.$uid">
                    <div class="text-xs text-right text-red-500"
                        v-if="error.$validator==='valueRule'">
                        数量は0以上の整数で！
                    </div>
                </div>
            </div>
            <div class="my-4">
                <!--編集項目のひとかたまり-->
                <label class="mr-44">
                    <!--個数の単位-->
                    単位
                </label>
                <input class="w-14 border rounded-lg text-center"
                    v-model.number="form.unit_name">
            </div>
            <div class="my-4">
                <!--編集項目のひとかたまり-->
                <label class="mr-36">
                    <!--残り日数-->
                    残り日数
                </label>
                <input type="number" 
                    class="w-14 border rounded-lg text-center"
                    v-model.number="form.period"
                    @input="v$.$touch"><!--残り日数-->
                <div v-for="error in v$.period.$errors"
                    :key="error.$uid">
                    <div class="text-xs text-right text-red-500"
                        v-if="error.$validator==='valueRule'">
                        残り日数は0以上の整数で！
                    </div>
                </div>
            </div>
            <div>
                <!-- 更新ボタン -->
                <button class="px-4 py-2 bg-green-500 hover:bg-green-700 
                    text-white rounded-lg font-bold text-xs"
                    @click="$emit('updateItem', form), $emit('closeModal')">
                    更新
                </button>
            </div>
        </div>
    </div>
</template>
