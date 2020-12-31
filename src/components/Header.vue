<template>
  <div style="text-align: right; padding-right: 10px">
    <div v-show="!input" class="together">
      <input @click="rename" type="submit" :value="username ? 'Change name' : 'Introduce yourself'" />
    </div>
    <form v-show="input" @submit.prevent="confirmName()" class="together">
      <input
        type="text"
        v-model.trim="newName"
        :placeholder="username ? username : 'Your name?'"
        id="newName"
        style="margin-right: 0"
      />
      <input type="submit" value="Submit" style="margin-left: 0" />
    </form>

    <input @click="toggleDisplay()" type="submit" :value="display ? 'Vertical' : 'Horizontal'" />

    <div class="together">
      <input @click="undo()" type="submit" value="Undo" />
      <input @click="redo()" type="submit" value="Redo" />
      <input @click="clearTodo()" type="submit" value="Clear all" />
    </div>
  </div>
</template>

<script>
import { useStore, mapState } from 'vuex';
import { ref, nextTick } from 'vue';

export default {
  setup() {
    const store = useStore();
    const input = ref(false);
    const newName = ref('');

    const rename = () => {
      console.log('rename');
      input.value = true;
      nextTick(() => document.getElementById('newName').focus());
    };

    const confirmName = () => {
      if (newName.value) {
        if (newName.value.length < 20) store.commit('rename', { name: newName.value });
        else alert('Pls no ;(');
      }
      input.value = false;
      newName.value = '';
    };

    return {
      input,
      newName,
      rename,
      confirmName,
      undo: () => store.commit('undo'),
      redo: () => store.commit('redo'),
      toggleDisplay: () => store.commit('toggleDisplay'),
      clearTodo: () =>
        confirm('Are you sure you wanna abandon these precious todos?') ? store.commit('clearTodo') : null,
    };
  },
  computed: mapState(['display', 'username']),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- just css for this component -->
<style scoped>
input {
  border: dotted 2px;
  cursor: pointer;
  padding: 3px 10px;
  border-radius: 10%;
  display: inline;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 5px;
  background: #f6f6f6;
}
.together {
  display: inline-flex;
}
</style>
