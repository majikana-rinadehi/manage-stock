<script setup lang="ts">
import MemoCategories from './MemoCategories.vue'
import ShoppingFooter from './ShoppingFooter.vue'
import { DisplayCategory } from '../composable/types'
import useCapture from '../composable/useCapture.js'
import { defineProps, ref, toRefs } from 'vue'
import { useLoading } from 'vue-loading-overlay'

const $loading = useLoading()

const {
    captureMemoItems,
    deleteCapture
} = useCapture()

interface Props {
    show: boolean;
    displayCategories: DisplayCategory[];
    listTitle?: string;
}

const props = defineProps<Props>() // eslint-disable-line vue/valid-define-props

const {
    show,
    displayCategories,
    listTitle
} = toRefs(props)

/** 
 * 買い物メモリセット時に、1 <=> -1 
 * と変化して `MemoCategories.vue` の `watch` に知らせる
 */
const resetToggle = ref(1)
const showCapture = ref(false)

/** loadingを表示するcontainer */
const listContainer = ref(null)

/** 買い物メモをリセットする */
const resetItems = () => {
    resetToggle.value *= -1
}

/** 買い物メモのスクショを撮る */
const capture = async () => {
    openCapture()
    const loader = $loading.show({
        container: listContainer.value
    })
    await captureMemoItems()
    loader.hide()
}

/** 買い物メモのスクショを表示する */
function openCapture() {
    showCapture.value = true
}
/** 買い物メモのスクショを削除する */
function closeCapture() {
    deleteCapture()
    showCapture.value = false
}
</script>

<template>
    <!--③買い物メモ-->
    <div
        class="overflow-y-scroll fixed top-0 left-0 right-0 flex justify-center mt-48"
        style="max-height: 70%;"
    >
        <!-- ↑ここにoverflow-y-scroll、 max-height...で少しだけスクロールするようになった -->
        <div class="fixed inset-0 bg-gray-400 opacity-50" @click="$emit('closeList')"></div>
        <!-- ここからモーダルコンテンツ -->
        <div
            ref="listContainer"
            class="bg-white relative rounded-xl p-5"
            style="min-width: 400px; max-height: 90%;"
        >
            <!--タイトル「買い物/Todo」メモ-->
            <div class="text-2xl font-black">{{ listTitle }}</div>
            <!-- ヘッダー -->
            <div class="flex justify-end">
                <!--戻るボタン-->
                <div class="justify-self-start mr-auto">
                    <button class="text-xl" @click="$emit('closeList')">←</button>
                </div>
                <!-- リセットボタン -->
                <div>
                    <button
                        @click="resetItems"
                        class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg mr-2 font-bold text-xs"
                    >リセット</button>
                </div>
            </div>
            <!-- capture-items-target を
            MemoCategories内の子孫要素に移動-->
            <!-- <div id="capture-items-target"  -->
            <div
                class="overflow-y-scroll flex-col justify-between bg-gray-200 m-4 p-2 text-sm"
                style="max-height: 70%;"
            >
                <!-- アイテムをカテゴリごとに表示 -->
                <MemoCategories
                    :display-categories="displayCategories"
                    :reset="resetToggle"
                    :show="show"
                />
            </div>
            <!-- アイテムキャプチャー画像表示欄 -->
            <transition name="fade">
                <div class="mx-auto" v-show="showCapture">
                    <button @click="closeCapture">画像を削除</button>
                    <div class="mx-auto" id="result"></div>
                </div>
            </transition>
            <ShoppingFooter @capture-memo-items="capture" />
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.7s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>