<template>
    <div id="todoapp">
        <Header :name="name"></Header>
        <!-- the todos data is shared to the Todos.vue by binding -->
        <!-- <h2>Todo List 1</h2> -->
        <AddTodo @add-todo="addTodo"></AddTodo>
        <Todos @del-todo="deleteTodo" @toggle="toggle" :ongoing="ongoing" :finished="finished"></Todos>
    </div>
</template>

<script>
import Todos from './Todos.vue';
import Header from "./layout/header";
import AddTodo from "./AddTodo.vue"

export default {
    name: 'Todoapp',
    components: { 
        Todos, 
        Header,
        AddTodo
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
                    title: "No other meaning but..."
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
            // console.log("delete this item somehow ", id);
            this.ongoing = this.ongoing.filter(todo => todo.id !== id);
            this.finished = this.finished.filter(todo => todo.id !== id);
        }, 
        addTodo(todoTitle, id=this.nextTodoId) {
            this.ongoing.push({
                id: id,
                title: todoTitle
            });
            this.nextTodoId++;
        },
        toggle(completed, todo){
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

<style>
    #todoapp {
        font-family: AvenAir, Helvetica, Arial, sans-serif;
        line-height: 1.4;
        padding: 0 20px;
    }
</style>

