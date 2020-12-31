<template>
  <div :class="{'is-complete' : todo.completed}" @click="toggle()" @click.right.prevent="deleteTodo()" draggable="true">
    <h3 :class="{'horizontal' : display}">
      <input type="checkbox" :checked="todo.completed"> 
      {{ todo.title }}
      <button @click.stop="deleteTodo()">X</button>
    </h3>
  </div>
</template>

<script>
import { useStore, mapState } from 'vuex';

export default {
  props: ['todo'],
  setup(props) {
    const store = useStore();
    return { 
      toggle: () => store.commit('toggleTodo', { todo : props.todo }),
      deleteTodo: () => store.commit('deleteTodo', { todo : props.todo }), 
    }
  },
  computed: mapState(['display']),
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
  h3 { margin: 15px 0; }
  .horizontal h3 { margin: 20px 0; }
  @media only screen and (max-width: 600px) {
    h3 { margin: 10px 1px; }
    .horizontal h3 { margin: 15px 0; }
    button { font-size: 14px;}
  }
  @media only screen and (max-width: 450px) {
    h3 { font-size: 17px; }
  }
</style>