<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/statistic">Stats</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <div id="tail">
      <p>
        User data kept in local storage
        <br />
        Don't eat your cookies!
        <br />
      </p>
      <h3>
        More by
        <a href="https://github.com/aegerita">Aegerita</a>
      </h3>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  font-family: 'Avenir Heavy', Arial, sans-serif;
  padding: 10px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active,
#tail a {
  color: #42b983;
}
#tail h3 {
  font-family: 'Avenir Heavy', Arial, sans-serif;
  font-size: 16px;
}
#tail {
  margin-top: 10px;
}

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
  transition-delay: 0.5s;
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
