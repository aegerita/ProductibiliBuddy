import { getMessage } from './message';

const initialize = ({ state, commit }) => {
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
};
const addTodo = ({ state, commit }, payload) => {
  commit('addTodo', payload);
  const length = state.todos.filter(todo => !todo.completed).length;
  getMessage(state, 'addTodoMessage', payload, length);
};
const deleteTodo = ({ state, commit }, payload) => {
  commit('deleteTodo', payload);
  getMessage(state, 'deleteTodoMessage', payload, state.todos.length);
};
const toggleTodo = ({ state, commit }, payload) => {
  commit('toggleTodo', payload);
  const length = state.todos.filter(todo => !todo.completed).length;
  getMessage(state, 'toggleTodoMessage', payload, length);
};
const clearTodo = ({ state, commit }) => {
  commit('clearTodo');
  getMessage(state, 'clearTodoMessage');
};

export default {
  initialize,
  addTodo,
  deleteTodo,
  toggleTodo,
  clearTodo,
};
