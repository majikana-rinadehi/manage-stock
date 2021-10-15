<template>
  <body> 
        <div class="flex justify-end ml-10">
            <!--ヘッダー-->
            <div class="flex mr-auto">
                <!--アイコン、タイトル-->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <div class="text-6xl">買い物ストック</div>
            </div>
            <div class="flex items-end text-3xl mr-10">
                <!--かいものメモ発行ボタン-->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="currentColor" onclick="console.log('clicked')">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                </svg>
                <div>買い物メモを発行</div>
            </div>
        </div>
        <div class="my-5">
            <!--①,②,③-->
            <div class="flex">
                <!--①:カテゴリアイテム-->
                <div class="bg-gray-200 m-2 p-2 text-sm mx-auto" style="min-width: 420px;"
                  v-for="(category, index) in displayCategories"
                  v-bind:key="index">
                    <!--カテゴリアイテム-->
                    <div class="font-bold">
                        <!--カテゴリ名-->
                        {{category.name}}
                    </div>
                    <div class="flex justify-end m-2 bg-white p-2"
                      v-for="(task, index) in category.tasks"
                      v-bind:key="index"
                      @click="openModal()">
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
                <ItemAdd 
                    @item-added='itemAdd' 
                    :category_id="category.id"> <!--タスク追加コンポーネント-->
                </ItemAdd>
                </div>
            </div>
        </div>
        <div v-show="modal">
            <!--②アイテム編集(モーダル)-->
            <div class="fixed  top-0 left-0 right-0 flex justify-center mt-48">
                <div 
                    v-show="modal" 
                    @click="modal=false" 
                    class="fixed inset-0 bg-gray-400 opacity-50">
                    <!--モーダルウィンドウ-->
                </div>
                <div class="bg-white relative rounded-xl p-5"
                    style="max-width: 400px;">
                    <div class="flex justify-end">
                        <!--戻るボタン、削除ボタン-->
                        <div class="mr-auto">
                            <button class="text-3xl"
                                @click="modal=false">
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
        </div>
        <div style="display:none;">
            <!--③買い物メモ-->
            <div class="fixed  top-0 left-0 right-0 flex justify-center mt-48">
                <div class="fixed inset-0 bg-gray-400 opacity-50"></div>
                <div class="bg-white relative rounded-xl p-5"
                    style="min-width: 400px;">
                    <div>
                        <!--買い物メモ-->
                        買い物メモ
                    </div>
                    <div class="flex justify-start">
                        <div>
                            <!--戻るボタン-->
                            <button class="text-xl">←</button>
                        </div>
                    </div>
                    <div class="bg-gray-200 m-4 p-2 text-sm">
                        <div class="font-bold">
                            <!--カテゴリ名-->
                            食材
                        </div>
                        <div class="flex m-2 bg-white p-2">
                            <div class="ml-5 mr-auto">
                                <!--アイテム名-->
                                きゅうり
                            </div>
                            <div class="mr-3">
                                <!--数量--> 
                                1本
                            </div>
                        </div>
                        <div class="flex m-2 bg-white p-2">
                            <div class="ml-5 mr-auto">
                                <!--アイテム名-->
                                たまご
                            </div>
                            <div class="mr-3">
                                <!--数量--> 
                                1パック
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-start">
                        <!--全部買ったボタン-->
                        <button class="px-4 py-2 bg-red-500 hover:bg-red-700 
                            text-white rounded-lg font-bold text-xs">全部買う</button>
                    </div>
                    <div class="flex mt-4">
                        <div class="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <div>
                                <!--メールで共有-->
                                メールで共有
                            </div>
                        </div>
                    </div>
                    <div class="flex mt-4">
                        <div class="flex">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                            </svg>
                            <div>
                                <!--画像で保存-->
                                画像で保存
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import ItemAdd from './components/ItemAdd.vue'

export default {
  components:{
      ItemAdd
  },
  name: 'App',
  methods: {
      itemAdd(item_name, category_id){
          this.tasks.push(
              {
                  id: Date.now(),
                  category_id: category_id,
                  name: item_name
              }
          )
      },
      openModal(){
          this.modal = true;
      }
  },
  computed: {
    displayCategories(){
      let categories = [];
      let tasks = '';
      this.categories.map(category => {
        tasks = this.tasks.filter(task =>
          task.category_id === category.id);
        categories.push({
          id: category.id,
          name: category.name,
          tasks: tasks
        })
      })
      return categories;
    }
  },
  data() {
    return {
      modal: false,
      tasks: [
        {
          id: 1,
          category_id: 1,
          name: 'きゅうり',
          value: 1,
          period: 1
        },
        {
          id: 2,
          category_id: 1,
          name: 'たまご',
          value: 1,
          period: 1
        },
        {
          id: 3,
          category_id: 1,
          name: '納豆',
          value: 1,
          period: 2
        },
        {
          id: 4,
          category_id: 2,
          name: '洗剤',
          value: 1,
          period: 1
        },
        {
          id: 5,
          category_id: 2,
          name: 'バスマジックリン',
          value: 1,
          period: 2
        },
        {
          id: 6,
          category_id: 3,
          name: '排水溝',
          value: 1,
          period: 1
        },
        {
          id: 7,
          category_id: 3,
          name: '台所',
          value: 1,
          period: 2
        },
        
        
      ],
      categories: [
        {
          id: 1,
          name: '食材',
        },
        {
          id: 2,
          name: '消耗品'
        },
        {
          id: 3,
          name: '掃除'
        }
      ]
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
