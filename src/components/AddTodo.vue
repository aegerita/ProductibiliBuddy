<template>
    <div>
        <!-- just like emit, but a function -->
        <form @submit="addTodo" autocomplete="off">
            <!--  bind the input to the data title --> 
            <input type="text" name="title" v-model.trim="title" placeholder="Add Todo..." >
            <input type="submit" value="Submit" class="btn">
        </form>
    </div>
</template>

<script>
// to generate unique id for todo
// maybe should be done with database
import { v4 as uuidv4 } from "uuid";

export default {
    name: "AddTodo",
    data() {
        return {
            title: ''
        }
    },
    methods: {
        addTodo(e) {
            // so the page wouldn't refresh and submit the form to a file
            e.preventDefault();
            console.log("new todo!");
            const todo = {
                id: uuidv4(),
                title: this.title,
                completed: false
            }
            this.title = "";
            this.$emit("add-todo", todo);
        },
    }
}
</script>

<style scoped>
    form {
        display: flex;
        padding-bottom: 30px;
    }
    input[type="text"] {
        flex: 7;
        padding: 5px;
    }
    .btn {
        flex: 1;
        border: dotted 2px;
        cursor: pointer;
        color: #6f6f6f;
    }
</style>