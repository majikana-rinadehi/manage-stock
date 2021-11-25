<template>
    <div class="flex justify-end m-2 bg-white p-2"
        v-for="(item, index) in category.items"
        v-bind:key="index"
        @click="$emit('openModal', item)">
        <!--アイテム-->
        <div class="bg-red-500 -mt-2 h-7 w-2 mr-3"
            v-if="item.period == 1">
        </div>
        <div class="bg-yellow-500 -mt-2 h-7 w-2 mr-3"
            v-else-if="item.period == 2">
        </div>
        <div class="bg-green-500 -mt-2 h-7 w-2 mr-3"
            v-else-if="item.period >= 3">
        </div>
        <div v-else class="-mt-2 h-7 w-2 mr-3">
        </div>
        <div class="mr-auto font-bold">
            <!--アイテム名-->
            {{item.name}}
        </div>
        <div class="mr-3">
            <button 
                class="font-bold"
                @click.stop="$emit('increment', item)">
                <!--プラスボタン-->
                ＋
            </button>
            <span class="border rounded-lg px-4 py-2 text-xs">
                {{item.value}}個
            </span>
            <button 
                class="font-black"
                @click.stop="$emit('decrement', item)">
                <!--マイナスボタン-->
                −
            </button>
        </div>
        <div class="mr-0">
            <!--あと何日-->
            <span class="border rounded-lg px-4 py-2 text-xs">
                {{item.period}}日
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Item',
    props: ['category','category_id'],
    emits: ['openModal','increment','decrement'],
    methods:{
    }
}
</script>
<style scoped>

</style>