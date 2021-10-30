<template>
  <body> 
        <Header
          @open-list="openList"/>
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
                    <Item
                      :category="category"
                      @open-modal="openModal"/>
                <ItemAdd 
                    @item-added='itemAdd' 
                    :category_id="category.id"> <!--タスク追加コンポーネント-->
                </ItemAdd>
                </div>
            </div>
        </div>
        <modal 
          v-show="showModal" 
          v-on:close-modal="closeModal">
        </modal>
        <shopping-list
          v-show="showList"
          v-on:close-list="closeList">

        </shopping-list>
    </body>
</template>

<script>
import ItemAdd from './components/ItemAdd.vue'
import Header from './components/Header.vue'
import Modal from './components/Modal.vue'
import ShoppingList from './components/ShoppingList.vue'
import Item from './components/Item.vue'

export default {
  components:{
      ItemAdd,
      Header,
      Modal,
      ShoppingList,
      Item
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
        console.log('openModal');
        this.showModal = true;
      },
      closeModal(){
        console.log('closeModal');
        this.showModal = false;
      },
      openList(){
        console.log('openList');
        this.showList = true;
      },
      closeList(){
        console.log('closeList');
        this.showList = false;
      },
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
      showModal: false,
      showList: false,
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
