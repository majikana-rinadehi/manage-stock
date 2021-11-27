<script setup>
import Nav from './components/Nav.vue'
import Message from './components/Message.vue'

</script>

<template>
  <Nav/>
  <Message/>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>