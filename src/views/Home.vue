<template>
  <div class="home">
    <Todoapp></Todoapp>
  </div>
</template>

<script>
// @ is an alias to /src
import Todoapp from '@/components/Todoapp.vue'

export default {
  name: 'Home',
  components: {
    Todoapp
  }
}
</script>
