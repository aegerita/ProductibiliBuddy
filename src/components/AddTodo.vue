<template>
  <!-- prevent so don't refresh pages -->
  <form @submit.prevent="addTodo" autocomplete="off">
    <!--  bind the input to the data title --> 
    <input type="text" v-model.trim="title" placeholder="Add Todo...">
    <input type="submit" value="Submit" class="btn">
  </form>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  setup() {
    const title = ref(null);
    const store = useStore();

    const addTodo = () => {
      if (title.value) {
        console.log("new todo!");
        if (title.value.length < 50)
          store.dispatch('addTodo', { title : title.value });
        else {
          alert("Come on, your todo has " + title.value.length + " characters?");
          if (confirm("I mean, I'll tolerate it if you were flirting with me;)")){
            store.dispatch('addTodo', { title : title.value });
          }
        }
        title.value = "";
      }
    };

    return { title, addTodo };
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