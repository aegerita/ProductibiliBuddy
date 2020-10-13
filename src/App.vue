<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div>
		<keep-alive>
				<router-view/>
		</keep-alive>
		<div id="tail">
				<p>
					User data kept in local storage<br>
					Don't eat your cookies! <br>
				</p>
				<p><strong>More by <a href="https://github.com/aegerita">Aegerita</a></strong></p>
			</div>
	</div>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 10px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active, #tail a{
	color: #42b983;
}

#tail {
	margin-top: 55px;
}
</style>
