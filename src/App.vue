<template>
    <div id="app">
        <Header :name="name"></Header>
        <!-- the todos data is shared to the Todos.vue by binding -->
        <!-- <h2>Todo List 1</h2> -->
        <AddTodo @add-todo="addTodo"></AddTodo>
        <Todos :todos="todosData" @del-todo="deleteTodo"></Todos>
    </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Header from "./components/layout/header.vue";
import AddTodo from "./components/AddTodo.vue"

export default {
    name: 'App',
    components: { 
        Todos, 
        Header,
        AddTodo
    },
    // store things and variables and stuffs
    data() {
        return {
            name: "Jenny",
            todosData: [
                {
                    id: 1,
                    title: "Miss me?",
                    completed: false
                },
                {
                    id: 2,
                    title: "No other meaning but...",
                    completed: false
                },
                {
                    id: 3,
                    title: "It's good to see you again",
                    completed: true
                }
            ],
            nextTodoId: 4
        }
    },
    // don't know back end and database, stay here upon refresh for now
    methods: {
        deleteTodo(id) {
            console.log("delete this item somehow "+id, id);
            this.todosData = this.todosData.filter(todo => todo.id !== id);
        }, 
        addTodo(todoTitle) {
            this.todosData.push({
                id: this.nextTodoId,
                title: todoTitle,
                completed: false
            });
            this.nextTodoId++;
        }
    }
}
</script>

<style>
    #app {
        font-family: AvenAir, Helvetica, Arial, sans-serif;
        color: #2c3e50;
        line-height: 1.4 ;
        text-align: center;
        padding: 0 20px;
    }
</style>
