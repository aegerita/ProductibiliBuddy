<template>
	<header>
		<h2>I see you are studying</h2>
		<h1>{{ "Good for you, " + (username ? username : "kind stranger!") }}</h1>
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
				<popper :delay-on-mouse-over='800' :visible-arrow='false' :options="{placement: 'bottom'}">
					<div class="popper">ctrl+z</div>
					<input slot="reference" @click="$emit('undo')" type="submit" value="Undo">
				</popper>
				<popper :delay-on-mouse-over='800' :visible-arrow='false' :options="{placement: 'bottom'}">
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