<template>
    <div id="todo">
        <Header :name="name"></Header>
        <AddTodo @add-todo="addTodo"></AddTodo>

        <!-- A for loop for todos array in props -->
        <!-- there must be a unique key -->
        <h2 v-if="ongoing.length != 0">Todo List: </h2>
        <h2 v-else>All Finished! Good for you!</h2>
        <div :key="todo.id" v-for="todo in ongoing">
            <!-- <h3>{{todo.title}}</h3> -->
            <!-- the todo in for loop, goes to item props-->  
            <Todoitem :todo="todo" :completed=false @toggle-completion="toggle(false, todo)" @del-todo="deleteTodo(todo.id)"></Todoitem>
        </div>  

        <h3 v-if="finished.length!=0 && ongoing.length!=0">Finished: </h3>
        <!-- output finished events last -->
        <div :key="todo.id" v-for="todo in finished">
            <Todoitem :todo="todo" :completed=true @toggle-completion="toggle(true, todo)" @del-todo="deleteTodo(todo.id)"></Todoitem>
        </div> 
    </div>
</template>

<script>
//import Todos from './Todos.vue';
import Header from "./layout/header";
import AddTodo from "./AddTodo.vue"
import Todoitem from './Todoitem.vue'

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
            ongoing: [
                {
                    id: 1,
                    title: "Miss me?"
                },
                {
                    id: 2,
                    title: "Thank you for using me..."
                }
            ],
            finished: [
                {
                    id: 3,
                    title: "It's good to see you again"
                }
            ],
            nextTodoId: 4
        }
    }, 
    // don't know back end and database, stay here upon refresh for now
    methods: {
        deleteTodo(id) {
            console.log("delete item number ", id);
            this.ongoing = this.ongoing.filter(todo => todo.id !== id);
            this.finished = this.finished.filter(todo => todo.id !== id);
            this.ongoing = this.ongoing.map(todo => {
                if (todo.id > id) {
                    todo.id--;
                }
                return todo;
            })
            this.finished = this.finished.map(todo => {
                if (todo.id > id) {
                    todo.id--;
                }
                return todo;
            })
            this.nextTodoId--;
        }, 
        addTodo(todoTitle) {
            this.ongoing.push({
                id: this.nextTodoId,
                title: todoTitle
            });
            this.nextTodoId++;
        },
        toggle(completed, todo){
            console.log("toggle id number ", todo.id);
            if (completed) {
                this.ongoing.push({
                    id: todo.id,
                    title: todo.title
                });
                this.ongoing.sort((a, b) => a.id - b.id);
                this.finished = this.finished.filter(todoItem => todoItem.id !== todo.id);
            } else {
                this.finished.push({
                    id: todo.id,
                    title: todo.title
                });
                // this.finished.sort((a, b) => a.id - b.id);
                this.ongoing = this.ongoing.filter(todoItem => todoItem.id !== todo.id);
            }
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