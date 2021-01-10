const plugin = store => {
  // called when the store is initialized
  store.subscribe((mutation, state) => {
    // called after every mutation.
    // The mutation comes in the format of `{ type, payload }`.
    if (state.stats.chatNum > 1) {
      localStorage.setItem('stats', JSON.stringify(state.stats));
    } else console.log("^ didn't store this time!");

    let todoMutations = ['addTodo', 'deleteTodo', 'toggleTodo', 'clearTodo'];
    if (todoMutations.includes(mutation.type)) {
      saveNewHistory(state);
      // when the page reload, history may not change
    } else if (mutation.type == 'loadTodo') {
      const array1 = state.todos;
      const array2 = state.history[state.historyIndex - 1];
      let isEqual = false;
      const objectsEqual = (o1, o2) =>
        Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every(p => o1[p] === o2[p]);
      if (array1 && array2) {
        isEqual = array1.length === array2.length && array1.every((value, index) => objectsEqual(value, array2[index]));
      }
      if (!isEqual) saveNewHistory(state);
    }
  });
};

export default [plugin];
//export default process.env.NODE_ENV !== 'production' ? [createLogger(), plugin] : [plugin];

function saveNewHistory(state) {
  console.log('store new history', state.historyIndex);
  state.history = state.history.slice(0, state.historyIndex++);
  const parsed = JSON.stringify(state.todos);
  state.history.push(JSON.parse(parsed));
  localStorage.setItem('todos', parsed);
}
