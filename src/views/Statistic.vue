<template>
  <h1 style="padding: 0 20px">In this session, you have:</h1>
  <div style="padding: 10px">
    <h3>Chat with me {{ stats.chatNum }} times</h3>
    <h3>Added a total of {{ stats.todoNum }} todos</h3>
    <h3>Undo your actions {{ stats.undoNum }} times</h3>
    <h3>A total of {{ stats.nameNum }} names</h3>
    <h3>Finished a total of {{ doneTodos.length + stats.deleteFinishedNum }} todos</h3>
  </div>
</template>

<script>
import { useStore, mapState, mapGetters } from 'vuex';

export default {
  setup() {
    const store = useStore();
    if (store.state.stats.chatNum < 1) store.commit('loadStats');
    else console.log('do not load from status page');
  },
  computed: {
    ...mapState(['stats']),
    ...mapGetters(['doneTodos']),
  },
};
</script>
