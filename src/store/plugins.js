import { createLogger } from 'vuex'

const plugin = store => {
  // called when the store is initialized
  store.subscribe((mutation, state) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    if (state.stats.chatNum > 1) {
      localStorage.setItem('stats', JSON.stringify(state.stats));
      //console.log(localStorage);
    }
    let todoMutations = ['addTodo', 'deleteTodo', 'toggleTodo', 'clearTodo'];
    if (todoMutations.includes(mutation.type)) {
      // remove "future" history
      state.history = state.history.slice(0, state.historyIndex++);
      state.history.push(JSON.parse(JSON.stringify(state.todos)));
      const parsed = JSON.stringify(state.todos);
      localStorage.setItem('todos', parsed);
    }
  });
};

export default process.env.NODE_ENV !== 'production' ? [createLogger(), plugin] : [plugin];
