<template>
  <div class="home">
    <Todo />
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todos.vue';

export default {
  name: 'Home',
  components: { Todo },
};
</script>

<style>
.tooltiptext {
  background: rgba(1, 1, 1, 0.5);
  color: #f6f6f6;
  font: 14px Helvetica, Arial, sans-serif;
  border-radius: 10%;
  padding: 5px 10px;
  position: absolute;
  bottom: 110%;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.5s;
  transition-delay: 0.8s;
}
.tooltip:hover + .tooltiptext {
  opacity: 1;
}
.tooltiptext::after {
  content: ' ';
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: rgba(1, 1, 1, 0.5) transparent transparent transparent;
}
</style>
