<template>
	<header>
		<h2>{{ welcome[0] }}</h2>
		<h1>{{ welcome[1] }}</h1>
		<div id="bar">
			<div v-show="!input" class="together">
				<input @click="rename" type="submit" :value="username?'Change name':'Introduce yourself'">
			</div>
			<form v-show="input" @submit.prevent="confirmName" class="together">
				<input type="text" v-model.trim="newName" :placeholder="username ? username : 'Your name?'" ref="newName" id="newName">
				<input type="submit" value="Submit">
			</form>

			<input @click="toggleDisplay()" type="submit" :value="display ? 'Vertical' : 'Horizontal'">
			<div class="together">
				<popper :delay-on-mouse-over='500' :visible-arrow='false' :options="{placement: 'bottom'}">
					<div class="popper">ctrl+z</div>
					<input slot="reference" @click="$emit('undo')" type="submit" value="Undo">
				</popper>
				<popper :delay-on-mouse-over='500' :visible-arrow='false' :options="{placement: 'bottom'}">
					<div class="popper">ctrl+shift+z</div>
					<input slot="reference" @click="$emit('redo')" type="submit" value="Redo">
				</popper>
				<input @click="clear()" type="submit" value="Clear all">
			</div>
		</div>
	</header>
</template>

<script>
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
	name: "Header", 
	props: ["username", "display"],
	components: {
      'popper': Popper
    },
	data(){
		return {
			input: false,
			newName: ''
		}
	},
	computed:{
		welcome: function() {
			let name = this.username ? this.username : "kind stranger";
			var welcomes = [
				["I see you are studying" , "Good for you, " + name + "!"],
				["Nice to see you, " + name + ".", "Good luck on these tasks!"],
				["Thank you for using me, "+name, "Link at the bottom to check out more!"],
				["I love the stars. ", "Do you, "+name+"?"],
				["They say ya gotta be smart 'bout how ya work", "Good thing you use ME!"],
				["Hard work, perseverence, determination ... Who cares?","Let's do whatever we want, "+name],
				["I will always support you, "+name+"!", "That is, if you finish some of these todos;)"],
				["I looks so pretty thanks to Vue.js","And of course, your support,  "+name+"!"],
				["Hmmmmm, you seem stuck, "+name, "Have you ever thought of ... Pivoting?"],
				["Arbeit Macht Frei isn't good for you, "+name, "Take some rest if you are overwhelmed!"],
				["How about we grab a drink after you've done all this?", "Kidding, "+name+", you have too much work to do."],
				["I personally prefer horizontal layout than vertical", "But it's your choice, "+name+"!"],
				["I am waiting for a migration guide to vue 3", "Gotta know Composition API by then..."],
				["Hey, it's really nice seeing you here", "Thanks for making me less lonely, "+name],
				["Does it matter whether I use Vuex?", "Actually it does. Just wait for it, "+name],
				["Do you think I can evolve like pokemon, "+name+"?", "Maybe someday I can tell you the weather!"],
				["Jeez you are flattering me, "+name+"!", "I'm just happy I can be useful"],
			];
			return welcomes[Math.floor(Math.random()*welcomes.length)];
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
				if (this.newName.length < 20)
					this.$emit("rename", this.newName);
				else alert("Pls no ;(");
			}
			this.newName = '';
			this.input = false;
		},
		toggleDisplay(){
			console.log('store display to', !this.display);
			localStorage.setItem('display', !this.display);
			this.$emit('input', !this.display);
		}, 
		clear(){
			if (confirm('Are you sure you wanna abandon these precious todos?'))
				this.$emit('clear');
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
	.popper {
		background:rgba(1,1,1,0.5);
		color: #f6f6f6;
		border: transparent;
	}
</style>