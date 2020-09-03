<template>
  <div id="app">
    <Header v-bind:name="name"></Header>
    <!-- the todos data is shared to the Todos.vue by binding -->
    <Todos v-bind:todos="todosData" v-on:del-todo="deleteTodo"></Todos>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'
import Header from "./layout/header.vue";

export default {
  name: 'App',
  components: { 
    Todos, 
    Header
  },
  // store things and variables and stuffs
  data() {
    return {
      name: "Jenny",
      todosData: [
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
  },
  // don't know back end and database, stay here upon refresh for now
  methods: {
    deleteTodo(id) {
      console.log("delete this item somehow "+id, id);
      this.todosData = this.todosData.filter(todo => todo.id !== id);
    }
  }
}
</script>

<style>
  #app {
    font-family: AvenAir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    line-height: 1.4;
  }
</style>
