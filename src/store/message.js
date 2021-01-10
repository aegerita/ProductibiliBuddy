export const getMessage = (state, userActivity, payload, stateInfo) => {
  state.stats.chatNum += 1;
  localStorage.setItem('stats', JSON.stringify(state.stats));
  console.log('this is chat number', state.stats.chatNum, userActivity);

  const name = state.username || 'kind stranger';
  //const welcomes = eval(userActivity+`('${name}')`);
  const welcomes = window[userActivity](name, payload, stateInfo);
  state.message = welcomes[Math.floor(Math.random() * welcomes.length)];
};

window.defaultMessage = name => {
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
  if (name != 'kind stranger') {
    welcomes = welcomes.concat([
      [`${name} ${name} ${name} ${name} ...`, `OUAH~ I just think you name is cute! That's all!`],
    ]);
  }
  return welcomes;
};
window.addTodoMessage = (name, payload, stateInfo) => {
  let messages = [
    [`Ah, let me see, "${payload.title}"`, `Hmmmmm... Very interesting...`],
    [`Good job adding a todo to your list, ${name}`, `Now you can start to work on it!`],
    [`Wow, ${name}, "${payload.title}"?`, `That is pretty ambitious, in a good way`],
    [`Honestly, "${payload.title}" sounds so fun`, `Sometimes I wish I can do it with you!`],
    [`Working again, ${name}?`, `Good luck with "${payload.title}"!`],
    [`Seems like you are great at "${payload.title}", ${name}`, `You must be filled of hope, puhuhuhuh~`],
    [`I will always support you, ${name}!`, 'That is, if you finish some of these todos;)'],
  ];
  if (stateInfo > 3) {
    messages = messages.concat([
      [`This is your ${stateInfo}-th todo already, ${name}!`, `That is very impressive, good for you!`],
      [`How about we grab a drink after you've done all this?`, `Kidding, ${name}, too much work to do.`],
      [`Are you sure you are fine, ${name}?`, `You are not workaholic are ya?`],
      [`Oooof, maybe this is enough for today`, `You must protect your health, ${name}`],
      [`Arbeit Macht Frei isn't good for you, ${name}`, 'Take some rest if you are overwhelmed!'],
    ]);
  }
  return messages;
};
window.deleteTodoMessage = (name, payload, stateInfo) => {
  let messages = [[`Wait, did you see it ${name}?`, 'Did something just disappear?']];
  if (payload.todo.completed) {
    if (stateInfo <= 0) {
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
  return messages;
};
window.toggleTodoMessage = (name, payload, stateInfo) => {
  let messages = [];
  if (payload.todo.completed) {
    if (stateInfo <= 0) {
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
  return messages;
};
window.clearTodoMessage = name => {
  return [[`Wow ${name}, all of your todos are gone!`, `Is that what they say - baby clean?`]];
};
