import { createStore } from 'vuex';
import actions from './actions';
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
  actions,
  plugins,
});
