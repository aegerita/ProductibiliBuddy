<template>
  <div
    class="container"
    :class="{ complete: todo.completed }"
    @click="toggle({ todo: todo })"
    @click.right.prevent="deleteTodo({ todo: todo })"
    draggable="true"
  >
    <h3 :class="{ horizontal: display }">
      <input type="checkbox" :checked="todo.completed" />
      {{ todo.title }}
      <div>
        <button class="tooltip" @click.stop="deleteTodo({ todo: todo })">X</button>
        <span class="tooltiptext">Right Click Todo to Delete Faster</span>
      </div>
    </h3>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  props: {
    todo: {
      completed: Boolean,
    },
  },
  setup() {
    return {
      ...mapMutations({
        toggle: 'toggleTodo',
        deleteTodo: 'deleteTodo',
      }),
    };
  },
  computed: mapState(['display']),
};
</script>

<style scoped>
.container {
  background: #f4f4f4;
  padding: 10px;
  border: 2px #cccccc dotted;
  text-align: start;
}
.complete {
  text-decoration: line-through;
  background: #e0e0e0;
}
.container div {
  position: relative;
  display: inline-flex;
  float: right;
}
button {
  background: transparent;
  color: #6f6f6f;
  font-size: 19px;
  font-weight: 500;
  cursor: pointer;
  border: dotted 1px;
  padding: 4px 8px;
  border-radius: 50%;
}
.tooltiptext {
  width: 105px;
  margin-left: -47px;
}
h3 {
  margin: 15px 0;
}
.horizontal h3 {
  margin: 20px 0;
}
@media only screen and (max-width: 600px) {
  h3 {
    margin: 10px 1px;
  }
  .horizontal h3 {
    margin: 15px 0;
  }
  button {
    font-size: 14px;
  }
}
@media only screen and (max-width: 450px) {
  h3 {
    font-size: 17px;
  }
}
</style>