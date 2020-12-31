import { createStore, createLogger } from 'vuex';

const plugin = store => {
  // called when the store is initialized
  store.subscribe((mutation, state) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    let todoMutations = ['loadTodo', 'addTodo', 'deleteTodo', 'toggleTodo', 'clearTodo'];
    if (todoMutations.includes(mutation.type)) {
      // remove "future" history
      state.history = state.history.slice(0, state.historyIndex++);
      state.history.push(JSON.parse(JSON.stringify(state.todos)));
      const parsed = JSON.stringify(state.todos);
      localStorage.setItem('todos', parsed);
    }
  });
  // change messages
  store.watch(
    state => state.username,
    watched => {
      console.log('message update', watched);
      store.state.message = getMessage(watched);
    }
  );
};

const getMessage = username => {
  let name = username ? username : 'kind stranger';
  let welcomes = [
    ['I see you are studying', 'Good for you, ' + name + '!'],
    ['Nice to see you, ' + name + '.', 'Good luck on these tasks!'],
    ['Thank you for using me, ' + name, 'Link at the bottom to check out more!'],
    ['I love the stars. ', 'Do you, ' + name + '?'],
    ["They say ya gotta be smart 'bout how ya work", 'Good thing you use ME!'],
    ['Hard work, perseverance, determination ... Who cares?', "Let's do whatever we want, " + name],
    ['I will always support you, ' + name + '!', 'That is, if you finish some of these todos;)'],
    ['I looks so pretty thanks to Vue.js', 'And of course, your support,  ' + name + '!'],
    ['Hmmmmm, you seem stuck, ' + name, 'Have you ever thought of ... Pivoting?'],
    ["Arbeit Macht Frei isn't good for you, " + name, 'Take some rest if you are overwhelmed!'],
    ["How about we grab a drink after you've done all this?", 'Kidding, ' + name + ', you have too much work to do.'],
    ['I personally prefer horizontal layout than vertical', "But it's your choice, " + name + '!'],
    ["Aren't you glad I improved so much, " + name + '?', '哔哩哔哩(゜-゜)つロ干杯~'],
    ["Hey, it's really nice seeing you here", 'Thanks for making me less lonely, ' + name],
    ['Does it matter if I use Vuex, ' + name + '?', 'Apparently it does, so I tried hard!'],
    ['Do you think I can evolve like pokemon, ' + name + '?', 'Maybe someday I can tell you the weather!'],
    ['Jeez you are flattering me, ' + name + '!', "I'm just happy I can be useful"],
  ];
  return welcomes[Math.floor(Math.random() * welcomes.length)];
};

export default createStore({
  state: {
    todos: [],
    username: '',
    historyIndex: 0,
    history: [],
    display: window.innerWidth > 500,
    message: [],
  },

  getters: {
    doneTodos: state => state.todos.filter(todo => todo.completed).sort((a, b) => a.time - b.time),
    undoneTodos: state => state.todos.filter(todo => !todo.completed),
  },

  mutations: {
    rename(state, payload) {
      console.log('store the new name', payload.name);
      state.username = payload.name;
      localStorage.setItem('username', payload.name);
    },
    toggleDisplay(state) {
      console.log('store display to', !state.display);
      localStorage.setItem('display', !state.display);
      state.display = !state.display;
    },
    refreshMessage(state, payload) {
      if (payload) state.message = getMessage(state.username);
      else state.message = payload.newMessage;
    },
    undo(state) {
      if (state.historyIndex > 1) {
        state.todos = JSON.parse(JSON.stringify(state.history[--state.historyIndex - 1]));
        console.log('copy history number ', state.historyIndex - 1);
      }
      const parsed = JSON.stringify(state.todos);
      localStorage.setItem('todos', parsed);
    },
    redo(state) {
      if (state.historyIndex < state.history.length) {
        state.todos = JSON.parse(JSON.stringify(state.history[++state.historyIndex - 1]));
      }
      const parsed = JSON.stringify(state.todos);
      localStorage.setItem('todos', parsed);
    },
    addTodo(state, payload) {
      state.todos.push({
        title: payload.title,
        completed: false,
        time: Date.now(),
      });
    },
    deleteTodo(state, payload) {
      console.log('delete item number ', state.todos.indexOf(payload.todo));
      state.todos.splice(state.todos.indexOf(payload.todo), 1);
    },
    toggleTodo(state, payload) {
      console.log('toggle item number ', state.todos.indexOf(payload.todo));
      payload.todo.completed = !payload.todo.completed;
      payload.todo.time = Date.now();
    },
    clearTodo(state) {
      if (state.todos && state.todos.length != 0) state.todos = [];
    },
    loadTodo(state) {
      if (localStorage.getItem('username')) {
        state.username = localStorage.getItem('username');
        console.log('username:', state.username);
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
        } catch (e) {
          localStorage.removeItem('todos');
        }
      }
      //console.log(localStorage);
    },
  },

  actions: {
    initialize({ commit }) {
      commit('loadTodo');
      if (!this.state.todos.length) {
        if (localStorage.getItem('username')) {
          commit('addTodo', { title: 'Miss me?' });
          commit('addTodo', { title: 'Thank you for using me...' });
          commit('addTodo', { title: "It's good to see you again" });
        } else {
          commit('addTodo', { title: 'Welcome!' });
          commit('addTodo', { title: 'Pls use me as much as you like' });
          commit('addTodo', { title: 'Hehehe...' });
        }
        commit('toggleTodo', { todo: this.state.todos[2] });
      }
    },
  },
  modules: {},

  plugins: process.env.NODE_ENV !== 'production' ? [createLogger(), plugin] : [plugin],
});
