<template>
  <header>
    <welcome/>
    <div id="bar">
      <div v-show="!input" class="together">
        <input @click="rename" type="submit" :value="username ? 'Change name' : 'Introduce yourself'">
      </div>
      <form v-show="input" @submit.prevent="confirmName()" class="together">
        <input type="text" v-model.trim="newName" :placeholder="username ? username : 'Your name?'" id="newName">
        <input type="submit" value="Submit">
      </form>

      <input @click="toggleDisplay()" type="submit" :value="display ? 'Vertical' : 'Horizontal'">

      <div class="together">
        <input @click="undo()" type="submit" value="Undo">
        <input @click="redo()" type="submit" value="Redo">
        <input @click="clear()" type="submit" value="Clear all">
      </div>
    </div>
  </header>
</template>

<script>
import { useStore, mapState } from 'vuex';
import { ref, nextTick } from 'vue';
import welcome from './welcomes'

export default {
    components: { welcome },
    setup() {
        const store = useStore();
        const input = ref(false);
        const newName = ref('');

        const rename = () => {
            console.log("rename");
            input.value = true;
            nextTick(() => document.getElementById('newName').focus());
        };

        const confirmName = () => {
          if (newName.value){
            if (newName.value.length < 20)
              store.commit("rename", { name : newName.value } );
            else alert("Pls no ;(");
          }
          input.value = false;
          newName.value = '';
        };

        const clear = () => {
          if (confirm('Are you sure you wanna abandon these precious todos?'))
            store.dispatch('clear');
        };
        
        const undo = () => store.commit('undo');
        const redo = () => store.commit('redo');
        const toggleDisplay = () => store.commit('toggleDisplay');

        return { 
            input, newName,
            rename, confirmName, clear,
            undo, redo, toggleDisplay,
        };
    }, 
    computed: mapState([
        'display', 
        'username'
    ]),
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- just css for this component -->
<style scoped>
  header {
    padding: 10px;
  }
  @media only screen and (max-width: 700px) {
    h2 { font-size: 20px; }
    h1 { font-size: 27px; }
  }
  @media only screen and (max-width: 385px) {
    h2 { font-size: 16px; }
    h1 { font-size: 22px; }
  }
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
  #bar {
    text-align: right;
  }
  .together {
    display: inline-flex;
  }
  form input[type="text"] {
    margin-right: 0;
  }
  form input[type="submit"] {
    margin-left: 0;
  }
</style>