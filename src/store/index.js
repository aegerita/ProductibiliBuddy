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

const getMessage = (username, newList) => {
  if (newList) newList[Math.floor(Math.random() * newList.length)];
  const name = username ? username : 'kind stranger';
  let welcomes = [
    ['I see you are studying', `Good for you, ${name}!`],
    [`Nice to see you, ${name}.`, 'Good luck on these tasks!'],
    [`Thank you for using me, ${name}`, 'Link at the bottom to check out more!'],
    ['I love the stars. ', `Do you, ${name}?`],
    ["They say ya gotta be smart 'bout how ya work", 'Good thing you use ME!'],
    ['Hard work, perseverance, determination ... Who cares?', `Let's do whatever we want, ${name}`],
    ['I looks so pretty thanks to Vue.js', `And of course, your support,  ${name}!`],
    ['I personally prefer horizontal layout than vertical', `But it's your choice, ${name}!`],
    [`Aren't you glad I improved so much, ${name}?`, '哔哩哔哩(゜-゜)つロ干杯~'],
    ["Hey, it's really nice seeing you here", `Thanks for making me less lonely, ${name}`],
    [`Does it matter if I use Vuex, ${name}?`, 'Apparently it does, so I tried hard!'],
    [`Do you think I can evolve like pokemon, ${name}?`, 'Maybe someday I can tell you the weather!'],
    [`Jeez you are flattering me, ${name}!`, "I'm just happy I can be useful"],
    [`Visit "about" to check out amazing updates!`, `Can't wait to share news with you, ${name}`],
    [`Did I ever tell you I love to collect paintings of pretty women?`, `Oops I let it slipped ┑(￣Д ￣)┍`],
  ];
  if (username) {
    welcomes = welcomes.concat([
      [`${name} ${name} ${name} ${name} ...`, `OUAH~ I just think you name is cute! That's all!`],
    ]);
  }
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
    name: state => (state.username ? state.username : 'kind stranger'),
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
      //localStorage.clear();
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
    addTodo(context, payload) {
      context.commit('addTodo', payload);
      const name = context.state.username ? context.state.username : 'kind stranger';
      let messages = [
        [`Ah, let me see, "${payload.title}"`, `Hmmmmm... Very interesting...`],
        [`Good job adding a todo to your list, ${name}`, `Now you can start to work on it!`],
        [`Wow, ${name}, "${payload.title}"?`, `That is pretty ambitious, in a good way`],
        [`Honestly, "${payload.title}" sounds so fun`, `Sometimes I wish I can do it with you!`],
        [`Working again, ${name}?`, `Good luck with "${payload.title}"!`],
        [`Seems like you are great at "${payload.title}", ${name}`, `You must be filled of hope, puhuhuhuh~`],
        [`I will always support you, ${name}!`, 'That is, if you finish some of these todos;)'],
      ];
      const length = context.state.todos.filter(todo => !todo.completed).length;
      if (length > 3) {
        messages = messages.concat([
          [`This is your ${length}-th todo already, ${name}!`, `That is very impressive, good for you!`],
          [`How about we grab a drink after you've done all this?`, `Kidding, ${name}, too much work to do.`],
          [`Are you sure you are fine, ${name}?`, `You are not workaholic are ya?`],
          [`Oooof, maybe this is enough for today`, `You must protect your health, ${name}`],
          [`Arbeit Macht Frei isn't good for you, ${name}`, 'Take some rest if you are overwhelmed!'],
        ]);
      }
      context.state.message = getMessage(name, messages);
    },
    deleteTodo(context, payload) {
      context.commit('deleteTodo', payload);
      const name = context.state.username ? context.state.username : 'kind stranger';
      let messages = [[`Wait, did you see it ${name}?`, 'Did something just disappear?']];
      if (payload.todo.completed) {
        if (context.state.todos.length <= 0) {
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
      context.state.message = getMessage(name, messages);
    },
    toggleTodo(context, payload) {
      context.commit('toggleTodo', payload);
      const name = context.state.username ? context.state.username : 'kind stranger';
      let messages = [];
      if (payload.todo.completed) {
        const length = context.state.todos.filter(todo => !todo.completed).length;
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
      context.state.message = getMessage(name, messages);
    },
    clearTodo(context) {
      context.commit('clearTodo');
      const name = context.state.username ? context.state.username : 'kind stranger';
      let messages = [[`Wow ${name}, all of your todos are gone!`, `Is that what they say - baby clean?`]];
      context.state.message = getMessage(name, messages);
    },
  },
  modules: {},

  plugins: process.env.NODE_ENV !== 'production' ? [createLogger(), plugin] : [plugin],
});
