<template>
  <div>
    <h2>{{ welcome ? welcome[0] : "lol seems like there is a glitch"}}</h2>
    <h1>{{ welcome ? welcome[1] : "Be honoured to witness this!" }}</h1>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  setup() {
    const store = useStore();
    const welcome = ref(String[2]);

    const getMessage = (username) => {
      let name = username ? username : "kind stranger";
      let welcomes = [
        ["I see you are studying" , "Good for you, " + name + "!"],
        ["Nice to see you, " + name + ".", "Good luck on these tasks!"],
        ["Thank you for using me, "+name, "Link at the bottom to check out more!"],
        ["I love the stars. ", "Do you, "+name+"?"],
        ["They say ya gotta be smart 'bout how ya work", "Good thing you use ME!"],
        ["Hard work, perseverence, determination ... Who cares?","Let's do whatever we want, "+name],
        ["I will always support you, "+name+"!", "That is, if you finish some of these todos;)"],
        ["I looks so pretty thanks to Vue.js","And of course, your support,  "+name+"!"],
        ["Hmmmmm, you seem stuck, "+name, "Have you ever thought of ... Pivoting?"],
        ["Arbeit Macht Frei isn't good for you, "+name, "Take some rest if you are overwhelmed!"],
        ["How about we grab a drink after you've done all this?", "Kidding, "+name+", you have too much work to do."],
        ["I personally prefer horizontal layout than vertical", "But it's your choice, "+name+"!"],
        ["Aren't you glad I improved so much, "+name+"?", "哔哩哔哩(゜-゜)つロ干杯~"],
        ["Hey, it's really nice seeing you here", "Thanks for making me less lonely, "+name],
        ["Does it matter whether I use Vuex?", "Actually it does. Just wait for it, "+name],
        ["Do you think I can evolve like pokemon, "+name+"?", "Maybe someday I can tell you the weather!"],
        ["Jeez you are flattering me, "+name+"!", "I'm just happy I can be useful"],
      ];
      return welcomes[Math.floor(Math.random() * welcomes.length)];
    };

    // watch the name change so refresh message everytime
    welcome.value = getMessage(store.state.username);
    store.watch((state) => state.username,
      watched => {
        console.log('message update', watched);
        welcome.value = getMessage(watched);
      }
    );
    return { welcome };
  },
}
</script>