import { createStore, createLogger } from 'vuex'

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
    save(state){
      // remove "future" history
      state.history = state.history.slice(0, state.historyIndex++);
      state.history.push(JSON.parse(JSON.stringify(state.todos)));
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
    clear(state){
      if (state.todos && state.todos.length != 0) state.todos = [];
    }, 
    loadData(state){
      if (localStorage.getItem('username')){
        state.username = localStorage.getItem('username');
        console.log('username:', state.username);
      }
      // do i want to detect screen width everytime?
      /*if (localStorage.getItem('display')){
        // can't store boolean
        this.display = JSON.parse(localStorage.getItem('display'));
        console.log('display:', this.display);
      }*/
      if (localStorage.getItem('todos')) {
        try {
          state.todos = JSON.parse(localStorage.getItem('todos'));
        } catch(e) {
          localStorage.removeItem('todos');
        }
      } 
      // clean history? 
      state.historyIndex = 0;
      state.history = [];
    },
  },

  actions: {
    initialize({ dispatch, commit } ){
      commit('loadData');
      commit('save');
      if (!this.state.todos.length){
        if (localStorage.getItem('username')){
          dispatch('addTodo', {title : "Miss me?"});
          dispatch('addTodo', {title : "Thank you for using me..."});
          dispatch('addTodo', {title : "It's good to see you again"});
        } else {
          dispatch('addTodo', {title : "Welcome!"});
          dispatch('addTodo', {title : "Pls use me as much as you like"});
          dispatch('addTodo', {title : "Hehehe..."});
        }
        dispatch('toggleTodo', {todo : this.state.todos[2]})
      }
    },
    addTodo( context, payload ){
      context.commit('addTodo', payload);
      context.commit('save');
    },
    deleteTodo( context, payload ){
      context.commit('deleteTodo', payload);
      context.commit('save');
    },
    toggleTodo( context, payload ){
      context.commit('toggleTodo', payload);
      context.commit('save');
    },
    clear({ commit }){
      commit('clear');
      commit('save');
    },
  },
  modules: {
  },

  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
})
