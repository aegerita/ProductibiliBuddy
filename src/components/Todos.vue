<template>
    <div>
        <!-- A for loop for todos array in props -->
        <!-- there must be a unique key -->
        <h2 v-if="ongoing.length != 0">Todo List: </h2>
        <h2 v-else>All Finished! Good for you!</h2>
        <div :key="todo.id" v-for="todo in ongoing">
            <!-- <h3>{{todo.title}}</h3> -->
            <!-- the todo in for loop, goes to item props-->  
            <Todoitem :todo="todo" :completed=false @toggle-completion="$emit('toggle', false, todo)" @del-todo="$emit('del-todo', todo.id)"></Todoitem>
        </div>  
        <h3 v-if="finished.length!=0 && ongoing.length!=0">Finished: </h3>
        <!-- output finished events last -->
        <div :key="todo.id" v-for="todo in finished">
            <Todoitem :todo="todo" :completed=true @toggle-completion="$emit('toggle', true, todo)" @del-todo="$emit('del-todo', todo.id)"></Todoitem>
        </div> 
    </div>
</template>

<script>
import Todoitem from './Todoitem.vue'

export default {
    name: "Todos",
    props: ["ongoing", "finished"],
    components: {
        Todoitem
    }
}
</script> 