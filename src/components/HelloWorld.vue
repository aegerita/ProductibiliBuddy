<template>
  <div class="hello">
    <h1>{{ msg + name }}</h1>
    <!-- do whatever hard coded html in this div --> 
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    name: String
  }
}
</script>
