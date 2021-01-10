export const getMessage = (state, newList) => {
  state.stats.chatNum += 1;
  if (newList) return newList[Math.floor(Math.random() * newList.length)];
  const name = state.username ? state.username : 'kind stranger';
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
  if (state.username) {
    welcomes = welcomes.concat([
      [`${name} ${name} ${name} ${name} ...`, `OUAH~ I just think you name is cute! That's all!`],
    ]);
  }
  return welcomes[Math.floor(Math.random() * welcomes.length)];
};