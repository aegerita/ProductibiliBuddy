import { createStore } from 'vuex';
import mutations from './mutations';
import plugins from './plugins';

export default createStore({
  state: {
    todos: [],
    username: '',
    historyIndex: 0,
    history: [],
    display: window.innerWidth > 500,
    message: [],
    stats: {
      chatNum: 0,
      todoNum: 0,
      undoNum: 0,
      nameNum: 0,
      deleteFinishedNum: 0,
    },
  },

  getters: {
    doneTodos: state => state.todos.filter(todo => todo.completed).sort((a, b) => a.time - b.time),
    undoneTodos: state => state.todos.filter(todo => !todo.completed),
  },

  mutations,
  actions: {
    initialize: ({ state, commit }) => {
      commit('loadStats');
      commit('loadTodo');
      if (!state.todos.length) {
        if (localStorage.getItem('username')) {
          commit('addTodo', { title: 'Welcome back!' });
          commit('addTodo', { title: 'Add your tasks to todos' });
          commit('addTodo', { title: 'And finished them like a boss!' });
        } else {
          commit('addTodo', { title: 'Welcome!' });
          commit('addTodo', { title: 'Add your tasks to todos' });
          commit('addTodo', { title: 'And toggle them when you are finished' });
        }
        state.stats.todoNum -= 3;
        commit('toggleTodo', { todo: state.todos[2] });
      }
    },
  },
  plugins,
});
