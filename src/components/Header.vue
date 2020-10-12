<template>
    <header>
        <h2>I see you are studying</h2>
        <h1>{{ "Good for you, " + name }}</h1>
        <div id="bar">
            <input @click="$emit('clear')" type="submit" value="Clear all">
        </div>
    </header>
</template>

<script>

export default {
    name: "Header", 
    props: ["name"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- just css for this component -->
<style scoped>
    header {
        padding: 10px;
    }
    input {
        border: dotted 2px;
        cursor: pointer;
        padding: 3px 10px;
        border-radius: 10%;
        display: inline;
        font-weight: bold;
        color: #2c3e50;
    }
    #bar {
        text-align: right;
        /* padding: 0 10px; */
    }
</style>