<template>
    <div id="todo">
        <Header @clear="clear" :name="name"/>
        <AddTodo @add-todo="addTodo"/>

        <!-- A for loop for todos array in props -->
        <!-- there must be a unique key -->
        <h2 v-if="todos.every(todo => todo.completed)">All Finished! Good for you!</h2>
        <div v-else>
            <h2 v-if="todos.some(todo => !todo.completed)">Todo List: </h2>
            <div :key="todo.id" v-for="todo in todos.filter(todo => !todo.completed)">
                <!-- the todo in for loop, goes to item props-->  
                <Todoitem :todo="todo" @toggle="toggle" @del-todo="deleteTodo"/>
            </div>  
            <!-- header finished:  -->
            <h3 v-if="todos.some(todo => todo.completed)">Finished: </h3>
        </div> 
        <!-- output finished events last -->
        <div :key="todo.id" v-for="todo in todos.filter(todo => todo.completed).sort((a,b) => a.time-b.time)">
            <Todoitem :todo="todo" @toggle="toggle" @del-todo="deleteTodo"/>
        </div>
    </div>
</template>

<script>
//import Todos from './Todos.vue';
import Header from "./Header";
import AddTodo from "./AddTodo.vue"
import Todoitem from './Todoitem.vue'

let nextTodoId = 0;

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
            todos: []
        }
    }, 
    mounted(){
        if (localStorage.getItem('todos')) {
            try {
                this.todos = JSON.parse(localStorage.getItem('todos'));
                if (!this.todos.length){
                    this.addTodo("Miss me?");
                    this.addTodo("Thank you for using me...");
                    this.addTodo("It's good to see you again");
                    this.toggle(this.todos[2]);
                }
            } catch(e) {
                localStorage.removeItem('todos');
            }
        } else {
            this.addTodo("Welcome!");
            this.addTodo("Pls use me as much as you like");
            this.addTodo("Hehehe...");
            this.toggle(this.todos[2]);
        }
    },
    // don't know back end and database, stay here upon refresh for now
    methods: {
        deleteTodo(deletee) {
            console.log("delete item number ", deletee.id);
            this.todos.splice(deletee.id, 1);
            this.todos.forEach(todo => {if (todo.id > deletee.id) todo.id--;})
            nextTodoId--;
            this.save();
        }, 
        addTodo(todoTitle) {
            this.todos.push({
                id: nextTodoId++,
                title: todoTitle,
                completed: false,
                time: Date.now()
            });
            this.save();
        },
        toggle(todo){
            console.log("toggle id number ", todo.id);
            todo.completed = !todo.completed;
            todo.time = Date.now();
            this.save();
        },
        save(){
            const parsed = JSON.stringify(this.todos);
            localStorage.setItem('todos', parsed);
        }, 
        clear(){
            this.todos = [];
            this.save();
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