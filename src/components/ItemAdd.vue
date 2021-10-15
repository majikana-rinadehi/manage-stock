<template>
  <div 
    v-if="!show"
    class="flex mx-2 hover:bg-gray-300 rounded-lg">
      <button @click="showInput">
          <!--アイテムを追加-->
          ＋アイテムを追加
      </button>
  </div>
  <div 
    v-else
    class="flex justify-end mx-2 hover:bg-gray-300 rounded-lg">
      <div class="mr-auto p-0">
          <input class="w-full h-6 p-2"
              type="text"
              placeholder="新しいアイテム名を入力"
              v-model="item_name"><!--新しいアイテムを追加-->
      </div>
      <div class="flex m-2">
          <button 
            @click="addItem"
            class="px-4 py-2 bg-green-500 hover:bg-green-700 
            text-white rounded-lg mr-2 font-bold text-xs">
          追加
          </button><!--追加-->
          <button 
            @click="closeInput"
            class="px-4 py-2 bg-red-500 hover:bg-red-700 
          text-white rounded-lg font-bold text-xs">
          キャンセル
          </button><!--キャンセル-->
      </div>
  </div>
</template>

<script>
export default {
  name: 'ItemAdd',
  props: ['category_id'],
  data() {
    return {
      show: false, // アイテム追加欄の表示非表示
      item_name:'',
    }
  },
  methods: {
    showInput(){
      this.show = true;
    },
    closeInput(){
      this.show = false;
      this.item_name = '';
    },
    addItem (){
      if(this.item_name !== ''){
        this.$emit('ItemAdded', this.item_name, this.category_id);
        this.show = false;
        this.item_name = '';
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
