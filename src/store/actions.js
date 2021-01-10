import { getMessage } from './message';

const initialize = ({ state, commit }) => {
  commit('loadTodo');
  if (!state.todos.length) {
    if (localStorage.getItem('username')) {
      commit('addTodo', { title: 'Welcome back!' });
      commit('addTodo', { title: 'And finished them like a boss!' });
      commit('addTodo', { title: 'Add your tasks to todos' });
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
  const name = state.username ? state.username : 'kind stranger';
  let messages = [
    [`Ah, let me see, "${payload.title}"`, `Hmmmmm... Very interesting...`],
    [`Good job adding a todo to your list, ${name}`, `Now you can start to work on it!`],
    [`Wow, ${name}, "${payload.title}"?`, `That is pretty ambitious, in a good way`],
    [`Honestly, "${payload.title}" sounds so fun`, `Sometimes I wish I can do it with you!`],
    [`Working again, ${name}?`, `Good luck with "${payload.title}"!`],
    [`Seems like you are great at "${payload.title}", ${name}`, `You must be filled of hope, puhuhuhuh~`],
    [`I will always support you, ${name}!`, 'That is, if you finish some of these todos;)'],
  ];
  const length = state.todos.filter(todo => !todo.completed).length;
  if (length > 3) {
    messages = messages.concat([
      [`This is your ${length}-th todo already, ${name}!`, `That is very impressive, good for you!`],
      [`How about we grab a drink after you've done all this?`, `Kidding, ${name}, too much work to do.`],
      [`Are you sure you are fine, ${name}?`, `You are not workaholic are ya?`],
      [`Oooof, maybe this is enough for today`, `You must protect your health, ${name}`],
      [`Arbeit Macht Frei isn't good for you, ${name}`, 'Take some rest if you are overwhelmed!'],
    ]);
  }
  state.message = getMessage(state, messages);
};
const deleteTodo = ({ state, commit }, payload) => {
  commit('deleteTodo', payload);
  const name = state.username ? state.username : 'kind stranger';
  let messages = [[`Wait, did you see it ${name}?`, 'Did something just disappear?']];
  if (payload.todo.completed) {
    if (state.todos.length <= 0) {
      messages = messages.concat([
        [`Congratulation ${name}! You cleared all your todos`, `You are finally free!`],
        [`It has been a great time working with you ${name}`, `Feel free to use me when you have more todos!`],
      ]);
    } else {
      messages = messages.concat([
        [`"${payload.todo.title}" stayed there for so long`, `It's kind of sad to let it go`],
        [`Wow ${name}, you deleted "${payload.todo.title}"?`, `Well, at least you finished it :)`],
        [`The list just got visibly shorter, ${name}`, `Keep up the good work!`],
      ]);
    }
  } else {
    messages = messages.concat([
      [`Wow ${name}, you deleted "${payload.todo.title}"?`, `Well, "${payload.todo.title}" is useless anyway`],
      [`Is "${payload.todo.title}" important to you, ${name}?`, `If it is you better explain ಠ_ಠ`],
    ]);
  }
  state.message = getMessage(state, messages);
};
const toggleTodo = ({ state, commit }, payload) => {
  commit('toggleTodo', payload);
  const name = state.username ? state.username : 'kind stranger';
  let messages = [];
  if (payload.todo.completed) {
    const length = state.todos.filter(todo => !todo.completed).length;
    if (length <= 0) {
      messages = messages.concat([
        [`Congratulation ${name}! You cleared all your todos`, `You are FREEEEEE!`],
        [`Jeez ${name}! I can't believe you are finally done!`, `Such wonderful workflow, amazing!`],
        [`Great time working with you ${name}!`, `Feel free to use me when you have more todos`],
      ]);
    } else {
      messages = messages.concat([
        [`Congratulation on your work on "${payload.todo.title}"`, `That is very impressive, good for you!`],
        [`You did it! You really did "${payload.todo.title}"!`, `Thank you ${name}! I am so happy :)`],
        [
          `Wh-what? You actually finished "${payload.todo.title}", ${name}! Are you kidding?`,
          `You better wipe that smirk off your face ⁄(⁄ ⁄ ⁄ω⁄ ⁄ ⁄)⁄`,
        ],
      ]);
    }
  } else {
    messages = messages.concat([
      [`Hmmmmm, you seem stuck, ${name}`, 'Have you ever thought of ... Pivoting?'],
      [`Puhahaha, ${name}, let me guess`, `You found a mistake didn't ya （＾ν＾）`],
      [`If you are just gonna revert it, why did you mark it before?`, `You hurt my feelings, I'm sad now T^T`],
    ]);
  }
  state.message = getMessage(state, messages);
};
const clearTodo = ({ state, commit }) => {
  commit('clearTodo');
  const name = state.username ? state.username : 'kind stranger';
  let messages = [[`Wow ${name}, all of your todos are gone!`, `Is that what they say - baby clean?`]];
  state.message = getMessage(state, messages);
};

export default {
  initialize,
  addTodo,
  deleteTodo,
  toggleTodo,
  clearTodo,
};
