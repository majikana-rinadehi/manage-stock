<template>
    <div class="flex justify-end m-2 bg-white p-2"
        v-for="(task, index) in category.tasks"
        v-bind:key="index"
        @click="$emit('openModal')">
        <!--アイテム-->
        <div class="bg-red-500 -mt-2 h-7 w-2 mr-3"
            v-if="task.period == 1">
        </div>
        <div class="bg-yellow-500 -mt-2 h-7 w-2 mr-3"
            v-else-if="task.period == 2">
        </div>
        <div v-else class="-mt-2 h-7 w-2 mr-3">
        </div>
        <div class="mr-auto">
            <!--アイテム名-->
            {{task.name}}
        </div>
        <div class="mr-3">
            <button>
                <!--プラスボタン-->
                ＋
            </button>
            <input class="w-2" type="text" value="1個"><!--個数-->
            <button>
                <!--マイナスボタン-->
                −
            </button>
        </div>
        <div class="mr-0">
            <!--あと何日-->
            <span class="border rounded-lg px-4 py-2 text-xs">
                {{task.period}}日
            </span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Item',
    props: ['category'],
    emits: ['openModal']
}
</script>
<style scoped>

</style>