<template>
    <!-- class complete when then the todo.completed is true -->
    <div :class="{'is-complete':todo.completed}" @click="markComplete">
        <h3>
            <!-- checkbox method -->
            <input type="checkbox" :checked="todo.completed">
            {{todo.title}}
            <!-- send event -->
            <button @click="$emit('del-todo')">X</button>
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
    div {
        background: #f4f4f4;
        padding: 10px;
        border: 2px #cccccc dotted;
        text-align: start;
    }
    .is-complete {
        text-decoration: line-through;
        background: #e0e0e0;
    }
    button {
        background: transparent;
        color: #6f6f6f;
        font-size: 19px;
        font-weight: 500;
        cursor: pointer; 
        float: right;
        border: dotted 1px;
        padding: 4px 8px;
        border-radius: 50%;
    }
</style>