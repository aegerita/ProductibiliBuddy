import { getMessage } from './message';

const rename = (state, payload) => {
  if (payload.name != state.username) {
    state.stats.nameNum += 1;
    console.log('store the new name', payload.name);
    state.username = payload.name;
    localStorage.setItem('username', payload.name);
    state.message = getMessage(state);
  }
};
const toggleDisplay = state => {
  console.log('store display to', !state.display);
  localStorage.setItem('display', !state.display);
  state.display = !state.display;
};

const refreshMessage = (state, payload) => {
  if (payload) state.message = getMessage(state);
  else state.message = payload.newMessage;
};

const undo = state => {
  if (state.historyIndex > 1) {
    state.stats.undoNum += 1;
    state.todos = JSON.parse(JSON.stringify(state.history[--state.historyIndex - 1]));
    console.log('copy history number ', state.historyIndex - 1);
  }
  const parsed = JSON.stringify(state.todos);
  localStorage.setItem('todos', parsed);
};
const redo = state => {
  if (state.historyIndex < state.history.length) {
    state.todos = JSON.parse(JSON.stringify(state.history[++state.historyIndex - 1]));
  }
  const parsed = JSON.stringify(state.todos);
  localStorage.setItem('todos', parsed);
};

const addTodo = (state, payload) => {
  state.todos.push({
    title: payload.title,
    completed: false,
    time: Date.now(),
  });
  state.stats.todoNum += 1;
};
const deleteTodo = (state, payload) => {
  console.log('delete item number ', state.todos.indexOf(payload.todo));
  state.todos.splice(state.todos.indexOf(payload.todo), 1);
  if (payload.todo.completed) state.stats.deleteFinishedNum += 1;
};
const toggleTodo = (state, payload) => {
  console.log('toggle item number ', state.todos.indexOf(payload.todo));
  payload.todo.completed = !payload.todo.completed;
  payload.todo.time = Date.now();
};
const clearTodo = state => {
  state.stats.deleteFinishedNum += state.todos.filter(todo => todo.completed).length;
  if (state.todos && state.todos.length != 0) state.todos = [];
};
const loadTodo = state => {
  if (localStorage.getItem('username')) {
    state.username = localStorage.getItem('username');
    console.log('username:', state.username);
    state.message = getMessage(state);
  }
  // do i want to detect screen width every time?
  if (localStorage.getItem('display')) {
    // can't store boolean
    state.display = JSON.parse(localStorage.getItem('display'));
    console.log('display:', state.display);
  }
  if (localStorage.getItem('todos')) {
    try {
      state.todos = JSON.parse(localStorage.getItem('todos'));
    } catch {
      localStorage.removeItem('todos');
    }
  }
  if (localStorage.getItem('stats')) {
    try {
      state.stats = JSON.parse(localStorage.getItem('stats'));
    } catch {
      localStorage.removeItem('stats');
    }
  }
  //console.log(localStorage);
  //localStorage.clear();
};

export default {
  rename,
  toggleDisplay,
  refreshMessage,
  undo,
  redo,
  addTodo,
  deleteTodo,
  toggleTodo,
  clearTodo,
  loadTodo,
};
