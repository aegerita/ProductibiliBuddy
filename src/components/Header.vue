<template>
	<header>
		<h2>I see you are studying</h2>
		<h1>{{ "Good for you, " + (username ? username : "kind stranger!") }}</h1>
		<div id="bar">
			<div v-show="!input" class="button">
				<input @click="rename" type="submit" :value="username?'Change name':'Introduce yourself'">
			</div>
			<form v-show="input" @submit.prevent="confirmName" class="button">
				<input type="text" v-model.trim="newName" :placeholder="username ? username : 'Your name?'" ref="newName" id="newName">
				<input type="submit" value="Submit">
			</form>
			<input @click="toggleDisplay()" type="submit" :value="'Display: '+(display?'Horizontal':'Vertical')">
			<input @click="$emit('clear')" type="submit" value="Clear all">
		</div>
	</header>
</template>

<script>

export default {
	name: "Header", 
	props: ["username", "display"],
	data(){
		return {
			input: false,
			newName: ''
		}
	},
	methods: {
		rename(){
			console.log("rename");
			this.input = true;
			this.$nextTick(() => this.$refs.newName.focus());
		}, 
		confirmName() {
			if (this.newName){
				this.$emit("rename", this.newName);
			}
			this.newName = '';
			this.input = false;
		},
		toggleDisplay(){
			console.log('store display to', !this.display);
			localStorage.setItem('display', !this.display);
			this.$emit('input', !this.display);
		}
	}
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
		margin: 0 5px;
	}
	#bar {
		text-align: right;
	}
	.button {
		display: inline;
	}
	form input[type="text"] {
		margin-right: 0;
	}
	form input[type="submit"] {
		margin-left: 0;
	}
</style>