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
                    <button class="px-4 py-2 bg-red-500 hover:bg-red-700 
                    text-white rounded-lg font-bold text-xs">
                    削除
                    </button><!--削除-->
                </div>
            </div>
            <div class="text font-bold">
                <!--アイテム名-->
            </div>
            <div class="my-4">
                <!--編集項目のひとかたまり-->
                <label>
                    <!--カテゴリ-->
                    カテゴリ名
                </label>
                <input class="border rounded-lg px-4 py-2 text-xs"
                    value="食材"><!--カテゴリ名-->
            </div>
            <div class="my-4">
                <!--編集項目のひとかたまり-->
                <label>
                    <!--カテゴリ-->
                    アイテム名
                </label>
                <input class="border rounded-lg px-4 py-2 text-xs"
                    value="きゅうり"><!--カテゴリ名-->
            </div>
            <div class="my-4 flex justify-end">
                <!--編集項目のひとかたまり-->
                <label class="mr-auto">
                    <!--数量-->
                    数量
                </label>
                <input class="w-6 border rounded-lg"
                    value="1"><!--数量-->
                <input class="w-4" 
                    type="text"
                    value="本"><!--個数の単位-->
            </div>
            <div class="my-4">
                <!--編集項目のひとかたまり-->
                <label>
                    <!--賞味期限-->
                    賞味期限
                </label>
                <input type="date" 
                    class="border rounded-lg px-4 py-2 text-xs"
                    value="2021/06/10"><!--賞味期限-->
            </div>
            <div class="my-4">
                <!--編集項目のひとかたまり-->
                <label>
                    <!--なくなる日-->
                    なくなる日
                </label>
                <input type="date" 
                    class="border rounded-lg px-4 py-2 text-xs"
                    value="2021/06/08"><!--なくなる日-->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Modal',
    // emits: ['closeModal'], //何故か['close-modal']とするとモーダルが開かなくなる
    methods: {
        clickEvent(){
            this.$emit('closeModal')
        }
    }
}
</script>