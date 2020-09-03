<template>
    <!-- class complete when then the todo.completed is true -->
    <div class="todo-item" v-bind:class="{'is-complete':todo.completed}">
        <h3>
            <!-- checkbox method -->
            <input type="checkbox" v-on:change="markComplete">
            {{todo.title}}
            <!-- send event -->
            <button @click="$emit('del-todo')" 
            class="del">x</button>
        </h3> 
    </div>
</template>

<script>
export default {
    name: "Todoitem",
    props: ["todo"],
    methods: {
        markComplete() {
            console.log("the checkbox is clicked!");
            this.todo.completed = !this.todo.completed;
        }
    }
}
</script>

<style scoped>
    .todo-item {
        background: #f4f4f4;
        padding: 10px;
        border: 2px #cccccc dotted;
    }
    .is-complete {
        text-decoration: line-through;
    }
    .del {
        background: red;
        color: white;
        cursor: pointer; 
        float: right;
        border: none;
        padding: 5px 9px;
        border-radius: 50%;
    }
</style>