<template>
    <div>
        <!-- just like emit, but a function -->
        <!-- prevent so don't refresh pages -->
        <form @submit.prevent="addTodo" autocomplete="off">
            <!--  bind the input to the data title --> 
            <input type="text" v-model.trim="title" placeholder="Add Todo...">
            <input type="submit" value="Submit" class="btn">
        </form>
    </div>
</template>

<script>
// to generate unique id for todo
// maybe should be done with database
export default {
    name: "AddTodo",
    data() {
        return {
            title: '',
        }
    },
    methods: {
        addTodo() {
            if (this.title){
                console.log("new todo!");
                if (this.title.length < 50)
                    this.$emit("add-todo", this.title);
                else {
                    alert("Come on, your todo has " +this.title.length + " characters?");
                    if (confirm("I mean, I'll tolerate it if you were flirting with me;)")){
                        this.$emit("add-todo", this.title);
                    }
                }
                this.title = "";
            }
        },
    }
}
</script>

<style scoped>
    form {
        display: flex;
        padding-top: 10px;
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