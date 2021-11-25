<template>
    <!--②アイテム編集(モーダル)-->
    <div class="fixed  top-0 left-0 right-0 flex justify-center mt-48">
        <div 
            @click="$emit('closeModal')" 
            class="fixed inset-0 bg-gray-400 opacity-50">
            <!--モーダルウィンドウ-->
        </div>
        <div class="bg-white relative rounded-xl p-5"
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
                <input class="border rounded-lg px-4 py-2 text-xs"
                    v-model="form.name"><!--カテゴリ名-->
            </div>
            <div class="my-4 flex justify-end">
                <!--編集項目のひとかたまり-->
                <label class="mr-auto">
                    <!--数量-->
                    数量
                </label>
                <input class="w-6 border rounded-lg"
                    v-model.number="form.value"><!--数量-->
                <input class="w-4" 
                    type="text">
            </div>
            <div class="my-4 flex justify-end">
                <!--編集項目のひとかたまり-->
                <label class="mr-auto">
                    <!--個数の単位-->
                    単位
                </label>
                <input class="w-6 border rounded-lg"
                    v-model.number="form.unit_name"><!--数量-->
                <input class="w-4" 
                    type="text"><!--単位-->
            </div>
            <div class="my-4 flex justify-end">
                <!--編集項目のひとかたまり-->
                <label class="mr-auto">
                    <!--賞味期限-->
                    残り日数
                </label>
                <input type="text" 
                    class="w-6 border rounded-lg"
                
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
<script>
export default {
    name: 'Modal',
    // emits: ['closeModal'], //何故か['close-modal']とするとモーダルが開かなくなる
    props: ['item','show'],
    methods: {
        clickEvent(){
            this.$emit('closeModal')
        }
    },
    data(){
        return {
            form: {
                id: '',
                category_id: '',
                category_name:'',
                name: '',
                value: '',
                period: '',
                unit_name: ''
            }
        }
    },
    watch:{
        show(newValue){ // 親コンポーネントでshowModalが変化した時に呼び出される。
            if(newValue){ //表示されたとき
                Object.assign(this.form, this.item)
                return
            } 
            Object.keys(this.form).forEach(key => {
                this.form[key] = ''
            })
        }
    }
}
</script>