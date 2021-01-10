<template>
  <div id="home-page">
    <div style="padding-top: 10px">
      <h2>{{ message ? message[0] : 'lol seems like there is a glitch' }}</h2>
      <h1>{{ message ? message[1] : 'Be honoured to witness this!' }}</h1>
    </div>
    <the-button-bar />
    <the-add-todo-bar />

    <h2 v-show="todos.every(todo => todo.completed)" @drop="drop($event, false)" @dragover.prevent @dragenter.prevent>
      All Finished! Good for you!
    </h2>

    <div :class="{ horizontal: display }">
      <div id="left" @drop="drop($event, false)" @dragover.prevent @dragenter.prevent>
        <h2 v-show="todos.some(todo => !todo.completed)">Todo List:</h2>
        <!-- there must be a unique key -->
        <div :key="todos.indexOf(todo)" v-for="todo in undoneTodos">
          <!-- the todo in for loop, goes to item props; drag can only be div -->
          <div draggable @dragstart="drag($event, todo)" @drag="drag($event, todo)">
            <todo-item :todo="todo" />
          </div>
        </div>
      </div>
      <!-- output finished events last -->
      <div id="right" @drop="drop($event, true)" @dragover.prevent @dragenter.prevent>
        <h3 v-show="todos.some(todo => todo.completed) && !todos.every(todo => todo.completed)">Finished:</h3>
        <div :key="todos.indexOf(todo)" v-for="todo in doneTodos">
          <div draggable @dragstart="drag($event, todo)" @drag="drag($event, todo)">
            <todo-item :todo="todo" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useStore, mapState, mapGetters } from 'vuex';
import TheButtonBar from '@/components/TheButtonBar';
import TheAddTodoBar from '@/components/TheAddTodoBar';
import TodoItem from '@/components/TodoItem';

export default {
  components: { TheButtonBar, TheAddTodoBar, TodoItem },
  setup() {
    const store = useStore();
    store.commit('refreshMessage', { newMessage: null });

    document.onkeydown = evt => {
      evt = evt || window.event;
      if (evt.ctrlKey && evt.code === 'KeyZ') evt.shiftKey ? store.commit('redo') : store.commit('undo');
    };

    const drag = (evt, item) => {
      evt.dataTransfer.dropEffect = 'move';
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('todo', item.title);
    };

    const drop = (evt, newStatus) => {
      console.log('transfer this', evt.dataTransfer.getData('todo'));
      const title = evt.dataTransfer.getData('todo');
      const todo = store.state.todos.find(todo => todo.title === title && todo.completed != newStatus);
      if (todo) store.dispatch('toggleTodo', { todo: todo });
    };

    return {
      initialize: onMounted(() => store.dispatch('initialize')),
      drag,
      drop,
    };
  },
  computed: {
    ...mapState(['todos', 'display', 'message']),
    ...mapGetters(['doneTodos', 'undoneTodos']),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home-page {
  font-family: AvenAir, Helvetica, Arial, sans-serif;
  line-height: 1.4;
  padding: 0 20px 42px 20px;
}
.horizontal {
  display: flex;
}
.horizontal #left {
  flex: 1;
  padding: 0 15px 0 10px;
}
.horizontal #right {
  flex: 1;
  padding: 0 10px 0 15px;
}
@media only screen and (max-width: 700px) {
  #home-page {
    padding: 0 15px 42px 15px;
  }
  .horizontal #left,
  .horizontal #right {
    padding: 0 8px;
  }
  h3 {
    font-size: 17px;
  }
  h2 {
    font-size: 20px;
  }
  h1 {
    font-size: 27px;
  }
}
@media only screen and (max-width: 385px) {
  h3 {
    font-size: 16px;
  }
  h2 {
    font-size: 16px;
  }
  h1 {
    font-size: 22px;
  }
}
.horizontal h2,
.horizontal h3 {
  font-size: 18px;
  margin: 20px;
  text-align: start;
}
</style>
