<template>
    <div>
        <!-- A for loop for todos array in props -->
        <!-- there must be a unique key -->
        <div v-bind:key="todoData.id" v-for="todoData in todos">
            <!-- <h3>{{todoData.title}}</h3> -->
            <!-- the todo in for loop, goes to item props-->  
            <!-- send event again to app -->
            <Todoitem v-bind:todo="todoData" v-on:del-todo="$emit('del-todo', todoData.id)"></Todoitem>
        </div>  
    </div>
</template>

<script>
import Todoitem from './Todoitem.vue'

export default {
    name: "Todos",
    props: ["todos"],
    components: {
        Todoitem
    }
}
</script> 