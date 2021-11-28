<template>
    <div><button @click="filter = (item) => item.value === 1">数量残り1</button></div>
    <div><button @click="filter = (item) => item.period === 1">期限残り1日</button></div>
    <div><button @click="filter = null">フィルターなし</button></div>
    
    <div class="flex justify-end items-center m-2 bg-white p-2"
        v-for="(item, index) in displayItems"
        v-bind:key="index">
        <!--アイテム-->
        <div class="bg-red-500 -mt-3 h-9 w-2 mr-3"
            v-if="item.period == 1">
        </div>
        <div class="bg-yellow-500 -mt-3 h-9 w-2 mr-3"
            v-else-if="item.period == 2">
        </div>
        <div class="bg-green-500 -mt-3 h-9 w-2 mr-3"
            v-else-if="item.period >= 3">
        </div>
        <div v-else class="-mt-3 h-7 w-2 mr-3">
        </div>
        <div class="mr-auto font-bold">
            <!--アイテム名-->
            {{item.name}}
        </div>
        <div class="mr-3">
            <span>買う個数:</span>
            <button 
                class="font-bold"
                @click="increment(item)">
                <!--プラスボタン-->
                ＋
            </button>
            <span class="border rounded-lg px-4 py-2 text-xs">
                {{item.value}}{{ item.unit_name}}
            </span>
            <button 
                class="font-black"
                @click="decrement(item)">
                <!--マイナスボタン-->
                −
            </button>
        </div>
        <div class="mr-0">
            <button 
                        class="px-4 py-2 bg-red-500 hover:bg-red-700 
                    text-white rounded-lg font-bold text-xs ml-5"
                        @click="deleteMemoItem(item)">
                    削除
                </button><!--削除-->
        </div>
    </div>
</template>
<script>
export default {
    name: 'MemoItem',
    props: ['category','show','reset'],
    emits: ['openModal','increment','decrement'],
    data(){
        return {
            //propで渡された親で定義された値は変更できない
            //のでローカルにコピーを作成する
            memoItems: [],
            filter: (item) => item.period === 1
        }
    },
    computed:{
        displayItems(){ // 残り日数1のものを抽出
            if (!this.filter) return this.memoItems
            return this.memoItems
                .filter(this.filter)
        }
    },
    methods:{
        deleteMemoItem(deleteItem){
            console.log(this.memoItems);
            this.memoItems.forEach((item, i)=>{
                console.log(i + ':' + item.id + ':' + deleteItem.id);
                if (item.id === deleteItem.id){
                    this.memoItems.splice(i, 1)
                    return
                }
            })
        },
        increment(incrementItem){
            let item = this.memoItems.find(item => item.id === incrementItem.id)
            console.log(item);
            item.value += 1
        },
        decrement(decrementItem){
            let item = this.memoItems.find(item => item.id === decrementItem.id)
            item.value -= 1
        },
    },
    watch: {
        show(){ // 買い物メモの表示・非表示が切り替わるたび呼び出される
            console.log('memoItems changed');
            // オブジェクトの配列についてはObject.assign()で
            // ディープコピーできなかったので以下の方法で行う。
            // 参考: https://crieit.net/posts/JavaScript
            this.memoItems = this.category.items 
                .map((obj) => Object.assign({},obj));
        },
        reset(){
            this.memoItems = this.category.items
                .map((obj) => Object.assign({},obj));
        }
    }
}
</script>
<style scoped>

</style>