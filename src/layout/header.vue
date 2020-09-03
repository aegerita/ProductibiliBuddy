<template>
    <header class="header">
        <h2>I see you are studying</h2>
        <HelloWorld msg="Good for you, " :name="name"/>
    </header>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";

export default {
    name: "Header", 
    props: ["name"],
    components:{
        HelloWorld
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- just css for this component -->
<style scoped>
header {
  margin: 50px;
}
</style>