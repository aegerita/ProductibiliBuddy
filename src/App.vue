<template>
  <div id="app">
    <h2>I see you are studying</h2>
    <HelloWorld msg="Good for you, "/>
    <h2>{{name}}</h2>
    <!-- the todos data is shared to the Todos.vue by binding -->
    <Todos v-bind:todos="todos"></Todos>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Todos from './components/Todos.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Todos
  },
  // store things and variables and stuffs
  data() {
    return {
      name: "Jenny",
      todos: [
        {
          id: 1,
          title: "Todo 1",
          completed: false
        },
        {
          id: 2,
          title: "Todo 2",
          completed: true
        },
        {
          id: 3,
          title: "Todo 3",
          completed: false
        }
      ]
    }
  }
}
</script>

<style>
  #app {
    font-family: AvenAir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    line-height: 1.4;
  }
</style>
