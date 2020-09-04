<template>
    <div>
        <!-- A for loop for todos array in props -->
        <!-- there must be a unique key -->
        <h2>Todo List: </h2>
        <div :key="todoData.id" v-for="todoData in todos">
            <!-- <h3>{{todoData.title}}</h3> -->
            <!-- the todo in for loop, goes to item props-->  
            <Todoitem v-if="!todoData.completed" :todo="todoData" @del-todo="$emit('del-todo', todoData.id)"></Todoitem>
        </div>  
        <!-- output finished events last -->
        <div :key="todoData.id+50" v-for="todoData in todos">
            <Todoitem v-if="todoData.completed" :todo="todoData" @del-todo="$emit('del-todo', todoData.id)"></Todoitem>
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