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
    deleteCapture,
    downloadCanvas
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
    const loader = $loading.show({
        container: listContainer.value
    })
    openCapture()
    await captureMemoItems()
    loader.hide()
}

/** 買い物メモのスクショを表示する */
function openCapture() {
    showCapture.value = true
}
/** 買い物メモのスクショを削除する */
function closeCapture() {
    showCapture.value = false
    deleteCapture()
}
/** 買い物メモのスクショをダウンロードする */
const downloadingCapture = () => {
    const canvas = document.getElementById('canvas')
    downloadCanvas(canvas, 'capture.png')
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
                <div
                    class="fixed top-0 left-0 right-0 flex justify-center mt-48"
                    v-show="showCapture"
                >
                    <div class="fixed inset-0 bg-gray-400 opacity-50" @click="closeCapture"></div>
                    <div
                        class="flex flex-col content-center bg-white relative rounded-xl py-12 px-28 max-w-md"
                    >
                        <div>
                            <button
                                class="mb-4 px-4 py-2 bg-rose-500 hover:bg-rose-700 text-white rounded-lg font-bold text-xs"
                                @click="downloadingCapture"
                            >画像をダウンロード</button>
                        </div>
                        <div class="flex justify-center" id="result"></div>
                        <div class="close-btn-temp" @click="closeCapture">X</div>
                    </div>
                </div>
            </transition>
            <div 
                class="fixed translate-y-12 close-btn-temp" 
                style="left:calc(50% - 3rem/2);"
                @click="$emit('closeList')">
                X
            </div>
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

.close-btn-temp {
    margin-top: 1rem;
    font-size: 1rem;
    margin-bottom: -5rem;
    border-radius: 10rem;
    border: 1px solid gray;
    width: 3rem;
    margin-right: auto;
    margin-left: auto;
    height: 3rem;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 1em rgb(109 101 101);
    cursor: pointer;
}
</style>