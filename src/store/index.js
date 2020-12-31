import { createStore, createLogger } from 'vuex'

const saveTodo = store => {
  // called when the store is initialized
  store.subscribe((mutation, state) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    let todoMutations = ['loadTodo', 'addTodo', 'deleteTodo', 'toggleTodo', 'clearTodo']
    if (todoMutations.includes(mutation.type)) {
      // remove "future" history
      state.history = state.history.slice(0, state.historyIndex++);
      state.history.push(JSON.parse(JSON.stringify(state.todos)));
      const parsed = JSON.stringify(state.todos);
      localStorage.setItem('todos', parsed);
    }
  })  
}

export default createStore({
  state: {
    todos: [],
    username: '', 
    historyIndex: 0,
    history: [],
    display: window.innerWidth > 500,
  },

  getters: {
    doneTodos: state => state.todos.filter(todo => todo.completed).sort((a,b) => a.time-b.time),
    undoneTodos: state => state.todos.filter(todo => !todo.completed),
  },

  mutations: {
    rename(state, payload){
      console.log("store the new name", payload.name);
      state.username = payload.name;
      localStorage.setItem('username', payload.name);
    },
    toggleDisplay(state){
      console.log('store display to', !state.display);
      localStorage.setItem('display', !state.display);
      state.display = !state.display;
    },
    undo(state){
      if (state.historyIndex > 1){
        state.todos = JSON.parse(JSON.stringify(state.history[--state.historyIndex-1]));
        console.log('copy history number ', state.historyIndex-1);
      }
      const parsed = JSON.stringify(state.todos);
      localStorage.setItem('todos', parsed);
    },
    redo(state){
      if (state.historyIndex < state.history.length){
        state.todos = JSON.parse(JSON.stringify(state.history[++state.historyIndex-1]));
      }
      const parsed = JSON.stringify(state.todos);
      localStorage.setItem('todos', parsed);
    },
    addTodo(state, payload){
      state.todos.push({
        title: payload.title,
        completed: false,
        time: Date.now()
      }); 
    },
    deleteTodo(state, payload){
      console.log("delete item number ", state.todos.indexOf(payload.todo));
			state.todos.splice(state.todos.indexOf(payload.todo), 1);
    },
    toggleTodo(state, payload){
			console.log("toggle item number ", state.todos.indexOf(payload.todo));
			payload.todo.completed = !payload.todo.completed;
			payload.todo.time = Date.now();
		}, 
    clearTodo(state){
      if (state.todos && state.todos.length != 0) state.todos = [];
    }, 
    loadTodo(state){
      if (localStorage.getItem('username')){
        state.username = localStorage.getItem('username');
        console.log('username:', state.username);
      }
      // do i want to detect screen width everytime?
      if (localStorage.getItem('display')){
        // can't store boolean
        state.display = JSON.parse(localStorage.getItem('display'));
        console.log('display:', state.display);
      }
      if (localStorage.getItem('todos')) {
        try {
          state.todos = JSON.parse(localStorage.getItem('todos'));
        } catch(e) {
          localStorage.removeItem('todos');
        }
      } 
      //console.log(localStorage);
    },
  },

  actions: {
    initialize({ commit } ){
      commit('loadTodo');
      if (!this.state.todos.length){
        if (localStorage.getItem('username')){
          commit('addTodo', {title : "Miss me?"});
          commit('addTodo', {title : "Thank you for using me..."});
          commit('addTodo', {title : "It's good to see you again"});
        } else {
          commit('addTodo', {title : "Welcome!"});
          commit('addTodo', {title : "Pls use me as much as you like"});
          commit('addTodo', {title : "Hehehe..."});
        }
        commit('toggleTodo', {todo : this.state.todos[2]})
      }
    }
  },
  modules: {
  },

  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger(), saveTodo]
    : [saveTodo]
})
