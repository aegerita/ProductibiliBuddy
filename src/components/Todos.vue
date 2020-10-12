<template>
    <div id="todo">
        <Header :name="name"></Header>
        <AddTodo @add-todo="addTodo"></AddTodo>

        <!-- A for loop for todos array in props -->
        <!-- there must be a unique key -->
        <h2 v-if="todos.every(todo => todo.completed)">All Finished! Good for you!</h2>
        <div v-else>
            <h2 v-if="todos.some(todo => !todo.completed)">Todo List: </h2>
            <div :key="todo.id" v-for="todo in todos.filter(todo => !todo.completed)">
                <!-- the todo in for loop, goes to item props-->  
                <Todoitem :todo="todo" @toggle="toggle" @del-todo="deleteTodo"></Todoitem>
            </div>  
            <!-- header finished:  -->
            <h3 v-if="todos.some(todo => todo.completed)">Finished: </h3>
        </div> 
        <!-- output finished events last -->
        <div :key="todo.id" v-for="todo in todos.filter(todo => todo.completed).sort((a,b) => a.time-b.time)">
            <Todoitem :todo="todo" @toggle="toggle" @del-todo="deleteTodo"></Todoitem>
        </div>
    </div>
</template>

<script>
//import Todos from './Todos.vue';
import Header from "./layout/header";
import AddTodo from "./AddTodo.vue"
import Todoitem from './Todoitem.vue'

let nextTodoId = 1;

export default {
    name: "Todos",
    components: {
        Header,
        AddTodo,
        Todoitem,
    },
    // store things and variables and stuffs
    data() {
        return {
            name: "Jenny",
            todos: [
                {
                    id: nextTodoId++,
                    title: "Miss me?",
                    completed: false,
                    time: Date.now()
                },
                {
                    id: nextTodoId++,
                    title: "Thank you for using me...",
                    completed: false,
                    time: Date.now()
                },
                {
                    id: nextTodoId++,
                    title: "It's good to see you again",
                    completed: true,
                    time: Date.now()
                }
            ]
        }
    }, 
    // don't know back end and database, stay here upon refresh for now
    methods: {
        deleteTodo(id) {
            console.log("delete item number ", id);
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.todos = this.todos.map(todo => {
                if (todo.id > id) todo.id--;
                return todo;
            })
            nextTodoId--;
        }, 
        addTodo(todoTitle) {
            this.todos.push({
                id: nextTodoId++,
                title: todoTitle,
                completed: false,
                time: Date.now()
            });
        },
        toggle(todo){
            console.log("toggle id number ", todo.id);
            todo.completed = !todo.completed;
            todo.time = Date.now();
        }
    }
}
</script> 

<style scoped>
    #todo {
        font-family: AvenAir, Helvetica, Arial, sans-serif;
        line-height: 1.4;
        padding: 0 20px;
    }
</style>