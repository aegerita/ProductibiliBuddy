<template>
  <div class="home">
    <Todo/>
  </div>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todos.vue'

export default {
  name: 'Home',
  components: { Todo }
}
</script>
