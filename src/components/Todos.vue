<template>
	<div id="todo">
		<Header @clear="clear" @rename="rename" @undo='undo' @redo='redo' :username="username" :display="display" v-model="display"/>
		<AddTodo @add-todo="addTodo"/>

		<!-- A for loop for todos array in props -->
		<!-- there must be a unique key -->
		<h2 v-show="todos.every(todo => todo.completed)">All Finished! Good for you!</h2>
		<div :class="{'horizontal' : display}">
			<div id="left">
				<h2 v-show="todos.some(todo => !todo.completed)">Todo List: </h2>
				<div :key="todos.indexOf(todo)" v-for="todo in todos.filter(todo => !todo.completed)" @drop="drop($event, false)" @dragover.prevent @dragenter.prevent>
					<!-- the todo in for loop, goes to item props-->  
					<div draggable @dragstart='drag($event, todo)' @drag='drag($event, todo)'>
						<Todoitem :todo="todo" :display="display" @toggle="toggle" @del-todo="deleteTodo"/>
					</div>
				</div>  
			</div> 
			<!-- output finished events last -->
			<div id="right">
				<!-- header finished:  -->
				<h3 v-show="todos.some(todo=>todo.completed) && !todos.every(todo=>todo.completed)">Finished: </h3>
				<div :key="todos.indexOf(todo)" v-for="todo in todos.filter(todo => todo.completed).sort((a,b) => a.time-b.time)" @drop="drop($event, true)" @dragover.prevent @dragenter.prevent>
					<!-- drag can only be div -->
					<div draggable @dragstart='drag($event, todo)' @drag='drag($event, todo)'>
						<Todoitem :todo="todo" :display="display" @toggle="toggle" @del-todo="deleteTodo"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//import Todos from './Todos.vue';
import Header from "./Header";
import AddTodo from "./AddTodo.vue"
import Todoitem from './Todoitem.vue'

export default {
	name: "Todos",
	components: {
		Header,
		AddTodo,
		Todoitem,
	},
	// store things and variables and stuffs
	data() {
		return {
			historyIndex: 0,
			username: '',
			display: window.innerWidth > 500,
			todos: [],
			history: []
		}
	}, 
	mounted(){
		if (localStorage.getItem('username')){
			this.username = localStorage.getItem('username');
			console.log('username:', this.username);
		}
		/* // do i want to detect screen width everytime?
		if (localStorage.getItem('display')){
			// can't store boolean
			this.display = JSON.parse(localStorage.getItem('display'));
			console.log('display:', this.display);
		}*/
		if (localStorage.getItem('todos')) {
			try {
				this.todos = JSON.parse(localStorage.getItem('todos'));
			} catch(e) {
				localStorage.removeItem('todos');
			}
		} 
		this.save();
		if (!this.todos.length){
			if (localStorage.getItem('username')){
				this.addTodo("Miss me?");
				this.addTodo("Thank you for using me...");
				this.addTodo("It's good to see you again");
			} else {
				this.addTodo("Welcome!");
				this.addTodo("Pls use me as much as you like");
				this.addTodo("Hehehe...");
			}
			this.toggle(this.todos[2]);
		}
	},
	created(){
		document.onkeydown = evt => {
			evt = evt || window.event;
			if (evt.ctrlKey && evt.code === 'KeyZ') {
				evt.shiftKey ? this.redo() : this.undo();
			}
		};
	},
	methods: {
		deleteTodo(deletee) {
			console.log("delete item number ", this.todos.indexOf(deletee));
			this.todos.splice(this.todos.indexOf(deletee), 1);
			this.save();
		}, 
		addTodo(todoTitle) {
			this.todos.push({
				title: todoTitle,
				completed: false,
				time: Date.now()
			});
			this.save();
		},
		toggle(todo){
			console.log("toggle item number ", this.todos.indexOf(todo));
			todo.completed = !todo.completed;
			todo.time = Date.now();
			this.save();
		},
		save(){
			// remove "future" history
			this.history = this.history.slice(0, this.historyIndex++);
			this.history.push(JSON.parse(JSON.stringify(this.todos)));
			const parsed = JSON.stringify(this.todos);
			localStorage.setItem('todos', parsed);
		}, 
		clear(){
			this.todos = [];
			this.save();
			//localStorage.removeItem('username');
		},
		rename(name){
			console.log("store the new name", name);
			this.username = name;
			localStorage.setItem('username', name);
		}, 
		undo(){
			if (this.historyIndex > 1){
				this.todos = JSON.parse(JSON.stringify(this.history[--this.historyIndex-1]));
				console.log('copy history number ', this.historyIndex-1);
			}
			const parsed = JSON.stringify(this.todos);
			localStorage.setItem('todos', parsed);
		},
		redo(){
			if (this.historyIndex < this.history.length){
				this.todos = JSON.parse(JSON.stringify(this.history[++this.historyIndex-1]));
			}
			const parsed = JSON.stringify(this.todos);
			localStorage.setItem('todos', parsed);
		}, 
		drag: (evt, item) => {
			evt.dataTransfer.dropEffect = 'move';
			evt.dataTransfer.effectAllowed = 'move';
			evt.dataTransfer.setData('todo', item.title);
		}, 
		drop (evt, completed) {
			console.log("transfer this", evt.dataTransfer.getData('todo'));
			const title = evt.dataTransfer.getData('todo');
			const todo = this.todos.find(todo => todo.title === title)
			if (todo.completed != completed){
				this.toggle(todo);
			}
		}
	}
}
</script> 

<style scoped>
	#todo {
		font-family: AvenAir, Helvetica, Arial, sans-serif;
		line-height: 1.4;
		padding: 0 20px;
	}
	.horizontal {
		display: flex;
	}
	.horizontal #left{
		flex: 1;
		padding: 0 15px 0 10px;
	}
	.horizontal #right{
		flex: 1;
		padding: 0 10px 0 15px;
	}
	@media only screen and (max-width: 700px) {
		#todo { padding: 0 15px; }
		.horizontal #left, #right{ padding: 0 8px; }
	}
	.horizontal h2, .horizontal h3{
		font-size: 18px;
		margin: 20px;
		text-align: start;
	}
</style>